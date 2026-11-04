import { AIReadinessDiagnostic } from '../types';

export function calculateAIReadiness(
  specialization: string,
  assessmentScore?: number,
  interests: string[] = []
): AIReadinessDiagnostic {
  const specLower = (specialization || '').toLowerCase();
  const interestText = interests.join(' ').toLowerCase();

  let baseScore = 68;
  if (assessmentScore !== undefined) {
    baseScore = Math.round(50 + (assessmentScore / 20) * 45);
  }

  // Domain adjustments
  if (specLower.includes('ai') || specLower.includes('machine learning') || specLower.includes('data science')) {
    baseScore = Math.min(96, baseScore + 10);
  } else if (specLower.includes('computer') || specLower.includes('software')) {
    baseScore = Math.min(94, baseScore + 6);
  }

  let level: AIReadinessDiagnostic['level'] = 'Competent';
  if (baseScore >= 90) level = 'Pioneer';
  else if (baseScore >= 78) level = 'Advanced';
  else if (baseScore >= 65) level = 'Competent';
  else if (baseScore >= 50) level = 'Emerging';
  else level = 'Beginner';

  const pillars = [
    {
      pillar: 'Basic AI Understanding',
      score: Math.min(100, baseScore + 4),
      description: 'Knowing how AI models work, what they do well, and where they make mistakes.',
      status: (baseScore >= 75 ? 'Proficient' : baseScore >= 60 ? 'Developing' : 'Needs Foundation') as any
    },
    {
      pillar: 'Writing Good Prompts',
      score: Math.min(100, Math.max(40, baseScore - 2)),
      description: 'Giving clear instructions, background details, and asking step-by-step questions.',
      status: (baseScore >= 80 ? 'Leading' : baseScore >= 65 ? 'Proficient' : 'Developing') as any
    },
    {
      pillar: 'Using AI in Your Subject',
      score: Math.min(100, baseScore + 2),
      description: `Applying smart AI tools to ${specialization || 'your chosen subject'} to study and solve problems faster.`,
      status: (baseScore >= 70 ? 'Proficient' : 'Developing') as any
    },
    {
      pillar: 'Safe, Honest & Ethical Use',
      score: Math.min(100, Math.max(50, baseScore - 6)),
      description: 'Spotting mistakes, protecting private data, and using AI tools honestly in your studies.',
      status: (baseScore >= 75 ? 'Proficient' : 'Developing') as any
    }
  ];

  let domainImpactAnalysis = '';
  let futureSkillsRoadmap: string[] = [];
  let recommendedAITools: AIReadinessDiagnostic['recommendedAITools'] = [];

  if (specLower.includes('bba') || specLower.includes('mba') || specLower.includes('commerce') || specLower.includes('finance')) {
    domainImpactAnalysis =
      'AI tools are changing how companies forecast sales, catch banking fraud, and understand customer needs. Students who understand both finance and AI tools will stand out and find great career opportunities.';
    futureSkillsRoadmap = [
      'Learn basic financial forecasting with Python and spreadsheets',
      'Use AI tools to quickly summarize company earnings reports and market trends',
      'Practice writing prompts to find errors or unusual numbers in accounting sheets',
      'Build visual charts and dashboards that update automatically'
    ];
    recommendedAITools = [
      {
        name: 'Financial Modeling Tools & Python',
        category: 'Finance Calculations',
        whyCrucial: 'Calculates investment returns and tests market scenarios in seconds.',
        useCaseForDomain: 'Testing investment risks across different market conditions.'
      },
      {
        name: 'Smart Dashboards & Power BI',
        category: 'Business Charts',
        whyCrucial: 'Turns sales numbers into easy-to-read charts and written summaries.',
        useCaseForDomain: 'Tracking monthly sales and finding inventory issues.'
      },
      {
        name: 'Gemini & AI Research Assistants',
        category: 'Market Research',
        whyCrucial: 'Helps research competitors and draft business plans faster.',
        useCaseForDomain: 'Creating new product launch plans.'
      }
    ];
  } else if (specLower.includes('bio') || specLower.includes('bipc') || specLower.includes('mbipc') || specLower.includes('health') || specLower.includes('medical') || specLower.includes('pharm')) {
    domainImpactAnalysis =
      'AI tools like AlphaFold and medical scanners are helping scientists discover new medicines and read patient X-rays faster. Doctors and biologists who know how to use these tools are leading modern healthcare.';
    futureSkillsRoadmap = [
      'Explore AlphaFold and online 3D protein databases',
      'Learn basic Python to search DNA sequences and study gene patterns',
      'Learn how patient privacy rules apply when using medical AI tools',
      'Understand how computers help doctors spot signs of disease on medical scans'
    ];
    recommendedAITools = [
      {
        name: 'AlphaFold 3D Protein Finder',
        category: 'Biology Research',
        whyCrucial: 'Predicts the 3D shapes of human and virus proteins in seconds.',
        useCaseForDomain: 'Designing new medicines and vaccines.'
      },
      {
        name: 'BioPython & Google Colab',
        category: 'Genetics & DNA Tools',
        whyCrucial: 'Reads and searches DNA files with simple code.',
        useCaseForDomain: 'Finding genetic markers for health research.'
      },
      {
        name: 'Medical Image AI Models',
        category: 'Hospital Diagnostics',
        whyCrucial: 'Highlights suspicious spots on X-rays and tissue scans for doctors to review.',
        useCaseForDomain: 'Helping doctors examine medical scans faster.'
      }
    ];
  } else {
    // Computing, Engineering, General STEM
    domainImpactAnalysis =
      'Software engineering is shifting toward smart coding assistants and automated workflows. Engineers who can guide AI tools, build smart search engines, and connect databases have a huge advantage.';
    futureSkillsRoadmap = [
      'Learn modern AI coding assistants (like Cursor and Copilot) to write and debug code faster',
      'Build smart search systems that allow users to ask questions in plain English',
      'Learn how to adjust and fine-tune open AI models for specific projects',
      'Test AI programs carefully to make sure they do not give wrong answers'
    ];
    recommendedAITools = [
      {
        name: 'Cursor & AI Code Assistants',
        category: 'Smart Coding Tools',
        whyCrucial: 'Helps write, check, and fix code across entire projects quickly.',
        useCaseForDomain: 'Building web and mobile apps faster.'
      },
      {
        name: 'LangChain & Search Index Frameworks',
        category: 'AI Connecting Tools',
        whyCrucial: 'Connects AI models to your own documents and databases.',
        useCaseForDomain: 'Building smart search assistants for school or company files.'
      },
      {
        name: 'Hugging Face & Ollama',
        category: 'Free & Local AI Models',
        whyCrucial: 'Allows you to run AI models privately on your own computer without paying.',
        useCaseForDomain: 'Testing custom AI models securely.'
      }
    ];
  }

  return {
    score: baseScore,
    level,
    pillars,
    domainImpactAnalysis,
    futureSkillsRoadmap,
    recommendedAITools
  };
}
