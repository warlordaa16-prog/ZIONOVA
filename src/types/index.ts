export type UserRole =
  | 'USER'
  | 'ARTIST'
  | 'PODCAST_CREATOR'
  | 'CONTENT_CREATOR'
  | 'MODERATOR'
  | 'EDITOR'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export type ContentStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'PROCESSING'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'SUSPENDED'
  | 'ARCHIVED';

export type MediaType = 'MUSIC' | 'PODCAST' | 'SERMON' | 'VIDEO' | 'SHORT';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  isVerified?: boolean;
  memberSince: string;
  country?: string;
  favoriteGenres?: string[];
  followedArtists: string[];
  followedPodcasts: string[];
  savedPlaylists: string[];
  likedSongs: string[];
  savedEpisodes: string[];
  savedSermons: string[];
  savedVideos: string[];
}

export interface LyricsLine {
  time: number; // in seconds
  text: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  featuredArtists?: string[];
  album?: string;
  albumId?: string;
  genre: string;
  category: 'Worship' | 'Praise' | 'Contemporary' | 'Afro-Gospel' | 'Gospel Rap' | 'Hymn' | 'Acoustic';
  duration: number; // in seconds
  releaseDate: string;
  description?: string;
  artwork: string;
  audioUrl: string;
  videoUrl?: string;
  lyrics?: LyricsLine[];
  playCount: number;
  likes: number;
  downloads: number;
  copyrightInfo?: string;
  bpm?: number;
  musicalKey?: string;
  scriptureInspiration?: string;
  status: ContentStatus;
  relatedPodcastIds?: string[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  releaseYear: number;
  coverArt: string;
  genre: string;
  tracksCount: number;
  songs: Song[];
  description?: string;
  recordLabel?: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  banner: string;
  monthlyListeners: number;
  followersCount: number;
  genres: string[];
  topSongs: Song[];
  albums: Album[];
  isVerified: boolean;
  relatedPodcastShowIds?: string[];
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    website?: string;
  };
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverArt: string;
  curatorName: string;
  isOfficial: boolean;
  isPublic: boolean;
  category: string;
  songs: Song[];
  createdAt: string;
}

export interface TranscriptLine {
  time: number; // in seconds
  speaker: string;
  text: string;
  scriptureRef?: string;
}

export interface PodcastEpisode {
  id: string;
  showId: string;
  showTitle: string;
  title: string;
  episodeNumber: number;
  season: number;
  description: string;
  artwork: string;
  audioUrl: string;
  videoUrl?: string;
  hasVideo: boolean;
  host: string;
  guests?: string[];
  releaseDate: string;
  duration: number; // seconds
  transcript?: TranscriptLine[];
  topics: string[];
  tags: string[];
  scriptureReferences?: string[];
  playCount: number;
  likes: number;
  status: ContentStatus;
  relatedSongIds?: string[];
}

export interface PodcastShow {
  id: string;
  title: string;
  tagline: string;
  description: string;
  host: string;
  hostId: string;
  hostAvatar: string;
  coHosts?: string[];
  category: string;
  language: string;
  country: string;
  followersCount: number;
  totalEpisodes: number;
  coverArt: string;
  seasonsCount: number;
  rating: number;
  isVerified: boolean;
  isLiveNow?: boolean;
  currentLiveSessionId?: string;
  episodes: PodcastEpisode[];
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface ChatMessage {
  id: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  isHost?: boolean;
  reactionType?: 'AMEN' | 'PRAISE' | 'HEART' | 'FIRE';
}

export interface QuestionItem {
  id: string;
  userName: string;
  question: string;
  upvotes: number;
  answered: boolean;
}

export interface LivePodcastSession {
  id: string;
  showId: string;
  showTitle: string;
  host: string;
  hostAvatar: string;
  currentTopic: string;
  listenersCount: number;
  startTime: string;
  isLive: boolean;
  videoStreamUrl?: string;
  audioStreamUrl: string;
  chatMessages: ChatMessage[];
  questionsQueue: QuestionItem[];
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  speakerTitle?: string;
  ministry: string;
  scriptureBook: string;
  scriptureVerse: string;
  topic: string;
  duration: number; // in seconds
  date: string;
  audioUrl: string;
  videoUrl?: string;
  studyNotesUrl?: string;
  artwork: string;
  description: string;
  views: number;
  likes: number;
  status: ContentStatus;
}

export interface VideoContent {
  id: string;
  title: string;
  creator: string;
  type: 'MUSIC_VIDEO' | 'MOVIE' | 'INTERVIEW' | 'CONFERENCE' | 'SHORT';
  duration: number; // in seconds
  videoUrl: string;
  thumbnail: string;
  releaseDate: string;
  description: string;
  views: number;
  likes: number;
  scriptureTag?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  content: string;
  scriptureRef?: string;
  category: 'GENERAL' | 'TESTIMONY' | 'PRAYER' | 'VERSE_STUDY';
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  amenCount: number;
  userLiked?: boolean;
  userAmen?: boolean;
}

export interface PrayerRequest {
  id: string;
  authorName: string;
  title: string;
  details: string;
  scriptureFocus?: string;
  isAnonymous: boolean;
  prayedCount: number;
  createdAt: string;
  status: 'ACTIVE' | 'ANSWERED';
  answeredPraiseReport?: string;
  hasUserPrayed?: boolean;
}

export interface Testimony {
  id: string;
  authorName: string;
  title: string;
  story: string;
  category: string;
  createdAt: string;
  likesCount: number;
  amenCount: number;
  isVerified: boolean;
}

export interface KingdomEvent {
  id: string;
  title: string;
  organizer: string;
  type: 'CONFERENCE' | 'CONCERT' | 'WORSHIP_NIGHT' | 'PODCAST_LIVE' | 'SEMINAR';
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  livestreamUrl?: string;
  registrationUrl?: string;
  bannerImage: string;
  description: string;
  featuredSpeakers: string[];
}

export interface PlayerMediaItem {
  id: string;
  title: string;
  subtitle: string;
  artwork: string;
  audioUrl: string;
  videoUrl?: string;
  mediaType: MediaType;
  duration: number;
  lyrics?: LyricsLine[];
  transcript?: TranscriptLine[];
  scriptureRef?: string;
  artistOrHostId?: string;
  category?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  contentType: 'MUSIC' | 'PODCAST' | 'SERMON' | 'VIDEO';
  creatorName: string;
  creatorEmail: string;
  status: 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'PUBLISHED';
  submittedAt: string;
  mediaUrl: string;
  scriptureTag?: string;
}

export interface PodcastAnalyticsData {
  totalPlays: number;
  uniqueListeners: number;
  avgListenDurationMinutes: number;
  completionRate: number;
  downloadsCount: number;
  totalFollowers: number;
  topCountries: { country: string; percent: number }[];
  deviceBreakdown: { device: string; percent: number }[];
  monthlyPlays: { month: string; plays: number }[];
}
