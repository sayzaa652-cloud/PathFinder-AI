import { AdditionalSkillModule } from '../types';

/**
 * Additional Skills – Beyond the Textbook
 * Exactly 6 Modules as requested:
 * MODULE 1: Basic Computer Skills
 * MODULE 2: AI Basics & Responsible AI
 * MODULE 3: English Communication – 15 Minutes Daily (with AI English Communication Coach & Soft Skills)
 * MODULE 4: Productivity Tools (Excel & PowerPoint)
 * MODULE 5: General Knowledge & Awareness (Common for all students)
 * MODULE 6: Stream-Based Knowledge (Personalized: Basic Commerce for MPC/BiPC vs Medical Healthcare for MEC/CEC)
 */

export const MODULE_1_BASIC_COMPUTER_SKILLS: AdditionalSkillModule = {
  id: 'basic_computer_skills',
  title: 'MODULE 1: Basic Computer Skills',
  category: 'Digital Literacy',
  description: 'Operating systems, file management, keyboard shortcuts, hardware basics and safe browsing.',
  iconName: 'Monitor',
  completedLessonsCount: 0,
  totalLessonsCount: 4,
  lessons: [
    {
      id: 'comp_1',
      title: 'Lesson 1: Files, Folders & Operating System Basics',
      durationMinutes: 12,
      summary: 'Learn how computers organize files in folders and recognize common file extensions.',
      keyPoints: [
        'Folders group related files neatly in hierarchical trees.',
        'File extensions indicate format: .pdf for documents, .jpg for images, .mp4 for video.',
        'Always use clear naming conventions (e.g., Math_Ch1_Notes.pdf).'
      ],
      contentSections: [
        {
          heading: 'Understanding File Extensions',
          body: 'Every file name ends with an extension that dictates which software opens it. Documents use .pdf or .docx, images use .jpg or .png, and datasets use .csv or .xlsx.'
        },
        {
          heading: 'Organizing Academic Work',
          body: 'Create subject folders (Math, Physics, Chemistry) inside your Documents directory to retrieve past papers and notes quickly.'
        }
      ],
      practicalExercise: 'Create a folder named "PathFinder_Study" and make sub-folders for Math, Physics, and Chemistry.',
      quiz: [
        {
          id: 'q_comp_1',
          question: 'Which file extension represents a Portable Document Format file?',
          options: [
            { id: 'A', text: '.mp3' },
            { id: 'B', text: '.pdf' },
            { id: 'C', text: '.png' },
            { id: 'D', text: '.exe' }
          ],
          correctAnswer: 'B',
          explanation: '.pdf stands for Portable Document Format.',
          hint: 'Standard format for study notes.'
        }
      ],
      isCompleted: false
    },
    {
      id: 'comp_2',
      title: 'Lesson 2: Essential Keyboard Shortcuts for Speed',
      durationMinutes: 10,
      summary: 'Save study hours using keyboard shortcuts instead of mouse navigation.',
      keyPoints: [
        'Ctrl + C = Copy, Ctrl + V = Paste, Ctrl + Z = Undo.',
        'Ctrl + F = Find text inside any document or browser.',
        'Alt + Tab = Switch between active application windows.'
      ],
      contentSections: [
        {
          heading: 'Productivity Shortcuts',
          body: 'Mastering shortcuts increases typing and workflow speed by up to 3x when reading papers or writing reports.'
        }
      ],
      practicalExercise: 'Press Ctrl + F on a web page and search for the word "technology".',
      quiz: [
        {
          id: 'q_comp_2',
          question: 'Which shortcut key opens the search bar in browsers and PDFs?',
          options: [
            { id: 'A', text: 'Ctrl + C' },
            { id: 'B', text: 'Ctrl + F' },
            { id: 'C', text: 'Ctrl + Z' },
            { id: 'D', text: 'Ctrl + P' }
          ],
          correctAnswer: 'B',
          explanation: 'Ctrl + F opens Find.',
          hint: 'F for Find.'
        }
      ],
      isCompleted: false
    },
    {
      id: 'comp_3',
      title: 'Lesson 3: Hardware Parts (CPU, RAM, Storage)',
      durationMinutes: 12,
      summary: 'Understand CPU, RAM, and Storage when choosing computer hardware.',
      keyPoints: [
        'CPU = The brain executing mathematical instructions.',
        'RAM = Fast temporary short-term memory for active apps.',
        'Storage (SSD) = Permanent long-term file storage.'
      ],
      contentSections: [
        {
          heading: 'RAM vs Storage Explained',
          body: 'Think of RAM as your active study desk surface and Storage as your bookshelf.'
        }
      ],
      practicalExercise: 'Check system specifications on your laptop or smartphone settings.',
      isCompleted: false
    },
    {
      id: 'comp_4',
      title: 'Lesson 4: Safe Web Browsing & Privacy',
      durationMinutes: 12,
      summary: 'Recognize secure https links, avoid phishing scams, and browse safely.',
      keyPoints: [
        'Check for the padlock icon and https:// in the address bar.',
        'Never click suspicious links or download unverified files.'
      ],
      contentSections: [
        {
          heading: 'Safe Surfing Habits',
          body: 'Always verify domain names before entering credentials or downloading study materials.'
        }
      ],
      practicalExercise: 'Verify the security protocol of this study portal.',
      isCompleted: false
    }
  ]
};

export const MODULE_2_AI_BASICS: AdditionalSkillModule = {
  id: 'ai_basics',
  title: 'MODULE 2: AI Basics & Responsible AI',
  category: 'Future Skills',
  description: 'AI fundamentals, prompt writing, AI limitations, answer verification and ethical AI use.',
  iconName: 'Sparkles',
  completedLessonsCount: 0,
  totalLessonsCount: 4,
  lessons: [
    {
      id: 'ai_1',
      title: 'Lesson 1: AI Fundamentals & LLM Basics',
      durationMinutes: 15,
      summary: 'Understand how Artificial Intelligence and Large Language Models work.',
      keyPoints: [
        'AI learns patterns from massive text datasets.',
        'LLMs predict next tokens using probability.',
        'AI is an assistant tool, not an omniscient human mind.'
      ],
      contentSections: [
        {
          heading: 'How LLMs Generate Responses',
          body: 'AI analyzes prompt tokens and calculates mathematical word probabilities to construct helpful text.'
        }
      ],
      practicalExercise: 'Ask AI to explain gravity in 2 simple sentences.',
      quiz: [
        {
          id: 'q_ai_1',
          question: 'How do AI language models generate answers?',
          options: [
            { id: 'A', text: 'Memorizing full books word-for-word' },
            { id: 'B', text: 'Predicting probable next tokens based on context patterns' },
            { id: 'C', text: 'Copying directly from internet search engines' },
            { id: 'D', text: 'Using human conscious thought' }
          ],
          correctAnswer: 'B',
          explanation: 'LLMs calculate word probabilities trained on large datasets.',
          hint: 'Token prediction.'
        }
      ],
      isCompleted: false
    },
    {
      id: 'ai_2',
      title: 'Lesson 2: Prompt Writing (Role + Context + Task)',
      durationMinutes: 15,
      summary: 'Master the prompt engineering framework to get precise homework help.',
      keyPoints: [
        'Role: Tell the AI who it is (e.g., "Act as a Physics tutor").',
        'Context: Provide background (e.g., "I am an 11th class student").',
        'Task: State clear instructions with formatting constraints.'
      ],
      contentSections: [
        {
          heading: 'The Perfect Prompt Formula',
          body: 'Structured prompts eliminate vague responses and yield step-by-step guidance.'
        }
      ],
      practicalExercise: 'Write a prompt asking AI to quiz you on trigonometric formulas.',
      isCompleted: false
    },
    {
      id: 'ai_3',
      title: 'Lesson 3: AI Limitations & Answer Verification',
      durationMinutes: 12,
      summary: 'Learn why AI hallucinations happen and how to verify facts.',
      keyPoints: [
        'AI can occasionally generate confident but incorrect facts (hallucinations).',
        'Always cross-check formulas and dates with official board textbooks.'
      ],
      contentSections: [
        {
          heading: 'Fact-Checking Habit',
          body: 'Never copy AI outputs blindly without manual verification.'
        }
      ],
      practicalExercise: 'Recalculate any math solution provided by AI to verify step accuracy.',
      isCompleted: false
    },
    {
      id: 'ai_4',
      title: 'Lesson 4: Ethical AI Use & Socratic Learning',
      durationMinutes: 12,
      summary: 'Use AI as a learning partner rather than a shortcut for cheating.',
      keyPoints: [
        'Ask AI for hints and guiding questions instead of direct answers.',
        'Never input personal identification numbers or passwords into public AI.'
      ],
      contentSections: [
        {
          heading: 'Socratic AI Study',
          body: 'Use AI to develop independent critical thinking and problem-solving skills.'
        }
      ],
      practicalExercise: 'Ask AI for a hint to start a physics problem without revealing the solution.',
      isCompleted: false
    }
  ]
};

export const MODULE_3_ENGLISH_COMMUNICATION: AdditionalSkillModule = {
  id: 'english_comm',
  title: 'MODULE 3: English Communication – 15 Minutes Daily',
  category: 'Soft Skills & Fluency',
  description: 'English speaking, vocabulary, grammar, writing, communication confidence and soft skills. Includes AI English Communication Coach.',
  iconName: 'MessageSquare',
  completedLessonsCount: 0,
  totalLessonsCount: 4,
  lessons: [
    {
      id: 'eng_1',
      title: 'Lesson 1: Daily Speaking & Soft Skills Habit',
      durationMinutes: 15,
      summary: 'Build spoken fluency and professional soft skills in 15 minutes daily.',
      keyPoints: [
        'Read 1 short article out loud daily to improve articulation.',
        'Practice active listening, empathy, and professional etiquette.',
        'Use the interactive AI English Coach for personalized conversation practice.'
      ],
      contentSections: [
        {
          heading: 'Integrating Soft Skills',
          body: 'Technical competence combined with strong communication and interpersonal soft skills guarantees career success.'
        }
      ],
      practicalExercise: 'Spend 2 minutes speaking out loud about your career goals in English.',
      isCompleted: false
    },
    {
      id: 'eng_2',
      title: 'Lesson 2: Essential Vocabulary & Grammar Corrections',
      durationMinutes: 12,
      summary: 'Master power verbs, avoid common Indian English pitfalls, and build vocabulary.',
      keyPoints: [
        'Use precise academic verbs: Analyze, Synthesize, Evaluate.',
        'Avoid common translation traps ("Discuss about" -> "Discuss").'
      ],
      contentSections: [
        {
          heading: 'Grammar Refinement',
          body: 'Correct grammar builds written and spoken credibility during board exams and interviews.'
        }
      ],
      practicalExercise: 'Write 3 sentences using the verbs Analyze, Formulate, and Verify.',
      isCompleted: false
    },
    {
      id: 'eng_3',
      title: 'Lesson 3: Professional Email & Proposal Writing',
      durationMinutes: 15,
      summary: 'Format formal requests, leave applications, and project emails.',
      keyPoints: [
        'Subject line: Clear and concise.',
        'Salutation and structured body paragraphs.',
        'Professional sign-off with roll number.'
      ],
      contentSections: [
        {
          heading: 'Formal Email Structure',
          body: 'Clear structure ensures teachers and administrators respond promptly.'
        }
      ],
      practicalExercise: 'Draft an email requesting doubt clarification from your math professor.',
      isCompleted: false
    },
    {
      id: 'eng_4',
      title: 'Lesson 4: Interview & Presentation Confidence',
      durationMinutes: 15,
      summary: 'Master public speaking, group discussions, and job interview confidence.',
      keyPoints: [
        'Use the 6x6 rule for slides.',
        'Maintain eye contact and steady pacing during presentations.'
      ],
      contentSections: [
        {
          heading: 'Overcoming Stage Fear',
          body: 'Regular rehearsal and structured preparation build unshakeable public speaking confidence.'
        }
      ],
      practicalExercise: 'Prepare a 1-minute self-introduction speech for college seminars.',
      isCompleted: false
    }
  ]
};

export const MODULE_4_PRODUCTIVITY_TOOLS: AdditionalSkillModule = {
  id: 'productivity_tools',
  title: 'MODULE 4: Productivity Tools',
  category: 'Productivity & Office',
  description: 'Microsoft Excel and Microsoft PowerPoint. Formulas, data analysis, charts, and clean slide design.',
  iconName: 'FileSpreadsheet',
  completedLessonsCount: 0,
  totalLessonsCount: 4,
  lessons: [
    {
      id: 'xl_1',
      title: 'Lesson 1: Excel Formulas & Data Tables',
      durationMinutes: 15,
      summary: 'Master spreadsheet grids, cell references, and arithmetic formulas.',
      keyPoints: [
        'Formulas start with an equals sign (=).',
        '=SUM(), =AVERAGE(), =MAX(), =MIN() automate calculations.'
      ],
      contentSections: [
        {
          heading: 'Formula Construction',
          body: 'Organize experiment data into clean tables and compute totals instantly.'
        }
      ],
      practicalExercise: 'Create a table of 5 test marks and compute total sum and average.',
      quiz: [
        {
          id: 'q_xl_1',
          question: 'What character must every Excel formula begin with?',
          options: [
            { id: 'A', text: '#' },
            { id: 'B', text: '=' },
            { id: 'C', text: '@' },
            { id: 'D', text: '+' }
          ],
          correctAnswer: 'B',
          explanation: 'All formulas begin with =.',
          hint: 'Equals sign.'
        }
      ],
      isCompleted: false
    },
    {
      id: 'xl_2',
      title: 'Lesson 2: Advanced Logic (=IF & =VLOOKUP)',
      durationMinutes: 15,
      summary: 'Automate grading and record lookups using IF and VLOOKUP functions.',
      keyPoints: [
        '=IF(score >= 40, "Pass", "Fail") evaluates conditions automatically.',
        '=VLOOKUP() searches database tables for matching records.'
      ],
      contentSections: [
        {
          heading: 'Conditional Logic in Spreadsheets',
          body: 'Save hours of manual sorting by applying logical spreadsheet formulas.'
        }
      ],
      practicalExercise: 'Write an =IF formula returning "Distinction" if marks >= 75.',
      isCompleted: false
    },
    {
      id: 'ppt_1',
      title: 'Lesson 3: PowerPoint Slide Design & 6x6 Rule',
      durationMinutes: 12,
      summary: 'Design professional presentation slides for school and college projects.',
      keyPoints: [
        '6x6 Rule: Max 6 bullet points per slide, max 6 words per bullet.',
        'Use high contrast color themes.'
      ],
      contentSections: [
        {
          heading: 'Clean Slide Architecture',
          body: 'Slides are visual aids supporting your spoken presentation, not reading text blocks.'
        }
      ],
      practicalExercise: 'Design a 3-slide outline for a presentation on renewable energy.',
      isCompleted: false
    },
    {
      id: 'ppt_2',
      title: 'Lesson 4: Charts & Visual Storytelling',
      durationMinutes: 12,
      summary: 'Turn raw spreadsheet numbers into compelling Bar and Pie charts.',
      keyPoints: [
        'Use Bar charts for comparisons and Line charts for trends.',
        'Always include clear titles and axis labels.'
      ],
      contentSections: [
        {
          heading: 'Data Visualization',
          body: 'Visual charts communicate complex findings clearly in project reports.'
        }
      ],
      practicalExercise: 'Create a bar chart comparing subject scores.',
      isCompleted: false
    }
  ]
};

export const MODULE_5_GENERAL_KNOWLEDGE: AdditionalSkillModule = {
  id: 'general_knowledge',
  title: 'MODULE 5: General Knowledge & Awareness',
  category: 'Awareness & Competitive Base',
  description: 'Common for all students: Indian Constitution, scientific discoveries, world geography, national/international awareness, and GK questions.',
  iconName: 'Globe',
  completedLessonsCount: 0,
  totalLessonsCount: 4,
  lessons: [
    {
      id: 'gk_1',
      title: 'Lesson 1: Indian Constitution & Governance',
      durationMinutes: 15,
      summary: 'Understand the Preamble, Fundamental Rights, and the 3 pillars of government.',
      keyPoints: [
        'Dr. B.R. Ambedkar is revered as the Father of the Indian Constitution.',
        'India celebrates Republic Day on January 26 (1950).',
        '3 Pillars: Legislature, Executive, Judiciary.'
      ],
      contentSections: [
        {
          heading: 'Fundamental Rights',
          body: 'The Constitution guarantees 6 Fundamental Rights ensuring equality, freedom, and education.'
        }
      ],
      practicalExercise: 'Memorize the core words of the Preamble: Sovereign, Socialist, Secular, Democratic, Republic.',
      quiz: [
        {
          id: 'q_gk_1',
          question: 'Who is revered as the Father of the Indian Constitution?',
          options: [
            { id: 'A', text: 'Mahatma Gandhi' },
            { id: 'B', text: 'Dr. B.R. Ambedkar' },
            { id: 'C', text: 'Jawaharlal Nehru' },
            { id: 'D', text: 'Sardar Vallabhbhai Patel' }
          ],
          correctAnswer: 'B',
          explanation: 'Dr. B.R. Ambedkar chaired the drafting committee.',
          hint: 'Drafting Committee Chairman.'
        }
      ],
      isCompleted: false
    },
    {
      id: 'gk_2',
      title: 'Lesson 2: Scientific Discoveries & Inventors',
      durationMinutes: 12,
      summary: 'Milestones in science: Penicillin, Gravity, Raman Effect, and ISRO.',
      keyPoints: [
        'Penicillin: Alexander Fleming (1928).',
        'Raman Effect: Sir C.V. Raman (Nobel Prize 1930).',
        'ISRO space missions: Chandrayaan & Aditya.'
      ],
      contentSections: [
        {
          heading: 'Indian Scientific Milestones',
          body: 'Recognizing historic discoveries inspires future innovation and competitive exam success.'
        }
      ],
      practicalExercise: 'Name 3 inventions you use daily and find out who invented them.',
      isCompleted: false
    },
    {
      id: 'gk_3',
      title: 'Lesson 3: World Geography & Indian Rivers',
      durationMinutes: 12,
      summary: 'Major mountain ranges, river systems, oceans, and capitals.',
      keyPoints: [
        'Longest river in India: Ganga.',
        'Highest peak in India: Kanchenjunga.',
        'Largest ocean: Pacific Ocean.'
      ],
      contentSections: [
        {
          heading: 'Geographical Features',
          body: 'Understanding physical and political geography is essential for general awareness.'
        }
      ],
      practicalExercise: 'Locate the Godavari and Krishna rivers on an Indian map.',
      isCompleted: false
    },
    {
      id: 'gk_4',
      title: 'Lesson 4: National & International Organizations',
      durationMinutes: 12,
      summary: 'Roles of ISRO, RBI, DRDO, United Nations, and WHO.',
      keyPoints: [
        'RBI: Central banking authority of India.',
        'UN: Global peace and international cooperation organization.'
      ],
      contentSections: [
        {
          heading: 'Institutional Awareness',
          body: 'Knowing key organizational mandates aids competitive exam preparation (CUET, Civil Services, JEE/NEET).'
        }
      ],
      practicalExercise: 'Find the headquarters location of ISRO and the United Nations.',
      isCompleted: false
    }
  ]
};

export const MODULE_6_COMMERCE_FINANCE: AdditionalSkillModule = {
  id: 'basic_commerce',
  title: 'MODULE 6: Stream-Based Knowledge — Basic Commerce & Financial Literacy',
  category: 'Streamized: MPC / BiPC',
  description: 'Tailored for MPC and BiPC students: basic banking, savings, budgeting, business concepts and financial awareness.',
  iconName: 'IndianRupee',
  completedLessonsCount: 0,
  totalLessonsCount: 4,
  lessons: [
    {
      id: 'fin_1',
      title: 'Lesson 1: Budgeting & The 50/30/20 Rule',
      durationMinutes: 15,
      summary: 'Manage income, fixed expenses, and savings effectively.',
      keyPoints: [
        'Savings = Income - Expenses.',
        '50% Needs, 30% Wants, 20% Savings & Emergency Fund.'
      ],
      contentSections: [
        {
          heading: 'Personal Financial Planning',
          body: 'Developing budgeting habits early ensures long-term financial security.'
        }
      ],
      practicalExercise: 'Draft a mock monthly budget for ₹5,000 using the 50/30/20 rule.',
      quiz: [
        {
          id: 'q_fin_1',
          question: 'Under the 50/30/20 rule, what percentage goes to savings?',
          options: [
            { id: 'A', text: '5%' },
            { id: 'B', text: '10%' },
            { id: 'C', text: '20%' },
            { id: 'D', text: '50%' }
          ],
          correctAnswer: 'C',
          explanation: '20% is allocated to savings.',
          hint: '20% rule.'
        }
      ],
      isCompleted: false
    },
    {
      id: 'fin_2',
      title: 'Lesson 2: Bank Accounts & Fixed Deposits',
      durationMinutes: 12,
      summary: 'Understand savings accounts, debit cards, and Fixed Deposit interest.',
      keyPoints: [
        'Savings Account offers daily access with ~3-4% interest.',
        'Fixed Deposit locks funds for higher interest returns.'
      ],
      contentSections: [
        {
          heading: 'Banking Fundamentals',
          body: 'Keeping money in regulated banks protects against inflation and loss.'
        }
      ],
      practicalExercise: 'Ask about savings account interest rates at a local bank.',
      isCompleted: false
    },
    {
      id: 'fin_3',
      title: 'Lesson 3: Simple vs Compound Interest Magic',
      durationMinutes: 15,
      summary: 'Learn how compound interest grows wealth exponentially over time.',
      keyPoints: [
        'Simple Interest calculated on original principal only.',
        'Compound Interest calculates interest on principal plus previous interest (Interest on Interest!).'
      ],
      contentSections: [
        {
          heading: 'The Power of Compounding',
          body: 'Albert Einstein called compound interest the eighth wonder of the world.'
        }
      ],
      practicalExercise: 'Calculate simple interest for P = ₹1,000, R = 5%, T = 2 years.',
      isCompleted: false
    },
    {
      id: 'fin_4',
      title: 'Lesson 4: Digital Payments & UPI Safety',
      durationMinutes: 12,
      summary: 'How UPI works and critical safety rules for digital transactions.',
      keyPoints: [
        'PIN is ONLY required when sending / paying money, never when receiving.',
        'Never share UPI PIN or OTP with anyone.'
      ],
      contentSections: [
        {
          heading: 'UPI Security Rules',
          body: 'Always verify receiver names before authorizing digital payments.'
        }
      ],
      practicalExercise: 'Explain the UPI safety rule out loud to a family member.',
      isCompleted: false
    }
  ]
};

export const MODULE_6_MEDICAL_HEALTHCARE: AdditionalSkillModule = {
  id: 'medical_healthcare',
  title: 'MODULE 6: Stream-Based Knowledge — Medical & Healthcare Awareness',
  category: 'Streamized: MEC / CEC',
  description: 'Tailored for MEC and CEC students: beginner-level human body, common diseases, preventive healthcare, nutrition, first-aid, and medical discoveries.',
  iconName: 'FlaskConical',
  completedLessonsCount: 0,
  totalLessonsCount: 4,
  lessons: [
    {
      id: 'med_1',
      title: 'Lesson 1: Human Body Systems & Vital Organs',
      durationMinutes: 15,
      summary: 'Understand circulatory, respiratory, nervous, and digestive systems (educational awareness).',
      keyPoints: [
        'Heart pumps oxygenated blood through arteries.',
        'Lungs exchange oxygen and carbon dioxide.',
        'Brain coordinates all body signals.'
      ],
      contentSections: [
        {
          heading: 'Anatomy Basics for Everyone',
          body: 'Basic understanding of major organ systems promotes lifelong health consciousness.'
        }
      ],
      practicalExercise: 'Measure your resting pulse rate for 60 seconds.',
      isCompleted: false
    },
    {
      id: 'med_2',
      title: 'Lesson 2: Nutrition, Immunity & Preventive Health',
      durationMinutes: 15,
      summary: 'Macronutrients, micronutrients, balanced diet, and immunity building.',
      keyPoints: [
        'Proteins build tissue, carbohydrates provide energy, fats store energy.',
        'Vitamins and minerals regulate metabolic functions.',
        'Regular sleep and hydration are crucial for strong immunity.'
      ],
      contentSections: [
        {
          heading: 'Preventive Healthcare',
          body: 'Good nutrition and active lifestyles prevent lifestyle diseases.'
        }
      ],
      practicalExercise: 'Plan a balanced daily meal with adequate protein and fiber.',
      isCompleted: false
    },
    {
      id: 'med_3',
      title: 'Lesson 3: Common Diseases & Public Health',
      durationMinutes: 15,
      summary: 'Communicable vs non-communicable diseases, hygiene, and vaccination awareness.',
      keyPoints: [
        'Communicable diseases spread through pathogens (bacteria, viruses).',
        'Vaccination builds immune memory against severe infections.',
        'Clean drinking water prevents waterborne illnesses.'
      ],
      contentSections: [
        {
          heading: 'Public Health Principles',
          body: 'Sanitation and community vaccination are cornerstones of public health.'
        }
      ],
      practicalExercise: 'List 3 ways to prevent mosquito-borne diseases in your neighborhood.',
      isCompleted: false
    },
    {
      id: 'med_4',
      title: 'Lesson 4: First-Aid Awareness & Emergency Response',
      durationMinutes: 12,
      summary: 'Basic first-aid for cuts, burns, fainting, CPR basics, and emergency numbers.',
      keyPoints: [
        'Apply direct pressure to stop bleeding.',
        'Cool minor burns with running cold water (not ice).',
        'Emergency helpline in India: 112.'
      ],
      contentSections: [
        {
          heading: 'Emergency Preparedness',
          body: 'Knowing basic first-aid can save lives during critical golden hours before professional medical help arrives.'
        }
      ],
      practicalExercise: 'Save emergency numbers (112, 108) in your phone contacts.',
      isCompleted: false
    }
  ]
};

/**
 * Returns exactly 6 modules:
 * Modules 1 to 5 are fixed (Computer Skills, AI Basics, English Communication, Productivity Tools, General Knowledge).
 * Module 6 is stream-based: Basic Commerce & Financial Literacy for MPC/BiPC, or Medical & Healthcare Awareness for MEC/CEC.
 */
export function getAdditionalSkillsForStream(streamOrGroup?: string): AdditionalSkillModule[] {
  const norm = (streamOrGroup || '').toLowerCase();
  const isMecCec = norm.includes('mec') || norm.includes('cec') || norm.includes('commerce') || norm.includes('arts') || norm.includes('civics');
  
  const module6 = isMecCec ? MODULE_6_MEDICAL_HEALTHCARE : MODULE_6_COMMERCE_FINANCE;

  return [
    MODULE_1_BASIC_COMPUTER_SKILLS,
    MODULE_2_AI_BASICS,
    MODULE_3_ENGLISH_COMMUNICATION,
    MODULE_4_PRODUCTIVITY_TOOLS,
    MODULE_5_GENERAL_KNOWLEDGE,
    module6
  ];
}

export const ADDITIONAL_SKILLS_DATA: AdditionalSkillModule[] = getAdditionalSkillsForStream('mpc');
