import { 
  AssessmentResult, CareerInterestResult, StudentProfile, 
  PersonalizedRoadmap, SkillGapItem, MentorReview, StudentReflection, 
  StudyPlanSlot, SmartNoteItem 
} from '../types';

const STORAGE_KEYS = {
  PROFILE: 'pathfinder_student_profile',
  ASSESSMENTS: 'pathfinder_assessment_results',
  CAREER_INTEREST: 'pathfinder_career_interest',
  ROADMAP: 'pathfinder_personalized_roadmap',
  SKILL_GAPS: 'pathfinder_skill_gap_items',
  MENTOR_REVIEWS: 'pathfinder_mentor_reviews',
  REFLECTIONS: 'pathfinder_student_reflections',
  STUDY_PLAN: 'pathfinder_study_plan_slots',
  SMART_NOTES: 'pathfinder_smart_notes',
  BOOKMARKS: 'pathfinder_bookmarks'
};

export const storageService = {
  getProfile(): StudentProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save student profile', e);
    }
  },

  getAssessmentResults(): AssessmentResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveAssessmentResult(result: AssessmentResult): void {
    try {
      const existing = this.getAssessmentResults();
      const updated = [result, ...existing.filter((r) => r.id !== result.id)];
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save assessment result', e);
    }
  },

  getCareerInterestResult(): CareerInterestResult | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAREER_INTEREST);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveCareerInterestResult(result: CareerInterestResult): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CAREER_INTEREST, JSON.stringify(result));
    } catch (e) {
      console.error('Failed to save career interest result', e);
    }
  },

  // Roadmap
  getPersonalizedRoadmap(): PersonalizedRoadmap | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROADMAP);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  savePersonalizedRoadmap(roadmap: PersonalizedRoadmap): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(roadmap));
    } catch (e) {
      console.error('Failed to save roadmap', e);
    }
  },

  // Skill Gap Tracker
  getSkillGapItems(): SkillGapItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SKILL_GAPS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveSkillGapItems(items: SkillGapItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILL_GAPS, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save skill gap items', e);
    }
  },

  // Mentor Reviews (Mentor-in-the-Loop)
  getMentorReviews(): MentorReview[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MENTOR_REVIEWS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveMentorReview(review: MentorReview): void {
    try {
      const existing = this.getMentorReviews();
      const updated = [review, ...existing.filter((r) => r.id !== review.id)];
      localStorage.setItem(STORAGE_KEYS.MENTOR_REVIEWS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save mentor review', e);
    }
  },

  // Student Reflection Journal
  getStudentReflections(): StudentReflection[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveStudentReflection(entry: StudentReflection): void {
    try {
      const existing = this.getStudentReflections();
      const updated = [entry, ...existing.filter((r) => r.id !== entry.id)];
      localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save reflection entry', e);
    }
  },

  // Study Planner
  getStudyPlanSlots(): StudyPlanSlot[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDY_PLAN);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveStudyPlanSlots(slots: StudyPlanSlot[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(slots));
    } catch (e) {
      console.error('Failed to save study plan slots', e);
    }
  },

  // Smart Notes
  getSmartNotes(): SmartNoteItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SMART_NOTES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveSmartNotes(notes: SmartNoteItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SMART_NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save smart notes', e);
    }
  },

  exportStudentPortfolio(): string {
    const backup = {
      profile: this.getProfile(),
      assessmentResults: this.getAssessmentResults(),
      careerInterest: this.getCareerInterestResult(),
      roadmap: this.getPersonalizedRoadmap(),
      skillGaps: this.getSkillGapItems(),
      mentorReviews: this.getMentorReviews(),
      reflections: this.getStudentReflections(),
      studyPlan: this.getStudyPlanSlots(),
      smartNotes: this.getSmartNotes(),
      exportedAt: new Date().toISOString(),
      platform: 'PathFinder AI'
    };
    return JSON.stringify(backup, null, 2);
  },

  importStudentPortfolio(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(parsed.profile));
      }
      if (Array.isArray(parsed.assessmentResults)) {
        localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(parsed.assessmentResults));
      }
      if (parsed.careerInterest) {
        localStorage.setItem(STORAGE_KEYS.CAREER_INTEREST, JSON.stringify(parsed.careerInterest));
      }
      if (parsed.roadmap) {
        localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(parsed.roadmap));
      }
      if (Array.isArray(parsed.skillGaps)) {
        localStorage.setItem(STORAGE_KEYS.SKILL_GAPS, JSON.stringify(parsed.skillGaps));
      }
      if (Array.isArray(parsed.mentorReviews)) {
        localStorage.setItem(STORAGE_KEYS.MENTOR_REVIEWS, JSON.stringify(parsed.mentorReviews));
      }
      if (Array.isArray(parsed.reflections)) {
        localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(parsed.reflections));
      }
      if (Array.isArray(parsed.studyPlan)) {
        localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(parsed.studyPlan));
      }
      if (Array.isArray(parsed.smartNotes)) {
        localStorage.setItem(STORAGE_KEYS.SMART_NOTES, JSON.stringify(parsed.smartNotes));
      }
      return true;
    } catch (e) {
      console.error('Failed to parse portfolio JSON', e);
      return false;
    }
  }
};

