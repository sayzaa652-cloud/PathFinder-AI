import { Assessment } from '../types';
import { CLASS_10_ASSESSMENTS } from './class10Assessments';
import { 
  buildIntermediateStreamAssessment, 
  generateCustomIntermediateAssessment 
} from './intermediateStreamAssessments';

/**
 * Curated assessments for Class 10 Entrance and all 11 Intermediate streams & combinations.
 * Strictly adheres to:
 * 1. Foundational Class 10 knowledge suitable for First Year Intermediate entrants.
 * 2. Exact question distributions (MPC 30, BiPC 30, MEC 30, CEC 30, HEC 25, MBiPC 30, BiPC-CS 30, MPC-CS 30, MEC-CS 30, CEC-CS 30).
 * 3. Dedicated 10 Aptitude questions in every single stream.
 * 4. 4 homogeneous options per question, randomized answer positions, clear explanations.
 * 5. Commerce: NO debits, credits, journals, ledgers, or balance sheets. Everyday business only.
 * 6. Computer Science: NO coding/programming assumption. Everyday computer basics only.
 */
export const CURATED_ASSESSMENTS: Record<string, Assessment> = {
  // Class 10 Entrance Assessments (Science, Math, English, GK, Aptitude, All-Round)
  ...CLASS_10_ASSESSMENTS,

  // 1. MPC — Mathematics: 8, Physics: 6, Chemistry: 6, Aptitude: 10 (Total: 30)
  mpc: buildIntermediateStreamAssessment('mpc')!,

  // 2. BiPC — Biology: 8, Physics: 6, Chemistry: 6, Aptitude: 10 (Total: 30)
  bipc: buildIntermediateStreamAssessment('bipc')!,

  // 3. MEC — Mathematics: 8, Economics: 6, Commerce: 6, Aptitude: 10 (Total: 30)
  mec: buildIntermediateStreamAssessment('mec')!,

  // 4. CEC — Civics: 7, Economics: 7, Commerce: 6, Aptitude: 10 (Total: 30)
  cec: buildIntermediateStreamAssessment('cec')!,

  // 5. HEC — History: 5, Economics: 5, Civics: 5, Aptitude: 10 (Total: 25)
  hec: buildIntermediateStreamAssessment('hec')!,

  // 6. MBiPC — Mathematics: 6, Biology: 5, Physics: 5, Chemistry: 4, Aptitude: 10 (Total: 30)
  mbipc: buildIntermediateStreamAssessment('mbipc')!,

  // 7. BiPC with Computer Science — Biology: 6, Physics: 4, Chemistry: 4, Computer Science: 6, Aptitude: 10 (Total: 30)
  bipc_cs: buildIntermediateStreamAssessment('bipc_cs')!,

  // 8. MPC with Computer Science — Mathematics: 6, Physics: 4, Chemistry: 4, Computer Science: 6, Aptitude: 10 (Total: 30)
  mpc_cs: buildIntermediateStreamAssessment('mpc_cs')!,

  // 9. MEC with Computer Science — Mathematics: 5, Economics: 5, Commerce: 5, Computer Science: 5, Aptitude: 10 (Total: 30)
  mec_cs: buildIntermediateStreamAssessment('mec_cs')!,

  // 10. CEC with Computer Science — Civics: 5, Economics: 5, Commerce: 5, Computer Science: 5, Aptitude: 10 (Total: 30)
  cec_cs: buildIntermediateStreamAssessment('cec_cs')!,

  // 11. Other Specialization / Custom Subject Combination (Dynamic + 10 Aptitude)
  custom_inter_spec: generateCustomIntermediateAssessment(['Mathematics', 'Economics', 'Computer Science']),
  other_specialization: generateCustomIntermediateAssessment(['Mathematics', 'Physics', 'Chemistry', 'Biology'])
};
