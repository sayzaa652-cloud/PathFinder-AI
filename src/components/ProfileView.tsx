import React, { useRef } from 'react';
import { 
  User, Award, BookOpen, Sparkles, Download, Upload, 
  Printer, ArrowRight, RotateCcw, Edit3, Calendar, CheckCircle2
} from 'lucide-react';
import { StudentProfile, AssessmentResult, CareerInterestResult } from '../types';
import { storageService } from '../services/storageService';

interface ProfileViewProps {
  profile: StudentProfile | null;
  onEditProfile: () => void;
  assessmentResults: AssessmentResult[];
  careerInterest: CareerInterestResult | null;
  onRetakeAssessment: (specialization: string) => void;
  onRetakeQuiz: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onEditProfile,
  assessmentResults,
  careerInterest,
  onRetakeAssessment,
  onRetakeQuiz
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonStr = storageService.exportStudentPortfolio();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pathfinder_portfolio_${profile?.name ? profile.name.replace(/\s+/g, '_') : 'student'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = storageService.importStudentPortfolio(content);
        if (success) {
          window.location.reload();
        } else {
          alert('Failed to parse portfolio file. Please check file format.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5A3AE]/40">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#722F45] text-white flex items-center justify-center font-bold text-2xl font-serif-accent shadow-xs">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#722F45] font-serif-accent">
                  {profile?.name || 'Student Profile'}
                </h1>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded bg-[#F9ECE0] text-[#722F45] border border-[#D5A3AE]/50">
                  Enrolled Student
                </span>
              </div>
              <p className="text-xs text-[#5A454C] mt-0.5">
                {profile?.specialization || 'Selected Subject'} · {profile?.streamOrGroup}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 no-print">
            <button
              onClick={onEditProfile}
              className="px-3.5 py-2 rounded-xl bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={handleExport}
              className="px-3.5 py-2 rounded-xl border border-[#D5A3AE] bg-[#F9ECE0] hover:bg-[#D5A3AE]/30 text-[#722F45] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Portfolio</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl border border-[#D5A3AE] bg-white hover:bg-[#F9ECE0] text-[#722F45] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl border border-[#D5A3AE] bg-white hover:bg-[#F9ECE0] text-[#722F45] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Detailed Profile Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
            <span className="text-[#5A454C] block text-[10px] uppercase font-bold tracking-wider">Education Level</span>
            <span className="font-bold text-[#722F45] mt-0.5 block truncate" title={profile?.educationLevel}>
              {profile?.educationLevel || 'Undergraduate Degree'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
            <span className="text-[#5A454C] block text-[10px] uppercase font-bold tracking-wider">Degree / Course</span>
            <span className="font-bold text-[#2D2226] mt-0.5 block truncate" title={profile?.classOrDegree}>
              {profile?.classOrDegree || profile?.course || 'B.Sc.'}
            </span>
            {profile?.studyType && (
              <span className="text-[10px] text-[#8C4057] font-semibold block truncate mt-0.5" title={profile.studyType}>
                {profile.studyType}
              </span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
            <span className="text-[#5A454C] block text-[10px] uppercase font-bold tracking-wider">Stream / Branch</span>
            <span className="font-bold text-[#2D2226] mt-0.5 block truncate" title={profile?.branchOrCombination || profile?.streamOrGroup}>
              {profile?.branchOrCombination || profile?.streamOrGroup || 'Biological Sciences'}
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[#722F45] bg-[#FFF9F2]">
            <span className="text-[#8C4057] block text-[10px] uppercase font-bold tracking-wider">Subject / Specialization</span>
            <span className="font-bold text-[#722F45] mt-0.5 block truncate" title={profile?.specialization}>
              {profile?.specialization || 'B.Sc. Biology'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
            <span className="text-[#5A454C] block text-[10px] uppercase font-bold tracking-wider">Board or University</span>
            <span className="font-bold text-[#2D2226] mt-0.5 block truncate" title={profile?.boardOrUniversity}>
              {profile?.boardOrUniversity || 'State Board / University'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50">
            <span className="text-[#5A454C] block text-[10px] uppercase font-bold tracking-wider">Current Year &amp; Term</span>
            <span className="font-bold text-[#2D2226] mt-0.5 block truncate">
              {profile?.yearOfStudy || '1st Year'} · {profile?.semester || 'Sem 1'}
            </span>
          </div>
        </div>

        {/* Prior Academic Context / Law Eligibility if present */}
        {(profile?.previousQualification || profile?.intermediateStream || profile?.lawSpecialization) && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#F4EAE0] border border-[#722F45]/30 flex flex-wrap items-center gap-3 text-xs">
            {profile?.previousQualification && (
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#722F45]">Prior Degree / Qualification:</span>
                <span className="px-2 py-0.5 rounded bg-white font-semibold text-[#2D2226] border border-[#D5A3AE]">
                  {profile.previousQualification}
                </span>
              </div>
            )}
            {profile?.intermediateStream && (
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#722F45]">Intermediate (+2) Stream:</span>
                <span className="px-2 py-0.5 rounded bg-white font-semibold text-[#2D2226] border border-[#D5A3AE]">
                  {profile.intermediateStream}
                </span>
              </div>
            )}
            {profile?.lawSpecialization && (
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#722F45]">LLM Specialization:</span>
                <span className="px-2 py-0.5 rounded bg-white font-semibold text-[#2D2226] border border-[#D5A3AE]">
                  {profile.lawSpecialization}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Goals & Interests */}
        <div className="mt-5 pt-4 border-t border-[#D5A3AE]/40 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold text-[#722F45] uppercase tracking-wider block mb-1">
              Career Goal
            </span>
            <p className="text-[#5A454C] leading-relaxed">
              {profile?.careerGoals || 'Prepare for higher studies and develop practical skills for modern jobs.'}
            </p>
          </div>

          <div>
            <span className="font-bold text-[#722F45] uppercase tracking-wider block mb-1">
              Subjects You Enjoy
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profile?.interests?.length ? (
                profile.interests.map((i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[#F9ECE0] text-[#722F45] font-medium border border-[#D5A3AE]/50"
                  >
                    {i}
                  </span>
                ))
              ) : (
                <span className="text-[#5A454C]">No interests selected yet.</span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Assessment Diagnostic Results Log */}
      <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#D5A3AE]/40 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#722F45] font-serif-accent">
              Your Test History (20 Questions Each)
            </h2>
            <p className="text-xs text-[#5A454C]">
              See your scores, accuracy, and test dates for completed practice quizzes.
            </p>
          </div>
          <span className="text-xs font-bold text-[#8C4057]">
            {assessmentResults.length} Completed
          </span>
        </div>

        {assessmentResults.length === 0 ? (
          <div className="p-8 text-center bg-[#F9ECE0] rounded-xl border border-[#D5A3AE]/50">
            <BookOpen className="w-8 h-8 text-[#8C4057] mx-auto mb-2" />
            <h3 className="font-bold text-sm text-[#722F45]">No practice tests taken yet</h3>
            <p className="text-xs text-[#5A454C] mt-1 max-w-sm mx-auto">
              Pick any course or subject from the course explorer to take a 20-question practice test and track your scores here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {assessmentResults.map((ar) => (
              <div
                key={ar.id}
                className="p-4 rounded-xl bg-white border border-[#D5A3AE]/60 hover:border-[#722F45] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase text-[#8C4057]">
                      {ar.educationLevel}
                    </span>
                    <span className="text-xs text-[#D5A3AE]">·</span>
                    <span className="text-xs text-[#5A454C]">
                      {new Date(ar.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#2D2226]">
                    {ar.assessmentTitle}
                  </h4>
                  <p className="text-xs text-[#5A454C] mt-0.5">
                    {ar.specialization} · Time: {Math.floor(ar.timeSpentSeconds / 60)}m {ar.timeSpentSeconds % 60}s
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#722F45]">
                      {ar.score} / 20
                    </span>
                    <span className="block text-[10px] font-bold text-[#8C4057]">
                      {ar.percentage}% Score
                    </span>
                  </div>

                  <button
                    onClick={() => onRetakeAssessment(ar.specialization)}
                    className="px-3 py-1.5 rounded-lg bg-[#722F45] hover:bg-[#5C2436] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Retake
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stream Discovery Quiz Record */}
      {careerInterest && (
        <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#D5A3AE]/40 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057]">
                Career Quiz Results
              </span>
              <h3 className="text-lg font-bold text-[#722F45] font-serif-accent">
                Stream Match: &quot;Which Stream Fits You Best?&quot;
              </h3>
            </div>
            <button
              onClick={onRetakeQuiz}
              className="text-xs font-bold text-[#722F45] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="p-3 rounded-lg bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
              <span className="text-[10px] text-[#5A454C] block">Technology &amp; AI</span>
              <span className="font-extrabold text-base text-[#722F45]">{careerInterest.scores.tech_ai} / 10</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
              <span className="text-[10px] text-[#5A454C] block">Life Sciences &amp; Health</span>
              <span className="font-extrabold text-base text-[#722F45]">{careerInterest.scores.bio_health} / 10</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
              <span className="text-[10px] text-[#5A454C] block">Finance &amp; Commerce</span>
              <span className="font-extrabold text-base text-[#722F45]">{careerInterest.scores.finance_business} / 10</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F9ECE0] border border-[#D5A3AE]/50 text-center">
              <span className="text-[10px] text-[#5A454C] block">Humanities &amp; Social</span>
              <span className="font-extrabold text-base text-[#722F45]">{careerInterest.scores.humanities_social} / 10</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 text-xs text-[#2D2226]">
            <span className="font-bold text-[#722F45]">Top Match: </span>
            {careerInterest.recommendations[0]?.title} ({careerInterest.recommendations[0]?.percentage}% match)
          </div>
        </div>
      )}

      {/* Teacher Reviews & Endorsements */}
      {(() => {
        const reviews = storageService.getMentorReviews();
        if (reviews.length === 0) return null;
        return (
          <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#D5A3AE]/40 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057]">
                  Teacher Feedback
                </span>
                <h3 className="text-lg font-bold text-[#722F45] font-serif-accent">
                  Teacher Reviews &amp; Feedback
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                Teacher Approved
              </span>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#722F45]">{rev.mentorName}</h4>
                      <p className="text-[11px] text-[#5A454C]">{rev.mentorRole} &bull; {rev.institutionOrDept}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-[#722F45] border border-[#D5A3AE]/60">
                      {rev.overallRating}
                    </span>
                  </div>
                  <p className="text-xs text-[#2D2226] font-medium leading-relaxed italic">
                    &ldquo;{rev.comments}&rdquo;
                  </p>
                  {rev.verifiedSkills && rev.verifiedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {rev.verifiedSkills.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white text-[#722F45] border border-[#D5A3AE]/50">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Student Reflection Journal Log */}
      {(() => {
        const reflections = storageService.getStudentReflections();
        if (reflections.length === 0) return null;
        return (
          <div className="bg-[#FFF9F2] rounded-2xl border border-[#D5A3AE]/60 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#D5A3AE]/40 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C4057]">
                  Daily Study Journal
                </span>
                <h3 className="text-lg font-bold text-[#722F45] font-serif-accent">
                  Your Reflection Journal
                </h3>
              </div>
              <span className="text-xs text-[#5A454C]">{reflections.length} Entries Logged</span>
            </div>

            <div className="space-y-3">
              {reflections.map((rf) => (
                <div key={rf.id} className="p-4 rounded-xl bg-[#F9ECE0] border border-[#D5A3AE]/50 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#8C4057] font-bold text-[11px]">
                    <span>{rf.skillContext}</span>
                    <span>{rf.date}</span>
                  </div>
                  <p className="font-semibold text-[#722F45]">{rf.prompt}</p>
                  <p className="text-[#2D2226] bg-white p-3 rounded-lg border border-[#D5A3AE]/40 leading-relaxed font-medium">
                    {rf.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

    </div>
  );
};
