import React, { useState } from 'react';
import { 
  Building2, Users, Award, TrendingUp, DollarSign, ShieldCheck, 
  BookOpen, ChevronRight, SlidersHorizontal, Layers, CheckCircle, School
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

type ExecutiveTab = 'REKTOR' | 'WAREK_1' | 'WAREK_2' | 'WAREK_3' | 'WAREK_4';

export interface RectorDashboardViewProps {
  onNavigate?: (tab: string, title: string) => void;
  onOpenCustomizer?: () => void;
}

export const RectorDashboardView: React.FC<RectorDashboardViewProps> = ({ onNavigate, onOpenCustomizer }) => {
  const { profile } = useTenant();
  const [execTab, setExecTab] = useState<ExecutiveTab>('REKTOR');

  // IKU Kemendikbudristek (Indikator Kinerja Utama 1 - 8)
  const ikuStatus = [
    { no: 'IKU 1', title: 'Kesiapan Kerja Lulusan (Gaji > 1.2x UMR)', target: '80%', actual: '84.5%', status: 'TERCAPAI' },
    { no: 'IKU 2', title: 'Mahasiswa Berkegiatan di Luar Kampus (MBKM)', target: '30%', actual: '38.2%', status: 'TERCAPAI' },
    { no: 'IKU 3', title: 'Dosen Berkegiatan Tridharma di Luar Kampus', target: '25%', actual: '29.0%', status: 'TERCAPAI' },
    { no: 'IKU 4', title: 'Praktisi Mengajar di Dalam Kampus', target: '20%', actual: '24.5%', status: 'TERCAPAI' },
    { no: 'IKU 5', title: 'Keluaran Kerja Dosen Digunakan Masyarakat / Paten', target: '15', actual: '18 HKI', status: 'TERCAPAI' },
    { no: 'IKU 6', title: 'Program Studi Bekerjasama dengan Mitra Kelas Dunia', target: '100%', actual: '100%', status: 'TERCAPAI' },
    { no: 'IKU 7', title: 'Kelas yang Kolaboratif dan Partisipatif (Case Method)', target: '50%', actual: '58.0%', status: 'TERCAPAI' },
    { no: 'IKU 8', title: 'Program Studi Berstandar Internasional', target: '4 Prodi', actual: '4 Prodi', status: 'TERCAPAI' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner Rektor & Pimpinan */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 text-white border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500 text-white">
              Executive Leadership Command Center
            </span>
            <span className="text-xs text-indigo-300 font-medium">{profile.executiveTitle}: <b>{profile.executiveName}</b></span>
          </div>
          <h2 className="text-xl font-black tracking-tight">Dashboard Eksekutif Rektor & Wakil Rektor</h2>
          <p className="text-xs text-indigo-200 mt-1 max-w-2xl">
            Monitoring Kinerja Institusi, 8 IKU Kemendikbudristek, Kesehatan Finansial, Akreditasi Internasional & Tata Kelola Kampus ({profile.institutionName}).
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
          <div className="px-4 py-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-xs font-bold text-indigo-300">
            Akreditasi Institusi: <b className="text-emerald-400">UNGGUL (A)</b>
          </div>
        </div>
      </div>

      {/* 2. TAB SELECTOR: REKTOR & WAREK 1 s/d 4 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          onClick={() => setExecTab('REKTOR')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            execTab === 'REKTOR'
              ? 'bg-blue-600/15 border-blue-500 shadow-md ring-2 ring-blue-500/30 dark:bg-blue-950/40'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          <span className="text-[10px] font-bold text-slate-500">Pimpinan Utama</span>
          <p className="font-black text-xs text-slate-900 dark:text-white mt-1">Rektor / Direktur</p>
        </button>

        <button
          onClick={() => setExecTab('WAREK_1')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            execTab === 'WAREK_1'
              ? 'bg-purple-600/15 border-purple-500 shadow-md ring-2 ring-purple-500/30 dark:bg-purple-950/40'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          <span className="text-[10px] font-bold text-slate-500">Bidang I</span>
          <p className="font-black text-xs text-slate-900 dark:text-white mt-1">Warek 1 (Akademik)</p>
        </button>

        <button
          onClick={() => setExecTab('WAREK_2')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            execTab === 'WAREK_2'
              ? 'bg-emerald-600/15 border-emerald-500 shadow-md ring-2 ring-emerald-500/30 dark:bg-emerald-950/40'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          <span className="text-[10px] font-bold text-slate-500">Bidang II</span>
          <p className="font-black text-xs text-slate-900 dark:text-white mt-1">Warek 2 (Keuangan & SDM)</p>
        </button>

        <button
          onClick={() => setExecTab('WAREK_3')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            execTab === 'WAREK_3'
              ? 'bg-amber-600/15 border-amber-500 shadow-md ring-2 ring-amber-500/30 dark:bg-amber-950/40'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          <span className="text-[10px] font-bold text-slate-500">Bidang III</span>
          <p className="font-black text-xs text-slate-900 dark:text-white mt-1">Warek 3 (Kemahasiswaan)</p>
        </button>

        <button
          onClick={() => setExecTab('WAREK_4')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            execTab === 'WAREK_4'
              ? 'bg-sky-600/15 border-sky-500 shadow-md ring-2 ring-sky-500/30 dark:bg-sky-950/40'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          <span className="text-[10px] font-bold text-slate-500">Bidang IV</span>
          <p className="font-black text-xs text-slate-900 dark:text-white mt-1">Warek 4 (Kerjasama & Riset)</p>
        </button>
      </div>

      {/* 3. KONTEN TAB EKSEKUTIF */}
      {execTab === 'REKTOR' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 block">Total Mahasiswa Aktif:</span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">2.860</p>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">↑ +8.23% vs Semester Lalu</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 block">Rasio Dosen : Mahasiswa:</span>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">1 : 15.4</p>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ Standar Dikti Sangat Ideal</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 block">Realisasi Anggaran Kampus:</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">94.8%</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Efisiensi Operasional Tinggi</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 block">Capaian IKU 1 - 8:</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">100%</p>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">8 dari 8 IKU Memenuhi Target</span>
            </div>
          </div>

          {/* IKU TABLE MONITOR */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award size={18} className="text-amber-500" />
              <span>Matriks Capaian 8 Indikator Kinerja Utama (IKU Kemendikbudristek)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ikuStatus.map(iku => (
                <div key={iku.no} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 mr-2">{iku.no}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{iku.title}</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Target: {iku.target} • Realisasi: <b className="text-emerald-600">{iku.actual}</b></p>
                  </div>
                  <span className="px-2.5 py-1 text-[9px] font-black rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                    ✓ {iku.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {execTab === 'WAREK_1' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Bidang Akademik & Akreditasi (Warek 1)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
              <span className="text-slate-500 font-bold">Kepatuhan 16 Sesi BAP Dosen:</span>
              <p className="text-2xl font-black text-purple-600 mt-1">99.2%</p>
              <p className="text-[10px] text-slate-500 mt-1">BAP & Presensi Digital Tepat Waktu</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
              <span className="text-slate-500 font-bold">IPK Rata-Rata Kampus:</span>
              <p className="text-2xl font-black text-blue-600 mt-1">3.58</p>
              <p className="text-[10px] text-slate-500 mt-1">Standar Kurikulum OBE SN-Dikti</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-slate-500 font-bold">Status Neo Feeder PDDIKTI:</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">100% SINKRON</p>
              <p className="text-[10px] text-slate-500 mt-1">2.860 Data Transaksi Valid</p>
            </div>
          </div>
        </div>
      )}

      {execTab === 'WAREK_2' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Bidang Keuangan & SDM (Warek 2)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-slate-500 font-bold">Penerimaan UKT Semester Ini:</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">Rp 12.87 M</p>
              <p className="text-[10px] text-slate-500 mt-1">98.4% Mahasiswa Lunas Tepat Waktu</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
              <span className="text-slate-500 font-bold">Dosen Bergelar S3 / Lektor Kepala:</span>
              <p className="text-2xl font-black text-blue-600 mt-1">68.5%</p>
              <p className="text-[10px] text-slate-500 mt-1">Kecukupan Jabatan Fungsional Dosen</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
              <span className="text-slate-500 font-bold">Kepatuhan BKD 12-16 SKS:</span>
              <p className="text-2xl font-black text-amber-600 mt-1">100%</p>
              <p className="text-[10px] text-slate-500 mt-1">Seluruh Dosen Ber-NIDN Memenuhi</p>
            </div>
          </div>
        </div>
      )}

      {execTab === 'WAREK_3' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Bidang Kemahasiswaan & Alumni (Warek 3)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
              <span className="text-slate-500 font-bold">Prestasi Nasional / Internasional:</span>
              <p className="text-2xl font-black text-amber-600 mt-1">42 Medali</p>
              <p className="text-[10px] text-slate-500 mt-1">Simkatmawa Kemendikbud</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
              <span className="text-slate-500 font-bold">Penerima Beasiswa (KIP-K & Yayasan):</span>
              <p className="text-2xl font-black text-blue-600 mt-1">480 Mhs</p>
              <p className="text-[10px] text-slate-500 mt-1">100% Tepat Sasaran</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-slate-500 font-bold">Waktu Tunggu Kerja Alumni:</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">1.8 Bulan</p>
              <p className="text-[10px] text-slate-500 mt-1">Tracer Study IKU 1</p>
            </div>
          </div>
        </div>
      )}

      {execTab === 'WAREK_4' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Bidang Kerjasama & Riset Inovasi (Warek 4)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60">
              <span className="text-slate-500 font-bold">MoU Industri & Universitas Dunia:</span>
              <p className="text-2xl font-black text-sky-600 mt-1">54 Mitra Aktif</p>
              <p className="text-[10px] text-slate-500 mt-1">Kerjasama MBKM & Magang Global</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
              <span className="text-slate-500 font-bold">Hibah Riset Kedaireka & DRTPM:</span>
              <p className="text-2xl font-black text-purple-600 mt-1">Rp 3.42 M</p>
              <p className="text-[10px] text-slate-500 mt-1">Dana Hibah Matching Fund Disetujui</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-slate-500 font-bold">Publikasi Scopus & SINTA 1-2:</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">64 Artikel</p>
              <p className="text-[10px] text-slate-500 mt-1">Indeks Sitasi Meningkat +24%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
