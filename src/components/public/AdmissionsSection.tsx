import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  FileCheck,
  HelpCircle,
  ArrowRight,
  Phone,
  ShieldAlert
} from 'lucide-react';
import { AdmissionInfo, SchoolInfo } from '../../types';

interface AdmissionsSectionProps {
  admissionsInfo: AdmissionInfo;
  schoolInfo: SchoolInfo;
  onNavigate: (sectionId: string) => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  admissionsInfo,
  schoolInfo,
  onNavigate
}) => {
  return (
    <section id="admissions" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>Admissions {admissionsInfo.academicSession}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            {admissionsInfo.announcement}
          </p>
        </div>

        {/* 4-Step Procedure Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 font-display uppercase tracking-wide">
              Step-by-Step Admission Procedure
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Simple, transparent, and student-friendly process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionsInfo.procedureSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-base mb-4 shadow">
                    0{step.step}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2 font-display">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600">
                  <span>Phase 0{step.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility & Required Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Eligibility Criteria */}
          <div className="lg:col-span-6 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display">Eligibility Criteria</h3>
                <p className="text-xs text-slate-500">Grade & Age Guidelines</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {admissionsInfo.eligibilityCriteria.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="lg:col-span-6 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display">Required Documents</h3>
                <p className="text-xs text-slate-500">Checklist for Verification</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {admissionsInfo.requiredDocuments.map((docItem, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700">{docItem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Dates & Enquiry Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Admission Timeline & Key Schedules</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Ready to begin your child’s journey at Little Star?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {admissionsInfo.contactNote}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {admissionsInfo.importantDates.map((d, idx) => (
                <div key={idx} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs">
                  <span className="text-amber-300 font-semibold block">{d.event}</span>
                  <span className="text-slate-300">{d.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-4 w-full">
            <button
              id="admissions-submit-enquiry-btn"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Submit Admission Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              id="admissions-direct-call"
              href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline: {schoolInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
