import React from 'react';
import { Star, Phone, MapPin, Mail, Clock, Shield, Award, ChevronRight } from 'lucide-react';
import { SchoolInfo } from '../../types';

interface FooterProps {
  schoolInfo: SchoolInfo;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ schoolInfo, onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
                <Star className="w-6 h-6 fill-slate-950" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide leading-tight">
                  {schoolInfo.name}
                </h3>
                <p className="text-xs text-amber-400 font-medium">Batpora, Jammu & Kashmir</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Dedicated to academic brilliance, moral character, and holistic child development in Batpora, J&K.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Principal: <strong className="text-slate-200">{schoolInfo.principalName}</strong></span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Quick Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { id: 'about', label: 'About Our School' },
                { id: 'academics', label: 'Academic Programs' },
                { id: 'admissions', label: 'Admissions 2026–27' },
                { id: 'resources', label: 'Student Downloads & Syllabi' },
                { id: 'notices', label: 'Official Notice Board' },
                { id: 'events', label: 'Events & Calendar' },
                { id: 'gallery', label: 'School Photo Gallery' },
                { id: 'contact', label: 'Contact & Campus Visit' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    id={`footer-link-${item.id}`}
                    onClick={() => onNavigate(item.id)}
                    className="flex items-center space-x-1.5 text-slate-400 hover:text-amber-300 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Downloads & Timings */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Resources & Timings</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200 block text-xs">School Hours:</strong>
                  <span>{schoolInfo.workingHours}</span>
                </div>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
                <p className="text-amber-300 font-semibold mb-1">Student Examination Timetables</p>
                <p className="text-slate-400">
                  Date sheets and syllabi for all grades are available on the digital student desk.
                </p>
                <button
                  id="footer-resources-cta"
                  onClick={() => onNavigate('resources')}
                  className="mt-2 text-xs font-bold text-white hover:text-amber-300 underline"
                >
                  Access Student Portal →
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>School Campus</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>{schoolInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
                  className="text-slate-200 hover:text-amber-300 font-medium"
                >
                  {schoolInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a
                  href={`mailto:${schoolInfo.email}`}
                  className="text-slate-300 hover:text-amber-300 truncate"
                >
                  {schoolInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {schoolInfo.name}, Batpora, Jammu & Kashmir. All rights reserved.</p>
          
          <div className="flex items-center space-x-3 text-slate-500 text-xs">
            <span>CBSE / JKBOSE Curriculum Aligned</span>
            <span>•</span>
            <span>Batpora, J&K</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
