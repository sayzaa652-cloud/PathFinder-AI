import { SalaryInsight, IndustryProject } from '../types';

export const SALARY_INSIGHTS_DATA: SalaryInsight[] = [
  {
    streamId: 'tech_ai',
    roleTitle: 'AI / Machine Learning Engineer & Software Architect',
    industry: 'Technology, AI & Cloud Computing',
    entryLevelINR: '₹8,50,000 - ₹14,00,000 / yr',
    midLevelINR: '₹18,00,000 - ₹32,00,000 / yr',
    seniorLevelINR: '₹40,00,000 - ₹75,00,000+ / yr',
    entryLevelUSD: '$95,000 - $130,000 / yr',
    seniorLevelUSD: '$180,000 - $260,000+ / yr',
    topHiringSectors: ['AI Labs & Tech Companies', 'Banking & FinTech', 'Cloud Services', 'Healthcare Tech'],
    aiImpactProjection: 'High Growth — Engineers who know how to build AI models and automated workflows earn significantly higher salaries.'
  },
  {
    streamId: 'health_med',
    roleTitle: 'Doctor, Surgeon & Healthcare Specialist (MBBS / MD)',
    industry: 'Healthcare, Hospitals & Clinical Medicine',
    entryLevelINR: '₹9,00,000 - ₹15,00,000 / yr',
    midLevelINR: '₹22,00,000 - ₹45,00,000 / yr',
    seniorLevelINR: '₹55,00,000 - ₹1,20,00,000+ / yr',
    entryLevelUSD: '$210,000 - $260,000 / yr',
    seniorLevelUSD: '$380,000 - $550,000+ / yr',
    topHiringSectors: ['Major Hospitals', 'Specialty Surgery Centers', 'Clinical Research Centers', 'Telemedicine Clinics'],
    aiImpactProjection: 'High Demand — AI helps doctors read X-rays and medical tests faster, increasing the need for skilled physicians who make the final decisions.'
  },
  {
    streamId: 'bio_pharma',
    roleTitle: 'Bioinformatics Specialist & Pharma Research Scientist',
    industry: 'Biotechnology, Genetics & Medicine Discovery',
    entryLevelINR: '₹6,00,000 - ₹10,50,000 / yr',
    midLevelINR: '₹14,00,000 - ₹24,00,000 / yr',
    seniorLevelINR: '₹30,00,000 - ₹55,00,000 / yr',
    entryLevelUSD: '$80,000 - $115,000 / yr',
    seniorLevelUSD: '$150,000 - $220,000 / yr',
    topHiringSectors: ['Pharma Labs', 'DNA Sequencing Centers', 'Agriculture Biotech', 'Vaccine Development'],
    aiImpactProjection: 'Big Growth — AI tools are speeding up drug discovery and vaccine research, making biology combined with computer skills very valuable.'
  },
  {
    streamId: 'finance_commerce',
    roleTitle: 'Chartered Accountant, Investment Banker & Financial Analyst',
    industry: 'Banking, Corporate Finance & Investment Management',
    entryLevelINR: '₹7,50,000 - ₹16,00,000 / yr',
    midLevelINR: '₹18,00,000 - ₹35,00,000 / yr',
    seniorLevelINR: '₹45,00,000 - ₹90,00,000+ / yr',
    entryLevelUSD: '$105,000 - $150,000 / yr',
    seniorLevelUSD: '$220,000 - $400,000+ / yr',
    topHiringSectors: ['Investment Banking', 'Accounting & Audit Firms', 'Private Equity', 'Financial Analytics Companies'],
    aiImpactProjection: 'Growing Need — While computers handle basic bookkeeping, companies pay top salaries to experts who can model financial risks and make smart investment decisions.'
  },
  {
    streamId: 'civil_law',
    roleTitle: 'Corporate Lawyer, Cyber Law Advisor & Civil Services',
    industry: 'Law, Public Administration & Policy Advisory',
    entryLevelINR: '₹5,50,000 - ₹12,00,000 / yr',
    midLevelINR: '₹15,00,000 - ₹28,00,000 / yr',
    seniorLevelINR: '₹35,00,000 - ₹80,00,000+ / yr',
    entryLevelUSD: '$85,000 - $140,000 / yr',
    seniorLevelUSD: '$190,000 - $350,000 / yr',
    topHiringSectors: ['Corporate Law Firms', 'Civil & Government Services', 'Technology Legal Advisory', 'Arbitration & Courts'],
    aiImpactProjection: 'Time-Saving AI — AI tools find legal cases and check contracts quickly, freeing lawyers to focus on courtroom arguments, strategy, and client advice.'
  },
  {
    streamId: 'core_engineering',
    roleTitle: 'Robotics, Mechanical & Electric Vehicle Design Engineer',
    industry: 'Automotive, Manufacturing & Aerospace',
    entryLevelINR: '₹6,50,000 - ₹11,00,000 / yr',
    midLevelINR: '₹14,00,000 - ₹25,00,000 / yr',
    seniorLevelINR: '₹30,00,000 - ₹60,00,000 / yr',
    entryLevelUSD: '$88,000 - $120,000 / yr',
    seniorLevelUSD: '$160,000 - $240,000 / yr',
    topHiringSectors: ['Electric Vehicle Companies', 'Aerospace & Defense', 'Smart Factory Automation', 'Clean Energy'],
    aiImpactProjection: 'Modern Shift — Combining mechanical engineering with software, smart sensors, and electric vehicles creates top job opportunities.'
  }
];

export const INDUSTRY_PROJECTS_DATA: IndustryProject[] = [
  {
    id: 'proj_1',
    title: 'AI-Assisted Chest X-Ray Health Scanner',
    domain: 'Medicine & Healthcare / Computer Vision',
    level: 'Capstone',
    problemStatement: 'Build a program that spots early signs of lung illness on chest X-rays and highlights the exact areas on the image so doctors can inspect them.',
    skillsPracticed: ['Image Recognition with Neural Networks', 'Medical Image Processing', 'Accuracy & Sensitivity Checks', 'Explainable Visual Heatmaps'],
    techStack: ['Python', 'PyTorch / TensorFlow', 'OpenCV', 'Streamlit Web UI'],
    expectedOutput: 'An easy-to-use web app where doctors can upload an X-ray and see clear highlighted areas showing possible concerns.',
    aiIntegrationNote: 'Doctor-approved design: The tool only gives helpful suggestions—the human doctor always makes the final call.'
  },
  {
    id: 'proj_2',
    title: 'Smart Investment Portfolio & Risk Planner',
    domain: 'Finance & Practical Commerce',
    level: 'Intermediate',
    problemStatement: 'Create a program that tests different combinations of stocks and bonds over 10 years of market data to find the safest return for investors.',
    skillsPracticed: ['Investment Risk Calculations', 'Data Analysis with Pandas', 'Probability Simulations', 'Market Trend Tracking'],
    techStack: ['Python', 'Pandas & NumPy', 'Stock Market API', 'Interactive Charts'],
    expectedOutput: 'A simple visual dashboard that shows the best mix of investments and compares possible returns against market risks.',
    aiIntegrationNote: 'Uses AI to scan business news and warn investors about major market events.'
  },
  {
    id: 'proj_3',
    title: 'Smart Solar & Battery Power Manager',
    domain: 'Electrical & Core Engineering',
    level: 'Capstone',
    problemStatement: 'Build a smart system that predicts daily sunshine and decides when to use solar power, store battery energy, or save on grid electricity costs.',
    skillsPracticed: ['Energy Cost Optimization', 'Weather Pattern Forecasting', 'Solar & Battery Systems', 'Smart Meter Communication'],
    techStack: ['Python / MATLAB', 'Machine Learning Models', 'Optimization Tools', 'Sensor Protocols'],
    expectedOutput: 'A simulation showing up to 22% savings on power bills by automatically scheduling when to use stored battery energy.',
    aiIntegrationNote: 'Uses machine learning weather forecasts to plan solar energy 24 hours in advance.'
  },
  {
    id: 'proj_4',
    title: 'DNA & Genetic Health Marker Finder',
    domain: 'Life Sciences & Biotechnology',
    level: 'Intermediate',
    problemStatement: 'Analyze DNA test data to find important genetic variations and match them with known medical databases to check for inherited health conditions.',
    skillsPracticed: ['DNA Sequence Analysis', 'Genetics File Formats', 'Medical Database Lookups', 'Data Cleaning & Verification'],
    techStack: ['Linux Shell', 'Biopython', 'Genome Tools', 'Genome Viewer'],
    expectedOutput: 'A clear report listing important gene changes with simple explanations of their possible health effects.',
    aiIntegrationNote: 'Uses AI protein predictions to understand how gene changes affect the human body.'
  },
  {
    id: 'proj_5',
    title: 'Legal Search Engine for Supreme Court Cases',
    domain: 'Law & Civics / Natural Language Search',
    level: 'Beginner',
    problemStatement: 'Build a search tool that allows law students and lawyers to find key court rulings by typing normal questions in everyday language.',
    skillsPracticed: ['Legal Text Search', 'AI Text Matching', 'Document Summaries', 'Court Ruling Analysis'],
    techStack: ['Python', 'ChromaDB / Search Index', 'LangChain', 'React UI'],
    expectedOutput: 'A search tool that returns the exact court paragraphs answering the question, with plain-English summaries of the decision.',
    aiIntegrationNote: 'Gives exact quotes and case citations so you never get made-up answers.'
  }
];

export const CROSS_DISCIPLINARY_MAP = [
  {
    pair: 'Life Sciences + Artificial Intelligence',
    title: 'Computational Biology & Smart Healthcare',
    description: 'Using AI to discover new medicines, understand human genetics, and guide surgical tools in hospitals.',
    keySkills: ['Biology Data Tools', 'Python & AI Basics', 'Genetics Information', 'Healthcare Ethics'],
    careerTitles: ['Bioinformatics Specialist', 'AI Drug Discovery Researcher', 'Digital Health Consultant']
  },
  {
    pair: 'Commerce / Economics + Computer Science',
    title: 'Quantitative Finance & Smart FinTech',
    description: 'Modern banking and investing using automated trading, secure online contracts, and fast digital credit checks.',
    keySkills: ['Financial Math', 'Python & Coding', 'Trend Analysis', 'Risk Management'],
    careerTitles: ['Quantitative Analyst', 'FinTech Specialist', 'Financial Risk Manager']
  },
  {
    pair: 'Mechanical / Electrical + Software & AI',
    title: 'Robotics & Smart Machine Engineering',
    description: 'Building smart machines like self-driving cars, warehouse robots, and factory automation systems.',
    keySkills: ['Robotics Software', 'Computer Vision (Cameras & Sensors)', 'Control Systems', 'Microcontrollers & Hardware'],
    careerTitles: ['Robotics Engineer', 'Self-Driving Vehicle Specialist', 'Automation Engineer']
  },
  {
    pair: 'Humanities / Law + Artificial Intelligence',
    title: 'AI Ethics, Technology Law & Policy',
    description: 'Guiding new technology laws, protecting online copyright, preventing AI bias, and building smart tools for lawyers.',
    keySkills: ['Constitutional Law', 'Tech & Privacy Regulations', 'Ethics in AI', 'Legal Software Tools'],
    careerTitles: ['AI Ethics Advisor', 'Tech Policy Specialist', 'Cyber Law Consultant']
  }
];
