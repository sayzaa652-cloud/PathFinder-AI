import React from 'react';
import { ArrowRight, Compass, Sparkles, CheckCircle2, Award, BookOpen, BrainCircuit, MessageSquare } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onExplore: () => void;
  onTakeBenchmarkTest: (streamKey: string) => void;
  onOpenChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onGetStarted,
  onExplore,
  onTakeBenchmarkTest,
  onOpenChat
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#D5A3AE]/30 via-[#E8D5C4]/40 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D5A3AE]/25 border border-[#D5A3AE] text-xs font-semibold text-[#722F45] mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#8C4057]" />
          <span>Everything You Need to Learn, Grow, and Get Ready for AI</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#722F45] tracking-tight leading-[1.15] max-w-4xl mx-auto font-serif-accent">
          Discover Your Potential. <br className="hidden sm:inline" />
          <span className="text-[#8C4057] italic font-normal">Build Your Future.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-5 text-lg sm:text-xl text-[#6C555C] max-w-2xl mx-auto font-normal leading-relaxed">
          Your personal guide to explore careers, improve your skills, and prepare for the future with confidence.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Free Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#FAF4EE] border border-[#722F45]/30 text-[#722F45] font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#722F45]" />
              <span>Ask AI Anything</span>
            </button>
          )}

          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F5EDE4] hover:bg-[#D5A3AE]/30 border border-[#D5A3AE] text-[#722F45] font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Compass className="w-4 h-4" />
            <span>Browse All Courses</span>
          </button>
        </div>

        {/* Verified Feature Highlights */}
        <div className="mt-12 pt-8 border-t border-[#D5A3AE]/40 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          
          <div className="p-4 rounded-xl bg-[#F5EDE4] border border-[#D5A3AE]/60 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#D5A3AE]/30 text-[#722F45] flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-[#8C4057] uppercase tracking-wider">Stream Finder</p>
            <h4 className="text-sm font-bold text-[#2D2226] mt-0.5">Find Your Right Stream</h4>
            <p className="text-xs text-[#5A454C] mt-1">Answer 10 easy questions to discover which subjects fit your interests best.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F5EDE4] border border-[#D5A3AE]/60 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#D5A3AE]/30 text-[#722F45] flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-[#8C4057] uppercase tracking-wider">Course Guide</p>
            <h4 className="text-sm font-bold text-[#2D2226] mt-0.5">300+ Courses &amp; Degrees</h4>
            <p className="text-xs text-[#5A454C] mt-1">Easily explore Class 10, Intermediate (Class 11–12), Diplomas, Bachelor degrees, Law programs, and Master programs.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F5EDE4] border border-[#D5A3AE]/60 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#D5A3AE]/30 text-[#722F45] flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-[#8C4057] uppercase tracking-wider">Practice Tests</p>
            <h4 className="text-sm font-bold text-[#2D2226] mt-0.5">20-Question Tests</h4>
            <p className="text-xs text-[#5A454C] mt-1">Practice tests for MPC, MBiPC, MEC, CEC, and hundreds of college subjects.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F5EDE4] border border-[#D5A3AE]/60 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#D5A3AE]/30 text-[#722F45] flex items-center justify-center mb-3">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-[#8C4057] uppercase tracking-wider">Future Ready</p>
            <h4 className="text-sm font-bold text-[#2D2226] mt-0.5">AI Readiness Check</h4>
            <p className="text-xs text-[#5A454C] mt-1">Simple guides and tips to learn how AI is changing jobs in your field.</p>
          </div>

        </div>

        {/* Quick Launchpad for Key Intermediate Assessments */}
        <div className="mt-10 p-5 rounded-2xl bg-[#F5EDE4] border border-[#D5A3AE]/70 text-left shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-base text-[#722F45] font-serif-accent">
                Popular Intermediate Practice Tests
              </h3>
              <p className="text-xs text-[#5A454C]">
                Take our foundational practice tests with subject-wise breakdowns, dedicated Aptitude, and simple explanations.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#722F45] bg-[#D5A3AE]/30 border border-[#D5A3AE]/50 px-3 py-1 rounded-full w-fit">
              Class 10 Foundation · 10 Aptitude Questions · Board-Adaptive
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {[
              { id: 'mpc', label: 'MPC Stream', desc: '8 Math, 6 Phys, 6 Chem + 10 Apt' },
              { id: 'bipc', label: 'BiPC Stream', desc: '8 Bio, 6 Phys, 6 Chem + 10 Apt' },
              { id: 'mec', label: 'MEC Stream', desc: '8 Math, 6 Econ, 6 Comm + 10 Apt' },
              { id: 'cec', label: 'CEC Stream', desc: '7 Civ, 7 Econ, 6 Comm + 10 Apt' },
              { id: 'hec', label: 'HEC Stream', desc: '5 Hist, 5 Econ, 5 Civ + 10 Apt' },
              { id: 'mbipc', label: 'MBiPC 4-Subject', desc: '6 Math, 5 Bio, 5 Phys, 4 Chem + 10 Apt' },
              { id: 'mpc_cs', label: 'MPC with CS', desc: '6 Math, 4 Phys, 4 Chem, 6 CS + 10 Apt' },
              { id: 'bipc_cs', label: 'BiPC with CS', desc: '6 Bio, 4 Phys, 4 Chem, 6 CS + 10 Apt' },
              { id: 'mec_cs', label: 'MEC with CS', desc: '5 Math, 5 Econ, 5 Comm, 5 CS + 10 Apt' },
              { id: 'cec_cs', label: 'CEC with CS', desc: '5 Civ, 5 Econ, 5 Comm, 5 CS + 10 Apt' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onTakeBenchmarkTest(item.id)}
                className="p-3 rounded-xl bg-[#E8D5C4] border border-[#D5A3AE]/60 hover:border-[#722F45] hover:bg-[#D5A3AE]/25 transition-all text-left group cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#722F45] group-hover:text-[#5C2436]">
                    {item.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C4057] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-[#5A454C] mt-0.5 truncate">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
