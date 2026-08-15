import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  SchoolInfo,
  HeroSlide,
  AcademicLevel,
  AdmissionInfo,
  StudentResource,
  NoticeItem,
  SchoolEvent,
  GalleryItem,
  EnquirySubmission
} from './types';
import {
  DEFAULT_SCHOOL_INFO,
  DEFAULT_HERO_SLIDES,
  DEFAULT_ACADEMIC_LEVELS,
  DEFAULT_ADMISSIONS,
  DEFAULT_NOTICES,
  DEFAULT_RESOURCES,
  DEFAULT_EVENTS,
  DEFAULT_GALLERY
} from './lib/initialData';
import {
  seedInitialSchoolData,
  subscribeSchoolInfo,
  subscribeHeroSlides,
  subscribeAcademics,
  subscribeAdmissions,
  subscribeNotices,
  subscribeResources,
  subscribeEvents,
  subscribeGallery,
  subscribeEnquiries
} from './lib/schoolDataService';

// Public Layout & Sections
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgressIndicator } from './components/layout/ScrollProgressIndicator';
import { HeroCarousel } from './components/public/HeroCarousel';
import { AboutSection } from './components/public/AboutSection';
import { PrincipalMessageSection } from './components/public/PrincipalMessageSection';
import { AcademicsSection } from './components/public/AcademicsSection';
import { AdmissionsSection } from './components/public/AdmissionsSection';
import { StudentResourcesSection } from './components/public/StudentResourcesSection';
import { NoticeBoardSection } from './components/public/NoticeBoardSection';
import { EventsSection } from './components/public/EventsSection';
import { GallerySection } from './components/public/GallerySection';
import { ContactSection } from './components/public/ContactSection';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Shield, Sparkles, Phone, MapPin, Star, AlertCircle, Loader2 } from 'lucide-react';

const SchoolApp: React.FC = () => {
  const { user, loading: authLoading } = useAuth();

  // Application view: 'public' | 'admin'
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Realtime School Data State
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(DEFAULT_SCHOOL_INFO);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [academics, setAcademics] = useState<AcademicLevel[]>(DEFAULT_ACADEMIC_LEVELS);
  const [admissions, setAdmissions] = useState<AdmissionInfo>(DEFAULT_ADMISSIONS);
  const [notices, setNotices] = useState<NoticeItem[]>(DEFAULT_NOTICES);
  const [resources, setResources] = useState<StudentResource[]>(DEFAULT_RESOURCES);
  const [events, setEvents] = useState<SchoolEvent[]>(DEFAULT_EVENTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [dataReady, setDataReady] = useState<boolean>(false);

  // Initialize public Firestore listeners & routing
  useEffect(() => {
    // 1. Set up realtime onSnapshot listeners for public school data
    const unsubSchool = subscribeSchoolInfo((data) => setSchoolInfo(data));
    const unsubSlides = subscribeHeroSlides((data) => setHeroSlides(data));
    const unsubAcademics = subscribeAcademics((data) => setAcademics(data));
    const unsubAdmissions = subscribeAdmissions((data) => setAdmissions(data));
    const unsubNotices = subscribeNotices((data) => setNotices(data));
    const unsubResources = subscribeResources((data) => setResources(data));
    const unsubEvents = subscribeEvents((data) => setEvents(data));
    const unsubGallery = subscribeGallery((data) => setGallery(data));

    setDataReady(true);

    // Handle pathname and hash routing for /admin and /admin/login
    const handleRouting = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.startsWith('/admin') || hash === '#admin' || hash === '#/admin' || hash.startsWith('#admin/')) {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
        if (hash && hash !== '#' && !hash.startsWith('#admin')) {
          const id = hash.replace('#', '');
          const elem = document.getElementById(id);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
          }
        }
      }
    };

    handleRouting();
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('popstate', handleRouting);

    return () => {
      unsubSchool();
      unsubSlides();
      unsubAcademics();
      unsubAdmissions();
      unsubNotices();
      unsubResources();
      unsubEvents();
      unsubGallery();
      window.removeEventListener('hashchange', handleRouting);
      window.removeEventListener('popstate', handleRouting);
    };
  }, []);

  // Admin-specific listeners & data seeding
  useEffect(() => {
    if (user) {
      seedInitialSchoolData();
      const unsubEnquiries = subscribeEnquiries((data) => setEnquiries(data));
      return () => {
        unsubEnquiries();
      };
    } else {
      setEnquiries([]);
    }
  }, [user]);

  // Dynamic Scroll Spy for active section highlighting
  useEffect(() => {
    if (currentView !== 'public') return;

    const sectionIds = [
      'home',
      'about',
      'principal-message',
      'academics',
      'admissions',
      'resources',
      'notices',
      'events',
      'gallery',
      'contact'
    ];

    let isScrolling = false;

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
      isScrolling = false;
    };

    const onScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(handleScrollSpy);
        isScrolling = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScrollSpy();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [currentView]);

  // Smooth Section Navigation
  const scrollToSection = (sectionId: string) => {
    if (currentView === 'admin') {
      setCurrentView('public');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
  };

  // Return to Public Site
  const handleBackToWebsite = () => {
    setCurrentView('public');
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin Mode
  if (currentView === 'admin') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-sm font-semibold text-slate-300">Checking Little Star Admin Credentials...</p>
        </div>
      );
    }

    if (!user) {
      return <AdminLogin onBackToWebsite={handleBackToWebsite} />;
    }

    return (
      <AdminDashboard
        schoolInfo={schoolInfo}
        heroSlides={heroSlides}
        academics={academics}
        admissions={admissions}
        resources={resources}
        notices={notices}
        events={events}
        gallery={gallery}
        enquiries={enquiries}
        onBackToWebsite={handleBackToWebsite}
      />
    );
  }

  // Public School Website
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans overflow-x-hidden w-full">
      {/* Top of Screen Subtle Scroll Progress Indicator */}
      <ScrollProgressIndicator activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Header / Navigation with sticky positioning and responsive layout */}
      <Navbar
        schoolInfo={schoolInfo}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Public Page Content */}
      <main className="flex-1 overflow-x-hidden w-full">
        {/* Section 1: Hero Carousel */}
        <HeroCarousel
          slides={heroSlides}
          onNavigate={scrollToSection}
        />

        {/* Section 2: About School */}
        <AboutSection
          schoolInfo={schoolInfo}
          onNavigate={scrollToSection}
        />

        {/* Section 3: Principal's Message */}
        <PrincipalMessageSection
          schoolInfo={schoolInfo}
          onNavigate={scrollToSection}
        />

        {/* Section 4: Academic Curriculum */}
        <AcademicsSection
          levels={academics}
          onNavigate={scrollToSection}
        />

        {/* Section 5: Admissions Guide */}
        <AdmissionsSection
          admissionsInfo={admissions}
          schoolInfo={schoolInfo}
          onNavigate={scrollToSection}
        />

        {/* Section 6: Student Resource & Downloads Portal */}
        <StudentResourcesSection
          resources={resources}
        />

        {/* Section 7: Notice Board & Circulars */}
        <NoticeBoardSection
          notices={notices}
        />

        {/* Section 8: Campus Events & Calendar */}
        <EventsSection
          events={events}
        />

        {/* Section 9: Photo Gallery */}
        <GallerySection
          gallery={gallery}
        />

        {/* Section 10: Contact & Admission Enquiry */}
        <ContactSection
          schoolInfo={schoolInfo}
        />
      </main>

      {/* Footer */}
      <Footer
        schoolInfo={schoolInfo}
        onNavigate={scrollToSection}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SchoolApp />
    </AuthProvider>
  );
}
