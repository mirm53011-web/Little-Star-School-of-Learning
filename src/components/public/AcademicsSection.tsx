import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Compass,
  CheckCircle,
  FileText,
  Clock,
  Layers
} from 'lucide-react';
import { AcademicLevel } from '../../types';

interface AcademicsSectionProps {
  levels: AcademicLevel[];
  onNavigate: (sectionId: string) => void;
}

const iconMap: Record<string, any> = {
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Compass,
  Layers
};

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ levels, onNavigate }) => {
  const activeLevels = levels.filter(l => l.enabled);
  const [selectedLevelId, setSelectedLevelId] = useState<string>(
    activeLevels[0]?.id || 'acad-1'
  );

  const currentLevel = activeLevels.find(l => l.id === selectedLevelId) || activeLevels[0];

  return (
    <section id="academics" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
            <span>Academic Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            Curriculum & Academic Wings
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            From playful kindergarten discovery to rigorous secondary and higher secondary preparation, we provide a continuous pathway of structured growth.
          </p>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {activeLevels.map((lvl) => {
            const isSelected = lvl.id === currentLevel?.id;
            const IconComponent = iconMap[lvl.iconName] || BookOpen;

            return (
              <button
                key={lvl.id}
                id={`acad-tab-${lvl.id}`}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-amber-400 shadow-md shadow-slate-900/20 scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{lvl.title}</span>
              </button>
            );
          })}
        </div>

        {/* Level Detailed Card */}
        {currentLevel && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm transition-all animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Overview */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-bold px-3 py-1 rounded-full">
                    {currentLevel.grades}
                  </span>
                  <span className="flex items-center space-x-1 text-slate-500 text-xs font-semibold bg-white border border-slate-200 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentLevel.ageGroup}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                  {currentLevel.title}
                </h3>
                <h4 className="text-sm sm:text-base font-semibold text-amber-700">
                  {currentLevel.subtitle}
                </h4>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {currentLevel.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    id="acad-download-syllabus-cta"
                    onClick={() => onNavigate('resources')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-colors flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Class Syllabus</span>
                  </button>
                  <button
                    id="acad-enquire-cta"
                    onClick={() => onNavigate('admissions')}
                    className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Admission Details
                  </button>
                </div>
              </div>

              {/* Right Key Highlights */}
              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Pedagogical Highlights & Focus Areas</span>
                </h4>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentLevel.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Fast Info Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base sm:text-lg font-bold font-display text-amber-300">
              Need syllabus or exam timetables for your child?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Visit our dedicated Student Resources desk for class-wise downloadable documents.
            </p>
          </div>
          <button
            id="academics-student-desk-btn"
            onClick={() => onNavigate('resources')}
            className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-colors"
          >
            Go to Student Resources →
          </button>
        </div>
      </div>
    </section>
  );
};
