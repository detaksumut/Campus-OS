import React from 'react';
import { 
  LayoutDashboard, UserPlus, GraduationCap, FileText, CalendarCheck, 
  CheckSquare, Award, ScrollText, BookOpen, Video, FolderOpen, MessageSquare, 
  DollarSign, Users, Package, Library, UserCheck, Microscope, HeartHandshake, 
  BookMarked, Newspaper, Cloud, ShieldCheck, BarChart3, Settings, Moon, Sun, Database, Lock,
  Building2, Landmark, Wallet, Scale, FileCheck
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
    // 🌟 KHUSUS PENGURUS YAYASAN: MENU OTORITAS & 6 HAK YAYASAN
    ...(userRole === 'YAYASAN' ? [
      {
        category: '🏛️ 6 HAK & OTORITAS YAYASAN',
        roles: ['YAYASAN'],
        items: [
          { id: 'aset', label: '1. Valuasi & Aset (Rp 148.5 M)', icon: Building2, roles: ['YAYASAN'] },
          { id: 'keuangan', label: '2. Kas Abadi & RAPBY (Rp 24.2 M)', icon: Wallet, roles: ['YAYASAN'] },
          { id: 'pengaturan', label: '3. SK Statuta & Renstra Kampus', icon: Scale, roles: ['YAYASAN'] },
          { id: 'akreditasi', label: '4. Audit KAP Independen (WTP)', icon: FileCheck, roles: ['YAYASAN'] },
          { id: 'pmb', label: '5. Kebijakan PMB & Prodi Baru', icon: UserPlus, roles: ['YAYASAN'] },
          { id: 'sdm', label: '6. Manajemen Rektorat & Pejabat', icon: Landmark, roles: ['YAYASAN'] },
        ]
      }
    ] : []),
    {
      category: 'AKADEMIK',
      roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA', 'PEGAWAI'],
      items: [
        { id: 'pmb', label: 'PMB (Penerimaan Mhs Baru)', icon: UserPlus, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'PEGAWAI'] },
        { id: 'akademik', label: 'Sistem Akademik & Kurikulum', icon: GraduationCap, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN'] },
        { id: 'kontrak_kuliah', label: 'Kontrak Perkuliahan & RPS', icon: FileCheck, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'] },
        { id: 'krs', label: userRole === 'MAHASISWA' ? 'KRS Mandiri' : 'KRS & Perwalian', icon: FileText, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'] },
        { id: 'perkuliahan', label: 'Perkuliahan (16 Sesi BAP)', icon: CalendarCheck, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN'] },
        { id: 'ujian', label: 'Ujian Online (CBT)', icon: CheckSquare, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'] },
        { id: 'penilaian', label: userRole === 'MAHASISWA' ? 'KHS & Transkrip Nilai' : 'Penilaian & Bobot Mutu', icon: Award, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'] },
        { id: 'wisuda', label: userRole === 'MAHASISWA' ? 'Pendaftaran Wisuda' : 'Wisuda & SIVIL Dikti', icon: ScrollText, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'MAHASISWA', 'PEGAWAI'] },
      ]
    },
    {
      category: 'PEMBELAJARAN',
      roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'],
      items: [
        { id: 'lms', label: 'LMS (E-Learning)', icon: BookOpen, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'] },
        { id: 'kelas_online', label: 'Kelas Online Virtual', icon: Video, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'] },
        { id: 'materi', label: 'Materi Digital & Modul', icon: FolderOpen, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'] },
        { id: 'tugas', label: 'Tugas & Diskusi Forum', icon: MessageSquare, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA'] },
      ]
    },
    {
      category: 'NON-AKADEMIK & LAYANAN',
      roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA', 'PEGAWAI'],
      items: [
        { 
          id: 'keuangan', 
          label: userRole === 'MAHASISWA' ? 'Tagihan UKT & Virtual Account' : 
                 (userRole === 'DOSEN' || userRole === 'PEGAWAI') ? 'Slip Gaji & Penggajian (Payroll)' : 
                 'Keuangan, Billing UKT & Payroll', 
          icon: DollarSign, 
          roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'PEGAWAI', 'MAHASISWA'] 
        },
        { id: 'sdm', label: userRole === 'PEGAWAI' ? 'Presensi & Kepegawaian' : 'SDM & BKD SISTER', icon: Users, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'PEGAWAI'] },
        { id: 'aset', label: 'Inventaris & Aset BMN', icon: Package, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'PEGAWAI'] },
        { id: 'perpustakaan', label: 'Perpustakaan & OPAC', icon: Library, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA', 'PEGAWAI'] },
        { id: 'alumni', label: 'Alumni & Tracer Study', icon: UserCheck, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'MAHASISWA'] },
      ]
    },
    {
      category: 'PENELITIAN & PUBLIKASI',
      roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA', 'PEGAWAI'],
      items: [
        { id: 'penelitian', label: 'Penelitian LPPM', icon: Microscope, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN'] },
        { id: 'pengabdian', label: 'Pengabdian Masyarakat (PkM)', icon: HeartHandshake, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN'] },
        { id: 'publikasi', label: 'Publikasi SINTA & HKI', icon: BookMarked, roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN'] },
        { id: 'ojs', label: 'Jurnal Ilmiah (OJS)', icon: Newspaper, badge: 'Akses Semua', roles: ['ADMIN', 'REKTOR', 'YAYASAN', 'DOSEN', 'MAHASISWA', 'PEGAWAI'] },
      ]
    },
    {
      category: 'KONSOL UTAMA & BACKEND',
      roles: ['ADMIN', 'REKTOR', 'YAYASAN'], // REKTOR, YAYASAN, DAN ADMIN MEMILIKI AKSES LENGKAP!
      items: [
        { id: 'migrasi', label: 'Dropship & Migrasi Data', icon: Database, badge: 'Auto-Map', roles: ['ADMIN', 'REKTOR', 'YAYASAN'] },
        { id: 'pddikti', label: 'PDDIKTI Neo Feeder', icon: Cloud, roles: ['ADMIN', 'REKTOR', 'YAYASAN'] },
        { id: 'akreditasi', label: 'Akreditasi 9 Kriteria', icon: ShieldCheck, roles: ['ADMIN', 'REKTOR', 'YAYASAN'] },
        { id: 'laporan', label: 'Laporan & BI Dashboard', icon: BarChart3, roles: ['ADMIN', 'REKTOR', 'YAYASAN'] },
        { id: 'pengaturan', label: 'Pengaturan Sistem', icon: Settings, roles: ['ADMIN', 'REKTOR', 'YAYASAN'] },
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

  const getRoleLabelBadge = () => {
    switch (userRole) {
      case 'ADMIN': return { label: 'Admin BAAK', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'REKTOR': return { label: 'Rektor', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      case 'YAYASAN': return { label: 'Yayasan', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
      case 'DOSEN': return { label: 'Dosen', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      case 'MAHASISWA': return { label: 'Mahasiswa', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
      case 'PEGAWAI': return { label: 'Pegawai', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' };
    }
  };

  const roleBadge = getRoleLabelBadge();

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

        <span className={`px-2 py-0.5 text-[9px] font-bold border rounded-full ${roleBadge.color}`}>
          {roleBadge.label}
        </span>
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
          <span>Beranda Utama</span>
        </button>

        {/* Categorized Sections */}
        {visibleSections.map(sec => (
          <div key={sec.category} className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-1">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                {sec.category}
              </p>
              {sec.category.includes('KONSOL') && (
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
