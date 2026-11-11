import React, { useState, useEffect } from 'react';
import { 
  Compass, Home, BarChart2, User, Trophy, Settings, HelpCircle, 
  Volume2, VolumeX, Music, Sparkles, Play, Award, Check, Plus, 
  Coins, Gem, Shield, Lock, DoorOpen, FlaskConical, Search, Swords, ArrowRight
} from 'lucide-react';
import { audioService } from '../data/audioService';
import { gameProgressService, StudentGameProgress } from '../services/gameProgressService';
import { CharacterAvatar, DEFAULT_MALE_AVATAR, DEFAULT_FEMALE_AVATAR, HAIR_STYLES, HAIR_COLORS, OUTFITS, ACCESSORIES } from '../types/characterTypes';
import { AnimeAvatarRenderer } from './games/AnimeAvatarRenderer';
import { KnowledgeEscapeRoom } from './games/KnowledgeEscapeRoom';
import { MatchTheConcept } from './games/MatchTheConcept';
import { VirtualLabChallenge } from './games/VirtualLabChallenge';
import { MysterySolver } from './games/MysterySolver';
import { FormulaQuest } from './games/FormulaQuest';
import { ThreeDAnimeRPGGame } from './games/ThreeDAnimeRPGGame';

export type MainNavTab = 'home' | 'progress' | 'character' | 'achievements' | 'settings' | 'help';
export type ActiveGame = 'none' | 'escape' | 'match' | 'lab' | 'mystery' | 'quest' | 'rpg3d';

export const InteractiveGamesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainNavTab>('home');
  const [activeGame, setActiveGame] = useState<ActiveGame>('none');
  
  // Progress State
  const [progress, setProgress] = useState<StudentGameProgress>(() => gameProgressService.getProgress());
  
  // Avatar State
  const [playerAvatar, setPlayerAvatar] = useState<CharacterAvatar>(() => {
    try {
      const saved = localStorage.getItem('pathfinder_player_avatar');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_MALE_AVATAR;
  });

  // Audio Controls State
  const [isMuted, setIsMuted] = useState<boolean>(audioService.getIsMuted());
  const [isMusicOn, setIsMusicOn] = useState<boolean>(audioService.getIsMusicEnabled());
  const [isSfxOn, setIsSfxOn] = useState<boolean>(audioService.getIsSfxEnabled());
  const [volume, setVolume] = useState<number>(audioService.getVolume());

  // Character Customization Form State
  const [editingAvatar, setEditingAvatar] = useState<CharacterAvatar>({ ...playerAvatar });
  const [activeLookTab, setActiveLookTab] = useState<'hair' | 'outfit' | 'accessories'>('hair');

  useEffect(() => {
    setProgress(gameProgressService.getProgress());
  }, [activeTab, activeGame]);

  const handleSaveAvatar = () => {
    audioService.playLevelUpFanfare();
    setPlayerAvatar(editingAvatar);
    try {
      localStorage.setItem('pathfinder_player_avatar', JSON.stringify(editingAvatar));
    } catch (e) {}
    setActiveTab('home');
  };

  const handleLaunchGame = (game: ActiveGame) => {
    audioService.playClick();
    setActiveGame(game);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioService.setMuted(next);
  };

  const handleToggleMusic = () => {
    const next = !isMusicOn;
    setIsMusicOn(next);
    audioService.setMusicEnabled(next);
  };

  const handleToggleSfx = () => {
    const next = !isSfxOn;
    setIsSfxOn(next);
    audioService.setSfxEnabled(next);
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    audioService.setVolume(v);
  };

  // If a game is active, render full screen game experience
  if (activeGame !== 'none') {
    if (activeGame === 'rpg3d') {
      return <ThreeDAnimeRPGGame playerAvatar={playerAvatar} onBackToHub={() => setActiveGame('none')} />;
    }

    return (
      <div className="min-h-screen bg-[#090b16] text-white p-4 sm:p-6 space-y-4">
        {activeGame === 'escape' && <KnowledgeEscapeRoom playerAvatar={playerAvatar} onBackToHub={() => setActiveGame('none')} />}
        {activeGame === 'match' && <MatchTheConcept playerAvatar={playerAvatar} onBackToHub={() => setActiveGame('none')} />}
        {activeGame === 'lab' && <VirtualLabChallenge playerAvatar={playerAvatar} onBackToHub={() => setActiveGame('none')} />}
        {activeGame === 'mystery' && <MysterySolver playerAvatar={playerAvatar} onBackToHub={() => setActiveGame('none')} />}
        {activeGame === 'quest' && <FormulaQuest playerAvatar={playerAvatar} onBackToHub={() => setActiveGame('none')} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#070914] via-[#0d1024] to-[#120a21] text-white p-3 sm:p-6 space-y-6 font-sans antialiased selection:bg-cyan-500/30">
      
      {/* Top Navigation & Student Header Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#121633]/90 border-2 border-indigo-500/40 backdrop-blur-md shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Left: Pathfinder AI Brand Lockup */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Compass className="w-7 h-7 text-amber-300 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-wide font-serif-accent bg-gradient-to-r from-white via-indigo-100 to-amber-200 bg-clip-text text-transparent">
                PathFinder AI
              </h1>
            </div>
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest block">
              Explore &bull; Learn &bull; Grow
            </span>
          </div>
        </div>

        {/* Center: Player Status Capsule Bar */}
        <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-2xl border border-indigo-400/30 flex-wrap justify-center">
          
          {/* Avatar Badge */}
          <div className="flex items-center gap-2 pr-3 border-r border-white/15">
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-amber-400/60 overflow-hidden flex items-center justify-center shrink-0">
              <AnimeAvatarRenderer avatar={playerAvatar} pose="idle" size={36} />
            </div>
            <div>
              <span className="text-xs font-extrabold text-white block">{playerAvatar.name}</span>
              <span className="text-[10px] text-amber-300 font-extrabold block">Lv. {progress.level} &bull; {progress.xp}/{progress.maxXp} XP</span>
            </div>
          </div>

          {/* Coins Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black">
            <Coins className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{progress.coins}</span>
          </div>

          {/* Gems Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-xs font-black">
            <Gem className="w-4 h-4 fill-cyan-400 text-cyan-400" />
            <span>{progress.gems}</span>
            <button className="ml-1 w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-[10px] hover:bg-cyan-300 cursor-pointer">
              +
            </button>
          </div>
        </div>

        {/* Right: Audio Control Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isMuted ? 'bg-rose-950/80 border-rose-500 text-rose-300' : 'bg-indigo-950/80 border-indigo-400 text-cyan-300'
            }`}
            title="Toggle Mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handleToggleMusic}
            disabled={isMuted}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-40 ${
              isMusicOn && !isMuted ? 'bg-purple-600 text-white border-purple-400' : 'bg-black/40 border-white/20 text-white/60'
            }`}
          >
            <Music className="w-3.5 h-3.5 inline mr-1" />
            Music {isMusicOn ? 'ON' : 'OFF'}
          </button>
        </div>

      </div>

      {/* Main Layout: Left Sidebar + Central Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Menu (3 Cols on desktop) */}
        <div className="lg:col-span-3 p-3 sm:p-4 rounded-3xl bg-[#121633]/80 border-2 border-indigo-500/30 backdrop-blur-md space-y-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'progress', label: 'My Progress', icon: BarChart2 },
            { id: 'character', label: 'Character', icon: User },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'help', label: 'Help', icon: HelpCircle }
          ].map(item => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  audioService.playClick();
                  setActiveTab(item.id as MainNavTab);
                }}
                className={`w-full p-3.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? 'bg-linear-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-300'
                    : 'text-indigo-200/80 hover:text-white hover:bg-indigo-900/40'
                }`}
              >
                <IconComp className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-indigo-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Central Content Viewport (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: HOME (MAIN GAME HUB) */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              
              {/* Welcome Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-[#171c3b] via-[#241738] to-[#171c3b] border-2 border-amber-400/50 shadow-2xl relative overflow-hidden space-y-2">
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-black/40 px-3 py-1 rounded-full border border-amber-400/40">
                    Welcome to PathFinder AI!
                  </span>
                </div>
                <h2 className="relative z-10 text-2xl sm:text-3xl font-black font-serif-accent text-white">
                  Choose your adventure and begin the journey...
                </h2>
                <p className="relative z-10 text-xs text-indigo-200/90 max-w-xl leading-relaxed">
                  Dream Big... Learn More... Master Intermediate Maths 1A, 1B, Physics and Chemistry through cinematic 3D &amp; 2D educational games!
                </p>

                <div className="relative z-10 pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleLaunchGame('rpg3d')}
                    className="px-5 py-3 rounded-2xl bg-linear-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black text-xs shadow-xl shadow-cyan-500/25 border-2 border-amber-300 flex items-center gap-2.5 cursor-pointer hover:scale-105 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                    <span>Launch 3D Anime RPG (Crystal Forest) ►</span>
                  </button>
                </div>

                {/* Floating Mystical Glow Particles */}
                <div className="absolute top-2 right-12 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-2 right-40 w-32 h-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* 5 Large Game Cards Panels (Responsive Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Game Panel 1: Knowledge Escape Room */}
                <div className="p-5 rounded-3xl bg-linear-to-b from-stone-900 via-[#261b2e] to-stone-950 border-2 border-purple-500/60 shadow-xl space-y-4 flex flex-col justify-between group hover:-translate-y-1 transition-all">
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-2xl bg-stone-900 border border-purple-400/40 overflow-hidden flex items-center justify-center p-2 bg-gradient-to-t from-purple-950 to-stone-900">
                      <div className="text-center space-y-1">
                        <DoorOpen className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
                        <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block">Ancient Vault</span>
                      </div>
                      <span className="absolute top-2 right-2 text-[10px] font-extrabold bg-black/60 px-2.5 py-0.5 rounded-full border border-purple-400/40 text-purple-300">
                        Lv. {progress.gameLevels.escape}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-white font-serif-accent">
                        Knowledge Escape Room
                      </h3>
                      <p className="text-[11px] text-indigo-200/80 leading-snug mt-1">
                        Solve set algebra, vector force magnitudes, and quantum numbers to unlock stone vault doors!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchGame('escape')}
                    className="w-full py-3 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer border border-purple-300/40"
                  >
                    <Play className="w-4 h-4 fill-current text-amber-300" />
                    <span>Play ►</span>
                  </button>
                </div>

                {/* Game Panel 2: Match the Concept */}
                <div className="p-5 rounded-3xl bg-linear-to-b from-teal-950 via-[#152e2a] to-emerald-950 border-2 border-emerald-500/60 shadow-xl space-y-4 flex flex-col justify-between group hover:-translate-y-1 transition-all">
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-2xl bg-emerald-950 border border-emerald-400/40 overflow-hidden flex items-center justify-center p-2 bg-gradient-to-t from-teal-950 to-emerald-900">
                      <div className="text-center space-y-1">
                        <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                        <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest block">Neon Arena</span>
                      </div>
                      <span className="absolute top-2 right-2 text-[10px] font-extrabold bg-black/60 px-2.5 py-0.5 rounded-full border border-emerald-400/40 text-emerald-300">
                        Lv. {progress.gameLevels.match}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-white font-serif-accent">
                        Match the Concept
                      </h3>
                      <p className="text-[11px] text-indigo-200/80 leading-snug mt-1">
                        Connect glowing card pairs for Maths formulas, Physics applications, and Chemistry terms!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchGame('match')}
                    className="w-full py-3 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-300/40"
                  >
                    <Play className="w-4 h-4 fill-current text-amber-300" />
                    <span>Play ►</span>
                  </button>
                </div>

                {/* Game Panel 3: Virtual Lab Challenge */}
                <div className="p-5 rounded-3xl bg-linear-to-b from-slate-900 via-[#132738] to-slate-950 border-2 border-cyan-500/60 shadow-xl space-y-4 flex flex-col justify-between group hover:-translate-y-1 transition-all">
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-2xl bg-slate-950 border border-cyan-400/40 overflow-hidden flex items-center justify-center p-2 bg-gradient-to-t from-cyan-950 to-slate-900">
                      <div className="text-center space-y-1">
                        <FlaskConical className="w-10 h-10 text-cyan-400 mx-auto" />
                        <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest block">Digital Lab</span>
                      </div>
                      <span className="absolute top-2 right-2 text-[10px] font-extrabold bg-black/60 px-2.5 py-0.5 rounded-full border border-cyan-400/40 text-cyan-300">
                        Lv. {progress.gameLevels.lab}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-white font-serif-accent">
                        Virtual Lab Challenge
                      </h3>
                      <p className="text-[11px] text-indigo-200/80 leading-snug mt-1">
                        Run trajectory cannons, electric circuits, and chemical acid-base titration experiments!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchGame('lab')}
                    className="w-full py-3 rounded-2xl bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer border border-cyan-300/40"
                  >
                    <Play className="w-4 h-4 fill-current text-amber-300" />
                    <span>Play ►</span>
                  </button>
                </div>

                {/* Game Panel 4: Mystery Solver */}
                <div className="p-5 rounded-3xl bg-linear-to-b from-stone-900 via-[#332219] to-stone-950 border-2 border-amber-500/60 shadow-xl space-y-4 flex flex-col justify-between group hover:-translate-y-1 transition-all">
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-2xl bg-stone-900 border border-amber-400/40 overflow-hidden flex items-center justify-center p-2 bg-gradient-to-t from-amber-950 to-stone-900">
                      <div className="text-center space-y-1">
                        <Search className="w-10 h-10 text-amber-400 mx-auto" />
                        <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block">Detective Bureau</span>
                      </div>
                      <span className="absolute top-2 right-2 text-[10px] font-extrabold bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-400/40 text-amber-300">
                        Lv. {progress.gameLevels.mystery}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-white font-serif-accent">
                        Mystery Solver
                      </h3>
                      <p className="text-[11px] text-indigo-200/80 leading-snug mt-1">
                        Investigate crime scene dossiers, connect red string clues on corkboard, and identify suspects!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchGame('mystery')}
                    className="w-full py-3 rounded-2xl bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
                  >
                    <Play className="w-4 h-4 fill-current text-amber-300" />
                    <span>Play ►</span>
                  </button>
                </div>

                {/* Game Panel 5: Formula Quest */}
                <div className="p-5 rounded-3xl bg-linear-to-b from-indigo-950 via-[#2a1742] to-indigo-950 border-2 border-purple-400/60 shadow-xl space-y-4 flex flex-col justify-between group hover:-translate-y-1 transition-all md:col-span-2 lg:col-span-1">
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-2xl bg-indigo-950 border border-purple-400/40 overflow-hidden flex items-center justify-center p-2 bg-gradient-to-t from-purple-900 to-indigo-950">
                      <div className="text-center space-y-1">
                        <Swords className="w-10 h-10 text-purple-400 mx-auto" />
                        <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest block">Fantasy World RPG</span>
                      </div>
                      <span className="absolute top-2 right-2 text-[10px] font-extrabold bg-black/60 px-2.5 py-0.5 rounded-full border border-purple-400/40 text-purple-300">
                        Lv. {progress.gameLevels.quest}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-white font-serif-accent">
                        Formula Quest
                      </h3>
                      <span className="text-[10px] font-extrabold text-amber-300 block">Save the Maths World!</span>
                      <p className="text-[11px] text-indigo-200/80 leading-snug mt-1">
                        Journey across floating islands, cast formula spells, and defeat the Dark Cipher Lord!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleLaunchGame('rpg3d')}
                      className="w-full py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-cyan-300/50"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Play 3D Anime RPG ►</span>
                    </button>

                    <button
                      onClick={() => handleLaunchGame('quest')}
                      className="w-full py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900/90 text-purple-200 font-bold text-[11px] border border-purple-400/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-amber-300" />
                      <span>Classic 2D Quest Mode</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MY PROGRESS (DASHBOARD & BAR CHART) */}
          {activeTab === 'progress' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121633]/90 border-2 border-indigo-500/40 space-y-6 shadow-2xl">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300 block">
                    Student Performance Hub
                  </span>
                  <h2 className="text-2xl font-black font-serif-accent text-white">
                    My Progress Dashboard
                  </h2>
                </div>

                {/* Sub Tabs */}
                <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/20">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white">Overview</button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-200/70 hover:text-white">Games</button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-200/70 hover:text-white">Achievements</button>
                </div>
              </div>

              {/* Student Profile Card & Summary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Profile Card (4 Cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-indigo-950/80 border border-indigo-400/40 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-black border-2 border-amber-400 flex items-center justify-center shrink-0 overflow-hidden shadow-lg">
                    <AnimeAvatarRenderer avatar={playerAvatar} pose="idle" size={60} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">{playerAvatar.name}</h3>
                    <span className="text-xs font-extrabold text-amber-300 block">Level {progress.level}</span>
                    <div className="w-32 bg-black/50 h-2 rounded-full mt-1.5 overflow-hidden border border-white/20">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(progress.xp / progress.maxXp) * 100}%` }}></div>
                    </div>
                    <span className="text-[10px] text-indigo-200/80 block mt-0.5">{progress.xp} / {progress.maxXp} XP</span>
                  </div>
                </div>

                {/* Quantitative Counters Grid (8 Cols) */}
                <div className="md:col-span-8 grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-indigo-400/30 text-center space-y-1">
                    <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono block">{progress.gamesPlayed}</span>
                    <span className="text-[11px] font-extrabold text-indigo-200 uppercase tracking-wider block">Games Played</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-indigo-400/30 text-center space-y-1">
                    <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono block">{progress.missionsCompleted}</span>
                    <span className="text-[11px] font-extrabold text-indigo-200 uppercase tracking-wider block">Missions Done</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-indigo-400/30 text-center space-y-1">
                    <span className="text-2xl sm:text-3xl font-black text-purple-300 font-mono block">{progress.badgesEarnedCount}</span>
                    <span className="text-[11px] font-extrabold text-indigo-200 uppercase tracking-wider block">Badges</span>
                  </div>
                </div>

              </div>

              {/* Visual Learning Journey Bar Chart */}
              <div className="p-6 rounded-2xl bg-black/50 border border-indigo-400/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-cyan-300" />
                    Learning Journey Subject Mastery Chart:
                  </h3>
                  <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/40">
                    Keep Going! ✨
                  </span>
                </div>

                {/* Vertical Bar Chart Rendering */}
                <div className="h-44 pt-6 flex items-end justify-around border-b border-indigo-400/30 px-4">
                  {[
                    { label: 'Maths 1A', val: progress.subjectProgress.maths1A, color: 'bg-cyan-500' },
                    { label: 'Maths 1B', val: progress.subjectProgress.maths1B, color: 'bg-indigo-500' },
                    { label: 'Physics', val: progress.subjectProgress.physics, color: 'bg-amber-400' },
                    { label: 'Chemistry', val: progress.subjectProgress.chemistry, color: 'bg-purple-500' }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[11px] font-mono font-bold text-white opacity-90 group-hover:scale-110 transition-transform">
                        {bar.val}%
                      </span>
                      <div className="w-12 bg-black/60 rounded-t-xl overflow-hidden h-32 flex items-end">
                        <div className={`w-full ${bar.color} rounded-t-xl transition-all duration-1000`} style={{ height: `${bar.val}%` }}></div>
                      </div>
                      <span className="text-[11px] font-black text-indigo-200 uppercase tracking-wider">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CHARACTER SELECTION & CUSTOMIZATION */}
          {activeTab === 'character' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121633]/90 border-2 border-indigo-500/40 space-y-6 shadow-2xl">
              
              <div className="text-center space-y-2 border-b border-white/15 pb-4">
                <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-black/40 px-3.5 py-1 rounded-full border border-amber-400/40 inline-block">
                  Character Selection &bull; Choose Your Avatar
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-serif-accent text-white">
                  Be the hero of your journey!
                </h2>
              </div>

              {/* Character Cards Grid (Boy vs Girl) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Boy Avatar Card (Sasuke Inspired Cool Aesthetic) */}
                <div 
                  onClick={() => setEditingAvatar({ ...DEFAULT_MALE_AVATAR })}
                  className={`p-6 rounded-3xl border-4 transition-all cursor-pointer flex flex-col items-center space-y-4 ${
                    editingAvatar.gender === 'male'
                      ? 'bg-linear-to-b from-indigo-950 via-slate-900 to-indigo-950 border-cyan-400 shadow-2xl ring-4 ring-cyan-400/30 scale-102'
                      : 'bg-black/40 border-white/20 hover:border-white/40 opacity-70'
                  }`}
                >
                  <div className="w-36 h-40 rounded-2xl bg-gradient-to-t from-black via-slate-900 to-indigo-950 border border-cyan-400/40 flex items-center justify-center relative overflow-hidden">
                    <AnimeAvatarRenderer avatar={DEFAULT_MALE_AVATAR} pose="idle" size={120} />
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-base font-black text-white flex items-center justify-center gap-1">
                      Boy ♂ (Cool Shinobi Anime Vibe)
                    </span>
                    <p className="text-[11px] text-indigo-200/80 leading-snug">
                      Inspired by Sasuke's mysterious aesthetic. Spiky dark hair, confident gaze, high-collar vest.
                    </p>
                  </div>

                  <button className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider ${
                    editingAvatar.gender === 'male' ? 'bg-cyan-400 text-black shadow-md' : 'bg-white/10 text-white'
                  }`}>
                    {editingAvatar.gender === 'male' ? 'Selected Male Hero ✓' : 'Select Boy ♂'}
                  </button>
                </div>

                {/* Girl Avatar Card (Hinata Inspired Gentle Aesthetic) */}
                <div 
                  onClick={() => setEditingAvatar({ ...DEFAULT_FEMALE_AVATAR })}
                  className={`p-6 rounded-3xl border-4 transition-all cursor-pointer flex flex-col items-center space-y-4 ${
                    editingAvatar.gender === 'female'
                      ? 'bg-linear-to-b from-purple-950 via-slate-900 to-purple-950 border-purple-400 shadow-2xl ring-4 ring-purple-400/30 scale-102'
                      : 'bg-black/40 border-white/20 hover:border-white/40 opacity-70'
                  }`}
                >
                  <div className="w-36 h-40 rounded-2xl bg-gradient-to-t from-black via-slate-900 to-purple-950 border border-purple-400/40 flex items-center justify-center relative overflow-hidden">
                    <AnimeAvatarRenderer avatar={DEFAULT_FEMALE_AVATAR} pose="idle" size={120} />
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-base font-black text-white flex items-center justify-center gap-1">
                      Girl ♀ (Gentle Scholar Anime Vibe)
                    </span>
                    <p className="text-[11px] text-indigo-200/80 leading-snug">
                      Inspired by Hinata's sweet aesthetic. Long hime-cut hair, gentle purple eyes, elegant dress.
                    </p>
                  </div>

                  <button className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider ${
                    editingAvatar.gender === 'female' ? 'bg-purple-500 text-white shadow-md' : 'bg-white/10 text-white'
                  }`}>
                    {editingAvatar.gender === 'female' ? 'Selected Female Hero ✓' : 'Select Girl ♀'}
                  </button>
                </div>

              </div>

              {/* Customize Your Look Section */}
              <div className="p-6 rounded-3xl bg-black/50 border border-indigo-400/40 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Customize Your Look:
                  </h3>
                  
                  {/* Look Sub Tabs */}
                  <div className="flex items-center gap-2">
                    {(['hair', 'outfit', 'accessories'] as const).map(tabKey => (
                      <button
                        key={tabKey}
                        onClick={() => setActiveLookTab(tabKey)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
                          activeLookTab === tabKey ? 'bg-amber-400 text-black shadow-sm' : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {tabKey}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub Tab Options Display */}
                {activeLookTab === 'hair' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(editingAvatar.gender === 'male' ? HAIR_STYLES.male : HAIR_STYLES.female).map(h => (
                        <button
                          key={h.id}
                          onClick={() => setEditingAvatar({ ...editingAvatar, hairStyle: h.id })}
                          className={`p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer ${
                            editingAvatar.hairStyle === h.id ? 'bg-amber-400 text-black border-amber-300' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                          }`}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-extrabold text-indigo-200 block uppercase">Select Hair Swatch Color:</span>
                      <div className="flex items-center gap-2">
                        {HAIR_COLORS.map(c => (
                          <button
                            key={c.id}
                            onClick={() => setEditingAvatar({ ...editingAvatar, hairColor: c.hex })}
                            className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                              editingAvatar.hairColor === c.hex ? 'scale-125 border-amber-400 ring-2 ring-white' : 'border-white/30'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.label}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeLookTab === 'outfit' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(editingAvatar.gender === 'male' ? OUTFITS.male : OUTFITS.female).map(o => (
                      <button
                        key={o.id}
                        onClick={() => setEditingAvatar({ ...editingAvatar, outfit: o.id })}
                        className={`p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer ${
                          editingAvatar.outfit === o.id ? 'bg-amber-400 text-black border-amber-300' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}

                {activeLookTab === 'accessories' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(editingAvatar.gender === 'male' ? ACCESSORIES.male : ACCESSORIES.female).map(a => (
                      <button
                        key={a.id}
                        onClick={() => setEditingAvatar({ ...editingAvatar, accessory: a.id })}
                        className={`p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer ${
                          editingAvatar.accessory === a.id ? 'bg-amber-400 text-black border-amber-300' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleSaveAvatar}
                  className="w-full py-3 rounded-2xl bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 text-black font-black text-xs uppercase tracking-widest shadow-xl hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-200"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Confirm Character ✓</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 4: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121633]/90 border-2 border-indigo-500/40 space-y-6 shadow-2xl">
              <div className="border-b border-white/15 pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 block">Student Accomplishments</span>
                <h2 className="text-2xl font-black font-serif-accent text-white">Achievements &amp; Honor Badges</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Master of Set Algebra', desc: 'Solved n(A ∪ B) inclusion-exclusion puzzles in Escape Room 1.', icon: '🏆', category: 'Maths 1A' },
                  { name: 'Vector Force Engineer', desc: 'Calculated orthogonal vector magnitudes in Escape Room 2.', icon: '⚡', category: 'Physics' },
                  { name: 'Quantum Atomic Specialist', desc: 'Identified Principal & Azimuthal quantum numbers in Escape Room 3.', icon: '⚛️', category: 'Chemistry' },
                  { name: 'Coordinate Geometry Pioneer', desc: 'Derived perpendicular line locus slopes in Escape Room 4.', icon: '📐', category: 'Maths 1B' },
                  { name: 'Grand Pathfinder Escape Master', desc: 'Escaped all 5 subject chambers to unlock Grand Observatory!', icon: '🌟', category: 'All Subjects' }
                ].map((b, idx) => {
                  const isUnlocked = progress.earnedBadges.includes(b.name);
                  return (
                    <div key={idx} className={`p-4 rounded-2xl border flex items-start gap-3 ${
                      isUnlocked ? 'bg-amber-950/60 border-amber-400 text-amber-100' : 'bg-black/40 border-white/10 opacity-50'
                    }`}>
                      <div className="text-2xl p-2 rounded-xl bg-black/40 border border-white/10 shrink-0">{b.icon}</div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-amber-300 block">{b.category}</span>
                        <h4 className="font-extrabold text-sm text-white">{b.name}</h4>
                        <p className="text-[11px] text-indigo-200/80 leading-snug mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121633]/90 border-2 border-indigo-500/40 space-y-6 shadow-2xl">
              <div className="border-b border-white/15 pb-4">
                <h2 className="text-2xl font-black font-serif-accent text-white">Audio &amp; Preferences Settings</h2>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/15 space-y-2">
                  <span className="text-xs font-extrabold uppercase text-amber-300 block">Master Sound Volume</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/15">
                  <span className="text-xs font-extrabold text-white">Background Music Themes</span>
                  <button
                    onClick={handleToggleMusic}
                    className={`px-4 py-2 rounded-xl text-xs font-black ${isMusicOn ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/60'}`}
                  >
                    {isMusicOn ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: HELP */}
          {activeTab === 'help' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121633]/90 border-2 border-indigo-500/40 space-y-4 shadow-2xl">
              <h2 className="text-2xl font-black font-serif-accent text-white">PathFinder AI Games Manual &amp; Controls</h2>
              <p className="text-xs text-indigo-200/90 leading-relaxed">
                Use your keyboard or touch controls to navigate floating island platforms in Formula Quest, adjust sliders in Virtual Lab, inspect forensic string lines in Mystery Solver, and match cards in Match the Concept!
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
