import React from 'react';
import { Quote, Award, Sparkles, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { SchoolInfo } from '../../types';

interface PrincipalMessageSectionProps {
  schoolInfo: SchoolInfo;
  onNavigate: (sectionId: string) => void;
}

export const PrincipalMessageSection: React.FC<PrincipalMessageSectionProps> = ({
  schoolInfo,
  onNavigate
}) => {
  return (
    <section id="principal-message" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background decorative shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Principal Card */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-2xl shadow-amber-500/20 bg-slate-800">
                <img
                  src={schoolInfo.principalPhotoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                  alt={`Principal ${schoolInfo.principalName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                <Award className="w-3.5 h-3.5 fill-current" />
                <span>Principal</span>
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <h3 className="text-2xl font-bold text-white font-display">
                {schoolInfo.principalName}
              </h3>
              <p className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                Principal & Head of School
              </p>
              <p className="text-slate-400 text-xs">
                Little Star School of Learning • Batpora
              </p>
            </div>

            <div className="mt-6 flex flex-col w-full max-w-xs space-y-2 text-xs text-slate-300">
              <a
                href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 p-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{schoolInfo.phone}</span>
              </a>
              <div className="flex items-center justify-center space-x-2 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span className="truncate">{schoolInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Official Message Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-400/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Leadership & Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              Principal’s Message
            </h2>

            {/* Quote Container */}
            <div className="relative bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
              <Quote className="w-10 h-10 text-amber-400/30 absolute -top-4 -left-2" />
              
              <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-serif-reading">
                <p className="italic">
                  "{schoolInfo.principalMessage}"
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white font-display text-base">
                    {schoolInfo.principalName}
                  </h4>
                  <p className="text-xs text-amber-400">
                    Principal, Little Star School of Learning
                  </p>
                </div>

                <button
                  id="principal-cta-admissions"
                  onClick={() => onNavigate('admissions')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow transition-colors flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Explore Admissions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
