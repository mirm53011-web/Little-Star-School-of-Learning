import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  Edit2,
  Pin,
  AlertCircle,
  Calendar,
  X,
  Eye,
  EyeOff,
  Download
} from 'lucide-react';
import { NoticeItem } from '../../types';
import { saveNotice, deleteNotice } from '../../lib/schoolDataService';
import { uploadFileToStorage } from '../../lib/storageHelper';
import { HorizontalProgressBar, ActionButtonProgress } from '../common/HorizontalProgressBar';

interface AdminNoticesProps {
  notices: NoticeItem[];
}

export const AdminNotices: React.FC<AdminNoticesProps> = ({ notices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<NoticeItem['category']>('General');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPinned, setIsPinned] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [enabled, setEnabled] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openCreate = () => {
    setEditingNotice(null);
    setTitle('');
    setContent('');
    setCategory('General');
    setPublishDate(new Date().toISOString().split('T')[0]);
    setIsPinned(false);
    setIsUrgent(false);
    setAttachmentUrl('');
    setAttachmentName('');
    setEnabled(true);
    setSelectedFile(null);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEdit = (n: NoticeItem) => {
    setEditingNotice(n);
    setTitle(n.title);
    setContent(n.content);
    setCategory(n.category);
    setPublishDate(n.publishDate);
    setIsPinned(n.isPinned);
    setIsUrgent(n.isUrgent);
    setAttachmentUrl(n.attachmentUrl || '');
    setAttachmentName(n.attachmentName || '');
    setEnabled(n.enabled);
    setSelectedFile(null);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    try {
      let finalAttachmentUrl = attachmentUrl;
      let finalAttachmentName = attachmentName;

      if (selectedFile) {
        const uploadResult = await uploadFileToStorage(selectedFile, 'notice_attachments');
        finalAttachmentUrl = uploadResult.downloadUrl;
        finalAttachmentName = uploadResult.fileName;
      }

      await saveNotice({
        ...(editingNotice?.id ? { id: editingNotice.id } : {}),
        title: title.trim(),
        content: content.trim(),
        category,
        publishDate,
        isPinned,
        isUrgent,
        attachmentUrl: finalAttachmentUrl || undefined,
        attachmentName: finalAttachmentName || undefined,
        enabled
      });

      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Failed to save notice:', err);
      setErrorMessage(err?.message || 'Failed to save notice circular.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice circular?')) {
      await deleteNotice(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Notice Board & Official Circulars</h2>
          <p className="text-xs text-slate-500">
            Publish circulars, pin emergency notices, and attach PDF official orders for parents and staff.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Circular</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {notices.map((n) => (
          <div
            key={n.id}
            className={`bg-white rounded-3xl p-6 border shadow-sm flex flex-col justify-between space-y-4 ${
              n.isPinned ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  {n.isPinned && (
                    <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] flex items-center space-x-1">
                      <Pin className="w-3 h-3 fill-current" />
                      <span>Pinned</span>
                    </span>
                  )}
                  {n.isUrgent && (
                    <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                      Urgent
                    </span>
                  )}
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {n.category}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{n.publishDate}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-display">{n.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed whitespace-pre-line">
                {n.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                n.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
              }`}>
                {n.enabled ? 'Published' : 'Hidden'}
              </span>

              <div className="space-x-1">
                <button
                  onClick={() => openEdit(n)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 font-display">
              {editingNotice ? 'Edit Circular Notice' : 'Post Official School Notice'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="General">General</option>
                    <option value="Exam">Exam</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Admission">Admission</option>
                    <option value="Academic">Academic</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Content / Body *</label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 leading-relaxed"
                />
              </div>

              {/* Attachment file */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700">Attach Document / PDF (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                      setAttachmentName(e.target.files[0].name);
                    }
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-amber-400 cursor-pointer"
                />
                <input
                  type="url"
                  placeholder="Or enter Attachment URL: https://..."
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded cursor-pointer"
                  />
                  <span>Pin to top of Notice Board</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="w-4 h-4 text-red-500 rounded cursor-pointer"
                  />
                  <span>Mark as Urgent Notice</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="w-4 h-4 text-emerald-500 rounded cursor-pointer"
                  />
                  <span>Publish Notice</span>
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 text-xs rounded-xl cursor-pointer disabled:opacity-50 flex items-center space-x-1.5 transition-all"
                >
                  {saving ? (
                    <ActionButtonProgress label="Saving..." />
                  ) : (
                    <span>Save Circular</span>
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
