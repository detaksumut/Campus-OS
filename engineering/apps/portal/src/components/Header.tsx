import React, { useState } from 'react';
import { Search, Bell, Mail, HelpCircle, User, ChevronDown, CheckCircle, ShieldCheck, GraduationCap, BookOpen } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export type UserRole = 'ADMIN' | 'DOSEN' | 'MAHASISWA';

interface HeaderProps {
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userRole, onChangeRole, onOpenSettings }) => {
  const { profile } = useTenant();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleBadge = () => {
    switch (userRole) {
      case 'ADMIN':
        return { label: 'Administrator / Direktur', subtitle: 'Akses Penuh Sistem & Ingestion Backend', icon: ShieldCheck, color: 'bg-emerald-500' };
      case 'DOSEN':
        return { label: 'Dosen Pengajar (Dr. Hendra)', subtitle: 'Portal Akademik & LMS Dosen', icon: BookOpen, color: 'bg-blue-500' };
      case 'MAHASISWA':
        return { label: 'Mahasiswa (Rian Hidayat)', subtitle: 'Portal Akademik Mahasiswa & KRS', icon: GraduationCap, color: 'bg-purple-500' };
    }
  };

  const currentRoleInfo = getRoleBadge();
  const RoleIcon = currentRoleInfo.icon;

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
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl z-50 text-slate-900 dark:text-white animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-3">
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

        <div className="h-6 w-px bg-slate-800" />

        {/* Role-Based User Profile Dropdown */}
        <div className="relative">
          <div 
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2.5 p-1.5 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-bold text-sm text-blue-400">
              <RoleIcon size={16} />
            </div>
            <div className="text-left hidden md:block">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-white leading-tight">{currentRoleInfo.label}</p>
                <span className={`w-2 h-2 rounded-full ${currentRoleInfo.color}`} />
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Role: {userRole}</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>

          {/* Role Switcher Menu */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-2xl z-50 text-white space-y-1.5 animate-in zoom-in-95">
              <div className="p-2 border-b border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ganti Akun Login (Simulasi RBAC)</p>
              </div>

              <button
                onClick={() => {
                  onChangeRole('ADMIN');
                  setShowRoleMenu(false);
                }}
                className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-colors ${
                  userRole === 'ADMIN' ? 'bg-blue-600/20 border border-blue-500/40 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <ShieldCheck size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold">1. Administrator / Direktur</p>
                  <p className="text-[10px] text-slate-400">Akses Penuh: Dropship, Migrasi, PDDIKTI & Akreditasi</p>
                </div>
              </button>

              <button
                onClick={() => {
                  onChangeRole('DOSEN');
                  setShowRoleMenu(false);
                }}
                className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-colors ${
                  userRole === 'DOSEN' ? 'bg-blue-600/20 border border-blue-500/40 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <BookOpen size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold">2. Dosen Pengajar</p>
                  <p className="text-[10px] text-slate-400">Jadwal Kuliah, LMS, 16 Sesi BAP & Input Nilai KHS</p>
                </div>
              </button>

              <button
                onClick={() => {
                  onChangeRole('MAHASISWA');
                  setShowRoleMenu(false);
                }}
                className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-colors ${
                  userRole === 'MAHASISWA' ? 'bg-blue-600/20 border border-blue-500/40 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <GraduationCap size={16} className="text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold">3. Mahasiswa Aktif</p>
                  <p className="text-[10px] text-slate-400">Kartu Rencana Studi (KRS), LMS & Tagihan UKT</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
