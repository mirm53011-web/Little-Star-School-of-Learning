import React, { useState, useMemo } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '../../types';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Campus',
    'Classroom',
    'School Events',
    'Sports',
    'Cultural Activities',
    'Annual Functions'
  ];

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      if (!item.enabled) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [gallery, selectedCategory]);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null && filteredGallery.length > 0) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredGallery.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null && filteredGallery.length > 0) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const currentPhoto = activePhotoIndex !== null ? filteredGallery[activePhotoIndex] : null;

  return (
    <section id="gallery" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Campus Moments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-4">
            School Photo Gallery
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Glimpses of vibrant student life, state-of-the-art classroom activities, sports achievements, and cultural celebrations in Batpora.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-cat-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={() => openLightbox(index)}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-800 cursor-pointer border border-slate-700 shadow-md hover:shadow-xl hover:border-amber-400/60 transition-all"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                  <span className="inline-block bg-amber-500/90 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {item.caption}
                    </p>
                  )}
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-12 text-center max-w-md mx-auto">
            <Camera className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="font-bold text-white mb-1">No photos in this category</h4>
            <p className="text-xs text-slate-400">Please choose another category or check back soon.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-slate-300 hover:text-white p-2 rounded-full bg-slate-800/80 z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 p-3 rounded-full bg-slate-800/80 hover:bg-slate-800 z-20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 p-3 rounded-full bg-slate-800/80 hover:bg-slate-800 z-20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center space-y-4">
            <div className="max-h-[75vh] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl bg-black">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                className="max-h-[75vh] max-w-full object-contain"
              />
            </div>
            <div className="text-center space-y-1 max-w-xl">
              <span className="bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-0.5 rounded-full">
                {currentPhoto.category}
              </span>
              <h4 className="text-lg font-bold text-white font-display">
                {currentPhoto.title}
              </h4>
              {currentPhoto.caption && (
                <p className="text-xs sm:text-sm text-slate-300">
                  {currentPhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
