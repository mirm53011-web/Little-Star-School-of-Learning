import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  School,
  Award,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import { SchoolInfo, ALL_CLASSES } from '../../types';
import { submitEnquiry } from '../../lib/schoolDataService';
import { HorizontalProgressBar } from '../common/HorizontalProgressBar';

interface ContactPageProps {
  schoolInfo: SchoolInfo;
  onNavigate?: (pageId: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ schoolInfo }) => {
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
      setErrorMessage('Please fill in the required fields (Parent Name, Phone, and Message).');
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
      setErrorMessage('There was a temporary issue submitting your enquiry. Please call us directly at +91 96975 67081.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Hero Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              Contact Us & Campus Location
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Have questions about admissions, student academics, transport facilities, or scheduling a campus visit? We are here to help you.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Campus Details & Office Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Official Details Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 font-display">
                        {schoolInfo.name}
                      </h2>
                      <p className="text-xs text-amber-700 font-semibold">Batpora, Jammu & Kashmir</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Providing high standard education with a committed faculty in Batpora, J&K.
                  </p>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-4">
                  {/* Address */}
                  <div className="flex items-start space-x-3 text-slate-700 text-sm">
                    <MapPin className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-900 uppercase">Campus Location:</strong>
                      <span>{schoolInfo.addressDetails || schoolInfo.location || 'Batpora, Jammu and Kashmir'}</span>
                    </div>
                  </div>

                  {/* Principal Info */}
                  <div className="flex items-start space-x-3 text-slate-700 text-sm">
                    <Award className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-900 uppercase">Principal & Head:</strong>
                      <span>{schoolInfo.principalName}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3 text-slate-700 text-sm">
                    <Phone className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-900 uppercase">Direct Helpline:</strong>
                      <a href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`} className="text-amber-700 hover:underline font-bold">
                        {schoolInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3 text-slate-700 text-sm">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-900 uppercase">Official Email:</strong>
                      <a href={`mailto:${schoolInfo.email}`} className="text-slate-700 hover:underline">
                        {schoolInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Timings */}
                  <div className="flex items-start space-x-3 text-slate-700 text-sm">
                    <Clock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-900 uppercase">School / Visiting Hours:</strong>
                      <span>{schoolInfo.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed Card */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm p-4 space-y-3">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-bold uppercase text-slate-700 flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>Campus Location Map</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Batpora, J&K</span>
                </div>
                <div className="h-56 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                  <iframe
                    title="Little Star School Batpora Location"
                    src="https://maps.google.com/maps?q=Batpora,%20Jammu%20and%20Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Admission Enquiry & Feedback Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Direct Communication Desk</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  Send Admission Enquiry or Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Our administration will get in touch with you at the earliest.
                </p>
              </div>

              {loading && <HorizontalProgressBar label="Submitting Message to School..." />}

              {success ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 font-display">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-sm mx-auto">
                    Thank you for reaching out. We have logged your request and our administrative team will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-xs font-bold text-emerald-900 bg-emerald-200 hover:bg-emerald-300 px-4 py-2 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="bot_trap_field"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMessage && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Parent / Guardian Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mr. Farooq Ahmad"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Student Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aayan Ahmad"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Class Seeking <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={classGrade}
                        onChange={(e) => setClassGrade(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                      >
                        {ALL_CLASSES.map((cls) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 96975 67081"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. parent@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message / Enquiry Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your questions or notes regarding admission, campus visit, or syllabus..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold py-3.5 rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting...' : 'Submit Official Enquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
