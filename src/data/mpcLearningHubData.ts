/**
 * Official Telangana Board of Intermediate Education (TGBIE) Curriculum
 * Reference Portal: https://tgbie.cgg.gov.in
 * Academic Year: 2026–27
 * 
 * Complete 46 Chapters/Units for Intermediate 1st Year MPC:
 * - Mathematics IA (12 Chapters)
 * - Mathematics IB (10 Chapters)
 * - Physics (14 Units)
 * - Chemistry (10 Chapters)
 */

export interface ConceptNoteItem {
  id: string;
  conceptHeading: string;
  simpleMeaning: string;
  keyPoints: string[];
  terminology: { term: string; definition: string }[];
  formula?: string;
  easyExample: string;
  commonMistakes: string[];
  shortSummary: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
}

export interface PracticeProblem {
  id: string;
  title: string;
  category: 'Basic Understanding' | 'Concept-Based' | 'Formula Practice' | 'Textbook Exercise';
  problemText: string;
  hintStepByStep: string[];
  fullExplanation: string;
  finalAnswer: string;
}

export interface MiniProject {
  id: string;
  title: string;
  objective: string;
  materialsRequired: string[];
  steps: string[];
  expectedOutcome: string;
}

export interface LearningResourceLink {
  id: string;
  title: string;
  topicType: 'Concept Explanation' | 'Formula & Derivation' | 'Numerical Problem Solving';
  searchQueryUrl: string;
  sourceName: string;
  description: string;
  topicName?: string;
  language?: 'English' | 'Hindi' | 'Telugu';
  teacherName?: string;
  channelName?: string;
}

export interface ChapterLearningSuite {
  chapterNumber: number;
  chapterName: string;
  introSimpleEnglish: string;
  conceptNotes: ConceptNoteItem[];
  realLifeUses: { title: string; scenario: string; iconName: string }[];
  quizQuestions: QuizQuestion[];
  practiceProblems: PracticeProblem[];
  miniProjects: MiniProject[];
  learningResources: LearningResourceLink[];
}

export interface SubjectCurriculumData {
  subjectId: 'math_1a' | 'math_1b' | 'physics_1' | 'chemistry_1';
  subjectTitle: 'Mathematics IA' | 'Mathematics IB' | 'Physics' | 'Chemistry';
  shortLabel: string;
  description: string;
  chapters: ChapterLearningSuite[];
}

// Helper to generate multilingual YouTube video resources for any chapter
export function createMultilingualResources(subjectName: string, chapterNum: number, chapterName: string): LearningResourceLink[] {
  const encChapter = encodeURIComponent(chapterName);
  const encSubj = encodeURIComponent(subjectName);
  return [
    {
      id: `${subjectName.toLowerCase()}_res_${chapterNum}_en`,
      title: `${chapterName} Full Chapter Walkthrough & Key Formulas`,
      topicType: 'Concept Explanation',
      topicName: `${chapterName} Concepts & Problem Solving`,
      language: 'English',
      teacherName: 'Sal Khan / Expert Faculty',
      channelName: 'Khan Academy / Unacademy STEM',
      searchQueryUrl: `https://www.youtube.com/results?search_query=${encChapter}+${encSubj}+Class+11+English`,
      sourceName: 'Khan Academy',
      description: `Comprehensive English walkthrough covering core textbook concepts, derivations, and solved problems for ${chapterName}.`
    },
    {
      id: `${subjectName.toLowerCase()}_res_${chapterNum}_hi`,
      title: `${chapterName} One-Shot Masterclass & Board Solved Examples`,
      topicType: 'Formula & Derivation',
      topicName: `${chapterName} Formulas & Derivations`,
      language: 'Hindi',
      teacherName: 'Alakh Pandey Sir / Team',
      channelName: 'Physics Wallah (PW)',
      searchQueryUrl: `https://www.youtube.com/results?search_query=${encChapter}+${encSubj}+Class+11+Physics+Wallah+Hindi`,
      sourceName: 'Physics Wallah',
      description: `Detailed Hindi video lecture with step-by-step formula derivations and board exam question solving for ${chapterName}.`
    },
    {
      id: `${subjectName.toLowerCase()}_res_${chapterNum}_te`,
      title: `${chapterName} Telangana Intermediate 1st Year Board Solutions`,
      topicType: 'Numerical Problem Solving',
      topicName: `TGBIE ${chapterName} Board Questions`,
      language: 'Telugu',
      teacherName: 'Master Board Faculty',
      channelName: 'Vedantu Telugu / Unacademy Telugu / Mana TV',
      searchQueryUrl: `https://www.youtube.com/results?search_query=${encChapter}+Telangana+Intermediate+1st+Year+${encSubj}+Telugu`,
      sourceName: 'Vedantu Telugu',
      description: `Telangana Board Intermediate textbook exercise solutions explained step-by-step in Telugu.`
    }
  ];
}

export const MPC_LEARNING_HUB_DATA: Record<string, SubjectCurriculumData> = {
  // =========================================================================
  // MATHEMATICS IA (12 CHAPTERS)
  // =========================================================================
  math_1a: {
    subjectId: 'math_1a',
    subjectTitle: 'Mathematics IA',
    shortLabel: 'Maths 1A',
    description: 'Telangana Board Intermediate 1st Year Mathematics IA covering Algebra, Trigonometry, Vectors, and Matrices.',
    chapters: [
      {
        chapterNumber: 1,
        chapterName: 'Sets and Relations',
        introSimpleEnglish: 'Think of a set as a bag or container holding unique objects. Just like you group books by subject, sets help us organize distinct mathematical elements cleanly.',
        conceptNotes: [
          {
            id: 'm1a_c1_n1',
            conceptHeading: 'Meaning of Sets & Element Belonging',
            simpleMeaning: 'A set is a well-defined collection of distinct items. Well-defined means anyone can clearly tell whether an item belongs to the set or not.',
            keyPoints: [
              'Objects inside a set are called elements or members.',
              'Capital letters (A, B, C) represent sets; lowercase letters represent elements.',
              'Order of elements inside a set does not matter: {1, 2} is identical to {2, 1}.',
              'Duplicate elements are never repeated in a set.'
            ],
            terminology: [
              { term: 'Set', definition: 'A well-defined collection of distinct objects.' },
              { term: 'Element (∈)', definition: 'An individual item inside a set.' },
              { term: 'Cardinality n(A)', definition: 'Total count of unique elements in set A.' }
            ],
            formula: 'Element Belonging: x ∈ A · Non-Belonging: x ∉ A · Cardinality: n(A)',
            easyExample: 'If A = {2, 3, 5, 7} is prime numbers < 10, then 3 ∈ A, but 4 ∉ A, and n(A) = 4.',
            commonMistakes: ['Writing duplicate items inside a set: {1, 2, 2, 3} instead of {1, 2, 3}.'],
            shortSummary: 'A set collects distinct items. Elements use ∈, non-elements use ∉, and n(A) counts unique elements.'
          }
        ],
        realLifeUses: [{ title: 'Library Cataloging', scenario: 'Grouping unique book IDs by genres.', iconName: 'Layers' }],
        quizQuestions: [{ id: 'm1a_q1_1', question: 'If A = {1, 3, 5, 7}, what is n(A)?', options: ['3', '4', '5', '7'], correctAnswerIndex: 1, explanation: 'n(A) counts the elements: 1, 3, 5, 7 ⟹ 4 elements.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p1_1', title: 'Finding Set Cardinality', category: 'Basic Understanding', problemText: 'Find n(A) for A = {x | x is a vowel in "MATHEMATICS"}.', hintStepByStep: ['Vowels in MATHEMATICS are A, E, I.', 'Unique set A = {A, E, I}.'], fullExplanation: 'The unique vowels are A, E, I. Therefore n(A) = 3.', finalAnswer: '3' }],
        miniProjects: [{ id: 'm1a_proj_1', title: 'Library Set Sorting Chart', objective: 'Create set Venn diagrams for library genre overlaps.', materialsRequired: ['Paper, colored pens'], steps: ['1. List books in Set A and Set B.', '2. Find intersection A ∩ B.'], expectedOutcome: 'Visual understanding of set operations.' }],
        learningResources: createMultilingualResources('Maths 1A', 1, 'Sets and Relations')
      },
      {
        chapterNumber: 2,
        chapterName: 'Functions',
        introSimpleEnglish: 'A function is like a processing machine. You put an input x into the machine, and it produces exactly one output y = f(x).',
        conceptNotes: [
          {
            id: 'm1a_c2_n1',
            conceptHeading: 'Definition & Mapping Rules',
            simpleMeaning: 'A relation f: A ➔ B is a function if every element in domain A is mapped to a unique element in co-domain B.',
            keyPoints: ['Every domain element MUST have an image.', 'No domain element can have multiple images.', 'Range is the set of actual output values (Range ⊆ Co-domain).'],
            terminology: [{ term: 'Domain', definition: 'Set of all allowed input values x.' }],
            formula: 'f: A ➔ B · Range(f) = {f(x) | x ∈ A} ⊆ B',
            easyExample: 'If f(x) = x², then f(3) = 9.',
            commonMistakes: ['Thinking a domain element can map to two outputs.'],
            shortSummary: 'Functions map every domain element to a unique co-domain output.'
          }
        ],
        realLifeUses: [{ title: 'Vending Machines', scenario: 'Button code input yields unique drink item.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'm1a_q2_1', question: 'If f(x) = 2x + 5, what is f(4)?', options: ['11', '13', '9', '15'], correctAnswerIndex: 1, explanation: 'f(4) = 2(4) + 5 = 8 + 5 = 13.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p2_1', title: 'Finding Function Domain', category: 'Basic Understanding', problemText: 'Find domain of f(x) = 1/(x - 4).', hintStepByStep: ['Denominator cannot be zero: x - 4 ≠ 0.'], fullExplanation: 'x - 4 ≠ 0 ⟹ x ≠ 4. Domain = R - {4}.', finalAnswer: 'R - {4}' }],
        miniProjects: [{ id: 'm1a_proj_2', title: 'Function Machine Diagram', objective: 'Draw input-output mapping diagrams.', materialsRequired: ['Chart paper'], steps: ['1. Draw domain set A and co-domain B.', '2. Draw arrows representing f(x).'], expectedOutcome: 'Visual mapping comprehension.' }],
        learningResources: createMultilingualResources('Maths 1A', 2, 'Functions')
      },
      {
        chapterNumber: 3,
        chapterName: 'Sequences and Series',
        introSimpleEnglish: 'A sequence is an ordered list of numbers following a pattern. In an Arithmetic Progression (A.P.), each term increases by adding a fixed constant difference d.',
        conceptNotes: [
          {
            id: 'm1a_c3_n1',
            conceptHeading: 'Arithmetic Progression (A.P.) General Term & Sum',
            simpleMeaning: 'An A.P. adds a fixed constant d to each term. General term formula a_n calculates any term directly.',
            keyPoints: ['General term: a_n = a + (n - 1)d.', 'Sum formula: S_n = (n/2)[2a + (n - 1)d].', 'Alternate sum: S_n = (n/2)(a + l).'],
            terminology: [{ term: 'Common Difference d', definition: 'd = a₂ - a₁' }],
            formula: 'a_n = a + (n - 1)d · S_n = (n/2)[2a + (n - 1)d]',
            easyExample: 'In A.P. 3, 8, 13, 18... a = 3, d = 5, 15th term a₁₅ = 3 + 14(5) = 73.',
            commonMistakes: ['Using nd instead of (n - 1)d.'],
            shortSummary: 'a_n = a + (n-1)d. S_n = (n/2)[2a + (n-1)d].'
          }
        ],
        realLifeUses: [{ title: 'Salary Increment Plans', scenario: 'Annual salary raising by a fixed increment amount.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'm1a_q3_1', question: 'Find 10th term of A.P. 2, 5, 8, 11...', options: ['29', '27', '31', '32'], correctAnswerIndex: 0, explanation: 'a = 2, d = 3. a₁₀ = 2 + 9(3) = 29.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p3_1', title: '15th Term Calculation', category: 'Formula Practice', problemText: 'Find 15th term of A.P. 3, 8, 13...', hintStepByStep: ['a=3, d=5, n=15.', 'a₁₅ = 3 + 14(5)'], fullExplanation: 'a₁₅ = 3 + 70 = 73.', finalAnswer: '73' }],
        miniProjects: [{ id: 'm1a_proj_3', title: 'Savings Compound Chart', objective: 'Model monthly savings increment using A.P.', materialsRequired: ['Excel/Paper'], steps: ['1. Plot monthly payments.', '2. Compute S₁₂.'], expectedOutcome: 'Financial series planning.' }],
        learningResources: createMultilingualResources('Maths 1A', 3, 'Sequences and Series')
      },
      {
        chapterNumber: 4,
        chapterName: 'Mathematical Induction',
        introSimpleEnglish: 'Mathematical Induction is a 3-step proof technique. If the 1st domino falls, and any k-th domino knocks down the (k+1)-th domino, then all dominoes fall!',
        conceptNotes: [
          {
            id: 'm1a_c4_n1',
            conceptHeading: 'Principle of Mathematical Induction (PMI)',
            simpleMeaning: 'Proves a mathematical statement P(n) for all natural numbers n using Base Step P(1) and Inductive Step P(k) ⟹ P(k+1).',
            keyPoints: ['Step 1: Prove base case P(1) is true.', 'Step 2: Assume P(k) is true for arbitrary integer k ≥ 1.', 'Step 3: Prove P(k+1) is true using assumption P(k).'],
            terminology: [{ term: 'Inductive Hypothesis', definition: 'Assumption that P(k) holds true.' }],
            formula: 'Base P(1) ∧ [P(k) ⟹ P(k+1)] ⟹ ∀ n ∈ N, P(n) holds',
            easyExample: 'Proving sum 1 + 2 + ... + n = n(n+1)/2 for all n.',
            commonMistakes: ['Forgetting to check the base case P(1).'],
            shortSummary: 'Check P(1) ➔ Assume P(k) ➔ Prove P(k+1).'
          }
        ],
        realLifeUses: [{ title: 'Software Domino Testing', scenario: 'Verifying automated test pipelines step-by-step.', iconName: 'ShieldCheck' }],
        quizQuestions: [{ id: 'm1a_q4_1', question: 'What is the base case in Mathematical Induction for natural numbers?', options: ['P(0)', 'P(1)', 'P(k)', 'P(10)'], correctAnswerIndex: 1, explanation: 'Base step verifies P(1) for n = 1.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p4_1', title: 'Sum Formula Base Verification', category: 'Basic Understanding', problemText: 'Verify P(1) for 1 + 2 + ... + n = n(n+1)/2.', hintStepByStep: ['LHS for n=1 is 1.', 'RHS for n=1 is 1(2)/2 = 1.'], fullExplanation: 'LHS = 1, RHS = 1. Base case P(1) holds.', finalAnswer: 'Verified True' }],
        miniProjects: [{ id: 'm1a_proj_4', title: 'Domino Cascade Model', objective: 'Demonstrate domino chain reaction.', materialsRequired: ['Domino blocks'], steps: ['1. Line up 10 dominoes.', '2. Push 1st domino.'], expectedOutcome: 'Tactile understanding of inductive proof.' }],
        learningResources: createMultilingualResources('Maths 1A', 4, 'Mathematical Induction')
      },
      {
        chapterNumber: 5,
        chapterName: 'Matrices',
        introSimpleEnglish: 'A matrix is a rectangular grid of numbers in rows and columns. Used extensively in 3D game graphics, economics, and machine learning!',
        conceptNotes: [
          {
            id: 'm1a_c5_n1',
            conceptHeading: 'Matrix Types, Transpose & Determinants',
            simpleMeaning: 'Order m × n specifies matrix dimensions. Determinant det(A) = ad - bc for 2x2 matrices. Cramer\'s rule solves linear systems.',
            keyPoints: ['Matrix addition requires identical orders.', 'Multiplication AB requires Columns(A) = Rows(B).', 'det([[a,b],[c,d]]) = ad - bc.', 'Inverse A⁻¹ = (1/det A) Adj(A).'],
            terminology: [{ term: 'Singular Matrix', definition: 'Matrix with det(A) = 0.' }],
            formula: 'det([[a,b],[c,d]]) = ad - bc · A⁻¹ = (1/det A) Adj(A)',
            easyExample: 'det([[3, 4], [2, 5]]) = (3)(5) - (4)(2) = 15 - 8 = 7.',
            commonMistakes: ['Assuming AB = BA. Matrix multiplication is not commutative!'],
            shortSummary: 'det([[a,b],[c,d]]) = ad - bc. Cramer\'s Rule solves AX = B.'
          }
        ],
        realLifeUses: [{ title: '3D Video Game Rendering', scenario: 'Rotating and scaling 3D avatar meshes.', iconName: 'Grid' }],
        quizQuestions: [{ id: 'm1a_q5_1', question: 'Compute det([[4, 2], [1, 3]]).', options: ['10', '8', '12', '14'], correctAnswerIndex: 0, explanation: 'det = (4)(3) - (2)(1) = 12 - 2 = 10.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p5_1', title: 'Matrix Determinant', category: 'Formula Practice', problemText: 'Find det([[5, 1], [3, 2]]).', hintStepByStep: ['ad - bc = (5)(2) - (1)(3)'], fullExplanation: '10 - 3 = 7.', finalAnswer: '7' }],
        miniProjects: [{ id: 'm1a_proj_5', title: '2x2 Matrix Transformation Grid', objective: 'Apply reflection matrix to graph points.', materialsRequired: ['Graph paper'], steps: ['1. Plot coordinates.', '2. Multiply by [[1,0],[0,-1]].'], expectedOutcome: 'Visual understanding of geometric transformations.' }],
        learningResources: createMultilingualResources('Maths 1A', 5, 'Matrices')
      },
      {
        chapterNumber: 6,
        chapterName: 'Addition of Vectors',
        introSimpleEnglish: 'Vectors have both magnitude and direction, like velocity or force. 3D vectors use unit component triads î, ĵ, k̂.',
        conceptNotes: [
          {
            id: 'm1a_c6_n1',
            conceptHeading: '3D Component Vectors & Section Formula',
            simpleMeaning: 'Vector r̄ = xî + yĵ + zk̂ has magnitude |r̄| = √(x² + y² + z²). Section formula divides vectors in ratio m:n.',
            keyPoints: ['Magnitude |r̄| = √(x² + y² + z²).', 'Unit Vector r̂ = r̄ / |r̄|.', 'Section Formula Internal: r̄ = (mb̄ + nā)/(m + n).', 'Centroid of Triangle: Ḡ = (ā + b̄ + c̄)/3.'],
            terminology: [{ term: 'Unit Vector', definition: 'Vector with magnitude 1.' }],
            formula: '|r̄| = √(x² + y² + z²) · Unit Vector r̂ = r̄ / |r̄|',
            easyExample: 'Vector r̄ = 3î + 4ĵ has magnitude √(3² + 4²) = 5.',
            commonMistakes: ['Adding vector magnitudes scalar-wise without direction.'],
            shortSummary: '|r̄| = √(x² + y² + z²). Unit vector r̂ = r̄ / |r̄|.'
          }
        ],
        realLifeUses: [{ title: 'Flight Navigation', scenario: 'Airplane heading velocity vector plus wind vector.', iconName: 'Combine' }],
        quizQuestions: [{ id: 'm1a_q6_1', question: 'Find magnitude of vector 3î + 4ĵ + 12k̂.', options: ['13', '12', '15', '19'], correctAnswerIndex: 0, explanation: '|r̄| = √(9 + 16 + 144) = √169 = 13.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p6_1', title: 'Vector Magnitude', category: 'Formula Practice', problemText: 'Find magnitude of 6î + 8ĵ.', hintStepByStep: ['√(6² + 8²) = √(36 + 64)'], fullExplanation: '√100 = 10.', finalAnswer: '10' }],
        miniProjects: [{ id: 'm1a_proj_6', title: '3D Vector Wire Model', objective: 'Construct 3D Cartesian vector using pipe cleaners.', materialsRequired: ['Wire/Straws'], steps: ['1. Form x, y, z axes.', '2. Construct diagonal vector.'], expectedOutcome: 'Tactile 3D spatial intuition.' }],
        learningResources: createMultilingualResources('Maths 1A', 6, 'Addition of Vectors')
      },
      {
        chapterNumber: 7,
        chapterName: 'Product of Vectors',
        introSimpleEnglish: 'Vectors have two multiplication products: Scalar (Dot) Product yielding a number, and Vector (Cross) Product yielding a perpendicular 3D vector.',
        conceptNotes: [
          {
            id: 'm1a_c7_n1',
            conceptHeading: 'Dot Product & Cross Product',
            simpleMeaning: 'Dot Product Ā · B̄ = |Ā||B̄| cos θ. Cross Product Ā × B̄ = |Ā||B̄| sin θ n̂. Perpendicular vectors have dot product = 0.',
            keyPoints: ['Dot product is scalar: Ā · B̄ = a₁b₁ + a₂b₂ + a₃b₃.', 'Perpendicular condition: Ā · B̄ = 0.', 'Cross product magnitude |Ā × B̄| gives area of parallelogram.', 'Vector triple product: Ā × (B̄ × C̄).'],
            terminology: [{ term: 'Dot Product', definition: 'Scalar product Ā · B̄ = |Ā||B̄| cos θ.' }],
            formula: 'Ā · B̄ = |Ā||B̄| cos θ · |Ā × B̄| = Area of Parallelogram',
            easyExample: 'If Ā = 2î + 3ĵ and B̄ = 4î - 2ĵ, Ā · B̄ = (2)(4) + (3)(-2) = 8 - 6 = 2.',
            commonMistakes: ['Confusing dot product (scalar) with cross product (vector).'],
            shortSummary: 'Ā · B̄ = |Ā||B̄| cos θ. Ā × B̄ = |Ā||B̄| sin θ n̂.'
          }
        ],
        realLifeUses: [{ title: 'Physics Mechanical Work', scenario: 'Work = Force · Displacement (Dot Product).', iconName: 'PieChart' }],
        quizQuestions: [{ id: 'm1a_q7_1', question: 'What is the dot product of two perpendicular vectors?', options: ['0', '1', '-1', 'Infinity'], correctAnswerIndex: 0, explanation: 'θ = 90° ⟹ cos(90°) = 0 ⟹ Ā · B̄ = 0.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p7_1', title: 'Dot Product Calculation', category: 'Formula Practice', problemText: 'Compute (3î + 4ĵ) · (2î - 1ĵ).', hintStepByStep: ['(3)(2) + (4)(-1)'], fullExplanation: '6 - 4 = 2.', finalAnswer: '2' }],
        miniProjects: [{ id: 'm1a_proj_7', title: 'Solar Panel Angle Efficiency Model', objective: 'Measure power vs light beam dot product angle.', materialsRequired: ['Solar cell, flashlight'], steps: ['1. Measure voltage at 0°, 45°, 90°.', '2. Compare with cos θ.'], expectedOutcome: 'Real-world application of dot product projections.' }],
        learningResources: createMultilingualResources('Maths 1A', 7, 'Product of Vectors')
      },
      {
        chapterNumber: 8,
        chapterName: 'Trigonometric Ratios and Transformations',
        introSimpleEnglish: 'Trigonometry measures angles and ratios in right triangles. Compound angle formulas (sin(A+B), cos(A+B)) allow simplifying complex wave expressions.',
        conceptNotes: [
          {
            id: 'm1a_c8_n1',
            conceptHeading: 'Compound Angles & Transformations',
            simpleMeaning: 'Transform sum/difference of angles into products and vice-versa for simplification.',
            keyPoints: ['sin(A ± B) = sin A cos B ± cos A sin B.', 'cos(A ± B) = cos A cos B ∓ sin A sin B.', 'sin²θ + cos²θ = 1.'],
            terminology: [{ term: 'Compound Angle', definition: 'Algebraic sum/difference of two angles A ± B.' }],
            formula: 'sin(A+B) = sin A cos B + cos A sin B · sin²θ + cos²θ = 1',
            easyExample: 'sin(75°) = sin(45°+30°) = (√3 + 1) / (2√2).',
            commonMistakes: ['Writing sin(A+B) as sin A + sin B.'],
            shortSummary: 'sin(A+B) = sin A cos B + cos A sin B.'
          }
        ],
        realLifeUses: [{ title: 'Audio Signal Processing', scenario: 'Combining sound wave frequencies.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'm1a_q8_1', question: 'What is sin²(30°) + cos²(30°)?', options: ['1', '0', '1/2', '√3/2'], correctAnswerIndex: 0, explanation: 'Pythagorean identity sin²θ + cos²θ = 1 for any angle θ.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p8_1', title: 'Evaluating sin 75°', category: 'Formula Practice', problemText: 'Evaluate sin(45° + 30°).', hintStepByStep: ['sin 45 cos 30 + cos 45 sin 30'], fullExplanation: '(1/√2)(√3/2) + (1/√2)(1/2) = (√3 + 1)/(2√2).', finalAnswer: '(√3 + 1)/(2√2)' }],
        miniProjects: [{ id: 'm1a_proj_8', title: 'Sound Wave Superposition Graph', objective: 'Plot two combined sine waves on graph paper.', materialsRequired: ['Graph paper'], steps: ['1. Plot sin x and sin 2x.', '2. Sum amplitudes.'], expectedOutcome: 'Visual understanding of wave transformation.' }],
        learningResources: createMultilingualResources('Maths 1A', 8, 'Trigonometric Ratios and Transformations')
      },
      {
        chapterNumber: 9,
        chapterName: 'Trigonometric Equations',
        introSimpleEnglish: 'Trigonometric equations contain trigonometric functions of unknown angles x. The general solution accounts for the periodic repetition of sine and cosine.',
        conceptNotes: [
          {
            id: 'm1a_c9_n1',
            conceptHeading: 'Principal & General Solutions',
            simpleMeaning: 'Principal solution lies in standard range [0, 2π). General solution includes integer n representing periodic rotations.',
            keyPoints: ['sin x = sin α ⟹ x = nπ + (-1)ⁿ α.', 'cos x = cos α ⟹ x = 2nπ ± α.', 'tan x = tan α ⟹ x = nπ + α.'],
            terminology: [{ term: 'General Solution', definition: 'Formula containing integer n giving all solutions.' }],
            formula: 'sin x = sin α ⟹ x = nπ + (-1)ⁿ α · cos x = cos α ⟹ x = 2nπ ± α',
            easyExample: 'If sin x = 1/2, principal solution α = π/6. General solution x = nπ + (-1)ⁿ (π/6).',
            commonMistakes: ['Forgetting the integer factor n in general solutions.'],
            shortSummary: 'sin x = sin α ⟹ x = nπ + (-1)ⁿ α.'
          }
        ],
        realLifeUses: [{ title: 'AC Electric Current Cycles', scenario: 'Finding time instances when alternating voltage equals 220V.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'm1a_q9_1', question: 'Find principal solution of sin x = 1/2 in [0, 2π).', options: ['π/6', 'π/3', 'π/4', 'π/2'], correctAnswerIndex: 0, explanation: 'sin(π/6) = 1/2, so x = π/6.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p9_1', title: 'General Solution of cos x = 1/2', category: 'Formula Practice', problemText: 'Solve cos x = 1/2.', hintStepByStep: ['cos(π/3) = 1/2.', 'Apply x = 2nπ ± α.'], fullExplanation: 'x = 2nπ ± π/3 for n ∈ Z.', finalAnswer: 'x = 2nπ ± π/3' }],
        miniProjects: [{ id: 'm1a_proj_9', title: 'Pendulum Periodicity Clock', objective: 'Track zero-crossing times of swinging pendulum.', materialsRequired: ['String, weight, stopwatch'], steps: ['1. Time 10 swings.', '2. Calculate periodic roots.'], expectedOutcome: 'Relating periodic oscillation to trigonometric solutions.' }],
        learningResources: createMultilingualResources('Maths 1A', 9, 'Trigonometric Equations')
      },
      {
        chapterNumber: 10,
        chapterName: 'Inverse Trigonometric Functions',
        introSimpleEnglish: 'Inverse trigonometric functions (sin⁻¹ x, cos⁻¹ x) reverse trigonometry: given a ratio x, they tell you the corresponding angle θ.',
        conceptNotes: [
          {
            id: 'm1a_c10_n1',
            conceptHeading: 'Principal Domains & Inverse Identities',
            simpleMeaning: 'To make inverse trigonometric relations single-valued functions, their domains are restricted to Principal Value Branches.',
            keyPoints: ['sin⁻¹ x domain: [-1, 1], Principal Range: [-π/2, π/2].', 'cos⁻¹ x domain: [-1, 1], Principal Range: [0, π].', 'sin⁻¹ x + cos⁻¹ x = π/2.'],
            terminology: [{ term: 'Principal Value', definition: 'Unique value in specified restricted range.' }],
            formula: 'sin⁻¹ x + cos⁻¹ x = π/2 · tan⁻¹ x + cot⁻¹ x = π/2',
            easyExample: 'sin⁻¹(1/2) = π/6.',
            commonMistakes: ['Confusing sin⁻¹ x with 1/sin x (which is cosec x).'],
            shortSummary: 'sin⁻¹ x + cos⁻¹ x = π/2 for x ∈ [-1, 1].'
          }
        ],
        realLifeUses: [{ title: 'Robotic Arm Joint Control', scenario: 'Calculating arm angle θ needed to reach x, y target coordinate.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'm1a_q10_1', question: 'What is sin⁻¹(1/2)?', options: ['π/6', 'π/3', 'π/4', 'π/2'], correctAnswerIndex: 0, explanation: 'sin(π/6) = 1/2, so sin⁻¹(1/2) = π/6.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p10_1', title: 'Evaluating sin⁻¹ x + cos⁻¹ x', category: 'Formula Practice', problemText: 'Evaluate sin⁻¹(0.6) + cos⁻¹(0.6).', hintStepByStep: ['Use identity sin⁻¹ x + cos⁻¹ x = π/2.'], fullExplanation: 'By identity, result is π/2.', finalAnswer: 'π/2' }],
        miniProjects: [{ id: 'm1a_proj_10', title: 'Inclinometer Angle Measure App', objective: 'Use shadow length to calculate sun elevation angle θ = tan⁻¹(h/s).', materialsRequired: ['Ruler, stick'], steps: ['1. Measure stick height h and shadow s.', '2. Compute θ = tan⁻¹(h/s).'], expectedOutcome: 'Practical angle calculation via inverse tan.' }],
        learningResources: createMultilingualResources('Maths 1A', 10, 'Inverse Trigonometric Functions')
      },
      {
        chapterNumber: 11,
        chapterName: 'Hyperbolic Functions',
        introSimpleEnglish: 'Hyperbolic functions sinh(x) and cosh(x) are exponential combinations e^x and e^-x that describe hanging cables and suspension bridges!',
        conceptNotes: [
          {
            id: 'm1a_c11_n1',
            conceptHeading: 'sinh(x), cosh(x) & Hyperbolic Identities',
            simpleMeaning: 'sinh(x) = (e^x - e^-x)/2 and cosh(x) = (e^x + e^-x)/2. They satisfy fundamental hyperbolic identity cosh²(x) - sinh²(x) = 1.',
            keyPoints: ['sinh(x) = (e^x - e^-x)/2.', 'cosh(x) = (e^x + e^-x)/2.', 'cosh²(x) - sinh²(x) = 1.', 'tanh(x) = sinh(x) / cosh(x).'],
            terminology: [{ term: 'Catenary Curve', definition: 'Shape y = a cosh(x/a) formed by hanging uniform chain.' }],
            formula: 'sinh x = (e^x - e^-x)/2 · cosh² x - sinh² x = 1',
            easyExample: 'cosh(0) = (e⁰ + e⁰)/2 = (1 + 1)/2 = 1.',
            commonMistakes: ['Writing cosh² x + sinh² x = 1 instead of cosh² x - sinh² x = 1.'],
            shortSummary: 'cosh² x - sinh² x = 1. Hanging power cables form cosh catenary curves.'
          }
        ],
        realLifeUses: [{ title: 'Suspension Bridge Design', scenario: 'Bridge cables sag in a catenary curve y = a cosh(x/a).', iconName: 'Layers' }],
        quizQuestions: [{ id: 'm1a_q11_1', question: 'What is cosh(0)?', options: ['1', '0', 'e', '1/2'], correctAnswerIndex: 0, explanation: 'cosh(0) = (e⁰ + e⁻⁰)/2 = (1 + 1)/2 = 1.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p11_1', title: 'Evaluating sinh(0)', category: 'Formula Practice', problemText: 'Find sinh(0).', hintStepByStep: ['(e⁰ - e⁻⁰)/2'], fullExplanation: '(1 - 1)/2 = 0.', finalAnswer: '0' }],
        miniProjects: [{ id: 'm1a_proj_11', title: 'Hanging String Catenary Experiment', objective: 'Photograph sag of hanging string and overlay y = cosh x curve.', materialsRequired: ['String, grid paper'], steps: ['1. Hang string between two pins.', '2. Trace curve on grid.'], expectedOutcome: 'Direct physical verification of catenary curves.' }],
        learningResources: createMultilingualResources('Maths 1A', 11, 'Hyperbolic Functions')
      },
      {
        chapterNumber: 12,
        chapterName: 'Properties of Triangles',
        introSimpleEnglish: 'Connects triangle side lengths a, b, c with angles A, B, C using Sine Rule, Cosine Rule, and Inradius/Exradius formulas.',
        conceptNotes: [
          {
            id: 'm1a_c12_n1',
            conceptHeading: 'Sine Rule, Cosine Rule & Area Formulas',
            simpleMeaning: 'Sine Rule: a/sin A = b/sin B = c/sin C = 2R. Cosine Rule: cos A = (b² + c² - a²)/(2bc). Area Δ = ½ bc sin A.',
            keyPoints: ['Sine Rule: a/sin A = b/sin B = c/sin C = 2R.', 'Cosine Rule: cos A = (b² + c² - a²)/(2bc).', 'Heron Formula: Area Δ = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2.', 'Inradius: r = Δ / s.'],
            terminology: [{ term: 'Circumradius R', definition: 'Radius of circle passing through all 3 vertices.' }],
            formula: 'a/sin A = b/sin B = c/sin C = 2R · cos A = (b² + c² - a²)/(2bc)',
            easyExample: 'In equilateral triangle with sides 6, s = 9, Area = √[9(3)(3)(3)] = 9√3.',
            commonMistakes: ['Mixing up circumradius R with inradius r.'],
            shortSummary: 'Sine Rule: a/sin A = 2R. Cosine Rule: cos A = (b²+c²-a²)/(2bc).'
          }
        ],
        realLifeUses: [{ title: 'Land Surveying & GPS', scenario: 'Triangulation calculating inaccessible distances.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'm1a_q12_1', question: 'In a triangle, if a = 3, b = 4, c = 5, what is semi-perimeter s?', options: ['6', '12', '5', '7'], correctAnswerIndex: 0, explanation: 's = (3 + 4 + 5)/2 = 12/2 = 6.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1a_p12_1', title: 'Heron Area Calculation', category: 'Formula Practice', problemText: 'Find area of triangle with sides 3, 4, 5.', hintStepByStep: ['s = 6.', 'Δ = √[6(3)(2)(1)]'], fullExplanation: '√36 = 6.', finalAnswer: '6' }],
        miniProjects: [{ id: 'm1a_proj_12', title: 'Cardboard Triangle Circumcircle Construction', objective: 'Draw circumcircle passing through 3 vertices using compass.', materialsRequired: ['Compass, ruler, cardboard'], steps: ['1. Draw triangle.', '2. Construct perpendicular bisectors to locate center O.'], expectedOutcome: 'Tactile understanding of circumradius R.' }],
        learningResources: createMultilingualResources('Maths 1A', 12, 'Properties of Triangles')
      }
    ]
  },

  // =========================================================================
  // MATHEMATICS IB (10 CHAPTERS)
  // =========================================================================
  math_1b: {
    subjectId: 'math_1b',
    subjectTitle: 'Mathematics IB',
    shortLabel: 'Maths 1B',
    description: 'Telangana Board Intermediate 1st Year Mathematics IB covering Coordinate Geometry, 3D Geometry, and Calculus.',
    chapters: [
      {
        chapterNumber: 1,
        chapterName: 'Locus',
        introSimpleEnglish: 'A locus is the path traced out by a moving point following a specific geometric condition.',
        conceptNotes: [{ id: 'm1b_c1_n1', conceptHeading: 'Definition & Equation of Locus', simpleMeaning: 'Set P(x, y), apply given distance condition, and simplify equation in x and y.', keyPoints: ['Set P = (x, y).', 'Use distance formula d = √[(x-x₁)² + (y-y₁)²].', 'Square both sides to eliminate square roots.'], terminology: [{ term: 'Locus', definition: 'Path formed by moving point satisfying a rule.' }], formula: 'd = √[(x - x₁)² + (y - y₁)²]', easyExample: 'Points at distance 5 from origin form circle x² + y² = 25.', commonMistakes: ['Forgetting to square both sides.'], shortSummary: 'Set P(x, y), apply distance condition, simplify.' }],
        realLifeUses: [{ title: 'Satellite Trajectories', scenario: 'Satellites orbiting along elliptical locus paths.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'm1b_q1_1', question: 'What curve is formed by points at constant distance r from fixed point (0,0)?', options: ['Circle', 'Line', 'Parabola', 'Ellipse'], correctAnswerIndex: 0, explanation: 'Constant distance from origin forms circle x² + y² = r².', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p1_1', title: 'Locus Equation', category: 'Basic Understanding', problemText: 'Find locus of P equidistant from A(2,3) and B(4,1).', hintStepByStep: ['PA² = PB².', 'Expand distance squares.'], fullExplanation: 'x - y - 1 = 0.', finalAnswer: 'x - y - 1 = 0' }],
        miniProjects: [{ id: 'm1b_proj_1', title: 'String Ellipse Construction', objective: 'Construct ellipse locus using pins and string.', materialsRequired: ['Pins, string, cardboard'], steps: ['1. Fix 2 pins.', '2. Loop string and trace.'], expectedOutcome: 'Visual understanding of focal distance sum locus.' }],
        learningResources: createMultilingualResources('Maths 1B', 1, 'Locus')
      },
      {
        chapterNumber: 2,
        chapterName: 'Transformation of Axes',
        introSimpleEnglish: 'Transformation of axes simplifies complex curve equations by shifting the origin (Translation) or turning the axes by angle θ (Rotation).',
        conceptNotes: [{ id: 'm1b_c2_n1', conceptHeading: 'Translation & Rotation of Axes', simpleMeaning: 'Translation shifts origin to (h, k): x = X + h, y = Y + k. Rotation turns axes by angle θ: x = X cos θ - Y sin θ.', keyPoints: ['Translation: x = X + h, y = Y + k.', 'Rotation: x = X cos θ - Y sin θ, y = X sin θ + Y cos θ.', 'Simplifies higher-order curve terms.'], terminology: [{ term: 'Translation', definition: 'Shifting origin without changing axis directions.' }], formula: 'Translation: x = X + h, y = Y + k · Rotation: x = X cos θ - Y sin θ', easyExample: 'Shifting origin to (2, 3) changes (5, 7) to new coordinates (3, 4).', commonMistakes: ['Confusing old coordinates (x, y) with new coordinates (X, Y).'], shortSummary: 'Translation: x = X+h, y = Y+k. Rotation turns axes by θ.' }],
        realLifeUses: [{ title: 'Computer Graphics Camera Shift', scenario: 'Panning viewport camera in 2D video games.', iconName: 'Grid' }],
        quizQuestions: [{ id: 'm1b_q2_1', question: 'When origin is shifted to (3, 4), what are new coordinates of (5, 9)?', options: ['(2, 5)', '(8, 13)', '(15, 36)', '(1, 1)'], correctAnswerIndex: 0, explanation: 'X = x - h = 5 - 3 = 2. Y = y - k = 9 - 4 = 5. New coordinates = (2, 5).', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p2_1', title: 'Origin Shift Calculation', category: 'Formula Practice', problemText: 'Origin shifted to (1, 2). Find new coordinates of (4, 7).', hintStepByStep: ['X = 4 - 1 = 3.', 'Y = 7 - 2 = 5.'], fullExplanation: '(3, 5).', finalAnswer: '(3, 5)' }],
        miniProjects: [{ id: 'm1b_proj_2', title: 'Grid Translation Overlay', objective: 'Shift transparent grid paper over plotted points.', materialsRequired: ['Tracing paper, grid'], steps: ['1. Plot points.', '2. Shift tracing paper origin to (h,k).'], expectedOutcome: 'Visual understanding of coordinate translation.' }],
        learningResources: createMultilingualResources('Maths 1B', 2, 'Transformation of Axes')
      },
      {
        chapterNumber: 3,
        chapterName: 'The Straight Line',
        introSimpleEnglish: 'A straight line is the shortest path between two points, represented by linear equation ax + by + c = 0.',
        conceptNotes: [{ id: 'm1b_c3_n1', conceptHeading: 'Slope m & Intercept Forms', simpleMeaning: 'Slope m = tan θ. Slope-intercept form: y = mx + c. Intercept form: x/a + y/b = 1.', keyPoints: ['m = (y₂ - y₁)/(x₂ - x₁).', 'y = mx + c.', 'x/a + y/b = 1.', 'Perpendicular distance d = |ax₁ + by₁ + c|/√(a²+b²).'], terminology: [{ term: 'Slope m', definition: 'm = tan θ' }], formula: 'y = mx + c · x/a + y/b = 1 · d = |ax₁ + by₁ + c|/√(a²+b²)', easyExample: 'Line with slope 3 and y-intercept -4: y = 3x - 4.', commonMistakes: ['Writing slope as (x₂-x₁)/(y₂-y₁).'], shortSummary: 'Slope m = tan θ. Line eq: y = mx + c.' }],
        realLifeUses: [{ title: 'Road Gradients', scenario: 'Designing safe highway ramp slopes.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'm1b_q3_1', question: 'What is the slope of line 3x - y - 4 = 0?', options: ['3', '-3', '1/3', '-4'], correctAnswerIndex: 0, explanation: 'y = 3x - 4 ⟹ slope m = 3.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p3_1', title: 'Slope-Intercept Form', category: 'Basic Understanding', problemText: 'Find slope of 2x + 4y = 8.', hintStepByStep: ['4y = -2x + 8.', 'y = -1/2 x + 2.'], fullExplanation: 'Slope m = -1/2.', finalAnswer: '-1/2' }],
        miniProjects: [{ id: 'm1b_proj_3', title: 'Clinometer Slope Measure', objective: 'Measure ramp incline angle θ.', materialsRequired: ['Protractor, string'], steps: ['1. Measure angle.', '2. Compute m = tan θ.'], expectedOutcome: 'Practical slope calculation.' }],
        learningResources: createMultilingualResources('Maths 1B', 3, 'The Straight Line')
      },
      {
        chapterNumber: 4,
        chapterName: 'Pair of Straight Lines',
        introSimpleEnglish: 'A second-degree homogeneous equation ax² + 2hxy + by² = 0 represents two straight lines passing through the origin.',
        conceptNotes: [{ id: 'm1b_c4_n1', conceptHeading: 'Homogeneous Equations & Angle Between Lines', simpleMeaning: 'ax² + 2hxy + by² = 0 represents two lines through origin. Angle θ satisfies cos θ = |a + b| / √[(a - b)² + 4h²].', keyPoints: ['Condition for real lines: h² ≥ ab.', 'Perpendicular lines condition: a + b = 0.', 'Coincident lines condition: h² = ab.', 'Combined equation of pair of lines.'], terminology: [{ term: 'Homogeneous Equation', definition: 'Equation where every term has degree 2.' }], formula: 'cos θ = |a + b| / √[(a - b)² + 4h²] · Perp Condition: a + b = 0', easyExample: 'In x² - 5xy + 6y² = 0, lines are (x - 2y)(x - 3y) = 0.', commonMistakes: ['Forgetting a + b = 0 for perpendicular pair of lines.'], shortSummary: 'ax² + 2hxy + by² = 0 gives pair of lines. Perpendicular if a + b = 0.' }],
        realLifeUses: [{ title: 'Optical Light Ray Splitting', scenario: 'Laser beam splitting into two linear ray trajectories.', iconName: 'Combine' }],
        quizQuestions: [{ id: 'm1b_q4_1', question: 'If pair of lines ax² + 2hxy + by² = 0 are perpendicular, what is a + b?', options: ['0', '1', 'h', 'ab'], correctAnswerIndex: 0, explanation: 'Perpendicular condition is a + b = 0.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p4_1', title: 'Factoring Pair of Lines', category: 'Basic Understanding', problemText: 'Separate lines in x² - 3xy + 2y² = 0.', hintStepByStep: ['Factorize quadratic: (x - y)(x - 2y) = 0.'], fullExplanation: 'Lines are x - y = 0 and x - 2y = 0.', finalAnswer: 'x - y = 0, x - 2y = 0' }],
        miniProjects: [{ id: 'm1b_proj_4', title: 'Intersecting Laser Ray Model', objective: 'Project two light rays from a pointer.', materialsRequired: ['Laser pointer, mirror'], steps: ['1. Split ray.', '2. Plot 2D line paths.'], expectedOutcome: 'Visual understanding of pair of straight lines.' }],
        learningResources: createMultilingualResources('Maths 1B', 4, 'Pair of Straight Lines')
      },
      {
        chapterNumber: 5,
        chapterName: 'Introduction to Three-Dimensional Coordinate Geometry',
        introSimpleEnglish: 'Extends 2D plane to 3D space using 3 mutually perpendicular axes (x, y, z) forming 8 octants.',
        conceptNotes: [{ id: 'm1b_c5_n1', conceptHeading: '3D Point Coordinates & Distance Formula', simpleMeaning: 'Points P(x, y, z) in 3D space. Distance d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²].', keyPoints: ['3D Space divided into 8 Octants by XY, YZ, ZX planes.', 'Distance formula: d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²].', 'Section formula: P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n), (mz₂+nz₁)/(m+n)).'], terminology: [{ term: 'Octant', definition: 'One of 8 regions dividing 3D space.' }], formula: 'd = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]', easyExample: 'Distance from origin to (3, 4, 12) = √(9 + 16 + 144) = √169 = 13.', commonMistakes: ['Omitting z component in distance calculation.'], shortSummary: '3D distance d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²].' }],
        realLifeUses: [{ title: '3D Printing Coordinates', scenario: 'Extruder nozzle position in x, y, z space.', iconName: 'Layers' }],
        quizQuestions: [{ id: 'm1b_q5_1', question: 'Find distance of (3, 4, 12) from origin (0,0,0).', options: ['13', '12', '15', '19'], correctAnswerIndex: 0, explanation: 'd = √(9 + 16 + 144) = √169 = 13.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p5_1', title: '3D Distance Calculation', category: 'Formula Practice', problemText: 'Find distance between (1,2,3) and (4,6,3).', hintStepByStep: ['√[(4-1)² + (6-2)² + (3-3)²]', '√[9 + 16 + 0]'], fullExplanation: '√25 = 5.', finalAnswer: '5' }],
        miniProjects: [{ id: 'm1b_proj_5', title: '3D Room Coordinate Box', objective: 'Measure corner coordinates of a room box.', materialsRequired: ['Cardboard box, ruler'], steps: ['1. Set corner as origin (0,0,0).', '2. Measure x, y, z lengths.'], expectedOutcome: 'Tactile understanding of 3D spatial octants.' }],
        learningResources: createMultilingualResources('Maths 1B', 5, 'Introduction to Three-Dimensional Coordinate Geometry')
      },
      {
        chapterNumber: 6,
        chapterName: 'Direction Cosines and Direction Ratios',
        introSimpleEnglish: 'Direction Cosines (l, m, n) specify 3D line direction angles α, β, γ with axes: l = cos α, m = cos β, n = cos γ, satisfying l² + m² + n² = 1.',
        conceptNotes: [{ id: 'm1b_c6_n1', conceptHeading: 'Direction Cosines (l, m, n) & Direction Ratios (a, b, c)', simpleMeaning: 'l = cos α, m = cos β, n = cos γ. Identity: l² + m² + n² = 1. Direction ratios a, b, c are proportional to l, m, n.', keyPoints: ['l² + m² + n² = 1.', 'If a, b, c are direction ratios, l = a/√(a²+b²+c²).', 'Angle θ between lines: cos θ = l₁l₂ + m₁m₂ + n₁n₂.', 'Perpendicular lines: l₁l₂ + m₁m₂ + n₁n₂ = 0.'], terminology: [{ term: 'Direction Cosines', definition: 'l = cos α, m = cos β, n = cos γ' }], formula: 'l² + m² + n² = 1 · cos θ = l₁l₂ + m₁m₂ + n₁n₂', easyExample: 'If α=60°, β=60°, γ=45°, cos²60°+cos²60°+cos²45° = 1/4+1/4+1/2 = 1.', commonMistakes: ['Confusing direction ratios (a,b,c) with normalized direction cosines (l,m,n).'], shortSummary: 'l² + m² + n² = 1. Perpendicular lines: l₁l₂ + m₁m₂ + n₁n₂ = 0.' }],
        realLifeUses: [{ title: 'Robotic Arm Joint Angles', scenario: '3D orientation angles of robotic welding torch.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'm1b_q6_1', question: 'What is l² + m² + n² for any 3D line?', options: ['1', '0', '2', '3'], correctAnswerIndex: 0, explanation: 'Fundamental identity cos²α + cos²β + cos²γ = 1.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p6_1', title: 'Normalizing Direction Ratios', category: 'Formula Practice', problemText: 'Find direction cosines for direction ratios 2, 3, 6.', hintStepByStep: ['√(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7.', 'l = 2/7, m = 3/7, n = 6/7.'], fullExplanation: '(2/7, 3/7, 6/7).', finalAnswer: '(2/7, 3/7, 6/7)' }],
        miniProjects: [{ id: 'm1b_proj_6', title: '3D Direction Straw Model', objective: 'Construct line inclined at 60°, 60°, 45°.', materialsRequired: ['Straws, protractor'], steps: ['1. Set straw at angles with 3 axes.', '2. Verify l² + m² + n² = 1.'], expectedOutcome: 'Visual understanding of 3D direction cosines.' }],
        learningResources: createMultilingualResources('Maths 1B', 6, 'Direction Cosines and Direction Ratios')
      },
      {
        chapterNumber: 7,
        chapterName: 'The Plane',
        introSimpleEnglish: 'A plane in 3D space is a flat 2D surface represented by linear equation ax + by + cz + d = 0.',
        conceptNotes: [{ id: 'm1b_c7_n1', conceptHeading: 'General Equation ax + by + cz + d = 0', simpleMeaning: 'Normal vector to plane is N̄ = aî + bĵ + ck̂. Perpendicular distance from (x₁, y₁, z₁) is p = |ax₁ + by₁ + cz₁ + d| / √(a² + b² + c²).', keyPoints: ['General plane equation: ax + by + cz + d = 0.', 'Vector (a, b, c) is normal to the plane.', 'Intercept form: x/a + y/b + z/c = 1.', 'Perpendicular distance from origin: p = |d| / √(a² + b² + c²).'], terminology: [{ term: 'Normal Vector', definition: 'Vector perpendicular to plane surface.' }], formula: 'ax + by + cz + d = 0 · Intercept: x/a + y/b + z/c = 1', easyExample: 'Plane 2x + 3y + 4z - 12 = 0 has intercepts x=6, y=4, z=3.', commonMistakes: ['Confusing plane normal vector with vectors parallel to plane.'], shortSummary: 'Plane eq: ax + by + cz + d = 0. Normal vector = (a, b, c).' }],
        realLifeUses: [{ title: 'Architectural Wall Planes', scenario: '3D BIM CAD modeling of building wall planes.', iconName: 'Layers' }],
        quizQuestions: [{ id: 'm1b_q7_1', question: 'What is the normal vector to plane 3x - 4y + 5z = 10?', options: ['(3, -4, 5)', '(3, 4, 5)', '(10, 10, 10)', '(1, 1, 1)'], correctAnswerIndex: 0, explanation: 'Coefficients of x, y, z give normal vector (3, -4, 5).', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p7_1', title: 'Plane Intercepts', category: 'Formula Practice', problemText: 'Find x-intercept of plane 2x + 3y + 4z = 12.', hintStepByStep: ['Set y=0, z=0.', '2x = 12 ⟹ x = 6.'], fullExplanation: 'x-intercept = 6.', finalAnswer: '6' }],
        miniProjects: [{ id: 'm1b_proj_7', title: 'Cardboard Intersecting Planes', objective: 'Construct 3 intersecting plane surfaces.', materialsRequired: ['Cardboard sheets'], steps: ['1. Cut 3 sheets.', '2. Slot together at 90° angles.'], expectedOutcome: 'Visual understanding of 3D plane intersections.' }],
        learningResources: createMultilingualResources('Maths 1B', 7, 'The Plane')
      },
      {
        chapterNumber: 8,
        chapterName: 'Limits and Continuity',
        introSimpleEnglish: 'Limits describe how a function f(x) behaves as x approaches a target value a. Continuity means f(x) has no breaks or gaps!',
        conceptNotes: [{ id: 'm1b_c8_n1', conceptHeading: 'Standard Limits & Continuity Condition', simpleMeaning: 'lim (x➔a) f(x) = L. Standard limit: lim (x➔0) (sin x / x) = 1. Function is continuous if LHL = RHL = f(a).', keyPoints: ['lim (x➔0) (sin x / x) = 1.', 'lim (x➔a) (xⁿ - aⁿ)/(x - a) = n aⁿ⁻¹.', 'lim (x➔0) (e^x - 1)/x = 1.', 'Continuity condition: lim (x➔a) f(x) = f(a).'], terminology: [{ term: 'Continuity', definition: 'LHL = RHL = f(a) with no gaps in graph.' }], formula: 'lim (x➔0) (sin x / x) = 1 · lim (x➔a) (xⁿ - aⁿ)/(x - a) = n aⁿ⁻¹', easyExample: 'lim (x➔0) (sin 3x / x) = 3 lim (sin 3x / 3x) = 3(1) = 3.', commonMistakes: ['Substituting x=0 directly when denominator becomes 0/0.'], shortSummary: 'lim (x➔0) sin x / x = 1. Continuous if LHL = RHL = f(a).' }],
        realLifeUses: [{ title: 'Instantaneous Vehicle Velocity', scenario: 'Speedometer calculating lim (Δt➔0) Δs/Δt.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'm1b_q8_1', question: 'Evaluate lim (x➔0) (sin 5x / x).', options: ['5', '1', '0', '1/5'], correctAnswerIndex: 0, explanation: 'lim (x➔0) 5 (sin 5x / 5x) = 5(1) = 5.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p8_1', title: 'Standard Polynomial Limit', category: 'Formula Practice', problemText: 'Evaluate lim (x➔2) (x³ - 8)/(x - 2).', hintStepByStep: ['Use n aⁿ⁻¹ with n=3, a=2.', '3(2²) = 12.'], fullExplanation: '12.', finalAnswer: '12' }],
        miniProjects: [{ id: 'm1b_proj_8', title: 'Continuous vs Discontinuous Graph Plot', objective: 'Plot smooth curve vs step function graph.', materialsRequired: ['Graph paper'], steps: ['1. Plot f(x) = x².', '2. Plot floor function [x].'], expectedOutcome: 'Visual understanding of graph continuity.' }],
        learningResources: createMultilingualResources('Maths 1B', 8, 'Limits and Continuity')
      },
      {
        chapterNumber: 9,
        chapterName: 'Differentiation',
        introSimpleEnglish: 'Differentiation calculates the instant rate of change dy/dx or derivative f\'(x), representing the slope of the tangent to a curve.',
        conceptNotes: [{ id: 'm1b_c9_n1', conceptHeading: 'Standard Derivatives & Product/Quotient Rules', simpleMeaning: 'd/dx (xⁿ) = n xⁿ⁻¹. d/dx (sin x) = cos x. Product Rule (uv)\' = u v\' + v u\'. Quotient Rule (u/v)\' = (v u\' - u v\')/v².', keyPoints: ['d/dx (xⁿ) = n xⁿ⁻¹.', 'd/dx (sin x) = cos x, d/dx (cos x) = -sin x.', 'd/dx (e^x) = e^x, d/dx (ln x) = 1/x.', 'Product Rule: d/dx (u v) = u (dv/dx) + v (du/dx).', 'Quotient Rule: d/dx (u/v) = [v (du/dx) - u (dv/dx)] / v².'], terminology: [{ term: 'Derivative dy/dx', definition: 'Instantaneous rate of change of y with respect to x.' }], formula: 'd/dx (xⁿ) = n xⁿ⁻¹ · d/dx (uv) = u v\' + v u\'', easyExample: 'd/dx (x⁴ + 3x²) = 4x³ + 6x.', commonMistakes: ['Writing d/dx (u/v) as u\'/v\'. Always use Quotient Rule!'], shortSummary: 'd/dx (xⁿ) = n xⁿ⁻¹. Product: (uv)\' = u v\' + v u\'.' }],
        realLifeUses: [{ title: 'Acceleration Calculation', scenario: 'a = dv/dt = derivative of velocity with respect to time.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'm1a_q9_1_b', question: 'What is d/dx (x⁵)?', options: ['5x⁴', '4x⁵', '5x⁵', 'x⁴'], correctAnswerIndex: 0, explanation: 'Using power rule n xⁿ⁻¹: 5 x⁴.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p9_1', title: 'Power Rule Derivative', category: 'Formula Practice', problemText: 'Differentiate y = x³ + 5x.', hintStepByStep: ['d/dx (x³) = 3x².', 'd/dx (5x) = 5.'], fullExplanation: '3x² + 5.', finalAnswer: '3x² + 5' }],
        miniProjects: [{ id: 'm1b_proj_9', title: 'Tangent Slope Measuring Tool', objective: 'Measure tangent slope at curve points.', materialsRequired: ['Ruler, printed curve'], steps: ['1. Draw tangent line at x=2.', '2. Compute slope dy/dx.'], expectedOutcome: 'Visual understanding of derivative as tangent slope.' }],
        learningResources: createMultilingualResources('Maths 1B', 9, 'Differentiation')
      },
      {
        chapterNumber: 10,
        chapterName: 'Applications of Derivatives',
        introSimpleEnglish: 'Derivatives determine tangents, normals, rates of change, increasing/decreasing functions, and maximum/minimum points!',
        conceptNotes: [{ id: 'm1b_c10_n1', conceptHeading: 'Tangents, Normals & Maxima/Minima', simpleMeaning: 'Tangent slope m = dy/dx. Normal slope = -1/m. First derivative test: f\'(x) = 0 gives critical points. Second derivative f\'\'(x) < 0 ⟹ Local Maxima.', keyPoints: ['Tangent slope m = dy/dx at (x₁, y₁).', 'Tangent equation: y - y₁ = m (x - x₁).', 'Normal equation: y - y₁ = (-1/m) (x - x₁).', 'Increasing function: f\'(x) > 0.', 'Critical points: f\'(x) = 0. f\'\'(x) < 0 ⟹ Maxima, f\'\'(x) > 0 ⟹ Minima.'], terminology: [{ term: 'Critical Point', definition: 'Point where f\'(x) = 0.' }], formula: 'Tangent: y - y₁ = m(x - x₁) · Maxima: f\'(x) = 0 ∧ f\'\'(x) < 0', easyExample: 'f(x) = -x² + 4x has f\'(x) = -2x + 4 = 0 ⟹ x = 2 (Maximum point).', commonMistakes: ['Thinking f\'\'(x) > 0 means Maximum. f\'\'(x) > 0 indicates MINIMA!'], shortSummary: 'Tangent slope m = dy/dx. Maxima if f\'(x)=0 and f\'\'(x)<0.' }],
        realLifeUses: [{ title: 'Profit Maximization in Business', scenario: 'Finding production volume that maximizes company profit margin.', iconName: 'Trophy' }],
        quizQuestions: [{ id: 'm1b_q10_1', question: 'At a local Maximum point, what is the value of second derivative f\'\'(x)?', options: ['Negative (< 0)', 'Positive (> 0)', 'Zero (= 0)', 'Undefined'], correctAnswerIndex: 0, explanation: 'Local Maxima requires f\'(x) = 0 and f\'\'(x) < 0.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'm1b_p10_1', title: 'Finding Critical Points', category: 'Formula Practice', problemText: 'Find critical point of f(x) = x² - 6x + 5.', hintStepByStep: ['f\'(x) = 2x - 6 = 0.', '2x = 6 ⟹ x = 3.'], fullExplanation: 'x = 3.', finalAnswer: 'x = 3' }],
        miniProjects: [{ id: 'm1b_proj_10', title: 'Box Volume Maximization Project', objective: 'Cut corners of cardboard sheet to maximize open box volume.', materialsRequired: ['Cardboard, scissors'], steps: ['1. Express volume V(x) = x(20-2x)².','2. Solve dV/dx = 0.'], expectedOutcome: 'Practical optimization of physical dimensions.' }],
        learningResources: createMultilingualResources('Maths 1B', 10, 'Applications of Derivatives')
      }
    ]
  },

  // =========================================================================
  // PHYSICS (14 UNITS)
  // =========================================================================
  physics_1: {
    subjectId: 'physics_1',
    subjectTitle: 'Physics',
    shortLabel: 'Physics 1st Yr',
    description: 'Telangana Board Intermediate 1st Year Physics covering Kinematics, Laws of Motion, Work-Energy, Gravitation, and Thermodynamics.',
    chapters: [
      {
        chapterNumber: 1,
        chapterName: 'Physical World and Measurement',
        introSimpleEnglish: 'Measurement compares physical quantities against SI reference standards. Covers 7 SI base units, dimensional analysis, principle of homogeneity, and precision errors.',
        conceptNotes: [{ id: 'phy_c1_n1', conceptHeading: 'SI Units & Dimensional Analysis', simpleMeaning: '7 SI Base Units. Dimensional formula [M^a L^b T^c]. Principle of Homogeneity requires matching dimensions on both sides.', keyPoints: ['7 SI Base Units: m, kg, s, A, K, mol, cd.', 'Force = [M¹ L¹ T⁻²].', 'Work = [M¹ L² T⁻²].', 'Homogeneity: LHS dims = RHS dims.'], terminology: [{ term: 'SI Units', definition: 'International System of Units.' }], formula: 'Force = [M¹ L¹ T⁻²] · Work = [M¹ L² T⁻²]', easyExample: 'Speed = Distance / Time ⟹ [L]/[T] = [M⁰ L¹ T⁻¹].', commonMistakes: ['Adding quantities with different dimensions.'], shortSummary: '7 SI base units. Homogeneity checks formula correctness.' }],
        realLifeUses: [{ title: 'Speedometers', scenario: 'Measuring speed in km/h derived from distance and time.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'phy_q1_1', question: 'What is the dimensional formula for Work / Energy?', options: ['[M¹ L² T⁻²]', '[M¹ L¹ T⁻²]', '[M¹ L² T⁻¹]', '[M⁰ L¹ T⁻²]'], correctAnswerIndex: 0, explanation: 'Work = Force × Distance = [M¹ L¹ T⁻²] × [L] = [M¹ L² T⁻²].', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p1_1', title: 'Checking Homogeneity', category: 'Formula Practice', problemText: 'Verify KE = ½ mv² dimensionally.', hintStepByStep: ['LHS = Energy = [M¹ L² T⁻²].', 'RHS = [M] × [L T⁻¹]² = [M¹ L² T⁻²].'], fullExplanation: 'LHS = RHS dimensionally.', finalAnswer: 'Dimensionally Correct' }],
        miniProjects: [{ id: 'phy_proj_1', title: 'Screw Gauge Error Measurement', objective: 'Measure wire thickness with micrometer screw gauge.', materialsRequired: ['Screw gauge, wire'], steps: ['1. Measure LC = 0.01 mm.', '2. Calculate total diameter.'], expectedOutcome: 'Precision measurement skill.' }],
        learningResources: createMultilingualResources('Physics', 1, 'Physical World and Measurement')
      },
      {
        chapterNumber: 2,
        chapterName: 'Motion along a Straight Line',
        introSimpleEnglish: 'Kinematics describes 1D motion using displacement s, velocity v, and acceleration a.',
        conceptNotes: [{ id: 'phy_c2_n1', conceptHeading: 'Kinematic Equations of Motion', simpleMeaning: 'For uniform acceleration a: 1) v = u + at, 2) s = ut + ½ at², 3) v² - u² = 2as.', keyPoints: ['v = u + at.', 's = ut + ½ at².', 'v² - u² = 2as.', 's_n = u + a(n - ½).'], terminology: [{ term: 'Displacement', definition: 'Shortest straight vector path.' }], formula: 'v = u + at · s = ut + ½ at² · v² - u² = 2as', easyExample: 'Car accelerating from rest (u=0) at 2 m/s² for 5 s: v = 10 m/s.', commonMistakes: ['Confusing distance with displacement.'], shortSummary: 'v = u+at, s = ut+½at², v²-u²=2as.' }],
        realLifeUses: [{ title: 'Car Braking Distance', scenario: 'Calculating stopping distance v² = 2as.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'phy_q2_1', question: 'A body starts from rest (u=0) and accelerates at 4 m/s² for 3 s. Find distance s.', options: ['18 m', '12 m', '24 m', '36 m'], correctAnswerIndex: 0, explanation: 's = ½ at² = ½(4)(9) = 18 m.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p2_1', title: 'Stopping Distance', category: 'Formula Practice', problemText: 'Car at 20 m/s brakes at -4 m/s². Find distance to stop.', hintStepByStep: ['v² - u² = 2as.', '0 - 400 = 2(-4)s ⟹ -8s = -400.'], fullExplanation: 's = 50 m.', finalAnswer: '50 m' }],
        miniProjects: [{ id: 'phy_proj_2', title: 'Inclined Plane Acceleration Track', objective: 'Time marble rolling down ramp.', materialsRequired: ['Ramp, marble, stopwatch'], steps: ['1. Time roll.', '2. Compute acceleration a.'], expectedOutcome: 'Experimental verification of acceleration.' }],
        learningResources: createMultilingualResources('Physics', 2, 'Motion along a Straight Line')
      },
      {
        chapterNumber: 3,
        chapterName: 'Motion in a Plane',
        introSimpleEnglish: 'Motion in 2D plane involves vector addition (Parallelogram Law) and projectile motion trajectories.',
        conceptNotes: [{ id: 'phy_c3_n1', conceptHeading: 'Parallelogram Law & Projectile Motion', simpleMeaning: 'Resultant R = √(A² + B² + 2AB cos θ). Projectile trajectory is parabolic y = x tan θ - (gx²)/(2u² cos²θ).', keyPoints: ['Resultant R = √(A² + B² + 2AB cos θ).', 'Time of Flight T = (2u sin θ)/g.', 'Maximum Height H = (u² sin²θ)/(2g).', 'Horizontal Range R_proj = (u² sin 2θ)/g.'], terminology: [{ term: 'Range R', definition: 'Maximum horizontal distance.' }], formula: 'T = (2u sin θ)/g · H = (u² sin²θ)/(2g) · R_proj = (u² sin 2θ)/g', easyExample: 'Maximum range occurs at angle θ = 45°.', commonMistakes: ['Mixing up max height formula denominator 2g with range denominator g.'], shortSummary: 'R = √(A²+B²+2AB cos θ). Max projectile range at 45°.' }],
        realLifeUses: [{ title: 'Cricket Boundary Sixes', scenario: 'Calculating launch angle θ to clear boundary rope.', iconName: 'Trophy' }],
        quizQuestions: [{ id: 'phy_q3_1', question: 'At what angle θ is the horizontal range of a projectile maximum?', options: ['45°', '90°', '30°', '60°'], correctAnswerIndex: 0, explanation: 'sin 2θ is maximum (1) when 2θ = 90° ⟹ θ = 45°.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p3_1', title: 'Time of Flight Calculation', category: 'Formula Practice', problemText: 'Projected at 20 m/s at 30° (g=10). Find T.', hintStepByStep: ['T = 2u sin θ / g.', 'T = 2(20) sin 30° / 10 = 40(0.5)/10.'], fullExplanation: '2 seconds.', finalAnswer: '2 s' }],
        miniProjects: [{ id: 'phy_proj_3', title: 'Water Hose Projectile Range Tracker', objective: 'Measure spray range vs nozzle angle θ.', materialsRequired: ['Water hose, protractor, tape'], steps: ['1. Spray at 30°, 45°, 60°.', '2. Record horizontal distance.'], expectedOutcome: 'Visual verification of 45° maximum range.' }],
        learningResources: createMultilingualResources('Physics', 3, 'Motion in a Plane')
      },
      {
        chapterNumber: 4,
        chapterName: 'Laws of Motion',
        introSimpleEnglish: 'Newton\'s 3 Laws of Motion govern force and momentum. Friction acts as an opposing contact force f = μ N.',
        conceptNotes: [{ id: 'phy_c4_n1', conceptHeading: 'Newton\'s Laws & Friction', simpleMeaning: '1st Law: Inertia. 2nd Law: F = dp/dt = ma. 3rd Law: Action = -Reaction. Friction f_s ≤ μ_s N.', keyPoints: ['1st Law: Object remains at rest or uniform motion unless acted by net force.', '2nd Law: Force F = ma.', '3rd Law: Action and reaction forces act on DIFFERENT bodies.', 'Friction f = μ N.'], terminology: [{ term: 'Inertia', definition: 'Resistance of body to change state of motion.' }], formula: 'F = ma · Friction f = μ N · Momentum p = mv', easyExample: 'Force needed to accelerate 5 kg mass at 2 m/s²: F = 5 × 2 = 10 N.', commonMistakes: ['Thinking action and reaction cancel out on the same body.'], shortSummary: 'F = ma. Action = -Reaction on different bodies. Friction f = μ N.' }],
        realLifeUses: [{ title: 'Vehicle Seatbelts', scenario: 'Seatbelts stop body forward inertia during sudden braking.', iconName: 'ShieldCheck' }],
        quizQuestions: [{ id: 'phy_q4_1', question: 'What net force F is required to accelerate a 4 kg object at 3 m/s²?', options: ['12 N', '7 N', '1.33 N', '24 N'], correctAnswerIndex: 0, explanation: 'F = ma = 4 kg × 3 m/s² = 12 N.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p4_1', title: 'Friction Force', category: 'Formula Practice', problemText: '10 kg block on floor with μ=0.3. Find max friction (g=10).', hintStepByStep: ['N = mg = 100 N.', 'f = μ N = 0.3 × 100.'], fullExplanation: '30 N.', finalAnswer: '30 N' }],
        miniProjects: [{ id: 'phy_proj_4', title: 'Friction Block Drag Slider', objective: 'Measure pulling force vs surface roughness.', materialsRequired: ['Spring balance, wooden block, sandpaper'], steps: ['1. Drag block on smooth table.', '2. Drag on sandpaper.'], expectedOutcome: 'Tactile understanding of friction coefficient μ.' }],
        learningResources: createMultilingualResources('Physics', 4, 'Laws of Motion')
      },
      {
        chapterNumber: 5,
        chapterName: 'Work, Energy and Power',
        introSimpleEnglish: 'Work W = F · s cos θ. Energy is capacity to do work (Kinetic KE = ½ mv², Potential PE = mgh). Power P = W/t.',
        conceptNotes: [{ id: 'phy_c5_n1', conceptHeading: 'Work-Energy Theorem & Power', simpleMeaning: 'Work W = F s cos θ. Work-Energy Theorem: Total Work Done = Change in Kinetic Energy ΔKE. Power P = W/t = F v.', keyPoints: ['Work W = F s cos θ.', 'Kinetic Energy KE = ½ mv².', 'Potential Energy PE = mgh.', 'Power P = W/t = Force × Velocity.'], terminology: [{ term: 'Power P', definition: 'Rate of doing work P = W/t in Watts.' }], formula: 'W = F s cos θ · KE = ½ mv² · PE = mgh · P = F v', easyExample: 'Lifting 10 kg mass by 2 m (g=10): Work = mgh = 10(10)(2) = 200 J.', commonMistakes: ['Forgetting angle θ in W = F s cos θ when force is at an angle.'], shortSummary: 'W = F s cos θ. Work-Energy Theorem: W = ΔKE. Power P = W/t.' }],
        realLifeUses: [{ title: 'Hydroelectric Power Dams', scenario: 'Converting water PE = mgh into electrical power.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'phy_q5_1', question: 'What is the kinetic energy of a 2 kg body moving at 4 m/s?', options: ['16 J', '8 J', '32 J', '4 J'], correctAnswerIndex: 0, explanation: 'KE = ½ mv² = ½(2)(16) = 16 J.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p5_1', title: 'Power Calculation', category: 'Formula Practice', problemText: 'Motor lifts 100 kg by 10 m in 5 s (g=10). Find power P.', hintStepByStep: ['Work W = mgh = 100(10)(10) = 10000 J.', 'P = W/t = 10000 / 5.'], fullExplanation: '2000 W = 2 kW.', finalAnswer: '2000 W' }],
        miniProjects: [{ id: 'phy_proj_5', title: 'Rubber Band Sling Energy Model', objective: 'Measure stretch distance x vs paper pellet launch height h.', materialsRequired: ['Rubber band, ruler'], steps: ['1. Stretch x = 2cm, 4cm, 6cm.', '2. Compare PE = ½kx² with height.'], expectedOutcome: 'Visual proof of elastic potential energy conversion.' }],
        learningResources: createMultilingualResources('Physics', 5, 'Work, Energy and Power')
      },
      {
        chapterNumber: 6,
        chapterName: 'System of Particles and Rotational Motion',
        introSimpleEnglish: 'Rotational motion replaces linear velocity v with angular velocity ω, force F with torque τ = r × F, and mass m with Moment of Inertia I.',
        conceptNotes: [{ id: 'phy_c6_n1', conceptHeading: 'Center of Mass, Torque & Moment of Inertia', simpleMeaning: 'Torque τ = r F sin θ. Rotational KE = ½ I ω². Moment of inertia I = ∑ m_i r_i². Conservation of Angular Momentum L = I ω.', keyPoints: ['Torque τ = r F sin θ.', 'Angular Momentum L = I ω.', 'Rotational KE = ½ I ω².', 'Conservation of L: If external torque = 0, I₁ ω₁ = I₂ ω₂.'], terminology: [{ term: 'Moment of Inertia I', definition: 'Rotational inertia I = ∑ m r².' }], formula: 'τ = I α · L = I ω · Rotational KE = ½ I ω²', easyExample: 'A spinning ice skater pulls arms in ⟹ I decreases ⟹ angular speed ω increases!', commonMistakes: ['Confusing linear mass m with rotational moment of inertia I.'], shortSummary: 'Torque τ = I α. Angular momentum L = I ω conserved when τ_ext = 0.' }],
        realLifeUses: [{ title: 'Spinning Gyroscope Navigation', scenario: 'Maintaining orientation stability in spacecraft.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'phy_q6_1', question: 'When an ice skater pulls arms inward while spinning, what happens to angular velocity ω?', options: ['Increases', 'Decreases', 'Remains same', 'Becomes zero'], correctAnswerIndex: 0, explanation: 'By conservation of L = I ω, decreasing I increases ω.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p6_1', title: 'Torque Calculation', category: 'Formula Practice', problemText: 'Force of 20 N applied at distance 0.5 m perpendicular to wrench. Find torque τ.', hintStepByStep: ['τ = r F sin 90° = (0.5)(20)(1).'], fullExplanation: '10 N·m.', finalAnswer: '10 N·m' }],
        miniProjects: [{ id: 'phy_proj_6', title: 'Fidget Spinner Rotational Flywheel', objective: 'Time spin duration with added weight on outer ring.', materialsRequired: ['Fidget spinner, coins'], steps: ['1. Spin clean spinner.', '2. Attach coins to increase I and re-spin.'], expectedOutcome: 'Hands-on understanding of moment of inertia I.' }],
        learningResources: createMultilingualResources('Physics', 6, 'System of Particles and Rotational Motion')
      },
      {
        chapterNumber: 7,
        chapterName: 'Oscillations',
        introSimpleEnglish: 'Simple Harmonic Motion (SHM) is periodic back-and-forth oscillation where restoring force F = -k x.',
        conceptNotes: [{ id: 'phy_c7_n1', conceptHeading: 'Simple Harmonic Motion & Simple Pendulum', simpleMeaning: 'Restoring force F = -k x. Displacement x(t) = A sin(ωt + φ). Simple pendulum time period T = 2π √(L/g).', keyPoints: ['SHM Condition: Acceleration a = -ω² x.', 'Displacement: x = A sin(ωt + φ).', 'Simple Pendulum Period: T = 2π √(L/g).', 'Total Energy in SHM: E = ½ k A².'], terminology: [{ term: 'Amplitude A', definition: 'Maximum displacement from mean equilibrium position.' }], formula: 'F = -k x · a = -ω² x · Pendulum T = 2π √(L/g)', easyExample: 'Length L = 1m pendulum has time period T ≈ 2π √(1/9.8) ≈ 2 seconds.', commonMistakes: ['Thinking pendulum period depends on bob mass m. T depends ONLY on length L and g!'], shortSummary: 'SHM: a = -ω² x. Pendulum period T = 2π √(L/g) independent of mass.' }],
        realLifeUses: [{ title: 'Grandfather Clock Pendulums', scenario: 'Using constant SHM period T to keep precise time.', iconName: 'Layers' }],
        quizQuestions: [{ id: 'phy_q7_1', question: 'If length L of a simple pendulum is quadrupled (4L), its time period T becomes:', options: ['Doubled (2T)', 'Quadrupled (4T)', 'Halved (T/2)', 'Unchanged'], correctAnswerIndex: 0, explanation: 'T ∝ √L. √(4L) = 2 √L ⟹ Period doubles.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p7_1', title: 'Pendulum Period', category: 'Formula Practice', problemText: 'Find period T of L=1m pendulum (g=π²≈9.87).', hintStepByStep: ['T = 2π √(1/π²) = 2π(1/π).'], fullExplanation: '2 seconds.', finalAnswer: '2 s' }],
        miniProjects: [{ id: 'phy_proj_7', title: 'String Pendulum Period Measurement', objective: 'Verify T ∝ √L using string, washer, and stopwatch.', materialsRequired: ['String, washer, stopwatch'], steps: ['1. Test L = 25 cm, 50 cm, 100 cm.', '2. Time 10 oscillations.'], expectedOutcome: 'Experimental proof that period doubles when length quadruples.' }],
        learningResources: createMultilingualResources('Physics', 7, 'Oscillations')
      },
      {
        chapterNumber: 8,
        chapterName: 'Gravitation',
        introSimpleEnglish: 'Newton\'s Law of Universal Gravitation F = G m₁m₂ / r². Satellites orbit Earth with orbital velocity v_o = √(GM/r) and escape velocity v_e = √(2gR) = 11.2 km/s.',
        conceptNotes: [{ id: 'phy_c8_n1', conceptHeading: 'Universal Gravitation & Escape Velocity', simpleMeaning: 'F = G m₁m₂ / r². Acceleration due to gravity g = GM/R². Escape velocity from Earth v_e = √(2gR) ≈ 11.2 km/s.', keyPoints: ['Gravitational Force F = G m₁m₂ / r².', 'Universal constant G = 6.67 × 10⁻¹¹ N m²/kg².', 'g at height h: g_h = g (1 - 2h/R).', 'Escape Velocity v_e = √(2gR) = 11.2 km/s.'], terminology: [{ term: 'Escape Velocity', definition: 'Minimum speed required to break free from gravitational pull.' }], formula: 'F = G m₁m₂ / r² · g = GM/R² · v_e = √(2gR) = 11.2 km/s', easyExample: 'Earth escape velocity is 11.2 km/s (approx 40,000 km/h).', commonMistakes: ['Confusing Universal G (constant) with local g (acceleration 9.8 m/s²).'], shortSummary: 'F = G m₁m₂ / r². Earth escape velocity v_e = 11.2 km/s.' }],
        realLifeUses: [{ title: 'SpaceX Rocket Launches', scenario: 'Accelerating spacecraft past 11.2 km/s to leave Earth orbit.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'phy_q8_1', question: 'What is the escape velocity v_e from the surface of Earth?', options: ['11.2 km/s', '9.8 m/s²', '7.9 km/s', '3 × 10⁸ m/s'], correctAnswerIndex: 0, explanation: 'v_e = √(2gR) ≈ 11.2 km/s.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p8_1', title: 'Gravitational Force Ratio', category: 'Formula Practice', problemText: 'If distance r between two masses is doubled, force F becomes:', hintStepByStep: ['F ∝ 1/r².', 'Replacing r with 2r gives 1/(2r)² = 1/4 F.'], fullExplanation: 'F/4 (one-fourth).', finalAnswer: 'F/4' }],
        miniProjects: [{ id: 'phy_proj_8', title: 'Orbit Trajectory Gravity Simulation', objective: 'Plot satellite elliptical orbit path.', materialsRequired: ['Computer browser'], steps: ['1. Open interactive orbit canvas.', '2. Vary launch velocity v.'], expectedOutcome: 'Visual understanding of circular vs escape trajectory.' }],
        learningResources: createMultilingualResources('Physics', 8, 'Gravitation')
      },
      {
        chapterNumber: 9,
        chapterName: 'Mechanical Properties of Solids',
        introSimpleEnglish: 'Hooke\'s Law states Stress ∝ Strain within elastic limit. Young\'s Modulus Y = Stress / Strain measures material stiffness.',
        conceptNotes: [{ id: 'phy_c9_n1', conceptHeading: 'Stress, Strain & Young\'s Modulus (Y)', simpleMeaning: 'Stress = Force / Area. Strain = ΔL / L. Hooke\'s Law: Stress = Y × Strain. Young\'s Modulus Y = (F L) / (A ΔL).', keyPoints: ['Stress = Force / Area (N/m² or Pa).', 'Longitudinal Strain = ΔL / L (Dimensionless).', 'Hooke\'s Law: Stress ∝ Strain.', 'Young\'s Modulus Y = (F / A) / (ΔL / L).'], terminology: [{ term: 'Young\'s Modulus Y', definition: 'Ratio of tensile stress to tensile strain.' }], formula: 'Stress = F / A · Strain = ΔL / L · Y = (F L) / (A ΔL)', easyExample: 'Steel has higher Young\'s Modulus than rubber, making steel more elastic in physics!', commonMistakes: ['Thinking rubber is more elastic than steel. Steel returns to shape under higher stress!'], shortSummary: 'Stress = F/A. Strain = ΔL/L. Young\'s Modulus Y = Stress / Strain.' }],
        realLifeUses: [{ title: 'Steel I-Beam Bridge Supports', scenario: 'Selecting high Y steel beams to minimize sag ΔL under load.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'phy_q9_1', question: 'Which material is physically more elastic according to Young\'s Modulus?', options: ['Steel', 'Rubber', 'Plastic', 'Wood'], correctAnswerIndex: 0, explanation: 'Steel withstands far higher stress for the same strain, so Y_steel > Y_rubber.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p9_1', title: 'Stress Calculation', category: 'Formula Practice', problemText: '1000 N force applied on 0.01 m² steel rod. Find stress.', hintStepByStep: ['Stress = F / A = 1000 / 0.01.'], fullExplanation: '100,000 N/m² = 10⁵ Pa.', finalAnswer: '10⁵ Pa' }],
        miniProjects: [{ id: 'phy_proj_9', title: 'Wire Extension Elastic Limit Tester', objective: 'Measure extension ΔL of wire under hanging weights.', materialsRequired: ['Wire, weights, ruler'], steps: ['1. Hang 1kg, 2kg, 3kg.', '2. Measure ΔL and verify linearity.'], expectedOutcome: 'Experimental proof of Hooke\'s Law.' }],
        learningResources: createMultilingualResources('Physics', 9, 'Mechanical Properties of Solids')
      },
      {
        chapterNumber: 10,
        chapterName: 'Mechanical Properties of Fluids',
        introSimpleEnglish: 'Pascal\'s Law transmits hydraulic pressure equally. Bernoulli\'s Principle P + ½ ρv² + ρgh = constant explains airplane wing lift!',
        conceptNotes: [{ id: 'phy_c10_n1', conceptHeading: 'Pascal\'s Law & Bernoulli\'s Principle', simpleMeaning: 'Pressure P = F/A. Pascal\'s Law: Hydraulic lift F₂ = F₁ (A₂/A₁). Bernoulli\'s Equation: P + ½ ρv² + ρgh = constant.', keyPoints: ['Pressure at depth h: P = P₀ + ρgh.', 'Pascal Law: Enclosed liquid pressure transmitted equally in all directions.', 'Bernoulli Principle: Higher fluid speed v ⟹ Lower pressure P.', 'Viscosity: Fluid internal friction (Poiseuille flow).'], terminology: [{ term: 'Bernoulli Principle', definition: 'P + ½ ρv² + ρgh = Constant along a streamline.' }], formula: 'P = F / A · Bernoulli: P + ½ ρv² + ρgh = Constant', easyExample: 'Airplane wing shape creates faster air velocity above wing ⟹ Lower P above ⟹ Upward aerodynamic lift!', commonMistakes: ['Thinking higher air speed creates higher pressure. Fast moving fluid has LOWER pressure!'], shortSummary: 'Pascal: Hydraulic F₂ = F₁(A₂/A₁). Bernoulli: High speed v ⟹ Low pressure P.' }],
        realLifeUses: [{ title: 'Hydraulic Car Brakes & Airplane Lift', scenario: 'Hydraulic brake foot pedal and airplane wing lift generation.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'phy_q10_1', question: 'According to Bernoulli\'s principle, where air speed v is faster, pressure P is:', options: ['Lower', 'Higher', 'Zero', 'Unchanged'], correctAnswerIndex: 0, explanation: 'Bernoulli equation P + ½ ρv² = Constant ⟹ Higher v gives lower P.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p10_1', title: 'Hydraulic Press Force', category: 'Formula Practice', problemText: 'F₁=50 N on small piston A₁=0.01 m². Find force F₂ on A₂=0.5 m².', hintStepByStep: ['F₂ = F₁ (A₂ / A₁) = 50 (0.5 / 0.01) = 50 × 50.'], fullExplanation: '2500 N.', finalAnswer: '2500 N' }],
        miniProjects: [{ id: 'phy_proj_10', title: 'Two-Syringe Hydraulic Lift Model', objective: 'Connect small syringe to large syringe via plastic tube filled with water.', materialsRequired: ['2 Syringes, plastic tube, water'], steps: ['1. Fill tube with water.', '2. Push small plunger to lift weight on big plunger.'], expectedOutcome: 'Direct mechanical demonstration of Pascal\'s Law force multiplication.' }],
        learningResources: createMultilingualResources('Physics', 10, 'Mechanical Properties of Fluids')
      },
      {
        chapterNumber: 11,
        chapterName: 'Thermal Properties of Matter',
        introSimpleEnglish: 'Heat energy Q = m c ΔT raises temperature. Heat transfer occurs by Conduction, Convection, and Radiation (Newton\'s Law of Cooling).',
        conceptNotes: [{ id: 'phy_c11_n1', conceptHeading: 'Specific Heat Capacity & Thermal Expansion', simpleMeaning: 'Heat Q = m c ΔT. Linear expansion ΔL = L α ΔT. Newton\'s Law of Cooling: Rate of cooling dQ/dt ∝ (T - T_surr).', keyPoints: ['Heat Capacity Q = m c ΔT.', 'Latent Heat Q = m L (Phase change without temperature change).', 'Thermal Expansion ΔL = L α ΔT.', 'Newton Law of Cooling: dQ/dt = -k (T - T₀).'], terminology: [{ term: 'Specific Heat c', definition: 'Heat required to raise 1 kg mass by 1°C.' }], formula: 'Q = m c ΔT · Latent Q = m L · ΔL = L α ΔT', easyExample: 'Water high specific heat c = 4186 J/kg°C keeps coastal climate moderate.', commonMistakes: ['Confusing sensible heat Q = mcΔT with latent heat Q = mL (where ΔT = 0).'], shortSummary: 'Q = m c ΔT. Latent Q = mL. Thermal expansion ΔL = L α ΔT.' }],
        realLifeUses: [{ title: 'Railway Expansion Gaps', scenario: 'Leaving small gaps between steel rails to prevent buckling during hot summers.', iconName: 'Layers' }],
        quizQuestions: [{ id: 'phy_q11_1', question: 'What is heat absorbed during phase change at constant temperature called?', options: ['Latent Heat', 'Specific Heat', 'Thermal Conductance', 'Molar Heat'], correctAnswerIndex: 0, explanation: 'Latent heat Q = mL causes phase change without changing temperature.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p11_1', title: 'Heat Calculation', category: 'Formula Practice', problemText: 'Heat needed to raise 2 kg water (c=4200) by 10°C.', hintStepByStep: ['Q = m c ΔT = 2 × 4200 × 10.'], fullExplanation: '84,000 J = 84 kJ.', finalAnswer: '84 kJ' }],
        miniProjects: [{ id: 'phy_proj_11', title: 'Bimetallic Strip Thermostat Model', objective: 'Observe brass-iron bonded strip bending over candle flame.', materialsRequired: ['Bimetallic strip, candle'], steps: ['1. Heat strip.', '2. Observe bending due to different expansion coefficients α.'], expectedOutcome: 'Visual understanding of differential thermal expansion.' }],
        learningResources: createMultilingualResources('Physics', 11, 'Thermal Properties of Matter')
      },
      {
        chapterNumber: 12,
        chapterName: 'Thermodynamics',
        introSimpleEnglish: '1st Law of Thermodynamics: ΔQ = ΔU + W (Conservation of Energy). 2nd Law states heat cannot flow spontaneously from cold to hot without external work.',
        conceptNotes: [{ id: 'phy_c12_n1', conceptHeading: '1st Law, 2nd Law & Carnot Engine Efficiency', simpleMeaning: '1st Law: ΔQ = ΔU + W. Isothermal: ΔT = 0 ⟹ ΔU = 0. Adiabatic: ΔQ = 0. Carnot Efficiency η = 1 - T₂/T₁.', keyPoints: ['1st Law: ΔQ = ΔU + W.', 'Work done in isobaric process: W = P ΔV.', 'Adiabatic Process: P V^γ = Constant, ΔQ = 0.', 'Carnot Engine Efficiency: η = 1 - (T_cold / T_hot).'], terminology: [{ term: '1st Law Thermodynamics', definition: 'Conservation of energy ΔQ = ΔU + W.' }], formula: 'ΔQ = ΔU + W · Carnot Efficiency η = 1 - T₂/T₁', easyExample: 'Carnot engine between 600 K and 300 K has efficiency η = 1 - 300/600 = 50%.', commonMistakes: ['Using Celsius instead of Kelvin temperatures in Carnot efficiency formula!'], shortSummary: 'ΔQ = ΔU + W. Carnot efficiency η = 1 - T₂/T₁ (temperatures in Kelvin).' }],
        realLifeUses: [{ title: 'Automobile Heat Engines & Fridges', scenario: 'Converting combustion thermal energy into mechanical drive motion.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'phy_q12_1', question: 'In an Isothermal thermodynamic expansion process, what is ΔU?', options: ['0', 'ΔQ', 'W', 'Infinite'], correctAnswerIndex: 0, explanation: 'Isothermal means constant temperature ⟹ ΔT = 0 ⟹ Internal Energy ΔU = 0.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p12_1', title: 'Carnot Engine Efficiency', category: 'Formula Practice', problemText: 'Engine operates between 500 K and 300 K. Find efficiency η.', hintStepByStep: ['η = 1 - (300/500) = 1 - 0.6.'], fullExplanation: '0.4 = 40%.', finalAnswer: '40%' }],
        miniProjects: [{ id: 'phy_proj_12', title: 'Stirling Hot Air Engine Model', objective: 'Observe heat-driven piston rotation over tea mug.', materialsRequired: ['Low-temp Stirling kit'], steps: ['1. Place engine on mug of hot water.', '2. Spin flywheel.'], expectedOutcome: 'Hands-on thermodynamic heat engine operation.' }],
        learningResources: createMultilingualResources('Physics', 12, 'Thermodynamics')
      },
      {
        chapterNumber: 13,
        chapterName: 'Kinetic Theory',
        introSimpleEnglish: 'Kinetic Theory models gas as rapid chaotic molecules. Ideal Gas Law P V = n R T. Pressure P = ⅓ ρ v_rms².',
        conceptNotes: [{ id: 'phy_c13_n1', conceptHeading: 'Ideal Gas Law & RMS Speed (v_rms)', simpleMeaning: 'P V = n R T. Pressure P = ⅓ ρ v_rms². Average Kinetic Energy of gas molecule E = <sup>3</sup>/<sub>2</sub> k_B T. Degrees of freedom determines molar heat capacity.', keyPoints: ['Ideal Gas Law: P V = n R T.', 'RMS Velocity v_rms = √(3RT/M) = √(3k_B T/m).', 'Average Translational KE per molecule = <sup>3</sup>/<sub>2</sub> k_B T.', 'Equipartition of Energy: ½ k_B T per degree of freedom.'], terminology: [{ term: 'RMS Speed v_rms', definition: 'v_rms = √(3RT/M)' }], formula: 'P V = n R T · P = ⅓ ρ v_rms² · v_rms = √(3RT/M) · KE = <sup>3</sup>/<sub>2</sub> k_B T', easyExample: 'Raising gas absolute temperature T by 4x doubles molecule RMS speed v_rms (since v_rms ∝ √T).', commonMistakes: ['Confusing average molecular speed with root-mean-square speed v_rms.'], shortSummary: 'P V = n R T. Molecular KE = <sup>3</sup>/<sub>2</sub> k_B T. v_rms = √(3RT/M).' }],
        realLifeUses: [{ title: 'Scuba Diving Air Cylinder Pressure', scenario: 'Calculating air pressure changes with temperature underwater.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'phy_q13_1', question: 'Average kinetic energy of an ideal gas molecule depends ONLY on its:', options: ['Absolute Temperature T', 'Pressure P', 'Volume V', 'Molecular Mass M'], correctAnswerIndex: 0, explanation: 'KE = <sup>3</sup>/<sub>2</sub> k_B T, directly proportional to absolute temperature T.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p13_1', title: 'RMS Speed Ratio', category: 'Formula Practice', problemText: 'If temperature T quadruples (4T), how does v_rms change?', hintStepByStep: ['v_rms ∝ √T.', '√(4T) = 2 √T.'], fullExplanation: 'Doubles (2x).', finalAnswer: 'Doubles (2x)' }],
        miniProjects: [{ id: 'phy_proj_13', title: 'Gas Diffusion Ping-Pong Simulation', objective: 'Simulate chaotic molecular collisions using ping pong balls in a box.', materialsRequired: ['Cardboard box, ping pong balls'], steps: ['1. Shake box.', '2. Track mean free path.'], expectedOutcome: 'Visual understanding of kinetic gas pressure.' }],
        learningResources: createMultilingualResources('Physics', 13, 'Kinetic Theory')
      },
      {
        chapterNumber: 14,
        chapterName: 'Physics of Emerging Technologies',
        introSimpleEnglish: 'Explores cutting-edge physics applications powering 21st-century innovations: Quantum Computing, Semiconductor Nanotechnology, Photovoltaics, and Superconductivity.',
        conceptNotes: [{ id: 'phy_c14_n1', conceptHeading: 'Semiconductors, Quantum Bits & Nanotechnology', simpleMeaning: 'p-n Junction Diodes, Photovoltaic Solar Cells, Quantum Qubits (Superposition & Entanglement), and High-T_c Superconductors.', keyPoints: ['p-n Junction: Foundation of microprocessors, LEDs, and solar cells.', 'Quantum Computing Qubit: Uses superposition (|0⟩ and |1⟩ simultaneously) for exponential parallel processing.', 'Superconductivity: Zero electrical resistance below critical temperature T_c (Meissner Effect).', 'Nanotechnology: Materials at 1-100 nm scale exhibiting quantum size confinement.'], terminology: [{ term: 'Qubit', definition: 'Quantum bit capable of superposition states.' }], formula: 'Energy Gap E_g = h c / λ · Superposition |Ψ⟩ = α|0⟩ + β|1⟩', easyExample: 'Silicon solar cells convert photon energy hν into electron-hole pairs ⟹ Clean electricity!', commonMistakes: ['Confusing classical binary bits (0 or 1) with quantum qubits (superposition of 0 and 1).'], shortSummary: 'Semiconductors enable microchips. Qubits enable quantum computing. Superconductors have zero resistance.' }],
        realLifeUses: [{ title: 'Quantum Computers & Solar Microgrids', scenario: 'IBM/Google quantum chips and rooftop solar panels.', iconName: 'Sparkles' }],
        quizQuestions: [{ id: 'phy_q14_1', question: 'Which phenomenon describes zero electrical resistance in materials cooled below critical temperature?', options: ['Superconductivity', 'Semiconductivity', 'Piezoelectricity', 'Ferromagnetism'], correctAnswerIndex: 0, explanation: 'Superconductors exhibit exactly 0 electrical resistance and expel magnetic fields (Meissner Effect).', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'phy_p14_1', title: 'Solar Cell Photon Wavelength', category: 'Basic Understanding', problemText: 'Silicon bandgap E_g = 1.1 eV. Find max wavelength λ = hc / E_g.', hintStepByStep: ['λ = 1240 / 1.1 nm.'], fullExplanation: '≈ 1127 nm (Infrared).', finalAnswer: '1127 nm' }],
        miniProjects: [{ id: 'phy_proj_14', title: 'Solar Cell I-V Characteristic Curve', objective: 'Measure small solar panel voltage output under desk lamp light.', materialsRequired: ['Small solar panel, multimeter'], steps: ['1. Measure V_oc and I_sc.', '2. Plot I-V curve.'], expectedOutcome: 'Hands-on understanding of photovoltaic semiconductor physics.' }],
        learningResources: createMultilingualResources('Physics', 14, 'Physics of Emerging Technologies')
      }
    ]
  },

  // =========================================================================
  // CHEMISTRY (10 CHAPTERS)
  // =========================================================================
  chemistry_1: {
    subjectId: 'chemistry_1',
    subjectTitle: 'Chemistry',
    shortLabel: 'Chemistry 1st Yr',
    description: 'Telangana Board Intermediate 1st Year Chemistry covering Atomic Structure, Periodic Table, Chemical Bonding, Stoichiometry, and Organic Chemistry.',
    chapters: [
      {
        chapterNumber: 1,
        chapterName: 'Atomic Structure',
        introSimpleEnglish: 'Atoms consist of subatomic particles: positively charged protons, neutral neutrons in nucleus, and revolving electrons.',
        conceptNotes: [{ id: 'chem_c1_n1', conceptHeading: 'Bohr Model & 4 Quantum Numbers', simpleMeaning: 'Electrons revolve in quantized orbits L = mvr = nh/(2π). 4 Quantum Numbers (n, l, m, s) define electron address.', keyPoints: ['Principal n: Main shell energy level.', 'Azimuthal l: Orbital shape (s=0, p=1, d=2, f=3).', 'Magnetic m: Spatial orientation.', 'Spin s: Electron spin (±½).', 'Max electrons in n-th shell = 2n².'], terminology: [{ term: 'Quantum Numbers', definition: '4 numbers specifying electron address.' }], formula: 'mvr = nh/(2π) · Max electrons = 2n²', easyExample: 'For 3d orbital: n = 3, l = 2.', commonMistakes: ['Writing l = n instead of max l = n - 1.'], shortSummary: 'Quantum numbers (n, l, m, s) specify electron address. Max shell electrons = 2n².' }],
        realLifeUses: [{ title: 'Neon Light Colors', scenario: 'Excited electrons dropping orbits emit colored photons.', iconName: 'Sparkles' }],
        quizQuestions: [{ id: 'chem_q1_1', question: 'What is max electrons in 3rd shell (n=3)?', options: ['18', '8', '32', '10'], correctAnswerIndex: 0, explanation: '2n² = 2(3)² = 18.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p1_1', title: 'Quantum Numbers for 3d', category: 'Basic Understanding', problemText: 'Find n and l for 3d orbital.', hintStepByStep: ['Prefix 3 gives n=3.', 'd subshell gives l=2.'], fullExplanation: 'n=3, l=2.', finalAnswer: 'n=3, l=2' }],
        miniProjects: [{ id: 'chem_proj_1', title: '3D Orbital Shape Ball Model', objective: 'Model s (sphere) and p (dumbbell) orbitals.', materialsRequired: ['Clay balls, toothpicks'], steps: ['1. Roll sphere.', '2. Make dumbbell.'], expectedOutcome: 'Visual 3D orbital shape model.' }],
        learningResources: createMultilingualResources('Chemistry', 1, 'Atomic Structure')
      },
      {
        chapterNumber: 2,
        chapterName: 'Classification of Elements and Periodicity in Properties',
        introSimpleEnglish: 'Modern Periodic Table arranges elements by atomic number Z. Periodic trends include Atomic Radius, Ionization Enthalpy, and Electronegativity.',
        conceptNotes: [{ id: 'chem_c2_n1', conceptHeading: 'Modern Periodic Law & Trends', simpleMeaning: 'Modern Periodic Law: Properties are periodic functions of atomic number Z. Trends: Ionization Enthalpy increases across period, decreases down group.', keyPoints: ['Modern Periodic Law: Properties depend on Atomic Number Z.', 'Periods (7 horizontal rows), Groups (18 vertical columns).', 'Atomic Radius decreases across period, increases down group.', 'Ionization Enthalpy increases across period, decreases down group.'], terminology: [{ term: 'Ionization Enthalpy', definition: 'Energy required to remove outermost electron from isolated gaseous atom.' }], formula: 'IE_1 < IE_2 < IE_3', easyExample: 'Halogens (Group 17) have highest electronegativity (Fluorine = 4.0).', commonMistakes: ['Confusing atomic mass with modern atomic number Z.'], shortSummary: 'Modern table arranged by Z. IE and Electronegativity increase across period.' }],
        realLifeUses: [{ title: 'Semiconductor Silicon Selection', scenario: 'Group 14 elements (Si, Ge) used in computer microchips.', iconName: 'Grid' }],
        quizQuestions: [{ id: 'chem_q2_1', question: 'Which element has the highest electronegativity on Pauling scale?', options: ['Fluorine (F)', 'Oxygen (O)', 'Chlorine (Cl)', 'Sodium (Na)'], correctAnswerIndex: 0, explanation: 'Fluorine has highest electronegativity (4.0).', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p2_1', title: 'Ionization Energy Comparison', category: 'Basic Understanding', problemText: 'Which has higher IE₁: Sodium (Na) or Chlorine (Cl)?', hintStepByStep: ['IE increases across a period from left to right.', 'Na is Group 1, Cl is Group 17.'], fullExplanation: 'Chlorine (Cl) has much higher IE₁.', finalAnswer: 'Chlorine (Cl)' }],
        miniProjects: [{ id: 'chem_proj_2', title: 'Periodic Table Trend Map', objective: 'Color code periodic table sheet by electronegativity values.', materialsRequired: ['Printed table, highlighters'], steps: ['1. Color Group 1 light.', '2. Color Group 17 dark red.'], expectedOutcome: 'Visual mastery of periodic trends.' }],
        learningResources: createMultilingualResources('Chemistry', 2, 'Classification of Elements and Periodicity in Properties')
      },
      {
        chapterNumber: 3,
        chapterName: 'Chemical Bonding and Molecular Structure',
        introSimpleEnglish: 'Chemical bonding combines atoms via electron transfer (Ionic) or sharing (Covalent). VSEPR predicts 3D molecular geometry.',
        conceptNotes: [{ id: 'chem_c3_n1', conceptHeading: 'VSEPR Theory & Hybridization', simpleMeaning: 'VSEPR predicts shapes: CH₄ (Tetrahedral 109.5°), NH₃ (Pyramidal 107°), H₂O (Bent 104.5°). Hybridization: sp, sp², sp³.', keyPoints: ['Octet Rule: Target 8 valence electrons.', 'VSEPR Repulsion: Lone Pair-Lone Pair > Lone Pair-Bond Pair > Bond Pair-Bond Pair.', 'sp³ Hybridization: Tetrahedral geometry.'], terminology: [{ term: 'VSEPR Theory', definition: 'Valence Shell Electron Pair Repulsion theory.' }], formula: 'CH₄ (109.5°) · NH₃ (107°) · H₂O (104.5°)', easyExample: 'CH₄ has 4 bond pairs and 0 lone pairs ⟹ Tetrahedral shape.', commonMistakes: ['Ignoring lone pair repulsions.'], shortSummary: 'VSEPR predicts shapes. CH₄ Tetrahedral, NH₃ Pyramidal, H₂O Bent.' }],
        realLifeUses: [{ title: 'Pharmaceutical Molecular Design', scenario: 'Drug receptor binding dictated by 3D shape.', iconName: 'Sparkles' }],
        quizQuestions: [{ id: 'chem_q3_1', question: 'What is the molecular geometry of Methane (CH₄)?', options: ['Tetrahedral', 'Linear', 'Pyramidal', 'Bent'], correctAnswerIndex: 0, explanation: 'CH₄ has 4 bond pairs ⟹ Tetrahedral angle 109.5°.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p3_1', title: 'Ammonia Geometry', category: 'Basic Understanding', problemText: 'Predict shape of NH₃.', hintStepByStep: ['3 bond pairs + 1 lone pair = 4 total pairs.', 'Lone pair reduces angle to 107°.'], fullExplanation: 'Trigonal Pyramidal.', finalAnswer: 'Trigonal Pyramidal' }],
        miniProjects: [{ id: 'chem_proj_3', title: 'Clay Molecular Geometry Kit', objective: 'Build 3D models of CH₄, NH₃, H₂O.', materialsRequired: ['Clay, toothpicks'], steps: ['1. Roll central atom ball.', '2. Insert bond toothpicks at 109.5°, 107°, 104.5°.'], expectedOutcome: 'Tactile 3D molecular geometry comprehension.' }],
        learningResources: createMultilingualResources('Chemistry', 3, 'Chemical Bonding and Molecular Structure')
      },
      {
        chapterNumber: 4,
        chapterName: 'Stoichiometry',
        introSimpleEnglish: 'Stoichiometry calculates reaction quantities using Mole Concept (1 Mole = 6.022 × 10²³ particles), Molarity, and Oxidation Numbers.',
        conceptNotes: [{ id: 'chem_c4_n1', conceptHeading: 'Mole Concept, Molarity & Redox Balancing', simpleMeaning: '1 Mole = 6.022 × 10²³ particles = Molar Mass (g). Molarity M = (Moles of Solute) / (Volume of Solution in L).', keyPoints: ['Avogadro Number N_A = 6.022 × 10²³.', 'Molarity M = n / V(L).', 'Empirical Formula: Simplest whole-number ratio of atoms.', 'Oxidation State rules for balancing redox reactions.'], terminology: [{ term: 'Mole', definition: '6.022 × 10²³ elementary entities.' }], formula: 'Moles n = Mass / Molar Mass · Molarity M = n / V(L)', easyExample: 'Mass of 1 mole of H₂O = 2(1) + 16 = 18 grams.', commonMistakes: ['Using volume in mL instead of Liters in Molarity formula M = n / V(L).'], shortSummary: '1 Mole = 6.022 × 10²³ particles = Molar mass. Molarity M = n / V(L).' }],
        realLifeUses: [{ title: 'Pharmaceutical Pill Dosing', scenario: 'Calculating exact active drug ingredient mole concentrations.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'chem_q4_1', question: 'How many particles are present in 1 mole of any substance?', options: ['6.022 × 10²', '3 × 10⁸', '1.6 × 10⁻¹⁹', '1000'], correctAnswerIndex: 0, explanation: 'Avogadro\'s Constant N_A = 6.022 × 10²³.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p4_1', title: 'Molarity Calculation', category: 'Formula Practice', problemText: 'Find Molarity of 1 mole NaOH dissolved in 2 L solution.', hintStepByStep: ['M = n / V = 1 / 2.'], fullExplanation: '0.5 M.', finalAnswer: '0.5 M' }],
        miniProjects: [{ id: 'chem_proj_4', title: 'Solution Concentration Dilution Lab', objective: 'Dilute salt water from 1M to 0.1M using volumetric cylinder.', materialsRequired: ['Salt, measuring cylinder, scale'], steps: ['1. Dissolve 5.85g NaCl in 100mL = 1M.', '2. Dilute 10mL into 100mL = 0.1M.'], expectedOutcome: 'Practical laboratory solution preparation skill.' }],
        learningResources: createMultilingualResources('Chemistry', 4, 'Stoichiometry')
      },
      {
        chapterNumber: 5,
        chapterName: 'Thermodynamics',
        introSimpleEnglish: 'Chemical Thermodynamics measures enthalpy changes ΔH, entropy ΔS, and spontaneous reaction condition Gibbs Free Energy ΔG = ΔH - T ΔS.',
        conceptNotes: [{ id: 'chem_c5_n1', conceptHeading: 'Enthalpy ΔH, Entropy ΔS & Gibbs Free Energy ΔG', simpleMeaning: 'Exothermic reaction ΔH < 0. Endothermic ΔH > 0. Spontaneous reaction condition: Gibbs Free Energy ΔG = ΔH - T ΔS < 0.', keyPoints: ['Hess\'s Law: Total enthalpy change is independent of reaction path.', 'Exothermic ΔH < 0 (Releases heat).', 'Endothermic ΔH > 0 (Absorbs heat).', 'Spontaneity condition: ΔG = ΔH - T ΔS < 0.'], terminology: [{ term: 'Gibbs Free Energy ΔG', definition: 'ΔG = ΔH - T ΔS. Reaction spontaneous if ΔG < 0.' }], formula: 'ΔG = ΔH - T ΔS · Hess Law: ΔH_total = ∑ ΔH_steps', easyExample: 'Ice melting at room temp: ΔH > 0, ΔS > 0, at high T, T ΔS > ΔH ⟹ ΔG < 0 (Spontaneous!).', commonMistakes: ['Assuming all exothermic reactions (ΔH < 0) are automatically spontaneous without checking entropy ΔS.'], shortSummary: 'ΔG = ΔH - T ΔS. Reaction is spontaneous when ΔG < 0.' }],
        realLifeUses: [{ title: 'Cold Packs & Instant Hand Warmers', scenario: 'Exothermic iron oxidation warmers vs endothermic ammonium nitrate cold packs.', iconName: 'Layers' }],
        quizQuestions: [{ id: 'chem_q5_1', question: 'For a chemical reaction to be spontaneous at constant T and P, Gibbs Free Energy ΔG must be:', options: ['Negative (< 0)', 'Positive (> 0)', 'Zero (= 0)', 'Infinite'], correctAnswerIndex: 0, explanation: 'Spontaneous reactions require ΔG < 0.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p5_1', title: 'Gibbs Free Energy Calculation', category: 'Formula Practice', problemText: 'ΔH = -50 kJ, ΔS = +0.1 kJ/K at T = 300 K. Find ΔG.', hintStepByStep: ['ΔG = ΔH - T ΔS = -50 - 300(0.1) = -50 - 30.'], fullExplanation: '-80 kJ (Spontaneous!).', finalAnswer: '-80 kJ' }],
        miniProjects: [{ id: 'chem_proj_5', title: 'Instant Chemical Cold Pack Calorimeter', objective: 'Measure temperature drop during dissolution of urea/salt in water.', materialsRequired: ['Styrofoam cup, thermometer, water, urea/salt'], steps: ['1. Record initial water temp.', '2. Dissolve 10g urea and measure final temp drop.'], expectedOutcome: 'Experimental proof of endothermic reaction ΔH > 0.' }],
        learningResources: createMultilingualResources('Chemistry', 5, 'Thermodynamics')
      },
      {
        chapterNumber: 6,
        chapterName: 'Chemical Equilibrium and Acids and Bases',
        introSimpleEnglish: 'Equilibrium Constant K_c = [Products]/[Reactants]. Le Chatelier\'s Principle predicts equilibrium shift when T, P, or concentration change. pH = -log[H⁺].',
        conceptNotes: [{ id: 'chem_c6_n1', conceptHeading: 'Le Chatelier\'s Principle, K_p, K_c & pH Scale', simpleMeaning: 'Equilibrium Constant K_c = [C]^c [D]^d / [A]^a [B]^b. pH = -log[H⁺]. Buffer solutions resist pH changes.', keyPoints: ['Le Chatelier Principle: System shifts to oppose applied stress (T, P, conc).', 'Relation K_p = K_c (R T)^(Δn).', 'pH = -log[H⁺], pOH = -log[OH⁻], pH + pOH = 14.', 'Buffer Solution: Resists pH changes upon adding small acid/base.'], terminology: [{ term: 'pH Scale', definition: 'pH = -log[H⁺]. Neutral = 7, Acid < 7, Base > 7.' }], formula: 'K_p = K_c (R T)^(Δn) · pH = -log[H⁺] · pH + pOH = 14', easyExample: 'Pure water [H⁺] = 10⁻⁷ M ⟹ pH = -log(10⁻⁷) = 7 (Neutral).', commonMistakes: ['Including solid or pure liquid concentrations in K_c expressions!'], shortSummary: 'K_p = K_c(RT)^(Δn). pH = -log[H⁺]. Le Chatelier shifts equilibrium to oppose stress.' }],
        realLifeUses: [{ title: 'Human Blood pH Buffer System', scenario: 'Carbonic acid-bicarbonate buffer maintaining blood pH at 7.4.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'chem_q6_1', question: 'What is the pH of a solution with hydrogen ion concentration [H⁺] = 10⁻³ M?', options: ['3', '7', '11', '1'], correctAnswerIndex: 0, explanation: 'pH = -log(10⁻³) = 3 (Acidic).', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p6_1', title: 'pH Calculation', category: 'Formula Practice', problemText: 'Find pH of 0.01 M HCl solution ([H⁺] = 10⁻² M).', hintStepByStep: ['pH = -log(10⁻²) = 2.'], fullExplanation: 'pH = 2.', finalAnswer: '2' }],
        miniProjects: [{ id: 'chem_proj_6', title: 'Red Cabbage Natural pH Indicator Strip', objective: 'Extract red cabbage juice indicator to test household lemon, soap, and soda pH.', materialsRequired: ['Red cabbage, boiling water, cups, test liquids'], steps: ['1. Extract purple indicator juice.', '2. Add to lemon (pink=acid) and soap (green/blue=base).'], expectedOutcome: 'Hands-on understanding of pH scale and indicators.' }],
        learningResources: createMultilingualResources('Chemistry', 6, 'Chemical Equilibrium and Acids and Bases')
      },
      {
        chapterNumber: 7,
        chapterName: 'The s-Block Elements',
        introSimpleEnglish: 's-Block contains Group 1 (Alkali Metals: Na, K) and Group 2 (Alkaline Earth Metals: Mg, Ca). They are soft, highly reactive metals with low ionization energies.',
        conceptNotes: [{ id: 'chem_c7_n1', conceptHeading: 'Alkali & Alkaline Earth Metals Properties', simpleMeaning: 'Group 1 (ns¹) and Group 2 (ns²). Reactive metals forming basic hydroxides (NaOH, Ca(OH)₂). Flame test colors identify alkali ions.', keyPoints: ['Group 1 Alkali Metals: Na, K (Valence ns¹).', 'Group 2 Alkaline Earth Metals: Mg, Ca (Valence ns²).', 'Flame Test Colors: Na = Golden Yellow, K = Violet, Ca = Brick Red.', 'Plaster of Paris: CaSO₄ · ½ H₂O.'], terminology: [{ term: 'Plaster of Paris', definition: 'CaSO₄ · ½ H₂O produced by heating Gypsum at 393 K.' }], formula: 'Gypsum CaSO₄ · 2H₂O ➔(393 K) Plaster of Paris CaSO₄ · ½H₂O + 1½H₂O', easyExample: 'Sodium metal reacts violently with water: 2Na + 2H₂O ➔ 2NaOH + H₂ ↑.', commonMistakes: ['Overheating gypsum above 393 K produces dead burnt plaster without setting properties.'], shortSummary: 'Group 1 ns¹, Group 2 ns². Flame test identifies ions. Plaster of Paris = CaSO₄ · ½H₂O.' }],
        realLifeUses: [{ title: 'Bone Health & Cast Setting', scenario: 'Calcium in bones and Plaster of Paris medical bone fracture casts.', iconName: 'Sparkles' }],
        quizQuestions: [{ id: 'chem_q7_1', question: 'What is the chemical formula for Plaster of Paris?', options: ['CaSO₄ · ½ H₂O', 'CaSO₄ · 2 H₂O', 'CaCO₃', 'CaO'], correctAnswerIndex: 0, explanation: 'Plaster of Paris is Calcium Sulfate Hemihydrate CaSO₄ · ½ H₂O.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p7_1', title: 'Flame Test Color Identification', category: 'Basic Understanding', problemText: 'Which alkali metal ion imparts golden yellow color to flame?', hintStepByStep: ['Sodium (Na) gives golden yellow.', 'Potassium (K) gives violet.'], fullExplanation: 'Sodium (Na⁺).', finalAnswer: 'Sodium (Na⁺)' }],
        miniProjects: [{ id: 'chem_proj_7', title: 'Plaster of Paris Mold Setting Lab', objective: 'Mix Plaster of Paris powder with water and record setting time and temperature rise.', materialsRequired: ['Plaster of Paris, cup, water, thermometer'], steps: ['1. Mix POP with water 2:1.', '2. Record hardening time and exothermic temp rise.'], expectedOutcome: 'Practical understanding of hydration setting reaction.' }],
        learningResources: createMultilingualResources('Chemistry', 7, 'The s-Block Elements')
      },
      {
        chapterNumber: 8,
        chapterName: 'The p-Block Elements – Group 13',
        introSimpleEnglish: 'Group 13 (Boron Family: B, Al, Ga, In, Tl) has valence configuration ns² np¹. Borax, Boric Acid, and Diborane (B₂H₆) exhibit 3-center 2-electron banana bonds.',
        conceptNotes: [{ id: 'chem_c8_n1', conceptHeading: 'Boron Family, Diborane & Inert Pair Effect', simpleMeaning: 'Diborane B₂H₆ contains two 3-center 2-electron banana bonds. Inert pair effect makes lower oxidation state +1 more stable in heavier elements (Tl).', keyPoints: ['Valence configuration ns² np¹.', 'Diborane B₂H₆: 4 terminal 2c-2e bonds and 2 bridging 3c-2e banana bonds.', 'Borax Bead Test: Used to identify colored transition metal cations.', 'Aluminum amphoteric nature: Reacts with both acids and bases.'], terminology: [{ term: 'Banana Bond', definition: '3-center 2-electron electron-deficient bridge bond in B₂H₆.' }], formula: 'Diborane B₂H₆: 2 Bridging 3c-2e Banana Bonds + 4 Terminal 2c-2e Bonds', easyExample: 'Aluminum reacts with NaOH: 2Al + 2NaOH + 6H₂O ➔ 2Na[Al(OH)₄] + 3H₂ ↑.', commonMistakes: ['Thinking B₂H₆ has standard ethane-like covalent bonds. B₂H₆ is electron deficient!'], shortSummary: 'Group 13 ns² np¹. Diborane B₂H₆ has 3c-2e banana bonds. Inert pair effect stabilizes Tl⁺.' }],
        realLifeUses: [{ title: 'Aircraft Aluminum Alloys & Borosilicate Glass', scenario: 'Lightweight airplane bodies and heat-resistant Pyrex glassware.', iconName: 'Compass' }],
        quizQuestions: [{ id: 'chem_q8_1', question: 'How many 3-center 2-electron (banana) bonds are present in Diborane (B₂H₆)?', options: ['2', '4', '6', '0'], correctAnswerIndex: 0, explanation: 'Diborane contains 2 bridging 3c-2e banana bonds between Boron and Hydrogen.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p8_1', title: 'Oxidation State Stability', category: 'Basic Understanding', problemText: 'Why is Tl⁺1 more stable than Tl⁺3?', hintStepByStep: ['Heavier p-block elements show Inert Pair Effect.', 'Reluctance of 6s² electrons to participate in bonding.'], fullExplanation: 'Due to Inert Pair Effect.', finalAnswer: 'Inert Pair Effect' }],
        miniProjects: [{ id: 'chem_proj_8', title: 'Borax Crystal Slime Synthesis', objective: 'Synthesize cross-linked polymer slime using Borax solution and PVA glue.', materialsRequired: ['Borax powder, PVA glue, water'], steps: ['1. Dissolve borax in water.', '2. Stir into PVA glue until cross-linked slime forms.'], expectedOutcome: 'Hands-on cross-linking polymer chemistry.' }],
        learningResources: createMultilingualResources('Chemistry', 8, 'The p-Block Elements – Group 13')
      },
      {
        chapterNumber: 9,
        chapterName: 'The p-Block Elements – Group 14',
        introSimpleEnglish: 'Group 14 (Carbon Family: C, Si, Ge, Sn, Pb) ns² np². Carbon shows catenation and allotropy (Diamond, Graphite, Fullerenes). Silicones and Silicates form rock minerals.',
        conceptNotes: [{ id: 'chem_c9_n1', conceptHeading: 'Carbon Allotropes, Catenation & Silicones', simpleMeaning: 'Catenation: Carbon self-linking property forming chains and rings. Diamond (sp³, tetrahedral, hard insulator) vs Graphite (sp², planar layers, conductor).', keyPoints: ['Valence configuration ns² np².', 'Catenation ability: C >> Si > Ge ≈ Sn.', 'Diamond: sp³ hybridized, 3D network, hardest natural substance, insulator.', 'Graphite: sp² hybridized, hexagonal layers, soft lubricant, electrical conductor.', 'Fullerenes: C₆₀ cage-like soccer ball structure.'], terminology: [{ term: 'Catenation', definition: 'Ability of an atom to form covalent bonds with other atoms of the same element.' }], formula: 'Diamond (sp³, 109.5°) · Graphite (sp², 120° conductor)', easyExample: 'Graphite conducts electricity due to delocalized free pi electrons between layers.', commonMistakes: ['Thinking Diamond conducts electricity. Only Graphite conducts due to sp² free electrons!'], shortSummary: 'Carbon exhibits catenation. Diamond is sp³ hard insulator; Graphite is sp² soft conductor.' }],
        realLifeUses: [{ title: 'Pencil Lead Lubricants & Computer Chips', scenario: 'Graphite pencil cores and Silicon microprocessor transistors.', iconName: 'Grid' }],
        quizQuestions: [{ id: 'chem_q9_1', question: 'Which allotrope of carbon is a good conductor of electricity?', options: ['Graphite', 'Diamond', 'Coal', 'Charcoal'], correctAnswerIndex: 0, explanation: 'Graphite is sp² hybridized with delocalized pi electrons that conduct electricity.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p9_1', title: 'Hybridization Comparison', category: 'Basic Understanding', problemText: 'State hybridization of Carbon in Diamond vs Graphite.', hintStepByStep: ['Diamond = sp³ (Tetrahedral).', 'Graphite = sp² (Planar layers).'], fullExplanation: 'Diamond = sp³, Graphite = sp².', finalAnswer: 'Diamond sp³, Graphite sp²' }],
        miniProjects: [{ id: 'chem_proj_9', title: 'Graphite Pencil Circuit Conductor', objective: 'Draw heavy graphite pencil line on paper and complete LED circuit.', materialsRequired: ['2B Pencil, paper, 9V battery, LED'], steps: ['1. Draw thick graphite line.', '2. Touch LED leads to line and observe light.'], expectedOutcome: 'Direct electrical conductivity demonstration of sp² graphite.' }],
        learningResources: createMultilingualResources('Chemistry', 9, 'The p-Block Elements – Group 14')
      },
      {
        chapterNumber: 10,
        chapterName: 'Organic Chemistry – Some Basic Principles and Techniques and Hydrocarbons',
        introSimpleEnglish: 'Organic Chemistry studies carbon compounds. Covers IUPAC Nomenclature, Isomerism, Inductive/Resonance Effects, Alkanes, Alkenes (Markovnikov Rule), and Alkyne reactions.',
        conceptNotes: [{ id: 'chem_c10_n1', conceptHeading: 'IUPAC Naming, Isomerism & Markovnikov Addition', simpleMeaning: 'IUPAC Format: Prefix + Root Word + Suffix. Electrophiles (e⁻ loving) vs Nucleophiles (e⁻ rich). Markovnikov Rule: Addition of HX to unsymmetrical alkene attaches H to carbon with MORE hydrogen atoms.', keyPoints: ['IUPAC Naming: Prefix - Root Word - Primary Suffix - Secondary Suffix.', 'Inductive Effect (I) & Resonance Effect (R).', 'Structural Isomerism: Chain, Position, Functional, Metamerism.', 'Markovnikov Rule: H attaches to carbon with more H atoms.', 'Aromaticity: Huckel Rule (4n + 2) π electrons.'], terminology: [{ term: 'Markovnikov Rule', definition: 'Hydrogen adds to double-bond carbon having higher number of hydrogen atoms.' }], formula: 'Markovnikov: CH₃-CH=CH₂ + HCl ➔ CH₃-CH(Cl)-CH₃ (Major Product)', easyExample: 'Propene + HCl ➔ 2-Chloropropane (Major product via Markovnikov addition).', commonMistakes: ['Applying Markovnikov rule to symmetrical alkenes like CH₂=CH₂ where both carbons are identical.'], shortSummary: 'IUPAC names organic molecules. Markovnikov Rule: H adds to carbon with more H.' }],
        realLifeUses: [{ title: 'Petroleum Refining & Plastics', scenario: 'Cracking alkanes into alkenes for polyethylene plastic manufacturing.', iconName: 'Zap' }],
        quizQuestions: [{ id: 'chem_q10_1', question: 'In addition of HCl to Propene (CH₃-CH=CH₂), what is the major product by Markovnikov rule?', options: ['2-Chloropropane', '1-Chloropropane', 'Propane', 'Chloropropene'], correctAnswerIndex: 0, explanation: 'H adds to CH₂ carbon and Cl adds to CH carbon ⟹ 2-Chloropropane.', difficulty: 'Easy' }],
        practiceProblems: [{ id: 'chem_p10_1', title: 'IUPAC Naming of CH₃-CH₂-OH', category: 'Basic Understanding', problemText: 'Give IUPAC name for CH₃-CH₂-OH.', hintStepByStep: ['2 carbons = Eth-', 'Single bonds = -an-', 'Alcohol group = -ol.'], fullExplanation: 'Ethanol.', finalAnswer: 'Ethanol' }],
        miniProjects: [{ id: 'chem_proj_10', title: '3D Ball-and-Stick Organic Molecule Kit', objective: 'Construct Methane (CH₄), Ethene (C₂H₄), and Ethyne (C₂H₂) molecular models.', materialsRequired: ['Clay, toothpicks'], steps: ['1. Build CH₄ single bond.', '2. Build C₂H₄ double bond with 2 toothpicks.'], expectedOutcome: 'Tactile understanding of single, double, and triple carbon-carbon bonds.' }],
        learningResources: createMultilingualResources('Chemistry', 10, 'Organic Chemistry – Some Basic Principles and Techniques and Hydrocarbons')
      }
    ]
  }
};
