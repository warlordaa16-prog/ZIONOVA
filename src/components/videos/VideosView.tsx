import React, { useState } from 'react';
import {
  Film,
  Play,
  Tv,
  Sparkles,
  Heart,
  Share2,
  BookOpen,
  Flame,
  Maximize2,
  Clock,
} from 'lucide-react';
import { MOCK_VIDEOS } from '../../data/mockData';
import { VideoContent } from '../../types';
import { usePlayer } from '../../context/PlayerContext';

export const VideosView: React.FC = () => {
  const { openVideoModal } = usePlayer();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredVideos =
    activeFilter === 'ALL'
      ? MOCK_VIDEOS
      : MOCK_VIDEOS.filter((v) => v.type === activeFilter);

  const shorts = MOCK_VIDEOS.filter((v) => v.type === 'SHORT');

  return (
    <div className="space-y-8 pb-28">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-950 p-6 sm:p-8">
        <div className="max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Film className="h-3.5 w-3.5" />
            <span>Christian Visual Arts</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Faith in High Definition
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Worship concert recordings, Christian films, documentaries, conference livestreams, and uplifting Christian Shorts.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['ALL', 'CONFERENCE', 'MOVIE', 'SHORT'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              activeFilter === f
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {f === 'ALL' ? 'All Visuals' : f === 'SHORT' ? 'Christian Shorts' : f}
          </button>
        ))}
      </div>

      {/* Christian Shorts Carousel / Reel preview */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
          <Flame className="h-4 w-4 text-amber-400" />
          <span>Christian Shorts (60s Devotionals)</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {shorts.map((short) => (
            <div
              key={short.id}
              onClick={() => openVideoModal(short.videoUrl)}
              className="group cursor-pointer relative aspect-[9/16] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-xl transition"
            >
              <img
                src={short.thumbnail}
                alt={short.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-between">
                <span className="self-end rounded-full bg-red-600/80 px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                  Short
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 drop-shadow">
                    {short.title}
                  </h3>
                  <p className="text-[10px] text-amber-300 mt-1">{short.creator}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Length Features & Concerts */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Concerts & Films</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVideos
            .filter((v) => v.type !== 'SHORT')
            .map((video) => (
              <div
                key={video.id}
                className="group flex flex-col rounded-3xl bg-slate-900/60 p-5 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition shadow-xl"
              >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={() => openVideoModal(video.videoUrl)}
                    className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-2xl transition group-hover:scale-110"
                  >
                    <Play className="h-6 w-6 fill-slate-950 ml-1" />
                  </button>
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-0.5 text-[11px] font-mono text-slate-200">
                    {Math.floor(video.duration / 60)} mins
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                  <span>{video.creator}</span>
                  <span className="text-slate-500">{(video.views / 1000).toFixed(0)}k views</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 line-clamp-2 group-hover:text-amber-400 transition">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {video.description}
                </p>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
                  {video.scriptureTag && (
                    <span className="text-xs text-amber-300 flex items-center gap-1 font-medium">
                      📖 {video.scriptureTag}
                    </span>
                  )}
                  <button
                    onClick={() => openVideoModal(video.videoUrl)}
                    className="flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition ml-auto"
                  >
                    <Play className="h-3.5 w-3.5 fill-slate-950" />
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
