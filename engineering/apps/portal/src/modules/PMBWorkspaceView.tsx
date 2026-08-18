import React, { useState } from 'react';
import { UserPlus, CheckCircle, Clock, Search, Filter, Award, Download, UserCheck, ShieldCheck, LogIn, FileText, Send, CreditCard, ChevronRight, Upload, Image, CheckSquare } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface Applicant {
  id: string;
  regNumber: string;
  name: string;
  email: string;
  phone: string;
  identityType: 'KTP' | 'KK' | 'PASPOR' | 'KITAS' | 'SIM';
  identityNumber: string;
  nisn: string;
  school: string;
  birthPlace: string;
  birthDate: string;
  gender: 'LAKI_LAKI' | 'PEREMPUAN';
  program: string;
  programSecondary?: string;
  path: string;
  score: number;
  status: 'SUBMITTED' | 'VERIFIED' | 'ACCEPTED' | 'REJECTED' | 'REGISTERED';
  generatedNIM?: string;
  registrationDate: string;
  uploadedFiles: {
    photo: boolean;
    ijazah: boolean;
    identityCard: boolean;
    rapor: boolean;
  };
}

export const PMBWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [viewMode, setViewMode] = useState<'PANITIA' | 'CAMABA'>('PANITIA');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Complete Camaba Registration Form State
  const [camabaForm, setCamabaForm] = useState({
    name: '',
    identityType: 'KTP' as 'KTP' | 'KK' | 'PASPOR' | 'KITAS' | 'SIM',
    identityNumber: '',
    nisn: '',
    birthPlace: '',
    birthDate: '',
    gender: 'LAKI_LAKI' as 'LAKI_LAKI' | 'PEREMPUAN',
    religion: 'Islam',
    school: '',
    address: '',
    email: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    program: 'D4 Usaha Perjalanan Wisata',
    programSecondary: 'D4 Perhotelan',
    path: 'MANDIRI',
    // Mock uploaded files tracking
    uploadedPhotoName: '',
    uploadedIjazahName: '',
    uploadedIdentityName: '',
    uploadedRaporName: ''
  });

  const [camabaRegistered, setCamabaRegistered] = useState<Applicant | null>(null);

  const [applicants, setApplicants] = useState<Applicant[]>([
    { 
      id: 'app-01', 
      regNumber: 'PMB2024-0012', 
      name: 'Ahmad Fauzi Rahman', 
      email: 'ahmad.fauzi@gmail.com', 
      phone: '081234567890', 
      identityType: 'KTP',
      identityNumber: '3201021405060001',
      nisn: '0061234567',
      school: 'SMK Negeri 1 Bandung',
      birthPlace: 'Bandung',
      birthDate: '2006-05-14',
      gender: 'LAKI_LAKI',
      program: 'D4 Usaha Perjalanan Wisata', 
      path: 'MANDIRI',
      score: 88.5, 
      status: 'ACCEPTED', 
      generatedNIM: '240101001', 
      registrationDate: '12 Mei 2024',
      uploadedFiles: { photo: true, ijazah: true, identityCard: true, rapor: true }
    },
    { 
      id: 'app-02', 
      regNumber: 'PMB2024-0015', 
      name: 'Dewi Anjani Lestari', 
      email: 'dewi.anjani@gmail.com', 
      phone: '081298765432', 
      identityType: 'KTP',
      identityNumber: '3171035208060002',
      nisn: '0062345678',
      school: 'SMA Negeri 8 Jakarta',
      birthPlace: 'Jakarta',
      birthDate: '2006-08-12',
      gender: 'PEREMPUAN',
      program: 'D4 Perhotelan', 
      path: 'PRESTASI',
      score: 91.0, 
      status: 'ACCEPTED', 
      generatedNIM: '240102001', 
      registrationDate: '14 Mei 2024',
      uploadedFiles: { photo: true, ijazah: true, identityCard: true, rapor: true }
    },
    { 
      id: 'app-03', 
      regNumber: 'PMB2024-0022', 
      name: 'Bagas Aditya Pratama', 
      email: 'bagas.aditya@gmail.com', 
      phone: '081377889900', 
      identityType: 'KTP',
      identityNumber: '3374011802060003',
      nisn: '0063456789',
      school: 'SMK Pariwisata Semarang',
      birthPlace: 'Semarang',
      birthDate: '2006-02-18',
      gender: 'LAKI_LAKI',
      program: 'D3 Kuliner', 
      path: 'MANDIRI',
      score: 84.0, 
      status: 'VERIFIED', 
      registrationDate: '15 Mei 2024',
      uploadedFiles: { photo: true, ijazah: true, identityCard: true, rapor: true }
    },
    { 
      id: 'app-04', 
      regNumber: 'PMB2024-0028', 
      name: 'Siti Nurhaliza', 
      email: 'siti.nurhaliza@gmail.com', 
      phone: '081122334455', 
      identityType: 'KK',
      identityNumber: '1271016509060004',
      nisn: '0064567890',
      school: 'SMA Negeri 1 Medan',
      birthPlace: 'Medan',
      birthDate: '2006-09-25',
      gender: 'PEREMPUAN',
      program: 'D4 Event & MICE', 
      path: 'MANDIRI',
      score: 79.5, 
      status: 'SUBMITTED', 
      registrationDate: '16 Mei 2024',
      uploadedFiles: { photo: true, ijazah: true, identityCard: true, rapor: false }
    }
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
      identityType: camabaForm.identityType,
      identityNumber: camabaForm.identityNumber,
      nisn: camabaForm.nisn,
      school: camabaForm.school,
      birthPlace: camabaForm.birthPlace,
      birthDate: camabaForm.birthDate,
      gender: camabaForm.gender,
      program: camabaForm.program,
      programSecondary: camabaForm.programSecondary,
      path: camabaForm.path,
      score: Math.floor(Math.random() * 15 + 80),
      status: 'SUBMITTED',
      registrationDate: 'Hari ini',
      uploadedFiles: {
        photo: !!camabaForm.uploadedPhotoName,
        ijazah: !!camabaForm.uploadedIjazahName,
        identityCard: !!camabaForm.uploadedIdentityName,
        rapor: !!camabaForm.uploadedRaporName
      }
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
            Pendaftaran Mandiri Calon Mahasiswa, Unggah Berkas & Seleksi Akademik Terintegrasi ({profile.institutionName})
          </p>
        </div>

        {/* View Switcher */}
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
            Formulir Pendaftaran Camaba (Online)
          </button>
        </div>
      </div>

      {/* 1. PORTAL FORMULIR PENDAFTARAN LENGKAP CALON MAHASISWA BARU */}
      {viewMode === 'CAMABA' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {!camabaRegistered ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-700/60 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <UserPlus size={18} className="text-blue-500" />
                  <span>Formulir Pendaftaran & Unggah Berkas Digital Mahasiswa Baru</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Lengkapi data umum, riwayat sekolah asal, serta unggah dokumen asli untuk verifikasi kelulusan.
                </p>
              </div>

              <form onSubmit={handleCamabaSubmit} className="space-y-6 text-xs">
                {/* Section A: Data Diri Umum */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>A. Data Pribadi Calon Mahasiswa</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap (Sesuai Ijazah SMA): *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama lengkap tanpa singkatan"
                        value={camabaForm.name}
                        onChange={(e) => setCamabaForm({ ...camabaForm, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jenis Identitas: *</label>
                        <select
                          value={camabaForm.identityType}
                          onChange={(e: any) => setCamabaForm({ ...camabaForm, identityType: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm cursor-pointer"
                        >
                          <option value="KTP" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">KTP (WNI)</option>
                          <option value="KK" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Kartu Keluarga (KK)</option>
                          <option value="PASPOR" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Paspor (WNA)</option>
                          <option value="KITAS" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">KITAS</option>
                          <option value="SIM" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">SIM</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nomor Identitas: *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nomor KTP / KK / Paspor / SIM"
                          value={camabaForm.identityNumber}
                          onChange={(e) => setCamabaForm({ ...camabaForm, identityNumber: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">NISN (Nomor Induk Siswa Nasional):</label>
                      <input
                        type="text"
                        placeholder="10 Digit NISN (Jika ada)"
                        value={camabaForm.nisn}
                        onChange={(e) => setCamabaForm({ ...camabaForm, nisn: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Asal Sekolah SMA / SMK / MA: *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: SMA Negeri 1 Medan / SMK Pariwisata"
                        value={camabaForm.school}
                        onChange={(e) => setCamabaForm({ ...camabaForm, school: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tempat Lahir: *</label>
                        <input
                          type="text"
                          required
                          placeholder="Kota Kelahiran"
                          value={camabaForm.birthPlace}
                          onChange={(e) => setCamabaForm({ ...camabaForm, birthPlace: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tanggal Lahir: *</label>
                        <input
                          type="date"
                          required
                          value={camabaForm.birthDate}
                          onChange={(e) => setCamabaForm({ ...camabaForm, birthDate: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jenis Kelamin: *</label>
                        <select
                          value={camabaForm.gender}
                          onChange={(e: any) => setCamabaForm({ ...camabaForm, gender: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm cursor-pointer"
                        >
                          <option value="LAKI_LAKI" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Laki-laki</option>
                          <option value="PEREMPUAN" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Perempuan</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Agama:</label>
                        <select
                          value={camabaForm.religion}
                          onChange={(e) => setCamabaForm({ ...camabaForm, religion: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm cursor-pointer"
                        >
                          <option value="Islam" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Islam</option>
                          <option value="Kristen" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Kristen</option>
                          <option value="Katolik" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Katolik</option>
                          <option value="Hindu" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Hindu</option>
                          <option value="Buddha" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Buddha</option>
                          <option value="Konghucu" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Konghucu</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Aktif (Untuk Notifikasi): *</label>
                      <input
                        type="email"
                        required
                        placeholder="email@anda.com"
                        value={camabaForm.email}
                        onChange={(e) => setCamabaForm({ ...camabaForm, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">No. WhatsApp Aktif: *</label>
                      <input
                        type="tel"
                        required
                        placeholder="08123456789"
                        value={camabaForm.phone}
                        onChange={(e) => setCamabaForm({ ...camabaForm, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Pilihan Program Studi & Jalur */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      <span>B. Pilihan Program Studi & Jalur Seleksi (Database Terhubung)</span>
                    </h4>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Sinkron Database PDDIKTI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pilihan 1 (Utama): *</label>
                      <div className="relative">
                        <select
                          value={camabaForm.program}
                          onChange={(e) => setCamabaForm({ ...camabaForm, program: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm cursor-pointer"
                        >
                          <option value="D4 Usaha Perjalanan Wisata" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">D4 Usaha Perjalanan Wisata (Unggul)</option>
                          <option value="D4 Perhotelan" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">D4 Perhotelan (Unggul)</option>
                          <option value="D3 Kuliner" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">D3 Kuliner (Baik Sekali)</option>
                          <option value="D4 Event & MICE" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">D4 Event & MICE (Unggul)</option>
                          <option value="S1 Manajemen Bisnis Pariwisata" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">S1 Manajemen Bisnis Pariwisata</option>
                          <option value="S1 Sistem Informasi & Teknologi" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">S1 Sistem Informasi & Teknologi</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pilihan 2 (Cadangan):</label>
                      <div className="relative">
                        <select
                          value={camabaForm.programSecondary}
                          onChange={(e) => setCamabaForm({ ...camabaForm, programSecondary: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm cursor-pointer"
                        >
                          <option value="D4 Perhotelan" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">D4 Perhotelan (Unggul)</option>
                          <option value="D4 Usaha Perjalanan Wisata" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">D4 Usaha Perjalanan Wisata (Unggul)</option>
                          <option value="D3 Kuliner" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">D3 Kuliner (Baik Sekali)</option>
                          <option value="D4 Event & MICE" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">D4 Event & MICE (Unggul)</option>
                          <option value="S1 Manajemen Bisnis Pariwisata" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">S1 Manajemen Bisnis Pariwisata</option>
                          <option value="S1 Sistem Informasi & Teknologi" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">S1 Sistem Informasi & Teknologi</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jalur Seleksi: *</label>
                      <div className="relative">
                        <select
                          value={camabaForm.path}
                          onChange={(e) => setCamabaForm({ ...camabaForm, path: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm cursor-pointer"
                        >
                          <option value="MANDIRI" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Jalur Seleksi Mandiri Reguler</option>
                          <option value="PRESTASI" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Jalur Prestasi Akademik & Minat Bakat</option>
                          <option value="KERJASAMA" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Jalur Kemitraan / Kerjasama Industri</option>
                          <option value="KIP_K" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Jalur Beasiswa KIP Kuliah (Kemendikbud)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section C: Upload Berkas Dokumen Wajib */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                  <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center justify-between">
                    <span>C. Upload Berkas & Dokumen Persyaratan Digital</span>
                    <span className="text-[10px] text-slate-400 font-normal">Format: PDF / JPG / PNG (Maks 5MB)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {/* 1. Pas Foto */}
                    <div className="p-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 mx-auto flex items-center justify-center">
                          <Image size={16} />
                        </div>
                        <p className="font-bold text-[11px] text-slate-900 dark:text-white mt-1.5">Pas Foto Calon MB *</p>
                        <p className="text-[10px] text-slate-400">Formal latar merah/biru</p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setCamabaForm({ ...camabaForm, uploadedPhotoName: e.target.files?.[0]?.name || 'foto_terpilih.jpg' })}
                          className="hidden"
                        />
                        <span className="inline-block px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] rounded-lg shadow-sm">
                          {camabaForm.uploadedPhotoName ? '✓ Terunggah' : 'Upload Foto'}
                        </span>
                      </label>
                    </div>

                    {/* 2. Ijazah / SKL SMA */}
                    <div className="p-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 mx-auto flex items-center justify-center">
                          <FileText size={16} />
                        </div>
                        <p className="font-bold text-[11px] text-slate-900 dark:text-white mt-1.5">Ijazah / SKL SMA *</p>
                        <p className="text-[10px] text-slate-400">Surat Keterangan Lulus</p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={(e) => setCamabaForm({ ...camabaForm, uploadedIjazahName: e.target.files?.[0]?.name || 'ijazah_sma.pdf' })}
                          className="hidden"
                        />
                        <span className="inline-block px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg shadow-sm">
                          {camabaForm.uploadedIjazahName ? '✓ Terunggah' : 'Upload Ijazah'}
                        </span>
                      </label>
                    </div>

                    {/* 3. KTP / KK / Paspor / KITAS / SIM */}
                    <div className="p-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-950 mx-auto flex items-center justify-center">
                          <ShieldCheck size={16} />
                        </div>
                        <p className="font-bold text-[11px] text-slate-900 dark:text-white mt-1.5">KTP / KK / SIM / KITAS *</p>
                        <p className="text-[10px] text-slate-400">Kartu identitas resmi</p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={(e) => setCamabaForm({ ...camabaForm, uploadedIdentityName: e.target.files?.[0]?.name || 'ktp_identitas.jpg' })}
                          className="hidden"
                        />
                        <span className="inline-block px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] rounded-lg shadow-sm">
                          {camabaForm.uploadedIdentityName ? '✓ Terunggah' : 'Upload Identitas'}
                        </span>
                      </label>
                    </div>

                    {/* 4. Rapor / Prestasi Pendukung */}
                    <div className="p-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 mx-auto flex items-center justify-center">
                          <Award size={16} />
                        </div>
                        <p className="font-bold text-[11px] text-slate-900 dark:text-white mt-1.5">Rapor / Sertifikat</p>
                        <p className="text-[10px] text-slate-400">Nilai rapor / sertifikat lomba</p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={(e) => setCamabaForm({ ...camabaForm, uploadedRaporName: e.target.files?.[0]?.name || 'rapor_semester.pdf' })}
                          className="hidden"
                        />
                        <span className="inline-block px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] rounded-lg shadow-sm">
                          {camabaForm.uploadedRaporName ? '✓ Terunggah' : 'Upload Dokumen'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    * Wajib diisi dan diunggah untuk kelengkapan administrasi.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <Send size={14} />
                    <span>Kirim Pendaftaran & Simpan Berkas</span>
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
                  Pendaftaran & Berkas Berhasil Terkirim!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Selamat, seluruh data umum dan berkas unggahan Anda telah tercatat resmi di sistem PMB {profile.institutionName}.
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
                  <span className="text-slate-500">Identitas Terverifikasi:</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{camabaRegistered.identityType}: {camabaRegistered.identityNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Program Studi Pilihan:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{camabaRegistered.program}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kelengkapan Berkas:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={12} /> Foto, Ijazah & Identitas Terunggah
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
                  Buka Dashboard Panitia Seleksi →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. DASHBOARD PANITIA SELEKSI PMB VIEW */}
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
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Berkas Lengkap Tervalidasi</p>
              <p className="text-2xl font-black text-blue-600 mt-1">1.240</p>
              <span className="text-[10px] font-bold text-slate-400">Ijazah & Foto Terverifikasi</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Lolos & Terbit NIM</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">680 Mahasiswa</p>
              <span className="text-[10px] font-bold text-emerald-600">82.9% Konfirmasi Registrasi</span>
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
                  <option value="VERIFIED">Berkas Terverifikasi</option>
                  <option value="ACCEPTED">Lolos / Diterima</option>
                </select>
              </div>
            </div>

            {/* Table Records */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3 font-bold">No. Registrasi</th>
                    <th className="p-3 font-bold">Nama Calon Mahasiswa</th>
                    <th className="p-3 font-bold">Identitas / Asal Sekolah</th>
                    <th className="p-3 font-bold">Program Studi Pilihan</th>
                    <th className="p-3 font-bold text-center">Status Berkas</th>
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
                        <span className="block text-[10px] text-slate-400 font-normal">{app.email} • {app.phone}</span>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">{app.identityType}: {app.identityNumber}</span>
                        <span className="block text-[10px] text-slate-400">{app.school}</span>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300 font-medium">{app.program}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          ✓ Foto & Ijazah
                        </span>
                      </td>
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
