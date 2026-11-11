import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, RefreshCw, Trophy, Sparkles, CheckCircle2, 
  HelpCircle, Sliders, Play, RotateCcw, FlaskConical, Gauge, Eye, Atom, Zap, Shield
} from 'lucide-react';
import { audioService } from '../../data/audioService';

export interface ExperimentSim {
  id: string;
  title: string;
  subject: 'Physics' | 'Chemistry';
  labTitle: string;
  equipmentDescription: string;
  var1Label: string;
  var1Min: number;
  var1Max: number;
  var1Step: number;
  var1Default: number;
  var1Unit: string;
  var2Label: string;
  var2Min: number;
  var2Max: number;
  var2Step: number;
  var2Default: number;
  var2Unit: string;
  predictionQuestion: string;
  predictionOptions: string[];
  correctPredictionIndex: number;
  scientificExplanation: string;
  computeOutcome: (v1: number, v2: number) => {
    outputVal1: string;
    outputVal2: string;
    visualStatus: string;
  };
}

export const EXPERIMENTS: ExperimentSim[] = [
  {
    id: 'exp_1',
    title: 'Experiment 1: Projectile Motion Trajectory & Range',
    subject: 'Physics',
    labTitle: 'Kinematics Digital Ballistics Bench',
    equipmentDescription: 'Digital cannon on an adjustable incline platform with velocity sensors and electronic landing pad.',
    var1Label: 'Launch Angle (θ)',
    var1Min: 15,
    var1Max: 75,
    var1Step: 5,
    var1Default: 45,
    var1Unit: 'degrees',
    var2Label: 'Initial Velocity (v₀)',
    var2Min: 10,
    var2Max: 50,
    var2Step: 5,
    var2Default: 30,
    var2Unit: 'm/s',
    predictionQuestion: 'Which launch angle θ produces the MAXIMUM horizontal distance (Range R) for any given initial velocity?',
    predictionOptions: ['θ = 30°', 'θ = 45°', 'θ = 60°', 'θ = 90°'],
    correctPredictionIndex: 1,
    scientificExplanation: 'Horizontal Range R = (v₀² sin 2θ)/g. The term sin 2θ reaches its maximum value of 1 when 2θ = 90° ⟹ θ = 45°!',
    computeOutcome: (v1, v2) => {
      const g = 9.8;
      const rad = (v1 * Math.PI) / 180;
      const range = (Math.pow(v2, 2) * Math.sin(2 * rad)) / g;
      const hMax = (Math.pow(v2, 2) * Math.pow(Math.sin(rad), 2)) / (2 * g);
      return {
        outputVal1: `Range (R) = ${range.toFixed(2)} meters`,
        outputVal2: `Max Height (H) = ${hMax.toFixed(2)} meters`,
        visualStatus: `Parabolic trajectory calculated at θ = ${v1}°, v₀ = ${v2} m/s.`
      };
    }
  },
  {
    id: 'exp_2',
    title: 'Experiment 2: Ohm\'s Law & Electrical Power',
    subject: 'Physics',
    labTitle: 'DC Circuit Electronics Simulation Table',
    equipmentDescription: 'Variable DC voltage supply connected to a resistor coil, digital ammeter, and incandescent test lamp.',
    var1Label: 'Voltage (V)',
    var1Min: 2,
    var1Max: 24,
    var1Step: 2,
    var1Default: 12,
    var1Unit: 'Volts',
    var2Label: 'Resistance (R)',
    var2Min: 2,
    var2Max: 20,
    var2Step: 2,
    var2Default: 6,
    var2Unit: 'Ohms (Ω)',
    predictionQuestion: 'If you DOUBLE the resistance R while keeping Voltage V constant, what happens to the electric current I?',
    predictionOptions: ['Current Doubles', 'Current is Halved (1/2)', 'Current Quadruples', 'Current remains unchanged'],
    correctPredictionIndex: 1,
    scientificExplanation: 'According to Ohm\'s Law I = V/R, current I is inversely proportional to resistance R. Doubling R halves current I!',
    computeOutcome: (v1, v2) => {
      const current = v1 / v2;
      const power = v1 * current;
      return {
        outputVal1: `Current (I) = ${current.toFixed(2)} Amperes (A)`,
        outputVal2: `Power Dissipated (P) = ${power.toFixed(2)} Watts (W)`,
        visualStatus: `Resistor current I = ${current.toFixed(2)} A flowing through circuit.`
      };
    }
  },
  {
    id: 'exp_3',
    title: 'Experiment 3: Acid-Base Titration & Neutralization',
    subject: 'Chemistry',
    labTitle: 'Volumetric Chemistry Titration Workstation',
    equipmentDescription: 'Digital burette dispensing 0.1 M Sodium Hydroxide (NaOH) into a flask containing 25 mL of 0.1 M Hydrochloric Acid (HCl) with Phenolphthalein indicator.',
    var1Label: 'Volume NaOH Added',
    var1Min: 0,
    var1Max: 50,
    var1Step: 2,
    var1Default: 25,
    var1Unit: 'mL',
    var2Label: 'Acid Concentration',
    var2Min: 0.05,
    var2Max: 0.2,
    var2Step: 0.05,
    var2Default: 0.1,
    var2Unit: 'Molar (M)',
    predictionQuestion: 'What color change occurs at the exact Equivalence Point when acid is completely neutralized by base with Phenolphthalein indicator?',
    predictionOptions: ['Colorless ➔ Faint Pink', 'Blue ➔ Red', 'Yellow ➔ Green', 'Purple ➔ Clear'],
    correctPredictionIndex: 0,
    scientificExplanation: 'Phenolphthalein is colorless in acidic solution (pH < 8.3) and turns faint pink at the equivalence point in basic pH (pH ~ 8.2-10).',
    computeOutcome: (v1, v2) => {
      const eqVolume = (v2 * 25) / 0.1;
      const isNeutral = Math.abs(v1 - eqVolume) < 1;
      const isBasic = v1 > eqVolume;
      const ph = isNeutral ? 7.0 : isBasic ? 11.2 : 2.1;
      return {
        outputVal1: `Solution pH = ${ph.toFixed(1)}`,
        outputVal2: `Indicator Color = ${isNeutral || isBasic ? 'Faint Pink / Magenta' : 'Colorless (Acidic)'}`,
        visualStatus: isNeutral ? 'Equivalence Point Reached! Exact neutralization.' : isBasic ? 'Solution is Basic (Excess NaOH).' : 'Solution is Acidic.'
      };
    }
  }
];

import { CharacterAvatar, DEFAULT_MALE_AVATAR } from '../../types/characterTypes';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';

interface VirtualLabChallengeProps {
  playerAvatar?: CharacterAvatar;
  onBackToHub: () => void;
}

export const VirtualLabChallenge: React.FC<VirtualLabChallengeProps> = ({ playerAvatar = DEFAULT_MALE_AVATAR, onBackToHub }) => {
  const [currentExpIdx, setCurrentExpIdx] = useState<number>(0);
  const exp = EXPERIMENTS[currentExpIdx];

  const [var1, setVar1] = useState<number>(exp.var1Default);
  const [var2, setVar2] = useState<number>(exp.var2Default);

  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simProgress, setSimProgress] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    audioService.startMusic('lab');
    return () => audioService.stopMusic();
  }, []);

  useEffect(() => {
    setVar1(exp.var1Default);
    setVar2(exp.var2Default);
    setSelectedPrediction(null);
    setShowExplanation(false);
    setSimProgress(0);
  }, [currentExpIdx]);

  const outcome = exp.computeOutcome(var1, var2);

  // Render Interactive Canvas for Simulation Graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (exp.id === 'exp_1') {
      // --- PROJECTILE CANNON SIMULATION ---
      const thetaRad = (var1 * Math.PI) / 180;
      const v0 = var2;
      const g = 9.8;
      const maxRange = (Math.pow(50, 2) * 1) / g; // scale factor
      const scaleX = (width - 80) / maxRange;
      const scaleY = (height - 60) / (maxRange / 2);

      const startX = 40;
      const startY = height - 40;

      // Draw Ground
      ctx.beginPath();
      ctx.moveTo(0, startY);
      ctx.lineTo(width, startY);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 40; x < width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, startY); ctx.stroke();
      }

      // Draw Cannon Base & Barrel Angle
      ctx.save();
      ctx.translate(startX, startY);
      ctx.rotate(-thetaRad);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-5, -8, 30, 12);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(startX, startY, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#b45309';
      ctx.fill();

      // Calculate Trajectory Path
      const totalTime = (2 * v0 * Math.sin(thetaRad)) / g;
      const calcRange = (Math.pow(v0, 2) * Math.sin(2 * thetaRad)) / g;
      const maxH = (Math.pow(v0, 2) * Math.pow(Math.sin(thetaRad), 2)) / (2 * g);

      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;

      for (let t = 0; t <= totalTime; t += totalTime / 50) {
        const x = startX + (v0 * Math.cos(thetaRad) * t) * scaleX;
        const y = startY - (v0 * Math.sin(thetaRad) * t - 0.5 * g * t * t) * scaleY;
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Animated Projectile Ball along path
      const activeT = isSimulating ? (simProgress / 100) * totalTime : totalTime;
      const projX = startX + (v0 * Math.cos(thetaRad) * activeT) * scaleX;
      const projY = startY - (v0 * Math.sin(thetaRad) * activeT - 0.5 * g * activeT * activeT) * scaleY;

      ctx.beginPath();
      ctx.arc(projX, projY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Landing Spot Indicator
      const landingX = startX + calcRange * scaleX;
      ctx.fillStyle = '#10b981';
      ctx.fillRect(landingX - 2, startY - 10, 4, 10);
      ctx.fillStyle = '#10b981';
      ctx.font = '10px sans-serif';
      ctx.fillText(`R = ${calcRange.toFixed(1)}m`, landingX - 20, startY + 15);

    } else if (exp.id === 'exp_2') {
      // --- OHM'S LAW CIRCUIT SIMULATION ---
      const current = var1 / var2;
      const power = var1 * current;

      // Circuit Wires
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 40, width - 120, height - 80);

      // Battery Source
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(50, height / 2 - 25, 20, 50);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`${var1}V`, 45, height / 2 + 35);

      // Resistor Zigzag Coil
      const rx = width / 2;
      const ry = 40;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(rx - 30, ry - 12, 60, 24);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.strokeRect(rx - 30, ry - 12, 60, 24);
      ctx.fillStyle = '#f87171';
      ctx.fillText(`${var2} Ω`, rx - 12, ry + 4);

      // Incandescent Lamp / Bulb
      const lx = width - 60;
      const ly = height / 2;
      const bulbGlow = Math.min(30, Math.max(5, power));

      ctx.beginPath();
      ctx.arc(lx, ly, 16, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(250, 204, 21, ${Math.min(1, power / 40)})`;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = bulbGlow;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#facc15';
      ctx.stroke();

      // Electron Flow Particles around wire
      const time = Date.now() * 0.003 * current;
      const perimeter = 2 * (width - 120 + height - 80);
      for (let i = 0; i < 12; i++) {
        const offset = ((i / 12) * perimeter + time * 50) % perimeter;
        let px = 60, py = 40;
        const w = width - 120;
        const h = height - 80;
        if (offset < w) { px = 60 + offset; py = 40; }
        else if (offset < w + h) { px = 60 + w; py = 40 + (offset - w); }
        else if (offset < 2 * w + h) { px = 60 + w - (offset - (w + h)); py = 40 + h; }
        else { px = 60; py = 40 + h - (offset - (2 * w + h)); }

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
      }

    } else if (exp.id === 'exp_3') {
      // --- ACID-BASE TITRATION FLASK SIMULATION ---
      const volNaOH = var1;
      const acidConc = var2;
      const eqVolume = (acidConc * 25) / 0.1;
      const isNeutral = Math.abs(volNaOH - eqVolume) < 1;
      const isBasic = volNaOH > eqVolume;

      // Burette Tube
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(width / 2 - 12, 10, 24, 110);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.strokeRect(width / 2 - 12, 10, 24, 110);

      // Burette Liquid Level
      const buretteFill = Math.max(5, 100 - (volNaOH / 50) * 100);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(width / 2 - 10, 10 + (100 - buretteFill), 20, buretteFill);

      // Droplet animation
      if (isSimulating) {
        const dropY = 120 + ((simProgress % 20) / 20) * 40;
        ctx.beginPath();
        ctx.arc(width / 2, dropY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
      }

      // Erlenmeyer Flask
      const fx = width / 2;
      const fy = 160;
      ctx.beginPath();
      ctx.moveTo(fx - 15, fy);
      ctx.lineTo(fx + 15, fy);
      ctx.lineTo(fx + 45, fy + 70);
      ctx.lineTo(fx - 45, fy + 70);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Liquid color transition
      let liquidColor = 'rgba(255, 255, 255, 0.3)'; // Acidic colorless
      if (isNeutral) liquidColor = 'rgba(244, 114, 182, 0.8)'; // Faint Pink
      else if (isBasic) liquidColor = 'rgba(219, 39, 119, 0.95)'; // Deep Magenta

      ctx.beginPath();
      const liquidLevel = Math.min(65, 30 + (volNaOH / 50) * 35);
      const topW = 15 + (liquidLevel / 70) * 30;
      ctx.moveTo(fx - topW, fy + 70 - liquidLevel);
      ctx.lineTo(fx + topW, fy + 70 - liquidLevel);
      ctx.lineTo(fx + 43, fy + 68);
      ctx.lineTo(fx - 43, fy + 68);
      ctx.closePath();
      ctx.fillStyle = liquidColor;
      ctx.fill();

      // Bubbles
      if (isSimulating || isNeutral) {
        for (let b = 0; b < 5; b++) {
          const bx = fx - 20 + Math.random() * 40;
          const by = fy + 60 - Math.random() * liquidLevel;
          ctx.beginPath();
          ctx.arc(bx, by, 2 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fill();
        }
      }
    }
  }, [currentExpIdx, var1, var2, isSimulating, simProgress]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimProgress(0);
    if (exp.subject === 'Chemistry') {
      audioService.playChemicalBubbles();
    } else {
      audioService.playClick();
    }

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setSimProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 40);
  };

  const handleSelectPrediction = (idx: number) => {
    setSelectedPrediction(idx);
    setShowExplanation(true);
    if (idx === exp.correctPredictionIndex) {
      audioService.playSuccessChime();
    } else {
      audioService.playErrorBuzz();
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
              Game 3 &bull; Digital Simulations
            </span>
            <h2 className="text-lg font-extrabold text-[#722F45]">
              Virtual Lab Challenge
            </h2>
          </div>
        </div>

        {/* Experiment Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {EXPERIMENTS.map((e, idx) => (
            <button
              key={e.id}
              onClick={() => setCurrentExpIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                currentExpIdx === idx
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'bg-white border border-[#D5A3AE]/60 text-[#2D2226] hover:bg-[#D5A3AE]/20'
              }`}
            >
              Exp {idx + 1}: {e.subject}
            </button>
          ))}
        </div>
      </div>

      {/* Main Lab Viewport */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl border-4 border-[#D5A3AE]/60 space-y-6 relative overflow-hidden">
        
        {/* Animated Scientist Avatar & Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div className="flex items-center gap-4">
            
            {/* Customized Anime Avatar Renderer */}
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border-2 border-amber-400/60 flex items-center justify-center relative shrink-0 shadow-lg overflow-hidden">
              <AnimeAvatarRenderer avatar={playerAvatar} pose="idle" size={56} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider bg-black/40 px-3 py-1 rounded-full border border-amber-400/40">
                  {exp.labTitle}
                </span>
                <span className="text-[10px] text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  Lead Scientist: {playerAvatar.name}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-serif-accent text-white mt-1">
                {exp.title}
              </h3>
            </div>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-[#722F45] flex items-center justify-center font-bold shadow-md shrink-0">
            <FlaskConical className="w-5 h-5" />
          </div>
        </div>

        {/* 2-Column Lab Control Panel & Interactive Graphics Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Variable Sliders (5 Cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white/10 border border-white/20 space-y-5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              Adjust Experiment Sliders:
            </h4>

            {/* Variable 1 Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">{exp.var1Label}:</span>
                <span className="text-amber-300 font-mono text-sm">{var1} {exp.var1Unit}</span>
              </div>
              <input
                type="range"
                min={exp.var1Min}
                max={exp.var1Max}
                step={exp.var1Step}
                value={var1}
                onChange={(e) => setVar1(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Variable 2 Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">{exp.var2Label}:</span>
                <span className="text-amber-300 font-mono text-sm">{var2} {exp.var2Unit}</span>
              </div>
              <input
                type="range"
                min={exp.var2Min}
                max={exp.var2Max}
                step={exp.var2Step}
                value={var2}
                onChange={(e) => setVar2(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-3 rounded-xl bg-amber-400 text-[#722F45] font-extrabold text-xs hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isSimulating ? `Simulating (${simProgress}%)...` : 'Run Digital Simulation'}</span>
            </button>
          </div>

          {/* Right Column: HTML Canvas Visual Simulation Output (7 Cols) */}
          <div className="lg:col-span-7 p-5 rounded-2xl bg-black/60 border-2 border-amber-400/60 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" />
                Live Graphic Visualizer
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
                {isSimulating ? 'RUNNING EXPERIMENT...' : 'REAL-TIME READOUT'}
              </span>
            </div>

            {/* Real Canvas Rendering Viewport */}
            <div className="rounded-xl bg-slate-950 border border-white/20 p-2 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={420}
                height={190}
                className="w-full h-[190px] object-contain rounded"
              />
            </div>

            {/* Readout Output Notes */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-1 text-xs font-mono">
              <div className="text-emerald-400 font-bold">
                &gt; {outcome.outputVal1}
              </div>
              <div className="text-cyan-300 font-bold">
                &gt; {outcome.outputVal2}
              </div>
              <div className="text-white/80 text-[11px] pt-1 border-t border-white/10">
                Dr. Volt Observation: {outcome.visualStatus}
              </div>
            </div>
          </div>

        </div>

        {/* Prediction Challenge Section */}
        <div className="p-6 rounded-2xl bg-white/10 border border-white/20 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Atom className="w-4 h-4" />
              Dr. Volt's Scientific Prediction Challenge:
            </h4>
            <span className="text-xs text-white/70">Test your lab intuition</span>
          </div>

          <p className="text-sm font-semibold text-white leading-relaxed">
            {exp.predictionQuestion}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exp.predictionOptions.map((opt, optIdx) => {
              let btnStyle = 'bg-white/10 hover:bg-white/20 border-white/30 text-white';
              if (showExplanation) {
                if (optIdx === exp.correctPredictionIndex) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                } else if (optIdx === selectedPrediction) {
                  btnStyle = 'bg-rose-600 text-white border-rose-400 font-bold';
                } else {
                  btnStyle = 'bg-black/40 border-white/10 text-white/40 opacity-50';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={showExplanation}
                  onClick={() => handleSelectPrediction(optIdx)}
                  className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${btnStyle}`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-medium ${
              selectedPrediction === exp.correctPredictionIndex
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100'
                : 'bg-rose-950/90 border-rose-400 text-rose-100'
            }`}>
              <strong className="block mb-1 font-extrabold">
                {selectedPrediction === exp.correctPredictionIndex ? ' Correct Prediction!' : ' Scientific Explanation:'}
              </strong>
              {exp.scientificExplanation}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

