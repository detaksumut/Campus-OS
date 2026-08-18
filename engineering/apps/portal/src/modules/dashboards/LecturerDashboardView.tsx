import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle, Clock, Award, FileText, Calendar, Users, 
  CheckSquare, AlertCircle, Send, Sparkles, ChevronRight, SlidersHorizontal, 
  ExternalLink, Layers, Plus, Save
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface LecturerDashboardViewProps {
  onNavigate?: (tab: string, title: string) => void;
  onOpenCustomizer?: () => void;
}

export const LecturerDashboardView: React.FC<LecturerDashboardViewProps> = ({ onNavigate, onOpenCustomizer }) => {
  const { profile } = useTenant();

  // 1. State BKD SISTER & Kontrak Beban SKS Semester Ini
  const [bkdData, setBkdData] = useState({
    pendidikanSKS: 10.0,
    penelitianSKS: 3.0,
    pengabdianSKS: 1.5,
    penunjangSKS: 1.5,
    status: 'MEMENUHI', // Min 12, Max 16 SKS
    targetMin: 12,
    targetMax: 16
  });

  const totalSKSTridharma = bkdData.pendidikanSKS + bkdData.penelitianSKS + bkdData.pengabdianSKS + bkdData.penunjangSKS;

  // 2. Daftar Mata Kuliah Diampu & Status Kontrak Perkuliahan (16 Sesi BAP)
  const [teachingClasses, setTeachingClasses] = useState([
    {
      id: 'cls-1',
      code: 'UPW-201',
      name: 'Manajemen Operasional Pariwisata',
      className: 'Kelas 3-A',
      sks: 4,
      studentsCount: 38,
      completedSessions: 8,
      totalSessions: 16,
      contractStatus: 'DISETUJUI_MAHASISWA', // Status Kontrak SKS Kuliah di sesi 1
      nextSession: 'Senin, 08:00 WIB (Lab Pariwisata 201)',
      gradingProgress: 65
    },
    {
      id: 'cls-2',
      code: 'UPW-202',
      name: 'Perencanaan Destinasi Berkelanjutan',
      className: 'Kelas 3-B',
      sks: 3,
      studentsCount: 35,
      completedSessions: 8,
      totalSessions: 16,
      contractStatus: 'DISETUJUI_MAHASISWA',
      nextSession: 'Selasa, 10:00 WIB (R. Teori 102)',
      gradingProgress: 50
    },
    {
      id: 'cls-3',
      code: 'MBKM-401',
      name: 'Bimbingan Magang Industri MBKM',
      className: 'Kelompok Industri',
      sks: 3,
      studentsCount: 12,
      completedSessions: 10,
      totalSessions: 16,
      contractStatus: 'DISETUJUI_MAHASISWA',
      nextSession: 'Kamis, 13:00 WIB (Online Mentoring)',
      gradingProgress: 80
    }
  ]);

  // 3. Antrian Persetujuan KRS Mahasiswa Bimbingan Akademik (Dosen PA)
  const [adviseeKRS, setAdviseeKRS] = useState([
    { id: 'krs-1', nim: '200101012', name: 'Rian Hidayat', prodi: 'D4 Usaha Perjalanan Wisata', semester: 3, ipsPrev: 3.65, requestedSKS: 22, maxAllowedSKS: 24, status: 'MENUNGGU_APPROVAL' },
    { id: 'krs-2', nim: '200101015', name: 'Siti Nurhaliza', prodi: 'D4 Usaha Perjalanan Wisata', semester: 3, ipsPrev: 3.80, requestedSKS: 24, maxAllowedSKS: 24, status: 'MENUNGGU_APPROVAL' },
    { id: 'krs-3', nim: '200101020', name: 'Budi Santoso', prodi: 'D4 Usaha Perjalanan Wisata', semester: 3, ipsPrev: 2.70, requestedSKS: 20, maxAllowedSKS: 20, status: 'MENUNGGU_APPROVAL' },
  ]);

  const handleApproveKRS = (id: string, name: string) => {
    setAdviseeKRS(prev => prev.map(k => k.id === id ? { ...k, status: 'DISETUJUI' } : k));
    alert(`Kontrak KRS mahasiswa [${name}] berhasil disetujui & divalidasi oleh Dosen PA!`);
  };

  const handleRejectKRS = (id: string, name: string) => {
    const reason = prompt('Masukkan catatan revisi KRS untuk mahasiswa:', 'SKS mata kuliah pilihan bentrok');
    if (reason) {
      setAdviseeKRS(prev => prev.map(k => k.id === id ? { ...k, status: 'DITOLAK_REVISI' } : k));
      alert(`Kontrak KRS mahasiswa [${name}] dikembalikan untuk revisi.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner Dosen Pengajar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border border-blue-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500 text-white">
              Portal Dosen & Pembimbing Akademik
            </span>
            <span className="text-xs text-blue-300 font-medium font-mono">NIDN: 0012057801</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">Selamat Datang, Dr. Hendra Wijaya, M.T.</h2>
          <p className="text-xs text-blue-200 mt-1 max-w-2xl">
            Pusat manajemen Tridharma Perguruan Tinggi, Kontrak SKS Perkuliahan, Verifikasi KRS Mahasiswa Bimbingan, dan Pelaporan BKD SISTER ({profile.institutionName}).
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
          <div className="px-4 py-2 rounded-xl bg-blue-600/30 border border-blue-500/40 text-xs font-bold text-blue-300">
            Semester: <b className="text-white">2024/2025 Genap</b>
          </div>
        </div>
      </div>

      {/* 2. KONTRAK BEBAN KERJA DOSEN (BKD SISTER & TRIDHARMA 12-16 SKS) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award size={18} className="text-blue-500" />
              <span>Kontrak Beban Kerja Dosen (BKD SISTER Tridharma: 12 - 16 SKS)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Standar Regulasi UU Guru & Dosen No. 14/2005 untuk syarat kelayakan Sertifikasi Pendidik (Serdos).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-black text-xs rounded-xl flex items-center gap-1.5">
              <CheckCircle size={14} />
              <span>STATUS: MEMENUHI ({totalSKSTridharma.toFixed(1)} SKS)</span>
            </span>
          </div>
        </div>

        {/* 4 Pilar Tridharma BKD Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
            <span className="text-[10px] font-bold text-slate-500 block">1. Pendidikan & Pengajaran:</span>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{bkdData.pendidikanSKS.toFixed(1)} <span className="text-xs font-bold text-slate-500">SKS</span></p>
            <span className="text-[10px] text-slate-500 mt-1 block">3 Kelas + Bimbingan MBKM</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
            <span className="text-[10px] font-bold text-slate-500 block">2. Penelitian & Publikasi:</span>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{bkdData.penelitianSKS.toFixed(1)} <span className="text-xs font-bold text-slate-500">SKS</span></p>
            <span className="text-[10px] text-slate-500 mt-1 block">1 Jurnal SINTA 2 Aktif</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <span className="text-[10px] font-bold text-slate-500 block">3. Pengabdian (PkM):</span>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{bkdData.pengabdianSKS.toFixed(1)} <span className="text-xs font-bold text-slate-500">SKS</span></p>
            <span className="text-[10px] text-slate-500 mt-1 block">Desa Wisata Binaan</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <span className="text-[10px] font-bold text-slate-500 block">4. Penunjang Institusi:</span>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{bkdData.penunjangSKS.toFixed(1)} <span className="text-xs font-bold text-slate-500">SKS</span></p>
            <span className="text-[10px] text-slate-500 mt-1 block">Tim Akreditasi LAM-EMBA</span>
          </div>
        </div>
      </div>

      {/* 3. KELAS KULIAH, KONTRAK PERKULIAHAN & 16 SESI BAP DIGITAL */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-500" />
              <span>Kontrak Perkuliahan, Jadwal Mengajar & Distribusi 16 Sesi BAP</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Kontrak belajar disepakati pada sesi ke-1 (Presensi, Tugas, UTS, UAS & Silabus RPS OBE).
            </p>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('perkuliahan', 'Perkuliahan')}
            className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1"
          >
            <span>Buka Ruang Kuliah & BAP Lengkap</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teachingClasses.map(cls => (
            <div key={cls.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{cls.code}</span>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {cls.sks} SKS
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1 line-clamp-1">{cls.name}</h4>
                <p className="text-[11px] text-slate-500">{cls.className} • {cls.studentsCount} Mahasiswa</p>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Progres 16 Sesi:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{cls.completedSessions} / {cls.totalSessions} Sesi (50%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(cls.completedSessions / cls.totalSessions) * 100}%` }} />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock size={12} className="text-slate-400" />
                  <span>Sesi Berikutnya: {cls.nextSession.split(' ')[0]}</span>
                </span>
                <button
                  onClick={() => alert(`Membuka Lembar BAP Digital & Kontrak Kuliah Sesi ke-${cls.completedSessions + 1} untuk kelas ${cls.name}`)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] rounded-lg shadow-sm"
                >
                  Isi BAP Sesi {cls.completedSessions + 1}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ANTRIAN PERSETUJUAN KONTRAK KRS MAHASISWA (DOSEN PA) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Users size={18} className="text-emerald-500" />
              <span>Verifikasi & Persetujuan Kontrak KRS Mahasiswa Bimbingan Akademik (Dosen PA)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Validasi batas maksimal 24 SKS berdasarkan IPS semester lalu sebelum mahasiswa dapat mengikuti perkuliahan.
            </p>
          </div>

          <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-xs rounded-xl">
            {adviseeKRS.filter(k => k.status === 'MENUNGGU_APPROVAL').length} Mahasiswa Menunggu Validasi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
              <tr>
                <th className="p-3">NIM / Nama Mahasiswa</th>
                <th className="p-3">Program Studi</th>
                <th className="p-3 text-center">Semester</th>
                <th className="p-3 text-center">IPS Lalu</th>
                <th className="p-3 text-center">SKS Dikontrak</th>
                <th className="p-3 text-center">Batas Maks</th>
                <th className="p-3 text-center">Status KRS</th>
                <th className="p-3 text-center">Aksi Dosen PA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {adviseeKRS.map(adv => (
                <tr key={adv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3">
                    <span className="font-bold text-slate-900 dark:text-white block">{adv.name}</span>
                    <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">{adv.nim}</span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{adv.prodi}</td>
                  <td className="p-3 text-center">Sem {adv.semester}</td>
                  <td className="p-3 text-center font-black text-blue-600 dark:text-blue-400">{adv.ipsPrev.toFixed(2)}</td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-1 text-[11px] font-black rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      {adv.requestedSKS} SKS
                    </span>
                  </td>
                  <td className="p-3 text-center text-slate-500 font-mono">Maks {adv.maxAllowedSKS} SKS</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                      adv.status === 'DISETUJUI' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      adv.status === 'DITOLAK_REVISI' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {adv.status === 'DISETUJUI' ? '✓ Disetujui' : adv.status === 'DITOLAK_REVISI' ? 'Revisi' : '⏳ Menunggu Validasi'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {adv.status === 'MENUNGGU_APPROVAL' ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleApproveKRS(adv.id, adv.name)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
                        >
                          ✓ Setujui
                        </button>
                        <button
                          onClick={() => handleRejectKRS(adv.id, adv.name)}
                          className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-lg"
                        >
                          Revisi
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Selesai</span>
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
