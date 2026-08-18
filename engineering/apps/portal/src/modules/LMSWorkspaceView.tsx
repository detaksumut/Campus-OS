import React, { useState } from 'react';
import { 
  BookOpen, Video, Users, Clock, Play, FileText, CheckCircle2, 
  Send, MessageSquare, Download, Upload, X, Mic, MicOff, Camera, 
  CameraOff, Hand, Radio
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface LMSClassItem {
  id: string;
  code: string;
  name: string;
  lecturer: string;
  schedule: string;
  activeStudents: number;
  progress: number;
  totalModules: number;
  completedModules: number;
  materials: { title: string; type: string; size: string }[];
  assignments: { title: string; deadline: string; status: 'SELESAI' | 'TERTUNDA' }[];
}

export const LMSWorkspaceView: React.FC<{ defaultSub?: 'lms' | 'kelas_online' | 'materi' | 'tugas' | 'ujian' }> = () => {
  const { profile } = useTenant();
  const [activeVirtualRoom, setActiveVirtualRoom] = useState<LMSClassItem | null>(null);
  const [activeModuleModal, setActiveModuleModal] = useState<LMSClassItem | null>(null);
  
  // Live Room State
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Dr. Hendra Wijaya, M.T.', text: 'Selamat pagi rekan-rekan mahasiswa. Silakan buka modul pertemuan ke-8 di slide.', time: '08:02' },
    { sender: 'Rian Hidayat', text: 'Pagi Pak, materi sudah kami download.', time: '08:03' }
  ]);
  const [inputChat, setInputChat] = useState('');

  const [classes, setClasses] = useState<LMSClassItem[]>([
    { 
      id: 'lms-1', 
      code: 'UPW-201', 
      name: 'Manajemen Operasional Pariwisata & MICE', 
      lecturer: 'Dr. Hendra Wijaya, M.T.', 
      schedule: 'Senin, 08:00 - 11:30 WIB', 
      activeStudents: 38, 
      progress: 68, 
      totalModules: 16, 
      completedModules: 11,
      materials: [
        { title: 'Slide 01 - Pengantar Ekosistem Pariwisata.pdf', type: 'PDF', size: '2.4 MB' },
        { title: 'Slide 02 - Studi Kasus Destinasi Berkelanjutan.pdf', type: 'PDF', size: '4.1 MB' },
        { title: 'E-Book Standar Pelayanan Pariwisata 2024.pdf', type: 'PDF', size: '8.5 MB' }
      ],
      assignments: [
        { title: 'Tugas 01 - Analisis Kelayakan Bisnis Destinasi', deadline: 'Besok, 23:59 WIB', status: 'TERTUNDA' },
        { title: 'Tugas 02 - Review Jurnal Pariwisata Internasional', deadline: 'Jumat, 18:00 WIB', status: 'SELESAI' }
      ]
    },
    { 
      id: 'lms-2', 
      code: 'UPW-202', 
      name: 'Perencanaan & Pemasaran Destinasi Digital', 
      lecturer: 'Siti Rahmawati, S.Tr.Par., M.Par.', 
      schedule: 'Selasa, 10:00 - 12:30 WIB', 
      activeStudents: 35, 
      progress: 50, 
      totalModules: 16, 
      completedModules: 8,
      materials: [
        { title: 'Slide 01 - Digital Marketing in Tourism.pdf', type: 'PDF', size: '3.2 MB' },
        { title: 'Studi Kasus - Kampanye Media Sosial Wisata.pdf', type: 'PDF', size: '1.8 MB' }
      ],
      assignments: [
        { title: 'Tugas 01 - Pembuatan Rencana Konten Reels & TikTok Wisata', deadline: '25 Mei 2024', status: 'TERTUNDA' }
      ]
    },
    { 
      id: 'lms-3', 
      code: 'KLN-102', 
      name: 'Gastronomi Nusantara & Hygiene Sanitasi', 
      lecturer: 'Chef Denny Kurniawan, M.Sc.', 
      schedule: 'Rabu, 08:00 - 13:00 WIB', 
      activeStudents: 28, 
      progress: 85, 
      totalModules: 16, 
      completedModules: 14,
      materials: [
        { title: 'SOP Higiene Dapur & Sanitasi HACCP.pdf', type: 'PDF', size: '5.6 MB' },
        { title: 'Resep Baku Masakan Tradisional Nusantara.pdf', type: 'PDF', size: '6.2 MB' }
      ],
      assignments: [
        { title: 'Laporan Praktikum Laboratorium Kuliner Sesi 12', deadline: 'Selesai', status: 'SELESAI' }
      ]
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        sender: 'Anda (Mahasiswa)',
        text: inputChat.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputChat('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={22} className="text-emerald-400" />
            <h2 className="text-xl font-black tracking-tight">LMS & Ruang Perkuliahan Virtual Interaktif</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500 rounded-full">Sistem Terpadu {profile.institutionName}</span>
          </div>
          <p className="text-xs text-emerald-200">
            Platform E-Learning, Kelas Online Tatap Muka Virtual, Unduh Materi Digital, Pengumpulan Tugas & Diskusi Forum.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-xs font-bold text-emerald-300">
          Status Jaringan: <b className="text-white">Live Streaming HD Aktif</b>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {classes.map(cls => (
          <div key={cls.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-lg">
                  {cls.code}
                </span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Users size={12} /> {cls.activeStudents} Mahasiswa
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-2 line-clamp-1">{cls.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cls.lecturer}</p>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-2 font-medium">
                <Clock size={12} className="text-emerald-500" />
                <span>{cls.schedule}</span>
              </div>
            </div>

            {/* Progres Belajar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Modul {cls.completedModules}/{cls.totalModules} Selesai</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{cls.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${cls.progress}%` }} />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <button 
                onClick={() => setActiveVirtualRoom(cls)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <Play size={13} />
                <span>Masuk Kelas Virtual</span>
              </button>
              <button 
                onClick={() => setActiveModuleModal(cls)}
                className="text-xs font-bold text-slate-600 hover:text-emerald-600 dark:text-slate-300 transition-colors"
              >
                Materi & Tugas ({cls.materials.length}) →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📹 1. MODAL RUANG KELAS VIRTUAL (LIVE STREAMING & CHAT) */}
      {activeVirtualRoom && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-white">
            {/* Header Room */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <div>
                  <h3 className="font-black text-sm text-white">Ruang Kuliah Virtual: {activeVirtualRoom.name}</h3>
                  <p className="text-[10px] text-emerald-400 font-mono">Dosen: {activeVirtualRoom.lecturer} • {activeVirtualRoom.activeStudents} Mahasiswa Hadir</p>
                </div>
              </div>
              <button onClick={() => setActiveVirtualRoom(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Main Stage & Chat Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Virtual Video Canvas */}
              <div className="md:col-span-2 rounded-2xl bg-slate-950 border border-slate-800 aspect-video relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl font-black">
                    👨‍🏫
                  </div>
                  <h4 className="font-bold text-sm text-white">{activeVirtualRoom.lecturer}</h4>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1.5 mx-auto">
                    <Radio size={12} className="text-red-400 animate-pulse" />
                    <span>Sedang Menjelaskan Modul Pembelajaran</span>
                  </span>
                </div>

                {/* Bottom Media Controls */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm p-2 rounded-2xl border border-slate-700">
                  <button 
                    onClick={() => setMicOn(!micOn)} 
                    className={`p-2.5 rounded-xl ${micOn ? 'bg-slate-800 text-white' : 'bg-red-600 text-white'}`}
                  >
                    {micOn ? <Mic size={15} /> : <MicOff size={15} />}
                  </button>
                  <button 
                    onClick={() => setCamOn(!camOn)} 
                    className={`p-2.5 rounded-xl ${camOn ? 'bg-slate-800 text-white' : 'bg-red-600 text-white'}`}
                  >
                    {camOn ? <Camera size={15} /> : <CameraOff size={15} />}
                  </button>
                  <button 
                    onClick={() => setHandRaised(!handRaised)} 
                    className={`p-2.5 rounded-xl ${handRaised ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}
                  >
                    <Hand size={15} />
                  </button>
                </div>
              </div>

              {/* Live Chat & Discussion */}
              <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3 flex flex-col justify-between h-72">
                <div className="border-b border-slate-700 pb-2">
                  <span className="font-bold text-xs text-white flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-emerald-400" />
                    <span>Forum Diskusi Live</span>
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto py-2 space-y-2 text-xs custom-scrollbar">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 space-y-0.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="font-bold text-emerald-400">{msg.sender}</span>
                        <span className="text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-slate-200 text-[11px]">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-700 flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Tulis pesan atau pertanyaan..."
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button type="submit" className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white">
                    <Send size={13} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📁 2. MODAL KELOLA SILABUS, MATERI DIGITAL & TUGAS */}
      {activeModuleModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-sm">Silabus, Modul Kuliah & Tugas: {activeModuleModal.name}</h3>
                <p className="text-xs text-slate-500">Pengampu: {activeModuleModal.lecturer}</p>
              </div>
              <button onClick={() => setActiveModuleModal(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {/* List Materi */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText size={14} className="text-blue-500" />
                <span>Materi & E-Book Perkuliahan:</span>
              </h4>
              <div className="space-y-2">
                {activeModuleModal.materials.map((mat, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{mat.title}</p>
                      <span className="text-[10px] text-slate-400">{mat.type} • {mat.size}</span>
                    </div>
                    <button 
                      onClick={() => {
                        const content = `Materi Kuliah ${activeModuleModal.code}\n${mat.title}\nInstitusi: ${profile.institutionName}\nDosen: ${activeModuleModal.lecturer}`;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = mat.title.replace('.pdf', '.txt');
                        link.click();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm hover:scale-105 transition-all"
                    >
                      <Download size={11} />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* List Tugas */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Upload size={14} className="text-emerald-500" />
                <span>Tugas Terstruktur Mahasiswa:</span>
              </h4>
              <div className="space-y-2">
                {activeModuleModal.assignments.map((asg, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{asg.title}</p>
                      <span className={`text-[10px] font-bold ${asg.status === 'SELESAI' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {asg.status === 'SELESAI' ? '✓ Sudah Diserahkan' : `Batas: ${asg.deadline}`}
                      </span>
                    </div>
                    {asg.status === 'SELESAI' ? (
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Terkirim
                      </span>
                    ) : (
                      <button 
                        onClick={() => {
                          setClasses(prev => prev.map(c => {
                            if (c.id === activeModuleModal.id) {
                              const updatedAsg = c.assignments.map((a, idx) => idx === i ? { ...a, status: 'SELESAI' as const } : a);
                              return { ...c, assignments: updatedAsg };
                            }
                            return c;
                          }));
                          setActiveModuleModal(prev => prev ? {
                            ...prev,
                            assignments: prev.assignments.map((a, idx) => idx === i ? { ...a, status: 'SELESAI' as const } : a)
                          } : null);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm hover:scale-105 transition-all"
                      >
                        <Upload size={11} />
                        <span>Kirim Tugas</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModuleModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
