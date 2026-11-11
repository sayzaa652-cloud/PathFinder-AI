import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, Sparkles, Filter, Pin, ArrowRight, 
  X, ExternalLink, Layers, Lightbulb, Copy, Check, 
  Bot, Youtube, Globe, Send, RefreshCw,
  GraduationCap, Network, GitBranch, CheckCircle2, Bookmark,
  Hash, Grid, ShieldCheck, Combine, PieChart, ChevronRight,
  Zap, ZoomIn, ZoomOut, Maximize2, Info, Compass
} from 'lucide-react';
import { 
  OFFICIAL_TGBIE_MATH_NOTES, 
  MathStickyNote, 
  TGBIE_SUBJECTS_METADATA 
} from '../data/mathStickyNotesData';
import { 
  MATHEMATICS_IA_MIND_MAPS, 
  getMindMapForSubjectAndChapter,
  ConceptMindMapData, 
  MindMapBranch 
} from '../data/mathMindMapData';

interface MathematicsConceptNotesProps {
  initialPaper?: 'Mathematics IA' | 'Mathematics IB' | 'Mathematics IIA' | 'Mathematics IIB';
  onLaunchAssessment?: (specialization: string) => void;
}

export const MathematicsConceptNotes: React.FC<MathematicsConceptNotesProps> = ({
  initialPaper = 'Mathematics IA',
  onLaunchAssessment
}) => {
  // Navigation State
  const [selectedStream, setSelectedStream] = useState<'Intermediate MPC' | 'Intermediate BiPC'>('Intermediate MPC');
  const [selectedYear, setSelectedYear] = useState<'1st Year' | '2nd Year'>('1st Year');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialPaper);
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [displayMode, setDisplayMode] = useState<'mindMaps' | 'stickyNotes'>('mindMaps');
  const [mindMapViewType, setMindMapViewType] = useState<'interactiveCanvas' | 'treeExplorer'>('interactiveCanvas');
  const [activeBranchId, setActiveBranchId] = useState<string>('ch1_b1');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Color theme definitions for mind map branches
  const COLOR_THEMES: Record<MindMapBranch['colorTheme'], {
    nodeBg: string;
    nodeBorder: string;
    badgeBg: string;
    stroke: string;
    text: string;
    lightBg: string;
    gradient: string;
  }> = {
    amber: {
      nodeBg: 'bg-[#FEF3C7]',
      nodeBorder: 'border-[#F59E0B]',
      badgeBg: 'bg-[#F59E0B]/20 text-[#78350F]',
      stroke: '#F59E0B',
      text: 'text-[#78350F]',
      lightBg: 'bg-[#FFFBEB]',
      gradient: 'from-[#F59E0B] to-[#D97706]'
    },
    emerald: {
      nodeBg: 'bg-[#D1FAE5]',
      nodeBorder: 'border-[#10B981]',
      badgeBg: 'bg-[#10B981]/20 text-[#065F46]',
      stroke: '#10B981',
      text: 'text-[#065F46]',
      lightBg: 'bg-[#ECFDF5]',
      gradient: 'from-[#10B981] to-[#059669]'
    },
    sky: {
      nodeBg: 'bg-[#E0F2FE]',
      nodeBorder: 'border-[#0EA5E9]',
      badgeBg: 'bg-[#0EA5E9]/20 text-[#075985]',
      stroke: '#0EA5E9',
      text: 'text-[#075985]',
      lightBg: 'bg-[#F0F9FF]',
      gradient: 'from-[#0EA5E9] to-[#0284C7]'
    },
    purple: {
      nodeBg: 'bg-[#F3E8FF]',
      nodeBorder: 'border-[#A855F7]',
      badgeBg: 'bg-[#A855F7]/20 text-[#581C87]',
      stroke: '#A855F7',
      text: 'text-[#581C87]',
      lightBg: 'bg-[#FAF5FF]',
      gradient: 'from-[#A855F7] to-[#7E22CE]'
    },
    rose: {
      nodeBg: 'bg-[#FFE4E6]',
      nodeBorder: 'border-[#F43F5E]',
      badgeBg: 'bg-[#F43F5E]/20 text-[#881337]',
      stroke: '#F43F5E',
      text: 'text-[#881337]',
      lightBg: 'bg-[#FFF1F2]',
      gradient: 'from-[#F43F5E] to-[#BE123C]'
    },
    indigo: {
      nodeBg: 'bg-[#E0E7FF]',
      nodeBorder: 'border-[#6366F1]',
      badgeBg: 'bg-[#6366F1]/20 text-[#3730A3]',
      stroke: '#6366F1',
      text: 'text-[#3730A3]',
      lightBg: 'bg-[#EEF2FF]',
      gradient: 'from-[#6366F1] to-[#4338CA]'
    },
    teal: {
      nodeBg: 'bg-[#CCFBF1]',
      nodeBorder: 'border-[#14B8A6]',
      badgeBg: 'bg-[#14B8A6]/20 text-[#134E4A]',
      stroke: '#14B8A6',
      text: 'text-[#134E4A]',
      lightBg: 'bg-[#F0FDF4]',
      gradient: 'from-[#14B8A6] to-[#0D9488]'
    },
    coral: {
      nodeBg: 'bg-[#FFEDD5]',
      nodeBorder: 'border-[#F97316]',
      badgeBg: 'bg-[#F97316]/20 text-[#7C2D12]',
      stroke: '#F97316',
      text: 'text-[#7C2D12]',
      lightBg: 'bg-[#FFF7ED]',
      gradient: 'from-[#F97316] to-[#EA580C]'
    }
  };

  const renderIconByName = (name: string, className = "w-4 h-4") => {
    switch (name) {
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Hash': return <Hash className={className} />;
      case 'Grid': return <Grid className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Combine': return <Combine className={className} />;
      case 'PieChart': return <PieChart className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <Lightbulb className={className} />;
    }
  };

  // Copy Formula Helper
  const copyFormulaText = (formula: string, id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(formula);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  // Current Active Mind Map Data
  const currentMindMap: ConceptMindMapData | null = useMemo(() => {
    return getMindMapForSubjectAndChapter(selectedSubject, selectedChapterNum);
  }, [selectedSubject, selectedChapterNum]);

  // Set default active branch when chapter changes
  React.useEffect(() => {
    if (currentMindMap && currentMindMap.branches.length > 0) {
      setActiveBranchId(currentMindMap.branches[0].id);
    }
  }, [selectedChapterNum, selectedSubject]);

  // Selected Active Branch Detail
  const activeBranch = useMemo(() => {
    if (!currentMindMap) return null;
    return currentMindMap.branches.find(b => b.id === activeBranchId) || currentMindMap.branches[0];
  }, [currentMindMap, activeBranchId]);

  // Filtered Sticky Notes (for fallback sticky notes tab)
  const filteredStickyNotes = useMemo(() => {
    return OFFICIAL_TGBIE_MATH_NOTES.filter(note => {
      if (note.stream !== selectedStream) return false;
      if (note.year !== selectedYear) return false;
      if (note.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          note.originalConceptName.toLowerCase().includes(q) ||
          note.whatIsIt.toLowerCase().includes(q) ||
          (note.formula && note.formula.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedStream, selectedYear, selectedSubject, searchQuery]);

  // List of all 12 Mathematics IA chapters
  const iaChapters = [
    { num: 1, name: 'Sets and Relations' },
    { num: 2, name: 'Functions' },
    { num: 3, name: 'Sequences and Series' },
    { num: 4, name: 'Mathematical Induction' },
    { num: 5, name: 'Matrices' },
    { num: 6, name: 'Addition of Vectors' },
    { num: 7, name: 'Product of Vectors' },
    { num: 8, name: 'Trigonometric Transformations' },
    { num: 9, name: 'Trigonometric Equations' },
    { num: 10, name: 'Inverse Trig Functions' },
    { num: 11, name: 'Hyperbolic Functions' },
    { num: 12, name: 'Properties of Triangles' }
  ];

  return (
    <div className="space-y-6">

      {/* Top Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-linear-to-r from-[#FAF4EE] via-[#FFF9F2] to-[#FAF4EE] border-2 border-[#D5A3AE]/70 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-3 py-1 rounded-full border border-[#D5A3AE]">
                Telangana Intermediate (TGBIE 2026–27)
              </span>
              <span className="text-xs font-bold text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Premium Visual Mind Maps
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#722F45] font-serif-accent">
              Mathematics IA Visual Mind Maps &amp; Concept Explorer
            </h2>
            <p className="text-xs text-[#5A454C] leading-relaxed">
              Interactive visual node networks connecting every main concept in <strong>Mathematics IA</strong> with simple explanations, key points, formulas, step-by-step examples, and real-life applications.
            </p>
          </div>

          {/* Display Mode Toggle */}
          <div className="flex items-center p-1.5 rounded-2xl bg-[#E8D5C4]/80 border-2 border-[#D5A3AE] shadow-inner shrink-0">
            <button
              onClick={() => setDisplayMode('mindMaps')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                displayMode === 'mindMaps'
                  ? 'bg-[#722F45] text-white shadow-md'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-white/40'
              }`}
            >
              <GitBranch className="w-4 h-4 text-amber-300" />
              <span>Visual Mind Maps</span>
            </button>

            <button
              onClick={() => setDisplayMode('stickyNotes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                displayMode === 'stickyNotes'
                  ? 'bg-[#722F45] text-white shadow-md'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-white/40'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Sticky Notes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="p-4 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 space-y-4 shadow-xs">
        
        {/* Stream & Subject Pills */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D5A3AE]/50 shadow-2xs">
              {(['Intermediate MPC', 'Intermediate BiPC'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStream(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    selectedStream === st
                      ? 'bg-[#722F45] text-white shadow-xs'
                      : 'text-[#5A454C] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D5A3AE]/50 shadow-2xs">
              {(['1st Year', '2nd Year'] as const).map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-[#722F45] text-white shadow-xs'
                      : 'text-[#5A454C] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-[#722F45] mr-1">Subject:</span>
            {['Mathematics IA', 'Mathematics IB', 'Physics', 'Chemistry'].map(subj => {
              const isSelected = selectedSubject === subj;
              return (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#722F45] text-white shadow-xs ring-1 ring-[#722F45]'
                      : 'bg-white border border-[#D5A3AE]/60 text-[#2D2226] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  {subj}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapter Selection Carousel (Only for Mathematics IA) */}
        {selectedSubject === 'Mathematics IA' && (
          <div className="pt-2 border-t border-[#D5A3AE]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#722F45] flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                Select Chapter (All 12 TGBIE Mathematics IA Chapters):
              </span>
              <span className="text-[10px] text-[#6C555C] font-semibold">
                Showing Chapter {selectedChapterNum} of 12
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {iaChapters.map(ch => {
                const isSelected = selectedChapterNum === ch.num;
                return (
                  <button
                    key={ch.num}
                    onClick={() => setSelectedChapterNum(ch.num)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#722F45] text-white shadow-xs ring-2 ring-[#722F45]/40'
                        : 'bg-white border border-[#D5A3AE]/50 text-[#2D2226] hover:bg-[#D5A3AE]/20'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#D5A3AE]/30 text-[#722F45] text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      {ch.num}
                    </span>
                    <span className="truncate">{ch.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* DISPLAY MODE 1: VISUAL MIND MAPS                                          */}
      {/* ========================================================================= */}
      {displayMode === 'mindMaps' && (
        <>
          {selectedSubject !== 'Mathematics IA' ? (
            <div className="p-10 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/60 text-center space-y-3">
              <GitBranch className="w-10 h-10 text-[#8C4057] mx-auto opacity-70" />
              <h3 className="font-extrabold text-lg text-[#722F45]">
                {selectedSubject} Visual Mind Maps Coming Soon
              </h3>
              <p className="text-xs text-[#6C555C] max-w-md mx-auto leading-relaxed">
                We are currently building the complete Mathematics IA visual mind map series first. Once approved, the exact same premium connected mind map design will be applied to <strong>{selectedSubject}</strong>!
              </p>
              <button
                onClick={() => setSelectedSubject('Mathematics IA')}
                className="px-5 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Explore Mathematics IA Mind Maps
              </button>
            </div>
          ) : currentMindMap && (
            <div className="space-y-6">

              {/* Mind Map Controls Header */}
              <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#722F45] px-2.5 py-0.5 rounded">
                      Chapter {currentMindMap.chapterNumber}
                    </span>
                    <h3 className="font-extrabold text-base text-[#722F45]">
                      {currentMindMap.conceptHeading}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6C555C] mt-0.5">
                    {currentMindMap.tagline} &bull; <strong>{currentMindMap.branches.length} Connected Branches</strong>
                  </p>
                </div>

                {/* Mind Map Sub-View Switcher: Interactive Canvas vs Tree Explorer */}
                <div className="flex items-center p-1 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/50 shrink-0">
                  <button
                    onClick={() => setMindMapViewType('interactiveCanvas')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      mindMapViewType === 'interactiveCanvas'
                        ? 'bg-[#722F45] text-white shadow-2xs'
                        : 'text-[#5A454C] hover:text-[#722F45]'
                    }`}
                  >
                    <Network className="w-3.5 h-3.5" />
                    <span>Radial Network</span>
                  </button>

                  <button
                    onClick={() => setMindMapViewType('treeExplorer')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      mindMapViewType === 'treeExplorer'
                        ? 'bg-[#722F45] text-white shadow-2xs'
                        : 'text-[#5A454C] hover:text-[#722F45]'
                    }`}
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Tree Explorer</span>
                  </button>
                </div>
              </div>

              {/* ===================================================================== */}
              {/* SUB-VIEW 1: INTERACTIVE RADIAL CANVAS WITH CONNECTED SVG BEZIER LINES   */}
              {/* ===================================================================== */}
              {mindMapViewType === 'interactiveCanvas' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Visual Connected Mind Map Canvas (7 Cols) */}
                  <div className="lg:col-span-7 bg-linear-to-br from-[#FAF4EE] via-[#FFFDF9] to-[#FAF4EE] p-5 sm:p-7 rounded-3xl border-2 border-[#D5A3AE]/70 shadow-md relative min-h-[580px] flex flex-col justify-between overflow-hidden">
                    
                    {/* SVG Connector Lines Container */}
                    <div className="relative w-full h-[520px] flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        <defs>
                          <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#722F45" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#722F45" stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        {/* Bezier Curves connecting Central Node to each Branch Node */}
                        {currentMindMap.branches.map((branch, idx) => {
                          const total = currentMindMap.branches.length;
                          const angle = (idx * (2 * Math.PI / total)) - (Math.PI / 2);
                          // Canvas dimensions: assume center at (50%, 50%)
                          // Radius: 38%
                          const radiusX = 38; 
                          const radiusY = 36;
                          const cx = 50;
                          const cy = 50;
                          const bx = cx + radiusX * Math.cos(angle);
                          const by = cy + radiusY * Math.sin(angle);

                          // Control points for smooth organic curve
                          const cp1x = cx + (radiusX * 0.45) * Math.cos(angle);
                          const cp1y = cy + (radiusY * 0.45) * Math.sin(angle);
                          const cp2x = bx - (radiusX * 0.2) * Math.cos(angle);
                          const cp2y = by - (radiusY * 0.2) * Math.sin(angle);

                          const isActive = activeBranch?.id === branch.id;
                          const theme = COLOR_THEMES[branch.colorTheme];

                          return (
                            <g key={branch.id}>
                              <path
                                d={`M ${cx}% ${cy}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${bx}% ${by}%`}
                                fill="none"
                                stroke={isActive ? theme.stroke : '#D5A3AE'}
                                strokeWidth={isActive ? '3.5' : '2'}
                                strokeDasharray={isActive ? 'none' : '4 3'}
                                className="transition-all duration-300"
                              />
                              {isActive && (
                                <circle
                                  cx={`${bx}%`}
                                  cy={`${by}%`}
                                  r="6"
                                  fill={theme.stroke}
                                  className="animate-ping opacity-75"
                                />
                              )}
                            </g>
                          );
                        })}
                      </svg>

                      {/* Central Concept Node */}
                      <div className="absolute z-10 text-center flex flex-col items-center justify-center">
                        <div className="relative p-5 sm:p-6 rounded-3xl bg-linear-to-br from-[#722F45] to-[#4A1D2D] text-white shadow-2xl border-4 border-amber-300/80 max-w-[210px] transform hover:scale-105 transition-transform duration-300">
                          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-[#722F45] flex items-center justify-center mx-auto mb-2 shadow-md font-bold">
                            <Layers className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-black/20 px-2 py-0.5 rounded-full block mb-1">
                            Chapter {currentMindMap.chapterNumber}
                          </span>
                          <h4 className="font-extrabold text-sm sm:text-base leading-tight font-serif-accent">
                            {currentMindMap.chapterName}
                          </h4>
                          <span className="text-[9px] text-white/80 mt-1 block font-medium">
                            {currentMindMap.branches.length} Core Concepts
                          </span>
                        </div>
                      </div>

                      {/* Radial Branch Nodes */}
                      {currentMindMap.branches.map((branch, idx) => {
                        const total = currentMindMap.branches.length;
                        const angle = (idx * (2 * Math.PI / total)) - (Math.PI / 2);
                        const radiusX = 38; 
                        const radiusY = 36;
                        const leftPct = 50 + radiusX * Math.cos(angle);
                        const topPct = 50 + radiusY * Math.sin(angle);

                        const isActive = activeBranch?.id === branch.id;
                        const theme = COLOR_THEMES[branch.colorTheme];

                        return (
                          <div
                            key={branch.id}
                            style={{
                              left: `${leftPct}%`,
                              top: `${topPct}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            onClick={() => setActiveBranchId(branch.id)}
                            className={`absolute z-20 cursor-pointer transition-all duration-300 group ${
                              isActive
                                ? 'scale-110 ring-4 ring-amber-400 shadow-xl'
                                : 'hover:scale-105 opacity-90 hover:opacity-100 shadow-md'
                            }`}
                          >
                            <div className={`p-2.5 sm:p-3 rounded-2xl border-2 flex items-center gap-2 max-w-[170px] ${theme.nodeBg} ${theme.nodeBorder}`}>
                              <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white bg-linear-to-r ${theme.gradient} shadow-2xs`}>
                                {renderIconByName(branch.iconName, "w-3.5 h-3.5")}
                              </div>
                              <div className="overflow-hidden text-left">
                                <span className="text-[9px] font-extrabold uppercase tracking-wider block text-gray-500">
                                  Branch {idx + 1}
                                </span>
                                <h5 className={`font-bold text-[11px] leading-tight truncate ${theme.text}`}>
                                  {branch.title}
                                </h5>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </div>

                    {/* Quick Guidance Footer */}
                    <div className="pt-3 border-t border-[#D5A3AE]/40 flex items-center justify-between text-[11px] text-[#6C555C]">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        Click any branch node to inspect detailed concept properties.
                      </span>
                      <span className="font-bold text-[#722F45]">
                        Sample: Chapter {currentMindMap.chapterNumber} Mind Map
                      </span>
                    </div>

                  </div>

                  {/* Right Column: Active Branch Inspector / Floating Card (5 Cols) */}
                  <div className="lg:col-span-5">
                    {activeBranch ? (
                      <div className={`p-6 rounded-3xl border-2 shadow-xl space-y-4 transition-all ${COLOR_THEMES[activeBranch.colorTheme].lightBg} ${COLOR_THEMES[activeBranch.colorTheme].nodeBorder}`}>
                        
                        {/* Branch Title & Icon Header */}
                        <div className="flex items-start justify-between gap-3 border-b border-black/10 pb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-linear-to-r ${COLOR_THEMES[activeBranch.colorTheme].gradient} shadow-md`}>
                              {renderIconByName(activeBranch.iconName, "w-5 h-5")}
                            </div>
                            <div>
                              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${COLOR_THEMES[activeBranch.colorTheme].badgeBg}`}>
                                Concept Branch &bull; {activeBranch.title}
                              </span>
                              <h3 className="font-extrabold text-base text-[#2D2226] leading-tight mt-1">
                                {activeBranch.title}
                              </h3>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-[#722F45] bg-white px-2 py-1 rounded-lg border border-black/10">
                            Ch {currentMindMap.chapterNumber}
                          </span>
                        </div>

                        {/* 1. What does it mean? */}
                        <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/90 border border-black/5 shadow-2xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#8C4057]" />
                            1. What Does It Mean? (Simple Explanation)
                          </span>
                          <p className="text-xs text-[#2D2226] leading-relaxed font-medium">
                            {activeBranch.whatDoesItMean}
                          </p>
                        </div>

                        {/* 2. Exact Textbook Definition */}
                        {activeBranch.exactDefinition && (
                          <div className="space-y-1.5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/50 shadow-2xs">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                              2. Exact Telangana Textbook Definition (Section 3.3)
                            </span>
                            <blockquote className="text-xs font-serif text-[#2D2226] italic bg-white/80 p-2.5 rounded-xl border border-amber-300/60 leading-relaxed">
                              "{activeBranch.exactDefinition}"
                            </blockquote>
                          </div>
                        )}

                        {/* 3. Meaning of Mathematical Symbols */}
                        {activeBranch.symbolMeanings && activeBranch.symbolMeanings.length > 0 && (
                          <div className="space-y-2 p-3.5 rounded-2xl bg-white/90 border border-black/5 shadow-2xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] flex items-center gap-1">
                              <Info className="w-3.5 h-3.5 text-cyan-600" />
                              3. Meaning of Mathematical Symbols
                            </span>
                            <div className="grid grid-cols-1 gap-1.5">
                              {activeBranch.symbolMeanings.map((sym, sIdx) => (
                                <div key={sIdx} className="text-xs text-[#2D2226] bg-[#FAF4EE] p-2 rounded-xl border border-[#D5A3AE]/30 flex items-start gap-2">
                                  <span className="font-mono font-bold text-[#722F45] shrink-0">&bull;</span>
                                  <span>{sym}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 4. Important Formula */}
                        {activeBranch.formula && (
                          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/95 border border-amber-300 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                4. Exact Textbook Formula
                              </span>
                              <button
                                onClick={(e) => copyFormulaText(activeBranch.formula || '', activeBranch.id, e)}
                                className="text-xs text-[#722F45] font-bold hover:underline cursor-pointer flex items-center gap-1"
                              >
                                {copiedFormulaId === activeBranch.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy Formula</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="font-mono font-bold text-xs text-[#722F45] bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed break-words">
                              {activeBranch.formula}
                            </div>
                          </div>
                        )}

                        {/* 5. 4–5 Important Points & Properties */}
                        <div className="space-y-2 p-3.5 rounded-2xl bg-white/90 border border-black/5 shadow-2xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            5. Important Points &amp; Properties ({activeBranch.keyPoints.length})
                          </span>
                          <div className="space-y-1.5">
                            {activeBranch.keyPoints.map((pt, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2 text-xs text-[#2D2226]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 6. Textbook-Based Solved Examples & Step-by-Step Explanation */}
                        {activeBranch.textbookExamples && activeBranch.textbookExamples.length > 0 && (
                          <div className="space-y-2 p-3.5 rounded-2xl bg-white/95 border border-purple-300 shadow-2xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1">
                              <Bookmark className="w-3.5 h-3.5 text-purple-600" />
                              6. Official Textbook Solved Example &amp; Step-by-Step Solution
                            </span>
                            {activeBranch.textbookExamples.map((ex, eIdx) => (
                              <div key={eIdx} className="space-y-2 bg-purple-50/60 p-3 rounded-xl border border-purple-200">
                                <span className="font-bold text-xs text-purple-950 block">{ex.problem}</span>
                                <div className="space-y-1 pl-1">
                                  {ex.solutionSteps.map((step, sIdx) => (
                                    <div key={sIdx} className="text-xs text-[#2D2226] flex items-start gap-2">
                                      <span className="font-bold text-purple-700 font-mono text-[10px] mt-0.5">{sIdx + 1}.</span>
                                      <span className="leading-relaxed">{step}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 7. Common Mistakes & Pitfalls */}
                        {activeBranch.commonMistakes && activeBranch.commonMistakes.length > 0 && (
                          <div className="space-y-2 p-3.5 rounded-2xl bg-rose-50 border border-rose-300 shadow-2xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1">
                              <Info className="w-3.5 h-3.5 text-rose-600" />
                              7. Common Student Mistakes &amp; Pitfalls
                            </span>
                            <div className="space-y-1.5">
                              {activeBranch.commonMistakes.map((m, mIdx) => (
                                <div key={mIdx} className="text-xs text-rose-950 bg-white/80 p-2 rounded-xl border border-rose-200 flex items-start gap-2">
                                  <span className="text-rose-600 font-black">⚠️</span>
                                  <span className="leading-snug">{m}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 8. Practice Questions with Explained Answers */}
                        {activeBranch.practiceQuestions && activeBranch.practiceQuestions.length > 0 && (
                          <div className="space-y-2 p-3.5 rounded-2xl bg-white/95 border border-indigo-300 shadow-2xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                              8. Practice Question &amp; Explained Answer
                            </span>
                            {activeBranch.practiceQuestions.map((pq, qIdx) => (
                              <div key={qIdx} className="space-y-2 bg-indigo-50/60 p-3 rounded-xl border border-indigo-200">
                                <span className="font-bold text-xs text-indigo-950 block">{pq.question}</span>
                                <div className="text-xs text-emerald-950 bg-emerald-100/80 p-2 rounded-lg font-bold border border-emerald-300 flex items-center gap-2">
                                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                                  <span>Answer: {pq.answer}</span>
                                </div>
                                <div className="text-xs text-[#2D2226] bg-white p-2.5 rounded-lg border border-indigo-100 leading-relaxed font-medium">
                                  <strong className="text-indigo-900 block mb-0.5">Step-by-Step Explanation:</strong>
                                  {pq.explanation}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 9. Real-Life Application */}
                        {activeBranch.realLifeApp && (
                          <div className="space-y-1 p-3.5 rounded-2xl bg-[#E8F5E9]/80 border border-emerald-300 text-emerald-950 shadow-2xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                              <Compass className="w-3.5 h-3.5 text-emerald-700" />
                              9. Real-Life Application
                            </span>
                            <p className="text-xs leading-relaxed font-medium">
                              {activeBranch.realLifeApp}
                            </p>
                          </div>
                        )}

                      </div>
                    ) : (
                      <div className="p-8 text-center rounded-3xl bg-white border border-[#D5A3AE]/50 text-gray-500">
                        Select a branch from the visual mind map to inspect its details.
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* ===================================================================== */}
              {/* SUB-VIEW 2: FULL CHAPTER TREE EXPLORER (OUTLINE VIEW FOR MOBILE/PRINT)  */}
              {/* ===================================================================== */}
              {mindMapViewType === 'treeExplorer' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-3xl bg-[#FAF4EE] border-2 border-[#D5A3AE]/60 space-y-2">
                    <h3 className="font-extrabold text-base text-[#722F45]">
                      Chapter {currentMindMap.chapterNumber}: {currentMindMap.chapterName} &bull; Full Concept Tree
                    </h3>
                    <p className="text-xs text-[#6C555C]">
                      {currentMindMap.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentMindMap.branches.map((b, idx) => {
                      const theme = COLOR_THEMES[b.colorTheme];
                      return (
                        <div
                          key={b.id}
                          className={`p-6 rounded-3xl border-2 shadow-xs flex flex-col justify-between space-y-4 ${theme.lightBg} ${theme.nodeBorder}`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-xl text-white flex items-center justify-center bg-linear-to-r ${theme.gradient}`}>
                                  {renderIconByName(b.iconName, "w-4 h-4")}
                                </div>
                                <h4 className="font-extrabold text-sm text-[#2D2226]">
                                  {idx + 1}. {b.title}
                                </h4>
                              </div>
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${theme.badgeBg}`}>
                                Branch {idx + 1}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                                Meaning:
                              </span>
                              <p className="text-xs text-[#2D2226] leading-relaxed">
                                {b.whatDoesItMean}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] block">
                                Key Points:
                              </span>
                              <ul className="space-y-1 text-xs text-[#2D2226]">
                                {b.keyPoints.map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span className="leading-snug">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {b.formula && (
                              <div className="p-2.5 rounded-xl bg-white border border-black/10 text-xs font-mono font-bold text-[#722F45]">
                                {b.formula}
                              </div>
                            )}

                            {b.example && (
                              <div className="p-2.5 rounded-xl bg-black/5 text-xs text-[#2D2226]">
                                <strong className="text-[#722F45]">Example: </strong>{b.example}
                              </div>
                            )}

                            {b.realLifeApp && (
                              <div className="p-2.5 rounded-xl bg-emerald-100/70 text-xs text-emerald-950">
                                <strong>Real-Life: </strong>{b.realLifeApp}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* DISPLAY MODE 2: STICKY NOTES DISPLAY                                       */}
      {/* ========================================================================= */}
      {displayMode === 'stickyNotes' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white border border-[#D5A3AE]/60 flex items-center justify-between gap-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#722F45]">
              Digital Sticky Notes View ({filteredStickyNotes.length} Notes)
            </h3>
            <span className="text-[11px] text-[#6C555C]">
              Showing notes for {selectedSubject}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStickyNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl border-2 border-amber-200 bg-[#FEF9C3] shadow-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-300 text-amber-950 px-2 py-0.5 rounded">
                    Ch {note.chapterNumber}: {note.chapterName}
                  </span>
                  <span className="text-[10px] font-bold text-amber-900">{note.subject}</span>
                </div>

                <h4 className="font-extrabold text-sm text-[#2D2226]">{note.originalConceptName}</h4>
                <p className="text-xs text-gray-800 leading-relaxed">{note.whatIsIt}</p>

                {note.formula && (
                  <div className="p-2.5 rounded-xl bg-white text-xs font-mono font-bold text-[#722F45] border border-amber-300">
                    {note.formula}
                  </div>
                )}

                {note.example && (
                  <div className="p-2 rounded-lg bg-black/5 text-[11px] text-gray-800">
                    <strong>Example: </strong>{note.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
