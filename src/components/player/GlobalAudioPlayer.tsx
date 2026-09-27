import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  FileText,
  ListMusic,
  Tv,
  Moon,
  Heart,
  Share2,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';

export const GlobalAudioPlayer: React.FC = () => {
  const {
    currentItem,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    repeatMode,
    isShuffled,
    sleepTimerMinutes,
    sleepTimerRemainingSeconds,
    isLyricsOpen,
    isQueueOpen,
    togglePlay,
    seek,
    nextTrack,
    prevTrack,
    setVolumeLevel,
    toggleMute,
    setRate,
    setSleepTimer,
    toggleShuffle,
    cycleRepeat,
    toggleLyrics,
    toggleQueue,
    openVideoModal,
  } = usePlayer();

  const { likedSongs, toggleLikeSong } = useAuth();
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [isSleepMenuOpen, setIsSleepMenuOpen] = useState(false);

  if (!currentItem) return null;

  const isLiked = likedSongs.includes(currentItem.id);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
  const sleepTimers = [15, 30, 45, 60];

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 px-3 py-2.5 sm:px-6 backdrop-blur-xl transition-all shadow-2xl">
      {/* Progress Bar (Scrubber) */}
      <div className="group relative flex w-full items-center gap-2 mb-1">
        <span className="text-[11px] font-mono text-slate-400 min-w-[36px] text-right">
          {formatTime(currentTime)}
        </span>
        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-amber-500 hover:h-2 transition-all"
          />
        </div>
        <span className="text-[11px] font-mono text-slate-500 min-w-[36px]">
          {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-[28%] sm:max-w-[30%]">
          <img
            src={currentItem.artwork}
            alt={currentItem.title}
            className="h-12 w-12 rounded-lg object-cover border border-slate-800 shadow-md flex-shrink-0"
          />
          <div className="min-w-0 truncate">
            <h4 className="text-sm font-semibold text-slate-100 truncate hover:text-amber-400 cursor-pointer transition">
              {currentItem.title}
            </h4>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {currentItem.subtitle}
            </p>
          </div>
          <button
            onClick={() => toggleLikeSong(currentItem.id)}
            className={`hidden sm:flex p-1.5 rounded-full transition ${
              isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'
            }`}
            title="Like / Save to Library"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`hidden sm:flex p-1.5 rounded-full transition ${
              isShuffled ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Shuffle Queue"
          >
            <Shuffle className="h-4 w-4" />
          </button>

          {/* Jump -15s */}
          <button
            onClick={() => seek(Math.max(0, currentTime - 15))}
            className="hidden sm:flex p-1.5 text-slate-400 hover:text-slate-200 transition"
            title="Rewind 15 seconds"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Previous Track */}
          <button
            onClick={prevTrack}
            className="p-1.5 text-slate-300 hover:text-white transition"
            title="Previous Track"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 transition-transform hover:scale-105 active:scale-95"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-slate-950" />
            ) : (
              <Play className="h-5 w-5 fill-slate-950 ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={nextTrack}
            className="p-1.5 text-slate-300 hover:text-white transition"
            title="Next Track"
          >
            <SkipForward className="h-5 w-5" />
          </button>

          {/* Jump +15s */}
          <button
            onClick={() => seek(Math.min(duration, currentTime + 15))}
            className="hidden sm:flex p-1.5 text-slate-400 hover:text-slate-200 transition"
            title="Forward 15 seconds"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          {/* Repeat Mode */}
          <button
            onClick={cycleRepeat}
            className={`hidden sm:flex p-1.5 rounded-full transition ${
              repeatMode !== 'off' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
            }`}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="h-4 w-4" />
            ) : (
              <Repeat className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Right: Audio Extra Features (Speed, Sleep, Lyrics, Queue, Video, Volume) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Video Toggle if available */}
          {currentItem.videoUrl && (
            <button
              onClick={() => openVideoModal()}
              className="flex items-center gap-1 rounded-md bg-amber-500/20 border border-amber-500/40 px-2 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition"
              title="Watch Video Stream"
            >
              <Tv className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Watch Video</span>
            </button>
          )}

          {/* Playback Speed */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
              className="px-2 py-1 rounded text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
              title="Playback Speed"
            >
              {playbackRate}x
            </button>
            {isSpeedMenuOpen && (
              <div className="absolute bottom-9 right-0 w-24 rounded-xl border border-slate-800 bg-slate-900 p-1 shadow-2xl z-50">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setRate(s);
                      setIsSpeedMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 text-xs rounded-md ${
                      playbackRate === s
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sleep Timer */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsSleepMenuOpen(!isSleepMenuOpen)}
              className={`p-1.5 rounded-full transition ${
                sleepTimerRemainingSeconds
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={
                sleepTimerRemainingSeconds
                  ? `Sleep in ${Math.ceil(sleepTimerRemainingSeconds / 60)}m`
                  : 'Set Sleep Timer'
              }
            >
              <Moon className="h-4 w-4" />
            </button>
            {isSleepMenuOpen && (
              <div className="absolute bottom-9 right-0 w-32 rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-2xl z-50">
                <span className="block px-2 py-1 text-[10px] font-bold uppercase text-slate-500">
                  Sleep Timer
                </span>
                <button
                  onClick={() => {
                    setSleepTimer(null);
                    setIsSleepMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 text-xs text-slate-400 hover:bg-slate-800 rounded"
                >
                  Off
                </button>
                {sleepTimers.map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      setSleepTimer(mins);
                      setIsSleepMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 text-xs rounded ${
                      sleepTimerMinutes === mins
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {mins} minutes
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Synchronized Lyrics Trigger */}
          <button
            onClick={toggleLyrics}
            className={`p-1.5 rounded-full transition ${
              isLyricsOpen ? 'text-amber-400 bg-amber-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Synchronized Lyrics & Notes"
          >
            <FileText className="h-4 w-4" />
          </button>

          {/* Queue Drawer Trigger */}
          <button
            onClick={toggleQueue}
            className={`p-1.5 rounded-full transition ${
              isQueueOpen ? 'text-amber-400 bg-amber-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Up Next Queue"
          >
            <ListMusic className="h-4 w-4" />
          </button>

          {/* Volume Control */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className="p-1 text-slate-400 hover:text-slate-200 transition"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4 text-red-400" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolumeLevel(Number(e.target.value))}
              className="w-16 h-1 bg-slate-800 rounded-lg accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
