import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  Layers,
  Compass,
  FileText,
  ArrowRight,
  Brain,
  Palette,
  Lightbulb
} from 'lucide-react';
import { AcademicLevel } from '../../types';

interface AcademicsPageProps {
  levels: AcademicLevel[];
  onNavigate: (pageId: string) => void;
}

const iconMap: Record<string, any> = {
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Compass,
  Layers
};

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ levels, onNavigate }) => {
  const activeLevels = levels.filter(l => l.enabled);
  const [selectedLevelId, setSelectedLevelId] = useState<string>(
    activeLevels[0]?.id || 'acad-1'
  );

  const currentLevel = activeLevels.find(l => l.id === selectedLevelId) || activeLevels[0];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Header Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/40 text-blue-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span>Academic Programs & Curriculum</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              Comprehensive Academic Wings
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              From early childhood discovery to advanced secondary and senior secondary disciplines, Little Star School of Learning empowers students with conceptual mastery and critical thinking.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Academic Wings Navigation Tabs */}
      <section className="py-12 bg-white border-b border-slate-200 sticky top-[60px] sm:top-[70px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 py-1">
            {activeLevels.map((lvl) => {
              const isSelected = lvl.id === currentLevel?.id;
              const IconComponent = iconMap[lvl.iconName] || BookOpen;

              return (
                <button
                  key={lvl.id}
                  id={`acad-page-tab-${lvl.id}`}
                  onClick={() => setSelectedLevelId(lvl.id)}
                  className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-amber-400 shadow-md scale-[1.02]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{lvl.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Detailed Academic Wing Focus View */}
      {currentLevel && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Wing Overview */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold px-3.5 py-1 rounded-full">
                      {currentLevel.grades}
                    </span>
                    <span className="flex items-center space-x-1 text-slate-600 text-xs font-semibold bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{currentLevel.ageGroup}</span>
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                    {currentLevel.title}
                  </h2>
                  <h3 className="text-base sm:text-lg font-semibold text-amber-700">
                    {currentLevel.subtitle}
                  </h3>

                  <p className="text-slate-700 text-base leading-relaxed">
                    {currentLevel.description}
                  </p>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Key Pedagogical Highlights</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {currentLevel.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Curriculum & Subjects */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-md space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <h4 className="text-lg font-bold font-display uppercase tracking-wide text-amber-400">
                        Curricular Subjects & Offerings
                      </h4>
                      <span className="text-xs text-slate-400">Core & Applied</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {currentLevel.highlights.map((sub, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl transition-colors"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-800 space-y-3">
                      <h5 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                        Learning Outcomes & Competencies
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Students cultivate structured problem-solving, articulate expression, collaborative inquiry, and academic discipline tailored to standard Board assessments.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        id="acad-download-syllabus-cta"
                        onClick={() => onNavigate('resources')}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 shadow"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Download Class Syllabus & Resources</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Pedagogical Highlights & Teaching Methodology */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Our Teaching Pedagogy & Methodology
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Transforming conventional textbook learning into interactive comprehension and practical application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Concept-First Learning</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Emphasis on core understanding rather than rote memorization. Interactive smart boards and visual models clarify complex concepts.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Continuous Assessment</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Regular unit tests, practice worksheets, and personalized feedback ensure no student falls behind in any subject.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Holistic Integration</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Seamless blending of sciences, languages, mathematics, computer applications, and moral ethics across all tiers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              id="acad-explore-admissions-bottom"
              onClick={() => onNavigate('admissions')}
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all inline-flex items-center space-x-2"
            >
              <span>Enroll Your Child in Our Academic Program</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
