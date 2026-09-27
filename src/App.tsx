import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { CommunityProvider } from './context/CommunityContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { GlobalAudioPlayer } from './components/player/GlobalAudioPlayer';
import { LyricsModal } from './components/player/LyricsModal';
import { QueueModal } from './components/player/QueueModal';
import { VideoPlayerModal } from './components/player/VideoPlayerModal';

import { HomeView } from './components/home/HomeView';
import { MusicView } from './components/music/MusicView';
import { PodcastsView } from './components/podcasts/PodcastsView';
import { PodcastDetailView } from './components/podcasts/PodcastDetailView';
import { LivePodcastRoom } from './components/podcasts/LivePodcastRoom';
import { SermonsView } from './components/sermons/SermonsView';
import { VideosView } from './components/videos/VideosView';
import { CommunityView } from './components/community/CommunityView';
import { EventsView } from './components/events/EventsView';
import { LibraryView } from './components/library/LibraryView';
import { SearchView } from './components/search/SearchView';
import { CreatorDashboard } from './components/creator/CreatorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PodcastShow } from './types';
import { MOCK_PODCAST_SHOWS } from './data/mockData';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPodcastShow, setSelectedPodcastShow] = useState<PodcastShow | null>(null);

  const handleNavigate = (tab: string, itemId?: string) => {
    setActiveTab(tab);
    if (tab === 'podcasts' && itemId) {
      const show = MOCK_PODCAST_SHOWS.find((s) => s.id === itemId);
      if (show) setSelectedPodcastShow(show);
    } else if (tab !== 'podcasts') {
      setSelectedPodcastShow(null);
    }
  };

  const renderActiveView = () => {
    if (activeTab === 'home') {
      return <HomeView onNavigate={handleNavigate} />;
    }

    if (activeTab === 'music') {
      return <MusicView />;
    }

    if (activeTab === 'podcasts') {
      if (selectedPodcastShow) {
        return (
          <PodcastDetailView
            show={selectedPodcastShow}
            onBack={() => setSelectedPodcastShow(null)}
          />
        );
      }
      return (
        <PodcastsView
          onSelectShow={(show) => setSelectedPodcastShow(show)}
          onNavigateToLive={() => setActiveTab('live-podcast')}
        />
      );
    }

    if (activeTab === 'live-podcast') {
      return <LivePodcastRoom onBack={() => setActiveTab('podcasts')} />;
    }

    if (activeTab === 'sermons') {
      return <SermonsView />;
    }

    if (activeTab === 'videos') {
      return <VideosView />;
    }

    if (activeTab === 'community') {
      return <CommunityView />;
    }

    if (activeTab === 'events') {
      return <EventsView />;
    }

    if (activeTab === 'library') {
      return <LibraryView />;
    }

    if (activeTab === 'search') {
      return <SearchView />;
    }

    if (activeTab === 'creator' || activeTab === 'creator-studio') {
      return <CreatorDashboard />;
    }

    if (activeTab === 'admin' || activeTab === 'admin-panel') {
      return <AdminDashboard />;
    }

    return <HomeView onNavigate={handleNavigate} />;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Desktop Persistent Sidebar */}
      <Sidebar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

        {/* Scrollable Stage */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">{renderActiveView()}</div>
        </main>
      </div>

      {/* Persistent Global Player */}
      <GlobalAudioPlayer />

      {/* Synchronized Lyrics / Transcripts Overlay */}
      <LyricsModal />

      {/* Up Next Queue Drawer */}
      <QueueModal />

      {/* Video Player Modal */}
      <VideoPlayerModal />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <CommunityProvider>
          <MainApp />
        </CommunityProvider>
      </PlayerProvider>
    </AuthProvider>
  );
}
