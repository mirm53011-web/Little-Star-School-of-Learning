import React, { useState } from 'react';
import { Award, BookOpen, Target, Compass, Save, Check, Loader2 } from 'lucide-react';
import { SchoolInfo } from '../../types';
import { updateSchoolInfo } from '../../lib/schoolDataService';
import { uploadFileToStorage } from '../../lib/storageHelper';

interface AdminAboutPrincipalProps {
  schoolInfo: SchoolInfo;
}

export const AdminAboutPrincipal: React.FC<AdminAboutPrincipalProps> = ({ schoolInfo }) => {
  const [principalName, setPrincipalName] = useState(schoolInfo.principalName);
  const [principalMessage, setPrincipalMessage] = useState(schoolInfo.principalMessage);
  const [principalPhotoUrl, setPrincipalPhotoUrl] = useState(schoolInfo.principalPhotoUrl || '');
  const [aboutText, setAboutText] = useState(schoolInfo.aboutText);
  const [philosophy, setPhilosophy] = useState(schoolInfo.philosophy);
  const [vision, setVision] = useState(schoolInfo.vision);
  const [mission, setMission] = useState(schoolInfo.mission);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      let finalPhoto = principalPhotoUrl;
      if (photoFile) {
        const res = await uploadFileToStorage(photoFile, 'principal_photos');
        finalPhoto = res.downloadUrl;
      }

      await updateSchoolInfo({
        principalName: principalName.trim(),
        principalMessage: principalMessage.trim(),
        principalPhotoUrl: finalPhoto,
        aboutText: aboutText.trim(),
        philosophy: philosophy.trim(),
        vision: vision.trim(),
        mission: mission.trim()
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update school info:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            About School & Principal’s Message CMS
          </h2>
          <p className="text-xs text-slate-500">
            Edit institutional profile, educational philosophy, vision, mission, and Principal Javid Bhat's address.
          </p>
        </div>

        {success && (
          <div className="bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Updated Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Principal Message Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-3 text-slate-900 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">Principal’s Profile & Official Message</h3>
              <p className="text-xs text-slate-500">Displayed in leadership section of public website</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Principal Name *</label>
              <input
                type="text"
                required
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Principal Photo URL / Upload</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPhotoFile(e.target.files[0]);
                  }
                }}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-amber-400 cursor-pointer mb-2"
              />
              <input
                type="url"
                placeholder="Or Photo URL: https://..."
                value={principalPhotoUrl}
                onChange={(e) => setPrincipalPhotoUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Principal’s Official Message *</label>
            <textarea
              rows={6}
              required
              value={principalMessage}
              onChange={(e) => setPrincipalMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif-reading"
            />
          </div>
        </div>

        {/* School Intro & Philosophy */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-3 text-slate-900 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">Institutional Overview & Philosophy</h3>
              <p className="text-xs text-slate-500">Core narrative for Batpora campus</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">About Little Star School Text</label>
            <textarea
              rows={4}
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Educational Philosophy</label>
            <textarea
              rows={3}
              value={philosophy}
              onChange={(e) => setPhilosophy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                <Target className="w-4 h-4 text-amber-600" />
                <span>Vision Statement</span>
              </label>
              <textarea
                rows={3}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Mission Statement</span>
              </label>
              <textarea
                rows={3}
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3.5 rounded-2xl text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Saving School Info...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
