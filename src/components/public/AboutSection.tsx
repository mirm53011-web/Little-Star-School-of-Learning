import React from 'react';
import { Target, Compass, BookOpen, Heart, Shield, Users, Award, Sparkles } from 'lucide-react';
import { SchoolInfo } from '../../types';

interface AboutSectionProps {
  schoolInfo: SchoolInfo;
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ schoolInfo, onNavigate }) => {
  return (
    <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300/60 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Discover Our Institution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            About Little Star School of Learning
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Nurturing young minds in Batpora, Jammu & Kashmir with a blend of academic rigor, character development, and modern pedagogical excellence.
          </p>
        </div>

        {/* Main Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Dedicated to Educational Excellence in Batpora
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {schoolInfo.aboutText}
              </p>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Location: {schoolInfo.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Principal: {schoolInfo.principalName}</span>
                </div>
              </div>
            </div>

            {/* Philosophy Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center space-x-3 text-amber-400">
                <BookOpen className="w-6 h-6" />
                <h4 className="text-lg font-bold font-display uppercase tracking-wide">
                  Our Educational Philosophy
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {schoolInfo.philosophy}
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 rounded-2xl border border-amber-200/70 shadow-sm relative overflow-hidden group hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-display mb-2">Our Vision</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {schoolInfo.vision}
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-blue-200/70 shadow-sm relative overflow-hidden group hover:border-blue-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-display mb-2">Our Mission</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {schoolInfo.mission}
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BookOpen,
              title: 'Academic Discipline',
              desc: 'Structured curricula aligned with state standards and interactive learning techniques.'
            },
            {
              icon: Heart,
              title: 'Moral & Ethical Values',
              desc: 'Fostering compassion, respect for elders, cultural appreciation, and integrity.'
            },
            {
              icon: Users,
              title: 'Individual Attention',
              desc: 'Dedicated educators providing focused support for every student’s learning curve.'
            },
            {
              icon: Award,
              title: 'Holistic Growth',
              desc: 'Integrating arts, sports, science exhibitions, and leadership activities.'
            }
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <pillar.icon className="w-8 h-8 text-amber-600 mb-4" />
              <h5 className="font-bold text-slate-900 mb-1.5 text-base">{pillar.title}</h5>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
