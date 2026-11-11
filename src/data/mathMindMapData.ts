import { MPC_LEARNING_HUB_DATA } from './mpcLearningHubData';

/**
 * Official Telangana Board of Intermediate Education (TGBIE) Curriculum
 * Reference Portal: https://tgbie.cgg.gov.in
 * Academic Year: 2026–27
 * 
 * Comprehensive Mind Maps Dataset for all MPC Subjects & Chapters:
 * - Mathematics IA: Chapters 1–12
 * - Mathematics IB: Chapters 1–10
 * - Physics: Chapters 1–14
 * - Chemistry: Chapters 1–10
 */

export interface MindMapBranch {
  id: string;
  title: string;
  iconName: string;
  colorTheme: 'amber' | 'emerald' | 'sky' | 'purple' | 'rose' | 'indigo' | 'teal' | 'coral';
  whatDoesItMean: string;
  keyPoints: string[];
  formula?: string;
  example?: string;
  realLifeApp?: string;
  // Extended official Telangana textbook fields
  exactDefinition?: string;
  symbolMeanings?: string[];
  textbookExamples?: {
    problem: string;
    solutionSteps: string[];
  }[];
  commonMistakes?: string[];
  practiceQuestions?: {
    question: string;
    answer: string;
    explanation: string;
  }[];
}

export interface ConceptMindMapData {
  id: string;
  chapterNumber: number;
  chapterName: string;
  subject: 'Mathematics IA' | 'Mathematics IB' | 'Physics' | 'Chemistry';
  conceptHeading: string;
  tagline: string;
  centralIcon: string;
  summary: string;
  branches: MindMapBranch[];
}

export const ALL_SUBJECT_MIND_MAPS: Record<string, Record<number, ConceptMindMapData>> = {
  // =========================================================================
  // MATHEMATICS IA
  // =========================================================================
  math_1a: {
    // CHAPTER 1: SETS AND RELATIONS
    1: {
      id: 'math1a_ch1_mindmap',
      chapterNumber: 1,
      chapterName: 'Sets and Relations',
      subject: 'Mathematics IA',
      conceptHeading: 'Sets, Operations & Equivalence Relations',
      tagline: 'Fundamental Set Theory, Venn Diagrams & Relational Algebra',
      centralIcon: 'Layers',
      summary: 'A set is a well-defined collection of distinct objects. Covers representations, set types, subsets, union/intersection, complements, and real-life applications.',
      branches: [
        {
          id: 'ch1_b1',
          title: 'Meaning of Sets',
          iconName: 'BookOpen',
          colorTheme: 'amber',
          whatDoesItMean: 'A set is a well-defined collection of distinct, unique objects. "Well-defined" means anyone can clearly determine whether any given item belongs to the set or not.',
          exactDefinition: 'A set is a collection of well-defined distinct objects. The objects belonging to a set are called its elements.',
          symbolMeanings: [
            'Capital letters (A, B, C) = Sets',
            'Lowercase letters (a, b, c) = Elements',
            'n(A) = Cardinality (number of unique elements)'
          ],
          keyPoints: [
            'Objects inside a set are called elements or members.',
            'Order of elements does not matter: {1, 2} is identical to {2, 1}.',
            'Duplicate items are never repeated inside a set.',
            'Subjective descriptions like "good books" are NOT sets.'
          ],
          formula: 'Element Belonging: x ∈ A · Non-Belonging: x ∉ A',
          example: 'A = {2, 3, 5, 7} is the set of prime numbers less than 10.',
          realLifeApp: 'Organizing books by subject in a library, or unique registered student IDs.'
        },
        {
          id: 'ch1_b2',
          title: 'Elements of a Set',
          iconName: 'Hash',
          colorTheme: 'emerald',
          whatDoesItMean: 'Individual items that make up a set are called its elements or members. Cardinality tells us how many elements it contains.',
          exactDefinition: 'If x is an object in set A, we write x ∈ A (x belongs to A). Otherwise, x ∉ A.',
          keyPoints: [
            'The symbol ∈ means "belongs to" or "is an element of".',
            'Cardinal number n(A) counts the total unique elements.',
            'Finite sets have countable elements; infinite sets do not.'
          ],
          formula: 'Cardinality n(A) = Total count of unique elements in A',
          example: 'If V = {a, e, i, o, u}, then e ∈ V, b ∉ V, and n(V) = 5.',
          realLifeApp: 'Unique items stored in an online shopping cart.'
        },
        {
          id: 'ch1_b3',
          title: 'Representation of Sets',
          iconName: 'Grid',
          colorTheme: 'sky',
          whatDoesItMean: 'Sets can be written in Roster Form (explicit listing) or Set-Builder Form (stating a defining property).',
          exactDefinition: 'Roster Form lists all elements separated by commas in braces. Set-Builder Form expresses elements via a characteristic condition P(x).',
          keyPoints: [
            'Roster Form: V = {a, e, i, o, u}.',
            'Set-Builder Form: V = {x | x is an English vowel}.',
            'Closed Interval [a, b]: Includes both endpoints.',
            'Open Interval (a, b): Excludes both endpoints.'
          ],
          formula: 'Closed [a, b] = {x ∈ R | a ≤ x ≤ b} · Open (a, b) = {x ∈ R | a < x < b}',
          example: 'Set of even digits: Roster = {0, 2, 4, 6, 8}.',
          realLifeApp: 'Defining safe operating voltage ranges [220V, 240V].'
        },
        {
          id: 'ch1_b4',
          title: 'Subsets & Power Sets',
          iconName: 'Layers',
          colorTheme: 'purple',
          whatDoesItMean: 'Set A is a subset of B if every element in A is also inside B. The Power Set P(A) contains all possible subsets.',
          exactDefinition: 'A ⊆ B ⟺ (∀ x ∈ A ⟹ x ∈ B). The collection of all subsets of A is called the Power Set P(A).',
          keyPoints: [
            'Empty set ∅ is a subset of every set.',
            'Every set is a subset of itself (A ⊆ A).',
            'Total number of subsets for a set with n elements is 2ⁿ.',
            'Number of non-empty proper subsets is 2ⁿ - 1.'
          ],
          formula: 'Total Subsets of A = 2ⁿ · Power Set P(A) size = 2ⁿ',
          example: 'If A = {1, 2}, P(A) = {∅, {1}, {2}, {1, 2}} with 2² = 4 subsets.',
          realLifeApp: 'Computing all possible combo toppings for a customized pizza.'
        },
        {
          id: 'ch1_b5',
          title: 'Set Operations',
          iconName: 'Combine',
          colorTheme: 'rose',
          whatDoesItMean: 'Union (A ∪ B) combines elements from both sets. Intersection (A ∩ B) picks elements common to both sets.',
          exactDefinition: 'A ∪ B = {x | x ∈ A or x ∈ B}. A ∩ B = {x | x ∈ A and x ∈ B}. Complement A′ = U - A.',
          keyPoints: [
            'Disjoint Sets: A ∩ B = ∅ (no shared elements).',
            'Difference A - B: Elements in A that are NOT in B.',
            'Cardinality Theorem: n(A ∪ B) = n(A) + n(B) - n(A ∩ B).'
          ],
          formula: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)',
          example: 'If A = {1, 2, 3} and B = {3, 4, 5}, A ∪ B = {1, 2, 3, 4, 5} and A ∩ B = {3}.',
          realLifeApp: 'Finding mutual friends between two social media profiles.'
        },
        {
          id: 'ch1_b6',
          title: 'Relations & Equivalence',
          iconName: 'PieChart',
          colorTheme: 'indigo',
          whatDoesItMean: 'A relation R from A to B is a subset of Cartesian product A × B. An Equivalence relation is reflexive, symmetric, and transitive.',
          exactDefinition: 'A relation R on set A is an Equivalence Relation if it is Reflexive (aRa), Symmetric (aRb ⟹ bRa), and Transitive (aRb ∧ bRc ⟹ aRc).',
          keyPoints: [
            'Cartesian Product A × B = {(a, b) | a ∈ A, b ∈ B}.',
            'Total relations from A to B with cardinalities m and n is 2^(mn).',
            'Reflexive: (a, a) ∈ R for all a ∈ A.',
            'Symmetric: (a, b) ∈ R ⟹ (b, a) ∈ R.',
            'Transitive: (a, b) ∈ R and (b, c) ∈ R ⟹ (a, c) ∈ R.'
          ],
          formula: 'A × B size = m × n · Total Relations = 2^(mn)',
          example: 'Congruence modulo m on integers is an equivalence relation.',
          realLifeApp: 'Database primary-foreign key relationships linking customer orders.'
        }
      ]
    },

    // CHAPTER 2: FUNCTIONS
    2: {
      id: 'math1a_ch2_mindmap',
      chapterNumber: 2,
      chapterName: 'Functions',
      subject: 'Mathematics IA',
      conceptHeading: 'Mappings, Domain, Range & Bijections',
      tagline: 'Types of Functions, Composition (g ∘ f), Inverse & Real Domains',
      centralIcon: 'Zap',
      summary: 'A function f: A ➔ B assigns every element in domain A to exactly one image in co-domain B. Covers One-One, Onto, Bijective functions, Composition, and Inverses.',
      branches: [
        {
          id: 'ch2_b1',
          title: 'Definition of Function & Mapping',
          iconName: 'BookOpen',
          colorTheme: 'sky',
          whatDoesItMean: 'A function f from set A to set B is a relation that associates every element of A with a unique element of B.',
          exactDefinition: 'Let A and B be non-empty sets. A relation f from A to B is called a function if for every x ∈ A, there exists a unique y ∈ B such that (x, y) ∈ f.',
          symbolMeanings: [
            'A = Domain',
            'B = Co-domain',
            'f(A) = Range (Set of all actual output images)'
          ],
          keyPoints: [
            'Every domain element MUST have an image.',
            'No domain element can have more than one image.',
            'Range f(A) is always a subset of Co-domain B (Range ⊆ Co-domain).'
          ],
          formula: 'f: A ➔ B  ·  y = f(x)  ·  Range(f) = {f(x) | x ∈ A} ⊆ B',
          example: 'f(x) = x² maps x = 3 to y = 9.',
          realLifeApp: 'Vending machine mapping button code to unique drink item.'
        },
        {
          id: 'ch2_b2',
          title: 'One-One (Injective) Functions',
          iconName: 'Hash',
          colorTheme: 'emerald',
          whatDoesItMean: 'Distinct domain elements produce distinct images. No two different inputs share the same output value.',
          exactDefinition: 'Function f: A ➔ B is One-One (Injective) if f(x₁) = f(x₂) ⟹ x₁ = x₂ for all x₁, x₂ ∈ A.',
          keyPoints: [
            'Horizontal Line Test: Any horizontal line intersects graph at most once.',
            'If f is strictly increasing or strictly decreasing, it is One-One.',
            'Number of One-One functions from set with m elements to set with n elements is ⁿP_m (n ≥ m).'
          ],
          formula: 'f(x₁) = f(x₂) ⟹ x₁ = x₂',
          example: 'f(x) = 2x + 3 is One-One on real numbers R.',
          realLifeApp: 'Assigning a unique Aadhaar / SSN identification number to every citizen.'
        },
        {
          id: 'ch2_b3',
          title: 'Onto (Surjective) & Bijective',
          iconName: 'Layers',
          colorTheme: 'purple',
          whatDoesItMean: 'Onto means every element in co-domain B is an image of at least one domain element. A Bijection is both One-One and Onto.',
          exactDefinition: 'Function f: A ➔ B is Onto (Surjective) if Range(f) = B. A function is Bijective if it is both Injective and Surjective.',
          keyPoints: [
            'Onto Condition: Range of f = Co-domain B.',
            'Bijective Function: Both One-One and Onto.',
            'A function has a valid Inverse f⁻¹ if and only if it is a Bijection!'
          ],
          formula: 'Onto: Range(f) = B · Bijection = One-One ∧ Onto',
          example: 'f(x) = x³ from R to R is Bijective (both one-one and onto).',
          realLifeApp: 'Stadium seating where every seat is occupied by exactly one ticket holder.'
        },
        {
          id: 'ch2_b4',
          title: 'Composite & Inverse Functions',
          iconName: 'Combine',
          colorTheme: 'amber',
          whatDoesItMean: 'Composite (g ∘ f)(x) applies f first and then g. Inverse f⁻¹(y) reverses the direction of mapping f.',
          exactDefinition: 'Let f: A ➔ B and g: B ➔ C. Composite (g ∘ f): A ➔ C is defined by (g ∘ f)(x) = g(f(x)).',
          keyPoints: [
            '(g ∘ f)(x) = g(f(x)) is valid only when Range(f) ⊆ Domain(g).',
            'Composition is associative: (h ∘ g) ∘ f = h ∘ (g ∘ f).',
            'Composition is generally NOT commutative: (g ∘ f) ≠ (f ∘ g).',
            '(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹ (Reversal Law).'
          ],
          formula: '(g ∘ f)(x) = g(f(x)) · f⁻¹(y) = x ⟺ f(x) = y · (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹',
          example: 'If f(x) = x + 2 and g(x) = x², then (g ∘ f)(3) = g(5) = 25.',
          realLifeApp: 'Encrypting data with function f and decrypting it with inverse f⁻¹.'
        },
        {
          id: 'ch2_b5',
          title: 'Real-Valued Domain Rules',
          iconName: 'ShieldCheck',
          colorTheme: 'rose',
          whatDoesItMean: 'For real-valued functions f: R ➔ R, the domain is the set of real numbers for which f(x) yields a finite real value.',
          exactDefinition: 'The domain of a real function f(x) is the set of all real numbers x for which f(x) is defined and real.',
          keyPoints: [
            'Square Root Rule √(g(x)): Require g(x) ≥ 0.',
            'Fraction Rule 1/g(x): Require denominator g(x) ≠ 0.',
            'Logarithm Rule log_a(g(x)): Require g(x) > 0.',
            'Inverse Sine/Cos sin⁻¹(g(x)): Require -1 ≤ g(x) ≤ 1.'
          ],
          formula: 'Domain of √(A): A ≥ 0 · Domain of 1/A: A ≠ 0 · Domain of sin⁻¹(A): -1 ≤ A ≤ 1',
          example: 'f(x) = 1/√(x - 3) has domain x - 3 > 0 ⟹ x ∈ (3, ∞).',
          realLifeApp: 'Calculating safe operating temperature limits for jet turbines.'
        }
      ]
    },

    // CHAPTER 3: SEQUENCES AND SERIES
    3: {
      id: 'math1a_ch3_mindmap',
      chapterNumber: 3,
      chapterName: 'Sequences and Series',
      subject: 'Mathematics IA',
      conceptHeading: 'Section 3.3: Arithmetic Progression (A.P.) Concept Notes',
      tagline: 'Definition, General Term a_n, Series Sum S_n, Selection of Terms & Insertion of n A.Ms',
      centralIcon: 'Hash',
      summary: 'Official Telangana Board 2026–27 Section 3.3 Syllabus: Arithmetic Progression (A.P.) covers definition, common difference d, n-th term formula a_n, sum formula S_n, term selection, arithmetic means (A.M.), and real-world applications.',
      branches: [
        {
          id: 'ch3_b1',
          title: '3.3.1 Definition & Common Difference (d)',
          iconName: 'BookOpen',
          colorTheme: 'amber',
          whatDoesItMean: 'An Arithmetic Progression (A.P.) is a sequence in which each term after the first is obtained by adding a fixed constant d to the preceding term.',
          exactDefinition: 'A sequence a₁, a₂, a₃, ..., a_n is an Arithmetic Progression (A.P.) if a_{k+1} - a_k = d (constant) for all k ≥ 1.',
          symbolMeanings: [
            'a = First term',
            'd = Common difference = a₂ - a₁',
            'n = Position number of term'
          ],
          keyPoints: [
            'Standard form: a, a + d, a + 2d, a + 3d, ...',
            'If d > 0, the A.P. is strictly increasing.',
            'If d < 0, the A.P. is strictly decreasing.',
            'If d = 0, the sequence is constant.'
          ],
          formula: 'd = a_{k+1} - a_k  ·  Standard Form: a, a + d, a + 2d, a + 3d, ...',
          example: 'Sequence 2, 7, 12, 17... has a = 2 and common difference d = 5.',
          realLifeApp: 'Taxi fare calculation with a fixed base fare plus rate per kilometer.'
        },
        {
          id: 'ch3_b2',
          title: '3.3.2 General Term (n-th Term) a_n',
          iconName: 'Hash',
          colorTheme: 'emerald',
          whatDoesItMean: 'The general term formula computes any n-th term directly without writing all preceding terms.',
          exactDefinition: 'In an A.P. with first term a and common difference d, the n-th term from the beginning is a_n = a + (n - 1)d.',
          keyPoints: [
            't₁ = a, t₂ = a + d, t₃ = a + 2d, t_n = a + (n - 1)d.',
            'If l is the last term of n terms, l = a + (n - 1)d.',
            'm-th term from the end is l - (m - 1)d.'
          ],
          formula: 'a_n = a + (n - 1)d  ·  m-th term from end = l - (m - 1)d',
          example: 'In A.P. 3, 8, 13, 18... the 15th term is a₁₅ = 3 + 14(5) = 73.',
          realLifeApp: 'Estimating total salary after n years with fixed annual increments.'
        },
        {
          id: 'ch3_b3',
          title: '3.3.3 Sum of First n Terms S_n',
          iconName: 'Grid',
          colorTheme: 'sky',
          whatDoesItMean: 'S_n represents the total sum obtained when adding the first n terms of an Arithmetic Progression together.',
          exactDefinition: 'The sum S_n of the first n terms of an A.P. is given by S_n = (n/2)[2a + (n - 1)d] or S_n = (n/2)(a + l).',
          keyPoints: [
            'Primary Formula: S_n = (n/2)[2a + (n - 1)d].',
            'Alternate Formula: S_n = (n/2)(a + l) when first and last terms are known.',
            'Relation between S_n and a_n: a_n = S_n - S_{n-1} for n ≥ 2.'
          ],
          formula: 'S_n = (n/2)[2a + (n - 1)d] = (n/2)(a + l)  ·  a_n = S_n - S_{n-1}',
          example: 'Sum of first 20 terms of 1, 4, 7, 10... is S₂₀ = 10(2 + 57) = 590.',
          realLifeApp: 'Calculating total accumulated savings over 24 months with a monthly increment.'
        },
        {
          id: 'ch3_b4',
          title: '3.3.4 Selection of Symmetric Terms',
          iconName: 'ShieldCheck',
          colorTheme: 'purple',
          whatDoesItMean: 'Choosing symmetric variables simplifies algebraic equations when term sums or products are given.',
          exactDefinition: 'For 3 terms in A.P., choose (a - d), a, (a + d). For 4 terms, choose (a - 3d), (a - d), (a + d), (a + 3d).',
          keyPoints: [
            '3 Terms in A.P.: (a - d), a, (a + d) ⟹ Sum = 3a.',
            '4 Terms in A.P.: (a - 3d), (a - d), (a + d), (a + 3d) ⟹ Sum = 4a, Difference = 2d.',
            '5 Terms in A.P.: (a - 2d), (a - d), a, (a + d), (a + 2d) ⟹ Sum = 5a.'
          ],
          formula: '3 Terms: (a - d), a, (a + d)  ·  4 Terms: (a - 3d), (a - d), (a + d), (a + 3d)',
          example: '3 numbers in A.P. summing to 21 with product 315 are 5, 7, 9.',
          realLifeApp: 'Distributing a project budget across 3 departments with uniform increments.'
        },
        {
          id: 'ch3_b5',
          title: '3.3.5 Arithmetic Mean (A.M.) & Insertion',
          iconName: 'Combine',
          colorTheme: 'rose',
          whatDoesItMean: 'The Arithmetic Mean between two numbers is their average. Inserting n A.Ms creates an (n + 2)-term A.P.',
          exactDefinition: 'For real numbers a and b, single A.M. A = (a + b)/2. Inserting n A.Ms A₁, A₂... A_n yields d = (b - a)/(n + 1).',
          keyPoints: [
            'Single A.M. between a and b is A = (a + b)/2.',
            'Inserting n A.Ms creates a total of (n + 2) terms.',
            'Common difference formula: d = (b - a)/(n + 1).',
            'Sum of n inserted A.Ms = n × [(a + b)/2].'
          ],
          formula: 'd = (b - a)/(n + 1)  ·  A_k = a + k · [(b - a)/(n + 1)]',
          example: '3 A.Ms between 4 and 20 are 8, 12, 16 (Full A.P.: 4, 8, 12, 16, 20).',
          realLifeApp: 'Designing smooth digital color gradients between two hex colors.'
        },
        {
          id: 'ch3_b6',
          title: '3.3.6 Real-Life Word Problems',
          iconName: 'PieChart',
          colorTheme: 'indigo',
          whatDoesItMean: 'Applying a_n and S_n formulas to solve loan repayment, daily penalty fees, and auditorium seating capacity.',
          exactDefinition: 'Practical application of A.P. formulas to real-world scenarios with constant linear growth.',
          keyPoints: [
            'Identify first term a and constant rate of change d.',
            'Use a_n for single milestone questions (e.g. payment in month 12).',
            'Use S_n for cumulative sum questions (e.g. total paid in 12 months).'
          ],
          formula: 'Single step: a_n = a + (n - 1)d  ·  Cumulative total: S_n = (n/2)[2a + (n - 1)d]',
          example: '30-day delay penalty accumulating at ₹50/day extra totaling ₹27,750.',
          realLifeApp: 'Calculating total seats in an amphitheater with 20 seats in row 1, 24 in row 2.'
        }
      ]
    },

    // CHAPTER 4: MATRICES AND DETERMINANTS (CORRECT MAPPING!)
    4: {
      id: 'math1a_ch4_mindmap',
      chapterNumber: 4,
      chapterName: 'Matrices and Determinants',
      subject: 'Mathematics IA',
      conceptHeading: 'Matrix Algebra, Determinants & Cramer\'s Rule',
      tagline: 'Types, Multiplication, Adjoint, Inverse, Rank & System of Equations',
      centralIcon: 'Grid',
      summary: 'A matrix is a rectangular array of numbers. Covers types, addition, transpose, multiplication AB, determinants det(A), singular matrices, adjoint, inverse A⁻¹, and Cramer\'s Rule.',
      branches: [
        {
          id: 'ch4_b1',
          title: 'Types of Matrices & Order',
          iconName: 'Grid',
          colorTheme: 'amber',
          whatDoesItMean: 'Matrices arrange numbers in m rows and n columns (Order m × n). Types include Row, Column, Square, Diagonal, and Identity matrices.',
          exactDefinition: 'A matrix is a rectangular array of numbers arranged in horizontal rows and vertical columns enclosed in brackets.',
          symbolMeanings: [
            'm × n = Order of matrix (m rows, n columns)',
            'a_ij = Element in i-th row and j-th column',
            'I_n = n×n Identity matrix with 1s on diagonal'
          ],
          keyPoints: [
            'Row Matrix: Single row (1 × n).',
            'Column Matrix: Single column (m × 1).',
            'Square Matrix: Same number of rows and columns (m = n).',
            'Identity Matrix I: Diagonal elements are 1, non-diagonal are 0.'
          ],
          formula: 'Order = m × n  ·  Identity I = [[1, 0], [0, 1]]',
          example: 'A = [[1, 2, 3], [4, 5, 6]] has order 2 × 3.',
          realLifeApp: 'Storing pixel values in digital image processing.'
        },
        {
          id: 'ch4_b2',
          title: 'Matrix Addition & Transpose',
          iconName: 'Layers',
          colorTheme: 'emerald',
          whatDoesItMean: 'Matrices can be added only if they have identical orders. Transpose Aᵀ swaps rows with columns.',
          exactDefinition: 'For two matrices A and B of order m × n, (A + B)_ij = a_ij + b_ij. Transpose Aᵀ is formed by interchanging rows and columns of A.',
          keyPoints: [
            'Addition is commutative: A + B = B + A.',
            'Transpose Properties: (A + B)ᵀ = Aᵀ + Bᵀ.',
            '(k A)ᵀ = k Aᵀ.',
            'Symmetric Matrix: Aᵀ = A. Skew-Symmetric: Aᵀ = -A.'
          ],
          formula: '(A + B)ᵀ = Aᵀ + Bᵀ  ·  Symmetric: Aᵀ = A',
          example: 'If A = [[1, 2], [3, 4]], then Aᵀ = [[1, 3], [2, 4]].',
          realLifeApp: 'Combining two sales inventory grids across two branch stores.'
        },
        {
          id: 'ch4_b3',
          title: 'Matrix Multiplication (AB)',
          iconName: 'Combine',
          colorTheme: 'sky',
          whatDoesItMean: 'Multiplication AB is defined if and only if the number of columns in A equals the number of rows in B.',
          exactDefinition: 'If A is m × p and B is p × n, product AB is m × n where (AB)_ij = ∑ a_ik b_kj.',
          keyPoints: [
            'Condition: Columns of A MUST equal Rows of B.',
            'Matrix multiplication is NOT commutative: AB ≠ BA in general.',
            'Associative Law: (AB)C = A(BC).',
            'Reversal Law of Transpose: (AB)ᵀ = Bᵀ Aᵀ.'
          ],
          formula: '(m × p) × (p × n) = (m × n)  ·  (AB)ᵀ = Bᵀ Aᵀ',
          example: 'Multiplying 2×2 matrices [[1,2],[3,4]] × [[5,6],[7,8]] yields [[19,22],[43,50]].',
          realLifeApp: '3D computer graphics rotation and scaling transformations.'
        },
        {
          id: 'ch4_b4',
          title: 'Determinants & Cofactors',
          iconName: 'Hash',
          colorTheme: 'purple',
          whatDoesItMean: 'Determinant det(A) or |A| is a single scalar value calculated from a square matrix.',
          exactDefinition: 'For a 2x2 matrix [[a,b],[c,d]], det(A) = ad - bc. Cofactor C_ij = (-1)^(i+j) M_ij where M_ij is the minor determinant.',
          keyPoints: [
            '2×2 Determinant: |[a,b; c,d]| = ad - bc.',
            'Cofactor C_ij attaches sign (-1)^(i+j).',
            'If two rows or columns are identical, det(A) = 0.',
            'det(AB) = det(A) · det(B).'
          ],
          formula: 'det([[a,b],[c,d]]) = ad - bc  ·  C_ij = (-1)^(i+j) M_ij',
          example: 'det([[3, 4], [2, 5]]) = (3)(5) - (4)(2) = 15 - 8 = 7.',
          realLifeApp: 'Computing area of triangles and volume scaling factors in physics.'
        },
        {
          id: 'ch4_b5',
          title: 'Singular Matrix & Inverse A⁻¹',
          iconName: 'ShieldCheck',
          colorTheme: 'rose',
          whatDoesItMean: 'Adjoint Adj(A) is the transpose of the cofactor matrix. Inverse A⁻¹ exists if det(A) ≠ 0.',
          exactDefinition: 'A square matrix A is Singular if det(A) = 0, Non-Singular if det(A) ≠ 0. Inverse A⁻¹ = (1 / det(A)) · Adj(A).',
          keyPoints: [
            'Singular Matrix: det(A) = 0 (No Inverse exists).',
            'Non-Singular Matrix: det(A) ≠ 0 (Inverse exists).',
            'Inverse Formula: A⁻¹ = (1/det A) Adj(A).',
            'Identity: A · A⁻¹ = A⁻¹ · A = I.',
            'Reversal Law: (AB)⁻¹ = B⁻¹ A⁻¹.'
          ],
          formula: 'A⁻¹ = (1 / det A) Adj(A)  ·  (AB)⁻¹ = B⁻¹ A⁻¹',
          example: 'For [[2, 1], [5, 3]], det = 1, Adj = [[3, -1], [-5, 2]] ⟹ A⁻¹ = [[3, -1], [-5, 2]].',
          realLifeApp: 'Solving circuit mesh currents in electrical engineering.'
        },
        {
          id: 'ch4_b6',
          title: 'Cramer\'s Rule & Linear Systems',
          iconName: 'PieChart',
          colorTheme: 'indigo',
          whatDoesItMean: 'Method to solve system of linear equations AX = B using determinants Δ, Δx, Δy, Δz.',
          exactDefinition: 'For a linear system with non-zero determinant Δ ≠ 0, solutions are x = Δx / Δ, y = Δy / Δ, z = Δz / Δ.',
          keyPoints: [
            'System AX = B has unique solution if Δ ≠ 0.',
            'Cramer\'s Formulas: x = Δx / Δ, y = Δy / Δ, z = Δz / Δ.',
            'If Δ = 0 and at least one Δx, Δy, Δz ≠ 0 ⟹ No Solution (Inconsistent).',
            'If Δ = 0 and Δx = Δy = Δz = 0 ⟹ Infinitely Many Solutions.'
          ],
          formula: 'x = Δx / Δ  ·  y = Δy / Δ  ·  z = Δz / Δ',
          example: 'Solving 2x + 3y = 8 and x - y = 1 yields x = 11/5, y = 6/5.',
          realLifeApp: 'Economic market supply and demand equilibrium calculations.'
        }
      ]
    }
  },

  // =========================================================================
  // MATHEMATICS IB
  // =========================================================================
  math_1b: {
    // CHAPTER 1: LOCUS
    1: {
      id: 'math1b_ch1_mindmap',
      chapterNumber: 1,
      chapterName: 'Locus',
      subject: 'Mathematics IB',
      conceptHeading: 'Geometric Trajectories & Locus Equations',
      tagline: 'Path of a Moving Point, Distance Conditions & Algebraic Simplification',
      centralIcon: 'Compass',
      summary: 'A locus is the curve or path formed by a moving point following a specific geometric condition. Covers P(x, y) coordinates, distance conditions, squaring square roots, and standard loci.',
      branches: [
        {
          id: 'm1b_ch1_b1',
          title: 'Definition of a Locus',
          iconName: 'BookOpen',
          colorTheme: 'amber',
          whatDoesItMean: 'A locus is the set or path of all points (x,y) that satisfy a given geometric rule or property.',
          exactDefinition: 'The locus of a point is the geometric path or curve formed by all points (x, y) satisfying a specified geometric condition.',
          keyPoints: [
            'Let P(x, y) be any arbitrary point on the locus.',
            'Translate geometric rule into algebraic equation.',
            'Simplify equation in terms of x and y.'
          ],
          formula: 'Geometric Condition ⟹ Algebraic Equation f(x, y) = 0',
          example: 'Path of a point at constant distance 5 from origin: x² + y² = 25.',
          realLifeApp: 'Satellite orbiting Earth along an elliptical path.'
        },
        {
          id: 'm1b_ch1_b2',
          title: 'Arbitrary Point P(x, y) Method',
          iconName: 'Hash',
          colorTheme: 'emerald',
          whatDoesItMean: 'Standard procedure to derive the equation of any locus step-by-step.',
          exactDefinition: 'Assign coordinates (x, y) to moving point P. Express given distances in terms of x, y using distance formula.',
          keyPoints: [
            'Step 1: Let P = (x, y).',
            'Step 2: Write down given geometric condition (e.g. PA = PB or PA² + PB² = k²).',
            'Step 3: Apply distance formula d = √[(x₂-x₁)² + (y₂-y₁)²].'
          ],
          formula: 'Distance Formula: d = √[(x - x₁)² + (y - y₁)²]',
          example: 'Locus of P equidistant from A(1, 2) and B(3, 4): PA² = PB².',
          realLifeApp: 'GPS triangulation using distance signals from 3 cell towers.'
        },
        {
          id: 'm1b_ch1_b3',
          title: 'Distance Ratio & Sum Conditions',
          iconName: 'Grid',
          colorTheme: 'sky',
          whatDoesItMean: 'Locus equations specified by constant distance sums PA + PB = k or constant distance ratios PA / PB = m : n.',
          keyPoints: [
            'Constant Distance Sum PA + PB = k forms an Ellipse.',
            'Constant Distance Difference |PA - PB| = k forms a Hyperbola.',
            'Constant Ratio PA : PB = 1 forms a Perpendicular Bisector line.',
            'Constant Ratio PA : PB = m : n (m ≠ n) forms a Circle of Apollonius.'
          ],
          formula: 'PA + PB = k (Ellipse) · PA : PB = m : n (Circle of Apollonius)',
          example: 'Points with distance sum 10 from (-3,0) and (3,0) form ellipse x²/25 + y²/16 = 1.',
          realLifeApp: 'Acoustic whisper galleries where sound reflects from elliptical foci.'
        },
        {
          id: 'm1b_ch1_b4',
          title: 'Simplifying Radical Equations',
          iconName: 'Layers',
          colorTheme: 'purple',
          whatDoesItMean: 'Algebraic technique to eliminate square roots by isolating radical terms and squaring both sides cleanly.',
          keyPoints: [
            'Isolate one radical term on one side of the equation.',
            'Square both sides to eliminate the first radical.',
            'Rearrange and square again if a second radical remains.',
            'Always verify for extraneous roots.'
          ],
          formula: '√(A) + √(B) = k ⟹ Isolation & Double Squaring',
          example: '√(x²+y²) + √((x-2)²+y²) = 4 isolates into x²/4 + y²/3 = 1.',
          realLifeApp: 'Radar tracking wave interference calculations.'
        },
        {
          id: 'm1b_ch1_b5',
          title: 'Standard Locus Curves',
          iconName: 'Combine',
          colorTheme: 'rose',
          whatDoesItMean: 'Recognizing standard geometric curves from simplified locus equations.',
          keyPoints: [
            'Circle: x² + y² + 2gx + 2fy + c = 0.',
            'Perpendicular Bisector Line: ax + by + c = 0.',
            'Parabola: Fixed point (focus) distance equals fixed line (directrix) distance.'
          ],
          formula: 'Circle: x² + y² = r²  ·  Line: ax + by + c = 0',
          example: 'Locus equidistant from two parallel lines is a parallel line midway between them.',
          realLifeApp: 'Designing parabolic headlight reflectors.'
        }
      ]
    },

    // CHAPTER 2: THE STRAIGHT LINE
    2: {
      id: 'math1b_ch2_mindmap',
      chapterNumber: 2,
      chapterName: 'The Straight Line',
      subject: 'Mathematics IB',
      conceptHeading: 'Linear Equations, Slopes & Standard Forms',
      tagline: 'Slope m = tan(θ), Point-Slope, Intercept Form & Distance Formulas',
      centralIcon: 'Compass',
      summary: 'A straight line is represented by ax + by + c = 0. Covers slope m, inclination angle θ, slope-intercept form, intercept form, normal form, parallel/perpendicular lines, and perpendicular distance.',
      branches: [
        {
          id: 'm1b_ch2_b1',
          title: 'Slope m & Inclination θ',
          iconName: 'BookOpen',
          colorTheme: 'amber',
          whatDoesItMean: 'The slope m = tan(θ) measures the steepness or inclination of a straight line relative to the positive x-axis.',
          exactDefinition: 'If θ (0° ≤ θ < 180°, θ ≠ 90°) is the inclination angle of a line with the x-axis, then slope m = tan(θ).',
          keyPoints: [
            'Slope formula through two points: m = (y₂ - y₁) / (x₂ - x₁).',
            'Line parallel to x-axis ⟹ θ = 0° ⟹ m = 0.',
            'Line perpendicular to x-axis ⟹ θ = 90° ⟹ Slope is undefined.',
            'Parallel Lines: m₁ = m₂.',
            'Perpendicular Lines: m₁ · m₂ = -1.'
          ],
          formula: 'm = tan(θ) = (y₂ - y₁) / (x₂ - x₁)  ·  Perpendicular: m₁ m₂ = -1',
          example: 'Slope of line joining (1, 2) and (3, 6) is m = (6 - 2)/(3 - 1) = 2.',
          realLifeApp: 'Highway ramp inclination and wheelchair accessibility slope calculations.'
        },
        {
          id: 'm1b_ch2_b2',
          title: 'Slope-Intercept & Point-Slope',
          iconName: 'Grid',
          colorTheme: 'sky',
          whatDoesItMean: 'Standard algebraic equations specifying a straight line using slope m and known points or intercepts.',
          exactDefinition: 'Slope-Intercept Form: y = mx + c. Point-Slope Form: y - y₁ = m(x - x₁).',
          keyPoints: [
            'y = mx + c (where m is slope, c is y-intercept).',
            'y - y₁ = m(x - x₁) (passing through (x₁, y₁) with slope m).',
            'Two-Point Form: y - y₁ = [(y₂ - y₁)/(x₂ - x₁)] (x - x₁).'
          ],
          formula: 'y = mx + c  ·  y - y₁ = m(x - x₁)',
          example: 'Line with slope 3 and y-intercept -4: y = 3x - 4 ⟹ 3x - y - 4 = 0.',
          realLifeApp: 'Cost functions in business (Fixed base cost + Variable cost per unit).'
        },
        {
          id: 'm1b_ch2_b3',
          title: 'Intercept Form (x/a + y/b = 1)',
          iconName: 'Hash',
          colorTheme: 'emerald',
          whatDoesItMean: 'Line equation expressed directly in terms of x-intercept a and y-intercept b.',
          exactDefinition: 'If a line cuts x-axis at (a, 0) and y-axis at (0, b), its equation is x/a + y/b = 1.',
          keyPoints: [
            'x-intercept = a, y-intercept = b.',
            'Area of triangle bounded by coordinate axes and line: Area = ½ |a b|.',
            'Centroid of intercept triangle: G = (a/3, b/3).'
          ],
          formula: 'x/a + y/b = 1  ·  Intercept Area = ½ |a b|',
          example: 'Line cutting x-axis at 3 and y-axis at 4: x/3 + y/4 = 1 ⟹ 4x + 3y = 12.',
          realLifeApp: 'Architectural roof truss boundary lines.'
        },
        {
          id: 'm1b_ch2_b4',
          title: 'General Form ax + by + c = 0',
          iconName: 'Layers',
          colorTheme: 'purple',
          whatDoesItMean: 'Universal 1st-degree linear equation representing any straight line in 2D Cartesian plane.',
          exactDefinition: 'Every first-degree equation in x and y of the form ax + by + c = 0 represents a straight line.',
          keyPoints: [
            'Slope of ax + by + c = 0 is m = -a/b.',
            'x-intercept = -c/a, y-intercept = -c/b.',
            'Parallel Line: ax + by + k = 0.',
            'Perpendicular Line: bx - ay + k = 0.'
          ],
          formula: 'Slope m = -a/b  ·  Parallel: ax + by + k = 0  ·  Perp: bx - ay + k = 0',
          example: 'Line 2x + 5y - 10 = 0 has slope m = -2/5.',
          realLifeApp: 'Linear constraint boundaries in operations research optimization.'
        },
        {
          id: 'm1b_ch2_b5',
          title: 'Perpendicular Distance & Angle',
          iconName: 'ShieldCheck',
          colorTheme: 'rose',
          whatDoesItMean: 'Formulas for length of perpendicular from point (x₁, y₁) to line ax + by + c = 0 and angle between two lines.',
          exactDefinition: 'Perpendicular distance d from (x₁, y₁) to ax + by + c = 0 is d = |ax₁ + by₁ + c| / √(a² + b²).',
          keyPoints: [
            'Distance from Origin (0,0): d = |c| / √(a² + b²).',
            'Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0: d = |c₁ - c₂| / √(a² + b²).',
            'Angle θ between lines with slopes m₁, m₂: tan(θ) = |(m₁ - m₂) / (1 + m₁ m₂)|.'
          ],
          formula: 'd = |ax₁ + by₁ + c| / √(a² + b²)  ·  tan(θ) = |(m₁ - m₂) / (1 + m₁ m₂)|',
          example: 'Distance from (2, 3) to 3x + 4y - 6 = 0: d = |3(2) + 4(3) - 6| / √(9+16) = 12/5 = 2.4.',
          realLifeApp: 'Calculating safe clearance distance between power transmission lines.'
        }
      ]
    }
  },

  // =========================================================================
  // PHYSICS
  // =========================================================================
  physics_1: {
    // CHAPTER 1: UNITS AND MEASUREMENTS
    1: {
      id: 'phy_ch1_mindmap',
      chapterNumber: 1,
      chapterName: 'Units and Measurements',
      subject: 'Physics',
      conceptHeading: 'SI Base Units, Dimensional Analysis & Errors',
      tagline: '7 Base Quantities, Dimensional Formulas [M^a L^b T^c] & Precision Errors',
      centralIcon: 'Zap',
      summary: 'Measurement compares physical quantities against SI reference standards. Covers 7 SI base units, dimensional analysis, principle of homogeneity, significant figures, and zero errors.',
      branches: [
        {
          id: 'phy_ch1_b1',
          title: '7 SI Base Units',
          iconName: 'BookOpen',
          colorTheme: 'amber',
          whatDoesItMean: 'The 7 internationally agreed fundamental physical quantities and their base SI units.',
          exactDefinition: 'Fundamental quantities are independent physical quantities that cannot be defined in terms of other physical quantities.',
          keyPoints: [
            '1. Length (Meter, m)',
            '2. Mass (Kilogram, kg)',
            '3. Time (Second, s)',
            '4. Electric Current (Ampere, A)',
            '5. Thermodynamic Temperature (Kelvin, K)',
            '6. Amount of Substance (Mole, mol)',
            '7. Luminous Intensity (Candela, cd)'
          ],
          formula: '7 SI Base Units: m, kg, s, A, K, mol, cd',
          example: 'Speed is a derived quantity = Length / Time (m/s).',
          realLifeApp: 'Global standardization of international trade and scientific telemetry.'
        },
        {
          id: 'phy_ch1_b2',
          title: 'Dimensional Formula [M^a L^b T^c]',
          iconName: 'Hash',
          colorTheme: 'emerald',
          whatDoesItMean: 'An algebraic expression showing which base powers of Mass [M], Length [L], and Time [T] form a derived physical quantity.',
          exactDefinition: 'The expression showing how and which of the fundamental quantities represent a physical quantity is called its dimensional formula.',
          keyPoints: [
            'Velocity = [M⁰ L¹ T⁻¹].',
            'Acceleration = [M⁰ L¹ T⁻²].',
            'Force = Mass × Acceleration = [M¹ L¹ T⁻²].',
            'Work / Energy = Force × Distance = [M¹ L² T⁻²].'
          ],
          formula: '[Physical Quantity] = [M^a L^b T^c]',
          example: 'Force = [M¹ L¹ T⁻²]. Work = [M¹ L² T⁻²].',
          realLifeApp: 'Deriving aerodynamic drag scaling equations for aircraft testing.'
        },
        {
          id: 'phy_ch1_b3',
          title: 'Principle of Homogeneity',
          iconName: 'ShieldCheck',
          colorTheme: 'purple',
          whatDoesItMean: 'In any correct physical equation, the dimensions of every term on both sides MUST be identical.',
          exactDefinition: 'The principle of homogeneity states that the dimensions of all terms in a physical equation must be the same.',
          keyPoints: [
            'Only physical quantities with identical dimensions can be added or subtracted.',
            'Used to check correctness of physical equations.',
            'Used to derive relationships between physical variables.'
          ],
          formula: 'Dimensions of LHS = Dimensions of RHS',
          example: 'In s = ut + ½ at², [s] = [L], [ut] = [L], [½at²] = [L]. Equation is dimensionally homogeneous!',
          realLifeApp: 'Verifying scientific formulas before executing supercomputer simulations.'
        },
        {
          id: 'phy_ch1_b4',
          title: 'Significant Figures & Precision',
          iconName: 'Grid',
          colorTheme: 'sky',
          whatDoesItMean: 'Digits in a measurement that are known reliably plus the first uncertain digit.',
          keyPoints: [
            'All non-zero digits are significant (e.g. 123.4 has 4 sig figs).',
            'Zeros between non-zero digits are significant (1005 has 4 sig figs).',
            'Leading zeros are NOT significant (0.0025 has 2 sig figs).',
            'Trailing zeros after a decimal point ARE significant (5.00 has 3 sig figs).'
          ],
          formula: 'Precision = Smallest unit measureable by instrument',
          example: '0.00540 kg has 3 significant figures (5, 4, 0).',
          realLifeApp: 'Precision dosage measurement in pharmaceutical manufacturing.'
        },
        {
          id: 'phy_ch1_b5',
          title: 'Instrument Errors (Vernier & Screw Gauge)',
          iconName: 'Layers',
          colorTheme: 'rose',
          whatDoesItMean: 'Calculating least count and zero error corrections for Vernier Calipers and Screw Gauge micrometers.',
          keyPoints: [
            'Vernier Least Count LC = 1 MSD - 1 VSD = 0.1 mm = 0.01 cm.',
            'Screw Gauge Least Count LC = Pitch / Total Head Scale Divisions = 0.01 mm.',
            'True Reading = Observed Reading - (Zero Error with Sign).'
          ],
          formula: 'Vernier LC = 0.1 mm  ·  Screw Gauge LC = 0.01 mm  ·  True = Observed - Zero Error',
          example: 'Screw gauge with pitch 1mm and 100 divisions has LC = 1/100 = 0.01 mm.',
          realLifeApp: 'Engine cylinder piston tolerance measurement.'
        }
      ]
    },

    // CHAPTER 2: MOTION IN A STRAIGHT LINE AND VECTORS
    2: {
      id: 'phy_ch2_mindmap',
      chapterNumber: 2,
      chapterName: 'Motion in a Straight Line and Vectors',
      subject: 'Physics',
      conceptHeading: 'Kinematics & Vector Resolution',
      tagline: 'Equations of Motion, Displacement Graphs & Parallelogram Law',
      centralIcon: 'Zap',
      summary: 'Kinematics describes motion using displacement s, velocity v, and acceleration a. Vectors represent magnitude and direction, obeying Parallelogram Law addition.',
      branches: [
        {
          id: 'phy_ch2_b1',
          title: 'Kinematic Quantities (u, v, s, a, t)',
          iconName: 'BookOpen',
          colorTheme: 'sky',
          whatDoesItMean: 'Basic variables describing 1D rectilinear motion.',
          exactDefinition: 'Displacement is vector shortest distance. Velocity v = ds/dt. Acceleration a = dv/dt.',
          keyPoints: [
            'Distance (Scalar total path) vs Displacement (Vector shortest straight path).',
            'Average Velocity = Total Displacement / Total Time.',
            'Instantaneous Velocity v = lim (Δt➔0) Δs/Δt = ds/dt.'
          ],
          formula: 'v = ds/dt  ·  a = dv/dt = d²s/dt²',
          example: 'Body travelling 3m East then 4m North has distance 7m, displacement 5m.',
          realLifeApp: 'Vehicle speedometer vs GPS position tracking.'
        },
        {
          id: 'phy_ch2_b2',
          title: 'Equations of Uniform Motion',
          iconName: 'Grid',
          colorTheme: 'amber',
          whatDoesItMean: 'Three fundamental equations relating u, v, a, s, and t under constant acceleration a.',
          exactDefinition: 'For motion with uniform acceleration a: 1) v = u + at, 2) s = ut + ½ at², 3) v² - u² = 2as.',
          keyPoints: [
            'v = u + at (Velocity-Time Relation).',
            's = ut + ½ at² (Position-Time Relation).',
            'v² - u² = 2as (Position-Velocity Relation).',
            'Distance in n-th second: s_n = u + a(n - ½).'
          ],
          formula: 'v = u + at  ·  s = ut + ½ at²  ·  v² - u² = 2as',
          example: 'Car accelerating from rest (u=0) at 2 m/s² for 5 s covers s = ½(2)(25) = 25 m.',
          realLifeApp: 'Calculating braking distances for automotive safety design.'
        },
        {
          id: 'phy_ch2_b3',
          title: 'Scalar vs Vector Quantities',
          iconName: 'Hash',
          colorTheme: 'emerald',
          whatDoesItMean: 'Scalars have magnitude only; Vectors have both magnitude and direction and follow vector laws.',
          keyPoints: [
            'Scalars: Mass, distance, speed, work, temperature.',
            'Vectors: Displacement, velocity, acceleration, force, momentum.',
            'Unit Vector r̂ = r̄ / |r̄| (Magnitude = 1).'
          ],
          formula: 'Unit Vector Â = Ā / |Ā|',
          example: 'Force of 10 N acting downwards is a vector.',
          realLifeApp: 'Aviation flight navigation displaying air speed and heading vector.'
        },
        {
          id: 'phy_ch2_b4',
          title: 'Parallelogram Law of Vector Addition',
          iconName: 'Combine',
          colorTheme: 'purple',
          whatDoesItMean: 'Method to calculate resultant vector R when two vectors A and B act at an angle θ.',
          exactDefinition: 'If two vectors are represented in magnitude and direction by two adjacent sides of a parallelogram, their resultant is represented by the diagonal passing through their point of intersection.',
          keyPoints: [
            'Resultant Magnitude: R = √(A² + B² + 2AB cos θ).',
            'Direction Angle α: tan(α) = (B sin θ) / (A + B cos θ).',
            'If θ = 0° (same direction): R_max = A + B.',
            'If θ = 180° (opposite direction): R_min = |A - B|.',
            'If θ = 90° (perpendicular): R = √(A² + B²).'
          ],
          formula: 'R = √(A² + B² + 2AB cos θ)  ·  tan(α) = (B sin θ) / (A + B cos θ)',
          example: 'Two perpendicular forces 3 N and 4 N have resultant R = √(9+16) = 5 N.',
          realLifeApp: 'Calculating net towing force when two tugboats pull a ship at an angle.'
        },
        {
          id: 'phy_ch2_b5',
          title: '3D Vector Resolution & Components',
          iconName: 'Layers',
          colorTheme: 'rose',
          whatDoesItMean: 'Splitting a 3D vector into rectangular components along x, y, z axes.',
          keyPoints: [
            'Vector r̄ = xî + yĵ + zk̂.',
            'Magnitude |r̄| = √(x² + y² + z²).',
            'Direction Cosines: cos(α) = x/|r̄|, cos(β) = y/|r̄|, cos(γ) = z/|r̄|.',
            'Identity: cos²(α) + cos²(β) + cos²(γ) = 1.'
          ],
          formula: '|r̄| = √(x² + y² + z²)  ·  cos²(α) + cos²(β) + cos²(γ) = 1',
          example: 'Vector r̄ = 3î + 4ĵ + 12k̂ has magnitude √(9+16+144) = √169 = 13.',
          realLifeApp: 'Structural engineering beam stress component analysis.'
        }
      ]
    }
  },

  // =========================================================================
  // CHEMISTRY
  // =========================================================================
  chemistry_1: {
    // CHAPTER 1: ATOMIC STRUCTURE
    1: {
      id: 'chem_ch1_mindmap',
      chapterNumber: 1,
      chapterName: 'Atomic Structure',
      subject: 'Chemistry',
      conceptHeading: 'Bohr Model, Quantum Numbers & Electronic Configuration',
      tagline: 'Subatomic Particles, 4 Quantum Numbers, Orbital Shapes & Filling Principles',
      centralIcon: 'Sparkles',
      summary: 'Atoms consist of protons, neutrons, and revolving electrons. Covers Bohr model, energy quantization, four quantum numbers (n, l, m, s), orbital shapes, Aufbau principle, and Hund\'s rule.',
      branches: [
        {
          id: 'chem_ch1_b1',
          title: 'Bohr Atomic Model',
          iconName: 'BookOpen',
          colorTheme: 'amber',
          whatDoesItMean: 'Electrons revolve around nucleus in fixed non-radiating circular orbits with quantized angular momentum.',
          exactDefinition: 'Bohr model postulates that electrons revolve in stationary circular orbits where angular momentum L = mvr = nh / (2π).',
          keyPoints: [
            'Quantized Orbits: L = mvr = nh / (2π).',
            'Energy of orbit n: E_n = -13.6 / n² eV.',
            'Photon emission/absorption: ΔE = E₂ - E₁ = hν.'
          ],
          formula: 'mvr = nh / (2π)  ·  E_n = -13.6 / n² eV',
          example: 'For hydrogen ground state n=1, energy E₁ = -13.6 eV.',
          realLifeApp: 'Explaining atomic line spectrum of hydrogen and neon laser light.'
        },
        {
          id: 'chem_ch1_b2',
          title: '4 Quantum Numbers (n, l, m, s)',
          iconName: 'Hash',
          colorTheme: 'emerald',
          whatDoesItMean: 'Set of 4 numbers giving the complete 3D address and spin state of an electron in an atom.',
          exactDefinition: 'Quantum numbers specify the main energy level (n), subshell shape (l), spatial orientation (m), and spin direction (s) of an electron.',
          keyPoints: [
            'Principal n: Main shell size & energy (n = 1, 2, 3...).',
            'Azimuthal l: Subshell shape (s=0, p=1, d=2, f=3; 0 ≤ l ≤ n-1).',
            'Magnetic m: Spatial orientation (-l to +l).',
            'Spin s: Electron spin (+½ or -½).'
          ],
          formula: 'Max electrons in n-th shell = 2n²  ·  Max electrons in subshell = 2(2l + 1)',
          example: 'For 3d orbital: n = 3, l = 2, m = -2,-1,0,1,2, s = ±½.',
          realLifeApp: 'Designing MRI medical scanners based on nuclear electron spin resonance.'
        },
        {
          id: 'chem_ch1_b3',
          title: 'Orbital Shapes (s, p, d, f)',
          iconName: 'Grid',
          colorTheme: 'sky',
          whatDoesItMean: '3D spatial regions where the probability of finding an electron is maximum (95%).',
          keyPoints: [
            's-orbital (l=0): Non-directional Sphere.',
            'p-orbital (l=1): Dumbbell shape along x, y, z axes (p_x, p_y, p_z).',
            'd-orbital (l=2): Double dumbbell shape (d_xy, d_yz, d_zx, d_x²-y², d_z²).'
          ],
          formula: 's = Sphere  ·  p = Dumbbell  ·  d = Double Dumbbell',
          example: '2p subshell has 3 degenerate orbitals (2px, 2py, 2pz) holding max 6 electrons.',
          realLifeApp: 'Visualizing electron density distributions in molecular modeling software.'
        },
        {
          id: 'chem_ch1_b4',
          title: 'Aufbau & Hund Filling Rules',
          iconName: 'ShieldCheck',
          colorTheme: 'purple',
          whatDoesItMean: 'Rules governing how electrons fill available subshells in ground state atoms.',
          exactDefinition: 'Aufbau Principle: Orbitals are filled in increasing order of (n + l) energy. Hund\'s Rule: Electron pairing in degenerate orbitals occurs only after each orbital is singly occupied.',
          keyPoints: [
            'Aufbau Order: 1s < 2s < 2p < 3s < 3p < 4s < 3d...',
            '(n + l) Rule: Lower (n + l) value fills first.',
            'Hund\'s Rule: Maximum multiplicity with parallel spins before pairing.'
          ],
          formula: '(n + l) Rule determines orbital energy ranking',
          example: 'Nitrogen (Z=7): 1s² 2s² 2p_x¹ 2p_y¹ 2p_z¹ (3 unpaired electrons).',
          realLifeApp: 'Predicting magnetic properties (paramagnetic vs diamagnetic) of transition metals.'
        },
        {
          id: 'chem_ch1_b5',
          title: 'Pauli Exclusion Principle',
          iconName: 'Layers',
          colorTheme: 'rose',
          whatDoesItMean: 'No two electrons in an atom can have the exact same set of 4 quantum numbers.',
          exactDefinition: 'No two electrons in the same atom can have the same four quantum numbers. An orbital can hold a maximum of 2 electrons with opposite spins.',
          keyPoints: [
            'An orbital can hold at most 2 electrons.',
            'The two electrons in an orbital MUST have opposite spins (+½ and -½).'
          ],
          formula: 'Max 2 e⁻ per orbital with opposite spins (↿⇂)',
          example: 'In 1s², e₁ has (1,0,0,+½) and e₂ has (1,0,0,-½).',
          realLifeApp: 'Explaining atomic volume stability and matter non-compressibility.'
        }
      ]
    },

    // CHAPTER 2: CHEMICAL BONDING AND MOLECULAR STRUCTURE
    2: {
      id: 'chem_ch2_mindmap',
      chapterNumber: 2,
      chapterName: 'Chemical Bonding and Molecular Structure',
      subject: 'Chemistry',
      conceptHeading: 'Ionic/Covalent Bonds, VSEPR & Hybridization',
      tagline: 'Octet Rule, Molecular Shapes, Dipole Moments & sp/sp²/sp³ Hybridization',
      centralIcon: 'Sparkles',
      summary: 'Chemical bonding combines atoms to achieve stable octet configurations. Covers ionic, covalent, and hydrogen bonding, VSEPR molecular geometries, dipole moments, and orbital hybridization.',
      branches: [
        {
          id: 'chem_ch2_b1',
          title: 'Octet Rule & Lewis Symbols',
          iconName: 'BookOpen',
          colorTheme: 'amber',
          whatDoesItMean: 'Atoms gain, lose, or share valence electrons to achieve noble gas 8-electron octet configuration.',
          exactDefinition: 'Atoms enter into chemical combination to attain a stable outer shell octet of 8 valence electrons.',
          keyPoints: [
            'Lewis Dot Structure shows valence electrons as dots around element symbol.',
            'Exceptions: Incomplete octet (BF₃, BeCl₂), Expanded octet (SF₆, PCl₅).'
          ],
          formula: 'Octet Target = 8 valence electrons',
          example: 'NaCl: Na transfers 1 e⁻ to Cl, forming Na⁺ and Cl⁻ octets.',
          realLifeApp: 'Designing chemical battery electrolytes and inert gas shielding.'
        },
        {
          id: 'chem_ch2_b2',
          title: 'Ionic vs Covalent Bonding',
          iconName: 'Combine',
          colorTheme: 'emerald',
          whatDoesItMean: 'Ionic bonds form by complete electron transfer; Covalent bonds form by shared electron pairs.',
          exactDefinition: 'Ionic Bond: Electrostatic attraction between positive cation and negative anion. Covalent Bond: Formed by sharing electron pairs.',
          keyPoints: [
            'Ionic Compounds: High melting point, conduct electricity in molten state, polar.',
            'Covalent Compounds: Lower melting point, non-conducting, directional bonds.',
            'Coordinate Covalent Bond: Both shared electrons donated by a single donor atom (e.g. NH₄⁺).'
          ],
          formula: 'Bond Order = ½ [ (No. of bonding e⁻) - (No. of anti-bonding e⁻) ]',
          example: 'H₂O has 2 single covalent bonds. NaCl has 1 ionic lattice bond.',
          realLifeApp: 'Understanding salt solubility in water vs oil.'
        },
        {
          id: 'chem_ch2_b3',
          title: 'VSEPR Theory & 3D Shapes',
          iconName: 'Grid',
          colorTheme: 'sky',
          whatDoesItMean: 'Valence Shell Electron Pair Repulsion theory predicts 3D geometries based on minimizing electron pair repulsion.',
          exactDefinition: 'The shape of a molecule depends upon the number of valence shell electron pairs around the central atom, which orient in space to minimize repulsion.',
          keyPoints: [
            'Repulsion Strength: Lone Pair-Lone Pair > Lone Pair-Bond Pair > Bond Pair-Bond Pair.',
            '2 Pairs ⟹ Linear (180°, BeCl₂).',
            '3 Pairs ⟹ Trigonal Planar (120°, BF₃).',
            '4 Pairs ⟹ Tetrahedral (109.5°, CH₄).',
            '4 Pairs (1 Lone Pair) ⟹ Trigonal Pyramidal (107°, NH₃).',
            '4 Pairs (2 Lone Pairs) ⟹ Bent / V-Shape (104.5°, H₂O).'
          ],
          formula: 'CH₄ (Tetrahedral 109.5°) · NH₃ (Pyramidal 107°) · H₂O (Bent 104.5°)',
          example: 'CH₄ has 4 bond pairs ⟹ Symmetrical Tetrahedral (109.5°).',
          realLifeApp: 'Drug receptor binding where molecular shape dictates pharmaceutical activity.'
        },
        {
          id: 'chem_ch2_b4',
          title: 'Electronegativity & Dipole Moment',
          iconName: 'Hash',
          colorTheme: 'purple',
          whatDoesItMean: 'Dipole moment μ measures polarity of a covalent bond due to electronegativity differences.',
          exactDefinition: 'Dipole moment μ is the product of charge magnitude q and separation distance d: μ = q × d (expressed in Debye units D).',
          keyPoints: [
            'Polar Molecule: Net dipole moment μ > 0 (e.g. H₂O, NH₃).',
            'Non-Polar Molecule: Net dipole moment μ = 0 due to symmetrical cancellation (e.g. CO₂, CCl₄).'
          ],
          formula: 'Dipole Moment μ = q × d (Debye, D)  ·  CO₂ μ = 0 (Linear cancellation)',
          example: 'CO₂ is linear O=C=O so bond dipoles cancel out ⟹ μ = 0 (Non-polar).',
          realLifeApp: 'Microwave oven heating water molecules via dipole rotation.'
        },
        {
          id: 'chem_ch2_b5',
          title: 'Orbital Hybridization (sp, sp², sp³)',
          iconName: 'Layers',
          colorTheme: 'rose',
          whatDoesItMean: 'Intermixing of atomic orbitals of slightly different energies to form equal number of equivalent hybrid orbitals.',
          exactDefinition: 'Hybridization is the concept of mixing atomic orbitals into new hybrid orbitals suitable for pairing of electrons to form chemical bonds.',
          keyPoints: [
            'sp Hybridization: 1 s + 1 p ⟹ 2 Linear hybrid orbitals (180°, e.g. C₂H₂).',
            'sp² Hybridization: 1 s + 2 p ⟹ 3 Trigonal Planar orbitals (120°, e.g. C₂H₄).',
            'sp³ Hybridization: 1 s + 3 p ⟹ 4 Tetrahedral orbitals (109.5°, e.g. CH₄, C₂H₆).'
          ],
          formula: 'sp (Linear 180°) · sp² (Trigonal Planar 120°) · sp³ (Tetrahedral 109.5°)',
          example: 'Carbon in methane (CH₄) undergoes sp³ hybridization forming 4 equivalent C-H sigma bonds.',
          realLifeApp: 'Explaining diamond hardness (sp³) vs graphite lubricity (sp²).'
        }
      ]
    }
  }
};

// Aliases for backwards compatibility
export const MATHEMATICS_IA_MIND_MAPS = ALL_SUBJECT_MIND_MAPS.math_1a;

/**
 * Universal Mind Map Lookup for all subjects and chapters
 */
export function getMindMapForSubjectAndChapter(subjectIdOrTitle: string, chapterNum: number): ConceptMindMapData {
  let subjectKey = 'math_1a';
  if (subjectIdOrTitle === 'math_1b' || subjectIdOrTitle === 'Mathematics IB') subjectKey = 'math_1b';
  else if (subjectIdOrTitle === 'physics_1' || subjectIdOrTitle === 'Physics') subjectKey = 'physics_1';
  else if (subjectIdOrTitle === 'chemistry_1' || subjectIdOrTitle === 'Chemistry') subjectKey = 'chemistry_1';
  else if (subjectIdOrTitle === 'math_1a' || subjectIdOrTitle === 'Mathematics IA') subjectKey = 'math_1a';

  const subjectMaps = ALL_SUBJECT_MIND_MAPS[subjectKey];
  if (subjectMaps && subjectMaps[chapterNum]) {
    return subjectMaps[chapterNum];
  }

  // Try dynamically generating a custom connected mind map from MPC_LEARNING_HUB_DATA
  const hubSubject = Object.values(MPC_LEARNING_HUB_DATA).find(s => s.subjectId === subjectKey);
  const chapterData = hubSubject?.chapters.find(c => c.chapterNumber === chapterNum);

  if (chapterData && chapterData.conceptNotes.length > 0) {
    const colors: ('amber' | 'emerald' | 'sky' | 'purple' | 'rose' | 'indigo' | 'teal' | 'coral')[] = [
      'amber', 'emerald', 'sky', 'purple', 'rose', 'indigo', 'teal', 'coral'
    ];
    const icons = ['BookOpen', 'Hash', 'Grid', 'Layers', 'Combine', 'ShieldCheck', 'Zap', 'Sparkles'];

    return {
      id: `${subjectKey}_ch${chapterNum}_mindmap`,
      chapterNumber: chapterData.chapterNumber,
      chapterName: chapterData.chapterName,
      subject: (hubSubject?.subjectTitle || 'Mathematics IA') as any,
      conceptHeading: `${chapterData.chapterName} - Interactive Mind Map`,
      tagline: `Visual breakdown of key formulas, principles & textbook concepts`,
      centralIcon: 'BookOpen',
      summary: chapterData.introSimpleEnglish,
      branches: chapterData.conceptNotes.map((note: any, index: number) => ({
        id: `${subjectKey}_ch${chapterNum}_b${index + 1}`,
        title: note.conceptHeading,
        iconName: icons[index % icons.length],
        colorTheme: colors[index % colors.length],
        whatDoesItMean: note.simpleMeaning,
        exactDefinition: note.simpleMeaning,
        keyPoints: note.keyPoints,
        formula: note.formula,
        example: note.easyExample,
        commonMistakes: note.commonMistakes,
        realLifeApp: note.shortSummary
      }))
    };
  }

  // Fallback to first map in subject, or math_1a chapter 1
  if (subjectMaps && Object.keys(subjectMaps).length > 0) {
    const firstKey = Number(Object.keys(subjectMaps)[0]);
    return subjectMaps[firstKey];
  }
  return ALL_SUBJECT_MIND_MAPS.math_1a[1];
}
