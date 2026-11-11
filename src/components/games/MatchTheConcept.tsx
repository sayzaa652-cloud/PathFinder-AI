import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, RefreshCw, Trophy, Sparkles, CheckCircle2, 
  HelpCircle, Award, Shuffle, Star, Layers, Zap, Cpu
} from 'lucide-react';
import { audioService } from '../../data/audioService';

export interface ConceptPair {
  id: string;
  leftText: string;
  rightText: string;
  category: 'Maths 1A Formulas' | 'Physics Applications' | 'Chemistry Concepts' | 'Maths 1B Locus';
  explanation: string;
}

export const MATCH_LEVELS: {
  levelNumber: number;
  levelTitle: string;
  category: string;
  pairs: ConceptPair[];
}[] = [
  {
    levelNumber: 1,
    levelTitle: 'Level 1: Mathematics 1A Formulas & Meanings',
    category: 'Mathematics 1A',
    pairs: [
      {
        id: 'p1_1',
        leftText: 'Cardinal Principle of Sets',
        rightText: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)',
        category: 'Maths 1A Formulas',
        explanation: 'The inclusion-exclusion principle avoids double counting elements in the intersection.'
      },
      {
        id: 'p1_2',
        leftText: 'Power Set Subsets Count',
        rightText: '2ⁿ total subsets (2ⁿ - 1 proper)',
        category: 'Maths 1A Formulas',
        explanation: 'A set with n elements has 2ⁿ total subsets, including empty set ∅.'
      },
      {
        id: 'p1_3',
        leftText: 'Matrix Inverse Formula',
        rightText: 'A⁻¹ = (1 / det A) · Adj(A)',
        category: 'Maths 1A Formulas',
        explanation: 'Matrix inverse exists if det(A) ≠ 0 and equals 1/det(A) times Adjoint matrix.'
      },
      {
        id: 'p1_4',
        leftText: 'Scalar Triple Product Volume',
        rightText: '[ā b̄ c̄] = det(A, B, C)',
        category: 'Maths 1A Formulas',
        explanation: 'Scalar triple product represents the volume of a 3D parallelepiped.'
      }
    ]
  },
  {
    levelNumber: 2,
    levelTitle: 'Level 2: Physics Terms & Real-World Applications',
    category: 'Physics',
    pairs: [
      {
        id: 'p2_1',
        leftText: 'Work-Energy Theorem',
        rightText: 'Work Done = Δ Kinetic Energy (W = ½mv² - ½mv₀²)',
        category: 'Physics Applications',
        explanation: 'Net work done on a body equals change in its kinetic energy.'
      },
      {
        id: 'p2_2',
        leftText: 'Dimensional Formula of Force',
        rightText: '[M¹ L¹ T⁻²]',
        category: 'Physics Applications',
        explanation: 'Force = Mass [M] × Acceleration [L T⁻²].'
      },
      {
        id: 'p2_3',
        leftText: 'Dot Product Physics Application',
        rightText: 'Work W = Force · Displacement (F̄ · s̄)',
        category: 'Physics Applications',
        explanation: 'Scalar dot product gives physical scalar work done.'
      },
      {
        id: 'p2_4',
        leftText: 'Cross Product Physics Application',
        rightText: 'Torque τ̄ = Position × Force (r̄ × F̄)',
        category: 'Physics Applications',
        explanation: 'Vector cross product gives turning torque magnitude and direction.'
      }
    ]
  },
  {
    levelNumber: 3,
    levelTitle: 'Level 3: Chemistry Concepts & Explanations',
    category: 'Chemistry',
    pairs: [
      {
        id: 'p3_1',
        leftText: 'Max Electrons in Shell n',
        rightText: '2n² electrons',
        category: 'Chemistry Concepts',
        explanation: 'Bohr rule stating max shell capacity is 2n² (e.g. n=3 holds 18 electrons).'
      },
      {
        id: 'p3_2',
        leftText: 'Azimuthal Quantum Number l=2',
        rightText: 'd Subshell (Dumbbell shape)',
        category: 'Chemistry Concepts',
        explanation: 'l = 2 corresponds to d orbitals.'
      },
      {
        id: 'p3_3',
        leftText: 'De Morgan Law (A ∪ B)′',
        rightText: 'A′ ∩ B′',
        category: 'Chemistry Concepts',
        explanation: 'Complement flips Union to Intersection.'
      },
      {
        id: 'p3_4',
        leftText: 'Ideal Gas Equation',
        rightText: 'PV = nRT',
        category: 'Chemistry Concepts',
        explanation: 'Relates pressure, volume, temperature, and moles of ideal gas.'
      }
    ]
  }
];

import { CharacterAvatar, DEFAULT_MALE_AVATAR } from '../../types/characterTypes';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';

interface MatchTheConceptProps {
  playerAvatar?: CharacterAvatar;
  onBackToHub: () => void;
}

export const MatchTheConcept: React.FC<MatchTheConceptProps> = ({ playerAvatar = DEFAULT_MALE_AVATAR, onBackToHub }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const level = MATCH_LEVELS[currentLevelIdx];

  const [leftCards, setLeftCards] = useState<{ id: string; text: string }[]>([]);
  const [rightCards, setRightCards] = useState<{ id: string; text: string }[]>([]);

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [activeExplanation, setActiveExplanation] = useState<string | null>(null);
  const [stars, setStars] = useState<number>(3);
  const [attempts, setAttempts] = useState<number>(0);
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);

  useEffect(() => {
    audioService.startMusic('match');
    return () => audioService.stopMusic();
  }, []);

  // Shuffle cards when level changes
  useEffect(() => {
    const lefts = level.pairs.map(p => ({ id: p.id, text: p.leftText }));
    const rights = level.pairs.map(p => ({ id: p.id, text: p.rightText }));

    // Fisher-Yates shuffle
    setLeftCards([...lefts].sort(() => Math.random() - 0.5));
    setRightCards([...rights].sort(() => Math.random() - 0.5));

    setSelectedLeftId(null);
    setSelectedRightId(null);
    setMatchedIds([]);
    setActiveExplanation(null);
    setAttempts(0);
    setStars(3);
    setIsLevelComplete(false);
  }, [currentLevelIdx]);

  // Handle Card Click
  const handleLeftClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    audioService.playClick();
    setSelectedLeftId(id);

    if (selectedRightId) {
      checkMatch(id, selectedRightId);
    }
  };

  const handleRightClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    audioService.playClick();
    setSelectedRightId(id);

    if (selectedLeftId) {
      checkMatch(selectedLeftId, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    setAttempts(prev => prev + 1);

    if (leftId === rightId) {
      // Match found!
      audioService.playMatchSuccess();
      const newMatched = [...matchedIds, leftId];
      setMatchedIds(newMatched);
      setSelectedLeftId(null);
      setSelectedRightId(null);

      const pairObj = level.pairs.find(p => p.id === leftId);
      if (pairObj) {
        setActiveExplanation(pairObj.explanation);
      }

      if (newMatched.length === level.pairs.length) {
        setIsLevelComplete(true);
        audioService.playLevelUpFanfare();
      }
    } else {
      // Mismatch
      audioService.playErrorBuzz();
      setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }, 500);

      if (attempts >= 2 && stars > 1) {
        setStars(prev => Math.max(1, prev - 1));
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < MATCH_LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="p-5 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHub}
            className="p-2 rounded-xl bg-white border border-[#D5A3AE] text-[#722F45] hover:bg-[#D5A3AE]/20 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2.5 py-0.5 rounded">
              Game 2 &bull; Interactive Matching
            </span>
            <h2 className="text-lg font-extrabold text-[#722F45]">
              Match The Concept World
            </h2>
          </div>
        </div>

        {/* Level Controls */}
        <div className="flex items-center gap-2">
          {MATCH_LEVELS.map((lvl, idx) => (
            <button
              key={lvl.levelNumber}
              onClick={() => setCurrentLevelIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentLevelIdx === idx
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'bg-white border border-[#D5A3AE]/60 text-[#2D2226] hover:bg-[#D5A3AE]/20'
              }`}
            >
              L{lvl.levelNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Matching Canvas Area */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-[#FAF4EE] via-[#FFF9F2] to-[#FAF4EE] border-2 border-[#D5A3AE]/70 shadow-md space-y-6 relative overflow-hidden">
        
        {/* Level Header & Animated Male AI Guide Bot-X */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#D5A3AE]/40 pb-4">
          <div className="flex items-center gap-4">
            
            {/* Customized Anime Avatar & Bot-X Guide */}
            <div className="w-14 h-14 rounded-2xl bg-[#722F45] text-white flex items-center justify-center relative shrink-0 shadow-md overflow-hidden">
              <AnimeAvatarRenderer avatar={playerAvatar} pose="idle" size={56} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#722F45] uppercase tracking-wider">
                  {level.category}
                </span>
                <span className="text-[10px] text-[#722F45] font-bold bg-[#D5A3AE]/30 px-2 py-0.5 rounded border border-[#722F45]/20">
                  Player: {playerAvatar.name} &bull; Guide: Bot-X
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#722F45] font-serif-accent mt-0.5">
                {level.levelTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1.5 rounded-2xl border border-amber-300 text-amber-900 text-xs font-extrabold">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Matched: {matchedIds.length} / {level.pairs.length}</span>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-xs text-[#5A454C] leading-relaxed">
          Tap a <strong>Concept Card</strong> on the left, then tap its <strong>Matching Formula / Explanation Card</strong> on the right to lock in laser connections!
        </p>

        {/* 2-Column Matching Cards Grid with 3D Flip Perspective */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative" style={{ perspective: '1000px' }}>
          
          {/* Left Column: Concept Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#722F45] flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Concepts &amp; Terms:
            </h4>
            {leftCards.map((card) => {
              const isMatched = matchedIds.includes(card.id);
              const isSelected = selectedLeftId === card.id;

              return (
                <button
                  key={card.id}
                  disabled={isMatched}
                  onClick={() => handleLeftClick(card.id)}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 opacity-60 cursor-default shadow-xs'
                      : isSelected
                      ? 'bg-[#722F45] text-white border-[#722F45] shadow-lg ring-4 ring-[#722F45]/20 scale-102 translate-z-4'
                      : 'bg-white border-[#D5A3AE]/60 text-[#2D2226] hover:border-[#722F45] hover:bg-[#D5A3AE]/20 shadow-2xs hover:scale-101'
                  }`}
                >
                  <span className="leading-snug">{card.text}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Target Explanation / Formula Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#722F45] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Formulas &amp; Explanations:
            </h4>
            {rightCards.map((card) => {
              const isMatched = matchedIds.includes(card.id);
              const isSelected = selectedRightId === card.id;

              return (
                <button
                  key={card.id}
                  disabled={isMatched}
                  onClick={() => handleRightClick(card.id)}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 opacity-60 cursor-default shadow-xs'
                      : isSelected
                      ? 'bg-[#722F45] text-white border-[#722F45] shadow-lg ring-4 ring-[#722F45]/20 scale-102 translate-z-4'
                      : 'bg-white border-[#D5A3AE]/60 text-[#2D2226] hover:border-[#722F45] hover:bg-[#D5A3AE]/20 shadow-2xs hover:scale-101'
                  }`}
                >
                  <span className="leading-snug font-mono">{card.text}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

        </div>

        {/* Instant Match Explanation Callout */}
        {activeExplanation && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1 text-xs text-emerald-950 shadow-2xs animate-in fade-in">
            <strong className="text-emerald-900 font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Bot-X Match Explanation:
            </strong>
            <p className="leading-relaxed font-medium">{activeExplanation}</p>
          </div>
        )}

        {/* Level Complete Banner */}
        {isLevelComplete && (
          <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-600 to-teal-700 text-white text-center space-y-4 shadow-xl">
            <Trophy className="w-12 h-12 text-amber-300 mx-auto animate-bounce" />
            <h3 className="text-2xl font-extrabold font-serif-accent text-amber-300">
              LEVEL {level.levelNumber} MATCHING COMPLETE!
            </h3>
            <p className="text-xs text-white/90">
              You matched all {level.pairs.length} concept pairs correctly!
            </p>

            <div className="flex items-center justify-center gap-3">
              {currentLevelIdx < MATCH_LEVELS.length - 1 ? (
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 text-[#722F45] font-extrabold text-xs shadow-md hover:bg-amber-300 cursor-pointer"
                >
                  Advance to Level {level.levelNumber + 1}
                </button>
              ) : (
                <button
                  onClick={onBackToHub}
                  className="px-6 py-2.5 rounded-xl bg-white text-[#722F45] font-extrabold text-xs shadow-md hover:bg-gray-100 cursor-pointer"
                >
                  Return to Games Hub
                </button>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
