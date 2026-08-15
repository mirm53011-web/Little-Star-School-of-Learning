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
  Loader2
} from 'lucide-react';
import { SchoolInfo, ALL_CLASSES } from '../../types';
import { submitEnquiry } from '../../lib/schoolDataService';

interface ContactSectionProps {
  schoolInfo: SchoolInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ schoolInfo }) => {
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('Grade I');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Spam protection / honeypot
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected, pretend success
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
      // Reset form
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
    <section id="contact" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <School className="w-4 h-4 text-amber-700" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            Contact & Admission Enquiry
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            We welcome visits, queries, and student applications at Little Star School of Learning in Batpora, Jammu & Kashmir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* School Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  {schoolInfo.name}
                </h3>
                <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mt-0.5">
                  Batpora, Jammu & Kashmir, India
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">Campus Location</strong>
                    <span className="text-slate-600 text-xs sm:text-sm">{schoolInfo.location}</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{schoolInfo.addressDetails}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">Principal / Head of Institution</strong>
                    <span className="text-slate-800 font-medium text-xs sm:text-sm">{schoolInfo.principalName}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">Direct Phone & Helpline</strong>
                    <a
                      href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
                      className="text-amber-700 hover:text-amber-800 font-bold text-sm block"
                    >
                      {schoolInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">Office & Working Hours</strong>
                    <span className="text-slate-600 text-xs">{schoolInfo.workingHours}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-xs font-bold uppercase tracking-wider">Official Email</strong>
                    <span className="text-slate-600 text-xs break-all">{schoolInfo.email}</span>
                  </div>
                </div>
              </div>

              {/* Direct Call Button */}
              <div className="pt-2">
                <a
                  id="contact-call-action-btn"
                  href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call Us: {schoolInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Interactive Location Placeholder */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Location Map</span>
                </div>
                <span className="text-[11px] text-slate-400">Batpora, J&K</span>
              </div>
              <div className="w-full h-40 bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700 flex items-center justify-center p-4 text-center">
                <div className="space-y-2 z-10">
                  <p className="text-xs font-semibold text-slate-200">
                    Little Star School of Learning
                  </p>
                  <p className="text-[11px] text-amber-300">
                    Batpora, Jammu & Kashmir, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=Batpora+Jammu+and+Kashmir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 transition-colors"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Student / Parent Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-md space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Student & Parent Admission Enquiry Form
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill out the form below. Our school admission desk will get in touch with you promptly.
                </p>
              </div>

              {success ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900 font-display">
                    Enquiry Submitted Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in Little Star School of Learning. Our admissions coordinator will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot for spam */}
                  <input
                    type="text"
                    name="website_honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-parent-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Parent / Guardian Name *
                      </label>
                      <input
                        id="enquiry-parent-name"
                        type="text"
                        required
                        placeholder="e.g. Tariq Ahmad"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="enquiry-student-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Student Name
                      </label>
                      <input
                        id="enquiry-student-name"
                        type="text"
                        placeholder="e.g. Zayan Tariq"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-class-grade" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Class Applying For
                      </label>
                      <select
                        id="enquiry-class-grade"
                        value={classGrade}
                        onChange={(e) => setClassGrade(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      >
                        {ALL_CLASSES.filter(c => c !== 'All Classes').map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="enquiry-phone-number" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        id="enquiry-phone-number"
                        type="tel"
                        required
                        placeholder="e.g. +91 9XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enquiry-email-address" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      id="enquiry-email-address"
                      type="email"
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="enquiry-message-content" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Message / Enquiry Details *
                    </label>
                    <textarea
                      id="enquiry-message-content"
                      rows={4}
                      required
                      placeholder="Please mention any questions regarding admission requirements, transport, fee structure, or previous academic background..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    id="submit-enquiry-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg shadow-slate-900/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Send Admission Enquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    Your details are securely received by Little Star School of Learning staff.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
