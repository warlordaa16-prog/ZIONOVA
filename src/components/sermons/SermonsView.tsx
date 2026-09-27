import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Tv,
  FileText,
  Bookmark,
  Sparkles,
  Download,
  Share2,
  Users2,
  Clock,
  Filter,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { MOCK_SERMONS } from '../../data/mockData';
import { Sermon } from '../../types';

export const SermonsView: React.FC = () => {
  const { savedSermons, toggleSaveSermon } = useAuth();
  const { playSermon, openVideoModal, currentItem } = usePlayer();

  const [selectedBook, setSelectedBook] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const bibleBooks = ['All', 'Romans', 'Isaiah', 'Ezekiel', 'John', 'Psalms', 'Matthew'];
  const topics = ['All', 'Grace', 'Faith', 'Healing', 'Waiting', 'Resurrection'];

  const filteredSermons = MOCK_SERMONS.filter((s) => {
    const matchesBook = selectedBook === 'All' || s.scriptureBook === selectedBook;
    const matchesTopic = selectedTopic === 'All' || s.topic.toLowerCase().includes(selectedTopic.toLowerCase());
    return matchesBook && matchesTopic;
  });

  return (
    <div className="space-y-8 pb-28">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-950 p-6 sm:p-8">
        <div className="max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Expository Sermons & Spoken Word</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Scripture Expositions & Prophetic Teaching
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Search anointed sermons indexed by Bible book, chapter, and verse references. Listen on the go or watch high-definition video teachings with downloadable study outlines.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold uppercase text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Book:</span>
          </span>
          {bibleBooks.map((book) => (
            <button
              key={book}
              onClick={() => setSelectedBook(book)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                selectedBook === book
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {book}
            </button>
          ))}
        </div>
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSermons.map((sermon) => {
          const isSaved = savedSermons.includes(sermon.id);
          const isCurrent = currentItem?.id === sermon.id;

          return (
            <div
              key={sermon.id}
              className={`flex flex-col justify-between rounded-3xl bg-slate-900/70 p-5 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition shadow-xl ${
                isCurrent ? 'bg-amber-500/10' : ''
              }`}
            >
              <div>
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src={sermon.artwork}
                    alt={sermon.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-[11px] font-bold text-amber-400 backdrop-blur-md">
                    📖 {sermon.scriptureVerse}
                  </div>
                  {sermon.videoUrl && (
                    <button
                      onClick={() => {
                        playSermon(sermon);
                        openVideoModal(sermon.videoUrl);
                      }}
                      className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white hover:bg-amber-500 hover:text-slate-950 transition"
                    >
                      <Tv className="h-3.5 w-3.5" />
                      <span>Watch</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                  <span>{sermon.topic}</span>
                  <span className="text-slate-500">{Math.floor(sermon.duration / 60)} mins</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 line-clamp-2">
                  {sermon.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {sermon.speaker} • <span className="text-slate-500">{sermon.ministry}</span>
                </p>
                <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {sermon.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  onClick={() => toggleSaveSermon(sermon.id)}
                  className={`flex items-center gap-1 text-xs font-semibold transition ${
                    isSaved ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {sermon.videoUrl && (
                    <button
                      onClick={() => {
                        playSermon(sermon);
                        openVideoModal(sermon.videoUrl);
                      }}
                      className="p-2 rounded-full text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition"
                      title="Watch Video"
                    >
                      <Tv className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => playSermon(sermon)}
                    className="flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                  >
                    <Play className="h-3.5 w-3.5 fill-slate-950" />
                    <span>Listen</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
