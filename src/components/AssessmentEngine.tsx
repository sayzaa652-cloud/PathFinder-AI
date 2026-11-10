import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, AlertCircle, Clock, Flag, 
  ArrowLeft, ArrowRight, RotateCcw, Award, BookOpen, 
  ChevronDown, ChevronUp, Printer, Sparkles
} from 'lucide-react';
import { Assessment, AssessmentQuestion, AssessmentResult, LearningResource, TopicScore, SkillGapItem } from '../types';
import { storageService } from '../services/storageService';
import { generateSkillGapItems } from '../services/skillGapService';

interface AssessmentEngineProps {
  assessment: Assessment;
  studentName?: string;
  onExit: () => void;
  onRetake: () => void;
  onViewRoadmap?: () => void;
  onViewSkillGaps?: () => void;
}

export const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  assessment,
  studentName = 'Student',
  onExit,
  onRetake,
  onViewRoadmap,
  onViewSkillGaps
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(assessment.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [filterReview, setFilterReview] = useState<'all' | 'incorrect' | 'flagged'>('all');

  const questions = assessment.questions;
  const currentQ: AssessmentQuestion = questions[currentIdx] || questions[0];
  const totalQuestions = questions.length; // guaranteed 20
  const answeredCount = Object.keys(userAnswers).length;

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  const handleSelectAnswer = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setUserAnswers({
      ...userAnswers,
      [currentQ.id]: optionId
    });
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions({
      ...flaggedQuestions,
      [qId]: !flaggedQuestions[qId]
    });
  };

  const handleSubmitAssessment = () => {
    setShowConfirmModal(false);

    let score = 0;
    const topicStats: Record<string, { correct: number; total: number }> = {};
    const difficultyStats: Record<'Easy' | 'Medium' | 'Hard', { correct: number; total: number }> = {
      Easy: { correct: 0, total: 0 },
      Medium: { correct: 0, total: 0 },
      Hard: { correct: 0, total: 0 }
    };
    const skillGaps: string[] = [];
    const strengths: string[] = [];

    questions.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) score += 1;

      // Topic stats
      const t = q.topic || 'General Aptitude';
      if (!topicStats[t]) topicStats[t] = { correct: 0, total: 0 };
      topicStats[t].total += 1;
      if (isCorrect) topicStats[t].correct += 1;

      // Difficulty stats
      difficultyStats[q.difficulty].total += 1;
      if (isCorrect) difficultyStats[q.difficulty].correct += 1;

      // Gaps
      if (!isCorrect && !skillGaps.includes(t)) {
        skillGaps.push(t);
      } else if (isCorrect && !strengths.includes(t)) {
        strengths.push(t);
      }
    });

    const topicPerformance: TopicScore[] = Object.keys(topicStats).map((t) => ({
      topic: t,
      correct: topicStats[t].correct,
      total: topicStats[t].total,
      percentage: Math.round((topicStats[t].correct / topicStats[t].total) * 100)
    }));

    const difficultyPerformance = [
      { difficulty: 'Easy' as const, ...difficultyStats.Easy },
      { difficulty: 'Medium' as const, ...difficultyStats.Medium },
      { difficulty: 'Hard' as const, ...difficultyStats.Hard }
    ];

    const percentage = Math.round((score / totalQuestions) * 100);

    const recommendedResources: LearningResource[] = [
      {
        title: `${assessment.specialization} Advanced Problem Solving Lab`,
        type: 'Practice Lab',
        provider: 'PathFinder AI Academy',
        description: `Targeted revision modules focusing on ${skillGaps.slice(0, 2).join(' & ') || 'Advanced Concepts'}.`,
        linkText: 'Start Guided Lab',
        focusArea: skillGaps[0] || 'Core Theory'
      },
      {
        title: `${assessment.specialization} Foundational Reference`,
        type: 'Interactive Book',
        provider: 'Open Education Consortium',
        description: 'Comprehensive explanations, step-by-step problem sets, and formula cheat sheets.',
        linkText: 'Access Reference Guide',
        focusArea: 'Academic Rigor'
      }
    ];

    const finalResult: AssessmentResult = {
      id: `res-${Date.now()}`,
      assessmentId: assessment.id,
      assessmentTitle: assessment.title,
      specialization: assessment.specialization,
      educationLevel: assessment.educationLevel,
      studentName,
      completedAt: new Date().toISOString(),
      score,
      totalQuestions: totalQuestions,
      percentage,
      timeSpentSeconds: assessment.timeLimitMinutes * 60 - secondsRemaining,
      userAnswers,
      topicPerformance,
      difficultyPerformance,
      skillGaps,
      strengths,
      recommendedResources
    };

    setResult(finalResult);
    setIsSubmitted(true);
    storageService.saveAssessmentResult(finalResult);

    // Auto-update Skill Gap Tracker using deterministic MPC subject generator
    try {
      const freshGaps = generateSkillGapItems(null, [finalResult]);
      storageService.saveSkillGapItems(freshGaps);
    } catch (e) {
      console.error('Failed to sync skill gaps to storage', e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {!isSubmitted ? (
        /* ACTIVE TEST VIEW */
        <div className="space-y-6">
          
          {/* Test Control Bar */}
          <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057]">
                  {assessment.educationLevel}
                </span>
                <span className="text-xs text-[#D5A3AE]">·</span>
                <span className="text-xs font-semibold text-[#5A454C]">
                  {totalQuestions} Questions · {assessment.timeLimitMinutes} Mins
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[#722F45] font-serif-accent truncate max-w-xl">
                {assessment.title}
              </h1>
            </div>

            {/* Timer & Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/60">
                <Clock className="w-4 h-4 text-[#8C4057]" />
                <span className="font-mono font-bold text-sm text-[#722F45]">
                  {formatTimer(secondsRemaining)}
                </span>
              </div>

              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-4 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Submit Test
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Question Card (Left 8 Cols) */}
            <div className="lg:col-span-8 bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs flex flex-col justify-between min-h-[460px]">
              
              <div>
                {/* Question Metadata */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D5A3AE]/40 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#F9ECE0] text-[11px] font-bold text-[#722F45] border border-[#D5A3AE]/50">
                      Question {currentIdx + 1} of {totalQuestions}
                    </span>
                    <span className="text-xs font-medium text-[#5A454C]">
                      ID: {currentQ.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      currentQ.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : currentQ.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {currentQ.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'text-[#5A454C] hover:bg-[#F9ECE0]'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                    <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag'}</span>
                  </button>
                </div>

                <div className="mb-2">
                  <span className="text-xs font-semibold text-[#8C4057]">
                    {currentQ.topic} {currentQ.subtopic ? `· ${currentQ.subtopic}` : ''}
                  </span>
                </div>

                {/* Question Content */}
                <h2 className="text-base sm:text-lg font-bold text-[#2D2226] mb-6 leading-relaxed">
                  {currentQ.question}
                </h2>

                {/* 4 MCQ Options */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt) => {
                    const isSelected = userAnswers[currentQ.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectAnswer(opt.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer group ${
                          isSelected
                            ? 'bg-[#722F45] text-white border-[#722F45] shadow-xs'
                            : 'bg-white text-[#2D2226] border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-[#D5A3AE]/10'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-[#F9ECE0] text-[#722F45] group-hover:bg-[#D5A3AE]/30'
                          }`}>
                            {opt.id}
                          </span>
                          <span className="text-sm font-medium leading-relaxed">
                            {opt.text}
                          </span>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next Bottom Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[#D5A3AE]/40">
                <button
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    currentIdx === 0
                      ? 'text-[#D5A3AE] cursor-not-allowed'
                      : 'text-[#722F45] hover:bg-[#D5A3AE]/20 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIdx < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    className="px-5 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="px-6 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Review &amp; Finish</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

            {/* Right Question Palette (Right 4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#D5A3AE]/40 mb-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#722F45]">
                    Question Palette ({totalQuestions} Questions)
                  </h3>
                  <span className="text-xs font-bold text-[#8C4057]">
                    {answeredCount} / {totalQuestions}
                  </span>
                </div>

                {/* 20 Question Button Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isCurrent = currentIdx === idx;
                    const isFlagged = !!flaggedQuestions[q.id];

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`relative h-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-[#722F45] ring-offset-2 bg-[#722F45] text-white'
                            : isAnswered
                            ? 'bg-[#D5A3AE] text-[#722F45] hover:bg-[#C994A1] font-bold'
                            : 'bg-white text-[#5A454C] border border-[#D5A3AE]/60 hover:bg-[#D5A3AE]/10'
                        }`}
                      >
                        <span>{idx + 1}</span>
                        {isFlagged && (
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-5 pt-3 border-t border-[#D5A3AE]/40 space-y-1.5 text-[11px] text-[#5A454C]">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-[#722F45]" />
                    <span>Current Question</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-[#D5A3AE]" />
                    <span>Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-white border border-[#D5A3AE]" />
                    <span>Unanswered ({totalQuestions - answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-amber-500" />
                    <span>Flagged for Review</span>
                  </div>
                </div>

              </div>

              {/* Assessment Policy Card */}
              <div className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-xs text-[#5A454C] leading-relaxed">
                <span className="font-bold text-[#722F45]">About This Practice Test: </span>
                Every test includes clear answer explanations and tips to help you build confidence and get ready for your school, board, or college exams.
              </div>
            </div>

          </div>

          {/* Confirm Submission Modal */}
          {showConfirmModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 shadow-2xl max-w-md w-full p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#F9ECE0] text-[#722F45] flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#722F45] font-serif-accent">
                  Submit Your Test?
                </h3>
                <p className="text-xs text-[#5A454C] mt-2">
                  You have answered <span className="font-bold text-[#2D2226]">{answeredCount} of {totalQuestions} questions</span>.
                  {answeredCount < totalQuestions && (
                    <span className="text-amber-800 block mt-1 font-semibold">
                      Note: You still have {totalQuestions - answeredCount} unanswered questions.
                    </span>
                  )}
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#D5A3AE] text-xs font-bold text-[#722F45] hover:bg-[#F9ECE0] cursor-pointer"
                  >
                    Keep Answering
                  </button>
                  <button
                    onClick={handleSubmitAssessment}
                    className="px-5 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Yes, Submit Test
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : result ? (
        /* RESULTS & COMPREHENSIVE SCORECARD VIEW */
        <div className="space-y-8">
          
          {/* Main Score Card Banner */}
          <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5A3AE]/40">
              <div>
                <span className="text-xs uppercase font-bold text-[#8C4057] tracking-wider">
                  Test Results &amp; Summary
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#722F45] mt-1 font-serif-accent">
                  {result.assessmentTitle}
                </h2>
                <p className="text-xs text-[#5A454C] mt-0.5">
                  Completed by <span className="font-bold text-[#2D2226]">{studentName}</span> · {result.specialization} · {result.educationLevel}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl border border-[#D5A3AE] bg-[#F9ECE0] hover:bg-[#D5A3AE]/30 text-[#722F45] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer no-print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Results</span>
                </button>
                <button
                  onClick={onRetake}
                  className="px-4 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer no-print"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              </div>
            </div>

            {/* Encouraging Framing Banner */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 my-5 ${
              result.percentage < 60
                ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                : result.percentage < 80
                ? 'bg-[#F9ECE0] border-[#D5A3AE] text-[#722F45]'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <Sparkles className="w-5 h-5 shrink-0 text-[#722F45]" />
              <div className="text-xs">
                <p className="font-bold">
                  {result.percentage < 60
                    ? 'Great start! Here are the core concepts to focus on before college or competitive exams.'
                    : result.percentage < 80
                    ? 'Good progress! Reviewing your few missed topics will help you achieve top marks.'
                    : 'Outstanding performance! You have strong command over your curriculum foundation.'}
                </p>
                <p className="text-[11px] opacity-90 mt-0.5">
                  Review the simple explanations below for every question to strengthen weak areas.
                </p>
              </div>
            </div>

            {/* Metrics Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              
              <div className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
                <p className="text-xs text-[#5A454C] font-medium">Your Score</p>
                <p className="text-3xl font-extrabold text-[#722F45] mt-1">
                  {result.score}<span className="text-sm font-normal text-[#8C4057]"> / {result.totalQuestions}</span>
                </p>
                <span className="text-[11px] font-bold text-[#8C4057]">
                  {result.percentage}% Correct
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
                <p className="text-xs text-[#5A454C] font-medium">Performance Level</p>
                <p className="text-xl font-extrabold text-[#722F45] mt-2">
                  {result.percentage >= 85 ? 'Excellent!' : result.percentage >= 70 ? 'Good Job!' : 'Great Start'}
                </p>
                <span className="text-[11px] text-[#5A454C]">
                  {result.percentage >= 70 ? 'Ready for advanced topics' : 'Review foundational concepts'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
                <p className="text-xs text-[#5A454C] font-medium">Time Taken</p>
                <p className="text-2xl font-extrabold text-[#722F45] mt-1 font-mono">
                  {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s
                </p>
                <span className="text-[11px] text-[#5A454C]">
                  About {Math.round(result.timeSpentSeconds / (result.totalQuestions || 1))}s per question
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
                <p className="text-xs text-[#5A454C] font-medium">Strong Topics</p>
                <p className="text-2xl font-extrabold text-[#722F45] mt-1">
                  {result.strengths.length} / {result.topicPerformance.length}
                </p>
                <span className="text-[11px] text-[#5A454C]">
                  {result.skillGaps.length} topics to review
                </span>
              </div>

            </div>

            {/* Dedicated MPC 5-Subject Scorecard (Math 1A: 4, Math 1B: 4, Physics: 6, Chemistry: 6, Aptitude: 10) */}
            {(() => {
              const isMPC = result.specialization.toLowerCase().includes('mpc') || result.assessmentTitle.toLowerCase().includes('mpc');
              if (!isMPC) return null;

              const m1a = result.topicPerformance.find((tp) => tp.topic.toLowerCase().includes('mathematics 1a')) || { correct: 0, total: 4, percentage: 0 };
              const m1b = result.topicPerformance.find((tp) => tp.topic.toLowerCase().includes('mathematics 1b')) || { correct: 0, total: 4, percentage: 0 };
              const phys = result.topicPerformance.find((tp) => tp.topic.toLowerCase().includes('physic')) || { correct: 0, total: 6, percentage: 0 };
              const chem = result.topicPerformance.find((tp) => tp.topic.toLowerCase().includes('chem')) || { correct: 0, total: 6, percentage: 0 };
              const apt = result.topicPerformance.find((tp) => tp.topic.toLowerCase().includes('aptitude') || tp.topic.toLowerCase().includes('reasoning')) || { correct: 0, total: 10, percentage: 0 };

              const getStatusBadge = (pct: number) => {
                if (pct >= 85) return { label: 'Mastered', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
                if (pct >= 67) return { label: 'Developing', color: 'bg-amber-100 text-amber-900 border-amber-300' };
                return { label: 'Needs Improvement', color: 'bg-rose-100 text-rose-900 border-rose-300' };
              };

              return (
                <div className="p-5 rounded-2xl bg-white border-2 border-[#722F45]/30 shadow-md mb-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D5A3AE]/40">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#722F45] px-2.5 py-0.5 rounded-full">
                          MPC 5-Subject Diagnostic Scorecard
                        </span>
                        <span className="text-xs font-semibold text-[#8C4057]">
                          30 Questions Total
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#722F45] mt-1 font-serif-accent">
                        Mathematics 1A (4) · Mathematics 1B (4) · Physics (6) · Chemistry (6) · General Aptitude (10)
                      </h4>
                    </div>
                    {onViewSkillGaps && (
                      <button
                        onClick={onViewSkillGaps}
                        className="px-4 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D5A3AE]" />
                        <span>Launch MPC Skill Gap Tracker &rarr;</span>
                      </button>
                    )}
                  </div>

                  {/* 5 Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {/* Math 1A Card */}
                    {(() => {
                      const badge = getStatusBadge(m1a.percentage);
                      return (
                        <div className="p-4 rounded-xl border border-[#D5A3AE]/60 bg-[#FAF4EE] flex flex-col justify-between space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#722F45]">Math 1A</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <div className="text-2xl font-extrabold text-[#722F45]">
                            {m1a.correct} <span className="text-xs font-semibold text-[#8C4057]">/ {m1a.total}</span>
                          </div>
                          <div>
                            <div className="w-full bg-[#E8D5C4] h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${m1a.percentage >= 85 ? 'bg-emerald-600' : m1a.percentage >= 67 ? 'bg-amber-600' : 'bg-rose-600'}`}
                                style={{ width: `${m1a.percentage}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-[#5A454C] block mt-1">
                              {m1a.percentage}% Accuracy
                            </span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Math 1B Card */}
                    {(() => {
                      const badge = getStatusBadge(m1b.percentage);
                      return (
                        <div className="p-4 rounded-xl border border-[#D5A3AE]/60 bg-[#FAF4EE] flex flex-col justify-between space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#722F45]">Math 1B</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <div className="text-2xl font-extrabold text-[#722F45]">
                            {m1b.correct} <span className="text-xs font-semibold text-[#8C4057]">/ {m1b.total}</span>
                          </div>
                          <div>
                            <div className="w-full bg-[#E8D5C4] h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${m1b.percentage >= 85 ? 'bg-emerald-600' : m1b.percentage >= 67 ? 'bg-amber-600' : 'bg-rose-600'}`}
                                style={{ width: `${m1b.percentage}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-[#5A454C] block mt-1">
                              {m1b.percentage}% Accuracy
                            </span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Physics Card */}
                    {(() => {
                      const badge = getStatusBadge(phys.percentage);
                      return (
                        <div className="p-4 rounded-xl border border-[#D5A3AE]/60 bg-[#FAF4EE] flex flex-col justify-between space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#722F45]">Physics</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <div className="text-2xl font-extrabold text-[#722F45]">
                            {phys.correct} <span className="text-xs font-semibold text-[#8C4057]">/ {phys.total}</span>
                          </div>
                          <div>
                            <div className="w-full bg-[#E8D5C4] h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${phys.percentage >= 85 ? 'bg-emerald-600' : phys.percentage >= 67 ? 'bg-amber-600' : 'bg-rose-600'}`}
                                style={{ width: `${phys.percentage}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-[#5A454C] block mt-1">
                              {phys.percentage}% Accuracy
                            </span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Chemistry Card */}
                    {(() => {
                      const badge = getStatusBadge(chem.percentage);
                      return (
                        <div className="p-4 rounded-xl border border-[#D5A3AE]/60 bg-[#FAF4EE] flex flex-col justify-between space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#722F45]">Chemistry</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <div className="text-2xl font-extrabold text-[#722F45]">
                            {chem.correct} <span className="text-xs font-semibold text-[#8C4057]">/ {chem.total}</span>
                          </div>
                          <div>
                            <div className="w-full bg-[#E8D5C4] h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${chem.percentage >= 85 ? 'bg-emerald-600' : chem.percentage >= 67 ? 'bg-amber-600' : 'bg-rose-600'}`}
                                style={{ width: `${chem.percentage}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-[#5A454C] block mt-1">
                              {chem.percentage}% Accuracy
                            </span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Aptitude Card */}
                    {(() => {
                      const badge = getStatusBadge(apt.percentage);
                      return (
                        <div className="p-4 rounded-xl border border-[#D5A3AE]/60 bg-[#FAF4EE] flex flex-col justify-between space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#722F45]">Aptitude</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <div className="text-2xl font-extrabold text-[#722F45]">
                            {apt.correct} <span className="text-xs font-semibold text-[#8C4057]">/ {apt.total}</span>
                          </div>
                          <div>
                            <div className="w-full bg-[#E8D5C4] h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${apt.percentage >= 85 ? 'bg-emerald-600' : apt.percentage >= 67 ? 'bg-amber-600' : 'bg-rose-600'}`}
                                style={{ width: `${apt.percentage}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-[#5A454C] block mt-1">
                              {apt.percentage}% Accuracy
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Rule 6 Note */}
                  <div className="text-[11px] text-[#5A454C] bg-[#FAF4EE] p-2.5 rounded-lg border border-[#D5A3AE]/40 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Fair Evaluation Rule:</strong> A single incorrect answer does not mark an entire subject as weak. A subject is only flagged for a 4-week recovery plan if overall subject accuracy drops below 85%.
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Dedicated Aptitude Section Scorecard for non-MPC */}
            {(() => {
              const isMPC = result.specialization.toLowerCase().includes('mpc') || result.assessmentTitle.toLowerCase().includes('mpc');
              if (isMPC) return null;

              const aptitudeScore = result.topicPerformance.find(
                (tp) => tp.topic.toLowerCase().includes('aptitude') || tp.topic.toLowerCase().includes('reasoning')
              );
              if (!aptitudeScore) return null;
              return (
                <div className="p-5 rounded-2xl bg-[#FFF9F2] border-2 border-[#D5A3AE]/70 shadow-xs mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#722F45] px-2.5 py-0.5 rounded-full">
                            Dedicated Aptitude Section
                          </span>
                          <span className="text-xs font-semibold text-[#8C4057]">
                            10 Questions
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#722F45] mt-1 font-serif-accent">
                          General Aptitude, Numerical &amp; Logical Reasoning
                        </h4>
                        <p className="text-[11px] text-[#5A454C]">
                          Assesses speed, pattern detection, percentages, averages, and everyday problem-solving skills.
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right sm:border-l sm:border-[#D5A3AE]/50 sm:pl-6 shrink-0">
                      <div className="text-3xl font-extrabold text-[#722F45]">
                        {aptitudeScore.correct} <span className="text-sm font-medium text-[#8C4057]">/ {aptitudeScore.total}</span>
                      </div>
                      <span className="text-xs font-bold text-[#8C4057]">
                        {aptitudeScore.percentage}% Aptitude Score
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Subject-Wise Performance Breakdown (Separate from Aptitude) */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#722F45]">
                  Subject-Wise Performance Breakdown
                </h3>
                <span className="text-xs text-[#5A454C]">
                  Individual scores per curriculum subject
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.topicPerformance
                  .filter((tp) => !tp.topic.toLowerCase().includes('aptitude') && !tp.topic.toLowerCase().includes('reasoning'))
                  .map((tp) => (
                    <div key={tp.topic} className="p-3.5 rounded-xl bg-white border border-[#D5A3AE]/60 shadow-2xs">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-[#2D2226] truncate pr-2">{tp.topic}</span>
                        <span className="font-bold text-[#722F45] shrink-0">
                          {tp.correct} / {tp.total} ({tp.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#F9ECE0] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            tp.percentage >= 80 ? 'bg-emerald-600' : tp.percentage >= 50 ? 'bg-[#722F45]' : 'bg-rose-600'
                          }`}
                          style={{ width: `${tp.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Navigation Action Links to Skill Gap Tracker and Roadmap */}
            {(onViewSkillGaps || onViewRoadmap) && (
              <div className="mt-6 p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#722F45]">
                    Bridge Your Gaps with Mentor Guidance
                  </h4>
                  <p className="text-[11px] text-[#5A454C]">
                    Your diagnostic results have updated your 4-week improvement plan and personalized learning path.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {onViewSkillGaps && (
                    <button
                      onClick={onViewSkillGaps}
                      className="px-3.5 py-1.5 rounded-lg bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      View Skill Gap Tracker &rarr;
                    </button>
                  )}
                  {onViewRoadmap && (
                    <button
                      onClick={onViewRoadmap}
                      className="px-3.5 py-1.5 rounded-lg border border-[#722F45] bg-white text-[#722F45] hover:bg-[#FAF4EE] text-xs font-bold transition-all cursor-pointer"
                    >
                      Personalized Roadmap &rarr;
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Difficulty Performance Breakdown */}
            <div className="mt-6 pt-5 border-t border-[#D5A3AE]/40">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#722F45] mb-3">
                Performance by Question Difficulty (Easy · Medium · Hard)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {result.difficultyPerformance.map((dp) => (
                  <div key={dp.difficulty} className="p-3 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
                    <span className="text-xs font-bold text-[#5A454C] block">{dp.difficulty}</span>
                    <span className="text-lg font-bold text-[#722F45]">
                      {dp.correct} / {dp.total}
                    </span>
                    <span className="text-[10px] text-[#5A454C] block mt-0.5">
                      {Math.round((dp.correct / (dp.total || 1)) * 100)}% Accuracy
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gap Analysis & Recommended Resources */}
            <div className="mt-8 pt-6 border-t border-[#D5A3AE]/40 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Skill Gaps */}
              <div className="p-4 rounded-xl bg-white border border-[#D5A3AE]/60">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#8C4057] mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Identified Skill Gaps to Strengthen</span>
                </h4>
                {result.skillGaps.length === 0 ? (
                  <p className="text-xs text-emerald-800 font-semibold py-2">
                    Superb mastery! No significant skill gaps detected in this diagnostic.
                  </p>
                ) : (
                  <ul className="space-y-1.5 text-xs text-[#5A454C]">
                    {result.skillGaps.map((gap) => (
                      <li key={gap} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8C4057] shrink-0" />
                        <span>Focus review on <strong>{gap}</strong></span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Recommended Resources */}
              <div className="p-4 rounded-xl bg-white border border-[#D5A3AE]/60">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#722F45] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#8C4057]" />
                  <span>Recommended Learning Resources</span>
                </h4>
                <div className="space-y-2">
                  {result.recommendedResources.map((res) => (
                    <div key={res.title} className="p-2.5 rounded-lg bg-[#F9ECE0] border border-[#D5A3AE]/50 text-xs">
                      <p className="font-bold text-[#722F45]">{res.title}</p>
                      <p className="text-[11px] text-[#5A454C] mt-0.5">{res.description}</p>
                      <span className="text-[10px] text-[#8C4057] font-bold block mt-1">
                        Provider: {res.provider} · Focus: {res.focusArea}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* QUESTION-BY-QUESTION VERIFIED REVIEW */}
          <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D5A3AE]/40 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#722F45] font-serif-accent">
                  Question-by-Question Academic Review
                </h3>
                <p className="text-xs text-[#5A454C]">
                  Verify each question, compare your chosen response with the verified answer key, and review the academic rationale.
                </p>
              </div>

              {/* Review Filter */}
              <div className="flex items-center gap-1 p-1 bg-[#F9ECE0] rounded-lg">
                <button
                  onClick={() => setFilterReview('all')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    filterReview === 'all' ? 'bg-white text-[#722F45] shadow-xs' : 'text-[#5A454C]'
                  }`}
                >
                  All ({questions.length})
                </button>
                <button
                  onClick={() => setFilterReview('incorrect')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    filterReview === 'incorrect' ? 'bg-white text-[#722F45] shadow-xs' : 'text-[#5A454C]'
                  }`}
                >
                  Incorrect ({result.totalQuestions - result.score})
                </button>
              </div>
            </div>

            {/* List of 20 Questions */}
            <div className="space-y-4">
              {questions
                .filter((q) => {
                  if (filterReview === 'incorrect') {
                    return userAnswers[q.id] !== q.correctAnswer;
                  }
                  return true;
                })
                .map((q, qIndex) => {
                  const studentAnswer = userAnswers[q.id];
                  const isCorrect = studentAnswer === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-xl border text-left transition-all ${
                        isCorrect
                          ? 'bg-[#F9FAF8] border-emerald-200'
                          : 'bg-[#FFF8F7] border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#722F45]">
                            Question {qIndex + 1}
                          </span>
                          <span className="text-xs text-[#5A454C]">
                            (ID: {q.id})
                          </span>
                          <span className="text-[10px] font-semibold text-[#8C4057] bg-[#F9ECE0] px-2 py-0.5 rounded border border-[#D5A3AE]/40">
                            {q.topic}
                          </span>
                        </div>

                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Correct (+1)</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-bold text-rose-700">
                            <XCircle className="w-4 h-4" />
                            <span>Incorrect</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-[#2D2226] mb-3">
                        {q.question}
                      </h4>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt) => {
                          const isKeyAnswer = opt.id === q.correctAnswer;
                          const wasChosenByStudent = studentAnswer === opt.id;

                          return (
                            <div
                              key={opt.id}
                              className={`p-2.5 rounded-lg text-xs font-medium border flex items-center justify-between ${
                                isKeyAnswer
                                  ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 font-bold'
                                  : wasChosenByStudent
                                  ? 'bg-rose-100/70 border-rose-400 text-rose-950 font-bold'
                                  : 'bg-white border-[#D5A3AE]/60 text-[#2D2226]'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{opt.id}.</span>
                                <span>{opt.text}</span>
                              </div>
                              {isKeyAnswer && (
                                <span className="text-[10px] uppercase font-bold text-emerald-800">
                                  Verified Key
                                </span>
                              )}
                              {!isKeyAnswer && wasChosenByStudent && (
                                <span className="text-[10px] uppercase font-bold text-rose-800">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Verified Explanation */}
                      <div className="p-3 rounded-lg bg-white border border-[#D5A3AE]/60 text-xs text-[#2D2226]">
                        <span className="font-bold text-[#722F45]">Academic Explanation: </span>
                        {q.explanation}
                      </div>

                    </div>
                  );
                })}
            </div>

            {/* Back to Explorer CTA */}
            <div className="mt-8 pt-4 border-t border-[#D5A3AE]/40 flex items-center justify-between">
              <button
                onClick={onExit}
                className="px-4 py-2 rounded-xl border border-[#D5A3AE] text-xs font-bold text-[#722F45] hover:bg-[#F9ECE0] cursor-pointer"
              >
                Return to Course Explorer
              </button>
              <button
                onClick={onRetake}
                className="px-5 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Retake Assessment
              </button>
            </div>

          </div>

        </div>
      ) : null}

    </div>
  );
};
