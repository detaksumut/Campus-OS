import React, { useState } from 'react';
import { Library, Package, UserCheck, Search, BookOpen, CheckCircle2, Download } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export const PerpustakaanWorkspaceView: React.FC<{ defaultSub?: 'perpustakaan' | 'aset' | 'alumni' }> = ({ defaultSub = 'perpustakaan' }) => {
  const { profile } = useTenant();
  const [subTab, setSubTab] = useState<'perpustakaan' | 'aset' | 'alumni'>(defaultSub);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {subTab === 'perpustakaan' && <Library size={22} className="text-blue-400" />}
            {subTab === 'aset' && <Package size={22} className="text-amber-400" />}
            {subTab === 'alumni' && <UserCheck size={22} className="text-emerald-400" />}
            <h2 className="text-xl font-black tracking-tight">
              {subTab === 'perpustakaan' ? 'Perpustakaan Digital & Repositori Ilmiah' :
               subTab === 'aset' ? 'Inventaris & Manajemen Aset Kampus' : 'Alumni & Tracer Study Nasional'}
            </h2>
          </div>
          <p className="text-xs text-blue-200">
            Layanan Terpadu Fasilitas dan Penelusuran Lulusan ({profile.institutionName})
          </p>
        </div>

        {/* Sub Tabs Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('perpustakaan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${subTab === 'perpustakaan' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
          >
            Perpustakaan
          </button>
          <button
            onClick={() => setSubTab('aset')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${subTab === 'aset' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
          >
            Inventaris & Aset
          </button>
          <button
            onClick={() => setSubTab('alumni')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${subTab === 'alumni' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
          >
            Tracer Study
          </button>
        </div>
      </div>

      {/* Dynamic Content Based on SubTab */}
      {subTab === 'perpustakaan' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen size={16} className="text-blue-500" />
            <span>Katalog Buku, E-Book & Skripsi Digital Terkini</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Total Judul Buku & Jurnal</p>
              <p className="text-2xl font-black text-blue-600 mt-1">18.450</p>
              <p className="text-[10px] text-slate-400">Termasuk 4.200 E-Book Terlanggan</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Peminjaman Aktif Mahasiswa</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">428 Buku</p>
              <p className="text-[10px] text-emerald-600">Sirkulasi Digital Otomatis</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Repositori Tugas Akhir / Skripsi</p>
              <p className="text-2xl font-black text-purple-600 mt-1">3.120 Karya</p>
              <p className="text-[10px] text-purple-600">Full Text PDF & Cek Plagiasi</p>
            </div>
          </div>
        </div>
      )}

      {subTab === 'aset' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Package size={16} className="text-amber-500" />
            <span>Manajemen Sarana Prasarana & Laboratorium Praktikum</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Laboratorium Praktikum Aktif</p>
              <p className="text-2xl font-black text-amber-600 mt-1">24 Lab</p>
              <p className="text-[10px] text-slate-400">Lab Kitchen, Hotel Mockup, Tour, Lab Komputer</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Nilai Aset Terdaftar (SIMAK-BMN)</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">Rp 48,5 M</p>
              <p className="text-[10px] text-emerald-600">100% Barcode Terinventarisir</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Jadwal Pemeliharaan (Maintenance)</p>
              <p className="text-2xl font-black text-blue-600 mt-1">98.5% Prima</p>
              <p className="text-[10px] text-blue-600">Kalibrasi Alat Berkala</p>
            </div>
          </div>
        </div>
      )}

      {subTab === 'alumni' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck size={16} className="text-emerald-500" />
            <span>Hasil Kuesioner Tracer Study Lulusan (Kemendikbudristek)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Rata-rata Waktu Tunggu Kerja</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">1.8 Bulan</p>
              <p className="text-[10px] text-emerald-600">Target Dikti: &lt; 6 Bulan</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Kesesuaian Bidang Kerja</p>
              <p className="text-2xl font-black text-blue-600 mt-1">89.4% Sesuai</p>
              <p className="text-[10px] text-blue-600">Sesuai Kompetensi Program Studi</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Gaji Pertama Di Atas UMR</p>
              <p className="text-2xl font-black text-purple-600 mt-1">94.2%</p>
              <p className="text-[10px] text-purple-600">Kepuasan Pengguna Lulusan: Sangat Baik</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
