import React, { useState } from 'react';
import {
  Play,
  Pause,
  Heart,
  FileText,
  Plus,
  Share2,
  Sparkles,
  Music2,
  Users2,
  Clock,
  Disc,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { MOCK_SONGS, MOCK_PLAYLISTS, MOCK_ARTISTS } from '../../data/mockData';
import { Song, Playlist, Artist } from '../../types';

interface MusicViewProps {
  onOpenLyrics?: () => void;
}

export const MusicView: React.FC<MusicViewProps> = () => {
  const { likedSongs, toggleLikeSong, followedArtists, toggleFollowArtist, userPlaylists, addSongToPlaylist } = useAuth();
  const { playSong, playMediaItem, currentItem, isPlaying, toggleLyrics } = usePlayer();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [playlistDropdownSongId, setPlaylistDropdownSongId] = useState<string | null>(null);

  const categories = ['All', 'Worship', 'Praise', 'Contemporary', 'Afro-Gospel', 'Acoustic'];

  const filteredSongs =
    selectedCategory === 'All'
      ? MOCK_SONGS
      : MOCK_SONGS.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8">
        <div className="max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Music2 className="h-3.5 w-3.5" />
            <span>Gospel Music Sanctuary</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Praise, Worship & Holy Ground
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Immerse yourself in Christ-centered songs with synchronized lyrics, scripture inspirations, and lossless acoustic depth.
          </p>
        </div>
      </div>

      {/* Categories Filter Bar */}
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

      {/* Featured Worship Playlists */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Curated Ministry Playlists</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_PLAYLISTS.map((pl) => (
            <div
              key={pl.id}
              onClick={() => {
                if (pl.songs.length > 0) playSong(pl.songs[0], pl.songs);
              }}
              className="group cursor-pointer rounded-2xl bg-slate-900/60 p-4 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
                <img
                  src={pl.coverArt}
                  alt={pl.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <button
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Play Playlist"
                >
                  <Play className="h-4 w-4 fill-slate-950 ml-0.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {pl.category}
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-0.5 truncate group-hover:text-amber-400 transition">
                  {pl.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{pl.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gospel Songs Table / Master List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-100">
            {selectedCategory === 'All' ? 'All Gospel Tracks' : `${selectedCategory} Tracks`}
          </h2>
          <span className="text-xs text-slate-500">{filteredSongs.length} releases</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 pl-4 pr-2 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Title & Artist</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Scripture Inspiration</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Key / BPM</th>
                <th className="py-3.5 px-4 w-20 text-center">
                  <Clock className="h-3.5 w-3.5 mx-auto" />
                </th>
                <th className="py-3.5 pr-4 pl-2 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSongs.map((song, idx) => {
                const isCurrent = currentItem?.id === song.id;
                const isLiked = likedSongs.includes(song.id);

                return (
                  <tr
                    key={song.id}
                    className={`group hover:bg-slate-800/60 transition ${
                      isCurrent ? 'bg-amber-500/10' : ''
                    }`}
                  >
                    {/* Index or Play button */}
                    <td className="py-3 pl-4 pr-2 text-center">
                      <button
                        onClick={() => playSong(song, filteredSongs)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-amber-500 hover:text-slate-950 transition mx-auto"
                      >
                        {isCurrent && isPlaying ? (
                          <Pause className="h-3.5 w-3.5 fill-current" />
                        ) : (
                          <span className="group-hover:hidden font-mono">{idx + 1}</span>
                        )}
                        {(!isCurrent || !isPlaying) && (
                          <Play className="h-3.5 w-3.5 fill-current hidden group-hover:block ml-0.5" />
                        )}
                      </button>
                    </td>

                    {/* Track info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={song.artwork}
                          alt={song.title}
                          className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4
                            onClick={() => playSong(song, filteredSongs)}
                            className={`font-semibold cursor-pointer truncate ${
                              isCurrent ? 'text-amber-400 font-bold' : 'text-slate-100 hover:text-amber-300'
                            }`}
                          >
                            {song.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate">
                            {song.artist}{' '}
                            {song.featuredArtists && (
                              <span className="text-slate-500">
                                ft. {song.featuredArtists.join(', ')}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Scripture anchor */}
                    <td className="py-3 px-4 hidden md:table-cell text-slate-400 italic">
                      {song.scriptureInspiration ? (
                        <span className="line-clamp-1">{song.scriptureInspiration}</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>

                    {/* Musical Key / BPM */}
                    <td className="py-3 px-4 hidden lg:table-cell text-slate-400 font-mono text-[11px]">
                      {song.musicalKey || 'D Maj'} • {song.bpm || 72} BPM
                    </td>

                    {/* Duration */}
                    <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-400">
                      {formatDuration(song.duration)}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 pr-4 pl-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Lyrics */}
                        {song.lyrics && (
                          <button
                            onClick={() => {
                              playSong(song, filteredSongs);
                              toggleLyrics();
                            }}
                            className="p-1.5 text-slate-400 hover:text-amber-400 rounded-full hover:bg-slate-700 transition"
                            title="Synchronized Lyrics"
                          >
                            <FileText className="h-3.5 w-3.5" />
                          </button>
                        )}

                        {/* Like */}
                        <button
                          onClick={() => toggleLikeSong(song.id)}
                          className={`p-1.5 rounded-full hover:bg-slate-700 transition ${
                            isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'
                          }`}
                          title="Like Track"
                        >
                          <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>

                        {/* Add to playlist menu */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setPlaylistDropdownSongId(
                                playlistDropdownSongId === song.id ? null : song.id
                              )
                            }
                            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition"
                            title="Add to Playlist"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>

                          {playlistDropdownSongId === song.id && (
                            <div className="absolute right-0 mt-1 w-48 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 text-left animate-in fade-in">
                              <span className="block px-2 py-1 text-[10px] font-bold uppercase text-slate-500">
                                Add to Playlist
                              </span>
                              {userPlaylists.map((pl) => (
                                <button
                                  key={pl.id}
                                  onClick={() => {
                                    addSongToPlaylist(pl.id, song);
                                    setPlaylistDropdownSongId(null);
                                  }}
                                  className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded truncate"
                                >
                                  {pl.title}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Featured Gospel Ministers & Psalmist Profiles */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
          <Users2 className="h-4 w-4 text-amber-400" />
          <span>Featured Gospel Artists</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_ARTISTS.map((artist) => {
            const isFollowed = followedArtists.includes(artist.id);
            return (
              <div
                key={artist.id}
                className="flex flex-col items-center text-center rounded-2xl bg-slate-900/60 p-5 border border-slate-800 hover:border-amber-500/30 transition"
              >
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="h-24 w-24 rounded-full object-cover border-2 border-amber-500/30 shadow-lg mb-3"
                />
                <h3 className="text-sm font-bold text-slate-100">{artist.name}</h3>
                <p className="text-[11px] text-amber-400 font-medium mt-0.5">
                  {(artist.monthlyListeners / 1000000).toFixed(1)}M Monthly Listeners
                </p>
                <p className="text-xs text-slate-400 line-clamp-2 mt-2 px-1">
                  {artist.bio}
                </p>
                <button
                  onClick={() => toggleFollowArtist(artist.id)}
                  className={`mt-4 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    isFollowed
                      ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow Minister'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
