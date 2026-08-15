import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Edit2, Clock, MapPin, X, Loader2 } from 'lucide-react';
import { SchoolEvent } from '../../types';
import { saveEvent, deleteEvent } from '../../lib/schoolDataService';
import { uploadFileToStorage } from '../../lib/storageHelper';

interface AdminEventsProps {
  events: SchoolEvent[];
}

export const AdminEvents: React.FC<AdminEventsProps> = ({ events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SchoolEvent | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('March 25, 2026');
  const [eventTime, setEventTime] = useState('10:00 AM – 2:00 PM');
  const [location, setLocation] = useState('School Main Auditorium, Batpora');
  const [imageUrl, setImageUrl] = useState('');
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditingEvent(null);
    setTitle('');
    setDescription('');
    setEventDate('March 25, 2026');
    setEventTime('10:00 AM – 2:00 PM');
    setLocation('School Main Auditorium, Batpora');
    setImageUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80');
    setIsUpcoming(true);
    setEnabled(true);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (ev: SchoolEvent) => {
    setEditingEvent(ev);
    setTitle(ev.title);
    setDescription(ev.description);
    setEventDate(ev.eventDate);
    setEventTime(ev.eventTime || '');
    setLocation(ev.location || '');
    setImageUrl(ev.imageUrl || '');
    setIsUpcoming(ev.isUpcoming);
    setEnabled(ev.enabled);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalImg = imageUrl;
      if (selectedFile) {
        const res = await uploadFileToStorage(selectedFile, 'event_images');
        finalImg = res.downloadUrl;
      }

      await saveEvent({
        ...(editingEvent?.id ? { id: editingEvent.id } : {}),
        title: title.trim(),
        description: description.trim(),
        eventDate: eventDate.trim(),
        eventTime: eventTime.trim(),
        location: location.trim(),
        imageUrl: finalImg || undefined,
        isUpcoming,
        enabled
      });

      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save event:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this event?')) {
      await deleteEvent(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">School Events & Activities</h2>
          <p className="text-xs text-slate-500">
            Publish upcoming cultural events, sports meets, parent orientations, and science exhibitions.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            {ev.imageUrl && (
              <div className="h-40 bg-slate-100 overflow-hidden relative">
                <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-slate-900 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {ev.eventDate}
                </span>
              </div>
            )}

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">{ev.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">{ev.description}</p>
                {ev.location && (
                  <p className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{ev.location}</span>
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  ev.isUpcoming ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                }`}>
                  {ev.isUpcoming ? 'Upcoming' : 'Past'}
                </span>

                <div className="space-x-1">
                  <button
                    onClick={() => openEdit(ev)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
              {editingEvent ? 'Edit School Event' : 'Create School Event'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Title *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date (Display Text)</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700">Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-amber-400 cursor-pointer"
                />
                <input
                  type="url"
                  placeholder="Or enter Image URL: https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
              </div>

              <div className="flex space-x-4 pt-1">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUpcoming}
                    onChange={(e) => setIsUpcoming(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded cursor-pointer"
                  />
                  <span>Upcoming Event</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="w-4 h-4 text-emerald-500 rounded cursor-pointer"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 text-xs rounded-xl cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
