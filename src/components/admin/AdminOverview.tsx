import React from 'react';
import {
  Users,
  FileText,
  Bell,
  Camera,
  Calendar,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone
} from 'lucide-react';
import {
  EnquirySubmission,
  NoticeItem,
  StudentResource,
  GalleryItem,
  SchoolEvent,
  HeroSlide,
  SchoolInfo
} from '../../types';

interface AdminOverviewProps {
  enquiries: EnquirySubmission[];
  notices: NoticeItem[];
  resources: StudentResource[];
  gallery: GalleryItem[];
  events: SchoolEvent[];
  slides: HeroSlide[];
  schoolInfo: SchoolInfo;
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  enquiries,
  notices,
  resources,
  gallery,
  events,
  slides,
  schoolInfo,
  onNavigateTab
}) => {
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const publishedNoticesCount = notices.filter(n => n.enabled).length;
  const activeResourcesCount = resources.filter(r => r.enabled).length;
  const activeSlidesCount = slides.filter(s => s.enabled).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>School Content Management System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Welcome, Little Star Administration
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Manage school announcements, class-wise student resources, admission enquiries, hero slides, and academic information in real-time. Changes update the public website immediately.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Enquiries Card */}
        <div
          id="metric-card-enquiries"
          onClick={() => onNavigateTab('enquiries')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admission Enquiries</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{enquiries.length}</span>
            {newEnquiriesCount > 0 && (
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {newEnquiriesCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>Manage submissions</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
          </p>
        </div>

        {/* Student Resources Card */}
        <div
          id="metric-card-resources"
          onClick={() => onNavigateTab('resources')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Resources</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{resources.length}</span>
            <span className="text-xs font-semibold text-slate-500">Documents</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>Syllabi & Date sheets</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
          </p>
        </div>

        {/* Notice Board Card */}
        <div
          id="metric-card-notices"
          onClick={() => onNavigateTab('notices')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Published Circulars</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{publishedNoticesCount}</span>
            <span className="text-xs font-semibold text-slate-500">Active</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>Notice board updates</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
          </p>
        </div>

        {/* Gallery & Events Card */}
        <div
          id="metric-card-gallery"
          onClick={() => onNavigateTab('gallery')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Photos & Events</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{gallery.length}</span>
            <span className="text-xs font-semibold text-slate-500">Photos • {events.length} Events</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>Campus media</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-500" />
          </p>
        </div>
      </div>

      {/* Two Column Grid: Recent Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Recent Admission Enquiries</h3>
              <p className="text-xs text-slate-500">Submissions received from parents and prospective students</p>
            </div>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 underline"
            >
              View All ({enquiries.length})
            </button>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 5).map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <strong className="text-sm font-bold text-slate-900">{enquiry.parentName}</strong>
                    <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold">
                      {enquiry.classGrade}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      enquiry.status === 'New'
                        ? 'bg-red-100 text-red-800'
                        : enquiry.status === 'Contacted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {enquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    Student: <span className="font-medium text-slate-800">{enquiry.studentName}</span> | Phone: {enquiry.phone}
                  </p>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="p-2 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-semibold flex items-center space-x-1"
                    title="Call parent"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <button
                    onClick={() => onNavigateTab('enquiries')}
                    className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}

            {enquiries.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-xs">
                No admission enquiries received yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Quick Management Tasks</h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('resources')}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-200 border border-slate-100 transition-all flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <span>+ Upload New Student Document</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </button>

              <button
                onClick={() => onNavigateTab('notices')}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-100 transition-all flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <span>+ Publish Official Notice / Circular</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </button>

              <button
                onClick={() => onNavigateTab('hero')}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-100 transition-all flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <span>Edit Hero Admissions Carousel</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>

              <button
                onClick={() => onNavigateTab('principal')}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-100 transition-all flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <span>Update Principal’s Message</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
              </button>

              <button
                onClick={() => onNavigateTab('gallery')}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-100 transition-all flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <span>+ Add Photos to School Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
              </button>
            </div>
          </div>

          {/* School Contact Reference */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              School Details Reference
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p><strong className="text-white">Principal:</strong> {schoolInfo.principalName}</p>
              <p><strong className="text-white">Helpline:</strong> {schoolInfo.phone}</p>
              <p><strong className="text-white">Campus:</strong> {schoolInfo.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
