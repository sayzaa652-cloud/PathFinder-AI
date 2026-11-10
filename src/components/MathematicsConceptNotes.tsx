import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, Sparkles, Filter, Pin, ArrowRight, 
  X, ExternalLink, Layers, Lightbulb, Copy, Check, 
  Bot, Youtube, Globe, Send, RefreshCw,
  GraduationCap, Network, GitBranch, CheckCircle2, Bookmark
} from 'lucide-react';
import { 
  OFFICIAL_TGBIE_MATH_NOTES, 
  MATH_IA_MIND_MAPS,
  MathStickyNote, 
  ChapterMindMap,
  TGBIE_SUBJECTS_METADATA 
} from '../data/mathStickyNotesData';

interface MathematicsConceptNotesProps {
  initialPaper?: 'Mathematics IA' | 'Mathematics IB' | 'Mathematics IIA' | 'Mathematics IIB';
  onLaunchAssessment?: (specialization: string) => void;
}

export const MathematicsConceptNotes: React.FC<MathematicsConceptNotesProps> = ({
  initialPaper = 'Mathematics IA',
  onLaunchAssessment
}) => {
  // Navigation State
  const [selectedStream, setSelectedStream] = useState<'Intermediate MPC' | 'Intermediate BiPC'>('Intermediate MPC');
  const [selectedYear, setSelectedYear] = useState<'1st Year' | '2nd Year'>('1st Year');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialPaper);
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [displayMode, setDisplayMode] = useState<'stickyNotes' | 'mindMaps'>('stickyNotes');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'withFormula' | 'withExample' | 'pinned'>('all');

  // Pinned Notes State
  const [pinnedNoteIds, setPinnedNoteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pathfinder_pinned_tgbie_math_notes');
      return saved ? JSON.parse(saved) : ['ia_ch1_01', 'ia_ch2_01', 'ia_ch3_01', 'ia_ch5_01', 'ia_ch7_01'];
    } catch {
      return ['ia_ch1_01', 'ia_ch2_01', 'ia_ch3_01', 'ia_ch5_01', 'ia_ch7_01'];
    }
  });

  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // AI Learning Support Modal State
  const [aiTutorNote, setAiTutorNote] = useState<MathStickyNote | null>(null);
  const [aiChatMessages, setAiChatMessages] = useState<{ sender: 'user' | 'ai'; text: string; timestamp: string }[]>([]);
  const [aiQuestionInput, setAiQuestionInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Pin Toggle
  const togglePinNote = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPinnedNoteIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('pathfinder_pinned_tgbie_math_notes', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Formula Copy
  const copyFormula = (formula: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(formula);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  // Open AI Tutor Modal with Socratic Initial Greeting
  const handleOpenAiTutor = (note: MathStickyNote, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAiTutorNote(note);
    setAiChatMessages([
      {
        sender: 'ai',
        text: `Hello! I am your PathFinder Socratic AI Tutor for **${note.originalConceptName}** (${note.subject}, ${note.chapterName}).\n\nI can explain this concept simply, give you problem-solving hints, or quiz you with a short practice question. What would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setAiQuestionInput('');
  };

  // Send AI Tutor Question
  const handleSendAiQuestion = async (customPrompt?: string) => {
    const questionText = (customPrompt || aiQuestionInput).trim();
    if (!questionText || !aiTutorNote || aiLoading) return;

    const userMsg = {
      sender: 'user' as const,
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatMessages(prev => [...prev, userMsg]);
    setAiQuestionInput('');
    setAiLoading(true);

    try {
      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: `${aiTutorNote.originalConceptName} (${aiTutorNote.chapterName})`,
          subject: `${aiTutorNote.subject} (${aiTutorNote.year}, Telangana Board Intermediate)`,
          userQuestion: `Regarding concept "${aiTutorNote.originalConceptName}" with meaning "${aiTutorNote.whatIsIt}" and formula "${aiTutorNote.formula || 'None'}": ${questionText}. Please follow Socratic principles: explain in simple English, give hints before providing complete answers, do not invent syllabus topics, and encourage me to verify with my learning resources.`,
          conversationHistory: aiChatMessages.map(m => ({
            sender: m.sender === 'ai' ? 'ai_mentor' : 'student',
            text: m.text
          }))
        })
      });

      const data = await res.json();
      const reply = data.reply || 'Here is a hint: examine the standard syllabus rule and write down the given terms first!';

      setAiChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setAiChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Here is a Socratic hint for **${aiTutorNote.originalConceptName}**: Break the problem down into given variables and what you need to find. Remember: \`${aiTutorNote.rememberTip}\`. Also verify with the provided YouTube and TGBIE resources!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Available subjects for selected stream & year
  const availableSubjects = useMemo(() => {
    return TGBIE_SUBJECTS_METADATA[selectedStream]?.[selectedYear] || [];
  }, [selectedStream, selectedYear]);

  // Adjust selectedSubject when stream or year changes
  React.useEffect(() => {
    if (selectedStream === 'Intermediate MPC') {
      if (selectedYear === '1st Year' && !['Mathematics IA', 'Mathematics IB'].includes(selectedSubject)) {
        setSelectedSubject('Mathematics IA');
      } else if (selectedYear === '2nd Year' && !['Mathematics IIA', 'Mathematics IIB'].includes(selectedSubject)) {
        setSelectedSubject('Mathematics IIA');
      }
    }
    setSelectedChapter('all');
  }, [selectedStream, selectedYear]);

  // Filter notes based on selection
  const filteredNotes = useMemo(() => {
    return OFFICIAL_TGBIE_MATH_NOTES.filter(note => {
      // Must match stream, year, subject
      if (note.stream !== selectedStream) return false;
      if (note.year !== selectedYear) return false;
      if (note.subject !== selectedSubject) return false;

      // Chapter filter
      if (selectedChapter !== 'all' && note.chapterNumber !== selectedChapter) return false;

      // Pinned filter
      if (filterType === 'pinned' && !pinnedNoteIds.includes(note.id)) return false;

      // Formula filter
      if (filterType === 'withFormula' && !note.formula) return false;

      // Example filter
      if (filterType === 'withExample' && !note.example) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = note.originalConceptName.toLowerCase().includes(query);
        const matchMeaning = note.whatIsIt.toLowerCase().includes(query);
        const matchFormula = note.formula?.toLowerCase().includes(query);
        const matchChapter = note.chapterName.toLowerCase().includes(query);
        const matchEx = note.example?.toLowerCase().includes(query);
        const matchTip = note.rememberTip.toLowerCase().includes(query);
        if (!matchName && !matchMeaning && !matchFormula && !matchChapter && !matchEx && !matchTip) {
          return false;
        }
      }

      return true;
    });
  }, [selectedStream, selectedYear, selectedSubject, selectedChapter, searchQuery, filterType, pinnedNoteIds]);

  // Distinct chapters for active subject
  const subjectChapters = useMemo(() => {
    const chapterMap = new Map<number, string>();
    OFFICIAL_TGBIE_MATH_NOTES.forEach(n => {
      if (n.stream === selectedStream && n.year === selectedYear && n.subject === selectedSubject) {
        if (!chapterMap.has(n.chapterNumber)) {
          chapterMap.set(n.chapterNumber, n.chapterName);
        }
      }
    });

    // If Mathematics IA, ensure all 12 chapters are present in the list
    if (selectedSubject === 'Mathematics IA') {
      const iaChapters: [number, string][] = [
        [1, 'Sets and Relations'],
        [2, 'Functions'],
        [3, 'Sequences and Series'],
        [4, 'Mathematical Induction'],
        [5, 'Matrices'],
        [6, 'Addition of Vectors'],
        [7, 'Product of Vectors'],
        [8, 'Trigonometric Ratios and Transformations'],
        [9, 'Trigonometric Equations'],
        [10, 'Inverse Trigonometric Functions'],
        [11, 'Hyperbolic Functions'],
        [12, 'Properties of Triangles']
      ];
      iaChapters.forEach(([num, name]) => {
        if (!chapterMap.has(num)) chapterMap.set(num, name);
      });
    }

    return Array.from(chapterMap.entries())
      .map(([num, name]) => ({ num, name }))
      .sort((a, b) => a.num - b.num);
  }, [selectedStream, selectedYear, selectedSubject]);

  // Color schemes for digital sticky notes
  const colorStyles: Record<MathStickyNote['stickyColor'], {
    bg: string;
    border: string;
    badge: string;
    accent: string;
  }> = {
    yellow: {
      bg: 'bg-[#FEF9C3] hover:bg-[#FEF08A]/90',
      border: 'border-[#FDE047]/90',
      badge: 'bg-[#FACC15]/40 text-[#713F12]',
      accent: 'text-[#854D0E]'
    },
    mint: {
      bg: 'bg-[#DCFCE7] hover:bg-[#BBF7D0]/90',
      border: 'border-[#86EFAC]/90',
      badge: 'bg-[#86EFAC]/40 text-[#14532D]',
      accent: 'text-[#166534]'
    },
    blue: {
      bg: 'bg-[#E0F2FE] hover:bg-[#BAE6FD]/90',
      border: 'border-[#7DD3FC]/90',
      badge: 'bg-[#7DD3FC]/40 text-[#0C4A6E]',
      accent: 'text-[#075985]'
    },
    lavender: {
      bg: 'bg-[#F3E8FF] hover:bg-[#E9D5FF]/90',
      border: 'border-[#D8B4FE]/90',
      badge: 'bg-[#D8B4FE]/40 text-[#581C87]',
      accent: 'text-[#6B21A8]'
    },
    peach: {
      bg: 'bg-[#FFE4E6] hover:bg-[#FECDD3]/90',
      border: 'border-[#FDA4AF]/90',
      badge: 'bg-[#FDA4AF]/40 text-[#881337]',
      accent: 'text-[#9F1239]'
    },
    lime: {
      bg: 'bg-[#ECFCCB] hover:bg-[#D9F99D]/90',
      border: 'border-[#BEF264]/90',
      badge: 'bg-[#BEF264]/40 text-[#365314]',
      accent: 'text-[#3F6212]'
    },
    amber: {
      bg: 'bg-[#FEF3C7] hover:bg-[#FDE68A]/90',
      border: 'border-[#FCD34D]/90',
      badge: 'bg-[#FCD34D]/40 text-[#78350F]',
      accent: 'text-[#92400E]'
    }
  };

  return (
    <div className="space-y-6">

      {/* Official Syllabus Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-linear-to-r from-[#FAF4EE] via-[#FFF9F2] to-[#FAF4EE] border-2 border-[#D5A3AE]/70 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-3 py-1 rounded-full border border-[#D5A3AE]">
                Telangana Intermediate 1st Year (2026–27)
              </span>
              <a
                href="https://tgbie.cgg.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#722F45] bg-white px-2.5 py-1 rounded-full border border-[#D5A3AE]/60 hover:bg-[#D5A3AE]/20 transition-colors flex items-center gap-1.5"
                title="Primary official syllabus reference"
              >
                <span>tgbie.cgg.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-xs font-bold text-emerald-950 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                Mathematics IA — Complete 12 Chapters
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#722F45] font-serif-accent">
              Mathematics IA Concept Notes &amp; Mind Maps
            </h2>
            <p className="text-xs text-[#5A454C] leading-relaxed">
              Covering all 12 official TGBIE chapters for 1st Year Mathematics IA: <strong>Sets &amp; Relations, Functions, Sequences &amp; Series, Mathematical Induction, Matrices, Addition of Vectors, Product of Vectors, Trigonometric Transformations, Trigonometric Equations, Inverse Trig Functions, Hyperbolic Functions, and Properties of Triangles.</strong>
            </p>
          </div>

          {/* View Mode Switcher: Sticky Notes vs Chapter Mind Maps */}
          <div className="flex items-center p-1.5 rounded-2xl bg-[#E8D5C4]/80 border-2 border-[#D5A3AE] shadow-inner shrink-0">
            <button
              onClick={() => setDisplayMode('stickyNotes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                displayMode === 'stickyNotes'
                  ? 'bg-[#722F45] text-white shadow-md'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-white/40'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Digital Sticky Notes</span>
            </button>

            <button
              onClick={() => setDisplayMode('mindMaps')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                displayMode === 'mindMaps'
                  ? 'bg-[#722F45] text-white shadow-md'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-white/40'
              }`}
            >
              <GitBranch className="w-4 h-4 text-amber-300" />
              <span>Chapter Mind Maps</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar: Stream, Year, Subject & Chapter Selector */}
      <div className="p-4 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 space-y-4 shadow-xs">
        
        {/* Row 1: Academic Stream & Year Switcher */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D5A3AE]/50 shadow-2xs">
              {(['Intermediate MPC', 'Intermediate BiPC'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStream(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    selectedStream === st
                      ? 'bg-[#722F45] text-white shadow-xs'
                      : 'text-[#5A454C] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D5A3AE]/50 shadow-2xs">
              {(['1st Year', '2nd Year'] as const).map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-[#722F45] text-white shadow-xs'
                      : 'text-[#5A454C] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-[#722F45] mr-1">Subject:</span>
            {availableSubjects.map(subj => {
              const isSelected = selectedSubject === subj;
              const isMath = subj.startsWith('Mathematics');
              return (
                <button
                  key={subj}
                  onClick={() => {
                    if (isMath) setSelectedSubject(subj);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#722F45] text-white shadow-xs cursor-pointer'
                      : isMath
                      ? 'bg-white border border-[#D5A3AE]/60 text-[#2D2226] hover:bg-[#D5A3AE]/20 cursor-pointer'
                      : 'bg-gray-100/70 border border-gray-200 text-gray-500 cursor-not-allowed opacity-75'
                  }`}
                >
                  <span>{subj}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Search Bar & Quick Filters (only for Sticky Notes mode) */}
        {displayMode === 'stickyNotes' && (
          <div className="pt-2 border-t border-[#D5A3AE]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#722F45] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${selectedSubject} concepts by keyword, formula, tip, or topic...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#D5A3AE]/60 text-xs text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]/30 placeholder:text-[#6C555C]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-[#722F45] text-white shadow-xs'
                    : 'bg-white border border-[#D5A3AE]/50 text-[#5A454C] hover:bg-[#D5A3AE]/20'
                }`}
              >
                All ({filteredNotes.length})
              </button>

              <button
                onClick={() => setFilterType('withFormula')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'withFormula'
                    ? 'bg-[#722F45] text-white shadow-xs'
                    : 'bg-white border border-[#D5A3AE]/50 text-[#5A454C] hover:bg-[#D5A3AE]/20'
                }`}
              >
                Formulas
              </button>

              <button
                onClick={() => setFilterType('withExample')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'withExample'
                    ? 'bg-[#722F45] text-white shadow-xs'
                    : 'bg-white border border-[#D5A3AE]/50 text-[#5A454C] hover:bg-[#D5A3AE]/20'
                }`}
              >
                Examples
              </button>

              <button
                onClick={() => setFilterType('pinned')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filterType === 'pinned'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-[#D5A3AE]/50 text-[#5A454C] hover:bg-[#D5A3AE]/20'
                }`}
              >
                <Pin className="w-3 h-3 fill-current" />
                <span>Pinned ({pinnedNoteIds.length})</span>
              </button>
            </div>
          </div>
        )}

        {/* Row 3: Chapter Carousel Pills in Exact 12-Chapter Order */}
        {subjectChapters.length > 0 && (
          <div className="pt-2 border-t border-[#D5A3AE]/30 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[11px] font-bold text-[#722F45] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Chapters:
            </span>

            <button
              onClick={() => setSelectedChapter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                selectedChapter === 'all'
                  ? 'bg-[#722F45] text-white'
                  : 'bg-white/80 border border-[#D5A3AE]/40 text-[#2D2226] hover:bg-[#D5A3AE]/20'
              }`}
            >
              All 12 Chapters
            </button>

            {subjectChapters.map(ch => {
              const isSelected = selectedChapter === ch.num;
              return (
                <button
                  key={ch.num}
                  onClick={() => setSelectedChapter(isSelected ? 'all' : ch.num)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#722F45] text-white shadow-xs'
                      : 'bg-white/80 border border-[#D5A3AE]/40 text-[#2D2226] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  Ch {ch.num}: {ch.name}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODE 1: DIGITAL STICKY NOTES DISPLAY                                       */}
      {/* ========================================================================= */}
      {displayMode === 'stickyNotes' && (
        <>
          {filteredNotes.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#FAF4EE] border border-[#D5A3AE]/50 space-y-3">
              <BookOpen className="w-10 h-10 text-[#8C4057] mx-auto opacity-60" />
              <h3 className="font-bold text-base text-[#722F45]">No concept notes found</h3>
              <p className="text-xs text-[#6C555C]">
                Try adjusting your search query or reset the filter selection above.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedChapter('all');
                  setFilterType('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#722F45] text-white text-xs font-bold hover:bg-[#5C2436] cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => {
                const isPinned = pinnedNoteIds.includes(note.id);
                const theme = colorStyles[note.stickyColor];

                return (
                  <div
                    key={note.id}
                    className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between ${theme.bg} ${theme.border} ${note.rotation} hover:rotate-0`}
                  >
                    {/* Top Pin Graphic */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-xs opacity-85 shadow-2xs backdrop-blur-xs flex items-center justify-center border transition-opacity group-hover:opacity-100 z-10 select-none bg-amber-50/90 border-amber-200/80">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-xs border border-white" />
                    </div>

                    {/* Top Action Bar: Chapter Tag + Pin Button */}
                    <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${theme.badge}`}>
                        Ch {note.chapterNumber}: {note.chapterName}
                      </span>

                      <button
                        onClick={(e) => togglePinNote(note.id, e)}
                        title={isPinned ? 'Unpin Note' : 'Pin Note to Top'}
                        className={`p-1.5 rounded-lg transition-transform hover:scale-110 cursor-pointer ${
                          isPinned ? 'text-amber-700 bg-amber-200/60' : 'text-gray-400 hover:text-gray-700 bg-black/5'
                        }`}
                      >
                        <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="space-y-3">
                      {/* 1. Original Concept Name */}
                      <h3 className="text-base font-extrabold text-[#2D2226] leading-snug group-hover:text-[#722F45] transition-colors">
                        {note.originalConceptName}
                      </h3>

                      {/* 2. What is it? (1-2 sentences) */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                          What is it?
                        </span>
                        <p className="text-xs text-[#3D2C33] leading-relaxed font-medium">
                          {note.whatIsIt}
                        </p>
                      </div>

                      {/* 3. Important Formula (if applicable) */}
                      {note.formula && (
                        <div className="p-3 rounded-xl bg-white/95 border border-black/10 shadow-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-bold text-[#722F45] uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              Important Formula
                            </span>
                            <button
                              onClick={(e) => copyFormula(note.formula || '', note.id, e)}
                              title="Copy Formula"
                              className="text-gray-400 hover:text-[#722F45] cursor-pointer p-0.5 rounded"
                            >
                              {copiedFormulaId === note.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <div className="font-mono font-bold text-xs text-[#722F45] leading-relaxed break-words">
                            {note.formula}
                          </div>
                        </div>
                      )}

                      {/* 4. One Short Example (if useful) */}
                      {note.example && (
                        <div className="p-2.5 rounded-xl bg-black/5 border border-black/5 text-[11px] text-[#2D2226] leading-relaxed">
                          <strong className="text-[#722F45] font-bold">Example: </strong>
                          <span>{note.example}</span>
                        </div>
                      )}

                      {/* 5. Short Remember Tip */}
                      <div className="p-2.5 rounded-xl bg-amber-100/80 border border-amber-300/80 text-[11px] text-amber-950 flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Remember: </strong>
                          <span>{note.rememberTip}</span>
                        </div>
                      </div>

                      {/* Connected Learning Resources */}
                      {note.resources && note.resources.length > 0 && (
                        <div className="pt-2 border-t border-black/10 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C555C] block">
                            Learning Resources:
                          </span>
                          <div className="flex flex-col gap-1">
                            {note.resources.map((res, rIdx) => (
                              <a
                                key={rIdx}
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-1.5 rounded-lg bg-white/80 hover:bg-white border border-black/5 text-[11px] font-semibold text-[#722F45] transition-colors"
                              >
                                <span className="flex items-center gap-1.5 truncate">
                                  {res.type === 'youtube' ? (
                                    <Youtube className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                  ) : (
                                    <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                  )}
                                  <span className="truncate">{res.title}</span>
                                </span>
                                <ExternalLink className="w-3 h-3 shrink-0 opacity-60 ml-1" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* AI Learning Support Button */}
                    <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                      <span className="text-[10px] text-[#6C555C] font-semibold">
                        {note.subject}
                      </span>
                      <button
                        onClick={(e) => handleOpenAiTutor(note, e)}
                        className="px-3 py-1.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-[11px] font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Bot className="w-3.5 h-3.5 text-amber-300" />
                        <span>Ask AI Tutor</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: CHAPTER MIND MAPPING DISPLAY                                      */}
      {/* ========================================================================= */}
      {displayMode === 'mindMaps' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#722F45] shrink-0" />
            <p className="text-xs text-[#5A454C] leading-relaxed">
              <strong>Revision Mind Maps:</strong> Clear, textual node-flow maps showing how concepts connect across each chapter for fast examination revision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjectChapters.map(ch => {
              const mindMap: ChapterMindMap = MATH_IA_MIND_MAPS[ch.num] || {
                chapterNumber: ch.num,
                chapterName: ch.name,
                centralTheme: `${ch.name} Core Connections`,
                nodes: [
                  {
                    title: `Chapter ${ch.num} Concepts`,
                    description: `Core topics for ${ch.name}`,
                    subitems: ['Essential Definitions', 'Key Formulas', 'Exam Applications']
                  }
                ],
                quickSummary: `Review official ${ch.name} syllabus concepts for Intermediate 1st Year.`
              };

              return (
                <div
                  key={ch.num}
                  className="p-6 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/60 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Chapter Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-[#D5A3AE]/40 pb-3">
                      <span className="text-xs font-extrabold text-[#722F45] bg-[#D5A3AE]/30 px-3 py-1 rounded-full border border-[#D5A3AE]">
                        Chapter {ch.num}
                      </span>
                      <span className="text-xs font-bold text-[#6C555C]">
                        {ch.name}
                      </span>
                    </div>

                    {/* Central Theme Badge */}
                    <div className="p-3 rounded-2xl bg-[#722F45] text-white flex items-center gap-2 shadow-xs">
                      <Network className="w-4 h-4 text-amber-300 shrink-0" />
                      <span className="font-extrabold text-xs">{mindMap.centralTheme}</span>
                    </div>

                    {/* Node Branches */}
                    <div className="space-y-3 pt-1">
                      {mindMap.nodes.map((node, nIdx) => (
                        <div key={nIdx} className="p-3.5 rounded-xl bg-white border border-[#D5A3AE]/50 space-y-1.5 shadow-2xs">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#722F45]">
                            <GitBranch className="w-3.5 h-3.5 text-[#8C4057]" />
                            <span>{node.title}</span>
                          </div>
                          <p className="text-[11px] text-[#6C555C] italic">{node.description}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {node.subitems.map((sub, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF4EE] border border-[#D5A3AE]/40 text-[#2D2226]"
                              >
                                &bull; {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Quick Summary */}
                  <div className="p-3.5 rounded-xl bg-[#DFCEBE]/40 border border-[#D5A3AE]/50 text-xs text-[#2D2226] space-y-1">
                    <strong className="text-[#722F45] font-bold block">Quick Revision Summary:</strong>
                    <p className="leading-relaxed text-[11px]">{mindMap.quickSummary}</p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Learning Support Socratic Modal */}
      {aiTutorNote && (
        <div 
          onClick={() => setAiTutorNote(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-[#FAF4EE] rounded-3xl border-2 border-[#D5A3AE] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-[#D5A3AE]/40 bg-white/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#722F45] text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2 py-0.5 rounded">
                      Socratic AI Tutor
                    </span>
                    <span className="text-xs text-[#6C555C] font-semibold">
                      {aiTutorNote.subject} &bull; Ch {aiTutorNote.chapterNumber}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#2D2226] leading-tight mt-0.5">
                    {aiTutorNote.originalConceptName}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setAiTutorNote(null)}
                className="p-1.5 rounded-xl bg-white text-gray-500 hover:text-gray-800 border border-[#D5A3AE]/40 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Socratic Prompts */}
            <div className="p-3 bg-[#FAF4EE] border-b border-[#D5A3AE]/30 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
              <span className="text-[11px] font-bold text-[#722F45] shrink-0 mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Quick Prompts:
              </span>
              <button
                onClick={() => handleSendAiQuestion('Can you explain this concept in simple English suitable for a beginner?')}
                disabled={aiLoading}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#D5A3AE]/50 text-[11px] font-bold text-[#722F45] hover:bg-[#D5A3AE]/20 shrink-0 cursor-pointer disabled:opacity-50"
              >
                💡 Explain simply
              </button>
              <button
                onClick={() => handleSendAiQuestion('Give me a step-by-step problem-solving hint without giving away the full answer immediately.')}
                disabled={aiLoading}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#D5A3AE]/50 text-[11px] font-bold text-[#722F45] hover:bg-[#D5A3AE]/20 shrink-0 cursor-pointer disabled:opacity-50"
              >
                🔍 Give me a hint
              </button>
              <button
                onClick={() => handleSendAiQuestion('Give me one short practice question on this concept to test my understanding.')}
                disabled={aiLoading}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#D5A3AE]/50 text-[11px] font-bold text-[#722F45] hover:bg-[#D5A3AE]/20 shrink-0 cursor-pointer disabled:opacity-50"
              >
                📝 Test me with a question
              </button>
            </div>

            {/* Chat Conversation History */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3.5 text-xs">
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-[#722F45] text-white flex items-center justify-center shrink-0 text-xs">
                      <Bot className="w-4 h-4 text-amber-300" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-[#722F45] text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-[#2D2226] border border-[#D5A3AE]/40 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                    <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-white/60' : 'text-[#6C555C]'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {aiLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-[#722F45] text-white flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-4 h-4 text-amber-300 animate-pulse" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white text-[#6C555C] border border-[#D5A3AE]/40 rounded-tl-xs flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#722F45]" />
                    <span>AI Tutor is thinking Socratic guidance...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAiQuestion();
              }}
              className="p-3 bg-white border-t border-[#D5A3AE]/40 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Ask a question about ${aiTutorNote.originalConceptName}...`}
                value={aiQuestionInput}
                onChange={(e) => setAiQuestionInput(e.target.value)}
                disabled={aiLoading}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/50 text-xs text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45] placeholder:text-[#6C555C]"
              />
              <button
                type="submit"
                disabled={!aiQuestionInput.trim() || aiLoading}
                className="px-4 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
