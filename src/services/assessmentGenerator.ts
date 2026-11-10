import { CURATED_ASSESSMENTS } from '../data/curatedAssessments';
import { Assessment, AssessmentQuestion, LearningResource } from '../types';
import { 
  buildIntermediateStreamAssessment, 
  generateCustomIntermediateAssessment 
} from '../data/intermediateStreamAssessments';

/**
 * Domain blueprints covering core academic competencies across disciplines.
 */
interface DomainBlueprint {
  keywords: string[];
  topics: string[];
  sampleQuestions: Omit<AssessmentQuestion, 'id'>[];
  recommendedResources: LearningResource[];
}

const DOMAIN_BLUEPRINTS: Record<string, DomainBlueprint> = {
  // 1. Computer Science, AI & IT (B.Tech CSE, BCA, Diploma IT, M.Tech CSE, etc.)
  tech_computing: {
    keywords: [
      'computer', 'cse', 'software', 'programming', 'ai', 'artificial intelligence',
      'machine learning', 'data science', 'cybersecurity', 'cloud', 'blockchain',
      'web', 'database', 'networks', 'information technology', 'iot', 'coding', 'computing'
    ],
    topics: ['Data Structures & Algorithms', 'System Architecture & OS', 'Artificial Intelligence & Data', 'Networks & Cybersecurity'],
    sampleQuestions: [
      {
        question: 'What is the worst-case time complexity of searching for an element in a balanced Binary Search Tree (AVL tree)?',
        options: [
          { id: 'A', text: 'O(1)' },
          { id: 'B', text: 'O(log n)' },
          { id: 'C', text: 'O(n)' },
          { id: 'D', text: 'O(n log n)' }
        ],
        correctAnswer: 'B',
        explanation: 'Balanced BSTs maintain maximum tree height proportional to log2(n), guaranteeing O(log n) worst-case search.',
        difficulty: 'Easy',
        topic: 'Data Structures & Algorithms',
        subtopic: 'Tree Structures'
      },
      {
        question: 'In relational database theory, which normal form (NF) eliminates transitive functional dependencies on the primary key?',
        options: [
          { id: 'A', text: 'First Normal Form (1NF)' },
          { id: 'B', text: 'Second Normal Form (2NF)' },
          { id: 'C', text: 'Third Normal Form (3NF)' },
          { id: 'D', text: 'Boyce-Codd Normal Form (BCNF)' }
        ],
        correctAnswer: 'C',
        explanation: '3NF requires that no non-prime attribute is transitively dependent on any candidate key (in 2NF and X->A implies X is superkey or A is prime).',
        difficulty: 'Easy',
        topic: 'System Architecture & OS',
        subtopic: 'Database Systems'
      },
      {
        question: 'Which machine learning evaluation metric is most appropriate for a heavily imbalanced fraud detection dataset where false negatives are costly?',
        options: [
          { id: 'A', text: 'Accuracy' },
          { id: 'B', text: 'Recall (Sensitivity)' },
          { id: 'C', text: 'Mean Squared Error' },
          { id: 'D', text: 'R-squared' }
        ],
        correctAnswer: 'B',
        explanation: 'Recall measures the fraction of actual fraud cases caught (True Positives / (TP + FN)), minimizing missed fraudulent cases.',
        difficulty: 'Medium',
        topic: 'Artificial Intelligence & Data',
        subtopic: 'Model Evaluation'
      },
      {
        question: 'In TCP/IP networking, what is the sequence of the standard three-way handshake used to establish a reliable connection?',
        options: [
          { id: 'A', text: 'SYN -> SYN-ACK -> ACK' },
          { id: 'B', text: 'ACK -> SYN -> ACK' },
          { id: 'C', text: 'SYN -> ACK -> DATA' },
          { id: 'D', text: 'FIN -> ACK -> FIN-ACK' }
        ],
        correctAnswer: 'A',
        explanation: 'TCP connection initiation sends a SYN packet, the server responds with SYN-ACK, and the client acknowledges with ACK.',
        difficulty: 'Easy',
        topic: 'Networks & Cybersecurity',
        subtopic: 'Transport Layer'
      },
      {
        question: 'In modern deep learning architectures, what mechanism allows Transformer models to dynamically attend to relevant tokens across long contexts?',
        options: [
          { id: 'A', text: 'Multi-Head Self-Attention' },
          { id: 'B', text: 'Recurrent hidden backpropagation' },
          { id: 'C', text: 'Batch Normalization layers' },
          { id: 'D', text: 'Stochastic Gradient Decoupling' }
        ],
        correctAnswer: 'A',
        explanation: 'Self-attention calculates query-key-value dot products across tokens, weighting contextual relationships globally in O(1) sequential path length.',
        difficulty: 'Medium',
        topic: 'Artificial Intelligence & Data',
        subtopic: 'Transformer Architecture'
      },
      {
        question: 'Which cryptographic algorithm is based on the mathematical difficulty of finding discrete logarithms in elliptic curve groups?',
        options: [
          { id: 'A', text: 'RSA' },
          { id: 'B', text: 'ECDSA / ECC' },
          { id: 'C', text: 'AES-256' },
          { id: 'D', text: 'SHA-256' }
        ],
        correctAnswer: 'B',
        explanation: 'Elliptic Curve Cryptography (ECC) and ECDSA rely on the Elliptic Curve Discrete Logarithm Problem (ECDLP), offering higher security per key bit.',
        difficulty: 'Hard',
        topic: 'Networks & Cybersecurity',
        subtopic: 'Cryptography'
      },
      {
        question: 'In operating systems, which condition is NOT one of Coffman\'s four necessary conditions for deadlock to occur?',
        options: [
          { id: 'A', text: 'Mutual Exclusion' },
          { id: 'B', text: 'Hold and Wait' },
          { id: 'C', text: 'Preemptive Scheduling' },
          { id: 'D', text: 'Circular Wait' }
        ],
        correctAnswer: 'C',
        explanation: 'The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption (resources cannot be forcibly taken), and Circular Wait. Preemption prevents deadlocks.',
        difficulty: 'Medium',
        topic: 'System Architecture & OS',
        subtopic: 'Deadlock Management'
      },
      {
        question: 'In gradient descent optimization, what problem does an excessively high learning rate (α) cause?',
        options: [
          { id: 'A', text: 'Model weights converge too slowly' },
          { id: 'B', text: 'Loss function overshoots the minimum and diverges' },
          { id: 'C', text: 'Vanishing gradients in early layers' },
          { id: 'D', text: 'Underfitting due to dead neurons' }
        ],
        correctAnswer: 'B',
        explanation: 'When the learning rate is too large, weight updates take giant strides that oscillate and diverge away from the optimal loss basin.',
        difficulty: 'Easy',
        topic: 'Artificial Intelligence & Data',
        subtopic: 'Optimization'
      },
      {
        question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n) while operating in-place with O(1) auxiliary space?',
        options: [
          { id: 'A', text: 'Merge Sort' },
          { id: 'B', text: 'Heap Sort' },
          { id: 'C', text: 'Quick Sort' },
          { id: 'D', text: 'Bubble Sort' }
        ],
        correctAnswer: 'B',
        explanation: 'Heap Sort guarantees O(n log n) upper bound under all input permutations and uses O(1) extra memory (unlike Merge Sort which requires O(n)).',
        difficulty: 'Medium',
        topic: 'Data Structures & Algorithms',
        subtopic: 'Sorting Algorithms'
      },
      {
        question: 'What is the primary role of the Docker Container daemon in cloud-native microservices architecture?',
        options: [
          { id: 'A', text: 'Providing kernel-level namespace and cgroup process isolation' },
          { id: 'B', text: 'Compiling high-level code to assembly' },
          { id: 'C', text: 'Managing hardware BIOS clock cycles' },
          { id: 'D', text: 'Emulating entire guest operating system hardware' }
        ],
        correctAnswer: 'A',
        explanation: 'Containers leverage Linux kernel namespaces and control groups (cgroups) to package applications with their dependencies in lightweight user space isolation.',
        difficulty: 'Medium',
        topic: 'System Architecture & OS',
        subtopic: 'Cloud & Containers'
      },
      {
        question: 'In object-oriented design, the Liskov Substitution Principle (LSP) mandates that:',
        options: [
          { id: 'A', text: 'Classes should be open for extension but closed for modification' },
          { id: 'B', text: 'Subtypes must be substitutable for their base types without altering program correctness' },
          { id: 'C', text: 'High-level modules must not depend on low-level modules' },
          { id: 'D', text: 'Interfaces should contain as few methods as possible' }
        ],
        correctAnswer: 'B',
        explanation: 'LSP (the "L" in SOLID) asserts that if S is a subtype of T, objects of type T may be replaced with objects of type S without breaking functionality.',
        difficulty: 'Medium',
        topic: 'Data Structures & Algorithms',
        subtopic: 'Software Architecture'
      },
      {
        question: 'In Overfitting prevention for deep neural networks, Dropout works during training by:',
        options: [
          { id: 'A', text: 'Discarding training samples with high error' },
          { id: 'B', text: 'Randomly deactivating a fraction of neurons on each forward-backward pass' },
          { id: 'C', text: 'Clipping the learning rate whenever validation error rises' },
          { id: 'D', text: 'Shrinking the total depth of the neural network' }
        ],
        correctAnswer: 'B',
        explanation: 'Dropout forces neurons to learn robust features with various random subsets of other neurons, preventing brittle co-adaptation.',
        difficulty: 'Medium',
        topic: 'Artificial Intelligence & Data',
        subtopic: 'Deep Learning Regularization'
      },
      {
        question: 'Which consensus mechanism is utilized by Bitcoin to secure distributed ledger transactions without a central authority?',
        options: [
          { id: 'A', text: 'Proof of Stake (PoS)' },
          { id: 'B', text: 'Proof of Work (PoW)' },
          { id: 'C', text: 'Delegated Byzantine Fault Tolerance' },
          { id: 'D', text: 'Proof of Authority' }
        ],
        correctAnswer: 'B',
        explanation: 'Bitcoin uses Hashcash-based Proof of Work where miners compete to find a nonce satisfying the target cryptographic hash difficulty.',
        difficulty: 'Easy',
        topic: 'Networks & Cybersecurity',
        subtopic: 'Distributed Systems'
      },
      {
        question: 'In asymptotic analysis, what does Little-o notation (f(n) = o(g(n))) strictly signify?',
        options: [
          { id: 'A', text: 'f(n) grows asymptotically strictly slower than g(n) (lim f(n)/g(n) = 0)' },
          { id: 'B', text: 'f(n) is asymptotically bounded tightly by g(n)' },
          { id: 'C', text: 'f(n) grows at least as fast as g(n)' },
          { id: 'D', text: 'f(n) equals g(n) for all n > 0' }
        ],
        correctAnswer: 'A',
        explanation: 'Unlike Big-O which permits equality of growth rates (f(n) <= c * g(n)), Little-o signifies that g(n) strictly dominates as n -> infinity.',
        difficulty: 'Hard',
        topic: 'Data Structures & Algorithms',
        subtopic: 'Complexity Theory'
      },
      {
        question: 'Which type of software vulnerability occurs when an application executes dynamic SQL commands concatenating unsanitized user inputs?',
        options: [
          { id: 'A', text: 'Cross-Site Scripting (XSS)' },
          { id: 'B', text: 'SQL Injection (SQLi)' },
          { id: 'C', text: 'Cross-Site Request Forgery (CSRF)' },
          { id: 'D', text: 'Buffer Overflow' }
        ],
        correctAnswer: 'B',
        explanation: 'SQL Injection allows attackers to manipulate database queries via input parameters; mitigated through parameterized statements and ORM binding.',
        difficulty: 'Easy',
        topic: 'Networks & Cybersecurity',
        subtopic: 'AppSec & Web Vulnerabilities'
      },
      {
        question: 'What is the function of the Memory Management Unit (MMU) in modern CPU hardware?',
        options: [
          { id: 'A', text: 'Translating virtual addresses to physical RAM addresses via page tables' },
          { id: 'B', text: 'Executing floating-point arithmetic' },
          { id: 'C', text: 'Managing hard disk partition sectors' },
          { id: 'D', text: 'Controlling USB bus clock speeds' }
        ],
        correctAnswer: 'A',
        explanation: 'The MMU works with page tables and the Translation Lookaside Buffer (TLB) to translate process virtual memory addresses into physical RAM locations.',
        difficulty: 'Hard',
        topic: 'System Architecture & OS',
        subtopic: 'Computer Architecture'
      },
      {
        question: 'In Natural Language Processing, what is the role of Positional Encodings added to input embeddings in Transformers?',
        options: [
          { id: 'A', text: 'Compressing vocabulary dimensions' },
          { id: 'B', text: 'Injecting token order information since attention is permutation-invariant' },
          { id: 'C', text: 'Normalizing gradient updates across layers' },
          { id: 'D', text: 'Calculating perplexity scores' }
        ],
        correctAnswer: 'B',
        explanation: 'Because standard self-attention treats tokens as an unordered set, sinusoidal or learned positional encodings convey word sequential order.',
        difficulty: 'Hard',
        topic: 'Artificial Intelligence & Data',
        subtopic: 'NLP & Sequence Modeling'
      },
      {
        question: 'Which graph traversal algorithm guarantees finding the shortest path in an unweighted graph in O(V + E) time?',
        options: [
          { id: 'A', text: 'Depth First Search (DFS)' },
          { id: 'B', text: 'Breadth First Search (BFS)' },
          { id: 'C', text: 'Bellman-Ford Algorithm' },
          { id: 'D', text: 'Floyd-Warshall Algorithm' }
        ],
        correctAnswer: 'B',
        explanation: 'BFS explores nodes layer by layer using a FIFO queue, guaranteeing minimum edge hops to all reachable vertices in O(V + E).',
        difficulty: 'Easy',
        topic: 'Data Structures & Algorithms',
        subtopic: 'Graph Algorithms'
      },
      {
        question: 'What is the Byzantine Generals Problem in distributed computing?',
        options: [
          { id: 'A', text: 'Resolving deadlocks in shared database locks' },
          { id: 'B', text: 'Achieving consensus among nodes when some may be faulty or maliciously sending conflicting messages' },
          { id: 'C', text: 'Minimizing packet latency in satellite links' },
          { id: 'D', text: 'Encrypting files across multi-tenant servers' }
        ],
        correctAnswer: 'B',
        explanation: 'The Byzantine Generals Problem formalizes agreement in distributed networks where arbitrary or malicious components behave deceitfully.',
        difficulty: 'Hard',
        topic: 'Networks & Cybersecurity',
        subtopic: 'Fault Tolerance & Distributed Consensus'
      },
      {
        question: 'In ACID properties of database transactions, what does "Isolation" ensure?',
        options: [
          { id: 'A', text: 'All operations succeed or all fail' },
          { id: 'B', text: 'Concurrent transactions execute without interfering with one another' },
          { id: 'C', text: 'Committed data survives system crashes' },
          { id: 'D', text: 'Foreign key constraints are verified' }
        ],
        correctAnswer: 'B',
        explanation: 'Isolation guarantees that intermediate states of concurrent transactions are invisible to other transactions, preventing dirty reads and phantom rows.',
        difficulty: 'Hard',
        topic: 'System Architecture & OS',
        subtopic: 'Database Concurrency'
      }
    ],
    recommendedResources: [
      {
        title: 'Algorithms & Data Structures Specialization',
        type: 'Course',
        provider: 'NPTEL / Coursera',
        description: 'Rigorous algorithmic complexity, tree balancing, graph theory, and dynamic programming.',
        linkText: 'Explore Algorithms Track',
        focusArea: 'Data Structures'
      },
      {
        title: 'Deep Learning & Transformer Foundations',
        type: 'Practice Lab',
        provider: 'Hugging Face / Fast.ai',
        description: 'Hands-on neural network optimization, attention mechanisms, and fine-tuning models.',
        linkText: 'Explore AI Lab',
        focusArea: 'Artificial Intelligence'
      },
      {
        title: 'Distributed Systems & Operating Internals',
        type: 'Roadmap',
        provider: 'MIT OpenCourseWare / Linux Foundation',
        description: 'Process scheduling, virtual memory, POSIX threads, and cloud container orchestration.',
        linkText: 'View Systems Architecture',
        focusArea: 'System Architecture'
      }
    ]
  },

  // 2. Business, Management & Finance (BBA, MBA, B.Com, Commerce, Retail, FinTech)
  business_finance: {
    keywords: [
      'bba', 'mba', 'b.com', 'm.com', 'mcom', 'commerce', 'finance', 'marketing', 'human resource', 'hrm',
      'retail', 'business', 'entrepreneurship', 'banking', 'fintech', 'logistics',
      'supply chain', 'investment', 'accounting', 'taxation', 'management'
    ],
    topics: ['Financial Management & Capital Structure', 'Marketing Strategy & Consumer Behavior', 'Operations & Supply Chain', 'Organizational Leadership & Strategy'],
    sampleQuestions: [
      {
        question: 'What is the Weighted Average Cost of Capital (WACC) used for in corporate finance?',
        options: [
          { id: 'A', text: 'Calculating annual sales tax payable' },
          { id: 'B', text: 'Determining the hurdle discount rate for evaluating investment projects' },
          { id: 'C', text: 'Auditing employee payroll benefits' },
          { id: 'D', text: 'Measuring marketing return on ad spend' }
        ],
        correctAnswer: 'B',
        explanation: 'WACC represents the blended cost of debt and equity capital, serving as the benchmark hurdle rate for NPV calculations.',
        difficulty: 'Easy',
        topic: 'Financial Management & Capital Structure',
        subtopic: 'Corporate Valuation'
      },
      {
        question: 'In marketing strategy, what are the traditional "4 Ps" of the marketing mix?',
        options: [
          { id: 'A', text: 'Product, Price, Place, Promotion' },
          { id: 'B', text: 'People, Process, Profit, Packaging' },
          { id: 'C', text: 'Performance, Positioning, Policy, Profit' },
          { id: 'D', text: 'Partnership, Production, Promotion, Payroll' }
        ],
        correctAnswer: 'A',
        explanation: 'E. Jerome McCarthy\'s 4 Ps are Product, Price, Place, and Promotion.',
        difficulty: 'Easy',
        topic: 'Marketing Strategy & Consumer Behavior',
        subtopic: 'Marketing Mix'
      },
      {
        question: 'Which inventory management philosophy pioneered by Toyota emphasizes eliminating waste by manufacturing items only as needed?',
        options: [
          { id: 'A', text: 'Economic Order Quantity (EOQ)' },
          { id: 'B', text: 'Just-In-Time (JIT) / Lean Manufacturing' },
          { id: 'C', text: 'Safety Buffer Stockpiling' },
          { id: 'D', text: 'Batch Lot Sizing' }
        ],
        correctAnswer: 'B',
        explanation: 'Just-In-Time (JIT) aligns raw material deliveries with production schedules to minimize holding costs and inventory waste.',
        difficulty: 'Easy',
        topic: 'Operations & Supply Chain',
        subtopic: 'Lean Management'
      },
      {
        question: 'In Porter\'s Five Forces analysis, what happens to industry profitability when buyer switching costs are virtually zero and supplier concentration is high?',
        options: [
          { id: 'A', text: 'Industry profit margins face severe downward pressure' },
          { id: 'B', text: 'Industry profit margins expand to record highs' },
          { id: 'C', text: 'Threat of new entrants becomes negligible' },
          { id: 'D', text: 'Rivalry among firms drops to zero' }
        ],
        correctAnswer: 'A',
        explanation: 'High supplier bargaining power combined with low buyer switching costs leaves firms vulnerable from both cost input and pricing power sides, eroding margins.',
        difficulty: 'Medium',
        topic: 'Organizational Leadership & Strategy',
        subtopic: 'Competitive Strategy'
      },
      {
        question: 'Under the Capital Asset Pricing Model (CAPM), what does a stock Beta (β) of 1.4 imply?',
        options: [
          { id: 'A', text: 'The stock has zero systematic risk' },
          { id: 'B', text: 'The stock is 40% more volatile than the broad market benchmark' },
          { id: 'C', text: 'The stock pays a 1.4% dividend yield' },
          { id: 'D', text: 'The stock is risk-free like a sovereign bond' }
        ],
        correctAnswer: 'B',
        explanation: 'Beta measures systematic covariance with the market (β_market = 1.0). β = 1.4 indicates 40% greater expected cyclical movement relative to the market.',
        difficulty: 'Medium',
        topic: 'Financial Management & Capital Structure',
        subtopic: 'Portfolio Theory'
      },
      {
        question: 'What is the bullwhip effect in supply chain management?',
        options: [
          { id: 'A', text: 'The amplification of demand variability as orders move upstream from retailer to wholesaler to manufacturer' },
          { id: 'B', text: 'Sudden price discounts during clearance sales' },
          { id: 'C', text: 'A sudden strike in shipping ports' },
          { id: 'D', text: 'The depreciation of transport trucks over time' }
        ],
        correctAnswer: 'A',
        explanation: 'Small fluctuations in consumer demand become magnified higher up the supply chain due to batching, safety buffers, and delayed information.',
        difficulty: 'Medium',
        topic: 'Operations & Supply Chain',
        subtopic: 'Logistics Optimization'
      },
      {
        question: 'In consumer analytics, Customer Lifetime Value (CLV) is calculated primarily by considering:',
        options: [
          { id: 'A', text: 'Average purchase value * purchase frequency * gross margin * customer lifespan minus acquisition cost' },
          { id: 'B', text: 'Total social media followers multiplied by click-through rate' },
          { id: 'C', text: 'The initial invoice amount on the first order' },
          { id: 'D', text: 'The cost of the marketing team\'s salaries' }
        ],
        correctAnswer: 'A',
        explanation: 'CLV estimates the discounted net profit attributable to the entire ongoing relationship with a customer over time.',
        difficulty: 'Medium',
        topic: 'Marketing Strategy & Consumer Behavior',
        subtopic: 'Customer Analytics'
      },
      {
        question: 'Under the DuPont Analysis framework, Return on Equity (ROE) is decomposed into:',
        options: [
          { id: 'A', text: 'Net Profit Margin × Asset Turnover × Equity Multiplier' },
          { id: 'B', text: 'Gross Margin × Operating Margin × Tax Rate' },
          { id: 'C', text: 'Current Ratio × Quick Ratio × Debt-to-Equity' },
          { id: 'D', text: 'EBITDA ÷ Total Liabilities' }
        ],
        correctAnswer: 'A',
        explanation: 'DuPont model decomposes ROE = (Net Income / Sales) * (Sales / Assets) * (Assets / Equity), isolating profitability, efficiency, and leverage.',
        difficulty: 'Hard',
        topic: 'Financial Management & Capital Structure',
        subtopic: 'Financial Ratio Analysis'
      },
      {
        question: 'What is the principal characteristic of Blue Ocean Strategy?',
        options: [
          { id: 'A', text: 'Competing aggressively in existing market space by lowering price' },
          { id: 'B', text: 'Creating uncontested market space that makes competition irrelevant' },
          { id: 'C', text: 'Merging with the largest competitor to monopolize distribution' },
          { id: 'D', text: 'Expanding into overseas maritime shipping' }
        ],
        correctAnswer: 'B',
        explanation: 'Chan Kim and Renée Mauborgne define Blue Oceans as newly created industries or market spaces with untapped demand and high profit potential.',
        difficulty: 'Medium',
        topic: 'Organizational Leadership & Strategy',
        subtopic: 'Strategic Management'
      },
      {
        question: 'In Human Resource Management, the 360-degree performance appraisal involves feedback gathered from:',
        options: [
          { id: 'A', text: 'Subordinates, peers, supervisors, and self-assessment' },
          { id: 'B', text: 'Only the direct reporting manager' },
          { id: 'C', text: 'External government auditors' },
          { id: 'D', text: 'The Chief Executive Officer exclusively' }
        ],
        correctAnswer: 'A',
        explanation: '360-degree appraisal collects multi-rater evaluations across all levels surrounding the employee to achieve unbiased holistic assessment.',
        difficulty: 'Easy',
        topic: 'Organizational Leadership & Strategy',
        subtopic: 'HR Development'
      },
      {
        question: 'What is the primary function of an Initial Public Offering (IPO)?',
        options: [
          { id: 'A', text: 'Transforming a privately held company into a publicly traded corporation to raise public equity capital' },
          { id: 'B', text: 'Filing for corporate bankruptcy liquidation' },
          { id: 'C', text: 'Distributing annual bonuses to internal staff' },
          { id: 'D', text: 'Buying back shares from existing venture capitalists' }
        ],
        correctAnswer: 'A',
        explanation: 'An IPO issues company shares on the primary public market, unlocking liquidity, expansion capital, and market valuation.',
        difficulty: 'Easy',
        topic: 'Financial Management & Capital Structure',
        subtopic: 'Capital Markets'
      },
      {
        question: 'In modern FinTech ecosystems, what is Open Banking primarily enabled by?',
        options: [
          { id: 'A', text: 'Standardized secure Application Programming Interfaces (APIs) with customer consent' },
          { id: 'B', text: 'Allowing customers to walk into physical branches 24 hours a day' },
          { id: 'C', text: 'Eliminating all bank passwords and KYC checks' },
          { id: 'D', text: 'Converting all cash into physical gold' }
        ],
        correctAnswer: 'A',
        explanation: 'Open Banking allows third-party financial service providers to access consumer banking data securely via authorized APIs to provide automated budgeting, loans, and payments.',
        difficulty: 'Medium',
        topic: 'Financial Management & Capital Structure',
        subtopic: 'FinTech Innovation'
      },
      {
        question: 'What is the Net Present Value (NPV) decision rule for independent capital expenditure projects?',
        options: [
          { id: 'A', text: 'Accept the project if NPV > 0' },
          { id: 'B', text: 'Accept the project if NPV < 0' },
          { id: 'C', text: 'Accept only if payback period equals project lifespan' },
          { id: 'D', text: 'Accept only if accounting rate of return is exactly zero' }
        ],
        correctAnswer: 'A',
        explanation: 'A positive NPV indicates the project discounted cash inflows exceed capital outlay, creating shareholder value.',
        difficulty: 'Easy',
        topic: 'Financial Management & Capital Structure',
        subtopic: 'Capital Budgeting'
      },
      {
        question: 'Which statistical metric is used in Six Sigma methodology to represent nearly defect-free process quality (3.4 defects per million opportunities)?',
        options: [
          { id: 'A', text: 'Defects Per Million Opportunities (DPMO) ≤ 3.4' },
          { id: 'B', text: 'Mean Absolute Deviation = 0' },
          { id: 'C', text: 'Correlation r = 1.0' },
          { id: 'D', text: 'Sample Variance = 100' }
        ],
        correctAnswer: 'A',
        explanation: 'Six Sigma quality standard corresponds to 6 standard deviations between process mean and nearest specification limit, translating to ≤ 3.4 DPMO with 1.5-sigma shift.',
        difficulty: 'Hard',
        topic: 'Operations & Supply Chain',
        subtopic: 'Quality Engineering'
      },
      {
        question: 'In Brand equity evaluation, what is Customer-Based Brand Equity (CBBE) pyramid founded upon at its baseline?',
        options: [
          { id: 'A', text: 'Brand Salience (identity and awareness)' },
          { id: 'B', text: 'Brand Resonance (intense psychological bond)' },
          { id: 'C', text: 'Brand Judgments' },
          { id: 'D', text: 'Celebrity endorsements' }
        ],
        correctAnswer: 'A',
        explanation: 'Kevin Lane Keller\'s CBBE pyramid begins with brand salience—ensuring customers recognize and easily recall the brand under buying conditions.',
        difficulty: 'Hard',
        topic: 'Marketing Strategy & Consumer Behavior',
        subtopic: 'Brand Architecture'
      },
      {
        question: 'Under agency theory in corporate governance, the principal-agent conflict arises because:',
        options: [
          { id: 'A', text: 'Managers (agents) may prioritize personal career utility over shareholder (principals) wealth maximization' },
          { id: 'B', text: 'Competitors collude on market prices' },
          { id: 'C', text: 'Suppliers fail to deliver goods on schedule' },
          { id: 'D', text: 'Banks charge variable interest rates' }
        ],
        correctAnswer: 'A',
        explanation: 'Agency theory examines conflicts of interest when owners delegate decision-making authority to professional managers whose incentives may diverge.',
        difficulty: 'Hard',
        topic: 'Organizational Leadership & Strategy',
        subtopic: 'Corporate Governance'
      },
      {
        question: 'What is the Modigliani-Miller Theorem\'s Proposition I in a world with perfect capital markets (no taxes, transaction costs, or bankruptcy risk)?',
        options: [
          { id: 'A', text: 'A firm\'s total market value is independent of its capital structure' },
          { id: 'B', text: 'Debt financing is always cheaper than equity' },
          { id: 'C', text: '100% equity maximizes firm valuation' },
          { id: 'D', text: 'Dividends increase stock value by 50%' }
        ],
        correctAnswer: 'A',
        explanation: 'MM Proposition I (1958) showed that in frictionless markets, firm value is determined by underlying real asset earning power, not by how it slices cash flows between debt and equity.',
        difficulty: 'Hard',
        topic: 'Financial Management & Capital Structure',
        subtopic: 'Capital Structure Theory'
      },
      {
        question: 'Which pricing strategy sets a high initial price to skim revenues layer-by-layer from price-insensitive early adopters before lowering price to capture mass markets?',
        options: [
          { id: 'A', text: 'Penetration Pricing' },
          { id: 'B', text: 'Price Skimming' },
          { id: 'C', text: 'Predatory Pricing' },
          { id: 'D', text: 'Cost-Plus Pricing' }
        ],
        correctAnswer: 'B',
        explanation: 'Price skimming extracts consumer surplus from early enthusiasts (common in high-tech gadget launches) before reducing prices over product life stages.',
        difficulty: 'Medium',
        topic: 'Marketing Strategy & Consumer Behavior',
        subtopic: 'Pricing Tactics'
      },
      {
        question: 'What does the Economic Order Quantity (EOQ) formula seek to balance?',
        options: [
          { id: 'A', text: 'Annual ordering costs versus annual holding (carrying) costs' },
          { id: 'B', text: 'Freight charges versus export duties' },
          { id: 'C', text: 'Factory wages versus advertising expenses' },
          { id: 'D', text: 'Gross profit versus net profit' }
        ],
        correctAnswer: 'A',
        explanation: 'EOQ = √[(2 * D * S) / H] finds the order batch size that minimizes the sum of inventory ordering setup costs and inventory carrying costs.',
        difficulty: 'Medium',
        topic: 'Operations & Supply Chain',
        subtopic: 'Inventory Mathematics'
      },
      {
        question: 'In agile project management frameworks (e.g. Scrum), what is the function of a Sprint Retrospective?',
        options: [
          { id: 'A', text: 'Reflecting on process successes and impediments to continuously improve team delivery' },
          { id: 'B', text: 'Demonstrating the finished software to external clients for final invoice payment' },
          { id: 'C', text: 'Assigning penalty points to underperforming engineers' },
          { id: 'D', text: 'Writing the legal terms of service' }
        ],
        correctAnswer: 'A',
        explanation: 'The Sprint Retrospective occurs at the conclusion of every sprint, inspecting team collaboration, tooling, and workflow to implement actionable process enhancements.',
        difficulty: 'Easy',
        topic: 'Organizational Leadership & Strategy',
        subtopic: 'Agile Project Management'
      }
    ],
    recommendedResources: [
      {
        title: 'Financial Modeling & Corporate Valuation',
        type: 'Course',
        provider: 'Wharton Online / CFI',
        description: 'Discounted Cash Flow (DCF), LBO modeling, WACC calculation, and sensitivity analysis.',
        linkText: 'Explore Corporate Finance',
        focusArea: 'Financial Management'
      },
      {
        title: 'Supply Chain Analytics & Lean Operations',
        type: 'Interactive Book',
        provider: 'MIT CTL / Coursera',
        description: 'EOQ optimization, logistics network design, inventory buffers, and ERP systems.',
        linkText: 'Access Operations Guide',
        focusArea: 'Operations'
      },
      {
        title: 'Strategic Brand Building & Digital Growth',
        type: 'Video Series',
        provider: 'Harvard Business Publishing',
        description: 'Omnichannel consumer journeys, customer acquisition cost (CAC), and product positioning.',
        linkText: 'View Brand Strategy',
        focusArea: 'Marketing Strategy'
      }
    ]
  },

  // 3. Core & Electrical Engineering (B.Tech Mechanical, Civil, ECE, EEE, M.Tech VLSI, Diploma Engg)
  engineering_physical: {
    keywords: [
      'mechanical', 'civil', 'electronics', 'ece', 'electrical', 'eee', 'vlsi', 'embedded',
      'robotics', 'automation', 'automobile', 'aerospace', 'chemical', 'structural',
      'telecommunications', 'signal processing', 'mechatronics', 'manufacturing', 'cad', 'cam'
    ],
    topics: ['Solid & Fluid Mechanics', 'Circuit Theory & Electromagnetics', 'Digital Systems & Signals', 'Materials & Manufacturing'],
    sampleQuestions: [
      {
        question: 'According to Ohm\'s Law, what is the current I flowing through an 8 Ohm resistor connected across a 24 Volt DC supply?',
        options: [
          { id: 'A', text: '0.33 A' },
          { id: 'B', text: '3 A' },
          { id: 'C', text: '192 A' },
          { id: 'D', text: '16 A' }
        ],
        correctAnswer: 'B',
        explanation: 'I = V / R = 24 / 8 = 3 Amperes.',
        difficulty: 'Easy',
        topic: 'Circuit Theory & Electromagnetics',
        subtopic: 'DC Circuit Analysis'
      },
      {
        question: 'Hooke\'s Law states that within the elastic limit of a material, stress is directly proportional to:',
        options: [
          { id: 'A', text: 'Strain' },
          { id: 'B', text: 'Cross-sectional area' },
          { id: 'C', text: 'Temperature difference' },
          { id: 'D', text: 'Poisson\'s ratio' }
        ],
        correctAnswer: 'A',
        explanation: 'Stress σ = E * ε, where E is Young\'s Modulus and ε is strain.',
        difficulty: 'Easy',
        topic: 'Solid & Fluid Mechanics',
        subtopic: 'Strength of Materials'
      },
      {
        question: 'In digital logic design, what Boolean logic gate yields an output of HIGH (1) if and only if an odd number of its inputs are HIGH?',
        options: [
          { id: 'A', text: 'XOR Gate' },
          { id: 'B', text: 'AND Gate' },
          { id: 'C', text: 'NOR Gate' },
          { id: 'D', text: 'NAND Gate' }
        ],
        correctAnswer: 'A',
        explanation: 'The Exclusive-OR (XOR) gate performs modulo-2 addition, outputting HIGH when an odd number of inputs are 1 (parity detector).',
        difficulty: 'Easy',
        topic: 'Digital Systems & Signals',
        subtopic: 'Combinational Logic'
      },
      {
        question: 'What is the Nyquist-Shannon sampling theorem requirement to reconstruct a continuous signal without aliasing?',
        options: [
          { id: 'A', text: 'Sampling frequency fs ≥ 2 * f_max' },
          { id: 'B', text: 'Sampling frequency fs = f_max / 2' },
          { id: 'C', text: 'Sampling frequency fs ≤ f_max' },
          { id: 'D', text: 'Sampling frequency is independent of signal bandwidth' }
        ],
        correctAnswer: 'A',
        explanation: 'To avert aliasing distortion, the sampling rate must be at least twice the highest frequency component present in the analog signal.',
        difficulty: 'Medium',
        topic: 'Digital Systems & Signals',
        subtopic: 'Signal Processing'
      },
      {
        question: 'In thermodynamics, the Otto cycle represents the idealized thermodynamic cycle for which type of internal combustion engine?',
        options: [
          { id: 'A', text: 'Four-stroke spark-ignition (petrol) engine' },
          { id: 'B', text: 'Compression-ignition (diesel) engine' },
          { id: 'C', text: 'Gas turbine jet engine' },
          { id: 'D', text: 'Steam locomotive engine' }
        ],
        correctAnswer: 'A',
        explanation: 'The air-standard Otto cycle consists of two isentropic and two constant-volume (isochoric) heat transfer processes characteristic of spark-ignition engines.',
        difficulty: 'Medium',
        topic: 'Solid & Fluid Mechanics',
        subtopic: 'Thermal Engineering'
      },
      {
        question: 'What type of feedback is intentionally applied in operational amplifier (Op-Amp) circuits to produce stable linear amplifiers?',
        options: [
          { id: 'A', text: 'Negative feedback' },
          { id: 'B', text: 'Positive feedback' },
          { id: 'C', text: 'Regenerative feedback' },
          { id: 'D', text: 'Thermal feedback' }
        ],
        correctAnswer: 'A',
        explanation: 'Negative feedback stabilizes high open-loop gain, expands bandwidth, reduces distortion, and controls input/output impedance.',
        difficulty: 'Easy',
        topic: 'Circuit Theory & Electromagnetics',
        subtopic: 'Analog Electronics'
      },
      {
        question: 'In structural civil engineering, what does a Bending Moment Diagram (BMD) illustrate along a beam\'s span?',
        options: [
          { id: 'A', text: 'The variation of internal bending moments resisting external transverse loads' },
          { id: 'B', text: 'The paint thickness along concrete pillars' },
          { id: 'C', text: 'The wind humidity on the bridge' },
          { id: 'D', text: 'The soil moisture content underneath foundation piles' }
        ],
        correctAnswer: 'A',
        explanation: 'BMD plots the internal algebraic sum of moments of forces on one side of a cross section, vital for sizing reinforcement rebars and flanges.',
        difficulty: 'Medium',
        topic: 'Solid & Fluid Mechanics',
        subtopic: 'Structural Analysis'
      },
      {
        question: 'What is the primary semiconductor device utilized in CMOS (Complementary Metal-Oxide-Semiconductor) VLSI chips?',
        options: [
          { id: 'A', text: 'Paired n-channel and p-channel MOSFETs' },
          { id: 'B', text: 'Bipolar junction NPN transistors only' },
          { id: 'C', text: 'Vacuum tube triodes' },
          { id: 'D', text: 'Schottky power diodes' }
        ],
        correctAnswer: 'A',
        explanation: 'CMOS pairs NMOS pull-down and PMOS pull-up networks, dissipating negligible static power because one transistor is always off in steady state.',
        difficulty: 'Medium',
        topic: 'Digital Systems & Signals',
        subtopic: 'VLSI Design'
      },
      {
        question: 'In control systems engineering, what indicates that a continuous linear time-invariant (LTI) system is strictly stable in the s-domain?',
        options: [
          { id: 'A', text: 'All closed-loop poles lie strictly in the open left-half of the complex s-plane (Re(s) < 0)' },
          { id: 'B', text: 'All poles lie on the imaginary jω axis' },
          { id: 'C', text: 'At least one pole lies in the right-half plane' },
          { id: 'D', text: 'The system has zero gain margin' }
        ],
        correctAnswer: 'A',
        explanation: 'Poles with negative real components (Re(s) < 0) produce decaying exponential terms e^(σt) where σ < 0, guaranteeing asymptotic return to equilibrium.',
        difficulty: 'Hard',
        topic: 'Digital Systems & Signals',
        subtopic: 'Control Theory'
      },
      {
        question: 'Which crystal defect is classified as a zero-dimensional (point) defect in metallurgical materials?',
        options: [
          { id: 'A', text: 'Vacancy or interstitial atom' },
          { id: 'B', text: 'Edge dislocation' },
          { id: 'C', text: 'Grain boundary' },
          { id: 'D', text: 'Stacking fault' }
        ],
        correctAnswer: 'A',
        explanation: 'Vacancies and interstitialcies are point (0-D) defects; dislocations are line (1-D) defects; grain boundaries are planar (2-D) defects.',
        difficulty: 'Medium',
        topic: 'Materials & Manufacturing',
        subtopic: 'Material Science'
      },
      {
        question: 'What is Maxwell\'s displacement current term physically added to Ampere\'s circuital law?',
        options: [
          { id: 'A', text: 'ε0 * (dΦE / dt) representing time-varying electric flux' },
          { id: 'B', text: 'Ohmic conduction current in copper wires' },
          { id: 'C', text: 'Magnetic monopole flow' },
          { id: 'D', text: 'Static gravitational potential' }
        ],
        correctAnswer: 'A',
        explanation: 'James Clerk Maxwell added displacement current ε0 * (∂E/∂t) to explain magnetic fields generated by changing electric fields (e.g., between capacitor plates).',
        difficulty: 'Hard',
        topic: 'Circuit Theory & Electromagnetics',
        subtopic: 'Electromagnetic Field Theory'
      },
      {
        question: 'What type of fluid flow occurs when the dimensionless Reynolds number (Re) in a pipe is less than 2,000?',
        options: [
          { id: 'A', text: 'Laminar flow' },
          { id: 'B', text: 'Turbulent flow' },
          { id: 'C', text: 'Transonic vortex flow' },
          { id: 'D', text: 'Cavitation flow' }
        ],
        correctAnswer: 'A',
        explanation: 'For internal pipe flow, Re < 2,000 indicates viscous forces dominate inertial forces, maintaining smooth parallel streamlines (laminar).',
        difficulty: 'Easy',
        topic: 'Solid & Fluid Mechanics',
        subtopic: 'Fluid Dynamics'
      },
      {
        question: 'In robotics kinematics, the Denavit-Hartenberg (D-H) convention defines four parameters to describe:',
        options: [
          { id: 'A', text: 'Spatial spatial relationship and coordinate frame transformation between adjacent robot links' },
          { id: 'B', text: 'Battery discharge curves' },
          { id: 'C', text: 'Motor heat dissipation in thermal paste' },
          { id: 'D', text: 'Wireless radio frequency protocols' }
        ],
        correctAnswer: 'A',
        explanation: 'D-H parameters (link length a, link twist α, link offset d, joint angle θ) establish homogeneous coordinate transformations between sequential manipulator frames.',
        difficulty: 'Hard',
        topic: 'Digital Systems & Signals',
        subtopic: 'Robotics & Kinematics'
      },
      {
        question: 'In power engineering, what is the purpose of connecting a synchronous condenser or capacitor bank across inductive industrial loads?',
        options: [
          { id: 'A', text: 'Correcting lagging power factor towards unity' },
          { id: 'B', text: 'Increasing mechanical friction' },
          { id: 'C', text: 'Doubling the line frequency from 50 Hz to 100 Hz' },
          { id: 'D', text: 'Generating DC high voltage' }
        ],
        correctAnswer: 'A',
        explanation: 'Inductive motors draw lagging reactive power (VARs); capacitors provide leading reactive power, improving power factor and reducing transmission line I^2R losses.',
        difficulty: 'Medium',
        topic: 'Circuit Theory & Electromagnetics',
        subtopic: 'Power Systems'
      },
      {
        question: 'What is the primary heat treatment process used to relieve internal stresses and increase ductility in hardened steel?',
        options: [
          { id: 'A', text: 'Tempering / Annealing' },
          { id: 'B', text: 'Rapid cold water quenching' },
          { id: 'C', text: 'Cyaniding' },
          { id: 'D', text: 'Shot peening' }
        ],
        correctAnswer: 'A',
        explanation: 'Annealing and tempering heat steel below transformation temperatures to relieve brittle martensitic stresses and restore fracture toughness.',
        difficulty: 'Easy',
        topic: 'Materials & Manufacturing',
        subtopic: 'Heat Treatment'
      },
      {
        question: 'In 3-phase AC systems, what is the mathematical relation between line voltage V_L and phase voltage V_ph in a balanced Star (Y) connected supply?',
        options: [
          { id: 'A', text: 'V_L = √3 * V_ph' },
          { id: 'B', text: 'V_L = V_ph / √3' },
          { id: 'C', text: 'V_L = 3 * V_ph' },
          { id: 'D', text: 'V_L = V_ph' }
        ],
        correctAnswer: 'A',
        explanation: 'In Star configuration, line voltage is the vector difference between two phase voltages 120° apart: V_L = 2 V_ph cos(30°) = √3 V_ph.',
        difficulty: 'Medium',
        topic: 'Circuit Theory & Electromagnetics',
        subtopic: 'Three-Phase AC Circuits'
      },
      {
        question: 'Which additive manufacturing technique uses a laser beam to selectively fuse powdered metal layers inside an inert gas chamber?',
        options: [
          { id: 'A', text: 'Direct Metal Laser Sintering (DMLS) / SLM' },
          { id: 'B', text: 'Fused Deposition Modeling (FDM)' },
          { id: 'C', text: 'Sand Casting' },
          { id: 'D', text: 'Drop Forging' }
        ],
        correctAnswer: 'A',
        explanation: 'DMLS/SLM is a powder-bed fusion additive process printing dense functional aerospace and medical metal parts layer by layer.',
        difficulty: 'Medium',
        topic: 'Materials & Manufacturing',
        subtopic: 'Advanced Manufacturing'
      },
      {
        question: 'In soil mechanics, what does Darcy\'s Law describe?',
        options: [
          { id: 'A', text: 'The velocity of laminar fluid flow through porous soil media (v = k * i)' },
          { id: 'B', text: 'The tensile cracking of reinforced concrete' },
          { id: 'C', text: 'The seismic wave reflection in bedrock' },
          { id: 'D', text: 'The thermal expansion of asphalt' }
        ],
        correctAnswer: 'A',
        explanation: 'Darcy\'s Law states discharge velocity v = k * i, where k is hydraulic conductivity (permeability) and i is hydraulic gradient.',
        difficulty: 'Hard',
        topic: 'Solid & Fluid Mechanics',
        subtopic: 'Geotechnical Engineering'
      },
      {
        question: 'In digital signal processing, the Fast Fourier Transform (FFT) reduces discrete Fourier transform computational complexity from O(N^2) to:',
        options: [
          { id: 'A', text: 'O(N log N)' },
          { id: 'B', text: 'O(N)' },
          { id: 'C', text: 'O(log N)' },
          { id: 'D', text: 'O(N^3)' }
        ],
        correctAnswer: 'A',
        explanation: 'Cooley-Tukey FFT decomposes an N-point DFT into interleaved smaller DFTs, slashing arithmetic operations from N^2 to N log2(N).',
        difficulty: 'Medium',
        topic: 'Digital Systems & Signals',
        subtopic: 'Signal Algorithms'
      },
      {
        question: 'In microprocessor architecture, what happens during an Interrupt Service Routine (ISR) execution?',
        options: [
          { id: 'A', text: 'Current program counter and status registers are pushed onto the stack before executing the interrupt handler' },
          { id: 'B', text: 'The CPU permanently powers down' },
          { id: 'C', text: 'All RAM memory is erased' },
          { id: 'D', text: 'Clock frequency is multiplied by 10' }
        ],
        correctAnswer: 'A',
        explanation: 'Hardware interrupts suspend normal pipeline execution, save process context (PC and PSW) onto stack, jump to vector table, execute the ISR, and restore context upon IRET.',
        difficulty: 'Hard',
        topic: 'Digital Systems & Signals',
        subtopic: 'Embedded Systems & Microcontrollers'
      }
    ],
    recommendedResources: [
      {
        title: 'Solid Mechanics & Structural Analysis',
        type: 'Course',
        provider: 'NPTEL / edX',
        description: 'Bending stress, shear forces, deflection of beams, and Hooke\'s elasticity.',
        linkText: 'Explore Mechanics Lab',
        focusArea: 'Solid & Fluid Mechanics'
      },
      {
        title: 'CMOS VLSI Design & Digital Circuit Foundations',
        type: 'Interactive Book',
        provider: 'MIT EECS / IEEE',
        description: 'MOSFET physics, static CMOS logic, timing closure, and verilog HDL synthesis.',
        linkText: 'Access VLSI Blueprint',
        focusArea: 'Digital Systems & Signals'
      },
      {
        title: 'Electromagnetic Fields & Power Systems',
        type: 'Roadmap',
        provider: 'Stanford Engineering / EPRI',
        description: 'Maxwell equations, wave propagation, AC power grids, and transformer theory.',
        linkText: 'View Power Systems Course',
        focusArea: 'Circuit Theory & Electromagnetics'
      }
    ]
  },

  // 4. Medical, Healthcare, Nursing & Nutrition (MBBS, BDS, Nursing, Pharmacy, MLT, Nutrition & Dietetics)
  medical_healthcare: {
    keywords: [
      'medical', 'healthcare', 'mbbs', 'bds', 'dental', 'bams', 'ayurveda', 'bhms', 'homeopathy',
      'nursing', 'gnm', 'physiotherapy', 'bpt', 'mpt', 'pharmacy', 'b.pharm', 'm.pharm', 'pharm.d',
      'mlt', 'laboratory technology', 'imaging', 'radiology', 'anesthesia', 'operation theatre',
      'optometry', 'cardiac', 'dialysis', 'respiratory', 'emergency medical', 'allied health',
      'nutrition', 'dietetics', 'food & nutrition', 'clinical nutrition', 'sports nutrition',
      'human nutrition', 'public health', 'hospital administration', 'mha', 'health informatics',
      'biomedical', 'clinical research', 'biology', 'botany', 'zoology', 'biotechnology',
      'microbiology', 'biochemistry', 'genetics', 'bioinformatics', 'forensic'
    ],
    topics: [
      'Anatomy, Physiology & Organ Systems',
      'Clinical Pathology, Diagnostics & Imaging',
      'Nutritional Biochemistry & Dietetics',
      'Pharmacology, Therapeutics & Public Health'
    ],
    sampleQuestions: [
      {
        question: 'In human cardiovascular circulation, which heart chamber pumps oxygenated blood into the systemic aorta?',
        options: [
          { id: 'A', text: 'Right Atrium' },
          { id: 'B', text: 'Right Ventricle' },
          { id: 'C', text: 'Left Ventricle' },
          { id: 'D', text: 'Left Atrium' }
        ],
        correctAnswer: 'C',
        explanation: 'The left ventricle receives oxygenated blood from the left atrium and contracts powerfully to pump blood through the aortic valve into the systemic circulation.',
        difficulty: 'Easy',
        topic: 'Anatomy, Physiology & Organ Systems',
        subtopic: 'Cardiovascular Physiology'
      },
      {
        question: 'Which water-soluble vitamin deficiency causes scurvy characterized by defective collagen synthesis, petechiae, and bleeding gums?',
        options: [
          { id: 'A', text: 'Vitamin C (Ascorbic acid)' },
          { id: 'B', text: 'Vitamin B12 (Cobalamin)' },
          { id: 'C', text: 'Vitamin D (Cholecalciferol)' },
          { id: 'D', text: 'Vitamin K (Phylloquinone)' }
        ],
        correctAnswer: 'A',
        explanation: 'Vitamin C is the essential cofactor for prolyl and lysyl hydroxylase enzymes, indispensable for cross-linking stable triple-helix collagen fibers.',
        difficulty: 'Easy',
        topic: 'Nutritional Biochemistry & Dietetics',
        subtopic: 'Micronutrient Deficiencies'
      },
      {
        question: 'What is the primary anticoagulant contained in lavender/purple-top blood collection tubes used for routine Complete Blood Count (CBC)?',
        options: [
          { id: 'A', text: 'Sodium Citrate' },
          { id: 'B', text: 'K2 / K3 EDTA' },
          { id: 'C', text: 'Lithium Heparin' },
          { id: 'D', text: 'Sodium Fluoride' }
        ],
        correctAnswer: 'B',
        explanation: 'EDTA (Ethylenediaminetetraacetic acid) prevents clotting by irreversibly chelating ionized calcium (Ca2+), preserving cellular morphology for hematology.',
        difficulty: 'Easy',
        topic: 'Clinical Pathology, Diagnostics & Imaging',
        subtopic: 'Phlebotomy & Hematology'
      },
      {
        question: 'What is the primary bactericidal mechanism of action of beta-lactam antibiotics (e.g. penicillins and cephalosporins)?',
        options: [
          { id: 'A', text: 'Inhibiting bacterial cell wall peptidoglycan synthesis via transpeptidase binding' },
          { id: 'B', text: 'Disrupting 50S ribosomal protein translation' },
          { id: 'C', text: 'Inhibiting DNA topoisomerase II (DNA gyrase)' },
          { id: 'D', text: 'Uncoupling bacterial mitochondrial ATP synthesis' }
        ],
        correctAnswer: 'A',
        explanation: 'Beta-lactams bind penicillin-binding proteins (PBPs), inhibiting transpeptidation during bacterial cell wall synthesis and causing osmotic cell lysis.',
        difficulty: 'Easy',
        topic: 'Pharmacology, Therapeutics & Public Health',
        subtopic: 'Antimicrobial Pharmacology'
      },
      {
        question: 'For a patient with non-dialysis dependent Chronic Kidney Disease (CKD Stage 4), which dietary macronutrient is typically restricted to alleviate uremic toxin accumulation?',
        options: [
          { id: 'A', text: 'Dietary Protein (to 0.6–0.8 g/kg/day)' },
          { id: 'B', text: 'Complex Carbohydrates' },
          { id: 'C', text: 'Dietary Fiber' },
          { id: 'D', text: 'Polyunsaturated fatty acids' }
        ],
        correctAnswer: 'A',
        explanation: 'Restricting protein intake in advanced CKD decreases nitrogenous waste products (urea, indoxyl sulfate), reducing glomerular hyperfiltration and slowing disease progression.',
        difficulty: 'Medium',
        topic: 'Nutritional Biochemistry & Dietetics',
        subtopic: 'Medical Nutrition Therapy'
      },
      {
        question: 'On a standard 12-lead Electrocardiogram (ECG), what cardiac electrophysiological event does the P wave represent?',
        options: [
          { id: 'A', text: 'Atrial depolarization' },
          { id: 'B', text: 'Ventricular depolarization' },
          { id: 'C', text: 'Ventricular repolarization' },
          { id: 'D', text: 'Atrioventricular (AV) nodal delay' }
        ],
        correctAnswer: 'A',
        explanation: 'The P wave reflects sequential electrical depolarization of the right and left atria triggered by the sinoatrial (SA) node.',
        difficulty: 'Easy',
        topic: 'Anatomy, Physiology & Organ Systems',
        subtopic: 'Diagnostic Cardiology'
      },
      {
        question: 'Which anatomical organ is the predominant site of "first-pass metabolism" for orally administered pharmaceutical drugs?',
        options: [
          { id: 'A', text: 'Liver (via Portal circulation)' },
          { id: 'B', text: 'Kidney' },
          { id: 'C', text: 'Spleen' },
          { id: 'D', text: 'Duodenum only' }
        ],
        correctAnswer: 'A',
        explanation: 'Orally absorbed drugs pass from the mesenteric veins into the hepatic portal system, where hepatic cytochrome P450 enzymes metabolize a significant fraction before systemic entry.',
        difficulty: 'Medium',
        topic: 'Pharmacology, Therapeutics & Public Health',
        subtopic: 'Pharmacokinetics'
      },
      {
        question: 'Which hormone synthesized primarily by renal peritubular capillary endothelial cells stimulates erythropoiesis in response to tissue hypoxia?',
        options: [
          { id: 'A', text: 'Erythropoietin (EPO)' },
          { id: 'B', text: 'Renin' },
          { id: 'C', text: 'Aldosterone' },
          { id: 'D', text: 'Calcitriol' }
        ],
        correctAnswer: 'A',
        explanation: 'Erythropoietin (EPO) is released in response to hypoxia-inducible factor (HIF) activation during low renal oxygen tension, driving red blood cell lineage proliferation.',
        difficulty: 'Easy',
        topic: 'Anatomy, Physiology & Organ Systems',
        subtopic: 'Endocrine & Renal Physiology'
      },
      {
        question: 'What is the theoretical Respiratory Quotient (RQ = CO2 produced / O2 consumed) during pure carbohydrate metabolism compared to pure fat metabolism?',
        options: [
          { id: 'A', text: 'Carbohydrates = 1.0, Fats ≈ 0.70' },
          { id: 'B', text: 'Carbohydrates = 0.70, Fats = 1.0' },
          { id: 'C', text: 'Carbohydrates = 0.82, Fats = 0.82' },
          { id: 'D', text: 'Carbohydrates = 1.25, Fats = 0.50' }
        ],
        correctAnswer: 'A',
        explanation: 'Glucose oxidation (C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O) yields 6 CO2 / 6 O2 = 1.0; fatty acid oxidation requires proportionally more oxygen relative to carbon dioxide produced (≈ 0.70).',
        difficulty: 'Medium',
        topic: 'Nutritional Biochemistry & Dietetics',
        subtopic: 'Metabolic Energy Expenditure'
      },
      {
        question: 'In epidemiological research, which metric quantifies the total proportion of individuals in a specified population who have a given medical condition at a single designated point in time?',
        options: [
          { id: 'A', text: 'Point Prevalence' },
          { id: 'B', text: 'Incidence Rate' },
          { id: 'C', text: 'Case Fatality Ratio' },
          { id: 'D', text: 'Attributable Risk' }
        ],
        correctAnswer: 'A',
        explanation: 'Point prevalence measures all existing cases (both new and pre-existing) divided by total population at that exact observation slice.',
        difficulty: 'Easy',
        topic: 'Pharmacology, Therapeutics & Public Health',
        subtopic: 'Epidemiology & Biostatistics'
      },
      {
        question: 'An arterial blood gas (ABG) test yields: pH 7.28, PaCO2 58 mmHg, and HCO3- 25 mEq/L. What acid-base disturbance is represented?',
        options: [
          { id: 'A', text: 'Uncompensated Respiratory Acidosis' },
          { id: 'B', text: 'Compensated Metabolic Acidosis' },
          { id: 'C', text: 'Uncompensated Respiratory Alkalosis' },
          { id: 'D', text: 'Compensated Metabolic Alkalosis' }
        ],
        correctAnswer: 'A',
        explanation: 'Low pH (< 7.35) indicates acidosis; high PaCO2 (> 45 mmHg) confirms the primary respiratory etiology; normal HCO3- indicates acute lack of renal compensation.',
        difficulty: 'Hard',
        topic: 'Clinical Pathology, Diagnostics & Imaging',
        subtopic: 'Arterial Blood Gas Interpretation'
      },
      {
        question: 'Wernicke-Korsakoff encephalopathy and Beriberi are neurological and cardiovascular conditions precipitated by severe deficiency of which micronutrient?',
        options: [
          { id: 'A', text: 'Thiamine (Vitamin B1)' },
          { id: 'B', text: 'Riboflavin (Vitamin B2)' },
          { id: 'C', text: 'Niacin (Vitamin B3)' },
          { id: 'D', text: 'Pyridoxine (Vitamin B6)' }
        ],
        correctAnswer: 'A',
        explanation: 'Thiamine pyrophosphate (TPP) is the critical cofactor for pyruvate dehydrogenase and alpha-ketoglutarate dehydrogenase in cerebral and myocardial ATP synthesis.',
        difficulty: 'Medium',
        topic: 'Nutritional Biochemistry & Dietetics',
        subtopic: 'Clinical Nutrition'
      },
      {
        question: 'According to WHO and NABH hospital quality guidelines, what protocol step is executed immediately prior to the surgical incision to confirm correct patient identity, procedure, and anatomical site?',
        options: [
          { id: 'A', text: 'Surgical Safety Time-Out' },
          { id: 'B', text: 'Sign-In before induction' },
          { id: 'C', text: 'Sign-Out before leaving OR' },
          { id: 'D', text: 'Post-anesthesia recovery scoring' }
        ],
        correctAnswer: 'A',
        explanation: 'The "Time-Out" is a momentary operational pause involving surgeon, anesthesiologist, and nursing staff immediately before incision to prevent wrong-site, wrong-patient, or wrong-procedure surgery.',
        difficulty: 'Medium',
        topic: 'Pharmacology, Therapeutics & Public Health',
        subtopic: 'Hospital Administration & Patient Safety'
      },
      {
        question: 'In Magnetic Resonance Imaging (MRI), what atomic nucleus is predominantly excited by radiofrequency pulses due to its biological abundance and high gyromagnetic ratio?',
        options: [
          { id: 'A', text: 'Hydrogen-1 proton (1H)' },
          { id: 'B', text: 'Carbon-12 (12C)' },
          { id: 'C', text: 'Oxygen-16 (16O)' },
          { id: 'D', text: 'Calcium-40 (40Ca)' }
        ],
        correctAnswer: 'A',
        explanation: 'Clinical MRI relies on single-proton Hydrogen-1 (1H) nuclei in water and lipid molecules, which possess non-zero magnetic spin and generate detectable MR precession signals.',
        difficulty: 'Hard',
        topic: 'Clinical Pathology, Diagnostics & Imaging',
        subtopic: 'Radiological Physics'
      },
      {
        question: 'If a single IV bolus of 600 mg of a therapeutic drug produces an extrapolated initial plasma concentration C0 of 12 mg/L, what is the apparent Volume of Distribution (Vd)?',
        options: [
          { id: 'A', text: '50 Liters' },
          { id: 'B', text: '5 Liters' },
          { id: 'C', text: '72 Liters' },
          { id: 'D', text: '200 Liters' }
        ],
        correctAnswer: 'A',
        explanation: 'Vd = Total Dose / Plasma Concentration (C0) = 600 mg / 12 mg/L = 50 L, indicating distribution into total body water.',
        difficulty: 'Hard',
        topic: 'Pharmacology, Therapeutics & Public Health',
        subtopic: 'Pharmacokinetics & Dosage'
      },
      {
        question: 'Which biomarker is considered the clinical gold standard for establishing the diagnosis of acute myocardial infarction (AMI) due to high myocardial tissue specificity?',
        options: [
          { id: 'A', text: 'Cardiac Troponin I or T (cTnI / cTnT)' },
          { id: 'B', text: 'Lactate Dehydrogenase (LDH-1)' },
          { id: 'C', text: 'Total Creatine Kinase (CK-MB alone)' },
          { id: 'D', text: 'Serum Myoglobin alone' }
        ],
        correctAnswer: 'A',
        explanation: 'Cardiac troponins I and T are unique cardiac myofibrillar regulatory proteins released following cardiomyocyte necrosis with virtually 100% myocardial specificity.',
        difficulty: 'Medium',
        topic: 'Clinical Pathology, Diagnostics & Imaging',
        subtopic: 'Clinical Biomarkers'
      },
      {
        question: 'The Dietary Approaches to Stop Hypertension (DASH) clinical diet reduces systolic and diastolic blood pressure primarily through rich dietary intakes of:',
        options: [
          { id: 'A', text: 'Potassium, Calcium, Magnesium, and dietary fiber with reduced Sodium' },
          { id: 'B', text: 'High Saturated Animal Fats and sodium bicarbonate' },
          { id: 'C', text: 'Zero Carbohydrate ketogenic foods' },
          { id: 'D', text: 'High sulfur-containing amino acids exclusively' }
        ],
        correctAnswer: 'A',
        explanation: 'DASH emphasizes fruits, vegetables, low-fat dairy, nuts, and legumes supplying potassium, magnesium, and calcium while restricting sodium to ≤ 2,300 mg/day.',
        difficulty: 'Hard',
        topic: 'Nutritional Biochemistry & Dietetics',
        subtopic: 'Cardiometabolic Nutrition'
      },
      {
        question: 'In clinical respiratory monitoring via finger pulse oximetry, what physiological oxygen saturation (SpO2) range is considered normal in healthy adults at sea level ambient air?',
        options: [
          { id: 'A', text: '95% to 100%' },
          { id: 'B', text: '85% to 90%' },
          { id: 'C', text: '75% to 80%' },
          { id: 'D', text: '60% to 70%' }
        ],
        correctAnswer: 'A',
        explanation: 'Normal arterial oxyhemoglobin saturation (SpO2) ranges between 95% and 100%; values below 90% signify clinically significant hypoxemia requiring supplemental oxygen.',
        difficulty: 'Medium',
        topic: 'Anatomy, Physiology & Organ Systems',
        subtopic: 'Respiratory Physiology'
      },
      {
        question: 'In hemodialysis therapy, the passive clearance of uremic waste solutes across the dialyzer semipermeable membrane along a concentration gradient is known as:',
        options: [
          { id: 'A', text: 'Diffusion' },
          { id: 'B', text: 'Ultrafiltration' },
          { id: 'C', text: 'Active Transcellular Pumping' },
          { id: 'D', text: 'Convective Drag alone' }
        ],
        correctAnswer: 'A',
        explanation: 'Diffusion drives solute movement from high concentration in blood to low concentration in dialysate; ultrafiltration removes excess fluid via hydrostatic pressure gradient.',
        difficulty: 'Hard',
        topic: 'Clinical Pathology, Diagnostics & Imaging',
        subtopic: 'Dialysis Principles'
      },
      {
        question: 'In molecular genetics and cytogenetics diagnostics, what cytogenetic technique uses fluorophore-labeled DNA probes to visualize specific chromosomal microdeletions or gene amplifications (such as HER2/neu)?',
        options: [
          { id: 'A', text: 'Fluorescence In Situ Hybridization (FISH)' },
          { id: 'B', text: 'Giemsa G-banding karyotyping only' },
          { id: 'C', text: 'Western Blotting' },
          { id: 'D', text: 'Agarose Gel Electrophoresis' }
        ],
        correctAnswer: 'A',
        explanation: 'FISH hybridizes fluorescently labeled single-stranded DNA probes to complementary target genomic sequences, allowing direct submicroscopic visualization under fluorescence microscopy.',
        difficulty: 'Hard',
        topic: 'Anatomy, Physiology & Organ Systems',
        subtopic: 'Molecular Cytogenetics'
      }
    ],
    recommendedResources: [
      {
        title: 'Clinical Anatomy & Human Physiology Review',
        type: 'Course',
        provider: 'AIIMS / Harvard Medical School Online',
        description: 'Organ systems, hemodynamic regulation, neuroanatomy, and homeostatic clinical physiology.',
        linkText: 'Explore Clinical Physiology',
        focusArea: 'Anatomy, Physiology & Organ Systems'
      },
      {
        title: 'Nutritional Biochemistry & Clinical Dietetics Handbook',
        type: 'Interactive Book',
        provider: 'Academy of Nutrition & Dietetics / NIN',
        description: 'Macronutrient kinetics, medical nutrition therapy (MNT), micronutrient deficiency syndromes, and therapeutic meal formulas.',
        linkText: 'Access Nutrition Blueprint',
        focusArea: 'Nutritional Biochemistry & Dietetics'
      },
      {
        title: 'Clinical Diagnostics & Laboratory Pathology Protocols',
        type: 'Roadmap',
        provider: 'CDC / Johns Hopkins Medicine',
        description: 'Hematology, arterial blood gases, diagnostic imaging modalities, and clinical pharmacology safety.',
        linkText: 'View Clinical Pathology Lab',
        focusArea: 'Clinical Pathology, Diagnostics & Imaging'
      }
    ]
  }
};

/**
 * Universal Assessment Generation Service.
 * Produces 20 verified MCQs with 4 options, balanced difficulties, explanations, topics, and skill gap roadmaps.
 */
export function getOrGenerateAssessment(
  educationLevel: string,
  courseOrGroup: string,
  specialization: string,
  boardName: string = 'Telangana Intermediate (TSBIE)',
  customSubjects: string[] = []
): Assessment {
  // Check exact curated keys first
  const searchSlug = (specialization || courseOrGroup || '').toLowerCase();
  const levelSlug = (educationLevel || '').toLowerCase();

  const isIntermediate = 
    levelSlug.includes('intermediate') || 
    levelSlug.includes('11') || 
    levelSlug.includes('12') || 
    levelSlug.includes('+2') || 
    levelSlug.includes('junior college') ||
    searchSlug.includes('mpc') ||
    searchSlug.includes('bipc') ||
    searchSlug.includes('mec') ||
    searchSlug.includes('cec') ||
    searchSlug.includes('hec') ||
    searchSlug.includes('mbipc');

  // Handle Intermediate streams
  if (isIntermediate) {
    // MBiPC
    if (searchSlug.includes('mbipc')) {
      const assessment = buildIntermediateStreamAssessment('mbipc', boardName);
      if (assessment) return assessment;
    }
    // 6. MPC
    if (searchSlug.includes('mpc')) {
      const assessment = buildIntermediateStreamAssessment('mpc', boardName);
      if (assessment) return assessment;
    }
    // 7. BiPC
    if (searchSlug.includes('bipc')) {
      const assessment = buildIntermediateStreamAssessment('bipc', boardName);
      if (assessment) return assessment;
    }
    // 8. MEC
    if (searchSlug.includes('mec')) {
      const assessment = buildIntermediateStreamAssessment('mec', boardName);
      if (assessment) return assessment;
    }
    // 9. CEC
    if (searchSlug.includes('cec')) {
      const assessment = buildIntermediateStreamAssessment('cec', boardName);
      if (assessment) return assessment;
    }
    // 10. HEC
    if (searchSlug.includes('hec')) {
      const assessment = buildIntermediateStreamAssessment('hec', boardName);
      if (assessment) return assessment;
    }
    // 11. Other Specialization / Custom Subject Combination
    if (
      searchSlug.includes('custom') || 
      searchSlug.includes('other') || 
      searchSlug.includes('inter-custom') ||
      customSubjects.length > 0
    ) {
      return generateCustomIntermediateAssessment(
        customSubjects.length > 0 ? customSubjects : [specialization, courseOrGroup],
        boardName
      );
    }
  }

  if (CURATED_ASSESSMENTS[specialization]) return CURATED_ASSESSMENTS[specialization];
  if (CURATED_ASSESSMENTS[courseOrGroup]) return CURATED_ASSESSMENTS[courseOrGroup];
  if (CURATED_ASSESSMENTS[searchSlug]) return CURATED_ASSESSMENTS[searchSlug];

  // Class 10 Entrance Assessments: guaranteed easy, 4 homogeneous options, simple English
  const isClass10 = 
    levelSlug.includes('10') || 
    levelSlug.includes('secondary') || 
    searchSlug.includes('10th') || 
    searchSlug.includes('std10') || 
    searchSlug.includes('std-10') || 
    searchSlug.includes('class 10') || 
    searchSlug.includes('class_10');

  if (isClass10) {
    if (searchSlug.includes('science') || searchSlug.includes('stem') || searchSlug.includes('bipc') || searchSlug.includes('bio') || searchSlug.includes('phys')) {
      return CURATED_ASSESSMENTS.class10_science;
    }
    if (searchSlug.includes('math') || searchSlug.includes('algebra') || searchSlug.includes('arithmetic') || searchSlug.includes('calc')) {
      return CURATED_ASSESSMENTS.class10_math;
    }
    if (searchSlug.includes('english') || searchSlug.includes('grammar') || searchSlug.includes('lang') || searchSlug.includes('vocab')) {
      return CURATED_ASSESSMENTS.class10_english;
    }
    if (searchSlug.includes('gk') || searchSlug.includes('general knowledge') || searchSlug.includes('social') || searchSlug.includes('civic') || searchSlug.includes('history') || searchSlug.includes('humanities')) {
      return CURATED_ASSESSMENTS.class10_gk;
    }
    if (searchSlug.includes('aptitude') || searchSlug.includes('reasoning') || searchSlug.includes('logic')) {
      return CURATED_ASSESSMENTS.class10_aptitude;
    }
    return CURATED_ASSESSMENTS.class10_entrance_all;
  }


  // Determine domain archetype based on keyword scanning
  let chosenBlueprint = DOMAIN_BLUEPRINTS.tech_computing;
  const combinedText = `${educationLevel} ${courseOrGroup} ${specialization}`.toLowerCase();

  const isMedical = DOMAIN_BLUEPRINTS.medical_healthcare.keywords.some((kw) => combinedText.includes(kw));
  const isBusiness = DOMAIN_BLUEPRINTS.business_finance.keywords.some((kw) => combinedText.includes(kw));
  const isEngineering = DOMAIN_BLUEPRINTS.engineering_physical.keywords.some((kw) => combinedText.includes(kw));

  if (isMedical) {
    chosenBlueprint = DOMAIN_BLUEPRINTS.medical_healthcare;
  } else if (isBusiness) {
    chosenBlueprint = DOMAIN_BLUEPRINTS.business_finance;
  } else if (isEngineering) {
    chosenBlueprint = DOMAIN_BLUEPRINTS.engineering_physical;
  } else {
    chosenBlueprint = DOMAIN_BLUEPRINTS.tech_computing;
  }

  // Build exactly 20 questions
  const cleanSpecTitle = specialization.replace(/^\d+\.\s*/, '').trim();
  const specPrefix = cleanSpecTitle.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, 'SP');

  const questions: AssessmentQuestion[] = chosenBlueprint.sampleQuestions.map((sq, idx) => {
    return {
      ...sq,
      id: `${specPrefix}-${String(idx + 1).padStart(2, '0')}`,
      topic: sq.topic || chosenBlueprint.topics[idx % chosenBlueprint.topics.length]
    };
  });

  return {
    id: `gen-${specPrefix.toLowerCase()}-${Date.now()}`,
    title: `${cleanSpecTitle} — Practice & Skill Test`,
    educationLevel,
    courseOrGroup,
    specialization: cleanSpecTitle,
    totalQuestions: 20,
    timeLimitMinutes: 25,
    description: `A 20-question practice test to check your basic knowledge, problem-solving skills, and AI readiness for ${cleanSpecTitle}.`,
    topicsCovered: chosenBlueprint.topics,
    questions,
    isCurated: false
  };
}

