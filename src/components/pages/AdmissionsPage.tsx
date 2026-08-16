import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  FileCheck,
  HelpCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Send,
  AlertCircle
} from 'lucide-react';
import { AdmissionInfo, SchoolInfo, ALL_CLASSES } from '../../types';
import { submitEnquiry } from '../../lib/schoolDataService';
import { HorizontalProgressBar } from '../common/HorizontalProgressBar';

interface AdmissionsPageProps {
  admissionsInfo: AdmissionInfo;
  schoolInfo: SchoolInfo;
  onNavigate: (pageId: string) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  admissionsInfo,
  schoolInfo,
  onNavigate
}) => {
  // Form State
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('Grade I');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setSuccess(true);
      return;
    }

    if (!parentName.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('Please fill in required fields: Parent Name, Phone, and Notes.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await submitEnquiry({
        parentName: parentName.trim(),
        studentName: studentName.trim() || 'Prospective Student',
        classGrade,
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim()
      });

      setSuccess(true);
      setParentName('');
      setStudentName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      console.error('Error submitting enquiry:', err);
      setErrorMessage('Unable to submit enquiry right now. Please call our admission desk directly at +91 96975 67081.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Hero Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Session {admissionsInfo.academicSession}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              Admissions Open for 2026–2027
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {admissionsInfo.announcement}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Step-by-Step Procedure Grid */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              4-Step Transparent Admission Procedure
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Our streamlined enrollment process designed for parent convenience and student comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionsInfo.procedureSteps.map((step) => (
              <div
                key={step.step}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-extrabold text-base mb-4 shadow">
                    0{step.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 text-xs font-bold text-amber-600 uppercase">
                  Phase 0{step.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Eligibility Criteria & Required Documents Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Eligibility Criteria */}
            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-slate-900">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display">Eligibility Criteria</h3>
                  <p className="text-xs text-slate-500">Grade & Age Requirements</p>
                </div>
              </div>

              <div className="space-y-3">
                {admissionsInfo.eligibilityCriteria.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-slate-900">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display">Required Documents</h3>
                  <p className="text-xs text-slate-500">Submission Checklist</p>
                </div>
              </div>

              <div className="space-y-3">
                {admissionsInfo.requiredDocuments.map((docItem, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {docItem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Admission Timeline / Key Dates */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Admission Timeline & Key Dates
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Important milestones for the {admissionsInfo.academicSession} academic session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionsInfo.importantDates.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-800 mb-2">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="block text-xs font-bold uppercase tracking-wider text-amber-700">{item.event}</span>
                <strong className="block text-base font-extrabold text-slate-900">{item.date}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Online Admission Enquiry & Application Form */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Apply Online</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Submit Admission Enquiry
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Fill out the details below and our Admissions Desk will contact you within 24 hours.
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl relative">
            {loading && <HorizontalProgressBar label="Submitting Admission Application..." />}

            {success ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for your interest in Little Star School of Learning. Our administration will contact you promptly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="user_token_field"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {errorMessage && (
                  <div className="p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Parent / Guardian Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Farooq Ahmad"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aayan Ahmad"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Seeking Admission In <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={classGrade}
                      onChange={(e) => setClassGrade(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      {ALL_CLASSES.map((cls) => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Contact Phone <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 96975 67081"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Questions or Specific Requirements <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide any prior schooling details, bus transport requirement, or queries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Application...' : 'Submit Admission Application'}</span>
                </button>
              </form>
            )}

            {/* Helpline bar inside form card */}
            <div className="mt-6 pt-6 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Admission Helpline: <strong className="text-white">{schoolInfo.phone}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Office Hours: <strong className="text-white">{schoolInfo.workingHours}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
