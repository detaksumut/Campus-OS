import React, { useState } from 'react';
import { UserPlus, CheckCircle, Clock, Search, Filter, Award, Download, UserCheck, ShieldCheck, LogIn, FileText, Send, CreditCard, ChevronRight } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface Applicant {
  id: string;
  regNumber: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  score: number;
  status: 'SUBMITTED' | 'VERIFIED' | 'ACCEPTED' | 'REJECTED' | 'REGISTERED';
  generatedNIM?: string;
  registrationDate: string;
}

export const PMBWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [viewMode, setViewMode] = useState<'PANITIA' | 'CAMABA'>('PANITIA');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Camaba registration form state
  const [camabaForm, setCamabaForm] = useState({
    name: '',
    email: '',
    phone: '',
    nik: '',
    school: '',
    program: 'D4 Usaha Perjalanan Wisata',
    path: 'MANDIRI'
  });
  const [camabaRegistered, setCamabaRegistered] = useState<Applicant | null>(null);

  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: 'app-01', regNumber: 'PMB2024-0012', name: 'Ahmad Fauzi Rahman', email: 'ahmad.fauzi@gmail.com', phone: '081234567890', program: 'D4 Usaha Perjalanan Wisata', score: 88.5, status: 'ACCEPTED', generatedNIM: '240101001', registrationDate: '12 Mei 2024' },
    { id: 'app-02', regNumber: 'PMB2024-0015', name: 'Dewi Anjani Lestari', email: 'dewi.anjani@gmail.com', phone: '081298765432', program: 'D4 Perhotelan', score: 91.0, status: 'ACCEPTED', generatedNIM: '240102001', registrationDate: '14 Mei 2024' },
    { id: 'app-03', regNumber: 'PMB2024-0022', name: 'Bagas Aditya Pratama', email: 'bagas.aditya@gmail.com', phone: '081377889900', program: 'D3 Kuliner', score: 84.0, status: 'VERIFIED', registrationDate: '15 Mei 2024' },
    { id: 'app-04', regNumber: 'PMB2024-0028', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@gmail.com', phone: '081122334455', program: 'D4 Event & MICE', score: 79.5, status: 'SUBMITTED', registrationDate: '16 Mei 2024' },
    { id: 'app-05', regNumber: 'PMB2024-0035', name: 'Rian Saputra', email: 'rian.saputra@gmail.com', phone: '081566778899', program: 'D4 Perhotelan', score: 86.5, status: 'VERIFIED', registrationDate: '17 Mei 2024' },
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

  const handleCamabaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRegNum = `PMB2024-00${Math.floor(Math.random() * 90 + 10)}`;
    const newApp: Applicant = {
      id: `app-${Date.now()}`,
      regNumber: newRegNum,
      name: camabaForm.name,
      email: camabaForm.email,
      phone: camabaForm.phone,
      program: camabaForm.program,
      score: Math.floor(Math.random() * 15 + 80),
      status: 'SUBMITTED',
      registrationDate: 'Hari ini'
    };

    setApplicants(prev => [newApp, ...prev]);
    setCamabaRegistered(newApp);
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
            <h2 className="text-xl font-black tracking-tight">Penerimaan Mahasiswa Baru (PMB Online)</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500 rounded-full">Gelombang 2 (2024/2025)</span>
          </div>
          <p className="text-xs text-blue-200">
            Portal Pendaftaran Calon Mahasiswa & Manajemen Seleksi ({profile.institutionName})
          </p>
        </div>

        {/* View Switcher (Panitia vs Portal Camaba) */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode('PANITIA')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'PANITIA' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Dashboard Panitia PMB
          </button>
          <button
            onClick={() => setViewMode('CAMABA')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'CAMABA' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Portal Calon Mahasiswa (Camaba)
          </button>
        </div>
      </div>

      {/* 1. PORTAL CALON MAHASISWA BARU (CAMABA VIEW) */}
      {viewMode === 'CAMABA' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {!camabaRegistered ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-700/60 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <UserPlus size={18} className="text-blue-500" />
                  <span>Formulir Pendaftaran Mahasiswa Baru 2024/2025</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Silakan lengkapi data diri Anda untuk mendapatkan Nomor Pendaftaran dan akun seleksi resmi.
                </p>
              </div>

              <form onSubmit={handleCamabaSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap (Sesuai KTP/Ijazah):</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Prasetyo"
                      value={camabaForm.name}
                      onChange={(e) => setCamabaForm({ ...camabaForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nomor Induk Kependudukan (NIK):</label>
                    <input
                      type="text"
                      required
                      placeholder="16 Digit NIK KTP"
                      value={camabaForm.nik}
                      onChange={(e) => setCamabaForm({ ...camabaForm, nik: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Alamat Email Aktif:</label>
                    <input
                      type="email"
                      required
                      placeholder="email@anda.com"
                      value={camabaForm.email}
                      onChange={(e) => setCamabaForm({ ...camabaForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">No. Handphone / WhatsApp:</label>
                    <input
                      type="tel"
                      required
                      placeholder="08123456789"
                      value={camabaForm.phone}
                      onChange={(e) => setCamabaForm({ ...camabaForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pilihan Program Studi:</label>
                    <select
                      value={camabaForm.program}
                      onChange={(e) => setCamabaForm({ ...camabaForm, program: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="D4 Usaha Perjalanan Wisata">D4 Usaha Perjalanan Wisata (Akreditasi Unggul)</option>
                      <option value="D4 Perhotelan">D4 Perhotelan (Akreditasi Unggul)</option>
                      <option value="D3 Kuliner">D3 Kuliner (Akreditasi Baik Sekali)</option>
                      <option value="D4 Event & MICE">D4 Event & MICE (Akreditasi Unggul)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jalur Pendaftaran:</label>
                    <select
                      value={camabaForm.path}
                      onChange={(e) => setCamabaForm({ ...camabaForm, path: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="MANDIRI">Jalur Seleksi Mandiri</option>
                      <option value="PRESTASI">Jalur Prestasi Akademik & Bakat</option>
                      <option value="KERJASAMA">Jalur Kemitraan Industri</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <Send size={14} />
                    <span>Daftar & Dapatkan Nomor Registrasi</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Kartu Bukti Pendaftaran Camaba */
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-emerald-500/40 shadow-xl space-y-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 flex items-center justify-center mx-auto text-2xl">
                🎉
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Pendaftaran Berhasil Terkirim!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Selamat, berkas Anda telah tercatat di Pangkalan Data PMB {profile.institutionName}.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-xs text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor Registrasi:</span>
                  <span className="font-mono font-black text-blue-600 dark:text-blue-400">{camabaRegistered.regNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Calon Mahasiswa:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{camabaRegistered.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Program Studi Pilihan:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{camabaRegistered.program}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Seleksi:</span>
                  <span className="font-bold px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded">
                    MENUNGGU VERIFIKASI
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setCamabaRegistered(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                >
                  Daftar Calon Lain
                </button>
                <button
                  onClick={() => setViewMode('PANITIA')}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Buka Dashboard Panitia →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. DASHBOARD PANITIA PMB VIEW */}
      {viewMode === 'PANITIA' && (
        <div className="space-y-6">
          {/* KPI Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pendaftar</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{applicants.length + 1445}</p>
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
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        {app.name}
                        <span className="block text-[10px] text-slate-400 font-normal">{app.email}</span>
                      </td>
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
      )}
    </div>
  );
};
