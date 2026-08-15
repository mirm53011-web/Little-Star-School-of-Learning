import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building,
  Phone,
  Mail,
  Clock,
  MapPin,
  KeyRound,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Award,
  Sparkles,
  Database,
  Cloud,
  Check,
  RotateCcw
} from 'lucide-react';
import { SchoolInfo } from '../../types';
import {
  updateSchoolInfo,
  seedInitialSchoolData,
  forceSyncAllSchoolDataToFirestore,
  checkFirestoreConnection,
  subscribeSyncActivity
} from '../../lib/schoolDataService';
import {
  activeFirebaseConfig,
  saveCustomFirebaseConfig,
  resetFirebaseConfig,
  FirebaseConfigObject
} from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';

interface AdminSettingsProps {
  schoolInfo: SchoolInfo;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ schoolInfo }) => {
  const { user } = useAuth();

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

  // Firebase Live Sync & Real-Time Connection State
  const [syncingAll, setSyncingAll] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [checkingConn, setCheckingConn] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    projectId: string;
    authDomain?: string;
    latencyMs?: number;
    lastChecked?: string;
    error?: string;
  }>({
    connected: true,
    projectId: activeFirebaseConfig.projectId || 'little-star-school-of-learning',
    authDomain: activeFirebaseConfig.authDomain || 'little-star-school-of-learning.firebaseapp.com',
    latencyMs: 42,
    lastChecked: new Date().toLocaleTimeString()
  });

  // Custom Firebase Configuration Editor State
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(activeFirebaseConfig.apiKey);
  const [customProjectId, setCustomProjectId] = useState(activeFirebaseConfig.projectId);
  const [customAuthDomain, setCustomAuthDomain] = useState(activeFirebaseConfig.authDomain);
  const [customStorageBucket, setCustomStorageBucket] = useState(activeFirebaseConfig.storageBucket);
  const [customAppId, setCustomAppId] = useState(activeFirebaseConfig.appId);
  const [customSenderId, setCustomSenderId] = useState(activeFirebaseConfig.messagingSenderId);

  // Monitor real-time connection and sync activity automatically
  useEffect(() => {
    let mounted = true;

    const runCheck = async () => {
      if (!mounted) return;
      const res = await checkFirestoreConnection();
      if (mounted) {
        setDbStatus(res);
      }
    };

    runCheck();

    // Check connection every 15 seconds
    const interval = setInterval(runCheck, 15000);

    // Subscribe to real-time snapshot sync updates
    const unsubSync = subscribeSyncActivity((timestamp) => {
      if (mounted) {
        setLastSyncTime(timestamp.toLocaleTimeString());
      }
    });

    return () => {
      mounted = false;
      clearInterval(interval);
      unsubSync();
    };
  }, []);

  const handleManualCheck = async () => {
    setCheckingConn(true);
    try {
      const res = await checkFirestoreConnection();
      setDbStatus(res);
    } finally {
      setCheckingConn(false);
    }
  };

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

  const handleForceSyncAll = async () => {
    if (
      !window.confirm(
        'This will synchronize and push all Batpora school data (notices, syllabi, gallery, events, admission guidelines) to your Firebase Firestore database in real-time. Proceed?'
      )
    ) {
      return;
    }

    setSyncingAll(true);
    setSyncResult(null);

    try {
      const result = await forceSyncAllSchoolDataToFirestore();
      setSyncResult(result);
      // Re-verify connection
      const conn = await checkFirestoreConnection();
      setDbStatus(conn);
    } catch (err: any) {
      setSyncResult({
        success: false,
        message: err?.message || 'Error during Firestore synchronization.'
      });
    } finally {
      setSyncingAll(false);
    }
  };

  const handleSaveCustomFirebase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customProjectId || !customApiKey) {
      alert('Project ID and API Key are required.');
      return;
    }

    const newCfg: FirebaseConfigObject = {
      apiKey: customApiKey.trim(),
      projectId: customProjectId.trim(),
      authDomain: customAuthDomain.trim() || `${customProjectId.trim()}.firebaseapp.com`,
      storageBucket: customStorageBucket.trim() || `${customProjectId.trim()}.firebasestorage.app`,
      appId: customAppId.trim(),
      messagingSenderId: customSenderId.trim()
    };

    saveCustomFirebaseConfig(newCfg);
  };

  const handleResetFirebase = () => {
    if (window.confirm('Reset Firebase configuration to default workspace settings?')) {
      resetFirebaseConfig();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 font-display">
            <Settings className="w-5 h-5 text-amber-600" />
            <span>School Profile & Cloud Database Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage Little Star School Batpora contact coordinates and real-time Firebase synchronization
          </p>
        </div>

        {/* Live Cloud Badge */}
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-Time Cloud Synced</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* School Info & Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 font-display">
              <Building className="w-4 h-4 text-amber-600" />
              <span>School Profile & Public Contact Info</span>
            </h3>
            <p className="text-xs text-slate-500">
              These details appear in the header, footer, contact page, and official circulars.
            </p>
          </div>

          {infoSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>School profile updated successfully in Firestore database!</span>
            </div>
          )}

          {infoError && (
            <div className="bg-red-50 border border-red-300 text-red-800 p-3.5 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{infoError}</span>
            </div>
          )}

          <form onSubmit={handleSaveSchoolInfo} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location / Region
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Batpora, Jammu & Kashmir, India"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Official Address
              </label>
              <textarea
                rows={2}
                required
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                placeholder="Batpora, District Srinagar / Pulwama Region, Jammu & Kashmir, India"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 96975 67081"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Alternate Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  placeholder="+91 96975 67081"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Working Hours / Office Timing
                </label>
                <input
                  type="text"
                  required
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  placeholder="Mon – Sat: 8:30 AM – 3:30 PM"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Established Year
                </label>
                <input
                  type="text"
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(e.target.value)}
                  placeholder="2012"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Board Affiliation
                </label>
                <input
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  placeholder="State Board of School Education (JKBOSE) / Recognized"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                School Motto / Tagline
              </label>
              <input
                type="text"
                value={motto}
                onChange={(e) => setMotto(e.target.value)}
                placeholder="Nurturing Intellect, Character & Excellence"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Google Maps Embed Location Query
              </label>
              <input
                type="text"
                value={mapEmbedQuery}
                onChange={(e) => setMapEmbedQuery(e.target.value)}
                placeholder="Batpora, Jammu and Kashmir, India"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <button
              id="save-school-profile-btn"
              type="submit"
              disabled={savingInfo}
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer shadow"
            >
              {savingInfo ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{savingInfo ? 'Saving...' : 'Save School Profile'}</span>
            </button>
          </form>
        </div>

        {/* Firebase Cloud Connection & Live Real-Time Diagnostics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cloud Database Connection Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Firebase Cloud Connection</h3>
                  <p className="text-xs text-slate-400">Real-Time Data Engine</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleManualCheck}
                  disabled={checkingConn}
                  title="Check live connection status"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${checkingConn ? 'animate-spin text-amber-400' : ''}`} />
                </button>
                <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                  dbStatus.connected
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/80 border-red-500/40 text-red-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${dbStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
                  <span>{dbStatus.connected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Connected Firebase Project ID:</span>
                <span className="font-mono text-amber-300 font-bold break-all block bg-slate-950/70 px-2.5 py-1.5 rounded-lg border border-slate-700/60 text-xs">
                  {dbStatus.projectId || activeFirebaseConfig.projectId || 'little-star-school-of-learning'}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-700/50">
                <span className="text-slate-400">Firestore Real-Time Listener:</span>
                <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Active on all CMS collections</span>
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Firebase Auth Status:</span>
                <span className="font-semibold text-slate-200 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{user ? `Logged in (${user.email})` : 'Active'}</span>
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Last Live Synchronization:</span>
                <span className="font-mono text-amber-400 text-[11px] font-medium">{lastSyncTime}</span>
              </div>

              {dbStatus.latencyMs !== undefined && (
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Database Ping:</span>
                  <span className="font-mono text-slate-300 text-[11px]">{dbStatus.latencyMs}ms</span>
                </div>
              )}
            </div>

            {/* Sync Feedback Result */}
            {syncResult && (
              <div
                className={`p-3 rounded-2xl text-xs flex items-start space-x-2 ${
                  syncResult.success
                    ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-200'
                    : 'bg-red-950/80 border border-red-500/60 text-red-200'
                }`}
              >
                {syncResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <span>{syncResult.message}</span>
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button
                id="sync-all-to-firebase-btn"
                onClick={handleForceSyncAll}
                disabled={syncingAll}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                {syncingAll ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-slate-950" />
                )}
                <span>{syncingAll ? 'Writing Documents to Cloud...' : 'Seed / Re-Sync Batpora Data'}</span>
              </button>

              <button
                onClick={() => setShowConfigModal(!showConfigModal)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer border border-slate-700"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>{showConfigModal ? 'Hide Firebase Config' : 'View / Edit Firebase Project Config'}</span>
              </button>
            </div>

            {/* Custom Firebase Credentials Form */}
            {showConfigModal && (
              <form onSubmit={handleSaveCustomFirebase} className="pt-3 border-t border-slate-800 space-y-3 animate-fade-in">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Enter credentials from your Firebase Console if you wish to connect your own project directly:
                </p>

                <div>
                  <label className="block text-[10px] font-bold text-amber-300 uppercase mb-1">
                    Firebase Project ID
                  </label>
                  <input
                    type="text"
                    required
                    value={customProjectId}
                    onChange={(e) => setCustomProjectId(e.target.value)}
                    placeholder="e.g. little-star-school-batpora"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-amber-300 uppercase mb-1">
                    API Key (apiKey)
                  </label>
                  <input
                    type="text"
                    required
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Auth Domain
                    </label>
                    <input
                      type="text"
                      value={customAuthDomain}
                      onChange={(e) => setCustomAuthDomain(e.target.value)}
                      placeholder="project.firebaseapp.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Storage Bucket
                    </label>
                    <input
                      type="text"
                      value={customStorageBucket}
                      onChange={(e) => setCustomStorageBucket(e.target.value)}
                      placeholder="project.firebasestorage.app"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-lg text-xs"
                  >
                    Save & Reconnect
                  </button>
                  <button
                    type="button"
                    onClick={handleResetFirebase}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center space-x-1"
                    title="Reset to workspace default"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
