import React, { useState, useMemo } from 'react';
import { X, Check, User, Sparkles, BookOpen } from 'lucide-react';
import { StudentProfile } from '../types';
import { EDUCATION_LEVELS, ALL_BOARDS, BSC_STUDY_TYPES } from '../data/educationData';

interface StudentOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile: StudentProfile | null;
  onSaveProfile: (profile: StudentProfile) => void;
}

const COMMON_INTERESTS = [
  'Artificial Intelligence', 'Software Development', 'Data Analysis', 'Web Design',
  'Biotechnology', 'Healthcare & Clinical Science', 'Financial Markets', 'Chartered Accounting',
  'Civil Services / UPSC', 'Corporate Law', 'Constitutional Law', 'Criminal Law & Forensics',
  'Cyber Law & IPR', 'Courtroom Advocacy & Moot Court', 'Robotics & Hardware', 'Business Entrepreneurship',
  'Creative Writing & Media', 'Psychology & Behavioral Science'
];

export const PREVIOUS_BACHELOR_DEGREES = [
  'B.A. (Bachelor of Arts)',
  'B.Sc. (Bachelor of Science)',
  'B.Com. (Bachelor of Commerce)',
  'B.Tech. / B.E. (Bachelor of Engineering / Technology)',
  'BBA (Bachelor of Business Administration)',
  'BCA (Bachelor of Computer Applications)',
  'Other Bachelor\'s Degree'
];

export const INTERMEDIATE_STREAMS = [
  'MPC (Mathematics, Physics, Chemistry)',
  'BiPC (Biology, Physics, Chemistry)',
  'MEC (Mathematics, Economics, Commerce)',
  'CEC (Civics, Economics, Commerce)',
  'HEC (History, Economics, Civics)',
  'Other / Vocational Stream'
];

export const COMPLETED_LLB_QUALIFICATIONS = [
  '3-Year LLB (After Graduation)',
  '5-Year Integrated BA LLB',
  '5-Year Integrated BBA LLB',
  '5-Year Integrated BCom LLB',
  '5-Year Integrated BSc LLB',
  'Other Equivalent Law Degree (e.g., Foreign LL.B)'
];

export const LLM_SPECIALIZATIONS = [
  'Constitutional & Administrative Law',
  'Corporate & Commercial Law',
  'Criminal Law & Criminal Justice Administration',
  'Cyber Law & Information Security',
  'Intellectual Property Rights (IPR)',
  'International Trade & Business Law',
  'Human Rights & Humanitarian Law',
  'Alternative Dispute Resolution (ADR) & Arbitration',
  'Taxation & Financial Regulation Law',
  'Environmental & Energy Law',
  'Other / General LLM'
];

export const StudentOnboardingModal: React.FC<StudentOnboardingModalProps> = ({
  isOpen,
  onClose,
  initialProfile,
  onSaveProfile
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [educationLevel, setEducationLevel] = useState(initialProfile?.educationLevel || 'Undergraduate Degree');
  const [boardOrUniversity, setBoardOrUniversity] = useState(initialProfile?.boardOrUniversity || 'Telangana Intermediate (TSBIE)');
  const [classOrDegree, setClassOrDegree] = useState(initialProfile?.classOrDegree || 'LLB — Bachelor of Laws (3-year degree after graduation)');
  const [streamOrGroup, setStreamOrGroup] = useState(initialProfile?.streamOrGroup || '3-Year LLB Legal Studies Track');
  const [course, setCourse] = useState(initialProfile?.course || 'LLB — Bachelor of Laws (3-year degree after graduation)');
  const [branchOrCombination, setBranchOrCombination] = useState(initialProfile?.branchOrCombination || '3-Year LLB Legal Studies Track');
  const [specialization, setSpecialization] = useState(initialProfile?.specialization || '1. General LLB & Civil Advocacy');
  const [studyType, setStudyType] = useState(initialProfile?.studyType || 'B.Sc. Honours');
  const [academicYear, setAcademicYear] = useState(initialProfile?.academicYear || '2025–2026');
  const [yearOfStudy, setYearOfStudy] = useState(initialProfile?.yearOfStudy || '1st Year');
  const [semester, setSemester] = useState(initialProfile?.semester || 'Semester 1');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialProfile?.interests || ['Corporate Law', 'Civil Services / UPSC']);
  const [customInterest, setCustomInterest] = useState('');
  const [careerGoals, setCareerGoals] = useState(initialProfile?.careerGoals || 'Aspiring Legal Advocate & Corporate Law Practitioner.');
  const [email, setEmail] = useState(initialProfile?.email || '');

  // Conditional Law State
  const [previousQualification, setPreviousQualification] = useState(initialProfile?.previousQualification || 'B.A. (Bachelor of Arts)');
  const [isCustomPrevQual, setIsCustomPrevQual] = useState(false);
  const [customPrevQual, setCustomPrevQual] = useState('');

  const [intermediateStream, setIntermediateStream] = useState(initialProfile?.intermediateStream || 'MPC (Mathematics, Physics, Chemistry)');
  const [isCustomInterStream, setIsCustomInterStream] = useState(false);
  const [customInterStream, setCustomInterStream] = useState('');

  const [completedLLBQual, setCompletedLLBQual] = useState(initialProfile?.previousQualification || '3-Year LLB (After Graduation)');
  const [isCustomCompletedLLB, setIsCustomCompletedLLB] = useState(false);
  const [customCompletedLLB, setCustomCompletedLLB] = useState('');

  const [llmSpecialization, setLlmSpecialization] = useState(initialProfile?.lawSpecialization || 'Corporate & Commercial Law');
  const [isCustomLlmSpec, setIsCustomLlmSpec] = useState(false);
  const [customLlmSpec, setCustomLlmSpec] = useState('');

  // Derived options based on selected education level
  const currentLevelConfig = useMemo(() => {
    return (
      EDUCATION_LEVELS.find((l) => l.name === educationLevel) ||
      EDUCATION_LEVELS.find((l) => l.shortLabel === educationLevel) ||
      (educationLevel.toLowerCase().includes('intermediate') ? EDUCATION_LEVELS.find((l) => l.id === 'intermediate') : undefined) ||
      EDUCATION_LEVELS[3]
    );
  }, [educationLevel]);

  const levelCourses = useMemo(() => {
    if (!currentLevelConfig) return [];
    return currentLevelConfig.qualifications.flatMap((q) => q.courses);
  }, [currentLevelConfig]);

  const currentCourseObj = useMemo(() => {
    return (
      levelCourses.find((c) => c.title === classOrDegree || c.id === classOrDegree) ||
      levelCourses[0]
    );
  }, [levelCourses, classOrDegree]);

  const courseBranches = useMemo(() => {
    if (!currentCourseObj) return [];
    return currentCourseObj.branchesOrGroups;
  }, [currentCourseObj]);

  const currentBranchObj = useMemo(() => {
    return (
      courseBranches.find((b) => b.title === branchOrCombination || b.id === branchOrCombination) ||
      courseBranches[0]
    );
  }, [courseBranches, branchOrCombination]);

  const branchSpecializations = useMemo(() => {
    if (!currentBranchObj) return [];
    return currentBranchObj.specializations;
  }, [currentBranchObj]);

  const [isCustomDegree, setIsCustomDegree] = useState(false);
  const [isCustomBranch, setIsCustomBranch] = useState(false);
  const [isCustomSpec, setIsCustomSpec] = useState(false);
  const [isCustomStudyType, setIsCustomStudyType] = useState(false);

  const isBSc = useMemo(() => {
    const text = `${classOrDegree} ${course} ${educationLevel}`.toLowerCase();
    return (text.includes('b.sc') || text.includes('bachelor of science')) && !text.includes('bsc llb') && !text.includes('b.sc. llb');
  }, [classOrDegree, course, educationLevel]);

  // Law course recognition
  const isLawCourse = useMemo(() => {
    const text = `${classOrDegree} ${course}`.toLowerCase();
    return (
      text.includes('llb') ||
      text.includes('bachelor of laws') ||
      text.includes('llm') ||
      text.includes('master of laws')
    );
  }, [classOrDegree, course]);

  // 3-Year LLB (After Graduation)
  const is3YearLLB = useMemo(() => {
    const text = `${classOrDegree} ${course}`.toLowerCase();
    return (
      (text.includes('llb') && !text.includes('ba llb') && !text.includes('bba llb') && !text.includes('bcom llb') && !text.includes('bsc llb')) ||
      text.includes('3-year degree after graduation') ||
      text.includes('3-year llb')
    );
  }, [classOrDegree, course]);

  // 5-Year Integrated Law (BA LLB, BBA LLB, BCom LLB, BSc LLB)
  const is5YearIntegratedLaw = useMemo(() => {
    const text = `${classOrDegree} ${course}`.toLowerCase();
    return (
      text.includes('ba llb') ||
      text.includes('bba llb') ||
      text.includes('bcom llb') ||
      text.includes('bsc llb') ||
      text.includes('5-year integrated')
    );
  }, [classOrDegree, course]);

  // Postgraduate LLM
  const isLLM = useMemo(() => {
    const text = `${classOrDegree} ${course}`.toLowerCase();
    return text.includes('llm') || text.includes('master of laws');
  }, [classOrDegree, course]);

  // When education level changes, sync course, branch, and specialization
  const handleLevelChange = (newLevelName: string) => {
    setEducationLevel(newLevelName);
    const lvl = (
      EDUCATION_LEVELS.find((l) => l.name === newLevelName) ||
      (newLevelName.toLowerCase().includes('intermediate') ? EDUCATION_LEVELS.find((l) => l.id === 'intermediate') : undefined)
    );
    if (lvl && lvl.qualifications.length && lvl.qualifications[0].courses.length) {
      const firstCourse = lvl.qualifications[0].courses[0];
      setClassOrDegree(firstCourse.title);
      setCourse(firstCourse.title);
      setIsCustomDegree(false);
      if (firstCourse.branchesOrGroups.length) {
        const firstBranch = firstCourse.branchesOrGroups[0];
        setStreamOrGroup(firstBranch.title);
        setBranchOrCombination(firstBranch.title);
        setIsCustomBranch(false);
        if (firstBranch.specializations.length) {
          setSpecialization(firstBranch.specializations[0].title);
          setIsCustomSpec(false);
        }
      }
    }
  };

  const handleCourseChange = (courseTitle: string) => {
    if (courseTitle === '__custom__') {
      setIsCustomDegree(true);
      return;
    }
    setIsCustomDegree(false);
    setClassOrDegree(courseTitle);
    setCourse(courseTitle);

    // Adjust years and semesters for Law degrees
    const lower = courseTitle.toLowerCase();
    if (lower.includes('5-year integrated') || lower.includes('ba llb') || lower.includes('bba llb') || lower.includes('bcom llb') || lower.includes('bsc llb')) {
      setYearOfStudy('1st Year');
      setSemester('Semester 1');
    } else if (lower.includes('3-year') || lower.includes('llb')) {
      setYearOfStudy('1st Year');
      setSemester('Semester 1');
    } else if (lower.includes('llm')) {
      setYearOfStudy('1st Year');
      setSemester('Semester 1');
    }

    const crs = levelCourses.find((c) => c.title === courseTitle);
    if (crs && crs.branchesOrGroups.length) {
      const firstBranch = crs.branchesOrGroups[0];
      setStreamOrGroup(firstBranch.title);
      setBranchOrCombination(firstBranch.title);
      setIsCustomBranch(false);
      if (firstBranch.specializations.length) {
        setSpecialization(firstBranch.specializations[0].title);
        setIsCustomSpec(false);
      }
    }
  };

  const handleBranchChange = (branchTitle: string) => {
    if (branchTitle === '__custom__') {
      setIsCustomBranch(true);
      return;
    }
    setIsCustomBranch(false);
    setStreamOrGroup(branchTitle);
    setBranchOrCombination(branchTitle);
    const br = courseBranches.find((b) => b.title === branchTitle);
    if (br && br.specializations.length) {
      setSpecialization(br.specializations[0].title);
      setIsCustomSpec(false);
    }
  };

  const handleSpecChange = (specTitle: string) => {
    if (specTitle === '__custom__') {
      setIsCustomSpec(true);
      return;
    }
    setIsCustomSpec(false);
    setSpecialization(specTitle);
  };

  const handleStudyTypeChange = (val: string) => {
    if (val === '__custom__') {
      setIsCustomStudyType(true);
      return;
    }
    setIsCustomStudyType(false);
    setStudyType(val);
  };

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const addCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests([...selectedInterests, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalPrevQual = is3YearLLB 
      ? (isCustomPrevQual ? (customPrevQual.trim() || 'Other Bachelor\'s Degree') : previousQualification)
      : isLLM 
        ? (isCustomCompletedLLB ? (customCompletedLLB.trim() || 'Other Law Degree') : completedLLBQual)
        : initialProfile?.previousQualification || undefined;

    const finalInterStream = is5YearIntegratedLaw 
      ? (isCustomInterStream ? (customInterStream.trim() || 'Other / Vocational Stream') : intermediateStream)
      : initialProfile?.intermediateStream || undefined;

    const finalLawSpec = isLLM
      ? (isCustomLlmSpec ? (customLlmSpec.trim() || 'Other / General LLM') : llmSpecialization)
      : initialProfile?.lawSpecialization || undefined;

    const updatedProfile: StudentProfile = {
      id: initialProfile?.id || `student-${Date.now()}`,
      name: name.trim(),
      educationLevel,
      boardOrUniversity,
      classOrDegree,
      streamOrGroup,
      course,
      branchOrCombination,
      specialization: isLLM ? (finalLawSpec || specialization) : specialization,
      studyType: isBSc ? (studyType || 'B.Sc. Honours') : initialProfile?.studyType || undefined,
      previousQualification: finalPrevQual,
      intermediateStream: finalInterStream,
      lawSpecialization: finalLawSpec,
      academicYear,
      yearOfStudy,
      semester,
      interests: selectedInterests,
      careerGoals: careerGoals.trim(),
      email: email.trim(),
      createdAt: initialProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveProfile(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#E8D5C4] rounded-2xl shadow-2xl border border-[#D5A3AE] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#DFCEBE] border-b border-[#D5A3AE]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#722F45] font-serif-accent">
                {initialProfile ? 'Edit Student Profile' : 'Create Your Student Profile'}
              </h2>
              <p className="text-xs text-[#6C555C]">
                Set up your course, subjects, and study goals to get personalized practice and recommendations.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#6C555C] hover:bg-[#D5A3AE]/25 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Section: Basic Identity */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C4057] border-b border-[#D5A3AE]/40 pb-1">
              1. Your Details &amp; Contact
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma / Ananya Rao"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                />
              </div>
            </div>
          </div>

          {/* Section: Academic Hierarchy & Qualification */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C4057] border-b border-[#D5A3AE]/40 pb-1">
              2. Education &amp; School / College
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => handleLevelChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                >
                  {EDUCATION_LEVELS.map((lvl) => (
                    <option key={lvl.id} value={lvl.name}>
                      {lvl.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Board or University
                </label>
                <select
                  value={boardOrUniversity}
                  onChange={(e) => setBoardOrUniversity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                >
                  {ALL_BOARDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Class or Degree Program
                </label>
                <select
                  value={isCustomDegree ? '__custom__' : classOrDegree}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                >
                  {levelCourses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                  <option value="__custom__">Other / Custom Degree...</option>
                </select>
                {isCustomDegree && (
                  <input
                    type="text"
                    value={classOrDegree}
                    onChange={(e) => {
                      setClassOrDegree(e.target.value);
                      setCourse(e.target.value);
                    }}
                    placeholder="Enter custom degree name"
                    className="w-full mt-1.5 px-3.5 py-2 rounded-xl border border-[#722F45] bg-[#FFF9F2] text-xs text-[#2D2226] focus:outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Stream, Group, or Branch
                </label>
                <select
                  value={isCustomBranch ? '__custom__' : branchOrCombination}
                  onChange={(e) => handleBranchChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                >
                  {courseBranches.map((b) => (
                    <option key={b.id} value={b.title}>
                      {b.title}
                    </option>
                  ))}
                  <option value="__custom__">Other / Custom Branch...</option>
                </select>
                {isCustomBranch && (
                  <input
                    type="text"
                    value={branchOrCombination}
                    onChange={(e) => {
                      setBranchOrCombination(e.target.value);
                      setStreamOrGroup(e.target.value);
                    }}
                    placeholder="Enter custom branch/stream"
                    className="w-full mt-1.5 px-3.5 py-2 rounded-xl border border-[#722F45] bg-[#FFF9F2] text-xs text-[#2D2226] focus:outline-none"
                  />
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Specific Subject or Specialization
                </label>
                <select
                  value={isCustomSpec ? '__custom__' : specialization}
                  onChange={(e) => handleSpecChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                >
                  {branchSpecializations.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="__custom__">Other / Custom Specialization...</option>
                </select>
                {isCustomSpec && (
                  <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="Enter custom specialization title"
                    className="w-full mt-1.5 px-3.5 py-2 rounded-xl border border-[#722F45] bg-[#FFF9F2] text-xs text-[#2D2226] focus:outline-none"
                  />
                )}
              </div>

              {/* CONDITIONAL LAW FILTERS */}

              {/* Condition 1: 3-Year LLB (After Graduation) -> Show Previous Bachelor's Degree */}
              {is3YearLLB && (
                <div className="sm:col-span-2 p-4 rounded-xl bg-[#FFF9F2] border border-[#722F45]/50 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2.5 py-0.5 rounded border border-[#D5A3AE]">
                      Law Student Eligibility
                    </span>
                    <span className="text-xs font-bold text-[#722F45]">
                      3-Year LLB Graduate Entry
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2D2226] mb-1">
                      Previous Bachelor&apos;s Degree / Qualification *
                    </label>
                    <select
                      value={isCustomPrevQual ? '__custom__' : previousQualification}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setIsCustomPrevQual(true);
                        } else {
                          setIsCustomPrevQual(false);
                          setPreviousQualification(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-xs font-semibold text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                    >
                      {PREVIOUS_BACHELOR_DEGREES.map((deg) => (
                        <option key={deg} value={deg}>
                          {deg}
                        </option>
                      ))}
                      <option value="__custom__">Other Bachelor&apos;s Degree...</option>
                    </select>
                    {isCustomPrevQual && (
                      <input
                        type="text"
                        value={customPrevQual}
                        onChange={(e) => setCustomPrevQual(e.target.value)}
                        placeholder="Enter previous degree name (e.g. B.A. History, B.Tech Civil)"
                        className="w-full mt-2 px-3.5 py-2 rounded-xl border border-[#722F45] bg-[#FFF9F2] text-xs text-[#2D2226] focus:outline-none"
                      />
                    )}
                    <p className="text-[11px] text-[#6C555C] mt-1">
                      The 3-Year LLB degree is pursued following completion of an undergraduate bachelor&apos;s degree in any discipline.
                    </p>
                  </div>
                </div>
              )}

              {/* Condition 2: 5-Year Integrated Law (BA LLB, BBA LLB, BCom LLB, BSc LLB) -> Show Intermediate Stream */}
              {is5YearIntegratedLaw && (
                <div className="sm:col-span-2 p-4 rounded-xl bg-[#FFF9F2] border border-[#722F45]/50 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2.5 py-0.5 rounded border border-[#D5A3AE]">
                      Law Student Eligibility
                    </span>
                    <span className="text-xs font-bold text-[#722F45]">
                      5-Year Integrated Law (After Intermediate / +2)
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2D2226] mb-1">
                      Intermediate (+2 / Class 11–12) Stream *
                    </label>
                    <select
                      value={isCustomInterStream ? '__custom__' : intermediateStream}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setIsCustomInterStream(true);
                        } else {
                          setIsCustomInterStream(false);
                          setIntermediateStream(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-xs font-semibold text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                    >
                      {INTERMEDIATE_STREAMS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                      <option value="__custom__">Other Intermediate Stream...</option>
                    </select>
                    {isCustomInterStream && (
                      <input
                        type="text"
                        value={customInterStream}
                        onChange={(e) => setCustomInterStream(e.target.value)}
                        placeholder="Enter intermediate stream (e.g. CBSE Commerce, Arts & Humanities)"
                        className="w-full mt-2 px-3.5 py-2 rounded-xl border border-[#722F45] bg-[#FFF9F2] text-xs text-[#2D2226] focus:outline-none"
                      />
                    )}
                    <p className="text-[11px] text-[#6C555C] mt-1">
                      Integrated 5-year law degrees are pursued directly after Class 12 (Intermediate) through national or state law entrance tests.
                    </p>
                  </div>
                </div>
              )}

              {/* Condition 3: Postgraduate LLM -> Show Completed LLB & LLM Specialization */}
              {isLLM && (
                <div className="sm:col-span-2 p-4 rounded-xl bg-[#FFF9F2] border border-[#722F45]/50 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2.5 py-0.5 rounded border border-[#D5A3AE]">
                      Postgraduate Law Eligibility
                    </span>
                    <span className="text-xs font-bold text-[#722F45]">
                      Master of Laws (LLM) Candidate
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D2226] mb-1">
                        Completed Law Degree (LLB) *
                      </label>
                      <select
                        value={isCustomCompletedLLB ? '__custom__' : completedLLBQual}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setIsCustomCompletedLLB(true);
                          } else {
                            setIsCustomCompletedLLB(false);
                            setCompletedLLBQual(e.target.value);
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-xs font-semibold text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                      >
                        {COMPLETED_LLB_QUALIFICATIONS.map((ql) => (
                          <option key={ql} value={ql}>
                            {ql}
                          </option>
                        ))}
                        <option value="__custom__">Other Law Degree...</option>
                      </select>
                      {isCustomCompletedLLB && (
                        <input
                          type="text"
                          value={customCompletedLLB}
                          onChange={(e) => setCustomCompletedLLB(e.target.value)}
                          placeholder="Enter completed law degree name"
                          className="w-full mt-2 px-3 py-1.5 rounded-lg border border-[#722F45] bg-[#FFF9F2] text-xs text-[#2D2226]"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D2226] mb-1">
                        LLM Specialization Focus *
                      </label>
                      <select
                        value={isCustomLlmSpec ? '__custom__' : llmSpecialization}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setIsCustomLlmSpec(true);
                          } else {
                            setIsCustomLlmSpec(false);
                            setLlmSpecialization(e.target.value);
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-xs font-semibold text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                      >
                        {LLM_SPECIALIZATIONS.map((sp) => (
                          <option key={sp} value={sp}>
                            {sp}
                          </option>
                        ))}
                        <option value="__custom__">Other LLM Specialization...</option>
                      </select>
                      {isCustomLlmSpec && (
                        <input
                          type="text"
                          value={customLlmSpec}
                          onChange={(e) => setCustomLlmSpec(e.target.value)}
                          placeholder="Enter LLM specialization title"
                          className="w-full mt-2 px-3 py-1.5 rounded-lg border border-[#722F45] bg-[#FFF9F2] text-xs text-[#2D2226]"
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#6C555C]">
                    Master of Laws candidates must hold a recognized law degree (3-Year or 5-Year LLB).
                  </p>
                </div>
              )}

              {isBSc && (
                <div className="sm:col-span-2 p-3 rounded-xl bg-[#FFF9F2] border border-[#D5A3AE]/70">
                  <label className="block text-xs font-bold text-[#722F45] mb-1">
                    B.Sc. Degree Track (Undergraduate)
                  </label>
                  <select
                    value={isCustomStudyType ? '__custom__' : studyType}
                    onChange={(e) => handleStudyTypeChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-xs font-semibold text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                  >
                    {BSC_STUDY_TYPES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                    <option value="__custom__">Other / Custom Study Track...</option>
                  </select>
                  {isCustomStudyType && (
                    <input
                      type="text"
                      value={studyType}
                      onChange={(e) => setStudyType(e.target.value)}
                      placeholder="e.g. B.Sc. Dual Degree / Integrated"
                      className="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-[#722F45] bg-[#FFF9F2] text-xs text-[#2D2226] focus:outline-none"
                    />
                  )}
                  <p className="text-[11px] text-[#6C555C] mt-1">
                    Aligned with UGC / National Education Policy 3-year pass and 4-year Honours tracks.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Academic Year &amp; Year of Study
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="2025–2026"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5A3AE]/60 bg-white text-xs text-[#2D2226]"
                  />
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5A3AE]/60 bg-white text-xs text-[#2D2226]"
                  >
                    {is5YearIntegratedLaw ? (
                      <>
                        <option value="1st Year">1st Year (1st &amp; 2nd Sem)</option>
                        <option value="2nd Year">2nd Year (3rd &amp; 4th Sem)</option>
                        <option value="3rd Year">3rd Year (5th &amp; 6th Sem)</option>
                        <option value="4th Year">4th Year (7th &amp; 8th Sem)</option>
                        <option value="5th Year">5th Year (Final Year / 9th &amp; 10th Sem)</option>
                        <option value="Graduate / Law Alum">Graduate / Law Alum</option>
                      </>
                    ) : is3YearLLB ? (
                      <>
                        <option value="1st Year">1st Year (1st &amp; 2nd Sem)</option>
                        <option value="2nd Year">2nd Year (3rd &amp; 4th Sem)</option>
                        <option value="3rd Year">3rd Year (Final Year / 5th &amp; 6th Sem)</option>
                        <option value="Graduate / Law Alum">Graduate / Law Alum</option>
                      </>
                    ) : isLLM ? (
                      <>
                        <option value="1st Year">1st Year (1st &amp; 2nd Sem)</option>
                        <option value="2nd Year">2nd Year (Final Year / 3rd &amp; 4th Sem)</option>
                        <option value="Postgraduate / LLM Alum">Postgraduate / LLM Alum</option>
                      </>
                    ) : (
                      <>
                        <option value="First Year">First Year (11th / 1st Yr)</option>
                        <option value="Second Year">Second Year (12th / 2nd Yr)</option>
                        <option value="Third Year">Third Year (3rd Yr)</option>
                        <option value="Fourth Year">Fourth Year (Final Yr)</option>
                        <option value="Graduate / Alum">Graduate / Completed</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2226] mb-1">
                  Semester (if applicable)
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                >
                  <option value="Annual / Non-Semester">Annual / Non-Semester</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  {!isLLM && (
                    <>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                    </>
                  )}
                  {is5YearIntegratedLaw && (
                    <>
                      <option value="Semester 7">Semester 7</option>
                      <option value="Semester 8">Semester 8</option>
                      <option value="Semester 9">Semester 9</option>
                      <option value="Semester 10">Semester 10</option>
                    </>
                  )}
                  {!is5YearIntegratedLaw && !is3YearLLB && !isLLM && (
                    <>
                      <option value="Semester 7">Semester 7</option>
                      <option value="Semester 8">Semester 8</option>
                    </>
                  )}
                </select>
              </div>

            </div>
          </div>

          {/* Section: Interests & Aspirations */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C4057] border-b border-[#D5A3AE]/40 pb-1">
              3. Interests &amp; Career Goals
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#2D2226] mb-1.5">
                Subjects &amp; Topics You Enjoy
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {COMMON_INTERESTS.map((item) => {
                  const isChecked = selectedInterests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#722F45] text-white shadow-2xs font-semibold'
                          : 'bg-[#FFF9F2] border border-[#D5A3AE]/50 text-[#2D2226] hover:bg-[#D5A3AE]/25'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  placeholder="Type an interest and click Add..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#D5A3AE]/60 bg-white text-[#2D2226]"
                />
                <button
                  type="button"
                  onClick={addCustomInterest}
                  className="px-3 py-1.5 text-xs font-bold bg-[#D5A3AE]/30 hover:bg-[#D5A3AE]/50 text-[#722F45] border border-[#D5A3AE]/60 rounded-lg transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D2226] mb-1">
                What are your career dreams or goals?
              </label>
              <textarea
                rows={3}
                value={careerGoals}
                onChange={(e) => setCareerGoals(e.target.value)}
                placeholder="e.g. Become a software engineer, doctor, accountant, lawyer, or start my own business..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5A3AE]/60 bg-white text-sm text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#D5A3AE]/40 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#D5A3AE]/60 text-xs font-bold text-[#2D2226] hover:bg-[#D5A3AE]/20 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
