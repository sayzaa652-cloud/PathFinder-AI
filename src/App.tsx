/**
 * PathFinder AI — Complete Student Growth & AI Readiness Platform
 * 
 * Visual Theme: Burgundy (#722F45), Warm Beige (#E8D5C4), Dusty Pink (#D5A3AE)
 * Features:
 * - 4 Mentor-Recommended Core Features:
 *   1. Skill Assessment (Academic Knowledge, Aptitude, Practical Skills & AI Readiness + Preserved 20-MCQ diagnostics)
 *   2. Personalized Learning Roadmap (Milestones, Prerequisites & Explainable AI rationale)
 *   3. Skill Gap Tracker & 4-Week Improvement Plan (Progressive Hints, Socratic Scaffolding & Reflection Prompts)
 *   4. AI Mentor & Mentor-in-the-Loop (Socratic Hint Assistant + Educator Review & Verification Portal)
 * - Career Guidance & Salary Insights (INR & USD, Entry/Mid/Senior Brackets, Capstone Projects & Interdisciplinary Pathways)
 * - Study Hub (Previous-Year Papers across Boards/Exams, Smart Study Planner, Smart Notes Flashcards)
 * - Preserved 20-MCQ Diagnostics for MPC, MBiPC, MEC, CEC, HEC and 300+ specializations
 * - 10-Question Stream Discovery Quiz
 * - Student Profile Management & Portfolio Export/Import
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudentOnboardingModal } from './components/StudentOnboardingModal';
import { EducationHierarchySelector } from './components/EducationHierarchySelector';
import { CareerInterestQuiz } from './components/CareerInterestQuiz';
import { AssessmentEngine } from './components/AssessmentEngine';
import { AIReadinessSection } from './components/AIReadinessSection';
import { ProfileView } from './components/ProfileView';

// Newly added mentor-recommended core features & hub components
import { PersonalizedLearningRoadmap } from './components/PersonalizedLearningRoadmap';
import { SkillGapTracker } from './components/SkillGapTracker';
import { MentorPortal } from './components/MentorPortal';
import { CareerGuidanceSection } from './components/CareerGuidanceSection';
import { StudyHubSection } from './components/StudyHubSection';
import { ComprehensiveSkillAssessment } from './components/ComprehensiveSkillAssessment';
import { AIChatView } from './components/AIChatView';
import { InteractiveGamesSection } from './components/InteractiveGamesSection';

import { Assessment, StudentProfile, AssessmentResult, CareerInterestResult } from './types';
import { storageService } from './services/storageService';
import { getOrGenerateAssessment } from './services/assessmentGenerator';
import { CURATED_ASSESSMENTS } from './data/curatedAssessments';
import { buildIntermediateStreamAssessment } from './data/intermediateStreamAssessments';
import { BrainCircuit, Sparkles, Target, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [profile, setProfile] = useState<StudentProfile | null>(() => storageService.getProfile());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Current active assessment
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);

  // Toggle for 4D Comprehensive Assessment inside Assessments tab
  const [isTaking4DAssessment, setIsTaking4DAssessment] = useState(false);
  
  // Records
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>(() => storageService.getAssessmentResults());
  const [careerInterest, setCareerInterest] = useState<CareerInterestResult | null>(() => storageService.getCareerInterestResult());

  // Refresh records on change
  useEffect(() => {
    setAssessmentResults(storageService.getAssessmentResults());
    setCareerInterest(storageService.getCareerInterestResult());
  }, [activeAssessment, activeTab, isTaking4DAssessment]);

  const handleSaveProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    storageService.saveProfile(newProfile);
  };

  const handleLaunchAssessment = (
    educationLevel: string, 
    courseOrGroup: string, 
    specialization: string,
    boardName?: string,
    customSubjects?: string[]
  ) => {
    const board = boardName || profile?.boardOrUniversity || 'Telangana Intermediate (TSBIE)';
    const assessment = getOrGenerateAssessment(educationLevel, courseOrGroup, specialization, board, customSubjects);
    setActiveAssessment(assessment);
    setIsTaking4DAssessment(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBenchmarkLaunch = (streamKey: string) => {
    setIsTaking4DAssessment(false);
    const board = profile?.boardOrUniversity || 'Telangana Intermediate (TSBIE)';
    const assessment = buildIntermediateStreamAssessment(streamKey, board) || CURATED_ASSESSMENTS[streamKey];
    if (assessment) {
      setActiveAssessment(assessment);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleLaunchAssessment('Intermediate (11th & 12th / +2)', streamKey.toUpperCase(), `${streamKey.toUpperCase()} Core`, board);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E8D5C4] text-[#2D2226] selection:bg-[#D5A3AE]/50 selection:text-[#722F45]">
      
      {/* Primary Navigation */}
      <Navbar
        activeTab={activeAssessment ? 'assessments' : activeTab}
        setActiveTab={(tab) => {
          setActiveAssessment(null);
          setIsTaking4DAssessment(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        profile={profile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* If an active test is running, render AssessmentEngine exclusively */}
        {activeAssessment ? (
          <AssessmentEngine
            assessment={activeAssessment}
            studentName={profile?.name || 'Student'}
            onExit={() => setActiveAssessment(null)}
            onRetake={() => {
              const fresh = getOrGenerateAssessment(
                activeAssessment.educationLevel,
                activeAssessment.courseOrGroup,
                activeAssessment.specialization,
                profile?.boardOrUniversity || 'Telangana Intermediate (TSBIE)'
              );
              setActiveAssessment(fresh);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewRoadmap={() => {
              setActiveAssessment(null);
              setActiveTab('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewSkillGaps={() => {
              setActiveAssessment(null);
              setActiveTab('skill-gaps');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <div className="space-y-12">
                <Hero
                  onGetStarted={() => setActiveTab('quiz')}
                  onExplore={() => setActiveTab('explorer')}
                  onTakeBenchmarkTest={handleBenchmarkLaunch}
                  onOpenChat={() => {
                    setActiveTab('chat');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                
                {/* 4 Mentor Core Features Showcase on Home */}
                <div className="max-w-6xl mx-auto px-4">
                  <div className="p-8 rounded-3xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-3 py-1 rounded-full border border-[#D5A3AE]">
                        Core Growth Engine
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#722F45] mt-2 font-serif-accent">
                        4 Pillars of Student Mastery &amp; AI Scaffolding
                      </h2>
                      <p className="text-xs text-[#6C555C] mt-1">
                        Designed with explainable guidance, progressive hints, and human educator validation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Pillar 1 */}
                      <div 
                        onClick={() => { setActiveTab('assessments'); setIsTaking4DAssessment(true); }}
                        className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/50 hover:border-[#722F45] transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold text-sm mb-3">
                            1
                          </div>
                          <h3 className="font-bold text-sm text-[#722F45] group-hover:text-[#5C2436]">
                            4D Skill Assessment
                          </h3>
                          <p className="text-xs text-[#6C555C] mt-1.5 leading-relaxed">
                            Academic knowledge, aptitude, practical application &amp; AI readiness.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#722F45] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Take Assessment &rarr;
                        </span>
                      </div>

                      {/* Pillar 2 */}
                      <div 
                        onClick={() => setActiveTab('roadmap')}
                        className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/50 hover:border-[#722F45] transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold text-sm mb-3">
                            2
                          </div>
                          <h3 className="font-bold text-sm text-[#722F45] group-hover:text-[#5C2436]">
                            Personalized Roadmap
                          </h3>
                          <p className="text-xs text-[#6C555C] mt-1.5 leading-relaxed">
                            Custom learning path with Explainable AI rationale &amp; reflection prompts.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#722F45] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          View Roadmap &rarr;
                        </span>
                      </div>

                      {/* Pillar 3 */}
                      <div 
                        onClick={() => setActiveTab('skill-gaps')}
                        className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/50 hover:border-[#722F45] transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold text-sm mb-3">
                            3
                          </div>
                          <h3 className="font-bold text-sm text-[#722F45] group-hover:text-[#5C2436]">
                            Skill Gap Tracker
                          </h3>
                          <p className="text-xs text-[#6C555C] mt-1.5 leading-relaxed">
                            Structured 4-week recovery plan with progressive hints and zero AI spoonfeeding.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#722F45] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Fix Skill Gaps &rarr;
                        </span>
                      </div>

                      {/* Pillar 4 */}
                      <div 
                        onClick={() => setActiveTab('mentor')}
                        className="p-5 rounded-2xl bg-white border border-[#D5A3AE]/50 hover:border-[#722F45] transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold text-sm mb-3">
                            4
                          </div>
                          <h3 className="font-bold text-sm text-[#722F45] group-hover:text-[#5C2436]">
                            AI &amp; Teacher Mentor
                          </h3>
                          <p className="text-xs text-[#6C555C] mt-1.5 leading-relaxed">
                            Socratic hint guide paired with Mentor-in-the-Loop teacher verification.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#722F45] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Consult Mentors &rarr;
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                <EducationHierarchySelector
                  onStartAssessment={handleLaunchAssessment}
                  profile={profile}
                  onSetAsProfile={(spec, group, level) => {
                    if (profile) {
                      const updated = { ...profile, specialization: spec, streamOrGroup: group, educationLevel: level };
                      handleSaveProfile(updated);
                    } else {
                      setIsProfileModalOpen(true);
                    }
                  }}
                />
              </div>
            )}

            {activeTab === 'quiz' && (
              <CareerInterestQuiz
                onSelectCourse={() => {
                  setActiveTab('explorer');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreHierarchy={() => setActiveTab('explorer')}
              />
            )}

            {activeTab === 'explorer' && (
              <EducationHierarchySelector
                onStartAssessment={handleLaunchAssessment}
                profile={profile}
                onSetAsProfile={(spec, group, level, studyType) => {
                  if (profile) {
                    const updated: StudentProfile = {
                      ...profile,
                      specialization: spec,
                      streamOrGroup: group,
                      branchOrCombination: group,
                      educationLevel: level,
                      ...(studyType ? { studyType } : {})
                    };
                    handleSaveProfile(updated);
                  } else {
                    setIsProfileModalOpen(true);
                  }
                }}
              />
            )}

            {activeTab === 'games' && (
              <InteractiveGamesSection />
            )}

            {activeTab === 'assessments' && (
              <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                
                {/* Check if student is currently taking the 4D assessment */}
                {isTaking4DAssessment ? (
                  <div>
                    <div className="mb-4">
                      <button
                        onClick={() => setIsTaking4DAssessment(false)}
                        className="text-xs font-bold text-[#722F45] hover:underline cursor-pointer"
                      >
                        &larr; Back to Diagnostic Assessments Catalog
                      </button>
                    </div>
                    <ComprehensiveSkillAssessment
                      profile={profile}
                      onViewRoadmap={() => setActiveTab('roadmap')}
                      onViewSkillGaps={() => setActiveTab('skill-gaps')}
                      onRetakeCurriculum20MCQ={(spec) => handleLaunchAssessment(profile?.educationLevel || 'Undergraduate', spec, spec)}
                    />
                  </div>
                ) : (
                  <>
                    {/* Hero Banner for 4-Dimensional Skill Assessment */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF4EE] border border-[#D5A3AE]/70 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-3 py-1 rounded-full border border-[#D5A3AE]">
                            Mentor Core Feature 1
                          </span>
                          <span className="text-xs font-bold text-[#8C4057]">
                            Comprehensive Diagnostic
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#722F45] font-serif-accent">
                          4-Dimensional Skill &amp; AI Readiness Assessment
                        </h2>
                        <p className="text-xs text-[#6C555C] leading-relaxed">
                          Holistically assess Academic Knowledge, Aptitude &amp; Logical Reasoning, Practical Domain Skills, and AI Readiness to calibrate your Personalized Roadmap and auto-populate your 4-week Skill Gap Tracker.
                        </p>
                      </div>

                      <button
                        onClick={() => setIsTaking4DAssessment(true)}
                        className="px-6 py-3.5 rounded-2xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-extrabold transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        <BrainCircuit className="w-4 h-4" />
                        <span>Launch 4D Assessment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-center max-w-3xl mx-auto pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/25 px-3 py-1 rounded-full border border-[#D5A3AE]">
                        Preserved &amp; Scalable 20-MCQ System
                      </span>
                      <h1 className="text-3xl font-extrabold text-[#722F45] mt-2 font-serif-accent">
                        Curriculum Benchmark Assessments
                      </h1>
                      <p className="text-sm text-[#6C555C] mt-1">
                        Select any standard benchmark assessment below or use the Course Explorer to generate an assessment for any of the 300+ specializations.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: 'mpc', title: '1. MPC — Mathematics, Physics, Chemistry', level: 'Intermediate', count: '30 Questions', desc: 'Mathematics: 8 · Physics: 6 · Chemistry: 6 · Dedicated Aptitude: 10. Foundational Class 10 concepts for First Year Intermediate.' },
                        { id: 'bipc', title: '2. BiPC — Biology, Physics, Chemistry', level: 'Intermediate', count: '30 Questions', desc: 'Biology: 8 · Physics: 6 · Chemistry: 6 · Dedicated Aptitude: 10. Foundational Class 10 concepts for First Year Intermediate.' },
                        { id: 'mec', title: '3. MEC — Mathematics, Economics, Commerce', level: 'Intermediate', count: '30 Questions', desc: 'Mathematics: 8 · Economics: 6 · Everyday Commerce: 6 · Dedicated Aptitude: 10. Practical business concepts without ledgers or debits.' },
                        { id: 'cec', title: '4. CEC — Civics, Economics, Commerce', level: 'Intermediate', count: '30 Questions', desc: 'Civics: 7 · Economics: 7 · Everyday Commerce: 6 · Dedicated Aptitude: 10. Governance, markets, and foundational civics.' },
                        { id: 'hec', title: '5. HEC — History, Economics, Civics', level: 'Intermediate', count: '25 Questions', desc: 'History: 5 · Economics: 5 · Civics: 5 · Dedicated Aptitude: 10. Indian independence, public economics, and democratic institutions.' },
                        { id: 'mbipc', title: '6. MBiPC — Maths, Biology, Physics, Chemistry', level: 'Intermediate', count: '30 Questions', desc: 'Mathematics: 6 · Biology: 5 · Physics: 5 · Chemistry: 4 · Dedicated Aptitude: 10. Comprehensive STEM dual eligibility.' },
                        { id: 'custom_inter_spec', title: '7. Other Specialization / Custom Combination', level: 'Intermediate', count: 'Custom + 10 Aptitude', desc: 'Enter your custom subjects (e.g. Geography, Sociology, Electronics) to receive tailored questions + 10 Aptitude questions.' }
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/50 hover:border-[#722F45] transition-all shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase text-[#722F45]">
                                {item.level}
                              </span>
                              <span className="text-[10px] font-bold text-[#722F45] px-2 py-0.5 rounded bg-[#D5A3AE]/30 border border-[#D5A3AE]/60">
                                {item.count}
                              </span>
                            </div>
                            <h3 className="font-bold text-sm text-[#722F45] leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs text-[#6C555C] mt-2 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                          <div className="mt-5 pt-3 border-t border-[#D5A3AE]/30">
                            <button
                              onClick={() => handleBenchmarkLaunch(item.id)}
                              className="w-full py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Launch Assessment</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Direct Link to Explorer for remaining specializations */}
                    <div className="p-6 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-center shadow-xs">
                      <h3 className="font-bold text-base text-[#722F45]">
                        Need an assessment for a specific specialization?
                      </h3>
                      <p className="text-xs text-[#6C555C] mt-1 max-w-lg mx-auto">
                        PathFinder AI provides scalable 20-MCQ diagnostics for all 61 Diplomas, 22 BBAs, 18 BCAs, 16 B.Coms, 74 B.Sc combinations, 55 B.Tech branches, 50 M.Techs, 30 M.Scs, and 26 Professional licensures.
                      </p>
                      <button
                        onClick={() => setActiveTab('explorer')}
                        className="mt-4 px-6 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        Open Course Hierarchy Explorer
                      </button>
                    </div>
                  </>
                )}

              </div>
            )}

            {/* Core Feature 2: Personalized Learning Roadmap */}
            {activeTab === 'roadmap' && (
              <PersonalizedLearningRoadmap
                profile={profile}
                assessmentResults={assessmentResults}
                onExploreCourses={() => setActiveTab('explorer')}
                onLaunchAssessment={(spec) => handleLaunchAssessment(profile?.educationLevel || 'Undergraduate', spec, spec)}
              />
            )}

            {/* Core Feature 3: Skill Gap Tracker */}
            {activeTab === 'skill-gaps' && (
              <SkillGapTracker
                profile={profile}
                assessmentResults={assessmentResults}
                onTakeAssessment={(spec) => handleLaunchAssessment(profile?.educationLevel || 'Undergraduate', spec, spec)}
              />
            )}

            {/* Conversational AI Chatbot (ChatGPT-style) */}
            {activeTab === 'chat' && (
              <AIChatView
                profile={profile}
                assessmentResults={assessmentResults}
              />
            )}

            {/* Core Feature 4: AI Socratic Mentor & Mentor-in-the-Loop */}
            {activeTab === 'mentor' && (
              <MentorPortal
                profile={profile}
                assessmentResults={assessmentResults}
                onExploreCourses={() => setActiveTab('explorer')}
                onOpenRoadmap={() => setActiveTab('roadmap')}
              />
            )}

            {/* Career Guidance, Salary Benchmarks & Capstone Projects */}
            {activeTab === 'careers' && (
              <CareerGuidanceSection
                profile={profile}
                onExploreCourses={() => setActiveTab('explorer')}
                onOpenRoadmap={() => setActiveTab('roadmap')}
              />
            )}

            {/* Study Hub: PYQs, Daily Study Planner, Smart Notes */}
            {activeTab === 'study-hub' && (
              <StudyHubSection
                onOpenRoadmap={() => setActiveTab('roadmap')}
                onLaunchAssessment={(spec) => handleLaunchAssessment(profile?.educationLevel || 'Undergraduate', spec, spec)}
              />
            )}

            {activeTab === 'ai-readiness' && (
              <AIReadinessSection
                profile={profile}
                onExploreCourses={() => setActiveTab('explorer')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                profile={profile}
                onEditProfile={() => setIsProfileModalOpen(true)}
                assessmentResults={assessmentResults}
                careerInterest={careerInterest}
                onRetakeAssessment={(spec) => {
                  handleLaunchAssessment(profile?.educationLevel || 'Undergraduate', spec, spec);
                }}
                onRetakeQuiz={() => {
                  setActiveTab('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}

      </main>

      {/* Student Onboarding & Profile Modal */}
      <StudentOnboardingModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialProfile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Footer */}
      {activeTab !== 'chat' && (
        <footer className="bg-[#FAF4EE] border-t border-[#D5A3AE]/50 py-8 mt-12 transition-colors text-xs text-[#6C555C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              &copy; {new Date().getFullYear()} PathFinder AI &mdash; Complete Student Growth &amp; AI Readiness Platform.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-[#722F45]">
              <button onClick={() => setActiveTab('chat')} className="hover:underline cursor-pointer">AI Chat</button>
              <button onClick={() => setActiveTab('roadmap')} className="hover:underline cursor-pointer">Learning Roadmap</button>
              <button onClick={() => setActiveTab('skill-gaps')} className="hover:underline cursor-pointer">Skill Gap Tracker</button>
              <button onClick={() => setActiveTab('mentor')} className="hover:underline cursor-pointer">Mentorship</button>
              <button onClick={() => setActiveTab('study-hub')} className="hover:underline cursor-pointer">Study Hub</button>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
