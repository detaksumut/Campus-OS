import React, { useState } from 'react';
import { 
  Database, UploadCloud, Download, FileSpreadsheet, CheckCircle2, 
  AlertCircle, Users, GraduationCap, Briefcase, Building2, 
  Search, RefreshCw, ArrowRight, Table, ShieldCheck, CheckSquare, Sparkles,
  Plus, Trash2, Edit3, Settings2, SlidersHorizontal, BookOpen, Eye, EyeOff
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

type EntityTab = 'MAHASISWA' | 'DOSEN' | 'PEGAWAI' | 'YAYASAN' | 'JURUSAN';

interface ColumnDef {
  id: string;
  key: string;
  label: string;
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'SELECT' | 'BOOLEAN';
  isMandatory: boolean;
  isVisible: boolean;
  isCustom?: boolean;
}

export const DataMigrationWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [activeTab, setActiveTab] = useState<EntityTab>('MAHASISWA');
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showColumnConfig, setShowColumnConfig] = useState(false);

  // New Column Modal State
  const [newColName, setNewColName] = useState('');
  const [newColKey, setNewColKey] = useState('');
  const [newColType, setNewColType] = useState<'TEXT' | 'NUMBER' | 'DATE' | 'SELECT'>('TEXT');

  // Dynamic Column Definitions per Entity Tab
  const [columnsMap, setColumnsMap] = useState<Record<EntityTab, ColumnDef[]>>({
    MAHASISWA: [
      { id: 'c1', key: 'nim', label: 'NIM Mahasiswa', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'c2', key: 'name', label: 'Nama Lengkap', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'c3', key: 'nik', label: 'NIK KTP (16 Digit)', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'c4', key: 'program', label: 'Program Studi / Jurusan', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'c5', key: 'year', label: 'Tahun Angkatan', type: 'NUMBER', isMandatory: true, isVisible: true },
      { id: 'c6', key: 'semester', label: 'Semester Saat Ini', type: 'NUMBER', isMandatory: true, isVisible: true },
      { id: 'c7', key: 'gpa', label: 'IPK Kumulatif', type: 'NUMBER', isMandatory: false, isVisible: true },
      { id: 'c8', key: 'status', label: 'Status Akademik', type: 'SELECT', isMandatory: true, isVisible: true },
    ],
    DOSEN: [
      { id: 'd1', key: 'nidn', label: 'NIDN / NUP', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'd2', key: 'name', label: 'Nama Lengkap & Gelar', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'd3', key: 'prodi', label: 'Homebase Program Studi', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'd4', key: 'rank', label: 'Jabatan Fungsional', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'd5', key: 'bkd', label: 'Beban BKD SISTER (SKS)', type: 'TEXT', isMandatory: false, isVisible: true },
      { id: 'd6', key: 'email', label: 'Email Institusi', type: 'TEXT', isMandatory: true, isVisible: true },
    ],
    PEGAWAI: [
      { id: 'p1', key: 'nip', label: 'NIP / NIK Pegawai', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'p2', key: 'name', label: 'Nama Lengkap', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'p3', key: 'unit', label: 'Unit / Divisi Kerja', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'p4', key: 'title', label: 'Jabatan Struktural/Fungsional', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'p5', key: 'status', label: 'Status Kepegawaian', type: 'SELECT', isMandatory: true, isVisible: true },
      { id: 'p6', key: 'joinYear', label: 'Tahun Masuk (TMT)', type: 'NUMBER', isMandatory: true, isVisible: true },
    ],
    YAYASAN: [
      { id: 'y1', key: 'id', label: 'ID Pengurus', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'y2', key: 'name', label: 'Nama Anggota Pengurus', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'y3', key: 'position', label: 'Jabatan di Badan Penyelenggara', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'y4', key: 'skNotaris', label: 'No. SK Notaris / AHU', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'y5', key: 'period', label: 'Masa Bakti Jabatan', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'y6', key: 'status', label: 'Status Keaktifan', type: 'SELECT', isMandatory: true, isVisible: true },
    ],
    JURUSAN: [
      { id: 'j1', key: 'code', label: 'Kode Prodi PDDIKTI', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'j2', key: 'name', label: 'Nama Program Studi / Jurusan', type: 'TEXT', isMandatory: true, isVisible: true },
      { id: 'j3', key: 'degree', label: 'Jenjang Pendidikan (D3/D4/S1/S2)', type: 'SELECT', isMandatory: true, isVisible: true },
      { id: 'j4', key: 'accreditation', label: 'Peringkat Akreditasi BAN-PT/LAM', type: 'SELECT', isMandatory: true, isVisible: true },
      { id: 'j5', key: 'kaprodi', label: 'Ketua Program Studi (Kaprodi)', type: 'TEXT', isMandatory: false, isVisible: true },
      { id: 'j6', key: 'quota', label: 'Daya Tampung Mahasiswa', type: 'NUMBER', isMandatory: false, isVisible: true },
    ]
  });

  // Dynamic Records Data
  const [studentData, setStudentData] = useState<any[]>([
    { nim: '230101001', name: 'Alfi Syahrin', nik: '3201021405050001', program: 'D4 Usaha Perjalanan Wisata', year: 2023, semester: 3, gpa: 3.82, status: 'AKTIF' },
    { nim: '230102005', name: 'Bella Safira', nik: '3171035208050002', program: 'D4 Perhotelan', year: 2023, semester: 3, gpa: 3.75, status: 'AKTIF' },
    { nim: '220103012', name: 'Chandra Wijaya', nik: '3374011802040003', program: 'D3 Kuliner', year: 2022, semester: 5, gpa: 3.60, status: 'AKTIF' },
    { nim: '210104008', name: 'Dian Permata', nik: '1271016509030004', program: 'D4 Event & MICE', year: 2021, semester: 7, gpa: 3.90, status: 'AKTIF' },
  ]);

  const [lecturerData, setLecturerData] = useState<any[]>([
    { nidn: '0012057501', name: 'Dr. Ir. H. M. Yusuf, M.T.', prodi: 'D4 Usaha Perjalanan Wisata', rank: 'Lektor Kepala', bkd: 'MEMENUHI (15.5 SKS)', email: 'yusuf@kampus.ac.id' },
    { nidn: '0018098202', name: 'Siti Maryam, S.Pd., M.Par.', prodi: 'D4 Perhotelan', rank: 'Lektor', bkd: 'MEMENUHI (14.0 SKS)', email: 'siti.maryam@kampus.ac.id' },
    { nidn: '0025118703', name: 'Chef Denny Kurniawan, M.Sc.', prodi: 'D3 Kuliner', rank: 'Asisten Ahli', bkd: 'MEMENUHI (13.0 SKS)', email: 'denny@kampus.ac.id' },
  ]);

  const [staffData, setStaffData] = useState<any[]>([
    { nip: 'PEG-001', name: 'Hendra Gunawan, S.Kom.', unit: 'UPT Komputer & IT', title: 'Kepala UPT Komputer', status: 'TETAP YAYASAN', joinYear: 2018 },
    { nip: 'PEG-002', name: 'Siti Rahmawati, S.E.', unit: 'Keuangan & Akuntansi', title: 'Kasubag Keuangan & Kasir', status: 'TETAP YAYASAN', joinYear: 2019 },
    { nip: 'PEG-003', name: 'Bambang Irawan, S.Sos.', unit: 'BAAK Layanan Akademik', title: 'Koordinator Akademik', status: 'TETAP YAYASAN', joinYear: 2016 },
    { nip: 'PEG-004', name: 'Nurul Aini, A.Md.', unit: 'Perpustakaan', title: 'Pustakawan Pelaksana', status: 'TETAP YAYASAN', joinYear: 2020 },
  ]);

  const [foundationData, setFoundationData] = useState<any[]>([
    { id: 'YAY-001', name: 'Drs. H. Syarifuddin Lubis, M.M.', position: 'Ketua Dewan Pembina Yayasan', skNotaris: 'AHU-00124.AH.01.04.Tahun 2020', period: '2020 - 2025', status: 'AKTIF' },
    { id: 'YAY-002', name: 'Ir. H. Muhammad Ridwan, M.T.', position: 'Ketua Pengurus Yayasan', skNotaris: 'AHU-00124.AH.01.04.Tahun 2020', period: '2020 - 2025', status: 'AKTIF' },
    { id: 'YAY-003', name: 'Hj. Fatimah Zahra, S.E., M.Si.', position: 'Bendahara Umum Yayasan', skNotaris: 'AHU-00124.AH.01.04.Tahun 2020', period: '2020 - 2025', status: 'AKTIF' },
  ]);

  const [programData, setProgramData] = useState<any[]>([
    { code: '93401', name: 'Usaha Perjalanan Wisata', degree: 'D4 (Sarjana Terapan)', accreditation: 'UNGGUL', kaprodi: 'Dr. Ir. H. M. Yusuf, M.T.', quota: 120 },
    { code: '93402', name: 'Perhotelan', degree: 'D4 (Sarjana Terapan)', accreditation: 'UNGGUL', kaprodi: 'Siti Maryam, S.Pd., M.Par.', quota: 150 },
    { code: '93403', name: 'Kuliner', degree: 'D3 (Ahli Madya)', accreditation: 'BAIK SEKALI', kaprodi: 'Chef Denny Kurniawan, M.Sc.', quota: 80 },
    { code: '93404', name: 'Event & MICE', degree: 'D4 (Sarjana Terapan)', accreditation: 'UNGGUL', kaprodi: 'Nurul Hidayah, M.Par.', quota: 100 },
  ]);

  // Add Custom Column Action
  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;

    const generatedKey = newColKey.trim() || newColName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newCol: ColumnDef = {
      id: `custom-${Date.now()}`,
      key: generatedKey,
      label: newColName.trim(),
      type: newColType,
      isMandatory: false,
      isVisible: true,
      isCustom: true
    };

    setColumnsMap(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newCol]
    }));

    setNewColName('');
    setNewColKey('');
  };

  // Remove Column Action
  const handleRemoveColumn = (colId: string) => {
    setColumnsMap(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(col => col.id !== colId)
    }));
  };

  // Toggle Visibility
  const handleToggleVisibility = (colId: string) => {
    setColumnsMap(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(col => col.id === colId ? { ...col, isVisible: !col.isVisible } : col)
    }));
  };

  // Handle simulated file upload & ingest
  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setIsProcessing(true);
      setImportSuccess(false);

      setTimeout(() => {
        setIsProcessing(false);
        setImportSuccess(true);

        if (activeTab === 'MAHASISWA') {
          setStudentData(prev => [
            { nim: '240101099', name: 'Rizky Ramadhan (Import)', nik: '3201098877660005', program: 'D4 Usaha Perjalanan Wisata', year: 2024, semester: 1, gpa: 0.00, status: 'AKTIF' },
            { nim: '240102100', name: 'Nadia Putri (Import)', nik: '3171098877660006', program: 'D4 Perhotelan', year: 2024, semester: 1, gpa: 0.00, status: 'AKTIF' },
            ...prev
          ]);
        } else if (activeTab === 'DOSEN') {
          setLecturerData(prev => [
            { nidn: '0030129004', name: 'Prof. Dr. Ir. Herman, M.T. (Import)', prodi: 'D4 Usaha Perjalanan Wisata', rank: 'Guru Besar', bkd: 'MEMENUHI (16.0 SKS)', email: 'herman@kampus.ac.id' },
            ...prev
          ]);
        } else if (activeTab === 'PEGAWAI') {
          setStaffData(prev => [
            { nip: 'PEG-005', name: 'Arief Budiman, S.T. (Import)', unit: 'Sarpras & Logistik', title: 'Staf Sarana Prasarana', status: 'TETAP YAYASAN', joinYear: 2023 },
            ...prev
          ]);
        } else if (activeTab === 'YAYASAN') {
          setFoundationData(prev => [
            { id: 'YAY-004', name: 'Dr. Hj. Nurjanah, M.Pd. (Import)', position: 'Sekretaris Yayasan', skNotaris: 'AHU-00124.AH.01.04.Tahun 2020', period: '2020 - 2025', status: 'AKTIF' },
            ...prev
          ]);
        } else if (activeTab === 'JURUSAN') {
          setProgramData(prev => [
            { code: '93405', name: 'S1 Manajemen Bisnis Pariwisata (Import)', degree: 'S1 (Sarjana)', accreditation: 'UNGGUL', kaprodi: 'Dr. H. Hendrawan, S.E., M.M.', quota: 100 },
            ...prev
          ]);
        }
      }, 1200);
    }
  };

  const currentColumns = columnsMap[activeTab];
  const visibleColumns = currentColumns.filter(c => c.isVisible);

  const getCurrentRecords = () => {
    switch (activeTab) {
      case 'MAHASISWA': return studentData;
      case 'DOSEN': return lecturerData;
      case 'PEGAWAI': return staffData;
      case 'YAYASAN': return foundationData;
      case 'JURUSAN': return programData;
      default: return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Database size={22} />
            </div>
            <h2 className="text-xl font-black tracking-tight">Kanal Ingestion & Penyesuaian Kolom Data Master</h2>
            <span className="px-2.5 py-0.5 text-[10px] font-black bg-emerald-500 text-slate-950 rounded-full">
              Zero Data Chaos Protocol
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl">
            Pusat migrasi batch data existing ({profile.institutionName}). Dilengkapi fitur **Tambah/Hapus (+ / -) Kolom Kustom** agar administrator dapat menyesuaikan struktur tabel kampus sebelum proses dropship data dieksekusi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowColumnConfig(!showColumnConfig)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
              showColumnConfig 
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 ring-2 ring-amber-400' 
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
            }`}
          >
            <SlidersHorizontal size={15} />
            <span>{showColumnConfig ? 'Tutup Pengaturan Kolom' : '⚙️ Sesuaikan (+ / -) Kolom Tabel'}</span>
          </button>
        </div>
      </div>

      {/* Banner Protokol Password Awal Default Dropship */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 text-white shadow-lg space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs">🔑 SSO Auto-Credential</span>
            <h4 className="font-black text-xs text-white">Standar Pembuatan Kata Sandi (Password Awal) Data Dropship</h4>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ✓ Enkripsi Argon2id / Bcrypt
          </span>
        </div>
        <p className="text-[11px] text-slate-300">
          Setiap data master yang di-dropship akan otomatis dibuatkan akun SSO dengan format kata sandi awal sebagai berikut:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-[11px]">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 block font-medium">🎓 Mahasiswa:</span>
            <span className="font-mono font-bold text-amber-400">Mhs#[NIM]#[TahunMasuk]</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 block font-medium">👨‍🏫 Rektor & Dosen:</span>
            <span className="font-mono font-bold text-blue-400">Dsn#[NIDN/NUP]</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 block font-medium">💼 Pegawai / Tendik:</span>
            <span className="font-mono font-bold text-emerald-400">Peg#[NIP/NIK]</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 block font-medium">🏛️ Pengurus Yayasan:</span>
            <span className="font-mono font-bold text-purple-400">Yys#[ID_Pengurus]</span>
          </div>
        </div>
        <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800">
          <span>* Pengguna dapat langsung mengubah kata sandi mereka secara mandiri melalui menu <b>Ganti Kata Sandi</b> di pojok kanan atas profil masing-masing.</span>
        </div>
      </div>

      {/* 5 Kanal Tab Selector (Termasuk Jurusan/Akademik) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          onClick={() => { setActiveTab('MAHASISWA'); setImportSuccess(false); setUploadedFileName(null); }}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeTab === 'MAHASISWA'
              ? 'bg-blue-600/15 border-blue-500 shadow-md ring-2 ring-blue-500/30 dark:bg-blue-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Kanal 1</span>
            <GraduationCap size={16} className={activeTab === 'MAHASISWA' ? 'text-blue-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Mahasiswa</p>
            <p className="text-[10px] text-slate-500">{studentData.length} records</p>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('DOSEN'); setImportSuccess(false); setUploadedFileName(null); }}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeTab === 'DOSEN'
              ? 'bg-purple-600/15 border-purple-500 shadow-md ring-2 ring-purple-500/30 dark:bg-purple-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Kanal 2</span>
            <Users size={16} className={activeTab === 'DOSEN' ? 'text-purple-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Dosen Tetap</p>
            <p className="text-[10px] text-slate-500">{lecturerData.length} records</p>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('PEGAWAI'); setImportSuccess(false); setUploadedFileName(null); }}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeTab === 'PEGAWAI'
              ? 'bg-amber-600/15 border-amber-500 shadow-md ring-2 ring-amber-500/30 dark:bg-amber-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Kanal 3</span>
            <Briefcase size={16} className={activeTab === 'PEGAWAI' ? 'text-amber-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Pegawai & Tendik</p>
            <p className="text-[10px] text-slate-500">{staffData.length} records</p>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('YAYASAN'); setImportSuccess(false); setUploadedFileName(null); }}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeTab === 'YAYASAN'
              ? 'bg-emerald-600/15 border-emerald-500 shadow-md ring-2 ring-emerald-500/30 dark:bg-emerald-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Kanal 4</span>
            <Building2 size={16} className={activeTab === 'YAYASAN' ? 'text-emerald-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Pengurus Yayasan</p>
            <p className="text-[10px] text-slate-500">{foundationData.length} records</p>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('JURUSAN'); setImportSuccess(false); setUploadedFileName(null); }}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeTab === 'JURUSAN'
              ? 'bg-indigo-600/15 border-indigo-500 shadow-md ring-2 ring-indigo-500/30 dark:bg-indigo-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Kanal 5</span>
            <BookOpen size={16} className={activeTab === 'JURUSAN' ? 'text-indigo-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Jurusan & Prodi</p>
            <p className="text-[10px] text-slate-500">{programData.length} program studi</p>
          </div>
        </button>
      </div>

      {/* DYNAMIC COLUMN CUSTOMIZER PANEL (+ / - KOLOM) */}
      {showColumnConfig && (
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-lg space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-amber-500" />
                <span>Manajemen Kolom Tabel: {activeTab} (Tambah/Hapus/Sembunyikan)</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Sesuaikan daftar kolom agar 100% identik dengan susunan kolom di file Excel/database lama kampus Anda.
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-lg">
              {currentColumns.length} Total Kolom Terdefinisi
            </span>
          </div>

          {/* Active Columns List with +/- actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {currentColumns.map(col => (
              <div 
                key={col.id} 
                className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all ${
                  col.isVisible 
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm' 
                    : 'bg-slate-100 dark:bg-slate-900/60 border-dashed border-slate-300 dark:border-slate-700 opacity-60'
                }`}
              >
                <div className="truncate">
                  <p className="font-black text-slate-800 dark:text-slate-200 truncate">{col.label}</p>
                  <span className="font-mono text-[10px] text-slate-400">
                    key: <span className="text-blue-500 font-bold">{col.key}</span> • {col.type}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(col.id)}
                    title={col.isVisible ? 'Sembunyikan dari Tabel' : 'Tampilkan di Tabel'}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {col.isVisible ? <Eye size={13} className="text-emerald-500" /> : <EyeOff size={13} />}
                  </button>

                  {col.isCustom && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColumn(col.id)}
                      title="Hapus Kolom Kustom"
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form Tambah Kolom Kustom Baru */}
          <form onSubmit={handleAddColumn} className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-end gap-3 text-xs">
            <div className="flex-1 w-full">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Kolom Baru: *</label>
              <input
                type="text"
                required
                placeholder="Contoh: No Rekening Virtual Account / Asrama"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-48">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tipe Data:</label>
              <select
                value={newColType}
                onChange={(e: any) => setNewColType(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:outline-none"
              >
                <option value="TEXT">Teks / String</option>
                <option value="NUMBER">Angka / Numerik</option>
                <option value="DATE">Tanggal (Date)</option>
                <option value="SELECT">Pilihan / Dropdown</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus size={14} />
              <span>+ Tambah Kolom</span>
            </button>
          </form>
        </div>
      )}

      {/* Dropship & Upload Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <UploadCloud size={20} className="text-blue-500" />
              <span>Zona Dropship / Upload File: {activeTab}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Unggah file data existing (Excel .xlsx, .csv, atau .json). Kolom akan otomatis diselaraskan ke skema database ({visibleColumns.length} kolom aktif).
            </p>
          </div>

          {/* Download Custom-Tailored Template Button */}
          <button
            onClick={() => alert(`Mengunduh Template Excel Kustom untuk Data ${activeTab} (${profile.institutionName}) dengan ${visibleColumns.length} kolom aktif yang telah disesuaikan!`)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Download size={14} className="text-blue-600" />
            <span>Download Template Excel Kustom ({visibleColumns.length} Kolom)</span>
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div className="relative p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/60 dark:bg-slate-900/40 text-center flex flex-col items-center justify-center gap-3 transition-colors hover:border-blue-500">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
            <FileSpreadsheet size={28} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Drag & Drop file Excel/CSV data {activeTab.toLowerCase()} ke sini, atau klik tombol di bawah
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Mendukung: .XLSX, .XLS, .CSV, .JSON (Maksimal 50.000 baris per file)
            </p>
          </div>

          <label className="cursor-pointer mt-2">
            <input
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileDrop}
              className="hidden"
            />
            <span className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105">
              <UploadCloud size={15} />
              <span>Pilih File dari Komputer</span>
            </span>
          </label>

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 mt-2 animate-pulse">
              <RefreshCw size={14} className="animate-spin" />
              <span>Memvalidasi baris & mencocokkan {visibleColumns.length} kolom database...</span>
            </div>
          )}

          {importSuccess && (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-500/30">
              <CheckCircle2 size={16} />
              <span>File {uploadedFileName} berhasil dipetakan & di-ingest ke tabel `{activeTab.toLowerCase()}`!</span>
            </div>
          )}
        </div>
      </div>

      {/* Live Data Explorer Table with Dynamic Active Columns */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Table size={18} className="text-blue-500" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Data Terintegrasi di Database: {activeTab} ({getCurrentRecords().length} baris)
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const sampleNewRow: Record<string, any> = {};
                visibleColumns.forEach(c => {
                  if (c.key.includes('id') || c.key.includes('nim') || c.key.includes('nip') || c.key.includes('nidn') || c.key.includes('code')) {
                    sampleNewRow[c.key] = `BARU-${Math.floor(Math.random() * 900 + 100)}`;
                  } else if (c.key === 'name') {
                    sampleNewRow[c.key] = `Data Baru ${activeTab.toLowerCase()}`;
                  } else if (c.type === 'NUMBER') {
                    sampleNewRow[c.key] = 1;
                  } else if (c.key === 'status') {
                    sampleNewRow[c.key] = 'AKTIF';
                  } else {
                    sampleNewRow[c.key] = `Entri ${c.label}`;
                  }
                });

                if (activeTab === 'MAHASISWA') setStudentData(prev => [sampleNewRow, ...prev]);
                else if (activeTab === 'DOSEN') setLecturerData(prev => [sampleNewRow, ...prev]);
                else if (activeTab === 'PEGAWAI') setStaffData(prev => [sampleNewRow, ...prev]);
                else if (activeTab === 'YAYASAN') setFoundationData(prev => [sampleNewRow, ...prev]);
                else if (activeTab === 'JURUSAN') setProgramData(prev => [sampleNewRow, ...prev]);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus size={13} />
              <span>+ Input Data Riil</span>
            </button>

            <div className="relative max-w-xs w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari data..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-semibold focus:outline-none"
              />
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Dynamic Table Rendering */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
              <tr>
                {visibleColumns.map(col => (
                  <th key={col.id} className="p-3">
                    <span className="block">{col.label}</span>
                    <span className="font-mono text-[9px] font-normal text-blue-500">[{col.key}]</span>
                  </th>
                ))}
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {getCurrentRecords().filter(r => {
                const rowStr = Object.values(r).join(' ').toLowerCase();
                return rowStr.includes(searchQuery.toLowerCase());
              }).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  {visibleColumns.map(col => (
                    <td key={col.id} className="p-3 font-medium text-slate-800 dark:text-slate-200">
                      {row[col.key] !== undefined ? String(row[col.key]) : '-'}
                    </td>
                  ))}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        if (activeTab === 'MAHASISWA') setStudentData(prev => prev.filter((_, i) => i !== idx));
                        else if (activeTab === 'DOSEN') setLecturerData(prev => prev.filter((_, i) => i !== idx));
                        else if (activeTab === 'PEGAWAI') setStaffData(prev => prev.filter((_, i) => i !== idx));
                        else if (activeTab === 'YAYASAN') setFoundationData(prev => prev.filter((_, i) => i !== idx));
                        else if (activeTab === 'JURUSAN') setProgramData(prev => prev.filter((_, i) => i !== idx));
                      }}
                      title="Hapus Baris Data"
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
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
