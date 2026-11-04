import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Send, Plus, Trash2, Copy, Check, RotateCw, Volume2, 
  VolumeX, Mic, MicOff, Camera, Upload, X, MessageSquare, 
  Sparkles, ChevronLeft, ChevronRight, AlertCircle, FileText,
  User, Bot, RefreshCw, StopCircle
} from 'lucide-react';
import { StudentProfile, AssessmentResult } from '../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: {
    data: string; // base64 string
    mimeType: string;
    fileName?: string;
  };
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

interface AIChatViewProps {
  profile: StudentProfile | null;
  assessmentResults?: AssessmentResult[];
}

const STORAGE_KEY_SESSIONS = 'pathfinder_chat_sessions_v1';
const STORAGE_KEY_CURRENT_ID = 'pathfinder_chat_current_id_v1';

// Popular Indian languages prompt suggestions
const QUICK_SUGGESTIONS = [
  { text: 'Solve this quadratic equation step-by-step: 2x² - 7x + 3 = 0', label: 'Maths Solution' },
  { text: 'न्यूटन के गति के तीनों नियम सरल शब्दों और उदाहरणों के साथ समझाइए।', label: 'हिंदी (Hindi)' },
  { text: 'Explain photosynthesis with light and dark reactions in detail.', label: 'Biology' },
  { text: 'ఆంధ్రప్రదేశ్ & తెలంగాణ ఇంటర్మీడియట్ కెమిస్ట్రీ ముఖ్యమైన భావనలను వివరించండి.', label: 'తెలుగు (Telugu)' },
  { text: 'Write a Python program to find prime numbers with clean comments.', label: 'Python Code' },
  { text: 'வானவில் எவ்வாறு உருவாகிறது என்பதை எளிய தமிழில் விளக்குக.', label: 'தமிழ் (Tamil)' },
];

export const AIChatView: React.FC<AIChatViewProps> = ({
  profile,
  assessmentResults = []
}) => {
  // Chat sessions state
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse chat sessions from storage', e);
    }
    const initialSession: ChatSession = {
      id: 'session-' + Date.now(),
      title: 'New Chat',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: []
    };
    return [initialSession];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    const savedId = localStorage.getItem(STORAGE_KEY_CURRENT_ID);
    return savedId || sessions[0]?.id || 'session-' + Date.now();
  });

  // UI state
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Attachment state (Image upload / camera)
  const [attachedImage, setAttachedImage] = useState<{
    data: string;
    mimeType: string;
    fileName: string;
  } | null>(null);

  // Webcam modal state
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Speech-to-Text (STT) state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Text-to-Speech (TTS) state
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  // Copy status tracking
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  // Auto-scroll ref
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Find active session
  const activeSession = sessions.find(s => s.id === currentSessionId) || sessions[0];

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
      localStorage.setItem(STORAGE_KEY_CURRENT_ID, currentSessionId);
    } catch (e) {
      console.warn('Failed to save chat sessions', e);
    }
  }, [sessions, currentSessionId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isLoading]);

  // Handle textarea auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputMessage]);

  // Close webcam stream on unmount or modal close
  useEffect(() => {
    if (!isCameraModalOpen && cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  }, [isCameraModalOpen, cameraStream]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  // -------------------------------------------------------------
  // Session Management
  // -------------------------------------------------------------
  const handleCreateNewChat = () => {
    const newSession: ChatSession = {
      id: 'session-' + Date.now(),
      title: 'New Chat',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: []
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setInputMessage('');
    setAttachedImage(null);
    setErrorBanner(null);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      // Clear messages instead of deleting the last one
      setSessions([{
        id: 'session-' + Date.now(),
        title: 'New Chat',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: []
      }]);
      setCurrentSessionId('session-' + Date.now());
      return;
    }
    const filtered = sessions.filter(s => s.id !== sessionId);
    setSessions(filtered);
    if (currentSessionId === sessionId) {
      setCurrentSessionId(filtered[0]?.id || '');
    }
  };

  // -------------------------------------------------------------
  // Image Upload & Webcam Handling
  // -------------------------------------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAttachedImage({
        data: result,
        mimeType: file.type,
        fileName: file.name
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleStartCamera = async () => {
    setIsCameraModalOpen(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      try {
        // Fallback to default user camera
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStream(fallbackStream);
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
        }
      } catch (fallbackErr) {
        setCameraError('Camera access was blocked or is unavailable in this browser environment. You can upload an image file instead.');
      }
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      setAttachedImage({
        data: dataUrl,
        mimeType: 'image/jpeg',
        fileName: `camera_snapshot_${Date.now()}.jpg`
      });
    }
    // Stop camera stream & close modal
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      setCameraStream(null);
    }
    setIsCameraModalOpen(false);
  };

  // -------------------------------------------------------------
  // Voice Input (Speech-to-Text)
  // -------------------------------------------------------------
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      // You can set to 'en-IN' or 'hi-IN' or let browser handle default
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInputMessage(prev => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  // -------------------------------------------------------------
  // Voice Output (Text-to-Speech)
  // -------------------------------------------------------------
  const handleToggleSpeech = (messageId: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown symbols for natural speech
    const cleanText = text
      .replace(/```[\s\S]*?```/g, 'Code block omitted.')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[#*_~>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Auto-detect language script for TTS voice accent
    if (/[\u0900-\u097F]/.test(cleanText)) {
      utterance.lang = 'hi-IN'; // Hindi
    } else if (/[\u0C00-\u0C7F]/.test(cleanText)) {
      utterance.lang = 'te-IN'; // Telugu
    } else if (/[\u0B80-\u0BFF]/.test(cleanText)) {
      utterance.lang = 'ta-IN'; // Tamil
    } else if (/[\u0980-\u09FF]/.test(cleanText)) {
      utterance.lang = 'bn-IN'; // Bengali
    } else if (/[\u0C80-\u0CFF]/.test(cleanText)) {
      utterance.lang = 'kn-IN'; // Kannada
    } else if (/[\u0D00-\u0D7F]/.test(cleanText)) {
      utterance.lang = 'ml-IN'; // Malayalam
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setSpeakingMessageId(messageId);
    };

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // -------------------------------------------------------------
  // Copy to Clipboard
  // -------------------------------------------------------------
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  const handleCopyCode = (code: string, idx: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => {
      setCopiedCodeIndex(null);
    }, 2000);
  };

  // -------------------------------------------------------------
  // Send Message / Call Gemini API
  // -------------------------------------------------------------
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt !== undefined ? customPrompt : inputMessage).trim();
    if ((!textToSend && !attachedImage) || isLoading) return;

    setErrorBanner(null);

    // Build user message
    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend,
      image: attachedImage ? { ...attachedImage } : undefined,
      timestamp: Date.now()
    };

    // Auto-generate title from first message
    const isFirstMessage = activeSession.messages.length === 0;
    let newTitle = activeSession.title;
    if (isFirstMessage) {
      newTitle = textToSend
        ? textToSend.slice(0, 32) + (textToSend.length > 32 ? '...' : '')
        : 'Image Query';
    }

    const updatedMessages = [...activeSession.messages, userMessage];

    // Update active session locally
    setSessions(prev =>
      prev.map(s =>
        s.id === activeSession.id
          ? {
              ...s,
              title: newTitle,
              updatedAt: Date.now(),
              messages: updatedMessages
            }
          : s
      )
    );

    setInputMessage('');
    setAttachedImage(null);
    setIsLoading(true);

    try {
      // Build student background context
      const studentContext = profile
        ? {
            name: profile.name,
            educationLevel: profile.educationLevel,
            streamOrGroup: profile.streamOrGroup,
            specialization: profile.specialization,
            boardOrUniversity: profile.boardOrUniversity,
            careerGoals: profile.careerGoals,
            assessmentSummary:
              assessmentResults.length > 0
                ? assessmentResults
                    .slice(0, 3)
                    .map(r => `${r.assessmentTitle}: ${r.percentage}%`)
                    .join(', ')
                : undefined
          }
        : undefined;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
            image: m.image
              ? {
                  data: m.image.data,
                  mimeType: m.image.mimeType
                }
              : undefined
          })),
          studentContext
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429 || data.isRateLimit) {
          throw new Error('Rate limit reached. The AI service is experiencing high traffic. Please wait a moment and try again.');
        }
        throw new Error(data.error || 'Failed to get a response from the AI assistant.');
      }

      const aiReply = data.reply || 'I am ready to help you. What would you like to explore next?';

      const assistantMessage: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: aiReply,
        timestamp: Date.now()
      };

      setSessions(prev =>
        prev.map(s =>
          s.id === activeSession.id
            ? {
                ...s,
                updatedAt: Date.now(),
                messages: [...updatedMessages, assistantMessage]
              }
            : s
        )
      );
    } catch (err: any) {
      console.error('Chat error:', err);
      const friendlyMsg = 'PathFinder is experiencing high traffic right now. Please try again in a few moments.';
      setErrorBanner(friendlyMsg);

      // Add a friendly error response in the chat with a Retry action
      const fallbackAssistantMessage: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'assistant',
        content: `⚠️ **${friendlyMsg}**\n\n*Click the Regenerate button below or re-send your message to try again.*`,
        timestamp: Date.now()
      };

      setSessions(prev =>
        prev.map(s =>
          s.id === activeSession.id
            ? {
                ...s,
                updatedAt: Date.now(),
                messages: [...updatedMessages, fallbackAssistantMessage]
              }
            : s
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Regenerate Response
  // -------------------------------------------------------------
  const handleRegenerate = async () => {
    if (isLoading || activeSession.messages.length === 0) return;

    // Find the last assistant message and remove it
    const lastMsg = activeSession.messages[activeSession.messages.length - 1];
    let messagesForApi = [...activeSession.messages];

    if (lastMsg.role === 'assistant') {
      messagesForApi.pop();
    }

    if (messagesForApi.length === 0) return;

    setIsLoading(true);
    setErrorBanner(null);

    // Update UI immediately
    setSessions(prev =>
      prev.map(s =>
        s.id === activeSession.id
          ? {
              ...s,
              updatedAt: Date.now(),
              messages: messagesForApi
            }
          : s
      )
    );

    try {
      const studentContext = profile
        ? {
            name: profile.name,
            educationLevel: profile.educationLevel,
            streamOrGroup: profile.streamOrGroup,
            specialization: profile.specialization,
            boardOrUniversity: profile.boardOrUniversity,
            careerGoals: profile.careerGoals
          }
        : undefined;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messagesForApi.map(m => ({
            role: m.role,
            content: m.content,
            image: m.image
              ? {
                  data: m.image.data,
                  mimeType: m.image.mimeType
                }
              : undefined
          })),
          studentContext
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to regenerate response.');
      }

      const freshReply = data.reply || '';
      const assistantMessage: ChatMessage = {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: freshReply,
        timestamp: Date.now()
      };

      setSessions(prev =>
        prev.map(s =>
          s.id === activeSession.id
            ? {
                ...s,
                updatedAt: Date.now(),
                messages: [...messagesForApi, assistantMessage]
              }
            : s
        )
      );
    } catch (err: any) {
      setErrorBanner(err.message || 'Failed to regenerate answer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden bg-[#FAF6F0] text-[#2D2226]">
      {/* --------------------------------------------------------- */}
      {/* LEFT SIDEBAR: Chat History & New Chat                     */}
      {/* --------------------------------------------------------- */}
      <aside
        className={`${
          isSidebarOpen ? 'w-72' : 'w-0 -translate-x-full md:translate-x-0 md:w-0'
        } transition-all duration-200 ease-in-out shrink-0 bg-[#F4EBE1] border-r border-[#D5A3AE]/50 flex flex-col z-20 overflow-hidden select-none`}
      >
        {/* New Chat Button */}
        <div className="p-3 border-b border-[#D5A3AE]/40">
          <button
            onClick={handleCreateNewChat}
            className="w-full py-2.5 px-3.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#722F45]/70">
            Recent Conversations
          </div>

          {sessions.map(s => {
            const isActive = s.id === activeSession.id;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#E8D5C4] text-[#722F45] font-semibold shadow-xs border border-[#D5A3AE]/60'
                    : 'text-[#4A383E] hover:bg-[#E8D5C4]/50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#722F45]' : 'text-[#8C7078]'}`} />
                  <span className="truncate max-w-[150px]">{s.title || 'Untitled Chat'}</span>
                </div>

                <button
                  onClick={(e) => handleDeleteSession(s.id, e)}
                  title="Delete chat"
                  className="opacity-0 group-hover:opacity-100 hover:text-red-600 p-1 rounded transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Profile Context Indicator at Bottom */}
        {profile && (
          <div className="p-3 border-t border-[#D5A3AE]/40 bg-[#EDE0D4] text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#722F45] text-white flex items-center justify-center font-bold text-xs">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#722F45] truncate text-[11px]">{profile.name}</p>
                <p className="text-[10px] text-[#6C555C] truncate">
                  {profile.specialization || profile.streamOrGroup || profile.educationLevel}
                </p>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-[#722F45]/80 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#722F45]" />
              <span>Context synced with Gemini</span>
            </div>
          </div>
        )}
      </aside>

      {/* --------------------------------------------------------- */}
      {/* MAIN CHAT AREA                                            */}
      {/* --------------------------------------------------------- */}
      <section className="flex-1 flex flex-col min-w-0 relative bg-white">
        
        {/* Top Header Bar */}
        <header className="h-14 border-b border-[#E8D5C4] px-4 flex items-center justify-between bg-white/90 backdrop-blur-xs sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-2 rounded-lg text-[#722F45] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
              title={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
            >
              {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#722F45] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
                AI
              </div>
              <div>
                <h1 className="text-sm font-bold text-[#722F45] leading-tight">
                  {activeSession?.title || 'AI Chat'}
                </h1>
                <p className="text-[10px] text-[#6C555C]">
                  Powered by Gemini • Multilingual (Hindi, Telugu, Tamil &amp; all Indian languages)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateNewChat}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#722F45] bg-[#FAF6F0] hover:bg-[#E8D5C4]/50 border border-[#D5A3AE]/50 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New</span>
            </button>
          </div>
        </header>

        {/* Error Notification Banner */}
        {errorBanner && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-900 shrink-0">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{errorBanner}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRegenerate}
                className="px-2.5 py-1 rounded-md bg-amber-700 hover:bg-amber-800 text-white font-bold text-[11px] shadow-xs cursor-pointer flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
              <button
                onClick={() => setErrorBanner(null)}
                className="p-1 text-amber-700 hover:text-amber-900 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Messages Stream Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeSession.messages.length === 0 ? (
            /* Empty State / Welcome Screen */
            <div className="max-w-2xl mx-auto py-8 sm:py-12 text-center space-y-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#722F45] text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#722F45] font-serif-accent">
                  How can I help you today?
                </h2>
                <p className="text-xs sm:text-sm text-[#6C555C] max-w-lg mx-auto leading-relaxed">
                  Ask anything across Math, Science, Coding, Exam Prep, or Career planning.
                  Ask in English, Hindi (हिंदी), Telugu (తెలుగు), Tamil (தமிழ்), or any Indian language.
                </p>
              </div>

              {/* Indian Language Badges */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                {['English', '🇮🇳 हिंदी', 'తెలుగు', 'தமிழ்', 'বাংলা', 'मराठी', 'ಕನ್ನಡ', 'ગુજરાતી', 'മലയാളം'].map(lang => (
                  <span
                    key={lang}
                    className="px-2.5 py-1 rounded-full bg-[#FAF6F0] border border-[#D5A3AE]/50 text-[#722F45] text-[11px] font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Quick Starter Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 text-left">
                {QUICK_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.text)}
                    className="p-3.5 rounded-2xl bg-[#FAF6F0] hover:bg-[#F2E8DC] border border-[#E8D5C4] hover:border-[#722F45]/30 text-xs text-[#2D2226] transition-all text-left group shadow-2xs cursor-pointer flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] mb-1">
                      {item.label}
                    </span>
                    <span className="line-clamp-2 text-[#4A383E] group-hover:text-[#722F45] font-medium">
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Render Messages */
            <div className="max-w-3xl mx-auto space-y-6">
              {activeSession.messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                const isSpeaking = speakingMessageId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 sm:gap-4 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Assistant Avatar */}
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-1">
                        AI
                      </div>
                    )}

                    {/* Message Bubble Content */}
                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#722F45] text-white rounded-tr-xs shadow-xs'
                          : 'bg-[#FAF6F0] text-[#2D2226] border border-[#E8D5C4] rounded-tl-xs shadow-2xs'
                      }`}
                    >
                      {/* Attached Image Thumbnail (if any) */}
                      {msg.image && (
                        <div className="mb-3">
                          <img
                            src={msg.image.data}
                            alt="Uploaded attachment"
                            className="max-h-64 rounded-xl border border-white/20 object-contain shadow-xs bg-black/10"
                          />
                          {msg.image.fileName && (
                            <p className={`text-[10px] mt-1 ${isUser ? 'text-white/70' : 'text-[#6C555C]'}`}>
                              {msg.image.fileName}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Message Body */}
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none prose-headings:text-[#722F45] prose-headings:font-bold prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                const codeString = String(children).replace(/\n$/, '');
                                const codeId = `${msg.id}-${index}-${codeString.slice(0, 10)}`;

                                return !inline ? (
                                  <div className="my-3 rounded-xl overflow-hidden border border-[#D5A3AE]/50 bg-[#1F171A] text-white">
                                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#171012] border-b border-white/10 text-[11px] text-white/70">
                                      <span>{match ? match[1] : 'code'}</span>
                                      <button
                                        onClick={() => handleCopyCode(codeString, codeId)}
                                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                                      >
                                        {copiedCodeIndex === codeId ? (
                                          <>
                                            <Check className="w-3 h-3 text-emerald-400" />
                                            <span className="text-emerald-400">Copied!</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                    <pre className="p-3.5 overflow-x-auto text-xs font-mono leading-relaxed">
                                      <code>{children}</code>
                                    </pre>
                                  </div>
                                ) : (
                                  <code className="px-1.5 py-0.5 rounded bg-[#E8D5C4]/60 text-[#722F45] font-mono text-xs" {...props}>
                                    {children}
                                  </code>
                                );
                              },
                              table({ children }) {
                                return (
                                  <div className="overflow-x-auto my-3 border border-[#D5A3AE]/50 rounded-xl">
                                    <table className="min-w-full divide-y divide-[#D5A3AE]/50 text-xs">
                                      {children}
                                    </table>
                                  </div>
                                );
                              },
                              th({ children }) {
                                return (
                                  <th className="px-3 py-2 bg-[#E8D5C4]/40 font-bold text-[#722F45] text-left">
                                    {children}
                                  </th>
                                );
                              },
                              td({ children }) {
                                return (
                                  <td className="px-3 py-2 border-t border-[#D5A3AE]/30">
                                    {children}
                                  </td>
                                );
                              }
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}

                      {/* Action Toolbar on AI Responses */}
                      {!isUser && (
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E8D5C4] text-[#6C555C] text-xs">
                          {/* Copy Button */}
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="flex items-center gap-1 hover:text-[#722F45] p-1 rounded-md transition-colors cursor-pointer"
                            title="Copy answer"
                          >
                            {copiedMessageId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-[11px] text-emerald-600 font-medium">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[11px]">Copy</span>
                              </>
                            )}
                          </button>

                          {/* Text-to-Speech Button */}
                          <button
                            onClick={() => handleToggleSpeech(msg.id, msg.content)}
                            className={`flex items-center gap-1 p-1 rounded-md transition-colors cursor-pointer ${
                              isSpeaking ? 'text-[#722F45] font-semibold bg-[#E8D5C4]/50' : 'hover:text-[#722F45]'
                            }`}
                            title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
                          >
                            {isSpeaking ? (
                              <>
                                <StopCircle className="w-3.5 h-3.5 text-[#722F45] animate-pulse" />
                                <span className="text-[11px] text-[#722F45]">Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5" />
                                <span className="text-[11px]">Listen</span>
                              </>
                            )}
                          </button>

                          {/* Regenerate Button on Latest AI Message */}
                          {index === activeSession.messages.length - 1 && (
                            <button
                              onClick={handleRegenerate}
                              className="flex items-center gap-1 hover:text-[#722F45] p-1 rounded-md transition-colors cursor-pointer ml-auto"
                              title="Regenerate answer"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Regenerate</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* User Avatar */}
                    {isUser && (
                      <div className="w-8 h-8 rounded-xl bg-[#E8D5C4] text-[#722F45] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-1 border border-[#D5A3AE]">
                        {profile?.name ? profile.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Three-dots Generating / Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3 sm:gap-4 justify-start">
                  <div className="w-8 h-8 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-1">
                    AI
                  </div>
                  <div className="bg-[#FAF6F0] rounded-2xl rounded-tl-xs p-4 border border-[#E8D5C4] shadow-2xs flex items-center gap-2">
                    <span className="text-xs text-[#722F45] font-medium mr-1">Generating answer</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#722F45] animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#722F45] animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#722F45] animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* --------------------------------------------------------- */}
        {/* FIXED BOTTOM MESSAGE INPUT BOX                            */}
        {/* --------------------------------------------------------- */}
        <footer className="p-3 sm:p-4 bg-white border-t border-[#E8D5C4] shrink-0">
          <div className="max-w-3xl mx-auto space-y-2">
            
            {/* Attached Image Preview Chip (if any) */}
            {attachedImage && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#D5A3AE]/60 w-fit text-xs text-[#722F45]">
                <img
                  src={attachedImage.data}
                  alt="Attachment preview"
                  className="w-7 h-7 rounded-md object-cover border border-[#D5A3AE]"
                />
                <span className="truncate max-w-[180px] font-medium">{attachedImage.fileName}</span>
                <button
                  onClick={() => setAttachedImage(null)}
                  className="p-1 rounded-full hover:bg-[#E8D5C4] text-[#722F45] cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Hidden File Input for Image Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Input Bar */}
            <div className="relative flex items-end gap-2 bg-[#FAF6F0] border border-[#D5A3AE]/70 focus-within:border-[#722F45] rounded-2xl p-2 transition-all shadow-xs">
              
              {/* Media Action Buttons: Camera & File Upload */}
              <div className="flex items-center gap-1 pb-1 pl-1">
                {/* Take Photo with Webcam */}
                <button
                  type="button"
                  onClick={handleStartCamera}
                  className="p-2 rounded-xl text-[#722F45] hover:bg-[#E8D5C4]/60 transition-colors cursor-pointer"
                  title="Take photo with webcam"
                >
                  <Camera className="w-4 h-4" />
                </button>

                {/* Upload Image File */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-xl text-[#722F45] hover:bg-[#E8D5C4]/60 transition-colors cursor-pointer"
                  title="Upload image or textbook problem"
                >
                  <Upload className="w-4 h-4" />
                </button>

                {/* Microphone Button (Speech-to-Text) */}
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'text-[#722F45] hover:bg-[#E8D5C4]/60'
                  }`}
                  title={isListening ? 'Stop listening' : 'Voice input (Speech-to-Text)'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>

              {/* Textarea Input */}
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  isListening
                    ? 'Listening... speak now'
                    : 'Ask anything in English, Hindi, Telugu, Tamil, etc. (Enter to send, Shift+Enter for newline)'
                }
                className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-hidden resize-none py-2 text-sm text-[#2D2226] placeholder-[#8C7078] max-h-44"
              />

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={(!inputMessage.trim() && !attachedImage) || isLoading}
                className="p-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] disabled:opacity-40 disabled:hover:bg-[#722F45] text-white transition-all shadow-xs shrink-0 cursor-pointer disabled:cursor-not-allowed mb-0.5"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Disclaimer & Privacy notice */}
            <div className="flex items-center justify-between text-[11px] text-[#8C7078] px-1">
              <span>Unlimited chat • Ask in any Indian language • Math step-by-step</span>
              {isListening && (
                <span className="text-rose-600 font-semibold flex items-center gap-1 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  Listening to microphone...
                </span>
              )}
            </div>
          </div>
        </footer>
      </section>

      {/* --------------------------------------------------------- */}
      {/* WEBCAM CAMERA MODAL                                       */}
      {/* --------------------------------------------------------- */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D5A3AE]">
            <div className="p-4 border-b border-[#E8D5C4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#722F45]" />
                <h3 className="font-bold text-sm text-[#722F45]">Take Photo with Webcam</h3>
              </div>
              <button
                onClick={() => setIsCameraModalOpen(false)}
                className="p-1 rounded-lg text-[#6C555C] hover:text-[#722F45]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {cameraError ? (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-4">
                  <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    {cameraError}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCameraModalOpen(false);
                      fileInputRef.current?.click();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold shadow-xs inline-flex items-center gap-2 cursor-pointer mx-auto"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Image Instead</span>
                  </button>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCameraModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#D5A3AE] text-xs font-semibold text-[#722F45] hover:bg-[#FAF6F0]"
                >
                  Close
                </button>
                {!cameraError && (
                  <button
                    type="button"
                    onClick={handleCapturePhoto}
                    className="px-5 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Photo</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
