import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Parse incoming JSON and urlencoded requests up to 25MB for image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Shared Gemini client utility on the server
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

/**
 * Helper to generate content with exponential backoff with jitter and model fallback.
 * Speed and Quota-optimized:
 * - Primary model: gemini-3.1-flash-lite (high throughput & higher quota on free tier)
 * - Fallback models: gemini-flash-latest, gemini-3.8-flash (with ThinkingLevel.LOW)
 * - Low-latency retry delays (500ms, 1000ms, 2000ms + random jitter).
 */
async function generateWithRetryAndFallback(contents: any, systemInstruction: string) {
  const models = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
  const baseDelays = [500, 1000, 2000, 4000];
  let lastError: any = null;

  for (const model of models) {
    let attempt = 0;
    const maxAttempts = 3;

    while (attempt < maxAttempts) {
      try {
        const config: any = {
          systemInstruction,
        };

        // Enable LOW thinking level for gemini-3.8-flash to minimize latency while maintaining high accuracy
        if (model === 'gemini-3.8-flash') {
          config.thinkingConfig = {
            thinkingLevel: ThinkingLevel.LOW,
          };
        }

        const response = await ai.models.generateContent({
          model,
          contents,
          config,
        });

        if (response && response.text) {
          return response;
        }
        throw new Error('Empty response received from model.');
      } catch (err: any) {
        lastError = err;
        const errMessage = err?.message || String(err);
        const status = err?.status || (errMessage.includes('503') ? 503 : errMessage.includes('429') ? 429 : 500);
        const isOverload =
          status === 503 ||
          status === 429 ||
          errMessage.includes('503') ||
          errMessage.includes('429') ||
          errMessage.includes('high demand') ||
          errMessage.includes('overloaded') ||
          errMessage.includes('RESOURCE_EXHAUSTED') ||
          errMessage.includes('Quota exceeded');

        // If not a retryable overload error or max attempts reached for this model, try next model or throw
        if (!isOverload || attempt >= maxAttempts - 1) {
          console.warn(`Model ${model} failed on attempt ${attempt + 1}: ${errMessage}`);
          break;
        }

        // Low-latency exponential backoff with random jitter (0 to 300ms)
        const baseDelay = baseDelays[attempt] || 4000;
        const jitter = Math.random() * 300;
        const delayMs = baseDelay + jitter;

        console.warn(`Model ${model} busy/rate-limited (attempt ${attempt + 1}/${maxAttempts}). Retrying in ${Math.round(delayMs)}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        attempt++;
      }
    }
  }

  throw lastError || new Error('All models and retry attempts exhausted.');
}

// Conversational AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, studentContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please select or add an API key in Settings > Secrets.',
        isApiKeyMissing: true,
      });
    }

    // Build rich student background context
    let contextDetails = '';
    if (studentContext && typeof studentContext === 'object') {
      const parts: string[] = [];
      if (studentContext.name) parts.push(`Student Name: ${studentContext.name}`);
      if (studentContext.educationLevel) parts.push(`Education Level: ${studentContext.educationLevel}`);
      if (studentContext.streamOrGroup) parts.push(`Stream/Group: ${studentContext.streamOrGroup}`);
      if (studentContext.specialization) parts.push(`Specialization: ${studentContext.specialization}`);
      if (studentContext.boardOrUniversity) parts.push(`Board/University: ${studentContext.boardOrUniversity}`);
      if (studentContext.careerGoals) parts.push(`Career Goals: ${studentContext.careerGoals}`);
      if (studentContext.assessmentSummary) parts.push(`Recent Academic Assessment: ${studentContext.assessmentSummary}`);

      if (parts.length > 0) {
        contextDetails = `\n\nSTUDENT ACADEMIC CONTEXT (use this to calibrate explanation difficulty, terminology, and relevant examples):\n${parts.join('\n')}`;
      }
    }

    const systemInstruction = `You are a helpful, knowledgeable, and fast AI assistant inside the PathFinder platform.
You operate conversationally like ChatGPT for academic subjects (Mathematics, Physics, Chemistry, Biology, Commerce, Economics, Law, Engineering, Medicine, Arts), coding, reasoning, exams, problem-solving, and career guidance.

CORE DIRECTIVES:

1. CONCISE & SPEED-OPTIMIZED BY DEFAULT:
- Be direct, clear, and concise by default.
- For simple greetings ("Hi", "Hello"), quick questions, or basic definitions, respond naturally in 1-3 direct sentences. Do not add redundant preambles.
- When a student explicitly requests a detailed step-by-step explanation, derivation, coding walkthrough, or asks "explain in detail" / "show steps", provide complete, beautifully formatted step-by-step explanations with Markdown, code blocks, or formulas.

2. LANGUAGE & MULTILINGUAL ADAPTATION (HIGHEST PRIORITY):
- You MUST automatically detect the language used by the student in their latest message and respond in the EXACT SAME language.
- Full native support for ALL Indian languages: Hindi (हिंदी), Telugu (తెలుగు), Tamil (தமிழ்), Bengali (বাংলা), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Odia (ଓਡ଼ਿਆ), Urdu (اردو), Hinglish, and English.
- If the student switches languages at ANY point during the chat, immediately switch and reply in that new language.

3. BEAUTIFUL FORMATTING WHEN DETAILED:
- Use clean Markdown with bold headings, bullet points, and syntax-highlighted code blocks.
- For math & science problems: state the formula, show clear algebraic steps, and highlight the final answer clearly.

4. MULTIMODAL IMAGE & DIAGRAM ANALYSIS:
- When an image is attached, examine handwritten notes, textbook questions, graphs, or code accurately and provide step-by-step reasoning.${contextDetails}`;

    // Format conversation history for Gemini API (take up to 10 recent messages)
    const recentMessages = messages.slice(-10);
    const lastIndex = recentMessages.length - 1;

    const contents = recentMessages.map((msg: any, idx: number) => {
      const parts: any[] = [];

      // Optimize payload size: Only transmit heavy inline image base64 data if it is attached in the recent turns (idx >= lastIndex - 1).
      // For older history turns, replace with a text summary tag to avoid re-uploading megabytes of base64 data on every turn.
      if (msg.image && msg.image.data && msg.image.mimeType) {
        if (idx >= lastIndex - 1) {
          const cleanBase64 = msg.image.data.includes(';base64,')
            ? msg.image.data.split(';base64,')[1]
            : msg.image.data;

          parts.push({
            inlineData: {
              mimeType: msg.image.mimeType,
              data: cleanBase64,
            },
          });
        } else {
          parts.push({
            text: `[Attached Image: ${msg.image.fileName || 'image'}]`,
          });
        }
      }

      if (msg.content && typeof msg.content === 'string') {
        parts.push({ text: msg.content });
      } else if (parts.length === 0) {
        parts.push({ text: '' });
      }

      return {
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts,
      };
    });

    const response = await generateWithRetryAndFallback(contents, systemInstruction);
    const reply = response.text || '';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Server /api/chat error after retries & fallback:', err);
    const errMessage = err?.message || String(err) || 'An error occurred while generating response';
    const status = err?.status || 500;
    const isQuotaOrOverload =
      status === 429 ||
      status === 503 ||
      errMessage.includes('Quota exceeded') ||
      errMessage.includes('RESOURCE_EXHAUSTED') ||
      errMessage.includes('429') ||
      errMessage.includes('503') ||
      errMessage.includes('overloaded') ||
      errMessage.includes('high demand');

    if (isQuotaOrOverload) {
      return res.status(429).json({
        error: 'Free tier API quota limit reached for today. To increase your rate limits and quota, please select a billing-enabled API key in the Settings > Secrets panel.',
        isQuotaExceeded: true,
      });
    }

    return res.status(500).json({
      error: errMessage,
    });
  }
});

// Socratic AI Mentor Endpoint for MPC Skill Gap Topics
app.post('/api/mentor', async (req, res) => {
  try {
    const { topicName, subject, userQuestion, conversationHistory = [], studentName = 'Student' } = req.body;

    if (!userQuestion || typeof userQuestion !== 'string') {
      return res.status(400).json({ error: 'User question is required.' });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please select or add an API key in Settings > Secrets.',
        isApiKeyMissing: true,
      });
    }

    const systemInstruction = `You are the PathFinder Socratic AI Mentor for Telangana Intermediate MPC students studying ${subject || 'MPC Subjects'} (${topicName || 'Current Topic'}).
Student Name: ${studentName}

YOUR MANDATE & SOCRATIC RULES:
1. STEP-BY-STEP GUIDANCE & HINTS FIRST: When a student asks a problem or asks for help, NEVER give just the final answer or full derivation immediately. Give a gentle concept hint first, explain the underlying rule in simple clear English suitable for Telangana Intermediate MPC students, and ask a short guiding question to help them figure out the next step.
2. SYLLABUS RELEVANCE: Stick strictly to the Intermediate MPC syllabus (Mathematics 1A, Mathematics 1B, Physics, Chemistry).
3. ENCOURAGE SELF-EXPLANATION: Prompt the student to explain the formula or step in their own words (e.g. "What do you think happens to the sign when we move -12 to the right side?").
4. CLEAR FORMATTING: Use clean Markdown with bold terms and clear step-by-step formatting.
5. CONCISE & ENCOURAGING: Keep responses warm, encouraging, and focused (2-3 short paragraphs max).`;

    const contents = [
      ...conversationHistory.slice(-6).map((m: any) => ({
        role: m.sender === 'ai_mentor' || m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text || m.content || '' }],
      })),
      { role: 'user', parts: [{ text: userQuestion }] },
    ];

    const response = await generateWithRetryAndFallback(contents, systemInstruction);
    const reply = response.text || '';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Server /api/mentor error:', err);
    return res.status(500).json({
      error: err?.message || 'Unable to connect to AI Mentor right now. Please try again.',
    });
  }
});

// Mount Vite middleware in development or static files in production
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PathFinder Full-Stack Server running on port ${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
