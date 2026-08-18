import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle, Clock, Calendar, Users, FileText, 
  Package, ChevronRight, SlidersHorizontal, CheckSquare, Wrench
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface StaffDashboardViewProps {
  onNavigate?: (tab: string, title: string) => void;
  onOpenCustomizer?: () => void;
}

export const StaffDashboardView: React.FC<StaffDashboardViewProps> = ({ onNavigate, onOpenCustomizer }) => {
  const { profile } = useTenant();

  // Presensi Pegawai
  const staffProfile = {
    nip: 'PEG-001',
    name: 'Budi Santoso, S.Kom.',
    unit: 'BAAK & Pusat Teknologi Informasi',
    title: 'Kepala Seksi Pelayanan Akademik',
    checkInTime: '07:45 WIB',
    remainingLeaveDays: 10,
    monthlyAttendanceRate: '98.5%'
  };

  // Antrian Layanan Dokumen BAAK
  const [ticketQueue, setTicketQueue] = useState([
    { id: 'req-1', type: 'Surat Keterangan Mahasiswa Aktif', student: 'Rian Hidayat (200101012)', date: 'Hari ini, 09:15 WIB', status: 'DIPROSES' },
    { id: 'req-2', type: 'Legalisir Transkrip Nilai Sementara', student: 'Siti Maryam (190102004)', date: 'Hari ini, 10:30 WIB', status: 'MENUNGGU' },
    { id: 'req-3', type: 'Permohonan Cuti Akademik', student: 'Ahmad Fauzi (210103009)', date: 'Kemarin', status: 'MENUNGGU_VERIFIKASI' },
  ]);

  const handleProcessTicket = (id: string, type: string) => {
    setTicketQueue(prev => prev.map(t => t.id === id ? { ...t, status: 'SELESAI_DITERBITKAN' } : t));
    alert(`Permohonan [${type}] berhasil diselesaikan & dokumen PDF siap diunduh mahasiswa!`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner Pegawai / Tendik */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-slate-950">
              Portal Layanan Pegawai & Tendik
            </span>
            <span className="text-xs text-emerald-300 font-mono">NIP: {staffProfile.nip}</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">Selamat Datang, {staffProfile.name}</h2>
          <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
            {staffProfile.title} • Unit: <b>{staffProfile.unit}</b> ({profile.institutionName})
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
          <div className="px-4 py-2 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-xs font-bold text-emerald-300">
            Presensi Hari Ini: <b className="text-white">{staffProfile.checkInTime}</b>
          </div>
        </div>
      </div>

      {/* 2. STATISTIK KEHADIRAN & LAYANAN PEGAWAI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Tingkat Kehadiran Bulanan:</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{staffProfile.monthlyAttendanceRate}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ Sangat Disiplin</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Sisa Cuti Tahunan:</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{staffProfile.remainingLeaveDays} <span className="text-xs font-bold text-slate-500">Hari</span></p>
          <span className="text-[10px] text-slate-500 mt-1 block">Dari Total 12 Hari Kerja</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Antrian Layanan BAAK:</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{ticketQueue.filter(t => t.status !== 'SELESAI_DITERBITKAN').length} <span className="text-xs font-bold text-slate-500">Dokumen</span></p>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">Menunggu Penerbitan</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block">Status Inventaris BMN:</span>
          <p className="text-lg font-black text-purple-600 dark:text-purple-400 mt-1">100% TERDATA</p>
          <span className="text-[10px] text-slate-500 mt-1 block">SIMAK-BMN Sinkron</span>
        </div>
      </div>

      {/* 3. ANTRIAN LAYANAN DOKUMEN AKADEMIK MAHASISWA */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileText size={18} className="text-emerald-500" />
              <span>Loket Layanan Permohonan Dokumen & Surat Mahasiswa (BAAK Digital)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Proses surat keterangan mahasiswa aktif, legalisir ijazah online, dan transkrip akademik bertanda tangan digital (BSrE/QR-Code).
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
              <tr>
                <th className="p-3">Jenis Permohonan Dokumen</th>
                <th className="p-3">Nama & NIM Mahasiswa</th>
                <th className="p-3">Waktu Pengajuan</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Aksi Layanan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {ticketQueue.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{t.type}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">{t.student}</td>
                  <td className="p-3 text-slate-500">{t.date}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                      t.status === 'SELESAI_DITERBITKAN' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {t.status === 'SELESAI_DITERBITKAN' ? '✓ Diterbitkan' : '⏳ Menunggu Cetak'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {t.status !== 'SELESAI_DITERBITKAN' ? (
                      <button
                        onClick={() => handleProcessTicket(t.id, t.type)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm"
                      >
                        ✓ Terbitkan Surat
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400">Terkirim ke Mhs</span>
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
