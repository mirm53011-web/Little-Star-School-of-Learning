import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Award,
  BookOpen,
  GraduationCap,
  FileText,
  Bell,
  Calendar,
  Camera,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Star,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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
} from '../../types';

import { AdminOverview } from './AdminOverview';
import { AdminHeroSlides } from './AdminHeroSlides';
import { AdminAboutPrincipal } from './AdminAboutPrincipal';
import { AdminAcademics } from './AdminAcademics';
import { AdminAdmissions } from './AdminAdmissions';
import { AdminResources } from './AdminResources';
import { AdminNotices } from './AdminNotices';
import { AdminEvents } from './AdminEvents';
import { AdminGallery } from './AdminGallery';
import { AdminEnquiries } from './AdminEnquiries';
import { AdminSettings } from './AdminSettings';
import { AdminAccountSecurity } from './AdminAccountSecurity';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface AdminDashboardProps {
  schoolInfo: SchoolInfo;
  heroSlides: HeroSlide[];
  academics: AcademicLevel[];
  admissions: AdmissionInfo;
  resources: StudentResource[];
  notices: NoticeItem[];
  events: SchoolEvent[];
  gallery: GalleryItem[];
  enquiries: EnquirySubmission[];
  onBackToWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  schoolInfo,
  heroSlides,
  academics,
  admissions,
  resources,
  notices,
  events,
  gallery,
  enquiries,
  onBackToWebsite
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const activeNoticesCount = notices.filter(n => n.enabled).length;
  const activeResourcesCount = resources.filter(r => r.enabled).length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'enquiries', label: 'Admission Enquiries', icon: Users, badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : undefined, badgeColor: 'bg-red-500 text-white' },
    { id: 'resources', label: 'Student Resources', icon: FileText, badge: `${activeResourcesCount}`, badgeColor: 'bg-blue-600/20 text-blue-300' },
    { id: 'notices', label: 'Notices & Circulars', icon: Bell, badge: `${activeNoticesCount}`, badgeColor: 'bg-emerald-600/20 text-emerald-300' },
    { id: 'hero', label: 'Hero Slides Carousel', icon: Sparkles },
    { id: 'principal', label: 'About & Principal Msg', icon: Award },
    { id: 'academics', label: 'Academic Levels', icon: GraduationCap },
    { id: 'admissions', label: 'Admissions Info', icon: BookOpen },
    { id: 'events', label: 'School Events', icon: Calendar },
    { id: 'gallery', label: 'Photo Gallery', icon: Camera },
    { id: 'settings', label: 'School Profile & Contact', icon: Settings },
    { id: 'security', label: 'Account & Security', icon: ShieldCheck },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800">
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950">
            <Star className="w-4 h-4 fill-slate-950" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight font-display">Little Star Admin</h1>
            <p className="text-[10px] text-amber-400">CMS • Batpora</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onBackToWebsite}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Site</span>
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800/80 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <Star className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base leading-tight font-display">
                Little Star
              </h2>
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Management Portal
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="truncate">
              <p className="text-[11px] text-slate-400">Authenticated Admin</p>
              <p className="text-xs font-bold text-white truncate">{user?.email || 'admin@littlestar.edu'}</p>
            </div>
          </div>
        </div>

        {/* Nav Items List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-slate-950 text-amber-400' : item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            id="view-public-site-btn"
            onClick={onBackToWebsite}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors border border-slate-800"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Public Website</span>
          </button>

          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-950 text-red-400 hover:text-red-300 text-xs font-bold transition-colors border border-red-900/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Administrative Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar for Desktop */}
        <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-4 items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h1 className="text-lg font-bold text-slate-900 font-display">
              {navItems.find(i => i.id === activeTab)?.label || 'Administration'}
            </h1>
            <p className="text-xs text-slate-500">
              {schoolInfo.name} • {schoolInfo.location}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Firebase Cloud Live</span>
            </div>

            <button
              onClick={onBackToWebsite}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Website</span>
            </button>
          </div>
        </header>

        {/* Tab Content Container */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          <ErrorBoundary
            key={activeTab}
            name={`Admin: ${navItems.find(i => i.id === activeTab)?.label || 'Module'}`}
            variant="section"
          >
            {activeTab === 'overview' && (
              <AdminOverview
                enquiries={enquiries}
                notices={notices}
                resources={resources}
                gallery={gallery}
                events={events}
                slides={heroSlides}
                schoolInfo={schoolInfo}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'hero' && <AdminHeroSlides slides={heroSlides} />}
            {activeTab === 'principal' && <AdminAboutPrincipal schoolInfo={schoolInfo} />}
            {activeTab === 'academics' && <AdminAcademics levels={academics} />}
            {activeTab === 'admissions' && <AdminAdmissions admissionsInfo={admissions} />}
            {activeTab === 'resources' && <AdminResources resources={resources} />}
            {activeTab === 'notices' && <AdminNotices notices={notices} />}
            {activeTab === 'events' && <AdminEvents events={events} />}
            {activeTab === 'gallery' && <AdminGallery gallery={gallery} />}
            {activeTab === 'enquiries' && <AdminEnquiries enquiries={enquiries} />}
            {activeTab === 'settings' && <AdminSettings schoolInfo={schoolInfo} />}
            {activeTab === 'security' && <AdminAccountSecurity />}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};
