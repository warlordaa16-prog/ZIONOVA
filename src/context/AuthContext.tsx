import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, Song, Playlist } from '../types';
import { MOCK_PLAYLISTS, MOCK_SONGS } from '../data/mockData';

interface AuthContextType {
  user: UserProfile;
  setRole: (role: UserRole) => void;
  likedSongs: string[];
  toggleLikeSong: (songId: string) => void;
  followedArtists: string[];
  toggleFollowArtist: (artistId: string) => void;
  followedPodcasts: string[];
  toggleFollowPodcast: (podcastId: string) => void;
  savedSermons: string[];
  toggleSaveSermon: (sermonId: string) => void;
  userPlaylists: Playlist[];
  createPlaylist: (title: string, description: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-01',
  name: 'Emmanuel Adebayo',
  email: 'emmanuel@zionova.media',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  role: 'USER',
  bio: 'Passionate worshipper, software builder, and believer in the transformative power of Kingdom media.',
  isVerified: true,
  memberSince: 'January 2024',
  country: 'United States',
  favoriteGenres: ['Contemporary Worship', 'Afro-Gospel', 'Prophetic Chant'],
  followedArtists: ['artist-1', 'artist-2', 'artist-3'],
  followedPodcasts: ['pod-1', 'pod-2'],
  savedPlaylists: ['pl-1', 'pl-2'],
  likedSongs: ['song-1', 'song-2', 'song-4'],
  savedEpisodes: ['ep-1', 'ep-2'],
  savedSermons: ['sermon-1'],
  savedVideos: ['vid-1'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('zionova_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem('zionova_user_playlists');
    return saved ? JSON.parse(saved) : MOCK_PLAYLISTS;
  });

  useEffect(() => {
    localStorage.setItem('zionova_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zionova_user_playlists', JSON.stringify(userPlaylists));
  }, [userPlaylists]);

  const setRole = (role: UserRole) => {
    setUser((prev) => ({
      ...prev,
      role,
    }));
  };

  const toggleLikeSong = (songId: string) => {
    setUser((prev) => {
      const exists = prev.likedSongs.includes(songId);
      return {
        ...prev,
        likedSongs: exists
          ? prev.likedSongs.filter((id) => id !== songId)
          : [...prev.likedSongs, songId],
      };
    });
  };

  const toggleFollowArtist = (artistId: string) => {
    setUser((prev) => {
      const exists = prev.followedArtists.includes(artistId);
      return {
        ...prev,
        followedArtists: exists
          ? prev.followedArtists.filter((id) => id !== artistId)
          : [...prev.followedArtists, artistId],
      };
    });
  };

  const toggleFollowPodcast = (podcastId: string) => {
    setUser((prev) => {
      const exists = prev.followedPodcasts.includes(podcastId);
      return {
        ...prev,
        followedPodcasts: exists
          ? prev.followedPodcasts.filter((id) => id !== podcastId)
          : [...prev.followedPodcasts, podcastId],
      };
    });
  };

  const toggleSaveSermon = (sermonId: string) => {
    setUser((prev) => {
      const exists = prev.savedSermons.includes(sermonId);
      return {
        ...prev,
        savedSermons: exists
          ? prev.savedSermons.filter((id) => id !== sermonId)
          : [...prev.savedSermons, sermonId],
      };
    });
  };

  const createPlaylist = (title: string, description: string) => {
    const newPlaylist: Playlist = {
      id: `pl-custom-${Date.now()}`,
      title,
      description,
      coverArt: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=80',
      curatorName: user.name,
      isOfficial: false,
      isPublic: true,
      category: 'My Playlist',
      songs: [MOCK_SONGS[0]],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUserPlaylists((prev) => [newPlaylist, ...prev]);
  };

  const addSongToPlaylist = (playlistId: string, song: Song) => {
    setUserPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          const exists = pl.songs.some((s) => s.id === song.id);
          if (!exists) {
            return { ...pl, songs: [...pl.songs, song] };
          }
        }
        return pl;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setRole,
        likedSongs: user.likedSongs,
        toggleLikeSong,
        followedArtists: user.followedArtists,
        toggleFollowArtist,
        followedPodcasts: user.followedPodcasts,
        toggleFollowPodcast,
        savedSermons: user.savedSermons,
        toggleSaveSermon,
        userPlaylists,
        createPlaylist,
        addSongToPlaylist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
