import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  AlertCircle,
  FileCheck,
  Users,
  Shield,
  Eye,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ContentItem } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { user, role, setRole } = useAuth();

  const [moderationQueue, setModerationQueue] = useState<ContentItem[]>([
    {
      id: 'mod-1',
      title: 'Apostolic Prayers for Territorial Shift',
      contentType: 'SERMON',
      creatorName: 'Pastor David O.',
      creatorEmail: 'david@faithreach.org',
      status: 'UNDER_REVIEW',
      submittedAt: 'Today, 10:30 AM',
      mediaUrl: 'https://actions.google.com/sounds/v1/ambiences/humming_drone.ogg',
      scriptureTag: 'Ephesians 6:12',
    },
    {
      id: 'mod-2',
      title: 'The Great Awakening Worship Album Track 3',
      contentType: 'MUSIC',
      creatorName: 'Acoustic Hymns Collective',
      creatorEmail: 'rights@hymnscollective.com',
      status: 'UNDER_REVIEW',
      submittedAt: 'Yesterday, 4:15 PM',
      mediaUrl: 'https://actions.google.com/sounds/v1/ambiences/humming_drone.ogg',
      scriptureTag: 'Psalm 100',
    },
    {
      id: 'mod-3',
      title: 'Youth Culture & Biblical Purity Dialogue',
      contentType: 'PODCAST',
      creatorName: 'Grace Youth Ministries',
      creatorEmail: 'youth@grace.org',
      status: 'APPROVED',
      submittedAt: '2 days ago',
      mediaUrl: 'https://actions.google.com/sounds/v1/ambiences/humming_drone.ogg',
      scriptureTag: '1 Timothy 4:12',
    },
  ]);

  const handleApprove = (id: string) => {
    setModerationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'APPROVED' } : item))
    );
  };

  const handleReject = (id: string) => {
    setModerationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'REJECTED' } : item))
    );
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            <span>Platform Governance & Content Security</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            Admin Moderation Center
          </h1>
          <p className="text-xs text-slate-400">
            Review submitted Gospel audio, podcasts, and video teachings to ensure theological fidelity and copyright compliance.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 p-1.5">
          <span className="text-[11px] font-semibold text-slate-400 pl-2">Active Role:</span>
          {(['ADMIN', 'CREATOR', 'LISTENER'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                role === r
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Moderation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400">Pending Review</span>
          <p className="text-2xl font-extrabold text-amber-400">
            {moderationQueue.filter((i) => i.status === 'UNDER_REVIEW').length}
          </p>
          <span className="text-[11px] text-slate-500">Requires editorial inspection</span>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400">Approved & Live</span>
          <p className="text-2xl font-extrabold text-emerald-400">
            {moderationQueue.filter((i) => i.status === 'APPROVED').length}
          </p>
          <span className="text-[11px] text-slate-500">Distributed across CDN</span>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400">DMCA Copyright Cleared</span>
          <p className="text-2xl font-extrabold text-slate-100">100%</p>
          <span className="text-[11px] text-emerald-400">Zero active disputes</span>
        </div>
      </div>

      {/* Content Review Pipeline Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100">Submissions Moderation Pipeline</h2>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/40">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-4">Title & Type</th>
                <th className="py-3.5 px-4">Creator / Ministry</th>
                <th className="py-3.5 px-4">Scripture Anchor</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {moderationQueue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/60 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-100 block">{item.title}</span>
                    <span className="text-[10px] text-amber-400 font-bold uppercase">
                      {item.contentType}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-slate-200 block">{item.creatorName}</span>
                    <span className="text-[10px] text-slate-500">{item.creatorEmail}</span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 font-medium">
                    📖 {item.scriptureTag || 'None'}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                        item.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.status === 'REJECTED'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {item.status === 'UNDER_REVIEW' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleReject(item.id)}
                          className="flex items-center gap-1 rounded-xl bg-red-950/60 border border-red-500/30 px-3 py-1 text-xs font-semibold text-red-400 hover:bg-red-900/60 transition"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 transition"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Approve</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono">Decision Recorded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
