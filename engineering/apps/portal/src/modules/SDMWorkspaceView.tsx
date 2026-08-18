import React, { useState } from 'react';
import { Users, UserCheck, Award, ShieldCheck, CheckCircle2, AlertTriangle, Search, FileText } from 'lucide-react';
import { BKDEvaluationEngine, useTenant } from '@campus-os/shared';

export interface LecturerRecord {
  nidn: string;
  name: string;
  program: string;
  rank: string;
  education: string;
  teachingCredits: number;
  researchCredits: number;
  communityCredits: number;
  supportingCredits: number;
}

export const SDMWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [searchTerm, setSearchTerm] = useState('');

  const [lecturers, setLecturers] = useState<LecturerRecord[]>([
    { nidn: '0012057801', name: 'Dr. Hendra Wijaya, M.Par', program: 'D4 Usaha Perjalanan Wisata', rank: 'Lektor Kepala', education: 'S3', teachingCredits: 8.0, researchCredits: 3.5, communityCredits: 1.5, supportingCredits: 1.5 },
    { nidn: '0024088203', name: 'Siti Rahmawati, M.Par', program: 'D4 Perhotelan', rank: 'Lektor', education: 'S2', teachingCredits: 9.0, researchCredits: 2.0, communityCredits: 1.0, supportingCredits: 2.0 },
    { nidn: '0018118502', name: 'Chef Bambang Tri, M.M', program: 'D3 Kuliner', rank: 'Asisten Ahli', education: 'S2', teachingCredits: 8.0, researchCredits: 2.5, communityCredits: 1.0, supportingCredits: 1.0 },
    { nidn: '0005037504', name: 'Prof. Dr. Ir. Budi Santoso', program: 'D4 Usaha Perjalanan Wisata', rank: 'Guru Besar', education: 'S3', teachingCredits: 6.0, researchCredits: 6.0, communityCredits: 1.5, supportingCredits: 2.0 },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users size={22} className="text-purple-400" />
            <h2 className="text-xl font-black tracking-tight">SDM & Beban Kerja Dosen (BKD Standar SISTER)</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500 rounded-full">185 Dosen Aktif</span>
          </div>
          <p className="text-xs text-purple-200">
            Monitoring Tridharma Perguruan Tinggi, Evaluasi Beban 12–16 SKS & Validasi Tunjangan Profesi ({profile.institutionName})
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-500/30 flex items-center gap-1.5 transition-all">
          <FileText size={14} />
          <span>Export Laporan BKD SISTER</span>
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Dosen Tetap</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">185</p>
          <span className="text-[10px] font-bold text-emerald-600">100% NIDN Terverifikasi</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status BKD Semester Ini</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">185 Memenuhi</p>
          <span className="text-[10px] font-bold text-slate-400">Syarat 12 - 16 SKS</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rata-rata Beban SKS</p>
          <p className="text-2xl font-black text-blue-600 mt-1">14.2 SKS</p>
          <span className="text-[10px] font-bold text-blue-600">Ideal & Produktif</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Dosen Tersertifikasi (Serdos)</p>
          <p className="text-2xl font-black text-purple-600 mt-1">142</p>
          <span className="text-[10px] font-bold text-purple-600">76.8% Rasio Serdos</span>
        </div>
      </div>

      {/* Lecturers BKD Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <UserCheck size={16} className="text-purple-500" />
          <span>Rincian Tridharma & Evaluasi Beban Kerja Dosen</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 font-bold">NIDN</th>
                <th className="p-3 font-bold">Nama Lengkap & Gelar</th>
                <th className="p-3 font-bold">Jabatan Fungsional</th>
                <th className="p-3 font-bold text-center">Pengajaran</th>
                <th className="p-3 font-bold text-center">Penelitian</th>
                <th className="p-3 font-bold text-center">Pengabdian</th>
                <th className="p-3 font-bold text-center">Total SKS</th>
                <th className="p-3 font-bold text-center">Status BKD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {lecturers.map(lec => {
                const evalResult = BKDEvaluationEngine.evaluateBKD({
                  educationCredits: lec.teachingCredits,
                  researchCredits: lec.researchCredits,
                  communityCredits: lec.communityCredits,
                  supportingCredits: lec.supportingCredits
                });

                return (
                  <tr key={lec.nidn} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">{lec.nidn}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{lec.name}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 font-medium">{lec.rank} ({lec.education})</td>
                    <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{lec.teachingCredits} SKS</td>
                    <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{lec.researchCredits} SKS</td>
                    <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{lec.communityCredits} SKS</td>
                    <td className="p-3 text-center font-black text-blue-600 dark:text-blue-400 text-sm">
                      {evalResult.totalCredits} SKS
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1">
                        <CheckCircle2 size={11} /> MEMENUHI
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
