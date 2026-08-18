import React from 'react';
import { ShieldCheck, Award, CheckCircle2, FileText, Download, TrendingUp } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export const AkreditasiWorkspaceView: React.FC = () => {
  const { profile } = useTenant();

  const criteria = [
    { num: '1', name: 'Visi, Misi, Tujuan, dan Strategi', score: 3.85, max: 4.00, status: 'UNGGUL' },
    { num: '2', name: 'Tata Pamong, Tata Kelola, dan Kerjasama', score: 3.90, max: 4.00, status: 'UNGGUL' },
    { num: '3', name: 'Mahasiswa & Daya Saing Lulusan', score: 3.75, max: 4.00, status: 'UNGGUL' },
    { num: '4', name: 'Sumber Daya Manusia (Dosen & Tendik)', score: 3.82, max: 4.00, status: 'UNGGUL' },
    { num: '5', name: 'Keuangan, Sarana, dan Prasarana', score: 3.70, max: 4.00, status: 'UNGGUL' },
    { num: '6', name: 'Pendidikan & Kurikulum OBE', score: 3.95, max: 4.00, status: 'UNGGUL' },
    { num: '7', name: 'Penelitian Dosen & Mahasiswa', score: 3.65, max: 4.00, status: 'BAIK SEKALI' },
    { num: '8', name: 'Pengabdian kepada Masyarakat (PkM)', score: 3.70, max: 4.00, status: 'UNGGUL' },
    { num: '9', name: 'Luaran dan Capaian Tridharma', score: 3.88, max: 4.00, status: 'UNGGUL' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={22} className="text-blue-400" />
            <h2 className="text-xl font-black tracking-tight">Akreditasi Perguruan Tinggi & Program Studi (BAN-PT & LAM)</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500 rounded-full">Instrumen 9 Kriteria</span>
          </div>
          <p className="text-xs text-blue-200">
            Pemantauan Kualifikasi, Penyusunan Laporan Evaluasi Diri (LED) & Laporan Kinerja Program Studi (LKPS) ({profile.institutionName})
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition-all">
          <Download size={14} />
          <span>Export Dokumen LED & LKPS</span>
        </button>
      </div>

      {/* 9 Criteria Grid */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Award size={16} className="text-blue-500" />
          <span>Skor Pemenuhan 9 Kriteria Standar Nasional Pendidikan Tinggi (SN-Dikti)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {criteria.map(crit => (
            <div key={crit.num} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  C{crit.num}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {crit.status}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{crit.name}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Skor Kriteria:</span>
                <span className="font-black text-blue-600 dark:text-blue-400">{crit.score.toFixed(2)} / {crit.max.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
