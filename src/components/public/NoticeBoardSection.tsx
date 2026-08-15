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
  Sparkles
} from 'lucide-react';
import { NoticeItem } from '../../types';

interface NoticeBoardSectionProps {
  notices: NoticeItem[];
}

export const NoticeBoardSection: React.FC<NoticeBoardSectionProps> = ({ notices }) => {
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

  return (
    <section id="notices" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Bell className="w-4 h-4 text-amber-600 animate-bounce" />
            <span>Official Announcements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            School Notice Board
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Stay updated with real-time circulars, academic notifications, examination schedules, and holiday announcements from the administration.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`notice-cat-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-amber-400 shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'Urgent' ? '🔥 Urgent' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="search-notices-input"
              type="text"
              placeholder="Search circulars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>
        </div>

        {/* Notice Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                id={`notice-card-${notice.id}`}
                className={`bg-white rounded-2xl p-6 border transition-all hover:shadow-md relative flex flex-col justify-between ${
                  notice.isPinned
                    ? 'border-amber-400/90 shadow-sm bg-gradient-to-br from-amber-50/30 to-white'
                    : 'border-slate-200/90'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      {notice.isPinned && (
                        <span className="flex items-center space-x-1 bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[11px] shadow-sm">
                          <Pin className="w-3 h-3 fill-current" />
                          <span>Pinned</span>
                        </span>
                      )}
                      {notice.isUrgent && (
                        <span className="flex items-center space-x-1 bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[11px] animate-pulse">
                          <AlertCircle className="w-3 h-3" />
                          <span>Urgent</span>
                        </span>
                      )}
                      <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                        {notice.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{notice.publishDate}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display line-clamp-2">
                    {notice.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    id={`read-notice-${notice.id}`}
                    onClick={() => setActiveNotice(notice)}
                    className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <span>Read Full Circular</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {notice.attachmentUrl && (
                    <a
                      href={notice.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Attachment</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto">
              <Bell className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 mb-1">No circulars found</h4>
              <p className="text-xs text-slate-500">There are no active notices matching your filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setActiveNotice(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <span className="bg-slate-900 text-amber-400 font-bold px-3 py-0.5 rounded text-xs">
                {activeNotice.category}
              </span>
              <span className="text-slate-400 text-xs flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published: {activeNotice.publishDate}</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-display leading-tight">
              {activeNotice.title}
            </h3>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto">
              {activeNotice.content}
            </div>

            {activeNotice.attachmentUrl && (
              <div className="pt-2">
                <a
                  href={activeNotice.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Attached Document ({activeNotice.attachmentName || 'Circular.pdf'})</span>
                </a>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveNotice(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
