import React, { useState } from 'react';
import {
  Radio,
  Users,
  Send,
  Heart,
  Flame,
  Crown,
  ThumbsUp,
  Sparkles,
  HelpCircle,
  Volume2,
  Mic,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { MOCK_LIVE_SESSION } from '../../data/mockData';
import { ChatMessage, QuestionItem } from '../../types';

interface LivePodcastRoomProps {
  onBack: () => void;
}

export const LivePodcastRoom: React.FC<LivePodcastRoomProps> = ({ onBack }) => {
  const [session, setSession] = useState(MOCK_LIVE_SESSION);
  const [chatInput, setChatInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'qa'>('chat');
  const [reactions, setReactions] = useState<{ id: number; type: string; x: number }[]>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      userName: 'Emmanuel (You)',
      message: chatInput.trim(),
      timestamp: 'Just now',
    };

    setSession((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMsg],
    }));

    setChatInput('');
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    const newQ: QuestionItem = {
      id: `q-${Date.now()}`,
      userName: 'Emmanuel (You)',
      question: questionInput.trim(),
      upvotes: 1,
      answered: false,
    };

    setSession((prev) => ({
      ...prev,
      questionsQueue: [newQ, ...prev.questionsQueue],
    }));

    setQuestionInput('');
  };

  const handleUpvoteQuestion = (qId: string) => {
    setSession((prev) => ({
      ...prev,
      questionsQueue: prev.questionsQueue.map((q) =>
        q.id === qId ? { ...q, upvotes: q.upvotes + 1 } : q
      ),
    }));
  };

  const triggerReaction = (type: string) => {
    const newReaction = {
      id: Date.now() + Math.random(),
      type,
      x: Math.floor(Math.random() * 80) + 10,
    };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Live Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            ← Exit Live Room
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-red-500">
              BROADCASTING LIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-xs font-mono text-slate-300">
          <Users className="h-3.5 w-3.5 text-red-400" />
          <span>{session.listenersCount.toLocaleString()} in attendance</span>
        </div>
      </div>

      {/* Main Studio Arena & Chat Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Speaker Stage & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Virtual Stage Box */}
          <div className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 text-center shadow-2xl flex flex-col items-center justify-center min-h-[380px]">
            {/* Animated Soundwave Rings around Host */}
            <div className="relative mb-6">
              <div className="absolute -inset-4 rounded-full bg-red-500/20 blur-xl animate-pulse" />
              <div className="absolute -inset-2 rounded-full border-2 border-red-500/40 animate-ping duration-1000" />
              <img
                src={session.hostAvatar}
                alt={session.host}
                className="relative h-28 w-28 rounded-full object-cover border-4 border-red-500 shadow-2xl"
              />
              <div className="absolute -bottom-2 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                <Mic className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-1 max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {session.showTitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                {session.currentTopic}
              </h2>
              <p className="text-xs text-slate-400">
                Keynote Speaker: <span className="text-slate-200 font-semibold">{session.host}</span>
              </p>
            </div>

            {/* Audio Signal Visualizer Bars */}
            <div className="mt-8 flex items-center gap-1.5 h-8">
              {[40, 70, 95, 60, 85, 100, 75, 45, 90, 65, 80, 50, 85, 70, 95].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-1 rounded-full bg-gradient-to-t from-red-500 to-amber-400 animate-pulse"
                />
              ))}
            </div>

            {/* Floating Reactions Particles Display */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {reactions.map((r) => (
                <div
                  key={r.id}
                  style={{ left: `${r.x}%` }}
                  className="absolute bottom-12 text-3xl animate-in slide-in-from-bottom-10 fade-out duration-1000"
                >
                  {r.type}
                </div>
              ))}
            </div>
          </div>

          {/* Reaction Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Reactions:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerReaction('🙏')}
                className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-amber-300 transition active:scale-95"
              >
                <span>🙏</span>
                <span>Amen</span>
              </button>
              <button
                onClick={() => triggerReaction('👑')}
                className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-amber-300 transition active:scale-95"
              >
                <span>👑</span>
                <span>Praise</span>
              </button>
              <button
                onClick={() => triggerReaction('❤️')}
                className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-rose-400 transition active:scale-95"
              >
                <span>❤️</span>
                <span>Love</span>
              </button>
              <button
                onClick={() => triggerReaction('🔥')}
                className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-amber-400 transition active:scale-95"
              >
                <span>🔥</span>
                <span>Holy Fire</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Chat & Q&A Board */}
        <div className="flex flex-col h-[520px] rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'border-b-2 border-amber-500 text-amber-400 bg-slate-800/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Live Fellowship Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'qa'
                  ? 'border-b-2 border-amber-500 text-amber-400 bg-slate-800/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Ask Host Q&A ({session.questionsQueue.length})</span>
            </button>
          </div>

          {/* Chat Tab Content */}
          {activeTab === 'chat' && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {session.chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`rounded-xl p-3 text-xs ${
                      msg.isHost
                        ? 'bg-amber-500/15 border border-amber-500/30'
                        : 'bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-bold ${
                          msg.isHost ? 'text-amber-300' : 'text-slate-200'
                        }`}
                      >
                        {msg.isHost ? '🎙️ ' : ''}
                        {msg.userName}
                      </span>
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="border-t border-slate-800 p-3 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Share a message or prayer with the live room..."
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 p-2 text-slate-950 font-bold hover:bg-amber-400 transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

          {/* Q&A Tab Content */}
          {activeTab === 'qa' && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {session.questionsQueue.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-start justify-between gap-3 rounded-xl bg-slate-800/60 p-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-slate-200 block mb-0.5">
                        {q.userName}
                      </span>
                      <p className="text-slate-300">{q.question}</p>
                    </div>
                    <button
                      onClick={() => handleUpvoteQuestion(q.id)}
                      className="flex flex-col items-center gap-0.5 rounded-lg bg-slate-700/80 px-2 py-1 text-[11px] font-bold text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{q.upvotes}</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Question Input form */}
              <form onSubmit={handleSendQuestion} className="border-t border-slate-800 p-3 flex gap-2">
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder="Submit a question for the live host Q&A..."
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  Ask
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
