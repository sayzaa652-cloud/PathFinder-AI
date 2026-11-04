/**
 * PathFinder AI — Type Definitions
 */

export type EducationLevelId =
  | 'class_10'
  | 'intermediate'
  | 'diploma'
  | 'undergraduate'
  | 'postgraduate'
  | 'professional'
  | 'other';

export interface StudentProfile {
  id: string;
  name: string;
  educationLevel: string;
  boardOrUniversity: string;
  classOrDegree: string;
  streamOrGroup: string;
  course: string;
  branchOrCombination: string;
  specialization: string;
  academicYear: string;
  yearOfStudy: string; // e.g. "First Year", "Second Year"
  semester?: string;
  studyType?: string; // e.g. "B.Sc. Honours", "B.Sc. Honours with Research", "B.Sc. General / Pass"
  previousQualification?: string; // e.g. Previous Bachelor's degree for LLB or completed LLB for LLM
  intermediateStream?: string; // e.g. MPC, BiPC, MEC, CEC, HEC, or Other for 5-Year Integrated Law courses
  lawSpecialization?: string; // e.g. Constitutional Law, Corporate Law for LLM
  interests: string[];
  careerGoals: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EducationSpecialization {
  id: string;
  title: string;
  code?: string;
  category?: string;
  description?: string;
  careerPaths?: string[];
  suggestedAssessments?: string[];
}

export interface EducationBranchOrGroup {
  id: string;
  title: string;
  code?: string;
  category?: string;
  specializations: EducationSpecialization[];
  boardsAllowed?: string[];
  yearsAllowed?: string[];
  semestersAllowed?: string[];
}

export interface EducationCourse {
  id: string;
  title: string;
  code?: string;
  category?: string;
  branchesOrGroups: EducationBranchOrGroup[];
}

export interface EducationLevelConfig {
  id: EducationLevelId;
  name: string;
  shortLabel: string;
  description: string;
  iconName: string;
  qualifications: {
    id: string;
    title: string;
    courses: EducationCourse[];
  }[];
}

export interface CareerInterestQuestion {
  id: number;
  question: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    text: string;
    stream: 'tech_ai' | 'bio_health' | 'finance_business' | 'humanities_social';
  }[];
}

export interface CareerInterestResult {
  id: string;
  date: string;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  scores: {
    tech_ai: number;
    bio_health: number;
    finance_business: number;
    humanities_social: number;
  };
  recommendations: {
    streamKey: 'tech_ai' | 'bio_health' | 'finance_business' | 'humanities_social';
    title: string;
    score: number;
    percentage: number;
    rationale: string;
    recommendedCourses: string[];
    potentialCareers: string[];
    aiReadinessFocus: string;
  }[];
  isTied: boolean;
}

export interface MCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: MCQOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  subtopic?: string;
}

export interface Assessment {
  id: string;
  title: string;
  educationLevel: string;
  courseOrGroup: string;
  specialization: string;
  totalQuestions: number; // 20
  timeLimitMinutes: number;
  description: string;
  topicsCovered: string[];
  questions: AssessmentQuestion[];
  isCurated?: boolean;
}

export interface TopicScore {
  topic: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface LearningResource {
  title: string;
  type: 'Course' | 'Interactive Book' | 'Practice Lab' | 'Roadmap' | 'Video Series';
  provider: string;
  description: string;
  linkText: string;
  focusArea: string;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  specialization: string;
  educationLevel: string;
  studentName: string;
  completedAt: string;
  score: number; // out of 20
  totalQuestions: number; // 20
  percentage: number;
  timeSpentSeconds: number;
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  topicPerformance: TopicScore[];
  difficultyPerformance: {
    difficulty: 'Easy' | 'Medium' | 'Hard';
    correct: number;
    total: number;
  }[];
  skillGaps: string[];
  strengths: string[];
  recommendedResources: LearningResource[];
  aiInsightNote?: string;
}

export interface AIReadinessDiagnostic {
  score: number; // 0 - 100
  level: 'Beginner' | 'Emerging' | 'Competent' | 'Advanced' | 'Pioneer';
  pillars: {
    pillar: string;
    score: number;
    description: string;
    status: 'Needs Foundation' | 'Developing' | 'Proficient' | 'Leading';
  }[];
  domainImpactAnalysis: string;
  futureSkillsRoadmap: string[];
  recommendedAITools: {
    name: string;
    category: string;
    whyCrucial: string;
    useCaseForDomain: string;
  }[];
}

// -------------------------------------------------------------
// FEATURE 2: PERSONALIZED LEARNING ROADMAP
// -------------------------------------------------------------
export interface RoadmapMilestone {
  id: string;
  title: string;
  duration: string;
  description: string;
  whyRecommended: string; // Explainable AI rationale
  completed: boolean;
  skillsAcquired: string[];
  recommendedResources: LearningResource[];
  reflectionPrompt: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  estimatedWeeks: number;
  summary: string;
  whyRecommended: string; // Explainable AI rationale for phase
  milestones: RoadmapMilestone[];
}

export interface PersonalizedRoadmap {
  id: string;
  studentId: string;
  specialization: string;
  targetCareer: string;
  generatedAt: string;
  aiRationaleSummary: string;
  phases: RoadmapPhase[];
  overallProgress: number; // 0 - 100
}

// -------------------------------------------------------------
// FEATURE 3: SKILL GAP TRACKER & 4-WEEK IMPROVEMENT PLAN
// -------------------------------------------------------------
export interface DailyPlanTask {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  taskType: 'Theory Rebuild' | 'Guided Practice' | 'Timed Drill' | 'AI Integration' | 'Reflection';
  estimatedMinutes: number;
  completed: boolean;
  hint?: string; // Reduces AI dependency
  reflectionQuestion?: string;
}

export interface WeeklyPlan {
  weekNumber: number; // 1 to 4
  title: string;
  focusArea: string;
  objective: string;
  whyThisWeek: string; // Explainable AI
  tasks: DailyPlanTask[];
  isCompleted: boolean;
}

export interface SkillGapItem {
  id: string;
  skillName: string;
  domain: string;
  currentProficiency: number; // 0 - 100
  targetProficiency: number; // e.g. 85
  status: 'Critical Gap' | 'Developing' | 'Near Mastery' | 'Mastered';
  identifiedFrom: string;
  fourWeekPlan: WeeklyPlan[];
  practiceDrill: {
    question: string;
    conceptClue: string; // Hint 1
    methodology: string; // Hint 2
    workedApproach: string;
  };
}

// -------------------------------------------------------------
// FEATURE 4: AI SOCRATIC MENTOR & TEACHER REVIEW (MENTOR-IN-THE-LOOP)
// -------------------------------------------------------------
export interface MentorMessage {
  id: string;
  sender: 'student' | 'ai_mentor' | 'human_mentor';
  text: string;
  timestamp: string;
  mode?: 'socratic_hint' | 'concept_explainer' | 'reflection_prompt';
  explainableRationale?: string;
  reflectionQuestion?: string;
}

export interface MentorReview {
  id: string;
  mentorName: string;
  mentorRole: string; // e.g. "Senior Professor / Academic Mentor"
  institutionOrDept: string;
  reviewedStudentId?: string;
  reviewDate: string;
  overallRating: 'Distinction' | 'Satisfactory' | 'Needs Improvement';
  comments: string;
  verifiedSkills: string[];
  recommendedFocus: string;
  approvedMilestones: string[];
}

export interface StudentReflection {
  id: string;
  prompt: string;
  response: string;
  date: string;
  skillContext: string;
}

// -------------------------------------------------------------
// FEATURE 5: CAREER GUIDANCE, SALARY, PROJECTS & STUDY HUB
// -------------------------------------------------------------
export interface SalaryInsight {
  streamId: string;
  roleTitle: string;
  industry: string;
  entryLevelINR: string;
  midLevelINR: string;
  seniorLevelINR: string;
  entryLevelUSD: string;
  seniorLevelUSD: string;
  topHiringSectors: string[];
  aiImpactProjection: string;
}

export interface IndustryProject {
  id: string;
  title: string;
  domain: string;
  level: 'Beginner' | 'Intermediate' | 'Capstone';
  problemStatement: string;
  skillsPracticed: string[];
  techStack: string[];
  expectedOutput: string;
  aiIntegrationNote: string;
}

export interface PreviousYearPaper {
  id: string;
  examName: string; // e.g. "JEE Advanced", "NEET-UG", "Telangana Intermediate", "CBSE 12th", "GATE CSE"
  category: 'School / 10th' | 'Intermediate / +2' | 'National Entrance' | 'University Degree';
  year: number;
  subject: string;
  totalMarks: number;
  timeHours: number;
  pdfUrl?: string;
  sections: {
    name: string;
    description: string;
    sampleQuestions: string[];
  }[];
  markingScheme: string;
}

export interface StudyPlanSlot {
  id: string;
  timeSlot: string; // e.g. "06:00 PM - 07:30 PM"
  subject: string;
  topic: string;
  taskType: 'Deep Study' | 'Revision' | 'Problem Solving' | 'Practice Test';
  completed: boolean;
  notes?: string;
}

export interface SmartNoteItem {
  id: string;
  subject: string;
  topic: string;
  summaryBulletPoints: string[];
  keyFormulasOrConcepts: string[];
  commonExamPitfalls: string[];
  aiCrossDisciplinaryNote: string;
}
