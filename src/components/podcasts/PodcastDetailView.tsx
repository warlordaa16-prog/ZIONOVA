import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Play,
  Tv,
  FileText,
  Bookmark,
  Share2,
  Users2,
  Calendar,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PodcastShow, PodcastEpisode } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';

interface PodcastDetailViewProps {
  show: PodcastShow;
  onBack: () => void;
}

export const PodcastDetailView: React.FC<PodcastDetailViewProps> = ({ show, onBack }) => {
  const { followedPodcasts, toggleFollowPodcast } = useAuth();
  const { playEpisode, openVideoModal, toggleLyrics } = usePlayer();
  const [activeSeason, setActiveSeason] = useState<number>(1);

  const isFollowed = followedPodcasts.includes(show.id);

  return (
    <div className="space-y-8 pb-28">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to All Podcasts</span>
      </button>

      {/* Show Profile Hero Banner */}
      <div className="relative flex flex-col md:flex-row gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
        <img
          src={show.coverArt}
          alt={show.title}
          className="h-48 w-48 rounded-2xl object-cover shadow-2xl border border-amber-500/20 flex-shrink-0"
        />
        <div className="flex flex-col justify-between flex-1 space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
                {show.category}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {show.rating} Rating
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                {show.country} • {show.language}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              {show.title}
            </h1>
            <p className="text-xs sm:text-sm text-amber-400/90 font-medium mt-1">
              {show.tagline}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {show.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={show.hostAvatar}
                alt={show.host}
                className="h-10 w-10 rounded-full object-cover border border-amber-500/40"
              />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                  Hosted by
                </span>
                <span className="text-xs font-bold text-slate-200">{show.host}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFollowPodcast(show.id)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                  isFollowed
                    ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
                }`}
              >
                {isFollowed ? 'Following Show' : 'Subscribe / Follow'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons Selector & Episodes List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-100">
            Episodes Catalog
          </h2>
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 p-1">
            {[1, 2, 3].slice(0, show.seasonsCount).map((s) => (
              <button
                key={s}
                onClick={() => setActiveSeason(s)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  activeSeason === s
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Season {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {show.episodes.map((ep) => (
            <div
              key={ep.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl bg-slate-900/60 p-4 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <img
                  src={ep.artwork}
                  alt={ep.title}
                  className="h-16 w-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-400">
                    <span>Episode {ep.episodeNumber}</span>
                    <span>•</span>
                    <span>{ep.releaseDate}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 mt-0.5 truncate">
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

                {ep.transcript && (
                  <button
                    onClick={() => {
                      playEpisode(ep);
                      toggleLyrics();
                    }}
                    className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 transition"
                  >
                    <FileText className="h-3.5 w-3.5 text-amber-400" />
                    <span>Transcript</span>
                  </button>
                )}

                {ep.hasVideo && ep.videoUrl && (
                  <button
                    onClick={() => {
                      playEpisode(ep);
                      openVideoModal(ep.videoUrl);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition"
                  >
                    <Tv className="h-3.5 w-3.5" />
                    <span>Watch</span>
                  </button>
                )}

                <button
                  onClick={() => playEpisode(ep)}
                  className="flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  <Play className="h-3.5 w-3.5 fill-slate-950" />
                  <span>Play</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
