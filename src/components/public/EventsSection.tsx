import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { SchoolEvent } from '../../types';

interface EventsSectionProps {
  events: SchoolEvent[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const filteredEvents = events.filter((ev) => {
    return tab === 'upcoming' ? ev.isUpcoming : !ev.isUpcoming;
  });

  return (
    <section id="events" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300/80 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Campus Life & Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              School Events & Activities
            </h2>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl self-start md:self-auto">
            <button
              id="events-tab-upcoming"
              onClick={() => setTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                tab === 'upcoming'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              id="events-tab-past"
              onClick={() => setTab('past')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                tab === 'past'
                  ? 'bg-slate-900 text-amber-400 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past Highlights
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((item) => (
              <div
                key={item.id}
                id={`event-card-${item.id}`}
                className="bg-slate-50 rounded-3xl border border-slate-200/90 overflow-hidden hover:border-amber-400 hover:shadow-lg transition-all flex flex-col group"
              >
                {/* Image if available */}
                {item.imageUrl && (
                  <div className="h-48 w-full overflow-hidden relative bg-slate-200">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                      {item.eventDate}
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {!item.imageUrl && (
                      <span className="inline-block bg-slate-900 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                        {item.eventDate}
                      </span>
                    )}

                    <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs text-slate-500">
                    {item.eventTime && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{item.eventTime}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-slate-50 rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto">
              <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 mb-1">No events scheduled</h4>
              <p className="text-xs text-slate-500">
                New school activities and functions will be updated soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
