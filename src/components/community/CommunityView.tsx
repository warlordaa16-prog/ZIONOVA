import React, { useState } from 'react';
import {
  Users2,
  Heart,
  Sparkles,
  Plus,
  MessageSquare,
  CheckCircle2,
  BookOpen,
  Send,
  Shield,
  Clock,
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';

export const CommunityView: React.FC = () => {
  const {
    posts,
    prayerRequests,
    testimonies,
    addPost,
    toggleLikePost,
    toggleAmenPost,
    addPrayerRequest,
    prayForRequest,
    addTestimony,
    toggleAmenTestimony,
  } = useCommunity();

  const [activeTab, setActiveTab] = useState<'prayers' | 'testimonies' | 'discussions'>('prayers');

  // New Prayer Request Modal state
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [prayerTitle, setPrayerTitle] = useState('');
  const [prayerDetails, setPrayerDetails] = useState('');
  const [prayerScripture, setPrayerScripture] = useState('');
  const [isAnon, setIsAnon] = useState(false);

  // New Post Form state
  const [postInput, setPostInput] = useState('');
  const [postScripture, setPostScripture] = useState('');

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerTitle.trim() || !prayerDetails.trim()) return;

    addPrayerRequest(prayerTitle.trim(), prayerDetails.trim(), prayerScripture.trim(), isAnon);
    setPrayerTitle('');
    setPrayerDetails('');
    setPrayerScripture('');
    setIsAnon(false);
    setIsPrayerModalOpen(false);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postInput.trim()) return;

    addPost(postInput.trim(), postScripture.trim());
    setPostInput('');
    setPostScripture('');
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-950 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Users2 className="h-3.5 w-3.5" />
              <span>Believers Fellowship & Prayer Wall</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              One Body, One Faith, One Prayer
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              James 5:16 — "The prayer of a righteous person is powerful and effective." Stand in the gap for brethren worldwide.
            </p>
          </div>

          <button
            onClick={() => setIsPrayerModalOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Request Prayer</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('prayers')}
          className={`py-3 text-xs font-bold transition border-b-2 ${
            activeTab === 'prayers'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          🙏 Prayer Request Wall ({prayerRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('testimonies')}
          className={`py-3 text-xs font-bold transition border-b-2 ${
            activeTab === 'testimonies'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          ✨ Verified Testimonies ({testimonies.length})
        </button>
        <button
          onClick={() => setActiveTab('discussions')}
          className={`py-3 text-xs font-bold transition border-b-2 ${
            activeTab === 'discussions'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          💬 Fellowship Discussions ({posts.length})
        </button>
      </div>

      {/* Tab 1: Prayer Wall */}
      {activeTab === 'prayers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prayerRequests.map((req) => {
            const hasPrayed = req.hasUserPrayed;

            return (
              <div
                key={req.id}
                className="flex flex-col justify-between rounded-3xl bg-slate-900/60 p-5 border border-slate-800 hover:border-amber-500/30 transition shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-300">
                      {req.isAnonymous ? '🕊️ Anonymous Believer' : `👤 ${req.authorName}`}
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                      {req.createdAt}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100">{req.title}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {req.details}
                  </p>

                  {req.scriptureFocus && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                      <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                      <span>Anchor: {req.scriptureFocus}</span>
                    </div>
                  )}

                  {req.status === 'ANSWERED' && req.answeredPraiseReport && (
                    <div className="mt-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-3 text-xs text-emerald-200">
                      <span className="font-bold block text-emerald-400">
                        🎉 Praise Report / Answered Prayer:
                      </span>
                      {req.answeredPraiseReport}
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-xs text-slate-400">
                    <span className="font-bold text-amber-400">{req.prayedCount}</span> believers praying
                  </span>

                  <button
                    onClick={() => prayForRequest(req.id)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                      hasPrayed
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    }`}
                  >
                    <span>🙏</span>
                    <span>{hasPrayed ? 'Prayed & Interceded' : 'I Am Praying'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Testimonies */}
      {activeTab === 'testimonies' && (
        <div className="space-y-4">
          {testimonies.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-slate-900/60 p-6 border border-slate-800 hover:border-amber-500/30 transition shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-200 text-sm">{t.authorName}</span>
                  {t.isVerified && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Verified Testimony</span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">{t.createdAt}</span>
              </div>

              <h3 className="text-base font-bold text-amber-300">{t.title}</h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{t.story}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span className="rounded bg-slate-800 px-2 py-0.5">{t.category}</span>
                <button
                  onClick={() => toggleAmenTestimony(t.id)}
                  className="flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/25 transition"
                >
                  <span>👑 Praise God! ({t.amenCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Fellowship Discussions */}
      {activeTab === 'discussions' && (
        <div className="space-y-6">
          {/* Post creator form */}
          <form onSubmit={handlePostSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-xl">
            <textarea
              rows={3}
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
              placeholder="Share a spiritual insight, scripture revelation, or encouragement with the community..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <input
                type="text"
                value={postScripture}
                onChange={(e) => setPostScripture(e.target.value)}
                placeholder="Scripture reference (e.g., Romans 8:28)..."
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none flex-1 max-w-xs"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post to Fellowship</span>
              </button>
            </div>
          </form>

          {/* Posts list */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-3xl bg-slate-900/60 p-5 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="h-10 w-10 rounded-full object-cover border border-amber-500/30"
                    />
                    <div>
                      <span className="font-bold text-slate-100 text-xs block">
                        {post.authorName}
                      </span>
                      <span className="text-[10px] text-slate-500">{post.createdAt}</span>
                    </div>
                  </div>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-amber-400 font-semibold">
                    {post.category.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {post.content}
                </p>

                {post.scriptureRef && (
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 text-xs text-amber-300 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <span>{post.scriptureRef}</span>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-2 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => toggleAmenPost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
                      post.userAmen
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                  >
                    <span>🙏 Amen ({post.amenCount})</span>
                  </button>
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
                      post.userLiked
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'text-slate-400 hover:text-rose-300'
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${post.userLiked ? 'fill-current' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prayer Request Modal */}
      {isPrayerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <form
            onSubmit={handlePrayerSubmit}
            className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl animate-in fade-in"
          >
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>🙏 Submit Prayer Request</span>
            </h3>
            <p className="text-xs text-slate-400">
              Your brothers and sisters in Christ around the globe will intercede on your behalf.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Prayer Title / Subject
                </label>
                <input
                  type="text"
                  required
                  value={prayerTitle}
                  onChange={(e) => setPrayerTitle(e.target.value)}
                  placeholder="e.g., Healing for Mother's Surgery, Peace in Ministry..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Detailed Prayer Need
                </label>
                <textarea
                  rows={4}
                  required
                  value={prayerDetails}
                  onChange={(e) => setPrayerDetails(e.target.value)}
                  placeholder="Share details so believers can agree in faith with you..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Scripture Anchor (Optional)
                </label>
                <input
                  type="text"
                  value={prayerScripture}
                  onChange={(e) => setPrayerScripture(e.target.value)}
                  placeholder="e.g., Isaiah 53:5, Philippians 4:6"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonCheck"
                  checked={isAnon}
                  onChange={(e) => setIsAnon(e.target.checked)}
                  className="rounded border-slate-800 accent-amber-500"
                />
                <label htmlFor="anonCheck" className="text-slate-400 cursor-pointer">
                  Post anonymously on the global prayer wall
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsPrayerModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
              >
                Post Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
