import { CareerInterestQuestion, CareerInterestResult } from '../types';

export const CAREER_INTEREST_QUESTIONS: CareerInterestQuestion[] = [
  {
    id: 1,
    question: '1. Which activity sounds most interesting to you?',
    options: [
      { id: 'A', text: 'Making apps or exploring computers', stream: 'tech_ai' },
      { id: 'B', text: 'Understanding living things and the human body', stream: 'bio_health' },
      { id: 'C', text: 'Working with numbers and money', stream: 'finance_business' },
      { id: 'D', text: 'Understanding people and society', stream: 'humanities_social' }
    ]
  },
  {
    id: 2,
    question: '2. Which school activity do you enjoy most?',
    options: [
      { id: 'A', text: 'Solving computer or logic problems', stream: 'tech_ai' },
      { id: 'B', text: 'Biology and scientific activities', stream: 'bio_health' },
      { id: 'C', text: 'Mathematics and working with data', stream: 'finance_business' },
      { id: 'D', text: 'Discussions, reading, or writing', stream: 'humanities_social' }
    ]
  },
  {
    id: 3,
    question: '3. If you could try one mini-project, what would you choose?',
    options: [
      { id: 'A', text: 'Build a simple website', stream: 'tech_ai' },
      { id: 'B', text: 'Create a biology-related project', stream: 'bio_health' },
      { id: 'C', text: 'Plan a small shop\'s budget', stream: 'finance_business' },
      { id: 'D', text: 'Create a campaign to help people', stream: 'humanities_social' }
    ]
  },
  {
    id: 4,
    question: '4. Which type of problem would you like to solve?',
    options: [
      { id: 'A', text: 'How to make technology work better', stream: 'tech_ai' },
      { id: 'B', text: 'How living organisms function', stream: 'bio_health' },
      { id: 'C', text: 'How to save or manage money', stream: 'finance_business' },
      { id: 'D', text: 'How to improve people\'s lives', stream: 'humanities_social' }
    ]
  },
  {
    id: 5,
    question: '5. Which tools would you like to learn?',
    options: [
      { id: 'A', text: 'Coding and AI tools', stream: 'tech_ai' },
      { id: 'B', text: 'Scientific and laboratory tools', stream: 'bio_health' },
      { id: 'C', text: 'Excel and financial tools', stream: 'finance_business' },
      { id: 'D', text: 'Writing and communication tools', stream: 'humanities_social' }
    ]
  },
  {
    id: 6,
    question: '6. Which topic would you explore in your free time?',
    options: [
      { id: 'A', text: 'Computers, apps, and technology', stream: 'tech_ai' },
      { id: 'B', text: 'Biology, health, and living organisms', stream: 'bio_health' },
      { id: 'C', text: 'Business, banking, and finance', stream: 'finance_business' },
      { id: 'D', text: 'Psychology, society, and communication', stream: 'humanities_social' }
    ]
  },
  {
    id: 7,
    question: '7. Which role sounds interesting in a team project?',
    options: [
      { id: 'A', text: 'Building the technical part', stream: 'tech_ai' },
      { id: 'B', text: 'Investigating a scientific question', stream: 'bio_health' },
      { id: 'C', text: 'Managing the budget and planning', stream: 'finance_business' },
      { id: 'D', text: 'Presenting ideas and coordinating people', stream: 'humanities_social' }
    ]
  },
  {
    id: 8,
    question: '8. What would you most like to create?',
    options: [
      { id: 'A', text: 'A useful app or digital tool', stream: 'tech_ai' },
      { id: 'B', text: 'A scientific investigation', stream: 'bio_health' },
      { id: 'C', text: 'A business idea or money plan', stream: 'finance_business' },
      { id: 'D', text: 'A helpful community project', stream: 'humanities_social' }
    ]
  },
  {
    id: 9,
    question: '9. Which skill would you most like to improve?',
    options: [
      { id: 'A', text: 'Logical thinking and problem-solving', stream: 'tech_ai' },
      { id: 'B', text: 'Scientific observation and analysis', stream: 'bio_health' },
      { id: 'C', text: 'Numerical and analytical skills', stream: 'finance_business' },
      { id: 'D', text: 'Communication and leadership', stream: 'humanities_social' }
    ]
  },
  {
    id: 10,
    question: '10. Which field would you like to explore first?',
    options: [
      { id: 'A', text: 'IT, Programming, and AI', stream: 'tech_ai' },
      { id: 'B', text: 'Biology, Healthcare, and Life Sciences', stream: 'bio_health' },
      { id: 'C', text: 'Finance, Analytics, and Business', stream: 'finance_business' },
      { id: 'D', text: 'Commerce, Humanities, and Social Impact', stream: 'humanities_social' }
    ]
  }
];

export const STREAM_METADATA = {
  tech_ai: {
    title: 'Technology, Engineering & Artificial Intelligence',
    shortTitle: 'Tech & AI Stream (MPC / CSE / BCA / IT)',
    recommendedCourses: [
      'Intermediate: MPC (Mathematics, Physics, Chemistry)',
      'Intermediate: MPC with Computer Science',
      'Undergraduate: B.Tech Computer Science & AI / Data Science',
      'Undergraduate: BCA (Artificial Intelligence & Machine Learning)',
      'Undergraduate: B.Sc. MSDS (Maths, Stats & Data Science)',
      'Diploma: Computer Science & Engineering / AI & ML'
    ],
    potentialCareers: [
      'AI / Machine Learning Engineer',
      'Full-Stack Software Developer',
      'Data Scientist & Big Data Analyst',
      'Robotics & Autonomous Systems Engineer',
      'Cloud & Cybersecurity Architect'
    ],
    rationale:
      'You enjoy solving logic puzzles, working with computers, and building digital things. You like learning how technology works and creating smart solutions.',
    aiReadinessFocus:
      'Learn basic Python coding, simple logic, and how to use helpful AI tools to build real projects.'
  },
  bio_health: {
    title: 'Biology, Healthcare, Medicine & Life Sciences',
    shortTitle: 'Life Sciences & Medicine (BiPC / MBiPC / MBBS / Biotechnology)',
    recommendedCourses: [
      'Intermediate: BiPC (Biology, Physics, Chemistry)',
      'Intermediate: MBiPC (Engineering & Medical Base)',
      'Undergraduate: MBBS / BDS / BAMS / BHMS',
      'Undergraduate: B.Sc. Biotechnology / Microbiology / Genetics',
      'Undergraduate: B.Sc. Medical Laboratory Technology (MLT)',
      'Undergraduate: B.Tech Biomedical Engineering'
    ],
    potentialCareers: [
      'Doctor / Surgeon / Medical Specialist',
      'Biotechnologist & Genetic Scientist',
      'Bioinformatics & Health Data Specialist',
      'Medicine & Vaccine Research Scientist',
      'Clinical Lab & Health Testing Specialist'
    ],
    rationale:
      'You are curious about living things, the human body, and science. You like learning how living systems work and helping people stay healthy.',
    aiReadinessFocus:
      'Learn how AI helps doctors find illnesses early, read medical scans, and discover new medicines.'
  },
  finance_business: {
    title: 'Finance, Commerce, Analytics & Economics',
    shortTitle: 'Commerce & Financial Analytics (MEC / B.Com / BBA / CA)',
    recommendedCourses: [
      'Intermediate: MEC (Mathematics, Economics, Commerce)',
      'Undergraduate: B.Com (Finance / Business Analytics / FinTech)',
      'Undergraduate: BBA (Finance / FinTech / Business)',
      'Professional: CA (Chartered Accountancy) / CFA / CMA',
      'Undergraduate: B.Sc. Economics & Financial Mathematics'
    ],
    potentialCareers: [
      'Investment Banker & Wealth Manager',
      'Chartered Accountant & Tax Consultant',
      'FinTech Analyst & Product Manager',
      'Business Consultant & Company Auditor',
      'Risk & Insurance Specialist'
    ],
    rationale:
      'You enjoy working with numbers, money, and business plans. You like calculating outcomes and making smart choices with data.',
    aiReadinessFocus:
      'Learn how spreadsheets, automated tools, and AI help businesses track money and forecast growth.'
  },
  humanities_social: {
    title: 'Humanities, Social Impact, Law & Communication',
    shortTitle: 'Humanities, Law & Governance (HEC / CEC / BA / Law)',
    recommendedCourses: [
      'Intermediate: HEC (History, Economics, Civics)',
      'Intermediate: CEC (Civics, Economics, Commerce)',
      'Undergraduate: BA (Economics, Psychology, Political Science, English)',
      'Professional: 5-Year Integrated BA LLB / BBA LLB (Law)',
      'Undergraduate: Journalism & Mass Communication / Social Work',
      'Postgraduate: MA / Public Policy / Civil Services Preparation'
    ],
    potentialCareers: [
      'Lawyer / Legal Advisor / Judge',
      'Civil Services Officer (IAS / IPS / State Services)',
      'Public Policy & Government Advisor',
      'Journalist, Content Creator & Media Lead',
      'Counselor, Psychologist & Social Worker'
    ],
    rationale:
      'You care about people, society, laws, and clear communication. You enjoy speaking up, sharing ideas, and helping your community grow.',
    aiReadinessFocus:
      'Learn how AI is changing law, writing, and society, and how we can make sure technology stays safe and fair for all people.'
  }
};

export function calculateCareerInterest(answers: Record<number, 'A' | 'B' | 'C' | 'D'>): CareerInterestResult {
  const scores = {
    tech_ai: 0,
    bio_health: 0,
    finance_business: 0,
    humanities_social: 0
  };

  CAREER_INTEREST_QUESTIONS.forEach((q) => {
    const selected = answers[q.id];
    if (selected) {
      const opt = q.options.find((o) => o.id === selected);
      if (opt) {
        scores[opt.stream] += 1;
      }
    }
  });

  const streamKeys: Array<'tech_ai' | 'bio_health' | 'finance_business' | 'humanities_social'> = [
    'tech_ai',
    'bio_health',
    'finance_business',
    'humanities_social'
  ];

  const sortedStreams = streamKeys
    .map((k) => ({
      key: k,
      score: scores[k],
      percentage: Math.round((scores[k] / 10) * 100)
    }))
    .sort((a, b) => b.score - a.score);

  const highestScore = sortedStreams[0].score;
  const topStreams = sortedStreams.filter((s) => s.score === highestScore || s.score >= highestScore - 1);
  const isTied = sortedStreams.filter((s) => s.score === highestScore).length > 1;

  const recommendations = topStreams.map((s) => {
    const meta = STREAM_METADATA[s.key];
    return {
      streamKey: s.key,
      title: meta.title,
      score: s.score,
      percentage: s.percentage,
      rationale: meta.rationale,
      recommendedCourses: meta.recommendedCourses,
      potentialCareers: meta.potentialCareers,
      aiReadinessFocus: meta.aiReadinessFocus
    };
  });

  return {
    id: `interest-${Date.now()}`,
    date: new Date().toISOString(),
    answers,
    scores,
    recommendations,
    isTied
  };
}
