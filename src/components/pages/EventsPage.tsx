import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Search,
  X,
  CalendarCheck2
} from 'lucide-react';
import { SchoolEvent } from '../../types';

interface EventsPageProps {
  events: SchoolEvent[];
  onNavigate?: (pageId: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      if (!ev.enabled) return false;
      const matchesTab = tab === 'upcoming' ? ev.isUpcoming : !ev.isUpcoming;
      if (!matchesTab) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = ev.title.toLowerCase().includes(q);
        const matchDesc = ev.description.toLowerCase().includes(q);
        const matchLoc = (ev.location || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc) return false;
      }
      return true;
    });
  }, [events, tab, searchQuery]);

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Page Hero Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Calendar & Activities</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
              School Events & Celebrations
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Discover upcoming academic seminars, annual athletic meets, science exhibitions, national festivals, and parent-teacher meetings in Batpora.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Tabs & Filter Bar */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Upcoming vs Past Toggle */}
            <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl w-full md:w-auto">
              <button
                id="events-page-upcoming-tab"
                onClick={() => setTab('upcoming')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  tab === 'upcoming'
                    ? 'bg-slate-900 text-amber-400 shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upcoming Events
              </button>
              <button
                id="events-page-past-tab"
                onClick={() => setTab('past')}
                className={`flex-1 md:flex-initial px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  tab === 'past'
                    ? 'bg-slate-900 text-amber-400 shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Past Event Highlights
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="search-events-input"
                type="text"
                placeholder="Search events by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((item) => (
                <div
                  key={item.id}
                  id={`event-page-card-${item.id}`}
                  onClick={() => setSelectedEvent(item)}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {item.imageUrl ? (
                      <div className="h-52 w-full overflow-hidden relative bg-slate-200">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                          {item.eventDate}
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 pb-0">
                        <span className="inline-block bg-slate-900 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                          {item.eventDate}
                        </span>
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-amber-700 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-2">
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                      {item.eventTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{item.eventTime}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{item.location || 'School Campus'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
                <CalendarCheck2 className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 font-display">No events found</h3>
                <p className="text-xs text-slate-500">Check the other tab or modify your search query.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-slate-900 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                  {selectedEvent.eventDate}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display mt-3">
                  {selectedEvent.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedEvent.imageUrl && (
              <div className="h-60 w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {selectedEvent.description}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-100 p-4 rounded-2xl text-slate-700">
              <div>
                <strong className="block text-slate-900">Timing:</strong>
                <span>{selectedEvent.eventTime || 'Full Day'}</span>
              </div>
              <div>
                <strong className="block text-slate-900">Location:</strong>
                <span>{selectedEvent.location || 'Main Campus, Batpora'}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="bg-slate-900 text-amber-400 font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
