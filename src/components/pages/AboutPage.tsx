import React from 'react';
import {
  Sparkles,
  Target,
  Compass,
  BookOpen,
  Award,
  Shield,
  Users,
  Heart,
  Quote,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';
import { SchoolInfo } from '../../types';

interface AboutPageProps {
  schoolInfo: SchoolInfo;
  onNavigate: (pageId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ schoolInfo, onNavigate }) => {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Hero Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>About Our Institution</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              Nurturing Excellence in Batpora Since 2012
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Discover the history, educational philosophy, visionary leadership, and commitment that make Little Star School of Learning a beacon of educational excellence.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Narrative & Campus Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300/80 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
                <span>Our Heritage & Journey</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
                Dedicated to Educational Transformation in Jammu & Kashmir
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                {schoolInfo.aboutText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold uppercase text-amber-600">Location</span>
                  <p className="text-sm font-semibold text-slate-900">{schoolInfo.location}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold uppercase text-blue-600">Principal</span>
                  <p className="text-sm font-semibold text-slate-900">{schoolInfo.principalName}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl border border-slate-700 space-y-5">
                <div className="flex items-center space-x-3 text-amber-400">
                  <BookOpen className="w-6 h-6" />
                  <h3 className="text-lg font-bold font-display uppercase tracking-wide">
                    Educational Philosophy
                  </h3>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {schoolInfo.philosophy}
                </p>
                <div className="pt-4 border-t border-slate-700/80">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Student-Centric Curriculum</span>
                    <span className="text-amber-400 font-semibold">Values & Ethics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Vision & Mission
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              The foundational ideals that guide every lesson, activity, and interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display mb-3">Our Vision</h3>
                <p className="text-slate-700 text-base leading-relaxed">
                  {schoolInfo.vision}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-700">
                Guiding Principle for Tomorrow’s Leaders
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-8 rounded-3xl border border-blue-200 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display mb-3">Our Mission</h3>
                <p className="text-slate-700 text-base leading-relaxed">
                  {schoolInfo.mission}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-700">
                Action Plan for Daily Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars of Learning */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Pillars of Holistic Development
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Academic Discipline',
                desc: 'Structured curricula aligned with rigorous standards and modern conceptual understanding.'
              },
              {
                icon: Heart,
                title: 'Moral & Ethical Values',
                desc: 'Instilling kindness, integrity, empathy, and social responsibility in every child.'
              },
              {
                icon: Users,
                title: 'Individual Attention',
                desc: 'Small batch sizes allowing our dedicated teachers to mentor every student’s potential.'
              },
              {
                icon: Award,
                title: 'Co-Curricular Growth',
                desc: 'Sports, creative arts, debates, and leadership opportunities for well-rounded development.'
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base font-display mb-2">{pillar.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Principal & Leadership Section (Full Message) */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Principal Photo & Details Card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-slate-800">
                  <img
                    src={schoolInfo.principalPhotoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                    alt={schoolInfo.principalName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-2 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-extrabold shadow-lg flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 fill-current" />
                  <span>Principal</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mt-6">
                {schoolInfo.principalName}
              </h3>
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mt-1">
                Principal & Head of School
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Little Star School of Learning • Batpora
              </p>

              <div className="mt-6 flex flex-col w-full max-w-xs space-y-2 text-xs">
                <a
                  href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 p-2.5 rounded-xl border border-slate-700 text-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{schoolInfo.phone}</span>
                </a>
                <div className="flex items-center justify-center space-x-2 bg-slate-800/70 p-2.5 rounded-xl border border-slate-700 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="truncate">{schoolInfo.email}</span>
                </div>
              </div>
            </div>

            {/* Principal's Full Message Narrative */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                <span>Leadership Message</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                Principal's Official Address
              </h2>

              <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-4 font-serif">
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic">
                  "{schoolInfo.principalMessage}"
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  id="about-admissions-btn"
                  onClick={() => onNavigate('admissions')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Explore Admissions 2026–27</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="about-contact-btn"
                  onClick={() => onNavigate('contact')}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-sm border border-slate-700 transition-all flex items-center space-x-2"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Visit Campus</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
