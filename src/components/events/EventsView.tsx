import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users2,
  Sparkles,
  Ticket,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { MOCK_KINGDOM_EVENTS } from '../../data/mockData';
import { KingdomEvent } from '../../types';

export const EventsView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [activeEventModal, setActiveEventModal] = useState<KingdomEvent | null>(null);

  const eventTypes = ['ALL', 'WORSHIP_NIGHT', 'CONFERENCE', 'WEBINAR', 'RETREAT'];

  const filteredEvents =
    selectedType === 'ALL'
      ? MOCK_KINGDOM_EVENTS
      : MOCK_KINGDOM_EVENTS.filter((e) => e.type === selectedType);

  const handleRegister = (event: KingdomEvent) => {
    if (!registeredEventIds.includes(event.id)) {
      setRegisteredEventIds([...registeredEventIds, event.id]);
    }
    setActiveEventModal(event);
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-950 p-6 sm:p-8">
        <div className="max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>Kingdom Events & Conferences</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Gathering the Saints Worldwide
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Hebrews 10:25 — "Not giving up meeting together, but encouraging one another." Register for global worship gatherings, revival conferences, and virtual webinars.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {eventTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              selectedType === type
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {type === 'ALL' ? 'All Gatherings' : type.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => {
          const isRegistered = registeredEventIds.includes(event.id);

          return (
            <div
              key={event.id}
              className="flex flex-col justify-between rounded-3xl bg-slate-900/60 p-6 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition shadow-xl"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
                  <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold text-amber-300">
                    {event.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.date} • {event.time}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100">{event.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-4 space-y-1 text-xs text-slate-400">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>{event.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users2 className="h-3.5 w-3.5 text-slate-500" />
                    <span>Organizer: {event.organizer}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  {event.isOnline ? '🌐 Virtual Stream' : '🏛️ On-site & Streamed'}
                </span>

                <button
                  onClick={() => handleRegister(event)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition ${
                    isRegistered
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  }`}
                >
                  <Ticket className="h-3.5 w-3.5" />
                  <span>{isRegistered ? 'Registered Pass' : 'Register Free'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket Pass Confirmation Modal */}
      {activeEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-amber-500/30 bg-slate-900 p-6 text-center space-y-4 shadow-2xl animate-in fade-in">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-100">
              Registration Confirmed!
            </h3>
            <p className="text-xs text-slate-300">
              You are officially registered for <span className="text-amber-400 font-semibold">{activeEventModal.title}</span>.
            </p>

            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-left text-xs space-y-1.5 font-mono">
              <p className="text-slate-400">DATE: <span className="text-slate-100">{activeEventModal.date}</span></p>
              <p className="text-slate-400">TIME: <span className="text-slate-100">{activeEventModal.time}</span></p>
              <p className="text-slate-400">VENUE: <span className="text-slate-100">{activeEventModal.location}</span></p>
              <p className="text-slate-400">PASS CODE: <span className="text-amber-400">ZIO-EVT-{activeEventModal.id.toUpperCase()}</span></p>
            </div>

            <button
              onClick={() => setActiveEventModal(null)}
              className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
            >
              Done / Add to Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
