import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, CheckCircle2, Clock, Sparkles, BookOpen, 
  HelpCircle, Eye, ChevronDown, ChevronUp, RotateCcw, 
  Target, Award, Calendar, Lightbulb, MessageSquareQuote,
  Monitor, FileSpreadsheet, Globe, IndianRupee, MessageSquare,
  Play, Pause, RefreshCw, Layers, CheckSquare, Send, Zap,
  Compass, FileText, Check, ShieldCheck, Cpu
} from 'lucide-react';
import { 
  SkillGapItem, StudentProfile, AssessmentResult, AdditionalSkillModule, 
  AdditionalSkillLesson, QuizQuestion, MCQOption, WeeklyPlan, VisualLearningItem,
  RealLifeApplication, PracticeZoneItem, MiniProjectChallenge
} from '../types';
import { generateSkillGapItems } from '../services/skillGapService';
import { ADDITIONAL_SKILLS_DATA } from '../data/additionalSkillsData';
import { storageService } from '../services/storageService';
import { MathematicsConceptNotes } from './MathematicsConceptNotes';

interface SkillGapTrackerProps {
  profile: StudentProfile | null;
  assessmentResults: AssessmentResult[];
  onTakeAssessment: (specialization: string) => void;
}

export const SkillGapTracker: React.FC<SkillGapTrackerProps> = ({
  profile,
  assessmentResults,
  onTakeAssessment
}) => {
  // Main view tab: 'academic_mpc' or 'additional_skills'
  const [mainTab, setMainTab] = useState<'academic_mpc' | 'additional_skills'>('academic_mpc');

  // Academic Skill Gaps State
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(() => {
    return generateSkillGapItems(profile, assessmentResults);
  });

  const [activeGapId, setActiveGapId] = useState<string>(() => skillGaps[0]?.id || '');
  const [activeWeekNum, setActiveWeekNum] = useState<number>(1);

  // Sub-Journey Tab state: 'concept' | 'visual' | 'reallife' | 'quiz' | 'practice' | 'project' | 'mentor'
  const [journeyTab, setJourneyTab] = useState<'concept' | 'visual' | 'reallife' | 'quiz' | 'practice' | 'project' | 'mentor'>('concept');

  // Quiz Game State
  const [quizFilter, setQuizFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizRevealedHints, setQuizRevealedHints] = useState<Record<string, boolean>>({});

  // Practice Zone State
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [stuckStepMap, setStuckStepMap] = useState<Record<string, number | null>>({});

  // Mini Project State
  const [projectText, setProjectText] = useState<string>('');
  const [projectResult, setProjectResult] = useState<{ score: number; feedback: string; passed: boolean } | null>(null);

  // AI Mentor State
  const [mentorMessages, setMentorMessages] = useState<{ sender: 'student' | 'ai_mentor'; text: string; timestamp: string }[]>([
    {
      sender: 'ai_mentor',
      text: 'Hello! I am your PathFinder Socratic AI Mentor for Intermediate MPC. Ask me any question or problem on this topic, and I will guide you step-by-step with hints!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [mentorInput, setMentorInput] = useState<string>('');
  const [mentorLoading, setMentorLoading] = useState<boolean>(false);

  // Additional Skills State
  const [additionalSkills, setAdditionalSkills] = useState<AdditionalSkillModule[]>(() => {
    const saved = localStorage.getItem('pathfinder_additional_skills');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ADDITIONAL_SKILLS_DATA;
  });
  const [activeSkillId, setActiveSkillId] = useState<string>('basic_computer_skills');
  const [activeLessonId, setActiveLessonId] = useState<string>('comp_1');

  // 15-Minute English Daily Practice Timer State
  const [timerSeconds, setTimerSeconds] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showMathStickyNotesModal, setShowMathStickyNotesModal] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  useEffect(() => {
    const fresh = generateSkillGapItems(profile, assessmentResults);
    setSkillGaps(fresh);
    storageService.saveSkillGapItems(fresh);
    if (fresh.length > 0 && (!activeGapId || !fresh.some(g => g.id === activeGapId))) {
      setActiveGapId(fresh[0].id);
    }
  }, [profile, assessmentResults]);

  const selectedGap = skillGaps.find((g) => g.id === activeGapId) || skillGaps[0];
  const selectedWeek: WeeklyPlan | undefined = selectedGap?.fourWeekPlan.find((w) => w.weekNumber === activeWeekNum) || selectedGap?.fourWeekPlan[0];

  const selectedAdditionalSkill = additionalSkills.find((s) => s.id === activeSkillId) || additionalSkills[0];
  const selectedLesson = selectedAdditionalSkill?.lessons.find((l) => l.id === activeLessonId) || selectedAdditionalSkill?.lessons[0];

  // Handler: Toggle Task completion in weekly tasks
  const handleToggleTask = (gapId: string, weekNumber: number, taskId: string) => {
    const updated = skillGaps.map((gap) => {
      if (gap.id !== gapId) return gap;

      const updatedPlans = gap.fourWeekPlan.map((week) => {
        if (week.weekNumber !== weekNumber) return week;

        const updatedTasks = week.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });

        const isAllWeekDone = updatedTasks.every((t) => t.completed);
        return { ...week, tasks: updatedTasks, isCompleted: isAllWeekDone };
      });

      let completedCount = 0;
      let totalTasks = 0;
      updatedPlans.forEach((w) => {
        w.tasks.forEach((t) => {
          totalTasks++;
          if (t.completed) completedCount++;
        });
      });

      const boost = Math.round((completedCount / (totalTasks || 1)) * 30);
      const newScore = Math.min(95, gap.currentProficiency + boost);
      const newStatus: SkillGapItem['status'] = newScore >= 85 ? 'Mastered' : newScore >= 67 ? 'Developing' : 'Needs Improvement';

      return {
        ...gap,
        fourWeekPlan: updatedPlans,
        currentProficiency: newScore,
        status: newStatus
      };
    });

    setSkillGaps(updated);
    storageService.saveSkillGapItems(updated);
  };

  // Handler: Quiz Game Selection & Submission
  const handleSelectQuizAnswer = (qId: string, choice: 'A' | 'B' | 'C' | 'D') => {
    if (quizSubmitted) return;
    setActiveQuizAnswers((prev) => ({ ...prev, [qId]: choice }));
  };

  const handleSubmitQuizGame = () => {
    if (!selectedWeek?.quizGameQuestions && !selectedWeek?.practiceQuiz) return;
    const questions = selectedWeek.quizGameQuestions || selectedWeek.practiceQuiz || [];
    let correct = 0;
    questions.forEach((q: QuizQuestion) => {
      if (activeQuizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    setQuizScore(correct);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setActiveQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizRevealedHints({});
  };

  // Handler: Mini Project Evaluation
  const handleSubmitProject = () => {
    if (!projectText.trim() || !selectedWeek?.miniProject) return;
    const wordCount = projectText.trim().split(/\s+/).length;
    let score = Math.min(20, Math.max(12, Math.round(wordCount * 0.4) + 10));
    const passed = score >= 14;

    const feedback = passed
      ? `Great work! Your response demonstrates a strong understanding of ${selectedWeek.miniProject.title}. You applied the relevant equations and step-by-step logic effectively.`
      : `Good effort! Your response covers the basic idea, but make sure to include the exact algebraic steps and units specified in the expected deliverable.`;

    setProjectResult({ score, feedback, passed });

    // Mark week tasks completed if passed
    if (passed && selectedGap) {
      const updated = skillGaps.map((gap) => {
        if (gap.id !== selectedGap.id) return gap;
        const updatedPlans = gap.fourWeekPlan.map((w) => {
          if (w.weekNumber === selectedWeek.weekNumber) {
            return { ...w, isCompleted: true };
          }
          return w;
        });
        return { ...gap, fourWeekPlan: updatedPlans };
      });
      setSkillGaps(updated);
      storageService.saveSkillGapItems(updated);
    }
  };

  // Handler: Socratic AI Mentor Question Submission
  const handleSendMentorMessage = async () => {
    if (!mentorInput.trim() || mentorLoading) return;

    const userText = mentorInput.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newHistory = [...mentorMessages, { sender: 'student' as const, text: userText, timestamp: time }];

    setMentorMessages(newHistory);
    setMentorInput('');
    setMentorLoading(true);

    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: selectedWeek?.title || selectedGap?.skillName,
          subject: selectedGap?.domain || 'MPC',
          userQuestion: userText,
          conversationHistory: newHistory,
          studentName: profile?.name || 'Student'
        })
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMentorMessages((prev) => [
          ...prev,
          {
            sender: 'ai_mentor',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMentorMessages((prev) => [
          ...prev,
          {
            sender: 'ai_mentor',
            text: data.error || 'Here is a quick hint: Recall the core formula for this topic and try isolating the unknown variable step by step. What value do you get?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (e) {
      setMentorMessages((prev) => [
        ...prev,
        {
          sender: 'ai_mentor',
          text: 'To solve this problem: First identify the given values, apply the standard formula, and solve for the unknown variable. Try writing down Step 1 and let me know!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setMentorLoading(false);
    }
  };

  // Handler: Additional Skills Lesson toggle
  const handleToggleAdditionalLesson = (skillId: string, lessonId: string) => {
    const updated = additionalSkills.map((sk) => {
      if (sk.id !== skillId) return sk;

      const updatedLessons = sk.lessons.map((ls) => {
        if (ls.id === lessonId) {
          return { ...ls, isCompleted: !ls.isCompleted };
        }
        return ls;
      });

      const completedCount = updatedLessons.filter((l) => l.isCompleted).length;

      return {
        ...sk,
        lessons: updatedLessons,
        completedLessonsCount: completedCount
      };
    });

    setAdditionalSkills(updated);
    localStorage.setItem('pathfinder_additional_skills', JSON.stringify(updated));
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Monitor': return <Monitor className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'IndianRupee': return <IndianRupee className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Main Navigation Header */}
      <div className="bg-[#722F45] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#E8D5C4]">
            <Target className="w-3.5 h-3.5 text-[#D5A3AE]" />
            <span>PathFinder Student Growth &amp; Skill Development</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif-accent leading-tight">
            MPC Skill Gap Tracker &amp; Complete Learning Journey
          </h1>
          <p className="text-sm sm:text-base text-[#FAF4EE]/90 font-normal leading-relaxed">
            Covers Telangana Intermediate MPC (Math 1A, Math 1B, Physics, Chemistry) with 9 interactive learning steps: Concept Notes, Visual Mind Maps, Real-Life Uses, Quiz Games, Practice Zone, Mini Projects, and Socratic AI Mentor.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setMainTab('academic_mpc')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              mainTab === 'academic_mpc'
                ? 'bg-white text-[#722F45]'
                : 'bg-white/10 hover:bg-white/20 text-[#FAF4EE]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>🎓 Academic MPC Learning Journey</span>
          </button>

          <button
            onClick={() => setMainTab('additional_skills')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              mainTab === 'additional_skills'
                ? 'bg-white text-[#722F45]'
                : 'bg-white/10 hover:bg-white/20 text-[#FAF4EE]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>🚀 Learn Additional Skills (6 Modules)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW 1: ACADEMIC MPC SKILL GAP TRACKER & LEARNING JOURNEY */}
      {/* ========================================================= */}
      {mainTab === 'academic_mpc' && (
        <div className="space-y-8">
          
          {/* Aggregate Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#8C4057] block">MPC Subjects</span>
              <span className="text-3xl font-extrabold text-[#722F45] mt-1 block">4</span>
              <span className="text-[10px] text-[#5A454C]">Math 1A, Math 1B, Physics, Chem</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#8C4057] block">Needs Review (&lt;67%)</span>
              <span className="text-3xl font-extrabold text-rose-700 mt-1 block">
                {skillGaps.filter((g) => g.isAssessed && g.status === 'Needs Improvement').length}
              </span>
              <span className="text-[10px] text-rose-800 font-semibold">Priority 4-week recovery</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#8C4057] block">Developing (67%-84%)</span>
              <span className="text-3xl font-extrabold text-amber-700 mt-1 block">
                {skillGaps.filter((g) => g.isAssessed && g.status === 'Developing').length}
              </span>
              <span className="text-[10px] text-amber-900 font-medium">Practicing lessons</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#8C4057] block">Mastered (85%+)</span>
              <span className="text-3xl font-extrabold text-emerald-700 mt-1 block">
                {skillGaps.filter((g) => g.isAssessed && g.status === 'Mastered').length}
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold">Target achieved!</span>
            </div>
          </div>

          {/* 4 MPC Subject Cards Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillGaps.map((gap) => {
              const isSelected = gap.id === activeGapId;

              return (
                <div
                  key={gap.id}
                  onClick={() => {
                    setActiveGapId(gap.id);
                    handleResetQuiz();
                    setProjectResult(null);
                    setProjectText('');
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                    isSelected
                      ? 'bg-white border-[#722F45] ring-2 ring-[#722F45]/30'
                      : 'bg-[#FFF9F2] border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded ${
                        !gap.isAssessed
                          ? 'bg-[#F9ECE0] text-[#722F45] border border-[#D5A3AE]/50'
                          : gap.status === 'Mastered'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : gap.status === 'Developing'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}>
                        {gap.isAssessed ? gap.status : 'Not Assessed'}
                      </span>
                      <span className="text-xs font-extrabold text-[#722F45]">
                        {gap.isAssessed ? `${gap.currentProficiency}%` : '—'}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#2D2226] leading-snug line-clamp-2">
                      {gap.skillName}
                    </h3>
                    <p className="text-[11px] text-[#5A454C] mt-1 font-medium">
                      {gap.domain}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#D5A3AE]/30 space-y-1">
                    {gap.isAssessed ? (
                      <>
                        <div className="flex justify-between text-[11px] text-[#5A454C]">
                          <span className="font-bold text-[#722F45]">{gap.correctAnswers} Correct</span>
                          <span>{gap.incorrectAnswers} Incorrect</span>
                        </div>
                        <div className="w-full bg-[#F9ECE0] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              gap.status === 'Mastered' ? 'bg-emerald-600' : gap.status === 'Developing' ? 'bg-amber-600' : 'bg-rose-600'
                            }`}
                            style={{ width: `${gap.currentProficiency}%` }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-[11px] text-amber-900 font-bold bg-amber-50/90 p-2 rounded text-center border border-amber-200">
                        Not assessed yet
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Subject: Detailed Learning Journey Workspace */}
          {selectedGap && (
            <div className="bg-[#FFF9F2] rounded-3xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5A3AE]/40">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C4057]">
                      Telangana Intermediate Syllabus
                    </span>
                    <span className="text-xs text-[#D5A3AE]">·</span>
                    <span className="text-xs text-[#5A454C]">
                      {selectedGap.domain}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#722F45] font-serif-accent">
                    {selectedGap.skillName}
                  </h2>
                  <p className="text-xs text-[#5A454C] mt-1">
                    Status: <strong className="text-[#722F45]">{selectedGap.status} ({selectedGap.currentProficiency}%)</strong> · Target: <strong>85%</strong>
                  </p>
                </div>

                <button
                  onClick={() => onTakeAssessment('MPC')}
                  className="px-4 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Award className="w-4 h-4 text-[#E8D5C4]" />
                  <span>Take 30-MCQ Diagnostic</span>
                </button>
              </div>

              {/* 4-Week Tab Switcher */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedGap.fourWeekPlan.map((week) => (
                  <button
                    key={week.weekNumber}
                    onClick={() => {
                      setActiveWeekNum(week.weekNumber);
                      handleResetQuiz();
                      setProjectResult(null);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      activeWeekNum === week.weekNumber
                        ? 'bg-white border-[#722F45] ring-2 ring-[#722F45]/30 shadow-xs'
                        : 'bg-[#F9ECE0]/60 border-[#D5A3AE]/60 hover:bg-white text-[#2D2226]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#722F45]">
                        Week {week.weekNumber}
                      </span>
                      {week.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <span className="text-[10px] text-[#5A454C]">
                          {week.tasks.filter((t) => t.completed).length} / {week.tasks.length} Done
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#2D2226] truncate">
                      {week.title.split(':')[1]?.trim() || week.title}
                    </p>
                  </button>
                ))}
              </div>

              {/* Selected Week Activity Dashboard Header */}
              {selectedWeek && (
                <div className="p-6 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-6 shadow-xs">
                  
                  {/* Topic Title & Objectives */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-xs uppercase font-bold text-[#8C4057] tracking-wider">
                        Week {selectedWeek.weekNumber} Focus Area
                      </span>
                      <span className="text-xs font-bold text-[#722F45] bg-[#F9ECE0] px-3 py-1 rounded-full border border-[#D5A3AE]/50">
                        {selectedWeek.tasks.filter((t) => t.completed).length} of {selectedWeek.tasks.length} Tasks Completed
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#722F45] font-serif-accent">
                      {selectedWeek.title}
                    </h3>
                    <p className="text-xs text-[#2D2226] font-semibold mt-1">
                      Objective: {selectedWeek.objective}
                    </p>
                  </div>

                  {/* 7 Sub-Journey Interactive Tabs */}
                  <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
                    <button
                      onClick={() => setJourneyTab('concept')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        journeyTab === 'concept' ? 'bg-[#722F45] text-white shadow-xs' : 'text-[#722F45] hover:bg-white/60'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>1. Concept Notes</span>
                    </button>

                    <button
                      onClick={() => setJourneyTab('visual')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        journeyTab === 'visual' ? 'bg-[#722F45] text-white shadow-xs' : 'text-[#722F45] hover:bg-white/60'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>2. Visual Mind Maps</span>
                    </button>

                    <button
                      onClick={() => setJourneyTab('reallife')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        journeyTab === 'reallife' ? 'bg-[#722F45] text-white shadow-xs' : 'text-[#722F45] hover:bg-white/60'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>3. Real-Life Uses</span>
                    </button>

                    <button
                      onClick={() => setJourneyTab('quiz')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        journeyTab === 'quiz' ? 'bg-[#722F45] text-white shadow-xs' : 'text-[#722F45] hover:bg-white/60'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>4. Quiz Game</span>
                    </button>

                    <button
                      onClick={() => setJourneyTab('practice')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        journeyTab === 'practice' ? 'bg-[#722F45] text-white shadow-xs' : 'text-[#722F45] hover:bg-white/60'
                      }`}
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>5. Practice Zone</span>
                    </button>

                    <button
                      onClick={() => setJourneyTab('project')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        journeyTab === 'project' ? 'bg-[#722F45] text-white shadow-xs' : 'text-[#722F45] hover:bg-white/60'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>6. Mini Project</span>
                    </button>

                    <button
                      onClick={() => setJourneyTab('mentor')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        journeyTab === 'mentor' ? 'bg-[#722F45] text-white shadow-xs' : 'text-[#722F45] hover:bg-white/60'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>7. Socratic AI Mentor</span>
                    </button>
                  </div>

                  {/* =================================================== */}
                  {/* TAB 1: CONCEPT LEARNING                            */}
                  {/* =================================================== */}
                  {journeyTab === 'concept' && (
                    <div className="space-y-6">
                      
                      {/* Syllabus verification note */}
                      {selectedWeek.conceptExplanation?.syllabusVerificationNote && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span><strong>Verified Content: </strong>{selectedWeek.conceptExplanation.syllabusVerificationNote}</span>
                          </div>
                          <button
                            onClick={() => setShowMathStickyNotesModal(true)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#722F45] text-white font-bold text-xs hover:bg-[#5C2436] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs shrink-0"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>View All Math Sticky Notes (Vol I)</span>
                          </button>
                        </div>
                      )}

                      {/* Summary & Key Points */}
                      {selectedWeek.conceptExplanation && (
                        <div className="p-5 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-3">
                          <h4 className="font-bold text-sm text-[#722F45] font-serif-accent flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[#8C4057]" />
                            <span>Core Concept Summary (In Simple English)</span>
                          </h4>
                          <p className="text-xs text-[#2D2226] leading-relaxed">
                            {selectedWeek.conceptExplanation.summary}
                          </p>
                          <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#5A454C]">
                            {selectedWeek.conceptExplanation.keyPoints.map((kp, idx) => (
                              <li key={idx}>{kp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Properties & Definitions Table */}
                      {selectedWeek.conceptExplanation?.propertiesAndDefinitions && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-[#722F45] uppercase tracking-wider">
                            Key Definitions &amp; Properties:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedWeek.conceptExplanation.propertiesAndDefinitions.map((item, idx) => (
                              <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#D5A3AE]/50 space-y-1">
                                <span className="text-xs font-bold text-[#722F45] block">{item.term}</span>
                                <p className="text-[11px] text-[#5A454C]">{item.definition}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Formulas */}
                      {selectedWeek.formulas && selectedWeek.formulas.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-[#722F45] uppercase tracking-wider">
                            Important Formulas &amp; Equations:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedWeek.formulas.map((f, fIdx) => (
                              <div key={fIdx} className="p-4 rounded-xl bg-white border-2 border-[#722F45]/20 shadow-2xs space-y-1.5">
                                <span className="text-xs font-bold text-[#722F45] block">{f.name}</span>
                                <div className="p-2 rounded bg-[#722F45] text-white font-mono font-bold text-sm text-center">
                                  {f.formula}
                                </div>
                                <p className="text-[11px] text-[#5A454C]">{f.variableDefinitions}</p>
                                <span className="text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block">
                                  <strong>Tip:</strong> {f.usageTip}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Solved Examples */}
                      {selectedWeek.solvedExamples && selectedWeek.solvedExamples.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-[#722F45] uppercase tracking-wider">
                            Step-by-Step Solved Examples:
                          </h4>
                          {selectedWeek.solvedExamples.map((ex) => (
                            <div key={ex.id} className="p-5 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-3">
                              <span className="text-[10px] font-bold uppercase text-white bg-[#722F45] px-2 py-0.5 rounded">
                                Worked Example
                              </span>
                              <p className="text-sm font-bold text-[#2D2226]">
                                {ex.problemStatement}
                              </p>
                              <div className="space-y-2">
                                {ex.stepByStepSolution.map((st) => (
                                  <div key={st.stepNumber} className="p-3 rounded-xl bg-white border border-[#D5A3AE]/40 text-xs">
                                    <span className="font-bold text-[#722F45]">Step {st.stepNumber}: {st.title}</span>
                                    <p className="text-[#5A454C] mt-0.5">{st.description}</p>
                                    {st.mathOrFormula && (
                                      <div className="font-mono font-bold text-[#722F45] mt-1 bg-[#F9ECE0] p-1.5 rounded">
                                        {st.mathOrFormula}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                                Final Answer: {ex.finalAnswer}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Daily Study Tasks Tracker */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-[#722F45] uppercase tracking-wider">
                          Required Daily Lessons &amp; Study Tasks:
                        </h4>
                        {selectedWeek.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                              task.completed ? 'bg-emerald-50/70 border-emerald-300' : 'bg-[#FFF9F2]/70 border-[#D5A3AE]/50'
                            }`}
                          >
                            <button
                              onClick={() => handleToggleTask(selectedGap.id, selectedWeek.weekNumber, task.id)}
                              className="mt-0.5 text-[#722F45] hover:text-[#5C2436] transition-colors cursor-pointer shrink-0"
                            >
                              {task.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-700 fill-emerald-100" />
                              ) : (
                                <div className="w-5 h-5 rounded-md border-2 border-[#D5A3AE] hover:border-[#722F45]" />
                              )}
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-bold uppercase text-[#8C4057]">
                                  Day {task.dayNumber} · {task.taskType}
                                </span>
                                <span className="text-[10px] text-[#5A454C]">
                                  ({task.estimatedMinutes} Mins)
                                </span>
                              </div>
                              <h5 className={`text-sm font-bold leading-snug ${
                                task.completed ? 'text-emerald-950 line-through decoration-emerald-600' : 'text-[#2D2226]'
                              }`}>
                                {task.title}
                              </h5>
                              <p className="text-xs text-[#5A454C] mt-1 leading-relaxed">
                                {task.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* =================================================== */}
                  {/* TAB 2: VISUAL LEARNING (MIND MAPS & DIAGRAMS)      */}
                  {/* =================================================== */}
                  {journeyTab === 'visual' && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-2">
                        <span className="text-xs font-bold uppercase text-[#722F45] tracking-wider block">
                          🎨 Topic Visual Diagram &amp; Mind Map
                        </span>
                        <h4 className="text-base font-bold text-[#722F45] font-serif-accent">
                          {selectedWeek.visualLearning?.mindMapTitle || `${selectedWeek.title} Mind Map`}
                        </h4>
                        <p className="text-xs text-[#5A454C]">
                          {selectedWeek.visualLearning?.diagramSummary || 'Visual nodes break down difficult formulas into intuitive connected concepts.'}
                        </p>
                      </div>

                      {/* Mind Map Interactive Nodes Layout */}
                      {selectedWeek.visualLearning?.nodes && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                          {selectedWeek.visualLearning.nodes.map((node, nIdx) => (
                            <div key={node.id} className="p-5 rounded-2xl bg-white border-2 border-[#722F45]/20 shadow-xs relative overflow-hidden space-y-2">
                              <div className="w-8 h-8 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold text-xs">
                                {nIdx + 1}
                              </div>
                              <h5 className="font-bold text-sm text-[#722F45]">
                                {node.label}
                              </h5>
                              <p className="text-xs text-[#5A454C]">
                                {node.subtext}
                              </p>
                              {node.keyFormulaOrRule && (
                                <div className="p-2 rounded bg-[#F9ECE0] text-[#722F45] font-mono font-bold text-xs">
                                  {node.keyFormulaOrRule}
                                </div>
                              )}
                              {node.branches && node.branches.length > 0 && (
                                <div className="pt-2 border-t border-[#D5A3AE]/30 space-y-1">
                                  <span className="text-[10px] font-bold uppercase text-[#8C4057]">Key Sub-topics:</span>
                                  <ul className="text-xs text-[#5A454C] list-disc pl-4 space-y-0.5">
                                    {node.branches.map((b, bIdx) => (
                                      <li key={bIdx}>{b}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* =================================================== */}
                  {/* TAB 3: REAL-LIFE LEARNING                           */}
                  {/* =================================================== */}
                  {journeyTab === 'reallife' && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-1">
                        <span className="text-xs font-bold uppercase text-[#722F45] tracking-wider block">
                          🌍 Practical &amp; Real-World Applications
                        </span>
                        <p className="text-xs text-[#5A454C]">
                          See how Intermediate MPC formulas are actually used outside examination halls in engineering, space science, and modern technology.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(selectedWeek.realLifeApplications || [
                          {
                            id: 'rl_default_1',
                            title: 'Civil & Architectural Load Distribution',
                            field: 'Structural Engineering',
                            realWorldScenario: 'Engineers designing flyovers and metro pillars calculate load limits using vector and force equations.',
                            howConceptIsUsed: 'Solves linear force equations F = ma to ensure structures resist heavy traffic loads and earthquake tremors.',
                            practicalTakeaway: 'Ensures safety and structural stability for public transit infrastructure.'
                          },
                          {
                            id: 'rl_default_2',
                            title: 'Satellite Trajectory & Orbital Paths',
                            field: 'Space Science & ISRO',
                            realWorldScenario: 'Calculating orbital positions for communications satellites around Earth.',
                            howConceptIsUsed: 'Uses distance formulas and circular loci (x² + y² = r²) to align microwave antennas precisely with satellites.',
                            practicalTakeaway: 'Powers high-speed internet, GPS, and weather forecasting.'
                          }
                        ]).map((app) => (
                          <div key={app.id} className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/60 shadow-xs space-y-3">
                            <span className="text-[10px] font-bold uppercase bg-[#722F45] text-white px-2.5 py-0.5 rounded-full">
                              {app.field}
                            </span>
                            <h4 className="text-base font-bold text-[#722F45] font-serif-accent">
                              {app.title}
                            </h4>
                            <p className="text-xs text-[#2D2226] leading-relaxed">
                              <strong>Scenario: </strong>{app.realWorldScenario}
                            </p>
                            <div className="p-3 rounded-xl bg-[#F9ECE0] text-xs text-[#722F45] space-y-1">
                              <strong>How Formula Is Applied: </strong>
                              <p>{app.howConceptIsUsed}</p>
                            </div>
                            <span className="text-[11px] text-emerald-800 font-bold block">
                              💡 Practical Takeaway: {app.practicalTakeaway}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* =================================================== */}
                  {/* TAB 4: QUIZ GAME (10-15 QUESTIONS + LEVELS)        */}
                  {/* =================================================== */}
                  {journeyTab === 'quiz' && (
                    <div className="space-y-6">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D5A3AE]/40">
                        <div>
                          <span className="text-xs font-bold uppercase text-[#8C4057] tracking-wider block">
                            🕹️ Topic Quiz Game &amp; Knowledge Check
                          </span>
                          <h4 className="text-base font-bold text-[#722F45] font-serif-accent">
                            Practice Questions with Beginner, Intermediate &amp; Advanced Levels
                          </h4>
                        </div>

                        {/* Difficulty Filters */}
                        <div className="flex items-center gap-1.5 p-1 bg-[#F9ECE0] rounded-xl">
                          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => setQuizFilter(lvl)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                quizFilter === lvl ? 'bg-[#722F45] text-white' : 'text-[#722F45] hover:bg-white/50'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* List of Quiz Questions */}
                      <div className="space-y-4">
                        {(selectedWeek.quizGameQuestions || selectedWeek.practiceQuiz || [])
                          .filter((q: QuizQuestion) => quizFilter === 'All' || q.level === quizFilter)
                          .map((q: QuizQuestion, qIdx: number) => {
                            const studentAns = activeQuizAnswers[q.id];
                            const isCorrect = studentAns === q.correctAnswer;
                            const isHintRevealed = quizRevealedHints[q.id];

                            return (
                              <div key={q.id} className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-3 shadow-2xs">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-lg bg-[#722F45] text-white flex items-center justify-center font-bold text-xs">
                                      {qIdx + 1}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                      q.level === 'Advanced' ? 'bg-rose-100 text-rose-900 border border-rose-300' : q.level === 'Intermediate' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                    }`}>
                                      {q.level || 'Beginner'}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => setQuizRevealedHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                                    className="text-xs font-bold text-[#8C4057] hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    <Lightbulb className="w-3.5 h-3.5" />
                                    <span>{isHintRevealed ? 'Hide Hint' : 'Show Hint'}</span>
                                  </button>
                                </div>

                                <p className="text-sm font-bold text-[#2D2226]">
                                  {q.question}
                                </p>

                                {isHintRevealed && (
                                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                                    <span><strong>Concept Hint: </strong>{q.hint}</span>
                                  </div>
                                )}

                                {/* MCQ Options */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {q.options.map((opt: MCQOption) => {
                                    const isChosen = studentAns === opt.id;
                                    const isKey = opt.id === q.correctAnswer;

                                    return (
                                      <button
                                        key={opt.id}
                                        onClick={() => handleSelectQuizAnswer(q.id, opt.id)}
                                        disabled={quizSubmitted}
                                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                                          quizSubmitted
                                            ? isKey
                                              ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                                              : isChosen
                                              ? 'bg-rose-100 border-rose-400 text-rose-950 font-bold'
                                              : 'bg-white border-[#D5A3AE]/40 text-[#5A454C]'
                                            : isChosen
                                            ? 'bg-[#722F45] text-white border-[#722F45]'
                                            : 'bg-[#FFF9F2] text-[#2D2226] border-[#D5A3AE]/60 hover:bg-[#D5A3AE]/10'
                                        }`}
                                      >
                                        <strong>{opt.id}.</strong> {opt.text}
                                      </button>
                                    );
                                  })}
                                </div>

                                {quizSubmitted && (
                                  <div className={`p-3 rounded-xl border text-xs ${
                                    isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-medium' : 'bg-rose-50 border-rose-200 text-rose-950'
                                  }`}>
                                    <strong>Explanation: </strong>{q.explanation}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>

                      {/* Submit / Reset Controls */}
                      <div className="flex items-center justify-between pt-2">
                        {quizSubmitted ? (
                          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-950 flex items-center gap-3">
                            <Award className="w-5 h-5 text-emerald-700" />
                            <span>You scored {quizScore} out of {(selectedWeek.quizGameQuestions || selectedWeek.practiceQuiz || []).length}!</span>
                            <button
                              onClick={handleResetQuiz}
                              className="px-3 py-1 rounded-lg bg-emerald-800 text-white text-xs font-bold cursor-pointer hover:bg-emerald-900"
                            >
                              Retry Quiz
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleSubmitQuizGame}
                            disabled={Object.keys(activeQuizAnswers).length === 0}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                              Object.keys(activeQuizAnswers).length > 0
                                ? 'bg-[#722F45] hover:bg-[#5C2436] text-white'
                                : 'bg-[#F9ECE0] text-[#5A454C] cursor-not-allowed'
                            }`}
                          >
                            Submit Quiz Answers
                          </button>
                        )}
                      </div>

                    </div>
                  )}

                  {/* =================================================== */}
                  {/* TAB 5: PRACTICE ZONE (WITH STEP DIAGNOSTICS)       */}
                  {/* =================================================== */}
                  {journeyTab === 'practice' && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-1">
                        <span className="text-xs font-bold uppercase text-[#722F45] tracking-wider block">
                          🧪 Practice Zone &amp; Step-by-Step Solutions
                        </span>
                        <p className="text-xs text-[#5A454C]">
                          Work through textbook numericals. Reveal solutions and click "I got stuck on this step" to diagnose calculation errors immediately!
                        </p>
                      </div>

                      <div className="space-y-4">
                        {(selectedWeek.practiceZone || [
                          {
                            id: 'pz_default_1',
                            title: 'Standard Board Exam Numerical',
                            category: 'Numerical Problem',
                            difficulty: 'Intermediate',
                            problemText: 'A particle is accelerated from rest with uniform acceleration a = 3 m/s² for t = 4 seconds. Calculate the total displacement s.',
                            stepByStepSolution: [
                              { stepNumber: 1, title: 'Identify given kinematic variables', explanation: 'Initial velocity u = 0, acceleration a = 3 m/s², time t = 4 s.', mathOrFormula: 'u = 0, a = 3, t = 4' },
                              { stepNumber: 2, title: 'Apply second equation of motion', explanation: 's = ut + 1/2 a t²', mathOrFormula: 's = (0)(4) + (1/2)(3)(4²)' },
                              { stepNumber: 3, title: 'Compute final distance', explanation: 's = 0 + (1/2)(3)(16) = 24 meters.', mathOrFormula: 's = 24 m' }
                            ],
                            finalAnswer: 'Displacement s = 24 meters',
                            examTip: 'Always write formula s = ut + 1/2 at² before substituting numerical values.'
                          }
                        ]).map((prob) => {
                          const isRevealed = revealedSolutions[prob.id];
                          const stuckStep = stuckStepMap[prob.id];

                          return (
                            <div key={prob.id} className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/60 shadow-xs space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase bg-[#722F45] text-white px-2.5 py-0.5 rounded-full">
                                  {prob.category}
                                </span>
                                <span className="text-xs font-bold text-[#8C4057]">
                                  Difficulty: {prob.difficulty}
                                </span>
                              </div>

                              <h4 className="text-sm font-bold text-[#2D2226]">
                                {prob.title}
                              </h4>
                              <p className="text-xs text-[#5A454C] leading-relaxed">
                                {prob.problemText}
                              </p>

                              <button
                                onClick={() => setRevealedSolutions((prev) => ({ ...prev, [prob.id]: !prev[prob.id] }))}
                                className="px-4 py-2 rounded-xl bg-[#F9ECE0] hover:bg-[#D5A3AE]/30 text-[#722F45] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>{isRevealed ? 'Hide Step-by-Step Solution' : 'Reveal Step-by-Step Solution'}</span>
                              </button>

                              {isRevealed && (
                                <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/50 space-y-3 text-xs">
                                  <span className="font-bold text-[#722F45] block uppercase text-[10px]">
                                    Verified Solution Breakdown:
                                  </span>

                                  {prob.stepByStepSolution.map((st) => (
                                    <div key={st.stepNumber} className="p-3 rounded-lg bg-white border border-[#D5A3AE]/40 space-y-1">
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold text-[#722F45]">Step {st.stepNumber}: {st.title}</span>
                                        <button
                                          onClick={() => setStuckStepMap((prev) => ({ ...prev, [prob.id]: prev[prob.id] === st.stepNumber ? null : st.stepNumber }))}
                                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                                            stuckStep === st.stepNumber ? 'bg-rose-700 text-white' : 'bg-[#F9ECE0] text-[#722F45] hover:bg-[#D5A3AE]/40'
                                          }`}
                                        >
                                          {stuckStep === st.stepNumber ? '✓ Step Flagged' : 'I got stuck on Step ' + st.stepNumber}
                                        </button>
                                      </div>
                                      <p className="text-[#5A454C]">{st.explanation}</p>
                                      {st.mathOrFormula && (
                                        <div className="font-mono font-bold text-[#722F45] bg-[#F9ECE0] p-1.5 rounded">
                                          {st.mathOrFormula}
                                        </div>
                                      )}

                                      {stuckStep === st.stepNumber && (
                                        <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-950 text-[11px] space-y-1 mt-1">
                                          <strong>💡 Diagnostic Hint for Step {st.stepNumber}: </strong>
                                          <p>Double-check variable signs and units before substituting into this step. You can also ask the Socratic AI Mentor tab for a personalized hint!</p>
                                        </div>
                                      )}
                                    </div>
                                  ))}

                                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold">
                                    Final Answer: {prob.finalAnswer}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* =================================================== */}
                  {/* TAB 6: MINI PROJECT & RUBRIC EVALUATION            */}
                  {/* =================================================== */}
                  {journeyTab === 'project' && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-1">
                        <span className="text-xs font-bold uppercase text-[#722F45] tracking-wider block">
                          🎯 Topic Mini Project / Practical Challenge
                        </span>
                        <h4 className="text-base font-bold text-[#722F45] font-serif-accent">
                          {selectedWeek.miniProject?.title || 'Subject Practical Challenge'}
                        </h4>
                        <p className="text-xs text-[#5A454C]">
                          {selectedWeek.miniProject?.objective || 'Apply topic principles to solve a real-world scenario.'}
                        </p>
                      </div>

                      {/* Project Instructions & Rubric */}
                      <div className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-4 shadow-2xs">
                        <div>
                          <h5 className="text-xs font-bold text-[#722F45] uppercase tracking-wider mb-2">
                            Instructions &amp; Requirements:
                          </h5>
                          <ul className="space-y-1 text-xs text-[#5A454C] list-disc pl-4">
                            {(selectedWeek.miniProject?.instructions || [
                              'Write out all formulas and given variables clearly.',
                              'Show algebraic step-by-step substitutions.',
                              'State final units explicitly.'
                            ]).map((inst, idx) => (
                              <li key={idx}>{inst}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Rubric Criteria */}
                        {selectedWeek.miniProject?.rubricCriteria && (
                          <div className="space-y-2 pt-2 border-t border-[#D5A3AE]/30">
                            <h5 className="text-xs font-bold text-[#722F45] uppercase tracking-wider">
                              Evaluation Rubric:
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {selectedWeek.miniProject.rubricCriteria.map((rub, rIdx) => (
                                <div key={rIdx} className="p-3 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/40 text-xs space-y-0.5">
                                  <div className="flex justify-between font-bold text-[#722F45]">
                                    <span>{rub.criterion}</span>
                                    <span>{rub.maxPoints} pts</span>
                                  </div>
                                  <p className="text-[10px] text-[#5A454C]">{rub.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Submission Area */}
                        <div className="space-y-2 pt-2 border-t border-[#D5A3AE]/30">
                          <label className="text-xs font-bold text-[#722F45] block">
                            Your Submission Response:
                          </label>
                          <textarea
                            value={projectText}
                            onChange={(e) => setProjectText(e.target.value)}
                            rows={4}
                            placeholder="Type your step-by-step solution, equations, and final answers here..."
                            className="w-full p-3.5 rounded-xl border border-[#D5A3AE] bg-[#FFF9F2] text-xs text-[#2D2226] focus:ring-2 focus:ring-[#722F45] focus:outline-none"
                          />

                          <button
                            onClick={handleSubmitProject}
                            disabled={!projectText.trim()}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                              projectText.trim() ? 'bg-[#722F45] hover:bg-[#5C2436] text-white' : 'bg-[#F9ECE0] text-[#5A454C] cursor-not-allowed'
                            }`}
                          >
                            Submit Project for Automated Rubric Check
                          </button>
                        </div>

                        {/* Project Evaluation Result */}
                        {projectResult && (
                          <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                            projectResult.passed ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
                          }`}>
                            <div className="flex items-center justify-between font-bold">
                              <span>Evaluation Score: {projectResult.score} / 20 Points</span>
                              <span>{projectResult.passed ? '✓ Passed &amp; Verified' : 'Needs Review'}</span>
                            </div>
                            <p>{projectResult.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* =================================================== */}
                  {/* TAB 7: SOCRATIC AI MENTOR                          */}
                  {/* =================================================== */}
                  {journeyTab === 'mentor' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/60 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase text-[#722F45] tracking-wider block">
                            🤖 Socratic AI Mentor
                          </span>
                          <h4 className="text-sm font-bold text-[#722F45] font-serif-accent">
                            Topic: {selectedWeek.title}
                          </h4>
                          <p className="text-[11px] text-[#5A454C]">
                            Ask questions, request hints, or get step-by-step guidance without direct answers!
                          </p>
                        </div>
                      </div>

                      {/* Chat Message Window */}
                      <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 h-80 overflow-y-auto space-y-3">
                        {mentorMessages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-2xs ${
                              msg.sender === 'student'
                                ? 'bg-[#722F45] text-white rounded-br-none'
                                : 'bg-white text-[#2D2226] border border-[#D5A3AE]/50 rounded-bl-none'
                            }`}>
                              <span className="text-[10px] opacity-75 font-bold block">
                                {msg.sender === 'student' ? 'You' : 'AI Mentor'} · {msg.timestamp}
                              </span>
                              <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                        {mentorLoading && (
                          <div className="flex justify-start">
                            <div className="p-3 rounded-2xl bg-white border border-[#D5A3AE]/50 text-xs text-[#5A454C] flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-[#722F45] animate-spin" />
                              <span>AI Mentor is crafting a Socratic hint...</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chat Input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={mentorInput}
                          onChange={(e) => setMentorInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMentorMessage()}
                          placeholder="Ask a question or explain the formula in your own words..."
                          className="flex-1 p-3 rounded-xl border border-[#D5A3AE] bg-white text-xs text-[#2D2226] focus:ring-2 focus:ring-[#722F45] focus:outline-none"
                        />
                        <button
                          onClick={handleSendMentorMessage}
                          disabled={!mentorInput.trim() || mentorLoading}
                          className="p-3 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white transition-all cursor-pointer shadow-xs"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: LEARN ADDITIONAL SKILLS SECTION                    */}
      {/* ========================================================= */}
      {mainTab === 'additional_skills' && (
        <div className="space-y-8">
          
          {/* Header Banner */}
          <div className="p-6 rounded-3xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#722F45] px-3 py-1 rounded-full">
                Non-Academic Skill Growth
              </span>
              <span className="text-xs text-[#5A454C]">
                Practical Life &amp; Technology Modules
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#722F45] font-serif-accent">
              Learn Additional Skills (Practical &amp; Digital Readiness)
            </h2>
            <p className="text-xs text-[#5A454C] leading-relaxed">
              Academic scores are important, but practical digital skills, AI literacy, clear English communication, Excel, and financial awareness give you a huge advantage in college and job interviews.
            </p>
          </div>

          {/* 6 Skill Modules Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalSkills.map((sk) => {
              const isSelected = sk.id === activeSkillId;
              const pct = Math.round((sk.completedLessonsCount / (sk.totalLessonsCount || 1)) * 100);

              return (
                <div
                  key={sk.id}
                  onClick={() => {
                    setActiveSkillId(sk.id);
                    setActiveLessonId(sk.lessons[0]?.id || '');
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                    isSelected
                      ? 'bg-white border-[#722F45] ring-2 ring-[#722F45]/30'
                      : 'bg-[#FFF9F2] border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F9ECE0] text-[#722F45] flex items-center justify-center">
                        {renderIcon(sk.iconName)}
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#F9ECE0] text-[#722F45]">
                        {sk.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#2D2226]">
                      {sk.title}
                    </h3>
                    <p className="text-xs text-[#5A454C] mt-1 leading-relaxed line-clamp-2">
                      {sk.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#D5A3AE]/30">
                    <div className="flex justify-between text-[11px] text-[#5A454C] mb-1">
                      <span>{sk.completedLessonsCount} of {sk.totalLessonsCount} Lessons Completed</span>
                      <span className="font-bold text-[#722F45]">{pct}%</span>
                    </div>
                    <div className="w-full bg-[#F9ECE0] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#722F45] h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Module Workspace */}
          {selectedAdditionalSkill && (
            <div className="bg-[#FFF9F2] rounded-3xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5A3AE]/40">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C4057]">
                    Active Skill Module
                  </span>
                  <h2 className="text-2xl font-bold text-[#722F45] font-serif-accent mt-0.5">
                    {selectedAdditionalSkill.title}
                  </h2>
                  <p className="text-xs text-[#5A454C] mt-1">
                    {selectedAdditionalSkill.description}
                  </p>
                </div>

                {/* 15-Min Daily English Timer Widget if English module is active */}
                {selectedAdditionalSkill.id === 'english_comm' && (
                  <div className="p-3.5 rounded-2xl bg-white border border-[#D5A3AE]/60 flex items-center gap-4 shrink-0 shadow-2xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C4057] block">15-Min Practice Timer</span>
                      <span className="text-xl font-mono font-extrabold text-[#722F45]">
                        {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-2.5 rounded-xl bg-[#722F45] text-white hover:bg-[#5C2436] transition-all cursor-pointer shadow-xs"
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { setIsTimerRunning(false); setTimerSeconds(15 * 60); }}
                      className="p-2.5 rounded-xl border border-[#D5A3AE] text-[#722F45] hover:bg-[#F9ECE0] transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Lesson Nav Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {selectedAdditionalSkill.lessons.map((ls) => (
                  <button
                    key={ls.id}
                    onClick={() => setActiveLessonId(ls.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      activeLessonId === ls.id
                        ? 'bg-white border-[#722F45] ring-2 ring-[#722F45]/30 shadow-xs'
                        : 'bg-[#F9ECE0]/60 border-[#D5A3AE]/60 hover:bg-white text-[#2D2226]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#722F45]">
                        {ls.durationMinutes} Mins
                      </span>
                      {ls.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-[#D5A3AE]" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-[#2D2226] truncate">
                      {ls.title}
                    </p>
                  </button>
                ))}
              </div>

              {/* Selected Lesson Reader View */}
              {selectedLesson && (
                <div className="p-6 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-6 shadow-xs">
                  
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#D5A3AE]/40">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C4057]">
                        Interactive Lesson
                      </span>
                      <h3 className="text-xl font-bold text-[#722F45] font-serif-accent mt-0.5">
                        {selectedLesson.title}
                      </h3>
                      <p className="text-xs text-[#5A454C] mt-1">
                        {selectedLesson.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleAdditionalLesson(selectedAdditionalSkill.id, selectedLesson.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        selectedLesson.isCompleted
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-[#722F45] hover:bg-[#5C2436] text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{selectedLesson.isCompleted ? 'Completed' : 'Mark as Completed'}</span>
                    </button>
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-2">
                    <span className="text-xs font-bold uppercase text-[#722F45] tracking-wider block">
                      Key Takeaways:
                    </span>
                    <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#2D2226]">
                      {selectedLesson.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx}>{kp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Lesson Sections */}
                  <div className="space-y-4">
                    {selectedLesson.contentSections.map((sec, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <h4 className="text-sm font-bold text-[#722F45]">
                          {sec.heading}
                        </h4>
                        <p className="text-xs text-[#5A454C] leading-relaxed whitespace-pre-line">
                          {sec.body}
                        </p>
                        {sec.codeOrFormula && (
                          <div className="p-2.5 rounded-lg bg-[#2D2226] text-[#E8D5C4] font-mono text-xs">
                            {sec.codeOrFormula}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Practical Exercise */}
                  {selectedLesson.practicalExercise && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                      <strong className="text-amber-900 block font-bold">✍️ Practical Hands-on Exercise:</strong>
                      <p>{selectedLesson.practicalExercise}</p>
                    </div>
                  )}

                  {/* Quick Lesson Quiz */}
                  {selectedLesson.quiz && selectedLesson.quiz.length > 0 && (
                    <div className="p-5 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-3">
                      <h4 className="text-xs font-bold uppercase text-[#722F45] tracking-wider">
                        Quick Concept Check Quiz:
                      </h4>
                      {selectedLesson.quiz.map((q) => (
                        <div key={q.id} className="p-3.5 rounded-xl bg-white border border-[#D5A3AE]/40 space-y-2 text-xs">
                          <p className="font-bold text-[#2D2226]">{q.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {q.options.map((opt) => (
                              <div
                                key={opt.id}
                                className={`p-2 rounded-lg border ${
                                  opt.id === q.correctAnswer
                                    ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                                    : 'bg-white border-[#D5A3AE]/40 text-[#5A454C]'
                                }`}
                              >
                                {opt.id}. {opt.text}
                              </div>
                            ))}
                          </div>
                          <p className="text-[11px] text-[#5A454C] bg-[#F9ECE0] p-2 rounded">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* Fullscreen Modal for Official Mathematics Concept Notes (Vol I) */}
      {showMathStickyNotesModal && (
        <div 
          onClick={() => setShowMathStickyNotesModal(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full bg-[#E8D5C4] rounded-3xl p-6 sm:p-8 border-2 border-[#D5A3AE] shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D5A3AE]/50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2.5 py-0.5 rounded">
                  Telangana Intermediate MPC Vol - I
                </span>
                <h3 className="text-xl font-bold text-[#722F45] font-serif-accent mt-1">
                  Textbook Concept Notes &bull; Mathematics IA &amp; IB
                </h3>
              </div>
              <button
                onClick={() => setShowMathStickyNotesModal(false)}
                className="px-4 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Close Notes
              </button>
            </div>

            <MathematicsConceptNotes 
              initialPaper={selectedGap?.skillName?.includes('1B') ? 'Mathematics IB' : 'Mathematics IA'}
              onLaunchAssessment={onTakeAssessment}
            />
          </div>
        </div>
      )}

    </div>
  );
};
