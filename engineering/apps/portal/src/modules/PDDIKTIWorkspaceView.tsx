import React, { useState } from 'react';
import { Cloud, CheckCircle, RefreshCw, AlertCircle, Database, ShieldCheck, ArrowUpDown, FileCheck } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface SyncModuleStatus {
  id: string;
  name: string;
  category: 'MASTER' | 'TRANSAKSI';
  totalRecords: number;
  syncedRecords: number;
  status: 'SUCCESS' | 'SYNCING' | 'PENDING';
  lastSyncTime: string;
}

export const PDDIKTIWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const [modules, setModules] = useState<SyncModuleStatus[]>([
    { id: 'm-1', name: 'Profil Perguruan Tinggi & Program Studi', category: 'MASTER', totalRecords: 5, syncedRecords: 5, status: 'SUCCESS', lastSyncTime: 'Hari ini, 08:30' },
    { id: 'm-2', name: 'Data Dosen & Penugasan Mengajar', category: 'MASTER', totalRecords: 185, syncedRecords: 185, status: 'SUCCESS', lastSyncTime: 'Hari ini, 08:35' },
    { id: 'm-3', name: 'Data Mahasiswa & Status Registrasi (AKM)', category: 'TRANSAKSI', totalRecords: 2860, syncedRecords: 2860, status: 'SUCCESS', lastSyncTime: 'Hari ini, 09:30' },
    { id: 'm-4', name: 'Kurikulum & Mata Kuliah (OBE)', category: 'MASTER', totalRecords: 142, syncedRecords: 142, status: 'SUCCESS', lastSyncTime: 'Hari ini, 09:32' },
    { id: 'm-5', name: 'Kelas Kuliah & Jadwal Sesi (16 Minggu)', category: 'TRANSAKSI', totalRecords: 124, syncedRecords: 124, status: 'SUCCESS', lastSyncTime: 'Hari ini, 09:40' },
    { id: 'm-6', name: 'Kartu Rencana Studi (KRS Mahasiswa)', category: 'TRANSAKSI', totalRecords: 2860, syncedRecords: 2860, status: 'SUCCESS', lastSyncTime: 'Hari ini, 09:45' },
    { id: 'm-7', name: 'Nilai Semester & Transkrip Akademik', category: 'TRANSAKSI', totalRecords: 18450, syncedRecords: 18450, status: 'SUCCESS', lastSyncTime: 'Hari ini, 09:50' },
    { id: 'm-8', name: 'Lulusan & Penomoran Ijazah Nasional (PIN)', category: 'TRANSAKSI', totalRecords: 720, syncedRecords: 720, status: 'SUCCESS', lastSyncTime: 'Hari ini, 09:55' },
  ]);

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setModules(prev => prev.map(m => ({ ...m, status: 'SYNCING' })));

    setTimeout(() => {
      setModules(prev => prev.map(m => ({ ...m, status: 'SUCCESS', lastSyncTime: 'Baru saja' })));
      setIsSyncingAll(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-sky-900 via-blue-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cloud size={22} className="text-sky-400" />
            <h2 className="text-xl font-black tracking-tight">PDDIKTI Neo Feeder 2-Way Synchronization Engine</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500 rounded-full">Server Dikti Terhubung</span>
          </div>
          <p className="text-xs text-sky-200">
            Penyelarasan Data Master & Transaksi Akademik Otomatis dengan Web Service Resmi Kemendikbudristek RI ({profile.institutionName})
          </p>
        </div>

        <button 
          onClick={handleSyncAll}
          disabled={isSyncingAll}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-sky-500/30 flex items-center gap-2 transition-all"
        >
          <RefreshCw size={14} className={isSyncingAll ? 'animate-spin' : ''} />
          <span>{isSyncingAll ? 'Sedang Mensinkronkan...' : 'Sinkronkan Seluruh Data Sekarang'}</span>
        </button>
      </div>

      {/* Sync Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status Koneksi Feeder</p>
          <p className="text-xl font-black text-emerald-600 mt-1 flex items-center gap-1.5">
            <CheckCircle size={18} /> ONLINE (100%)
          </p>
          <span className="text-[10px] font-bold text-slate-400">Latensi: 42ms</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Record Tersinkron</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">25.346</p>
          <span className="text-[10px] font-bold text-emerald-600">0 Error Validasi</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Periode Pelaporan</p>
          <p className="text-2xl font-black text-blue-600 mt-1">2023/2024 Genap</p>
          <span className="text-[10px] font-bold text-blue-600">Status: Tervalidasi</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Kepatuhan Pelaporan (Compliance)</p>
          <p className="text-2xl font-black text-purple-600 mt-1">100%</p>
          <span className="text-[10px] font-bold text-purple-600">Sesuai Tenggat Waktu</span>
        </div>
      </div>

      {/* Modules Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Database size={16} className="text-sky-500" />
          <span>Status Sinkronisasi per Modul Akademik</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 font-bold">Nama Modul Data</th>
                <th className="p-3 font-bold">Kategori</th>
                <th className="p-3 font-bold text-center">Total Record Kampus</th>
                <th className="p-3 font-bold text-center">Tersinkron ke Feeder</th>
                <th className="p-3 font-bold text-center">Status Sinkronisasi</th>
                <th className="p-3 font-bold">Waktu Sinkronisasi Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {modules.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{m.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md">
                      {m.category}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-center text-slate-800 dark:text-slate-200">{m.totalRecords.toLocaleString()}</td>
                  <td className="p-3 font-black text-center text-emerald-600 dark:text-emerald-400">{m.syncedRecords.toLocaleString()}</td>
                  <td className="p-3 text-center">
                    {m.status === 'SUCCESS' ? (
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1">
                        <CheckCircle size={11} /> 100% VALID
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 inline-flex items-center gap-1">
                        <RefreshCw size={11} className="animate-spin" /> PROSES SINKRON
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-500 font-medium">{m.lastSyncTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
