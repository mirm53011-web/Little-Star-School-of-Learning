import React, { useState, useMemo } from 'react';
import {
  Camera,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Filter,
  Image as ImageIcon
} from 'lucide-react';
import { GalleryItem, GALLERY_CATEGORIES } from '../../types';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
  onNavigate?: (pageId: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ galleryItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', ...GALLERY_CATEGORIES];

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      if (!item.enabled) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [galleryItems, selectedCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Hero Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-400/40 text-purple-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Camera className="w-3.5 h-3.5 text-purple-400" />
              <span>Campus Life & Moments</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              Visual Tour & School Gallery
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Immerse yourself in student life at Little Star School of Learning — explore classrooms, science labs, athletic meets, annual functions, and cultural activities.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Pills */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-[60px] sm:top-[70px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto no-scrollbar gap-2 py-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`gallery-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-amber-400 shadow scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Images Grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  id={`gallery-page-item-${item.id}`}
                  onClick={() => openLightbox(idx)}
                  className="group relative h-64 rounded-3xl overflow-hidden bg-slate-900 cursor-pointer shadow-sm hover:shadow-xl transition-all border border-slate-200 hover:border-amber-400"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                    <span className="text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white font-bold text-sm font-display line-clamp-2">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-slate-300 text-xs mt-1 line-clamp-2">
                        {item.caption}
                      </p>
                    )}
                    <div className="mt-3 flex items-center space-x-1 text-xs text-amber-300 font-semibold">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to enlarge</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 font-display">No photos found in this category</h3>
              <p className="text-xs text-slate-500">Please choose another category to view images.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Fullscreen Lightbox */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content */}
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4">
            <div className="max-h-[70vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-black">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="text-center text-white space-y-1">
              <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                {filteredItems[lightboxIndex].category} ({lightboxIndex + 1} of {filteredItems.length})
              </span>
              <h3 className="text-lg font-bold font-display">
                {filteredItems[lightboxIndex].title}
              </h3>
              {filteredItems[lightboxIndex].caption && (
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                  {filteredItems[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
