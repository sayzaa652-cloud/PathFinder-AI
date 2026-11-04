import { PersonalizedRoadmap, RoadmapPhase, StudentProfile, AssessmentResult } from '../types';

export function generatePersonalizedRoadmap(
  profile: StudentProfile | null,
  assessmentResults: AssessmentResult[] = []
): PersonalizedRoadmap {
  const spec = profile?.specialization || profile?.course || profile?.streamOrGroup || 'General Sciences & Technology';
  const goal = profile?.careerGoals || 'Build strong skills and prepare for future career opportunities';
  const educationLevel = profile?.educationLevel || 'Undergraduate Degree';

  // Aggregate weaknesses and strengths from assessment results
  const allGaps: string[] = [];
  const allStrengths: string[] = [];
  assessmentResults.forEach((res) => {
    res.skillGaps.forEach((g) => {
      if (!allGaps.includes(g)) allGaps.push(g);
    });
    res.strengths.forEach((s) => {
      if (!allStrengths.includes(s)) allStrengths.push(s);
    });
  });

  const specLower = spec.toLowerCase();

  // Determine domain theme
  let domainKey: 'tech' | 'health' | 'commerce' | 'humanities' | 'general' = 'general';
  if (specLower.includes('computer') || specLower.includes('software') || specLower.includes('ai') || specLower.includes('engineering') || specLower.includes('mpc')) {
    domainKey = 'tech';
  } else if (specLower.includes('bio') || specLower.includes('medical') || specLower.includes('nursing') || specLower.includes('pharm') || specLower.includes('bipc') || specLower.includes('mbbs')) {
    domainKey = 'health';
  } else if (specLower.includes('commerce') || specLower.includes('bba') || specLower.includes('finance') || specLower.includes('economics') || specLower.includes('mec') || specLower.includes('cec')) {
    domainKey = 'commerce';
  } else if (specLower.includes('arts') || specLower.includes('civics') || specLower.includes('history') || specLower.includes('law') || specLower.includes('hec')) {
    domainKey = 'humanities';
  }

  const primaryGap = allGaps[0] || (domainKey === 'tech' ? 'Problem Solving with Logic' : domainKey === 'health' ? 'Human Body Systems' : domainKey === 'commerce' ? 'Money & Financial Calculations' : 'Reading & Critical Thinking');
  const secondaryGap = allGaps[1] || (domainKey === 'tech' ? 'Code & Computer Basics' : domainKey === 'health' ? 'Health & Lab Tests' : domainKey === 'commerce' ? 'Business Data & Ratios' : 'Law & Government Basics');

  const phases: RoadmapPhase[] = [
    {
      id: 'phase_1',
      phaseNumber: 1,
      title: 'Phase 1: Build Strong Foundations',
      estimatedWeeks: 4,
      summary: 'Master the key concepts and fix weak areas from your diagnostic tests before moving on to harder topics.',
      whyRecommended: `Why this is recommended: Your tests showed that you need more practice with ${primaryGap}. Reviewing these basics first will make upcoming chapters much easier to understand.`,
      milestones: [
        {
          id: 'm1_1',
          title: `Core Concepts of ${spec}: The Basics`,
          duration: 'Week 1 - 2',
          description: `Review the most important formulas, definitions, and concepts in ${spec}. Focus on understanding why things work instead of just memorizing them.`,
          whyRecommended: `Understanding the basics helps you solve hard exam questions without panicking.`,
          completed: false,
          skillsAcquired: ['Core Concepts', 'Step-by-Step Logic', 'Key Formulas'],
          recommendedResources: [
            {
              title: `${spec} Foundation Guide`,
              type: 'Interactive Book',
              provider: 'Open Education Consortium',
              description: 'Clear textbook chapters with simple self-check questions.',
              linkText: 'Read Foundation Guide',
              focusArea: 'Core Concepts'
            }
          ],
          reflectionPrompt: `Quick Question: How does understanding the concept help you solve questions when you forget the formula?`
        },
        {
          id: 'm1_2',
          title: `Improve Your Weak Area: ${primaryGap}`,
          duration: 'Week 3 - 4',
          description: `Practice 15 targeted problems in ${primaryGap} using step-by-step hints to build your confidence.`,
          whyRecommended: `This directly helps you improve the lowest-scoring topic from your recent test.`,
          completed: false,
          skillsAcquired: [primaryGap, 'Spotting Errors', 'Solving Step-by-Step'],
          recommendedResources: [
            {
              title: `${primaryGap} Practice Lab`,
              type: 'Practice Lab',
              provider: 'PathFinder AI Academy',
              description: 'Helpful practice problems with progressive hints.',
              linkText: 'Start Practice',
              focusArea: primaryGap
            }
          ],
          reflectionPrompt: `Quick Question: What was the main mistake you learned to avoid during these practice questions?`
        }
      ]
    },
    {
      id: 'phase_2',
      phaseNumber: 2,
      title: 'Phase 2: Practice & Exam Preparation',
      estimatedWeeks: 6,
      summary: 'Move from textbook reading to solving real exam questions and taking timed practice tests.',
      whyRecommended: `Why this is recommended: Solving multi-step questions builds speed and confidence for real exams.`,
      milestones: [
        {
          id: 'm2_1',
          title: `Practice More Questions: ${secondaryGap}`,
          duration: 'Week 5 - 7',
          description: `Work through past exam questions in ${secondaryGap}. Learn how to spot clues and avoid common traps.`,
          whyRecommended: `Helps fix remaining tricky topics so you do not lose marks on exam day.`,
          completed: false,
          skillsAcquired: [secondaryGap, 'Spotting Question Patterns', 'Exam Technique'],
          recommendedResources: [
            {
              title: 'Past Exam Question Practice',
              type: 'Practice Lab',
              provider: 'Exam Question Archive',
              description: 'Past examination questions with clear step-by-step answers.',
              linkText: 'Open Past Questions',
              focusArea: 'Exam Preparation'
            }
          ],
          reflectionPrompt: `Quick Question: How do you rule out wrong options when you face a confusing question?`
        },
        {
          id: 'm2_2',
          title: 'Timed Practice Tests & Speed Training',
          duration: 'Week 8 - 10',
          description: 'Take three timed 20-question practice tests. Note down any mistakes in your notebook to review them.',
          whyRecommended: `Practicing with a timer trains you to finish your real exams comfortably on time.`,
          completed: false,
          skillsAcquired: ['Time Management', 'Exam Focus', 'Speed & Accuracy'],
          recommendedResources: [
            {
              title: '20-Question Practice Test',
              type: 'Course',
              provider: 'PathFinder AI Assessment Hub',
              description: 'Timed practice test with instant explanations and score summary.',
              linkText: 'Start Practice Test',
              focusArea: 'Test Practice'
            }
          ],
          reflectionPrompt: `Quick Question: What helps you stay calm and focused when you see an unfamiliar question?`
        }
      ]
    },
    {
      id: 'phase_3',
      phaseNumber: 3,
      title: 'Phase 3: Learning with AI & Modern Tools',
      estimatedWeeks: 5,
      summary: 'Learn how to use AI tools smartly as a study helper without depending on them for answers.',
      whyRecommended: `Why this is recommended: Modern jobs look for students who know how to use AI tools responsibly and check facts carefully.`,
      milestones: [
        {
          id: 'm3_1',
          title: `Using AI in ${spec}: Study Smarter`,
          duration: 'Week 11 - 12',
          description: `Discover how AI can explain difficult concepts and create study summaries in ${spec}. Practice asking good questions.`,
          whyRecommended: `Teaches you how to use AI tools safely to speed up your learning.`,
          completed: false,
          skillsAcquired: ['Writing Clear Prompts', 'Fact-Checking AI', 'Using Study Tools'],
          recommendedResources: [
            {
              title: 'Using AI to Learn Better',
              type: 'Roadmap',
              provider: 'PathFinder AI Learning Guide',
              description: 'A beginner-friendly guide to using AI for research and study.',
              linkText: 'Open AI Guide',
              focusArea: 'AI Basics'
            }
          ],
          reflectionPrompt: `Quick Question: How did you check that an AI-generated answer was actually correct?`
        },
        {
          id: 'm3_2',
          title: 'Spotting AI Mistakes & Staying Honest',
          duration: 'Week 13 - 15',
          description: 'Learn how AI sometimes invents false answers (hallucinations) and how to double-check facts in textbooks.',
          whyRecommended: `Helps you use technology honestly and avoid turning in false or copied information.`,
          completed: false,
          skillsAcquired: ['Finding AI Mistakes', 'Academic Honesty', 'Fact-Checking'],
          recommendedResources: [
            {
              title: 'Honest Learning with AI',
              type: 'Interactive Book',
              provider: 'Student Ethics Guide',
              description: 'Simple examples of AI mistakes and how to check your work.',
              linkText: 'Read Ethics Guide',
              focusArea: 'AI Safety'
            }
          ],
          reflectionPrompt: `Quick Question: Why is your own human judgment always necessary, even when using smart AI tools?`
        }
      ]
    },
    {
      id: 'phase_4',
      phaseNumber: 4,
      title: 'Phase 4: Real-World Project & Mentor Review',
      estimatedWeeks: 5,
      summary: 'Put everything you learned into a real project and share it with your teacher or mentor for feedback.',
      whyRecommended: `Why this is recommended: Having a real project shows college admissions and employers what you can actually do.`,
      milestones: [
        {
          id: 'm4_1',
          title: `Hands-On Project: Practical ${spec}`,
          duration: 'Week 16 - 18',
          description: `Build a small real-world project in ${spec} that connects to your goal: "${goal}".`,
          whyRecommended: `Turns your textbook learning into real proof of your skills for your portfolio.`,
          completed: false,
          skillsAcquired: ['Project Building', 'Writing Project Notes', 'Problem Solving'],
          recommendedResources: [
            {
              title: 'Student Project Ideas & Guides',
              type: 'Practice Lab',
              provider: 'PathFinder Project Hub',
              description: 'Simple project templates and step-by-step guides.',
              linkText: 'Choose a Project',
              focusArea: 'Hands-on Project'
            }
          ],
          reflectionPrompt: `Quick Question: What was the most interesting challenge you solved while working on this project?`
        },
        {
          id: 'm4_2',
          title: 'Teacher / Mentor Review & Feedback',
          duration: 'Week 19 - 20',
          description: 'Show your completed project and test scores to a teacher, mentor, or parent to get helpful feedback.',
          whyRecommended: `Getting feedback from experienced teachers helps you improve and confirms your progress.`,
          completed: false,
          skillsAcquired: ['Explaining Your Work', 'Listening to Feedback', 'Self-Confidence'],
          recommendedResources: [
            {
              title: 'Mentor Review & Feedback Form',
              type: 'Roadmap',
              provider: 'PathFinder Mentorship Hub',
              description: 'Easy feedback form for teachers and mentors.',
              linkText: 'Open Mentor Form',
              focusArea: 'Mentorship'
            }
          ],
          reflectionPrompt: `Quick Question: Looking back at when you started, how has your confidence improved?`
        }
      ]
    }
  ];

  return {
    id: `roadmap-${Date.now()}`,
    studentId: profile?.id || 'default_student',
    specialization: spec,
    targetCareer: goal,
    generatedAt: new Date().toISOString(),
    aiRationaleSummary: `A customized 20-week learning plan created for a ${educationLevel} student in ${spec}. Based on your latest practice scores and your goal of "${goal}". Packed with step-by-step hints and tips to help you learn independently.`,
    phases,
    overallProgress: 0
  };
}
