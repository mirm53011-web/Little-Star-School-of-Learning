import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Download,
  Search,
  Upload,
  Check,
  X,
  Layers,
  Calendar,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  StudentResource,
  ClassGrade,
  ResourceCategory,
  ALL_CLASSES,
  RESOURCE_CATEGORIES
} from '../../types';
import { saveResource, deleteResource } from '../../lib/schoolDataService';
import { uploadFileToStorage, formatBytes, getFileTypeFromName } from '../../lib/storageHelper';
import { HorizontalProgressBar, ActionButtonProgress } from '../common/HorizontalProgressBar';

interface AdminResourcesProps {
  resources: StudentResource[];
}

export const AdminResources: React.FC<AdminResourcesProps> = ({ resources }) => {
  const [selectedClass, setSelectedClass] = useState<ClassGrade | 'All Classes'>('All Classes');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All Categories'>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<StudentResource | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classGrade, setClassGrade] = useState<ClassGrade>('Class 10');
  const [category, setCategory] = useState<ResourceCategory>('Date Sheets');
  const [academicSession, setAcademicSession] = useState('2026–2027');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('PDF');
  const [fileSize, setFileSize] = useState('350 KB');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [enabled, setEnabled] = useState(true);

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingResource(null);
    setTitle('');
    setDescription('');
    setClassGrade('Class 10');
    setCategory('Date Sheets');
    setAcademicSession('2026–2027');
    setFileUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
    setFileName('Sample_Document.pdf');
    setFileType('PDF');
    setFileSize('350 KB');
    setPublishDate(new Date().toISOString().split('T')[0]);
    setEnabled(true);
    setSelectedFile(null);
    setUploadProgress(null);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (res: StudentResource) => {
    setEditingResource(res);
    setTitle(res.title);
    setDescription(res.description || '');
    setClassGrade(res.classGrade);
    setCategory(res.category);
    setAcademicSession(res.academicSession || '2026–2027');
    setFileUrl(res.fileUrl);
    setFileName(res.fileName);
    setFileType(res.fileType || 'PDF');
    setFileSize(res.fileSize || '350 KB');
    setPublishDate(res.publishDate || new Date().toISOString().split('T')[0]);
    setEnabled(res.enabled);
    setSelectedFile(null);
    setUploadProgress(null);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      setFileType(getFileTypeFromName(file.name));
      setFileSize(formatBytes(file.size));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Please provide a resource title.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    try {
      let finalFileUrl = fileUrl;
      let finalFileName = fileName;
      let finalFileSize = fileSize;
      let finalFileType = fileType;

      if (selectedFile) {
        setUploadProgress(10);
        const uploadResult = await uploadFileToStorage(selectedFile, 'student_resources', (prog) => {
          setUploadProgress(prog);
        });
        finalFileUrl = uploadResult.downloadUrl;
        finalFileName = uploadResult.fileName;
        finalFileSize = uploadResult.fileSize;
        finalFileType = uploadResult.fileType;
      }

      await saveResource({
        ...(editingResource?.id ? { id: editingResource.id } : {}),
        title: title.trim(),
        description: description.trim(),
        classGrade,
        category,
        academicSession: academicSession.trim(),
        fileUrl: finalFileUrl,
        fileName: finalFileName,
        fileType: finalFileType,
        fileSize: finalFileSize,
        publishDate,
        downloadCount: editingResource?.downloadCount || 0,
        enabled
      });

      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Failed to save resource:', err);
      setErrorMessage('Failed to save document. Please check connection.');
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource document?')) {
      try {
        await deleteResource(id);
      } catch (err) {
        console.error('Failed to delete resource:', err);
      }
    }
  };

  const handleToggleEnable = async (res: StudentResource) => {
    try {
      await saveResource({
        ...res,
        enabled: !res.enabled
      });
    } catch (err) {
      console.error('Failed to toggle resource:', err);
    }
  };

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      if (selectedClass !== 'All Classes' && res.classGrade !== selectedClass) return false;
      if (selectedCategory !== 'All Categories' && res.category !== selectedCategory) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        if (!res.title.toLowerCase().includes(q) && !res.description?.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [resources, selectedClass, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Student Resources & Document Management
          </h2>
          <p className="text-xs text-slate-500">
            Upload and manage class-wise syllabi, examination date sheets, worksheets, and holiday homework.
          </p>
        </div>

        <button
          id="admin-add-resource-btn"
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Filter Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
          >
            {ALL_CLASSES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Filter Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
          >
            <option value="All Categories">All Categories</option>
            {RESOURCE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Search</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Table list */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
              <tr>
                <th className="p-4">Document Title</th>
                <th className="p-4">Class</th>
                <th className="p-4">Category</th>
                <th className="p-4">Session</th>
                <th className="p-4">File Info</th>
                <th className="p-4">Published</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResources.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 max-w-[200px]">
                    <div className="truncate">{res.title}</div>
                    {res.description && (
                      <div className="text-[11px] text-slate-400 truncate">{res.description}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                      {res.classGrade}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-600 truncate max-w-[150px]">
                    {res.category}
                  </td>
                  <td className="p-4 text-slate-600">{res.academicSession}</td>
                  <td className="p-4">
                    <span className="bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded mr-1">
                      {res.fileType || 'PDF'}
                    </span>
                    <span className="text-slate-400">{res.fileSize}</span>
                  </td>
                  <td className="p-4 text-slate-500">{res.publishDate}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleEnable(res)}
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        res.enabled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {res.enabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{res.enabled ? 'Published' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(res)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(res.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredResources.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400 text-xs">
                    No resources found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {editingResource ? 'Edit Student Resource' : 'Upload New Student Document'}
              </h3>
              <p className="text-xs text-slate-500">
                Configure syllabus, date sheet, homework, or exam guidelines.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade *</label>
                  <select
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  >
                    {ALL_CLASSES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  >
                    {RESOURCE_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Mathematics Syllabus & Blueprint"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Additional notes, unit details or teacher instructions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Session</label>
                  <input
                    type="text"
                    value={academicSession}
                    onChange={(e) => setAcademicSession(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* File Upload / Storage Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload File (PDF / Word / Document)</label>
                
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.png"
                  onChange={handleFileChange}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-amber-400 hover:file:bg-slate-800 cursor-pointer"
                />

                {selectedFile && (
                  <div className="text-xs text-emerald-700 font-medium flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Selected: {selectedFile.name} ({formatBytes(selectedFile.size)})</span>
                  </div>
                )}

                <div className="text-[11px] text-slate-400">
                  Or use Direct/Fallback URL:
                </div>
                <input
                  type="url"
                  placeholder="https://..."
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />

                {uploadProgress !== null && (
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Enabled toggle */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  id="resource-enabled-chk"
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="resource-enabled-chk" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Publish resource immediately for students & parents
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow cursor-pointer disabled:opacity-50 transition-all"
                >
                  {saving ? (
                    <ActionButtonProgress label="Saving Document..." />
                  ) : (
                    <span>{editingResource ? 'Update Document' : 'Publish Document'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
