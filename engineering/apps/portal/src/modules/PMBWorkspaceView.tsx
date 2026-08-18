import React, { useState } from 'react';
import { UserPlus, CheckCircle, Clock, Search, Filter, Award, Download, UserCheck, ShieldCheck } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface Applicant {
  id: string;
  regNumber: string;
  name: string;
  program: string;
  score: number;
  status: 'SUBMITTED' | 'VERIFIED' | 'ACCEPTED' | 'REJECTED' | 'REGISTERED';
  generatedNIM?: string;
  registrationDate: string;
}

export const PMBWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: 'app-01', regNumber: 'PMB2024-0012', name: 'Ahmad Fauzi Rahman', program: 'D4 Usaha Perjalanan Wisata', score: 88.5, status: 'ACCEPTED', generatedNIM: '240101001', registrationDate: '12 Mei 2024' },
    { id: 'app-02', regNumber: 'PMB2024-0015', name: 'Dewi Anjani Lestari', program: 'D4 Perhotelan', score: 91.0, status: 'ACCEPTED', generatedNIM: '240102001', registrationDate: '14 Mei 2024' },
    { id: 'app-03', regNumber: 'PMB2024-0022', name: 'Bagas Aditya Pratama', program: 'D3 Kuliner', score: 84.0, status: 'VERIFIED', registrationDate: '15 Mei 2024' },
    { id: 'app-04', regNumber: 'PMB2024-0028', name: 'Siti Nurhaliza', program: 'D4 Event & MICE', score: 79.5, status: 'SUBMITTED', registrationDate: '16 Mei 2024' },
    { id: 'app-05', regNumber: 'PMB2024-0035', name: 'Rian Saputra', program: 'D4 Perhotelan', score: 86.5, status: 'VERIFIED', registrationDate: '17 Mei 2024' },
  ]);

  const handleApprove = (id: string) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === id) {
        const randomNum = Math.floor(Math.random() * 900 + 100);
        return {
          ...a,
          status: 'ACCEPTED',
          generatedNIM: `24010${randomNum}`
        };
      }
      return a;
    }));
  };

  const filtered = applicants.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.regNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'ALL' || a.status === filterStatus;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserPlus size={22} className="text-blue-400" />
            <h2 className="text-xl font-black tracking-tight">Penerimaan Mahasiswa Baru (PMB)</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500 rounded-full">Gelombang 2 (2024/2025)</span>
          </div>
          <p className="text-xs text-blue-200">
            Sistem Registrasi Terintegrasi, Seleksi Skor Akademik & Generator NIM Otomatis ({profile.institutionName})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition-all">
            <Download size={14} />
            <span>Export Data PMB (PDDIKTI)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pendaftar</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">1.450</p>
          <span className="text-[10px] font-bold text-emerald-600">+18% dari tahun lalu</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Lolos Seleksi</p>
          <p className="text-2xl font-black text-blue-600 mt-1">820</p>
          <span className="text-[10px] font-bold text-slate-400">Passing Grade: 75.00</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Registrasi Ulang / NIM</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">680</p>
          <span className="text-[10px] font-bold text-emerald-600">82.9% Konfirmasi</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Daya Tampung Kampus</p>
          <p className="text-2xl font-black text-purple-600 mt-1">850</p>
          <span className="text-[10px] font-bold text-purple-600">Sisa Kuota: 170 Kursi</span>
        </div>
      </div>

      {/* Table & Filtering */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama calon mahasiswa, no pendaftaran..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-bold focus:outline-none"
            >
              <option value="ALL">Semua Status</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="VERIFIED">Terverifikasi</option>
              <option value="ACCEPTED">Lolos / Diterima</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 font-bold">No. Registrasi</th>
                <th className="p-3 font-bold">Nama Calon Mahasiswa</th>
                <th className="p-3 font-bold">Program Studi Pilihan</th>
                <th className="p-3 font-bold text-center">Skor Seleksi</th>
                <th className="p-3 font-bold">Status Seleksi</th>
                <th className="p-3 font-bold">NIM Resmi</th>
                <th className="p-3 font-bold text-center">Aksi Seleksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{app.regNumber}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{app.name}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300 font-medium">{app.program}</td>
                  <td className="p-3 font-black text-center text-slate-800 dark:text-slate-100">{app.score}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 text-[10px] font-black rounded-full ${
                      app.status === 'ACCEPTED' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' :
                      app.status === 'VERIFIED' ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300' :
                      'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {app.status === 'ACCEPTED' ? 'DITERIMA' : app.status === 'VERIFIED' ? 'TERVERIFIKASI' : 'MENUNGGU VERIFIKASI'}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {app.generatedNIM || '-'}
                  </td>
                  <td className="p-3 text-center">
                    {app.status !== 'ACCEPTED' ? (
                      <button
                        onClick={() => handleApprove(app.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-all"
                      >
                        Terima & Generate NIM
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                        <CheckCircle size={13} /> Terdaftar
                      </span>
                    )}
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
