import React, { useState } from 'react';
import {
  Heart,
  Plus,
  Play,
  Music2,
  Mic,
  BookOpen,
  Trash2,
  ListMusic,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { MOCK_SONGS, MOCK_PODCAST_SHOWS, MOCK_SERMONS } from '../../data/mockData';

export const LibraryView: React.FC = () => {
  const {
    likedSongs,
    followedPodcasts,
    savedSermons,
    userPlaylists,
    createUserPlaylist,
    toggleLikeSong,
  } = useAuth();

  const { playSong, playSermon } = usePlayer();

  const [activeTab, setActiveTab] = useState<'liked' | 'playlists' | 'podcasts' | 'sermons'>('liked');
  const [isNewPlaylistOpen, setIsNewPlaylistOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const myLikedSongs = MOCK_SONGS.filter((s) => likedSongs.includes(s.id));
  const myPodcasts = MOCK_PODCAST_SHOWS.filter((p) => followedPodcasts.includes(p.id));
  const mySermons = MOCK_SERMONS.filter((s) => savedSermons.includes(s.id));

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createUserPlaylist(newTitle.trim(), newDesc.trim());
    setNewTitle('');
    setNewDesc('');
    setIsNewPlaylistOpen(false);
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Personal Sanctum
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            Your Christian Library
          </h1>
        </div>

        <button
          onClick={() => setIsNewPlaylistOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Playlist</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('liked')}
          className={`py-3 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'liked'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="h-3.5 w-3.5" />
          <span>Liked Songs ({myLikedSongs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('playlists')}
          className={`py-3 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'playlists'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <ListMusic className="h-3.5 w-3.5" />
          <span>Playlists ({userPlaylists.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('podcasts')}
          className={`py-3 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'podcasts'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Mic className="h-3.5 w-3.5" />
          <span>Followed Shows ({myPodcasts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('sermons')}
          className={`py-3 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'sermons'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Saved Sermons ({mySermons.length})</span>
        </button>
      </div>

      {/* Tab: Liked Songs */}
      {activeTab === 'liked' && (
        <div className="space-y-3">
          {myLikedSongs.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-10 text-center">
              No liked songs yet. Click the heart icon on any gospel track to add it to your library.
            </p>
          ) : (
            myLikedSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-3.5 border border-slate-800 hover:bg-slate-900 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={song.artwork}
                    alt={song.title}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-100 truncate">{song.title}</h4>
                    <p className="text-xs text-slate-400 truncate">{song.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLikeSong(song.id)}
                    className="text-rose-500 p-1.5 hover:text-rose-400 transition"
                    title="Remove from Liked"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                  <button
                    onClick={() => playSong(song, myLikedSongs)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
                  >
                    <Play className="h-4 w-4 fill-slate-950 ml-0.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: User Playlists */}
      {activeTab === 'playlists' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userPlaylists.map((pl) => (
            <div
              key={pl.id}
              className="flex flex-col justify-between rounded-3xl bg-slate-900/60 p-5 border border-slate-800 hover:border-amber-500/40 transition"
            >
              <div>
                <img
                  src={pl.coverArt}
                  alt={pl.title}
                  className="aspect-square w-full rounded-2xl object-cover mb-3"
                />
                <h3 className="text-sm font-bold text-slate-100">{pl.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{pl.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-500">{pl.songs.length} tracks</span>
                <button
                  onClick={() => {
                    if (pl.songs.length > 0) playSong(pl.songs[0], pl.songs);
                  }}
                  disabled={pl.songs.length === 0}
                  className="rounded-full bg-amber-500 p-2 text-slate-950 font-bold hover:bg-amber-400 transition disabled:opacity-40"
                >
                  <Play className="h-3.5 w-3.5 fill-slate-950 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Podcasts */}
      {activeTab === 'podcasts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myPodcasts.map((show) => (
            <div
              key={show.id}
              className="flex gap-4 rounded-3xl bg-slate-900/60 p-4 border border-slate-800"
            >
              <img
                src={show.coverArt}
                alt={show.title}
                className="h-20 w-20 rounded-2xl object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  {show.category}
                </span>
                <h3 className="text-sm font-bold text-slate-100 truncate">{show.title}</h3>
                <p className="text-xs text-slate-400 truncate mt-0.5">Host: {show.host}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Saved Sermons */}
      {activeTab === 'sermons' && (
        <div className="space-y-3">
          {mySermons.map((sermon) => (
            <div
              key={sermon.id}
              className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-4 border border-slate-800"
            >
              <div>
                <span className="text-xs text-amber-400 font-semibold">
                  📖 {sermon.scriptureVerse}
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-0.5">{sermon.title}</h3>
                <p className="text-xs text-slate-400">{sermon.speaker}</p>
              </div>
              <button
                onClick={() => playSermon(sermon)}
                className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Play Sermon
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Playlist Modal */}
      {isNewPlaylistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <form
            onSubmit={handleCreatePlaylist}
            className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl animate-in fade-in"
          >
            <h3 className="text-lg font-bold text-slate-100">Create New Playlist</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Playlist Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Midnight Intercession, Holy Communion"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="A sacred collection of tracks..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsNewPlaylistOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Create Playlist
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
