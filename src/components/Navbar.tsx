import React from 'react';
import { 
  Compass, GraduationCap, Sparkles, User, BrainCircuit, 
  FileCheck, Map, Target, Bot, Briefcase, BookOpen, Layers, MessageSquare, Gamepad2
} from 'lucide-react';
import { StudentProfile } from '../types';

export type NavTab = 
  | 'home' 
  | 'quiz' 
  | 'explorer' 
  | 'games'
  | 'assessments' 
  | 'roadmap' 
  | 'skill-gaps' 
  | 'chat'
  | 'mentor' 
  | 'careers' 
  | 'study-hub' 
  | 'ai-readiness' 
  | 'profile';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  profile: StudentProfile | null;
  onOpenProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenProfileModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#E8D5C4]/95 backdrop-blur-md border-b border-[#D5A3AE]/50 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-[#722F45] text-white flex items-center justify-center shadow-md group-hover:bg-[#5C2436] transition-colors">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-accent text-2xl font-bold tracking-tight text-[#722F45]">
                  PathFinder
                </span>
                <span className="text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-[#D5A3AE]/30 text-[#722F45] border border-[#D5A3AE]">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#6C555C] tracking-wide">
                Student Growth &amp; AI Readiness
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C4057]" />
              Find Stream
            </button>

            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'explorer'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Courses
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'games'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
              Games
            </button>

            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'assessments'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              Assessments
            </button>

            {/* Core Feature 2: Roadmap */}
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <Map className="w-3.5 h-3.5 text-[#722F45]" />
              Roadmap
            </button>

            {/* Core Feature 3: Skill Gap Tracker */}
            <button
              onClick={() => setActiveTab('skill-gaps')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'skill-gaps'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#8C4057]" />
              Skill Gaps
            </button>

            {/* AI Chatbot */}
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#722F45]" />
              AI Chat
            </button>

            {/* Core Feature 4: Mentor Portal */}
            <button
              onClick={() => setActiveTab('mentor')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'mentor'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-[#722F45]" />
              Mentorship
            </button>

            {/* Careers & Salary */}
            <button
              onClick={() => setActiveTab('careers')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'careers'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Careers
            </button>

            {/* Study Hub */}
            <button
              onClick={() => setActiveTab('study-hub')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'study-hub'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Study Hub
            </button>

            <button
              onClick={() => setActiveTab('ai-readiness')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'ai-readiness'
                  ? 'bg-[#722F45] text-white shadow-xs'
                  : 'text-[#2D2226] hover:text-[#722F45] hover:bg-[#D5A3AE]/20'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              AI Readiness
            </button>
          </nav>

          {/* Medium Screens (lg) Compact Grouping */}
          <nav className="hidden md:flex xl:hidden items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-2 py-1.5 rounded-lg ${activeTab === 'home' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-2 py-1.5 rounded-lg ${activeTab === 'explorer' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'}`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-2 py-1.5 rounded-lg ${activeTab === 'assessments' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'}`}
            >
              Assessments
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-2 py-1.5 rounded-lg ${activeTab === 'roadmap' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'}`}
            >
              Roadmap
            </button>
            <button
              onClick={() => setActiveTab('skill-gaps')}
              className={`px-2 py-1.5 rounded-lg ${activeTab === 'skill-gaps' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'}`}
            >
              Gaps
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-2 py-1.5 rounded-lg flex items-center gap-1 ${activeTab === 'chat' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'}`}
            >
              <MessageSquare className="w-3 h-3" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('mentor')}
              className={`px-2 py-1.5 rounded-lg ${activeTab === 'mentor' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'}`}
            >
              Mentor
            </button>
            <button
              onClick={() => setActiveTab('study-hub')}
              className={`px-2 py-1.5 rounded-lg ${activeTab === 'study-hub' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'}`}
            >
              Study Hub
            </button>
          </nav>

          {/* Student Profile CTA */}
          <div className="flex items-center gap-2 shrink-0">
            {profile ? (
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF4EE] hover:bg-[#D5A3AE]/20 border border-[#D5A3AE]/60 text-[#722F45] text-xs font-semibold transition-all shadow-xs text-left cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#722F45] text-white flex items-center justify-center font-bold text-xs">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="font-bold truncate max-w-[110px] text-[13px] text-[#722F45]">{profile.name}</p>
                  <p className="text-[10px] text-[#6C555C] truncate max-w-[110px]">
                    {profile.specialization || profile.streamOrGroup || profile.educationLevel}
                  </p>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenProfileModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Student Onboarding</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="xl:hidden border-t border-[#D5A3AE]/40 bg-[#FAF4EE] px-3 py-2 overflow-x-auto flex items-center gap-1.5 text-xs font-medium no-scrollbar">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'home' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'quiz' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Stream Quiz
        </button>
        <button
          onClick={() => setActiveTab('explorer')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'explorer' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab('games')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'games' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Games
        </button>
        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'assessments' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Assessments
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'roadmap' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Roadmap
        </button>
        <button
          onClick={() => setActiveTab('skill-gaps')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'skill-gaps' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Skill Gaps
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer flex items-center gap-1 ${
            activeTab === 'chat' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          <MessageSquare className="w-3 h-3" />
          AI Chat
        </button>
        <button
          onClick={() => setActiveTab('mentor')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'mentor' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Mentorship
        </button>
        <button
          onClick={() => setActiveTab('careers')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'careers' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Careers
        </button>
        <button
          onClick={() => setActiveTab('study-hub')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'study-hub' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Study Hub
        </button>
        <button
          onClick={() => setActiveTab('ai-readiness')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'ai-readiness' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          AI Readiness
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'profile' ? 'bg-[#722F45] text-white font-bold' : 'text-[#2D2226]'
          }`}
        >
          Portfolio
        </button>
      </div>
    </header>
  );
};
