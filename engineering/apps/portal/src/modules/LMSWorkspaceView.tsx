import React, { useState } from 'react';
import { 
  BookOpen, Video, FolderOpen, MessageSquare, CheckCircle2, Clock, 
  Upload, Download, Search, Mic, MicOff, Camera, CameraOff, 
  Hand, MessageCircle, Send, Play, Users, FileText, Sparkles, X, 
  Share2, VideoOff, CheckSquare
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface LMSWorkspaceViewProps {
  defaultSub?: 'lms' | 'kelas_online' | 'materi' | 'tugas' | 'ujian';
}

export const LMSWorkspaceView: React.FC<LMSWorkspaceViewProps> = ({ defaultSub = 'lms' }) => {
  const { profile } = useTenant();
  const [currentTab, setCurrentTab] = useState<'lms' | 'kelas_online' | 'materi' | 'tugas'>(
    defaultSub === 'ujian' ? 'lms' : (defaultSub as any)
  );

  React.useEffect(() => {
    if (defaultSub && defaultSub !== 'ujian') {
      setCurrentTab(defaultSub as any);
    }
  }, [defaultSub]);

  // State Virtual Classroom Live
  const [activeLiveClass, setActiveLiveClass] = useState<any | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [liveChatMessages, setLiveChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Dr. Hendra Wijaya, M.T.', text: 'Selamat pagi rekan-rekan, kita mulai pembahasan supply chain hospitality hari ini.', time: '08:05' },
    { sender: 'Rian Hidayat (200101012)', text: 'Pagi Pak, slide presentasi sudah tampil dengan jelas di layar.', time: '08:06' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Course Data & Materials
  const [classes, setClasses] = useState([
    {
      id: 'cls-1',
      code: 'UPW-201',
      name: 'Manajemen Operasional Pariwisata & Hospitality',
      lecturer: 'Dr. Hendra Wijaya, M.T.',
      schedule: 'Senin, 08:00 - 11:30 WIB',
      studentsCount: 38,
      progress: 68,
      completedModules: 11,
      totalModules: 16,
      liveStatus: 'SEDANG_BERLANGSUNG',
      materials: [
        { title: 'Modul 01 - Pengantar Hospitaliti Modern.pdf', type: 'PDF', size: '2.4 MB' },
        { title: 'Modul 02 - SOP Front Office & Concierge.pdf', type: 'PDF', size: '3.1 MB' },
        { title: 'Video Kuliah - Standar Pelayanan Tamu VIP.mp4', type: 'VIDEO', size: '48.5 MB' }
      ],
      assignments: [
        { title: 'Tugas 1: Analisis Studi Kasus Resort Bintang 5', deadline: '25 Mei 2024', status: 'SELESAI' },
        { title: 'Tugas 2: Rencana Operasional Wisata Bahari', deadline: '31 Mei 2024', status: 'BELUM' }
      ],
      discussions: [
        { author: 'Dr. Hendra Wijaya', title: 'Tanggapan Mengenai Dampak AI pada Industri Tour & Travel', replies: 14, lastActive: '2 jam lalu' }
      ]
    },
    {
      id: 'cls-2',
      code: 'UPW-202',
      name: 'Perencanaan & Pemasaran Destinasi Wisata Digital',
      lecturer: 'Siti Rahmawati, S.Tr.Par., M.Par.',
      schedule: 'Selasa, 10:00 - 12:30 WIB',
      studentsCount: 35,
      progress: 50,
      completedModules: 8,
      totalModules: 16,
      liveStatus: 'JADWAL_TERDEKAT',
      materials: [
        { title: 'Modul 01 - Digital Destination Branding.pdf', type: 'PDF', size: '4.2 MB' },
        { title: 'Template Strategi Konten TikTok Pariwisata.xlsx', type: 'EXCEL', size: '1.2 MB' }
      ],
      assignments: [
        { title: 'Proyek Kelompok: Pembuatan Video Promosi Wisata', deadline: '05 Juni 2024', status: 'BELUM' }
      ],
      discussions: [
        { author: 'Siti Rahmawati', title: 'Diskusi Pemilihan Lokasi Ekowisata untuk Riset Lapangan', replies: 8, lastActive: 'Kemarin' }
      ]
    },
    {
      id: 'cls-3',
      code: 'KLN-102',
      name: 'Gastronomi Nusantara & Standar HACCP Higiene Makanan',
      lecturer: 'Chef Denny Kurniawan, M.Sc.',
      schedule: 'Rabu, 08:00 - 13:00 WIB',
      studentsCount: 28,
      progress: 85,
      completedModules: 14,
      totalModules: 16,
      liveStatus: 'OFFLINE',
      materials: [
        { title: 'Modul HACCP - Critical Control Points Dapur.pdf', type: 'PDF', size: '5.6 MB' },
        { title: 'Buku Resep Baku Masakan Tradisional Karo.pdf', type: 'PDF', size: '8.1 MB' }
      ],
      assignments: [
        { title: 'Uji Organoleptik dan Laporan Praktikum Kuliner 3', deadline: '28 Mei 2024', status: 'SELESAI' }
      ],
      discussions: [
        { author: 'Chef Denny', title: 'Evaluasi Hasil Praktikum Plating & Food Safety Sesi 13', replies: 19, lastActive: '1 hari lalu' }
      ]
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setLiveChatMessages(prev => [
      ...prev,
      {
        sender: 'Anda (Sesi Live)',
        text: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Navigation */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border border-blue-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500 text-slate-950">
              Sistem Pembelajaran Terintegrasi
            </span>
            <span className="text-xs text-blue-300 font-mono">LMS & Hybrid Learning</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">
            {currentTab === 'lms' && 'LMS & Dashboard E-Learning Kampus'}
            {currentTab === 'kelas_online' && 'Ruang Tatap Muka Video Conference (Kelas Online)'}
            {currentTab === 'materi' && 'Repositori Materi Kuliah & Modul Digital'}
            {currentTab === 'tugas' && 'Pengumpulan Tugas & Forum Diskusi Terstruktur'}
          </h2>
          <p className="text-xs text-blue-200 mt-1 max-w-2xl">
            {profile.institutionName} • 16 Sesi Pembelajaran Semester Genap 2024
          </p>
        </div>

        {/* 4 SUB-TAB NAVIGATOR */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          <button
            onClick={() => setCurrentTab('lms')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'lms' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen size={13} />
            <span>1. LMS Utama</span>
          </button>

          <button
            onClick={() => setCurrentTab('kelas_online')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'kelas_online' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video size={13} />
            <span>2. Kelas Online</span>
          </button>

          <button
            onClick={() => setCurrentTab('materi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'materi' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderOpen size={13} />
            <span>3. Materi Digital</span>
          </button>

          <button
            onClick={() => setCurrentTab('tugas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'tugas' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare size={13} />
            <span>4. Tugas & Forum</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VIEW LMS UTAMA: DAFTAR KELAS, PROGRESS & MODUL */}
      {/* ========================================================================= */}
      {currentTab === 'lms' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {classes.map(cls => (
              <div key={cls.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-500/50 transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
                      {cls.code}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">{cls.studentsCount} Mahasiswa</span>
                  </div>

                  <h3 className="font-black text-sm text-slate-900 dark:text-white line-clamp-2">
                    {cls.name}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium">
                    Dosen: {cls.lecturer}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    🕒 {cls.schedule}
                  </p>

                  {/* Progress Sesi */}
                  <div className="pt-2">
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className="text-slate-600 dark:text-slate-300">Kemajuan Modul</span>
                      <span className="text-blue-600">{cls.completedModules} dari {cls.totalModules} Sesi ({cls.progress}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${cls.progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveLiveClass(cls)}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-105"
                  >
                    <Video size={13} />
                    <span>Masuk Kelas</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('materi')}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <FolderOpen size={13} />
                    <span>Materi ({cls.materials.length})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW KELAS ONLINE VIRTUAL (VIDEO CONFERENCE & LIVE STREAMING) */}
      {/* ========================================================================= */}
      {currentTab === 'kelas_online' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400">
                  Live Video Conference & Hybrid Teleconference Studio
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-600/30 border border-blue-500/40 text-blue-300">
                Server: HD 1080p Ultra-Low Latency
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Ruang kuliah online tatap muka interaktif langsung dengan Dosen Pengampu. Dilengkapi fitur Screen Sharing, Papan Tulis Interaktif, Angkat Tangan (*Raise Hand*), dan Rekaman Kuliah Otomatis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classes.map(cls => (
              <div key={cls.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      cls.liveStatus === 'SEDANG_BERLANGSUNG' ? 'bg-emerald-500 text-slate-950 font-black animate-pulse' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {cls.liveStatus === 'SEDANG_BERLANGSUNG' ? '🔴 LIVE SEKARANG' : '🕒 Terjadwal'}
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-600">{cls.code}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cls.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">Pengampu: {cls.lecturer}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Waktu: {cls.schedule}</p>
                </div>

                <button
                  onClick={() => setActiveLiveClass(cls)}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <Play size={14} className="fill-white" />
                  <span>Buka Ruang Video Conference</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VIEW MATERI DIGITAL & MODUL PERKULIAHAN */}
      {/* ========================================================================= */}
      {currentTab === 'materi' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FolderOpen className="text-blue-500" size={18} />
                <span>Repositori Materi Kuliah, Modul Digital & E-Book</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Unduh materi pembelajaran 16 sesi perkuliahan resmi.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.flatMap(c => c.materials.map((m, idx) => ({ ...m, courseName: c.name, code: c.code, lecturer: c.lecturer, key: `${c.id}-${idx}` }))).map(mat => (
              <div key={mat.key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {mat.code}
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white">{mat.title}</p>
                  <p className="text-[10px] text-slate-400">{mat.type} • {mat.size} • Dosen: {mat.lecturer}</p>
                </div>

                <button
                  onClick={() => {
                    const blob = new Blob([`Materi: ${mat.title}\nMata Kuliah: ${mat.courseName}\nInstitusi: ${profile.institutionName}`], { type: 'text/plain' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = mat.title.replace('.pdf', '.txt').replace('.mp4', '.txt');
                    link.click();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 hover:scale-105 transition-all"
                >
                  <Download size={13} />
                  <span>Unduh</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VIEW TUGAS TERSTRUKTUR & FORUM DISKUSI KELAS */}
      {/* ========================================================================= */}
      {currentTab === 'tugas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kolom Kiri: Daftar Tugas */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckSquare className="text-emerald-500" size={18} />
                  <span>Daftar Tugas Terstruktur Mahasiswa</span>
                </h3>
              </div>

              <div className="space-y-3">
                {classes.flatMap(c => c.assignments.map((a, idx) => ({ ...a, course: c.name, code: c.code, key: `${c.id}-${idx}`, classId: c.id, index: idx }))).map(asg => (
                  <div key={asg.key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-bold text-blue-600">{asg.code}</span>
                      <p className="font-bold text-slate-900 dark:text-white">{asg.title}</p>
                      <p className="text-[10px] text-rose-500 font-bold">Batas Pengumpulan: {asg.deadline}</p>
                    </div>

                    {asg.status === 'SELESAI' ? (
                      <span className="px-3 py-1 text-[10px] font-bold rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Terkirim
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setClasses(prev => prev.map(c => c.id === asg.classId ? {
                            ...c,
                            assignments: c.assignments.map((item, i) => i === asg.index ? { ...item, status: 'SELESAI' } : item)
                          } : c));
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 hover:scale-105 transition-all shadow-sm"
                      >
                        <Upload size={12} />
                        <span>Kirim Tugas</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Kanan: Forum Diskusi Kelas */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageCircle className="text-indigo-500" size={18} />
                  <span>Forum Diskusi & Tanya Jawab Akademik</span>
                </h3>
              </div>

              <div className="space-y-3">
                {classes.flatMap(c => c.discussions.map((d, idx) => ({ ...d, course: c.name, key: `${c.id}-${idx}` }))).map(disc => (
                  <div key={disc.key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{disc.author}</span>
                      <span className="text-[10px] text-slate-400">{disc.lastActive}</span>
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white">{disc.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-700">
                      <span>{disc.course}</span>
                      <span className="font-bold text-blue-600">💬 {disc.replies} Balasan</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📹 MODAL RUANG KELAS VIRTUAL (LIVE VIDEO CONFERENCE INTERAKTIF) */}
      {activeLiveClass && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 text-white">
            {/* Header Video Room */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <div>
                  <h3 className="font-black text-sm">{activeLiveClass.name}</h3>
                  <p className="text-[11px] text-slate-400">Pengampu: {activeLiveClass.lecturer} • {activeLiveClass.studentsCount} Peserta Terhubung</p>
                </div>
              </div>
              <button onClick={() => setActiveLiveClass(null)} className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800">
                <X size={20} />
              </button>
            </div>

            {/* Main Stage: Video Grid + Live Chat */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-hidden">
              {/* Left: Video Screen Stage */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                {isCamOn ? (
                  <div className="space-y-3">
                    <div className="w-24 h-24 rounded-full bg-blue-600/30 border-2 border-blue-500 flex items-center justify-center mx-auto text-3xl font-black">
                      👨‍🏫
                    </div>
                    <div>
                      <p className="font-black text-base">{activeLiveClass.lecturer}</p>
                      <p className="text-xs text-blue-400 font-mono">Dosen Pengampu Utama (Active Speaker)</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold inline-block">
                      📡 Streaming HD 1080p Aktif
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-500">
                    <VideoOff size={40} className="mx-auto" />
                    <p className="text-xs">Kamera Dosen Dinonaktifkan</p>
                  </div>
                )}

                {/* Hand Raise Badge */}
                {isHandRaised && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full flex items-center gap-1 animate-bounce">
                    <Hand size={14} />
                    <span>Anda Sedang Angkat Tangan</span>
                  </div>
                )}
              </div>

              {/* Right: Live Chat Box */}
              <div className="lg:col-span-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between overflow-hidden">
                <div className="p-3 border-b border-slate-800 flex items-center gap-2">
                  <MessageCircle size={15} className="text-blue-400" />
                  <span className="font-bold text-xs">Obrolan Langsung Kelas</span>
                </div>

                <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar text-xs">
                  {liveChatMessages.map((msg, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-blue-400">{msg.sender}</span>
                        <span className="text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-slate-200">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Tulis pesan ke kelas..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs focus:outline-none text-white"
                  />
                  <button type="submit" className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white">
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 text-white'
                }`}
              >
                {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
                <span>{isMicOn ? 'Mic Aktif' : 'Muted'}</span>
              </button>

              <button
                onClick={() => setIsCamOn(!isCamOn)}
                className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isCamOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 text-white'
                }`}
              >
                {isCamOn ? <Camera size={16} /> : <CameraOff size={16} />}
                <span>{isCamOn ? 'Kamera Aktif' : 'Kamera Off'}</span>
              </button>

              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isHandRaised ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <Hand size={16} />
                <span>{isHandRaised ? 'Turunkan Tangan' : 'Angkat Tangan'}</span>
              </button>

              <button
                onClick={() => setActiveLiveClass(null)}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition-all hover:scale-105"
              >
                Keluar Kelas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
