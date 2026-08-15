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
  FolderOpen
} from 'lucide-react';
import {
  StudentResource,
  ClassGrade,
  ResourceCategory,
  ALL_CLASSES,
  RESOURCE_CATEGORIES
} from '../../types';
import { incrementResourceDownload } from '../../lib/schoolDataService';

interface StudentResourcesSectionProps {
  resources: StudentResource[];
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

export const StudentResourcesSection: React.FC<StudentResourcesSectionProps> = ({ resources }) => {
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

      // Academic Session matching
      if (selectedSession !== 'All Sessions' && res.academicSession !== selectedSession) {
        return false;
      }

      // Text search matching
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = res.title.toLowerCase().includes(q);
        const matchDesc = res.description?.toLowerCase().includes(q) || false;
        const matchClass = res.classGrade.toLowerCase().includes(q);
        const matchCat = res.category.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchClass && !matchCat) return false;
      }

      return true;
    });
  }, [resources, selectedClass, selectedCategory, selectedSession, searchQuery]);

  const handleDownload = async (resource: StudentResource) => {
    try {
      await incrementResourceDownload(resource.id);
    } catch (e) {
      console.warn('Failed to increment download counter:', e);
    }

    // Trigger file download
    if (resource.fileUrl.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = resource.fileUrl;
      a.download = resource.fileName || `${resource.title}.${resource.fileType.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(resource.fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const resetFilters = () => {
    setSelectedClass('All Classes');
    setSelectedCategory('All Categories');
    setSelectedSession('All Sessions');
    setSearchQuery('');
  };

  return (
    <section id="resources" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Digital Student Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight mb-4">
            Student Resources & Downloads
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Select your class below to instantly access and download syllabus blueprints, date sheets, holiday homework, exam guidelines, and practice worksheets.
          </p>
        </div>

        {/* Quick Class Selection Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Select Your Class / Grade:</span>
            </span>
            {selectedClass !== 'All Classes' && (
              <button
                onClick={() => setSelectedClass('All Classes')}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Clear Class Filter
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/40">
            {ALL_CLASSES.map((cls) => {
              const isSelected = selectedClass === cls;
              return (
                <button
                  key={cls}
                  id={`class-pill-${cls.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedClass(cls as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 ring-2 ring-amber-400'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80'
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Filter Toolbar & Search */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl mb-8 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Class Dropdown */}
            <div>
              <label htmlFor="resource-class-select" className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                1. Class Filter
              </label>
              <select
                id="resource-class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              >
                {ALL_CLASSES.map((cls) => (
                  <option key={cls} value={cls} className="bg-slate-900 text-white">
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="resource-category-select" className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                2. Resource Category
              </label>
              <select
                id="resource-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              >
                <option value="All Categories" className="bg-slate-900 text-white">All Categories</option>
                {RESOURCE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Session */}
            <div>
              <label htmlFor="resource-session-select" className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                3. Academic Session
              </label>
              <select
                id="resource-session-select"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              >
                {availableSessions.map((ses) => (
                  <option key={ses} value={ses} className="bg-slate-900 text-white">
                    {ses}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div>
              <label htmlFor="resource-search-input" className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                Search Document
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="resource-search-input"
                  type="text"
                  placeholder="Search syllabus, date sheet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Active Summary & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-700/60 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="text-slate-300">Showing:</span>
              <span className="text-amber-400 font-semibold">{filteredResources.length} documents</span>
              {(selectedClass !== 'All Classes' || selectedCategory !== 'All Categories' || selectedSession !== 'All Sessions' || searchQuery !== '') && (
                <span className="text-slate-500">| Filters applied: {selectedClass !== 'All Classes' ? selectedClass : ''} {selectedCategory !== 'All Categories' ? `• ${selectedCategory}` : ''}</span>
              )}
            </div>

            {(selectedClass !== 'All Classes' || selectedCategory !== 'All Categories' || selectedSession !== 'All Sessions' || searchQuery !== '') && (
              <button
                id="reset-resource-filters-btn"
                onClick={resetFilters}
                className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                id={`resource-card-${item.id}`}
                className="bg-slate-800/85 border border-slate-700/80 rounded-2xl p-5 hover:border-amber-400/60 hover:bg-slate-800 transition-all flex flex-col justify-between shadow-lg group"
              >
                <div className="space-y-3">
                  {/* Category & Class Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {item.classGrade}
                    </span>
                    <span className="text-slate-400 text-[11px] font-semibold flex items-center space-x-1">
                      <Layers className="w-3 h-3 text-slate-500" />
                      <span className="truncate max-w-[140px]">{item.category}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Metadata & Actions */}
                <div className="pt-4 mt-4 border-t border-slate-700/70 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{item.academicSession || '2026–2027'}</span>
                    </div>
                    <div className="flex items-center space-x-2 font-medium">
                      <span className="bg-slate-900 px-2 py-0.5 rounded text-amber-400 font-bold border border-slate-700 text-[10px]">
                        {item.fileType || 'PDF'}
                      </span>
                      <span>{item.fileSize || '350 KB'}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      id={`download-res-${item.id}`}
                      onClick={() => handleDownload(item)}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </button>

                    <button
                      id={`preview-res-${item.id}`}
                      onClick={() => setPreviewDoc(item)}
                      className="bg-slate-700 hover:bg-slate-600 text-white p-2.5 rounded-xl text-xs flex items-center justify-center transition-colors cursor-pointer"
                      title="Quick Details"
                      aria-label="Preview details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-12 text-center max-w-md mx-auto">
            <FolderOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No documents found</h3>
            <p className="text-xs text-slate-400 mb-4">
              No matching files found for {selectedClass !== 'All Classes' ? selectedClass : 'the selected filter'}.
            </p>
            <button
              onClick={resetFilters}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Details / Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setPreviewDoc(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <span className="bg-amber-500/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs">
                {previewDoc.classGrade}
              </span>
              <span className="text-slate-400 text-xs">{previewDoc.category}</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-display mb-2">{previewDoc.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {previewDoc.description || 'Official academic document issued by Little Star School of Learning.'}
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Academic Session:</span>
                <span className="font-semibold text-white">{previewDoc.academicSession}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">File Name:</span>
                <span className="font-semibold text-amber-300 truncate max-w-[200px]">{previewDoc.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">File Size:</span>
                <span>{previewDoc.fileSize} ({previewDoc.fileType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Published Date:</span>
                <span>{previewDoc.publishDate}</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => {
                  handleDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Document Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
