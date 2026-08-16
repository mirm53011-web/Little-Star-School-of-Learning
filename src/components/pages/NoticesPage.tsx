import React, { useState, useMemo } from 'react';
import {
  Bell,
  Pin,
  AlertCircle,
  Calendar,
  ChevronRight,
  Download,
  Search,
  FileText,
  X,
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';
import { NoticeItem } from '../../types';

interface NoticesPageProps {
  notices: NoticeItem[];
  onNavigate?: (pageId: string) => void;
}

export const NoticesPage: React.FC<NoticesPageProps> = ({ notices }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);

  const categories = ['All', 'Urgent', 'Exam', 'Admission', 'Academic', 'Holiday'];

  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      if (!n.enabled) return false;
      if (selectedCategory === 'Urgent') {
        if (!n.isUrgent) return false;
      } else if (selectedCategory !== 'All' && n.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = n.title.toLowerCase().includes(q);
        const matchContent = n.content.toLowerCase().includes(q);
        if (!matchTitle && !matchContent) return false;
      }
      return true;
    });
  }, [notices, selectedCategory, searchQuery]);

  // Urgent pinned notices banner
  const urgentPinnedNotices = notices.filter(n => n.enabled && (n.isPinned || n.isUrgent));

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Hero Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Announcements</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              School Notice Board & Circulars
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Real-time administrative notices, examination guidelines, admission announcements, and holiday declarations from Little Star School of Learning.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Pinned Urgent Notices Top Callout */}
      {urgentPinnedNotices.length > 0 && (
        <section className="bg-amber-50 border-b border-amber-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 text-xs sm:text-sm text-amber-900 font-medium">
              <span className="bg-rose-600 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider flex items-center space-x-1 flex-shrink-0 animate-pulse">
                <span>🔥 URGENT</span>
              </span>
              <span className="truncate flex-1">
                <strong>{urgentPinnedNotices[0].title}:</strong> {urgentPinnedNotices[0].content.slice(0, 90)}...
              </span>
              <button
                onClick={() => setActiveNotice(urgentPinnedNotices[0])}
                className="text-amber-800 hover:text-amber-950 font-bold underline flex-shrink-0"
              >
                Read Details
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. Filters & Search Bar */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`notice-page-cat-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-amber-400 shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'Urgent' ? '🔥 Urgent' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="search-notices-input"
                type="text"
                placeholder="Search circulars by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>
          </div>

          {/* Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  id={`notice-card-${notice.id}`}
                  onClick={() => setActiveNotice(notice)}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        {notice.isPinned && (
                          <span className="flex items-center space-x-1 bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md">
                            <Pin className="w-3 h-3 fill-current" />
                            <span>PINNED</span>
                          </span>
                        )}
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                          notice.isUrgent
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {notice.category}
                        </span>
                      </div>

                      <span className="text-xs text-slate-400 flex items-center space-x-1 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{notice.publishDate}</span>
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg font-display group-hover:text-amber-700 transition-colors leading-snug">
                      {notice.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {notice.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                    <span>Read Full Circular</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
                <Bell className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 font-display">No notices match your selection</h3>
                <p className="text-xs text-slate-500">Try changing your category filter or clearing your search keywords.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full Notice Modal Viewer */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {activeNotice.isPinned && (
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">
                      PINNED
                    </span>
                  )}
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded">
                    {activeNotice.category}
                  </span>
                  <span className="text-xs text-slate-400">Date: {activeNotice.publishDate}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display pt-2">
                  {activeNotice.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveNotice(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
              {activeNotice.content}
            </div>

            {activeNotice.attachmentUrl && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-amber-700" />
                  <div>
                    <strong className="block text-xs font-bold text-slate-900">
                      {activeNotice.attachmentName || 'Official Circular Attachment'}
                    </strong>
                    <span className="text-[11px] text-slate-500">PDF / Document</span>
                  </div>
                </div>
                <a
                  href={activeNotice.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveNotice(null)}
                className="bg-slate-900 text-amber-400 font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                Close Circular
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
