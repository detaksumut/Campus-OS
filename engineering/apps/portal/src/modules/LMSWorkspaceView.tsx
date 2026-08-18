import React, { useState } from 'react';
import { BookOpen, Video, FolderOpen, MessageSquare, CheckSquare, Play, Users, Clock, FileText } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

interface LMSWorkspaceViewProps {
  defaultSub?: 'lms' | 'kelas_online' | 'materi' | 'tugas' | 'ujian';
}

export const LMSWorkspaceView: React.FC<LMSWorkspaceViewProps> = ({ defaultSub = 'lms' }) => {
  const { profile } = useTenant();
  const [activeTab, setActiveTab] = useState<'lms' | 'kelas_online' | 'materi' | 'tugas' | 'ujian'>(defaultSub);

  React.useEffect(() => {
    if (defaultSub) {
      setActiveTab(defaultSub);
    }
  }, [defaultSub]);

  const onlineClasses = [
    { id: 'cls-1', code: 'UPW-201-A', name: 'Manajemen Operasional Pariwisata', lecturer: 'Dr. Hendra Wijaya', enrolled: 38, progress: 75, activeSession: 'Minggu ke-10: Pemasaran Destinasi' },
    { id: 'cls-2', code: 'HTL-302-B', name: 'Front Office Management & Hospitality', lecturer: 'Siti Rahmawati, M.Par', enrolled: 42, progress: 88, activeSession: 'Minggu ke-12: Revenue Management' },
    { id: 'cls-3', code: 'KLN-104-A', name: 'Hygiene, Sanitasi & HACCP Kuliner', lecturer: 'Chef Bambang Tri', enrolled: 35, progress: 62, activeSession: 'Minggu ke-8: Audit Standar HACCP' },
    { id: 'cls-4', code: 'MICE-205-A', name: 'Manajemen Konvensi & Event Internasional', lecturer: 'Rina Anggraini, M.M', enrolled: 30, progress: 90, activeSession: 'Minggu ke-14: Evaluasi Pasca Event' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={22} className="text-emerald-400" />
            <h2 className="text-xl font-black tracking-tight">LMS (E-Learning) & Pembelajaran Digital</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500 rounded-full">128 Kelas Online Aktif</span>
          </div>
          <p className="text-xs text-emerald-200">
            Platform Pembelajaran Terpadu, Virtual Meeting, Materi Kuliah Digital & Computer Based Test (CBT)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 transition-all">
            <Video size={14} />
            <span>Mulai Virtual Meeting Baru</span>
          </button>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('lms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'lms' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <BookOpen size={14} />
          <span>Dashboard LMS</span>
        </button>
        <button
          onClick={() => setActiveTab('kelas_online')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'kelas_online' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Video size={14} />
          <span>Kelas Online (128)</span>
        </button>
        <button
          onClick={() => setActiveTab('materi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'materi' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <FolderOpen size={14} />
          <span>Materi Digital</span>
        </button>
        <button
          onClick={() => setActiveTab('tugas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'tugas' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <MessageSquare size={14} />
          <span>Tugas & Diskusi</span>
        </button>
        <button
          onClick={() => setActiveTab('ujian')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'ujian' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <CheckSquare size={14} />
          <span>Ujian Online (CBT)</span>
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {onlineClasses.map(cls => (
          <div key={cls.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                {cls.code}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users size={14} />
                <span className="font-bold">{cls.enrolled} Mahasiswa</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{cls.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dosen: {cls.lecturer}</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                📍 {cls.activeSession}
              </p>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                <span>Progres Silabus (16 Minggu)</span>
                <span>{cls.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${cls.progress}%` }} />
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <button 
                onClick={() => alert(`Masuk ke Room Virtual Kelas ${cls.code}`)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
              >
                <Play size={13} />
                <span>Masuk Kelas Virtual</span>
              </button>
              <button 
                onClick={() => alert(`Membuka Silabus & Tugas untuk ${cls.code}`)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Kelola Modul & Tugas →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
