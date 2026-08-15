import React, { useState } from 'react';
import { Camera, Plus, Trash2, Edit2, X, AlertCircle } from 'lucide-react';
import { GalleryItem } from '../../types';
import { saveGalleryItem, deleteGalleryItem } from '../../lib/schoolDataService';
import { uploadFileToStorage } from '../../lib/storageHelper';
import { HorizontalProgressBar, ActionButtonProgress } from '../common/HorizontalProgressBar';

interface AdminGalleryProps {
  gallery: GalleryItem[];
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ gallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Campus');
  const [imageUrl, setImageUrl] = useState('');
  const [enabled, setEnabled] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categories = [
    'Campus',
    'Classroom',
    'School Events',
    'Sports',
    'Cultural Activities',
    'Annual Functions',
    'Other'
  ];

  const openCreate = () => {
    setEditingItem(null);
    setTitle('');
    setCaption('');
    setCategory('Campus');
    setImageUrl('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80');
    setEnabled(true);
    setSelectedFile(null);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCaption(item.caption || '');
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setEnabled(item.enabled);
    setSelectedFile(null);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    try {
      let finalImg = imageUrl;
      if (selectedFile) {
        const res = await uploadFileToStorage(selectedFile, 'gallery');
        finalImg = res.downloadUrl;
      }

      await saveGalleryItem({
        ...(editingItem?.id ? { id: editingItem.id } : {}),
        title: title.trim(),
        caption: caption.trim(),
        category,
        imageUrl: finalImg,
        date: editingItem?.date || new Date().toISOString().split('T')[0],
        enabled
      });

      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Failed to save photo:', err);
      setErrorMessage(err?.message || 'Failed to save gallery photo.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this photo from gallery?')) {
      await deleteGalleryItem(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Photo Gallery Management</h2>
          <p className="text-xs text-slate-500">
            Upload campus life, science activities, classroom moments, sports events, and annual functions.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="h-44 bg-slate-900 overflow-hidden relative group">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display truncate">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.caption}</p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.enabled ? 'Visible' : 'Hidden'}
                </span>

                <div className="space-x-1">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
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

            <h3 className="text-xl font-bold text-slate-900 font-display">
              {editingItem ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Details</label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700">Photo Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-amber-400 cursor-pointer"
                />
                <input
                  type="url"
                  placeholder="Or enter Image URL: https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  id="gallery-enabled-chk"
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded cursor-pointer"
                />
                <label htmlFor="gallery-enabled-chk" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Display photo in public gallery
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {saving && (
                <div className="pt-2">
                  <HorizontalProgressBar variant="amber" height="xs" label="Saving photo metadata to Firestore..." showStarGlow={false} />
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
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 text-xs rounded-xl cursor-pointer disabled:opacity-50 flex items-center space-x-1.5 transition-all"
                >
                  {saving ? (
                    <ActionButtonProgress label="Saving Photo..." />
                  ) : (
                    <span>Save Photo</span>
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
