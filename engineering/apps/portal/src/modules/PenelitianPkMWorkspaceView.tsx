import React, { useState, useEffect } from 'react';
import { 
  Microscope, HeartHandshake, BookMarked, Award, Download, 
  CheckCircle2, Clock, FileText, Plus, ExternalLink, ShieldCheck, 
  Users, Sparkles, Building, Video, Layers, Filter
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface PenelitianPkMWorkspaceViewProps {
  defaultSubTab?: 'PENELITIAN' | 'PENGABDIAN' | 'PUBLIKASI';
}

export const PenelitianPkMWorkspaceView: React.FC<PenelitianPkMWorkspaceViewProps> = ({ defaultSubTab = 'PENELITIAN' }) => {
  const { profile } = useTenant();
  const [activeSubTab, setActiveSubTab] = useState<'PENELITIAN' | 'PENGABDIAN' | 'PUBLIKASI'>(defaultSubTab);

  useEffect(() => {
    if (defaultSubTab) {
      setActiveSubTab(defaultSubTab);
    }
  }, [defaultSubTab]);

  // 1. DATA RISET & PENELITIAN LPPM
  const [researchList] = useState([
    {
      id: 'RES-2024-001',
      title: 'Pengembangan Smart Tourism Dashboard Berbasis Artificial Intelligence untuk Destinasi Unggulan',
      lead: 'Dr. Hendra Wijaya, M.T.',
      members: ['Siti Rahmawati, M.Kom', 'Rian Hidayat (Mahasiswa)'],
      scheme: 'Hibah Penelitian Terapan (BIMA Kemendikbudristek)',
      funding: 'Rp 145.000.000',
      trl: 'TRL 6 (Demonstrasi Lapangan)',
      progress: 85,
      status: 'BERJALAN',
      output: 'Jurnal SINTA 2 & Hak Cipta Perangkat Lunak'
    },
    {
      id: 'RES-2024-002',
      title: 'Model Tata Kelola Perhotelan Ramah Lingkungan (Green Hospitality) Menuju Net-Zero Emission',
      lead: 'Siti Rahmawati, M.Par',
      members: ['Agus Salim, M.Par'],
      scheme: 'Hibah Penelitian Dosen Pemula (Internal Kampus)',
      funding: 'Rp 35.000.000',
      trl: 'TRL 4 (Validasi Laboratorium)',
      progress: 100,
      status: 'SELESAI',
      output: 'Jurnal Internasional Terindeks Scopus Q2'
    },
    {
      id: 'RES-2024-003',
      title: 'Optimasi Sistem Pengawetan Pangan Tradisional dengan Pengemasan Vacuum Food-Grade',
      lead: 'Chef Bambang Tri, M.Pd.',
      members: ['Aisyah Putri, S.Tr.Par'],
      scheme: 'Hibah Riset Kerjasama Industri (Matching Fund)',
      funding: 'Rp 85.000.000',
      trl: 'TRL 7 (Prototipe Skala Operasional)',
      progress: 70,
      status: 'MONEV_70',
      output: 'Paten Sederhana & Prototipe Kemasan'
    }
  ]);

  // 2. DATA PENGABDIAN KEPADA MASYARAKAT (PkM)
  const [pkmList] = useState([
    {
      id: 'PKM-2024-001',
      title: 'Pemberdayaan Kelompok Sadar Wisata (Pokdarwis) Melalui Pelatihan Digital Marketing & Hospitality Desa',
      lead: 'Drs. Anwar Nasution, M.Si.',
      partner: 'Desa Wisata Lumban Bulbul (Toba)',
      participants: '35 Pelaku Usaha Homestay',
      funding: 'Rp 30.000.000 (Hibah Kemendikbudristek PkM)',
      status: 'SELESAI',
      impact: 'Peningkatan Omset Homestay +32%',
      mediaUrl: 'https://youtube.com/watch?v=demo-pkm-toba'
    },
    {
      id: 'PKM-2024-002',
      title: 'Penerapan Standar Higienitas Sanitasi HACCP pada Pengrajin Olahan Kuliner Tradisional UMKM',
      lead: 'Chef Bambang Tri, M.Pd.',
      partner: 'Asosiasi UMKM Kuliner Pesisir',
      participants: '20 Mitra UMKM',
      funding: 'Rp 25.000.000 (Hibah Internal Kampus)',
      status: 'BERJALAN',
      impact: 'Sertifikasi Halal & Higiene 20 Produk',
      mediaUrl: 'https://berita-daerah.id/liputan-pkm-kampus'
    },
    {
      id: 'PKM-2024-003',
      title: 'Edukasi Literasi Keuangan Digital & Pembayaran QRIS untuk Pedagang Pasar Tradisional',
      lead: 'Rina Anggraini, S.E., M.M.',
      partner: 'Paguyuban Pedagang Pasar Sejahtera',
      participants: '50 Pedagang Pasar',
      funding: 'Rp 20.000.000 (Dana CSR Bank Mitra)',
      status: 'SELESAI',
      impact: '100% Pedagang Menggunakan Akun QRIS Bank',
      mediaUrl: 'https://youtube.com/watch?v=qris-edukasi'
    }
  ]);

  // 3. DATA PUBLIKASI SINTA & HKI / HAK CIPTA
  const [hkiList] = useState([
    {
      id: 'HKI-2024-001',
      regNumber: 'EC00202410982',
      type: 'HAK CIPTA (PROGRAM KOMPUTER)',
      title: 'Smart Tourism Destination Engine v1.0',
      inventors: ['Dr. Hendra Wijaya', 'Siti Rahmawati, M.Kom'],
      applicationDate: '12 Maret 2024',
      status: 'TERDAFTAR_DJKI',
      sintaScore: '+40 Poin SINTA'
    },
    {
      id: 'HKI-2024-002',
      regNumber: 'S00202404123',
      type: 'PATEN SEDERHANA',
      title: 'Alat Pengemas Makanan Vakum Portabel Hemat Daya untuk Dapur Komersial',
      inventors: ['Chef Bambang Tri', 'Aisyah Putri'],
      applicationDate: '28 Januari 2024',
      status: 'SUBSTANTIVE_EXAM',
      sintaScore: '+60 Poin SINTA'
    },
    {
      id: 'HKI-2024-003',
      regNumber: 'EC00202409871',
      type: 'HAK CIPTA (BUKU PANDUAN)',
      title: 'Buku Pedoman Standarisasi Homestay Berbasis Kearifan Lokal',
      inventors: ['Drs. Anwar Nasution, M.Si.'],
      applicationDate: '05 Mei 2024',
      status: 'TERDAFTAR_DJKI',
      sintaScore: '+25 Poin SINTA'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Dynamic Header based on active sub tab */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {activeSubTab === 'PENELITIAN' && <Microscope size={24} className="text-blue-400" />}
            {activeSubTab === 'PENGABDIAN' && <HeartHandshake size={24} className="text-emerald-400" />}
            {activeSubTab === 'PUBLIKASI' && <Award size={24} className="text-amber-400" />}

            <h2 className="text-xl font-black tracking-tight">
              {activeSubTab === 'PENELITIAN' && 'Manajemen Penelitian & Hibah LPPM'}
              {activeSubTab === 'PENGABDIAN' && 'Pengabdian Kepada Masyarakat (PkM)'}
              {activeSubTab === 'PUBLIKASI' && 'Publikasi Jurnal SINTA & Hak Cipta (HKI DJKI)'}
            </h2>
            <span className="px-2.5 py-0.5 text-[10px] font-black bg-blue-600 rounded-full">
              Tridharma Perguruan Tinggi
            </span>
          </div>
          <p className="text-xs text-slate-300">
            {activeSubTab === 'PENELITIAN' && 'Pengusulan Proposal Riset, Evaluasi Reviewer, Skema Hibah Dikti & Laporan Kemajuan 100%'}
            {activeSubTab === 'PENGABDIAN' && 'Pemberdayaan Desa Binaan, Kemitraan UMKM, Luaran Video Dokumenter & Diseminasi Publik'}
            {activeSubTab === 'PUBLIKASI' && 'Pencatatan Hak Cipta Kemenkumham, Paten, Akreditasi SINTA 1 s/d 6 & Skor Kinerja Dosen'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all">
            <Download size={14} />
            <span>Ekspor Kinerja SINTA</span>
          </button>
          <button className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all">
            <Plus size={14} />
            <span>
              {activeSubTab === 'PENELITIAN' && 'Usulkan Proposal Riset'}
              {activeSubTab === 'PENGABDIAN' && 'Daftarkan Program PkM'}
              {activeSubTab === 'PUBLIKASI' && 'Daftarkan Hak Cipta / HKI'}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('PENELITIAN')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeSubTab === 'PENELITIAN'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Microscope size={16} />
          <span>1. Penelitian LPPM ({researchList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('PENGABDIAN')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeSubTab === 'PENGABDIAN'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <HeartHandshake size={16} />
          <span>2. Pengabdian Masyarakat (PkM) ({pkmList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('PUBLIKASI')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeSubTab === 'PUBLIKASI'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Award size={16} />
          <span>3. Publikasi SINTA & HKI DJKI ({hkiList.length})</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 🔬 TAB 1: PENELITIAN LPPM */}
      {/* ============================================================ */}
      {activeSubTab === 'PENELITIAN' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total Judul Penelitian</p>
              <p className="text-2xl font-black text-blue-600 font-mono">68 Judul</p>
              <span className="text-[10px] font-bold text-emerald-600">+24% Pertumbuhan Tahunan</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Serapan Hibah Dikti / BIMA</p>
              <p className="text-2xl font-black text-emerald-600 font-mono">Rp 1,95 M</p>
              <span className="text-[10px] text-slate-400 font-medium">14 Proposal Didanai</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Hibah Internal Kampus</p>
              <p className="text-2xl font-black text-purple-600 font-mono">Rp 450 Jt</p>
              <span className="text-[10px] text-slate-400 font-medium">Dana Mandiri Institusi</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Rata-rata TRL / Kesiapan</p>
              <p className="text-2xl font-black text-amber-500 font-mono">TRL 6.2</p>
              <span className="text-[10px] text-emerald-600 font-bold">Siap Hilirisasi Industri</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Microscope size={18} className="text-blue-500" />
              <span>Daftar Riset & Proposal Penelitian Dosen Berjalan</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Kode & Judul Riset</th>
                    <th className="p-3">Ketua & Tim Peneliti</th>
                    <th className="p-3">Skema Pendanaan</th>
                    <th className="p-3 text-right">Dana Disetujui</th>
                    <th className="p-3">Tingkat TRL</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {researchList.map(res => (
                    <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <span className="text-[10px] font-mono font-bold text-blue-500 block">{res.id}</span>
                        <p className="font-bold text-slate-900 dark:text-white max-w-sm">{res.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">🎯 Target Luaran: {res.output}</p>
                      </td>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                        <p>{res.lead}</p>
                        <p className="text-[10px] text-slate-400 font-normal">Anggota: {res.members.join(', ')}</p>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400 font-medium">{res.scheme}</td>
                      <td className="p-3 font-mono font-black text-emerald-600 text-right">{res.funding}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 border border-blue-200 dark:border-blue-800">
                          {res.trl}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2.5 py-1 text-[10px] font-black rounded-full ${
                          res.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🤝 TAB 2: PENGABDIAN MASYARAKAT (PkM) */}
      {/* ============================================================ */}
      {activeSubTab === 'PENGABDIAN' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total Program PkM</p>
              <p className="text-2xl font-black text-emerald-600 font-mono">45 Mitra</p>
              <span className="text-[10px] text-slate-400 font-medium">Desa Binaan & UMKM</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Masyarakat Terdampak</p>
              <p className="text-2xl font-black text-blue-600 font-mono">1.420 Jiwa</p>
              <span className="text-[10px] font-bold text-emerald-600">Pemberdayaan Nyata</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total Dana Pengabdian</p>
              <p className="text-2xl font-black text-purple-600 font-mono">Rp 450 Jt</p>
              <span className="text-[10px] text-slate-400 font-medium">Dikti, CSR & Mandiri</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Publikasi Video PkM</p>
              <p className="text-2xl font-black text-amber-500 font-mono">45 Video</p>
              <span className="text-[10px] text-slate-400 font-medium">Diseminasi Kanal Digital</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <HeartHandshake size={18} className="text-emerald-500" />
              <span>Daftar Program Pengabdian Kepada Masyarakat (PkM) & Mitra Binaan</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Kode & Judul Program PkM</th>
                    <th className="p-3">Ketua Pelaksana</th>
                    <th className="p-3">Mitra Sasaran & Peserta</th>
                    <th className="p-3">Dampak & Indikator Hasil</th>
                    <th className="p-3 text-right">Dana PkM</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pkmList.map(pkm => (
                    <tr key={pkm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <span className="text-[10px] font-mono font-bold text-emerald-500 block">{pkm.id}</span>
                        <p className="font-bold text-slate-900 dark:text-white max-w-sm">{pkm.title}</p>
                      </td>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{pkm.lead}</td>
                      <td className="p-3">
                        <p className="font-bold text-blue-600">{pkm.partner}</p>
                        <p className="text-[10px] text-slate-500">{pkm.participants}</p>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-emerald-600 block">{pkm.impact}</span>
                        <a href={pkm.mediaUrl} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-500 hover:underline flex items-center gap-1 mt-0.5">
                          <ExternalLink size={10} /> Link Liputan Media / Video
                        </a>
                      </td>
                      <td className="p-3 font-mono font-black text-slate-900 dark:text-white text-right">{pkm.funding}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2.5 py-1 text-[10px] font-black rounded-full ${
                          pkm.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {pkm.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 📜 TAB 3: PUBLIKASI SINTA & HKI DJKI */}
      {/* ============================================================ */}
      {activeSubTab === 'PUBLIKASI' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Hak Cipta Terdaftar DJKI</p>
              <p className="text-2xl font-black text-amber-500 font-mono">32 HKI</p>
              <span className="text-[10px] font-bold text-emerald-600">Sertifikat EC Kemenkumham</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Paten Terdaftar / Granted</p>
              <p className="text-2xl font-black text-purple-600 font-mono">8 Paten</p>
              <span className="text-[10px] text-slate-400 font-medium">Inovasi Teknologi Terapan</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Skor SINTA 3Yr Institusi</p>
              <p className="text-2xl font-black text-blue-600 font-mono">4.820 Poin</p>
              <span className="text-[10px] text-emerald-600 font-bold">Peringkat 45 Vokasi/Univ</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Artikel Terindeks Scopus</p>
              <p className="text-2xl font-black text-emerald-600 font-mono">24 Paper</p>
              <span className="text-[10px] text-slate-400 font-medium">Jurnal Internasional Bereputasi</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Award size={18} className="text-amber-500" />
              <span>Daftar Sertifikat Hak Kekayaan Intelektual (HKI) & Paten Terdaftar</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Nomor Permohonan DJKI</th>
                    <th className="p-3">Jenis Perlindungan HKI</th>
                    <th className="p-3">Judul Karya Cipta / Paten</th>
                    <th className="p-3">Inventor / Pemegang Hak</th>
                    <th className="p-3">Kontribusi SINTA</th>
                    <th className="p-3 text-center">Status DJKI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {hkiList.map(hki => (
                    <tr key={hki.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-600">{hki.regNumber}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          {hki.type}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white max-w-sm">{hki.title}</td>
                      <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">{hki.inventors.join(', ')}</td>
                      <td className="p-3 font-bold text-blue-600">{hki.sintaScore}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center gap-1">
                          <ShieldCheck size={12} /> {hki.status === 'TERDAFTAR_DJKI' ? 'TERDAFTAR RESMI' : 'PEMERIKSAAN'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
