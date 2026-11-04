import { PreviousYearPaper, SmartNoteItem, StudyPlanSlot } from '../types';

export const PREVIOUS_YEAR_PAPERS: PreviousYearPaper[] = [
  {
    id: 'pyq_inter_mpc_2025',
    examName: 'Telangana & AP State Board Intermediate (12th)',
    category: 'Intermediate / +2',
    year: 2025,
    subject: 'Mathematics 2A & 2B (Calculus, Probability & Analytical Geometry)',
    totalMarks: 75,
    timeHours: 3,
    sections: [
      {
        name: 'Section A: Very Short Answer (VSA)',
        description: '10 compulsory questions testing fundamental properties and direct derivations (2 marks each).',
        sampleQuestions: [
          'Find the coordinates of the points on the curve y = x^3 - 3x where the tangent is parallel to the x-axis.',
          'Evaluate the definite integral ∫ (from 0 to π/2) [sin^5(x) / (sin^5(x) + cos^5(x))] dx using definite integral properties.',
          'Define the eccentricity of a hyperbola and write the relation between a, b, and e for standard form x^2/a^2 - y^2/b^2 = 1.'
        ]
      },
      {
        name: 'Section B: Short Answer Questions (SAQ)',
        description: 'Solve any 5 of 7 analytical problems (4 marks each).',
        sampleQuestions: [
          'Prove by mathematical induction that 1^2 + 2^2 + 3^2 + ... + n^2 = [n(n+1)(2n+1)] / 6 for all natural numbers n.',
          'Find the equation of the circle passing through the origin and making intercepts of lengths 4 and 6 on the coordinate axes.'
        ]
      },
      {
        name: 'Section C: Long Answer Questions (LAQ)',
        description: 'Solve any 5 of 7 multi-step proofs and calculus applications (7 marks each).',
        sampleQuestions: [
          'Solve the differential equation dy/dx + y*sec(x) = tan(x) with initial condition y(0) = 1.',
          'Find the maximum volume of a right circular cylinder that can be inscribed in a sphere of radius R.'
        ]
      }
    ],
    markingScheme: 'Full step-marking enforced: 1 mark for formula statement, 3 marks for intermediate simplification, 3 marks for final numerical/algebraic result with units.'
  },
  {
    id: 'pyq_neet_biology_2025',
    examName: 'National Eligibility cum Entrance Test (NEET-UG)',
    category: 'National Entrance',
    year: 2025,
    subject: 'Biology (Botany & Zoology: NCERT Core)',
    totalMarks: 360,
    timeHours: 3,
    sections: [
      {
        name: 'Botany Section A & B',
        description: '45 MCQs covering Plant Physiology, Cell Division, Genetics & Plant Reproduction (+4 for correct, -1 for incorrect).',
        sampleQuestions: [
          'During non-cyclic photophosphorylation in chloroplasts, which complex is responsible for the photolysis of water into protons, electrons, and oxygen?',
          'In a dihybrid test cross exhibiting incomplete dominance, what is the expected phenotypic ratio of the F2 generation?',
          'Which plant hormone is synthesized in shoot apices and acts as the primary mediator of apical dominance in vascular plants?'
        ]
      },
      {
        name: 'Zoology Section A & B',
        description: '45 MCQs covering Human Physiology, Endocrinology, Evolution & Biotechnology.',
        sampleQuestions: [
          'Explain the counter-current multiplier mechanism in the loop of Henle and vasa recta for the concentration of urine in mammalian nephrons.',
          'Which vector is most widely employed for transferring recombinant DNA into dicotyledonous plant cells during transgenic crop generation?',
          'Match the cranial nerves with their corresponding sensory or motor innervations in the human autonomic nervous system.'
        ]
      }
    ],
    markingScheme: 'Negative marking rule: +4 marks for every correct option, -1 mark deducted for incorrect choice, 0 marks for unattempted questions.'
  },
  {
    id: 'pyq_jee_physics_2025',
    examName: 'JEE Main & Advanced (National Engineering Entrance)',
    category: 'National Entrance',
    year: 2025,
    subject: 'Physics (Mechanics, Electrodynamics, Modern Physics & Optics)',
    totalMarks: 100,
    timeHours: 3,
    sections: [
      {
        name: 'Section I: Single Option Correct MCQs',
        description: '20 conceptual problems with rigorous multi-concept interactions (+4 / -1).',
        sampleQuestions: [
          'A uniform solid cylinder of mass M and radius R rolls without slipping down an inclined plane of angle θ. Calculate the minimum coefficient of static friction required to prevent slipping.',
          'A parallel plate capacitor with plate area A and separation d is filled with two dielectric slabs of constants K1 and K2 each of thickness d/2. Find the equivalent capacitance.'
        ]
      },
      {
        name: 'Section II: Numerical Value Integer Answer Questions',
        description: '10 problems where answers must be rounded off to the nearest integer (attempt any 5).',
        sampleQuestions: [
          'A radioactive sample decays from an initial activity of 8000 disintegrations/second to 1000 disintegrations/second in 60 minutes. Find the half-life in minutes.',
          'An alternating voltage V = 200√2 sin(100t) V is connected across an LCR series circuit with R = 10 Ω, L = 100 mH, and C = 100 μF. What is the power dissipation in Watts at resonance?'
        ]
      }
    ],
    markingScheme: 'Rigorous calculation with significant figures. Dimensional analysis checked on step derivations.'
  },
  {
    id: 'pyq_cbse_10_science_2025',
    examName: 'CBSE Class 10 Secondary Board Examination',
    category: 'School / 10th',
    year: 2025,
    subject: 'Science (Physics, Chemistry & Biology Integrated)',
    totalMarks: 80,
    timeHours: 3,
    sections: [
      {
        name: 'Section A: Objective & Assertion-Reasoning',
        description: '20 questions of 1 mark each testing direct conceptual recall and scientific reasoning.',
        sampleQuestions: [
          'Why does an aqueous solution of an acid conduct electricity whereas glucose solution does not?',
          'Assertion (A): The inner lining of the small intestine has numerous finger-like projections called villi. Reason (R): Villi increase the surface area for efficient absorption of digested food.',
          'State Snell\'s law of refraction and define the refractive index of a medium with respect to vacuum.'
        ]
      },
      {
        name: 'Section B & C: Short & Long Answer Problems',
        description: 'Structured chemical equations, ray diagrams, and genetic Punnett squares.',
        sampleQuestions: [
          'Draw a ray diagram showing image formation by a concave mirror when an object is placed between the Focus (F) and Centre of Curvature (C). Mention image nature and position.',
          'Write balanced chemical equations for: (i) Decomposition of ferrous sulphate upon heating, (ii) Reaction of zinc granules with dilute sulphuric acid.'
        ]
      }
    ],
    markingScheme: 'Diagrams require neat labeling (1 mark for diagram, 1 mark for labeling). Chemical equations require states of matter (s, l, g, aq).'
  },
  {
    id: 'pyq_btech_cse_dsa_2025',
    examName: 'University B.Tech Degree Semester Exam',
    category: 'University Degree',
    year: 2025,
    subject: 'Data Structures & Algorithms (CSE-201)',
    totalMarks: 70,
    timeHours: 3,
    sections: [
      {
        name: 'Part A: Compulsory Conceptual Questions',
        description: '10 short questions covering complexity, tree rotations, and hashing (20 marks).',
        sampleQuestions: [
          'Differentiate between Little-o and Big-O asymptotic notations with mathematical definitions.',
          'Explain how collision resolution is handled using Quadratic Probing and Double Hashing.',
          'Demonstrate the Left-Right (LR) rotation on an unbalanced AVL tree with a step diagram.'
        ]
      },
      {
        name: 'Part B: Analytical Algorithm Design & Complexity Proofs',
        description: '5 long-form questions with pseudocode and time complexity derivations (50 marks).',
        sampleQuestions: [
          'Write the pseudocode for Dijkstra\'s Single Source Shortest Path algorithm using a min-heap priority queue. Prove that its running time is O((V + E) log V).',
          'Solve the 0/1 Knapsack problem using Dynamic Programming for weights [2, 3, 4, 5] and values [3, 4, 5, 6] with capacity W = 8. Show the completed DP matrix.'
        ]
      }
    ],
    markingScheme: 'Full marks require pseudocode syntax clarity, loop invariant proof, and formal asymptotic analysis.'
  }
];

export const SMART_NOTES_DATA: SmartNoteItem[] = [
  {
    id: 'note_1',
    subject: 'Mathematics & Computing',
    topic: 'Differential Calculus & Chain Rule Essentials',
    summaryBulletPoints: [
      'The derivative tells you the speed or rate of change, which is the slope of the curve at any point.',
      'Chain Rule: Use this when one function is inside another. Take the derivative of the outside function, then multiply by the derivative of the inside.',
      'Product Rule: derivative of (u * v) = u\'v + uv\'. Quotient Rule: derivative of (u / v) = (u\'v - uv\') / v^2.',
      'Turning points occur where dy/dx = 0 or where it does not exist. If the second derivative is positive, it is a local minimum (a valley).'
    ],
    keyFormulasOrConcepts: [
      'd/dx [x^n] = n * x^(n-1)',
      'd/dx [sin(x)] = cos(x) · d/dx [cos(x)] = -sin(x)',
      'd/dx [e^x] = e^x · d/dx [ln(x)] = 1/x',
      'd/dx [tan(x)] = sec^2(x) · d/dx [cot(x)] = -csc^2(x)'
    ],
    commonExamPitfalls: [
      'Forgetting to multiply by the inside derivative in the Chain Rule (for example, derivative of sin(3x) is 3cos(3x), NOT cos(3x)).',
      'Mixing up the order in Quotient Rule: always start with u\'v - uv\', never the other way around.'
    ],
    aiCrossDisciplinaryNote: 'In Machine Learning, training neural networks uses this exact chain rule repeatedly to make predictions more accurate.'
  },
  {
    id: 'note_2',
    subject: 'Life Sciences & Medicine',
    topic: 'Cellular Respiration & ATP Energy Basics',
    summaryBulletPoints: [
      'Cellular respiration turns energy from food (glucose) into usable cell energy (ATP) through 4 main stages.',
      'Stage 1: Glycolysis (in cell fluid) breaks 1 glucose into 2 pyruvate molecules and makes 2 net ATP. This step does not need oxygen.',
      'Stage 2: Pyruvate conversion (inside mitochondria) creates Acetyl-CoA and releases carbon dioxide.',
      'Stage 3: Krebs Cycle (inside mitochondria) produces energy carrier molecules (NADH, FADH2) and 2 more ATP.',
      'Stage 4: Electron Transport Chain (inner membrane) makes the bulk of cell energy (~26 to 28 ATP) using oxygen.'
    ],
    keyFormulasOrConcepts: [
      'Overall equation: C6H12O6 + 6O2 -> 6CO2 + 6H2O + ~30-32 ATP units',
      '1 NADH produces about 2.5 ATP units.',
      '1 FADH2 produces about 1.5 ATP units.',
      'Proton flow drives the spinning ATP Synthase machine in the cell.'
    ],
    commonExamPitfalls: [
      'Thinking that Glycolysis requires oxygen (it works completely without oxygen).',
      'Forgetting that each glucose molecule runs through the Krebs Cycle twice (once for each pyruvate).'
    ],
    aiCrossDisciplinaryNote: 'Scientists use computer simulations of cell energy cycles to find new ways to treat cancer cells.'
  },
  {
    id: 'note_3',
    subject: 'Commerce & Economics',
    topic: 'Price Elasticity of Demand & Market Balance',
    summaryBulletPoints: [
      'Price Elasticity of Demand measures how much customer buying changes when the price goes up or down.',
      'If Elastic (> 1): A small price increase causes a big drop in sales (like luxury goods or optional items).',
      'If Inelastic (< 1): People still buy it even if the price rises (like medicine, basic groceries, or petrol).',
      'Market Equilibrium is the sweet spot where the amount buyers want equals the amount sellers produce.'
    ],
    keyFormulasOrConcepts: [
      'Elasticity = (% Change in Quantity) / (% Change in Price)',
      'Total Revenue = Price * Quantity Sold',
      'Substitute Goods (Tea vs Coffee): Price rise in one increases demand for the other.'
    ],
    commonExamPitfalls: [
      'Forgetting that price elasticity is usually spoken as a positive number.',
      'Confusing moving along the curve (because price changed) with the whole curve shifting (because people\'s incomes or tastes changed).'
    ],
    aiCrossDisciplinaryNote: 'Online shopping websites use AI models to automatically test price elasticity and set discounts.'
  }
];

export const DEFAULT_STUDY_PLAN_SLOTS: StudyPlanSlot[] = [
  {
    id: 'slot_1',
    timeSlot: '06:30 AM - 08:00 AM',
    subject: 'Morning Math / Problem Practice',
    topic: 'Calculus & Problem Solving Drills',
    taskType: 'Deep Study',
    completed: true,
    notes: 'Finished 12 practice problems on the Chain Rule and formulas.'
  },
  {
    id: 'slot_2',
    timeSlot: '10:00 AM - 11:30 AM',
    subject: 'Core Subject Theory',
    topic: 'Key Concepts & Clear Explanations',
    taskType: 'Deep Study',
    completed: false,
    notes: 'Read textbook chapters and summarized key concept formulas in notebook.'
  },
  {
    id: 'slot_3',
    timeSlot: '03:00 PM - 04:30 PM',
    subject: 'Weak Topic Practice (4-Week Plan)',
    topic: 'Step-by-Step Practice with Hints',
    taskType: 'Problem Solving',
    completed: false,
    notes: 'Worked through Week 2 practice problems using hints when stuck.'
  },
  {
    id: 'slot_4',
    timeSlot: '06:00 PM - 07:00 PM',
    subject: 'AI Readiness & Modern Tools',
    topic: 'Learning to Use & Verify AI Tools',
    taskType: 'Revision',
    completed: false,
    notes: 'Took a quick practice quiz and checked whether AI answers were accurate.'
  },
  {
    id: 'slot_5',
    timeSlot: '08:30 PM - 09:30 PM',
    subject: 'Evening Review & Daily Reflection',
    topic: 'Review Mistakes & Journal Progress',
    taskType: 'Revision',
    completed: false,
    notes: 'Wrote down key mistakes to avoid and completed today\'s reflection question.'
  }
];
