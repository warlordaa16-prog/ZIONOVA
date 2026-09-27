import React, { useState } from 'react';
import {
  Search,
  Music2,
  Mic,
  BookOpen,
  Film,
  Play,
  Clock,
  Sparkles,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import {
  MOCK_SONGS,
  MOCK_PODCAST_SHOWS,
  MOCK_SERMONS,
  MOCK_VIDEOS,
  MOCK_ARTISTS,
} from '../../data/mockData';

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const { playSong, playSermon, openVideoModal } = usePlayer();

  const q = query.toLowerCase().trim();

  const matchingSongs = q
    ? MOCK_SONGS.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          (s.scriptureInspiration && s.scriptureInspiration.toLowerCase().includes(q))
      )
    : [];

  const matchingShows = q
    ? MOCK_PODCAST_SHOWS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.host.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    : [];

  const matchingSermons = q
    ? MOCK_SERMONS.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.speaker.toLowerCase().includes(q) ||
          s.scriptureVerse.toLowerCase().includes(q) ||
          s.topic.toLowerCase().includes(q)
      )
    : [];

  const matchingVideos = q
    ? MOCK_VIDEOS.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.creator.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchingSongs.length + matchingShows.length + matchingSermons.length + matchingVideos.length;

  return (
    <div className="space-y-8 pb-28">
      {/* Search Input Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950/30 p-6 sm:p-8">
        <div className="max-w-2xl space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Universal Gospel Index
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
              Search Music, Podcasts, Sermons & Scriptures
            </h1>
          </div>

          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by song title, gospel minister, podcast topic, or Bible verse (e.g., 'Romans', 'Dunsin', 'Grace')..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 pl-12 pr-4 py-4 text-sm text-slate-100 placeholder-slate-500 shadow-xl backdrop-blur-md focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Quick Search Tag Suggestions */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Quick Searches:</span>
            {['Dunsin Oyekan', 'Theology', 'Romans 8', 'Healing', 'Afro-Gospel', 'Elevation'].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full bg-slate-800/80 border border-slate-700/80 px-3 py-1 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {q && (
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {totalResults} Results Found for "{query}"
          </p>

          {totalResults === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Sparkles className="h-8 w-8 text-amber-500/40 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-400">No matching content found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for Bible books, gospel ministers, podcast titles, or sermon topics.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Songs */}
              {matchingSongs.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Music2 className="h-4 w-4 text-amber-400" />
                    <span>Gospel Music ({matchingSongs.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {matchingSongs.map((song) => (
                      <div
                        key={song.id}
                        onClick={() => playSong(song, matchingSongs)}
                        className="group cursor-pointer flex items-center justify-between rounded-2xl bg-slate-900/60 p-3 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={song.artwork}
                            alt={song.title}
                            className="h-12 w-12 rounded-xl object-cover"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-100 truncate group-hover:text-amber-400 transition">
                              {song.title}
                            </h4>
                            <p className="text-xs text-slate-400 truncate">{song.artist}</p>
                          </div>
                        </div>
                        <Play className="h-4 w-4 text-amber-400 opacity-0 group-hover:opacity-100 transition mr-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Podcasts */}
              {matchingShows.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Mic className="h-4 w-4 text-amber-400" />
                    <span>Podcasts ({matchingShows.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matchingShows.map((show) => (
                      <div
                        key={show.id}
                        className="flex gap-3 rounded-2xl bg-slate-900/60 p-3.5 border border-slate-800"
                      >
                        <img
                          src={show.coverArt}
                          alt={show.title}
                          className="h-16 w-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-bold text-amber-400">
                            {show.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-100 truncate mt-0.5">
                            {show.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-1">{show.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sermons */}
              {matchingSermons.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-amber-400" />
                    <span>Sermons & Scripture Expositions ({matchingSermons.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingSermons.map((sermon) => (
                      <div
                        key={sermon.id}
                        className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-3.5 border border-slate-800"
                      >
                        <div>
                          <span className="text-xs font-bold text-amber-400">
                            📖 {sermon.scriptureVerse}
                          </span>
                          <h4 className="text-sm font-bold text-slate-100 mt-0.5">
                            {sermon.title}
                          </h4>
                          <p className="text-xs text-slate-400">{sermon.speaker}</p>
                        </div>
                        <button
                          onClick={() => playSermon(sermon)}
                          className="rounded-full bg-amber-500 p-2 text-slate-950 font-bold hover:bg-amber-400 transition"
                        >
                          <Play className="h-3.5 w-3.5 fill-slate-950 ml-0.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {matchingVideos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Film className="h-4 w-4 text-amber-400" />
                    <span>Videos & Visuals ({matchingVideos.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingVideos.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => openVideoModal(video.videoUrl)}
                        className="cursor-pointer flex items-center gap-3 rounded-2xl bg-slate-900/60 p-3 border border-slate-800 hover:border-amber-500/40 transition"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-16 w-24 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-100 truncate">
                            {video.title}
                          </h4>
                          <p className="text-xs text-slate-400">{video.creator}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
