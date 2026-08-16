import React, { useState } from 'react';
import {
  Settings,
  Building,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Check
} from 'lucide-react';
import { SchoolInfo } from '../../types';
import { updateSchoolInfo } from '../../lib/schoolDataService';
import { HorizontalProgressBar, ActionButtonProgress } from '../common/HorizontalProgressBar';

interface AdminSettingsProps {
  schoolInfo: SchoolInfo;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ schoolInfo }) => {
  // School General Contact State
  const [name, setName] = useState(schoolInfo.name);
  const [location, setLocation] = useState(schoolInfo.location);
  const [addressDetails, setAddressDetails] = useState(schoolInfo.addressDetails);
  const [phone, setPhone] = useState(schoolInfo.phone);
  const [altPhone, setAltPhone] = useState(schoolInfo.altPhone || '');
  const [email, setEmail] = useState(schoolInfo.email);
  const [workingHours, setWorkingHours] = useState(schoolInfo.workingHours);
  const [affiliation, setAffiliation] = useState(schoolInfo.affiliation);
  const [motto, setMotto] = useState(schoolInfo.motto);
  const [establishedYear, setEstablishedYear] = useState(schoolInfo.establishedYear);
  const [mapEmbedQuery, setMapEmbedQuery] = useState(schoolInfo.mapEmbedQuery);

  const [savingInfo, setSavingInfo] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);

  // Sync state if schoolInfo changes from live Firestore snapshot
  React.useEffect(() => {
    if (!savingInfo) {
      setName(schoolInfo.name);
      setLocation(schoolInfo.location);
      setAddressDetails(schoolInfo.addressDetails);
      setPhone(schoolInfo.phone);
      setAltPhone(schoolInfo.altPhone || '');
      setEmail(schoolInfo.email);
      setWorkingHours(schoolInfo.workingHours);
      setAffiliation(schoolInfo.affiliation);
      setMotto(schoolInfo.motto);
      setEstablishedYear(schoolInfo.establishedYear);
      setMapEmbedQuery(schoolInfo.mapEmbedQuery);
    }
  }, [schoolInfo, savingInfo]);

  const handleSaveSchoolInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingInfo(true);
    setInfoSuccess(false);
    setInfoError(null);

    try {
      await updateSchoolInfo({
        name,
        location,
        addressDetails,
        phone,
        altPhone,
        email,
        workingHours,
        affiliation,
        motto,
        establishedYear,
        mapEmbedQuery
      });
      setInfoSuccess(true);
      setTimeout(() => setInfoSuccess(false), 3000);
    } catch (err: any) {
      setInfoError(err?.message || 'Failed to update school settings.');
    } finally {
      setSavingInfo(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Institution Configuration</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2 font-display">
            <Settings className="w-6 h-6 text-amber-600" />
            <span>School Profile & Contact Coordinates</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage Little Star School Batpora official contact coordinates, affiliation details, and location.
          </p>
        </div>

        {/* Real-time Status Badge */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 self-start sm:self-auto shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-Time Active</span>
        </div>
      </div>

      {/* Main Settings Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 font-display">
            <Building className="w-4 h-4 text-amber-600" />
            <span>School Profile & Public Contact Info</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            These details appear dynamically across the website header, footer, contact section, and circulars.
          </p>
        </div>

        {infoSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">School profile saved and updated in real-time!</span>
          </div>
        )}

        {infoError && (
          <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-2xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{infoError}</span>
          </div>
        )}

        <form onSubmit={handleSaveSchoolInfo} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                School Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location / Region
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Batpora, Shopian, Jammu & Kashmir, India"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Official Address
            </label>
            <textarea
              rows={2}
              required
              value={addressDetails}
              onChange={(e) => setAddressDetails(e.target.value)}
              placeholder="Batpora, Shopian Region, Jammu & Kashmir, India"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 96975 67081"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alternate Phone / WhatsApp
              </label>
              <input
                type="text"
                value={altPhone}
                onChange={(e) => setAltPhone(e.target.value)}
                placeholder="+91 96975 67081"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Working Hours / Office Timing
              </label>
              <input
                type="text"
                required
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="Mon – Sat: 8:30 AM – 3:30 PM"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Established Year
              </label>
              <input
                type="text"
                value={establishedYear}
                onChange={(e) => setEstablishedYear(e.target.value)}
                placeholder="2012"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Board Affiliation
              </label>
              <input
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder="State Board of School Education (JKBOSE) / Recognized"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              School Motto / Tagline
            </label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              placeholder="Nurturing Intellect, Character & Excellence"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Google Maps Embed Location Query
            </label>
            <input
              type="text"
              value={mapEmbedQuery}
              onChange={(e) => setMapEmbedQuery(e.target.value)}
              placeholder="Batpora, Shopian, Jammu and Kashmir, India"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 font-medium transition-colors"
            />
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              id="save-school-profile-btn"
              type="submit"
              disabled={savingInfo}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-8 rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-amber-500/20"
            >
              {savingInfo ? (
                <ActionButtonProgress label="Saving Profile..." />
              ) : infoSuccess ? (
                <ActionButtonProgress isCompleted completedLabel="Saved ✓" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save School Profile</span>
                </>
              )}
            </button>

            {infoSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Updated in real-time!</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
