import React, { useState } from 'react';
import { 
  Bot, UserCheck, MessageSquare, Send, Sparkles, HelpCircle, 
  CheckCircle2, Award, BookOpen, AlertCircle, ShieldCheck, 
  Lightbulb, RefreshCw, Star, ArrowRight, User
} from 'lucide-react';
import { StudentProfile, AssessmentResult, MentorMessage, MentorReview } from '../types';
import { storageService } from '../services/storageService';

interface MentorPortalProps {
  profile: StudentProfile | null;
  assessmentResults: AssessmentResult[];
  onExploreCourses: () => void;
  onOpenRoadmap: () => void;
}

const DEFAULT_MESSAGES: MentorMessage[] = [
  {
    id: 'm-1',
    sender: 'ai_mentor',
    text: "Hi there! I am your AI Study Mentor. I don't just give away the answers. Instead, I give you helpful hints, guiding questions, and clear steps so you can learn and solve problems on your own!",
    timestamp: 'Just now',
    mode: 'socratic_hint',
    explainableRationale: 'Why this helps: Solving problems with hints helps you remember concepts over 3 times better than just reading answers.',
    reflectionQuestion: 'What topic or problem are you working on right now?'
  }
];

const PRESET_TOPICS = [
  { label: 'Physics: Forces at an Angle', prompt: 'I am having trouble with physics when a pulling force is at an angle. Can you guide me?' },
  { label: 'Balancing College & Skills', prompt: 'How can I plan my weekly schedule to balance college classes and learning practical tech skills?' },
  { label: 'Biology & Anatomy Memory', prompt: 'What is the best way to remember body organs, nerves, and biological cycles?' },
  { label: 'Coding & Logic Steps', prompt: 'I get stuck when breaking big coding problems into smaller steps. What approach should I follow?' },
  { label: 'Finance: Balance Sheet Ratios', prompt: 'How can I easily understand the difference between Debt-to-Equity and Current Ratio on a balance sheet?' }
];

export const MentorPortal: React.FC<MentorPortalProps> = ({
  profile,
  assessmentResults,
  onExploreCourses,
  onOpenRoadmap
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ai_mentor' | 'human_review'>('ai_mentor');

  // AI Mentor Chat State
  const [messages, setMessages] = useState<MentorMessage[]>(DEFAULT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [chatMode, setChatMode] = useState<'socratic_hint' | 'concept_explainer' | 'reflection_prompt'>('socratic_hint');
  const [isTyping, setIsTyping] = useState(false);

  // Human Mentor Review State
  const [mentorReviews, setMentorReviews] = useState<MentorReview[]>(() => {
    const saved = storageService.getMentorReviews();
    if (saved && saved.length > 0) return saved;
    // Default initial mentor endorsement
    const initial: MentorReview[] = [
      {
        id: 'rev-default-1',
        mentorName: 'Prof. K. Ramanathan',
        mentorRole: 'Senior Academic Advisor & Head of Department',
        institutionOrDept: 'College of Science & Technology',
        reviewDate: new Date(Date.now() - 3 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        overallRating: 'Distinction',
        comments: 'Shows a solid understanding of the core basics. Test results show great potential for advanced learning. Keep practicing with weekly timed quizzes and finish the 4-week practice plan.',
        verifiedSkills: ['Problem Solving', 'Core Concepts', 'Logical Thinking'],
        recommendedFocus: 'Practice applying these concepts to hands-on mini projects.',
        approvedMilestones: ['Core Concepts Review', 'Baseline Skill Assessment']
      }
    ];
    storageService.saveMentorReview(initial[0]);
    return initial;
  });

  // New review form
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [formMentorName, setFormMentorName] = useState('');
  const [formMentorRole, setFormMentorRole] = useState('Senior Academic Mentor / Teacher');
  const [formInstitution, setFormInstitution] = useState('');
  const [formRating, setFormRating] = useState<'Distinction' | 'Satisfactory' | 'Needs Improvement'>('Distinction');
  const [formComments, setFormComments] = useState('');
  const [formVerifiedSkills, setFormVerifiedSkills] = useState('Core Concepts, Problem Solving, Hands-On Practice');
  const [formRecommendedFocus, setFormRecommendedFocus] = useState('');

  // Handle Sending Chat to AI Socratic Mentor
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: MentorMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      // Socratic Response Engine
      let responseText = '';
      let rationale = '';
      let reflection = '';

      const lower = text.toLowerCase();
      if (lower.includes('calculus') || lower.includes('mechanics') || lower.includes('friction') || lower.includes('physics')) {
        responseText = "Let's solve this mechanics problem step by step before doing calculations:\n\n1. Have you sketched a quick drawing showing all the forces pulling and pushing the object?\n2. Remember: When a force pulls at an angle, split it into two parts: horizontal (pulling forward) and vertical (lifting up or pressing down).\n3. Notice how the ground's upward push changes when your pull lifts slightly upward. How does that change the friction holding it back?";
        rationale = "Why this hint: Splitting forces into horizontal and vertical parts stops you from making common mistakes with friction.";
        reflection = "Think about this: What happens to the friction if you pull upward at an angle instead of pushing downward?";
      } else if (lower.includes('schedule') || lower.includes('balance') || lower.includes('college')) {
        responseText = "Balancing your college classes and extra skills is easier when you give each one its own time block:\n\n1. Daily Class Study: Spend 60 to 90 minutes each day during your best focus hours on your college syllabus.\n2. Skill Practice: Spend 45 minutes practicing code, design, or practical projects 4 days a week.\n3. Weekend Check: Spend 10 minutes every Friday seeing what you finished and what needs more time.";
        rationale = "Why this helps: Focusing on one thing at a time keeps your mind fresh and avoids last-minute exam stress.";
        reflection = "Which 1-hour time slot in your day has the fewest distractions for quiet study?";
      } else if (lower.includes('biology') || lower.includes('medical') || lower.includes('recall')) {
        responseText = "To remember biology terms and body systems without forgetting them:\n\n1. Teach It Simply: Try explaining the process out loud in simple everyday words, as if teaching a friend.\n2. Flashcards from Memory: Write terms on one side, hide the answer, and test what you remember.\n3. Real-Life Examples: Connect each hormone, organ, or nerve to what happens in the body when it stops working properly.";
        rationale = "Why this helps: Connecting body parts to how they work in real life helps your brain store the memory for a long time.";
        reflection = "Can you describe how blood flows through the heart without looking at your book?";
      } else if (lower.includes('dynamic programming') || lower.includes('algorithm') || lower.includes('data structure') || lower.includes('code') || lower.includes('coding')) {
        responseText = "When working on coding problems and logic:\n\n1. Put the goal into plain words: What answer or result are you trying to find at each step?\n2. What choice do you have at each step? (For example: take this item, or skip it?)\n3. What is the simplest starting case? (Like when the list is empty or 0)\n4. Can you write the rule in plain words before typing the code?";
        rationale = "Why this helps: Most coding bugs happen when the idea isn't clear in your mind before writing code.";
        reflection = "In your current problem, what one thing changes after each choice?";
      } else if (lower.includes('ratio') || lower.includes('commerce') || lower.includes('balance sheet')) {
        responseText = "Let's look at what these numbers mean in real life:\n\n1. Current Ratio (Current Assets / Current Liabilities) checks ready cash: Does the business have enough money to pay bills due in the next 3 months?\n2. Debt-to-Equity checks borrowing: How much of the business is paid for with loans versus the owners' own money?\n3. Think about this: Can a business have plenty of goods in the warehouse, but still struggle to pay immediate cash bills?";
        rationale = "Why this question: Separating short-term cash from long-term loans is key to understanding business health.";
        reflection = "If a store has a lot of products that aren't selling, why might a quick cash check be safer than counting unsold inventory?";
      } else {
        responseText = `Let's look at "${text.slice(0, 50)}..." step by step. Instead of giving you the answer right away, let's explore the main idea:\n\n1. What is the main rule or concept behind this topic?\n2. What have you tried so far, and what happened?\n3. Which exact step feels confusing?`;
        rationale = "Why this helps: Answering guiding questions helps you spot where you are stuck and builds real problem-solving confidence.";
        reflection = "If you had to explain this problem to a friend in one sentence, what would you say?";
      }

      const aiReply: MentorMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai_mentor',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: chatMode,
        explainableRationale: rationale,
        reflectionQuestion: reflection
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 650);
  };

  const handleSaveNewReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMentorName.trim() || !formComments.trim()) return;

    const newRev: MentorReview = {
      id: `rev-${Date.now()}`,
      mentorName: formMentorName.trim(),
      mentorRole: formMentorRole.trim(),
      institutionOrDept: formInstitution.trim() || 'Academic Department',
      reviewDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      overallRating: formRating,
      comments: formComments.trim(),
      verifiedSkills: formVerifiedSkills.split(',').map((s) => s.trim()).filter(Boolean),
      recommendedFocus: formRecommendedFocus.trim() || 'Continue daily deliberate practice.',
      approvedMilestones: ['Diagnostic Progress Verification']
    };

    storageService.saveMentorReview(newRev);
    setMentorReviews([newRev, ...mentorReviews]);
    setIsAddingReview(false);
    setFormMentorName('');
    setFormComments('');
    setFormInstitution('');
    setFormRecommendedFocus('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/25 px-3 py-1 rounded-full border border-[#D5A3AE]">
          Study Guidance &amp; Teacher Feedback
        </span>
        <h1 className="text-3xl font-extrabold text-[#722F45] mt-2 font-serif-accent">
          AI Study Mentor &amp; Teacher Feedback
        </h1>
        <p className="text-sm text-[#6C555C] mt-1 leading-relaxed">
          Get friendly AI guidance that helps you think for yourself, plus real feedback from teachers who review your progress and approve your skills.
        </p>
      </div>

      {/* Sub-Tabs: AI Study Mentor vs Teacher Feedback */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#DFCEBE] border border-[#D5A3AE]/50 shadow-inner">
          <button
            onClick={() => setActiveSubTab('ai_mentor')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'ai_mentor'
                ? 'bg-[#722F45] text-white shadow-md'
                : 'text-[#2D2226] hover:text-[#722F45]'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Study Mentor</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">Hints &amp; Questions</span>
          </button>

          <button
            onClick={() => setActiveSubTab('human_review')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'human_review'
                ? 'bg-[#722F45] text-white shadow-md'
                : 'text-[#2D2226] hover:text-[#722F45]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Teacher Reviews</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
              {mentorReviews.length} {mentorReviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: AI STUDY MENTOR */}
      {activeSubTab === 'ai_mentor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Rules & Quick Topics */}
          <div className="space-y-4">
            
            {/* Principles Card */}
            <div className="p-5 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs">
              <div className="flex items-center gap-2 text-[#722F45] font-bold text-sm mb-3">
                <Lightbulb className="w-4 h-4" />
                <span>How This Mentor Works</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#6C555C]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#722F45] mt-1.5 shrink-0" />
                  <span><strong>Helpful Hints First:</strong> Gives clues and guiding questions instead of direct answers so you learn to think for yourself.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#722F45] mt-1.5 shrink-0" />
                  <span><strong>Clear Explanations:</strong> Explains why each hint or practice tip is suggested.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#722F45] mt-1.5 shrink-0" />
                  <span><strong>Reflection Questions:</strong> Asks quick questions to help you put ideas into your own words.</span>
                </li>
              </ul>
            </div>

            {/* Quick Scenarios */}
            <div className="p-5 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#722F45] mb-3">
                Try Asking About
              </h3>
              <div className="space-y-2">
                {PRESET_TOPICS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/70 hover:bg-[#D5A3AE]/20 border border-[#D5A3AE]/40 text-xs text-[#2D2226] font-medium transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#722F45] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Student Context Card */}
            <div className="p-4 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/40 text-xs text-[#6C555C]">
              <p className="font-bold text-[#722F45] mb-1">Your Current Profile</p>
              <p>Subject: <strong className="text-[#2D2226]">{profile?.specialization || 'Not selected yet'}</strong></p>
              <p>Quizzes Completed: <strong className="text-[#2D2226]">{assessmentResults.length}</strong></p>
            </div>

          </div>

          {/* Right Column: Chat Window */}
          <div className="lg:col-span-2 flex flex-col h-[600px] rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-sm overflow-hidden">
            
            {/* Chat Header */}
            <div className="px-5 py-3.5 bg-[#DFCEBE]/60 border-b border-[#D5A3AE]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#722F45] text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#722F45]">AI Study Mentor</h3>
                  <p className="text-[11px] text-[#6C555C]">Helpful Hints &bull; Step-by-Step Questions</p>
                </div>
              </div>

              {/* Mode Selector */}
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold">
                <span className="text-[#6C555C] mr-1">Style:</span>
                <button
                  onClick={() => setChatMode('socratic_hint')}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    chatMode === 'socratic_hint' ? 'bg-[#722F45] text-white' : 'bg-white/60 text-[#2D2226]'
                  }`}
                >
                  Hints
                </button>
                <button
                  onClick={() => setChatMode('concept_explainer')}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    chatMode === 'concept_explainer' ? 'bg-[#722F45] text-white' : 'bg-white/60 text-[#2D2226]'
                  }`}
                >
                  Step-by-Step
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'student'
                        ? 'bg-[#722F45] text-white rounded-br-xs'
                        : 'bg-white text-[#2D2226] border border-[#D5A3AE]/50 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line font-medium">
                      {msg.text}
                    </div>

                    {/* Explainable AI Rationale Banner */}
                    {msg.explainableRationale && (
                      <div className="mt-3 pt-2.5 border-t border-[#D5A3AE]/30 text-[11px] text-[#722F45] bg-[#FAF4EE] p-2.5 rounded-lg flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#8C4057]" />
                        <span>{msg.explainableRationale}</span>
                      </div>
                    )}

                    {/* Reflection Question Box */}
                    {msg.reflectionQuestion && (
                      <div className="mt-2 text-[11px] text-[#2D2226] bg-[#E8D5C4]/40 p-2.5 rounded-lg border border-[#D5A3AE]/40 flex items-start gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#722F45]" />
                        <div>
                          <strong className="text-[#722F45]">Question to Think About: </strong>
                          <span>{msg.reflectionQuestion}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-[#6C555C] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#6C555C] p-2">
                  <div className="w-2 h-2 rounded-full bg-[#722F45] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#722F45] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#722F45] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-medium">Thinking of helpful hints...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3.5 bg-[#DFCEBE]/40 border-t border-[#D5A3AE]/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask for a hint on a formula, problem, or idea..."
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-white border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-2 focus:ring-[#722F45]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="px-4 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ask Mentor</span>
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 text-[10px] text-[#6C555C]">
                <span>The AI gives hints and questions so you can solve problems on your own.</span>
                <button
                  type="button"
                  onClick={() => setMessages(DEFAULT_MESSAGES)}
                  className="hover:text-[#722F45] flex items-center gap-1 underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Chat
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUB-TAB 2: TEACHER & HUMAN REVIEWS */}
      {activeSubTab === 'human_review' && (
        <div className="space-y-6">
          
          {/* Info Banner */}
          <div className="p-6 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#722F45] font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Teacher &amp; Mentor Review Hub</span>
              </div>
              <p className="text-xs text-[#6C555C] mt-1 max-w-2xl leading-relaxed">
                Teachers and mentors can check your test scores, verify your skills, and write helpful advice for your student profile. This keeps real human teachers involved alongside your AI practice.
              </p>
            </div>

            <button
              onClick={() => setIsAddingReview(!isAddingReview)}
              className="px-4 py-2.5 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
            >
              <UserCheck className="w-4 h-4" />
              <span>{isAddingReview ? 'Cancel' : '+ Add Teacher Review'}</span>
            </button>
          </div>

          {/* Form to Add New Review */}
          {isAddingReview && (
            <div className="p-6 rounded-2xl bg-white border border-[#722F45]/30 shadow-md animate-fade-in">
              <div className="flex items-center justify-between mb-4 border-b border-[#D5A3AE]/40 pb-3">
                <h3 className="text-sm font-bold text-[#722F45] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Add Teacher Review &amp; Feedback</span>
                </h3>
                <span className="text-[11px] text-[#6C555C]">Student: {profile?.name || 'Active Student'}</span>
              </div>

              <form onSubmit={handleSaveNewReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D2226] mb-1">Teacher / Mentor Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Priya Sharma"
                      value={formMentorName}
                      onChange={(e) => setFormMentorName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2226] mb-1">Role / Designation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Assistant Professor / Subject Teacher"
                      value={formMentorRole}
                      onChange={(e) => setFormMentorRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2226] mb-1">School / College Department</label>
                    <input
                      type="text"
                      placeholder="e.g. Department of Science"
                      value={formInstitution}
                      onChange={(e) => setFormInstitution(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D2226] mb-1">Student Performance Level</label>
                    <select
                      value={formRating}
                      onChange={(e) => setFormRating(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                    >
                      <option value="Distinction">Distinction (Doing great, above expectations)</option>
                      <option value="Satisfactory">Satisfactory (Good progress with steady effort)</option>
                      <option value="Needs Improvement">Needs Improvement (Needs extra practice on weak topics)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2226] mb-1">Approved Skills (separated by commas)</label>
                    <input
                      type="text"
                      value={formVerifiedSkills}
                      onChange={(e) => setFormVerifiedSkills(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2226] mb-1">Teacher Feedback &amp; Advice</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write what the student did well, where they can improve, and what to practice next..."
                    value={formComments}
                    onChange={(e) => setFormComments(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2226] mb-1">Next Recommended Goal</label>
                  <input
                    type="text"
                    placeholder="e.g. Finish Week 3 practice questions on thermodynamics"
                    value={formRecommendedFocus}
                    onChange={(e) => setFormRecommendedFocus(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(false)}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-[#DFCEBE] hover:bg-[#D5A3AE]/30 text-[#2D2226] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white shadow-sm cursor-pointer"
                  >
                    Save Teacher Review
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List of Mentor Reviews */}
          <div className="space-y-4">
            {mentorReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5A3AE]/40 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#722F45] text-white flex items-center justify-center font-bold text-sm">
                      {rev.mentorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#722F45] flex items-center gap-2">
                        {rev.mentorName}
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D5A3AE]/30 text-[#722F45] border border-[#D5A3AE]/50">
                          Verified Teacher
                        </span>
                      </h4>
                      <p className="text-xs text-[#6C555C]">
                        {rev.mentorRole} &bull; {rev.institutionOrDept}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6C555C]">{rev.reviewDate}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      rev.overallRating === 'Distinction'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : rev.overallRating === 'Satisfactory'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {rev.overallRating}
                    </span>
                  </div>
                </div>

                {/* Feedback Body */}
                <p className="text-xs text-[#2D2226] leading-relaxed font-medium">
                  &ldquo;{rev.comments}&rdquo;
                </p>

                {/* Verified Skills Endorsed */}
                {rev.verifiedSkills && rev.verifiedSkills.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#722F45] mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Skills Approved by Teacher:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {rev.verifiedSkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white border border-[#D5A3AE]/60 text-[#722F45]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Focus */}
                {rev.recommendedFocus && (
                  <div className="p-3 rounded-xl bg-[#DFCEBE]/40 border border-[#D5A3AE]/40 text-xs text-[#6C555C] flex items-start gap-2">
                    <Star className="w-4 h-4 text-[#8C4057] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#722F45]">Teacher's Advice: </strong>
                      <span>{rev.recommendedFocus}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Action Navigation */}
          <div className="p-5 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#722F45]">Check Your Learning Roadmap</p>
              <p className="text-[11px] text-[#6C555C]">Use your teacher's advice to plan your weekly study schedule.</p>
            </div>
            <button
              onClick={onOpenRoadmap}
              className="px-4 py-2 rounded-xl bg-[#722F45] text-white text-xs font-bold hover:bg-[#5C2436] transition-colors cursor-pointer"
            >
              Open Learning Roadmap &rarr;
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
