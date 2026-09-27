import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Radio,
  User,
  Shield,
  Mic,
  Music2,
  Crown,
  ChevronDown,
  LogOut,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface NavbarProps {
  onNavigate: (tab: string) => void;
  activeTab: string;
  onSearchQuery?: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onSearchQuery }) => {
  const { user, setRole } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const roles: { role: UserRole; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { role: 'USER', label: 'Believer (User)', icon: User },
    { role: 'ARTIST', label: 'Gospel Artist', icon: Music2 },
    { role: 'PODCAST_CREATOR', label: 'Podcast Creator', icon: Mic },
    { role: 'MODERATOR', label: 'Community Moderator', icon: Shield },
    { role: 'ADMIN', label: 'Platform Admin', icon: Crown },
    { role: 'SUPER_ADMIN', label: 'Super Admin', icon: Sparkles },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onNavigate('search');
      if (onSearchQuery) onSearchQuery(searchInput.trim());
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative flex max-w-md flex-1 items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search songs, artists, podcasts, scriptures, sermons..."
          className="h-10 w-full rounded-full border border-slate-800 bg-slate-900/90 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 transition-all focus:border-amber-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Live Broadcast Button */}
        <button
          onClick={() => onNavigate('live-podcast')}
          className="hidden sm:flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-900/50 hover:border-red-500/60"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
          <Radio className="h-3.5 w-3.5" />
          <span>LIVE PODCAST</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute 1 top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Kingdom Alerts</span>
                <span className="text-xs text-amber-500 font-medium">3 New</span>
              </div>
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="rounded-lg bg-slate-800/60 p-2.5 transition hover:bg-slate-800">
                  <p className="font-semibold text-slate-200">🎙️ Dr. David Adeleke is LIVE</p>
                  <p className="text-slate-400 mt-0.5">Faith & Work: Q&A on Navigating Layoffs & AI in 2026</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">5 mins ago</span>
                </div>
                <div className="rounded-lg bg-slate-800/60 p-2.5 transition hover:bg-slate-800">
                  <p className="font-semibold text-slate-200">🙏 24 Believers Prayed For You</p>
                  <p className="text-slate-400 mt-0.5">Your prayer request for Family Restoration was interceded for.</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">2 hours ago</span>
                </div>
                <div className="rounded-lg bg-slate-800/60 p-2.5 transition hover:bg-slate-800">
                  <p className="font-semibold text-slate-200">🎵 New Release: Dunsin Oyekan</p>
                  <p className="text-slate-400 mt-0.5">"Yahweh Sabaoth (The Lord of Hosts)" is now streaming.</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">1 day ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/20"
          >
            <Shield className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-semibold">{user.role}</span>
            <ChevronDown className="h-3 w-3 opacity-70" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                Switch Role Sandbox
              </div>
              <div className="mt-1 space-y-0.5">
                {roles.map(({ role, label, icon: IconComponent }) => (
                  <button
                    key={role}
                    onClick={() => {
                      setRole(role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                      user.role === role
                        ? 'bg-amber-500/20 text-amber-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="h-4 w-4 text-amber-400" />
                      <span>{label}</span>
                    </div>
                    {user.role === role && <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div
          onClick={() => onNavigate('library')}
          className="flex cursor-pointer items-center gap-2.5 rounded-full p-1 transition hover:opacity-80"
          title="My Profile & Library"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full border border-amber-500/40 object-cover"
          />
        </div>
      </div>
    </header>
  );
};
