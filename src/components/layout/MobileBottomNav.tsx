import React from 'react';
import { Home, Music2, Mic, BookOpen, Users2, Library } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onNavigate }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'music', label: 'Music', icon: Music2 },
    { id: 'podcasts', label: 'Podcasts', icon: Mic },
    { id: 'sermons', label: 'Sermons', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users2 },
    { id: 'library', label: 'Library', icon: Library },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-slate-800 bg-slate-950/95 px-2 backdrop-blur-lg lg:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 transition ${
              isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
