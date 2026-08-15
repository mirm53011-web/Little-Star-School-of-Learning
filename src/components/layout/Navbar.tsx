import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Star, FileText, ChevronRight, School, Sparkles } from 'lucide-react';
import { SchoolInfo } from '../../types';

interface NavbarProps {
  schoolInfo: SchoolInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  schoolInfo,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'academics', label: 'ACADEMICS' },
    { id: 'admissions', label: 'ADMISSIONS' },
    { id: 'resources', label: 'STUDENTS' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'notices', label: 'NOTICE BOARD' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-slate-800/80 text-white'
          : 'bg-slate-950/90 backdrop-blur-md shadow-md border-b border-slate-800/60 text-white'
      }`}
    >
      {/* Top Utility Bar (Medium/Desktop screens) */}
      <div className="hidden md:block bg-slate-950 text-slate-300 border-b border-slate-800/80 text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-slate-300">
            <span className="flex items-center space-x-1.5 text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SESSION 2026–2027 ADMISSIONS OPEN</span>
            </span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="hidden lg:flex items-center space-x-1.5 text-slate-400">
              <School className="w-3.5 h-3.5 text-slate-400" />
              <span>Batpora, Jammu & Kashmir</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              id="header-phone-link"
              href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Helpline: <strong className="text-white">{schoolInfo.phone}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo / Brand */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group min-w-0 flex-1 max-w-[calc(100%-88px)] lg:max-w-none"
          >
            {/* School Star Badge Logo */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 fill-slate-950" />
            </div>

            {/* School Title & Subtitle */}
            <div className="min-w-0 flex-1 flex flex-col justify-center">
              <span className="block text-xs sm:text-base md:text-lg lg:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors uppercase font-display leading-tight truncate">
                Little Star
              </span>
              <span className="block text-[9px] sm:text-[10px] md:text-xs text-amber-300 font-semibold tracking-wider uppercase leading-none truncate mt-0.5">
                School of Learning • Batpora
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.id ||
                (link.id === 'about' && activeSection === 'principal-message') ||
                (link.id === 'home' && (activeSection === 'home' || !activeSection));
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <button
              id="nav-quick-resources-btn"
              onClick={() => handleNavClick('resources')}
              className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs xl:text-sm font-semibold px-3.5 py-1.5 rounded-lg shadow-md hover:shadow-blue-500/30 transition-all flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Downloads</span>
            </button>
          </nav>

          {/* Mobile Actions: Phone Call & Hamburger Menu */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 lg:hidden flex-shrink-0">
            {/* Phone Call Quick Button */}
            <a
              id="mobile-call-btn"
              href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center transition-all active:scale-95 shadow-sm flex-shrink-0"
              aria-label={`Call ${schoolInfo.phone}`}
              title="Call School"
            >
              <Phone className="w-4 h-4 fill-current" />
            </a>

            {/* Hamburger Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/80 flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fade-in max-h-[calc(100vh-65px)] overflow-y-auto"
        >
          {/* School Details Pill */}
          <div className="mb-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center justify-between">
            <span className="truncate mr-2">Principal: <strong className="text-white">{schoolInfo.principalName}</strong></span>
            <span className="text-amber-400 font-semibold flex-shrink-0">Batpora, J&K</span>
          </div>

          {/* Nav Items */}
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.id ||
                (link.id === 'about' && activeSection === 'principal-message') ||
                (link.id === 'home' && (activeSection === 'home' || !activeSection));
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick Action Buttons on Mobile */}
          <div className="pt-3 mt-2 border-t border-slate-800/80 space-y-2">
            <a
              id="mobile-nav-direct-call"
              href={`tel:${schoolInfo.phone.replace(/\s+/g, '')}`}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Call Helpline ({schoolInfo.phone})</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="mobile-nav-admissions"
                onClick={() => handleNavClick('admissions')}
                className="w-full bg-amber-500/20 border border-amber-400/40 hover:bg-amber-500/30 text-amber-300 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Admissions</span>
              </button>
              <button
                id="mobile-nav-downloads"
                onClick={() => handleNavClick('resources')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Downloads</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
