import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, RefreshCw, Trophy, Sparkles, CheckCircle2, 
  HelpCircle, ShieldCheck, MapPin, Swords, Shield, Heart, Zap, Award,
  Compass, ChevronRight, Lock, Unlock, Play
} from 'lucide-react';
import { audioService } from '../../data/audioService';

export interface QuestRealm {
  realmId: number;
  realmName: string;
  subjectPaper: 'Mathematics IA' | 'Mathematics IB' | 'Boss Realm';
  locationName: string;
  landscapeDescription: string;
  storyIntro: string;
  conceptBriefing: string;
  missionFormulaChallenge: string;
  options: string[];
  correctOptionIndex: number;
  hint: string;
  bossExplanation: string;
  unlockedRegionBadge: string;
}

export const QUEST_REALMS: QuestRealm[] = [
  {
    realmId: 1,
    realmName: 'Realm 1: The Crystal Forest of Sets',
    subjectPaper: 'Mathematics IA',
    locationName: 'The Overgrown Venn Citadel',
    landscapeDescription: 'Lush 3D-stylized magical forest with glowing crystal briars, stone arches, and floating ancient runes.',
    storyIntro: 'Sir Arthur the Math Pathfinder arrives at the Crystal Forest. Dark briars have choked the bridge! Channel the Cardinal Principle formula of Set Union to dissolve the briars.',
    conceptBriefing: 'Cardinal Principle formula: n(A ∪ B) = n(A) + n(B) - n(A ∩ B). Subtract the overlapping intersection so elements are not double counted.',
    missionFormulaChallenge: 'The Crystal Gate requires n(A ∪ B) energy. If n(A) = 18 crystals, n(B) = 22 crystals, and n(A ∩ B) = 6 shared crystals, calculate the total energy n(A ∪ B) to repair the bridge.',
    options: ['34 Mana Units', '40 Mana Units', '28 Mana Units', '46 Mana Units'],
    correctOptionIndex: 0,
    hint: 'Apply n(A ∪ B) = n(A) + n(B) - n(A ∩ B) ⟹ 18 + 22 - 6.',
    bossExplanation: '18 + 22 - 6 = 34 Mana Units! The crystal briars dissolve into glowing dust and the forest bridge lowers!',
    unlockedRegionBadge: 'Guardian of Crystal Sets'
  },
  {
    realmId: 2,
    realmName: 'Realm 2: The Obsidian Peaks of Matrices',
    subjectPaper: 'Mathematics IA',
    locationName: 'The Determinant Chasm',
    landscapeDescription: 'Towering volcanic obsidian mountains with rivers of glowing mana and a fractured stone bridge.',
    storyIntro: 'Sir Arthur reaches the Obsidian Chasm. The bridge is broken! Calculate the matrix determinant key to lock the floating stone pillars back together.',
    conceptBriefing: 'For a 2×2 matrix [[a, b], [c, d]], the determinant key is det(A) = ad - bc.',
    missionFormulaChallenge: 'Calculate det(A) for matrix rune A = [[6, 2], [5, 3]] to lock the obsidian bridge segments together.',
    options: ['det(A) = 8', 'det(A) = 18', 'det(A) = 28', 'det(A) = 10'],
    correctOptionIndex: 0,
    hint: 'det(A) = ad - bc = (6 × 3) - (2 × 5).',
    bossExplanation: 'det(A) = 18 - 10 = 8. The obsidian bridge pillars lock into place and Sir Arthur crosses safely!',
    unlockedRegionBadge: 'Matrix Citadel Champion'
  },
  {
    realmId: 3,
    realmName: 'Realm 3: The Floating Citadel of Trigonometry',
    subjectPaper: 'Mathematics IA',
    locationName: 'The ASTC Celestial Observatory',
    landscapeDescription: 'Floating ivory islands suspended in a twilight sky with glowing celestial mirrors and starlight beams.',
    storyIntro: 'The Sky Portal requires aligning celestial mirrors using trigonometric quadrant ASTC rules.',
    conceptBriefing: 'ASTC rule: Quadrant 2 (90°–180°) has SINE positive. sin(180° - θ) = sin θ.',
    missionFormulaChallenge: 'To align the celestial beam, evaluate the exact value of sin(150°) using compound angle reduction sin(180° - 30°).',
    options: ['1/2', '√3/2', '-1/2', '1/√2'],
    correctOptionIndex: 0,
    hint: 'sin(150°) = sin(180° - 30°) = sin(30°) = 1/2.',
    bossExplanation: 'sin(150°) = sin(30°) = 1/2. The celestial sky beam aligns and opens the sky portal!',
    unlockedRegionBadge: 'Celestial Trig Sorcerer'
  },
  {
    realmId: 4,
    realmName: 'Realm 4: The Geometry Canyon of Locus',
    subjectPaper: 'Mathematics IB',
    locationName: 'The Perpendicular Slope Barrier',
    landscapeDescription: 'Deep red canyon carved by ancient rivers with floating stone monoliths and perpendicular energy grids.',
    storyIntro: 'An avalanche is tumbling down Locus Canyon! Calculate the perpendicular slope to construct a protective shield barrier.',
    conceptBriefing: 'If a line has slope m₁, any line perpendicular to it has slope m₂ = -1 / m₁ such that m₁ · m₂ = -1.',
    missionFormulaChallenge: 'The avalanche wall has slope m₁ = 3. Calculate the required shield wall slope m₂ perpendicular to the avalanche.',
    options: ['m₂ = -1/3', 'm₂ = -3', 'm₂ = 1/3', 'm₂ = 3'],
    correctOptionIndex: 0,
    hint: 'm₁ · m₂ = -1 ⟹ 3 · m₂ = -1 ⟹ m₂ = -1/3.',
    bossExplanation: 'm₂ = -1/3. The protective shield wall anchors perpendicularly and withstands the avalanche!',
    unlockedRegionBadge: 'Locus Geometry Sentinel'
  },
  {
    realmId: 5,
    realmName: 'Realm 5: The Dragon\'s Peak Final Challenge',
    subjectPaper: 'Boss Realm',
    locationName: 'The Throne of the Dark Cipher Lord',
    landscapeDescription: 'Dramatic storm-swept mountain summit with lightning bolts, ancient dragon statues, and a glowing energy shield.',
    storyIntro: 'The Dark Cipher Lord challenges Sir Arthur to a final formula duel! Solve the vector unit magnitude formula to save the Maths World!',
    conceptBriefing: 'Unit vector r̂ = r̄ / |r̄|, where magnitude |r̄| = √(x² + y² + z²).',
    missionFormulaChallenge: 'Calculate the magnitude |r̄| of vector r̄ = 3î + 4ĵ + 12k̂ to shatter the Cipher Lord\'s shield!',
    options: ['|r̄| = 13', '|r̄| = 19', '|r̄| = 16', '|r̄| = 25'],
    correctOptionIndex: 0,
    hint: '|r̄| = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169.',
    bossExplanation: '|r̄| = √169 = 13. The Cipher Lord\'s shield shatters into sparkling stardust! YOU SAVED THE MATHS WORLD!',
    unlockedRegionBadge: 'Savior of the Maths World'
  }
];

import { CharacterAvatar, DEFAULT_MALE_AVATAR } from '../../types/characterTypes';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';

interface FormulaQuestProps {
  playerAvatar?: CharacterAvatar;
  onBackToHub: () => void;
}

export const FormulaQuest: React.FC<FormulaQuestProps> = ({ playerAvatar = DEFAULT_MALE_AVATAR, onBackToHub }) => {
  const [currentRealmIdx, setCurrentRealmIdx] = useState<number>(0);
  const realm = QUEST_REALMS[currentRealmIdx];

  // Animated Hero Explorer State (Sir Arthur)
  const [heroPosPercent, setHeroPosPercent] = useState<number>(15); // Hero X position %
  const [heroAction, setHeroAction] = useState<'idle' | 'walking' | 'casting' | 'victory'>('idle');

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [playerXp, setPlayerXp] = useState<number>(0);
  const [unlockedRealms, setUnlockedRealms] = useState<number[]>([1]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [isBridgeRepaired, setIsBridgeRepaired] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  useEffect(() => {
    audioService.startMusic('quest');
    return () => audioService.stopMusic();
  }, []);

  // Reset terrain position when changing realm
  useEffect(() => {
    setHeroPosPercent(15);
    setHeroAction('idle');
    setSelectedOption(null);
    setShowExplanation(false);
    setShowHint(false);
    setIsBridgeRepaired(false);
  }, [currentRealmIdx]);

  // Motion Controls for Hero
  const handleWalkLeft = () => {
    setHeroAction('walking');
    setHeroPosPercent(prev => Math.max(10, prev - 12));
    audioService.playClick();
    setTimeout(() => setHeroAction('idle'), 300);
  };

  const handleWalkRight = () => {
    setHeroAction('walking');
    setHeroPosPercent(prev => Math.min(85, prev + 12));
    audioService.playClick();
    setTimeout(() => setHeroAction('idle'), 300);
  };

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    setHeroAction('casting');

    if (idx === realm.correctOptionIndex) {
      audioService.playSuccessChime();
      setIsBridgeRepaired(true);
      setHeroPosPercent(75); // Walk across bridge
      setPlayerXp(prev => prev + 250);

      if (!unlockedRealms.includes(realm.realmId + 1) && realm.realmId < QUEST_REALMS.length) {
        setUnlockedRealms(prev => [...prev, realm.realmId + 1]);
      }
      if (!earnedBadges.includes(realm.unlockedRegionBadge)) {
        setEarnedBadges(prev => [...prev, realm.unlockedRegionBadge]);
      }
      if (realm.realmId === QUEST_REALMS.length) {
        setIsGameWon(true);
        audioService.playLevelUpFanfare();
      }
    } else {
      audioService.playErrorBuzz();
      setPlayerHp(prev => Math.max(20, prev - 20));
      setTimeout(() => setHeroAction('idle'), 500);
    }
  };

  const handleNextRealm = () => {
    if (currentRealmIdx < QUEST_REALMS.length - 1) {
      setCurrentRealmIdx(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentRealmIdx(0);
    setHeroPosPercent(15);
    setHeroAction('idle');
    setSelectedOption(null);
    setShowExplanation(false);
    setShowHint(false);
    setPlayerHp(100);
    setPlayerXp(0);
    setUnlockedRealms([1]);
    setEarnedBadges([]);
    setIsBridgeRepaired(false);
    setIsGameWon(false);
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
              Game 5 &bull; Stylized 3D Fantasy World
            </span>
            <h2 className="text-lg font-extrabold text-[#722F45]">
              Formula Quest – Save the Maths World
            </h2>
          </div>
        </div>

        {/* Player HUD */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-rose-100 px-3 py-1.5 rounded-2xl border border-rose-300 text-rose-900 text-xs font-bold">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>HP: {playerHp}%</span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1.5 rounded-2xl border border-amber-300 text-amber-900 text-xs font-bold">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>XP: {playerXp}</span>
          </div>
        </div>
      </div>

      {/* World Map Realm Selector */}
      <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/60 space-y-2 shadow-2xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
          Fantasy World Map Realms:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {QUEST_REALMS.map((r, idx) => {
            const isUnlocked = unlockedRealms.includes(r.realmId);
            const isCurrent = currentRealmIdx === idx;
            return (
              <button
                key={r.realmId}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    setCurrentRealmIdx(idx);
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#722F45] text-white shadow-xs'
                    : isUnlocked
                    ? 'bg-amber-100 border border-amber-300 text-amber-950 hover:bg-amber-200'
                    : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Realm {r.realmId}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Stylized 3D Fantasy Viewport Canvas */}
      {isGameWon ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-amber-600 via-purple-900 to-[#722F45] text-white text-center space-y-6 shadow-2xl border-4 border-amber-300">
          <Trophy className="w-16 h-16 text-amber-300 mx-auto animate-bounce" />
          <h2 className="text-3xl font-extrabold font-serif-accent text-amber-300">
            YOU SAVED THE MATHS WORLD!
          </h2>
          <p className="text-sm text-white/90 max-w-lg mx-auto leading-relaxed">
            Sir Arthur the Math Pathfinder has conquered all 5 realms! By applying formulas in Mathematics 1A and 1B, you shattered the Dark Cipher Lord\'s shield and saved the realm!
          </p>

          <div className="p-4 rounded-2xl bg-black/30 border border-amber-300/40 max-w-md mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Unlocked Region Badges ({earnedBadges.length}):
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
              <span>Restart Quest</span>
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
        <div className="space-y-6">

          {/* Stylized 3D Animated World Canvas Viewport */}
          <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl bg-linear-to-b from-sky-900 via-indigo-950 to-slate-950 border-4 border-amber-400/70 shadow-2xl overflow-hidden flex flex-col justify-between p-6">
            
            {/* Background Parallax Clouds & Stars */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-4 left-10 w-24 h-8 bg-white/30 rounded-full blur-md animate-pulse" />
              <div className="absolute top-12 right-20 w-32 h-10 bg-white/20 rounded-full blur-lg animate-pulse" />
              <div className="absolute top-2 left-1/2 w-2 h-2 bg-amber-200 rounded-full animate-ping" />
            </div>

            {/* Realm Title Header Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-black/40 px-3 py-1 rounded-full border border-amber-400/40">
                  {realm.locationName} &bull; {realm.subjectPaper}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white font-serif-accent mt-1">
                  {realm.realmName}
                </h3>
              </div>

              {/* Movement Controls Bar */}
              <div className="flex items-center gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/20">
                <button
                  onClick={handleWalkLeft}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  &larr; Walk Left
                </button>
                <button
                  onClick={handleWalkRight}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Walk Right &rarr;
                </button>
              </div>
            </div>

            {/* Animated Stylized Terrain Platform & Magical Bridge */}
            <div className="relative z-10 w-full h-32 flex items-end">
              
              {/* Left Cliff Platform */}
              <div className="w-[35%] h-20 bg-linear-to-r from-amber-900 to-amber-800 rounded-tr-3xl border-t-4 border-emerald-500 shadow-2xl relative">
                <div className="absolute -top-3 left-4 text-[10px] font-bold text-emerald-300">Lush Turf</div>
              </div>

              {/* Central Magical Bridge Segment */}
              <div className={`flex-1 h-12 transition-all duration-700 flex items-center justify-center relative ${
                isBridgeRepaired
                  ? 'bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 border-y-4 border-amber-200 shadow-xl opacity-100'
                  : 'bg-black/60 border-y-2 border-dashed border-rose-500/80 opacity-60'
              }`}>
                <span className={`text-[10px] font-extrabold tracking-wider ${isBridgeRepaired ? 'text-amber-950' : 'text-rose-300'}`}>
                  {isBridgeRepaired ? '✨ MAGICAL FORMULA BRIDGE REPAIRED ✨' : '⚡ FRACTURED CHASM - CAST FORMULA SPELL TO REPAIR ⚡'}
                </span>
              </div>

              {/* Right Citadel Platform */}
              <div className="w-[30%] h-24 bg-linear-to-r from-purple-900 to-indigo-950 rounded-tl-3xl border-t-4 border-amber-400 shadow-2xl relative flex items-center justify-center">
                <div className="text-center text-amber-300 font-extrabold text-xs">
                  <Swords className="w-5 h-5 mx-auto text-amber-300 mb-0.5" />
                  <span>Citadel Gate</span>
                </div>
              </div>

              {/* Customized Anime Hero Character Avatar */}
              <div
                style={{ left: `${heroPosPercent}%` }}
                className="absolute bottom-16 -translate-x-1/2 transition-all duration-300 z-20 flex flex-col items-center"
              >
                {/* Hero Speech Snippet */}
                <div className="bg-amber-300 text-amber-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-md mb-1 whitespace-nowrap animate-bounce">
                  {heroAction === 'casting' ? '⚡ Casting Formula Spell!' : playerAvatar.name}
                </div>

                {/* Customized Anime Avatar Renderer */}
                <AnimeAvatarRenderer 
                  avatar={playerAvatar} 
                  pose={heroAction === 'walking' ? 'walk' : heroAction === 'casting' ? 'jump' : 'idle'} 
                  size={65} 
                />
              </div>

            </div>

            {/* Landscape Description Footer */}
            <div className="relative z-10 text-[11px] text-white/80 italic bg-black/40 p-2.5 rounded-xl border border-white/10">
              Environment: {realm.landscapeDescription}
            </div>

          </div>

          {/* Mission Story & Briefing Card */}
          <div className="p-6 rounded-3xl bg-linear-to-br from-indigo-950 via-purple-950 to-slate-950 text-white shadow-xl border-2 border-amber-400/50 space-y-4">
            
            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-xs text-white/90 leading-relaxed font-medium">
              <strong className="text-amber-300 block mb-1 font-extrabold">Story Mission:</strong>
              {realm.storyIntro}
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-100 leading-relaxed font-medium">
              <strong className="text-amber-300 block mb-1 font-extrabold">Formula Briefing:</strong>
              {realm.conceptBriefing}
            </div>

            {/* Mission Challenge Question */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/20 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
                Formula Spell Challenge:
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {realm.missionFormulaChallenge}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {realm.options.map((opt, optIdx) => {
                let btnStyle = 'bg-white/10 hover:bg-white/20 border-white/30 text-white';
                if (showExplanation) {
                  if (optIdx === realm.correctOptionIndex) {
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

            {/* Actions & Explanations */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setShowHint(!showHint);
                  audioService.playClick();
                }}
                className="px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-amber-300" />
                <span>{showHint ? 'Hide Hint' : 'Formula Hint'}</span>
              </button>

              {showExplanation && (
                <div className="flex items-center gap-2">
                  {selectedOption === realm.correctOptionIndex ? (
                    currentRealmIdx < QUEST_REALMS.length - 1 ? (
                      <button
                        onClick={handleNextRealm}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Cross Bridge to Realm {realm.realmId + 1}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-amber-300 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-300/40">
                        Quest Victory!
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
                      Try Formula Spell Again
                    </button>
                  )}
                </div>
              )}
            </div>

            {showHint && (
              <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-100 leading-relaxed font-medium">
                <strong className="text-amber-300 block mb-1">Sorcerer\'s Formula Hint:</strong>
                {realm.hint}
              </div>
            )}

            {showExplanation && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-medium ${
                selectedOption === realm.correctOptionIndex
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100'
                  : 'bg-rose-950/90 border-rose-400 text-rose-100'
              }`}>
                <strong className="block mb-1 font-extrabold">
                  {selectedOption === realm.correctOptionIndex ? ' Formula Spell Cast Successfully!' : ' Spell Miscast:'}
                </strong>
                {realm.bossExplanation}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
