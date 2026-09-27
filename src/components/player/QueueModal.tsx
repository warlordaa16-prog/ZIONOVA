import React from 'react';
import { X, Play, Trash2, Music2, Mic, BookOpen } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const QueueModal: React.FC = () => {
  const {
    queue,
    queueIndex,
    isQueueOpen,
    toggleQueue,
    playMediaItem,
    removeFromQueue,
  } = usePlayer();

  if (!isQueueOpen) return null;

  const currentTrack = queue[queueIndex];
  const upNextTracks = queue.slice(queueIndex + 1);

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-800 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span>Play Queue</span>
          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400 font-semibold">
            {queue.length} Tracks
          </span>
        </h3>
        <button
          onClick={toggleQueue}
          className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {/* Now Playing */}
        {currentTrack && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">
              Now Playing
            </p>
            <div className="flex items-center justify-between rounded-2xl bg-amber-500/10 border border-amber-500/30 p-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentTrack.artwork}
                  alt={currentTrack.title}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-100 truncate">
                    {currentTrack.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {currentTrack.subtitle}
                  </p>
                </div>
              </div>
              <span className="flex h-3 w-3 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
          </div>
        )}

        {/* Up Next List */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Up Next
          </p>
          {upNextTracks.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4 text-center">
              No more tracks in queue. Add songs, podcast episodes, or sermons to keep playing.
            </p>
          ) : (
            <div className="space-y-2">
              {upNextTracks.map((item, idx) => {
                const actualIndex = queueIndex + 1 + idx;
                return (
                  <div
                    key={`${item.id}-${actualIndex}`}
                    className="group flex items-center justify-between rounded-xl bg-slate-900/60 p-2.5 hover:bg-slate-900 transition border border-slate-800/50"
                  >
                    <div
                      onClick={() => playMediaItem(item, queue)}
                      className="flex cursor-pointer items-center gap-3 min-w-0 flex-1"
                    >
                      <div className="relative">
                        <img
                          src={item.artwork}
                          alt={item.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg">
                          <Play className="h-4 w-4 fill-white text-white" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-slate-200 truncate group-hover:text-amber-400 transition">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 uppercase">
                        {item.mediaType === 'MUSIC' ? (
                          <Music2 className="h-3 w-3" />
                        ) : item.mediaType === 'PODCAST' ? (
                          <Mic className="h-3 w-3" />
                        ) : (
                          <BookOpen className="h-3 w-3" />
                        )}
                      </span>
                      <button
                        onClick={() => removeFromQueue(actualIndex)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition"
                        title="Remove from Queue"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
