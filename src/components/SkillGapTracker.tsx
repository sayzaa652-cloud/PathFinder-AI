import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, CheckCircle2, Clock, Sparkles, BookOpen, 
  HelpCircle, Eye, ChevronDown, ChevronUp, RotateCcw, 
  Target, Award, Calendar, Lightbulb, MessageSquareQuote
} from 'lucide-react';
import { SkillGapItem, StudentProfile, AssessmentResult } from '../types';
import { generateSkillGapItems } from '../services/skillGapService';
import { storageService } from '../services/storageService';

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
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(() => {
    const saved = storageService.getSkillGapItems();
    if (saved && saved.length > 0) return saved;
    return generateSkillGapItems(profile, assessmentResults);
  });

  const [activeGapId, setActiveGapId] = useState<string>(() => skillGaps[0]?.id || '');
  const [activeWeekNum, setActiveWeekNum] = useState<number>(1);
  const [revealedHints, setRevealedHints] = useState<Record<string, { hint1?: boolean; hint2?: boolean; solution?: boolean }>>({});
  const [reflectionInput, setReflectionInput] = useState('');
  const [reflectionSuccess, setReflectionSuccess] = useState(false);

  useEffect(() => {
    const saved = storageService.getSkillGapItems();
    if (!saved || saved.length === 0) {
      const fresh = generateSkillGapItems(profile, assessmentResults);
      setSkillGaps(fresh);
      storageService.saveSkillGapItems(fresh);
      if (fresh.length > 0 && !activeGapId) {
        setActiveGapId(fresh[0].id);
      }
    }
  }, [profile, assessmentResults]);

  const selectedGap = skillGaps.find((g) => g.id === activeGapId) || skillGaps[0];

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

      // Calculate new proficiency based on completed tasks
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
      const newStatus: SkillGapItem['status'] = newScore >= 85 ? 'Mastered' : newScore >= 75 ? 'Near Mastery' : newScore >= 60 ? 'Developing' : 'Critical Gap';

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

  const handleToggleHint = (gapId: string, type: 'hint1' | 'hint2' | 'solution') => {
    const current = revealedHints[gapId] || {};
    setRevealedHints({
      ...revealedHints,
      [gapId]: {
        ...current,
        [type]: !current[type]
      }
    });
  };

  const handleSaveDailyReflection = () => {
    if (!reflectionInput.trim()) return;

    storageService.saveStudentReflection({
      id: `ref-gap-${Date.now()}`,
      prompt: `4-Week Improvement Plan: Reflection on ${selectedGap?.skillName}`,
      response: reflectionInput.trim(),
      date: new Date().toISOString(),
      skillContext: selectedGap?.skillName || 'General Skill'
    });

    setReflectionSuccess(true);
    setReflectionInput('');
    setTimeout(() => setReflectionSuccess(false), 3000);
  };

  const selectedWeek = selectedGap?.fourWeekPlan.find((w) => w.weekNumber === activeWeekNum) || selectedGap?.fourWeekPlan[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#722F45] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#E8D5C4] mb-3">
            <Target className="w-3.5 h-3.5 text-[#D5A3AE]" />
            <span>4-Week Improvement Plan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif-accent leading-tight">
            Skill Gap Tracker &amp; 4-Week Study Plan
          </h1>
          <p className="text-sm sm:text-base text-[#FAF4EE]/90 mt-3 font-normal leading-relaxed">
            Identifies your weak topics from practice tests and gives you a simple 4-week plan with step-by-step hints so you can master each topic independently.
          </p>
        </div>

        {/* Aggregate Stats */}
        <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md">
            <span className="text-[10px] uppercase font-bold text-[#D5A3AE] block">Topics to Improve</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{skillGaps.length}</span>
            <span className="text-[10px] text-[#FAF4EE]/80">From your tests</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md">
            <span className="text-[10px] uppercase font-bold text-[#D5A3AE] block">Needs Review (&lt;60%)</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">
              {skillGaps.filter((g) => g.status === 'Critical Gap').length}
            </span>
            <span className="text-[10px] text-amber-200">Start here first</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md">
            <span className="text-[10px] uppercase font-bold text-[#D5A3AE] block">In Progress</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">
              {skillGaps.filter((g) => g.status === 'Developing' || g.status === 'Near Mastery').length}
            </span>
            <span className="text-[10px] text-emerald-200">Currently practicing</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md">
            <span className="text-[10px] uppercase font-bold text-[#D5A3AE] block">Mastered (85%+)</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">
              {skillGaps.filter((g) => g.status === 'Mastered').length}
            </span>
            <span className="text-[10px] text-emerald-300">Great job!</span>
          </div>
        </div>
      </div>

      {/* Skill Gap Cards Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillGaps.map((gap) => {
          const isSelected = gap.id === activeGapId;

          return (
            <div
              key={gap.id}
              onClick={() => setActiveGapId(gap.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                isSelected
                  ? 'bg-white border-[#722F45] ring-2 ring-[#722F45]/30'
                  : 'bg-[#FAF4EE] border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    gap.status === 'Critical Gap'
                      ? 'bg-rose-100 text-rose-900 border border-rose-200'
                      : gap.status === 'Developing'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {gap.status}
                  </span>
                  <span className="text-xs font-bold text-[#722F45]">
                    {gap.currentProficiency}%
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#2D2226] leading-snug line-clamp-2">
                  {gap.skillName}
                </h3>
                <p className="text-[11px] text-[#6C555C] mt-1">
                  {gap.domain}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D5A3AE]/30">
                <div className="flex justify-between text-[11px] text-[#6C555C] mb-1">
                  <span>Target: {gap.targetProficiency}%</span>
                  <span className="font-semibold text-[#722F45]">
                    {gap.fourWeekPlan.filter((w) => w.isCompleted).length} / 4 Wks Done
                  </span>
                </div>
                <div className="w-full bg-[#DFCEBE] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#722F45] h-full rounded-full transition-all"
                    style={{ width: `${gap.currentProficiency}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Gap: 4-Week Detailed Action Plan */}
      {selectedGap && (
        <div className="bg-[#FAF4EE] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Action Plan Top Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5A3AE]/40">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C4057]">
                  Target Skill Remediation Plan
                </span>
                <span className="text-xs text-[#D5A3AE]">·</span>
                <span className="text-xs text-[#6C555C]">
                  {selectedGap.domain}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#722F45] font-serif-accent">
                {selectedGap.skillName}
              </h2>
              <p className="text-xs text-[#6C555C] mt-1">
                Current Proficiency: <strong className="text-[#722F45]">{selectedGap.currentProficiency}%</strong> · Target: <strong>{selectedGap.targetProficiency}%</strong> · Identified from: {selectedGap.identifiedFrom}
              </p>
            </div>

            <button
              onClick={() => onTakeAssessment(selectedGap.domain)}
              className="px-4 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Verify With 20-MCQ Test</span>
              <Award className="w-4 h-4" />
            </button>
          </div>

          {/* 4-Week Tab Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {selectedGap.fourWeekPlan.map((week) => (
              <button
                key={week.weekNumber}
                onClick={() => setActiveWeekNum(week.weekNumber)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  activeWeekNum === week.weekNumber
                    ? 'bg-white border-[#722F45] ring-2 ring-[#722F45]/30 shadow-xs'
                    : 'bg-[#DFCEBE]/50 border-[#D5A3AE]/60 hover:bg-white text-[#2D2226]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#722F45]">
                    Week {week.weekNumber}
                  </span>
                  {week.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <span className="text-[10px] text-[#6C555C]">
                      {week.tasks.filter((t) => t.completed).length} / {week.tasks.length}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-[#2D2226] mt-1 truncate">
                  {week.title.split(':')[1]?.trim() || week.title}
                </p>
              </button>
            ))}
          </div>

          {/* Active Week Content */}
          {selectedWeek && (
            <div className="p-6 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-6 shadow-xs">
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs uppercase font-bold text-[#8C4057] tracking-wider">
                    Week {selectedWeek.weekNumber} Focus Area
                  </span>
                  <span className="text-xs font-bold text-[#722F45]">
                    {selectedWeek.tasks.filter((t) => t.completed).length} of {selectedWeek.tasks.length} Tasks Done
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#722F45] font-serif-accent">
                  {selectedWeek.title}
                </h3>
                <p className="text-xs text-[#2D2226] font-medium mt-1">
                  Objective: {selectedWeek.objective}
                </p>
                <div className="mt-3 p-3 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/50 text-xs text-[#2D2226]">
                  <strong className="text-[#722F45]">Explainable AI Rationale: </strong>
                  {selectedWeek.whyThisWeek}
                </div>
              </div>

              {/* Tasks List with Checkboxes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#722F45] uppercase tracking-wider">
                  Actionable Step-by-Step Tasks:
                </h4>

                {selectedWeek.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                      task.completed 
                        ? 'bg-emerald-50/70 border-emerald-300' 
                        : 'bg-[#FAF4EE]/70 border-[#D5A3AE]/50'
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
                        <span className="text-[10px] text-[#6C555C]">
                          ({task.estimatedMinutes} Mins)
                        </span>
                      </div>
                      <h5 className={`text-sm font-bold leading-snug ${
                        task.completed ? 'text-emerald-950 line-through decoration-emerald-600' : 'text-[#2D2226]'
                      }`}>
                        {task.title}
                      </h5>
                      <p className="text-xs text-[#6C555C] mt-1 leading-relaxed">
                        {task.description}
                      </p>

                      {/* Mentor Hint (Reduces AI Dependency) */}
                      {task.hint && (
                        <div className="mt-2.5 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span><strong>Mentor Hint:</strong> {task.hint}</span>
                        </div>
                      )}

                      {/* Reflection Question if present */}
                      {task.reflectionQuestion && (
                        <div className="mt-2.5 p-2.5 rounded-lg bg-[#DFCEBE]/60 border border-[#D5A3AE]/60 text-xs text-[#2D2226] flex items-start gap-2">
                          <MessageSquareQuote className="w-3.5 h-3.5 text-[#8C4057] shrink-0 mt-0.5" />
                          <span><strong>Reflection Prompt:</strong> {task.reflectionQuestion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Guided Socratic Practice Drill with Progressive Hints */}
          <div className="p-6 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D5A3AE]/40 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#8C4057]" />
                <h3 className="font-bold text-base text-[#722F45] font-serif-accent">
                  Guided Practice with Step-by-Step Clues
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#8C4057] bg-[#DFCEBE] px-2.5 py-0.5 rounded">
                Try on your own first! Open clues only if you get stuck.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/50">
              <span className="text-[10px] font-bold uppercase text-[#8C4057] block mb-1">
                Practice Question for {selectedGap.skillName}:
              </span>
              <p className="text-sm font-bold text-[#2D2226] leading-relaxed">
                {selectedGap.practiceDrill.question}
              </p>
            </div>

            {/* Progressive Hint Reveal Buttons */}
            <div className="space-y-3">
              {/* Hint 1 */}
              <div>
                <button
                  onClick={() => handleToggleHint(selectedGap.id, 'hint1')}
                  className="px-3.5 py-2 rounded-xl border border-[#D5A3AE] bg-[#FAF4EE] hover:bg-[#DFCEBE] text-[#722F45] text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Lightbulb className="w-4 h-4 text-[#8C4057]" />
                  <span>{revealedHints[selectedGap.id]?.hint1 ? 'Hide Hint 1 (The Main Idea)' : 'Show Hint 1 (The Main Idea)'}</span>
                </button>
                {revealedHints[selectedGap.id]?.hint1 && (
                  <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                    {selectedGap.practiceDrill.conceptClue}
                  </div>
                )}
              </div>

              {/* Hint 2 */}
              <div>
                <button
                  onClick={() => handleToggleHint(selectedGap.id, 'hint2')}
                  className="px-3.5 py-2 rounded-xl border border-[#D5A3AE] bg-[#FAF4EE] hover:bg-[#DFCEBE] text-[#722F45] text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#8C4057]" />
                  <span>{revealedHints[selectedGap.id]?.hint2 ? 'Hide Hint 2 (Formulas & Steps)' : 'Show Hint 2 (Formulas & Steps)'}</span>
                </button>
                {revealedHints[selectedGap.id]?.hint2 && (
                  <div className="mt-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 leading-relaxed">
                    {selectedGap.practiceDrill.methodology}
                  </div>
                )}
              </div>

              {/* Full Solution */}
              <div>
                <button
                  onClick={() => handleToggleHint(selectedGap.id, 'solution')}
                  className="px-3.5 py-2 rounded-xl border border-[#D5A3AE] bg-[#FAF4EE] hover:bg-[#DFCEBE] text-[#722F45] text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Eye className="w-4 h-4 text-[#8C4057]" />
                  <span>{revealedHints[selectedGap.id]?.solution ? 'Hide Full Solution' : 'Show Full Solution'}</span>
                </button>
                {revealedHints[selectedGap.id]?.solution && (
                  <div className="mt-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-medium">
                    {selectedGap.practiceDrill.workedApproach}
                  </div>
                )}
              </div>
            </div>

            {/* Daily Reflection Journal Box */}
            <div className="mt-6 pt-5 border-t border-[#D5A3AE]/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#722F45]">
                <MessageSquareQuote className="w-4 h-4 text-[#8C4057]" />
                <span>Daily Reflection: Write What You Learned</span>
              </div>
              <p className="text-xs text-[#6C555C]">
                Take 2 minutes to write what was most helpful or tricky in this topic today. Explaining in your own words helps you remember better.
              </p>
              <textarea
                rows={2}
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                placeholder="What single concept became clearer to you during today's practice session?"
                className="w-full p-3 rounded-xl border border-[#D5A3AE]/60 bg-[#FAF4EE] text-xs text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-emerald-800 font-bold">
                  {reflectionSuccess ? 'Reflection saved to your portfolio journal!' : ''}
                </span>
                <button
                  onClick={handleSaveDailyReflection}
                  disabled={!reflectionInput.trim()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    reflectionInput.trim()
                      ? 'bg-[#722F45] hover:bg-[#5C2436] text-white cursor-pointer'
                      : 'bg-[#DFCEBE] text-[#6C555C] cursor-not-allowed'
                  }`}
                >
                  Record Reflection
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
