import React, { useState, useMemo } from 'react';
import {
  FileText,
  Download,
  Search,
  Calendar,
  Layers,
  Sparkles,
  BookOpen,
  Eye,
  X,
  GraduationCap,
  ChevronRight,
  FolderOpen,
  Filter,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import {
  StudentResource,
  ClassGrade,
  ResourceCategory,
  ALL_CLASSES,
  RESOURCE_CATEGORIES
} from '../../types';
import { incrementResourceDownload } from '../../lib/schoolDataService';

interface StudentResourcesPageProps {
  resources: StudentResource[];
  onNavigate?: (pageId: string) => void;
}

// Normalize class names for robust matching between formats (e.g. Class 10 vs Grade X)
function normalizeClassKey(cls: string): string {
  const c = cls.trim().toLowerCase();
  const map: Record<string, string> = {
    'pre-nursery': 'nursery',
    'nursery': 'nursery',
    'class nursery': 'nursery',
    'lkg': 'lkg',
    'class lkg': 'lkg',
    'ukg': 'ukg',
    'class ukg': 'ukg',
    'class kg': 'ukg',
    'kg': 'ukg',
    'grade i': 'class 1',
    'class 1': 'class 1',
    'grade ii': 'class 2',
    'class 2': 'class 2',
    'grade iii': 'class 3',
    'class 3': 'class 3',
    'grade iv': 'class 4',
    'class 4': 'class 4',
    'grade v': 'class 5',
    'class 5': 'class 5',
    'grade vi': 'class 6',
    'class 6': 'class 6',
    'grade vii': 'class 7',
    'class 7': 'class 7',
    'grade viii': 'class 8',
    'class 8': 'class 8',
    'grade ix': 'class 9',
    'class 9': 'class 9',
    'grade x': 'class 10',
    'class 10': 'class 10',
    'grade xi': 'class 11',
    'class 11': 'class 11',
    'grade xii': 'class 12',
    'class 12': 'class 12',
    'all classes': 'all'
  };
  return map[c] || c;
}

export const StudentResourcesPage: React.FC<StudentResourcesPageProps> = ({ resources }) => {
  const [selectedClass, setSelectedClass] = useState<ClassGrade | 'All Classes'>('All Classes');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All Categories'>('All Categories');
  const [selectedSession, setSelectedSession] = useState<string>('All Sessions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewDoc, setPreviewDoc] = useState<StudentResource | null>(null);

  // Available academic sessions dynamically derived
  const availableSessions = useMemo(() => {
    const sessions = new Set<string>();
    resources.forEach(r => {
      if (r.academicSession) sessions.add(r.academicSession);
    });
    return ['All Sessions', ...Array.from(sessions)];
  }, [resources]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      if (!res.enabled) return false;

      // Class matching
      if (selectedClass !== 'All Classes') {
        const itemClassKey = normalizeClassKey(res.classGrade);
        const selectedClassKey = normalizeClassKey(selectedClass);
        if (itemClassKey !== 'all' && itemClassKey !== selectedClassKey) {
          return false;
        }
      }

      // Category matching
      if (selectedCategory !== 'All Categories' && res.category !== selectedCategory) {
        return false;
      }

      // Session matching
      if (selectedSession !== 'All Sessions' && res.academicSession !== selectedSession) {
        return false;
      }

      // Search matching (title, description, class, category)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = res.title.toLowerCase().includes(q);
        const matchDesc = (res.description || '').toLowerCase().includes(q);
        const matchClass = res.classGrade.toLowerCase().includes(q);
        const matchCategory = res.category.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchClass && !matchCategory) {
          return false;
        }
      }

      return true;
    });
  }, [resources, selectedClass, selectedCategory, selectedSession, searchQuery]);

  // Handle resource download action
  const handleDownload = (res: StudentResource) => {
    incrementResourceDownload(res.id);
    if (res.fileUrl) {
      window.open(res.fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const clearFilters = () => {
    setSelectedClass('All Classes');
    setSelectedCategory('All Categories');
    setSelectedSession('All Sessions');
    setSearchQuery('');
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Header Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/40 text-blue-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span>Student & Parent Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              Academic Resources & Downloads
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Instant digital access to official class-wise syllabi, date sheets, exam timetables, study materials, holiday homework, and academic circulars.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Class Selector Bar */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-[60px] sm:top-[70px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase text-slate-500 hidden sm:inline flex-shrink-0">
              Select Class:
            </span>
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 w-full">
              {(['All Classes', ...ALL_CLASSES] as (ClassGrade | 'All Classes')[]).map((cls) => {
                const isSelected = selectedClass === cls;
                return (
                  <button
                    key={cls}
                    id={`class-pill-${cls.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-amber-400 shadow-sm font-extrabold scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cls}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Tabs, Search Bar & Filters */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-2 py-1">
            {(['All Categories', ...RESOURCE_CATEGORIES] as (ResourceCategory | 'All Categories')[]).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`cat-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search, Session & Active Filter Summary Row */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="search-resources-input"
                type="text"
                placeholder="Search by subject, title, chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            {/* Academic Session Filter & Reset */}
            <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-semibold">Session:</span>
                <select
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
                >
                  {availableSessions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {(selectedClass !== 'All Classes' || selectedCategory !== 'All Categories' || selectedSession !== 'All Sessions' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((res) => (
                <div
                  key={res.id}
                  id={`resource-card-${res.id}`}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                        {res.classGrade}
                      </span>
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-lg">
                        {res.category}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                        {res.academicSession}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors line-clamp-2">
                        {res.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {res.description}
                      </p>
                    </div>

                    {/* Metadata Pill */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center space-x-1 bg-slate-100 px-2 py-0.5 rounded">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{res.publishDate || '2026'}</span>
                      </span>
                      {res.fileSize && (
                        <span className="bg-slate-100 px-2 py-0.5 rounded">
                          {res.fileSize}
                        </span>
                      )}
                      {res.downloadCount !== undefined && (
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                          {res.downloadCount} Downloads
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setPreviewDoc(res)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => handleDownload(res)}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 font-display">
                  No resources found matching criteria
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Try adjusting your class grade, category tab, or search query.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-slate-900 text-amber-400 font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Document Detail Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-scale-up">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                  {previewDoc.classGrade}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display mt-2">
                  {previewDoc.title}
                </h3>
                <span className="text-xs text-amber-700 font-bold uppercase">{previewDoc.category} • Session {previewDoc.academicSession}</span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed">{previewDoc.description}</p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Session: <strong>{previewDoc.academicSession}</strong></span>
                <span>Size: <strong>{previewDoc.fileSize || 'Standard Document'}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewDoc(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
