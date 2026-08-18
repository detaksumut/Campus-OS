import React, { useState } from 'react';
import { Microscope, HeartHandshake, BookMarked, Award, Download, CheckCircle2, Clock } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export const PenelitianPkMWorkspaceView: React.FC = () => {
  const { profile } = useTenant();

  const researchProjects = [
    { id: 'res-1', title: 'Pengembangan Smart Tourism Dashboard Berbasis Artificial Intelligence untuk Destinasi Unggulan', lead: 'Dr. Hendra Wijaya', funder: 'Hibah Dikti (Kemendikbudristek)', amount: 'Rp 145.000.000', status: 'IN_PROGRESS', output: 'Jurnal SINTA 2 & Hak Cipta' },
    { id: 'res-2', title: 'Model Tata Kelola Perhotelan Ramah Lingkungan (Green Hospitality) Menuju Net-Zero Emission', lead: 'Siti Rahmawati, M.Par', funder: 'Hibah Internal Kampus', amount: 'Rp 35.000.000', status: 'COMPLETED', output: 'Jurnal Internasional Terindeks Scopus' },
    { id: 'res-3', title: 'Pemberdayaan UMKM Kuliner Tradisional Melalui Standarisasi Higienitas dan Kemasan Modern', lead: 'Chef Bambang Tri', funder: 'Pengabdian Masyarakat (PkM)', amount: 'Rp 25.000.000', status: 'COMPLETED', output: 'Paten Sederhana & Video PkM' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Microscope size={22} className="text-indigo-400" />
            <h2 className="text-xl font-black tracking-tight">Penelitian, Pengabdian Masyarakat (PkM) & Publikasi HKI</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500 rounded-full">Standar LPPM / SINTA</span>
          </div>
          <p className="text-xs text-indigo-200">
            Manajemen Proposal Hibah, Evaluasi Reviewer, Pendaftaran Hak Cipta & Diseminasi Luaran ({profile.institutionName})
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-1.5 transition-all">
          <Download size={14} />
          <span>Export Kinerja Penelitian (SINTA)</span>
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Judul Penelitian</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">68 Judul</p>
          <span className="text-[10px] font-bold text-emerald-600">+24% YoY</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pengabdian (PkM)</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">45 Desa/Mitra</p>
          <span className="text-[10px] font-bold text-slate-400">Dampak Nyata Masyarakat</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hak Cipta & Paten HKI</p>
          <p className="text-2xl font-black text-blue-600 mt-1">32 HKI</p>
          <span className="text-[10px] font-bold text-blue-600">Terdaftar Kemenkumham</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Serapan Hibah</p>
          <p className="text-2xl font-black text-purple-600 mt-1">Rp 2,85 M</p>
          <span className="text-[10px] font-bold text-purple-600">Dikti & Industri</span>
        </div>
      </div>

      {/* Projects Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BookMarked size={16} className="text-indigo-500" />
          <span>Daftar Proyek Penelitian & Pengabdian Berjalan</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 font-bold">Judul Kegiatan / Luaran</th>
                <th className="p-3 font-bold">Ketua Peneliti</th>
                <th className="p-3 font-bold">Sumber Pendanaan</th>
                <th className="p-3 font-bold text-right">Dana Disetujui</th>
                <th className="p-3 font-bold">Target Luaran Wajib</th>
                <th className="p-3 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {researchProjects.map(proj => (
                <tr key={proj.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white max-w-sm">{proj.title}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold">{proj.lead}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 font-medium">{proj.funder}</td>
                  <td className="p-3 font-black text-right text-emerald-600 dark:text-emerald-400">{proj.amount}</td>
                  <td className="p-3 font-medium text-indigo-600 dark:text-indigo-400">{proj.output}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-black rounded-full ${
                      proj.status === 'COMPLETED' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    }`}>
                      {proj.status === 'COMPLETED' ? 'SELESAI' : 'BERJALAN'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
