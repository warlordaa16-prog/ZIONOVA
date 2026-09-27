import React, { useState } from 'react';
import {
  Play,
  Pause,
  Flame,
  Radio,
  Sparkles,
  BookOpen,
  Mic,
  Music2,
  Heart,
  ChevronRight,
  Clock,
  ArrowUpRight,
  Users2,
  Calendar,
  Share2,
  Copy,
  Check,
  Plus,
  ListPlus,
  Tv,
  Video,
  Layers,
  Bookmark,
  Shuffle,
  Eye,
  Filter,
  CheckCircle2,
  MessageSquare,
  Send,
  X,
  Ticket,
  QrCode,
  RefreshCw,
  Volume2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { useCommunity } from '../../context/CommunityContext';
import {
  MOCK_SONGS,
  MOCK_PODCAST_SHOWS,
  MOCK_SERMONS,
  MOCK_VIDEOS,
  MOCK_PLAYLISTS,
  MOCK_LIVE_SESSION,
  MOCK_KINGDOM_EVENTS,
  MOCK_COMMUNITY_POSTS,
} from '../../data/mockData';
import { Song, PodcastShow, Sermon, VideoContent, KingdomEvent } from '../../types';

interface HomeViewProps {
  onNavigate: (tab: string, itemId?: string) => void;
}

const DAILY_SCRIPTURES = [
  {
    verse: 'Numbers 6:24–26',
    text: 'The LORD bless you and keep you; the LORD make His face shine upon you and be gracious to you; the LORD lift up His countenance upon you and give you peace.',
    theme: 'Blessing & Divine Peace',
    songId: 'song-1',
  },
  {
    verse: 'Isaiah 40:31',
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    theme: 'Strength & Divine Renewal',
    songId: 'song-2',
  },
  {
    verse: 'Romans 8:28',
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    theme: 'Sovereign Goodness',
    songId: 'song-2',
  },
  {
    verse: 'Psalm 91:1–2',
    text: 'He who dwells in the shelter of the Most High will abide in the shadow of the Almighty. I will say to the LORD, "My refuge and my fortress, my God, in whom I trust."',
    theme: 'Spiritual Shelter & Protection',
    songId: 'song-1',
  },
  {
    verse: 'Philippians 4:6–7',
    text: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God will guard your hearts.',
    theme: 'Peace Over Anxiety',
    songId: 'song-3',
  },
  {
    verse: 'Psalm 100:1–3',
    text: 'Make a joyful noise to the LORD, all the earth! Serve the LORD with gladness! Come into his presence with singing! Know that the LORD, he is God!',
    theme: 'Joyful Praise & Exaltation',
    songId: 'song-3',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { user, likedSongs, toggleLikeSong } = useAuth();
  const {
    playSong,
    playEpisode,
    playSermon,
    playMediaItem,
    addToQueue,
    currentItem,
    isPlaying,
    togglePlay,
    toggleLyrics,
    openVideoModal,
  } = usePlayer();

  const { prayerRequests, prayForRequest, addPrayerRequest } = useCommunity();

  // Local state for interactive features
  const [scriptureIndex, setScriptureIndex] = useState(0);
  const [copiedVerse, setCopiedVerse] = useState(false);
  const [savedVerses, setSavedVerses] = useState<string[]>([]);
  const [musicCategory, setMusicCategory] = useState<string>('All');
  const [sermonTopic, setSermonTopic] = useState<string>('All');
  const [podcastFilter, setPodcastFilter] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [floatingReactions, setFloatingReactions] = useState<{ id: number; emoji: string }[]>([]);
  const [subscribedShows, setSubscribedShows] = useState<string[]>(['pod-1']);

  // Modals state
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [prayerTitle, setPrayerTitle] = useState('');
  const [prayerDetails, setPrayerDetails] = useState('');
  const [prayerScripture, setPrayerScripture] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Selected Event Pass Modal
  const [registeredEvent, setRegisteredEvent] = useState<KingdomEvent | null>(null);

  // Scripture Detail Popover
  const [activeScriptureModal, setActiveScriptureModal] = useState<{ title: string; verse: string; context: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const currentScripture = DAILY_SCRIPTURES[scriptureIndex];

  const handleNextScripture = () => {
    setScriptureIndex((prev) => (prev + 1) % DAILY_SCRIPTURES.length);
    showToast('Revealed today’s fresh biblical promise ✨');
  };

  const handleCopyScripture = () => {
    navigator.clipboard.writeText(`"${currentScripture.text}" — ${currentScripture.verse}`);
    setCopiedVerse(true);
    showToast('Scripture copied to clipboard! 📋');
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  const handleToggleSaveScripture = (verse: string) => {
    if (savedVerses.includes(verse)) {
      setSavedVerses((prev) => prev.filter((v) => v !== verse));
      showToast('Removed from saved devotions');
    } else {
      setSavedVerses((prev) => [...prev, verse]);
      showToast('Saved to your Personal Devotional Journal! ⭐');
    }
  };

  const handlePlayAtmosphere = (themeName: string) => {
    if (themeName === 'Deep Worship') {
      playSong(MOCK_SONGS[0], MOCK_SONGS);
    } else if (themeName === 'Joyful Praise') {
      playSong(MOCK_SONGS[2], MOCK_SONGS);
    } else if (themeName === 'Quiet Devotion') {
      playSong(MOCK_SONGS[1], MOCK_SONGS);
    } else if (themeName === 'Spiritual Warfare') {
      playSong(MOCK_SONGS[0], MOCK_SONGS);
    } else {
      playSong(MOCK_SONGS[0], MOCK_SONGS);
    }
    showToast(`Atmosphere Station Active: ${themeName} 🕊️`);
  };

  const handlePlayAllMusic = () => {
    if (filteredSongs.length > 0) {
      playSong(filteredSongs[0], filteredSongs);
      showToast(`Playing all ${filteredSongs.length} trending worship songs 🎶`);
    }
  };

  const handleShuffleMusic = () => {
    const shuffled = [...filteredSongs].sort(() => Math.random() - 0.5);
    if (shuffled.length > 0) {
      playSong(shuffled[0], shuffled);
      showToast('Shuffle Mode: Divine Worship Flow randomized 🔀');
    }
  };

  const handleAddToQueue = (e: React.MouseEvent, song: Song) => {
    e.stopPropagation();
    addToQueue({
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
      category: song.category,
    });
    showToast(`Added "${song.title}" to Up Next Queue 🎵`);
  };

  const handleToggleSubscribeShow = (e: React.MouseEvent, showId: string, showTitle: string) => {
    e.stopPropagation();
    if (subscribedShows.includes(showId)) {
      setSubscribedShows((prev) => prev.filter((id) => id !== showId));
      showToast(`Unfollowed ${showTitle}`);
    } else {
      setSubscribedShows((prev) => [...prev, showId]);
      showToast(`Subscribed to ${showTitle}! You will receive new episode alerts 🔔`);
    }
  };

  const handleSendPraise = (emoji: string) => {
    const newReaction = { id: Date.now() + Math.random(), emoji };
    setFloatingReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2000);
    showToast(`Praise Reaction sent: ${emoji}`);
  };

  const handlePlayLiveAudio = () => {
    playMediaItem({
      id: MOCK_LIVE_SESSION.id,
      title: MOCK_LIVE_SESSION.showTitle,
      subtitle: `LIVE with ${MOCK_LIVE_SESSION.host} • ${MOCK_LIVE_SESSION.currentTopic}`,
      artwork: MOCK_LIVE_SESSION.hostAvatar,
      audioUrl: MOCK_LIVE_SESSION.audioStreamUrl,
      videoUrl: MOCK_LIVE_SESSION.videoStreamUrl,
      mediaType: 'PODCAST',
      duration: 3600,
      category: 'Live Broadcast',
    });
    showToast('Streaming Live Broadcast audio in background 🔴');
  };

  const handlePlayThematicSession = () => {
    // Queues 1 song + 1 sermon + 1 podcast episode as a 3-part revelation
    const thematicSessionItems = [
      {
        id: MOCK_SONGS[0].id,
        title: MOCK_SONGS[0].title,
        subtitle: `Step 1: Worship Anthem • ${MOCK_SONGS[0].artist}`,
        artwork: MOCK_SONGS[0].artwork,
        audioUrl: MOCK_SONGS[0].audioUrl,
        mediaType: 'MUSIC' as const,
        duration: MOCK_SONGS[0].duration,
        lyrics: MOCK_SONGS[0].lyrics,
        scriptureRef: MOCK_SONGS[0].scriptureInspiration,
      },
      {
        id: MOCK_SERMONS[0].id,
        title: MOCK_SERMONS[0].title,
        subtitle: `Step 2: Expository Word • ${MOCK_SERMONS[0].speaker}`,
        artwork: MOCK_SERMONS[0].artwork,
        audioUrl: MOCK_SERMONS[0].audioUrl,
        mediaType: 'SERMON' as const,
        duration: MOCK_SERMONS[0].duration,
        scriptureRef: MOCK_SERMONS[0].scriptureVerse,
      },
      {
        id: MOCK_PODCAST_SHOWS[0].episodes[0].id,
        title: MOCK_PODCAST_SHOWS[0].episodes[0].title,
        subtitle: `Step 3: Practical Podcast • ${MOCK_PODCAST_SHOWS[0].title}`,
        artwork: MOCK_PODCAST_SHOWS[0].episodes[0].artwork,
        audioUrl: MOCK_PODCAST_SHOWS[0].episodes[0].audioUrl,
        mediaType: 'PODCAST' as const,
        duration: MOCK_PODCAST_SHOWS[0].episodes[0].duration,
        scriptureRef: MOCK_PODCAST_SHOWS[0].episodes[0].scriptureReferences?.[0],
      },
    ];

    playMediaItem(thematicSessionItems[0], thematicSessionItems);
    showToast('Started 3-Part Thematic Revelation Immersion (Music ➔ Word ➔ Podcast) 🕊️');
  };

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerTitle.trim() || !prayerDetails.trim()) return;

    addPrayerRequest(prayerTitle.trim(), prayerDetails.trim(), prayerScripture.trim() || undefined, isAnonymous);
    setPrayerTitle('');
    setPrayerDetails('');
    setPrayerScripture('');
    setIsAnonymous(false);
    setIsPrayerModalOpen(false);
    showToast('Your prayer request has been placed on the Global Prayer Wall! Believers are now interceding 🙏');
  };

  // Filtered lists
  const filteredSongs = MOCK_SONGS.filter((s) => {
    if (musicCategory === 'All') return true;
    return s.category === musicCategory || s.genre.toLowerCase().includes(musicCategory.toLowerCase());
  });

  const filteredPodcasts = MOCK_PODCAST_SHOWS.filter((p) => {
    if (podcastFilter === 'All') return true;
    return p.category.toLowerCase().includes(podcastFilter.toLowerCase());
  });

  const filteredSermons = MOCK_SERMONS.filter((s) => {
    if (sermonTopic === 'All') return true;
    return s.topic.toLowerCase().includes(sermonTopic.toLowerCase());
  });

  return (
    <div className="space-y-10 pb-28">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 border border-amber-500/50 px-4 py-3 text-xs font-semibold text-slate-100 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5">
          <Sparkles className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Reactions overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingReactions.map((reaction) => (
          <div
            key={reaction.id}
            className="absolute bottom-28 right-16 text-3xl animate-bounce transition-all duration-1000 opacity-90"
            style={{
              transform: `translateY(-${Math.random() * 120 + 40}px) translateX(${
                (Math.random() - 0.5) * 60
              }px)`,
            }}
          >
            {reaction.emoji}
          </div>
        ))}
      </div>

      {/* 1. Personalized Welcome & Daily Bread Sanctuary */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Daily Scripture Revelation & Blessing</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleNextScripture}
                className="flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-800/80 px-3 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-amber-300 transition active:scale-95"
                title="Cycle to next promise"
              >
                <RefreshCw className="h-3 w-3 text-amber-400" />
                <span>Next Verse</span>
              </button>

              <button
                onClick={handleCopyScripture}
                className="flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-800/80 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition active:scale-95"
                title="Copy verse text"
              >
                {copiedVerse ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>

              <button
                onClick={() => handleToggleSaveScripture(currentScripture.verse)}
                className={`flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-800/80 p-1.5 transition active:scale-95 ${
                  savedVerses.includes(currentScripture.verse)
                    ? 'text-amber-400 bg-amber-500/20 border-amber-500/40'
                    : 'text-slate-300 hover:text-amber-400'
                }`}
                title="Save verse to Journal"
              >
                <Bookmark className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {getGreeting()}, <span className="text-amber-400">{user.name.split(' ')[0]}</span>.
          </h1>

          {/* Dynamic Scripture Card with smooth key transitions */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4 sm:p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 block mb-1">
              Focus: {currentScripture.theme}
            </span>
            <blockquote className="text-sm sm:text-base text-slate-200 font-serif italic leading-relaxed">
              "{currentScripture.text}"
            </blockquote>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-800/60">
              <span className="font-sans font-bold text-amber-400 text-xs sm:text-sm">
                — {currentScripture.verse}
              </span>
              <button
                onClick={() => {
                  const song = MOCK_SONGS.find((s) => s.id === currentScripture.songId) || MOCK_SONGS[0];
                  playSong(song);
                  showToast(`Playing scripture-inspired worship: "${song.title}" 🎶`);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-300 font-medium transition"
              >
                <Volume2 className="h-3.5 w-3.5 text-amber-400" />
                <span>Play Aligned Audio</span>
              </button>
            </div>
          </div>

          {/* Primary Worship CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => playSong(MOCK_SONGS[0], MOCK_SONGS)}
              className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400 hover:scale-105 transition active:scale-95"
            >
              <Play className="h-4 w-4 fill-slate-950" />
              <span>Start Daily Worship Flow</span>
            </button>

            <button
              onClick={() => setIsPrayerModalOpen(true)}
              className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-300 hover:bg-amber-500/20 transition active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Post Quick Prayer</span>
            </button>

            <button
              onClick={() => onNavigate('community')}
              className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
            >
              <Users2 className="h-4 w-4 text-amber-400" />
              <span>Prayer Wall ({prayerRequests.reduce((acc, p) => acc + p.prayedCount, 0)} Interceding)</span>
            </button>
          </div>

          {/* Atmosphere Preset Pills */}
          <div className="pt-2 border-t border-slate-800/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Atmosphere Stations:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Deep Worship', icon: '🕊️' },
                { name: 'Spiritual Warfare', icon: '⚔️' },
                { name: 'Joyful Praise', icon: '🙌' },
                { name: 'Quiet Devotion', icon: '📖' },
              ].map((atm) => (
                <button
                  key={atm.name}
                  onClick={() => handlePlayAtmosphere(atm.name)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:border-amber-500/40 hover:bg-slate-800 hover:text-amber-300 transition active:scale-95"
                >
                  <span>{atm.icon}</span>
                  <span>{atm.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. Live Broadcast Interactive Hub */}
      {MOCK_LIVE_SESSION.isLive && (
        <div className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={MOCK_LIVE_SESSION.hostAvatar}
                  alt={MOCK_LIVE_SESSION.host}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-red-500/60 shadow-lg"
                />
                <span className="absolute -bottom-1.5 -right-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase text-white tracking-widest animate-pulse border border-slate-950">
                  LIVE
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    {MOCK_LIVE_SESSION.showTitle}
                  </span>
                  <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-[10px] text-slate-300 font-mono flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                    {MOCK_LIVE_SESSION.listenersCount.toLocaleString()} tuned in
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-100 mt-1 leading-snug">
                  {MOCK_LIVE_SESSION.currentTopic}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Lead Facilitator: <span className="text-slate-200 font-medium">{MOCK_LIVE_SESSION.host}</span>
                </p>
              </div>
            </div>

            {/* Quick Live Actions */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
              {/* Praise Reactions Bar */}
              <div className="flex items-center gap-1 rounded-2xl bg-slate-950/60 border border-slate-800 p-1">
                {['🙏', '🔥', '👑', '❤️'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSendPraise(emoji)}
                    className="h-8 w-8 rounded-xl hover:bg-slate-800 flex items-center justify-center text-sm transition active:scale-125"
                    title={`Send ${emoji} Reaction`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <button
                onClick={handlePlayLiveAudio}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                <Radio className="h-4 w-4 text-amber-400" />
                <span>Listen Audio</span>
              </button>

              <button
                onClick={() => openVideoModal(MOCK_LIVE_SESSION.videoStreamUrl)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                <Tv className="h-4 w-4 text-red-400" />
                <span>Watch Video Stream</span>
              </button>

              <button
                onClick={() => onNavigate('live-podcast')}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition"
              >
                <span>Enter Live Interactive Room</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Trending Gospel Music Sanctuary */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-500" />
              <span>Trending Gospel Music</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Anthems of praise and deep worship stirring hearts globally
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayAllMusic}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Play All</span>
            </button>

            <button
              onClick={handleShuffleMusic}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition"
            >
              <Shuffle className="h-3.5 w-3.5 text-amber-400" />
              <span>Shuffle</span>
            </button>

            <button
              onClick={() => onNavigate('music')}
              className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition pl-2"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {['All', 'Worship', 'Praise', 'Afro-Gospel', 'Contemporary'].map((cat) => (
            <button
              key={cat}
              onClick={() => setMusicCategory(cat)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                musicCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredSongs.map((song) => {
            const isCurrent = currentItem?.id === song.id;
            const isSongLiked = likedSongs.includes(song.id);

            return (
              <div
                key={song.id}
                onClick={() => playSong(song, filteredSongs)}
                className={`group relative flex flex-col rounded-2xl bg-slate-900/60 p-3 border transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'border-amber-500/60 bg-amber-500/5 shadow-lg shadow-amber-500/10'
                    : 'border-slate-800/60 hover:bg-slate-900 hover:border-amber-500/40 shadow-md'
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-800">
                  <img
                    src={song.artwork}
                    alt={song.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* Play Overlay Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCurrent) {
                        togglePlay();
                      } else {
                        playSong(song, filteredSongs);
                      }
                    }}
                    className={`absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shadow-lg transition-all duration-200 ${
                      isCurrent
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                    }`}
                    title={isCurrent && isPlaying ? 'Pause Song' : 'Play Song'}
                  >
                    {isCurrent && isPlaying ? (
                      <span className="flex h-3.5 w-3.5 gap-0.5 items-end justify-center">
                        <span className="w-1 bg-slate-950 h-3.5 animate-pulse"></span>
                        <span className="w-1 bg-slate-950 h-2 animate-pulse"></span>
                        <span className="w-1 bg-slate-950 h-3.5 animate-pulse"></span>
                      </span>
                    ) : (
                      <Play className="h-4 w-4 fill-slate-950 ml-0.5" />
                    )}
                  </button>

                  {/* Quick Add To Queue Button */}
                  <button
                    onClick={(e) => handleAddToQueue(e, song)}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 text-slate-300 hover:text-amber-400 hover:bg-slate-900 opacity-0 group-hover:opacity-100 transition shadow"
                    title="Add to queue"
                  >
                    <ListPlus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-2.5 flex-1 min-w-0">
                  <h3
                    className={`text-xs sm:text-sm font-bold truncate transition ${
                      isCurrent ? 'text-amber-400' : 'text-slate-100 group-hover:text-amber-300'
                    }`}
                  >
                    {song.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{song.artist}</p>
                </div>

                <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-800/40 text-[10px] text-slate-500">
                  <span className="font-mono">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
                  <div className="flex items-center gap-1.5">
                    {song.lyrics && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playSong(song);
                          toggleLyrics();
                        }}
                        className="text-slate-500 hover:text-amber-400 transition"
                        title="View synchronized lyrics"
                      >
                        <Music2 className="h-3 w-3" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLikeSong(song.id);
                        showToast(
                          isSongLiked
                            ? `Removed "${song.title}" from your library`
                            : `Added "${song.title}" to Liked Songs ❤️`
                        );
                      }}
                      className="text-slate-400 hover:text-rose-400 transition"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          isSongLiked ? 'text-rose-500 fill-current' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Cross-Platform Discovery Bridge (Theology Behind the Sound) */}
      <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
              <Layers className="h-3.5 w-3.5" />
              <span>Theology Behind the Sound • Cross-Ecosystem Link</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              Complete Kingdom Experience: Music, Word & Insight
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Experience the interconnected power of faith media: begin with deep praise anthems, anchor your spirit in expository scripture teachings, and unpack practical life application in interactive podcasts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePlayThematicSession}
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition active:scale-95"
            >
              <Play className="h-4 w-4 fill-slate-950" />
              <span>Start 3-Part Thematic Session</span>
            </button>
            <button
              onClick={() => onNavigate('podcasts')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <Mic className="h-4 w-4 text-amber-400" />
              <span>Explore Podcasts</span>
            </button>
            <button
              onClick={() => onNavigate('sermons')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span>Expository Sermons</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Christian Podcasts Ecosystem */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Mic className="h-5 w-5 text-amber-500" />
              <span>Featured Christian Podcasts</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Thought-provoking conversations on faith, technology, leadership, and scripture
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('podcasts')}
              className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
            >
              <span>All Shows ({MOCK_PODCAST_SHOWS.length})</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Podcast Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {['All', 'Faith & Work', 'Worship', 'Theology', 'Apologetics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setPodcastFilter(cat)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                podcastFilter === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPodcasts.map((show) => {
            const isSubscribed = subscribedShows.includes(show.id);
            const latestEp = show.episodes[0];

            return (
              <div
                key={show.id}
                onClick={() => onNavigate('podcasts', show.id)}
                className="group cursor-pointer flex flex-col sm:flex-row gap-4 rounded-2xl bg-slate-900/70 p-4 border border-slate-800 hover:border-amber-500/40 transition hover:bg-slate-900 shadow-md"
              >
                <div className="relative h-28 w-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                  <img
                    src={show.coverArt}
                    alt={show.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  {latestEp && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playEpisode(latestEp);
                        showToast(`Playing "${latestEp.title}" 🎙️`);
                      }}
                      className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shadow-xl opacity-0 group-hover:opacity-100 transition hover:scale-110 active:scale-95"
                      title="Play latest episode"
                    >
                      <Play className="h-4 w-4 fill-slate-950 ml-0.5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col justify-between min-w-0 flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                        {show.category}
                      </span>
                      <span className="text-xs text-amber-400 font-bold">★ {show.rating}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-100 mt-1 truncate group-hover:text-amber-400 transition">
                      {show.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {show.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/60 pt-2">
                    <span>Host: {show.host.split('&')[0]}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleToggleSubscribeShow(e, show.id, show.title)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                          isSubscribed
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isSubscribed ? '✓ Following' : '+ Follow'}
                      </button>

                      <span className="text-amber-400 flex items-center gap-1 text-[11px] font-semibold">
                        Listen <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Sermons & Spoken Word Expositions */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              <span>Sermons & Spoken Word</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Anointed expositions indexed by Scripture book and theological topic
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('sermons')}
              className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
            >
              <span>All Sermons</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sermon Topics Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {['All', 'Grace', 'Waiting', 'Resurrection', 'Faith'].map((topic) => (
            <button
              key={topic}
              onClick={() => setSermonTopic(topic)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                sermonTopic === topic
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="group flex flex-col justify-between rounded-2xl bg-slate-900/60 p-4 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-2">
                  <button
                    onClick={() =>
                      setActiveScriptureModal({
                        title: sermon.title,
                        verse: sermon.scriptureVerse,
                        context: sermon.description,
                      })
                    }
                    className="hover:underline flex items-center gap-1"
                    title="Click to view full scripture focus"
                  >
                    <span>📖 {sermon.scriptureVerse}</span>
                  </button>
                  <span className="text-slate-500 font-mono">{Math.floor(sermon.duration / 60)} mins</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 line-clamp-2 group-hover:text-amber-400 transition">
                  {sermon.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {sermon.speaker} • <span className="text-slate-500">{sermon.ministry}</span>
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60">
                <span className="text-[11px] text-slate-500 truncate max-w-[120px]">{sermon.topic}</span>
                <div className="flex items-center gap-2">
                  {sermon.videoUrl && (
                    <button
                      onClick={() => openVideoModal(sermon.videoUrl)}
                      className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Watch video sermon"
                    >
                      <Tv className="h-4 w-4 text-amber-400" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      playSermon(sermon);
                      showToast(`Playing sermon: "${sermon.title}" 📖`);
                    }}
                    className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition active:scale-95 shadow"
                  >
                    <Play className="h-3 w-3 fill-slate-950" />
                    <span>Listen</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Kingdom Cinema & 60-Second Shorts Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Video className="h-5 w-5 text-amber-500" />
              <span>Kingdom Cinema & Devotional Shorts</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Concert experiences, Christian short films, and 60-second scripture devotionals
            </p>
          </div>
          <button
            onClick={() => onNavigate('videos')}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            <span>All Visuals</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MOCK_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => openVideoModal(vid.videoUrl)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-amber-500/40 hover:bg-slate-900 transition shadow-md flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-black uppercase text-slate-950">
                  {vid.type}
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono text-slate-200">
                  {Math.floor(vid.duration / 60)}:{(vid.duration % 60).toString().padStart(2, '0')}
                </div>
                <div className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-2xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition">
                  <Play className="h-5 w-5 fill-slate-950 ml-0.5" />
                </div>
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-2 group-hover:text-amber-400 transition">
                    {vid.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">{vid.creator}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-500">
                  <span>{(vid.views).toLocaleString()} views</span>
                  <span className="text-amber-400 font-semibold">{vid.scriptureTag || 'Biblical'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Live Interactive Community Prayer Wall Widget */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Users2 className="h-5 w-5 text-amber-500" />
              <span>Live Community Prayer & Intercession Wall</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Join believers worldwide lifting up urgent petitions and rejoicing in answered prayers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrayerModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition shadow"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Submit Prayer</span>
            </button>
            <button
              onClick={() => onNavigate('community')}
              className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition pl-2"
            >
              <span>Full Prayer Feed</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prayerRequests.slice(0, 3).map((req) => (
            <div
              key={req.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-amber-500/40 transition shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-amber-400">{req.authorName}</span>
                  <span className="text-slate-500">{req.createdAt}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100">{req.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{req.details}</p>
                {req.scriptureFocus && (
                  <span className="inline-block text-[10px] font-semibold text-amber-400/90 bg-amber-500/10 rounded px-2 py-0.5">
                    📖 {req.scriptureFocus}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-medium">
                  🙏 <strong className="text-amber-400">{req.prayedCount}</strong> intercessors
                </span>
                <button
                  onClick={() => {
                    prayForRequest(req.id);
                    showToast(`You joined in prayer for "${req.title}"! 🙏`);
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition active:scale-95 ${
                    req.hasUserPrayed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow'
                  }`}
                >
                  <Heart className={`h-3 w-3 ${req.hasUserPrayed ? 'fill-current' : ''}`} />
                  <span>{req.hasUserPrayed ? 'Praying ✓' : 'I Am Praying'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Kingdom Events & Live Gatherings */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span>Upcoming Kingdom Events & Passes</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Conferences, global worship nights, and interactive virtual gatherings
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            <span>All Events</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_KINGDOM_EVENTS.map((event) => (
            <div
              key={event.id}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 hover:border-amber-500/40 transition shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {event.type.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  📅 {event.date} • {event.time}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mt-2.5">{event.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{event.description}</p>
              <div className="mt-4 flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">📍 {event.location}</span>
                <button
                  onClick={() => {
                    setRegisteredEvent(event);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition shadow active:scale-95"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  <span>Get Free Pass</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal 1: Quick Prayer Request Submission */}
      {isPrayerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in">
          <form
            onSubmit={handlePrayerSubmit}
            className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Heart className="h-5 w-5 text-amber-400" />
                <span>Submit Prayer Request</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsPrayerModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Prayer Title / Petition Subject
                </label>
                <input
                  type="text"
                  required
                  value={prayerTitle}
                  onChange={(e) => setPrayerTitle(e.target.value)}
                  placeholder="e.g., Healing for my Mother's Surgery, Academic Breakthrough..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Details & Specific Petitions
                </label>
                <textarea
                  rows={3}
                  required
                  value={prayerDetails}
                  onChange={(e) => setPrayerDetails(e.target.value)}
                  placeholder="Share details so the fellowship can stand in agreement with you..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Scripture Anchor (Optional)
                </label>
                <input
                  type="text"
                  value={prayerScripture}
                  onChange={(e) => setPrayerScripture(e.target.value)}
                  placeholder="e.g., Isaiah 53:5, Philippians 4:19"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonCheckbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="anonCheckbox" className="text-slate-300 cursor-pointer">
                  Post anonymously (hide my name from public feed)
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsPrayerModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post to Prayer Wall</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal 2: Event Pass & Digital Ticket Card */}
      {registeredEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-amber-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Pass Confirmed & Issued</span>
              </span>
              <button
                onClick={() => setRegisteredEvent(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Ticket Card View */}
            <div className="rounded-2xl border-2 border-dashed border-amber-500/30 bg-slate-950 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  ZIONOVA VIP KINGDOM ACCESS
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">#PASS-89201</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-100">{registeredEvent.title}</h4>
              <p className="text-xs text-slate-300">
                👤 Attendee: <strong className="text-white">{user.name}</strong>
              </p>
              <div className="text-xs text-slate-400 space-y-0.5">
                <p>📅 Date & Time: {registeredEvent.date} • {registeredEvent.time}</p>
                <p>📍 Location: {registeredEvent.location}</p>
              </div>

              <div className="flex items-center justify-center pt-3 pb-1 border-t border-slate-800">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-20 w-20 rounded-lg bg-white p-1 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-slate-950" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Present QR at Ingress Gate</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  showToast('Pass added to Apple Wallet / Google Wallet format 📲');
                  setRegisteredEvent(null);
                }}
                className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Save Pass & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Scripture Reading & Context Modal */}
      {activeScriptureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-400" />
                <span>Scripture Foundation</span>
              </h3>
              <button
                onClick={() => setActiveScriptureModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-sm font-bold text-amber-400">{activeScriptureModal.verse}</span>
              <p className="text-sm font-serif italic text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                "{activeScriptureModal.context}"
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveScriptureModal(null)}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
