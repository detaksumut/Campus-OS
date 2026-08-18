import React from 'react';
import { 
  LayoutDashboard, UserPlus, GraduationCap, FileText, CalendarCheck, 
  CheckSquare, Award, ScrollText, BookOpen, Video, FolderOpen, MessageSquare, 
  DollarSign, Users, Package, Library, UserCheck, Microscope, HeartHandshake, 
  BookMarked, Newspaper, Cloud, ShieldCheck, BarChart3, Settings, Moon, Sun
} from 'lucide-react';
import { useThemeRuntime } from '@campus-os/shared';

interface SidebarProps {
  activeTab: string;
  onSelectMenu: (menuId: string, title: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectMenu }) => {
  const { mode, toggleTheme } = useThemeRuntime();

  const menuSections = [
    {
      category: 'AKADEMIK',
      items: [
        { id: 'pmb', label: 'PMB (Penerimaan Mhs Baru)', icon: UserPlus },
        { id: 'akademik', label: 'Sistem Akademik', icon: GraduationCap },
        { id: 'krs', label: 'KRS', icon: FileText },
        { id: 'perkuliahan', label: 'Perkuliahan', icon: CalendarCheck },
        { id: 'ujian', label: 'Ujian Online', icon: CheckSquare },
        { id: 'penilaian', label: 'Penilaian', icon: Award },
        { id: 'wisuda', label: 'Wisuda', icon: ScrollText },
      ]
    },
    {
      category: 'PEMBELAJARAN',
      items: [
        { id: 'lms', label: 'LMS (E-Learning)', icon: BookOpen },
        { id: 'kelas_online', label: 'Kelas Online', icon: Video },
        { id: 'materi', label: 'Materi Digital', icon: FolderOpen },
        { id: 'tugas', label: 'Tugas & Diskusi', icon: MessageSquare },
      ]
    },
    {
      category: 'NON-AKADEMIK',
      items: [
        { id: 'keuangan', label: 'Keuangan', icon: DollarSign },
        { id: 'sdm', label: 'SDM & Kepegawaian', icon: Users },
        { id: 'aset', label: 'Inventaris & Aset', icon: Package },
        { id: 'perpustakaan', label: 'Perpustakaan', icon: Library },
        { id: 'alumni', label: 'Alumni & Tracer Study', icon: UserCheck },
      ]
    },
    {
      category: 'PENELITIAN & PENGABDIAN',
      items: [
        { id: 'penelitian', label: 'Penelitian', icon: Microscope },
        { id: 'pengabdian', label: 'Pengabdian Masyarakat', icon: HeartHandshake },
        { id: 'publikasi', label: 'Publikasi', icon: BookMarked },
        { id: 'ojs', label: 'Jurnal Sistem (OJS)', icon: Newspaper, badge: 'New' },
      ]
    },
    {
      category: 'SISTEM PENDUKUNG',
      items: [
        { id: 'pddikti', label: 'PDDIKTI', icon: Cloud },
        { id: 'akreditasi', label: 'Akreditasi', icon: ShieldCheck },
        { id: 'laporan', label: 'Laporan & Dashboard', icon: BarChart3 },
        { id: 'pengaturan', label: 'Pengaturan Sistem', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-full select-none shrink-0 z-30">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">
          🧠
        </div>
        <div>
          <h2 className="font-black text-sm text-white tracking-wide">Campus OS</h2>
          <p className="text-[10px] text-slate-400 font-medium">Integrated Digital Campus</p>
        </div>
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
        {menuSections.map(sec => (
          <div key={sec.category} className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
              {sec.category}
            </p>
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
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            {mode === 'dark' ? <Moon size={14} className="text-blue-400" /> : <Sun size={14} className="text-amber-400" />}
            <span>Dark Mode</span>
          </div>
          <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${mode === 'dark' ? 'bg-blue-600' : 'bg-slate-600'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${mode === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </button>
      </div>
    </aside>
  );
};
