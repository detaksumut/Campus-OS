import React, { useState } from 'react';
import { 
  Landmark, DollarSign, Building2, TrendingUp, ShieldCheck, 
  Award, FileText, ChevronRight, SlidersHorizontal, Package, CheckCircle
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface FoundationDashboardViewProps {
  onNavigate?: (tab: string, title: string) => void;
  onOpenCustomizer?: () => void;
}

export const FoundationDashboardView: React.FC<FoundationDashboardViewProps> = ({ onNavigate, onOpenCustomizer }) => {
  const { profile } = useTenant();

  // Data Kelembagaan Yayasan
  const foundationInfo = {
    name: `Badan Penyelenggara Yayasan ${profile.institutionName}`,
    chairman: 'Drs. H. M. Syafei, M.Si.',
    notaryAct: 'AHU-0012445.AH.01.04.Tahun 2018',
    termPeriod: '2022 - 2027',
    totalAssetValuation: 'Rp 148.5 Miliar',
    reserveFund: 'Rp 24.2 Miliar',
    pmbMultiYearGrowth: '+ 14.5% per tahun'
  };

  const assetList = [
    { name: 'Tanah Kampus Utama & Gedung Rektorat (4.5 Ha)', value: 'Rp 65.0 M', status: 'Sertifikat Hak Milik (SHM)' },
    { name: 'Gedung Fakultas & Laboratorium Terpadu (4 Lantai)', value: 'Rp 42.5 M', status: 'IMB & SLF Lengkap' },
    { name: 'Peralatan Laboratorium & SIMAK-BMN', value: 'Rp 26.0 M', status: 'Asuransi Aktif' },
    { name: 'Gedung Asrama Mahasiswa & Sport Center', value: 'Rp 15.0 M', status: 'Operasional Penuh' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner Pengurus Yayasan */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-stone-950 text-white border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950">
              Badan Penyelenggara Perguruan Tinggi
            </span>
            <span className="text-xs text-amber-300 font-medium">Periode: {foundationInfo.termPeriod}</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">{foundationInfo.name}</h2>
          <p className="text-xs text-amber-200 mt-1 max-w-2xl">
            Ketua Yayasan: <b>{foundationInfo.chairman}</b> • Akta Notaris Kemenkumham: <span className="font-mono">{foundationInfo.notaryAct}</span>
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
          <div className="px-4 py-2 rounded-xl bg-amber-600/30 border border-amber-500/40 text-xs font-bold text-amber-300">
            Legalitas: <b className="text-emerald-400">100% Sah & Aktif</b>
          </div>
        </div>
      </div>

      {/* 2. RINGKASAN KESEHATAN FINANSIAL & VALUASI ASET YAYASAN */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Total Valuasi Aset Kampus:</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{foundationInfo.totalAssetValuation}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ Tanah, Gedung & Fasilitas</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Dana Abadi / Cadangan Kas:</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{foundationInfo.reserveFund}</p>
          <span className="text-[10px] text-slate-500 mt-1 block">Rasio Likuiditas Sangat Sehat</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Pertumbuhan Mhs Multi-Tahun:</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{foundationInfo.pmbMultiYearGrowth}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Tren Pendaftar PMB Positif</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Kepatuhan Anggaran RAPBY:</span>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">96.8%</p>
          <span className="text-[10px] text-slate-500 mt-1 block">Sesuai Ketetapan Senat & Pengurus</span>
        </div>
      </div>

      {/* 3. DAFTAR VALUASI ASET TANAH & FASILITAS YAYASAN */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 size={18} className="text-amber-500" />
              <span>Inventaris Aset Sarana Prasarana & Kepemilikan Yayasan</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar aset fisik institusi yang terverifikasi dan diasuransikan untuk keberlanjutan operasional jangka panjang.
            </p>
          </div>

          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs rounded-xl">
            Audit Akuntan Publik: Wajar Tanpa Pengecualian (WTP)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assetList.map((asset, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{asset.name}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">{asset.status}</span>
              </div>
              <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono shrink-0 ml-3">
                {asset.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
