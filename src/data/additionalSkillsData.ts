import { AdditionalSkillModule } from '../types';

/**
 * Learn Additional Skills Section:
 * Non-academic practical skills for student growth:
 * 1. Basic Computer Skills
 * 2. AI Basics & Responsible AI
 * 3. English Communication (15-minute daily practice)
 * 4. Excel & PowerPoint
 * 5. General Knowledge
 * 6. Basic Commerce & Financial Literacy
 * 
 * Written in simple English suitable for Indian Intermediate students.
 */

export const ADDITIONAL_SKILLS_DATA: AdditionalSkillModule[] = [
  {
    id: 'basic_computer_skills',
    title: 'Basic Computer Skills',
    category: 'Digital Literacy',
    description: 'Master operating systems, file formats, keyboard shortcuts, hardware basics, and safe browsing.',
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
          'Folders are used to group related files neatly.',
          'File extensions tell the computer what type of file it is: .pdf for documents, .jpg for pictures, .mp4 for video.',
          'Always give clear names to your files (e.g. Math_Homework_Chapter1.pdf instead of Document1.pdf).'
        ],
        contentSections: [
          {
            heading: 'Understanding File Extensions',
            body: 'Every file on your computer has a name followed by a dot (.) and 3 or 4 letters called an extension. For example, in "Physics_Notes.pdf", ".pdf" is the extension. Documents use .pdf or .docx, images use .jpg or .png, and spreadsheets use .xlsx.'
          },
          {
            heading: 'Organizing Desktop & Folders',
            body: 'Create main folders for each subject (e.g. Math, Physics, Chemistry) inside your Documents folder. Store relevant files inside their respective subject folders so you can find them quickly during revision.'
          }
        ],
        practicalExercise: 'Create a new folder on your computer named "PathFinder_Study_Notes" and create 3 sub-folders inside it for Math, Physics, and Chemistry.',
        quiz: [
          {
            id: 'q_comp_1',
            question: 'Which file extension is commonly used for portable document files (read-only documents)?',
            options: [
              { id: 'A', text: '.mp3' },
              { id: 'B', text: '.pdf' },
              { id: 'C', text: '.png' },
              { id: 'D', text: '.exe' }
            ],
            correctAnswer: 'B',
            explanation: '.pdf stands for Portable Document Format, widely used for sharing documents.',
            hint: 'Used for PDF books and notes.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'comp_2',
        title: 'Lesson 2: Essential Keyboard Shortcuts for Speed',
        durationMinutes: 10,
        summary: 'Save hours of study time by using keyboard shortcuts instead of mouse clicks.',
        keyPoints: [
          'Ctrl + C = Copy text or file.',
          'Ctrl + V = Paste copied text or file.',
          'Ctrl + Z = Undo your last mistake.',
          'Ctrl + F = Search/Find any word instantly on a webpage or document.',
          'Alt + Tab = Switch quickly between open apps.'
        ],
        contentSections: [
          {
            heading: 'Why Keyboard Shortcuts Matter',
            body: 'Professional engineers and students use shortcuts to work 3x faster. Instead of right-clicking with a mouse, holding Ctrl (or Cmd on Mac) while pressing a letter performs the action immediately.'
          }
        ],
        practicalExercise: 'Open any website, press Ctrl + F, type the word "education", and see all occurrences highlighted on screen.',
        quiz: [
          {
            id: 'q_comp_2',
            question: 'Which shortcut key combination is used to find or search for a specific word inside a document?',
            options: [
              { id: 'A', text: 'Ctrl + C' },
              { id: 'B', text: 'Ctrl + F' },
              { id: 'C', text: 'Ctrl + Z' },
              { id: 'D', text: 'Ctrl + P' }
            ],
            correctAnswer: 'B',
            explanation: 'Ctrl + F opens the Find search bar in browsers, PDFs, and Word documents.',
            hint: 'F stands for Find.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'comp_3',
        title: 'Lesson 3: Hardware Parts (CPU, RAM, Storage)',
        durationMinutes: 12,
        summary: 'Understand what CPU, RAM, and Storage mean when buying or using a laptop.',
        keyPoints: [
          'CPU (Central Processing Unit) = The brain of the computer that executes instructions.',
          'RAM (Random Access Memory) = Temporary short-term memory used while opening apps. More RAM means smoother multitasking.',
          'Storage (SSD/Hard Disk) = Permanent long-term memory where your photos, OS, and files are stored.'
        ],
        contentSections: [
          {
            heading: 'RAM vs Storage Explained Simply',
            body: 'Think of RAM as the top surface of your study desk (where you keep open notebooks while studying right now) and Storage as your bookshelf (where books stay safely stored when closed).'
          }
        ],
        practicalExercise: 'Check your computer or phone settings to see how much RAM (e.g. 8 GB) and Storage (e.g. 128 GB) it has.',
        quiz: [
          {
            id: 'q_comp_3',
            question: 'Which component acts as the short-term working memory for active programs on a computer?',
            options: [
              { id: 'A', text: 'Hard Disk Drive (HDD)' },
              { id: 'B', text: 'RAM (Random Access Memory)' },
              { id: 'C', text: 'Power Supply Unit' },
              { id: 'D', text: 'Monitor' }
            ],
            correctAnswer: 'B',
            explanation: 'RAM provides high-speed temporary memory for running applications.',
            hint: 'Random Access Memory.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'comp_4',
        title: 'Lesson 4: Safe Web Browsing & Password Hygiene',
        durationMinutes: 12,
        summary: 'Protect your accounts, avoid fake download links, and recognize phishing emails.',
        keyPoints: [
          'Look for the padlock symbol (https://) in the browser address bar before entering passwords.',
          'Use strong passwords containing letters, numbers, and symbols (e.g. Study#2026! instead of 123456).',
          'Never share OTPs (One-Time Passwords) or family banking PINs with anyone over phone or email.'
        ],
        contentSections: [
          {
            heading: 'Spotting Online Traps & Phishing',
            body: 'Phishing is when fake websites trick you into giving your password. Always check the web address carefully: official sites end in .gov.in, .ac.in, or verified domains.'
          }
        ],
        practicalExercise: 'Inspect the address bar of this app and check if it starts with https:// and shows a security padlock icon.',
        quiz: [
          {
            id: 'q_comp_4',
            question: 'What does the "s" in "https://" stand for when visiting a secure website?',
            options: [
              { id: 'A', text: 'System' },
              { id: 'B', text: 'Secure' },
              { id: 'C', text: 'Speed' },
              { id: 'D', text: 'Storage' }
            ],
            correctAnswer: 'B',
            explanation: 'HTTPS stands for HyperText Transfer Protocol Secure, meaning data sent is encrypted.',
            hint: 'Means safe and encrypted.'
          }
        ],
        isCompleted: false
      }
    ]
  },

  {
    id: 'ai_basics',
    title: 'AI Basics & Responsible AI',
    category: 'Future Skills',
    description: 'Learn how Artificial Intelligence works, prompt engineering, spotting AI mistakes, and ethical study uses.',
    iconName: 'Sparkles',
    completedLessonsCount: 0,
    totalLessonsCount: 4,
    lessons: [
      {
        id: 'ai_1',
        title: 'Lesson 1: What is AI & How do LLMs Work?',
        durationMinutes: 15,
        summary: 'Demystify Artificial Intelligence and Large Language Models like Gemini and ChatGPT.',
        keyPoints: [
          'AI systems learn patterns from huge amounts of text and data.',
          'LLMs (Large Language Models) predict the most likely next word based on context.',
          'AI is a helpful assistant tool, not a human mind—it does not possess real feelings or consciousness.'
        ],
        contentSections: [
          {
            heading: 'How AI Predicts Text',
            body: 'When you type a sentence into AI, it breaks your prompt into small tokens and calculates mathematical probabilities to generate helpful responses.'
          }
        ],
        practicalExercise: 'Ask an AI tool: "Explain what gravity is in 2 simple sentences suitable for a 10th-grade student."',
        quiz: [
          {
            id: 'q_ai_1',
            question: 'What is the main technique used by AI language models to generate answers?',
            options: [
              { id: 'A', text: 'Memorizing full books without understanding' },
              { id: 'B', text: 'Predicting the most likely next words based on learned pattern probabilities' },
              { id: 'C', text: 'Copying and pasting fixed answers from Wikipedia' },
              { id: 'D', text: 'Using human emotions to write essays' }
            ],
            correctAnswer: 'B',
            explanation: 'LLMs calculate word probabilities trained on large datasets.',
            hint: 'Pattern prediction.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'ai_2',
        title: 'Lesson 2: Prompt Engineering Basics for Students',
        durationMinutes: 15,
        summary: 'Learn the exact 3-step formula to get clear, accurate homework help from AI.',
        keyPoints: [
          '1. Role: Tell the AI who it is (e.g. "Act as a friendly Intermediate Physics teacher").',
          '2. Context: Provide background info (e.g. "I am in 11th class studying Newton\'s 2nd Law").',
          '3. Specific Task: State clearly what you need (e.g. "Give me 2 solved examples with step-by-step steps").'
        ],
        contentSections: [
          {
            heading: 'The Perfect Prompt Formula',
            body: 'Good Prompt = Role + Context + Clear Task + Formatting Constraints (e.g. "Use bullet points"). Avoid vague prompts like "Explain Physics".'
          }
        ],
        practicalExercise: 'Write a prompt using the formula: "Act as a Math tutor. Explain Pythagoras theorem using a real-world ladder example in 3 short bullet points."',
        isCompleted: false
      },
      {
        id: 'ai_3',
        title: 'Lesson 3: Spotting AI Hallucinations & Fact-Checking',
        durationMinutes: 12,
        summary: 'Understand why AI sometimes invents false facts and how to verify information.',
        keyPoints: [
          'An AI "hallucination" happens when AI confidently gives a wrong fact or fake reference.',
          'Never copy AI answers blindly into exam papers or school assignments.',
          'Always cross-check dates, mathematical formulas, and scientific facts with your standard textbook.'
        ],
        contentSections: [
          {
            heading: 'Why AI Hallucinates',
            body: 'Because AI generates text based on word probabilities, it sometimes fills in missing knowledge with plausible-sounding false information.'
          }
        ],
        practicalExercise: 'Whenever AI gives you a mathematical solution, recalculate the final step by hand to confirm accuracy.',
        quiz: [
          {
            id: 'q_ai_3',
            question: 'What is it called when an AI model generates convincing but completely false information?',
            options: [
              { id: 'A', text: 'Debugging' },
              { id: 'B', text: 'Hallucination' },
              { id: 'C', text: 'Compilation' },
              { id: 'D', text: 'Encryption' }
            ],
            correctAnswer: 'B',
            explanation: 'AI hallucination is when LLMs make up false facts with high confidence.',
            hint: 'Term used when AI invents false facts.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'ai_4',
        title: 'Lesson 4: Responsible & Ethical AI Use in Studies',
        durationMinutes: 12,
        summary: 'Use AI to boost your learning without cheating or losing your own critical thinking.',
        keyPoints: [
          'Use AI as a Socratic hint generator: Ask "Give me a hint on how to start this problem" instead of "Solve my homework".',
          'Never submit AI-generated text as your own original essay without reading and editing it.',
          'Do not type private passwords, home addresses, or phone numbers into public AI chats.'
        ],
        contentSections: [
          {
            heading: 'Socratic AI Learning vs Cheating',
            body: 'Cheating is copying AI answers to get marks without understanding. Learning is using AI to explain confusing concepts until you can solve them yourself.'
          }
        ],
        practicalExercise: 'Practice asking AI: "Do not give me the answer. Ask me a guiding question to help me solve 2x + 5 = 15 on my own."',
        isCompleted: false
      }
    ]
  },

  {
    id: 'english_comm',
    title: 'English Communication (15-Min Daily Practice)',
    category: 'Soft Skills & Fluency',
    description: '15-minute daily practice prompts, vocabulary building, grammar tips, and formal email writing.',
    iconName: 'MessageSquare',
    completedLessonsCount: 0,
    totalLessonsCount: 4,
    lessons: [
      {
        id: 'eng_1',
        title: 'Lesson 1: 15-Minute Daily Speaking & Reading Routine',
        durationMinutes: 15,
        summary: 'A practical daily habit to build spoken English confidence in 15 minutes.',
        keyPoints: [
          'Minute 1–5: Read 1 short English news paragraph out loud in front of a mirror.',
          'Minute 6–10: Speak for 2 minutes on a simple topic (e.g. "My favorite subject and why").',
          'Minute 11–15: Note down 2 new English words and use them in sentences.'
        ],
        contentSections: [
          {
            heading: 'Overcoming Speaking Hesitation',
            body: 'Don\'t worry about making grammar mistakes when starting. Fluency comes first through daily practice, accuracy comes second through feedback.'
          }
        ],
        practicalExercise: 'Stand in front of a mirror, set a 2-minute phone timer, and speak out loud about what you did today in English.',
        isCompleted: false
      },
      {
        id: 'eng_2',
        title: 'Lesson 2: Daily Vocabulary Builder (5 Power Words)',
        durationMinutes: 12,
        summary: 'Learn 5 high-impact vocabulary words commonly used in college and job interviews.',
        keyPoints: [
          '1. Analyze (Verb): To examine in detail. Example: "We need to analyze the test results."',
          '2. Efficient (Adjective): Working well without wasting time or energy. Example: "Calculators make math efficient."',
          '3. Perspective (Noun): A particular point of view. Example: "Listening to others gives us a broad perspective."',
          '4. Consolidate (Verb): To combine into a stronger single unit. Example: "Revision helps consolidate your learning."',
          '5. Resilience (Noun): The ability to recover quickly from difficulties. Example: "Practicing weak topics builds academic resilience."'
        ],
        contentSections: [
          {
            heading: 'How to Remember New Words',
            body: 'Don\'t just memorize definitions. Write 1 personal sentence using the word on the same day you learn it.'
          }
        ],
        practicalExercise: 'Write 1 sentence using the word "Resilience" related to your study goals.',
        quiz: [
          {
            id: 'q_eng_2',
            question: 'Which word means "working well without wasting time or energy"?',
            options: [
              { id: 'A', text: 'Hesitant' },
              { id: 'B', text: 'Efficient' },
              { id: 'C', text: 'Vague' },
              { id: 'D', text: 'Complex' }
            ],
            correctAnswer: 'B',
            explanation: 'Efficient means achieving maximum productivity with minimum wasted effort.',
            hint: 'Productive without waste.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'eng_3',
        title: 'Lesson 3: Common Grammar Pitfalls to Avoid',
        durationMinutes: 12,
        summary: 'Fix common Indian English grammar mistakes in prepositions and subject-verb agreement.',
        keyPoints: [
          '❌ "He don\'t know" → ✅ "He doesn\'t know" (Third person singular takes "doesn\'t").',
          '❌ "Discuss about" → ✅ "Discuss" ("Discuss" already includes "about").',
          '❌ "Revert back" → ✅ "Revert" or "Reply" ("Revert" already means go back).',
          'Prepositions: IN a room/city, ON a surface/date, AT a specific time/location.'
        ],
        contentSections: [
          {
            heading: 'Preposition Rules Explained',
            body: 'Use "at" for exact points (at 5 PM, at the gate). Use "on" for days/dates/surfaces (on Monday, on the table). Use "in" for enclosed spaces/months/years (in July, in the classroom).'
          }
        ],
        practicalExercise: 'Correct this sentence: "We will discuss about the Physics project at Monday."',
        isCompleted: false
      },
      {
        id: 'eng_4',
        title: 'Lesson 4: How to Write Professional Emails to Teachers & Colleges',
        durationMinutes: 15,
        summary: 'Format formal email requests for leave, project submissions, or admission queries.',
        keyPoints: [
          'Subject Line: Short and clear (e.g. "Leave Application — Aarav Sharma, Class 11-A").',
          'Salutation: "Respected Teacher / Dear Sir/Madam,"',
          'Body: State your purpose clearly in 2 short paragraphs.',
          'Sign-off: "Thanking you, Yours sincerely, [Your Full Name & Roll Number]".'
        ],
        contentSections: [
          {
            heading: 'Sample Formal Email Template',
            body: 'Subject: Absence Request due to Fever — Roll No 24\n\nRespected Ma\'am,\nI am writing to inform you that I have been unwell with fever today. Kindly grant me leave for 07 Nov 2026. I will collect the homework notes from my classmate.\n\nThanking you,\nYours sincerely,\nAarav Sharma'
          }
        ],
        practicalExercise: 'Write a draft email to your principal requesting a bonafide student certificate.',
        isCompleted: false
      }
    ]
  },

  {
    id: 'excel_ppt',
    title: 'Excel and PowerPoint',
    category: 'Productivity Tools',
    description: 'Learn spreadsheet formulas (=SUM, =AVERAGE, =IF, =VLOOKUP), chart generation, and clean slide design.',
    iconName: 'FileSpreadsheet',
    completedLessonsCount: 0,
    totalLessonsCount: 4,
    lessons: [
      {
        id: 'xl_1',
        title: 'Lesson 1: Excel Fundamentals & Basic Formulas',
        durationMinutes: 15,
        summary: 'Understand rows, columns, cell addresses (A1, B2), and basic arithmetic formulas.',
        keyPoints: [
          'Columns are vertical (A, B, C) and Rows are horizontal (1, 2, 3). A cell is their intersection (e.g. B4).',
          'Every Excel formula MUST begin with an equals sign (=).',
          '=SUM(A1:A10) adds all numbers from cell A1 to A10.',
          '=AVERAGE(B1:B5) calculates the mean average score.'
        ],
        contentSections: [
          {
            heading: 'Basic Formula Examples',
            body: '=SUM(C2:C10) sums column C. =MAX(D2:D20) finds the highest mark. =MIN(D2:D20) finds the lowest mark.'
          }
        ],
        practicalExercise: 'Type numbers 10, 20, 30 in cells A1, A2, A3 in a spreadsheet and type =SUM(A1:A3) in cell A4.',
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
            explanation: 'All formulas in Microsoft Excel or Google Sheets start with =.',
            hint: 'Equals sign.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'xl_2',
        title: 'Lesson 2: Logic Formulas (=IF & =VLOOKUP)',
        durationMinutes: 15,
        summary: 'Automate grading and look up student records using IF and VLOOKUP.',
        keyPoints: [
          '=IF(score >= 40, "Pass", "Fail") automatically tags pass/fail based on score.',
          '=VLOOKUP(search_key, range, index, FALSE) searches for a student ID and returns their name or rank.'
        ],
        contentSections: [
          {
            heading: 'Understanding =IF Logic',
            body: '=IF(condition, value_if_true, value_if_false). If B2 is 85, =IF(B2>=75, "Distinction", "Pass") returns "Distinction".'
          }
        ],
        practicalExercise: 'Write an =IF formula that returns "Pass" if cell A1 is 35 or higher, and "Fail" if under 35.',
        isCompleted: false
      },
      {
        id: 'xl_3',
        title: 'Lesson 3: PowerPoint Slide Design & 6x6 Rule',
        durationMinutes: 12,
        summary: 'Design professional presentation slides for school and college projects.',
        keyPoints: [
          '6x6 Rule: Maximum 6 bullet points per slide, maximum 6 words per bullet point.',
          'Use high contrast: Dark text on light slides or light text on dark background.',
          'Never fill slides with huge text paragraphs—slides are visual aids for your speech.'
        ],
        contentSections: [
          {
            heading: 'Structure of a Great Presentation',
            body: 'Slide 1: Title & Name. Slide 2: Problem / Topic Introduction. Slide 3-5: Key Diagrams & Findings. Slide 6: Conclusion & Thank You.'
          }
        ],
        practicalExercise: 'Design a 3-slide outline for a presentation on "Solar Energy in India".',
        isCompleted: false
      },
      {
        id: 'xl_4',
        title: 'Lesson 4: Creating Charts & Graphs in Excel/PPT',
        durationMinutes: 12,
        summary: 'Turn raw numbers into clear Bar Charts and Pie Charts for project reports.',
        keyPoints: [
          'Use Bar Charts to compare numbers across different categories (e.g. marks in Math vs Physics).',
          'Use Pie Charts to show percentage shares of a whole (e.g. household monthly budget split).',
          'Always add clear Chart Titles and Axis Labels.'
        ],
        contentSections: [
          {
            heading: 'Creating a Chart in 3 Clicks',
            body: 'Select your table data → Click Insert tab → Choose Column/Bar Chart → Customize title.'
          }
        ],
        practicalExercise: 'Create a simple 2-column table of subject scores and insert a Bar Chart.',
        isCompleted: false
      }
    ]
  },

  {
    id: 'general_knowledge',
    title: 'General Knowledge',
    category: 'Awareness & Competitive Base',
    description: 'Indian Constitution, scientific discoveries, world geography, and national organizations for entrance exams.',
    iconName: 'Globe',
    completedLessonsCount: 0,
    totalLessonsCount: 4,
    lessons: [
      {
        id: 'gk_1',
        title: 'Lesson 1: Indian Constitution & Governance Basics',
        durationMinutes: 15,
        summary: 'Understand the Preamble, Fundamental Rights, and 3 branches of Indian government.',
        keyPoints: [
          'Dr. B.R. Ambedkar is revered as the Father of the Indian Constitution.',
          'India celebrates Republic Day on January 26 (enactment of Constitution in 1950).',
          'The 3 Pillars of Government: Legislature (makes laws), Executive (implements laws), Judiciary (interprets laws & enforces rights).',
          'Minimum voting age in India is 18 years.'
        ],
        contentSections: [
          {
            heading: 'Fundamental Rights Overview',
            body: 'The Constitution guarantees 6 Fundamental Rights to all citizens, including Right to Equality, Right to Freedom, and Right to Education.'
          }
        ],
        practicalExercise: 'Memorize the key words of the Preamble: Sovereign, Socialist, Secular, Democratic, Republic.',
        quiz: [
          {
            id: 'q_gk_1',
            question: 'Who is widely revered as the "Father of the Indian Constitution"?',
            options: [
              { id: 'A', text: 'Mahatma Gandhi' },
              { id: 'B', text: 'Dr. B.R. Ambedkar' },
              { id: 'C', text: 'Jawaharlal Nehru' },
              { id: 'D', text: 'Sardar Vallabhbhai Patel' }
            ],
            correctAnswer: 'B',
            explanation: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Constitution.',
            hint: 'Chairman of Drafting Committee.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'gk_2',
        title: 'Lesson 2: Famous Scientific Inventions & Discoveries',
        durationMinutes: 12,
        summary: 'Key scientific milestones tested in general knowledge and quiz competitions.',
        keyPoints: [
          'Penicillin (First Antibiotic): Discovered by Alexander Fleming (1928).',
          'Gravity & Laws of Motion: Sir Isaac Newton.',
          'Raman Effect (Light Scattering): Sir C.V. Raman (Won Nobel Prize in Physics 1930).',
          'Telephone: Alexander Graham Bell.'
        ],
        contentSections: [
          {
            heading: 'Indian Nobel Laureates in Science',
            body: 'C.V. Raman (Physics - Raman Effect), Subrahmanyan Chandrasekhar (Astrophysics - Chandrasekhar Limit), Venkatraman Ramakrishnan (Chemistry - Ribosome Structure).'
          }
        ],
        practicalExercise: 'Name 3 inventions you use daily and find out who invented them.',
        isCompleted: false
      },
      {
        id: 'gk_3',
        title: 'Lesson 3: Geography of India & Rivers',
        durationMinutes: 12,
        summary: 'Major mountain ranges, rivers, oceans, and capitals of India.',
        keyPoints: [
          'Longest river in India: Ganga.',
          'Highest mountain peak in India: Kanchenjunga (8,586 m).',
          'Largest ocean on Earth: Pacific Ocean.',
          'Southernmost point of mainland India: Kanyakumari.'
        ],
        contentSections: [
          {
            heading: 'Indian River Systems',
            body: 'Himalayan Rivers: Ganga, Yamuna, Brahmaputra, Indus (perennial rivers fed by snow). Peninsular Rivers: Godavari, Krishna, Kaveri, Narmada.'
          }
        ],
        practicalExercise: 'Locate Godavari river on an Indian physical map.',
        isCompleted: false
      },
      {
        id: 'gk_4',
        title: 'Lesson 4: Key National Organizations (ISRO, RBI, DRDO)',
        durationMinutes: 12,
        summary: 'Roles of premier Indian scientific, space, and economic institutions.',
        keyPoints: [
          'ISRO (Indian Space Research Organisation): Space exploration & Chandrayaan/Aditya missions. HQ: Bengaluru.',
          'RBI (Reserve Bank of India): Central bank that regulates currency & interest rates. HQ: Mumbai.',
          'DRDO (Defence Research and Development Organisation): Defence technology & missile systems.'
        ],
        contentSections: [
          {
            heading: 'Why Institution Knowledge Matters',
            body: 'Understanding ISRO, RBI, and DRDO prepares students for current affairs questions in JEE/NEET/CUET/Civil Services.'
          }
        ],
        practicalExercise: 'Find out the current Chairman of ISRO and Governor of RBI.',
        isCompleted: false
      }
    ]
  },

  {
    id: 'basic_commerce',
    title: 'Basic Commerce & Financial Literacy',
    category: 'Life Skills & Money',
    description: 'Savings, simple vs compound interest, bank accounts, 50/30/20 budgeting, and UPI digital payments.',
    iconName: 'IndianRupee',
    completedLessonsCount: 0,
    totalLessonsCount: 4,
    lessons: [
      {
        id: 'fin_1',
        title: 'Lesson 1: Money Basics — Savings, Income & Expenses',
        durationMinutes: 15,
        summary: 'Understand the difference between Income, Fixed Expenses, Variable Expenses, and Savings.',
        keyPoints: [
          'Income = Money you earn (salary, pocket money, stipend).',
          'Expenses = Money you spend (food, fees, travel).',
          'Savings = Income minus Expenses (Savings = Income - Expenses).',
          'Golden Rule: Save first before spending, rather than saving what is left over.'
        ],
        contentSections: [
          {
            heading: 'The 50/30/20 Rule for Beginners',
            body: 'Divide income into: 50% Needs (food, rent, school fees), 30% Wants (movies, dining, hobbies), and 20% Savings & Emergency Fund.'
          }
        ],
        practicalExercise: 'Write down a mock monthly budget for ₹5,000 using the 50/30/20 rule.',
        quiz: [
          {
            id: 'q_fin_1',
            question: 'Under the 50/30/20 budgeting rule, what percentage of your income should ideally go toward Savings?',
            options: [
              { id: 'A', text: '5%' },
              { id: 'B', text: '10%' },
              { id: 'C', text: '20%' },
              { id: 'D', text: '50%' }
            ],
            correctAnswer: 'C',
            explanation: 'The 50/30/20 rule recommends setting aside 20% for savings and emergency funds.',
            hint: '20% for savings.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'fin_2',
        title: 'Lesson 2: How Bank Accounts Work (Savings vs Fixed Deposit)',
        durationMinutes: 12,
        summary: 'Types of bank accounts, debit cards, interest rates, and Fixed Deposits (FD).',
        keyPoints: [
          'Savings Account: Safe place to deposit money with daily withdrawal access and ~3-4% annual interest.',
          'Fixed Deposit (FD): Lock money for a fixed period (e.g. 1 year) to earn higher interest (~6-7.5%).',
          'Debit Card: Withdraws money directly from your existing bank account balance.'
        ],
        contentSections: [
          {
            heading: 'Why Keep Money in Banks?',
            body: 'Cash kept at home loses purchasing power due to inflation. Bank accounts pay interest and keep money safe from theft or loss.'
          }
        ],
        practicalExercise: 'Ask your parents what type of bank account they use for savings and FDs.',
        isCompleted: false
      },
      {
        id: 'fin_3',
        title: 'Lesson 3: Simple vs Compound Interest Magic',
        durationMinutes: 15,
        summary: 'Learn how compound interest makes your money grow exponentially over time.',
        keyPoints: [
          'Simple Interest: Interest calculated ONLY on original principal amount. SI = (P × R × T) / 100.',
          'Compound Interest: Interest calculated on principal PLUS previous accumulated interest (Interest on Interest!). A = P(1 + r/n)^(nt).',
          'Albert Einstein called Compound Interest the "8th Wonder of the World".'
        ],
        contentSections: [
          {
            heading: 'Simple vs Compound Example',
            body: 'If you invest ₹10,000 at 10% interest for 3 years:\nSimple Interest = ₹1,000 + ₹1,000 + ₹1,000 = ₹3,000 total interest.\nCompound Interest = Yr 1: ₹1,000, Yr 2: ₹1,100, Yr 3: ₹1,210 = ₹3,310 total interest!'
          }
        ],
        practicalExercise: 'Calculate Simple Interest for P = ₹1,000, R = 5%, T = 2 years using SI = (P × R × T) / 100.',
        quiz: [
          {
            id: 'q_fin_3',
            question: 'What is the Simple Interest on ₹2,000 at 5% annual interest rate for 2 years?',
            options: [
              { id: 'A', text: '₹100' },
              { id: 'B', text: '₹200' },
              { id: 'C', text: '₹300' },
              { id: 'D', text: '₹400' }
            ],
            correctAnswer: 'B',
            explanation: 'SI = (2000 × 5 × 2) / 100 = 20000 / 100 = ₹200.',
            hint: '(P × R × T) / 100.'
          }
        ],
        isCompleted: false
      },
      {
        id: 'fin_4',
        title: 'Lesson 4: Digital Payments (UPI) & Security PIN Safety',
        durationMinutes: 12,
        summary: 'How UPI (Unified Payments Interface) works and safety rules for online payments.',
        keyPoints: [
          'UPI allows instant money transfers between bank accounts using a VPA (e.g. name@upi) or QR code.',
          'GOLDEN RULE: You enter your UPI PIN ONLY to PAY / send money. You NEVER need to enter your PIN to RECEIVE money.',
          'Never click suspicious SMS links claiming "You won ₹10,000! Click here to claim into bank."'
        ],
        contentSections: [
          {
            heading: 'UPI Security Checklist',
            body: '1. Keep your UPI PIN secret.\n2. Verify beneficiary receiver name before hitting Pay.\n3. Remember: Receiving money never requires a PIN.'
          }
        ],
        practicalExercise: 'Explain the UPI PIN safety rule ("PIN is only for sending money, never for receiving") out loud to a family member.',
        isCompleted: false
      }
    ]
  }
];
