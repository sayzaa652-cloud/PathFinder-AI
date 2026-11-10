/**
 * Official Telangana Board of Intermediate Education (TGBIE) Curriculum
 * Reference Portal: https://tgbie.cgg.gov.in
 * Academic Year: 2026–27
 * 
 * Intermediate 1st Year Mathematics IA — Complete 12 Chapters Syllabus
 * 
 * Chapter 1: Sets and Relations
 * Chapter 2: Functions
 * Chapter 3: Sequences and Series
 * Chapter 4: Mathematical Induction
 * Chapter 5: Matrices
 * Chapter 6: Addition of Vectors
 * Chapter 7: Product of Vectors
 * Chapter 8: Trigonometric Ratios and Transformations
 * Chapter 9: Trigonometric Equations
 * Chapter 10: Inverse Trigonometric Functions
 * Chapter 11: Hyperbolic Functions
 * Chapter 12: Properties of Triangles
 */

export interface LearningResource {
  type: 'youtube' | 'website';
  title: string;
  sourceName: string;
  url: string;
  description?: string;
}

export interface MathStickyNote {
  id: string;
  stream: 'Intermediate MPC' | 'Intermediate BiPC';
  year: '1st Year' | '2nd Year';
  subject: 'Mathematics IA' | 'Mathematics IB' | 'Mathematics IIA' | 'Mathematics IIB';
  chapterNumber: number;
  chapterName: string;
  originalConceptName: string;
  whatIsIt: string; // 1-2 sentence simple English meaning
  example?: string;
  formula?: string;
  rememberTip: string; // Short remember tip
  resources: LearningResource[];
  stickyColor: 'yellow' | 'mint' | 'blue' | 'lavender' | 'peach' | 'lime' | 'amber';
  rotation: string;
}

export interface ChapterMindMapNode {
  title: string;
  description: string;
  subitems: string[];
}

export interface ChapterMindMap {
  chapterNumber: number;
  chapterName: string;
  centralTheme: string;
  nodes: ChapterMindMapNode[];
  quickSummary: string;
}

// =========================================================================
// MATHEMATICS IA — ALL 12 CHAPTERS STICKY NOTES
// =========================================================================

export const MATH_IA_STICKY_NOTES: MathStickyNote[] = [
  // -------------------------------------------------------------------------
  // CHAPTER 1: SETS AND RELATIONS
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch1_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 1,
    chapterName: 'Sets and Relations',
    originalConceptName: 'Sets, Representations & Types of Sets',
    whatIsIt: 'A set is a well-defined collection of distinct objects. It can be written in Roster form by listing elements {1, 2, 3} or Set-Builder form {x | x is an even number}. An empty set ∅ contains no elements.',
    example: 'A = {x ∈ N | x² < 10} = {1, 2, 3}. Set of positive even prime numbers is {2}.',
    formula: 'Total subsets of set with n elements = 2ⁿ · Proper subsets = 2ⁿ - 1',
    rememberTip: 'The empty set ∅ is a subset of every set, and every set is a subset of itself!',
    resources: [
      {
        type: 'website',
        title: 'TGBIE Official Syllabus Portal',
        sourceName: 'Telangana Board (tgbie.cgg.gov.in)',
        url: 'https://tgbie.cgg.gov.in',
        description: 'Official 1st Year Mathematics IA syllabus framework'
      },
      {
        type: 'youtube',
        title: 'Sets and Relations Chapter Overview',
        sourceName: 'Khan Academy / NCERT',
        url: 'https://www.youtube.com/results?search_query=Sets+and+Relations+Class+11+Intermediate+1st+Year',
        description: 'Complete introduction to sets, representations, and types'
      }
    ],
    stickyColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'ia_ch1_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 1,
    chapterName: 'Sets and Relations',
    originalConceptName: 'Subsets, Real Intervals & Venn Diagrams',
    whatIsIt: 'Set A is a subset of B (A ⊆ B) if every element of A is also in B. Subsets of real numbers R are represented as closed [a, b] or open (a, b) intervals. Venn diagrams depict sets as circles in a universal set U.',
    example: '[2, 5] includes 2 and 5; (2, 5) includes numbers between 2 and 5 but excludes endpoints.',
    formula: 'Closed Interval: [a, b] = {x ∈ R | a ≤ x ≤ b} · Open Interval: (a, b) = {x ∈ R | a < x < b}',
    rememberTip: 'Square brackets [ ] include endpoints; round parentheses ( ) exclude endpoints!',
    resources: [
      {
        type: 'website',
        title: 'Intervals & Venn Diagrams Guide',
        sourceName: 'GeeksforGeeks School',
        url: 'https://www.geeksforgeeks.org/sets-in-maths/',
        description: 'Interval notations and Venn diagram operations'
      },
      {
        type: 'youtube',
        title: 'Intervals as Subsets of R & Venn Diagrams',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Intervals+as+subsets+of+R+Venn+diagrams+Maths+1A',
        description: 'Visualizing intervals and set regions'
      }
    ],
    stickyColor: 'mint',
    rotation: 'rotate-1'
  },
  {
    id: 'ia_ch1_03',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 1,
    chapterName: 'Sets and Relations',
    originalConceptName: 'Operations on Sets & De Morgan\'s Laws',
    whatIsIt: 'Union (A ∪ B) combines elements from both sets. Intersection (A ∩ B) picks common elements. Complement A′ takes elements in universal set U that are not in A.',
    example: 'If U = {1..5}, A = {1, 2, 3}, B = {3, 4}, then A ∪ B = {1..4}, A ∩ B = {3}, and A′ = {4, 5}.',
    formula: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B) · De Morgan: (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′',
    rememberTip: 'De Morgan\'s Laws flip Union to Intersection (and vice versa) when taking the outer complement!',
    resources: [
      {
        type: 'website',
        title: 'Set Operations & De Morgan\'s Laws',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/de-morgans-law/',
        description: 'Union, intersection, and complement proofs'
      },
      {
        type: 'youtube',
        title: 'Operations on Sets & Cardinal Rules',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Operations+on+sets+De+Morgan+laws+Intermediate+1st+Year',
        description: 'Practical cardinal number formula problems'
      }
    ],
    stickyColor: 'peach',
    rotation: '-rotate-1'
  },
  {
    id: 'ia_ch1_04',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 1,
    chapterName: 'Sets and Relations',
    originalConceptName: 'Cartesian Product & Equivalence Relations',
    whatIsIt: 'Cartesian product A × B is the set of all ordered pairs (a, b). A relation R is a subset of A × B. A relation is Equivalence if it is Reflexive (aRa), Symmetric (aRb ⇒ bRa), and Transitive (aRb & bRc ⇒ aRc).',
    example: 'Congruence of triangles (T₁ ≅ T₂) is an equivalence relation on the set of triangles.',
    formula: 'Total relations from A to B = 2^(m × n) where |A| = m and |B| = n',
    rememberTip: 'To prove a relation is an Equivalence Relation, you MUST check all 3 properties: Reflexive, Symmetric, and Transitive!',
    resources: [
      {
        type: 'website',
        title: 'Equivalence Relations & Types',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/in-in-grade-11-math-ncert/x15b86a9f:relations-and-functions',
        description: 'Reflexive, symmetric, and transitive relation examples'
      },
      {
        type: 'youtube',
        title: 'Types of Relations & Equivalence Proofs',
        sourceName: 'Unacademy Telugu',
        url: 'https://www.youtube.com/results?search_query=Equivalence+relations+Sets+and+relations+Class+11',
        description: 'Important relation proof walkthroughs'
      }
    ],
    stickyColor: 'lavender',
    rotation: 'rotate-0.5'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 2: FUNCTIONS
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch2_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 2,
    chapterName: 'Functions',
    originalConceptName: 'Ordered Pairs & Types of Functions (One-One, Onto & Bijection)',
    whatIsIt: 'A function connects every domain input to exactly one output. One-One (Injective) means distinct inputs produce distinct outputs. Onto (Surjective) means every co-domain element is mapped. Bijection is both One-One and Onto.',
    example: 'f(x) = 2x + 3 from R to R is a bijection because every real number has a unique pre-image.',
    formula: 'One-One: f(x₁) = f(x₂) ⟹ x₁ = x₂ · Onto: Range(f) = Co-domain B',
    rememberTip: 'A function has an inverse f⁻¹ if and only if it is a Bijection (both one-one and onto)!',
    resources: [
      {
        type: 'website',
        title: 'Functions: Injective, Surjective & Bijective',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/types-of-functions/',
        description: 'Definitions, domain-range tables, and mapping rules'
      },
      {
        type: 'youtube',
        title: 'Functions: One-One, Onto & Bijection Lecture',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Functions+One-One+Onto+Bijection+Maths+1A+Telangana',
        description: 'Board exam 7-mark question mapping methods'
      }
    ],
    stickyColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'ia_ch2_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 2,
    chapterName: 'Functions',
    originalConceptName: 'Inverse Functions, Composite & Real-Valued Functions',
    whatIsIt: 'Composite function (g ∘ f)(x) applies f first and then g. Inverse function f⁻¹ reverses f. For real-valued functions, domain is the set of inputs that give real, finite values.',
    example: 'If f(x) = x + 3 and g(x) = 2x, then (g ∘ f)(4) = g(7) = 14.',
    formula: '(g ∘ f)(x) = g(f(x)) · Domain of √(A): A ≥ 0 · Domain of 1/A: A ≠ 0',
    rememberTip: 'For domain of square root expressions √(f(x)), set f(x) ≥ 0; for fraction denominators, set denominator ≠ 0!',
    resources: [
      {
        type: 'website',
        title: 'Domain and Range of Real Functions',
        sourceName: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/domain-and-range-of-a-function/',
        description: 'Determining domain and range of fractional/radical functions'
      },
      {
        type: 'youtube',
        title: 'Domain & Range of Real Valued Functions Maths 1A',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Domain+and+range+real+valued+functions+Maths+1A',
        description: 'Standard 7-mark domain determination problems'
      }
    ],
    stickyColor: 'blue',
    rotation: 'rotate-1'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 3: SEQUENCES AND SERIES
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch3_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 3,
    chapterName: 'Sequences and Series',
    originalConceptName: 'Arithmetic Progression (AP) & Sum of n Terms',
    whatIsIt: 'An Arithmetic Progression is a sequence where consecutive terms differ by a constant common difference d. The sum of n terms multiplies the average of first and last terms by n.',
    example: 'Sequence 3, 7, 11, 15... has first term a = 3 and common difference d = 4. 10th term a₁₀ = 3 + 9(4) = 39.',
    formula: 'a_n = a + (n - 1)d · S_n = (n/2)[2a + (n - 1)d] = (n/2)(a + l)',
    rememberTip: 'If 3 numbers are in AP, assume them as (a - d), a, (a + d) to easily eliminate d when summing!',
    resources: [
      {
        type: 'website',
        title: 'Arithmetic Progression Formulas & Examples',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences',
        description: 'n-th term and series sum walkthroughs'
      },
      {
        type: 'youtube',
        title: 'Arithmetic Progression (AP) Concept Video',
        sourceName: 'Unacademy Telugu',
        url: 'https://www.youtube.com/results?search_query=Arithmetic+Progression+Sequences+and+series+Class+11',
        description: 'AP properties and problem-solving techniques'
      }
    ],
    stickyColor: 'mint',
    rotation: '-rotate-0.5'
  },
  {
    id: 'ia_ch3_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 3,
    chapterName: 'Sequences and Series',
    originalConceptName: 'Geometric Progression (GP) & Infinite GP Sum',
    whatIsIt: 'A Geometric Progression is a sequence where each term is obtained by multiplying the previous term by a constant ratio r. An infinite GP converges to a finite sum when |r| < 1.',
    example: 'GP 8, 4, 2, 1... has a = 8, r = 1/2. Infinite sum S_∞ = 8 / (1 - 1/2) = 16.',
    formula: 'a_n = a · r^(n-1) · S_n = a(rⁿ - 1)/(r - 1) · Infinite sum S_∞ = a / (1 - r) for |r| < 1',
    rememberTip: 'The infinite GP sum formula S_∞ = a/(1 - r) ONLY applies when the common ratio |r| < 1!',
    resources: [
      {
        type: 'website',
        title: 'Geometric Progression & Infinite Sum',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/geometric-progression/',
        description: 'Sum of n terms and infinite GP convergence'
      },
      {
        type: 'youtube',
        title: 'Geometric Progression (GP) & Infinite Series',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Geometric+progression+GP+Sequences+and+series+Class+11',
        description: 'GP series sum and practical examples'
      }
    ],
    stickyColor: 'peach',
    rotation: 'rotate-1'
  },
  {
    id: 'ia_ch3_03',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 3,
    chapterName: 'Sequences and Series',
    originalConceptName: 'Arithmetic Mean (AM), Geometric Mean (GM) & AM ≥ GM',
    whatIsIt: 'For any two positive real numbers a and b, the Arithmetic Mean is (a+b)/2 and Geometric Mean is √(ab). The Arithmetic Mean is always greater than or equal to the Geometric Mean.',
    example: 'For a = 4 and b = 9: AM = (4+9)/2 = 6.5, GM = √(36) = 6. Notice AM (6.5) ≥ GM (6).',
    formula: 'AM = (a + b) / 2 · GM = √(ab) · Relation: AM ≥ GM  ⟹  (a + b) / 2 ≥ √(ab)',
    rememberTip: 'Equality AM = GM holds if and only if the numbers are equal (a = b)!',
    resources: [
      {
        type: 'website',
        title: 'Relationship Between AM and GM',
        sourceName: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/relation-between-am-and-gm/',
        description: 'Proof of AM ≥ GM inequality and Applications'
      },
      {
        type: 'youtube',
        title: 'AM and GM Relationship & Inequalities',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Relation+between+AM+and+GM+Sequences+and+series',
        description: 'Using AM ≥ GM to find minimum values'
      }
    ],
    stickyColor: 'lime',
    rotation: '-rotate-1'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 4: MATHEMATICAL INDUCTION
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch4_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 4,
    chapterName: 'Mathematical Induction',
    originalConceptName: 'Principle of Mathematical Induction & Summation Theorems',
    whatIsIt: 'A formal mathematical proof method for natural numbers: 1) Verify base case P(1). 2) Assume inductive hypothesis P(k) is true. 3) Prove P(k+1) is true. It proves standard summation formulas for all natural numbers.',
    example: 'Sum of first 3 squares: 1² + 2² + 3² = 14. Using formula: 3(4)(7)/6 = 14.',
    formula: 'Base P(1) ∧ [P(k) ⇒ P(k+1)] ⟹ ∀ n ∈ N, P(n) · ∑ n² = n(n+1)(2n+1)/6 · ∑ n³ = [n(n+1)/2]²',
    rememberTip: 'Clearly state your inductive hypothesis P(k) and explicitly substitute it into the proof for P(k+1)!',
    resources: [
      {
        type: 'website',
        title: 'Mathematical Induction Principles',
        sourceName: 'TGBIE Portal (tgbie.cgg.gov.in)',
        url: 'https://tgbie.cgg.gov.in',
        description: 'Official board chapter specification and 7-mark question pattern'
      },
      {
        type: 'youtube',
        title: 'Mathematical Induction 7 Marks Solved LAQs',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Mathematical+induction+Maths+1A+Telangana+Intermediate',
        description: 'Summation series induction proofs walkthrough'
      }
    ],
    stickyColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'ia_ch4_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 4,
    chapterName: 'Mathematical Induction',
    originalConceptName: 'Induction Problems on Divisibility and Inequalities',
    whatIsIt: 'Applying induction to prove an algebraic expression is divisible by a fixed integer m, or showing one quantity is strictly greater than another for all natural numbers n.',
    example: '7ⁿ - 1 is divisible by 6 for all n ∈ N. For n = 1: 7¹ - 1 = 6 (divisible by 6).',
    formula: 'For n = k+1: 7^(k+1) - 1 = 7(7^k - 1) + 6 = 7(6m) + 6 = 6(7m + 1)',
    rememberTip: 'For divisibility proofs, break down the higher power a^(k+1) into a · a^k to factor out the inductive term P(k)!',
    resources: [
      {
        type: 'website',
        title: 'Divisibility & Inequality Induction Proofs',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/in-in-grade-11-math-ncert/x15b86a9f:principle-of-mathematical-induction',
        description: 'Divisibility proof steps and inequality bounds'
      },
      {
        type: 'youtube',
        title: 'Divisibility Problems by Mathematical Induction',
        sourceName: 'Unacademy Telugu',
        url: 'https://www.youtube.com/results?search_query=Divisibility+problems+Mathematical+induction+Maths+1A',
        description: 'Standard 7-mark divisibility problem solving'
      }
    ],
    stickyColor: 'peach',
    rotation: 'rotate-1'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 5: MATRICES
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch5_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 5,
    chapterName: 'Matrices',
    originalConceptName: 'Types of Matrices, Scalar & Matrix Multiplication',
    whatIsIt: 'A matrix is a rectangular array of numbers. Types include Row, Column, Square, Diagonal, Identity, and Zero matrices. Matrix multiplication AB multiplies rows of A by columns of B.',
    example: 'A row vector [1, 2] times column vector [[3], [4]] yields a single scalar [1×3 + 2×4] = [11].',
    formula: 'Order of product: (m × p) × (p × n) = (m × n) · (AB)ᵀ = Bᵀ Aᵀ · AB ≠ BA in general',
    rememberTip: 'Matrix multiplication AB is possible ONLY when number of columns in A equals number of rows in B!',
    resources: [
      {
        type: 'website',
        title: 'Matrix Operations & Properties',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/precalculus/x9e81a4f98381613:matrices',
        description: 'Row-by-column multiplication rules'
      },
      {
        type: 'youtube',
        title: 'Matrices Full Chapter Concept Maths 1A',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Matrices+Maths+1A+Telangana+Intermediate',
        description: 'Matrix types, transpose, and multiplication'
      }
    ],
    stickyColor: 'yellow',
    rotation: '-rotate-0.5'
  },
  {
    id: 'ia_ch5_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 5,
    chapterName: 'Matrices',
    originalConceptName: 'Determinants, Minors & Cofactors',
    whatIsIt: 'Determinant is a scalar value associated with a square matrix. Minor M_ij is the sub-determinant after deleting row i and column j. Cofactor C_ij attaches the checkerboard sign (-1)^(i+j).',
    example: 'For 2×2 matrix [[2, 3], [1, 4]], determinant is 2(4) - 3(1) = 5.',
    formula: '2×2 Det: ad - bc · C_ij = (-1)^(i+j) M_ij · det(kA) = kⁿ det(A) for n×n matrix',
    rememberTip: 'If any two rows or columns of a determinant are identical or proportional, its determinant value is ZERO!',
    resources: [
      {
        type: 'website',
        title: 'Determinants, Minors and Cofactors',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/determinants/',
        description: 'Sarrus rule and 3x3 expansion methods'
      },
      {
        type: 'youtube',
        title: 'Determinants Expansion & 7 Marks LAQs',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Determinants+Maths+1A+Telangana+Intermediate',
        description: 'Properties of determinants and identity proofs'
      }
    ],
    stickyColor: 'lavender',
    rotation: 'rotate-1'
  },
  {
    id: 'ia_ch5_03',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 5,
    chapterName: 'Matrices',
    originalConceptName: 'Adjoint, Matrix Inverse & Rank of a Matrix',
    whatIsIt: 'Adjoint Adj(A) is the transpose of the cofactor matrix. Inverse A⁻¹ exists if det(A) ≠ 0. Rank is the maximum number of linearly independent rows or non-zero rows in row echelon form.',
    example: 'For [[2, 1], [5, 3]], det = 1. Adj = [[3, -1], [-5, 2]]. Inverse A⁻¹ = [[3, -1], [-5, 2]].',
    formula: 'A⁻¹ = [1 / det(A)] · Adj(A) · A · Adj(A) = det(A) I · (AB)⁻¹ = B⁻¹ A⁻¹',
    rememberTip: 'A singular matrix has det(A) = 0 and has NO inverse!',
    resources: [
      {
        type: 'website',
        title: 'Adjoint, Inverse & Rank of Matrix',
        sourceName: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/inverse-of-a-matrix/',
        description: 'Inverse calculation and row echelon rank determination'
      },
      {
        type: 'youtube',
        title: 'Adjoint, Inverse & Rank of Matrix Maths 1A',
        sourceName: 'Unacademy Telugu',
        url: 'https://www.youtube.com/results?search_query=Adjoint+and+Inverse+of+a+matrix+Maths+1A',
        description: 'Finding matrix inverse and rank determination'
      }
    ],
    stickyColor: 'mint',
    rotation: '-rotate-1'
  },
  {
    id: 'ia_ch5_04',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 5,
    chapterName: 'Matrices',
    originalConceptName: 'Solutions of Linear Equations (Cramer, Inversion & Gauss-Jordan)',
    whatIsIt: 'Methods to solve linear system AX = B. Cramer\'s rule uses determinants. Matrix Inversion computes X = A⁻¹B. Gauss-Jordan uses elementary row operations to reduce augmented matrix [A|B].',
    example: 'System with 3 equations has a unique solution if det(A) ≠ 0.',
    formula: 'Cramer: x = Δ_x/Δ, y = Δ_y/Δ, z = Δ_z/Δ · Unique: Rank(A) = Rank([A|B]) = n',
    rememberTip: 'If Rank(A) = Rank([A|B]) < n, the system is consistent with INFINITELY many solutions!',
    resources: [
      {
        type: 'website',
        title: 'Solving Linear Systems by Matrix Methods',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/cramers-rule/',
        description: 'Cramer\'s rule, Matrix Inversion, and consistency rules'
      },
      {
        type: 'youtube',
        title: 'Matrix Inversion Method & Cramer Rule 7 Marks',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Matrix+Inversion+Method+Cramer+Rule+Gauss+Jordan+Maths+1A',
        description: 'Guaranteed 7-mark board exam problem-solving walkthrough'
      }
    ],
    stickyColor: 'peach',
    rotation: 'rotate-0.5'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 6: ADDITION OF VECTORS
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch6_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 6,
    chapterName: 'Addition of Vectors',
    originalConceptName: 'Vector Triads, Addition & Scalar Multiplication',
    whatIsIt: 'A 3D vector is a triad of real numbers (x, y, z) representing magnitude and direction. Vector addition connects head to tail. Scalar multiplication rescales length.',
    example: 'Vector r̄ = 3î + 4ĵ has magnitude √(3² + 4²) = 5. Unit vector is 0.6î + 0.8ĵ.',
    formula: 'r̄ = xî + yĵ + zk̂ · Magnitude |r̄| = √(x² + y² + z²) · Unit vector r̂ = r̄ / |r̄|',
    rememberTip: 'A unit vector always has magnitude equal to 1! Divide any vector by its length to get its unit vector.',
    resources: [
      {
        type: 'website',
        title: 'Vector Addition & Unit Vectors',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/vectors',
        description: 'Vector components and triangle law'
      },
      {
        type: 'youtube',
        title: 'Addition of Vectors Chapter Summary Maths 1A',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Addition+of+vectors+Maths+1A+Telangana+Intermediate',
        description: 'Position vectors, section formula and collinearity'
      }
    ],
    stickyColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'ia_ch6_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 6,
    chapterName: 'Addition of Vectors',
    originalConceptName: 'Linear Combinations & Vector Equations of Line & Plane',
    whatIsIt: 'Vector r̄ is a linear combination of ā, b̄ if r̄ = x ā + y b̄. Vector equation of a line through point ā parallel to b̄ is r̄ = ā + t b̄. Equation of a plane through ā containing b̄, c̄ is r̄ = ā + s b̄ + t c̄.',
    example: 'Line passing through origin parallel to 2î + ĵ + 3k̂ has equation r̄ = t(2î + ĵ + 3k̂).',
    formula: 'Line: r̄ = ā + t b̄ · Plane: r̄ = ā + s b̄ + t c̄ · Section: r̄ = (m b̄ + n ā)/(m + n)',
    rememberTip: 'Vector equation of a line requires 1 point position vector + 1 parallel direction vector!',
    resources: [
      {
        type: 'website',
        title: 'Vector Equations of Lines and Planes',
        sourceName: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/vector-equation-of-a-line/',
        description: 'Vector and Cartesian line/plane equations'
      },
      {
        type: 'youtube',
        title: 'Vector Equation of Line and Plane Maths 1A',
        sourceName: 'Unacademy Telugu',
        url: 'https://www.youtube.com/results?search_query=Vector+equations+of+line+and+plane+Maths+1A',
        description: 'Collinearity, coplanarity and vector plane equations'
      }
    ],
    stickyColor: 'mint',
    rotation: 'rotate-1'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 7: PRODUCT OF VECTORS
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch7_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 7,
    chapterName: 'Product of Vectors',
    originalConceptName: 'Scalar (Dot) Product & Orthogonal Projections',
    whatIsIt: 'Dot product ā · b̄ gives a scalar number equal to magnitudes multiplied by cosine of the angle between them. Projection of ā on b̄ is (ā · b̄) / |b̄|.',
    example: 'î · î = 1, while î · ĵ = 0 because perpendicular unit vectors have zero dot product.',
    formula: 'ā · b̄ = |ā||b̄| cos θ = a₁b₁ + a₂b₂ + a₃b₃ · Projection of ā on b̄ = (ā · b̄) / |b̄|',
    rememberTip: 'If two non-zero vectors are perpendicular (90°), their dot product is ALWAYS 0!',
    resources: [
      {
        type: 'website',
        title: 'Dot Product & Projections Guide',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/dot-cross-products',
        description: 'Geometric projection and angle calculation'
      },
      {
        type: 'youtube',
        title: 'Scalar Product of Vectors Maths 1A',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Scalar+product+of+vectors+Maths+1A+Telangana',
        description: 'Dot product properties and orthogonal projections'
      }
    ],
    stickyColor: 'peach',
    rotation: '-rotate-1'
  },
  {
    id: 'ia_ch7_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 7,
    chapterName: 'Product of Vectors',
    originalConceptName: 'Vector (Cross) Product & Vector Areas',
    whatIsIt: 'Cross product ā × b̄ produces a new vector perpendicular to both ā and b̄. Its magnitude equals the area of the parallelogram formed by ā and b̄.',
    example: 'î × ĵ = k̂, ĵ × k̂ = î, k̂ × î = ĵ. Parallel vectors have cross product zero vector.',
    formula: 'ā × b̄ = det[î, ĵ, k̂; a₁, a₂, a₃; b₁, b₂, b₃] · Area of Parallelogram = |ā × b̄| · Area Δ = ½|ā × b̄|',
    rememberTip: 'Cross product is anti-commutative: ā × b̄ = -(b̄ × ā)!',
    resources: [
      {
        type: 'website',
        title: 'Vector Product & Parallelogram Area',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/cross-product/',
        description: 'Right hand rule and area computations'
      },
      {
        type: 'youtube',
        title: 'Vector Product & Vector Areas Maths 1A',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Vector+product+and+vector+areas+Maths+1A',
        description: 'Cross product determinant method and triangle areas'
      }
    ],
    stickyColor: 'blue',
    rotation: 'rotate-1'
  },
  {
    id: 'ia_ch7_03',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 7,
    chapterName: 'Product of Vectors',
    originalConceptName: 'Scalar & Vector Triple Products, Skew Lines & Coplanarity',
    whatIsIt: 'Scalar triple product [ā b̄ c̄] = ā · (b̄ × c̄) gives volume of a parallelepiped. Vector triple product follows BAC-CAB rule: ā × (b̄ × c̄) = (ā · c̄)b̄ - (ā · b̄)c̄. Vectors are coplanar if [ā b̄ c̄] = 0.',
    example: 'If 3 vectors lie on the same flat plane, their parallelepiped volume is 0.',
    formula: '[ā b̄ c̄] = det[a₁,a₂,a₃; b₁,b₂,b₃; c₁,c₂,c₃] · Coplanar: [ā b̄ c̄] = 0 · BAC-CAB: ā × (b̄ × c̄) = B(A·C) - C(A·B)',
    rememberTip: 'Remember the BAC-CAB rule: ā × (b̄ × c̄) = B(A·C) - C(A·B)!',
    resources: [
      {
        type: 'website',
        title: 'Scalar and Vector Triple Products',
        sourceName: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/triple-product-of-vectors/',
        description: 'Volume of parallelepiped and BAC-CAB identity'
      },
      {
        type: 'youtube',
        title: 'Product of Vectors 7 Marks LAQ Proofs',
        sourceName: 'Unacademy Telugu',
        url: 'https://www.youtube.com/results?search_query=Product+of+vectors+7+marks+Maths+1A+Telangana',
        description: 'Shortest distance between skew lines and coplanarity proofs'
      }
    ],
    stickyColor: 'lavender',
    rotation: '-rotate-0.5'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 8: TRIGONOMETRIC RATIOS AND TRANSFORMATIONS
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch8_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 8,
    chapterName: 'Trigonometric Ratios and Transformations',
    originalConceptName: 'Trigonometric Ratios, Periodicity & Allied Angles',
    whatIsIt: 'Trigonometric ratios in 4 quadrants follow the ASTC rule (All-Silver-Tea-Cups). Periodicity: sin(x+2π) = sin x (period 2π), tan(x+π) = tan x (period π).',
    example: 'sin(150°) = sin(180° - 30°) = sin 30° = 1/2.',
    formula: 'sin(-θ) = -sin θ · cos(-θ) = cos θ · sin(90°-θ) = cos θ · Periods: sin/cos = 2π, tan = π',
    rememberTip: 'ASTC Rule: Quadrant 1 All positive, Q2 Sine positive, Q3 Tan positive, Q4 Cosine positive!',
    resources: [
      {
        type: 'website',
        title: 'Trigonometric Ratios & Allied Angles',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/trigonometry',
        description: 'Unit circle definition and quadrant signs'
      },
      {
        type: 'youtube',
        title: 'Trigonometric Ratios & Periodicity Maths 1A',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Trigonometric+ratios+and+transformations+Maths+1A',
        description: 'Periodicity, extreme values, and quadrant rules'
      }
    ],
    stickyColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'ia_ch8_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 8,
    chapterName: 'Trigonometric Ratios and Transformations',
    originalConceptName: 'Compound Angles, Multiple Angles & Transformation Identities',
    whatIsIt: 'Identities that expand trig functions of angle sums (A ± B), double angles (2A), half angles (A/2), and turn sums into products (and vice versa).',
    example: 'cos(60°) = cos(2 × 30°) = 1 - 2 sin²(30°) = 1 - 2(1/4) = 1/2.',
    formula: 'sin(A±B) = sinA cosB ± cosA sinB · cos(A±B) = cosA cosB ∓ sinA sinB · sin C + sin D = 2 sin[(C+D)/2] cos[(C-D)/2]',
    rememberTip: 'cos(A + B) uses a MINUS sign: cos A cos B - sin A sin B!',
    resources: [
      {
        type: 'website',
        title: 'Trigonometric Transformation Formulas',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/trigonometry-formulas/',
        description: 'Compound angle and sum-to-product table'
      },
      {
        type: 'youtube',
        title: 'Trigonometry Transformations 7 Marks Important Questions',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Trigonometry+Transformations+7+marks+Maths+1A',
        description: 'Standard conditional trigonometric identity proofs'
      }
    ],
    stickyColor: 'lime',
    rotation: 'rotate-1'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 9: TRIGONOMETRIC EQUATIONS
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch9_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 9,
    chapterName: 'Trigonometric Equations',
    originalConceptName: 'General Solutions of Trigonometric Equations',
    whatIsIt: 'Equations containing trigonometric functions of an unknown angle. The general solution expresses infinitely many angle values that satisfy the equation.',
    example: 'sin θ = 1/2. Principal value α = π/6. General solution: θ = nπ + (-1)ⁿ (π/6) for any integer n.',
    formula: 'sin θ = k ⟹ θ = nπ + (-1)ⁿ α · cos θ = k ⟹ θ = 2nπ ± α · tan θ = k ⟹ θ = nπ + α (n ∈ Z)',
    rememberTip: 'Always find principal value α in range [-π/2, π/2] for sine/tan and [0, π] for cosine first!',
    resources: [
      {
        type: 'website',
        title: 'Trigonometric Equations General Solutions',
        sourceName: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/trigonometric-equations/',
        description: 'Principal and general solutions formula reference'
      },
      {
        type: 'youtube',
        title: 'Trigonometric Equations Maths 1A Full Chapter',
        sourceName: 'Unacademy Telugu',
        url: 'https://www.youtube.com/results?search_query=Trigonometric+equations+Maths+1A+Telangana',
        description: 'General solutions for single and quadratic trig equations'
      }
    ],
    stickyColor: 'mint',
    rotation: '-rotate-0.5'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 10: INVERSE TRIGONOMETRIC FUNCTIONS
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch10_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 10,
    chapterName: 'Inverse Trigonometric Functions',
    originalConceptName: 'Bijective Restraints & Principal Value Branches',
    whatIsIt: 'Trigonometric functions are made bijective by restricting their domains to principal value intervals so inverse functions exist.',
    example: 'sin⁻¹(1/2) = π/6. sin⁻¹(-1/2) = -π/6. cos⁻¹(-1/2) = 2π/3.',
    formula: 'sin⁻¹x: domain [-1, 1], range [-π/2, π/2] · cos⁻¹x: domain [-1, 1], range [0, π] · tan⁻¹x: domain R, range (-π/2, π/2)',
    rememberTip: 'cos⁻¹(-x) = π - cos⁻¹x, whereas sin⁻¹(-x) = -sin⁻¹x!',
    resources: [
      {
        type: 'website',
        title: 'Inverse Trigonometric Functions Properties',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/trigonometry/trig-equations-and-identities',
        description: 'Domain, range, and principal value branches'
      },
      {
        type: 'youtube',
        title: 'Inverse Trigonometric Functions Maths 1A',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Inverse+trigonometric+functions+Maths+1A+Telangana',
        description: 'Principal values and standard properties'
      }
    ],
    stickyColor: 'peach',
    rotation: 'rotate-1'
  },
  {
    id: 'ia_ch10_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 10,
    chapterName: 'Inverse Trigonometric Functions',
    originalConceptName: 'Inverse Trigonometric Identities & Addition Formulas',
    whatIsIt: 'Algebraic identities for combining inverse trigonometric functions.',
    example: 'tan⁻¹(1/2) + tan⁻¹(1/3) = tan⁻¹[(1/2 + 1/3)/(1 - 1/6)] = tan⁻¹(1) = π/4.',
    formula: 'sin⁻¹x + cos⁻¹x = π/2 · tan⁻¹x + cot⁻¹x = π/2 · tan⁻¹x + tan⁻¹y = tan⁻¹[(x + y)/(1 - xy)] for xy < 1',
    rememberTip: 'sin⁻¹x + cos⁻¹x = π/2 is valid for all x in [-1, 1]!',
    resources: [
      {
        type: 'website',
        title: 'Inverse Trig Identities & Formulas',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/inverse-trigonometric-functions-properties/',
        description: 'Addition, subtraction, and conversion identities'
      },
      {
        type: 'youtube',
        title: 'Inverse Trigonometry 4 Marks SAQs',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Inverse+trigonometric+functions+4+marks+Maths+1A',
        description: 'Solving inverse trig identity equations'
      }
    ],
    stickyColor: 'lavender',
    rotation: '-rotate-1'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 11: HYPERBOLIC FUNCTIONS
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch11_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 11,
    chapterName: 'Hyperbolic Functions',
    originalConceptName: 'Hyperbolic Definitions, Identities & Inverse Formulas',
    whatIsIt: 'Hyperbolic functions sinh x and cosh x are defined using exponential functions eˣ and e⁻ˣ. Inverse hyperbolic functions are expressed using natural logarithms.',
    example: 'cosh(0) = (e⁰ + e⁰)/2 = 2/2 = 1. sinh(0) = (1 - 1)/2 = 0.',
    formula: 'sinh x = (eˣ - e⁻ˣ)/2 · cosh x = (eˣ + e⁻ˣ)/2 · cosh²x - sinh²x = 1 · sinh⁻¹x = ln(x + √(x² + 1))',
    rememberTip: 'Notice the main hyperbolic identity: cosh²x - sinh²x = 1 (with a MINUS sign, unlike trig sin²x + cos²x = 1)!',
    resources: [
      {
        type: 'website',
        title: 'Hyperbolic Functions Definitions & Identities',
        sourceName: 'BYJU\'S Learning',
        url: 'https://byjus.com/maths/hyperbolic-functions/',
        description: 'Definitions, graphs, addition formulas, and inverses'
      },
      {
        type: 'youtube',
        title: 'Hyperbolic Functions Maths 1A Full Chapter',
        sourceName: 'Unacademy Telugu',
        url: 'https://www.youtube.com/results?search_query=Hyperbolic+functions+Maths+1A+Telangana+Intermediate',
        description: 'Complete 2-mark VSAQ problem walkthroughs'
      }
    ],
    stickyColor: 'yellow',
    rotation: '-rotate-1'
  },

  // -------------------------------------------------------------------------
  // CHAPTER 12: PROPERTIES OF TRIANGLES
  // -------------------------------------------------------------------------
  {
    id: 'ia_ch12_01',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 12,
    chapterName: 'Properties of Triangles',
    originalConceptName: 'Sine Rule, Cosine Rule & Tangent Rule (Napier\'s Analogy)',
    whatIsIt: 'Fundamental geometric relations connecting sides a, b, c and angles A, B, C of any triangle with circumradius R.',
    example: 'In any triangle, side length a = 2R sin A, b = 2R sin B, c = 2R sin C.',
    formula: 'Sine Rule: a / sin A = b / sin B = c / sin C = 2R · Cosine Rule: cos A = (b² + c² - a²)/(2bc) · Tangent: tan[(B-C)/2] = [(b-c)/(b+c)] cot(A/2)',
    rememberTip: 'Sine rule is best when 2 angles and 1 side are given; Cosine rule is best when 2 sides and included angle are given!',
    resources: [
      {
        type: 'website',
        title: 'Properties of Triangles Laws & Formulas',
        sourceName: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/geometry/hs-geo-trig',
        description: 'Sine law, cosine law, and triangle area'
      },
      {
        type: 'youtube',
        title: 'Properties of Triangles Sine & Cosine Rule',
        sourceName: 'Vedantu Telugu',
        url: 'https://www.youtube.com/results?search_query=Properties+of+triangles+Maths+1A+Telangana+Intermediate',
        description: 'Standard 7-mark LAQ identity proofs'
      }
    ],
    stickyColor: 'mint',
    rotation: 'rotate-1'
  },
  {
    id: 'ia_ch12_02',
    stream: 'Intermediate MPC',
    year: '1st Year',
    subject: 'Mathematics IA',
    chapterNumber: 12,
    chapterName: 'Properties of Triangles',
    originalConceptName: 'Projection Rules, Half-Angle Formulas & Incircle/Excircles',
    whatIsIt: 'Projection rule expresses one side as sum of projections of other two sides. Half-angle formulas give sin(A/2) using semi-perimeter s = (a+b+c)/2. Inradius r and ex-radii r₁, r₂, r₃ describe inscribed and escribed circles.',
    example: 'Semi-perimeter s = (a + b + c)/2. Inradius r = Area / s.',
    formula: 'Projection: a = b cos C + c cos B · sin(A/2) = √[(s-b)(s-c)/(bc)] · Area Δ = r s = √[s(s-a)(s-b)(s-c)] · r₁ = Δ / (s - a)',
    rememberTip: 'Ex-radius r₁ has denominator (s - a), r₂ has (s - b), and r₃ has (s - c)!',
    resources: [
      {
        type: 'website',
        title: 'Incircle and Excircles of a Triangle',
        sourceName: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/incircle-and-excircles-of-a-triangle/',
        description: 'Inradius and ex-radii formulas and proofs'
      },
      {
        type: 'youtube',
        title: 'Incircle & Excircles 7 Marks Solved LAQs',
        sourceName: 'Physics Wallah Telugu',
        url: 'https://www.youtube.com/results?search_query=Incircle+and+excircles+Properties+of+triangles+Maths+1A',
        description: 'Guaranteed 7-mark ex-radii proof problems'
      }
    ],
    stickyColor: 'amber',
    rotation: '-rotate-0.5'
  }
];

// =========================================================================
// MIND MAPS FOR ALL 12 MATHEMATICS IA CHAPTERS
// =========================================================================

export const MATH_IA_MIND_MAPS: Record<number, ChapterMindMap> = {
  1: {
    chapterNumber: 1,
    chapterName: 'Sets and Relations',
    centralTheme: 'Sets & Relations Core Connections',
    nodes: [
      {
        title: '1. Set Foundations & Representations',
        description: 'Grouping objects and roster/builder formats',
        subitems: ['Roster Form {a,b}', 'Set-Builder Form {x|P(x)}', 'Empty Set ∅ & Universal Set U', 'Subset Count: 2ⁿ']
      },
      {
        title: '2. Subsets & Real Intervals',
        description: 'Continuous real number intervals and visual regions',
        subitems: ['Closed [a, b] (includes endpoints)', 'Open (a, b) (excludes endpoints)', 'Venn Diagram Overlaps']
      },
      {
        title: '3. Set Operations & De Morgan',
        description: 'Combining and complementing set collections',
        subitems: ['Union (A ∪ B)', 'Intersection (A ∩ B)', 'Difference (A \\ B)', 'De Morgan: (A ∪ B)′ = A′ ∩ B′']
      },
      {
        title: '4. Relations & Equivalence',
        description: 'Ordered pairs and relational properties',
        subitems: ['Cartesian Product A × B', 'Reflexive: aRa', 'Symmetric: aRb ⇒ bRa', 'Transitive: aRb & bRc ⇒ aRc']
      }
    ],
    quickSummary: 'Sets collect unique items; operations combine regions; relations select ordered pairs; Equivalence requires Reflexive + Symmetric + Transitive!'
  },
  2: {
    chapterNumber: 2,
    chapterName: 'Functions',
    centralTheme: 'Function Mapping & Real Analysis',
    nodes: [
      {
        title: '1. Function Types & Mappings',
        description: 'Connecting domain inputs to co-domain outputs',
        subitems: ['One-One (Injective): f(x₁) = f(x₂) ⇒ x₁ = x₂', 'Onto (Surjective): Range = Co-domain', 'Bijection (One-One & Onto)']
      },
      {
        title: '2. Inverse & Composite Functions',
        description: 'Reversing mappings and sequential application',
        subitems: ['Inverse f⁻¹ exists ⟺ f is Bijection', 'Composite (g ∘ f)(x) = g(f(x))', 'f ∘ f⁻¹ = Identity']
      },
      {
        title: '3. Real-Valued Functions',
        description: 'Finding valid real inputs and outputs',
        subitems: ['Domain: valid x inputs', 'Range: possible y outputs', 'Radicals: set inside ≥ 0', 'Fractions: set denominator ≠ 0']
      }
    ],
    quickSummary: 'Functions map domain to co-domain. Inverse requires Bijection. Domain of √(f(x)) needs f(x) ≥ 0, while 1/f(x) needs denominator ≠ 0.'
  },
  3: {
    chapterNumber: 3,
    chapterName: 'Sequences and Series',
    centralTheme: 'Progressions & Means',
    nodes: [
      {
        title: '1. Arithmetic Progression (AP)',
        description: 'Constant common difference sequences',
        subitems: ['n-th term: a_n = a + (n - 1)d', 'Sum: S_n = (n/2)[2a + (n - 1)d]', '3 AP terms: (a - d), a, (a + d)']
      },
      {
        title: '2. Geometric Progression (GP)',
        description: 'Constant common ratio sequences',
        subitems: ['n-th term: a_n = a · r^(n-1)', 'Sum: S_n = a(rⁿ - 1)/(r - 1)', 'Infinite Sum S_∞ = a / (1 - r) for |r| < 1']
      },
      {
        title: '3. Means & AM ≥ GM Inequality',
        description: 'Averages and comparative bounds',
        subitems: ['AM = (a + b) / 2', 'GM = √(ab)', 'Inequality: AM ≥ GM', 'Equality holds iff a = b']
      }
    ],
    quickSummary: 'AP uses common difference d; GP uses ratio r; Infinite GP converges if |r| < 1; AM ≥ GM bounds non-negative numbers.'
  },
  4: {
    chapterNumber: 4,
    chapterName: 'Mathematical Induction',
    centralTheme: 'Inductive Proof Framework',
    nodes: [
      {
        title: '1. Three-Step Proof Framework',
        description: 'Systematic induction steps for all n ∈ N',
        subitems: ['Base Case: Verify P(1)', 'Inductive Hypothesis: Assume P(k) true', 'Inductive Step: Prove P(k+1) true']
      },
      {
        title: '2. Summation Series Theorems',
        description: 'Standard natural number sum proofs',
        subitems: ['∑ n = n(n+1)/2', '∑ n² = n(n+1)(2n+1)/6', '∑ n³ = [n(n+1)/2]²']
      },
      {
        title: '3. Divisibility & Inequalities',
        description: 'Proving multiples and order bounds',
        subitems: ['Factor out P(k) term', 'Write a^(k+1) = a · a^k', 'Inequality step bounds']
      }
    ],
    quickSummary: 'Verify P(1) ➔ Assume P(k) ➔ Prove P(k+1) using P(k). Re-write powers like a^(k+1) = a · a^k for divisibility!'
  },
  5: {
    chapterNumber: 5,
    chapterName: 'Matrices',
    centralTheme: 'Matrix Algebra & Linear Systems',
    nodes: [
      {
        title: '1. Types & Multiplication',
        description: 'Array operations and rules',
        subitems: ['Row, Column, Square, Identity', 'AB requires col(A) = row(B)', 'AB ≠ BA in general', 'Transpose (AB)ᵀ = Bᵀ Aᵀ']
      },
      {
        title: '2. Determinants & Inverse',
        description: 'Scalar determinants and matrix inversion',
        subitems: ['2x2 det: ad - bc', 'Cofactor C_ij = (-1)^(i+j) M_ij', 'A⁻¹ = [1/det(A)] Adj(A)', 'Non-singular: det(A) ≠ 0']
      },
      {
        title: '3. Rank & System Solutions',
        description: 'Solving linear systems AX = B',
        subitems: ['Cramer Rule: x = Δ_x / Δ', 'Matrix Inversion: X = A⁻¹B', 'Gauss-Jordan Row Echelon', 'Unique solution if Rank(A) = n']
      }
    ],
    quickSummary: 'Multiplication needs col(A)=row(B). Inverse requires det(A)≠0. Rank(A)=Rank([A|B])=n ensures a unique system solution.'
  },
  6: {
    chapterNumber: 6,
    chapterName: 'Addition of Vectors',
    centralTheme: '3D Vector Algebra & Geometry',
    nodes: [
      {
        title: '1. Vector Triads & Operations',
        description: '3D components and magnitude',
        subitems: ['r̄ = xî + yĵ + zk̂', 'Magnitude |r̄| = √(x² + y² + z²)', 'Unit Vector r̂ = r̄ / |r̄|', 'Triangle Law AB̄ + BC̄ = AC̄']
      },
      {
        title: '2. Combinations & Section Formula',
        description: 'Linear combinations and internal division',
        subitems: ['Linear Combination r̄ = x ā + y b̄', 'Section Formula r̄ = (m b̄ + n ā)/(m + n)', 'Midpoint (ā + b̄)/2']
      },
      {
        title: '3. Line & Plane Equations',
        description: 'Vector representation of space objects',
        subitems: ['Line through ā parallel to b̄: r̄ = ā + t b̄', 'Plane containing b̄, c̄: r̄ = ā + s b̄ + t c̄']
      }
    ],
    quickSummary: 'Vectors combine magnitudes and directions in 3D space. Line equation r̄ = ā + t b̄ needs a point vector ā and parallel direction b̄.'
  },
  7: {
    chapterNumber: 7,
    chapterName: 'Product of Vectors',
    centralTheme: 'Dot, Cross & Triple Vector Products',
    nodes: [
      {
        title: '1. Dot Product (Scalar)',
        description: 'Magnitude product times cosine',
        subitems: ['ā · b̄ = |ā||b̄| cos θ', 'Orthogonal: ā · b̄ = 0', 'Projection of ā on b̄ = (ā · b̄)/|b̄|']
      },
      {
        title: '2. Cross Product (Vector)',
        description: 'Perpendicular vector product',
        subitems: ['ā × b̄ = |ā||b̄| sin θ n̂', 'Determinant Expansion Method', 'Parallelogram Area = |ā × b̄|', 'Anti-commutative: ā × b̄ = -(b̄ × ā)']
      },
      {
        title: '3. Triple Products & Coplanarity',
        description: 'Volumes, BAC-CAB rule, and skew lines',
        subitems: ['Scalar Triple [ā b̄ c̄] = det(A,B,C)', 'Volume of Parallelepiped = |[ā b̄ c̄]|', 'Coplanar iff [ā b̄ c̄] = 0', 'BAC-CAB: ā × (b̄ × c̄) = B(A·C) - C(A·B)']
      }
    ],
    quickSummary: 'Dot product is scalar (0 if 90°); Cross product is vector (0 if parallel); [ā b̄ c̄] = 0 means 3 vectors are Coplanar!'
  },
  8: {
    chapterNumber: 8,
    chapterName: 'Trigonometric Ratios and Transformations',
    centralTheme: 'Trigonometric Identities & Transformations',
    nodes: [
      {
        title: '1. Quadrant Rules & Periods',
        description: 'ASTC rule and repeating angle cycles',
        subitems: ['ASTC Rule (All-Silver-Tea-Cups)', 'Periods: sin/cos = 2π, tan = π', 'Allied angles: sin(180°-θ) = sin θ']
      },
      {
        title: '2. Compound & Multiple Angles',
        description: 'Expanding sum and double angles',
        subitems: ['sin(A±B) = sinA cosB ± cosA sinB', 'cos(A±B) = cosA cosB ∓ sinA sinB', 'sin 2A = 2 sin A cos A', 'cos 2A = 1 - 2 sin²A']
      },
      {
        title: '3. Sum to Product Transformations',
        description: 'Converting sums into factorized products',
        subitems: ['sin C + sin D = 2 sin[(C+D)/2] cos[(C-D)/2]', 'cos C + cos D = 2 cos[(C+D)/2] cos[(C-D)/2]']
      }
    ],
    quickSummary: 'ASTC gives quadrant signs. cos(A+B) flips to minus! Transformation formulas turn trigonometric sums into factorized products.'
  },
  9: {
    chapterNumber: 9,
    chapterName: 'Trigonometric Equations',
    centralTheme: 'General Solutions of Trig Equations',
    nodes: [
      {
        title: '1. Principal Values',
        description: 'Finding the fundamental angle α',
        subitems: ['Sine principal range: [-π/2, π/2]', 'Cosine principal range: [0, π]', 'Tan principal range: (-π/2, π/2)']
      },
      {
        title: '2. General Solution Formulas',
        description: 'Expressing all infinite angle solutions',
        subitems: ['sin θ = k ⇒ θ = nπ + (-1)ⁿ α', 'cos θ = k ⇒ θ = 2nπ ± α', 'tan θ = k ⇒ θ = nπ + α (n ∈ Z)']
      }
    ],
    quickSummary: 'Find principal value α first, then apply general formula: nπ + (-1)ⁿ α for sine, 2nπ ± α for cosine, nπ + α for tan!'
  },
  10: {
    chapterNumber: 10,
    chapterName: 'Inverse Trigonometric Functions',
    centralTheme: 'Inverse Trig Domains & Identities',
    nodes: [
      {
        title: '1. Bijective Restraints & Branches',
        description: 'Restricting domains for valid inverses',
        subitems: ['sin⁻¹x: domain [-1, 1], range [-π/2, π/2]', 'cos⁻¹x: domain [-1, 1], range [0, π]', 'tan⁻¹x: domain R, range (-π/2, π/2)']
      },
      {
        title: '2. Core Inverse Identities',
        description: 'Complementary and addition properties',
        subitems: ['sin⁻¹x + cos⁻¹x = π/2', 'tan⁻¹x + cot⁻¹x = π/2', 'cos⁻¹(-x) = π - cos⁻¹x', 'tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)]']
      }
    ],
    quickSummary: 'sin⁻¹x + cos⁻¹x = π/2. cos⁻¹(-x) equals π - cos⁻¹x, whereas sin⁻¹(-x) equals -sin⁻¹x!'
  },
  11: {
    chapterNumber: 11,
    chapterName: 'Hyperbolic Functions',
    centralTheme: 'Hyperbolic Definitions & Inverses',
    nodes: [
      {
        title: '1. Exponential Definitions',
        description: 'Defining hyperbolic functions with eˣ',
        subitems: ['sinh x = (eˣ - e⁻ˣ) / 2', 'cosh x = (eˣ + e⁻ˣ) / 2', 'tanh x = sinh x / cosh x']
      },
      {
        title: '2. Hyperbolic Identities & Inverses',
        description: 'Pythagorean analog and logarithmic inverses',
        subitems: ['cosh²x - sinh²x = 1', 'sinh 2x = 2 sinh x cosh x', 'sinh⁻¹x = ln(x + √(x² + 1))']
      }
    ],
    quickSummary: 'Hyperbolic functions use eˣ and e⁻ˣ. Main identity is cosh²x - sinh²x = 1 (with minus sign!). Inverse is sinh⁻¹x = ln(x + √(x² + 1)).'
  },
  12: {
    chapterNumber: 12,
    chapterName: 'Properties of Triangles',
    centralTheme: 'Triangle Geometry, Rules & Circles',
    nodes: [
      {
        title: '1. Fundamental Triangle Rules',
        description: 'Connecting side lengths a, b, c with angles A, B, C',
        subitems: ['Sine Rule: a / sin A = b / sin B = c / sin C = 2R', 'Cosine Rule: cos A = (b² + c² - a²) / (2bc)', 'Tangent Rule: tan[(B-C)/2] = [(b-c)/(b+c)] cot(A/2)']
      },
      {
        title: '2. Projection & Half-Angle Rules',
        description: 'Side projections and semi-perimeter s',
        subitems: ['Projection: a = b cos C + c cos B', 'sin(A/2) = √[(s-b)(s-c)/(bc)]', 's = (a + b + c) / 2']
      },
      {
        title: '3. Area & Incircle/Excircles',
        description: 'Inradius r and ex-radii r₁, r₂, r₃',
        subitems: ['Area Δ = r s = √[s(s-a)(s-b)(s-c)]', 'Ex-radius r₁ = Δ / (s - a)', 'Ex-radius r₂ = Δ / (s - b)', 'Ex-radius r₃ = Δ / (s - c)']
      }
    ],
    quickSummary: 'Sine rule a/sinA = 2R links sides to circumradius R; Area Δ = r·s; Ex-radius r₁ = Δ/(s-a).'
  }
};

// Combine all notes
export const OFFICIAL_TGBIE_MATH_NOTES: MathStickyNote[] = [
  ...MATH_IA_STICKY_NOTES
];

export const TGBIE_SUBJECTS_METADATA = {
  'Intermediate MPC': {
    '1st Year': ['Mathematics IA', 'Mathematics IB', 'Physics', 'Chemistry'],
    '2nd Year': ['Mathematics IIA', 'Mathematics IIB', 'Physics', 'Chemistry']
  },
  'Intermediate BiPC': {
    '1st Year': ['Botany', 'Zoology', 'Physics', 'Chemistry'],
    '2nd Year': ['Botany', 'Zoology', 'Physics', 'Chemistry']
  }
};

// Backward-compatible alias
export const MATHEMATICS_STICKY_NOTES = OFFICIAL_TGBIE_MATH_NOTES;
