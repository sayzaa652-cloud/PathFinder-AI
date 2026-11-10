import { SkillGapItem, WeeklyPlan, AssessmentResult, StudentProfile } from '../types';
import { MPC_CURRICULUM_DATA } from '../data/mpcLearningData';

export function generateSkillGapItems(
  profile: StudentProfile | null,
  assessmentResults: AssessmentResult[] = []
): SkillGapItem[] {
  // Look for the latest submitted MPC assessment result
  const mpcResult = assessmentResults.find(
    (res) => res.specialization.toLowerCase().includes('mpc') || res.assessmentTitle.toLowerCase().includes('mpc')
  );

  // Define the 5 official MPC subject specifications
  const mpcSubjectSpecs = [
    {
      id: 'm1a',
      skillName: 'Mathematics 1A (Algebra & Functions)',
      domain: 'Mathematics 1A',
      totalQuestions: 4,
      topicFilter: 'mathematics 1a',
      curriculum: MPC_CURRICULUM_DATA.Mathematics_1A
    },
    {
      id: 'm1b',
      skillName: 'Mathematics 1B (Geometry & Calculus)',
      domain: 'Mathematics 1B',
      totalQuestions: 4,
      topicFilter: 'mathematics 1b',
      curriculum: MPC_CURRICULUM_DATA.Mathematics_1B
    },
    {
      id: 'phys',
      skillName: 'Physics (Mechanics, Energy & Electricity)',
      domain: 'Physics',
      totalQuestions: 6,
      topicFilter: 'physic',
      curriculum: MPC_CURRICULUM_DATA.Physics
    },
    {
      id: 'chem',
      skillName: 'Chemistry (Chemical Equations & Bonding)',
      domain: 'Chemistry',
      totalQuestions: 6,
      topicFilter: 'chem',
      curriculum: MPC_CURRICULUM_DATA.Chemistry
    },
    {
      id: 'apt',
      skillName: 'General Aptitude (Numerical & Reasoning)',
      domain: 'General Aptitude',
      totalQuestions: 10,
      topicFilter: 'aptitude',
      curriculum: MPC_CURRICULUM_DATA.Aptitude
    }
  ];

  if (mpcResult) {
    // REAL ASSESSMENT ANSWERS AVAILABLE
    return mpcSubjectSpecs.map((specItem, index) => {
      // Find subject score from actual submitted topic performance
      const topicPerf = mpcResult.topicPerformance.find(
        (tp) => tp.topic.toLowerCase().includes(specItem.topicFilter)
      );

      // If topicPerf is found, use its actual correct/total values
      let correct = 0;
      let total = specItem.totalQuestions;

      if (topicPerf) {
        correct = topicPerf.correct;
        total = topicPerf.total || specItem.totalQuestions;
      } else {
        // Search user answers directly if topicPerf was aggregated differently
        // e.g. for general math questions
        if (specItem.id === 'm1a') {
          const m1aPerf = mpcResult.topicPerformance.find((tp) => tp.topic.toLowerCase() === 'mathematics 1a');
          if (m1aPerf) correct = m1aPerf.correct;
        } else if (specItem.id === 'm1b') {
          const m1bPerf = mpcResult.topicPerformance.find((tp) => tp.topic.toLowerCase() === 'mathematics 1b');
          if (m1bPerf) correct = m1bPerf.correct;
        }
      }

      const incorrect = Math.max(0, total - correct);
      const percentage = Math.round((correct / (total || 1)) * 100);

      // Rule 3: Status Logic
      // 85%+ = Mastered
      // 67% - 84% = Developing
      // Below 67% = Needs Improvement
      let status: 'Mastered' | 'Developing' | 'Needs Improvement' = 'Needs Improvement';
      if (percentage >= 85) {
        status = 'Mastered';
      } else if (percentage >= 67) {
        status = 'Developing';
      }

      return {
        id: `mpc-gap-${index + 1}-${specItem.id}`,
        skillName: specItem.skillName,
        domain: specItem.domain,
        currentProficiency: percentage,
        targetProficiency: 85,
        status,
        isAssessed: true,
        correctAnswers: correct,
        incorrectAnswers: incorrect,
        totalQuestions: total,
        identifiedFrom: `Submitted Diagnostic Assessment (${mpcResult.completedAt ? new Date(mpcResult.completedAt).toLocaleDateString() : 'Recent'})`,
        subjectScoreBreakdown: {
          subject: specItem.domain,
          score: correct,
          total,
          percentage
        },
        fourWeekPlan: specItem.curriculum?.fourWeekPlan || buildFourWeekPlan(specItem.skillName, specItem.domain, percentage),
        practiceDrill: getPracticeDrillForSkill(specItem.skillName)
      };
    });
  }

  // NO ASSESSMENT TAKEN YET - Show "Not assessed yet" (Never generate fake scores!)
  return mpcSubjectSpecs.map((specItem, index) => {
    return {
      id: `mpc-gap-${index + 1}-${specItem.id}`,
      skillName: specItem.skillName,
      domain: specItem.domain,
      currentProficiency: 0,
      targetProficiency: 85,
      status: 'Not Assessed',
      isAssessed: false,
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalQuestions: specItem.totalQuestions,
      identifiedFrom: 'Diagnostic Check Needed',
      subjectScoreBreakdown: {
        subject: specItem.domain,
        score: 0,
        total: specItem.totalQuestions,
        percentage: 0
      },
      fourWeekPlan: specItem.curriculum?.fourWeekPlan || buildFourWeekPlan(specItem.skillName, specItem.domain, 0),
      practiceDrill: getPracticeDrillForSkill(specItem.skillName)
    };
  });
}

function buildFourWeekPlan(skillName: string, domain: string, initialScore: number): WeeklyPlan[] {
  return [
    {
      weekNumber: 1,
      title: 'Week 1: Review Core Definitions & Formulas',
      focusArea: 'Basic definitions, rules, and simple examples',
      objective: `Clear up foundational confusion in ${skillName}.`,
      whyThisWeek: 'Building fundamental clarity stops small calculation errors on harder exam questions.',
      isCompleted: false,
      tasks: [
        {
          id: `w1_t1`,
          dayNumber: 1,
          title: 'Read core theory notes and write down main rules',
          description: `Write down key definitions and formulas for ${skillName} on paper.`,
          taskType: 'Theory Rebuild',
          estimatedMinutes: 25,
          completed: false,
          hint: 'Focus on understanding why rules work rather than plain memorization.'
        },
        {
          id: `w1_t2`,
          dayNumber: 2,
          title: 'Solve 3 standard textbook examples step-by-step',
          description: 'Write out every single step on paper and check intermediate values.',
          taskType: 'Guided Practice',
          estimatedMinutes: 30,
          completed: false
        }
      ]
    },
    {
      weekNumber: 2,
      title: 'Week 2: Practice Problems with Step-by-Step Clues',
      focusArea: 'Solving standard questions with progressive hints',
      objective: 'Build independent problem-solving confidence.',
      whyThisWeek: 'Practicing with hints builds conceptual retention for real exams.',
      isCompleted: false,
      tasks: [
        {
          id: `w2_t1`,
          dayNumber: 3,
          title: 'Solve 5 practice problems using Concept Clues',
          description: `Attempt 5 questions on ${skillName}. Open hints only if stuck.`,
          taskType: 'Guided Practice',
          estimatedMinutes: 35,
          completed: false
        }
      ]
    },
    {
      weekNumber: 3,
      title: 'Week 3: Timed Practice & Speed Training',
      focusArea: 'Completing questions accurately under time limits',
      objective: 'Achieve speed and high accuracy.',
      whyThisWeek: 'Timer practice reduces exam panic and prevents running out of time.',
      isCompleted: false,
      tasks: [
        {
          id: `w3_t1`,
          dayNumber: 4,
          title: 'Take 10-Minute Speed Drill',
          description: 'Complete 5 questions without looking at reference notes.',
          taskType: 'Timed Drill',
          estimatedMinutes: 20,
          completed: false
        }
      ]
    },
    {
      weekNumber: 4,
      title: 'Week 4: Final Mastery Review & Progress Test',
      focusArea: 'Full verification of skill gap closure',
      objective: 'Score 85%+ on mastery test.',
      whyThisWeek: 'Confirms permanent topic mastery.',
      isCompleted: false,
      tasks: [
        {
          id: `w4_t1`,
          dayNumber: 5,
          title: 'Take Final Mastery Test',
          description: 'Verify your progress against your initial score.',
          taskType: 'Timed Drill',
          estimatedMinutes: 25,
          completed: false
        }
      ]
    }
  ];
}

function getPracticeDrillForSkill(skillName: string) {
  const nameLower = skillName.toLowerCase();

  if (nameLower.includes('algebra') || nameLower.includes('math') || nameLower.includes('m1a')) {
    return {
      question: 'Solve for x: 3x - 12 = 18. What is the value of 2x + 5?',
      conceptClue: 'Hint 1 (Clue): First solve 3x - 12 = 18 to find x. Add 12 to 18 (30) and divide by 3.',
      methodology: 'Hint 2 (Steps): x = 10. Then substitute x = 10 into 2x + 5: 2(10) + 5 = 25.',
      workedApproach: 'Full Solution: x = 10. Substituting yields 2(10) + 5 = 25.'
    };
  }

  if (nameLower.includes('physic') || nameLower.includes('force') || nameLower.includes('motion')) {
    return {
      question: 'A net force of 50 N accelerates a mass. If acceleration is 5 m/s², what is the object mass?',
      conceptClue: 'Hint 1 (Clue): Use Newton\'s Second Law: F = m × a.',
      methodology: 'Hint 2 (Steps): Rearrange formula to m = F / a. Divide 50 N by 5 m/s².',
      workedApproach: 'Full Solution: m = 50 / 5 = 10 kg.'
    };
  }

  if (nameLower.includes('chem') || nameLower.includes('acid') || nameLower.includes('bond')) {
    return {
      question: 'What is the pH of a neutral water solution, and what color does it turn blue litmus paper?',
      conceptClue: 'Hint 1 (Clue): Pure water is neutral on the 0-14 pH scale.',
      methodology: 'Hint 2 (Steps): Neutral pH = 7. Only acids turn blue litmus red. Neutral solutions do not change blue litmus color.',
      workedApproach: 'Full Solution: pH = 7. Litmus paper stays blue (no color change).'
    };
  }

  return {
    question: 'In a doubling pattern 2, 4, 8, 16, [ ? ], what is the 6th number in the sequence?',
    conceptClue: 'Hint 1 (Clue): Each number is twice the previous number.',
    methodology: 'Hint 2 (Steps): 5th number = 16 × 2 = 32. 6th number = 32 × 2 = 64.',
    workedApproach: 'Full Solution: The 6th term is 64.'
  };
}
