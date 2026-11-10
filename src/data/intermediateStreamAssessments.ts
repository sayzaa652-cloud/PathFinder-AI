import { Assessment, AssessmentQuestion, MCQOption } from '../types';

/**
 * Question Bank for Intermediate Streams:
 * Class 10 foundational level questions for First Year Intermediate entrants.
 * Strictly conforms to:
 * 1. 4 homogeneous options per question (A, B, C, D) belonging to the same subject/topic.
 * 2. Exactly one correct answer with simple, beginner-friendly explanations.
 * 3. Commerce: NO debits, credits, journal entries, ledgers, trial balances, or balance sheets. Everyday business only.
 * 4. Computer Science: NO coding/programming assumption. Everyday computer parts, OS, internet, safety only.
 * 5. Dedicated Aptitude: 10 questions for every stream.
 */

// -------------------------------------------------------------
// MATHEMATICS QUESTIONS (Class 10 Foundational Level)
// -------------------------------------------------------------
export const MATH_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'MATH-01',
    question: 'What is the value of x if 2x + 6 = 16?',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '5' },
      { id: 'C', text: '7' },
      { id: 'D', text: '10' }
    ],
    correctAnswer: 'B',
    explanation: 'Subtract 6 from both sides: 2x = 10. Divide both sides by 2: x = 5.',
    difficulty: 'Easy',
    topic: 'Mathematics 1A',
    subtopic: 'Linear Equations'
  },
  {
    id: 'MATH-02',
    question: 'What is 15% of 200?',
    options: [
      { id: 'A', text: '20' },
      { id: 'B', text: '25' },
      { id: 'C', text: '30' },
      { id: 'D', text: '35' }
    ],
    correctAnswer: 'C',
    explanation: '15% of 200 = (15 / 100) * 200 = 15 * 2 = 30.',
    difficulty: 'Easy',
    topic: 'Mathematics 1A',
    subtopic: 'Percentages'
  },
  {
    id: 'MATH-03',
    question: 'In a right-angled triangle, if the two shorter sides are 3 cm and 4 cm, what is the length of the hypotenuse?',
    options: [
      { id: 'A', text: '5 cm' },
      { id: 'B', text: '6 cm' },
      { id: 'C', text: '7 cm' },
      { id: 'D', text: '8 cm' }
    ],
    correctAnswer: 'A',
    explanation: 'By Pythagoras theorem: Hypotenuse^2 = 3^2 + 4^2 = 9 + 16 = 25. Square root of 25 is 5 cm.',
    difficulty: 'Easy',
    topic: 'Mathematics 1B',
    subtopic: 'Geometry'
  },
  {
    id: 'MATH-04',
    question: 'What is the perimeter of a rectangle with length 8 cm and width 5 cm?',
    options: [
      { id: 'A', text: '13 cm' },
      { id: 'B', text: '26 cm' },
      { id: 'C', text: '40 cm' },
      { id: 'D', text: '36 cm' }
    ],
    correctAnswer: 'B',
    explanation: 'Perimeter of a rectangle = 2 * (length + width) = 2 * (8 + 5) = 2 * 13 = 26 cm.',
    difficulty: 'Easy',
    topic: 'Mathematics 1B',
    subtopic: 'Mensuration'
  },
  {
    id: 'MATH-05',
    question: 'If a car travels 120 kilometers in 2 hours at constant speed, what is its speed?',
    options: [
      { id: 'A', text: '50 km/h' },
      { id: 'B', text: '55 km/h' },
      { id: 'C', text: '60 km/h' },
      { id: 'D', text: '65 km/h' }
    ],
    correctAnswer: 'C',
    explanation: 'Speed = Distance / Time = 120 km / 2 hours = 60 km/h.',
    difficulty: 'Easy',
    topic: 'Mathematics 1B',
    subtopic: 'Speed and Distance'
  },
  {
    id: 'MATH-06',
    question: 'What is the mean (average) of the numbers 10, 15, 20, 25, and 30?',
    options: [
      { id: 'A', text: '18' },
      { id: 'B', text: '20' },
      { id: 'C', text: '22' },
      { id: 'D', text: '25' }
    ],
    correctAnswer: 'B',
    explanation: 'Sum = 10 + 15 + 20 + 25 + 30 = 100. Average = 100 / 5 = 20.',
    difficulty: 'Easy',
    topic: 'Mathematics 1B',
    subtopic: 'Statistics'
  },
  {
    id: 'MATH-07',
    question: 'In the arithmetic sequence 4, 7, 10, 13, [ ? ], what is the common difference?',
    options: [
      { id: 'A', text: '2' },
      { id: 'B', text: '3' },
      { id: 'C', text: '4' },
      { id: 'D', text: '5' }
    ],
    correctAnswer: 'B',
    explanation: 'Common difference = 7 - 4 = 3.',
    difficulty: 'Easy',
    topic: 'Mathematics 1A',
    subtopic: 'Sequences'
  },
  {
    id: 'MATH-08',
    question: 'What is the probability of getting heads when flipping a fair coin?',
    options: [
      { id: 'A', text: '1/4' },
      { id: 'B', text: '1/3' },
      { id: 'C', text: '1/2' },
      { id: 'D', text: '1' }
    ],
    correctAnswer: 'C',
    explanation: 'A fair coin has 2 possible outcomes (Heads, Tails). Probability of heads is 1 out of 2 = 1/2.',
    difficulty: 'Easy',
    topic: 'Mathematics 1A',
    subtopic: 'Probability'
  },
  {
    id: 'MATH-09',
    question: 'What is the area of a square whose side measures 6 cm?',
    options: [
      { id: 'A', text: '12 cm²' },
      { id: 'B', text: '24 cm²' },
      { id: 'C', text: '36 cm²' },
      { id: 'D', text: '48 cm²' }
    ],
    correctAnswer: 'C',
    explanation: 'Area of square = side * side = 6 * 6 = 36 cm².',
    difficulty: 'Easy',
    topic: 'Mathematics',
    subtopic: 'Mensuration'
  },
  {
    id: 'MATH-10',
    question: 'If 3 pens cost ₹45, how much will 5 pens cost?',
    options: [
      { id: 'A', text: '₹60' },
      { id: 'B', text: '₹75' },
      { id: 'C', text: '₹80' },
      { id: 'D', text: '₹90' }
    ],
    correctAnswer: 'B',
    explanation: 'Cost of 1 pen = ₹45 / 3 = ₹15. Cost of 5 pens = 5 * ₹15 = ₹75.',
    difficulty: 'Easy',
    topic: 'Mathematics',
    subtopic: 'Unitary Method'
  }
];

// -------------------------------------------------------------
// PHYSICS QUESTIONS (Class 10 Foundational Level)
// -------------------------------------------------------------
export const PHYSICS_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'PHYS-01',
    question: 'What is the standard unit of electric current?',
    options: [
      { id: 'A', text: 'Volt' },
      { id: 'B', text: 'Watt' },
      { id: 'C', text: 'Ampere' },
      { id: 'D', text: 'Ohm' }
    ],
    correctAnswer: 'C',
    explanation: 'Electric current is measured in Amperes (A). Volt is potential difference, and Ohm is resistance.',
    difficulty: 'Easy',
    topic: 'Physics',
    subtopic: 'Electricity'
  },
  {
    id: 'PHYS-02',
    question: 'Which law states that an object at rest will stay at rest unless an external force acts on it?',
    options: [
      { id: 'A', text: "Newton's First Law of Motion" },
      { id: 'B', text: "Newton's Second Law of Motion" },
      { id: 'C', text: "Newton's Third Law of Motion" },
      { id: 'D', text: "Law of Conservation of Momentum" }
    ],
    correctAnswer: 'A',
    explanation: "Newton's first law (law of inertia) explains that objects resist changes to their state of motion.",
    difficulty: 'Easy',
    topic: 'Physics',
    subtopic: 'Force and Motion'
  },
  {
    id: 'PHYS-03',
    question: 'What type of mirror is commonly used by dentists to see enlarged images of teeth?',
    options: [
      { id: 'A', text: 'Plane mirror' },
      { id: 'B', text: 'Convex mirror' },
      { id: 'C', text: 'Concave mirror' },
      { id: 'D', text: 'Cylindrical mirror' }
    ],
    correctAnswer: 'C',
    explanation: 'A concave mirror produces an enlarged, upright image when an object is held close to it.',
    difficulty: 'Easy',
    topic: 'Physics',
    subtopic: 'Light & Optics'
  },
  {
    id: 'PHYS-04',
    question: 'According to Ohm’s law, what is the formula relating voltage (V), current (I), and resistance (R)?',
    options: [
      { id: 'A', text: 'V = I / R' },
      { id: 'B', text: 'V = I * R' },
      { id: 'C', text: 'V = R / I' },
      { id: 'D', text: 'V = I + R' }
    ],
    correctAnswer: 'B',
    explanation: 'Ohm’s law states that potential difference is proportional to current: V = I * R.',
    difficulty: 'Easy',
    topic: 'Physics',
    subtopic: 'Electricity'
  },
  {
    id: 'PHYS-05',
    question: 'What form of energy does a stretched rubber band possess before being released?',
    options: [
      { id: 'A', text: 'Kinetic energy' },
      { id: 'B', text: 'Thermal energy' },
      { id: 'C', text: 'Potential energy' },
      { id: 'D', text: 'Chemical energy' }
    ],
    correctAnswer: 'C',
    explanation: 'A stretched rubber band stores elastic potential energy due to its deformed position.',
    difficulty: 'Easy',
    topic: 'Physics',
    subtopic: 'Work and Energy'
  },
  {
    id: 'PHYS-06',
    question: 'Which instrument is used to measure electric potential difference (voltage) across a circuit component?',
    options: [
      { id: 'A', text: 'Ammeter' },
      { id: 'B', text: 'Voltmeter' },
      { id: 'C', text: 'Galvanometer' },
      { id: 'D', text: 'Barometer' }
    ],
    correctAnswer: 'B',
    explanation: 'A voltmeter is connected in parallel to measure voltage across two points.',
    difficulty: 'Easy',
    topic: 'Physics',
    subtopic: 'Electricity'
  },
  {
    id: 'PHYS-07',
    question: 'What is the bending of light as it passes from air into water called?',
    options: [
      { id: 'A', text: 'Reflection' },
      { id: 'B', text: 'Refraction' },
      { id: 'C', text: 'Diffraction' },
      { id: 'D', text: 'Dispersion' }
    ],
    correctAnswer: 'B',
    explanation: 'Refraction is the change in direction of light when passing between media of different densities.',
    difficulty: 'Easy',
    topic: 'Physics',
    subtopic: 'Light & Optics'
  },
  {
    id: 'PHYS-08',
    question: 'What is the rate of doing work or consuming electrical energy called?',
    options: [
      { id: 'A', text: 'Power' },
      { id: 'B', text: 'Force' },
      { id: 'C', text: 'Momentum' },
      { id: 'D', text: 'Pressure' }
    ],
    correctAnswer: 'A',
    explanation: 'Power is the rate at which work is done or energy is transferred (measured in Watts).',
    difficulty: 'Easy',
    topic: 'Physics',
    subtopic: 'Work and Energy'
  }
];

// -------------------------------------------------------------
// CHEMISTRY QUESTIONS (Class 10 Foundational Level)
// -------------------------------------------------------------
export const CHEMISTRY_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'CHEM-01',
    question: 'What is the chemical formula of common table salt?',
    options: [
      { id: 'A', text: 'NaCl' },
      { id: 'B', text: 'KCl' },
      { id: 'C', text: 'HCl' },
      { id: 'D', text: 'NaOH' }
    ],
    correctAnswer: 'A',
    explanation: 'Common salt is Sodium Chloride, written as NaCl.',
    difficulty: 'Easy',
    topic: 'Chemistry',
    subtopic: 'Chemical Compounds'
  },
  {
    id: 'CHEM-02',
    question: 'What is the pH value of pure distilled water at room temperature?',
    options: [
      { id: 'A', text: '2' },
      { id: 'B', text: '5' },
      { id: 'C', text: '7' },
      { id: 'D', text: '12' }
    ],
    correctAnswer: 'C',
    explanation: 'Pure water is neutral on the pH scale with a pH of 7.',
    difficulty: 'Easy',
    topic: 'Chemistry',
    subtopic: 'Acids and Bases'
  },
  {
    id: 'CHEM-03',
    question: 'Which gas is released when dilute hydrochloric acid reacts with zinc metal granules?',
    options: [
      { id: 'A', text: 'Oxygen' },
      { id: 'B', text: 'Carbon dioxide' },
      { id: 'C', text: 'Nitrogen' },
      { id: 'D', text: 'Hydrogen' }
    ],
    correctAnswer: 'D',
    explanation: 'Metals react with acids to form metal salts and release hydrogen gas (Zn + 2HCl -> ZnCl2 + H2).',
    difficulty: 'Easy',
    topic: 'Chemistry',
    subtopic: 'Chemical Reactions'
  },
  {
    id: 'CHEM-04',
    question: 'What colour does blue litmus paper turn when dipped in lemon juice (acidic)?',
    options: [
      { id: 'A', text: 'Red' },
      { id: 'B', text: 'Green' },
      { id: 'C', text: 'Yellow' },
      { id: 'D', text: 'Colourless' }
    ],
    correctAnswer: 'A',
    explanation: 'Acids turn blue litmus paper red.',
    difficulty: 'Easy',
    topic: 'Chemistry',
    subtopic: 'Acids and Bases'
  },
  {
    id: 'CHEM-05',
    question: 'Rusting of iron in moist air is an example of what type of chemical reaction?',
    options: [
      { id: 'A', text: 'Oxidation' },
      { id: 'B', text: 'Reduction alone' },
      { id: 'C', text: 'Sublimation' },
      { id: 'D', text: 'Neutralization' }
    ],
    correctAnswer: 'A',
    explanation: 'Iron combines with atmospheric oxygen and moisture to form hydrated iron oxide (rust) via oxidation.',
    difficulty: 'Easy',
    topic: 'Chemistry',
    subtopic: 'Chemical Reactions'
  },
  {
    id: 'CHEM-06',
    question: 'Which of the following is the lightest and most abundant gas in the universe?',
    options: [
      { id: 'A', text: 'Helium' },
      { id: 'B', text: 'Hydrogen' },
      { id: 'C', text: 'Oxygen' },
      { id: 'D', text: 'Argon' }
    ],
    correctAnswer: 'B',
    explanation: 'Hydrogen has an atomic number of 1 and is the lightest, most abundant element in the universe.',
    difficulty: 'Easy',
    topic: 'Chemistry',
    subtopic: 'Elements & Periodic Table'
  },
  {
    id: 'CHEM-07',
    question: 'Which non-metal is a good conductor of electricity?',
    options: [
      { id: 'A', text: 'Sulfur' },
      { id: 'B', text: 'Phosphorus' },
      { id: 'C', text: 'Graphite' },
      { id: 'D', text: 'Diamond' }
    ],
    correctAnswer: 'C',
    explanation: 'Graphite is an allotrope of carbon that has delocalized electrons, allowing it to conduct electricity.',
    difficulty: 'Easy',
    topic: 'Chemistry',
    subtopic: 'Metals & Non-metals'
  },
  {
    id: 'CHEM-08',
    question: 'What is the chemical formula for water?',
    options: [
      { id: 'A', text: 'HO' },
      { id: 'B', text: 'H2O' },
      { id: 'C', text: 'H2O2' },
      { id: 'D', text: 'CO2' }
    ],
    correctAnswer: 'B',
    explanation: 'Water consists of two hydrogen atoms bonded to one oxygen atom: H2O.',
    difficulty: 'Easy',
    topic: 'Chemistry',
    subtopic: 'Chemical Compounds'
  }
];

// -------------------------------------------------------------
// BIOLOGY QUESTIONS (Class 10 Foundational Level)
// -------------------------------------------------------------
export const BIOLOGY_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'BIO-01',
    question: 'Which organelle is widely known as the powerhouse of the cell?',
    options: [
      { id: 'A', text: 'Ribosome' },
      { id: 'B', text: 'Mitochondrion' },
      { id: 'C', text: 'Golgi apparatus' },
      { id: 'D', text: 'Lysosome' }
    ],
    correctAnswer: 'B',
    explanation: 'Mitochondria generate energy in the form of ATP during cellular respiration.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Cell Biology'
  },
  {
    id: 'BIO-02',
    question: 'Which green pigment in plant leaves absorbs sunlight to carry out photosynthesis?',
    options: [
      { id: 'A', text: 'Hemoglobin' },
      { id: 'B', text: 'Carotene' },
      { id: 'C', text: 'Chlorophyll' },
      { id: 'D', text: 'Melanin' }
    ],
    correctAnswer: 'C',
    explanation: 'Chlorophyll captures solar energy inside chloroplasts for photosynthesis.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Plant Physiology'
  },
  {
    id: 'BIO-03',
    question: 'What type of blood cells carry oxygen from the lungs to tissues throughout the body?',
    options: [
      { id: 'A', text: 'White Blood Cells' },
      { id: 'B', text: 'Red Blood Cells' },
      { id: 'C', text: 'Platelets' },
      { id: 'D', text: 'Plasma cells' }
    ],
    correctAnswer: 'B',
    explanation: 'Red Blood Cells contain hemoglobin, an iron-rich protein that binds and transports oxygen.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Human Physiology'
  },
  {
    id: 'BIO-04',
    question: 'Which human organ is responsible for filtering waste products from the blood to make urine?',
    options: [
      { id: 'A', text: 'Liver' },
      { id: 'B', text: 'Kidneys' },
      { id: 'C', text: 'Stomach' },
      { id: 'D', text: 'Pancreas' }
    ],
    correctAnswer: 'B',
    explanation: 'The kidneys filter blood through nephrons to remove urea and excess fluid as urine.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Excretory System'
  },
  {
    id: 'BIO-05',
    question: 'Who is recognized as the father of modern genetics for his experiments on pea plants?',
    options: [
      { id: 'A', text: 'Charles Darwin' },
      { id: 'B', text: 'Gregor Mendel' },
      { id: 'C', text: 'Louis Pasteur' },
      { id: 'D', text: 'Robert Hooke' }
    ],
    correctAnswer: 'B',
    explanation: 'Gregor Mendel discovered fundamental laws of inheritance through breeding garden peas.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Genetics'
  },
  {
    id: 'BIO-06',
    question: 'Tiny openings on the lower surface of leaves that regulate gas exchange and transpiration are called:',
    options: [
      { id: 'A', text: 'Stomata' },
      { id: 'B', text: 'Veins' },
      { id: 'C', text: 'Petals' },
      { id: 'D', text: 'Root hairs' }
    ],
    correctAnswer: 'A',
    explanation: 'Stomata are microscopic pores guarded by specialized guard cells that control gas exchange.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Plant Physiology'
  },
  {
    id: 'BIO-07',
    question: 'Which gas is taken in by green plants from the atmosphere during photosynthesis?',
    options: [
      { id: 'A', text: 'Oxygen' },
      { id: 'B', text: 'Carbon dioxide' },
      { id: 'C', text: 'Nitrogen' },
      { id: 'D', text: 'Hydrogen' }
    ],
    correctAnswer: 'B',
    explanation: 'Plants absorb carbon dioxide from air and water from soil to produce glucose and oxygen.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Plant Physiology'
  },
  {
    id: 'BIO-08',
    question: 'What is the basic functional unit of the human nervous system?',
    options: [
      { id: 'A', text: 'Nephron' },
      { id: 'B', text: 'Neuron' },
      { id: 'C', text: 'Alveolus' },
      { id: 'D', text: 'Hepatocyte' }
    ],
    correctAnswer: 'B',
    explanation: 'A neuron (nerve cell) is the fundamental structural and functional unit that transmits electrical impulses.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Nervous System'
  },
  {
    id: 'BIO-09',
    question: 'Which chamber of the human heart pumps oxygenated blood into the aorta to supply the entire body?',
    options: [
      { id: 'A', text: 'Right Atrium' },
      { id: 'B', text: 'Right Ventricle' },
      { id: 'C', text: 'Left Ventricle' },
      { id: 'D', text: 'Left Atrium' }
    ],
    correctAnswer: 'C',
    explanation: 'The left ventricle has thick muscular walls to pump oxygen-rich blood throughout systemic circulation.',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Circulatory System'
  },
  {
    id: 'BIO-10',
    question: 'In an ecological food chain, green plants that produce their own food are called:',
    options: [
      { id: 'A', text: 'Primary consumers' },
      { id: 'B', text: 'Decomposers' },
      { id: 'C', text: 'Producers' },
      { id: 'D', text: 'Carnivores' }
    ],
    correctAnswer: 'C',
    explanation: 'Plants synthesize organic food using sunlight and are classified as producers (autotrophs).',
    difficulty: 'Easy',
    topic: 'Biology',
    subtopic: 'Ecology'
  }
];

// -------------------------------------------------------------
// ECONOMICS QUESTIONS (Class 10 Foundational Level)
// -------------------------------------------------------------
export const ECONOMICS_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'ECON-01',
    question: 'Which sector of the economy includes agriculture, forestry, dairy, and fishing?',
    options: [
      { id: 'A', text: 'Primary sector' },
      { id: 'B', text: 'Secondary sector' },
      { id: 'C', text: 'Tertiary sector' },
      { id: 'D', text: 'Information sector' }
    ],
    correctAnswer: 'A',
    explanation: 'The primary sector extracts or harvests natural products directly from nature.',
    difficulty: 'Easy',
    topic: 'Economics',
    subtopic: 'Sectors of Economy'
  },
  {
    id: 'ECON-02',
    question: 'What is the system where goods are directly exchanged for other goods without using money?',
    options: [
      { id: 'A', text: 'Monetary system' },
      { id: 'B', text: 'Barter system' },
      { id: 'C', text: 'Credit system' },
      { id: 'D', text: 'Banking system' }
    ],
    correctAnswer: 'B',
    explanation: 'In a barter system, trade occurs by directly exchanging goods without standard currency.',
    difficulty: 'Easy',
    topic: 'Economics',
    subtopic: 'Money and Credit'
  },
  {
    id: 'ECON-03',
    question: 'What central bank issues currency notes and regulates commercial banks in India?',
    options: [
      { id: 'A', text: 'State Bank of India (SBI)' },
      { id: 'B', text: 'Reserve Bank of India (RBI)' },
      { id: 'C', text: 'Bank of Baroda' },
      { id: 'D', text: 'Punjab National Bank' }
    ],
    correctAnswer: 'B',
    explanation: 'The Reserve Bank of India (RBI) is the supreme monetary authority and central bank of India.',
    difficulty: 'Easy',
    topic: 'Economics',
    subtopic: 'Banking & Money'
  },
  {
    id: 'ECON-04',
    question: 'When the demand for a product increases while supply remains limited, what usually happens to its price?',
    options: [
      { id: 'A', text: 'Price falls' },
      { id: 'B', text: 'Price stays unchanged' },
      { id: 'C', text: 'Price rises' },
      { id: 'D', text: 'Price drops to zero' }
    ],
    correctAnswer: 'C',
    explanation: 'Higher demand with fixed supply pushes competitive bidding upward, leading to higher prices.',
    difficulty: 'Easy',
    topic: 'Economics',
    subtopic: 'Demand and Supply'
  },
  {
    id: 'ECON-05',
    question: 'Which of the following is considered a basic factor of production?',
    options: [
      { id: 'A', text: 'Labour' },
      { id: 'B', text: 'Luxury' },
      { id: 'C', text: 'Wants' },
      { id: 'D', text: 'Advertisement' }
    ],
    correctAnswer: 'A',
    explanation: 'The four fundamental factors of production are Land, Labour, Capital, and Entrepreneurship.',
    difficulty: 'Easy',
    topic: 'Economics',
    subtopic: 'Factors of Production'
  },
  {
    id: 'ECON-06',
    question: 'What term describes a general and steady rise in the average prices of goods and services over time?',
    options: [
      { id: 'A', text: 'Deflation' },
      { id: 'B', text: 'Inflation' },
      { id: 'C', text: 'Depression' },
      { id: 'D', text: 'Recession' }
    ],
    correctAnswer: 'B',
    explanation: 'Inflation is the rate at which general price levels rise, reducing purchasing power.',
    difficulty: 'Easy',
    topic: 'Economics',
    subtopic: 'Macroeconomics Basics'
  },
  {
    id: 'ECON-07',
    question: 'Services such as transport, healthcare, education, and banking belong to which sector?',
    options: [
      { id: 'A', text: 'Primary sector' },
      { id: 'B', text: 'Secondary sector' },
      { id: 'C', text: 'Tertiary sector' },
      { id: 'D', text: 'Manufacturing sector' }
    ],
    correctAnswer: 'C',
    explanation: 'The tertiary (service) sector provides support activities and intangible services rather than physical goods.',
    difficulty: 'Easy',
    topic: 'Economics',
    subtopic: 'Sectors of Economy'
  },
  {
    id: 'ECON-08',
    question: 'The money left over after a person spends on necessities from their income is called:',
    options: [
      { id: 'A', text: 'Debt' },
      { id: 'B', text: 'Savings' },
      { id: 'C', text: 'Loan' },
      { id: 'D', text: 'Expense' }
    ],
    correctAnswer: 'B',
    explanation: 'Savings represent income that is not spent on immediate consumption.',
    difficulty: 'Easy',
    topic: 'Economics',
    subtopic: 'Personal Finance'
  }
];

// -------------------------------------------------------------
// COMMERCE QUESTIONS (Class 10 Foundational Level)
// Strictly Everyday Business: NO debits, credits, journals, ledgers, balance sheets!
// -------------------------------------------------------------
export const COMMERCE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'COMM-01',
    question: 'If a shopkeeper buys a book for ₹100 and sells it for ₹130, what has the shopkeeper made?',
    options: [
      { id: 'A', text: 'A loss of ₹30' },
      { id: 'B', text: 'A profit of ₹30' },
      { id: 'C', text: 'No profit and no loss' },
      { id: 'D', text: 'A discount of ₹30' }
    ],
    correctAnswer: 'B',
    explanation: 'Selling price (₹130) is greater than cost price (₹100). Profit = ₹130 - ₹100 = ₹30.',
    difficulty: 'Easy',
    topic: 'Commerce',
    subtopic: 'Profit and Loss'
  },
  {
    id: 'COMM-02',
    question: 'What is the trade activity where goods are sold directly to the final consumer in small quantities called?',
    options: [
      { id: 'A', text: 'Wholesale trade' },
      { id: 'B', text: 'Retail trade' },
      { id: 'C', text: 'Export trade' },
      { id: 'D', text: 'Import trade' }
    ],
    correctAnswer: 'B',
    explanation: 'Retail trade involves selling goods in small quantities directly to individual consumers.',
    difficulty: 'Easy',
    topic: 'Commerce',
    subtopic: 'Trade Types'
  },
  {
    id: 'COMM-03',
    question: 'Buying and selling goods using the internet and digital devices is known as:',
    options: [
      { id: 'A', text: 'Barter trade' },
      { id: 'B', text: 'E-commerce' },
      { id: 'C', text: 'Postal trade' },
      { id: 'D', text: 'Direct barter' }
    ],
    correctAnswer: 'B',
    explanation: 'Electronic commerce (E-commerce) refers to commercial transactions conducted electronically over the internet.',
    difficulty: 'Easy',
    topic: 'Commerce',
    subtopic: 'Digital Commerce'
  },
  {
    id: 'COMM-04',
    question: 'Why should a customer always ask for a cash memo or bill when purchasing goods?',
    options: [
      { id: 'A', text: 'It acts as legal proof of purchase for warranties and returns' },
      { id: 'B', text: 'It automatically makes the product free of cost' },
      { id: 'C', text: 'It is required to dispose of the packaging' },
      { id: 'D', text: 'It changes the expiry date of the product' }
    ],
    correctAnswer: 'A',
    explanation: 'A cash memo or tax invoice provides proof of transaction and protects consumer rights in case of defective goods.',
    difficulty: 'Easy',
    topic: 'Commerce',
    subtopic: 'Consumer Rights'
  },
  {
    id: 'COMM-05',
    question: 'A trader who buys goods in very large quantities from factories and sells them to shopkeepers is called a:',
    options: [
      { id: 'A', text: 'Wholesaler' },
      { id: 'B', text: 'Consumer' },
      { id: 'C', text: 'Hawker' },
      { id: 'D', text: 'Retail buyer' }
    ],
    correctAnswer: 'A',
    explanation: 'Wholesalers act as middlemen who purchase bulk goods from manufacturers and distribute them to retailers.',
    difficulty: 'Easy',
    topic: 'Commerce',
    subtopic: 'Trade Middlemen'
  },
  {
    id: 'COMM-06',
    question: 'Which of the following is an electronic method for making instant cashless payments using a mobile phone in India?',
    options: [
      { id: 'A', text: 'UPI (Unified Payments Interface)' },
      { id: 'B', text: 'Cheque deposit slip' },
      { id: 'C', text: 'Postal money order' },
      { id: 'D', text: 'Paper token' }
    ],
    correctAnswer: 'A',
    explanation: 'UPI allows instant real-time bank transfers and digital payments via smartphones.',
    difficulty: 'Easy',
    topic: 'Commerce',
    subtopic: 'Banking & Payments'
  },
  {
    id: 'COMM-07',
    question: 'What is the primary purpose of a commercial bank savings account?',
    options: [
      { id: 'A', text: 'To safely store money and earn modest interest' },
      { id: 'B', text: 'To manufacture retail goods' },
      { id: 'C', text: 'To print paper currency notes' },
      { id: 'D', text: 'To fix commodity prices' }
    ],
    correctAnswer: 'A',
    explanation: 'A savings account provides individuals with safe deposit facilities, liquidity, and periodic interest earnings.',
    difficulty: 'Easy',
    topic: 'Commerce',
    subtopic: 'Banking Basics'
  },
  {
    id: 'COMM-08',
    question: 'A contract that provides financial compensation against unexpected losses such as fire or theft is called:',
    options: [
      { id: 'A', text: 'Mortgage' },
      { id: 'B', text: 'Insurance' },
      { id: 'C', text: 'Auction' },
      { id: 'D', text: 'Lease' }
    ],
    correctAnswer: 'B',
    explanation: 'Insurance provides financial protection and risk management against potential future losses.',
    difficulty: 'Easy',
    topic: 'Commerce',
    subtopic: 'Business Services'
  }
];

// -------------------------------------------------------------
// CIVICS QUESTIONS (Class 10 Foundational Level)
// -------------------------------------------------------------
export const CIVICS_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'CIV-01',
    question: 'What is the supreme legal document of India that lays down the framework of government and laws?',
    options: [
      { id: 'A', text: 'The Indian Penal Code' },
      { id: 'B', text: 'The Constitution of India' },
      { id: 'C', text: 'The Parliamentary Gazette' },
      { id: 'D', text: 'The Supreme Court Register' }
    ],
    correctAnswer: 'B',
    explanation: 'The Constitution of India is the supreme law of the land, establishing fundamental rights and state powers.',
    difficulty: 'Easy',
    topic: 'Civics',
    subtopic: 'Constitution of India'
  },
  {
    id: 'CIV-02',
    question: 'What is the minimum voting age for an Indian citizen in general democratic elections?',
    options: [
      { id: 'A', text: '16 years' },
      { id: 'B', text: '18 years' },
      { id: 'C', text: '21 years' },
      { id: 'D', text: '25 years' }
    ],
    correctAnswer: 'B',
    explanation: 'Under Universal Adult Suffrage, any Indian citizen aged 18 or above has the constitutional right to vote.',
    difficulty: 'Easy',
    topic: 'Civics',
    subtopic: 'Elections and Democracy'
  },
  {
    id: 'CIV-03',
    question: 'Who is recognized as the chief architect and chairman of the Drafting Committee of the Indian Constitution?',
    options: [
      { id: 'A', text: 'Mahatma Gandhi' },
      { id: 'B', text: 'Dr. B. R. Ambedkar' },
      { id: 'C', text: 'Jawaharlal Nehru' },
      { id: 'D', text: 'Sardar Vallabhbhai Patel' }
    ],
    correctAnswer: 'B',
    explanation: 'Dr. B. R. Ambedkar served as the chairman of the Drafting Committee that formulated the Indian Constitution.',
    difficulty: 'Easy',
    topic: 'Civics',
    subtopic: 'Constitutional History'
  },
  {
    id: 'CIV-04',
    question: 'Which of the following is guaranteed as a Fundamental Right under the Indian Constitution?',
    options: [
      { id: 'A', text: 'Right to Equality' },
      { id: 'B', text: 'Right to free luxury items' },
      { id: 'C', text: 'Right to avoid taxes' },
      { id: 'D', text: 'Right to violate traffic laws' }
    ],
    correctAnswer: 'A',
    explanation: 'Right to Equality (Articles 14-18) ensures equal treatment before the law without discrimination.',
    difficulty: 'Easy',
    topic: 'Civics',
    subtopic: 'Fundamental Rights'
  },
  {
    id: 'CIV-05',
    question: 'The Indian Parliament consists of the President and which two houses?',
    options: [
      { id: 'A', text: 'Lok Sabha and Rajya Sabha' },
      { id: 'B', text: 'Vidhan Sabha and Vidhan Parishad' },
      { id: 'C', text: 'Supreme Court and High Court' },
      { id: 'D', text: 'Municipal Council and Panchayat' }
    ],
    correctAnswer: 'A',
    explanation: 'The Union Parliament comprises the President, Lok Sabha (House of the People), and Rajya Sabha (Council of States).',
    difficulty: 'Easy',
    topic: 'Civics',
    subtopic: 'Union Parliament'
  },
  {
    id: 'CIV-06',
    question: 'What is the highest judicial court of appeal in India?',
    options: [
      { id: 'A', text: 'High Court' },
      { id: 'B', text: 'District Court' },
      { id: 'C', text: 'Supreme Court of India' },
      { id: 'D', text: 'Sub-divisional Magistrate Court' }
    ],
    correctAnswer: 'C',
    explanation: 'The Supreme Court of India located in New Delhi is the apex court and guardian of the Constitution.',
    difficulty: 'Easy',
    topic: 'Civics',
    subtopic: 'Judiciary'
  },
  {
    id: 'CIV-07',
    question: 'Local self-government in rural Indian villages is managed by:',
    options: [
      { id: 'A', text: 'Gram Panchayat' },
      { id: 'B', text: 'Municipal Corporation' },
      { id: 'C', text: 'State Assembly' },
      { id: 'D', text: 'Port Trust' }
    ],
    correctAnswer: 'A',
    explanation: 'Gram Panchayats constitute the grassroots level of the Panchayati Raj rural local self-government system.',
    difficulty: 'Easy',
    topic: 'Civics',
    subtopic: 'Local Self-Government'
  },
  {
    id: 'CIV-08',
    question: 'A government where the head of state is elected by the citizens rather than being a hereditary monarch is called a:',
    options: [
      { id: 'A', text: 'Monarchy' },
      { id: 'B', text: 'Republic' },
      { id: 'C', text: 'Dictatorship' },
      { id: 'D', text: 'Feudal rule' }
    ],
    correctAnswer: 'B',
    explanation: 'A republic is a country where supreme power is held by the people and their elected representatives with an elected president.',
    difficulty: 'Easy',
    topic: 'Civics',
    subtopic: 'Democratic Principles'
  }
];

// -------------------------------------------------------------
// HISTORY QUESTIONS (Class 10 Foundational Level)
// -------------------------------------------------------------
export const HISTORY_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'HIST-01',
    question: 'Which ancient urban civilization in the Indian subcontinent is famous for its planned brick cities and the Great Bath?',
    options: [
      { id: 'A', text: 'Roman Civilization' },
      { id: 'B', text: 'Indus Valley (Harappan) Civilization' },
      { id: 'C', text: 'Mesopotamian Civilization' },
      { id: 'D', text: 'Mayan Civilization' }
    ],
    correctAnswer: 'B',
    explanation: 'The Indus Valley (Harappan) civilization developed sophisticated drainage, grid-based city streets, and brick structures.',
    difficulty: 'Easy',
    topic: 'History',
    subtopic: 'Ancient India'
  },
  {
    id: 'HIST-02',
    question: 'In which year did India officially achieve independence from British colonial rule?',
    options: [
      { id: 'A', text: '1942' },
      { id: 'B', text: '1947' },
      { id: 'C', text: '1950' },
      { id: 'D', text: '1952' }
    ],
    correctAnswer: 'B',
    explanation: 'India gained national independence on August 15, 1947.',
    difficulty: 'Easy',
    topic: 'History',
    subtopic: 'Modern Indian History'
  },
  {
    id: 'HIST-03',
    question: 'Who led the famous Dandi Salt March in 1930 as a peaceful protest against colonial salt taxes?',
    options: [
      { id: 'A', text: 'Bhagat Singh' },
      { id: 'B', text: 'Mahatma Gandhi' },
      { id: 'C', text: 'Subhas Chandra Bose' },
      { id: 'D', text: 'Bal Gangadhar Tilak' }
    ],
    correctAnswer: 'B',
    explanation: 'Mahatma Gandhi led the 24-day Salt March to Dandi to break the British salt monopoly through non-violent satyagraha.',
    difficulty: 'Easy',
    topic: 'History',
    subtopic: 'Freedom Struggle'
  },
  {
    id: 'HIST-04',
    question: 'Which great Mauryan emperor renounced military warfare after witnessing the human devastation of the Kalinga War?',
    options: [
      { id: 'A', text: 'Chandragupta Maurya' },
      { id: 'B', text: 'Emperor Ashoka' },
      { id: 'C', text: 'Samudragupta' },
      { id: 'D', text: 'Harsha' }
    ],
    correctAnswer: 'B',
    explanation: 'Emperor Ashoka embraced Buddhism and propagated non-violence (Dhamma) after the Kalinga war.',
    difficulty: 'Easy',
    topic: 'History',
    subtopic: 'Ancient India'
  },
  {
    id: 'HIST-05',
    question: 'On what date did the Constitution of India come into effect, celebrated annually as Republic Day?',
    options: [
      { id: 'A', text: 'August 15, 1947' },
      { id: 'B', text: 'January 26, 1950' },
      { id: 'C', text: 'October 2, 1869' },
      { id: 'D', text: 'November 26, 1949' }
    ],
    correctAnswer: 'B',
    explanation: 'The Indian Constitution officially took effect on January 26, 1950, transitioning India into a sovereign republic.',
    difficulty: 'Easy',
    topic: 'History',
    subtopic: 'Making of the Republic'
  },
  {
    id: 'HIST-06',
    question: 'The Revolt of 1857 is widely described by Indian historians as:',
    options: [
      { id: 'A', text: 'The First War of Indian Independence' },
      { id: 'B', text: 'The Battle of Plassey' },
      { id: 'C', text: 'The Non-Cooperation Movement' },
      { id: 'D', text: 'The Civil Disobedience Campaign' }
    ],
    correctAnswer: 'A',
    explanation: 'The widespread rebellion of 1857 against the British East India Company is known as the First War of Indian Independence.',
    difficulty: 'Easy',
    topic: 'History',
    subtopic: 'Freedom Struggle'
  }
];

// -------------------------------------------------------------
// COMPUTER SCIENCE QUESTIONS (Class 10 Foundational Level)
// Everyday Computer Basics: NO coding/programming assumption!
// -------------------------------------------------------------
export const COMPUTER_SCIENCE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'CS-01',
    question: 'Which component is widely known as the brain of the computer that performs calculations and executes tasks?',
    options: [
      { id: 'A', text: 'Monitor' },
      { id: 'B', text: 'Hard Disk Drive' },
      { id: 'C', text: 'Central Processing Unit (CPU)' },
      { id: 'D', text: 'Keyboard' }
    ],
    correctAnswer: 'C',
    explanation: 'The Central Processing Unit (CPU) executes software instructions and processes data.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    subtopic: 'Computer Hardware'
  },
  {
    id: 'CS-02',
    question: 'What type of computer memory is temporary (volatile) and loses its stored content when the computer is turned off?',
    options: [
      { id: 'A', text: 'ROM (Read Only Memory)' },
      { id: 'B', text: 'RAM (Random Access Memory)' },
      { id: 'C', text: 'Hard Drive' },
      { id: 'D', text: 'USB Flash Drive' }
    ],
    correctAnswer: 'B',
    explanation: 'RAM provides high-speed temporary memory for running applications and clears when powered down.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    subtopic: 'Computer Memory'
  },
  {
    id: 'CS-03',
    question: 'Which of the following is an input device used to enter text, numbers, and commands into a computer?',
    options: [
      { id: 'A', text: 'Keyboard' },
      { id: 'B', text: 'Speaker' },
      { id: 'C', text: 'Printer' },
      { id: 'D', text: 'Projector' }
    ],
    correctAnswer: 'A',
    explanation: 'A keyboard is an input device; speakers, printers, and projectors are output devices.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    subtopic: 'Hardware Devices'
  },
  {
    id: 'CS-04',
    question: 'Which software manages all hardware resources and acts as the bridge between the user and the computer?',
    options: [
      { id: 'A', text: 'Web Browser' },
      { id: 'B', text: 'Operating System (like Windows or Android)' },
      { id: 'C', text: 'Text Editor' },
      { id: 'D', text: 'Calculator app' }
    ],
    correctAnswer: 'B',
    explanation: 'An Operating System manages files, memory, and devices so other programs can run smoothly.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    subtopic: 'Operating Systems'
  },
  {
    id: 'CS-05',
    question: 'Which software program allows you to view web pages on the internet (e.g., Google Chrome or Mozilla Firefox)?',
    options: [
      { id: 'A', text: 'Web Browser' },
      { id: 'B', text: 'Operating System' },
      { id: 'C', text: 'Database Server' },
      { id: 'D', text: 'Compiler' }
    ],
    correctAnswer: 'A',
    explanation: 'Web browsers fetch and display websites from the World Wide Web.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    subtopic: 'Internet & Web'
  },
  {
    id: 'CS-06',
    question: 'Which of the following is considered a strong practice for online digital safety?',
    options: [
      { id: 'A', text: 'Using the word "password123" for every account' },
      { id: 'B', text: 'Sharing passwords with unknown contacts via chat' },
      { id: 'C', text: 'Using a combination of letters, numbers, and symbols and keeping it private' },
      { id: 'D', text: 'Clicking suspicious links from unknown email senders' }
    ],
    correctAnswer: 'C',
    explanation: 'Strong, unique passwords with diverse characters protect accounts from unauthorized access.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    subtopic: 'Cyber Safety'
  },
  {
    id: 'CS-07',
    question: 'What does the abbreviation "USB" stand for in computer storage and cable connectors?',
    options: [
      { id: 'A', text: 'Universal Serial Bus' },
      { id: 'B', text: 'Unified System Binary' },
      { id: 'C', text: 'Universal Storage Battery' },
      { id: 'D', text: 'Unit Service Board' }
    ],
    correctAnswer: 'A',
    explanation: 'USB stands for Universal Serial Bus, an industry standard for data transfer and device connection.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    subtopic: 'Computer Hardware'
  },
  {
    id: 'CS-08',
    question: 'Which folder in an email account stores unwanted or suspicious commercial advertisements and phishing messages?',
    options: [
      { id: 'A', text: 'Inbox' },
      { id: 'B', text: 'Sent Items' },
      { id: 'C', text: 'Spam or Junk' },
      { id: 'D', text: 'Drafts' }
    ],
    correctAnswer: 'C',
    explanation: 'Spam or Junk folders automatically isolate suspicious or unsolicited bulk emails.',
    difficulty: 'Easy',
    topic: 'Computer Science',
    subtopic: 'Internet & Email'
  }
];

// -------------------------------------------------------------
// DEDICATED APTITUDE QUESTIONS (Class 10 Level - 10 for every stream)
// Numerical, logical reasoning, series, percentages, averages, patterns
// -------------------------------------------------------------
export const APTITUDE_POOL: AssessmentQuestion[] = [
  {
    id: 'APT-01',
    question: 'What is the next number in the pattern: 2, 4, 8, 16, [ ? ]?',
    options: [
      { id: 'A', text: '24' },
      { id: 'B', text: '28' },
      { id: 'C', text: '32' },
      { id: 'D', text: '36' }
    ],
    correctAnswer: 'C',
    explanation: 'Each term doubles the previous one: 16 * 2 = 32.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Number Series'
  },
  {
    id: 'APT-02',
    question: 'If yesterday was Wednesday, what day of the week will tomorrow be?',
    options: [
      { id: 'A', text: 'Thursday' },
      { id: 'B', text: 'Friday' },
      { id: 'C', text: 'Saturday' },
      { id: 'D', text: 'Sunday' }
    ],
    correctAnswer: 'B',
    explanation: 'If yesterday was Wednesday, today is Thursday. Therefore tomorrow is Friday.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Logical Reasoning'
  },
  {
    id: 'APT-03',
    question: 'A fruit seller has 40 apples. If 25% of them are sold, how many apples were sold?',
    options: [
      { id: 'A', text: '8' },
      { id: 'B', text: '10' },
      { id: 'C', text: '12' },
      { id: 'D', text: '15' }
    ],
    correctAnswer: 'B',
    explanation: '25% = 1/4. 1/4 of 40 = 10 apples.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Percentages'
  },
  {
    id: 'APT-04',
    question: 'Find the odd one out among the following words:',
    options: [
      { id: 'A', text: 'Triangle' },
      { id: 'B', text: 'Square' },
      { id: 'C', text: 'Rectangle' },
      { id: 'D', text: 'Circle' }
    ],
    correctAnswer: 'D',
    explanation: 'Triangle, square, and rectangle are formed by straight line segments (polygons), whereas a circle is a curved shape.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Classification'
  },
  {
    id: 'APT-05',
    question: 'A train 100 meters long is traveling at 10 meters per second. How many seconds does it take to pass a stationary pole?',
    options: [
      { id: 'A', text: '5 seconds' },
      { id: 'B', text: '10 seconds' },
      { id: 'C', text: '15 seconds' },
      { id: 'D', text: '20 seconds' }
    ],
    correctAnswer: 'B',
    explanation: 'Time = Distance / Speed = 100 meters / 10 m/s = 10 seconds.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Speed & Time'
  },
  {
    id: 'APT-06',
    question: 'If CAT is coded as DBU, what is the code for DOG (each letter shifted forward by 1)?',
    options: [
      { id: 'A', text: 'EPH' },
      { id: 'B', text: 'FPH' },
      { id: 'C', text: 'EPI' },
      { id: 'D', text: 'DOG' }
    ],
    correctAnswer: 'A',
    explanation: 'D + 1 = E, O + 1 = P, G + 1 = H. The resulting code is EPH.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Coding-Decoding'
  },
  {
    id: 'APT-07',
    question: 'What is the missing number in this sequence: 5, 10, 15, [ ? ], 25, 30?',
    options: [
      { id: 'A', text: '18' },
      { id: 'B', text: '20' },
      { id: 'C', text: '22' },
      { id: 'D', text: '24' }
    ],
    correctAnswer: 'B',
    explanation: 'The sequence increments by 5 at each step: 15 + 5 = 20.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Number Series'
  },
  {
    id: 'APT-08',
    question: 'Ravi is taller than Amit. Amit is taller than Karan. Who is the shortest among the three?',
    options: [
      { id: 'A', text: 'Ravi' },
      { id: 'B', text: 'Amit' },
      { id: 'C', text: 'Karan' },
      { id: 'D', text: 'They are all equal' }
    ],
    correctAnswer: 'C',
    explanation: 'Ravi > Amit > Karan. Karan is the shortest.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Analytical Ranking'
  },
  {
    id: 'APT-09',
    question: 'What is the average of 12, 14, 16, 18, and 20?',
    options: [
      { id: 'A', text: '14' },
      { id: 'B', text: '15' },
      { id: 'C', text: '16' },
      { id: 'D', text: '17' }
    ],
    correctAnswer: 'C',
    explanation: 'Sum = 80. Average = 80 / 5 = 16 (also the central number of this evenly spaced sequence).',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Averages'
  },
  {
    id: 'APT-10',
    question: 'If you walk 10 meters North, turn right and walk 10 meters, which direction are you now facing?',
    options: [
      { id: 'A', text: 'North' },
      { id: 'B', text: 'East' },
      { id: 'C', text: 'South' },
      { id: 'D', text: 'West' }
    ],
    correctAnswer: 'B',
    explanation: 'Turning right while heading North directs you towards East.',
    difficulty: 'Easy',
    topic: 'General Aptitude & Reasoning',
    subtopic: 'Direction Sense'
  }
];

// -------------------------------------------------------------
// STREAM BUILDER HELPERS
// -------------------------------------------------------------
export interface IntermediateStreamConfig {
  id: string;
  code: string;
  title: string;
  description: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  subjectsBreakdown: { subject: string; count: number }[];
  questionSelector: () => AssessmentQuestion[];
}

export const INTERMEDIATE_STREAMS: Record<string, IntermediateStreamConfig> = {
  // 1. MPC — Mathematics: 8, Physics: 6, Chemistry: 6, Aptitude: 10 (Total: 30)
  mpc: {
    id: 'mpc',
    code: 'MPC',
    title: 'MPC — Mathematics, Physics, Chemistry',
    description: 'Foundational assessment for First Year Intermediate MPC students testing Class 10 Math, Physics, Chemistry, and Analytical Aptitude.',
    totalQuestions: 30,
    timeLimitMinutes: 35,
    subjectsBreakdown: [
      { subject: 'Mathematics', count: 8 },
      { subject: 'Physics', count: 6 },
      { subject: 'Chemistry', count: 6 },
      { subject: 'General Aptitude & Reasoning', count: 10 }
    ],
    questionSelector: () => [
      ...MATH_QUESTIONS.slice(0, 8),
      ...PHYSICS_QUESTIONS.slice(0, 6),
      ...CHEMISTRY_QUESTIONS.slice(0, 6),
      ...APTITUDE_POOL.slice(0, 10)
    ]
  },

  // 2. BiPC — Biology: 8, Physics: 6, Chemistry: 6, Aptitude: 10 (Total: 30)
  bipc: {
    id: 'bipc',
    code: 'BiPC',
    title: 'BiPC — Biology, Physics, Chemistry',
    description: 'Foundational assessment for First Year Intermediate BiPC students testing Class 10 Biology, Physics, Chemistry, and Analytical Aptitude.',
    totalQuestions: 30,
    timeLimitMinutes: 35,
    subjectsBreakdown: [
      { subject: 'Biology', count: 8 },
      { subject: 'Physics', count: 6 },
      { subject: 'Chemistry', count: 6 },
      { subject: 'General Aptitude & Reasoning', count: 10 }
    ],
    questionSelector: () => [
      ...BIOLOGY_QUESTIONS.slice(0, 8),
      ...PHYSICS_QUESTIONS.slice(0, 6),
      ...CHEMISTRY_QUESTIONS.slice(0, 6),
      ...APTITUDE_POOL.slice(0, 10)
    ]
  },

  // 3. MEC — Mathematics: 8, Economics: 6, Commerce: 6, Aptitude: 10 (Total: 30)
  mec: {
    id: 'mec',
    code: 'MEC',
    title: 'MEC — Mathematics, Economics, Commerce',
    description: 'Foundational assessment for First Year Intermediate MEC students testing Class 10 Mathematics, Economics, Everyday Commerce, and Aptitude.',
    totalQuestions: 30,
    timeLimitMinutes: 35,
    subjectsBreakdown: [
      { subject: 'Mathematics', count: 8 },
      { subject: 'Economics', count: 6 },
      { subject: 'Commerce', count: 6 },
      { subject: 'General Aptitude & Reasoning', count: 10 }
    ],
    questionSelector: () => [
      ...MATH_QUESTIONS.slice(0, 8),
      ...ECONOMICS_QUESTIONS.slice(0, 6),
      ...COMMERCE_QUESTIONS.slice(0, 6),
      ...APTITUDE_POOL.slice(0, 10)
    ]
  },

  // 4. CEC — Civics: 7, Economics: 7, Commerce: 6, Aptitude: 10 (Total: 30)
  cec: {
    id: 'cec',
    code: 'CEC',
    title: 'CEC — Civics, Economics, Commerce',
    description: 'Foundational assessment for First Year Intermediate CEC students testing Class 10 Civics, Economics, Everyday Commerce, and Aptitude.',
    totalQuestions: 30,
    timeLimitMinutes: 35,
    subjectsBreakdown: [
      { subject: 'Civics', count: 7 },
      { subject: 'Economics', count: 7 },
      { subject: 'Commerce', count: 6 },
      { subject: 'General Aptitude & Reasoning', count: 10 }
    ],
    questionSelector: () => [
      ...CIVICS_QUESTIONS.slice(0, 7),
      ...ECONOMICS_QUESTIONS.slice(0, 7),
      ...COMMERCE_QUESTIONS.slice(0, 6),
      ...APTITUDE_POOL.slice(0, 10)
    ]
  },

  // 5. HEC — History: 5, Economics: 5, Civics: 5, Aptitude: 10 (Total: 25)
  hec: {
    id: 'hec',
    code: 'HEC',
    title: 'HEC — History, Economics, Civics',
    description: 'Foundational assessment for First Year Intermediate HEC students testing Class 10 History, Economics, Civics, and Aptitude.',
    totalQuestions: 25,
    timeLimitMinutes: 30,
    subjectsBreakdown: [
      { subject: 'History', count: 5 },
      { subject: 'Economics', count: 5 },
      { subject: 'Civics', count: 5 },
      { subject: 'General Aptitude & Reasoning', count: 10 }
    ],
    questionSelector: () => [
      ...HISTORY_QUESTIONS.slice(0, 5),
      ...ECONOMICS_QUESTIONS.slice(0, 5),
      ...CIVICS_QUESTIONS.slice(0, 5),
      ...APTITUDE_POOL.slice(0, 10)
    ]
  },

  // 6. MBiPC — Mathematics: 6, Biology: 5, Physics: 5, Chemistry: 4, Aptitude: 10 (Total: 30)
  mbipc: {
    id: 'mbipc',
    code: 'MBiPC',
    title: 'MBiPC — Mathematics, Biology, Physics, Chemistry',
    description: 'Foundational dual-track assessment testing Class 10 Math, Biology, Physics, Chemistry, and Aptitude.',
    totalQuestions: 30,
    timeLimitMinutes: 35,
    subjectsBreakdown: [
      { subject: 'Mathematics', count: 6 },
      { subject: 'Biology', count: 5 },
      { subject: 'Physics', count: 5 },
      { subject: 'Chemistry', count: 4 },
      { subject: 'General Aptitude & Reasoning', count: 10 }
    ],
    questionSelector: () => [
      ...MATH_QUESTIONS.slice(0, 6),
      ...BIOLOGY_QUESTIONS.slice(0, 5),
      ...PHYSICS_QUESTIONS.slice(0, 5),
      ...CHEMISTRY_QUESTIONS.slice(0, 4),
      ...APTITUDE_POOL.slice(0, 10)
    ]
  }
};

/**
 * Generate tailored assessment for "Other Specialization / Custom Subject Combination"
 * Takes custom entered subjects (e.g. ['Economics', 'History', 'Computer Science'])
 * and combines relevant questions with the mandatory 10 Aptitude questions!
 */
export function generateCustomIntermediateAssessment(
  customSubjects: string[],
  boardName: string = 'State Board / National Curriculum'
): Assessment {
  const chosenQuestions: AssessmentQuestion[] = [];
  const normalized = customSubjects.map((s) => s.toLowerCase().trim()).filter(Boolean);

  const subjectPoolMap: Record<string, AssessmentQuestion[]> = {
    math: MATH_QUESTIONS,
    mathematics: MATH_QUESTIONS,
    physics: PHYSICS_QUESTIONS,
    chemistry: CHEMISTRY_QUESTIONS,
    biology: BIOLOGY_QUESTIONS,
    botany: BIOLOGY_QUESTIONS,
    zoology: BIOLOGY_QUESTIONS,
    economics: ECONOMICS_QUESTIONS,
    commerce: COMMERCE_QUESTIONS,
    business: COMMERCE_QUESTIONS,
    civics: CIVICS_QUESTIONS,
    political: CIVICS_QUESTIONS,
    history: HISTORY_QUESTIONS,
    computer: COMPUTER_SCIENCE_QUESTIONS,
    cs: COMPUTER_SCIENCE_QUESTIONS,
    it: COMPUTER_SCIENCE_QUESTIONS
  };

  const matchedSubjects: string[] = [];

  normalized.forEach((subjectInput) => {
    for (const [key, pool] of Object.entries(subjectPoolMap)) {
      if (subjectInput.includes(key)) {
        if (!matchedSubjects.includes(key)) {
          matchedSubjects.push(key);
          // Pick 5 questions from this subject
          chosenQuestions.push(...pool.slice(0, 5));
        }
        break;
      }
    }
  });

  // Fallback if no matching subject detected or less than 2 subjects matched
  if (chosenQuestions.length < 10) {
    chosenQuestions.push(...MATH_QUESTIONS.slice(0, 5));
    chosenQuestions.push(...PHYSICS_QUESTIONS.slice(0, 5));
    chosenQuestions.push(...ECONOMICS_QUESTIONS.slice(0, 5));
  }

  // Always append the mandatory 10 Aptitude questions
  chosenQuestions.push(...APTITUDE_POOL.slice(0, 10));

  const totalQuestions = chosenQuestions.length;
  const timeLimitMinutes = Math.min(45, Math.max(25, Math.round(totalQuestions * 1.2)));

  const cleanBoard = boardName.split('(')[0].trim() || 'Board';
  const customTitle = customSubjects.length > 0 ? customSubjects.join(', ') : 'Custom Subject Stream';

  return {
    id: `custom_inter_${Date.now()}`,
    title: `Intermediate (${cleanBoard}) — ${customTitle} Assessment`,
    educationLevel: 'Intermediate (11th & 12th / +2)',
    courseOrGroup: 'Other Specialization / Custom Subject Combination',
    specialization: customTitle,
    totalQuestions,
    timeLimitMinutes,
    description: `Personalized Class 10 foundational assessment for your custom intermediate subjects (${customTitle}) plus 10 dedicated Aptitude questions adapted for ${boardName}.`,
    topicsCovered: Array.from(new Set(chosenQuestions.map((q) => q.topic))),
    questions: chosenQuestions,
    isCurated: true
  };
}

/**
 * Main retrieval function for intermediate stream assessments.
 * Formats titles and board metadata for TSBIE, BIEAP, CBSE, CISCE, etc.
 */
export function buildIntermediateStreamAssessment(
  streamId: string,
  boardName: string = 'Telangana Intermediate (TSBIE)'
): Assessment | null {
  const normalizedId = streamId.toLowerCase().replace(/[^a-z0-9_]/g, '_');

  // Look up stream config
  let config: IntermediateStreamConfig | undefined = INTERMEDIATE_STREAMS[normalizedId];

  // Try matching common aliases
  if (!config) {
    if (normalizedId.includes('mbipc')) config = INTERMEDIATE_STREAMS.mbipc;
    else if (normalizedId.includes('mpc')) config = INTERMEDIATE_STREAMS.mpc;
    else if (normalizedId.includes('bipc')) config = INTERMEDIATE_STREAMS.bipc;
    else if (normalizedId.includes('mec')) config = INTERMEDIATE_STREAMS.mec;
    else if (normalizedId.includes('cec')) config = INTERMEDIATE_STREAMS.cec;
    else if (normalizedId.includes('hec')) config = INTERMEDIATE_STREAMS.hec;
  }

  if (!config) return null;

  const rawQuestions = config.questionSelector();
  const cleanBoard = boardName.includes('(') ? boardName.split('(')[1].replace(')', '').trim() : boardName;

  const topicsCovered = Array.from(new Set(rawQuestions.map((q) => q.topic)));

  return {
    id: `inter_${config.id}`,
    title: `Intermediate ${config.code} (${cleanBoard}) — First Year Diagnostic Test`,
    educationLevel: 'Intermediate (11th & 12th / +2)',
    courseOrGroup: config.title,
    specialization: `${config.code} Core Curriculum & Aptitude`,
    totalQuestions: config.totalQuestions,
    timeLimitMinutes: config.timeLimitMinutes,
    description: `${config.description} Tailored for ${boardName} with Class 10 foundational knowledge and 10 dedicated Aptitude questions.`,
    topicsCovered,
    questions: rawQuestions,
    isCurated: true
  };
}
