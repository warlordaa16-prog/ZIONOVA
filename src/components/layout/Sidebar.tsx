import React from 'react';
import {
  Flame,
  Home,
  Music2,
  Mic,
  BookOpen,
  Film,
  Users2,
  Calendar,
  Library,
  Sliders,
  ShieldCheck,
  PlusCircle,
  Radio,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenCreatePlaylist?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  onOpenCreatePlaylist,
}) => {
  const { user, userPlaylists } = useAuth();

  const isCreatorOrArtist =
    user.role === 'ARTIST' ||
    user.role === 'PODCAST_CREATOR' ||
    user.role === 'CONTENT_CREATOR' ||
    user.role === 'ADMIN' ||
    user.role === 'SUPER_ADMIN';

  const isAdminOrModerator =
    user.role === 'MODERATOR' ||
    user.role === 'ADMIN' ||
    user.role === 'SUPER_ADMIN';

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'music', label: 'Gospel Music', icon: Music2 },
    { id: 'podcasts', label: 'Podcasts', icon: Mic, badge: 'Dedicated' },
    { id: 'live-podcast', label: 'Live Podcast', icon: Radio, live: true },
    { id: 'sermons', label: 'Sermons & Word', icon: BookOpen },
    { id: 'videos', label: 'Videos & Shorts', icon: Film },
    { id: 'community', label: 'Prayer & Community', icon: Users2 },
    { id: 'events', label: 'Kingdom Events', icon: Calendar },
    { id: 'library', label: 'My Library', icon: Library },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-slate-800/80 bg-slate-950/95 p-4 text-slate-300">
      {/* Brand Header */}
      <div>
        <div
          onClick={() => onNavigate('home')}
          className="flex cursor-pointer items-center gap-3 px-2 py-3 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 shadow-lg shadow-amber-500/20">
            <Flame className="h-6 w-6 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <span className="font-serif-brand text-xl font-bold tracking-widest text-slate-100 block leading-none">
              ZIONOVA
            </span>
            <span className="text-[10px] font-medium tracking-wider text-amber-400 uppercase mt-0.5 block">
              Christian Media
            </span>
          </div>
        </div>

        {/* Primary Ecosystem Navigation */}
        <div className="mt-6 space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Ecosystem
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-amber-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.live && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                )}
                {item.badge && !isActive && (
                  <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-amber-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Creator & Admin Portals */}
        {(isCreatorOrArtist || isAdminOrModerator) && (
          <div className="mt-6 space-y-1 border-t border-slate-800/80 pt-4">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-amber-400/80 mb-2">
              Studio & Control
            </p>
            {isCreatorOrArtist && (
              <button
                onClick={() => onNavigate('creator-studio')}
                className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  activeTab === 'creator-studio'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`}
              >
                <Sliders className="h-4 w-4 text-amber-400" />
                <span>Creator Studio</span>
              </button>
            )}
            {isAdminOrModerator && (
              <button
                onClick={() => onNavigate('admin-panel')}
                className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  activeTab === 'admin-panel'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`}
              >
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Admin & Moderation</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* User Playlists Shortcut & Footer */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between px-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Worship Playlists
          </span>
          <button
            onClick={onOpenCreatePlaylist}
            className="text-slate-400 hover:text-amber-400 transition"
            title="Create Playlist"
          >
            <PlusCircle className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-32 space-y-1 overflow-y-auto pr-1 text-xs">
          {userPlaylists.slice(0, 4).map((pl) => (
            <div
              key={pl.id}
              onClick={() => onNavigate('music')}
              className="cursor-pointer truncate rounded-lg px-2.5 py-1.5 text-slate-400 hover:bg-slate-900 hover:text-amber-300 transition"
            >
              🎵 {pl.title}
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-900/10 border border-amber-500/20 p-3">
          <p className="text-xs font-semibold text-amber-300">Faith in Media</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Colossians 3:16 — "Sing psalms, hymns, and spiritual songs with gratitude."
          </p>
        </div>
      </div>
    </aside>
  );
};
