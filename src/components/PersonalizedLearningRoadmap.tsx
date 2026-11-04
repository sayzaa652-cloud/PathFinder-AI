import React, { useState, useEffect } from 'react';
import { 
  Compass, CheckCircle2, Circle, Sparkles, BookOpen, 
  HelpCircle, ChevronDown, ChevronUp, RotateCcw, Award, 
  Layers, ArrowRight, Lightbulb, MessageSquareQuote
} from 'lucide-react';
import { StudentProfile, AssessmentResult, PersonalizedRoadmap } from '../types';
import { generatePersonalizedRoadmap } from '../services/roadmapService';
import { storageService } from '../services/storageService';

interface PersonalizedLearningRoadmapProps {
  profile: StudentProfile | null;
  assessmentResults: AssessmentResult[];
  onExploreCourses: () => void;
  onLaunchAssessment: (specialization: string) => void;
}

export const PersonalizedLearningRoadmap: React.FC<PersonalizedLearningRoadmapProps> = ({
  profile,
  assessmentResults,
  onExploreCourses,
  onLaunchAssessment
}) => {
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap>(() => {
    const saved = storageService.getPersonalizedRoadmap();
    if (saved) return saved;
    return generatePersonalizedRoadmap(profile, assessmentResults);
  });

  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const [showExplainableModal, setShowExplainableModal] = useState<string | null>(null);
  const [reflectionResponses, setReflectionResponses] = useState<Record<string, string>>({});
  const [savedReflectionNotice, setSavedReflectionNotice] = useState<string | null>(null);

  // Recalculate if profile changes and no custom roadmap exists
  useEffect(() => {
    const saved = storageService.getPersonalizedRoadmap();
    if (!saved) {
      const generated = generatePersonalizedRoadmap(profile, assessmentResults);
      setRoadmap(generated);
      storageService.savePersonalizedRoadmap(generated);
    }
  }, [profile, assessmentResults]);

  const toggleMilestoneComplete = (phaseId: string, milestoneId: string) => {
    const updatedPhases = roadmap.phases.map((phase) => {
      if (phase.id !== phaseId) return phase;
      const updatedMilestones = phase.milestones.map((m) => {
        if (m.id === milestoneId) {
          return { ...m, completed: !m.completed };
        }
        return m;
      });
      return { ...phase, milestones: updatedMilestones };
    });

    // Calculate total progress
    let totalCount = 0;
    let completedCount = 0;
    updatedPhases.forEach((p) => {
      p.milestones.forEach((m) => {
        totalCount++;
        if (m.completed) completedCount++;
      });
    });

    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const updatedRoadmap: PersonalizedRoadmap = {
      ...roadmap,
      phases: updatedPhases,
      overallProgress: progress
    };

    setRoadmap(updatedRoadmap);
    storageService.savePersonalizedRoadmap(updatedRoadmap);
  };

  const handleRegenerate = () => {
    const fresh = generatePersonalizedRoadmap(profile, assessmentResults);
    setRoadmap(fresh);
    storageService.savePersonalizedRoadmap(fresh);
  };

  const handleSaveReflection = (milestoneId: string, promptText: string) => {
    const responseText = reflectionResponses[milestoneId];
    if (!responseText?.trim()) return;

    storageService.saveStudentReflection({
      id: `ref-${Date.now()}`,
      prompt: promptText,
      response: responseText.trim(),
      date: new Date().toISOString(),
      skillContext: roadmap.specialization
    });

    setSavedReflectionNotice(milestoneId);
    setTimeout(() => setSavedReflectionNotice(null), 3000);
  };

  const completedMilestonesCount = roadmap.phases.reduce(
    (acc, phase) => acc + phase.milestones.filter((m) => m.completed).length,
    0
  );
  const totalMilestonesCount = roadmap.phases.reduce((acc, phase) => acc + phase.milestones.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#722F45] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#E8D5C4] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#D5A3AE]" />
            <span>Step-by-Step Learning Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif-accent leading-tight">
            Your Personalized Learning Roadmap
          </h1>
          <p className="text-sm sm:text-base text-[#FAF4EE]/90 mt-3 font-normal leading-relaxed">
            Created for <span className="font-bold underline decoration-[#D5A3AE]">{roadmap.specialization}</span> to help you reach your goal: <span className="font-bold text-white">&quot;{roadmap.targetCareer}&quot;</span>. Every step explains simply why it helps you and what you will learn.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleRegenerate}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Update Plan From Latest Test</span>
            </button>
            <span className="text-xs text-[#FAF4EE]/80">
              Created on {new Date(roadmap.generatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Roadmap Progress Gauge */}
        <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
            <span className="text-xs uppercase tracking-wider text-[#D5A3AE] font-bold">
              Your Progress
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white">{roadmap.overallProgress}%</span>
              <span className="text-xs text-[#FAF4EE]/80 font-medium">Completed</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#D5A3AE] h-full rounded-full transition-all duration-500"
                style={{ width: `${roadmap.overallProgress}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
            <span className="text-xs uppercase tracking-wider text-[#D5A3AE] font-bold">
              Steps Completed
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white">{completedMilestonesCount}</span>
              <span className="text-xs text-[#FAF4EE]/80 font-medium">/ {totalMilestonesCount} Steps</span>
            </div>
            <span className="text-xs text-white/90 block mt-1">
              {totalMilestonesCount - completedMilestonesCount} steps left to reach your goal
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
            <span className="text-xs uppercase tracking-wider text-[#D5A3AE] font-bold">
              Personalized Plan
            </span>
            <p className="text-xs text-white/90 mt-1 leading-relaxed">
              Based on your practice test scores and your personal career interests.
            </p>
          </div>
        </div>
      </div>

      {/* Explainable AI Executive Rationale Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#D5A3AE]/30 text-[#722F45] flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#722F45] uppercase tracking-wider">
              Why This Learning Plan Fits You
            </h3>
            <p className="text-xs text-[#2D2226] mt-1.5 leading-relaxed font-medium">
              {roadmap.aiRationaleSummary}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Roadmap Phases */}
      <div className="space-y-6">
        {roadmap.phases.map((phase) => {
          const phaseCompletedMilestones = phase.milestones.filter((m) => m.completed).length;
          const isPhaseDone = phaseCompletedMilestones === phase.milestones.length;

          return (
            <div 
              key={phase.id}
              className={`rounded-2xl border transition-all p-6 sm:p-8 shadow-xs ${
                isPhaseDone 
                  ? 'bg-[#FAF4EE] border-emerald-400/80 ring-1 ring-emerald-300' 
                  : 'bg-[#FAF4EE] border-[#D5A3AE]/60'
              }`}
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#D5A3AE]/40">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#DFCEBE] text-[#722F45] border border-[#D5A3AE]/50">
                      Phase {phase.phaseNumber} · Est. {phase.estimatedWeeks} Weeks
                    </span>
                    {isPhaseDone && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Phase Completed</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#722F45] font-serif-accent">
                    {phase.title}
                  </h2>
                  <p className="text-xs text-[#6C555C] mt-1 leading-relaxed">
                    {phase.summary}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#722F45]">
                    {phaseCompletedMilestones} of {phase.milestones.length} Completed
                  </span>
                </div>
              </div>

              {/* Explainable AI Rationale Pill for Phase */}
              <div className="my-4 p-3.5 rounded-xl bg-[#DFCEBE]/60 border border-[#D5A3AE]/50 text-xs text-[#2D2226] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#8C4057] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#722F45]">Phase Rationale: </strong>
                  {phase.whyRecommended}
                </p>
              </div>

              {/* Milestones List */}
              <div className="space-y-4 mt-6">
                {phase.milestones.map((milestone, mIdx) => {
                  const isExpanded = expandedMilestone === milestone.id;

                  return (
                    <div 
                      key={milestone.id}
                      className={`p-5 rounded-xl border transition-all ${
                        milestone.completed 
                          ? 'bg-emerald-50/70 border-emerald-300' 
                          : 'bg-white border-[#D5A3AE]/50 hover:border-[#722F45]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleMilestoneComplete(phase.id, milestone.id)}
                            className="mt-1 text-[#722F45] hover:text-[#5C2436] transition-colors cursor-pointer shrink-0"
                            title={milestone.completed ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            {milestone.completed ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-700 fill-emerald-100" />
                            ) : (
                              <Circle className="w-6 h-6 text-[#D5A3AE] hover:text-[#722F45]" />
                            )}
                          </button>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase text-[#8C4057]">
                                Milestone {phase.phaseNumber}.{mIdx + 1} ({milestone.duration})
                              </span>
                              {milestone.completed && (
                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                                  Done
                                </span>
                              )}
                            </div>
                            <h4 className={`text-base font-bold leading-snug ${
                              milestone.completed ? 'text-emerald-950 line-through decoration-emerald-600' : 'text-[#2D2226]'
                            }`}>
                              {milestone.title}
                            </h4>
                            <p className="text-xs text-[#6C555C] mt-1.5 leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                          className="px-3 py-1.5 rounded-lg border border-[#D5A3AE]/50 bg-[#FAF4EE] hover:bg-[#DFCEBE] text-[#722F45] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Deep Dive'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Expandable Deep Dive Area */}
                      {isExpanded && (
                        <div className="mt-5 pt-4 border-t border-[#D5A3AE]/30 space-y-4">
                          
                          {/* Explainable AI Callout */}
                          <div className="p-3.5 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/50 text-xs">
                            <span className="font-bold text-[#722F45] flex items-center gap-1 mb-1">
                              <Lightbulb className="w-3.5 h-3.5 text-[#8C4057]" />
                              <span>Explainable AI: Why was this specific step selected?</span>
                            </span>
                            <p className="text-[#2D2226] leading-relaxed">
                              {milestone.whyRecommended}
                            </p>
                          </div>

                          {/* Skills Acquired Chips */}
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C4057] block mb-1.5">
                              Competencies Acquired Upon Completion:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {milestone.skillsAcquired.map((skill) => (
                                <span 
                                  key={skill}
                                  className="px-2.5 py-1 rounded-md bg-[#DFCEBE] text-[#722F45] text-xs font-semibold border border-[#D5A3AE]/50"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Recommended Learning Resources */}
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#722F45] block mb-1.5">
                              Recommended Practice &amp; Study Material:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {milestone.recommendedResources.map((res) => (
                                <div 
                                  key={res.title}
                                  className="p-3 rounded-lg bg-[#FAF4EE] border border-[#D5A3AE]/50 text-xs flex items-center justify-between"
                                >
                                  <div>
                                    <p className="font-bold text-[#722F45]">{res.title}</p>
                                    <p className="text-[10px] text-[#6C555C] mt-0.5">{res.provider} · {res.type}</p>
                                  </div>
                                  <button
                                    onClick={() => onLaunchAssessment(roadmap.specialization)}
                                    className="px-2.5 py-1 rounded bg-[#722F45] hover:bg-[#5C2436] text-white text-[11px] font-bold cursor-pointer transition-colors"
                                  >
                                    {res.linkText}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Reflection Prompt Box (Encourage Student Independent Thinking) */}
                          <div className="p-4 rounded-xl bg-[#DFCEBE]/40 border border-[#D5A3AE]/60 space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#722F45]">
                              <MessageSquareQuote className="w-4 h-4 text-[#8C4057]" />
                              <span>Mentor-Recommended Reflection Prompt</span>
                            </div>
                            <p className="text-xs text-[#2D2226] italic">
                              &quot;{milestone.reflectionPrompt}&quot;
                            </p>
                            <textarea
                              rows={2}
                              value={reflectionResponses[milestone.id] || ''}
                              onChange={(e) => setReflectionResponses({ ...reflectionResponses, [milestone.id]: e.target.value })}
                              placeholder="Type your reflection in your own words before marking this milestone complete..."
                              className="w-full p-2.5 rounded-lg border border-[#D5A3AE]/60 bg-white text-xs text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                            />
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-[#6C555C]">
                                {savedReflectionNotice === milestone.id ? (
                                  <span className="text-emerald-800 font-bold">Reflection recorded to your student portfolio!</span>
                                ) : (
                                  'Writing reflections increases active recall by up to 35%.'
                                )}
                              </span>
                              <button
                                onClick={() => handleSaveReflection(milestone.id, milestone.reflectionPrompt)}
                                className="px-3 py-1 rounded-lg bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-colors cursor-pointer"
                              >
                                Save to Journal
                              </button>
                            </div>
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
