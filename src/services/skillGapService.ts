import { SkillGapItem, WeeklyPlan, DailyPlanTask, AssessmentResult, StudentProfile } from '../types';

export function generateSkillGapItems(
  profile: StudentProfile | null,
  assessmentResults: AssessmentResult[] = []
): SkillGapItem[] {
  const spec = profile?.specialization || profile?.course || profile?.streamOrGroup || 'General Sciences & Technology';
  const specLower = spec.toLowerCase();

  // If student has assessment results, aggregate identified gaps
  const collectedGaps: { name: string; domain: string; score: number }[] = [];

  assessmentResults.forEach((res) => {
    res.topicPerformance.forEach((tp) => {
      if (tp.percentage < 75) {
        if (!collectedGaps.find((g) => g.name === tp.topic)) {
          collectedGaps.push({
            name: tp.topic,
            domain: res.specialization || spec,
            score: tp.percentage
          });
        }
      }
    });
    res.skillGaps.forEach((gapName) => {
      if (!collectedGaps.find((g) => g.name === gapName)) {
        collectedGaps.push({
          name: gapName,
          domain: res.specialization || spec,
          score: 55
        });
      }
    });
  });

  // If no gaps recorded yet, supply realistic curriculum gaps for student's field
  if (collectedGaps.length === 0) {
    if (specLower.includes('mpc') || specLower.includes('math') || specLower.includes('eng') || specLower.includes('comp') || specLower.includes('cse')) {
      collectedGaps.push(
        { name: 'Calculus & Chain Rule Formulas', domain: 'Mathematics & Computing', score: 50 },
        { name: 'Motion & Laws of Physics', domain: 'Physics & Mechanics', score: 60 },
        { name: 'Chemical Reactions & Energy', domain: 'Chemistry & Materials', score: 65 }
      );
    } else if (specLower.includes('bio') || specLower.includes('health') || specLower.includes('bipc') || specLower.includes('nurs') || specLower.includes('pharm')) {
      collectedGaps.push(
        { name: 'Cell Energy & Respiration', domain: 'Biology & Life Sciences', score: 52 },
        { name: 'Genetics & Punnett Squares', domain: 'Genetics', score: 58 },
        { name: 'Human Body Systems & Organs', domain: 'Anatomy & Physiology', score: 64 }
      );
    } else if (specLower.includes('comm') || specLower.includes('bba') || specLower.includes('fin') || specLower.includes('econ') || specLower.includes('mec') || specLower.includes('cec')) {
      collectedGaps.push(
        { name: 'Profit, Loss & Break-Even Math', domain: 'Commerce & Accounting', score: 54 },
        { name: 'Supply, Demand & Price Equilibrium', domain: 'Economics', score: 62 },
        { name: 'Balance Sheets & Financial Ratios', domain: 'Business Finance', score: 68 }
      );
    } else {
      collectedGaps.push(
        { name: 'Indian Constitution & Rights', domain: 'Civics & Law', score: 55 },
        { name: 'Government Budget & Inflation', domain: 'Economics', score: 62 },
        { name: 'Clear Essay Writing & Arguments', domain: 'Writing & Logic', score: 70 }
      );
    }
  }

  return collectedGaps.slice(0, 4).map((gap, index) => {
    const isCritical = gap.score < 60;
    const fourWeekPlan = buildFourWeekPlan(gap.name, gap.domain, gap.score);

    return {
      id: `gap-${index + 1}-${gap.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      skillName: gap.name,
      domain: gap.domain,
      currentProficiency: gap.score,
      targetProficiency: 85,
      status: isCritical ? 'Critical Gap' : gap.score < 75 ? 'Developing' : 'Near Mastery',
      identifiedFrom: assessmentResults.length > 0 ? 'Latest Practice Test' : 'Diagnostic Check',
      fourWeekPlan,
      practiceDrill: getPracticeDrillForSkill(gap.name)
    };
  });
}

function buildFourWeekPlan(skillName: string, domain: string, initialScore: number): WeeklyPlan[] {
  return [
    {
      weekNumber: 1,
      title: 'Week 1: Review Definitions & Key Formulas',
      focusArea: 'Clear definitions, basic rules, and simple examples',
      objective: `Clear up any confusion and master the basics of ${skillName}.`,
      whyThisWeek: 'Why this week matters: Learning the definitions and formulas clearly now stops you from making silly mistakes on harder questions later.',
      isCompleted: false,
      tasks: [
        {
          id: `w1_t1`,
          dayNumber: 1,
          title: 'Read core theory and draw a concept summary',
          description: `Write down the main rules and formulas of ${skillName} on a single page in your own words.`,
          taskType: 'Theory Rebuild',
          estimatedMinutes: 30,
          completed: false,
          hint: 'Think about "Why does this rule work?" instead of just memorizing the symbols.'
        },
        {
          id: `w1_t2`,
          dayNumber: 2,
          title: 'Work through 3 textbook examples step-by-step',
          description: 'Write down every step on paper. Notice exactly which step was confusing you previously.',
          taskType: 'Theory Rebuild',
          estimatedMinutes: 35,
          completed: false,
          hint: 'Before writing, ask yourself: What numbers are given in the question, and what do I need to find?'
        },
        {
          id: `w1_t3`,
          dayNumber: 3,
          title: 'Quick Reflection: Explain It Simply',
          description: 'Explain the core idea out loud as if you were teaching a friend who has never seen it before.',
          taskType: 'Reflection',
          estimatedMinutes: 20,
          completed: false,
          reflectionQuestion: `Can you explain the main idea of ${skillName} in 3 simple sentences without using difficult words?`
        }
      ]
    },
    {
      weekNumber: 2,
      title: 'Week 2: Practice Problems with Step-by-Step Hints',
      focusArea: 'Solving different types of questions using small clues',
      objective: 'Practice solving questions on your own with hints instead of searching for answers.',
      whyThisWeek: 'Why this week matters: Trying to solve problems with small clues helps your brain remember the steps much better than reading answers directly.',
      isCompleted: false,
      tasks: [
        {
          id: `w2_t1`,
          dayNumber: 4,
          title: 'Solve 5 standard problems using Hint 1 only',
          description: `Try 5 problems on ${skillName}. If you get stuck, look only at Hint 1 (Concept Clue) and try to finish the rest on your own.`,
          taskType: 'Guided Practice',
          estimatedMinutes: 45,
          completed: false,
          hint: 'Check your units and signs carefully before looking at any hint.'
        },
        {
          id: `w2_t2`,
          dayNumber: 5,
          title: 'Make a "Common Mistakes" checklist',
          description: 'Write down 3 common traps where students usually lose marks on this topic in exams.',
          taskType: 'Guided Practice',
          estimatedMinutes: 25,
          completed: false,
          hint: 'Think about plus/minus sign mistakes, missed exceptions, or misreading the question.'
        },
        {
          id: `w2_t3`,
          dayNumber: 6,
          title: 'Quick Reflection: Your Mistake Patterns',
          description: 'Write down what causes your most common mistake in this topic.',
          taskType: 'Reflection',
          estimatedMinutes: 20,
          completed: false,
          reflectionQuestion: 'What usually causes your mistakes in this topic, and what rule will you use to double-check next time?'
        }
      ]
    },
    {
      weekNumber: 3,
      title: 'Week 3: Timed Practice & Speed Training',
      focusArea: 'Finishing questions accurately within exam time limits',
      objective: 'Score at least 80% correct while spending under 2 minutes per question.',
      whyThisWeek: 'Why this week matters: Practicing with a timer trains you to stay calm and fast so you don\'t run out of time during real exams.',
      isCompleted: false,
      tasks: [
        {
          id: `w3_t1`,
          dayNumber: 7,
          title: 'Timed Mini-Test (10 Questions in 20 Minutes)',
          description: `Take a practice test on ${skillName}. Set a 20-minute timer and do not look at notes until you finish.`,
          taskType: 'Timed Drill',
          estimatedMinutes: 30,
          completed: false,
          hint: 'If a question takes more than 90 seconds, flag it and move on. Come back to it at the end.'
        },
        {
          id: `w3_t2`,
          dayNumber: 8,
          title: 'Review Wrong Answers Carefully',
          description: 'Look at the questions you missed. Note whether you misread the question, made a calculation error, or forgot the rule.',
          taskType: 'Guided Practice',
          estimatedMinutes: 30,
          completed: false,
          hint: 'Don\'t just look at the right letter. Write down why the other options were wrong.'
        },
        {
          id: `w3_t3`,
          dayNumber: 9,
          title: 'Quick Reflection: Managing Your Time',
          description: 'Think about whether you rushed through questions or got stuck on early problems.',
          taskType: 'Reflection',
          estimatedMinutes: 15,
          completed: false,
          reflectionQuestion: 'Did your mistakes come from rushing, or from hesitating on the formulas?'
        }
      ]
    },
    {
      weekNumber: 4,
      title: 'Week 4: Final Review & Teacher Sign-Off',
      focusArea: 'Reviewing real-world uses, using study tools, and teacher feedback',
      objective: 'Demonstrate your improvement on a practice test and share your progress with a mentor.',
      whyThisWeek: 'Why this week matters: Connecting what you learned to real-world examples and getting feedback from a teacher confirms that you have truly mastered this topic.',
      isCompleted: false,
      tasks: [
        {
          id: `w4_t1`,
          dayNumber: 10,
          title: 'Try a real-world example or mini-project',
          description: `Apply ${skillName} to a real-life situation (such as a lab experiment, business story, or data question).`,
          taskType: 'AI Integration',
          estimatedMinutes: 45,
          completed: false,
          hint: 'Ask your AI Socratic Mentor: "How is this topic used in real jobs today?"'
        },
        {
          id: `w4_t2`,
          dayNumber: 11,
          title: 'Take the 20-Question Mastery Test',
          description: `Retake the test for this topic to see your improvement compared to your initial score of ${initialScore}%.`,
          taskType: 'Timed Drill',
          estimatedMinutes: 35,
          completed: false,
          hint: 'Aim for 85% or higher to show that this weak area is completely fixed!'
        },
        {
          id: `w4_t3`,
          dayNumber: 12,
          title: 'Show Your Progress to a Mentor',
          description: 'Share your 4-week task checklist and test results with a teacher, parent, or mentor for helpful feedback.',
          taskType: 'Reflection',
          estimatedMinutes: 20,
          completed: false,
          reflectionQuestion: 'How has your confidence on this topic changed compared to Day 1? What advice would you give a classmate?'
        }
      ]
    }
  ];
}

function getPracticeDrillForSkill(skillName: string) {
  const nameLower = skillName.toLowerCase();

  if (nameLower.includes('calculus') || nameLower.includes('derivative') || nameLower.includes('math')) {
    return {
      question: 'Find the derivative dy/dx for y = ln(sin(3x² + 1)). What is the slope at x = 0?',
      conceptClue: 'Hint 1 (Clue): Use the Chain Rule for nested functions: first take the derivative of the outer ln(u), then sin(v), then 3x² + 1.',
      methodology: 'Hint 2 (Steps): d/dx [ln(u)] = 1/u. d/dx [sin(v)] = cos(v). d/dx [3x² + 1] = 6x. Multiply them together: dy/dx = (1 / sin(3x² + 1)) × cos(3x² + 1) × 6x = 6x × cot(3x² + 1).',
      workedApproach: 'Full Solution: At x = 0, plug in 0: 6(0) × cot(1) = 0. So the slope of the curve at x = 0 is 0.'
    };
  }

  if (nameLower.includes('thermodynamics') || nameLower.includes('energy') || nameLower.includes('physics')) {
    return {
      question: 'A container of gas expands without gaining or losing any heat (adiabatic expansion) and does 450 J of work. How does its internal energy (ΔU) change?',
      conceptClue: 'Hint 1 (Clue): In a process where no heat enters or leaves, heat transfer Q = 0. Use the first law equation: ΔU = Q - W.',
      methodology: 'Hint 2 (Steps): Set Q = 0 in ΔU = Q - W. Since work done by the gas W = +450 J, plug it in.',
      workedApproach: 'Full Solution: ΔU = 0 - 450 J = -450 J. The internal energy drops by 450 J because the gas used its own energy to push outward.'
    };
  }

  if (nameLower.includes('cell') || nameLower.includes('respiration') || nameLower.includes('bio') || nameLower.includes('genetics')) {
    return {
      question: 'When cells turn food into energy (aerobic respiration), which step makes the most ATP energy units, and where does it take place?',
      conceptClue: 'Hint 1 (Clue): Think about Glycolysis (in cell fluid), Krebs cycle (inside the mitochondria center), and Oxidative Phosphorylation (on the inner folds).',
      methodology: 'Hint 2 (Steps): Remember the Electron Transport Chain and the ATP Synthase rotor on the inner membrane folds.',
      workedApproach: 'Full Solution: Oxidative Phosphorylation (Electron Transport Chain), which produces around 26 to 28 ATP units along the inner mitochondrial membrane.'
    };
  }

  return {
    question: `A small business finds that making 1 extra item costs $450 more, but selling it brings in $600 more. Should the business make and sell this extra item?`,
    conceptClue: 'Hint 1 (Clue): Compare the extra money brought in (Marginal Revenue) with the extra money spent (Marginal Cost).',
    methodology: 'Hint 2 (Steps): Extra Revenue = $600. Extra Cost = $450. If revenue is higher than cost, making the item adds profit.',
    workedApproach: 'Full Solution: Yes! Because the business gains $600 while spending only $450, making this unit adds $150 in extra profit.'
  };
}
