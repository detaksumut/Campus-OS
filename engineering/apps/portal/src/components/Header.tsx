import React, { useState } from 'react';
import { Search, Bell, Mail, HelpCircle, User, ChevronDown, CheckCircle } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

interface HeaderProps {
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { profile } = useTenant();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 text-white px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* Left: Campus Dynamic Branding */}
      <div className="flex items-center gap-3 min-w-[280px]">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md border border-blue-400/30">
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-sm tracking-wide text-white uppercase leading-tight line-clamp-1">
            {profile.institutionName}
          </h1>
          <p className="text-[11px] text-blue-300 font-medium tracking-tight">
            {profile.tagline}
          </p>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari menu, data, mahasiswa, dosen, dll..." 
            className="w-full bg-slate-800/80 border border-slate-700 text-sm text-slate-100 rounded-full pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white relative transition-colors"
            title="Notifikasi"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              8
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 text-slate-800 dark:text-slate-100 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-sm">Notifikasi Penting</span>
                <span className="text-xs text-blue-500 font-semibold cursor-pointer">Tandai Dibaca</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-blue-50 dark:bg-slate-800/60 rounded-lg flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Sinkronisasi PDDIKTI Berhasil</p>
                    <p className="text-[10px] text-slate-500">2.860 Data transaksi terkirim hari ini</p>
                  </div>
                </div>
                <div className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-start gap-2">
                  <Bell size={14} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Jadwal UAS Semester Genap</p>
                    <p className="text-[10px] text-slate-500">Jadwal telah diterbitkan ke portal mahasiswa</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white relative transition-colors" title="Pesan">
          <Mail size={18} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Help Center */}
        <button className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors" title="Bantuan">
          <HelpCircle size={18} />
        </button>

        <div className="h-6 w-px bg-slate-800" />

        {/* User Profile */}
        <div 
          onClick={onOpenSettings}
          className="flex items-center gap-3 pl-1 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-sm text-blue-400">
            <User size={18} />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-bold text-white leading-tight">{profile.executiveName}</p>
            <p className="text-[10px] text-blue-400 font-medium">{profile.executiveTitle}</p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
};
