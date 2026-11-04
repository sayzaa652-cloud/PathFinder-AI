import React, { useState } from 'react';
import { 
  Briefcase, DollarSign, TrendingUp, Sparkles, FolderGit2, 
  Layers, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight,
  Globe, Building2, Code2, Cpu, Stethoscope, Scale, BarChart3
} from 'lucide-react';
import { SALARY_INSIGHTS_DATA, INDUSTRY_PROJECTS_DATA, CROSS_DISCIPLINARY_MAP } from '../data/careerAndSalaryData';
import { StudentProfile } from '../types';

interface CareerGuidanceSectionProps {
  profile: StudentProfile | null;
  onExploreCourses: () => void;
  onOpenRoadmap: () => void;
}

export const CareerGuidanceSection: React.FC<CareerGuidanceSectionProps> = ({
  profile,
  onExploreCourses,
  onOpenRoadmap
}) => {
  const [activeTab, setActiveTab] = useState<'salary' | 'projects' | 'cross_disciplinary'>('salary');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [selectedProjectLevel, setSelectedProjectLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Capstone'>('All');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = selectedProjectLevel === 'All'
    ? INDUSTRY_PROJECTS_DATA
    : INDUSTRY_PROJECTS_DATA.filter((p) => p.level === selectedProjectLevel);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/25 px-3 py-1 rounded-full border border-[#D5A3AE]">
          Careers &amp; Future Jobs
        </span>
        <h1 className="text-3xl font-extrabold text-[#722F45] mt-2 font-serif-accent">
          Career Guidance, Salaries &amp; Projects
        </h1>
        <p className="text-sm text-[#6C555C] mt-1 leading-relaxed">
          Explore real salary ranges in India and abroad, practice hands-on projects for your resume, and discover how combining subjects opens up exciting new careers.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#DFCEBE] border border-[#D5A3AE]/50 shadow-inner">
          <button
            onClick={() => setActiveTab('salary')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'salary'
                ? 'bg-[#722F45] text-white shadow-md'
                : 'text-[#2D2226] hover:text-[#722F45]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Salary Ranges</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#722F45] text-white shadow-md'
                : 'text-[#2D2226] hover:text-[#722F45]'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Hands-On Projects</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
              {INDUSTRY_PROJECTS_DATA.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('cross_disciplinary')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cross_disciplinary'
                ? 'bg-[#722F45] text-white shadow-md'
                : 'text-[#2D2226] hover:text-[#722F45]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Combined Career Paths</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SALARY RANGES */}
      {activeTab === 'salary' && (
        <div className="space-y-6">
          
          {/* Currency Toggle & Info Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/50">
            <div className="text-xs text-[#6C555C]">
              Showing salary estimates for jobs in India and international companies.
            </div>

            <div className="flex items-center gap-1 bg-[#DFCEBE] p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currency === 'INR' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'
                }`}
              >
                INR (₹ Lakhs / year)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currency === 'USD' ? 'bg-[#722F45] text-white' : 'text-[#2D2226]'
                }`}
              >
                USD ($ / year Global)
              </button>
            </div>
          </div>

          {/* Salary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SALARY_INSIGHTS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 hover:border-[#722F45] transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/25 px-2 py-0.5 rounded">
                      {item.industry}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#722F45] leading-snug">
                    {item.roleTitle}
                  </h3>

                  {/* Salary Brackets */}
                  <div className="mt-4 space-y-2 text-xs bg-white/70 p-3.5 rounded-xl border border-[#D5A3AE]/40">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6C555C] font-medium">Starting (0-2 years):</span>
                      <strong className="text-[#722F45]">
                        {currency === 'INR' ? item.entryLevelINR : item.entryLevelUSD}
                      </strong>
                    </div>

                    {currency === 'INR' && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#6C555C] font-medium">Mid-Career (3-6 years):</span>
                        <strong className="text-[#2D2226]">{item.midLevelINR}</strong>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[#6C555C] font-medium">Senior / Lead (7+ years):</span>
                      <strong className="text-emerald-700">
                        {currency === 'INR' ? item.seniorLevelINR : item.seniorLevelUSD}
                      </strong>
                    </div>
                  </div>

                  {/* Top Hiring Sectors */}
                  <div className="mt-4">
                    <p className="text-[11px] font-bold text-[#2D2226] mb-1.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#722F45]" />
                      Top Companies &amp; Sectors Hiring:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.topHiringSectors.map((sector, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#DFCEBE]/50 text-[#722F45] font-medium"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Impact */}
                  <div className="mt-4 p-3 rounded-xl bg-[#DFCEBE]/30 border border-[#D5A3AE]/40 text-[11px] text-[#6C555C] leading-relaxed flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#8C4057] shrink-0 mt-0.5" />
                    <span><strong>How AI Changes This Role: </strong>{item.aiImpactProjection}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#D5A3AE]/30">
                  <button
                    onClick={onOpenRoadmap}
                    className="w-full py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Learning Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: INDUSTRY PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          
          {/* Level Filter Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/50">
            <span className="text-xs font-bold text-[#722F45]">Filter by Project Level:</span>
            <div className="flex items-center gap-1">
              {(['All', 'Beginner', 'Intermediate', 'Capstone'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedProjectLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedProjectLevel === lvl
                      ? 'bg-[#722F45] text-white shadow-xs'
                      : 'bg-white/60 text-[#2D2226] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs hover:border-[#722F45] transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5A3AE]/40 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        project.level === 'Capstone'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : project.level === 'Intermediate'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {project.level} Level
                      </span>
                      <span className="text-xs text-[#6C555C] font-semibold">{project.domain}</span>
                    </div>
                    <h3 className="font-bold text-base text-[#722F45]">{project.title}</h3>
                  </div>

                  <span className="text-xs font-semibold text-[#722F45] bg-[#D5A3AE]/20 px-3 py-1 rounded-lg border border-[#D5A3AE]/40 self-start sm:self-auto">
                    Resume Ready
                  </span>
                </div>

                {/* Problem Statement */}
                <div>
                  <h4 className="text-xs font-bold text-[#2D2226] mb-1">Project Goal:</h4>
                  <p className="text-xs text-[#6C555C] leading-relaxed">{project.problemStatement}</p>
                </div>

                {/* Expected Output */}
                <div className="p-3 rounded-xl bg-white/70 border border-[#D5A3AE]/40 text-xs">
                  <strong className="text-[#722F45]">What You Will Build: </strong>
                  <span className="text-[#2D2226]">{project.expectedOutput}</span>
                </div>

                {/* Tech Stack & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-bold text-[#2D2226] mb-1.5 flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-[#722F45]" />
                      Tools &amp; Languages:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[11px] bg-[#DFCEBE]/60 text-[#722F45] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-[#2D2226] mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Key Skills You Will Learn:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.skillsPracticed.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[11px] bg-white border border-[#D5A3AE]/40 text-[#2D2226]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Integration Note */}
                <div className="p-3 rounded-xl bg-[#DFCEBE]/30 border border-[#D5A3AE]/40 text-xs text-[#6C555C] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C4057] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#722F45]">AI &amp; Safety Note: </strong>
                    <span>{project.aiIntegrationNote}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: CROSS-DISCIPLINARY PATHWAYS */}
      {activeTab === 'cross_disciplinary' && (
        <div className="space-y-6">
          
          <div className="p-5 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/50 text-xs text-[#6C555C] leading-relaxed">
            <strong className="text-[#722F45]">Why Combining Subjects Matters: </strong>
            Today's top careers combine skills from different areas. For example, knowing biology with computer coding, or finance with data analysis, opens doors to higher-paying and more future-proof jobs.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CROSS_DISCIPLINARY_MAP.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/25 px-2.5 py-1 rounded-md border border-[#D5A3AE]/50">
                    {item.pair}
                  </span>

                  <h3 className="font-bold text-base text-[#722F45] mt-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6C555C] mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-[11px] font-bold text-[#2D2226] mb-1">Key Skills from Both Fields:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.keySkills.map((sk, skIdx) => (
                          <span
                            key={skIdx}
                            className="px-2 py-0.5 rounded text-[11px] bg-white border border-[#D5A3AE]/50 text-[#722F45] font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-[#2D2226] mb-1">Exciting New Careers:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.careerTitles.map((title, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] bg-[#DFCEBE]/60 text-[#2D2226] font-semibold"
                          >
                            {title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D5A3AE]/30">
                  <button
                    onClick={onExploreCourses}
                    className="w-full py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Browse Matching Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
