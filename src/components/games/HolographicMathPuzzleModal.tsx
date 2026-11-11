import React, { useState } from 'react';
import { Sparkles, HelpCircle, Check, AlertCircle, Zap, Shield, Trophy } from 'lucide-react';
import { audioService } from '../../data/audioService';

export interface MathPuzzleData {
  id: string;
  title: string;
  chasmLocation: string;
  formulaQuestion: string;
  equationDisplay: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export const CHASM_MATH_PUZZLES: MathPuzzleData[] = [
  {
    id: 'chasm_puzzle_1',
    title: 'Fractured Chasm Rune Spell: Quadratic Roots',
    chasmLocation: 'The Crystal Forest Gateway Abyss',
    formulaQuestion: 'To activate the ancient 3D Crystal Bridge, calculate the exact real root solutions for equation:',
    equationDisplay: 'x² + 5x + 6 = 0',
    options: ['x = -2 and x = -3', 'x = 2 and x = 3', 'x = -1 and x = -6', 'x = 0 and x = 5'],
    correctIndex: 0,
    hint: 'Factorize the quadratic into (x + 2)(x + 3) = 0. Roots occur where each factor equals 0!',
    explanation: 'Factoring (x + 2)(x + 3) = 0 yields x + 2 = 0 ⟹ x = -2, and x + 3 = 0 ⟹ x = -3. The 3D Crystal Bridge forms!'
  },
  {
    id: 'chasm_puzzle_2',
    title: 'Fractured Chasm Rune Spell: Vector Resultant Force',
    chasmLocation: 'The Subterranean Dynamo Portal',
    formulaQuestion: 'Calculate the magnitude of the net resultant force vector |F̄| acting on the bridge pillar:',
    equationDisplay: '|F̄| = √(F₁² + F₂²)   where F₁ = 6 N (î) and F₂ = 8 N (ĵ)',
    options: ['|F̄| = 14 N', '|F̄| = 10 N', '|F̄| = 48 N', '|F̄| = 2 N'],
    correctIndex: 1,
    hint: 'Calculate |F̄| = √(6² + 8²) = √(36 + 64) = √100.',
    explanation: '|F̄| = √(36 + 64) = √100 = 10 N! The magnetic force stabilizes and forms the 3D bridge!'
  }
];

interface HolographicMathPuzzleModalProps {
  puzzle: MathPuzzleData;
  onSolveCorrect: () => void;
  onClose: () => void;
}

export const HolographicMathPuzzleModal: React.FC<HolographicMathPuzzleModalProps> = ({
  puzzle,
  onSolveCorrect,
  onClose
}) => {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    setSelectedOpt(idx);
    setShowExplanation(true);

    if (idx === puzzle.correctIndex) {
      setIsSuccess(true);
      audioService.playDoorUnlock();
      audioService.playSuccessChime();
      setTimeout(() => {
        onSolveCorrect();
      }, 1600);
    } else {
      setIsSuccess(false);
      audioService.playErrorBuzz();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      
      {/* Holographic Neon Glassmorphism Container */}
      <div className="w-full max-w-xl bg-linear-to-b from-slate-950/90 via-indigo-950/85 to-slate-950/90 border-2 border-cyan-400 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-cyan-500/20 relative space-y-5 overflow-hidden">
        
        {/* Holographic Glowing Top Ribbon */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300">
              HOLOGRAPHIC CHASM SPELL INTERFACE
            </span>
          </div>
          <span className="text-xs font-bold text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-400/30">
            PathFinder Formula Puzzle
          </span>
        </div>

        {/* Puzzle Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-amber-300 block">
            Location: {puzzle.chasmLocation}
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-serif-accent text-white">
            {puzzle.title}
          </h2>
        </div>

        {/* Equation Holographic Display Box */}
        <div className="p-4 rounded-2xl bg-black/60 border-2 border-cyan-400/80 text-center space-y-2 shadow-inner">
          <span className="text-xs font-extrabold text-cyan-300 block">
            {puzzle.formulaQuestion}
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-300 tracking-wider">
            {puzzle.equationDisplay}
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {puzzle.options.map((opt, idx) => {
            let btnStyle = 'bg-white/10 hover:bg-white/20 border-white/30 text-white';
            if (showExplanation) {
              if (idx === puzzle.correctIndex) {
                btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-bold ring-2 ring-emerald-400';
              } else if (idx === selectedOpt) {
                btnStyle = 'bg-rose-600 border-rose-400 text-white font-bold';
              } else {
                btnStyle = 'bg-black/40 border-white/10 text-white/40 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={isSuccess}
                onClick={() => handleSelectOption(idx)}
                className={`p-3.5 rounded-2xl border text-left text-xs font-extrabold transition-all cursor-pointer flex items-center gap-3 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center font-bold text-amber-300 shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Hint & Explanation Feedback */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span>{showHint ? 'Hide Hint' : 'Request Socratic Hint'}</span>
          </button>

          {showExplanation && !isSuccess && (
            <button
              onClick={() => {
                setSelectedOpt(null);
                setShowExplanation(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-rose-500/30 border border-rose-400 text-white text-xs font-bold cursor-pointer"
            >
              Try Again
            </button>
          )}
        </div>

        {showHint && (
          <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-100 leading-relaxed font-medium">
            <strong className="text-amber-300 block mb-1">Formula Hint:</strong>
            {puzzle.hint}
          </div>
        )}

        {showExplanation && (
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-medium ${
            isSuccess
              ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100 animate-pulse'
              : 'bg-rose-950/90 border-rose-400 text-rose-100'
          }`}>
            <strong className="block mb-1 font-extrabold text-sm">
              {isSuccess ? '✨ Formula Solved! Forming 3D Crystal Bridge...' : '❌ Incorrect Formula Result:'}
            </strong>
            {puzzle.explanation}
          </div>
        )}

      </div>
    </div>
  );
};
