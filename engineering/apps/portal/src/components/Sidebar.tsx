import React from 'react';
import { 
  LayoutDashboard, UserPlus, GraduationCap, FileText, CalendarCheck, 
  CheckSquare, Award, ScrollText, BookOpen, Video, FolderOpen, MessageSquare, 
  DollarSign, Users, Package, Library, UserCheck, Microscope, HeartHandshake, 
  BookMarked, Newspaper, Cloud, ShieldCheck, BarChart3, Settings, Moon, Sun, Database, Lock, Landmark, Building2
} from 'lucide-react';
import { useThemeRuntime } from '@campus-os/shared';
import { UserRole } from './Header';

interface SidebarProps {
  userRole: UserRole;
  activeTab: string;
  onSelectMenu: (menuId: string, title: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ userRole, activeTab, onSelectMenu }) => {
  const { mode, toggleTheme } = useThemeRuntime();

  const allSections = [
    {
      category: 'AKADEMIK',
      roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA', 'PEGAWAI'],
      items: [
        { id: 'pmb', label: 'PMB (Penerimaan Mhs Baru)', icon: UserPlus, roles: ['ADMIN', 'REKTOR', 'PEGAWAI'] },
        { id: 'akademik', label: 'Sistem Akademik', icon: GraduationCap, roles: ['ADMIN', 'REKTOR', 'DOSEN'] },
        { id: 'krs', label: 'KRS', icon: FileText, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA'] },
        { id: 'perkuliahan', label: 'Perkuliahan (16 Sesi)', icon: CalendarCheck, roles: ['ADMIN', 'REKTOR', 'DOSEN'] },
        { id: 'ujian', label: 'Ujian Online (CBT)', icon: CheckSquare, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA'] },
        { id: 'penilaian', label: 'Penilaian & KHS', icon: Award, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA'] },
        { id: 'wisuda', label: 'Wisuda & SIVIL', icon: ScrollText, roles: ['ADMIN', 'REKTOR', 'MAHASISWA'] },
      ]
    },
    {
      category: 'PEMBELAJARAN',
      roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA'],
      items: [
        { id: 'lms', label: 'LMS (E-Learning)', icon: BookOpen, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA'] },
        { id: 'kelas_online', label: 'Kelas Online', icon: Video, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA'] },
        { id: 'materi', label: 'Materi Digital', icon: FolderOpen, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA'] },
        { id: 'tugas', label: 'Tugas & Diskusi', icon: MessageSquare, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA'] },
      ]
    },
    {
      category: 'NON-AKADEMIK',
      roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA', 'PEGAWAI', 'YAYASAN'],
      items: [
        { id: 'keuangan', label: 'Keuangan & UKT', icon: DollarSign, roles: ['ADMIN', 'REKTOR', 'MAHASISWA', 'YAYASAN'] },
        { id: 'sdm', label: 'SDM & BKD Dosen', icon: Users, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'PEGAWAI'] },
        { id: 'aset', label: 'Inventaris & Aset', icon: Package, roles: ['ADMIN', 'REKTOR', 'PEGAWAI', 'YAYASAN'] },
        { id: 'perpustakaan', label: 'Perpustakaan', icon: Library, roles: ['ADMIN', 'REKTOR', 'DOSEN', 'MAHASISWA', 'PEGAWAI'] },
        { id: 'alumni', label: 'Alumni & Tracer Study', icon: UserCheck, roles: ['ADMIN', 'REKTOR', 'MAHASISWA'] },
      ]
    },
    {
      category: 'PENELITIAN & PENGABDIAN',
      roles: ['ADMIN', 'REKTOR', 'DOSEN'],
      items: [
        { id: 'penelitian', label: 'Penelitian', icon: Microscope, roles: ['ADMIN', 'REKTOR', 'DOSEN'] },
        { id: 'pengabdian', label: 'Pengabdian Masyarakat', icon: HeartHandshake, roles: ['ADMIN', 'REKTOR', 'DOSEN'] },
        { id: 'publikasi', label: 'Publikasi & HKI', icon: BookMarked, roles: ['ADMIN', 'REKTOR', 'DOSEN'] },
        { id: 'ojs', label: 'Jurnal Sistem (OJS)', icon: Newspaper, badge: 'New', roles: ['ADMIN', 'REKTOR', 'DOSEN'] },
      ]
    },
    {
      category: 'KONSOL ADMINISTRATOR (BACKEND)',
      roles: ['ADMIN'], // HANYA MUNCUL KETIKA SUPER ADMINISTRATOR LOGIN!
      items: [
        { id: 'migrasi', label: 'Dropship & Migrasi Data', icon: Database, badge: 'Auto-Map', roles: ['ADMIN'] },
        { id: 'pddikti', label: 'PDDIKTI Neo Feeder', icon: Cloud, roles: ['ADMIN'] },
        { id: 'akreditasi', label: 'Akreditasi 9 Kriteria', icon: ShieldCheck, roles: ['ADMIN'] },
        { id: 'laporan', label: 'Laporan & Dashboard', icon: BarChart3, roles: ['ADMIN'] },
        { id: 'pengaturan', label: 'Pengaturan Sistem', icon: Settings, roles: ['ADMIN'] },
      ]
    }
  ];

  // Filter sections and items based on active userRole
  const visibleSections = allSections
    .filter(sec => sec.roles.includes(userRole))
    .map(sec => ({
      ...sec,
      items: sec.items.filter(item => item.roles.includes(userRole))
    }))
    .filter(sec => sec.items.length > 0);

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-full select-none shrink-0 z-30">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">
            🧠
          </div>
          <div>
            <h2 className="font-black text-sm text-white tracking-wide">Campus OS</h2>
            <p className="text-[10px] text-slate-400 font-medium">Integrated Digital Campus</p>
          </div>
        </div>

        {userRole === 'ADMIN' && (
          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
            Admin
          </span>
        )}
        {userRole === 'REKTOR' && (
          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
            Rektor
          </span>
        )}
      </div>

      {/* Nav Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4 custom-scrollbar">
        {/* Beranda / Overview Item */}
        <button
          onClick={() => onSelectMenu('dashboard', 'Beranda')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'dashboard'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <LayoutDashboard size={16} className={activeTab === 'dashboard' ? 'text-white' : 'text-blue-400'} />
          <span>Beranda</span>
        </button>

        {/* Categorized Sections */}
        {visibleSections.map(sec => (
          <div key={sec.category} className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-1">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                {sec.category}
              </p>
              {sec.category.includes('ADMINISTRATOR') && (
                <Lock size={11} className="text-emerald-500" />
              )}
            </div>
            {sec.items.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectMenu(item.id, item.label)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-blue-600/90 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon size={15} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'} transition-colors shrink-0`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-500 text-white rounded-full uppercase tracking-tighter">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Dark Mode Footer Switch */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/90">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            {mode === 'dark' ? <Moon size={14} className="text-blue-400" /> : <Sun size={14} className="text-amber-400" />}
            <span>Tema: {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">v1.0</span>
        </button>
      </div>
    </aside>
  );
};
