import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { HeroSlide } from '../../types';

interface HeroCarouselProps {
  slides: HeroSlide[];
  onNavigate: (sectionId: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides, onNavigate }) => {
  const activeSlides = slides.filter(s => s.enabled);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Exact 4 seconds auto-rotation as strictly requested
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) {
    return null;
  }

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const handleCtaClick = (url: string) => {
    if (url.startsWith('#')) {
      onNavigate(url.substring(1));
    } else if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(url);
    }
  };

  return (
    <section id="home" className="relative w-full min-h-[480px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-8 sm:pt-12 md:pt-16 pb-14 sm:pb-16 md:pb-20">
      {/* Background Images with smooth fade */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url(${slide.bgImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transition: 'opacity 1s ease-in-out, transform 4s ease-out',
          }}
        >
          {/* Multi-layer Gradient Overlay for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        </div>
      ))}

      {/* Main Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 sm:py-8 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Badge */}
          {currentSlide.badge && (
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase mb-4 sm:mb-5 backdrop-blur-sm animate-fade-in shadow-lg">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
              <span className="truncate">{currentSlide.badge}</span>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display leading-[1.18] tracking-tight mb-4 sm:mb-5 drop-shadow-md break-words">
            {currentSlide.heading}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-base md:text-lg text-slate-200 leading-relaxed font-sans mb-6 sm:mb-8 max-w-2xl text-slate-200/90 font-normal drop-shadow">
            {currentSlide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            {currentSlide.ctaText && (
              <button
                id="hero-primary-cta"
                onClick={() => handleCtaClick(currentSlide.ctaUrl || '#admissions')}
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl text-xs sm:text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center space-x-2 group cursor-pointer min-h-[44px]"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <button
              id="hero-secondary-cta"
              onClick={() => onNavigate('resources')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl text-xs sm:text-base backdrop-blur-sm transition-all flex items-center space-x-2 cursor-pointer min-h-[44px]"
            >
              <span>Student Downloads & Syllabi</span>
            </button>
          </div>

          {/* Quick trust badges */}
          <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="truncate">Recognized & Dedicated</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="truncate">Holistic Excellence</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
              <span className="truncate">Admissions 2026–27 Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Pagination Dots (NO PREV/NEXT ARROWS as strictly mandated) */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center space-x-2">
        {activeSlides.map((slide, index) => (
          <button
            key={slide.id}
            id={`hero-dot-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentIndex
                ? 'w-8 h-2.5 bg-amber-400 shadow-md shadow-amber-400/50'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
