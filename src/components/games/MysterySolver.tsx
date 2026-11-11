import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, RefreshCw, Trophy, Sparkles, CheckCircle2, 
  HelpCircle, ShieldCheck, Search, FileText, UserCheck, Check, Award, Eye, Compass, Lock
} from 'lucide-react';
import { audioService } from '../../data/audioService';

export interface MysteryCase {
  caseId: number;
  caseTitle: string;
  location: string;
  dossierSummary: string;
  clues: { clueTitle: string; clueDetail: string; iconName: string }[];
  investigationQuestion: string;
  suspectChoices: string[];
  correctSuspectIndex: number;
  forensicExplanation: string;
  rewardBadge: string;
}

export const MYSTERY_CASES: MysteryCase[] = [
  {
    caseId: 1,
    caseTitle: 'Case #101: The Vanishing Diamond Heist',
    location: 'Telangana Heritage Museum',
    dossierSummary: 'A 50-carat museum diamond was stolen at midnight. The thief shattered a high security glass window and escaped along a parabolic trajectory using a high-tension zip line.',
    clues: [
      {
        clueTitle: 'Clue A: Shattered Glass Debris Vector',
        clueDetail: 'Glass shards were blown out at an angle of 45° with velocity 20 m/s.',
        iconName: 'Search'
      },
      {
        clueTitle: 'Clue B: Zip Line Angle of Descent',
        clueDetail: 'The zip line slope equation was calculated as y = -2x + 10.',
        iconName: 'FileText'
      },
      {
        clueTitle: 'Clue C: Security Camera Log',
        clueDetail: 'Suspect left footprint impressions corresponding to a weight of 70 kg.',
        iconName: 'UserCheck'
      }
    ],
    investigationQuestion: 'Based on the straight line locus slope y = -2x + 10 and vector trajectory analysis, which suspect\'s getaway route matches the forensic mathematical evidence?',
    suspectChoices: [
      'Suspect A: Escaped along path y = 2x + 5 (Slope m = +2)',
      'Suspect B: Escaped along path y = -2x + 10 (Slope m = -2)',
      'Suspect C: Escaped along path y = 0.5x + 3 (Slope m = +0.5)',
      'Suspect D: Escaped along path y = -0.5x + 8 (Slope m = -0.5)'
    ],
    correctSuspectIndex: 1,
    forensicExplanation: 'The forensic straight line equation y = -2x + 10 has slope m = -2. Suspect B\'s getaway route is the exact match! Case solved!',
    rewardBadge: 'Master Detective'
  },
  {
    caseId: 2,
    caseTitle: 'Case #102: The Contaminated City Reservoir',
    location: 'Greater Hyderabad Water Works',
    dossierSummary: 'A chemical plant spill contaminated a city water reservoir. Detective team needs to identify the neutralizing agent using chemistry titration and pH principles.',
    clues: [
      {
        clueTitle: 'Clue A: Acidic Water Test',
        clueDetail: 'Water sample turned universal indicator deep red with pH = 3.0 (Excess H⁺ ions).',
        iconName: 'Search'
      },
      {
        clueTitle: 'Clue B: Titration Equivalent Volume',
        clueDetail: 'Neutralizing 1000 Liters requires 50 Moles of a mild basic alkali.',
        iconName: 'FileText'
      }
    ],
    investigationQuestion: 'What chemical substance must be added to neutralize the acidic reservoir safely to reach neutral pH = 7.0?',
    suspectChoices: [
      'Option A: Strong Hydrochloric Acid (HCl)',
      'Option B: Calcium Hydroxide / Lime [Ca(OH)₂] (Base)',
      'Option C: Concentrated Sulfuric Acid (H₂SO₄)',
      'Option D: Sodium Chloride Salt (NaCl)'
    ],
    correctSuspectIndex: 1,
    forensicExplanation: 'Acidic water (pH = 3.0) contains excess H⁺ ions. Adding mild base Calcium Hydroxide [Ca(OH)₂] neutralizes H⁺ ions forming safe H₂O and neutral pH 7.0!',
    rewardBadge: 'Forensic Chemist'
  }
];

import { CharacterAvatar, DEFAULT_MALE_AVATAR } from '../../types/characterTypes';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';

interface MysterySolverProps {
  playerAvatar?: CharacterAvatar;
  onBackToHub: () => void;
}

export const MysterySolver: React.FC<MysterySolverProps> = ({ playerAvatar = DEFAULT_MALE_AVATAR, onBackToHub }) => {
  const [currentCaseIdx, setCurrentCaseIdx] = useState<number>(0);
  const caseObj = MYSTERY_CASES[currentCaseIdx];

  const [selectedSuspect, setSelectedSuspect] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [solvedCases, setSolvedCases] = useState<number[]>([]);
  const [revealedClues, setRevealedClues] = useState<number[]>([0, 1, 2]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    audioService.startMusic('mystery');
    return () => audioService.stopMusic();
  }, []);

  // Draw Interactive Red String Pinboard Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw Corkboard Texture Background
    ctx.fillStyle = '#1c1316';
    ctx.fillRect(0, 0, width, height);

    // Central Case Node Pin
    const centerX = width / 2;
    const centerY = height / 2;

    // Clue Pins Coordinates
    const pinPositions = [
      { x: 70, y: 50, title: 'Clue A' },
      { x: width - 70, y: 50, title: 'Clue B' },
      { x: width / 2, y: height - 40, title: 'Clue C' }
    ];

    // Draw Glowing Red String Connections
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 8;

    pinPositions.forEach((pos, idx) => {
      if (revealedClues.includes(idx)) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        // Slightly curved string line
        ctx.quadraticCurveTo(
          (centerX + pos.x) / 2 + (idx % 2 === 0 ? 15 : -15),
          (centerY + pos.y) / 2,
          pos.x, pos.y
        );
        ctx.stroke();
      }
    });
    ctx.shadowBlur = 0;

    // Draw Central Case Pin Node
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#dc2626';
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'extrabold 9px sans-serif';
    ctx.fillText(`CASE #${caseObj.caseId}`, centerX - 20, centerY + 3);

    // Draw Outer Clue Pin Nodes
    pinPositions.forEach((pos, idx) => {
      if (idx < caseObj.clues.length) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = revealedClues.includes(idx) ? '#f59e0b' : '#475569';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(pos.title, pos.x - 14, pos.y + 20);
      }
    });

  }, [currentCaseIdx, revealedClues, caseObj]);

  const handleSelectSuspect = (idx: number) => {
    setSelectedSuspect(idx);
    setShowExplanation(true);
    if (idx === caseObj.correctSuspectIndex) {
      audioService.playClueDiscovered();
      if (!solvedCases.includes(caseObj.caseId)) {
        setSolvedCases(prev => [...prev, caseObj.caseId]);
      }
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
              Game 4 &bull; Forensic Investigation
            </span>
            <h2 className="text-lg font-extrabold text-[#722F45]">
              Mystery Solver Detective Bureau
            </h2>
          </div>
        </div>

        {/* Case Selector */}
        <div className="flex items-center gap-2">
          {MYSTERY_CASES.map((c, idx) => (
            <button
              key={c.caseId}
              onClick={() => {
                setCurrentCaseIdx(idx);
                setSelectedSuspect(null);
                setShowExplanation(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentCaseIdx === idx
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'bg-white border border-[#D5A3AE]/60 text-[#2D2226] hover:bg-[#D5A3AE]/20'
              }`}
            >
              Case #{c.caseId} {solvedCases.includes(c.caseId) && '✓'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Detective Bureau Viewport */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-[#1F171A] via-[#2D2226] to-[#1F171A] text-white shadow-2xl border-4 border-[#D5A3AE]/60 space-y-6 relative overflow-hidden">
        
        {/* Animated Male Detective Avatar & Bureau Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div className="flex items-center gap-4">
            
            {/* Customized Anime Avatar Renderer */}
            <div className="w-14 h-14 rounded-2xl bg-amber-900/40 border-2 border-amber-400/60 flex items-center justify-center relative shrink-0 shadow-lg overflow-hidden">
              <AnimeAvatarRenderer avatar={playerAvatar} pose="idle" size={56} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider bg-black/40 px-3 py-1 rounded-full border border-amber-400/40">
                  {caseObj.location}
                </span>
                <span className="text-[10px] text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                  Lead Investigator: {playerAvatar.name}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-serif-accent text-amber-300 mt-1">
                {caseObj.caseTitle}
              </h3>
            </div>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-[#722F45] flex items-center justify-center font-bold shadow-md shrink-0">
            <Search className="w-5 h-5" />
          </div>
        </div>

        {/* 2-Column Dossier Summary & Red String Pinboard Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Dossier Summary & Clues List (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/20 text-xs text-white/90 leading-relaxed font-medium space-y-1">
              <strong className="text-amber-300 block font-extrabold uppercase tracking-wider">
                Crime Scene Dossier Summary:
              </strong>
              <p>{caseObj.dossierSummary}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Collected Forensic Evidence:
              </h4>

              <div className="space-y-2">
                {caseObj.clues.map((clue, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/20 space-y-1 shadow-2xs">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block">
                      {clue.clueTitle}
                    </span>
                    <p className="text-xs text-white/90 leading-snug font-medium">
                      {clue.clueDetail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Red String Pinboard Canvas (6 Cols) */}
          <div className="lg:col-span-6 p-4 rounded-2xl bg-[#140c0e] border-2 border-amber-400/60 space-y-2 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center justify-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Interactive Evidence Pinboard
            </span>
            <div className="rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#1c1316]">
              <canvas
                ref={canvasRef}
                width={380}
                height={210}
                className="w-full h-[210px] object-contain"
              />
            </div>
            <p className="text-[10px] text-white/60 italic">
              Red string lines connect case origin to verified forensic vector clues.
            </p>
          </div>

        </div>

        {/* Decision Point & Suspect Choices */}
        <div className="p-6 rounded-2xl bg-black/50 border border-white/20 space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            Detective Decision Point:
          </h4>

          <p className="text-sm font-semibold text-white leading-relaxed">
            {caseObj.investigationQuestion}
          </p>

          <div className="space-y-2.5">
            {caseObj.suspectChoices.map((choice, idx) => {
              let btnStyle = 'bg-white/10 hover:bg-white/20 border-white/30 text-white';
              if (showExplanation) {
                if (idx === caseObj.correctSuspectIndex) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                } else if (idx === selectedSuspect) {
                  btnStyle = 'bg-rose-600 text-white border-rose-400 font-bold';
                } else {
                  btnStyle = 'bg-black/40 border-white/10 text-white/40 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showExplanation}
                  onClick={() => handleSelectSuspect(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${btnStyle}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-medium ${
              selectedSuspect === caseObj.correctSuspectIndex
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100'
                : 'bg-rose-950/90 border-rose-400 text-rose-100'
            }`}>
              <strong className="block mb-1 font-extrabold">
                {selectedSuspect === caseObj.correctSuspectIndex ? ' Case Solved! Evidence Matches:' : ' Incorrect Hypothesis:'}
              </strong>
              {caseObj.forensicExplanation}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

