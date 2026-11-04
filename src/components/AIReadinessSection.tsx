import React, { useState } from 'react';
import { 
  BrainCircuit, Sparkles, CheckCircle2, ArrowRight, 
  ShieldCheck, Wrench, Terminal, Cpu, Lightbulb, BookOpen, RotateCcw
} from 'lucide-react';
import { StudentProfile } from '../types';
import { calculateAIReadiness } from '../services/aiReadinessService';

interface AIReadinessSectionProps {
  profile: StudentProfile | null;
  onExploreCourses: () => void;
}

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    question: 'How often do you use AI tools (such as Gemini, ChatGPT, or Claude) for study, homework, or projects?',
    options: [
      { text: 'Every day for studying, coding, or understanding difficult topics', points: 25 },
      { text: 'A few times a week when I get stuck on homework', points: 18 },
      { text: 'Once in a while to try it out', points: 10 },
      { text: 'Rarely or never', points: 3 }
    ]
  },
  {
    id: 2,
    question: 'When you ask an AI tool for help, how do you write your questions?',
    options: [
      { text: 'I give clear background details, exact instructions, and say what format I want', points: 25 },
      { text: 'I ask it to explain step by step', points: 18 },
      { text: 'I type short one-line questions and ask follow-ups', points: 12 },
      { text: 'I type quick random words without much detail', points: 5 }
    ]
  },
  {
    id: 3,
    question: 'How do you check whether an AI tool\'s answer is correct?',
    options: [
      { text: 'I check it against my textbook and test formulas or code myself', points: 25 },
      { text: 'I search online to double-check key facts', points: 18 },
      { text: 'I read it quickly to see if it sounds believable', points: 10 },
      { text: 'I assume the AI is always right', points: 2 }
    ]
  },
  {
    id: 4,
    question: 'How familiar are you with AI mistakes, privacy, and using AI honestly?',
    options: [
      { text: 'I understand how AI can make mistakes, why privacy matters, and how to use it honestly', points: 25 },
      { text: 'I know not to blindly copy-paste AI answers for homework', points: 15 },
      { text: 'I have heard about it in news headlines', points: 8 },
      { text: 'I haven\'t thought about AI rules or ethics yet', points: 2 }
    ]
  }
];

export const AIReadinessSection: React.FC<AIReadinessSectionProps> = ({
  profile,
  onExploreCourses
}) => {
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const specialization = profile?.specialization || profile?.streamOrGroup || 'General Science & Technology';
  
  // Calculate readiness
  const diagnostic = calculateAIReadiness(specialization);

  // If student completed interactive diagnostic quiz
  const interactiveScore = Object.values(diagnosticAnswers).reduce((a, b) => a + b, 0);
  const effectiveScore = quizSubmitted ? interactiveScore : diagnostic.score;

  const handleSelectDiagnostic = (qId: number, points: number) => {
    setDiagnosticAnswers({
      ...diagnosticAnswers,
      [qId]: points
    });
  };

  const handleRetakeDiagnostic = () => {
    setDiagnosticAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#722F45] text-[#FFF9F2] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#FFF1DF] mb-4">
            <BrainCircuit className="w-4 h-4 text-[#D5A3AE]" />
            <span>Get Ready for the AI Era</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif-accent leading-tight">
            AI Readiness &amp; Subject Impact
          </h1>
          <p className="text-sm sm:text-base text-[#FFF1DF]/90 mt-3 font-normal leading-relaxed">
            Every career field is changing with artificial intelligence. Discover how modern AI tools and automated models affect your field: <span className="font-bold text-white underline decoration-[#D5A3AE]">{specialization}</span>.
          </p>
        </div>

        {/* Big Scorecard Banner */}
        <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
            <span className="text-xs uppercase tracking-wider text-[#D5A3AE] font-bold">
              Your AI Readiness Score
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-white">{effectiveScore}</span>
              <span className="text-sm text-[#FFF1DF]/80">/ 100</span>
            </div>
            <span className="text-xs text-white/90 font-medium mt-1 block">
              Skill Level: {diagnostic.level} Level
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md sm:col-span-2">
            <span className="text-xs uppercase tracking-wider text-[#D5A3AE] font-bold">
              How AI Is Changing This Subject
            </span>
            <p className="text-xs text-white/90 mt-1.5 leading-relaxed">
              {diagnostic.domainImpactAnalysis}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of AI Readiness */}
      <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-[#722F45] font-serif-accent mb-2">
          The 4 Core AI Skills Every Student Needs
        </h2>
        <p className="text-xs text-[#5A454C] mb-6">
          These 4 skills show how ready you are to use modern AI tools safely, productively, and honestly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {diagnostic.pillars.map((pillar) => (
            <div key={pillar.pillar} className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[#2D2226]">{pillar.pillar}</span>
                <span className="font-bold text-[#722F45]">{pillar.score}%</span>
              </div>
              <p className="text-[11px] text-[#5A454C] mb-2 leading-relaxed">
                {pillar.description}
              </p>
              <div className="w-full bg-[#D5A3AE]/40 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#722F45] h-full rounded-full transition-all"
                  style={{ width: `${pillar.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Skills Roadmap for Specialization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Domain-Specific Future Skills */}
        <div className="p-6 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-[#8C4057]" />
              <h3 className="font-bold text-base text-[#722F45] font-serif-accent">
                {specialization}: Key Skills to Learn for the Future
              </h3>
            </div>
            <p className="text-xs text-[#5A454C] mb-4">
              Important skills to build over the next 1 to 2 years to stay ahead in your studies and career.
            </p>

            <div className="space-y-3">
              {diagnostic.futureSkillsRoadmap.map((item, idx) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
                  <span className="w-5 h-5 rounded-full bg-[#722F45] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-[#2D2226] leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D5A3AE]/40">
            <button
              onClick={onExploreCourses}
              className="text-xs font-bold text-[#722F45] hover:text-[#5C2436] flex items-center gap-1 cursor-pointer"
            >
              <span>Browse related courses in Course Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Recommended AI Tools for the Specialization */}
        <div className="p-6 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-5 h-5 text-[#8C4057]" />
            <h3 className="font-bold text-base text-[#722F45] font-serif-accent">
              Recommended AI Tools for {specialization}
            </h3>
          </div>
          <p className="text-xs text-[#5A454C] mb-4">
            Helpful software and tools used in real workplaces today.
          </p>

          <div className="space-y-3">
            {diagnostic.recommendedAITools.map((tool) => (
              <div key={tool.name} className="p-3.5 rounded-xl bg-white border border-[#D5A3AE]/60 hover:border-[#722F45] transition-all">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-xs text-[#722F45]">{tool.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F9ECE0] text-[#5A454C]">
                    {tool.category}
                  </span>
                </div>
                <p className="text-[11px] text-[#2D2226] font-medium">
                  {tool.whyCrucial}
                </p>
                <p className="text-[10px] text-[#5A454C] mt-1 italic">
                  How people use it: {tool.useCaseForDomain}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive 4-Question AI Readiness Diagnostic Quiz */}
      <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#D5A3AE]/40 mb-6">
          <div>
            <span className="text-xs uppercase font-bold text-[#8C4057] tracking-wider">
              Quick Self-Quiz
            </span>
            <h3 className="text-lg font-bold text-[#722F45] font-serif-accent">
              Test Your Personal AI Readiness
            </h3>
            <p className="text-xs text-[#5A454C]">
              Answer these 4 practical questions to calculate your personalized AI score.
            </p>
          </div>

          {quizSubmitted && (
            <button
              onClick={handleRetakeDiagnostic}
              className="px-3.5 py-1.5 rounded-xl border border-[#D5A3AE] bg-[#F9ECE0] text-[#722F45] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>

        <div className="space-y-6">
          {DIAGNOSTIC_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
              <p className="text-xs font-bold text-[#2D2226] mb-3">
                {idx + 1}. {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const isSelected = diagnosticAnswers[q.id] === opt.points;
                  return (
                    <button
                      key={opt.text}
                      onClick={() => handleSelectDiagnostic(q.id, opt.points)}
                      className={`p-3 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#722F45] text-white border-[#722F45] font-bold shadow-xs'
                          : 'bg-white text-[#2D2226] border-[#D5A3AE]/60 hover:bg-[#D5A3AE]/15'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!quizSubmitted && Object.keys(diagnosticAnswers).length === DIAGNOSTIC_QUESTIONS.length && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setQuizSubmitted(true)}
              className="px-6 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Calculate Your AI Score ({interactiveScore} / 100)
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
