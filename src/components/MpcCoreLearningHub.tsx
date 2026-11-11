import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Sparkles, Layers, ShieldCheck, CheckCircle2, 
  HelpCircle, Trophy, RotateCcw, ChevronRight, Copy, Check, 
  Lightbulb, ExternalLink, Flame, Zap, Award, Target, 
  Compass, PlayCircle, Eye, EyeOff, Hash, Grid, Combine,
  PieChart, GitBranch, ArrowRight, Layers3, AlertTriangle,
  FileText, Youtube, CheckSquare, ChevronDown, ChevronUp, ListOrdered,
  Monitor, Code, FileSpreadsheet, Brain, FlaskConical, MessageSquare, Shield, Globe, IndianRupee, GraduationCap, Building2
} from 'lucide-react';
import { 
  MPC_LEARNING_HUB_DATA, 
  SubjectCurriculumData, 
  ChapterLearningSuite, 
  QuizQuestion, 
  PracticeProblem,
  MiniProject,
  LearningResourceLink
} from '../data/mpcLearningHubData';
import { 
  getMindMapForSubjectAndChapter, 
  MindMapBranch, 
  ConceptMindMapData 
} from '../data/mathMindMapData';
import { getAdditionalSkillsForStream } from '../data/additionalSkillsData';
import { AdditionalSkillModule, StudentProfile } from '../types';

interface MpcCoreLearningHubProps {
  initialSubject?: 'math_1a' | 'math_1b' | 'physics_1' | 'chemistry_1';
  onLaunchAssessment?: (specialization: string) => void;
  profile?: StudentProfile | null;
}

export const MpcCoreLearningHub: React.FC<MpcCoreLearningHubProps> = ({
  initialSubject = 'math_1a',
  onLaunchAssessment,
  profile
}) => {
  const skillsModules = useMemo(() => {
    return getAdditionalSkillsForStream(profile?.streamOrGroup || profile?.specialization || 'mpc');
  }, [profile]);

  // Multi-Board & Learning Mode State
  const [selectedBoard, setSelectedBoard] = useState<string>('Telangana Board');
  const [hubMode, setHubMode] = useState<'academic' | 'additional_skills'>('academic');

  // Additional Skills State
  const [selectedSkillCourseId, setSelectedSkillCourseId] = useState<string>('basic_computer_skills');
  const [selectedSkillLessonId, setSelectedSkillLessonId] = useState<string>('comp_1');
  const [completedSkillLessons, setCompletedSkillLessons] = useState<Record<string, boolean>>({});
  const [skillQuizAnswers, setSkillQuizAnswers] = useState<Record<string, string>>({});
  const [showSkillQuizExplanation, setShowSkillQuizExplanation] = useState<Record<string, boolean>>({});

  // AI English Communication Coach State
  const [englishLevel, setEnglishLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [preferredLang, setPreferredLang] = useState<string>('English');
  const [rolePlayScenario, setRolePlayScenario] = useState<string>('General Daily Conversation');
  const [coachInputText, setCoachInputText] = useState<string>('');
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [coachMessages, setCoachMessages] = useState<Array<{
    id: string;
    sender: 'ai' | 'student';
    text: string;
    correction?: {
      original: string;
      corrected: string;
      explanation: string;
      alternatives: [string, string];
    };
    timestamp: string;
  }>>(() => {
    try {
      const saved = localStorage.getItem('pathfinder_english_coach_messages');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'msg_1',
        sender: 'ai',
        text: 'Welcome back! Yesterday you practiced introducing yourself and learned 5 new expressions with 3 grammar corrections. Let us continue today. How can I help you practice your English today?',
        timestamp: 'Today, 9:00 AM'
      }
    ];
  });

  const handleSendCoachMessage = () => {
    if (!coachInputText.trim()) return;
    const studentText = coachInputText.trim();
    setCoachInputText('');

    const studentMsg = {
      id: `msg_${Date.now()}`,
      sender: 'student' as const,
      text: studentText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let correction: any = undefined;
    const lower = studentText.toLowerCase();
    if (lower.includes('yesterday i go') || lower.includes('mujhe kal') || lower.includes('nenu') || lower.includes('he do not') || lower.includes('i am go')) {
      correction = {
        original: studentText,
        corrected: lower.includes('yesterday i go') ? 'Yesterday I went to college.' : lower.includes('he do not') ? 'He does not know the answer.' : 'I have to go to college tomorrow.',
        explanation: preferredLang !== 'English' ? `Explanation in ${preferredLang}: Past tense requires "went" instead of "go", or third-person singular takes "does not".` : 'Grammar note: Ensure proper tense matching and subject-verb agreement.',
        alternatives: ['I planned to visit college yesterday.', 'Yesterday, I visited the campus.']
      };
    }

    const aiReplyText = correction
      ? `Your English sentence was: "${correction.original}". The corrected sentence is: "${correction.corrected}". Let us practice saying it again!`
      : `That is a wonderful and grammatically correct sentence! Another natural way to express this is: "I completely agree with that perspective." How would you like to expand on this topic?`;

    const aiMsg = {
      id: `msg_ai_${Date.now()}`,
      sender: 'ai' as const,
      text: aiReplyText,
      correction,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...coachMessages, studentMsg, aiMsg];
    setCoachMessages(updated);
    try {
      localStorage.setItem('pathfinder_english_coach_messages', JSON.stringify(updated));
    } catch {}

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(aiReplyText);
      utt.rate = speechSpeed;
      window.speechSynthesis.speak(utt);
    }
  };

  // Navigation State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubject);
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'concepts' | 'mindmap' | 'reallife' | 'quiz' | 'practice' | 'miniproject' | 'resources'>('mindmap');

  // Quiz Game State
  const [quizDifficultyFilter, setQuizDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Challenging'>('All');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizExplanations, setShowQuizExplanations] = useState<Record<string, boolean>>({});
  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('pathfinder_mpc_quiz_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Practice Zone State: Hint and Explanation Toggles
  const [activeHints, setActiveHints] = useState<Record<string, boolean>>({});
  const [activeExplanations, setActiveExplanations] = useState<Record<string, boolean>>({});

  // Mind Map State
  const [activeBranchId, setActiveBranchId] = useState<string>('ch1_b1');

  // Copy Formula State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Learning Resources Language Filter State
  const [resourceLangFilter, setResourceLangFilter] = useState<'All' | 'English' | 'Hindi' | 'Telugu'>('All');

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Current Subject
  const currentSubject: SubjectCurriculumData = useMemo(() => {
    return MPC_LEARNING_HUB_DATA[selectedSubjectId] || MPC_LEARNING_HUB_DATA.math_1a;
  }, [selectedSubjectId]);

  // Current Chapter
  const currentChapter: ChapterLearningSuite = useMemo(() => {
    return (
      currentSubject.chapters.find(c => c.chapterNumber === selectedChapterNum) ||
      currentSubject.chapters[0]
    );
  }, [currentSubject, selectedChapterNum]);

  // Concept Notes Table of Contents / Expandable state
  const [expandedNotes, setExpandedNotes] = useState<string[]>([]);

  React.useEffect(() => {
    if (currentChapter && currentChapter.conceptNotes) {
      setExpandedNotes(currentChapter.conceptNotes.map(n => n.id));
    }
  }, [selectedChapterNum, selectedSubjectId, currentChapter]);

  const toggleNoteExpand = (noteId: string) => {
    setExpandedNotes(prev =>
      prev.includes(noteId) ? prev.filter(id => id !== noteId) : [...prev, noteId]
    );
  };

  // Current Chapter Mind Map for all subjects and chapters
  const currentMindMap = useMemo(() => {
    return getMindMapForSubjectAndChapter(selectedSubjectId, selectedChapterNum);
  }, [selectedSubjectId, selectedChapterNum]);

  // Active Branch in Mind Map
  const activeBranch = useMemo(() => {
    if (!currentMindMap) return null;
    return currentMindMap.branches.find(b => b.id === activeBranchId) || currentMindMap.branches[0];
  }, [currentMindMap, activeBranchId]);

  // Reset active branch when chapter or subject changes
  React.useEffect(() => {
    if (currentMindMap && currentMindMap.branches.length > 0) {
      setActiveBranchId(currentMindMap.branches[0].id);
    }
  }, [selectedChapterNum, selectedSubjectId, currentMindMap]);

  // Color theme definitions for mind map branches
  const COLOR_THEMES: Record<MindMapBranch['colorTheme'], {
    nodeBg: string;
    nodeBorder: string;
    badgeBg: string;
    stroke: string;
    text: string;
    lightBg: string;
    gradient: string;
  }> = {
    amber: {
      nodeBg: 'bg-[#FEF3C7]',
      nodeBorder: 'border-[#F59E0B]',
      badgeBg: 'bg-[#F59E0B]/20 text-[#78350F]',
      stroke: '#F59E0B',
      text: 'text-[#78350F]',
      lightBg: 'bg-[#FFFBEB]',
      gradient: 'from-[#F59E0B] to-[#D97706]'
    },
    emerald: {
      nodeBg: 'bg-[#D1FAE5]',
      nodeBorder: 'border-[#10B981]',
      badgeBg: 'bg-[#10B981]/20 text-[#065F46]',
      stroke: '#10B981',
      text: 'text-[#065F46]',
      lightBg: 'bg-[#ECFDF5]',
      gradient: 'from-[#10B981] to-[#059669]'
    },
    sky: {
      nodeBg: 'bg-[#E0F2FE]',
      nodeBorder: 'border-[#0EA5E9]',
      badgeBg: 'bg-[#0EA5E9]/20 text-[#075985]',
      stroke: '#0EA5E9',
      text: 'text-[#075985]',
      lightBg: 'bg-[#F0F9FF]',
      gradient: 'from-[#0EA5E9] to-[#0284C7]'
    },
    purple: {
      nodeBg: 'bg-[#F3E8FF]',
      nodeBorder: 'border-[#A855F7]',
      badgeBg: 'bg-[#A855F7]/20 text-[#581C87]',
      stroke: '#A855F7',
      text: 'text-[#581C87]',
      lightBg: 'bg-[#FAF5FF]',
      gradient: 'from-[#A855F7] to-[#7E22CE]'
    },
    rose: {
      nodeBg: 'bg-[#FFE4E6]',
      nodeBorder: 'border-[#F43F5E]',
      badgeBg: 'bg-[#F43F5E]/20 text-[#881337]',
      stroke: '#F43F5E',
      text: 'text-[#881337]',
      lightBg: 'bg-[#FFF1F2]',
      gradient: 'from-[#F43F5E] to-[#BE123C]'
    },
    indigo: {
      nodeBg: 'bg-[#E0E7FF]',
      nodeBorder: 'border-[#6366F1]',
      badgeBg: 'bg-[#6366F1]/20 text-[#3730A3]',
      stroke: '#6366F1',
      text: 'text-[#3730A3]',
      lightBg: 'bg-[#EEF2FF]',
      gradient: 'from-[#6366F1] to-[#4338CA]'
    },
    teal: {
      nodeBg: 'bg-[#CCFBF1]',
      nodeBorder: 'border-[#14B8A6]',
      badgeBg: 'bg-[#14B8A6]/20 text-[#134E4A]',
      stroke: '#14B8A6',
      text: 'text-[#134E4A]',
      lightBg: 'bg-[#F0FDF4]',
      gradient: 'from-[#14B8A6] to-[#0D9488]'
    },
    coral: {
      nodeBg: 'bg-[#FFEDD5]',
      nodeBorder: 'border-[#F97316]',
      badgeBg: 'bg-[#F97316]/20 text-[#7C2D12]',
      stroke: '#F97316',
      text: 'text-[#7C2D12]',
      lightBg: 'bg-[#FFF7ED]',
      gradient: 'from-[#F97316] to-[#EA580C]'
    }
  };

  const renderIconByName = (name: string, className = "w-4 h-4") => {
    switch (name) {
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Hash': return <Hash className={className} />;
      case 'Grid': return <Grid className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Combine': return <Combine className={className} />;
      case 'PieChart': return <PieChart className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Monitor': return <Monitor className={className} />;
      case 'Code': return <Code className={className} />;
      case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'FlaskConical': return <FlaskConical className={className} />;
      case 'MessageSquare': return <MessageSquare className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'IndianRupee': return <IndianRupee className={className} />;
      default: return <Lightbulb className={className} />;
    }
  };

  // Filtered Quiz Questions
  const filteredQuizQuestions = useMemo(() => {
    if (!currentChapter.quizQuestions) return [];
    if (quizDifficultyFilter === 'All') return currentChapter.quizQuestions;
    return currentChapter.quizQuestions.filter(q => q.difficulty === quizDifficultyFilter);
  }, [currentChapter, quizDifficultyFilter]);

  // Quiz Score Calculation
  const currentChapterQuizScore = useMemo(() => {
    const key = `${selectedSubjectId}_ch${selectedChapterNum}`;
    return quizScores[key] || 0;
  }, [quizScores, selectedSubjectId, selectedChapterNum]);

  // Handle Option Select in Quiz
  const handleSelectQuizOption = (qId: string, optionIndex: number, correctIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    setShowQuizExplanations(prev => ({ ...prev, [qId]: true }));

    if (optionIndex === correctIndex) {
      const key = `${selectedSubjectId}_ch${selectedChapterNum}`;
      const newScore = (quizScores[key] || 0) + 1;
      const updatedScores = { ...quizScores, [key]: newScore };
      setQuizScores(updatedScores);
      try {
        localStorage.setItem('pathfinder_mpc_quiz_scores', JSON.stringify(updatedScores));
      } catch {
        // ignore
      }
    }
  };

  // Reset Chapter Quiz
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowQuizExplanations({});
  };

  return (
    <div className="space-y-6">

      {/* MULTI-BOARD SELECTOR BAR */}
      <div className="p-4 rounded-2xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/70 space-y-3 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#722F45]" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#722F45]">
              Select Educational Board:
            </span>
          </div>
          <span className="text-xs font-bold text-[#8C4057] bg-[#D5A3AE]/30 px-3 py-1 rounded-full border border-[#D5A3AE]">
            Class: Intermediate 1st Year (MPC Stream)
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'Telangana Board', label: 'Telangana Board (TGBIE)', badge: 'Master 2026–27' },
            { id: 'CBSE', label: 'CBSE Class 11', badge: 'Verified' },
            { id: 'CISCE', label: 'CISCE (ISC Class 11)', badge: 'Verified' },
            { id: 'AP Board', label: 'BIE Andhra Pradesh', badge: 'Verified' },
            { id: 'Maharashtra Board', label: 'Maharashtra State Board', badge: 'Verified' },
            { id: 'Karnataka Board', label: 'Karnataka Pre-University (PUC)', badge: 'Verified' },
            { id: 'Tamil Nadu Board', label: 'Tamil Nadu Higher Secondary', badge: 'Verified' }
          ].map(board => {
            const isSelected = selectedBoard === board.id;
            return (
              <button
                key={board.id}
                onClick={() => setSelectedBoard(board.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#722F45] text-white border-[#722F45] shadow-sm'
                    : 'bg-white text-[#2D2226] border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-[#FAF4EE]'
                }`}
              >
                <span>{board.label}</span>
                {isSelected ? (
                  <span className="text-[10px] bg-amber-300 text-amber-950 font-black px-1.5 py-0.5 rounded-md">
                    Active
                  </span>
                ) : (
                  <span className="text-[9px] text-[#8C4057] bg-[#D5A3AE]/20 px-1.5 py-0.5 rounded-md">
                    {board.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedBoard !== 'Telangana Board' && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Selected Board:</strong> {selectedBoard} (Intermediate 1st Year MPC). Official Telangana Board (TGBIE 2026–27) is loaded as the active master curriculum with complete 46 textbook chapters.
            </span>
          </div>
        )}
      </div>

      {/* HUB MODE TOGGLE: ACADEMIC CURRICULUM VS ADDITIONAL SKILLS */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60">
        <button
          onClick={() => setHubMode('academic')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            hubMode === 'academic'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#5A454C] hover:bg-[#D5A3AE]/20'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>Telangana MPC Core Syllabus (46 Chapters)</span>
        </button>

        <button
          onClick={() => setHubMode('additional_skills')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            hubMode === 'additional_skills'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#5A454C] hover:bg-[#D5A3AE]/20'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-amber-300" />
          <span>Additional Skills – Beyond the Textbook (8 Courses)</span>
        </button>
      </div>

      {hubMode === 'additional_skills' ? (
        /* =====================================================================
           ADDITIONAL SKILLS – BEYOND THE TEXTBOOK VIEW
           ===================================================================== */
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-linear-to-r from-[#FAF4EE] via-[#FFF9F2] to-[#FAF4EE] border-2 border-[#D5A3AE]/70 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-3 py-1 rounded-full border border-[#D5A3AE]">
              Beyond the Textbook • Practical Skills & AI Readiness
            </span>
            <h3 className="text-2xl font-extrabold text-[#722F45]">
              8 Practical Non-Academic Courses for STEM Students
            </h3>
            <p className="text-xs sm:text-sm text-[#5A454C] leading-relaxed">
              Master practical coding, data spreadsheets, AI prompt engineering, logical problem-solving, scientific lab reporting, technical English, and cybersecurity safety!
            </p>
          </div>

          {/* 8 Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsModules.map(course => {
              const isSelected = selectedSkillCourseId === course.id;
              const completedCount = course.lessons.filter(l => completedSkillLessons[l.id]).length;
              return (
                <button
                  key={course.id}
                  onClick={() => {
                    setSelectedSkillCourseId(course.id);
                    setSelectedSkillLessonId(course.lessons[0].id);
                  }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#722F45] text-white border-[#722F45] shadow-md ring-2 ring-[#722F45]/30'
                      : 'bg-[#FAF4EE] text-[#2D2226] border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-[#D5A3AE]/30 text-[#722F45]'}`}>
                        {renderIconByName(course.iconName, "w-5 h-5")}
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-amber-300 text-amber-950' : 'bg-[#D5A3AE]/30 text-[#8C4057]'
                      }`}>
                        {course.category}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base leading-snug">
                      {course.title}
                    </h4>

                    <p className={`text-xs line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[#5A454C]'}`}>
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D5A3AE]/40 flex items-center justify-between text-xs font-semibold">
                    <span>{course.lessons.length} Lessons</span>
                    <span className={isSelected ? 'text-amber-300' : 'text-[#722F45]'}>
                      {completedCount}/{course.lessons.length} Done
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Skill Course Viewer */}
          {(() => {
            const course = skillsModules.find(c => c.id === selectedSkillCourseId) || skillsModules[0];
            const activeLesson = course.lessons.find(l => l.id === selectedSkillLessonId) || course.lessons[0];

            return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course Lessons Sidebar */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#722F45] text-white space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Course Curriculum Roadmap
                    </span>
                    <h3 className="font-extrabold text-base flex items-center gap-2">
                      {renderIconByName(course.iconName, "w-5 h-5 text-amber-300")}
                      <span>{course.title}</span>
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {course.lessons.map((lesson, idx) => {
                      const isSelected = lesson.id === activeLesson.id;
                      const isDone = completedSkillLessons[lesson.id];
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedSkillLessonId(lesson.id)}
                          className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-[#722F45] text-white border-[#722F45] shadow-sm'
                              : 'bg-[#FAF4EE] text-[#2D2226] border-[#D5A3AE]/60 hover:border-[#722F45]'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className={`text-[10px] font-extrabold uppercase block ${
                              isSelected ? 'text-amber-300' : 'text-[#8C4057]'
                            }`}>
                              Lesson {idx + 1} • {lesson.durationMinutes} Mins
                            </span>
                            <h4 className="font-extrabold text-xs sm:text-sm line-clamp-1">
                              {lesson.title}
                            </h4>
                          </div>

                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#D5A3AE]'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Lesson Content Viewer */}
                <div className="lg:col-span-2 space-y-6 p-6 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/70">
                  {selectedSkillCourseId === 'english_comm' ? (
                    <div className="space-y-6">
                      {/* Welcome Back & Learning Memory Banner */}
                      <div className="p-5 rounded-2xl bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-600" />
                            <h4 className="font-extrabold text-sm sm:text-base text-amber-950">
                              Welcome Back! (Persistent Student Memory Active)
                            </h4>
                          </div>
                          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                            Streak: 5 Days Active 🔥
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                          Yesterday you practiced self-introduction, learned 5 new expressions with 3 grammar corrections. Let us revise your previous mistakes before today's 15-minute daily conversation!
                        </p>
                      </div>

                      {/* Coach Settings Bar: Level & Preferred Language */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-[#D5A3AE]/60">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057] block mb-1">
                            English Level
                          </label>
                          <select
                            value={englishLevel}
                            onChange={(e) => setEnglishLevel(e.target.value as any)}
                            className="w-full p-2.5 rounded-xl border border-[#D5A3AE] text-xs font-bold bg-[#FAF4EE] text-[#722F45] focus:outline-none cursor-pointer"
                          >
                            <option value="Beginner">Beginner Level</option>
                            <option value="Intermediate">Intermediate Level</option>
                            <option value="Advanced">Advanced Level</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057] block mb-1">
                            Explanation Language
                          </label>
                          <select
                            value={preferredLang}
                            onChange={(e) => setPreferredLang(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-[#D5A3AE] text-xs font-bold bg-[#FAF4EE] text-[#722F45] focus:outline-none cursor-pointer"
                          >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi (हिंदी)</option>
                            <option value="Telugu">Telugu (తెలుగు)</option>
                            <option value="Urdu">Urdu (اردو)</option>
                            <option value="Marathi">Marathi (मराठी)</option>
                            <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                            <option value="Tamil">Tamil (தமிழ்)</option>
                            <option value="Bengali">Bengali (বাংলা)</option>
                            <option value="Malayalam">Malayalam (മലയാളം)</option>
                            <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                            <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                            <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057] block mb-1">
                            Role-Play Situation
                          </label>
                          <select
                            value={rolePlayScenario}
                            onChange={(e) => setRolePlayScenario(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-[#D5A3AE] text-xs font-bold bg-[#FAF4EE] text-[#722F45] focus:outline-none cursor-pointer"
                          >
                            <option value="General Daily Conversation">General Daily Conversation</option>
                            <option value="College Conversation">College Conversation</option>
                            <option value="Talking to Teachers">Talking to Teachers</option>
                            <option value="Job Interview">Job Interview</option>
                            <option value="HR Interview">HR Interview</option>
                            <option value="Group Discussion">Group Discussion</option>
                            <option value="Public Speaking">Public Speaking</option>
                            <option value="Self-Introduction">Self-Introduction</option>
                            <option value="Customer Service">Customer Service</option>
                          </select>
                        </div>
                      </div>

                      {/* Interactive Chat & Grammar Correction Feed */}
                      <div className="p-5 rounded-3xl bg-white border-2 border-[#D5A3AE]/70 space-y-4">
                        <div className="flex items-center justify-between border-b border-[#D5A3AE]/40 pb-3 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-[#722F45]" />
                            <h4 className="font-extrabold text-sm sm:text-base text-[#722F45]">
                              AI English Coach &amp; Role-Play ({rolePlayScenario})
                            </h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                              Level: {englishLevel}
                            </span>
                            <button
                              onClick={() => {
                                if (window.confirm('Reset conversation and start again from Beginner?')) {
                                  setEnglishLevel('Beginner');
                                  setCoachMessages([{
                                    id: 'msg_reset',
                                    sender: 'ai',
                                    text: 'Starting fresh from Beginner level! Let us begin with a simple introduction. Tell me your name and what you love studying.',
                                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                  }]);
                                }
                              }}
                              className="text-[10px] font-bold text-[#722F45] bg-[#D5A3AE]/30 hover:bg-[#D5A3AE]/50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              Start Again from Beginner
                            </button>
                          </div>
                        </div>

                        {/* Messages Scroll Area */}
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                          {coachMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
                            >
                              <div
                                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm space-y-2 ${
                                  msg.sender === 'student'
                                    ? 'bg-[#722F45] text-white rounded-br-none'
                                    : 'bg-[#FAF4EE] text-[#2D2226] border border-[#D5A3AE]/60 rounded-bl-none'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-[10px] font-extrabold opacity-80 uppercase tracking-wider">
                                    {msg.sender === 'student' ? 'You' : 'AI Communication Coach'}
                                  </span>
                                  {msg.sender === 'ai' && (
                                    <button
                                      onClick={() => {
                                        if ('speechSynthesis' in window) {
                                          window.speechSynthesis.cancel();
                                          const utt = new SpeechSynthesisUtterance(msg.text);
                                          utt.rate = speechSpeed;
                                          window.speechSynthesis.speak(utt);
                                        }
                                      }}
                                      className="p-1 rounded-lg bg-[#D5A3AE]/40 hover:bg-[#D5A3AE] text-[#722F45] transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1"
                                      title="Listen to AI Audio"
                                    >
                                      <span>🔊 Listen</span>
                                    </button>
                                  )}
                                </div>

                                <p className="leading-relaxed whitespace-pre-line font-medium">
                                  {msg.text}
                                </p>

                                {/* Grammar Correction Card if evaluated */}
                                {msg.correction && (
                                  <div className="mt-3 p-3.5 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-2 text-xs">
                                    <div className="flex items-center gap-1.5 font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">
                                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                      <span>Grammar &amp; Sentence Correction Feedback:</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                      <div className="p-2 rounded-lg bg-rose-50 border border-rose-200">
                                        <span className="text-[10px] font-bold text-rose-800 block">1. What You Said:</span>
                                        <p className="font-semibold text-rose-950">{msg.correction.original}</p>
                                      </div>
                                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                                        <span className="text-[10px] font-bold text-emerald-800 block">2. Corrected Sentence:</span>
                                        <p className="font-bold text-emerald-950">{msg.correction.corrected}</p>
                                      </div>
                                    </div>
                                    <div className="p-2 rounded-lg bg-white border border-amber-200 space-y-1">
                                      <span className="text-[10px] font-bold text-amber-900 block">3. Explanation ({preferredLang}):</span>
                                      <p className="text-amber-950">{msg.correction.explanation}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 space-y-1">
                                      <span className="text-[10px] font-bold text-sky-900 block">4. Alternative Natural Expressions:</span>
                                      <ul className="list-disc list-inside text-sky-950 font-medium space-y-0.5">
                                        {msg.correction.alternatives.map((alt, i) => (
                                          <li key={i}>{alt}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <span className="text-[9px] text-[#8C4057] mt-1 px-1">
                                {msg.timestamp}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Input & Voice Controls */}
                        <div className="space-y-3 pt-3 border-t border-[#D5A3AE]/50">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={coachInputText}
                              onChange={(e) => setCoachInputText(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSendCoachMessage()}
                              placeholder="Type your response in English (or try 'Mujhe kal college jaana hai')..."
                              className="flex-1 p-3.5 rounded-2xl border-2 border-[#D5A3AE] text-xs sm:text-sm bg-[#FAF4EE] text-[#2D2226] focus:outline-none focus:border-[#722F45]"
                            />
                            <button
                              onClick={handleSendCoachMessage}
                              className="px-6 py-3.5 rounded-2xl bg-[#722F45] hover:bg-[#5C2436] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2 shrink-0"
                            >
                              <span>Send</span>
                              <ArrowRight className="w-4 h-4 text-amber-300" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-[#6C555C]">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-[#722F45]">Voice Speech Speed:</span>
                              {[0.8, 1.0, 1.25].map((spd) => (
                                <button
                                  key={spd}
                                  onClick={() => setSpeechSpeed(spd)}
                                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer border ${
                                    speechSpeed === spd
                                      ? 'bg-[#722F45] text-white border-[#722F45]'
                                      : 'bg-[#FAF4EE] text-[#722F45] border-[#D5A3AE]'
                                  }`}
                                >
                                  {spd}x
                                </button>
                              ))}
                            </div>
                            <span className="text-[11px] text-[#8C4057] italic">
                              💡 Tip: Try typing in Hindi or Telugu to test intelligent language switching!
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#D5A3AE]/50 pb-4">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#8C4057]">
                            {course.title}
                          </span>
                          <h3 className="text-xl font-extrabold text-[#722F45]">
                            {activeLesson.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => setCompletedSkillLessons(prev => ({
                            ...prev,
                            [activeLesson.id]: !prev[activeLesson.id]
                          }))}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            completedSkillLessons[activeLesson.id]
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#722F45] text-white hover:bg-[#5C2436]'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{completedSkillLessons[activeLesson.id] ? 'Lesson Completed ✓' : 'Mark as Complete'}</span>
                        </button>
                      </div>

                      {/* Summary & Key Points */}
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                        <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          Lesson Summary &amp; Key Points:
                        </span>
                        <p className="text-xs text-amber-950 font-medium leading-relaxed">
                          {activeLesson.summary}
                        </p>
                        <ul className="space-y-1.5 pt-1">
                          {activeLesson.keyPoints.map((pt, i) => (
                            <li key={i} className="text-xs text-amber-900 flex items-start gap-2 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Content Sections */}
                      {activeLesson.contentSections && activeLesson.contentSections.length > 0 && (
                        <div className="space-y-4">
                          {activeLesson.contentSections.map((sec, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/50 space-y-2">
                              <h4 className="font-extrabold text-sm text-[#722F45]">
                                {sec.heading}
                              </h4>
                              <p className="text-xs text-[#5A454C] leading-relaxed whitespace-pre-line">
                                {sec.body}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Practical Exercise Box */}
                      {activeLesson.practicalExercise && (
                        <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
                          <span className="text-xs font-extrabold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-sky-600" />
                            Practical Hands-On Exercise:
                          </span>
                          <p className="text-xs sm:text-sm text-sky-950 font-semibold leading-relaxed">
                            {activeLesson.practicalExercise}
                          </p>
                        </div>
                      )}

                      {/* Interactive Quiz */}
                      {activeLesson.quiz && activeLesson.quiz.length > 0 && (
                        <div className="p-5 rounded-2xl bg-white border-2 border-[#D5A3AE]/70 space-y-4">
                          <span className="text-xs font-extrabold text-[#722F45] uppercase tracking-wider flex items-center gap-1.5">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            Lesson Knowledge Check Quiz:
                          </span>

                          {activeLesson.quiz.map(q => {
                            const selectedOpt = skillQuizAnswers[q.id];
                            const showExp = showSkillQuizExplanation[q.id];
                            return (
                              <div key={q.id} className="space-y-3 pt-2">
                                <h4 className="font-extrabold text-xs sm:text-sm text-[#2D2226]">
                                  {q.question}
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {q.options.map(opt => {
                                    const isSelected = selectedOpt === opt.id;
                                    const isCorrect = opt.id === q.correctAnswer;
                                    return (
                                      <button
                                        key={opt.id}
                                        onClick={() => {
                                          setSkillQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }));
                                          setShowSkillQuizExplanation(prev => ({ ...prev, [q.id]: true }));
                                        }}
                                        className={`p-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer border flex items-center justify-between ${
                                          isSelected
                                            ? isCorrect
                                              ? 'bg-emerald-600 text-white border-emerald-600'
                                              : 'bg-rose-600 text-white border-rose-600'
                                            : 'bg-[#FAF4EE] text-[#2D2226] border-[#D5A3AE]/50 hover:border-[#722F45]'
                                        }`}
                                      >
                                        <span>{opt.text}</span>
                                        {isSelected && (
                                          <span>{isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>

                                {showExp && (
                                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
                                    <span className="font-bold text-amber-900 block">Explanation:</span>
                                    <p>{q.explanation}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* =====================================================================
           TELANGANA CORE ACADEMIC SYLLABUS VIEW (46 CHAPTERS)
           ===================================================================== */
        <>
          {/* Top Banner Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-[#FAF4EE] via-[#FFF9F2] to-[#FAF4EE] border-2 border-[#D5A3AE]/70 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-3 py-1 rounded-full border border-[#D5A3AE]">
                    {selectedBoard} (TGBIE 2026–27)
                  </span>
                  <span className="text-xs font-bold text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    MPC Learning Hub
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#722F45] font-serif-accent">
                  Telangana 1st Year MPC Core Learning Hub
                </h2>
                <p className="text-xs sm:text-sm text-[#5A454C] leading-relaxed">
                  Understand difficult textbook concepts through beginner-friendly English, visual connected mind maps, step-by-step practice problems, real-life examples, interactive quiz games, and hands-on mini projects!
                </p>
              </div>

              {/* Quick Assessment Launch Link */}
              {onLaunchAssessment && (
                <button
                  onClick={() => onLaunchAssessment(currentSubject.subjectTitle)}
                  className="px-5 py-3 rounded-2xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <PlayCircle className="w-4 h-4 text-amber-300" />
                  <span>Start 20-MCQ Assessment</span>
                </button>
              )}
            </div>
          </div>

      {/* STEP 1: SUBJECT SELECTOR CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.values(MPC_LEARNING_HUB_DATA).map(subj => {
          const isSelected = selectedSubjectId === subj.subjectId;
          return (
            <button
              key={subj.subjectId}
              onClick={() => {
                setSelectedSubjectId(subj.subjectId);
                setSelectedChapterNum(1);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#722F45] text-white border-[#722F45] shadow-md ring-2 ring-[#722F45]/30'
                  : 'bg-[#FAF4EE] text-[#2D2226] border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                  isSelected ? 'text-amber-300' : 'text-[#8C4057]'
                }`}>
                  {subj.shortLabel}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base leading-tight mt-1">
                  {subj.subjectTitle}
                </h3>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] font-semibold">
                <span className={isSelected ? 'text-white/80' : 'text-[#6C555C]'}>
                  {subj.chapters.length} Chapters
                </span>
                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#D5A3AE]'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* STEP 2: CHAPTER SELECTOR BAR */}
      <div className="p-4 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-[#722F45] flex items-center gap-1.5 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#8C4057]" />
            Chapters for {currentSubject.subjectTitle}:
          </span>
          <span className="text-xs font-bold text-[#6C555C]">
            Chapter {selectedChapterNum}: {currentChapter.chapterName}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {currentSubject.chapters.map(ch => {
            const isSelected = selectedChapterNum === ch.chapterNumber;
            return (
              <button
                key={ch.chapterNumber}
                onClick={() => setSelectedChapterNum(ch.chapterNumber)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#722F45] text-white shadow-xs ring-2 ring-[#722F45]/40'
                    : 'bg-white border border-[#D5A3AE]/50 text-[#2D2226] hover:bg-[#D5A3AE]/20'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#D5A3AE]/30 text-[#722F45] text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  {ch.chapterNumber}
                </span>
                <span className="truncate">{ch.chapterName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CHAPTER SIMPLE INTRO BANNER */}
      <div className="p-5 rounded-2xl bg-white border-2 border-[#D5A3AE]/60 space-y-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#722F45] px-2.5 py-0.5 rounded">
            Beginner English Intro
          </span>
          <h3 className="font-extrabold text-base text-[#2D2226]">
            Chapter {currentChapter.chapterNumber}: {currentChapter.chapterName}
          </h3>
        </div>
        <p className="text-xs text-[#3D2C33] leading-relaxed font-medium">
          {currentChapter.introSimpleEnglish}
        </p>
      </div>

      {/* STEP 3: CHAPTER LEARNING SUITE MULTI-TAB BAR */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#E8D5C4]/70 border-2 border-[#D5A3AE] overflow-x-auto scrollbar-thin shadow-inner">
        <button
          onClick={() => setActiveTab('concepts')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'concepts'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#2D2226] hover:bg-white/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Concept Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('mindmap')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'mindmap'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#2D2226] hover:bg-white/50'
          }`}
        >
          <GitBranch className="w-4 h-4 text-amber-300" />
          <span>Visual Mind Map</span>
        </button>

        <button
          onClick={() => setActiveTab('reallife')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'reallife'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#2D2226] hover:bg-white/50'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-300" />
          <span>Real-Life Uses</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#2D2226] hover:bg-white/50'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>Quiz Game</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'practice'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#2D2226] hover:bg-white/50'
          }`}
        >
          <Target className="w-4 h-4 text-blue-300" />
          <span>Practice Zone</span>
        </button>

        <button
          onClick={() => setActiveTab('miniproject')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'miniproject'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#2D2226] hover:bg-white/50'
          }`}
        >
          <Zap className="w-4 h-4 text-purple-300" />
          <span>Mini Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'resources'
              ? 'bg-[#722F45] text-white shadow-md'
              : 'text-[#2D2226] hover:bg-white/50'
          }`}
        >
          <Youtube className="w-4 h-4 text-red-400" />
          <span>Learning Resources</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* TAB 1: CONCEPT NOTES WITH TABLE OF CONTENTS & EXPANDABLE SECTIONS         */}
      {/* ========================================================================= */}
      {activeTab === 'concepts' && (
        <div className="space-y-6">
          
          {/* TABLE OF CONTENTS NAVIGATION HEADER */}
          <div className="p-5 rounded-3xl bg-white border-2 border-[#D5A3AE]/70 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5A3AE]/40 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#722F45] text-amber-300 flex items-center justify-center font-bold shadow-2xs">
                  <ListOrdered className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C4057]">
                    Table of Contents
                  </span>
                  <h3 className="font-extrabold text-base text-[#722F45] leading-tight">
                    Chapter {currentChapter.chapterNumber}: {currentChapter.chapterName}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-bold">
                <button
                  onClick={() => setExpandedNotes(currentChapter.conceptNotes.map(n => n.id))}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF4EE] hover:bg-[#D5A3AE]/30 text-[#722F45] border border-[#D5A3AE] transition-colors cursor-pointer"
                >
                  Expand All Subtopics
                </button>
                <button
                  onClick={() => setExpandedNotes([])}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF4EE] hover:bg-[#D5A3AE]/30 text-[#6C555C] border border-[#D5A3AE] transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Subtopic Quick-Jump Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C555C] block">
                Numbered Subtopics ({currentChapter.conceptNotes.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {currentChapter.conceptNotes.map((note, index) => {
                  const isExpanded = expandedNotes.includes(note.id);
                  return (
                    <button
                      key={note.id}
                      onClick={() => {
                        if (!isExpanded) toggleNoteExpand(note.id);
                        const el = document.getElementById(`subtopic-${note.id}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                        isExpanded
                          ? 'bg-[#722F45] text-white border-[#722F45] shadow-2xs'
                          : 'bg-[#FAF4EE] text-[#2D2226] border-[#D5A3AE]/60 hover:bg-[#D5A3AE]/20'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                        isExpanded ? 'bg-amber-300 text-[#722F45]' : 'bg-[#D5A3AE]/40 text-[#722F45]'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="truncate max-w-[200px]">{note.conceptHeading}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* EXPANDABLE ACCORDION CARDS FOR EACH SUBTOPIC */}
          {currentChapter.conceptNotes.map((note, index) => {
            const isExpanded = expandedNotes.includes(note.id);
            const matchedBranch = currentMindMap?.branches.find(
              b => b.title.toLowerCase().includes(note.conceptHeading.toLowerCase()) || 
                   note.conceptHeading.toLowerCase().includes(b.title.toLowerCase())
            ) || currentMindMap?.branches[index];

            return (
              <div
                key={note.id}
                id={`subtopic-${note.id}`}
                className="rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/70 shadow-xs overflow-hidden transition-all"
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleNoteExpand(note.id)}
                  className="w-full p-5 sm:p-6 bg-linear-to-r from-[#FAF4EE] via-white to-[#FAF4EE] hover:bg-[#FFFDF9] flex items-center justify-between gap-4 text-left border-b border-[#D5A3AE]/40 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-9 h-9 rounded-2xl bg-[#722F45] text-amber-300 font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                      {currentChapter.chapterNumber}.{index + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C4057]">
                        Subtopic {currentChapter.chapterNumber}.{index + 1}
                      </span>
                      <h3 className="font-extrabold text-base text-[#722F45] leading-tight">
                        {note.conceptHeading}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-[11px] font-bold text-[#6C555C]">
                      {isExpanded ? 'Hide Details' : 'View Subtopic Notes'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#D5A3AE]/30 flex items-center justify-center text-[#722F45]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Accordion Expanded Body */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-5 bg-[#FAF4EE]">
                    
                    {/* Exact Textbook Definition Callout */}
                    {matchedBranch?.exactDefinition && (
                      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-1 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block font-serif">
                          Exact Telangana Textbook Definition:
                        </span>
                        <blockquote className="text-xs italic text-[#2D2226] leading-relaxed font-serif">
                          "{matchedBranch.exactDefinition}"
                        </blockquote>
                      </div>
                    )}

                    {/* Detailed Simple English Explanation */}
                    <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/40 space-y-1 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                        Detailed Explanation (Simple English):
                      </span>
                      <p className="text-xs text-[#2D2226] leading-relaxed font-medium">
                        {note.simpleMeaning}
                      </p>
                    </div>

                    {/* 4-5 Important Points & Properties */}
                    <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/40 space-y-2 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                        Important Points &amp; Properties ({note.keyPoints.length}):
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#2D2226]">
                        {note.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Formula & Worked Example Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {note.formula && (
                        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-1.5 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              Exact Textbook Formula:
                            </span>
                            <button
                              onClick={() => handleCopyText(note.formula || '', note.id)}
                              className="text-xs text-[#722F45] font-bold hover:underline cursor-pointer flex items-center gap-1"
                            >
                              {copiedId === note.id ? (
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

                      <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/40 space-y-1 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                          Textbook Worked Example:
                        </span>
                        <p className="text-xs text-[#2D2226] leading-relaxed font-medium">
                          {note.easyExample}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Textbook Solution Steps if available */}
                    {matchedBranch?.textbookExamples && matchedBranch.textbookExamples.length > 0 && (
                      <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 block">
                          Step-by-Step Solution Breakdown:
                        </span>
                        {matchedBranch.textbookExamples.map((ex, eIdx) => (
                          <div key={eIdx} className="space-y-1.5 bg-white p-3 rounded-xl border border-purple-100 text-xs">
                            <strong className="text-purple-950 font-bold block">{ex.problem}</strong>
                            <div className="space-y-1">
                              {ex.solutionSteps.map((step, sIdx) => (
                                <div key={sIdx} className="text-[11px] text-[#2D2226] leading-relaxed flex items-start gap-1.5">
                                  <span className="font-bold text-purple-700">{sIdx + 1}.</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Student Common Mistakes & Short Revision Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-300 space-y-1.5 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          Common Student Mistakes to Avoid:
                        </span>
                        <ul className="space-y-1 text-xs text-rose-950">
                          {note.commonMistakes.map((mst, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-1.5">
                              <span className="text-rose-600 font-bold">&bull;</span>
                              <span className="leading-snug">{mst}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-1.5 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                          Short Revision Summary:
                        </span>
                        <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                          {note.shortSummary}
                        </p>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PREMIUM VISUAL MIND MAP                                            */}
      {/* ========================================================================= */}
      {activeTab === 'mindmap' && (
        <div className="space-y-6">
          {currentMindMap ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Radial Connected Mind Map Canvas (7 Cols) */}
              <div className="lg:col-span-7 bg-linear-to-br from-[#FAF4EE] via-[#FFFDF9] to-[#FAF4EE] p-5 sm:p-7 rounded-3xl border-2 border-[#D5A3AE]/70 shadow-md relative min-h-[580px] flex flex-col justify-between overflow-hidden">
                
                {/* SVG Bezier Line Canvas */}
                <div className="relative w-full h-[520px] flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                    {currentMindMap.branches.map((branch, idx) => {
                      const total = currentMindMap.branches.length;
                      const angle = (idx * (2 * Math.PI / total)) - (Math.PI / 2);
                      const radiusX = 38; 
                      const radiusY = 36;
                      const cx = 50;
                      const cy = 50;
                      const bx = cx + radiusX * Math.cos(angle);
                      const by = cy + radiusY * Math.sin(angle);

                      const cp1x = cx + (radiusX * 0.45) * Math.cos(angle);
                      const cp1y = cy + (radiusY * 0.45) * Math.sin(angle);
                      const cp2x = bx - (radiusX * 0.2) * Math.cos(angle);
                      const cp2y = by - (radiusY * 0.2) * Math.sin(angle);

                      const isActive = activeBranch?.id === branch.id;
                      const theme = COLOR_THEMES[branch.colorTheme];

                      return (
                        <g key={branch.id}>
                          <path
                            d={`M ${cx}% ${cy}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${bx}% ${by}%`}
                            fill="none"
                            stroke={isActive ? theme.stroke : '#D5A3AE'}
                            strokeWidth={isActive ? '3.5' : '2'}
                            strokeDasharray={isActive ? 'none' : '4 3'}
                            className="transition-all duration-300"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Central Node */}
                  <div className="absolute z-10 text-center flex flex-col items-center justify-center">
                    <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-[#722F45] to-[#4A1D2D] text-white shadow-2xl border-4 border-amber-300/80 max-w-[210px]">
                      <div className="w-10 h-10 rounded-2xl bg-amber-400 text-[#722F45] flex items-center justify-center mx-auto mb-2 shadow-md font-bold">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-black/20 px-2 py-0.5 rounded-full block mb-1">
                        Chapter {currentMindMap.chapterNumber}
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base leading-tight font-serif-accent">
                        {currentMindMap.chapterName}
                      </h4>
                    </div>
                  </div>

                  {/* Radial Branch Nodes */}
                  {currentMindMap.branches.map((branch, idx) => {
                    const total = currentMindMap.branches.length;
                    const angle = (idx * (2 * Math.PI / total)) - (Math.PI / 2);
                    const radiusX = 38; 
                    const radiusY = 36;
                    const leftPct = 50 + radiusX * Math.cos(angle);
                    const topPct = 50 + radiusY * Math.sin(angle);

                    const isActive = activeBranch?.id === branch.id;
                    const theme = COLOR_THEMES[branch.colorTheme];

                    return (
                      <div
                        key={branch.id}
                        style={{
                          left: `${leftPct}%`,
                          top: `${topPct}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => setActiveBranchId(branch.id)}
                        className={`absolute z-20 cursor-pointer transition-all duration-300 ${
                          isActive
                            ? 'scale-110 ring-4 ring-amber-400 shadow-xl'
                            : 'hover:scale-105 opacity-90 shadow-md'
                        }`}
                      >
                        <div className={`p-2.5 sm:p-3 rounded-2xl border-2 flex items-center gap-2 max-w-[170px] ${theme.nodeBg} ${theme.nodeBorder}`}>
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white bg-linear-to-r ${theme.gradient} shadow-2xs`}>
                            {renderIconByName(branch.iconName, "w-3.5 h-3.5")}
                          </div>
                          <div className="overflow-hidden text-left">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider block text-gray-500">
                              Branch {idx + 1}
                            </span>
                            <h5 className={`font-bold text-[11px] leading-tight truncate ${theme.text}`}>
                              {branch.title}
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>

                <div className="pt-3 border-t border-[#D5A3AE]/40 flex items-center justify-between text-[11px] text-[#6C555C]">
                  <span>Click any branch node above to inspect details</span>
                  <span className="font-bold text-[#722F45]">Chapter {currentMindMap.chapterNumber} Mind Map</span>
                </div>

              </div>

              {/* Active Branch Inspector (5 Cols) */}
              <div className="lg:col-span-5">
                {activeBranch ? (
                  <div className={`p-6 rounded-3xl border-2 shadow-xl space-y-4 ${COLOR_THEMES[activeBranch.colorTheme].lightBg} ${COLOR_THEMES[activeBranch.colorTheme].nodeBorder}`}>
                    
                    <div className="flex items-center gap-3 border-b border-black/10 pb-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-linear-to-r ${COLOR_THEMES[activeBranch.colorTheme].gradient} shadow-md`}>
                        {renderIconByName(activeBranch.iconName, "w-5 h-5")}
                      </div>
                      <div>
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${COLOR_THEMES[activeBranch.colorTheme].badgeBg}`}>
                          Branch Breakdown &bull; {activeBranch.title}
                        </span>
                        <h3 className="font-extrabold text-base text-[#2D2226] leading-tight mt-0.5">
                          {activeBranch.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-1 p-3.5 rounded-2xl bg-white/90 border border-black/5 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                        What does it mean? (Simple English)
                      </span>
                      <p className="text-xs text-[#2D2226] leading-relaxed font-medium">
                        {activeBranch.whatDoesItMean}
                      </p>
                    </div>

                    {activeBranch.exactDefinition && (
                      <div className="space-y-1 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block font-serif">
                          Exact Telangana Textbook Definition:
                        </span>
                        <blockquote className="text-xs italic text-[#2D2226] leading-relaxed">
                          "{activeBranch.exactDefinition}"
                        </blockquote>
                      </div>
                    )}

                    {activeBranch.symbolMeanings && activeBranch.symbolMeanings.length > 0 && (
                      <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/90 border border-black/5 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                          Meaning of Symbols:
                        </span>
                        <ul className="space-y-1 text-xs text-[#2D2226]">
                          {activeBranch.symbolMeanings.map((sym, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5 font-medium">
                              <span className="text-[#722F45] font-bold">&bull;</span>
                              <span>{sym}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/90 border border-black/5 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                        Key Points &amp; Properties ({activeBranch.keyPoints.length}):
                      </span>
                      <ul className="space-y-1 text-xs text-[#2D2226]">
                        {activeBranch.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {activeBranch.formula && (
                      <div className="p-3.5 rounded-2xl bg-white/95 border border-amber-300 text-xs font-mono font-bold text-[#722F45] shadow-2xs leading-relaxed break-words">
                        {activeBranch.formula}
                      </div>
                    )}

                    {activeBranch.textbookExamples && activeBranch.textbookExamples.length > 0 && (
                      <div className="space-y-2 p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs shadow-2xs">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-900 block">
                          Textbook Solved Example:
                        </span>
                        {activeBranch.textbookExamples.map((ex, eIdx) => (
                          <div key={eIdx} className="space-y-1.5 bg-white p-2.5 rounded-xl border border-purple-200">
                            <strong className="text-purple-950 font-bold block">{ex.problem}</strong>
                            <div className="space-y-1">
                              {ex.solutionSteps.map((step, sIdx) => (
                                <div key={sIdx} className="text-[11px] text-[#2D2226] leading-relaxed">
                                  <span className="font-bold text-purple-700 mr-1">{sIdx + 1}.</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeBranch.commonMistakes && activeBranch.commonMistakes.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-rose-950 space-y-1 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900 block">
                          Common Student Mistake:
                        </span>
                        {activeBranch.commonMistakes.map((m, mIdx) => (
                          <p key={mIdx} className="leading-relaxed font-medium">⚠️ {m}</p>
                        ))}
                      </div>
                    )}

                    {activeBranch.practiceQuestions && activeBranch.practiceQuestions.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-1.5 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 block">
                          Practice Question:
                        </span>
                        {activeBranch.practiceQuestions.map((pq, qIdx) => (
                          <div key={qIdx} className="space-y-1 bg-white p-2.5 rounded-xl border border-indigo-100">
                            <p className="font-bold">{pq.question}</p>
                            <p className="text-emerald-800 font-bold text-[11px]">✓ Answer: {pq.answer}</p>
                            <p className="text-[#3D2C33] text-[11px] leading-relaxed">{pq.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeBranch.realLifeApp && (
                      <div className="p-3.5 rounded-2xl bg-emerald-100/80 border border-emerald-300 text-xs text-emerald-950 font-medium">
                        <strong>Real-Life: </strong>{activeBranch.realLifeApp}
                      </div>
                    )}

                    <button
                      onClick={() => setActiveTab('concepts')}
                      className="w-full py-2.5 rounded-2xl bg-[#722F45] hover:bg-[#5C2436] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <BookOpen className="w-4 h-4 text-amber-300" />
                      <span>Open Full Concept Notes Tab ►</span>
                    </button>

                  </div>
                ) : (
                  <div className="p-6 text-center rounded-3xl bg-white border border-[#D5A3AE]/50 text-gray-500">
                    Select a branch to inspect its details.
                  </div>
                )}
              </div>

            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: REAL-LIFE USES                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'reallife' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-1">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#722F45] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              Everyday Relatable Applications &bull; Chapter {currentChapter.chapterNumber}
            </h3>
            <p className="text-xs text-[#6C555C]">
              Discover how concepts in <strong>{currentChapter.chapterName}</strong> power technology, sports, medicine, and everyday decision making!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentChapter.realLifeUses.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/60 space-y-3 shadow-xs hover:border-[#722F45] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#722F45] text-white flex items-center justify-center shadow-xs">
                    {renderIconByName(item.iconName, "w-5 h-5 text-amber-300")}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C4057]">
                      Real-Life Scenario {idx + 1}
                    </span>
                    <h4 className="font-extrabold text-sm text-[#2D2226]">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-[#3D2C33] leading-relaxed font-medium bg-white p-4 rounded-2xl border border-[#D5A3AE]/40">
                  {item.scenario}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: QUIZ GAME                                                          */}
      {/* ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          
          {/* Quiz Stats & Difficulty Filter Bar */}
          <div className="p-5 rounded-3xl bg-white border border-[#D5A3AE]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057]">
                  Chapter {currentChapter.chapterNumber} Interactive Quiz
                </span>
                <h3 className="font-extrabold text-sm text-[#2D2226]">
                  {currentChapter.chapterName} Quiz ({filteredQuizQuestions.length} Questions)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#722F45] bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300">
                Score: {currentChapterQuizScore} Correct
              </span>
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 rounded-xl border border-[#D5A3AE] text-xs font-bold text-[#722F45] hover:bg-[#D5A3AE]/20 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Quiz</span>
              </button>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#722F45] mr-1">Difficulty:</span>
            {(['All', 'Easy', 'Medium', 'Challenging'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => setQuizDifficultyFilter(diff)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  quizDifficultyFilter === diff
                    ? 'bg-[#722F45] text-white shadow-2xs'
                    : 'bg-white border border-[#D5A3AE]/50 text-[#5A454C] hover:bg-[#D5A3AE]/20'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Quiz Question Cards */}
          <div className="space-y-6">
            {filteredQuizQuestions.map((q, idx) => {
              const selectedIdx = selectedAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = selectedIdx === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border-2 transition-all shadow-xs space-y-4 bg-white ${
                    isAnswered
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/20'
                        : 'border-rose-400 bg-rose-50/20'
                      : 'border-[#D5A3AE]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2.5 py-0.5 rounded">
                      Question {idx + 1} &bull; {q.difficulty}
                    </span>
                    {isAnswered && (
                      <span className={`text-xs font-extrabold px-3 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? 'Correct! +1' : 'Incorrect'}
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-sm text-[#2D2226] leading-snug">
                    {q.question}
                  </h4>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-[#FAF4EE] border-[#D5A3AE]/50 text-[#2D2226] hover:bg-[#D5A3AE]/30';
                      if (isAnswered) {
                        if (optIdx === q.correctAnswerIndex) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                        } else if (optIdx === selectedIdx) {
                          btnStyle = 'bg-rose-600 text-white border-rose-700 font-bold';
                        } else {
                          btnStyle = 'bg-gray-100 border-gray-200 text-gray-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectQuizOption(q.id, optIdx, q.correctAnswerIndex)}
                          className={`p-3.5 rounded-2xl border text-xs text-left transition-all cursor-pointer font-medium ${btnStyle}`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Instant Explanation Callout */}
                  {showQuizExplanations[q.id] && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-1 text-xs text-amber-950 shadow-2xs">
                      <strong className="text-amber-900 font-extrabold block">Explanation:</strong>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PRACTICE ZONE                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-1">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#722F45] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" />
              Practice Zone &bull; Chapter {currentChapter.chapterNumber}
            </h3>
            <p className="text-xs text-[#6C555C]">
              Work through step-by-step problem sets with progressive hints and complete textbook-level solutions.
            </p>
          </div>

          <div className="space-y-6">
            {currentChapter.practiceProblems.map((prob, idx) => (
              <div
                key={prob.id}
                className="p-6 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/60 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#D5A3AE]/40 pb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2.5 py-0.5 rounded">
                    Problem {idx + 1} &bull; {prob.category}
                  </span>
                  <span className="text-xs font-bold text-[#722F45] font-mono">
                    {prob.title}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/40 space-y-1 font-medium text-xs text-[#2D2226]">
                  <p className="leading-relaxed">{prob.problemText}</p>
                </div>

                {/* Actions: Show Hint & Show Full Solution Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => setActiveHints(prev => ({ ...prev, [prob.id]: !prev[prob.id] }))}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                    <span>{activeHints[prob.id] ? 'Hide Hint' : 'Show Step-by-Step Hint'}</span>
                  </button>

                  <button
                    onClick={() => setActiveExplanations(prev => ({ ...prev, [prob.id]: !prev[prob.id] }))}
                    className="px-4 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {activeExplanations[prob.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{activeExplanations[prob.id] ? 'Hide Full Solution' : 'Show Full Worked Solution'}</span>
                  </button>
                </div>

                {/* Hint Step-by-Step Box */}
                {activeHints[prob.id] && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-xs text-amber-950 shadow-2xs">
                    <strong className="text-amber-900 font-extrabold block">Step-by-Step Guidance Hints:</strong>
                    <ul className="space-y-1">
                      {prob.hintStepByStep.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-700 font-bold">&bull;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Full Explanation Box */}
                {activeExplanations[prob.id] && (
                  <div className="p-5 rounded-2xl bg-white border-2 border-emerald-400 space-y-3 text-xs text-[#2D2226] shadow-md">
                    <strong className="text-emerald-900 font-extrabold text-sm block border-b border-emerald-200 pb-2">
                      Complete Step-by-Step Worked Explanation:
                    </strong>
                    <p className="whitespace-pre-wrap leading-relaxed font-medium">
                      {prob.fullExplanation}
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-950 font-bold text-xs">
                      Final Answer: {prob.finalAnswer}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: MINI PROJECTS                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'miniproject' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-1">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#722F45] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-600" />
              Hands-On Mini Projects &bull; Chapter {currentChapter.chapterNumber}
            </h3>
            <p className="text-xs text-[#6C555C]">
              Practical student projects designed to apply classroom mathematics and science concepts in tangible ways!
            </p>
          </div>

          <div className="space-y-6">
            {currentChapter.miniProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/60 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-[#D5A3AE]/40 pb-3">
                  <h4 className="font-extrabold text-base text-[#722F45]">
                    {proj.title}
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#722F45] px-2.5 py-0.5 rounded">
                    Student Project
                  </span>
                </div>

                <div className="space-y-1 p-3.5 rounded-2xl bg-white border border-[#D5A3AE]/40">
                  <strong className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">Objective:</strong>
                  <p className="text-xs text-[#2D2226] font-medium leading-relaxed">{proj.objective}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 p-3.5 rounded-2xl bg-white border border-[#D5A3AE]/40">
                    <strong className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">Materials Required:</strong>
                    <ul className="space-y-1 text-xs text-[#2D2226]">
                      {proj.materialsRequired.map((mat, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 p-3.5 rounded-2xl bg-white border border-[#D5A3AE]/40">
                    <strong className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">Project Steps:</strong>
                    <ol className="space-y-1 text-xs text-[#2D2226]">
                      {proj.steps.map((st, sIdx) => (
                        <li key={sIdx} className="leading-relaxed">{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-300 text-purple-950 space-y-1">
                  <strong className="text-[10px] font-bold uppercase tracking-wider text-purple-900 block">Expected Learning Outcome:</strong>
                  <p className="text-xs font-medium leading-relaxed">{proj.expectedOutcome}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: MULTILINGUAL LEARNING RESOURCES (ENGLISH, HINDI, TELUGU)           */}
      {/* ========================================================================= */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          
          {/* Header & Language Filter Bar */}
          <div className="p-5 rounded-3xl bg-white border border-[#D5A3AE]/60 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#722F45] flex items-center gap-1.5">
                  <Youtube className="w-4.5 h-4.5 text-red-600" />
                  Multilingual Educational Video Lectures &bull; Chapter {currentChapter.chapterNumber}: {currentChapter.chapterName}
                </h3>
                <p className="text-xs text-[#6C555C]">
                  Topic-wise curated video options in <strong>English, Hindi, and Telugu</strong> from Physics Wallah, Khan Academy, Vedantu, Unacademy, and Telangana Intermediate expert teachers.
                </p>
              </div>

              <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-xl shrink-0">
                {currentChapter.learningResources.length} Video Options
              </span>
            </div>

            {/* Language Selection Filter Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#D5A3AE]/40 flex-wrap">
              <span className="text-xs font-bold text-[#722F45] mr-1">Select Video Language:</span>
              {(['All', 'English', 'Hindi', 'Telugu'] as const).map(lang => {
                const isActive = resourceLangFilter === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setResourceLangFilter(lang)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#722F45] text-white shadow-xs ring-2 ring-[#722F45]/30'
                        : 'bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#5A454C] hover:bg-[#D5A3AE]/30'
                    }`}
                  >
                    <span>{lang === 'All' ? '🌐 All Languages' : lang === 'English' ? '🇬🇧 English' : lang === 'Hindi' ? '🇮🇳 Hindi' : '🏛️ Telugu'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multilingual Video Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentChapter.learningResources
              .filter(res => resourceLangFilter === 'All' || res.language === resourceLangFilter || !res.language)
              .map((res) => {
                const langBadgeColor = res.language === 'English'
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : res.language === 'Hindi'
                  ? 'bg-orange-100 text-orange-800 border-orange-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300';

                return (
                  <a
                    key={res.id}
                    href={res.searchQueryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-5 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/60 hover:border-[#722F45] transition-all space-y-3 shadow-xs group block hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border ${langBadgeColor}`}>
                          {res.language ? `${res.language}` : 'Multilingual'}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2.5 py-0.5 rounded border border-red-200">
                          {res.topicType}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#722F45] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>

                    <div>
                      {res.topicName && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057] block">
                          Topic: {res.topicName}
                        </span>
                      )}
                      <h4 className="font-extrabold text-sm text-[#2D2226] group-hover:text-[#722F45] leading-snug mt-0.5">
                        {res.title}
                      </h4>
                    </div>

                    <p className="text-xs text-[#5A454C] leading-relaxed">
                      {res.description}
                    </p>

                    <div className="pt-2 border-t border-[#D5A3AE]/40 flex items-center justify-between text-[11px] text-[#722F45] font-bold">
                      <span>📺 {res.channelName || res.sourceName}</span>
                      {res.teacherName && <span className="text-gray-600 font-semibold">&bull; {res.teacherName}</span>}
                    </div>

                    <div className="w-full py-2 rounded-xl bg-[#722F45] text-white text-xs font-bold text-center group-hover:bg-[#5C2436] transition-colors flex items-center justify-center gap-2">
                      <PlayCircle className="w-4 h-4 text-amber-300" />
                      <span>Watch Video on YouTube ►</span>
                    </div>
                  </a>
                );
              })}
          </div>

        </div>
      )}

      </>
      )}

    </div>
  );
};
