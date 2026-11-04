import React, { useState } from 'react';
import { 
  FileText, Calendar, BookOpen, Clock, Award, CheckCircle2, 
  Circle, Plus, Trash2, RotateCcw, AlertTriangle, Sparkles, 
  ChevronDown, ChevronUp, Search, Layers, Lightbulb
} from 'lucide-react';
import { PREVIOUS_YEAR_PAPERS, SMART_NOTES_DATA, DEFAULT_STUDY_PLAN_SLOTS } from '../data/studyHubData';
import { StudyPlanSlot, SmartNoteItem, PreviousYearPaper } from '../types';
import { storageService } from '../services/storageService';

interface StudyHubSectionProps {
  onOpenRoadmap: () => void;
  onLaunchAssessment: (specialization: string) => void;
}

export const StudyHubSection: React.FC<StudyHubSectionProps> = ({
  onOpenRoadmap,
  onLaunchAssessment
}) => {
  const [activeTab, setActiveTab] = useState<'pyqs' | 'planner' | 'notes'>('pyqs');

  // PYQ State
  const [pyqFilter, setPyqFilter] = useState<string>('All');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(PREVIOUS_YEAR_PAPERS[0].id);

  // Study Planner State
  const [planSlots, setPlanSlots] = useState<StudyPlanSlot[]>(() => {
    const saved = storageService.getStudyPlanSlots();
    if (saved && saved.length > 0) return saved;
    storageService.saveStudyPlanSlots(DEFAULT_STUDY_PLAN_SLOTS);
    return DEFAULT_STUDY_PLAN_SLOTS;
  });
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newTaskType, setNewTaskType] = useState<'Deep Study' | 'Revision' | 'Problem Solving' | 'Practice Test'>('Deep Study');

  // Smart Notes State
  const [smartNotes, setSmartNotes] = useState<SmartNoteItem[]>(() => {
    const saved = storageService.getSmartNotes();
    if (saved && saved.length > 0) return saved;
    storageService.saveSmartNotes(SMART_NOTES_DATA);
    return SMART_NOTES_DATA;
  });
  const [noteSearch, setNoteSearch] = useState('');
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(SMART_NOTES_DATA[0].id);

  // Planner toggle
  const toggleSlotComplete = (id: string) => {
    const updated = planSlots.map((slot) =>
      slot.id === id ? { ...slot, completed: !slot.completed } : slot
    );
    setPlanSlots(updated);
    storageService.saveStudyPlanSlots(updated);
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTimeSlot || !newSubject || !newTopic) return;

    const newSlot: StudyPlanSlot = {
      id: `slot_${Date.now()}`,
      timeSlot: newTimeSlot,
      subject: newSubject,
      topic: newTopic,
      taskType: newTaskType,
      completed: false
    };

    const updated = [...planSlots, newSlot];
    setPlanSlots(updated);
    storageService.saveStudyPlanSlots(updated);
    setIsAddingSlot(false);
    setNewTimeSlot('');
    setNewSubject('');
    setNewTopic('');
  };

  const handleDeleteSlot = (id: string) => {
    const updated = planSlots.filter((slot) => slot.id !== id);
    setPlanSlots(updated);
    storageService.saveStudyPlanSlots(updated);
  };

  const handleResetPlanner = () => {
    setPlanSlots(DEFAULT_STUDY_PLAN_SLOTS);
    storageService.saveStudyPlanSlots(DEFAULT_STUDY_PLAN_SLOTS);
  };

  // Filtered PYQs
  const filteredPapers = pyqFilter === 'All'
    ? PREVIOUS_YEAR_PAPERS
    : PREVIOUS_YEAR_PAPERS.filter((p) => p.category === pyqFilter);

  // Filtered Notes
  const filteredNotes = smartNotes.filter((n) =>
    n.topic.toLowerCase().includes(noteSearch.toLowerCase()) ||
    n.subject.toLowerCase().includes(noteSearch.toLowerCase())
  );

  const completedSlotCount = planSlots.filter((s) => s.completed).length;
  const plannerPercent = planSlots.length > 0
    ? Math.round((completedSlotCount / planSlots.length) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/25 px-3 py-1 rounded-full border border-[#D5A3AE]">
          Study Resources &amp; Planning
        </span>
        <h1 className="text-3xl font-extrabold text-[#722F45] mt-2 font-serif-accent">
          Study Hub: Past Papers, Planner &amp; Notes
        </h1>
        <p className="text-sm text-[#6C555C] mt-1 leading-relaxed">
          Practice real past exam papers, plan your daily study time, and review quick revision notes with key formulas and tips.
        </p>
      </div>

      {/* Sub-Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#DFCEBE] border border-[#D5A3AE]/50 shadow-inner">
          <button
            onClick={() => setActiveTab('pyqs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pyqs'
                ? 'bg-[#722F45] text-white shadow-md'
                : 'text-[#2D2226] hover:text-[#722F45]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Past Exam Papers (PYQs)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
              {PREVIOUS_YEAR_PAPERS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-[#722F45] text-white shadow-md'
                : 'text-[#2D2226] hover:text-[#722F45]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Daily Study Planner</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
              {plannerPercent}% Done
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-[#722F45] text-white shadow-md'
                : 'text-[#2D2226] hover:text-[#722F45]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Quick Revision Notes</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
              {smartNotes.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: PREVIOUS YEAR PAPERS */}
      {activeTab === 'pyqs' && (
        <div className="space-y-6">
          
          {/* Category Filter Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/50">
            <span className="text-xs font-bold text-[#722F45]">Filter by Exam Level:</span>
            <div className="flex items-center gap-1 flex-wrap">
              {(['All', 'School / 10th', 'Intermediate / +2', 'National Entrance', 'University Degree'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPyqFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    pyqFilter === cat
                      ? 'bg-[#722F45] text-white shadow-xs'
                      : 'bg-white/60 text-[#2D2226] hover:bg-[#D5A3AE]/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Papers Accordion */}
          <div className="space-y-4">
            {filteredPapers.map((paper) => {
              const isExpanded = expandedPaperId === paper.id;
              return (
                <div
                  key={paper.id}
                  className="rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 overflow-hidden shadow-xs transition-all"
                >
                  {/* Paper Header Row */}
                  <div
                    onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF4EE]/80"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2 py-0.5 rounded">
                          {paper.category}
                        </span>
                        <span className="text-xs font-bold text-[#6C555C] bg-white px-2 py-0.5 rounded border border-[#D5A3AE]/40">
                          Year {paper.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[#722F45] leading-snug">
                        {paper.examName} &mdash; {paper.subject}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right text-xs text-[#6C555C]">
                        <p><strong className="text-[#2D2226]">{paper.totalMarks}</strong> Total Marks</p>
                        <p><strong className="text-[#2D2226]">{paper.timeHours} Hours</strong> Duration</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#722F45]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#722F45]" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Paper Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-[#D5A3AE]/30 space-y-4">
                      
                      {/* Marking Scheme */}
                      <div className="p-3.5 rounded-xl bg-white/70 border border-[#D5A3AE]/50 text-xs">
                        <strong className="text-[#722F45]">Marking Scheme &amp; Scoring Rules: </strong>
                        <span className="text-[#2D2226]">{paper.markingScheme}</span>
                      </div>

                      {/* Sections & Sample Questions */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#722F45]">
                          Exam Sections &amp; Question Types:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {paper.sections.map((sec, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-4 rounded-xl bg-white border border-[#D5A3AE]/40 shadow-xs space-y-2"
                            >
                              <h5 className="font-bold text-xs text-[#722F45]">{sec.name}</h5>
                              <p className="text-[11px] text-[#6C555C]">{sec.description}</p>
                              
                              <div className="pt-2 border-t border-[#D5A3AE]/20 space-y-1.5">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6C555C]">Sample Questions:</p>
                                {sec.sampleQuestions.map((q, qIdx) => (
                                  <div key={qIdx} className="text-[11px] text-[#2D2226] flex items-start gap-1.5 font-medium leading-relaxed">
                                    <span className="text-[#722F45] font-bold shrink-0">{qIdx + 1}.</span>
                                    <span>{q}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA to practice on 20-MCQ engine */}
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onLaunchAssessment(paper.subject.split('(')[0].trim())}
                          className="px-4 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Take Timed Practice Quiz</span>
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: DAILY STUDY PLANNER */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          
          {/* Progress Header Card */}
          <div className="p-6 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2 py-0.5 rounded">
                  Daily Study Habit
                </span>
                <span className="text-xs text-[#6C555C]">
                  {completedSlotCount} of {planSlots.length} tasks finished
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#722F45] mt-1">
                Your Daily Study Schedule
              </h3>
              <p className="text-xs text-[#6C555C] mt-0.5">
                Balance textbook reading, practice problems, AI practice, and daily reflection.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setIsAddingSlot(!isAddingSlot)}
                className="px-3.5 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Study Block</span>
              </button>

              <button
                onClick={handleResetPlanner}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#D5A3AE]/60 text-[#722F45] text-xs font-bold hover:bg-[#D5A3AE]/20 transition-all cursor-pointer flex items-center gap-1.5"
                title="Reset to recommended schedule"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-4 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/40 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-[#722F45]">Today&apos;s Study Progress</span>
                <span className="text-[#2D2226]">{plannerPercent}%</span>
              </div>
              <div className="h-2.5 w-full bg-[#DFCEBE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#722F45] rounded-full transition-all duration-500"
                  style={{ width: `${plannerPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Add Slot Modal / Inline Form */}
          {isAddingSlot && (
            <form onSubmit={handleAddSlot} className="p-5 rounded-2xl bg-white border border-[#722F45]/30 shadow-md space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#722F45]">New Study Block</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-[#2D2226] mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 05:00 PM - 06:30 PM"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D2226] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics / Calculus"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D2226] mb-1">Specific Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electromagnetic Induction"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D2226] mb-1">Task Type</label>
                  <select
                    value={newTaskType}
                    onChange={(e) => setNewTaskType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF4EE] border border-[#D5A3AE]/60 text-[#2D2226] focus:outline-none focus:ring-1 focus:ring-[#722F45]"
                  >
                    <option value="Deep Study">Deep Study</option>
                    <option value="Problem Solving">Problem Solving</option>
                    <option value="Revision">Revision</option>
                    <option value="Practice Test">Practice Test</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingSlot(false)}
                  className="px-4 py-1.5 text-xs font-bold rounded-xl bg-[#DFCEBE] text-[#2D2226] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold rounded-xl bg-[#722F45] text-white shadow-xs cursor-pointer"
                >
                  Save Slot
                </button>
              </div>
            </form>
          )}

          {/* Slots List */}
          <div className="space-y-3">
            {planSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  slot.completed
                    ? 'bg-white/60 border-emerald-300 opacity-90'
                    : 'bg-[#FAF4EE] border-[#D5A3AE]/60 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleSlotComplete(slot.id)}
                    className="mt-0.5 text-[#722F45] hover:scale-110 transition-transform cursor-pointer"
                  >
                    {slot.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#8C4057]" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-[#722F45]">{slot.timeSlot}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D5A3AE]/25 text-[#722F45]">
                        {slot.taskType}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold ${slot.completed ? 'line-through text-[#6C555C]' : 'text-[#2D2226]'}`}>
                      {slot.subject} &mdash; <span className="font-medium">{slot.topic}</span>
                    </h4>
                    {slot.notes && (
                      <p className="text-xs text-[#6C555C] mt-1">{slot.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="p-1.5 rounded-lg text-[#6C555C] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete study slot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: SMART NOTES & RAPID REVISION */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          
          {/* Search Bar */}
          <div className="p-4 rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/50 flex items-center gap-3">
            <Search className="w-4 h-4 text-[#722F45]" />
            <input
              type="text"
              placeholder="Search smart notes by subject or topic (e.g., Calculus, Respiration, Elasticity)..."
              value={noteSearch}
              onChange={(e) => setNoteSearch(e.target.value)}
              className="flex-1 bg-transparent text-xs text-[#2D2226] focus:outline-none placeholder:text-[#6C555C]"
            />
          </div>

          {/* Notes Cards */}
          <div className="space-y-4">
            {filteredNotes.map((note) => {
              const isExpanded = expandedNoteId === note.id;
              return (
                <div
                  key={note.id}
                  className="rounded-2xl bg-[#FAF4EE] border border-[#D5A3AE]/60 overflow-hidden shadow-xs transition-all"
                >
                  <div
                    onClick={() => setExpandedNoteId(isExpanded ? null : note.id)}
                    className="p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF4EE]/80"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F45] bg-[#D5A3AE]/30 px-2 py-0.5 rounded">
                        {note.subject}
                      </span>
                      <h3 className="font-bold text-sm text-[#722F45] mt-1">
                        {note.topic}
                      </h3>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#722F45]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#722F45]" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-[#D5A3AE]/30 space-y-4">
                      
                      {/* Summary Points */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#722F45] mb-2">
                          Key Study Points:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-[#2D2226]">
                          {note.summaryBulletPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#722F45] mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Formulas & Concepts */}
                      <div className="p-4 rounded-xl bg-white border border-[#D5A3AE]/40 space-y-2">
                        <h4 className="text-xs font-bold text-[#722F45] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#8C4057]" />
                          <span>Key Formulas &amp; Rules:</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {note.keyFormulasOrConcepts.map((f, fIdx) => (
                            <div
                              key={fIdx}
                              className="p-2 rounded-lg bg-[#FAF4EE] border border-[#D5A3AE]/30 font-mono text-[11px] text-[#722F45]"
                            >
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Common Exam Pitfalls */}
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-amber-950">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>Mistakes to Avoid in Exams:</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                          {note.commonExamPitfalls.map((pitfall, pitIdx) => (
                            <li key={pitIdx}>{pitfall}</li>
                          ))}
                        </ul>
                      </div>

                      {/* AI Cross-Disciplinary Note */}
                      <div className="p-3 rounded-xl bg-[#DFCEBE]/30 border border-[#D5A3AE]/40 text-xs text-[#6C555C] flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-[#8C4057] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#722F45]">Real-World &amp; AI Connection: </strong>
                          <span>{note.aiCrossDisciplinaryNote}</span>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
