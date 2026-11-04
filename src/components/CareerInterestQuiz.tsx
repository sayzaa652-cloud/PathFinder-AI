import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, AlertCircle, Compass, BookOpen } from 'lucide-react';
import { CAREER_INTEREST_QUESTIONS, calculateCareerInterest } from '../data/careerInterestQuestions';
import { CareerInterestResult } from '../types';
import { storageService } from '../services/storageService';

interface CareerInterestQuizProps {
  onSelectCourse: (streamTitle: string) => void;
  onExploreHierarchy: () => void;
}

export const CareerInterestQuiz: React.FC<CareerInterestQuizProps> = ({
  onSelectCourse,
  onExploreHierarchy
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [result, setResult] = useState<CareerInterestResult | null>(() => storageService.getCareerInterestResult());

  const currentQ = CAREER_INTEREST_QUESTIONS[currentIdx];
  const totalQuestions = CAREER_INTEREST_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    const updated = { ...answers, [currentQ.id]: optionId };
    setAnswers(updated);

    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleCalculateResult = () => {
    if (answeredCount < totalQuestions) return;
    const computed = calculateCareerInterest(answers);
    setResult(computed);
    storageService.saveCareerInterestResult(computed);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5A3AE]/25 border border-[#D5A3AE] text-xs font-semibold text-[#722F45] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#8C4057]" />
          <span>Stream Finder Quiz</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#722F45] tracking-tight font-serif-accent">
          Which Stream Is Right for You?
        </h1>
        <p className="text-sm sm:text-base text-[#5A454C] mt-2 max-w-xl mx-auto">
          Answer 10 simple questions to find which subjects fit your interests best, explore college courses, and see helpful skills to learn.
        </p>
      </div>

      {!result ? (
        /* Quiz Question Card */
        <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 shadow-xs p-6 sm:p-8">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#D5A3AE]/40">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#8C4057] uppercase tracking-wider">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
              <span className="text-xs text-[#5A454C]">
                · {answeredCount} answered
              </span>
            </div>
            
            {/* Dots navigation */}
            <div className="flex items-center gap-1.5">
              {CAREER_INTEREST_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    currentIdx === idx
                      ? 'bg-[#722F45] scale-125'
                      : answers[q.id]
                      ? 'bg-[#D5A3AE]'
                      : 'bg-[#D5A3AE]/30'
                  }`}
                  aria-label={`Jump to question ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-[#2D2226] mb-6 leading-snug">
            {currentQ.question}
          </h2>

          {/* 4 MCQ Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-[#722F45] text-white border-[#722F45] shadow-xs'
                      : 'bg-white text-[#2D2226] border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-[#D5A3AE]/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F9ECE0] text-[#722F45] group-hover:bg-[#D5A3AE]/30'
                      }`}
                    >
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

          {/* Navigation controls */}
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
                className="px-5 py-2.5 rounded-xl bg-[#F9ECE0] hover:bg-[#D5A3AE]/30 text-[#722F45] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCalculateResult}
                disabled={answeredCount < totalQuestions}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
                  answeredCount === totalQuestions
                    ? 'bg-[#722F45] hover:bg-[#5C2436] text-white cursor-pointer'
                    : 'bg-[#D5A3AE]/40 text-[#5A454C] cursor-not-allowed'
                }`}
              >
                <span>Generate Stream Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results Card */
        <div className="space-y-6">
          
          {/* Top Score Banner */}
          <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5A3AE]/40">
              <div>
                <span className="text-xs uppercase font-bold text-[#8C4057] tracking-wider">
                  Quiz Completed
                </span>
                <h2 className="text-2xl font-bold text-[#722F45] mt-1 font-serif-accent">
                  Your Recommended Learning Paths
                </h2>
                <p className="text-xs text-[#5A454C] mt-0.5">
                  Based on the activities and topics you enjoy most.
                </p>
              </div>

              <button
                onClick={handleRetake}
                className="px-4 py-2 rounded-xl border border-[#D5A3AE] bg-[#F9ECE0] hover:bg-[#D5A3AE]/30 text-[#722F45] text-xs font-bold transition-colors flex items-center gap-1.5 w-fit cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            {/* Tie notice if applicable */}
            {result.isTied && (
              <div className="my-5 p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#8C4057] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#722F45]">Balanced Interests Found!</p>
                  <p className="text-xs text-[#5A454C] mt-0.5">
                    You scored equally high in multiple fields. Check out both recommended paths below.
                  </p>
                </div>
              </div>
            )}

            {/* Score Distribution Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              {[
                { label: 'Technology & AI', score: result.scores.tech_ai },
                { label: 'Life Sciences & Health', score: result.scores.bio_health },
                { label: 'Finance & Analytics', score: result.scores.finance_business },
                { label: 'Humanities & Social', score: result.scores.humanities_social }
              ].map((item) => (
                <div key={item.label} className="p-3.5 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
                  <p className="text-xs text-[#5A454C] font-medium truncate">{item.label}</p>
                  <p className="text-2xl font-extrabold text-[#722F45] mt-1">{item.score}<span className="text-xs font-normal text-[#8C4057]">/10</span></p>
                  <div className="w-full bg-[#D5A3AE]/40 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#722F45] h-full rounded-full transition-all"
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Stream Recommendations */}
            <div className="space-y-6 mt-6">
              {result.recommendations.map((rec, index) => (
                <div
                  key={rec.streamKey}
                  className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#D5A3AE]/60 hover:border-[#722F45] transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C4057]">
                      Top Match #{index + 1} ({rec.percentage}% Match)
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F9ECE0] text-[#722F45] border border-[#D5A3AE]/50">
                      {rec.score} / 10 Points
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#722F45] font-serif-accent">
                    {rec.title}
                  </h3>

                  <div className="mt-3 p-3.5 rounded-xl bg-[#F9ECE0]/60 border border-[#D5A3AE]/50 text-xs text-[#2D2226] leading-relaxed">
                    <span className="font-bold text-[#722F45]">Why this fits you: </span>
                    {rec.rationale}
                  </div>

                  {/* Mapped Courses */}
                  <div className="mt-4">
                    <h4 className="text-xs font-bold text-[#2D2226] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#8C4057]" />
                      <span>Recommended Courses &amp; Programs:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {rec.recommendedCourses.map((c) => (
                        <div
                          key={c}
                          className="px-3 py-2 rounded-lg bg-[#FFF9F2] border border-[#D5A3AE]/60 text-xs text-[#2D2226] font-medium flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8C4057] shrink-0" />
                          <span className="truncate">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Future AI Readiness Note */}
                  <div className="mt-4 pt-3 border-t border-[#D5A3AE]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-[#722F45]">AI Skills to Learn: </span>
                      <span className="text-[#5A454C]">{rec.aiReadinessFocus}</span>
                    </div>

                    <button
                      onClick={() => onSelectCourse(rec.title)}
                      className="px-4 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Browse These Courses</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Guidance Note */}
            <div className="mt-8 p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-xs text-[#5A454C] leading-relaxed">
              <span className="font-bold text-[#722F45]">Helpful Advice: </span>
              This quiz is here to give you helpful ideas and start your exploration. Discuss these options with your parents, teachers, and mentors as you make your choices!
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
