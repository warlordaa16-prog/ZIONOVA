import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { PlayerMediaItem, Song, PodcastEpisode, Sermon } from '../types';
import { MOCK_SONGS } from '../data/mockData';

interface PlayerContextType {
  currentItem: PlayerMediaItem | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  repeatMode: 'off' | 'all' | 'one';
  isShuffled: boolean;
  queue: PlayerMediaItem[];
  queueIndex: number;
  sleepTimerMinutes: number | null;
  sleepTimerRemainingSeconds: number | null;
  isLyricsOpen: boolean;
  isQueueOpen: boolean;
  isVideoModalOpen: boolean;
  activeVideoUrl: string | null;
  playMediaItem: (item: PlayerMediaItem, newQueue?: PlayerMediaItem[]) => void;
  playSong: (song: Song, songsQueue?: Song[]) => void;
  playEpisode: (episode: PodcastEpisode) => void;
  playSermon: (sermon: Sermon) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolumeLevel: (volume: number) => void;
  toggleMute: () => void;
  setRate: (rate: number) => void;
  setSleepTimer: (minutes: number | null) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleLyrics: () => void;
  toggleQueue: () => void;
  openVideoModal: (url?: string) => void;
  closeVideoModal: () => void;
  addToQueue: (item: PlayerMediaItem) => void;
  removeFromQueue: (index: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Web Audio API ambient chime synthesizer fallback
class AmbientSynthEngine {
  private ctx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private intervalId: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playAtmosphere() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.stop();

      const chords = [261.63, 329.63, 392.0, 523.25]; // C major faith chord
      let chordIndex = 0;

      const playChordNote = () => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(chords[chordIndex % chords.length], this.ctx.currentTime);
        chordIndex++;

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 4.0);
      };

      playChordNote();
      this.intervalId = window.setInterval(playChordNote, 4000);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

const synthEngine = new AmbientSynthEngine();

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<PlayerMediaItem[]>(() => {
    return MOCK_SONGS.map((song) => ({
      id: song.id,
      title: song.title,
      subtitle: song.artist,
      artwork: song.artwork,
      audioUrl: song.audioUrl,
      videoUrl: song.videoUrl,
      mediaType: 'MUSIC',
      duration: song.duration,
      lyrics: song.lyrics,
      scriptureRef: song.scriptureInspiration,
      artistOrHostId: song.artistId,
      category: song.category,
    }));
  });

  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [currentItem, setCurrentItem] = useState<PlayerMediaItem | null>(queue[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(queue[0]?.duration || 384);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerRemainingSeconds, setSleepTimerRemainingSeconds] = useState<number | null>(null);
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize HTML5 audio
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      handleTrackEnd();
    };

    const onError = () => {
      // If direct audio URL fails (e.g. cross-origin/network restriction), start synth chime
      synthEngine.playAtmosphere();
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
      synthEngine.stop();
    };
  }, []);

  // Update MediaSession
  useEffect(() => {
    if ('mediaSession' in navigator && currentItem) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentItem.title,
        artist: currentItem.subtitle,
        album: 'ZIONOVA Media Experience',
        artwork: [
          { src: currentItem.artwork, sizes: '512x512', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => togglePlay());
      navigator.mediaSession.setActionHandler('pause', () => togglePlay());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
    }
  }, [currentItem]);

  // Handle sleep timer
  useEffect(() => {
    if (sleepTimerMinutes === null) {
      setSleepTimerRemainingSeconds(null);
      return;
    }

    setSleepTimerRemainingSeconds(sleepTimerMinutes * 60);

    const interval = setInterval(() => {
      setSleepTimerRemainingSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          if (audioRef.current) {
            audioRef.current.pause();
          }
          synthEngine.stop();
          setIsPlaying(false);
          setSleepTimerMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTimerMinutes]);

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      nextTrack();
    }
  };

  const playMediaItem = (item: PlayerMediaItem, newQueue?: PlayerMediaItem[]) => {
    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
      const foundIdx = newQueue.findIndex((i) => i.id === item.id);
      setQueueIndex(foundIdx !== -1 ? foundIdx : 0);
    } else {
      const idx = queue.findIndex((i) => i.id === item.id);
      if (idx === -1) {
        setQueue((prev) => [item, ...prev]);
        setQueueIndex(0);
      } else {
        setQueueIndex(idx);
      }
    }

    setCurrentItem(item);
    setCurrentTime(0);
    setDuration(item.duration || 300);

    if (audioRef.current) {
      audioRef.current.src = item.audioUrl;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          synthEngine.stop();
        })
        .catch(() => {
          setIsPlaying(true);
          synthEngine.playAtmosphere();
        });
    }
  };

  const playSong = (song: Song, songsQueue?: Song[]) => {
    const queueToUse = songsQueue || MOCK_SONGS;
    const mediaQueue: PlayerMediaItem[] = queueToUse.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.artist,
      artwork: s.artwork,
      audioUrl: s.audioUrl,
      videoUrl: s.videoUrl,
      mediaType: 'MUSIC',
      duration: s.duration,
      lyrics: s.lyrics,
      scriptureRef: s.scriptureInspiration,
      artistOrHostId: s.artistId,
      category: s.category,
    }));

    const targetMedia = mediaQueue.find((m) => m.id === song.id) || mediaQueue[0];
    playMediaItem(targetMedia, mediaQueue);
  };

  const playEpisode = (episode: PodcastEpisode) => {
    const mediaItem: PlayerMediaItem = {
      id: episode.id,
      title: episode.title,
      subtitle: `${episode.showTitle} • Ep. ${episode.episodeNumber}`,
      artwork: episode.artwork,
      audioUrl: episode.audioUrl,
      videoUrl: episode.videoUrl,
      mediaType: 'PODCAST',
      duration: episode.duration,
      transcript: episode.transcript,
      scriptureRef: episode.scriptureReferences?.[0],
      artistOrHostId: episode.showId,
      category: episode.topics[0],
    };
    playMediaItem(mediaItem);
  };

  const playSermon = (sermon: Sermon) => {
    const mediaItem: PlayerMediaItem = {
      id: sermon.id,
      title: sermon.title,
      subtitle: `${sermon.speaker} • ${sermon.ministry}`,
      artwork: sermon.artwork,
      audioUrl: sermon.audioUrl,
      videoUrl: sermon.videoUrl,
      mediaType: 'SERMON',
      duration: sermon.duration,
      scriptureRef: sermon.scriptureVerse,
      category: sermon.topic,
    };
    playMediaItem(mediaItem);
  };

  const togglePlay = () => {
    if (!currentItem && queue.length > 0) {
      playMediaItem(queue[0]);
      return;
    }

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      synthEngine.stop();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        if (!audioRef.current.src && currentItem) {
          audioRef.current.src = currentItem.audioUrl;
        }
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            synthEngine.stop();
          })
          .catch(() => {
            setIsPlaying(true);
            synthEngine.playAtmosphere();
          });
      }
    }
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const nextTrack = () => {
    if (queue.length === 0) return;
    let nextIdx = queueIndex + 1;
    if (isShuffled) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else if (nextIdx >= queue.length) {
      if (repeatMode === 'all') {
        nextIdx = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }
    setQueueIndex(nextIdx);
    playMediaItem(queue[nextIdx]);
  };

  const prevTrack = () => {
    if (queue.length === 0) return;
    if (currentTime > 3) {
      seek(0);
      return;
    }
    let prevIdx = queueIndex - 1;
    if (prevIdx < 0) {
      prevIdx = queue.length - 1;
    }
    setQueueIndex(prevIdx);
    playMediaItem(queue[prevIdx]);
  };

  const setVolumeLevel = (vol: number) => {
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.volume = volume || 0.8;
      }
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  const setRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const setSleepTimer = (minutes: number | null) => {
    setSleepTimerMinutes(minutes);
  };

  const toggleShuffle = () => {
    setIsShuffled((prev) => !prev);
  };

  const cycleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const toggleLyrics = () => {
    setIsLyricsOpen((prev) => !prev);
    if (!isLyricsOpen) setIsQueueOpen(false);
  };

  const toggleQueue = () => {
    setIsQueueOpen((prev) => !prev);
    if (!isQueueOpen) setIsLyricsOpen(false);
  };

  const openVideoModal = (url?: string) => {
    setActiveVideoUrl(url || currentItem?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setActiveVideoUrl(null);
  };

  const addToQueue = (item: PlayerMediaItem) => {
    setQueue((prev) => [...prev, item]);
  };

  const removeFromQueue = (index: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
    if (index === queueIndex && queue.length > 1) {
      nextTrack();
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentItem,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        playbackRate,
        repeatMode,
        isShuffled,
        queue,
        queueIndex,
        sleepTimerMinutes,
        sleepTimerRemainingSeconds,
        isLyricsOpen,
        isQueueOpen,
        isVideoModalOpen,
        activeVideoUrl,
        playMediaItem,
        playSong,
        playEpisode,
        playSermon,
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
        closeVideoModal,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
