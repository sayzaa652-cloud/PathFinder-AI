import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  ArrowLeft, Volume2, VolumeX, Sparkles, Trophy, Coins, Gem, 
  RotateCcw, Eye, Shield, Play, HelpCircle, Compass, Zap
} from 'lucide-react';
import { CrystalForestScene } from '../three/CrystalForestScene';
import { AnimeCharacter3D } from '../three/AnimeCharacter3D';
import { HolographicMathPuzzleModal, MathPuzzleData, CHASM_MATH_PUZZLES } from './HolographicMathPuzzleModal';
import { CharacterAvatar } from '../../types/characterTypes';
import { gameProgressService, StudentGameProgress } from '../../services/gameProgressService';
import { audioService } from '../../data/audioService';

interface ThreeDAnimeRPGGameProps {
  playerAvatar: CharacterAvatar;
  onBackToHub: () => void;
}

export const ThreeDAnimeRPGGame: React.FC<ThreeDAnimeRPGGameProps> = ({
  playerAvatar,
  onBackToHub
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CrystalForestScene | null>(null);
  const characterRef = useRef<AnimeCharacter3D | null>(null);

  // Player position in 3D world
  const playerPosRef = useRef({ x: 0, z: 5, rotY: Math.PI });
  const isMovingRef = useRef<boolean>(false);

  // Game UI State
  const [progress, setProgress] = useState<StudentGameProgress>(() => gameProgressService.getProgress());
  const [isMuted, setIsMuted] = useState<boolean>(audioService.getIsMuted());
  const [showPuzzleModal, setShowPuzzleModal] = useState<boolean>(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<MathPuzzleData>(CHASM_MATH_PUZZLES[0]);
  const [bridgeBuilt, setBridgeBuilt] = useState<boolean>(false);
  const [showVictoryBanner, setShowVictoryBanner] = useState<boolean>(false);
  const [nearChasm, setNearChasm] = useState<boolean>(false);

  // Input State (Keyboard & Touch)
  const inputStateRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  });

  // Touch virtual joystick state
  const joystickRef = useRef<{ active: boolean; startX: number; startY: number }>({
    active: false,
    startX: 0,
    startY: 0
  });

  // Initialize Three.js Scene & Character Loop
  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Create Scene
    const scene = new CrystalForestScene(mountRef.current);
    sceneRef.current = scene;

    // 2. Create 3D Anime Character Mesh
    const character = new AnimeCharacter3D(playerAvatar);
    characterRef.current = character;
    character.group.position.set(playerPosRef.current.x, 0, playerPosRef.current.z);
    character.group.rotation.y = playerPosRef.current.rotY;
    scene.scene.add(character.group);

    // 3. Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Movement Calculations
      const speed = 6.0 * delta;
      const rotSpeed = 3.0 * delta;
      let moving = false;

      const input = inputStateRef.current;

      if (input.forward) {
        playerPosRef.current.z -= speed;
        playerPosRef.current.rotY = Math.PI; // Face forward (-Z)
        moving = true;
      } else if (input.backward) {
        playerPosRef.current.z += speed;
        playerPosRef.current.rotY = 0; // Face backward (+Z)
        moving = true;
      }

      if (input.left) {
        playerPosRef.current.x -= speed;
        playerPosRef.current.rotY = -Math.PI / 2; // Face left (-X)
        moving = true;
      } else if (input.right) {
        playerPosRef.current.x += speed;
        playerPosRef.current.rotY = Math.PI / 2; // Face right (+X)
        moving = true;
      }

      // Constrain movement inside boundary bounds
      playerPosRef.current.x = Math.max(-14, Math.min(14, playerPosRef.current.x));
      
      // Chasm Boundary Check (Z = -18 is entrance to chasm)
      if (!scene.isBridgeFormed && playerPosRef.current.z < -18) {
        playerPosRef.current.z = -18; // Block crossing before bridge built
        setNearChasm(true);
      } else {
        // Far shore constraint
        playerPosRef.current.z = Math.max(-46, Math.min(12, playerPosRef.current.z));
      }

      isMovingRef.current = moving;

      // Update 3D Character Position & Anim
      character.group.position.x = playerPosRef.current.x;
      character.group.position.z = playerPosRef.current.z;
      character.group.rotation.y = playerPosRef.current.rotY;
      character.update(delta, moving, 1.2);

      // Update Scene & 3rd Person Camera
      scene.update(delta, playerPosRef.current.x, playerPosRef.current.z);
    };

    animate();

    // Resize Handler
    const handleResize = () => scene.handleResize();
    window.addEventListener('resize', handleResize);

    // Keyboard Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          inputStateRef.current.forward = true;
          break;
        case 's':
        case 'arrowdown':
          inputStateRef.current.backward = true;
          break;
        case 'a':
        case 'arrowleft':
          inputStateRef.current.left = true;
          break;
        case 'd':
        case 'arrowright':
          inputStateRef.current.right = true;
          break;
        case ' ':
          inputStateRef.current.jump = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          inputStateRef.current.forward = false;
          break;
        case 's':
        case 'arrowdown':
          inputStateRef.current.backward = false;
          break;
        case 'a':
        case 'arrowleft':
          inputStateRef.current.left = false;
          break;
        case 'd':
        case 'arrowright':
          inputStateRef.current.right = false;
          break;
        case ' ':
          inputStateRef.current.jump = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      scene.dispose();
      sceneRef.current = null;
    };
  }, [playerAvatar]);

  const triggerPuzzleModal = () => {
    const selected = CHASM_MATH_PUZZLES[Math.floor(Math.random() * CHASM_MATH_PUZZLES.length)];
    setCurrentPuzzle(selected);
    setShowPuzzleModal(true);
    audioService.playClick();
  };

  const handleSolveCorrect = () => {
    setShowPuzzleModal(false);
    setBridgeBuilt(true);
    
    // Trigger 3D scene bridge formation animation
    if (sceneRef.current) {
      sceneRef.current.triggerBridgeFormation();
    }

    // Award XP, Gold, and Badge
    const updated = gameProgressService.addXpAndCoins(100, 50, 'quest');
    gameProgressService.awardBadge('Master of Set Algebra');
    setProgress(updated);

    audioService.playLevelUpFanfare();
    setShowVictoryBanner(true);
    setTimeout(() => setShowVictoryBanner(false), 6000);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioService.setMuted(next);
  };

  // On-Screen Virtual Joystick Handlers for mobile & desktop touch
  const handleJoystickStart = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    joystickRef.current = {
      active: true,
      startX: centerX,
      startY: centerY,
    };
    updateTouchInput(e.clientX - centerX, e.clientY - centerY);
  };

  const handleJoystickMove = (e: React.PointerEvent) => {
    if (!joystickRef.current.active) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    updateTouchInput(dx, dy);
  };

  const handleJoystickEnd = () => {
    joystickRef.current.active = false;
    inputStateRef.current = { forward: false, backward: false, left: false, right: false, jump: false };
  };

  const updateTouchInput = (dx: number, dy: number) => {
    const threshold = 15;
    inputStateRef.current.forward = dy < -threshold;
    inputStateRef.current.backward = dy > threshold;
    inputStateRef.current.left = dx < -threshold;
    inputStateRef.current.right = dx > threshold;
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans select-none text-white">
      
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP RPG HUD BAR */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Pathfinder Brand & Back Button */}
        <div className="flex items-center gap-3 pointer-events-auto bg-[#0d1024]/85 backdrop-blur-md p-2.5 px-4 rounded-2xl border border-cyan-500/40 shadow-xl">
          <button
            onClick={onBackToHub}
            className="p-2 rounded-xl bg-indigo-950/90 border border-cyan-400/50 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer text-cyan-300"
            title="Return to Main Game Hub"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-300 animate-spin-slow" />
            <div>
              <h1 className="text-sm font-black font-serif-accent bg-linear-to-r from-cyan-200 via-white to-amber-200 bg-clip-text text-transparent">
                PathFinder AI 3D RPG
              </h1>
              <span className="text-[10px] text-cyan-300 uppercase tracking-widest font-extrabold block">
                Crystal Forest &bull; Fractured Chasm
              </span>
            </div>
          </div>
        </div>

        {/* Center: Player Stats Bar (Level, XP, Gold, Gems) */}
        <div className="flex items-center gap-3 pointer-events-auto bg-[#0d1024]/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-indigo-500/40 shadow-xl flex-wrap justify-center">
          
          {/* Level & Avatar Badge */}
          <div className="flex items-center gap-2 pr-3 border-r border-white/20">
            <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-amber-400 overflow-hidden flex items-center justify-center font-black text-xs text-amber-300">
              {playerAvatar.gender === 'male' ? '♂' : '♀'}
            </div>
            <div>
              <span className="text-xs font-black text-white block">{playerAvatar.name}</span>
              <span className="text-[10px] font-extrabold text-amber-300 block">Level {progress.level}</span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="flex flex-col gap-1 w-28">
            <div className="flex justify-between text-[10px] font-bold text-indigo-200">
              <span>XP</span>
              <span>{progress.xp}/{progress.maxXp}</span>
            </div>
            <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-cyan-400/40">
              <div 
                className="bg-linear-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (progress.xp / progress.maxXp) * 100)}%` }}
              />
            </div>
          </div>

          {/* Gold Counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black">
            <Coins className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{progress.coins}</span>
          </div>

          {/* Gems Counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-xs font-black">
            <Gem className="w-4 h-4 fill-cyan-400 text-cyan-400" />
            <span>{progress.gems}</span>
          </div>
        </div>

        {/* Right: Audio Toggle */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleToggleMute}
            className="p-2.5 rounded-xl bg-[#0d1024]/85 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* PROXIMITY QUEST PROMPT OVERLAY */}
      {nearChasm && !bridgeBuilt && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-auto animate-bounce">
          <button
            onClick={triggerPuzzleModal}
            className="px-6 py-3 rounded-2xl bg-linear-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black text-sm border-2 border-amber-300 shadow-2xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            <span>Solve Chasm Math Puzzle to Build Crystal Bridge! ►</span>
          </button>
        </div>
      )}

      {/* VICTORY BANNER AFTER PUZZLE SOLVED */}
      {showVictoryBanner && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in zoom-in duration-500">
          <div className="p-5 px-8 rounded-3xl bg-linear-to-r from-purple-950/95 via-indigo-900/95 to-cyan-950/95 border-2 border-amber-400 shadow-2xl text-center space-y-1 backdrop-blur-md">
            <div className="text-xs font-black text-amber-300 uppercase tracking-widest flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Magical 3D Crystal Bridge Constructed!</span>
            </div>
            <h2 className="text-xl font-black text-white font-serif-accent">
              +100 XP &bull; +50 Gold Awarded!
            </h2>
            <p className="text-xs text-indigo-200">
              Walk across the glowing bridge over the Fractured Chasm to complete your quest!
            </p>
          </div>
        </div>
      )}

      {/* CONTROLS GUIDE (DESKTOP HUD BOTTOM LEFT) */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden md:block">
        <div className="p-3.5 px-4 rounded-2xl bg-[#0d1024]/80 backdrop-blur-md border border-cyan-500/30 text-[11px] space-y-1.5 shadow-xl">
          <span className="font-extrabold text-amber-300 uppercase tracking-wider block">Controls &amp; Navigation:</span>
          <div className="flex items-center gap-3 text-indigo-200">
            <span className="bg-indigo-950 px-2 py-0.5 rounded border border-cyan-400/40 text-cyan-300 font-mono font-bold">W / A / S / D</span>
            <span>or Arrows: Walk 3D Character</span>
          </div>
          <div className="flex items-center gap-3 text-indigo-200">
            <span className="bg-indigo-950 px-2 py-0.5 rounded border border-cyan-400/40 text-cyan-300 font-mono font-bold">SPACE</span>
            <span>Jump</span>
          </div>
        </div>
      </div>

      {/* MOBILE / ON-SCREEN TOUCH JOYSTICK CONTROLS (BOTTOM RIGHT) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto flex flex-col items-center gap-3">
        
        {/* Jump Button */}
        <button
          onPointerDown={() => {
            inputStateRef.current.jump = true;
          }}
          onPointerUp={() => {
            inputStateRef.current.jump = false;
          }}
          className="w-14 h-14 rounded-full bg-linear-to-tr from-amber-500 to-amber-300 border-2 border-white text-black font-black text-xs shadow-xl active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
        >
          JUMP
        </button>

        {/* On-Screen Virtual Directional Joystick */}
        <div
          onPointerDown={handleJoystickStart}
          onPointerMove={handleJoystickMove}
          onPointerUp={handleJoystickEnd}
          onPointerCancel={handleJoystickEnd}
          className="w-32 h-32 rounded-full bg-black/60 border-2 border-cyan-400/50 backdrop-blur-md flex items-center justify-center relative touch-none shadow-2xl cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-linear-to-tr from-cyan-400 to-indigo-600 border border-white shadow-lg flex items-center justify-center text-[10px] font-black">
            MOVE
          </div>
          <span className="absolute top-1 text-[9px] font-extrabold text-cyan-300">W</span>
          <span className="absolute bottom-1 text-[9px] font-extrabold text-cyan-300">S</span>
          <span className="absolute left-1.5 text-[9px] font-extrabold text-cyan-300">A</span>
          <span className="absolute right-1.5 text-[9px] font-extrabold text-cyan-300">D</span>
        </div>

      </div>

      {/* HOLOGRAPHIC MATH FORMULA PUZZLE MODAL */}
      {showPuzzleModal && (
        <HolographicMathPuzzleModal
          puzzle={currentPuzzle}
          onSolveCorrect={handleSolveCorrect}
          onClose={() => setShowPuzzleModal(false)}
        />
      )}

    </div>
  );
};
