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

// Public Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Dedicated Page Components
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { AcademicsPage } from './components/pages/AcademicsPage';
import { AdmissionsPage } from './components/pages/AdmissionsPage';
import { StudentResourcesPage } from './components/pages/StudentResourcesPage';
import { NoticesPage } from './components/pages/NoticesPage';
import { EventsPage } from './components/pages/EventsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ContactPage } from './components/pages/ContactPage';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { FullPageLoader } from './components/common/HorizontalProgressBar';

export type AppPage =
  | 'home'
  | 'about'
  | 'academics'
  | 'admissions'
  | 'resources'
  | 'notices'
  | 'events'
  | 'gallery'
  | 'contact';

const SchoolApp: React.FC = () => {
  const { user, loading: authLoading } = useAuth();

  // Application view: 'public' | 'admin'
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [activePage, setActivePage] = useState<AppPage>('home');

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

    // Handle pathname and hash routing for pages and admin
    const handleRouting = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.startsWith('/admin') || hash === '#admin' || hash === '#/admin' || hash.startsWith('#admin/')) {
        setCurrentView('admin');
        return;
      }

      setCurrentView('public');

      const cleanHash = hash.replace(/^#\/?/, '');
      const validPages: AppPage[] = [
        'home',
        'about',
        'academics',
        'admissions',
        'resources',
        'notices',
        'events',
        'gallery',
        'contact'
      ];

      if (validPages.includes(cleanHash as AppPage)) {
        setActivePage(cleanHash as AppPage);
      } else if (cleanHash === 'principal-message') {
        setActivePage('about');
      } else if (!cleanHash || cleanHash === '') {
        setActivePage('home');
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

  // Navigate to dedicated page
  const navigateToPage = (pageId: string) => {
    let targetPage: AppPage = 'home';
    if (pageId === 'principal-message' || pageId === 'about') {
      targetPage = 'about';
    } else if (pageId === 'academics') {
      targetPage = 'academics';
    } else if (pageId === 'admissions') {
      targetPage = 'admissions';
    } else if (pageId === 'resources' || pageId === 'students') {
      targetPage = 'resources';
    } else if (pageId === 'notices') {
      targetPage = 'notices';
    } else if (pageId === 'events') {
      targetPage = 'events';
    } else if (pageId === 'gallery') {
      targetPage = 'gallery';
    } else if (pageId === 'contact') {
      targetPage = 'contact';
    } else if (pageId === 'admin') {
      setCurrentView('admin');
      window.location.hash = '#/admin';
      return;
    } else {
      targetPage = 'home';
    }

    if (currentView === 'admin') {
      setCurrentView('public');
    }

    setActivePage(targetPage);
    window.location.hash = `#/${targetPage}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to Public Site from Admin
  const handleBackToWebsite = () => {
    setCurrentView('public');
    setActivePage('home');
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    } else {
      window.location.hash = '#/home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin Mode
  if (currentView === 'admin') {
    if (authLoading) {
      return (
        <FullPageLoader
          message="Checking Little Star Admin Credentials..."
          subMessage="Authenticating session with Firebase Auth"
        />
      );
    }

    if (!user) {
      return (
        <ErrorBoundary name="Admin Login" variant="fullscreen">
          <AdminLogin onBackToWebsite={handleBackToWebsite} />
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary name="Admin Portal" variant="fullscreen">
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
      </ErrorBoundary>
    );
  }

  // Public School Website with Dedicated Pages
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans overflow-x-hidden w-full">
      {/* Main Header / Navigation */}
      <ErrorBoundary name="Navigation Header" variant="card">
        <Navbar
          schoolInfo={schoolInfo}
          activeSection={activePage}
          onNavigate={navigateToPage}
        />
      </ErrorBoundary>

      {/* Dedicated Page View Content */}
      <main className="flex-1 overflow-x-hidden w-full">
        {activePage === 'home' && (
          <ErrorBoundary name="Home Page" variant="section">
            <HomePage
              schoolInfo={schoolInfo}
              heroSlides={heroSlides}
              academics={academics}
              admissions={admissions}
              resources={resources}
              notices={notices}
              events={events}
              gallery={gallery}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}

        {activePage === 'about' && (
          <ErrorBoundary name="About Page" variant="section">
            <AboutPage
              schoolInfo={schoolInfo}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}

        {activePage === 'academics' && (
          <ErrorBoundary name="Academics Page" variant="section">
            <AcademicsPage
              levels={academics}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}

        {activePage === 'admissions' && (
          <ErrorBoundary name="Admissions Page" variant="section">
            <AdmissionsPage
              admissionsInfo={admissions}
              schoolInfo={schoolInfo}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}

        {activePage === 'resources' && (
          <ErrorBoundary name="Student Resources Page" variant="section">
            <StudentResourcesPage
              resources={resources}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}

        {activePage === 'notices' && (
          <ErrorBoundary name="Notices Page" variant="section">
            <NoticesPage
              notices={notices}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}

        {activePage === 'events' && (
          <ErrorBoundary name="Events Page" variant="section">
            <EventsPage
              events={events}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}

        {activePage === 'gallery' && (
          <ErrorBoundary name="Gallery Page" variant="section">
            <GalleryPage
              galleryItems={gallery}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}

        {activePage === 'contact' && (
          <ErrorBoundary name="Contact Page" variant="section">
            <ContactPage
              schoolInfo={schoolInfo}
              onNavigate={navigateToPage}
            />
          </ErrorBoundary>
        )}
      </main>

      {/* Main Footer */}
      <ErrorBoundary name="Footer" variant="card">
        <Footer
          schoolInfo={schoolInfo}
          onNavigate={navigateToPage}
        />
      </ErrorBoundary>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary name="Little Star School of Learning" variant="fullscreen">
      <AuthProvider>
        <SchoolApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}
