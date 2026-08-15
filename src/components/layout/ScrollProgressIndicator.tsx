import React, { useState, useEffect } from 'react';

interface SectionMilestone {
  id: string;
  name: string;
}

const SECTIONS: SectionMilestone[] = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About School' },
  { id: 'principal-message', name: "Principal's Desk" },
  { id: 'academics', name: 'Academics' },
  { id: 'admissions', name: 'Admissions' },
  { id: 'resources', name: 'Downloads' },
  { id: 'notices', name: 'Notice Board' },
  { id: 'events', name: 'Events' },
  { id: 'gallery', name: 'Gallery' },
  { id: 'contact', name: 'Contact & Enquiry' },
];

interface ScrollProgressIndicatorProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  activeSection = 'home',
  onNavigate
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
        setIsVisible(scrollTop > 40);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const currentSectionMeta = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background track */}
      <div className="w-full h-[3px] bg-slate-900/40 backdrop-blur-sm">
        {/* Active progress bar */}
        <div
          id="scroll-progress-bar"
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-[width] duration-150 ease-out will-change-[width]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Subtle floating badge when scrolling through sections */}
      <div
        className={`pointer-events-auto transition-all duration-300 ease-out absolute right-4 top-2 sm:right-8 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div
          id="scroll-section-pill"
          className="hidden md:inline-flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md border border-slate-700/70 text-slate-200 text-[11px] px-2.5 py-1 rounded-full shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-semibold text-white tracking-wide">{currentSectionMeta.name}</span>
          <span className="text-slate-500">•</span>
          <span className="font-mono text-[10px] text-amber-300 font-bold">{Math.round(scrollProgress)}%</span>
        </div>
      </div>
    </div>
  );
};
