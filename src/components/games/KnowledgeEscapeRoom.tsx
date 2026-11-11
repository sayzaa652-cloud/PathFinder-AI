import React, { useState, useEffect } from 'react';
import { 
  Key, Lock, Unlock, HelpCircle, ArrowLeft, RefreshCw, Trophy, 
  Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, DoorClosed, DoorOpen, Award, Compass, Flame
} from 'lucide-react';
import { audioService } from '../../data/audioService';

export interface RoomChallenge {
  roomId: number;
  roomTitle: string;
  subject: 'Mathematics IA' | 'Physics' | 'Chemistry' | 'Mathematics IB' | 'Final Vault';
  environmentName: string;
  themeColor: string;
  doorLockCodeDescription: string;
  puzzleQuestion: string;
  options: string[];
  correctOptionIndex: number;
  hint: string;
  explanation: string;
  unlockRewardBadge: string;
}

export const ESCAPE_ROOMS: RoomChallenge[] = [
  {
    roomId: 1,
    roomTitle: 'Room 1: The Chamber of Sets & Venn Algebra',
    subject: 'Mathematics IA',
    environmentName: 'Ancient Library Storage Vault',
    themeColor: 'from-[#722F45] to-[#4A1D2D]',
    doorLockCodeDescription: 'The heavy brass door is sealed with a 3-digit cardinal lock requiring set inclusion-exclusion calculation.',
    puzzleQuestion: 'In a class of 40 Telangana students, 25 study Maths IA (Set M), 20 study Physics (Set P), and 8 study BOTH subjects. To unlock Door 1, calculate how many students study AT LEAST ONE subject (n(M ∪ P)).',
    options: ['37 Students', '45 Students', '33 Students', '28 Students'],
    correctOptionIndex: 0,
    hint: 'Use the Cardinal Principle of Sets formula: n(M ∪ P) = n(M) + n(P) - n(M ∩ P). Here 25 + 20 - 8.',
    explanation: 'n(M ∪ P) = n(M) + n(P) - n(M ∩ P) = 25 + 20 - 8 = 37. Correct! The cardinal lock clicks open!',
    unlockRewardBadge: 'Master of Set Algebra'
  },
  {
    roomId: 2,
    roomTitle: 'Room 2: The Vector Force Terminal',
    subject: 'Physics',
    environmentName: 'Subterranean Dynamo Laboratory',
    themeColor: 'from-amber-900 to-amber-950',
    doorLockCodeDescription: 'An electromagnetic gate requires entering the magnitude of the net resultant force vector to release the magnetic latch.',
    puzzleQuestion: 'Two orthogonal forces F₁ = 6 N along î and F₂ = 8 N along ĵ act simultaneously on the door lock mechanism. Calculate the magnitude of the resultant net force vector |F̄|.',
    options: ['14 N', '10 N', '2 N', '48 N'],
    correctOptionIndex: 1,
    hint: 'For perpendicular vectors (90°), the resultant magnitude is given by |F̄| = √(F₁² + F₂²) = √(6² + 8²).',
    explanation: '|F̄| = √(6² + 8²) = √(36 + 64) = √100 = 10 N. The electromagnetic gate releases!',
    unlockRewardBadge: 'Vector Force Engineer'
  },
  {
    roomId: 3,
    roomTitle: 'Room 3: The Quantum Atomic Chamber',
    subject: 'Chemistry',
    environmentName: 'Fluorescent Quantum Particle Lab',
    themeColor: 'from-emerald-900 to-emerald-950',
    doorLockCodeDescription: 'A laser grid door requires keying in the correct principal & azimuthal quantum numbers for a 3d electron orbital.',
    puzzleQuestion: 'To disarm the laser grid, enter the exact Principal Quantum Number (n) and Azimuthal Quantum Number (l) values for an electron in a 3d orbital.',
    options: ['n = 3, l = 1 (p subshell)', 'n = 3, l = 2 (d subshell)', 'n = 2, l = 3', 'n = 4, l = 0'],
    correctOptionIndex: 1,
    hint: 'The number prefix 3 gives Principal n = 3. For subshells: s ➔ l=0, p ➔ l=1, d ➔ l=2.',
    explanation: 'For a 3d orbital, Principal quantum number n = 3 and Azimuthal quantum number l = 2. Laser grid deactivated!',
    unlockRewardBadge: 'Quantum Atomic Specialist'
  },
  {
    roomId: 4,
    roomTitle: 'Room 4: The Coordinate Locus Corridor',
    subject: 'Mathematics IB',
    environmentName: 'Crystalline Prism Gallery',
    themeColor: 'from-purple-900 to-purple-950',
    doorLockCodeDescription: 'A heavy stone portal requires calculating the slope of the straight line perpendicular to the laser barrier.',
    puzzleQuestion: 'The laser barrier is along line L₁: 2x - 4y + 7 = 0. Calculate the slope m₂ of any line L₂ that is strictly PERPENDICULAR to L₁.',
    options: ['m₂ = 1/2', 'm₂ = -2', 'm₂ = 2', 'm₂ = -1/2'],
    correctOptionIndex: 1,
    hint: 'Slope of L₁: m₁ = -A/B = -2/(-4) = 1/2. Perpendicular condition m₁ · m₂ = -1 ⟹ (1/2) m₂ = -1.',
    explanation: 'm₁ = 1/2. Perpendicular slope m₂ = -1 / (1/2) = -2. Stone portal slides open!',
    unlockRewardBadge: 'Coordinate Geometry Pioneer'
  },
  {
    roomId: 5,
    roomTitle: 'Room 5: The Grand Master Vault',
    subject: 'Final Vault',
    environmentName: 'The Apex Knowledge Observatory',
    themeColor: 'from-[#722F45] via-purple-950 to-[#4A1D2D]',
    doorLockCodeDescription: 'The final escape vault door requires solving the master matrix determinant identity to escape to freedom!',
    puzzleQuestion: 'Calculate the determinant value det(A) of 2×2 matrix A = [[5, 3], [2, 4]] to activate the main observatory elevator exit.',
    options: ['det(A) = 14', 'det(A) = 26', 'det(A) = 7', 'det(A) = 20'],
    correctOptionIndex: 0,
    hint: 'For a 2×2 matrix [[a, b], [c, d]], det(A) = ad - bc. Calculate (5 × 4) - (3 × 2).',
    explanation: 'det(A) = (5 × 4) - (3 × 2) = 20 - 6 = 14. Congratulations! The Grand Vault Unlocks and you Escape!',
    unlockRewardBadge: 'Grand Pathfinder Escape Master'
  }
];

import { CharacterAvatar, DEFAULT_MALE_AVATAR } from '../../types/characterTypes';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';

interface KnowledgeEscapeRoomProps {
  playerAvatar?: CharacterAvatar;
  onBackToHub: () => void;
}

export const KnowledgeEscapeRoom: React.FC<KnowledgeEscapeRoomProps> = ({ playerAvatar = DEFAULT_MALE_AVATAR, onBackToHub }) => {
  const [currentRoomIdx, setCurrentRoomIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [unlockedRooms, setUnlockedRooms] = useState<number[]>([1]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [isCompletedAll, setIsCompletedAll] = useState<boolean>(false);

  const room = ESCAPE_ROOMS[currentRoomIdx];

  useEffect(() => {
    audioService.startMusic('escape');
    return () => {
      audioService.stopMusic();
    };
  }, []);

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === room.correctOptionIndex) {
      audioService.playDoorUnlock();
      if (!unlockedRooms.includes(room.roomId + 1) && room.roomId < ESCAPE_ROOMS.length) {
        setUnlockedRooms(prev => [...prev, room.roomId + 1]);
      }
      if (!earnedBadges.includes(room.unlockRewardBadge)) {
        setEarnedBadges(prev => [...prev, room.unlockRewardBadge]);
      }
      if (room.roomId === ESCAPE_ROOMS.length) {
        setIsCompletedAll(true);
        audioService.playLevelUpFanfare();
      }
    } else {
      audioService.playErrorBuzz();
    }
  };

  const handleNextRoom = () => {
    if (currentRoomIdx < ESCAPE_ROOMS.length - 1) {
      setCurrentRoomIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowHint(false);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentRoomIdx(0);
    setSelectedOption(null);
    setShowHint(false);
    setShowExplanation(false);
    setUnlockedRooms([1]);
    setEarnedBadges([]);
    setIsCompletedAll(false);
  };

  const isCurrentUnlocked = unlockedRooms.includes(room.roomId + 1) || selectedOption === room.correctOptionIndex;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Game Bar */}
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
              Game 1 &bull; Escape Adventure
            </span>
            <h2 className="text-lg font-extrabold text-[#722F45]">
              Knowledge Escape Room
            </h2>
          </div>
        </div>

        {/* Room Progress Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {ESCAPE_ROOMS.map((r, idx) => {
            const isUnlocked = unlockedRooms.includes(r.roomId);
            const isCurrent = currentRoomIdx === idx;
            return (
              <button
                key={r.roomId}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    setCurrentRoomIdx(idx);
                    setSelectedOption(null);
                    setShowHint(false);
                    setShowExplanation(false);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#722F45] text-white shadow-xs'
                    : isUnlocked
                    ? 'bg-emerald-100 border border-emerald-300 text-emerald-900 hover:bg-emerald-200'
                    : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                {isUnlocked ? <DoorOpen className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5" />}
                <span>Room {r.roomId}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Escape Room Viewport */}
      {isCompletedAll ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-[#722F45] via-purple-950 to-[#4A1D2D] text-white text-center space-y-6 shadow-2xl border-4 border-amber-400">
          <Trophy className="w-16 h-16 text-amber-300 mx-auto animate-bounce" />
          <h2 className="text-3xl font-extrabold font-serif-accent text-amber-300">
            CONGRATULATIONS! YOU ESCAPED ALL ROOMS!
          </h2>
          <p className="text-sm text-white/90 max-w-lg mx-auto leading-relaxed">
            You successfully solved all 5 subject challenges across Mathematics IA, Mathematics IB, Physics, and Chemistry to unlock the Grand Apex Observatory!
          </p>

          <div className="p-4 rounded-2xl bg-black/30 border border-amber-300/40 max-w-md mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Earned Badges ({earnedBadges.length}):
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {earnedBadges.map((badge, bIdx) => (
                <span key={bIdx} className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold border border-amber-400/40 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-amber-400 text-[#722F45] font-extrabold text-xs shadow-lg hover:bg-amber-300 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <button
              onClick={onBackToHub}
              className="px-6 py-3 rounded-2xl bg-white/20 text-white font-extrabold text-xs shadow-lg hover:bg-white/30 transition-colors cursor-pointer"
            >
              Back to Games Hub
            </button>
          </div>
        </div>
      ) : (
        <div className={`p-6 sm:p-8 rounded-3xl bg-linear-to-br ${room.themeColor} text-white shadow-2xl border-4 border-[#D5A3AE]/50 space-y-6 relative overflow-hidden`}>
          
          {/* Room Environment & Male Explorer Avatar Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/20 pb-4">
            <div className="flex items-center gap-4">
              
              {/* Customized Anime Avatar Renderer */}
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border-2 border-amber-400/60 flex items-center justify-center relative shrink-0 shadow-lg overflow-hidden">
                <AnimeAvatarRenderer avatar={playerAvatar} pose="idle" size={56} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-black/30 px-3 py-1 rounded-full border border-amber-400/40">
                    {room.environmentName}
                  </span>
                  <span className="text-[10px] text-amber-200 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    Lead Explorer: {playerAvatar.name}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-serif-accent mt-1 text-white">
                  {room.roomTitle}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-amber-200 bg-black/40 px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-300" />
                <span>Subject: {room.subject}</span>
              </span>
            </div>
          </div>

          {/* Interactive Door Graphics & Lock Tumbler View */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            
            {/* Visual Door Graphic */}
            <div className="flex items-center gap-4">
              <div className={`w-16 h-20 rounded-xl border-4 transition-all duration-700 flex items-center justify-center shadow-inner relative ${
                isCurrentUnlocked 
                  ? 'bg-emerald-950 border-emerald-400 shadow-emerald-500/50' 
                  : 'bg-stone-900 border-amber-500/60'
              }`}>
                {isCurrentUnlocked ? (
                  <DoorOpen className="w-10 h-10 text-emerald-400 animate-pulse" />
                ) : (
                  <DoorClosed className="w-10 h-10 text-amber-400" />
                )}
                {/* Glowing Keyhole */}
                <div className="absolute bottom-4 right-3 w-3 h-3 rounded-full bg-amber-300 animate-ping"></div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  Heavy Vault Mechanism
                </span>
                <p className="text-xs font-bold text-white/90 leading-relaxed mt-1 max-w-md">
                  {room.doorLockCodeDescription}
                </p>
              </div>
            </div>

            {/* Lock Status Badge */}
            <div className={`px-4 py-2 rounded-xl text-xs font-extrabold border shrink-0 ${
              isCurrentUnlocked
                ? 'bg-emerald-900/80 border-emerald-400 text-emerald-200'
                : 'bg-amber-950/80 border-amber-400 text-amber-200'
            }`}>
              {isCurrentUnlocked ? 'UNLOCK CODE ACCEPTED' : 'DOOR LOCKED'}
            </div>
          </div>

          {/* Puzzle Challenge Question */}
          <div className="p-5 rounded-2xl bg-white/10 border border-white/20 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
              Door Unlock Puzzle:
            </span>
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {room.puzzleQuestion}
            </p>
          </div>

          {/* Multiple Choice Keypads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {room.options.map((opt, optIdx) => {
              let btnStyle = 'bg-white/10 hover:bg-white/20 border-white/30 text-white';
              if (showExplanation) {
                if (optIdx === room.correctOptionIndex) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                } else if (optIdx === selectedOption) {
                  btnStyle = 'bg-rose-600 text-white border-rose-400 font-bold';
                } else {
                  btnStyle = 'bg-black/40 border-white/10 text-white/40 opacity-50';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={showExplanation}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center gap-3 ${btnStyle}`}
                >
                  <span className="w-7 h-7 rounded-xl bg-black/30 border border-white/20 flex items-center justify-center font-bold shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Hint & Explanation Bar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setShowHint(!showHint);
                audioService.playClick();
              }}
              className="px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>{showHint ? 'Hide Lock Hint' : 'Request Hint'}</span>
            </button>

            {showExplanation && (
              <div className="flex items-center gap-2">
                {selectedOption === room.correctOptionIndex ? (
                  currentRoomIdx < ESCAPE_ROOMS.length - 1 ? (
                    <button
                      onClick={handleNextRoom}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Unlock Door &amp; Enter Room {room.roomId + 1}</span>
                      <DoorOpen className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-amber-300 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-300/40">
                      Final Vault Solved!
                    </span>
                  )
                ) : (
                  <button
                    onClick={() => {
                      setSelectedOption(null);
                      setShowExplanation(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500/30 hover:bg-rose-500/40 border border-rose-400 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Try Combination Again
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Hint Card */}
          {showHint && (
            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-100 leading-relaxed font-medium">
              <strong className="text-amber-300 block mb-1">Locksmith Hint:</strong>
              {room.hint}
            </div>
          )}

          {/* Explanation Card */}
          {showExplanation && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-medium ${
              selectedOption === room.correctOptionIndex
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100'
                : 'bg-rose-950/80 border-rose-400 text-rose-100'
            }`}>
              <strong className="block mb-1 font-extrabold">
                {selectedOption === room.correctOptionIndex ? ' Door Unlocked!' : ' Lock Jammed! Explanation:'}
              </strong>
              {room.explanation}
            </div>
          )}

        </div>
      )}

    </div>
  );
};

