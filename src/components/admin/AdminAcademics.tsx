import React, { useState } from 'react';
import { GraduationCap, Edit2, Plus, Trash2, Check, X, Layers, Loader2, AlertCircle } from 'lucide-react';
import { AcademicLevel } from '../../types';
import { saveAcademicLevel, deleteAcademicLevel } from '../../lib/schoolDataService';

interface AdminAcademicsProps {
  levels: AcademicLevel[];
}

export const AdminAcademics: React.FC<AdminAcademicsProps> = ({ levels }) => {
  const [editingLevel, setEditingLevel] = useState<AcademicLevel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [grades, setGrades] = useState('');
  const [description, setDescription] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [order, setOrder] = useState(1);
  const [enabled, setEnabled] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openEdit = (lvl: AcademicLevel) => {
    setEditingLevel(lvl);
    setTitle(lvl.title);
    setSubtitle(lvl.subtitle);
    setAgeGroup(lvl.ageGroup);
    setGrades(lvl.grades);
    setDescription(lvl.description);
    setHighlightsText(lvl.highlights.join('\n'));
    setOrder(lvl.order || 1);
    setEnabled(lvl.enabled);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    const highlights = highlightsText
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    try {
      await saveAcademicLevel({
        ...(editingLevel?.id ? { id: editingLevel.id } : {}),
        title: title.trim(),
        subtitle: subtitle.trim(),
        ageGroup: ageGroup.trim(),
        grades: grades.trim(),
        description: description.trim(),
        highlights,
        iconName: editingLevel?.iconName || 'BookOpen',
        order: Number(order),
        enabled
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Failed to save academic level:', err);
      setErrorMessage(err?.message || 'Failed to save academic wing. Please check network.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 font-display">Academic Wings Management</h2>
        <p className="text-xs text-slate-500">
          Configure educational wings from Early Childhood through Senior Secondary.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map((lvl) => (
          <div
            key={lvl.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {lvl.grades}
                </span>
                <span className="text-xs text-slate-400 font-medium">{lvl.ageGroup}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-display">{lvl.title}</h3>
              <h4 className="text-xs font-semibold text-amber-700">{lvl.subtitle}</h4>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{lvl.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                lvl.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
              }`}>
                {lvl.enabled ? 'Active Wing' : 'Hidden'}
              </span>

              <button
                onClick={() => openEdit(lvl)}
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Wing</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 font-display">Edit Academic Wing</h3>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Wing Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Focus Area</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grades Included</label>
                  <input
                    type="text"
                    value={grades}
                    onChange={(e) => setGrades(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age Group</label>
                  <input
                    type="text"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Highlights (1 per line)</label>
                <textarea
                  rows={4}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="Play-way methodology&#10;Language and phonics&#10;Tactile arithmetic"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  id="acad-enabled-chk"
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded cursor-pointer"
                />
                <label htmlFor="acad-enabled-chk" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Display this academic wing on public website
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 text-xs rounded-xl flex items-center space-x-1.5 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Wing</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
