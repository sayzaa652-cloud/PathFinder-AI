import { 
  WeeklyPlan, ConceptExplanation, FormulaItem, SolvedExample, 
  QuizQuestion, WeeklyProgressTest, VisualLearningItem, RealLifeApplication, 
  PracticeZoneItem, MiniProjectChallenge 
} from '../types';

/**
 * Telangana Intermediate MPC Curriculum Complete Learning Journey Data
 * Strictly covering Mathematics 1A, Mathematics 1B, Physics, and Chemistry.
 */

export interface MPCSubjectCurriculum {
  subject: string;
  topicName: string;
  domain: string;
  fourWeekPlan: WeeklyPlan[];
}

export const MPC_CURRICULUM_DATA: Record<string, MPCSubjectCurriculum> = {
  Mathematics_1A: {
    subject: 'Mathematics 1A',
    topicName: 'Functions, Matrices, Vectors & Trigonometry',
    domain: 'Mathematics 1A (Algebra & Functions)',
    fourWeekPlan: [
      {
        weekNumber: 1,
        title: 'Week 1: Linear Equations, Ratios & Algebraic Foundations',
        focusArea: 'Linear equations in one & two variables, ratio methods, variable isolation',
        objective: 'Master basic variable isolation, ratios, and standard formula substitutions.',
        whyThisWeek: 'Building algebraic confidence in Week 1 eliminates calculation errors in Intermediate Math, Physics numericals & JEE speed drills.',
        isCompleted: false,
        conceptExplanation: {
          summary: 'A linear equation represents a straight line relationship where variables have degree 1. The fundamental rule of algebraic equality is: Whatever operation you perform on the left side of the equals sign (=), you must perform on the right side as well.',
          keyPoints: [
            'Isolate the unknown variable (usually x or y) on one side using inverse operations.',
            'Move constant terms to the opposite side: addition becomes subtraction, multiplication becomes division.',
            'Ratio a:b expresses comparative magnitude; a/b = c/d implies ad = bc (cross-multiplication rule).'
          ],
          realWorldExample: 'Calculating monthly phone bill plans (Fixed Rent + Per GB Data Charge) uses linear equations y = mx + c.',
          syllabusVerificationNote: 'Telangana State Board Intermediate 1st Year Syllabus — Verified Algebra Chapter 1.',
          propertiesAndDefinitions: [
            { term: 'Linear Equation', definition: 'An algebraic equation where every term has an exponent of 1.' },
            { term: 'Coefficient', definition: 'The numerical factor multiplied with a variable (e.g., 5 in 5x).' },
            { term: 'Equivalent Equations', definition: 'Equations that possess identical solution sets.' }
          ]
        },
        formulas: [
          {
            name: 'Standard Linear Equation in One Variable',
            formula: 'ax + b = 0  ⇒  x = -b / a',
            variableDefinitions: 'a = non-zero coefficient, b = constant term, x = unknown variable',
            usageTip: 'Always combine like terms on both sides before performing division.'
          },
          {
            name: 'Cross-Multiplication Ratio Rule',
            formula: 'a / b = c / d  ⇒  a × d = b × c',
            variableDefinitions: 'a, b, c, d = real numbers (b ≠ 0, d ≠ 0)',
            usageTip: 'Useful for scaling recipes, map distances, and chemical stoichiometry ratios.'
          }
        ],
        solvedExamples: [
          {
            id: 'ex_m1a_w1_1',
            problemStatement: 'Solve for x: 3x - 12 = 18',
            givenData: 'Equation: 3x - 12 = 18',
            stepByStepSolution: [
              {
                stepNumber: 1,
                title: 'Add 12 to both sides of the equation',
                description: '3x - 12 + 12 = 18 + 12',
                mathOrFormula: '3x = 30'
              },
              {
                stepNumber: 2,
                title: 'Divide both sides by 3',
                description: 'x = 30 / 3',
                mathOrFormula: 'x = 10'
              }
            ],
            finalAnswer: 'x = 10',
            conceptTakeaway: 'Undo addition or subtraction first before dividing variable coefficients.'
          }
        ],
        visualLearning: {
          mindMapTitle: 'Linear Equations & Ratios Concept Map',
          centralConcept: 'Linear Equations ax + b = c',
          nodes: [
            {
              id: 'n1',
              label: 'Step 1: Simplify Terms',
              subtext: 'Combine x terms and constants on respective sides',
              branches: ['Expand brackets', 'Collect like terms']
            },
            {
              id: 'n2',
              label: 'Step 2: Isolate Variable',
              subtext: 'Perform inverse operations (+ ↔ -, × ↔ ÷)',
              keyFormulaOrRule: 'ax = c - b'
            },
            {
              id: 'n3',
              label: 'Step 3: Solve & Check',
              subtext: 'Divide by a and substitute back into original equation',
              keyFormulaOrRule: 'x = (c - b) / a'
            }
          ],
          diagramSummary: 'Flowchart showing systematic variable isolation steps from raw word problem to final verification.'
        },
        realLifeApplications: [
          {
            id: 'app_m1a_w1_1',
            title: 'Cellular Plan Cost Calculation',
            field: 'Telecommunications & Personal Finance',
            realWorldScenario: 'A telecom provider charges a fixed ₹199 monthly plan plus ₹15 per extra GB of data consumed.',
            howConceptIsUsed: 'Modeled as Linear Equation Total Cost C = 15x + 199. If your budget is ₹499, solve 15x + 199 = 499 to get x = 20 GB extra data allowed.',
            practicalTakeaway: 'Allows consumers to budget monthly utility expenditures with exact precision.'
          },
          {
            id: 'app_m1a_w1_2',
            title: 'GPS Navigation Distance Scaling',
            field: 'Software Engineering & Cartography',
            realWorldScenario: 'Google Maps uses ratio scales where 1 cm on the screen equals 2.5 km in real geographic distance.',
            howConceptIsUsed: 'Uses ratio proportion 1 / 2.5 = x / 18. Cross-multiplying gives screen pixel distance x = 7.2 cm.',
            practicalTakeaway: 'Ratios drive real-time mapping engines and architectural CAD designs.'
          }
        ],
        quizGameQuestions: [
          {
            id: 'q_m1a_w1_1',
            question: 'Solve for x: 4x + 8 = 32',
            options: [{ id: 'A', text: '4' }, { id: 'B', text: '6' }, { id: 'C', text: '8' }, { id: 'D', text: '10' }],
            correctAnswer: 'B',
            explanation: 'Subtract 8 from both sides: 4x = 24. Divide by 4: x = 6.',
            hint: 'First subtract 8 from 32, then divide 24 by 4.',
            level: 'Beginner'
          },
          {
            id: 'q_m1a_w1_2',
            question: 'Solve for y: 5y - 15 = 35',
            options: [{ id: 'A', text: '8' }, { id: 'B', text: '10' }, { id: 'C', text: '12' }, { id: 'D', text: '14' }],
            correctAnswer: 'B',
            explanation: 'Add 15 to 35: 5y = 50. Divide by 5: y = 10.',
            hint: 'Add 15 to 35 first.',
            level: 'Beginner'
          },
          {
            id: 'q_m1a_w1_3',
            question: 'If 2x / 3 = 12, what is the value of x?',
            options: [{ id: 'A', text: '12' }, { id: 'B', text: '18' }, { id: 'C', text: '24' }, { id: 'D', text: '36' }],
            correctAnswer: 'B',
            explanation: 'Multiply both sides by 3: 2x = 36. Divide by 2: x = 18.',
            hint: 'Multiply 12 by 3 first.',
            level: 'Intermediate'
          },
          {
            id: 'q_m1a_w1_4',
            question: 'If (x + 4) / 5 = (x - 2) / 3, find x:',
            options: [{ id: 'A', text: '11' }, { id: 'B', text: '12' }, { id: 'C', text: '13' }, { id: 'D', text: '14' }],
            correctAnswer: 'A',
            explanation: 'Cross multiply: 3(x + 4) = 5(x - 2) ⇒ 3x + 12 = 5x - 10 ⇒ 2x = 22 ⇒ x = 11.',
            hint: 'Cross multiply to clear denominators: 3(x+4) = 5(x-2).',
            level: 'Advanced'
          }
        ],
        practiceZone: [
          {
            id: 'pz_m1a_w1_1',
            title: 'Linear Equation Textbook Problem',
            category: 'Textbook Standard',
            difficulty: 'Intermediate',
            problemText: 'A father is 3 times as old as his son. In 12 years, he will be twice as old as his son. Find the present age of the son.',
            givenParameters: 'Let son present age = x years. Father present age = 3x years.',
            stepByStepSolution: [
              {
                stepNumber: 1,
                title: 'Formulate future age expressions',
                explanation: 'In 12 years: Son = x + 12, Father = 3x + 12.',
                mathOrFormula: 'Father Age = 2 × (Son Age)'
              },
              {
                stepNumber: 2,
                title: 'Set up the linear equation',
                explanation: '3x + 12 = 2(x + 12) ⇒ 3x + 12 = 2x + 24.',
                mathOrFormula: '3x - 2x = 24 - 12'
              },
              {
                stepNumber: 3,
                title: 'Solve for x',
                explanation: 'x = 12 years.',
                mathOrFormula: 'Son age = 12 years, Father age = 36 years'
              }
            ],
            finalAnswer: 'Son present age = 12 years',
            examTip: 'Always define variables clearly and verify future condition: 36 + 12 = 48, which is 2 × (12 + 12) = 48.'
          }
        ],
        miniProject: {
          id: 'proj_m1a_w1',
          title: 'Personalized Budget & Ratio Modeling Challenge',
          subjectContext: 'Mathematics 1A — Applied Algebra & Linear Systems',
          objective: 'Design a mathematical budget planner using linear equations and ratios for a small student event.',
          instructions: [
            '1. Define fixed cost (hall rent = ₹1,500) and variable cost per student (food = ₹120).',
            '2. Write the linear cost function C(x) = 120x + 1500.',
            '3. Calculate the ticket price needed if 50 students attend and you want ₹1,000 profit.',
            '4. Submit your step-by-step algebraic formulation and final ticket price in the response box.'
          ],
          expectedDeliverable: 'A structured 4-step algebraic solution with total revenue, total expense, and ticket price per student.',
          sampleSolutionGuide: 'Total Expenses = 120(50) + 1500 = ₹7,500. Required Revenue = ₹7,500 + ₹1,000 = ₹8,500. Ticket Price = 8500 / 50 = ₹170 per student.',
          rubricCriteria: [
            { criterion: 'Equation Setup', maxPoints: 5, description: 'Correctly formulates linear equation C(x) = 120x + 1500' },
            { criterion: 'Algebraic Calculation', maxPoints: 10, description: 'Accurately calculates total cost and revenue requirements' },
            { criterion: 'Unit Clarity & Explanation', maxPoints: 5, description: 'Clear units (₹) and step explanations' }
          ]
        },
        weeklyProgressTest: {
          id: 'test_m1a_w1',
          title: 'Week 1 Progress Test: Linear Algebra Basics',
          description: 'Test your algebraic equation mastery before unlocking Week 2.',
          passingScore: 4,
          questions: [
            {
              id: 'wpt_m1a_1_1',
              question: 'If 5x - 15 = 35, what is x?',
              options: [{ id: 'A', text: '8' }, { id: 'B', text: '10' }, { id: 'C', text: '12' }, { id: 'D', text: '15' }],
              correctAnswer: 'B',
              explanation: '5x = 50 ⇒ x = 10.',
              hint: 'Add 15 to 35 first.'
            },
            {
              id: 'wpt_m1a_1_2',
              question: 'What is 25% of 80?',
              options: [{ id: 'A', text: '16' }, { id: 'B', text: '20' }, { id: 'C', text: '24' }, { id: 'D', text: '25' }],
              correctAnswer: 'B',
              explanation: '25% is 1/4th. 80 / 4 = 20.',
              hint: '25% equals one quarter (1/4).'
            },
            {
              id: 'wpt_m1a_1_3',
              question: 'In a right triangle with legs 6 cm and 8 cm, what is the hypotenuse?',
              options: [{ id: 'A', text: '9 cm' }, { id: 'B', text: '10 cm' }, { id: 'C', text: '12 cm' }, { id: 'D', text: '14 cm' }],
              correctAnswer: 'B',
              explanation: 'Hypotenuse² = 6² + 8² = 36 + 64 = 100. √100 = 10 cm.',
              hint: 'Pythagoras Theorem: a² + b² = c².'
            },
            {
              id: 'wpt_m1a_1_4',
              question: 'What is the perimeter of a rectangle with length 12 m and width 8 m?',
              options: [{ id: 'A', text: '20 m' }, { id: 'B', text: '40 m' }, { id: 'C', text: '96 m' }, { id: 'D', text: '48 m' }],
              correctAnswer: 'B',
              explanation: 'Perimeter = 2 × (12 + 8) = 2 × 20 = 40 m.',
              hint: 'Perimeter formula is 2 × (Length + Width).'
            },
            {
              id: 'wpt_m1a_1_5',
              question: 'If a vehicle travels 180 km in 3 hours, what is its average speed?',
              options: [{ id: 'A', text: '50 km/h' }, { id: 'B', text: '55 km/h' }, { id: 'C', text: '60 km/h' }, { id: 'D', text: '65 km/h' }],
              correctAnswer: 'C',
              explanation: 'Speed = Distance / Time = 180 / 3 = 60 km/h.',
              hint: 'Divide total distance by total time.'
            }
          ]
        },
        tasks: [
          { id: 'm_w1_t1', dayNumber: 1, title: 'Read Linear Equations Concept Notes & Formulas', description: 'Understand isolating variables, balancing equations, and sign changes.', taskType: 'Theory Rebuild', estimatedMinutes: 20, completed: false, hint: 'Review opposite operations: + flips to -, × flips to ÷.' },
          { id: 'm_w1_t2', dayNumber: 2, title: 'Solve Solved Example 1 step-by-step on paper', description: 'Write out all steps for 3x - 12 = 18 to practice layout neatness.', taskType: 'Guided Practice', estimatedMinutes: 25, completed: false },
          { id: 'm_w1_t3', dayNumber: 3, title: 'Complete Week 1 Short Quiz & Practice Drill', description: 'Attempt quiz questions and check step-by-step explanations.', taskType: 'Guided Practice', estimatedMinutes: 20, completed: false },
          { id: 'm_w1_t4', dayNumber: 4, title: 'Take Week 1 Progress Test', description: 'Score 4/5 or higher on progress test.', taskType: 'Timed Drill', estimatedMinutes: 20, completed: false }
        ]
      }
    ]
  },

  Mathematics_1B: {
    subject: 'Mathematics 1B',
    topicName: 'Locus, Straight Lines, 3D Geometry & Differentiation',
    domain: 'Mathematics 1B (Geometry & Calculus)',
    fourWeekPlan: [
      {
        weekNumber: 1,
        title: 'Week 1: Right-Angle Geometry, Locus & Distance Formula',
        focusArea: 'Pythagoras theorem, 2D distance formula, section formula, locus equations',
        objective: 'Master coordinate distance, locus conditions, and right triangle trigonometry.',
        whyThisWeek: 'Pythagoras theorem and coordinate distance are core foundations for Mathematics 1B and Physics vectors.',
        isCompleted: false,
        conceptExplanation: {
          summary: 'A locus is the set of all points satisfying a given geometric condition. Coordinate geometry uses Cartesian coordinates (x, y) to convert geometric shapes into algebraic equations.',
          keyPoints: [
            'Distance between two points (x₁, y₁) and (x₂, y₂) is d = √[(x₂ - x₁)² + (y₂ - y₁)²].',
            'Midpoint formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
            'In a right triangle with legs a, b and hypotenuse c: a² + b² = c².'
          ],
          realWorldExample: 'GPS satellite receivers calculate user location by finding the intersection point of spherical loci.',
          syllabusVerificationNote: 'Telangana State Board Intermediate 1st Year Syllabus — Verified Mathematics 1B Coordinate Geometry.',
          propertiesAndDefinitions: [
            { term: 'Locus', definition: 'The path traced by a point moving in accordance with specified geometric constraints.' },
            { term: 'Cartesian Plane', definition: 'A 2D coordinate system specified by two perpendicular axis lines X and Y.' }
          ]
        },
        formulas: [
          {
            name: 'Distance Formula in 2D',
            formula: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
            variableDefinitions: 'Points P₁(x₁, y₁) and P₂(x₂, y₂)',
            usageTip: 'Distance from origin (0, 0) simplifies to √(x² + y²).'
          },
          {
            name: 'Pythagoras Theorem',
            formula: 'a² + b² = c²',
            variableDefinitions: 'a, b = perpendicular legs, c = hypotenuse',
            usageTip: 'Remember standard triplets: (3,4,5), (5,12,13), (6,8,10), (8,15,17).'
          }
        ],
        solvedExamples: [
          {
            id: 'ex_m1b_w1_1',
            problemStatement: 'Find the locus of a point P(x, y) which is equidistant from points A(2, 3) and B(4, 1).',
            givenData: 'PA = PB where A=(2, 3), B=(4, 1)',
            stepByStepSolution: [
              {
                stepNumber: 1,
                title: 'Square both sides of PA = PB',
                description: 'PA² = PB²',
                mathOrFormula: '(x - 2)² + (y - 3)² = (x - 4)² + (y - 1)²'
              },
              {
                stepNumber: 2,
                title: 'Expand algebraic squares',
                description: 'x² - 4x + 4 + y² - 6y + 9 = x² - 8x + 16 + y² - 2y + 1',
                mathOrFormula: '-4x - 6y + 13 = -8x - 2y + 17'
              },
              {
                stepNumber: 3,
                title: 'Simplify to linear equation of locus',
                description: '4x - 4y - 4 = 0 ⇒ x - y - 1 = 0',
                mathOrFormula: 'x - y = 1'
              }
            ],
            finalAnswer: 'Equation of locus: x - y - 1 = 0',
            conceptTakeaway: 'The locus of points equidistant from two fixed points is the perpendicular bisector of the line segment connecting them.'
          }
        ],
        visualLearning: {
          mindMapTitle: 'Coordinate Geometry & Locus Mind Map',
          centralConcept: 'Point P(x, y) Motion & Locus',
          nodes: [
            {
              id: 'l1',
              label: 'Distance Formula',
              subtext: 'd = √[(Δx)² + (Δy)²]',
              keyFormulaOrRule: 'Equidistant PA = PB ⇒ PA² = PB²'
            },
            {
              id: 'l2',
              label: 'Section Formula',
              subtext: 'Internal ratio m:n division',
              keyFormulaOrRule: '((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))'
            },
            {
              id: 'l3',
              label: 'Locus Result',
              subtext: 'Simplifies to Straight Line or Circle equation',
              keyFormulaOrRule: 'Ax + By + C = 0'
            }
          ]
        },
        realLifeApplications: [
          {
            id: 'app_m1b_w1_1',
            title: 'Cell Tower Triangulation',
            field: 'Mobile Networks & Emergency Response',
            realWorldScenario: '3 cell towers measure distance to a mobile device to pinpoint emergency caller location.',
            howConceptIsUsed: 'Each tower defines a circle locus (x - h)² + (y - k)² = r². Solving the 3 circle equations gives exact user coordinates.',
            practicalTakeaway: 'Powering 108 emergency response and location tracking.'
          },
          {
            id: 'app_m1b_w1_2',
            title: 'Robotic Arm Coordinate Movement',
            field: 'Robotics & Industrial Automation',
            realWorldScenario: 'An automated assembly robot moves an arm from point A(10, 20) to B(50, 80) on a factory conveyor.',
            howConceptIsUsed: 'Distance formula calculates total arm travel distance; section formula computes mid-path velocity checkpoints.',
            practicalTakeaway: 'Ensures accurate robot welding and surgical arm precision.'
          }
        ],
        quizGameQuestions: [
          {
            id: 'q_m1b_w1_1',
            question: 'What is the distance between points (0, 0) and (6, 8)?',
            options: [{ id: 'A', text: '8' }, { id: 'B', text: '10' }, { id: 'C', text: '12' }, { id: 'D', text: '14' }],
            correctAnswer: 'B',
            explanation: 'd = √(6² + 8²) = √(36 + 64) = √100 = 10.',
            hint: 'Calculate √(6² + 8²).',
            level: 'Beginner'
          },
          {
            id: 'q_m1b_w1_2',
            question: 'What is the hypotenuse of a right triangle with legs 5 cm and 12 cm?',
            options: [{ id: 'A', text: '13 cm' }, { id: 'B', text: '14 cm' }, { id: 'C', text: '15 cm' }, { id: 'D', text: '16 cm' }],
            correctAnswer: 'A',
            explanation: 'c² = 5² + 12² = 25 + 144 = 169. √169 = 13 cm.',
            hint: 'Pythagorean triplet (5, 12, 13).',
            level: 'Beginner'
          },
          {
            id: 'q_m1b_w1_3',
            question: 'Find the midpoint of segment joining A(4, 6) and B(8, 10):',
            options: [{ id: 'A', text: '(5, 7)' }, { id: 'B', text: '(6, 8)' }, { id: 'C', text: '(6, 7)' }, { id: 'D', text: '(7, 8)' }],
            correctAnswer: 'B',
            explanation: 'Midpoint = ((4+8)/2, (6+10)/2) = (12/2, 16/2) = (6, 8).',
            hint: 'Average the x coordinates and y coordinates.',
            level: 'Intermediate'
          },
          {
            id: 'q_m1b_w1_4',
            question: 'The locus of a point which moves such that its distance from origin is always 5 units is:',
            options: [{ id: 'A', text: 'x + y = 5' }, { id: 'B', text: 'x² + y² = 25' }, { id: 'C', text: 'x² - y² = 25' }, { id: 'D', text: 'xy = 25' }],
            correctAnswer: 'B',
            explanation: '√(x² + y²) = 5 ⇒ x² + y² = 25 (equation of a circle).',
            hint: 'Square the distance formula from origin √(x² + y²) = 5.',
            level: 'Advanced'
          }
        ],
        practiceZone: [
          {
            id: 'pz_m1b_w1_1',
            title: 'Locus Equation Derivation',
            category: 'Textbook Standard',
            difficulty: 'Intermediate',
            problemText: 'Find the equation of the locus of a point P which moves such that the square of its distance from origin is equal to 3 times its y-coordinate.',
            givenParameters: 'Point P(x, y). Distance from origin O(0,0) squared = OP².',
            stepByStepSolution: [
              {
                stepNumber: 1,
                title: 'Write expression for OP²',
                explanation: 'OP² = (x - 0)² + (y - 0)² = x² + y².',
                mathOrFormula: 'OP² = x² + y²'
              },
              {
                stepNumber: 2,
                title: 'Apply given condition',
                explanation: 'Given: OP² = 3y.',
                mathOrFormula: 'x² + y² = 3y'
              },
              {
                stepNumber: 3,
                title: 'Re-arrange into standard form',
                explanation: 'x² + y² - 3y = 0.',
                mathOrFormula: 'x² + y² - 3y = 0'
              }
            ],
            finalAnswer: 'Locus equation: x² + y² - 3y = 0',
            examTip: 'This represents a circle with center (0, 1.5) and radius 1.5.'
          }
        ],
        miniProject: {
          id: 'proj_m1b_w1',
          title: 'Satellite Tracking Locus Simulation',
          subjectContext: 'Mathematics 1B — Applied Locus & Circles',
          objective: 'Calculate the trajectory equation of a satellite moving around a station.',
          instructions: [
            '1. Assume tracking station at origin O(0,0). Satellite maintains fixed distance 100 km.',
            '2. Write the locus equation x² + y² = 10,000.',
            '3. If satellite moves to new orbit centered at S(30, 40) with radius 50 km, write its updated equation (x - 30)² + (y - 40)² = 2,500.',
            '4. Submit the expanded quadratic locus form in the submission box.'
          ],
          expectedDeliverable: 'Expanded circle locus equation: x² + y² - 60x - 80y + 2000 = 0.',
          sampleSolutionGuide: 'x² - 60x + 900 + y² - 80y + 1600 = 2500 ⇒ x² + y² - 60x - 80y + 2000 = 0.',
          rubricCriteria: [
            { criterion: 'Circle Locus Setup', maxPoints: 5, description: 'Correctly sets up (x - h)² + (y - k)² = r²' },
            { criterion: 'Algebraic Expansion', maxPoints: 10, description: 'Accurately expands and combines constant terms' },
            { criterion: 'Final Form Neatness', maxPoints: 5, description: 'Presents general circle equation x² + y² + 2gx + 2fy + c = 0' }
          ]
        },
        weeklyProgressTest: {
          id: 'test_m1b_w1',
          title: 'Week 1 Progress Test: Geometry & Locus',
          description: '5 questions testing 2D geometry and distance calculations.',
          passingScore: 4,
          questions: [
            {
              id: 'wpt_m1b_1_1',
              question: 'In a right triangle with legs 5 cm and 12 cm, what is the hypotenuse?',
              options: [{ id: 'A', text: '13 cm' }, { id: 'B', text: '14 cm' }, { id: 'C', text: '15 cm' }, { id: 'D', text: '16 cm' }],
              correctAnswer: 'A',
              explanation: '5² + 12² = 25 + 144 = 169. √169 = 13 cm.',
              hint: 'Triplet (5, 12, 13).'
            },
            {
              id: 'wpt_m1b_1_2',
              question: 'What is the distance between (0, 0) and (3, 4)?',
              options: [{ id: 'A', text: '5' }, { id: 'B', text: '6' }, { id: 'C', text: '7' }, { id: 'D', text: '8' }],
              correctAnswer: 'A',
              explanation: '√(3² + 4²) = √25 = 5.',
              hint: '√(3² + 4²).'
            },
            {
              id: 'wpt_m1b_1_3',
              question: 'What is the area of a square with side 8 cm?',
              options: [{ id: 'A', text: '32 cm²' }, { id: 'B', text: '64 cm²' }, { id: 'C', text: '16 cm²' }, { id: 'D', text: '128 cm²' }],
              correctAnswer: 'B',
              explanation: 'Area = side² = 8 × 8 = 64 cm².',
              hint: 'Side squared.'
            },
            {
              id: 'wpt_m1b_1_4',
              question: 'What is the perimeter of a rectangle with length 10 cm and width 6 cm?',
              options: [{ id: 'A', text: '16 cm' }, { id: 'B', text: '32 cm' }, { id: 'C', text: '60 cm' }, { id: 'D', text: '40 cm' }],
              correctAnswer: 'B',
              explanation: '2 × (10 + 6) = 32 cm.',
              hint: '2 × (l + w).'
            },
            {
              id: 'wpt_m1b_1_5',
              question: 'If a car travels 150 km in 3 hours, what is its speed?',
              options: [{ id: 'A', text: '40 km/h' }, { id: 'B', text: '50 km/h' }, { id: 'C', text: '60 km/h' }, { id: 'D', text: '70 km/h' }],
              correctAnswer: 'B',
              explanation: 'Speed = 150 / 3 = 50 km/h.',
              hint: 'Distance / Time.'
            }
          ]
        },
        tasks: [
          { id: 'm1b_w1_t1', dayNumber: 1, title: 'Study Pythagoras & Distance Formulas', description: 'Learn c² = a² + b² and coordinate distance formula.', taskType: 'Theory Rebuild', estimatedMinutes: 20, completed: false },
          { id: 'm1b_w1_t2', dayNumber: 2, title: 'Take Week 1 Progress Test', description: 'Complete geometry mini-test.', taskType: 'Timed Drill', estimatedMinutes: 20, completed: false }
        ]
      }
    ]
  },

  Physics: {
    subject: 'Physics',
    topicName: 'Physical World, Units, Mechanics & Energy',
    domain: 'Physics & Mechanics',
    fourWeekPlan: [
      {
        weekNumber: 1,
        title: 'Week 1: Physical World, Units & Newton\'s Laws of Motion (F = ma)',
        focusArea: 'SI units, dimensional analysis, inertia, momentum, Newton\'s 3 laws, force vectors',
        objective: 'Master SI base units, acceleration equations, and single-object Newton force calculations.',
        whyThisWeek: 'Newton\'s laws are the core foundation of all physics mechanics tested in 11th/12th Intermediate & entrance exams.',
        isCompleted: false,
        conceptExplanation: {
          summary: 'Physics quantifies natural phenomena using SI base units (Meter, Kilogram, Second, Ampere, Kelvin, Mole, Candela). Force is an interaction that changes an object\'s state of motion. Newton\'s 2nd Law establishes that net force equals mass times acceleration (F = ma).',
          keyPoints: [
            '1st Law (Inertia): An object continues in rest or uniform straight line motion unless acted on by external force.',
            '2nd Law (F = ma): Force = mass × acceleration (SI Unit: Newton N = kg·m/s²).',
            '3rd Law (Action-Reaction): Forces occur in equal and opposite pairs acting on different bodies.'
          ],
          realWorldExample: 'When a car braking system triggers, seatbelts exert backward force to overcome passenger inertia (Newton\'s 1st Law).',
          syllabusVerificationNote: 'Telangana State Board Intermediate 1st Year Syllabus — Verified Physics Chapter 3 & 5.',
          propertiesAndDefinitions: [
            { term: 'Inertia', definition: 'The inherent property of a body to resist changes in its state of rest or motion.' },
            { term: 'Newton (N)', definition: 'Force required to accelerate 1 kg mass at 1 m/s².' }
          ]
        },
        formulas: [
          {
            name: 'Newton\'s Second Law',
            formula: 'F = m × a',
            variableDefinitions: 'F = Net Force (N), m = mass (kg), a = acceleration (m/s²)',
            usageTip: 'Ensure mass is converted to kg and acceleration to m/s² before multiplying.'
          },
          {
            name: 'Weight Formula',
            formula: 'W = m × g',
            variableDefinitions: 'W = Weight (N), m = mass (kg), g = acceleration due to gravity (≈ 9.8 m/s²)',
            usageTip: 'Mass is constant everywhere; weight varies with local gravitational field g.'
          }
        ],
        solvedExamples: [
          {
            id: 'ex_p_w1_1',
            problemStatement: 'Calculate the force required to accelerate a 5 kg object at 4 m/s².',
            givenData: 'm = 5 kg, a = 4 m/s²',
            stepByStepSolution: [
              {
                stepNumber: 1,
                title: 'Apply Newton\'s 2nd Law formula',
                description: 'F = m × a',
                mathOrFormula: 'F = 5 kg × 4 m/s²'
              },
              {
                stepNumber: 2,
                title: 'Calculate result',
                description: 'F = 20 N',
                mathOrFormula: 'F = 20 Newtons'
              }
            ],
            finalAnswer: 'Force = 20 N',
            conceptTakeaway: 'Force in SI units is expressed in Newtons (N = kg·m/s²).'
          }
        ],
        visualLearning: {
          mindMapTitle: 'Newton\'s Laws & Mechanics Mind Map',
          centralConcept: 'Force & Motion (Mechanics)',
          nodes: [
            {
              id: 'p1',
              label: '1st Law: Inertia',
              subtext: 'Resists velocity changes',
              keyFormulaOrRule: 'F_net = 0 ⇒ v = constant'
            },
            {
              id: 'p2',
              label: '2nd Law: F = ma',
              subtext: 'Momentum rate of change dp/dt',
              keyFormulaOrRule: 'F = m × a'
            },
            {
              id: 'p3',
              label: '3rd Law: Action = -Reaction',
              subtext: 'Equal magnitude, opposite direction',
              keyFormulaOrRule: 'F_AB = -F_BA'
            }
          ]
        },
        realLifeApplications: [
          {
            id: 'app_p_w1_1',
            title: 'Rocket Launch Propulsion',
            field: 'Aerospace Engineering & ISRO Missions',
            realWorldScenario: 'ISRO PSLV rockets discharge high-speed hot gases downward through exhaust nozzles.',
            howConceptIsUsed: 'By Newton\'s 3rd Law, gas downward action creates equal upward reaction force (thrust) accelerating the rocket upward (F = ma).',
            practicalTakeaway: 'Enables satellite launches into geostationary orbits.'
          },
          {
            id: 'app_p_w1_2',
            title: 'Automobile Crash Test Safety',
            field: 'Automotive Design & Passenger Safety',
            realWorldScenario: 'Vehicle crumple zones extend collision duration from 0.01s to 0.1s.',
            howConceptIsUsed: 'Impulse F × Δt = Δp. Increasing collision time Δt reduces impact force F by 10x, saving lives.',
            practicalTakeaway: 'Drives airbag and seatbelt safety engineering.'
          }
        ],
        quizGameQuestions: [
          {
            id: 'q_p_w1_1',
            question: 'If a net force of 50 N is applied to a mass of 10 kg, what is the acceleration?',
            options: [{ id: 'A', text: '2 m/s²' }, { id: 'B', text: '5 m/s²' }, { id: 'C', text: '10 m/s²' }, { id: 'D', text: '500 m/s²' }],
            correctAnswer: 'B',
            explanation: 'a = F / m = 50 / 10 = 5 m/s².',
            hint: 'Rearrange F = ma to a = F / m.',
            level: 'Beginner'
          },
          {
            id: 'q_p_w1_2',
            question: 'Which law explains why passengers jerk forward when a bus stops suddenly?',
            options: [{ id: 'A', text: 'Newton\'s First Law' }, { id: 'B', text: 'Newton\'s Second Law' }, { id: 'C', text: 'Newton\'s Third Law' }, { id: 'D', text: 'Law of Gravitation' }],
            correctAnswer: 'A',
            explanation: 'Inertia of motion causes the upper body to stay in motion when feet stop with the bus.',
            hint: 'Inertia of motion.',
            level: 'Beginner'
          },
          {
            id: 'q_p_w1_3',
            question: 'What is the weight of a 4 kg object on Earth where g = 9.8 m/s²?',
            options: [{ id: 'A', text: '9.8 N' }, { id: 'B', text: '19.6 N' }, { id: 'C', text: '39.2 N' }, { id: 'D', text: '40 N' }],
            correctAnswer: 'C',
            explanation: 'W = m × g = 4 × 9.8 = 39.2 N.',
            hint: 'W = m × g.',
            level: 'Intermediate'
          },
          {
            id: 'q_p_w1_4',
            question: 'A 1,000 kg car accelerates from rest to 20 m/s in 5 seconds. What is the average net force?',
            options: [{ id: 'A', text: '2,000 N' }, { id: 'B', text: '4,000 N' }, { id: 'C', text: '5,000 N' }, { id: 'D', text: '10,000 N' }],
            correctAnswer: 'B',
            explanation: 'Acceleration a = (20 - 0) / 5 = 4 m/s². Force F = m × a = 1000 × 4 = 4,000 N.',
            hint: 'Find acceleration a = v/t first, then F = ma.',
            level: 'Advanced'
          }
        ],
        practiceZone: [
          {
            id: 'pz_p_w1_1',
            title: 'Elevator Tension & Apparent Weight Problem',
            category: 'Numerical Problem',
            difficulty: 'Intermediate',
            problemText: 'A 60 kg student stands on a weighing scale inside an elevator accelerating upward at 2 m/s². What reading does the scale show? (Take g = 10 m/s²).',
            givenParameters: 'm = 60 kg, a = 2 m/s² upward, g = 10 m/s².',
            stepByStepSolution: [
              {
                stepNumber: 1,
                title: 'Draw free body diagram & set up force equation',
                explanation: 'Normal reaction N acts upward, gravity mg acts downward.',
                mathOrFormula: 'N - mg = ma'
              },
              {
                stepNumber: 2,
                title: 'Solve for Normal force N',
                explanation: 'N = m(g + a) = 60 × (10 + 2) = 60 × 12 = 720 N.',
                mathOrFormula: 'N = 720 N'
              },
              {
                stepNumber: 3,
                title: 'Convert to apparent mass reading',
                explanation: 'Apparent mass reading = N / g = 720 / 10 = 72 kg.',
                mathOrFormula: 'Scale Reading = 72 kg'
              }
            ],
            finalAnswer: 'Scale reading = 72 kg (720 N)',
            examTip: 'When accelerating upward, apparent weight increases to m(g + a). When accelerating downward, it drops to m(g - a).'
          }
        ],
        miniProject: {
          id: 'proj_p_w1',
          title: 'Friction & Slope Acceleration Experiment',
          subjectContext: 'Physics 1st Year — Dynamics & Inclined Planes',
          objective: 'Analyze how slope angle affects sliding object acceleration using F = ma.',
          instructions: [
            '1. Consider a wooden block sliding down a smooth 30° inclined plane.',
            '2. Write the component of gravity along the plane: F_parallel = mg sin(30°).',
            '3. Calculate the block acceleration neglecting friction: a = g sin(30°) = 10 × 0.5 = 5 m/s².',
            '4. Submit your step-by-step force decomposition and final acceleration in the text area.'
          ],
          expectedDeliverable: 'Clear force breakdown showing mg sin θ along incline, yielding a = 5 m/s².',
          sampleSolutionGuide: 'F_net = ma ⇒ mg sin(30°) = ma ⇒ a = g sin(30°) = 9.8 × 0.5 = 4.9 m/s² (or 5 m/s² if g=10).',
          rubricCriteria: [
            { criterion: 'Vector Resolution', maxPoints: 5, description: 'Correctly resolves weight into mg sin θ and mg cos θ components' },
            { criterion: 'Acceleration Formula', maxPoints: 10, description: 'Accurately derives a = g sin θ' },
            { criterion: 'SI Unit Precision', maxPoints: 5, description: 'Uses m/s² units correctly' }
          ]
        },
        weeklyProgressTest: {
          id: 'test_phys_w1',
          title: 'Week 1 Progress Test: Laws of Motion & Forces',
          description: '5 questions testing Newton\'s laws and force calculations.',
          passingScore: 4,
          questions: [
            {
              id: 'wpt_p1_1',
              question: 'If a net force of 50 N is applied to a mass of 10 kg, what is the acceleration?',
              options: [{ id: 'A', text: '2 m/s²' }, { id: 'B', text: '5 m/s²' }, { id: 'C', text: '10 m/s²' }, { id: 'D', text: '500 m/s²' }],
              correctAnswer: 'B',
              explanation: 'a = F / m = 50 / 10 = 5 m/s².',
              hint: 'Rearrange F = ma to a = F / m.'
            },
            {
              id: 'wpt_p1_2',
              question: 'Which law of motion explains seatbelts during sudden braking?',
              options: [{ id: 'A', text: 'First Law (Inertia)' }, { id: 'B', text: 'Second Law (F = ma)' }, { id: 'C', text: 'Third Law' }, { id: 'D', text: 'Gravitation' }],
              correctAnswer: 'A',
              explanation: 'Inertia keeps the body moving forward.',
              hint: 'Inertia resists motion changes.'
            },
            {
              id: 'wpt_p1_3',
              question: 'What is the standard SI unit of force?',
              options: [{ id: 'A', text: 'Joule' }, { id: 'B', text: 'Watt' }, { id: 'C', text: 'Newton' }, { id: 'D', text: 'Pascal' }],
              correctAnswer: 'C',
              explanation: 'Newton (N).',
              hint: 'Named after Sir Isaac Newton.'
            },
            {
              id: 'wpt_p1_4',
              question: 'If an object of mass 4 kg has g = 9.8 m/s², what is its weight?',
              options: [{ id: 'A', text: '9.8 N' }, { id: 'B', text: '19.6 N' }, { id: 'C', text: '39.2 N' }, { id: 'D', text: '40 N' }],
              correctAnswer: 'C',
              explanation: 'W = 4 × 9.8 = 39.2 N.',
              hint: 'Multiply mass by g.'
            },
            {
              id: 'wpt_p1_5',
              question: 'Rocket lift-off relies on downward gas blast creating upward push. Which law is this?',
              options: [{ id: 'A', text: 'First Law' }, { id: 'B', text: 'Second Law' }, { id: 'C', text: 'Third Law' }, { id: 'D', text: 'Ohm\'s Law' }],
              correctAnswer: 'C',
              explanation: 'Third Law (Action-Reaction).',
              hint: 'Equal & opposite pair.'
            }
          ]
        },
        tasks: [
          { id: 'p_w1_t1', dayNumber: 1, title: 'Read Newton\'s 3 Laws & F = ma Notes', description: 'Understand inertia, force vectors, and acceleration definitions.', taskType: 'Theory Rebuild', estimatedMinutes: 20, completed: false },
          { id: 'p_w1_t2', dayNumber: 2, title: 'Solve Solved Example 1 for F = ma', description: 'Practice calculating force and acceleration.', taskType: 'Guided Practice', estimatedMinutes: 20, completed: false },
          { id: 'p_w1_t3', dayNumber: 3, title: 'Take Week 1 Progress Test', description: 'Complete the Newton\'s laws quiz.', taskType: 'Timed Drill', estimatedMinutes: 20, completed: false }
        ]
      }
    ]
  },

  Chemistry: {
    subject: 'Chemistry',
    topicName: 'Atomic Structure, Chemical Bonding & Stoichiometry',
    domain: 'Chemistry & Materials',
    fourWeekPlan: [
      {
        weekNumber: 1,
        title: 'Week 1: Atomic Structure, Chemical Formulas & Balancing',
        focusArea: 'Subatomic particles, valency, balancing reactions, conservation of mass',
        objective: 'Write chemical formulas accurately and balance stoichiometry reactions.',
        whyThisWeek: 'Balancing chemical equations is essential for stoichiometry, inorganic, and physical chemistry in Intermediate & NEET/JEE.',
        isCompleted: false,
        conceptExplanation: {
          summary: 'Atoms consist of a dense positive nucleus containing Protons and Neutrons, surrounded by revolving negative Electrons. Chemical reactions rearrange atoms without altering atomic nuclei. The Law of Conservation of Mass requires equal numbers of each element on reactant and product sides.',
          keyPoints: [
            'Table Salt = NaCl (Sodium Chloride). Water = H₂O. Hydrochloric Acid = HCl.',
            'Always balance equations using integer coefficients in front of formulas, NEVER alter subscript numbers inside formulas.',
            'Reactants (left side) → Products (right side).'
          ],
          realWorldExample: 'Rusting of iron infrastructure (4Fe + 3O₂ → 2Fe₂O₃) consumes oxygen from atmospheric humidity.',
          syllabusVerificationNote: 'Telangana State Board Intermediate 1st Year Syllabus — Verified Chemistry Chapter 1 & 3.',
          propertiesAndDefinitions: [
            { term: 'Stoichiometry', definition: 'The calculation of quantitative relationships of reactants and products in chemical reactions.' },
            { term: 'Valency', definition: 'The combining capacity of an element determined by its valence electrons.' }
          ]
        },
        formulas: [
          {
            name: 'Balanced Water Synthesis Equation',
            formula: '2H₂ + O₂ → 2H₂O',
            variableDefinitions: '4 Hydrogen atoms & 2 Oxygen atoms on both reactant and product sides',
            usageTip: 'Count atom totals on both sides before finalizing coefficients.'
          },
          {
            name: 'Neutralization Reaction Formula',
            formula: 'Acid + Base → Salt + Water',
            variableDefinitions: 'HCl (Acid) + NaOH (Base) → NaCl (Salt) + H₂O (Water)',
            usageTip: 'Yields neutral salt and water with pH near 7.'
          }
        ],
        solvedExamples: [
          {
            id: 'ex_c_w1_1',
            problemStatement: 'Balance the chemical reaction: Mg + O₂ → MgO',
            givenData: 'Unbalanced reaction: Mg + O₂ → MgO',
            stepByStepSolution: [
              {
                stepNumber: 1,
                title: 'Count oxygen atoms on both sides',
                description: 'Reactant side has 2 Oxygen atoms in O₂. Product side has 1 in MgO.',
                mathOrFormula: 'Reactant O = 2, Product O = 1'
              },
              {
                stepNumber: 2,
                title: 'Add coefficient 2 in front of MgO',
                description: 'Mg + O₂ → 2MgO',
                mathOrFormula: 'Now Product O = 2, Product Mg = 2'
              },
              {
                stepNumber: 3,
                title: 'Balance Magnesium coefficient',
                description: 'Add 2 in front of Mg reactant: 2Mg + O₂ → 2MgO.',
                mathOrFormula: '2Mg + O₂ → 2MgO'
              }
            ],
            finalAnswer: 'Balanced Equation: 2Mg + O₂ → 2MgO',
            conceptTakeaway: 'Both sides now contain exactly 2 Mg atoms and 2 O atoms.'
          }
        ],
        visualLearning: {
          mindMapTitle: 'Atomic Structure & Balancing Mind Map',
          centralConcept: 'Chemical Equation Balancing',
          nodes: [
            {
              id: 'c1',
              label: 'Step 1: Unbalanced Skeleton',
              subtext: 'Write correct molecular formulas',
              keyFormulaOrRule: 'Reactants → Products'
            },
            {
              id: 'c2',
              label: 'Step 2: Atom Inventory',
              subtext: 'List element counts on left and right',
              keyFormulaOrRule: 'Law of Conservation of Mass'
            },
            {
              id: 'c3',
              label: 'Step 3: Adjust Coefficients',
              subtext: 'Multiply whole numbers in front',
              keyFormulaOrRule: '2Mg + O₂ → 2MgO'
            }
          ]
        },
        realLifeApplications: [
          {
            id: 'app_c_w1_1',
            title: 'Pharmaceutical Drug Synthesis',
            field: 'Pharmaceutical Industry & Healthcare',
            realWorldScenario: 'Pharma engineers balance organic reactions to manufacture exact dosages of Paracetamol or Insulin.',
            howConceptIsUsed: 'Stoichiometry calculates exact raw material quantities required to produce 1,000 kg of medicine without wasted toxic side products.',
            practicalTakeaway: 'Powers Hyderabad\'s world-leading pharmaceutical manufacturing hubs.'
          },
          {
            id: 'app_c_w1_2',
            title: 'Water Purification & Neutralization',
            field: 'Environmental Engineering & Municipal Utilities',
            realWorldScenario: 'Water treatment plants treat acidic industrial wastewater before releasing it into rivers.',
            howConceptIsUsed: 'Acid-base neutralization stoichiometry (Lime Ca(OH)₂ + H₂SO₄ → CaSO₄ + 2H₂O) brings wastewater pH safely to 7.0.',
            practicalTakeaway: 'Protects aquatic ecosystems and municipal drinking supplies.'
          }
        ],
        quizGameQuestions: [
          {
            id: 'q_c_w1_1',
            question: 'What is the chemical formula of common table salt?',
            options: [{ id: 'A', text: 'NaCl' }, { id: 'B', text: 'KCl' }, { id: 'C', text: 'NaOH' }, { id: 'D', text: 'CaCl₂' }],
            correctAnswer: 'A',
            explanation: 'NaCl (Sodium Chloride) is common table salt.',
            hint: 'Sodium Chloride.',
            level: 'Beginner'
          },
          {
            id: 'q_c_w1_2',
            question: 'What is the pH value of pure distilled water at 25°C?',
            options: [{ id: 'A', text: '0' }, { id: 'B', text: '5' }, { id: 'C', text: '7' }, { id: 'D', text: '14' }],
            correctAnswer: 'C',
            explanation: 'Pure water is neutral with a pH of exactly 7.',
            hint: 'Neutral pH.',
            level: 'Beginner'
          },
          {
            id: 'q_c_w1_3',
            question: 'What gas is evolved when active Zinc metal reacts with dilute Hydrochloric acid?',
            options: [{ id: 'A', text: 'Oxygen' }, { id: 'B', text: 'Hydrogen' }, { id: 'C', text: 'Carbon dioxide' }, { id: 'D', text: 'Nitrogen' }],
            correctAnswer: 'B',
            explanation: 'Zn + 2HCl → ZnCl₂ + H₂↑ (Hydrogen gas burns with a pop sound).',
            hint: 'Metal + Acid produces Hydrogen gas.',
            level: 'Intermediate'
          },
          {
            id: 'q_c_w1_4',
            question: 'How many total atoms are present in 1 mole of Calcium Carbonate CaCO₃?',
            options: [{ id: 'A', text: '3' }, { id: 'B', text: '5' }, { id: 'C', text: '5 × 6.022 × 10²³' }, { id: 'D', text: '6.022 × 10²³' }],
            correctAnswer: 'C',
            explanation: 'Each CaCO₃ formula unit contains 1 Ca + 1 C + 3 O = 5 atoms. In 1 mole, total atoms = 5 × Avogadro\'s number.',
            hint: 'Count atoms per molecule (1+1+3 = 5) and multiply by N_A.',
            level: 'Advanced'
          }
        ],
        practiceZone: [
          {
            id: 'pz_c_w1_1',
            title: 'Stoichiometry Mass-Mass Calculation',
            category: 'Numerical Problem',
            difficulty: 'Intermediate',
            problemText: 'Calculate the mass of Oxygen gas required to completely burn 24 g of Magnesium ribbon. (Molar masses: Mg = 24 g/mol, O = 16 g/mol).',
            givenParameters: 'Reaction: 2Mg + O₂ → 2MgO. Mass of Mg = 24 g.',
            stepByStepSolution: [
              {
                stepNumber: 1,
                title: 'Write balanced equation & molar masses',
                explanation: '2 moles Mg (2 × 24 = 48 g) react with 1 mole O₂ (32 g).',
                mathOrFormula: '48 g Mg ↔ 32 g O₂'
              },
              {
                stepNumber: 2,
                title: 'Set up mass proportion for 24 g Mg',
                explanation: 'Mass of O₂ = (32 / 48) × 24 = 16 g.',
                mathOrFormula: 'Mass O₂ = 16 g'
              }
            ],
            finalAnswer: 'Mass of O₂ required = 16 grams',
            examTip: 'Always convert given mass to moles first or use molar ratio proportions.'
          }
        ],
        miniProject: {
          id: 'proj_c_w1',
          title: 'Household Acid-Base Indicator Experiment',
          subjectContext: 'Chemistry 1st Year — Natural Indicators & pH Analysis',
          objective: 'Test household liquids (lemon juice, soap water, baking soda, tap water) using natural turmeric indicator.',
          instructions: [
            '1. Prepare natural indicator using turmeric powder in water (yellow in neutral/acid, deep reddish-brown in base).',
            '2. Test 3 items: Lemon juice, Baking soda solution, and Tap water.',
            '3. Record observed color changes and identify acidity/basicity.',
            '4. Submit your results table in the project submission area.'
          ],
          expectedDeliverable: 'Report showing Lemon juice (Yellow/Acidic), Baking soda (Reddish-brown/Basic), Tap water (Yellow/Neutral).',
          sampleSolutionGuide: 'Turmeric contains curcumin which turns deep reddish-brown in alkaline solutions above pH 8.5.',
          rubricCriteria: [
            { criterion: 'Observation Accuracy', maxPoints: 10, description: 'Correctly identifies color changes for acid, base, and neutral' },
            { criterion: 'pH Classification', maxPoints: 5, description: 'Accurately classifies liquids as acidic, basic, or neutral' },
            { criterion: 'Scientific Explanation', maxPoints: 5, description: 'Explains indicator chemistry in simple terms' }
          ]
        },
        weeklyProgressTest: {
          id: 'test_chem_w1',
          title: 'Week 1 Progress Test: Chemical Formulas & Equations',
          description: 'Test chemical formulas and reaction principles.',
          passingScore: 4,
          questions: [
            {
              id: 'wpt_c1_1',
              question: 'What is the chemical formula of common table salt?',
              options: [{ id: 'A', text: 'NaCl' }, { id: 'B', text: 'KCl' }, { id: 'C', text: 'NaOH' }, { id: 'D', text: 'CaCl₂' }],
              correctAnswer: 'A',
              explanation: 'NaCl.',
              hint: 'Sodium Chloride.'
            },
            {
              id: 'wpt_c1_2',
              question: 'What is the pH value of pure distilled water at 25°C?',
              options: [{ id: 'A', text: '0' }, { id: 'B', text: '5' }, { id: 'C', text: '7' }, { id: 'D', text: '14' }],
              correctAnswer: 'C',
              explanation: 'Pure water is neutral with pH 7.',
              hint: 'Neutral pH.'
            },
            {
              id: 'wpt_c1_3',
              question: 'What color does blue litmus paper turn in acidic lemon juice?',
              options: [{ id: 'A', text: 'Red' }, { id: 'B', text: 'Green' }, { id: 'C', text: 'Yellow' }, { id: 'D', text: 'Stays Blue' }],
              correctAnswer: 'A',
              explanation: 'Acids turn blue litmus red.',
              hint: 'Acids turn litmus red.'
            },
            {
              id: 'wpt_c1_4',
              question: 'What gas is produced when an active metal reacts with dilute acid?',
              options: [{ id: 'A', text: 'Oxygen' }, { id: 'B', text: 'Hydrogen' }, { id: 'C', text: 'Carbon dioxide' }, { id: 'D', text: 'Nitrogen' }],
              correctAnswer: 'B',
              explanation: 'Hydrogen gas (H₂).',
              hint: 'Burns with a pop sound.'
            },
            {
              id: 'wpt_c1_5',
              question: 'What is the chemical formula for water?',
              options: [{ id: 'A', text: 'H₂O' }, { id: 'B', text: 'CO₂' }, { id: 'C', text: 'NaCl' }, { id: 'D', text: 'NH₃' }],
              correctAnswer: 'A',
              explanation: 'H₂O.',
              hint: '2 Hydrogen, 1 Oxygen.'
            }
          ]
        },
        tasks: [
          { id: 'c_w1_t1', dayNumber: 1, title: 'Study Chemical Symbols & Formula Notes', description: 'Learn NaCl, H₂O, CO₂, HCl, NaOH formulas.', taskType: 'Theory Rebuild', estimatedMinutes: 20, completed: false },
          { id: 'c_w1_t2', dayNumber: 2, title: 'Practice Balancing 3 Simple Equations', description: 'Balance H₂ + O₂ → H₂O and Mg + O₂ → MgO.', taskType: 'Guided Practice', estimatedMinutes: 20, completed: false },
          { id: 'c_w1_t3', dayNumber: 3, title: 'Take Week 1 Progress Test', description: 'Complete chemical formulas test.', taskType: 'Timed Drill', estimatedMinutes: 20, completed: false }
        ]
      }
    ]
  }
};
