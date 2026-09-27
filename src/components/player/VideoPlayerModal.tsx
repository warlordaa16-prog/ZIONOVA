import React from 'react';
import { X, Maximize2, Sparkles, BookOpen } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const VideoPlayerModal: React.FC = () => {
  const { isVideoModalOpen, activeVideoUrl, currentItem, closeVideoModal } = usePlayer();

  if (!isVideoModalOpen || !activeVideoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 sm:p-8 backdrop-blur-2xl animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              High-Definition Video Stream
            </span>
            <h3 className="text-base font-bold text-slate-100 truncate">
              {currentItem?.title || 'Christian Video Experience'}
            </h3>
          </div>
          <button
            onClick={closeVideoModal}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Stage */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            src={activeVideoUrl}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

        {/* Video Details & Scripture */}
        {currentItem && (
          <div className="border-t border-slate-800 bg-slate-950/80 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">{currentItem.subtitle}</p>
                {currentItem.scriptureRef && (
                  <p className="mt-1 text-xs text-amber-300 flex items-center gap-1.5 font-medium">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Scripture Focus: {currentItem.scriptureRef}</span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>CDN Lossless Stream</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
