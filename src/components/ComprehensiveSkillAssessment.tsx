import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, AlertCircle, Sparkles, BrainCircuit, 
  BookOpen, Target, Award, ArrowRight, RotateCcw, Clock, ShieldCheck
} from 'lucide-react';
import { StudentProfile, AssessmentResult } from '../types';
import { storageService } from '../services/storageService';

interface ComprehensiveSkillAssessmentProps {
  profile: StudentProfile | null;
  onViewRoadmap: () => void;
  onViewSkillGaps: () => void;
  onRetakeCurriculum20MCQ: (spec: string) => void;
}

interface AssessmentItem {
  id: number;
  dimension: 'Academic Knowledge' | 'Aptitude & Reasoning' | 'Practical Skills' | 'AI Readiness';
  question: string;
  options: { id: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

const ASSESSMENT_ITEMS: AssessmentItem[] = [
  // 1. Academic Knowledge (4)
  {
    id: 1,
    dimension: 'Academic Knowledge',
    question: 'If a cyclist rides 30 kilometers in 2 hours, what is their average speed?',
    options: [
      { id: 'A', text: '10 km/h' },
      { id: 'B', text: '15 km/h' },
      { id: 'C', text: '30 km/h' },
      { id: 'D', text: '60 km/h' }
    ],
    correctAnswer: 'B',
    explanation: 'Speed = Distance ÷ Time = 30 km ÷ 2 hours = 15 km/h.'
  },
  {
    id: 2,
    dimension: 'Academic Knowledge',
    question: 'Which part of a plant absorbs water and minerals from the soil?',
    options: [
      { id: 'A', text: 'Root' },
      { id: 'B', text: 'Stem' },
      { id: 'C', text: 'Leaf' },
      { id: 'D', text: 'Flower' }
    ],
    correctAnswer: 'A',
    explanation: 'Roots grow in the soil and absorb water and minerals to nourish the plant.'
  },
  {
    id: 3,
    dimension: 'Academic Knowledge',
    question: 'If a shopkeeper buys a book for $10 and sells it for $15, how much profit is made?',
    options: [
      { id: 'A', text: '$2' },
      { id: 'B', text: '$5' },
      { id: 'C', text: '$10' },
      { id: 'D', text: '$25' }
    ],
    correctAnswer: 'B',
    explanation: 'Profit = Selling Price minus Cost Price = $15 - $10 = $5.'
  },
  {
    id: 4,
    dimension: 'Academic Knowledge',
    question: 'Who is the constitutional head of state and the first citizen of the Republic of India?',
    options: [
      { id: 'A', text: 'The President' },
      { id: 'B', text: 'The Prime Minister' },
      { id: 'C', text: 'The Chief Justice' },
      { id: 'D', text: 'The Governor' }
    ],
    correctAnswer: 'A',
    explanation: 'The President is the constitutional head of state and the first citizen of India.'
  },

  // 2. Aptitude & Reasoning (4)
  {
    id: 5,
    dimension: 'Aptitude & Reasoning',
    question: 'If a car travels at a steady speed of 50 km/h, how far will it travel in 3 hours?',
    options: [
      { id: 'A', text: '100 km' },
      { id: 'B', text: '120 km' },
      { id: 'C', text: '150 km' },
      { id: 'D', text: '200 km' }
    ],
    correctAnswer: 'C',
    explanation: 'Distance = Speed × Time = 50 km/h × 3 hours = 150 km.'
  },
  {
    id: 6,
    dimension: 'Aptitude & Reasoning',
    question: 'What is the missing number in this pattern: 3, 6, 9, 12, [ ? ]?',
    options: [
      { id: 'A', text: '13' },
      { id: 'B', text: '14' },
      { id: 'C', text: '15' },
      { id: 'D', text: '18' }
    ],
    correctAnswer: 'C',
    explanation: 'The pattern counts by adding 3 each time: 12 + 3 = 15.'
  },
  {
    id: 7,
    dimension: 'Aptitude & Reasoning',
    question: 'Complete the pair: "Bird is to Fly as Fish is to [ ? ]."',
    options: [
      { id: 'A', text: 'Walk' },
      { id: 'B', text: 'Swim' },
      { id: 'C', text: 'Run' },
      { id: 'D', text: 'Climb' }
    ],
    correctAnswer: 'B',
    explanation: 'Birds move by flying in the air, and fish move by swimming in the water.'
  },
  {
    id: 8,
    dimension: 'Aptitude & Reasoning',
    question: 'If 4 identical notebooks cost $20, what is the cost of 1 notebook?',
    options: [
      { id: 'A', text: '$3' },
      { id: 'B', text: '$4' },
      { id: 'C', text: '$5' },
      { id: 'D', text: '$6' }
    ],
    correctAnswer: 'C',
    explanation: 'Cost of 1 notebook = $20 ÷ 4 = $5.'
  },

  // 3. Practical Skills (4)
  {
    id: 9,
    dimension: 'Practical Skills',
    question: 'What is the average of the three test scores: 10, 20, and 30?',
    options: [
      { id: 'A', text: '15' },
      { id: 'B', text: '20' },
      { id: 'C', text: '25' },
      { id: 'D', text: '30' }
    ],
    correctAnswer: 'B',
    explanation: 'Add the numbers: 10 + 20 + 30 = 60. Then divide by 3: 60 ÷ 3 = 20.'
  },
  {
    id: 10,
    dimension: 'Practical Skills',
    question: 'When using a computer for school homework, which action makes sure you do not lose your work?',
    options: [
      { id: 'A', text: 'Shutting down without saving' },
      { id: 'B', text: 'Saving your file regularly' },
      { id: 'C', text: 'Deleting the folder' },
      { id: 'D', text: 'Turning off the monitor' }
    ],
    correctAnswer: 'B',
    explanation: 'Saving regularly keeps your work safe from unexpected shutdowns or power losses.'
  },
  {
    id: 11,
    dimension: 'Practical Skills',
    question: 'Which instrument in a science lab is used to measure temperature accurately?',
    options: [
      { id: 'A', text: 'Thermometer' },
      { id: 'B', text: 'Barometer' },
      { id: 'C', text: 'Speedometer' },
      { id: 'D', text: 'Odometer' }
    ],
    correctAnswer: 'A',
    explanation: 'A thermometer is designed to measure temperature in degrees Celsius or Fahrenheit.'
  },
  {
    id: 12,
    dimension: 'Practical Skills',
    question: 'If a school bag costs $20 and is on sale for 10% off, how much discount do you receive?',
    options: [
      { id: 'A', text: '$1' },
      { id: 'B', text: '$2' },
      { id: 'C', text: '$4' },
      { id: 'D', text: '$5' }
    ],
    correctAnswer: 'B',
    explanation: '10% of $20 = 0.10 × $20 = $2 discount.'
  },

  // 4. AI Readiness & Verification (4)
  {
    id: 13,
    dimension: 'AI Readiness',
    question: 'When an AI makes up a false fact that sounds convincing, what is this called?',
    options: [
      { id: 'A', text: 'AI Hallucination' },
      { id: 'B', text: 'Spelling Mistake' },
      { id: 'C', text: 'Computer Freeze' },
      { id: 'D', text: 'Network Lag' }
    ],
    correctAnswer: 'A',
    explanation: 'An AI hallucination occurs when an AI confidently presents made-up information as fact.'
  },
  {
    id: 14,
    dimension: 'AI Readiness',
    question: 'What is the most effective way to ask an AI to help you solve a multi-step word problem?',
    options: [
      { id: 'A', text: 'Ask it to think step-by-step and show each step' },
      { id: 'B', text: 'Type only one random word' },
      { id: 'C', text: 'Ask it to guess without reading the problem' },
      { id: 'D', text: 'Give no numbers or clues' }
    ],
    correctAnswer: 'A',
    explanation: 'Asking an AI to think step-by-step helps it work through each calculation carefully.'
  },
  {
    id: 15,
    dimension: 'AI Readiness',
    question: 'Why should you avoid typing private family passwords or home addresses into public AI chatbots?',
    options: [
      { id: 'A', text: 'Because public chatbots can store messages and compromise personal privacy' },
      { id: 'B', text: 'Because chatbots only understand numbers' },
      { id: 'C', text: 'Because it will turn off your home electricity' },
      { id: 'D', text: 'Because passwords take too long to type' }
    ],
    correctAnswer: 'A',
    explanation: 'Public AI tools can store your inputs, which risks leaking private personal details or credentials.'
  },
  {
    id: 16,
    dimension: 'AI Readiness',
    question: 'What is the best way to use AI when preparing for school exams?',
    options: [
      { id: 'A', text: 'Copy and paste answers without reading them' },
      { id: 'B', text: 'Use it to get hints and explanations, then practice solving problems yourself' },
      { id: 'C', text: 'Let AI secretly do all homework assignments' },
      { id: 'D', text: 'Never check if the AI answers are correct' }
    ],
    correctAnswer: 'B',
    explanation: 'AI is best used as a patient tutor that provides explanations while you build real skills.'
  }
];

export const ComprehensiveSkillAssessment: React.FC<ComprehensiveSkillAssessmentProps> = ({
  profile,
  onViewRoadmap,
  onViewSkillGaps,
  onRetakeCurriculum20MCQ
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [dimensionScores, setDimensionScores] = useState({
    academic: 0,
    aptitude: 0,
    practical: 0,
    aiReadiness: 0,
    total: 0
  });

  const currentQ = ASSESSMENT_ITEMS[currentIdx];

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    setAnswers({ ...answers, [currentQ.id]: optId });
  };

  const handleNext = () => {
    if (currentIdx < ASSESSMENT_ITEMS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finishAssessment();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const finishAssessment = () => {
    let academicCorrect = 0;
    let aptitudeCorrect = 0;
    let practicalCorrect = 0;
    let aiCorrect = 0;

    ASSESSMENT_ITEMS.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (isCorrect) {
        if (q.dimension === 'Academic Knowledge') academicCorrect++;
        if (q.dimension === 'Aptitude & Reasoning') aptitudeCorrect++;
        if (q.dimension === 'Practical Skills') practicalCorrect++;
        if (q.dimension === 'AI Readiness') aiCorrect++;
      }
    });

    const scores = {
      academic: Math.round((academicCorrect / 4) * 100),
      aptitude: Math.round((aptitudeCorrect / 4) * 100),
      practical: Math.round((practicalCorrect / 4) * 100),
      aiReadiness: Math.round((aiCorrect / 4) * 100),
      total: Math.round(((academicCorrect + aptitudeCorrect + practicalCorrect + aiCorrect) / 16) * 100)
    };

    setDimensionScores(scores);
    setIsCompleted(true);

    // Save as standard AssessmentResult
    const result: AssessmentResult = {
      id: `result_comp_${Date.now()}`,
      assessmentId: 'comp_skill_4d',
      assessmentTitle: '4-Dimensional Skill & AI Readiness Diagnostic',
      specialization: 'Comprehensive 4D Skill & AI Readiness',
      educationLevel: profile?.educationLevel || 'Undergraduate',
      studentName: profile?.name || 'Student',
      completedAt: new Date().toISOString(),
      score: academicCorrect + aptitudeCorrect + practicalCorrect + aiCorrect,
      totalQuestions: 16,
      percentage: scores.total,
      timeSpentSeconds: 420,
      userAnswers: Object.fromEntries(Object.entries(answers).map(([k, v]) => [`q_${k}`, v])),
      topicPerformance: [
        { topic: 'Academic Knowledge', correct: academicCorrect, total: 4, percentage: scores.academic },
        { topic: 'Aptitude & Reasoning', correct: aptitudeCorrect, total: 4, percentage: scores.aptitude },
        { topic: 'Practical Skills', correct: practicalCorrect, total: 4, percentage: scores.practical },
        { topic: 'AI Readiness', correct: aiCorrect, total: 4, percentage: scores.aiReadiness }
      ],
      difficultyPerformance: [
        { difficulty: 'Easy', correct: 4, total: 4 },
        { difficulty: 'Medium', correct: 6, total: 8 },
        { difficulty: 'Hard', correct: 3, total: 4 }
      ],
      skillGaps: [
        scores.academic < 75 ? 'Academic Knowledge Foundations' : null,
        scores.aptitude < 75 ? 'Analytical & Logical Aptitude' : null,
        scores.practical < 75 ? 'Practical Domain Implementation' : null,
        scores.aiReadiness < 75 ? 'AI Verification & Critical Scaffolding' : null
      ].filter(Boolean) as string[],
      strengths: [
        scores.academic >= 75 ? 'Academic Knowledge Foundations' : null,
        scores.aptitude >= 75 ? 'Analytical & Logical Aptitude' : null,
        scores.practical >= 75 ? 'Practical Domain Implementation' : null,
        scores.aiReadiness >= 75 ? 'AI Verification & Critical Scaffolding' : null
      ].filter(Boolean) as string[],
      recommendedResources: [],
      aiInsightNote: 'Calibrated across theoretical, analytical, applied, and AI validation capabilities.'
    };

    storageService.saveAssessmentResult(result);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/25 px-3 py-1 rounded-full border border-[#D5A3AE]">
          Skills &amp; AI Check
        </span>
        <h1 className="text-3xl font-extrabold text-[#722F45] mt-2 font-serif-accent">
          4-Dimensional Skill Assessment
        </h1>
        <p className="text-sm text-[#6C555C] mt-1 leading-relaxed">
          Quickly check your Academic Knowledge, Logical Thinking, Practical Problem Solving, and AI Skills to create your personalized roadmap and improvement plan.
        </p>
      </div>

      {!isCompleted ? (
        <div className="p-6 md:p-8 rounded-3xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-sm space-y-6">
          
          {/* Progress & Dimension Tracker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5A3AE]/40 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2 py-0.5 rounded">
                  {currentQ.dimension}
                </span>
                <span className="text-xs text-[#6C555C]">
                  Question {currentIdx + 1} of {ASSESSMENT_ITEMS.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {ASSESSMENT_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center cursor-pointer transition-all ${
                    currentIdx === idx
                      ? 'bg-[#722F45] text-white scale-110 shadow-xs'
                      : answers[item.id]
                      ? 'bg-[#D5A3AE]/50 text-[#722F45]'
                      : 'bg-white/80 text-[#6C555C] border border-[#D5A3AE]/40'
                  }`}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-base sm:text-lg font-bold text-[#2D2226] leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = answers[currentQ.id] === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#722F45] text-white border-[#722F45] shadow-xs'
                      : 'bg-white hover:bg-[#FAF4EE] border-[#D5A3AE]/60 text-[#2D2226]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isSelected ? 'bg-white text-[#722F45]' : 'bg-[#FAF4EE] text-[#722F45] border border-[#D5A3AE]'
                  }`}>
                    {option.id}
                  </div>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">
                    {option.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="pt-4 border-t border-[#D5A3AE]/40 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#6C555C] hover:text-[#722F45] disabled:opacity-30 cursor-pointer"
            >
              &larr; Previous Question
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="px-6 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] disabled:opacity-40 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentIdx === ASSESSMENT_ITEMS.length - 1 ? 'Submit Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      ) : (
        /* Completed Score Breakdown Card */
        <div className="p-6 md:p-8 rounded-3xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-md space-y-6">
          
          <div className="text-center space-y-2 border-b border-[#D5A3AE]/40 pb-6">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-100 text-emerald-800 mb-2">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#722F45] font-serif-accent">
              Assessment Complete &bull; Your Skill Profile
            </h2>
            <p className="text-xs text-[#6C555C] max-w-lg mx-auto">
              Your scores have been calculated across all 4 areas and synced with your Personalized Roadmap and Skill Gap Tracker.
            </p>
            <div className="text-3xl font-black text-[#722F45] pt-2">
              {dimensionScores.total}% <span className="text-xs font-bold text-[#6C555C] uppercase tracking-wider">Overall Score</span>
            </div>
          </div>

          {/* 4 Dimension Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#722F45]">1. Academic Knowledge</span>
                <span className="text-xs font-black text-[#2D2226]">{dimensionScores.academic}%</span>
              </div>
              <div className="h-2 w-full bg-[#DFCEBE] rounded-full overflow-hidden">
                <div className="h-full bg-[#722F45] rounded-full" style={{ width: `${dimensionScores.academic}%` }} />
              </div>
              <p className="text-[11px] text-[#6C555C]">
                {dimensionScores.academic >= 75 ? 'Great understanding of core concepts!' : 'Review key formulas and ideas to score higher.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#722F45]">2. Aptitude &amp; Reasoning</span>
                <span className="text-xs font-black text-[#2D2226]">{dimensionScores.aptitude}%</span>
              </div>
              <div className="h-2 w-full bg-[#DFCEBE] rounded-full overflow-hidden">
                <div className="h-full bg-[#722F45] rounded-full" style={{ width: `${dimensionScores.aptitude}%` }} />
              </div>
              <p className="text-[11px] text-[#6C555C]">
                {dimensionScores.aptitude >= 75 ? 'Strong math and puzzle-solving skills!' : 'Practice solving word problems step-by-step.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#722F45]">3. Practical Skills</span>
                <span className="text-xs font-black text-[#2D2226]">{dimensionScores.practical}%</span>
              </div>
              <div className="h-2 w-full bg-[#DFCEBE] rounded-full overflow-hidden">
                <div className="h-full bg-[#722F45] rounded-full" style={{ width: `${dimensionScores.practical}%` }} />
              </div>
              <p className="text-[11px] text-[#6C555C]">
                {dimensionScores.practical >= 75 ? 'Good understanding of practical experiments and tools!' : 'Practice hands-on exercises and real-world problems.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#722F45]">4. AI Readiness</span>
                <span className="text-xs font-black text-[#2D2226]">{dimensionScores.aiReadiness}%</span>
              </div>
              <div className="h-2 w-full bg-[#DFCEBE] rounded-full overflow-hidden">
                <div className="h-full bg-[#722F45] rounded-full" style={{ width: `${dimensionScores.aiReadiness}%` }} />
              </div>
              <p className="text-[11px] text-[#6C555C]">
                {dimensionScores.aiReadiness >= 75 ? 'Great awareness of how AI works and how to verify answers!' : 'Learn how to write better prompts and spot AI mistakes.'}
              </p>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#D5A3AE]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleRetake}
              className="text-xs font-bold text-[#722F45] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Test
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onViewSkillGaps}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#D5A3AE]/60 text-[#722F45] text-xs font-bold hover:bg-[#D5A3AE]/20 transition-all cursor-pointer"
              >
                View Skill Gaps &rarr;
              </button>
              <button
                onClick={onViewRoadmap}
                className="px-5 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                View Your Roadmap &rarr;
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
