import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, Edit2, Check, X, Eye, EyeOff, Loader2, Image as ImageIcon } from 'lucide-react';
import { HeroSlide } from '../../types';
import { saveHeroSlide, deleteHeroSlide } from '../../lib/schoolDataService';
import { uploadFileToStorage } from '../../lib/storageHelper';

interface AdminHeroSlidesProps {
  slides: HeroSlide[];
}

export const AdminHeroSlides: React.FC<AdminHeroSlidesProps> = ({ slides }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const [badge, setBadge] = useState('ADMISSIONS OPEN 2026–2027');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [ctaText, setCtaText] = useState('Apply For Admission');
  const [ctaUrl, setCtaUrl] = useState('#admissions');
  const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80');
  const [enabled, setEnabled] = useState(true);
  const [order, setOrder] = useState(1);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditingSlide(null);
    setBadge('ADMISSIONS OPEN 2026–2027');
    setHeading('Inspiring Minds, Shaping Tomorrow');
    setDescription('Premier quality education in Batpora, Jammu & Kashmir under Principal Javid Bhat.');
    setCtaText('Apply For Admission');
    setCtaUrl('#admissions');
    setBgImage('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80');
    setEnabled(true);
    setOrder(slides.length + 1);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setBadge(slide.badge);
    setHeading(slide.heading);
    setDescription(slide.description);
    setCtaText(slide.ctaText);
    setCtaUrl(slide.ctaUrl);
    setBgImage(slide.bgImage);
    setEnabled(slide.enabled);
    setOrder(slide.order || 1);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalImg = bgImage;
      if (selectedFile) {
        const res = await uploadFileToStorage(selectedFile, 'hero_banners');
        finalImg = res.downloadUrl;
      }

      await saveHeroSlide({
        ...(editingSlide?.id ? { id: editingSlide.id } : {}),
        badge: badge.trim(),
        heading: heading.trim(),
        description: description.trim(),
        ctaText: ctaText.trim(),
        ctaUrl: ctaUrl.trim(),
        bgImage: finalImg,
        enabled,
        order: Number(order)
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save slide:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this hero banner slide?')) {
      await deleteHeroSlide(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Hero Carousel Slides (Admissions & Announcements)</h2>
          <p className="text-xs text-slate-500">
            Automatically cycles every 4 seconds on the home page. Configure badges, headings, and CTAs.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Hero Slide</span>
        </button>
      </div>

      {/* Grid of slides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="h-44 relative bg-slate-900 overflow-hidden">
              <img
                src={slide.bgImage}
                alt={slide.heading}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow">
                Order: #{slide.order}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] text-amber-300 font-bold uppercase block">{slide.badge}</span>
                <h4 className="text-sm font-bold truncate">{slide.heading}</h4>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {slide.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  slide.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {slide.enabled ? 'Active Slide' : 'Disabled'}
                </span>

                <div className="space-x-1">
                  <button
                    onClick={() => openEdit(slide)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 font-display">
              {editingSlide ? 'Edit Hero Slide' : 'Create New Hero Slide'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Badge / Tag (e.g. ADMISSIONS OPEN 2026–2027)</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Main Heading *</label>
                <input
                  type="text"
                  required
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CTA URL (e.g. #admissions or #resources)</label>
                  <input
                    type="text"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                  />
                </div>

                <div className="flex items-center pt-5 space-x-2">
                  <input
                    id="slide-enabled-chk"
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded cursor-pointer"
                  />
                  <label htmlFor="slide-enabled-chk" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Enable slide on home page
                  </label>
                </div>
              </div>

              {/* Background Image Upload or URL */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700">Background Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-amber-400 cursor-pointer"
                />
                <input
                  type="url"
                  placeholder="Or enter Image URL (https://...)"
                  value={bgImage}
                  onChange={(e) => setBgImage(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Slide...</span>
                    </>
                  ) : (
                    <span>Save Slide</span>
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
