import React, { useState } from 'react';
import {
  Mic,
  Plus,
  Radio,
  BarChart3,
  Users2,
  Calendar,
  Sparkles,
  Upload,
  CheckCircle2,
  FileText,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PodcastEpisode } from '../../types';

export const CreatorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [epTitle, setEpTitle] = useState('');
  const [epDesc, setEpDesc] = useState('');
  const [epScripture, setEpScripture] = useState('');
  const [epTranscript, setEpTranscript] = useState('');
  const [publishedEpisodes, setPublishedEpisodes] = useState<PodcastEpisode[]>([]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!epTitle.trim()) return;

    const newEpisode: PodcastEpisode = {
      id: `ep-${Date.now()}`,
      showId: 'show-1',
      showTitle: 'Kingdom Innovation & Faith in Tech',
      title: epTitle.trim(),
      description: epDesc.trim(),
      audioUrl: 'https://actions.google.com/sounds/v1/ambiences/humming_drone.ogg',
      duration: 1800,
      season: 1,
      episodeNumber: publishedEpisodes.length + 5,
      releaseDate: 'Today',
      artwork: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80',
      hasVideo: false,
      host: user.name,
      topics: ['Faith', 'Innovation'],
      tags: ['Kingdom', 'Devotion'],
      scriptureReferences: epScripture ? [epScripture] : [],
      playCount: 1,
      likes: 0,
      status: 'PUBLISHED',
      transcript: epTranscript
        ? [
            {
              time: 0,
              speaker: user.name,
              text: epTranscript,
              scriptureRef: epScripture,
            },
          ]
        : undefined,
    };

    setPublishedEpisodes([newEpisode, ...publishedEpisodes]);
    setEpTitle('');
    setEpDesc('');
    setEpScripture('');
    setEpTranscript('');
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Podcast Creator & Minister Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            Studio Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Broadcast ministry messages, upload podcast episodes, sync transcripts, and manage live rooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
          >
            <Upload className="h-4 w-4" />
            <span>Upload New Episode</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400">Total Stream Plays</span>
          <p className="text-2xl font-extrabold text-slate-100">142,890</p>
          <span className="text-[11px] font-semibold text-emerald-400">↑ 18.4% this month</span>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400">Subscribers / Followers</span>
          <p className="text-2xl font-extrabold text-slate-100">28,400</p>
          <span className="text-[11px] font-semibold text-amber-400">+420 this week</span>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400">Avg. Listen Completion</span>
          <p className="text-2xl font-extrabold text-slate-100">84.2%</p>
          <span className="text-[11px] font-semibold text-emerald-400">High engagement</span>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400">Live Q&A Interactions</span>
          <p className="text-2xl font-extrabold text-slate-100">1,240</p>
          <span className="text-[11px] font-semibold text-amber-400">Across 6 sessions</span>
        </div>
      </div>

      {/* Episode Management Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100">Your Published Podcast Episodes</h2>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Episode Title</th>
                <th className="py-3 px-4">Scripture Focus</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/60 transition">
                <td className="py-3 px-4 font-semibold text-slate-100">
                  Ep 4: Sacred Architecture: Building Without Anxiety
                </td>
                <td className="py-3 px-4 text-amber-400">Psalm 127:1</td>
                <td className="py-3 px-4 font-mono">38 mins</td>
                <td className="py-3 px-4">
                  <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-semibold">
                    PUBLISHED
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-emerald-400 font-semibold">Approved ✓</td>
              </tr>

              {publishedEpisodes.map((ep) => (
                <tr key={ep.id} className="hover:bg-slate-800/60 transition">
                  <td className="py-3 px-4 font-semibold text-slate-100">{ep.title}</td>
                  <td className="py-3 px-4 text-amber-400">
                    {ep.scriptureReferences?.[0] || 'General'}
                  </td>
                  <td className="py-3 px-4 font-mono">{Math.floor(ep.duration / 60)} mins</td>
                  <td className="py-3 px-4">
                    <span className="rounded-full bg-amber-500/20 text-amber-300 px-2 py-0.5 text-[10px] font-semibold">
                      NEWLY UPLOADED
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-amber-400 font-semibold">
                    Processing AI Transcript
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Upload Episode Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <form
            onSubmit={handleUploadSubmit}
            className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Mic className="h-5 w-5 text-amber-400" />
                <span>Upload Podcast Episode</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Episode Title</label>
                <input
                  type="text"
                  required
                  value={epTitle}
                  onChange={(e) => setEpTitle(e.target.value)}
                  placeholder="e.g., The Discipline of Daily Devotion"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Description & Key Takeaways
                </label>
                <textarea
                  rows={3}
                  required
                  value={epDesc}
                  onChange={(e) => setEpDesc(e.target.value)}
                  placeholder="Summarize the core biblical insights in this episode..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Primary Scripture Anchor
                </label>
                <input
                  type="text"
                  value={epScripture}
                  onChange={(e) => setEpScripture(e.target.value)}
                  placeholder="e.g., Romans 12:1-2"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Transcript or Speaking Outline
                </label>
                <textarea
                  rows={4}
                  value={epTranscript}
                  onChange={(e) => setEpTranscript(e.target.value)}
                  placeholder="Paste episode speech transcript for real-time synchronized reader..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Publish Episode
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
