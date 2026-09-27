import React, { useState } from 'react';
import {
  Mic,
  Radio,
  Play,
  Tv,
  FileText,
  Star,
  Sparkles,
  Users2,
  Clock,
  ArrowRight,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { MOCK_PODCAST_SHOWS, MOCK_PODCAST_EPISODES, MOCK_LIVE_SESSION } from '../../data/mockData';
import { PodcastShow, PodcastEpisode } from '../../types';

interface PodcastsViewProps {
  onSelectShow: (show: PodcastShow) => void;
  onNavigateToLive: () => void;
}

export const PodcastsView: React.FC<PodcastsViewProps> = ({ onSelectShow, onNavigateToLive }) => {
  const { followedPodcasts, toggleFollowPodcast } = useAuth();
  const { playEpisode, openVideoModal, currentItem, isPlaying, toggleLyrics } = usePlayer();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Technology & Faith',
    'Prayer & Devotion',
    'Worship & Culture',
    'Christian Apologetics',
  ];

  const filteredShows =
    selectedCategory === 'All'
      ? MOCK_PODCAST_SHOWS
      : MOCK_PODCAST_SHOWS.filter((show) => show.category === selectedCategory);

  return (
    <div className="space-y-8 pb-28">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-950 p-6 sm:p-8">
        <div className="max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Mic className="h-3.5 w-3.5" />
            <span>Dedicated Podcast Platform</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Voices of Kingdom Revelation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Explore long-form theological discussions, marketplace leadership insights, interactive time-coded transcripts, and live podcast sessions.
          </p>
        </div>
      </div>

      {/* Live Broadcast Card */}
      {MOCK_LIVE_SESSION.isLive && (
        <div className="relative overflow-hidden rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/50 via-slate-900 to-slate-900 p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={MOCK_LIVE_SESSION.hostAvatar}
                  alt={MOCK_LIVE_SESSION.host}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-red-500 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-extrabold text-white tracking-widest animate-pulse">
                  LIVE
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Live Broadcast Now
                  </span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-mono">
                    🔴 {MOCK_LIVE_SESSION.listenersCount} tuning in
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                  {MOCK_LIVE_SESSION.currentTopic}
                </h3>
                <p className="text-xs text-slate-400">
                  {MOCK_LIVE_SESSION.showTitle} • Hosted by {MOCK_LIVE_SESSION.host}
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToLive}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition"
            >
              <Radio className="h-4 w-4" />
              <span>Enter Live Room</span>
            </button>
          </div>
        </div>
      )}

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Podcast Shows Directory */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Podcast Shows</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredShows.map((show) => {
            const isFollowed = followedPodcasts.includes(show.id);
            return (
              <div
                key={show.id}
                className="group flex flex-col sm:flex-row gap-4 rounded-3xl bg-slate-900/60 p-5 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition"
              >
                <img
                  src={show.coverArt}
                  alt={show.title}
                  onClick={() => onSelectShow(show)}
                  className="h-32 w-32 rounded-2xl object-cover cursor-pointer flex-shrink-0"
                />
                <div className="flex flex-col justify-between min-w-0 flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
                        {show.category}
                      </span>
                      <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {show.rating}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectShow(show)}
                      className="text-base font-bold text-slate-100 mt-1.5 cursor-pointer truncate group-hover:text-amber-400 transition"
                    >
                      {show.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {show.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span className="text-[11px] text-slate-500">
                      {show.totalEpisodes} Episodes • {show.followersCount.toLocaleString()} Followers
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFollowPodcast(show.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          isFollowed
                            ? 'bg-slate-800 text-slate-300 border border-slate-700'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                        }`}
                      >
                        {isFollowed ? 'Followed' : 'Follow'}
                      </button>
                      <button
                        onClick={() => onSelectShow(show)}
                        className="rounded-full bg-amber-500 p-2 text-slate-950 font-bold hover:bg-amber-400 transition"
                        title="View Show"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending Episodes List with Audio / Video toggle */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-400" />
          <span>New & Trending Episodes</span>
        </h2>

        <div className="space-y-3">
          {MOCK_PODCAST_EPISODES.map((ep) => {
            const isCurrent = currentItem?.id === ep.id;

            return (
              <div
                key={ep.id}
                className={`group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl bg-slate-900/60 p-4 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition ${
                  isCurrent ? 'bg-amber-500/10' : ''
                }`}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <img
                    src={ep.artwork}
                    alt={ep.title}
                    className="h-16 w-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-400">
                      <span>{ep.showTitle}</span>
                      <span>•</span>
                      <span>Season {ep.season}, Ep. {ep.episodeNumber}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 mt-0.5 truncate group-hover:text-amber-300 transition">
                      {ep.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {ep.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <span className="text-xs font-mono text-slate-500 mr-2">
                    {Math.floor(ep.duration / 60)} mins
                  </span>

                  {/* Transcript trigger */}
                  {ep.transcript && (
                    <button
                      onClick={() => {
                        playEpisode(ep);
                        toggleLyrics();
                      }}
                      className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition"
                      title="Read Transcript"
                    >
                      <FileText className="h-3.5 w-3.5 text-amber-400" />
                      <span>Transcript</span>
                    </button>
                  )}

                  {/* Video trigger if available */}
                  {ep.hasVideo && ep.videoUrl && (
                    <button
                      onClick={() => {
                        playEpisode(ep);
                        openVideoModal(ep.videoUrl);
                      }}
                      className="flex items-center gap-1 rounded-lg bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition"
                      title="Watch Video Stream"
                    >
                      <Tv className="h-3.5 w-3.5" />
                      <span>Watch</span>
                    </button>
                  )}

                  {/* Play Audio Button */}
                  <button
                    onClick={() => playEpisode(ep)}
                    className="flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                  >
                    <Play className="h-3.5 w-3.5 fill-slate-950" />
                    <span>Play</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
