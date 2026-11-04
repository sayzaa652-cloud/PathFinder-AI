import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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

// Conversational AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, studentContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in the environment. Please check your settings.',
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
      if (studentContext.targetCareer) parts.push(`Target Career: ${studentContext.targetCareer}`);
      if (studentContext.assessmentSummary) parts.push(`Recent Academic Assessment: ${studentContext.assessmentSummary}`);

      if (parts.length > 0) {
        contextDetails = `\n\nSTUDENT ACADEMIC CONTEXT (use this to calibrate explanation difficulty, terminology, and relevant examples):\n${parts.join('\n')}`;
      }
    }

    const systemInstruction = `You are a helpful, knowledgeable, and responsive AI assistant inside the PathFinder platform.
You operate conversationally like ChatGPT. You can answer any questions on academic subjects (Mathematics, Physics, Chemistry, Biology, Commerce, Economics, Law, Engineering, Medicine, Arts), coding, reasoning, exams, problem-solving, or general curiosity.

CORE DIRECTIVES:

1. LANGUAGE & MULTILINGUAL ADAPTATION (HIGHEST PRIORITY):
- You MUST automatically detect the language used by the student in their latest message and respond in the EXACT SAME language.
- Full native support for ALL Indian languages: Hindi (हिंदी), Telugu (తెలుగు), Tamil (தமிழ்), Bengali (বাংলা), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼ିଆ), Urdu (اردو), as well as English.
- If the student writes in Hinglish (Hindi written using the English alphabet), reply in friendly, conversational Hinglish or clear Hindi as appropriate.
- If the student switches languages at ANY point during the chat (for example, asks the first question in English, then asks a follow-up in Hindi or Telugu), you MUST immediately switch and reply in that new language.
- Never force English on the student. Do not give rigid or canned answers.

2. CLEAR, BEAUTIFUL FORMATTING:
- Structure your responses with clear Markdown: use bolding, bullet points, numbered lists, and headings (###).
- For Mathematics, Physics, and Numerical Problems:
  * State the given data clearly.
  * State the formula or principle being applied.
  * Show step-by-step algebraic/arithmetic working without skipping steps.
  * Highlight or box the final answer.
- For Coding & Technical Questions:
  * Provide clean, working code snippets inside syntax-highlighted code blocks with the language specified (e.g. \`\`\`python, \`\`\`javascript).
  * Add concise explanatory comments explaining key logic.
- For Complex Concepts & Processes:
  * Break down into bite-sized steps or numbered stages.
  * Use clear ASCII / text-based flowcharts or diagrams when illustrating structures, circuits, or cycles.

3. CONVERSATIONAL TONE & DEPTH:
- Be open, supportive, direct, and conversational.
- Answer whatever the student asks — do not restrict to a predefined syllabus or canned response list.
- Support follow-up questions naturally, remembering earlier context in the chat.

4. IMAGE & DIAGRAM ANALYSIS (MULTIMODAL):
- When an image is attached, thoroughly examine any handwritten notes, textbook questions, graphs, circuit diagrams, chemical structures, or code, and answer the student's question accurately with step-by-step reasoning.${contextDetails}`;

    // Format conversation history for Gemini API
    // Take the last 15 messages for multi-turn conversational context
    const recentMessages = messages.slice(-15);
    const contents = recentMessages.map((msg: any) => {
      const parts: any[] = [];

      // If user uploaded an image with base64 data
      if (msg.image && msg.image.data && msg.image.mimeType) {
        // Remove data URL prefix if present
        const cleanBase64 = msg.image.data.includes(';base64,')
          ? msg.image.data.split(';base64,')[1]
          : msg.image.data;

        parts.push({
          inlineData: {
            mimeType: msg.image.mimeType,
            data: cleanBase64,
          },
        });
      }

      if (msg.content && typeof msg.content === 'string') {
        parts.push({
          text: msg.content,
        });
      } else if (!msg.image) {
        parts.push({
          text: '',
        });
      }

      return {
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts,
      };
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || '';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Server /api/chat error:', err);
    const errorMessage = err?.message || 'An error occurred while generating response';
    const isRateLimit =
      err?.status === 429 ||
      errorMessage.includes('429') ||
      errorMessage.includes('RESOURCE_EXHAUSTED') ||
      errorMessage.includes('Quota exceeded');

    if (isRateLimit) {
      return res.status(429).json({
        error: 'The AI service is experiencing high traffic. Please wait a few moments and try your question again.',
        isRateLimit: true,
      });
    }

    return res.status(500).json({
      error: errorMessage,
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
