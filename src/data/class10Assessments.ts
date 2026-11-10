import { Assessment } from '../types';

/**
 * Class 10 Entrance Assessments
 * Designed strictly following Class 10 criteria:
 * - Easy and suitable for Class 10 students starting with basic, everyday knowledge.
 * - Simple, friendly English without advanced academic jargon.
 * - Exactly 4 homogeneous options (A, B, C, D) belonging to the same topic/subject.
 * - Progressive gentle structure with clear explanations for each answer.
 */

// 1. Science Assessment (20 Questions)
export const CLASS10_SCIENCE_ASSESSMENT: Assessment = {
  id: 'class10_science',
  title: 'Class 10 Entrance — Science Practice Test',
  educationLevel: 'Class 10 (Secondary School)',
  courseOrGroup: 'Class 10 Entrance Examination',
  specialization: 'Science (Physics, Chemistry & Biology)',
  totalQuestions: 20,
  timeLimitMinutes: 25,
  description: 'An easy, beginner-friendly 20-question science test covering everyday physics, basic chemistry, plant life, and human body functions.',
  topicsCovered: ['Living Organisms & Plants', 'Human Body & Health', 'Everyday Physics & Forces', 'Basic Chemistry & States of Matter'],
  isCurated: true,
  questions: [
    {
      id: 'C10-SCI-01',
      question: 'Which part of a plant makes food?',
      options: [
        { id: 'A', text: 'Root' },
        { id: 'B', text: 'Stem' },
        { id: 'C', text: 'Leaf' },
        { id: 'D', text: 'Flower' }
      ],
      correctAnswer: 'C',
      explanation: 'Leaves make food for the plant through photosynthesis using sunlight, water, and air.',
      difficulty: 'Easy',
      topic: 'Living Organisms & Plants',
      subtopic: 'Plant Parts'
    },
    {
      id: 'C10-SCI-02',
      question: 'Which gas do humans need to breathe in to stay alive?',
      options: [
        { id: 'A', text: 'Oxygen' },
        { id: 'B', text: 'Carbon dioxide' },
        { id: 'C', text: 'Nitrogen' },
        { id: 'D', text: 'Helium' }
      ],
      correctAnswer: 'A',
      explanation: 'Our lungs take in oxygen from the air so our cells can produce energy.',
      difficulty: 'Easy',
      topic: 'Human Body & Health',
      subtopic: 'Respiration'
    },
    {
      id: 'C10-SCI-03',
      question: 'Which state of matter is water when it freezes into ice?',
      options: [
        { id: 'A', text: 'Solid' },
        { id: 'B', text: 'Liquid' },
        { id: 'C', text: 'Gas' },
        { id: 'D', text: 'Plasma' }
      ],
      correctAnswer: 'A',
      explanation: 'Ice has a fixed shape and volume, which means it is a solid.',
      difficulty: 'Easy',
      topic: 'Basic Chemistry & States of Matter',
      subtopic: 'States of Matter'
    },
    {
      id: 'C10-SCI-04',
      question: 'What is the main source of light and heat for planet Earth?',
      options: [
        { id: 'A', text: 'The Moon' },
        { id: 'B', text: 'The Sun' },
        { id: 'C', text: 'The Stars' },
        { id: 'D', text: 'Mars' }
      ],
      correctAnswer: 'B',
      explanation: 'The Sun is the closest star to Earth and provides sunlight and warmth to our entire planet.',
      difficulty: 'Easy',
      topic: 'Everyday Physics & Forces',
      subtopic: 'Sources of Energy'
    },
    {
      id: 'C10-SCI-05',
      question: 'Which organ in the human body pumps blood to all parts of the body?',
      options: [
        { id: 'A', text: 'Lungs' },
        { id: 'B', text: 'Stomach' },
        { id: 'C', text: 'Heart' },
        { id: 'D', text: 'Liver' }
      ],
      correctAnswer: 'C',
      explanation: 'The heart acts like a pump that circulates blood through blood vessels to all body organs.',
      difficulty: 'Easy',
      topic: 'Human Body & Health',
      subtopic: 'Circulatory System'
    },
    {
      id: 'C10-SCI-06',
      question: 'At what temperature does pure water boil at sea level?',
      options: [
        { id: 'A', text: '0°C' },
        { id: 'B', text: '50°C' },
        { id: 'C', text: '100°C' },
        { id: 'D', text: '200°C' }
      ],
      correctAnswer: 'C',
      explanation: 'Under normal room air pressure, water boils and turns into steam at 100 degrees Celsius.',
      difficulty: 'Easy',
      topic: 'Basic Chemistry & States of Matter',
      subtopic: 'Boiling Point'
    },
    {
      id: 'C10-SCI-07',
      question: 'Which material easily allows electric current to flow through it?',
      options: [
        { id: 'A', text: 'Copper wire' },
        { id: 'B', text: 'Rubber band' },
        { id: 'C', text: 'Plastic ruler' },
        { id: 'D', text: 'Dry wood' }
      ],
      correctAnswer: 'A',
      explanation: 'Copper is a metal and a very good electrical conductor. Rubber, plastic, and dry wood are insulators.',
      difficulty: 'Easy',
      topic: 'Everyday Physics & Forces',
      subtopic: 'Electricity'
    },
    {
      id: 'C10-SCI-08',
      question: 'What is the chemical formula for pure water?',
      options: [
        { id: 'A', text: 'CO2' },
        { id: 'B', text: 'H2O' },
        { id: 'C', text: 'NaCl' },
        { id: 'D', text: 'O2' }
      ],
      correctAnswer: 'B',
      explanation: 'Each water molecule is made of two Hydrogen atoms and one Oxygen atom (H2O).',
      difficulty: 'Easy',
      topic: 'Basic Chemistry & States of Matter',
      subtopic: 'Chemical Formulas'
    },
    {
      id: 'C10-SCI-09',
      question: 'Which natural force pulls dropped objects toward the ground?',
      options: [
        { id: 'A', text: 'Friction' },
        { id: 'B', text: 'Gravity' },
        { id: 'C', text: 'Magnetism' },
        { id: 'D', text: 'Air resistance' }
      ],
      correctAnswer: 'B',
      explanation: 'Gravity is the pull that Earth exerts on all objects, pulling them down toward the ground.',
      difficulty: 'Easy',
      topic: 'Everyday Physics & Forces',
      subtopic: 'Gravity'
    },
    {
      id: 'C10-SCI-10',
      question: 'Which part of the human skeleton protects the brain?',
      options: [
        { id: 'A', text: 'Rib cage' },
        { id: 'B', text: 'Skull' },
        { id: 'C', text: 'Backbone' },
        { id: 'D', text: 'Shoulder bone' }
      ],
      correctAnswer: 'B',
      explanation: 'The skull is made of hard bones that shield and protect the brain from injury.',
      difficulty: 'Easy',
      topic: 'Human Body & Health',
      subtopic: 'Skeletal System'
    },
    {
      id: 'C10-SCI-11',
      question: 'What color does blue litmus paper turn when dipped into lemon juice or acid?',
      options: [
        { id: 'A', text: 'Red' },
        { id: 'B', text: 'Green' },
        { id: 'C', text: 'Yellow' },
        { id: 'D', text: 'Blue' }
      ],
      correctAnswer: 'A',
      explanation: 'Acids turn blue litmus paper red. Bases turn red litmus paper blue.',
      difficulty: 'Easy',
      topic: 'Basic Chemistry & States of Matter',
      subtopic: 'Acids and Bases'
    },
    {
      id: 'C10-SCI-12',
      question: 'Animals that eat only plants and grass are called:',
      options: [
        { id: 'A', text: 'Herbivores' },
        { id: 'B', text: 'Carnivores' },
        { id: 'C', text: 'Omnivores' },
        { id: 'D', text: 'Scavengers' }
      ],
      correctAnswer: 'A',
      explanation: 'Herbivores like cows and deer eat only plants. Carnivores eat other animals.',
      difficulty: 'Easy',
      topic: 'Living Organisms & Plants',
      subtopic: 'Animal Diets'
    },
    {
      id: 'C10-SCI-13',
      question: 'Which planet in our solar system is known as the "Red Planet"?',
      options: [
        { id: 'A', text: 'Venus' },
        { id: 'B', text: 'Mars' },
        { id: 'C', text: 'Jupiter' },
        { id: 'D', text: 'Saturn' }
      ],
      correctAnswer: 'B',
      explanation: 'Mars looks reddish because its surface is covered in reddish iron-rich dust.',
      difficulty: 'Easy',
      topic: 'Everyday Physics & Forces',
      subtopic: 'Solar System'
    },
    {
      id: 'C10-SCI-14',
      question: 'What happens to a metal spoon left resting in a cup of hot water?',
      options: [
        { id: 'A', text: 'It warms up by heat conduction' },
        { id: 'B', text: 'It melts into water' },
        { id: 'C', text: 'It turns into ice' },
        { id: 'D', text: 'It shrinks in size' }
      ],
      correctAnswer: 'A',
      explanation: 'Metals are good conductors of heat, so thermal energy moves from hot water up the spoon handle.',
      difficulty: 'Easy',
      topic: 'Everyday Physics & Forces',
      subtopic: 'Heat Transfer'
    },
    {
      id: 'C10-SCI-15',
      question: 'What green substance in leaves absorbs sunlight for photosynthesis?',
      options: [
        { id: 'A', text: 'Chlorophyll' },
        { id: 'B', text: 'Hemoglobin' },
        { id: 'C', text: 'Melanin' },
        { id: 'D', text: 'Keratin' }
      ],
      correctAnswer: 'A',
      explanation: 'Chlorophyll gives plants their green color and traps light energy from the sun.',
      difficulty: 'Easy',
      topic: 'Living Organisms & Plants',
      subtopic: 'Photosynthesis'
    },
    {
      id: 'C10-SCI-16',
      question: 'Which force slows down a rolling ball on grass?',
      options: [
        { id: 'A', text: 'Gravity' },
        { id: 'B', text: 'Friction' },
        { id: 'C', text: 'Magnetism' },
        { id: 'D', text: 'Sunlight' }
      ],
      correctAnswer: 'B',
      explanation: 'Friction is the rubbing force between the surface of the ball and the grass that slows it down.',
      difficulty: 'Easy',
      topic: 'Everyday Physics & Forces',
      subtopic: 'Friction'
    },
    {
      id: 'C10-SCI-17',
      question: 'What kind of energy is stored inside dry batteries and food?',
      options: [
        { id: 'A', text: 'Light energy' },
        { id: 'B', text: 'Sound energy' },
        { id: 'C', text: 'Chemical energy' },
        { id: 'D', text: 'Wind energy' }
      ],
      correctAnswer: 'C',
      explanation: 'Chemical energy is stored inside the molecules of food and batteries until it is released.',
      difficulty: 'Easy',
      topic: 'Everyday Physics & Forces',
      subtopic: 'Forms of Energy'
    },
    {
      id: 'C10-SCI-18',
      question: 'How many magnetic poles does a simple bar magnet have?',
      options: [
        { id: 'A', text: '1 pole' },
        { id: 'B', text: '2 poles (North and South)' },
        { id: 'C', text: '3 poles' },
        { id: 'D', text: '4 poles' }
      ],
      correctAnswer: 'B',
      explanation: 'Every magnet has two poles: a North-seeking pole and a South-seeking pole.',
      difficulty: 'Easy',
      topic: 'Everyday Physics & Forces',
      subtopic: 'Magnetism'
    },
    {
      id: 'C10-SCI-19',
      question: 'Which instrument is used to check body temperature when a person has a fever?',
      options: [
        { id: 'A', text: 'Barometer' },
        { id: 'B', text: 'Thermometer' },
        { id: 'C', text: 'Speedometer' },
        { id: 'D', text: 'Microscope' }
      ],
      correctAnswer: 'B',
      explanation: 'A thermometer is an instrument designed to measure temperature accurately.',
      difficulty: 'Easy',
      topic: 'Human Body & Health',
      subtopic: 'Measurement Tools'
    },
    {
      id: 'C10-SCI-20',
      question: 'What is the change of liquid water into steam or vapor called?',
      options: [
        { id: 'A', text: 'Freezing' },
        { id: 'B', text: 'Condensation' },
        { id: 'C', text: 'Evaporation' },
        { id: 'D', text: 'Melting' }
      ],
      correctAnswer: 'C',
      explanation: 'Evaporation happens when liquid water is heated and turns into water vapor.',
      difficulty: 'Easy',
      topic: 'Basic Chemistry & States of Matter',
      subtopic: 'Water Cycle'
    }
  ]
};

// 2. Mathematics Assessment (20 Questions)
export const CLASS10_MATH_ASSESSMENT: Assessment = {
  id: 'class10_math',
  title: 'Class 10 Entrance — Mathematics Practice Test',
  educationLevel: 'Class 10 (Secondary School)',
  courseOrGroup: 'Class 10 Entrance Examination',
  specialization: 'Mathematics & Basic Arithmetic',
  totalQuestions: 20,
  timeLimitMinutes: 25,
  description: 'An easy, friendly 20-question math test covering everyday arithmetic, fractions, shapes, perimeter, simple equations, and percentages.',
  topicsCovered: ['Basic Arithmetic & Numbers', 'Fractions & Percentages', 'Shapes & Measurements', 'Simple Equations'],
  isCurated: true,
  questions: [
    {
      id: 'C10-MTH-01',
      question: 'What is 5 + 3?',
      options: [
        { id: 'A', text: '6' },
        { id: 'B', text: '7' },
        { id: 'C', text: '8' },
        { id: 'D', text: '9' }
      ],
      correctAnswer: 'C',
      explanation: 'Adding 5 and 3 together gives 8.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Addition'
    },
    {
      id: 'C10-MTH-02',
      question: 'What is 7 × 6?',
      options: [
        { id: 'A', text: '36' },
        { id: 'B', text: '42' },
        { id: 'C', text: '48' },
        { id: 'D', text: '54' }
      ],
      correctAnswer: 'B',
      explanation: 'Multiplying 7 by 6 gives 42.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Multiplication'
    },
    {
      id: 'C10-MTH-03',
      question: 'How many sides does a triangle have?',
      options: [
        { id: 'A', text: '2' },
        { id: 'B', text: '3' },
        { id: 'C', text: '4' },
        { id: 'D', text: '5' }
      ],
      correctAnswer: 'B',
      explanation: 'A triangle is a closed shape with exactly 3 straight sides.',
      difficulty: 'Easy',
      topic: 'Shapes & Measurements',
      subtopic: '2D Shapes'
    },
    {
      id: 'C10-MTH-04',
      question: 'What is 100 minus 45?',
      options: [
        { id: 'A', text: '45' },
        { id: 'B', text: '55' },
        { id: 'C', text: '65' },
        { id: 'D', text: '75' }
      ],
      correctAnswer: 'B',
      explanation: 'Subtracting 45 from 100 leaves 55 (100 - 45 = 55).',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Subtraction'
    },
    {
      id: 'C10-MTH-05',
      question: 'Which of these numbers is an even number?',
      options: [
        { id: 'A', text: '13' },
        { id: 'B', text: '21' },
        { id: 'C', text: '34' },
        { id: 'D', text: '47' }
      ],
      correctAnswer: 'C',
      explanation: '34 ends in the digit 4, which means it can be divided equally by 2 without any remainder.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Even and Odd Numbers'
    },
    {
      id: 'C10-MTH-06',
      question: 'What is the perimeter of a square with a side length of 4 cm?',
      options: [
        { id: 'A', text: '8 cm' },
        { id: 'B', text: '12 cm' },
        { id: 'C', text: '16 cm' },
        { id: 'D', text: '20 cm' }
      ],
      correctAnswer: 'C',
      explanation: 'Perimeter of a square = 4 × side length = 4 × 4 cm = 16 cm.',
      difficulty: 'Easy',
      topic: 'Shapes & Measurements',
      subtopic: 'Perimeter'
    },
    {
      id: 'C10-MTH-07',
      question: 'What is 1/2 + 1/4?',
      options: [
        { id: 'A', text: '1/6' },
        { id: 'B', text: '2/4' },
        { id: 'C', text: '3/4' },
        { id: 'D', text: '1/8' }
      ],
      correctAnswer: 'C',
      explanation: 'Convert 1/2 to 2/4. Then 2/4 + 1/4 = 3/4.',
      difficulty: 'Easy',
      topic: 'Fractions & Percentages',
      subtopic: 'Fractions'
    },
    {
      id: 'C10-MTH-08',
      question: 'If 2x = 10, what is the value of x?',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '5' },
        { id: 'C', text: '8' },
        { id: 'D', text: '12' }
      ],
      correctAnswer: 'B',
      explanation: 'Divide both sides by 2: x = 10 ÷ 2 = 5.',
      difficulty: 'Easy',
      topic: 'Simple Equations',
      subtopic: 'Linear Equations'
    },
    {
      id: 'C10-MTH-09',
      question: 'What is the area of a rectangle with a length of 8 cm and a width of 5 cm?',
      options: [
        { id: 'A', text: '13 sq cm' },
        { id: 'B', text: '26 sq cm' },
        { id: 'C', text: '40 sq cm' },
        { id: 'D', text: '45 sq cm' }
      ],
      correctAnswer: 'C',
      explanation: 'Area of a rectangle = length × width = 8 cm × 5 cm = 40 sq cm.',
      difficulty: 'Easy',
      topic: 'Shapes & Measurements',
      subtopic: 'Area'
    },
    {
      id: 'C10-MTH-10',
      question: 'Which of these numbers is a prime number (has only 1 and itself as factors)?',
      options: [
        { id: 'A', text: '4' },
        { id: 'B', text: '7' },
        { id: 'C', text: '9' },
        { id: 'D', text: '15' }
      ],
      correctAnswer: 'B',
      explanation: '7 can only be divided evenly by 1 and 7, so it is a prime number.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Prime Numbers'
    },
    {
      id: 'C10-MTH-11',
      question: 'What is 25% of 100?',
      options: [
        { id: 'A', text: '15' },
        { id: 'B', text: '20' },
        { id: 'C', text: '25' },
        { id: 'D', text: '50' }
      ],
      correctAnswer: 'C',
      explanation: '25% means 25 out of every 100. So 25% of 100 is 25.',
      difficulty: 'Easy',
      topic: 'Fractions & Percentages',
      subtopic: 'Percentages'
    },
    {
      id: 'C10-MTH-12',
      question: 'How many degrees are in a right angle (a square corner)?',
      options: [
        { id: 'A', text: '45°' },
        { id: 'B', text: '90°' },
        { id: 'C', text: '180°' },
        { id: 'D', text: '360°' }
      ],
      correctAnswer: 'B',
      explanation: 'A right angle measures exactly 90 degrees.',
      difficulty: 'Easy',
      topic: 'Shapes & Measurements',
      subtopic: 'Angles'
    },
    {
      id: 'C10-MTH-13',
      question: 'What is the next number in this pattern: 2, 4, 6, 8, [ ? ]?',
      options: [
        { id: 'A', text: '9' },
        { id: 'B', text: '10' },
        { id: 'C', text: '11' },
        { id: 'D', text: '12' }
      ],
      correctAnswer: 'B',
      explanation: 'The pattern counts up by 2 each time: 8 + 2 = 10.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Number Sequences'
    },
    {
      id: 'C10-MTH-14',
      question: 'If 1 notebook costs $4, how much do 5 notebooks cost in total?',
      options: [
        { id: 'A', text: '$15' },
        { id: 'B', text: '$18' },
        { id: 'C', text: '$20' },
        { id: 'D', text: '$25' }
      ],
      correctAnswer: 'C',
      explanation: 'Total cost = 5 × $4 = $20.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Everyday Word Problems'
    },
    {
      id: 'C10-MTH-15',
      question: 'What is 3 squared (3²)?',
      options: [
        { id: 'A', text: '6' },
        { id: 'B', text: '9' },
        { id: 'C', text: '12' },
        { id: 'D', text: '27' }
      ],
      correctAnswer: 'B',
      explanation: '3 squared means 3 multiplied by itself: 3 × 3 = 9.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Powers and Exponents'
    },
    {
      id: 'C10-MTH-16',
      question: 'What is the sum of all 3 inside angles in any triangle?',
      options: [
        { id: 'A', text: '90°' },
        { id: 'B', text: '180°' },
        { id: 'C', text: '270°' },
        { id: 'D', text: '360°' }
      ],
      correctAnswer: 'B',
      explanation: 'In any flat triangle, the 3 internal angles always add up to 180 degrees.',
      difficulty: 'Easy',
      topic: 'Shapes & Measurements',
      subtopic: 'Triangle Properties'
    },
    {
      id: 'C10-MTH-17',
      question: 'What is the fraction 3/10 written as a decimal number?',
      options: [
        { id: 'A', text: '0.03' },
        { id: 'B', text: '0.3' },
        { id: 'C', text: '3.0' },
        { id: 'D', text: '0.003' }
      ],
      correctAnswer: 'B',
      explanation: '3 divided by 10 equals 0.3.',
      difficulty: 'Easy',
      topic: 'Fractions & Percentages',
      subtopic: 'Decimals'
    },
    {
      id: 'C10-MTH-18',
      question: 'If you divide 56 by 8, what is the answer?',
      options: [
        { id: 'A', text: '6' },
        { id: 'B', text: '7' },
        { id: 'C', text: '8' },
        { id: 'D', text: '9' }
      ],
      correctAnswer: 'B',
      explanation: '56 ÷ 8 = 7, because 7 × 8 = 56.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Division'
    },
    {
      id: 'C10-MTH-19',
      question: 'What is the average of 10, 20, and 30?',
      options: [
        { id: 'A', text: '15' },
        { id: 'B', text: '20' },
        { id: 'C', text: '25' },
        { id: 'D', text: '30' }
      ],
      correctAnswer: 'B',
      explanation: 'Add the numbers: 10 + 20 + 30 = 60. Then divide by 3: 60 ÷ 3 = 20.',
      difficulty: 'Easy',
      topic: 'Basic Arithmetic & Numbers',
      subtopic: 'Averages'
    },
    {
      id: 'C10-MTH-20',
      question: 'If x + 7 = 15, what is the value of x?',
      options: [
        { id: 'A', text: '6' },
        { id: 'B', text: '7' },
        { id: 'C', text: '8' },
        { id: 'D', text: '9' }
      ],
      correctAnswer: 'C',
      explanation: 'Subtract 7 from both sides: x = 15 - 7 = 8.',
      difficulty: 'Easy',
      topic: 'Simple Equations',
      subtopic: 'Linear Equations'
    }
  ]
};

// 3. English Assessment (20 Questions)
export const CLASS10_ENGLISH_ASSESSMENT: Assessment = {
  id: 'class10_english',
  title: 'Class 10 Entrance — English Practice Test',
  educationLevel: 'Class 10 (Secondary School)',
  courseOrGroup: 'Class 10 Entrance Examination',
  specialization: 'English Grammar & Vocabulary',
  totalQuestions: 20,
  timeLimitMinutes: 25,
  description: 'An easy 20-question English test testing plurals, simple grammar, everyday words, correct spelling, and punctuation.',
  topicsCovered: ['Grammar & Parts of Speech', 'Everyday Vocabulary', 'Spelling & Punctuation', 'Sentence Usage'],
  isCurated: true,
  questions: [
    {
      id: 'C10-ENG-01',
      question: 'Choose the correct plural of "Book":',
      options: [
        { id: 'A', text: 'Bookes' },
        { id: 'B', text: 'Books' },
        { id: 'C', text: 'Bookies' },
        { id: 'D', text: 'Booking' }
      ],
      correctAnswer: 'B',
      explanation: 'To make "Book" plural, simply add "s" to get "Books".',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Plurals'
    },
    {
      id: 'C10-ENG-02',
      question: 'Choose the correct word to complete the sentence: "She ate [ ? ] apple for breakfast."',
      options: [
        { id: 'A', text: 'a' },
        { id: 'B', text: 'an' },
        { id: 'C', text: 'the' },
        { id: 'D', text: 'some' }
      ],
      correctAnswer: 'B',
      explanation: 'We use "an" before words that begin with a vowel sound (a, e, i, o, u), like "apple".',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Articles'
    },
    {
      id: 'C10-ENG-03',
      question: 'What is the opposite (antonym) of the word "Hot"?',
      options: [
        { id: 'A', text: 'Warm' },
        { id: 'B', text: 'Cold' },
        { id: 'C', text: 'Sunny' },
        { id: 'D', text: 'Dry' }
      ],
      correctAnswer: 'B',
      explanation: '"Cold" is the exact opposite of "Hot".',
      difficulty: 'Easy',
      topic: 'Everyday Vocabulary',
      subtopic: 'Antonyms'
    },
    {
      id: 'C10-ENG-04',
      question: 'What is the past tense of the verb "Go"?',
      options: [
        { id: 'A', text: 'Gone' },
        { id: 'B', text: 'Went' },
        { id: 'C', text: 'Going' },
        { id: 'D', text: 'Goes' }
      ],
      correctAnswer: 'B',
      explanation: 'The past tense of "Go" is "Went" (for example: "Yesterday, I went to school").',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Verb Tenses'
    },
    {
      id: 'C10-ENG-05',
      question: 'Which of the following words is spelled correctly?',
      options: [
        { id: 'A', text: 'Freind' },
        { id: 'B', text: 'Friend' },
        { id: 'C', text: 'Frend' },
        { id: 'D', text: 'Frind' }
      ],
      correctAnswer: 'B',
      explanation: 'The correct spelling is "Friend" (remember: "i" before "e").',
      difficulty: 'Easy',
      topic: 'Spelling & Punctuation',
      subtopic: 'Correct Spelling'
    },
    {
      id: 'C10-ENG-06',
      question: 'Which word has the same meaning (synonym) as "Happy"?',
      options: [
        { id: 'A', text: 'Sad' },
        { id: 'B', text: 'Angry' },
        { id: 'C', text: 'Glad' },
        { id: 'D', text: 'Tired' }
      ],
      correctAnswer: 'C',
      explanation: '"Glad" means pleased and happy.',
      difficulty: 'Easy',
      topic: 'Everyday Vocabulary',
      subtopic: 'Synonyms'
    },
    {
      id: 'C10-ENG-07',
      question: 'Choose the correct preposition: "The book is [ ? ] the table."',
      options: [
        { id: 'A', text: 'on' },
        { id: 'B', text: 'into' },
        { id: 'C', text: 'between' },
        { id: 'D', text: 'through' }
      ],
      correctAnswer: 'A',
      explanation: 'We use "on" to describe an object resting on a flat surface like a table.',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Prepositions'
    },
    {
      id: 'C10-ENG-08',
      question: 'Identify the noun (naming word) in this sentence: "The dog barked loudly."',
      options: [
        { id: 'A', text: 'The' },
        { id: 'B', text: 'dog' },
        { id: 'C', text: 'barked' },
        { id: 'D', text: 'loudly' }
      ],
      correctAnswer: 'B',
      explanation: 'A noun names a person, place, animal, or thing. Here, "dog" is the animal.',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Nouns'
    },
    {
      id: 'C10-ENG-09',
      question: 'Identify the action verb in this sentence: "Ravi reads a storybook every night."',
      options: [
        { id: 'A', text: 'Ravi' },
        { id: 'B', text: 'reads' },
        { id: 'C', text: 'storybook' },
        { id: 'D', text: 'night' }
      ],
      correctAnswer: 'B',
      explanation: '"Reads" is the action that Ravi is doing, so it is the verb.',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Verbs'
    },
    {
      id: 'C10-ENG-10',
      question: 'Choose the correct pronoun: "Priya is my friend. [ ? ] loves drawing pictures."',
      options: [
        { id: 'A', text: 'He' },
        { id: 'B', text: 'She' },
        { id: 'C', text: 'It' },
        { id: 'D', text: 'They' }
      ],
      correctAnswer: 'B',
      explanation: 'We use "She" when referring to a female person like Priya.',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Pronouns'
    },
    {
      id: 'C10-ENG-11',
      question: 'Choose the correct plural form of the word "Child":',
      options: [
        { id: 'A', text: 'Childs' },
        { id: 'B', text: 'Childes' },
        { id: 'C', text: 'Children' },
        { id: 'D', text: 'Childrens' }
      ],
      correctAnswer: 'C',
      explanation: '"Child" is an irregular noun; its plural form is "Children".',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Plurals'
    },
    {
      id: 'C10-ENG-12',
      question: 'Which punctuation mark belongs at the end of an asking sentence?',
      options: [
        { id: 'A', text: 'Period (.)' },
        { id: 'B', text: 'Question mark (?)' },
        { id: 'C', text: 'Comma (,)' },
        { id: 'D', text: 'Colon (:)' }
      ],
      correctAnswer: 'B',
      explanation: 'A question mark (?) is placed at the end of any sentence that asks a question.',
      difficulty: 'Easy',
      topic: 'Spelling & Punctuation',
      subtopic: 'Punctuation'
    },
    {
      id: 'C10-ENG-13',
      question: 'Choose the correct helping verb: "They [ ? ] playing in the park right now."',
      options: [
        { id: 'A', text: 'is' },
        { id: 'B', text: 'are' },
        { id: 'C', text: 'was' },
        { id: 'D', text: 'am' }
      ],
      correctAnswer: 'B',
      explanation: 'We use "are" with plural subjects like "They" in the present tense.',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Subject-Verb Agreement'
    },
    {
      id: 'C10-ENG-14',
      question: 'What is the opposite (antonym) of the word "Fast"?',
      options: [
        { id: 'A', text: 'Quick' },
        { id: 'B', text: 'Slow' },
        { id: 'C', text: 'Loud' },
        { id: 'D', text: 'Bright' }
      ],
      correctAnswer: 'B',
      explanation: '"Slow" is the opposite of "Fast".',
      difficulty: 'Easy',
      topic: 'Everyday Vocabulary',
      subtopic: 'Antonyms'
    },
    {
      id: 'C10-ENG-15',
      question: 'Find the describing word (adjective) in: "Aarav has a bright red bicycle."',
      options: [
        { id: 'A', text: 'Aarav' },
        { id: 'B', text: 'has' },
        { id: 'C', text: 'red' },
        { id: 'D', text: 'bicycle' }
      ],
      correctAnswer: 'C',
      explanation: '"Red" is an adjective because it describes the color of the bicycle.',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Adjectives'
    },
    {
      id: 'C10-ENG-16',
      question: 'Which word is spelled correctly?',
      options: [
        { id: 'A', text: 'Beatiful' },
        { id: 'B', text: 'Beautiful' },
        { id: 'C', text: 'Beautifull' },
        { id: 'D', text: 'Beutiful' }
      ],
      correctAnswer: 'B',
      explanation: 'The correct spelling is "Beautiful".',
      difficulty: 'Easy',
      topic: 'Spelling & Punctuation',
      subtopic: 'Correct Spelling'
    },
    {
      id: 'C10-ENG-17',
      question: 'Choose the correct short form (contraction) for "do not":',
      options: [
        { id: 'A', text: "don't" },
        { id: 'B', text: "dont'" },
        { id: 'C', text: "do'nt" },
        { id: 'D', text: "donot" }
      ],
      correctAnswer: 'A',
      explanation: 'The apostrophe replaces the missing "o" in "not", making "don\'t".',
      difficulty: 'Easy',
      topic: 'Spelling & Punctuation',
      subtopic: 'Contractions'
    },
    {
      id: 'C10-ENG-18',
      question: 'What is the female word for "King"?',
      options: [
        { id: 'A', text: 'Princess' },
        { id: 'B', text: 'Queen' },
        { id: 'C', text: 'Duchess' },
        { id: 'D', text: 'Empress' }
      ],
      correctAnswer: 'B',
      explanation: 'The female counterpart of a King is a Queen.',
      difficulty: 'Easy',
      topic: 'Everyday Vocabulary',
      subtopic: 'Gender Nouns'
    },
    {
      id: 'C10-ENG-19',
      question: 'Choose the word that best completes the sentence: "Birds use their [ ? ] to fly."',
      options: [
        { id: 'A', text: 'legs' },
        { id: 'B', text: 'wings' },
        { id: 'C', text: 'tails' },
        { id: 'D', text: 'beaks' }
      ],
      correctAnswer: 'B',
      explanation: 'Birds have wings with feathers that produce lift to fly.',
      difficulty: 'Easy',
      topic: 'Sentence Usage',
      subtopic: 'Vocabulary in Context'
    },
    {
      id: 'C10-ENG-20',
      question: 'Choose the correct connecting word: "I wanted to go outside, [ ? ] it started raining."',
      options: [
        { id: 'A', text: 'and' },
        { id: 'B', text: 'but' },
        { id: 'C', text: 'so' },
        { id: 'D', text: 'or' }
      ],
      correctAnswer: 'B',
      explanation: '"But" is used to join two sentences that show an opposite or contrasting idea.',
      difficulty: 'Easy',
      topic: 'Grammar & Parts of Speech',
      subtopic: 'Conjunctions'
    }
  ]
};

// 4. General Knowledge Assessment (20 Questions)
export const CLASS10_GK_ASSESSMENT: Assessment = {
  id: 'class10_gk',
  title: 'Class 10 Entrance — General Knowledge Practice Test',
  educationLevel: 'Class 10 (Secondary School)',
  courseOrGroup: 'Class 10 Entrance Examination',
  specialization: 'General Knowledge & Social Studies',
  totalQuestions: 20,
  timeLimitMinutes: 25,
  description: 'An easy 20-question general knowledge test on countries, nature, history, geography, and everyday facts.',
  topicsCovered: ['Indian Geography & Symbols', 'World Geography & Oceans', 'Famous Leaders & Dates', 'Nature & Everyday Facts'],
  isCurated: true,
  questions: [
    {
      id: 'C10-GK-01',
      question: 'What is the capital city of India?',
      options: [
        { id: 'A', text: 'Mumbai' },
        { id: 'B', text: 'New Delhi' },
        { id: 'C', text: 'Kolkata' },
        { id: 'D', text: 'Chennai' }
      ],
      correctAnswer: 'B',
      explanation: 'New Delhi is the official national capital of India where the central government is located.',
      difficulty: 'Easy',
      topic: 'Indian Geography & Symbols',
      subtopic: 'Capitals'
    },
    {
      id: 'C10-GK-02',
      question: 'How many days are in a leap year?',
      options: [
        { id: 'A', text: '364 days' },
        { id: 'B', text: '365 days' },
        { id: 'C', text: '366 days' },
        { id: 'D', text: '367 days' }
      ],
      correctAnswer: 'C',
      explanation: 'A leap year has 366 days because February has 29 days instead of 28.',
      difficulty: 'Easy',
      topic: 'Nature & Everyday Facts',
      subtopic: 'Calendar'
    },
    {
      id: 'C10-GK-03',
      question: 'Which is the largest ocean on planet Earth?',
      options: [
        { id: 'A', text: 'Atlantic Ocean' },
        { id: 'B', text: 'Indian Ocean' },
        { id: 'C', text: 'Pacific Ocean' },
        { id: 'D', text: 'Arctic Ocean' }
      ],
      correctAnswer: 'C',
      explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.',
      difficulty: 'Easy',
      topic: 'World Geography & Oceans',
      subtopic: 'Oceans'
    },
    {
      id: 'C10-GK-04',
      question: 'What is the national animal of India?',
      options: [
        { id: 'A', text: 'Asiatic Lion' },
        { id: 'B', text: 'Indian Elephant' },
        { id: 'C', text: 'Royal Bengal Tiger' },
        { id: 'D', text: 'Snow Leopard' }
      ],
      correctAnswer: 'C',
      explanation: 'The Royal Bengal Tiger is India’s national animal, symbolizing strength and grace.',
      difficulty: 'Easy',
      topic: 'Indian Geography & Symbols',
      subtopic: 'National Symbols'
    },
    {
      id: 'C10-GK-05',
      question: 'Which continent has the largest land area in the world?',
      options: [
        { id: 'A', text: 'Africa' },
        { id: 'B', text: 'Europe' },
        { id: 'C', text: 'Asia' },
        { id: 'D', text: 'North America' }
      ],
      correctAnswer: 'C',
      explanation: 'Asia is the world’s largest continent by both land area and population.',
      difficulty: 'Easy',
      topic: 'World Geography & Oceans',
      subtopic: 'Continents'
    },
    {
      id: 'C10-GK-06',
      question: 'How many hours are there in one complete day and night?',
      options: [
        { id: 'A', text: '12 hours' },
        { id: 'B', text: '24 hours' },
        { id: 'C', text: '36 hours' },
        { id: 'D', text: '48 hours' }
      ],
      correctAnswer: 'B',
      explanation: 'Earth takes 24 hours to make one full rotation on its axis.',
      difficulty: 'Easy',
      topic: 'Nature & Everyday Facts',
      subtopic: 'Time and Earth'
    },
    {
      id: 'C10-GK-07',
      question: 'What is the official currency of India?',
      options: [
        { id: 'A', text: 'Dollar' },
        { id: 'B', text: 'Euro' },
        { id: 'C', text: 'Indian Rupee' },
        { id: 'D', text: 'Pound' }
      ],
      correctAnswer: 'C',
      explanation: 'The official currency of India is the Indian Rupee (₹).',
      difficulty: 'Easy',
      topic: 'Indian Geography & Symbols',
      subtopic: 'Economy Basics'
    },
    {
      id: 'C10-GK-08',
      question: 'Which planet in our solar system is closest to the Sun?',
      options: [
        { id: 'A', text: 'Mercury' },
        { id: 'B', text: 'Venus' },
        { id: 'C', text: 'Earth' },
        { id: 'D', text: 'Mars' }
      ],
      correctAnswer: 'A',
      explanation: 'Mercury is the smallest planet and the one orbiting closest to the Sun.',
      difficulty: 'Easy',
      topic: 'Nature & Everyday Facts',
      subtopic: 'Solar System'
    },
    {
      id: 'C10-GK-09',
      question: 'Who is widely revered as the "Father of the Indian Nation"?',
      options: [
        { id: 'A', text: 'Jawaharlal Nehru' },
        { id: 'B', text: 'Mahatma Gandhi' },
        { id: 'C', text: 'Subhas Chandra Bose' },
        { id: 'D', text: 'Bhagat Singh' }
      ],
      correctAnswer: 'B',
      explanation: 'Mahatma Gandhi led the non-violent struggle for India’s freedom and is called the Father of the Nation.',
      difficulty: 'Easy',
      topic: 'Famous Leaders & Dates',
      subtopic: 'Indian Freedom Movement'
    },
    {
      id: 'C10-GK-10',
      question: 'Which is the longest river in the world?',
      options: [
        { id: 'A', text: 'Amazon River' },
        { id: 'B', text: 'Nile River' },
        { id: 'C', text: 'Ganga River' },
        { id: 'D', text: 'Yangtze River' }
      ],
      correctAnswer: 'B',
      explanation: 'The Nile River in Africa is traditionally recognized as the longest river in the world.',
      difficulty: 'Easy',
      topic: 'World Geography & Oceans',
      subtopic: 'Rivers'
    },
    {
      id: 'C10-GK-11',
      question: 'How many colors are there in a standard rainbow?',
      options: [
        { id: 'A', text: '5 colors' },
        { id: 'B', text: '6 colors' },
        { id: 'C', text: '7 colors' },
        { id: 'D', text: '8 colors' }
      ],
      correctAnswer: 'C',
      explanation: 'A rainbow has 7 colors: Violet, Indigo, Blue, Green, Yellow, Orange, and Red (VIBGYOR).',
      difficulty: 'Easy',
      topic: 'Nature & Everyday Facts',
      subtopic: 'Optics and Color'
    },
    {
      id: 'C10-GK-12',
      question: 'On which date does India celebrate its Independence Day each year?',
      options: [
        { id: 'A', text: '26th January' },
        { id: 'B', text: '15th August' },
        { id: 'C', text: '2nd October' },
        { id: 'D', text: '14th November' }
      ],
      correctAnswer: 'B',
      explanation: 'India gained independence from British rule on 15th August 1947.',
      difficulty: 'Easy',
      topic: 'Famous Leaders & Dates',
      subtopic: 'National Holidays'
    },
    {
      id: 'C10-GK-13',
      question: 'Which is the highest mountain peak in the world above sea level?',
      options: [
        { id: 'A', text: 'K2' },
        { id: 'B', text: 'Mount Everest' },
        { id: 'C', text: 'Kangchenjunga' },
        { id: 'D', text: 'Nanda Devi' }
      ],
      correctAnswer: 'B',
      explanation: 'Mount Everest in the Himalayas is the highest mountain peak in the world (8,848.86 meters).',
      difficulty: 'Easy',
      topic: 'World Geography & Oceans',
      subtopic: 'Mountains'
    },
    {
      id: 'C10-GK-14',
      question: 'Which body organ helps fish breathe underwater?',
      options: [
        { id: 'A', text: 'Lungs' },
        { id: 'B', text: 'Gills' },
        { id: 'C', text: 'Fins' },
        { id: 'D', text: 'Scales' }
      ],
      correctAnswer: 'B',
      explanation: 'Gills extract dissolved oxygen directly from the water as it flows over them.',
      difficulty: 'Easy',
      topic: 'Nature & Everyday Facts',
      subtopic: 'Animals'
    },
    {
      id: 'C10-GK-15',
      question: 'How many states are currently in the Republic of India?',
      options: [
        { id: 'A', text: '26' },
        { id: 'B', text: '28' },
        { id: 'C', text: '30' },
        { id: 'D', text: '32' }
      ],
      correctAnswer: 'B',
      explanation: 'India is divided into 28 states and 8 union territories.',
      difficulty: 'Easy',
      topic: 'Indian Geography & Symbols',
      subtopic: 'States of India'
    },
    {
      id: 'C10-GK-16',
      question: 'Which is the smallest continent by land area?',
      options: [
        { id: 'A', text: 'Europe' },
        { id: 'B', text: 'Australia' },
        { id: 'C', text: 'Antarctica' },
        { id: 'D', text: 'South America' }
      ],
      correctAnswer: 'B',
      explanation: 'Australia is the smallest continent on Earth by total land area.',
      difficulty: 'Easy',
      topic: 'World Geography & Oceans',
      subtopic: 'Continents'
    },
    {
      id: 'C10-GK-17',
      question: 'What sweet liquid do honeybees collect from flowers to make honey?',
      options: [
        { id: 'A', text: 'Pollen' },
        { id: 'B', text: 'Nectar' },
        { id: 'C', text: 'Sap' },
        { id: 'D', text: 'Dew' }
      ],
      correctAnswer: 'B',
      explanation: 'Honeybees drink sugary nectar from flowers and take it back to the hive to produce honey.',
      difficulty: 'Easy',
      topic: 'Nature & Everyday Facts',
      subtopic: 'Insects and Nature'
    },
    {
      id: 'C10-GK-18',
      question: 'Which scientific instrument is used to see tiny bacteria and cells that the naked eye cannot see?',
      options: [
        { id: 'A', text: 'Telescope' },
        { id: 'B', text: 'Microscope' },
        { id: 'C', text: 'Periscope' },
        { id: 'D', text: 'Binoculars' }
      ],
      correctAnswer: 'B',
      explanation: 'A microscope uses high-magnification lenses to make microscopic organisms visible.',
      difficulty: 'Easy',
      topic: 'Nature & Everyday Facts',
      subtopic: 'Science Tools'
    },
    {
      id: 'C10-GK-19',
      question: 'In which direction does the Sun rise every morning?',
      options: [
        { id: 'A', text: 'North' },
        { id: 'B', text: 'South' },
        { id: 'C', text: 'East' },
        { id: 'D', text: 'West' }
      ],
      correctAnswer: 'C',
      explanation: 'Because Earth rotates from west to east, the Sun appears to rise in the East and set in the West.',
      difficulty: 'Easy',
      topic: 'Nature & Everyday Facts',
      subtopic: 'Directions'
    },
    {
      id: 'C10-GK-20',
      question: 'Who was the first Prime Minister of independent India?',
      options: [
        { id: 'A', text: 'Dr. B.R. Ambedkar' },
        { id: 'B', text: 'Jawaharlal Nehru' },
        { id: 'C', text: 'Sardar Vallabhbhai Patel' },
        { id: 'D', text: 'Dr. Rajendra Prasad' }
      ],
      correctAnswer: 'B',
      explanation: 'Pandit Jawaharlal Nehru took office on August 15, 1947, as India’s first Prime Minister.',
      difficulty: 'Easy',
      topic: 'Famous Leaders & Dates',
      subtopic: 'Indian History'
    }
  ]
};

// 5. Basic Aptitude Assessment (20 Questions)
export const CLASS10_APTITUDE_ASSESSMENT: Assessment = {
  id: 'class10_aptitude',
  title: 'Class 10 Entrance — Basic Aptitude & Reasoning Practice Test',
  educationLevel: 'Class 10 (Secondary School)',
  courseOrGroup: 'Class 10 Entrance Examination',
  specialization: 'Basic Aptitude & Logical Reasoning',
  totalQuestions: 20,
  timeLimitMinutes: 25,
  description: 'An easy 20-question test with simple number patterns, word analogies, odd-one-out puzzles, and basic common-sense logic.',
  topicsCovered: ['Number Patterns & Sequences', 'Odd One Out', 'Word Analogies', 'Common Sense Logic'],
  isCurated: true,
  questions: [
    {
      id: 'C10-APT-01',
      question: 'Find the missing number in the sequence: 5, 10, 15, 20, [ ? ]?',
      options: [
        { id: 'A', text: '21' },
        { id: 'B', text: '25' },
        { id: 'C', text: '30' },
        { id: 'D', text: '35' }
      ],
      correctAnswer: 'B',
      explanation: 'The numbers increase by adding 5 each step: 20 + 5 = 25.',
      difficulty: 'Easy',
      topic: 'Number Patterns & Sequences',
      subtopic: 'Step Sequences'
    },
    {
      id: 'C10-APT-02',
      question: 'Find the odd one out from this list:',
      options: [
        { id: 'A', text: 'Apple' },
        { id: 'B', text: 'Banana' },
        { id: 'C', text: 'Mango' },
        { id: 'D', text: 'Potato' }
      ],
      correctAnswer: 'D',
      explanation: 'Apple, Banana, and Mango are fruits that grow on trees. Potato is a root vegetable.',
      difficulty: 'Easy',
      topic: 'Odd One Out',
      subtopic: 'Categorization'
    },
    {
      id: 'C10-APT-03',
      question: 'Complete the pair: "Pen is to Write as Knife is to [ ? ]."',
      options: [
        { id: 'A', text: 'Eat' },
        { id: 'B', text: 'Cut' },
        { id: 'C', text: 'Wash' },
        { id: 'D', text: 'Sharpen' }
      ],
      correctAnswer: 'B',
      explanation: 'A pen is used to write, and a knife is used to cut.',
      difficulty: 'Easy',
      topic: 'Word Analogies',
      subtopic: 'Tool & Function'
    },
    {
      id: 'C10-APT-04',
      question: 'What letter comes next in the sequence: A, C, E, G, [ ? ]?',
      options: [
        { id: 'A', text: 'H' },
        { id: 'B', text: 'I' },
        { id: 'C', text: 'J' },
        { id: 'D', text: 'K' }
      ],
      correctAnswer: 'B',
      explanation: 'The sequence skips one alphabet letter each time: A (skip B) C (skip D) E (skip F) G (skip H) -> I.',
      difficulty: 'Easy',
      topic: 'Number Patterns & Sequences',
      subtopic: 'Letter Patterns'
    },
    {
      id: 'C10-APT-05',
      question: 'If today is Wednesday, what day will it be tomorrow?',
      options: [
        { id: 'A', text: 'Tuesday' },
        { id: 'B', text: 'Thursday' },
        { id: 'C', text: 'Friday' },
        { id: 'D', text: 'Saturday' }
      ],
      correctAnswer: 'B',
      explanation: 'Thursday directly follows Wednesday in the week.',
      difficulty: 'Easy',
      topic: 'Common Sense Logic',
      subtopic: 'Days of the Week'
    },
    {
      id: 'C10-APT-06',
      question: 'Find the odd one out from these items:',
      options: [
        { id: 'A', text: 'Dog' },
        { id: 'B', text: 'Cat' },
        { id: 'C', text: 'Cow' },
        { id: 'D', text: 'Car' }
      ],
      correctAnswer: 'D',
      explanation: 'Dog, Cat, and Cow are living animals. A car is an inanimate motor vehicle.',
      difficulty: 'Easy',
      topic: 'Odd One Out',
      subtopic: 'Living vs Non-Living'
    },
    {
      id: 'C10-APT-07',
      question: 'Complete the pair: "Bird is to Fly as Fish is to [ ? ]."',
      options: [
        { id: 'A', text: 'Walk' },
        { id: 'B', text: 'Swim' },
        { id: 'C', text: 'Jump' },
        { id: 'D', text: 'Crawl' }
      ],
      correctAnswer: 'B',
      explanation: 'Birds move through the air by flying, and fish move through the water by swimming.',
      difficulty: 'Easy',
      topic: 'Word Analogies',
      subtopic: 'Animal Movement'
    },
    {
      id: 'C10-APT-08',
      question: 'If a clock currently shows 2:00, what time will it show in 3 hours?',
      options: [
        { id: 'A', text: '4:00' },
        { id: 'B', text: '5:00' },
        { id: 'C', text: '6:00' },
        { id: 'D', text: '7:00' }
      ],
      correctAnswer: 'B',
      explanation: '2:00 + 3 hours = 5:00.',
      difficulty: 'Easy',
      topic: 'Common Sense Logic',
      subtopic: 'Clock Time'
    },
    {
      id: 'C10-APT-09',
      question: 'What is the next number in this sequence: 10, 20, 30, 40, [ ? ]?',
      options: [
        { id: 'A', text: '45' },
        { id: 'B', text: '50' },
        { id: 'C', text: '55' },
        { id: 'D', text: '60' }
      ],
      correctAnswer: 'B',
      explanation: 'The numbers count by tens: 40 + 10 = 50.',
      difficulty: 'Easy',
      topic: 'Number Patterns & Sequences',
      subtopic: 'Counting by 10s'
    },
    {
      id: 'C10-APT-10',
      question: 'Complete the pair: "Eye is to See as Ear is to [ ? ]."',
      options: [
        { id: 'A', text: 'Smell' },
        { id: 'B', text: 'Hear' },
        { id: 'C', text: 'Taste' },
        { id: 'D', text: 'Touch' }
      ],
      correctAnswer: 'B',
      explanation: 'We use our eyes to see and our ears to hear sounds.',
      difficulty: 'Easy',
      topic: 'Word Analogies',
      subtopic: 'Body Senses'
    },
    {
      id: 'C10-APT-11',
      question: 'Find the odd number out from this set: 2, 4, 6, 9',
      options: [
        { id: 'A', text: '2' },
        { id: 'B', text: '4' },
        { id: 'C', text: '6' },
        { id: 'D', text: '9' }
      ],
      correctAnswer: 'D',
      explanation: '2, 4, and 6 are all even numbers. 9 is an odd number.',
      difficulty: 'Easy',
      topic: 'Odd One Out',
      subtopic: 'Number Properties'
    },
    {
      id: 'C10-APT-12',
      question: 'Rahul is taller than Amit. Amit is taller than Suresh. Who is the tallest of all three?',
      options: [
        { id: 'A', text: 'Rahul' },
        { id: 'B', text: 'Amit' },
        { id: 'C', text: 'Suresh' },
        { id: 'D', text: 'They are all the same height' }
      ],
      correctAnswer: 'A',
      explanation: 'Order from tallest to shortest: Rahul > Amit > Suresh. Rahul is the tallest.',
      difficulty: 'Easy',
      topic: 'Common Sense Logic',
      subtopic: 'Comparison'
    },
    {
      id: 'C10-APT-13',
      question: 'Which geometric shape has exactly four equal sides and four square corners?',
      options: [
        { id: 'A', text: 'Triangle' },
        { id: 'B', text: 'Square' },
        { id: 'C', text: 'Pentagon' },
        { id: 'D', text: 'Circle' }
      ],
      correctAnswer: 'B',
      explanation: 'A square has 4 equal sides and four 90-degree right angles.',
      difficulty: 'Easy',
      topic: 'Common Sense Logic',
      subtopic: 'Shapes'
    },
    {
      id: 'C10-APT-14',
      question: 'Complete the countdown sequence: 50, 40, 30, 20, [ ? ]?',
      options: [
        { id: 'A', text: '15' },
        { id: 'B', text: '10' },
        { id: 'C', text: '5' },
        { id: 'D', text: '0' }
      ],
      correctAnswer: 'B',
      explanation: 'The numbers decrease by 10 each step: 20 - 10 = 10.',
      difficulty: 'Easy',
      topic: 'Number Patterns & Sequences',
      subtopic: 'Countdown'
    },
    {
      id: 'C10-APT-15',
      question: 'If the code for "CAT" is 3-1-20 (based on letter order in alphabet), what is the code for "BAT"?',
      options: [
        { id: 'A', text: '1-1-20' },
        { id: 'B', text: '2-1-20' },
        { id: 'C', text: '3-1-20' },
        { id: 'D', text: '4-1-20' }
      ],
      correctAnswer: 'B',
      explanation: 'B is the 2nd letter, A is the 1st letter, and T is the 20th letter, so the code is 2-1-20.',
      difficulty: 'Easy',
      topic: 'Common Sense Logic',
      subtopic: 'Letter Coding'
    },
    {
      id: 'C10-APT-16',
      question: 'Find the odd one out:',
      options: [
        { id: 'A', text: 'Circle' },
        { id: 'B', text: 'Square' },
        { id: 'C', text: 'Triangle' },
        { id: 'D', text: 'Blue' }
      ],
      correctAnswer: 'D',
      explanation: 'Circle, Square, and Triangle are geometric shapes. Blue is a color.',
      difficulty: 'Easy',
      topic: 'Odd One Out',
      subtopic: 'Shapes vs Colors'
    },
    {
      id: 'C10-APT-17',
      question: 'If 1 box holds 10 crayons, how many crayons do 4 boxes hold altogether?',
      options: [
        { id: 'A', text: '20 crayons' },
        { id: 'B', text: '30 crayons' },
        { id: 'C', text: '40 crayons' },
        { id: 'D', text: '50 crayons' }
      ],
      correctAnswer: 'C',
      explanation: '4 boxes × 10 crayons each = 40 crayons in total.',
      difficulty: 'Easy',
      topic: 'Common Sense Logic',
      subtopic: 'Everyday Logic'
    },
    {
      id: 'C10-APT-18',
      question: 'Complete the pair: "Doctor is to Hospital as Teacher is to [ ? ]."',
      options: [
        { id: 'A', text: 'Factory' },
        { id: 'B', text: 'School' },
        { id: 'C', text: 'Bank' },
        { id: 'D', text: 'Airport' }
      ],
      correctAnswer: 'B',
      explanation: 'A doctor works in a hospital, and a teacher works in a school.',
      difficulty: 'Easy',
      topic: 'Word Analogies',
      subtopic: 'Workplaces'
    },
    {
      id: 'C10-APT-19',
      question: 'If you face North and turn directly to your right hand side, which direction are you now facing?',
      options: [
        { id: 'A', text: 'South' },
        { id: 'B', text: 'East' },
        { id: 'C', text: 'West' },
        { id: 'D', text: 'North-West' }
      ],
      correctAnswer: 'B',
      explanation: 'When facing North, your right side points directly East.',
      difficulty: 'Easy',
      topic: 'Common Sense Logic',
      subtopic: 'Directions'
    },
    {
      id: 'C10-APT-20',
      question: 'What is the next number in this sequence: 3, 6, 9, 12, [ ? ]?',
      options: [
        { id: 'A', text: '13' },
        { id: 'B', text: '14' },
        { id: 'C', text: '15' },
        { id: 'D', text: '16' }
      ],
      correctAnswer: 'C',
      explanation: 'The sequence adds 3 each time (the 3 times table): 12 + 3 = 15.',
      difficulty: 'Easy',
      topic: 'Number Patterns & Sequences',
      subtopic: 'Step Sequences'
    }
  ]
};

// 6. Comprehensive All-Round Entrance Assessment (20 Questions: 4 Science, 4 Math, 4 English, 4 GK, 4 Aptitude)
export const CLASS10_ENTRANCE_ALL_ASSESSMENT: Assessment = {
  id: 'class10_entrance_all',
  title: 'Class 10 Entrance — Comprehensive All-Round Practice Test',
  educationLevel: 'Class 10 (Secondary School)',
  courseOrGroup: 'Class 10 Entrance Examination',
  specialization: 'Comprehensive All-Round Secondary Foundation',
  totalQuestions: 20,
  timeLimitMinutes: 25,
  description: 'An easy 20-question entrance test covering Science, Math, English, General Knowledge, and Aptitude in simple English.',
  topicsCovered: ['Science Fundamentals', 'Basic Mathematics', 'English Grammar', 'General Knowledge', 'Logical Aptitude'],
  isCurated: true,
  questions: [
    // 4 Science
    CLASS10_SCIENCE_ASSESSMENT.questions[0],  // Leaf makes food
    CLASS10_SCIENCE_ASSESSMENT.questions[1],  // Oxygen
    CLASS10_SCIENCE_ASSESSMENT.questions[4],  // Heart pumps blood
    CLASS10_SCIENCE_ASSESSMENT.questions[7],  // H2O
    // 4 Math
    CLASS10_MATH_ASSESSMENT.questions[0],     // 5 + 3 = 8
    CLASS10_MATH_ASSESSMENT.questions[1],     // 7 × 6 = 42
    CLASS10_MATH_ASSESSMENT.questions[2],     // Triangle 3 sides
    CLASS10_MATH_ASSESSMENT.questions[7],     // 2x = 10 -> 5
    // 4 English
    CLASS10_ENGLISH_ASSESSMENT.questions[0],  // Books
    CLASS10_ENGLISH_ASSESSMENT.questions[1],  // an apple
    CLASS10_ENGLISH_ASSESSMENT.questions[2],  // Cold
    CLASS10_ENGLISH_ASSESSMENT.questions[3],  // Went
    // 4 GK
    CLASS10_GK_ASSESSMENT.questions[0],       // New Delhi
    CLASS10_GK_ASSESSMENT.questions[1],       // 366 days
    CLASS10_GK_ASSESSMENT.questions[2],       // Pacific Ocean
    CLASS10_GK_ASSESSMENT.questions[3],       // Royal Bengal Tiger
    // 4 Aptitude
    CLASS10_APTITUDE_ASSESSMENT.questions[0], // 5, 10, 15, 20 -> 25
    CLASS10_APTITUDE_ASSESSMENT.questions[1], // Potato odd one out
    CLASS10_APTITUDE_ASSESSMENT.questions[2], // Pen:Write :: Knife:Cut
    CLASS10_APTITUDE_ASSESSMENT.questions[4]  // Tomorrow Wednesday -> Thursday
  ]
};

export const CLASS_10_ASSESSMENTS: Record<string, Assessment> = {
  class10_science: CLASS10_SCIENCE_ASSESSMENT,
  class10_math: CLASS10_MATH_ASSESSMENT,
  class10_english: CLASS10_ENGLISH_ASSESSMENT,
  class10_gk: CLASS10_GK_ASSESSMENT,
  class10_aptitude: CLASS10_APTITUDE_ASSESSMENT,
  class10_entrance_all: CLASS10_ENTRANCE_ALL_ASSESSMENT
};
