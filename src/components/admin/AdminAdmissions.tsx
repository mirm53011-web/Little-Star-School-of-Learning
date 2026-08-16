import React, { useState } from 'react';
import { Sparkles, Save, Check, Plus, Trash2, Calendar, FileText, AlertCircle } from 'lucide-react';
import { AdmissionInfo } from '../../types';
import { updateAdmissionsInfo } from '../../lib/schoolDataService';
import { HorizontalProgressBar, ActionButtonProgress } from '../common/HorizontalProgressBar';

interface AdminAdmissionsProps {
  admissionsInfo: AdmissionInfo;
}

export const AdminAdmissions: React.FC<AdminAdmissionsProps> = ({ admissionsInfo }) => {
  const [academicSession, setAcademicSession] = useState(admissionsInfo.academicSession);
  const [status, setStatus] = useState(admissionsInfo.status);
  const [announcement, setAnnouncement] = useState(admissionsInfo.announcement);
  const [contactNote, setContactNote] = useState(admissionsInfo.contactNote);

  const [eligibilityText, setEligibilityText] = useState(admissionsInfo.eligibilityCriteria.join('\n'));
  const [documentsText, setDocumentsText] = useState(admissionsInfo.requiredDocuments.join('\n'));
  
  const [importantDates, setImportantDates] = useState<{ event: string; date: string }[]>(
    admissionsInfo.importantDates || []
  );

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync state if admissionsInfo changes from live Firestore snapshot
  React.useEffect(() => {
    if (!saving) {
      setAcademicSession(admissionsInfo.academicSession);
      setStatus(admissionsInfo.status);
      setAnnouncement(admissionsInfo.announcement);
      setContactNote(admissionsInfo.contactNote);
      setEligibilityText(admissionsInfo.eligibilityCriteria.join('\n'));
      setDocumentsText(admissionsInfo.requiredDocuments.join('\n'));
      setImportantDates(admissionsInfo.importantDates || []);
    }
  }, [admissionsInfo, saving]);

  const handleAddDate = () => {
    setImportantDates([...importantDates, { event: 'New Milestone', date: 'Date / Period' }]);
  };

  const handleRemoveDate = (index: number) => {
    setImportantDates(importantDates.filter((_, i) => i !== index));
  };

  const handleDateChange = (index: number, field: 'event' | 'date', val: string) => {
    const updated = [...importantDates];
    updated[index][field] = val;
    setImportantDates(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setErrorMessage(null);

    try {
      const eligibilityCriteria = eligibilityText
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const requiredDocuments = documentsText
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      await updateAdmissionsInfo({
        academicSession: academicSession.trim(),
        status,
        announcement: announcement.trim(),
        contactNote: contactNote.trim(),
        eligibilityCriteria,
        requiredDocuments,
        importantDates
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Failed to update admissions:', err);
      setErrorMessage(err?.message || 'Failed to save admissions info.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Admissions CMS (Session 2026–2027)</h2>
          <p className="text-xs text-slate-500">
            Manage public registration announcements, eligibility guidelines, and document requirements.
          </p>
        </div>

        {success && (
          <div className="bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Updated Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Session *</label>
              <input
                type="text"
                required
                value={academicSession}
                onChange={(e) => setAcademicSession(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admission Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
              >
                <option value="Open">Open</option>
                <option value="Closing Soon">Closing Soon</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Main Public Announcement *</label>
            <textarea
              rows={3}
              required
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Office Contact / Helpline Note</label>
            <input
              type="text"
              value={contactNote}
              onChange={(e) => setContactNote(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
            />
          </div>
        </div>

        {/* Eligibility & Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Eligibility Criteria (1 per line)
            </label>
            <textarea
              rows={6}
              value={eligibilityText}
              onChange={(e) => setEligibilityText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 leading-relaxed"
            />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Required Documents Checklist (1 per line)
            </label>
            <textarea
              rows={6}
              value={documentsText}
              onChange={(e) => setDocumentsText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 leading-relaxed"
            />
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">Key Admission Dates / Milestones</label>
            <button
              type="button"
              onClick={handleAddDate}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Date</span>
            </button>
          </div>

          <div className="space-y-2">
            {importantDates.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Event / Description"
                  value={item.event}
                  onChange={(e) => handleDateChange(idx, 'event', e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
                <input
                  type="text"
                  placeholder="Date / Timeframe"
                  value={item.date}
                  onChange={(e) => handleDateChange(idx, 'date', e.target.value)}
                  className="w-48 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDate(idx)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          {success ? (
            <div className="flex items-center space-x-1.5 text-emerald-600 font-bold text-xs">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Admissions criteria updated in real time!</span>
            </div>
          ) : <div />}

          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-2xl text-sm flex items-center space-x-2 shadow cursor-pointer disabled:opacity-50 transition-all"
          >
            {saving ? (
              <ActionButtonProgress label="Saving Admissions..." />
            ) : success ? (
              <ActionButtonProgress isCompleted completedLabel="Saved ✓" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Admissions Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
