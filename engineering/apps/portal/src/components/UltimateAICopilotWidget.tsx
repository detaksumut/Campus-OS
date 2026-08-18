import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle, Users, Video, Bot, Loader2 } from 'lucide-react';
import { useTenant, aiCopilotService, ChatMessage } from '@campus-os/shared';

export const UltimateAICopilotWidget: React.FC = () => {
  const { profile } = useTenant();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    try {
      const reply = await aiCopilotService.sendMessage(userMsg.content, messages);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-5 border border-blue-500/30 shadow-xl relative overflow-hidden flex flex-col justify-between">
      {/* Glow Effect */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />

      <div>
        {/* Header with 3D Robot Mascot */}
        <div className="flex items-start justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-xs text-white">UltimateAI</h4>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-blue-500/80 text-white rounded uppercase tracking-tighter">
                  Beta
                </span>
              </div>
              <p className="text-[10px] text-blue-300 font-semibold">Campus Copilot</p>
            </div>
          </div>

          {/* 3D Robot Visual Element */}
          <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-xl shadow-inner animate-bounce duration-1000">
            🤖
          </div>
        </div>

        {/* Dynamic Greeting */}
        <p className="text-xs text-slate-300 font-medium mb-3 relative z-10 leading-relaxed">
          Halo <span className="font-bold text-white">{profile.executiveName}</span>, Ada beberapa insight penting untuk Anda hari ini:
        </p>

        {/* Live Status Pills */}
        <div className="space-y-2 mb-4 relative z-10">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Users size={13} />
            </div>
            <div className="text-xs">
              <p className="text-[10px] text-slate-400">Mahasiswa aktif hari ini</p>
              <p className="font-bold text-slate-100 text-[11px]">2.860 mahasiswa</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle size={13} />
            </div>
            <div className="text-xs">
              <p className="text-[10px] text-slate-400">Sinkronisasi PDDIKTI</p>
              <p className="font-bold text-emerald-400 text-[11px]">Berhasil</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Video size={13} />
            </div>
            <div className="text-xs">
              <p className="text-[10px] text-slate-400">Kelas Online</p>
              <p className="font-bold text-slate-100 text-[11px]">128 kelas aktif</p>
            </div>
          </div>
        </div>

        {/* Message Log if any */}
        {messages.length > 0 && (
          <div className="max-h-40 overflow-y-auto space-y-2 mb-3 pr-1 text-xs custom-scrollbar">
            {messages.map(m => (
              <div
                key={m.id}
                className={`p-2.5 rounded-xl text-xs ${
                  m.role === 'user'
                    ? 'bg-blue-600/60 text-white ml-4 text-right'
                    : 'bg-slate-800/90 text-blue-100 mr-4 border border-blue-500/20'
                }`}
              >
                <p className="whitespace-pre-line text-[11px] leading-relaxed">{m.content}</p>
                <span className="text-[9px] opacity-60 mt-1 block">{m.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Chat Input */}
      <form onSubmit={handleSend} className="relative z-10 pt-1">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Tanya Jarvis..."
            className="w-full bg-slate-800/90 border border-blue-500/40 text-xs text-white rounded-xl pl-3 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-md"
          >
            {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
          </button>
        </div>
      </form>
    </div>
  );
};
