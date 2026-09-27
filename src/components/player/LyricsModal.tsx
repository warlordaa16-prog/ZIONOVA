import React, { useEffect, useRef } from 'react';
import { X, Sparkles, BookOpen, Clock } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const LyricsModal: React.FC = () => {
  const { currentItem, currentTime, isLyricsOpen, toggleLyrics, seek } = usePlayer();
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentTime]);

  if (!isLyricsOpen || !currentItem) return null;

  const hasLyrics = currentItem.lyrics && currentItem.lyrics.length > 0;
  const hasTranscript = currentItem.transcript && currentItem.transcript.length > 0;

  // Determine current active lyric line index
  let activeLyricIdx = -1;
  if (hasLyrics) {
    for (let i = 0; i < currentItem.lyrics!.length; i++) {
      if (currentTime >= currentItem.lyrics![i].time) {
        activeLyricIdx = i;
      } else {
        break;
      }
    }
  }

  // Determine current active transcript line index
  let activeTranscriptIdx = -1;
  if (hasTranscript) {
    for (let i = 0; i < currentItem.transcript!.length; i++) {
      if (currentTime >= currentItem.transcript![i].time) {
        activeTranscriptIdx = i;
      } else {
        break;
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-xl animate-in fade-in">
      <div className="relative flex h-[85vh] w-full max-w-2xl flex-col rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={currentItem.artwork}
              alt={currentItem.title}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">{currentItem.title}</h3>
              <p className="text-xs text-amber-400 font-medium">
                {hasLyrics ? 'Real-Time Synchronized Lyrics' : 'Interactive Episode Transcript'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleLyrics}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scripture Anchor banner */}
        {currentItem.scriptureRef && (
          <div className="flex items-center gap-2 bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 text-xs text-amber-300">
            <BookOpen className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="font-medium">Scripture Foundation:</span>
            <span className="italic text-slate-200">{currentItem.scriptureRef}</span>
          </div>
        )}

        {/* Scrolling Lyrics / Transcript Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 text-center">
          {hasLyrics ? (
            currentItem.lyrics!.map((line, idx) => {
              const isActive = idx === activeLyricIdx;
              const isPast = idx < activeLyricIdx;
              return (
                <div
                  key={idx}
                  ref={isActive ? activeLineRef : null}
                  onClick={() => seek(line.time)}
                  className={`cursor-pointer font-display transition-all duration-300 ${
                    isActive
                      ? 'text-2xl sm:text-3xl font-extrabold text-amber-400 scale-105 filter drop-shadow-md'
                      : isPast
                      ? 'text-lg sm:text-xl font-medium text-slate-400 opacity-60 hover:opacity-100'
                      : 'text-lg sm:text-xl font-medium text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {line.text}
                </div>
              );
            })
          ) : hasTranscript ? (
            <div className="space-y-4 text-left">
              {currentItem.transcript!.map((item, idx) => {
                const isActive = idx === activeTranscriptIdx;
                return (
                  <div
                    key={idx}
                    ref={isActive ? activeLineRef : null}
                    onClick={() => seek(item.time)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all ${
                      isActive
                        ? 'bg-amber-500/15 border border-amber-500/30 text-slate-100 shadow-md'
                        : 'bg-slate-800/40 hover:bg-slate-800/80 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-1">
                      <span>{item.speaker}</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                        <Clock className="h-3 w-3" />
                        {Math.floor(item.time / 60)}:
                        {item.time % 60 < 10 ? '0' : ''}
                        {item.time % 60}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200">{item.text}</p>
                    {item.scriptureRef && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                        📖 {item.scriptureRef}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <Sparkles className="h-8 w-8 text-amber-500/50 mb-3" />
              <p className="text-sm font-semibold text-slate-400">
                Instrumental & Spoken Meditation
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Rest in the presence of God while this track plays. Lyrics will sync automatically for supported releases.
              </p>
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="border-t border-slate-800/80 bg-slate-950/60 px-6 py-2.5 text-center text-[11px] text-slate-500">
          💡 Click any line or transcript paragraph to jump directly to that timestamp in the audio
        </div>
      </div>
    </div>
  );
};
