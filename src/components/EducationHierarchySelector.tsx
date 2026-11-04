import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, BookOpen, Wrench, Award, Briefcase, Compass,
  ChevronRight, Search, CheckCircle2, ArrowRight, PlayCircle, Filter
} from 'lucide-react';
import { EDUCATION_LEVELS, ALL_BOARDS, BSC_STUDY_TYPES } from '../data/educationData';
import { EducationLevelId, EducationCourse, EducationBranchOrGroup, EducationSpecialization } from '../types';

interface EducationHierarchySelectorProps {
  onStartAssessment: (educationLevel: string, courseOrGroup: string, specialization: string, boardName?: string, customSubjects?: string[]) => void;
  onSetAsProfile?: (specialization: string, group: string, level: string, studyType?: string) => void;
}

export const EducationHierarchySelector: React.FC<EducationHierarchySelectorProps> = ({
  onStartAssessment,
  onSetAsProfile
}) => {
  const [selectedLevelId, setSelectedLevelId] = useState<EducationLevelId>('intermediate');
  const [selectedQualificationId, setSelectedQualificationId] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [selectedSpecializationId, setSelectedSpecializationId] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('First Year (11th)');
  const [selectedBoard, setSelectedBoard] = useState<string>('Telangana Intermediate (TSBIE)');
  const [selectedSemester, setSelectedSemester] = useState<string>('Semester 1');
  const [selectedStudyType, setSelectedStudyType] = useState<string>('B.Sc. Honours');
  const [customSubjectsInput, setCustomSubjectsInput] = useState<string>('Mathematics, Economics, Computer Science');
  const [searchQuery, setSearchQuery] = useState('');

  // Current Level
  const currentLevel = useMemo(() => {
    return EDUCATION_LEVELS.find((l) => l.id === selectedLevelId) || EDUCATION_LEVELS[1];
  }, [selectedLevelId]);

  // Current Qualification
  const currentQualification = useMemo(() => {
    if (!currentLevel.qualifications.length) return null;
    return (
      currentLevel.qualifications.find((q) => q.id === selectedQualificationId) ||
      currentLevel.qualifications[0]
    );
  }, [currentLevel, selectedQualificationId]);

  // Current Course
  const currentCourse = useMemo(() => {
    if (!currentQualification || !currentQualification.courses.length) return null;
    return (
      currentQualification.courses.find((c) => c.id === selectedCourseId) ||
      currentQualification.courses[0]
    );
  }, [currentQualification, selectedCourseId]);

  // Current Branch / Group
  const currentBranch = useMemo(() => {
    if (!currentCourse || !currentCourse.branchesOrGroups.length) return null;
    return (
      currentCourse.branchesOrGroups.find((b) => b.id === selectedBranchId) ||
      currentCourse.branchesOrGroups[0]
    );
  }, [currentCourse, selectedBranchId]);

  // Current Specialization
  const currentSpecialization = useMemo(() => {
    if (!currentBranch || !currentBranch.specializations.length) return null;
    return (
      currentBranch.specializations.find((s) => s.id === selectedSpecializationId) ||
      currentBranch.specializations[0]
    );
  }, [currentBranch, selectedSpecializationId]);

  // Global search across all 300+ items
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    const matches: Array<{
      levelName: string;
      levelId: EducationLevelId;
      qualId: string;
      courseId: string;
      branchId: string;
      courseName: string;
      branchName: string;
      spec: EducationSpecialization;
    }> = [];

    EDUCATION_LEVELS.forEach((lvl) => {
      lvl.qualifications.forEach((qual) => {
        qual.courses.forEach((crs) => {
          crs.branchesOrGroups.forEach((br) => {
            br.specializations.forEach((sp) => {
              if (
                sp.title.toLowerCase().includes(q) ||
                br.title.toLowerCase().includes(q) ||
                crs.title.toLowerCase().includes(q) ||
                (sp.description && sp.description.toLowerCase().includes(q))
              ) {
                matches.push({
                  levelName: lvl.name,
                  levelId: lvl.id,
                  qualId: qual.id,
                  courseId: crs.id,
                  branchId: br.id,
                  courseName: crs.title,
                  branchName: br.title,
                  spec: sp
                });
              }
            });
          });
        });
      });
    });

    return matches.slice(0, 50); // top 50 matches
  }, [searchQuery]);

  const handleLaunchAssessment = () => {
    if (!currentSpecialization || !currentLevel) return;
    const parsedCustomSubjects = customSubjectsInput
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    onStartAssessment(
      currentLevel.name,
      currentBranch?.title || currentCourse?.title || '',
      currentSpecialization.title,
      selectedBoard,
      parsedCustomSubjects
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D5A3AE]/50">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D5A3AE]/25 border border-[#D5A3AE] text-xs font-semibold text-[#722F45] mb-2 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#8C4057]" />
            <span>Course Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#722F45] tracking-tight font-serif-accent">
            Course Explorer &amp; Subject Selector
          </h1>
          <p className="text-sm text-[#6C555C] mt-1 max-w-2xl">
            Browse every course, stream, and subject. Pick your subject to start a quick 20-question practice test or save it to your profile.
          </p>
        </div>

        {/* Global Live Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#5A454C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses (e.g. MPC, B.Sc, B.Tech, Nursing)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D5A3AE]/70 bg-[#F5EDE4] text-xs text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5A454C] hover:text-[#722F45] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Global Live Search Results Mode */}
      {searchQuery.trim().length >= 2 && (
        <div className="p-6 rounded-2xl bg-[#F5EDE4] border-2 border-[#D5A3AE] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-[#722F45]">
              Search Results ({searchResults.length} matches found)
            </h3>
            <span className="text-xs text-[#5A454C]">Showing closest curriculum matches</span>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-sm text-[#5A454C] py-4 text-center">
              No matching courses found for &quot;{searchQuery}&quot;. Try exploring categories below.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {searchResults.map((item) => (
                <div
                  key={`${item.levelId}-${item.spec.id}`}
                  className="p-3.5 rounded-xl bg-[#E8D5C4] border border-[#D5A3AE]/60 hover:border-[#722F45] transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className="text-[10px] font-bold text-[#8C4057] uppercase tracking-wider">
                        {item.branchName}
                      </span>
                      {item.levelId === 'undergraduate' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
                          UG Bachelor
                        </span>
                      )}
                      {item.levelId === 'postgraduate' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#EDE7F6] text-[#512DA8] border border-[#D1C4E9]">
                          PG Master
                        </span>
                      )}
                      {item.levelId === 'intermediate' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2]">
                          Intermediate (+2)
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-[#2D2226] leading-snug">
                      {item.spec.title}
                    </h4>
                    <p className="text-[10px] text-[#5A454C] mt-0.5">
                      {item.levelName} · {item.courseName}
                    </p>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-[#D5A3AE]/40 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedLevelId(item.levelId);
                        setSelectedQualificationId(item.qualId);
                        setSelectedCourseId(item.courseId);
                        setSelectedBranchId(item.branchId);
                        setSelectedSpecializationId(item.spec.id);
                        setSearchQuery('');
                      }}
                      className="text-[11px] font-bold text-[#8C4057] hover:text-[#722F45] underline cursor-pointer"
                    >
                      View in Hierarchy
                    </button>
                    <button
                      onClick={() => onStartAssessment(item.levelName, item.branchName, item.spec.title)}
                      className="px-2.5 py-1 rounded-md bg-[#722F45] hover:bg-[#5C2436] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <span>Take 20 MCQs</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Dropdown Navigation Bar */}
      <div className="bg-[#F5EDE4] rounded-2xl border border-[#D5A3AE]/70 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5A3AE]/40 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#8C4057]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#722F45]">
              Direct Dropdown Selector &amp; Level Filter
            </h3>
          </div>
          <span className="text-[11px] text-[#5A454C]">
            Select and navigate across all educational levels, courses, and specializations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Level Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-[#722F45] mb-1">
              Education Category
            </label>
            <select
              value={selectedLevelId}
              onChange={(e) => {
                setSelectedLevelId(e.target.value as EducationLevelId);
                setSelectedQualificationId('');
                setSelectedCourseId('');
                setSelectedBranchId('');
                setSelectedSpecializationId('');
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#D5A3AE]/70 bg-[#E8D5C4] text-xs font-semibold text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
            >
              {EDUCATION_LEVELS.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-[#722F45] mb-1">
              Course / Degree Track
            </label>
            <select
              value={currentCourse?.id || ''}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                setSelectedBranchId('');
                setSelectedSpecializationId('');
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#D5A3AE]/70 bg-[#E8D5C4] text-xs font-semibold text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
            >
              {currentQualification?.courses.map((crs) => (
                <option key={crs.id} value={crs.id}>
                  {crs.title}
                </option>
              ))}
            </select>
          </div>

          {/* Branch / Group Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-[#722F45] mb-1">
              Branch / Group / Combination
            </label>
            <select
              value={currentBranch?.id || ''}
              onChange={(e) => {
                setSelectedBranchId(e.target.value);
                setSelectedSpecializationId('');
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#D5A3AE]/70 bg-[#E8D5C4] text-xs font-semibold text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
            >
              {currentCourse?.branchesOrGroups.map((br) => (
                <option key={br.id} value={br.id}>
                  {br.title}
                </option>
              ))}
            </select>
          </div>

          {/* Specialization Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-[#722F45] mb-1">
              Exact Specialization ({currentBranch?.specializations.length || 0})
            </label>
            <select
              value={currentSpecialization?.id || ''}
              onChange={(e) => setSelectedSpecializationId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#722F45] bg-[#E8D5C4] text-xs font-bold text-[#722F45] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
            >
              {currentBranch?.specializations.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* STEP 1: Main Education Category Navigation */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#8C4057] mb-3">
          Step 1: Choose Your Education Level
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {EDUCATION_LEVELS.map((level) => {
            const isSelected = selectedLevelId === level.id;
            return (
              <button
                key={level.id}
                onClick={() => {
                  setSelectedLevelId(level.id);
                  setSelectedQualificationId('');
                  setSelectedCourseId('');
                  setSelectedBranchId('');
                  setSelectedSpecializationId('');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? 'bg-[#722F45] text-white border-[#722F45] shadow-md ring-2 ring-[#722F45]/30'
                    : 'bg-[#F5EDE4] text-[#2D2226] border border-[#D5A3AE]/70 hover:border-[#722F45] hover:bg-[#D5A3AE]/25'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isSelected ? 'text-white/80' : 'text-[#8C4057]'
                  }`}>
                    {level.shortLabel}
                  </span>
                  <p className="font-bold text-xs mt-1 leading-tight line-clamp-2">
                    {level.name}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-white self-end shrink-0 mt-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Course & Stream Cluster */}
      {currentQualification && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Courses & Branches Selection */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Step 2A: Course Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C4057] mb-2">
                Step 2: Course / Stream Category
              </label>
              <div className="space-y-1.5">
                {currentQualification.courses.map((c) => {
                  const isSelected = (currentCourse?.id === c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCourseId(c.id);
                        setSelectedBranchId('');
                        setSelectedSpecializationId('');
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-left border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#D5A3AE]/25 text-[#722F45] border-[#722F45] shadow-xs ring-1 ring-[#722F45]'
                          : 'bg-white text-[#2D2226] border-[#D5A3AE]/50 hover:bg-[#FFF9F2] hover:border-[#D5A3AE]'
                      }`}
                    >
                      <span className="truncate">{c.title}</span>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-[#722F45]' : 'text-[#D5A3AE]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2B: Group / Branch Selection */}
            {currentCourse && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C4057] mb-2">
                  Step 3: Group / Branch / Combination
                </label>
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {currentCourse.branchesOrGroups.map((b) => {
                    const isSelected = (currentBranch?.id === b.id);
                    return (
                      <button
                        key={b.id}
                        onClick={() => {
                          setSelectedBranchId(b.id);
                          setSelectedSpecializationId('');
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-left border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#722F45] text-white border-[#722F45] shadow-xs'
                            : 'bg-white text-[#2D2226] border-[#D5A3AE]/50 hover:bg-[#FFF9F2]'
                        }`}
                      >
                        <div className="truncate mr-2">
                          <p className="font-bold truncate">{b.title}</p>
                          <p className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#6C555C]'}`}>
                            {b.specializations.length} specializations available
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Academic Board & Year Options */}
            <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/60 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-[#722F45]">Academic Context</h4>
              
              <div>
                <label className="block text-[11px] font-bold text-[#2D2226] mb-1">
                  Examination Board / University
                </label>
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#D5A3AE]/60 bg-white text-xs text-[#2D2226]"
                >
                  {ALL_BOARDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D2226] mb-1">Year of Study</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5A3AE]/60 bg-white text-xs text-[#2D2226]"
                  >
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2D2226] mb-1">Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5A3AE]/60 bg-white text-xs text-[#2D2226]"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Annual">Annual Exam</option>
                  </select>
                </div>
              </div>

              {(currentCourse?.id === 'ug_bsc' || currentCourse?.title.toLowerCase().includes('b.sc')) && (
                <div className="pt-2 border-t border-[#D5A3AE]/40">
                  <label className="block text-[11px] font-bold text-[#8C4057] mb-1">
                    B.Sc. Study Type / Track
                  </label>
                  <select
                    value={selectedStudyType}
                    onChange={(e) => setSelectedStudyType(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#722F45]/50 bg-white text-xs text-[#2D2226] focus:ring-1 focus:ring-[#722F45]"
                  >
                    {BSC_STUDY_TYPES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Every Single Specialization Listed Separately */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-[#FFF9F2] border border-[#D5A3AE]/60 shadow-md h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D5A3AE]/40 mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057]">
                      Step 4: Pick Your Subject or Specialization
                    </span>
                    <h3 className="font-bold text-base text-[#722F45]">
                      {currentBranch?.title || 'Available Subjects'}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#722F45] px-2.5 py-1 rounded bg-[#D5A3AE]/30 border border-[#D5A3AE]/60">
                    {currentBranch?.specializations.length || 0} Subjects
                  </span>
                </div>

                <p className="text-xs text-[#6C555C] mb-3">
                  Click any subject below to see what you will learn and start a quick 20-question practice test.
                </p>

                {/* Specializations Grid / List */}
                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {currentBranch?.specializations.map((spec) => {
                    const isSelected = (currentSpecialization?.id === spec.id);
                    return (
                      <div
                        key={spec.id}
                        onClick={() => setSelectedSpecializationId(spec.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#D5A3AE]/20 border-[#722F45] shadow-xs ring-1 ring-[#722F45]'
                            : 'bg-white border-[#D5A3AE]/40 hover:border-[#722F45] hover:bg-[#FFF1DF]/40'
                        }`}
                      >
                        <div className="pr-3">
                          <p className={`text-xs font-bold leading-snug ${isSelected ? 'text-[#722F45]' : 'text-[#2D2226]'}`}>
                            {spec.title}
                          </p>
                          {spec.description && (
                            <p className="text-[11px] text-[#6C555C] mt-0.5 line-clamp-1">
                              {spec.description}
                            </p>
                          )}
                        </div>
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#722F45] text-white flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#D5A3AE] shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Custom Subject Combination Input Field */}
                {(currentBranch?.id === 'custom_inter_group' || currentSpecialization?.id === 'custom_inter_spec' || currentSpecialization?.title.toLowerCase().includes('custom')) && (
                  <div className="p-4 rounded-xl bg-white border-2 border-[#722F45]/40 mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#722F45] uppercase tracking-wider">
                        Enter Your Actual Subjects
                      </label>
                      <span className="text-[10px] font-bold text-white bg-[#722F45] px-2 py-0.5 rounded-full">
                        + 10 Aptitude Included
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5A454C]">
                      Type your intermediate subjects separated by commas to tailor the questions:
                    </p>
                    <input
                      type="text"
                      value={customSubjectsInput}
                      onChange={(e) => setCustomSubjectsInput(e.target.value)}
                      placeholder="e.g. Mathematics, Economics, Commerce, Computer Science"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5A3AE] text-xs font-medium text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Commerce', 'Civics', 'History', 'Computer Science'].map((subj) => (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => {
                            const current = customSubjectsInput ? customSubjectsInput.split(',').map((s) => s.trim()) : [];
                            if (!current.includes(subj)) {
                              setCustomSubjectsInput([...current, subj].join(', '));
                            }
                          }}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF4EE] border border-[#D5A3AE] text-[#722F45] hover:bg-[#D5A3AE]/30 cursor-pointer font-semibold"
                        >
                          + {subj}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Assessment Launcher Footer */}
              {currentSpecialization && (
                <div className="mt-6 pt-5 border-t border-[#D5A3AE]/50 bg-[#F9ECE0] -mx-6 -mb-6 p-6 rounded-b-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057]">
                        Ready for Practice
                      </span>
                      <h4 className="text-sm font-bold text-[#722F45] truncate max-w-md">
                        {currentSpecialization.title}
                      </h4>
                      <p className="text-[11px] text-[#6C555C]">
                        {currentBranch?.id === 'hec' || currentSpecialization?.id === 'hec_core' ? '25' : selectedLevelId === 'intermediate' ? '30' : '20'} Questions · Clear Explanations · Instant Results &amp; Tips
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {onSetAsProfile && (
                        <button
                          onClick={() => onSetAsProfile(
                            currentSpecialization.title,
                            currentBranch?.title || '',
                            currentLevel.name,
                            (currentCourse?.id === 'ug_bsc' || currentCourse?.title.toLowerCase().includes('b.sc')) ? selectedStudyType : undefined
                          )}
                          className="px-3 py-2 rounded-xl border border-[#D5A3AE] bg-white hover:bg-[#D5A3AE]/25 text-[#722F45] text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          Save to Profile
                        </button>
                      )}
                      
                      <button
                        onClick={handleLaunchAssessment}
                        className="px-5 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Start 20-Question Test</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
