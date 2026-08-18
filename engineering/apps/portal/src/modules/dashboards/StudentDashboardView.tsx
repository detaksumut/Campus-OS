import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, Clock, Calendar, CheckCircle, AlertCircle, 
  DollarSign, FileText, CreditCard, ChevronRight, Video, Sparkles, SlidersHorizontal, ArrowUpRight
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface StudentDashboardViewProps {
  onNavigate?: (tab: string, title: string) => void;
  onOpenCustomizer?: () => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ onNavigate, onOpenCustomizer }) => {
  const { profile } = useTenant();

  // Data Akademik Mahasiswa
  const studentAcademic = {
    nim: '200101012',
    name: 'Rian Hidayat',
    program: 'D4 Usaha Perjalanan Wisata',
    semester: 4,
    ipk: 3.72,
    ipsPrev: 3.65,
    sksCompleted: 68,
    sksTarget: 144,
    currentSKS: 22,
    krsStatus: 'DISETUJUI_DOSEN_PA', // Disetujui Dosen Pembimbing Akademik
    academicAdvisor: 'Dr. Hendra Wijaya, M.T.'
  };

  // Jadwal Kuliah Hari Ini
  const todayClasses = [
    { id: 'c1', code: 'UPW-201', name: 'Manajemen Operasional Pariwisata', time: '08:00 - 11:30 WIB', room: 'Lab Pariwisata 201', lecturer: 'Dr. Hendra Wijaya, M.T.', status: 'BERLANGSUNG', sessionNumber: 9 },
    { id: 'c2', code: 'UPW-202', name: 'Perencanaan Destinasi Berkelanjutan', time: '13:00 - 15:30 WIB', room: 'R. Teori 102', lecturer: 'Siti Rahmawati, M.Par.', status: 'MENDATANG', sessionNumber: 9 },
  ];

  // Tagihan UKT & Keuangan
  const tuitionStatus = {
    semester: '2024/2025 Genap',
    amount: 'Rp 4.500.000',
    status: 'LUNAS',
    vaNumber: '8808200101012999',
    bank: 'Bank Mandiri'
  };

  // Tugas LMS Terdekat
  const upcomingTasks = [
    { id: 't1', course: 'UPW-201', title: 'Analisis Kelayakan Bisnis Destinasi', deadline: 'Besok, 23:59 WIB', status: 'BELUM_SELESAI' },
    { id: 't2', course: 'UPW-202', title: 'Laporan Observasi Lapangan Desa Wisata', deadline: 'Jumat, 18:00 WIB', status: 'BELUM_SELESAI' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner Mahasiswa */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-blue-950 text-white border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500 text-white">
              Portal Akademik Mahasiswa
            </span>
            <span className="text-xs text-purple-300 font-mono">NIM: {studentAcademic.nim}</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">Hai, {studentAcademic.name} 👋</h2>
          <p className="text-xs text-purple-200 mt-1 max-w-2xl">
            {studentAcademic.program} • Semester {studentAcademic.semester} • Dosen PA: <b>{studentAcademic.academicAdvisor}</b>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <SlidersHorizontal size={14} />
              <span>Sesuaikan Widget</span>
            </button>
          )}
          <div className="px-4 py-2 rounded-xl bg-purple-600/30 border border-purple-500/40 text-xs font-bold text-purple-300">
            Status: <b className="text-emerald-400">Mahasiswa Aktif</b>
          </div>
        </div>
      </div>

      {/* 2. 4 KARTU STATISTIK KONTRAK AKADEMIK MAHASISWA */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">IPK Kumulatif:</span>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{studentAcademic.ipk.toFixed(2)}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ Predikat: Pujian (Cumlaude)</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Progres SKS Lulus:</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{studentAcademic.sksCompleted} / {studentAcademic.sksTarget}</p>
          <span className="text-[10px] text-slate-500 mt-1 block">{( (studentAcademic.sksCompleted / studentAcademic.sksTarget) * 100 ).toFixed(0)}% Selesai dari 144 SKS</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Kontrak SKS Semester Ini:</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{studentAcademic.currentSKS} <span className="text-xs font-bold text-slate-500">SKS</span></p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ Disetujui Dosen PA</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Status UKT & Keuangan:</span>
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1">LUNAS</p>
          <span className="text-[10px] text-slate-500 mt-1 block">{tuitionStatus.semester}</span>
        </div>
      </div>

      {/* 3. JADWAL KULIAH HARI INI & DEADLINE TUGAS LMS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal Kuliah Hari Ini */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar size={18} className="text-purple-500" />
                <span>Jadwal Perkuliahan Hari Ini (16 Sesi BAP Digital)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pastikan hadir sebelum jam kuliah dimulai (Minimal kehadiran 75% untuk syarat UAS).
              </p>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('krs', 'KRS')}
              className="text-xs font-bold text-purple-600 hover:text-purple-500 flex items-center gap-1"
            >
              <span>Lihat KRS Lengkap</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {todayClasses.map(cls => (
              <div key={cls.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">{cls.code}</span>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{cls.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Pengampu: {cls.lecturer} • {cls.room}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    Pertemuan Sesi ke-{cls.sessionNumber} dari 16 Sesi
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-mono font-bold text-xs">
                    {cls.time}
                  </span>
                  <button
                    onClick={() => onNavigate && onNavigate('lms', 'LMS (E-Learning)')}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1 hover:scale-105 transition-all"
                  >
                    <Video size={13} />
                    <span>Masuk Kelas</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deadline Tugas LMS */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Clock size={18} className="text-amber-500" />
              <span>Tenggat Tugas LMS</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Tugas yang harus diserahkan minggu ini.</p>
          </div>

          <div className="space-y-3 text-xs">
            {upcomingTasks.map(task => (
              <div key={task.id} className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] font-bold text-amber-600">{task.course}</span>
                  <span className="text-[10px] font-bold text-rose-600">{task.deadline}</span>
                </div>
                <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{task.title}</p>
                <button
                  onClick={() => onNavigate && onNavigate('lms', 'LMS')}
                  className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1 pt-1"
                >
                  <span>Kirim Jawaban Tugas</span>
                  <ArrowUpRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
