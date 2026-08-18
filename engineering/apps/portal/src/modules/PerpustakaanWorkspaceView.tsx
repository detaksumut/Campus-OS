import React, { useState } from 'react';
import { 
  Library, Package, UserCheck, Search, BookOpen, CheckCircle2, Download, 
  Plus, UserPlus, Building, Briefcase, GraduationCap, Send, Phone, Mail, 
  Award, Filter, Clock, AlertTriangle, Printer, RotateCcw, X, FileText, QrCode
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface BookItem {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  category: string;
  shelfLocation: string;
  availableStock: number;
  totalCopies: number;
  type: 'BUKU_FISIK' | 'E_BOOK';
}

export interface LoanTransaction {
  id: string;
  userIdentifier: string; // NIM / NIDN / NIP
  userName: string;
  userRole: 'MAHASISWA' | 'DOSEN' | 'PEGAWAI';
  unitOrProdi: string;
  bookId: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'DIPINJAM' | 'DIKEMBALIKAN' | 'TERLAMBAT';
  fineAmount: number;
}

export interface AlumniItem {
  id: string;
  nim: string;
  name: string;
  prodi: string;
  gradYear: number;
  employmentStatus: 'BEKERJA' | 'WIRAUSAHA' | 'STUDI_LANJUT' | 'MENCARI_KERJA';
  company: string;
  jobTitle: string;
  waitTimeMonths: number;
  salaryRange: string;
  email: string;
  phone: string;
}

export interface AssetItem {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  unit: string;
  condition: 'BAIK' | 'PERLU_SERVIS' | 'RUSAK_RINGAN' | 'RUSAK_BERAT';
  procurementYear: number;
  assetValue: number;
  pic: string;
  lastMaintenanceDate?: string;
}

export const PerpustakaanWorkspaceView: React.FC<{ defaultSub?: 'perpustakaan' | 'aset' | 'alumni' }> = ({ defaultSub = 'perpustakaan' }) => {
  const { profile } = useTenant();
  const [subTab, setSubTab] = useState<'perpustakaan' | 'aset' | 'alumni'>(defaultSub);
  
  // Library State
  const [librarySubMode, setLibrarySubMode] = useState<'KATALOG_BUKU' | 'SIRKULASI_PINJAM' | 'BEBAS_PUSTAKA'>('KATALOG_BUKU');
  const [bookSearch, setBookSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [selectedBookForLoan, setSelectedBookForLoan] = useState<BookItem | null>(null);
  const [selectedClearanceStudent, setSelectedClearanceStudent] = useState<any | null>(null);

  // 1. Katalog Buku Perpustakaan
  const [books, setBooks] = useState<BookItem[]>([
    {
      id: 'bk-01',
      isbn: '978-602-8519-93-1',
      title: 'Manajemen Operasional Perhotelan & Resort Modern',
      author: 'Prof. Dr. Ir. H. M. Yusuf, M.T.',
      publisher: 'Campus Press Indonesia',
      year: 2023,
      category: 'Perhotelan & Pariwisata',
      shelfLocation: 'Rak A-02 / Hospitality',
      availableStock: 8,
      totalCopies: 10,
      type: 'BUKU_FISIK'
    },
    {
      id: 'bk-02',
      isbn: '978-623-224-118-2',
      title: 'Ekowisata Berbasis Komunitas (Community-Based Tourism)',
      author: 'Dr. Hendra Wijaya, M.T.',
      publisher: 'Penerbit Pustaka Pariwisata',
      year: 2022,
      category: 'Pariwisata & Ekowisata',
      shelfLocation: 'Rak A-05 / Ekowisata',
      availableStock: 4,
      totalCopies: 6,
      type: 'BUKU_FISIK'
    },
    {
      id: 'bk-03',
      isbn: '978-602-06-3841-5',
      title: 'Standar HACCP & Sanitasi Dapur Kuliner Profesional',
      author: 'Chef Denny Kurniawan, M.Sc.',
      publisher: 'Gramedia Pustaka Utama',
      year: 2024,
      category: 'Seni Kuliner & Gastronomi',
      shelfLocation: 'Rak B-01 / Gastronomi',
      availableStock: 5,
      totalCopies: 5,
      type: 'BUKU_FISIK'
    },
    {
      id: 'bk-04',
      isbn: '978-979-29-5832-1',
      title: 'Rancang Bangun Sistem Informasi Berbasis Cloud WebRTC',
      author: 'Budi Santoso, S.Kom. & Tim IT',
      publisher: 'Andi Publisher',
      year: 2023,
      category: 'Teknologi Informasi',
      shelfLocation: 'Rak C-03 / Informatika',
      availableStock: 3,
      totalCopies: 4,
      type: 'BUKU_FISIK'
    },
    {
      id: 'bk-05',
      isbn: '978-602-1234-56-7',
      title: 'Digital Tourism Marketing: Strategi Pemasaran Destinasi 5.0',
      author: 'Siti Rahmawati, S.Tr.Par., M.Par.',
      publisher: 'E-Library Dikti',
      year: 2024,
      category: 'Pemasaran Digital',
      shelfLocation: 'E-Book Cloud Repository',
      availableStock: 999,
      totalCopies: 999,
      type: 'E_BOOK'
    }
  ]);

  // 2. Daftar Transaksi Peminjaman Buku Aktif (Sivitas Akademika)
  const [loans, setLoans] = useState<LoanTransaction[]>([
    {
      id: 'LOAN-2024-001',
      userIdentifier: '200101012',
      userName: 'Rian Hidayat',
      userRole: 'MAHASISWA',
      unitOrProdi: 'D4 Usaha Perjalanan Wisata',
      bookId: 'bk-01',
      bookTitle: 'Manajemen Operasional Perhotelan & Resort Modern',
      borrowDate: '10 Mei 2024',
      dueDate: '17 Mei 2024',
      status: 'TERLAMBAT',
      fineAmount: 3000
    },
    {
      id: 'LOAN-2024-002',
      userIdentifier: '0012057801',
      userName: 'Dr. Hendra Wijaya, M.T.',
      userRole: 'DOSEN',
      unitOrProdi: 'Program Studi D4 Pariwisata',
      bookId: 'bk-03',
      bookTitle: 'Standar HACCP & Sanitasi Dapur Kuliner Profesional',
      borrowDate: '12 Mei 2024',
      dueDate: '26 Mei 2024',
      status: 'DIPINJAM',
      fineAmount: 0
    },
    {
      id: 'LOAN-2024-003',
      userIdentifier: '210102008',
      userName: 'Nabila Syahrini',
      userRole: 'MAHASISWA',
      unitOrProdi: 'D4 Perhotelan',
      bookId: 'bk-02',
      bookTitle: 'Ekowisata Berbasis Komunitas (Community-Based Tourism)',
      borrowDate: '15 Mei 2024',
      dueDate: '22 Mei 2024',
      status: 'DIPINJAM',
      fineAmount: 0
    }
  ]);

  // Form State Tambah Buku Baru
  const [newBookForm, setNewBookForm] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    year: 2024,
    category: 'Perhotelan & Pariwisata',
    shelfLocation: 'Rak A-01',
    totalCopies: 5,
    type: 'BUKU_FISIK' as 'BUKU_FISIK' | 'E_BOOK'
  });

  // Form State Peminjaman Baru
  const [loanForm, setLoanForm] = useState({
    userIdentifier: '',
    userName: '',
    userRole: 'MAHASISWA' as 'MAHASISWA' | 'DOSEN' | 'PEGAWAI',
    unitOrProdi: 'D4 Usaha Perjalanan Wisata',
    durationDays: 7
  });

  // Alumni State
  const [alumniViewMode, setAlumniViewMode] = useState<'DIREKTORI' | 'FORM_DAFTAR' | 'IKU_STAT'>('DIREKTORI');
  const [alumniSearch, setAlumniSearch] = useState('');
  const [alumniProdiFilter, setAlumniProdiFilter] = useState('ALL');
  const [alumniList, setAlumniList] = useState<AlumniItem[]>([
    { id: 'alm-01', nim: '200101012', name: 'Rian Hidayat, S.Tr.Par.', prodi: 'D4 Usaha Perjalanan Wisata', gradYear: 2024, employmentStatus: 'BEKERJA', company: 'Garuda Indonesia Holiday Tour', jobTitle: 'Senior Tour Product Manager', waitTimeMonths: 1.5, salaryRange: 'Rp 8.000.000 - Rp 12.000.000', email: 'rian.hidayat@gmail.com', phone: '081234567801' },
    { id: 'alm-02', nim: '200102025', name: 'Putri Ayu Wandira, S.Tr.Par.', prodi: 'D4 Perhotelan', gradYear: 2024, employmentStatus: 'BEKERJA', company: 'Marriott International (Bali Resort)', jobTitle: 'Assistant Front Office Manager', waitTimeMonths: 1.0, salaryRange: 'Rp 10.000.000 - Rp 15.000.000', email: 'putri.ayu@gmail.com', phone: '081234567802' },
  ]);

  // Asset & Inventory State
  const [assetSearch, setAssetSearch] = useState('');
  const [assetCategoryFilter, setAssetCategoryFilter] = useState('ALL');
  const [assetConditionFilter, setAssetConditionFilter] = useState('ALL');
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState<AssetItem | null>(null);

  const [assetList, setAssetList] = useState<AssetItem[]>([
    {
      id: 'ast-01',
      code: 'BMN-2024-LAB-01',
      name: 'Rational iCombi Pro 6-Grid Combi Oven Industri',
      category: 'Peralatan Lab Kuliner',
      location: 'Lab Kitchen & Culinary Arts (Lt. 1)',
      quantity: 4,
      unit: 'Unit',
      condition: 'BAIK',
      procurementYear: 2023,
      assetValue: 380000000,
      pic: 'Chef Anton, S.Pd.',
      lastMaintenanceDate: '10 Mei 2024'
    },
    {
      id: 'ast-02',
      code: 'BMN-2024-LAB-02',
      name: 'La Marzocco Linea Mini 2-Group Commercial Espresso Machine',
      category: 'Peralatan Lab Kuliner',
      location: 'Barista & Beverage Training Center',
      quantity: 6,
      unit: 'Unit',
      condition: 'BAIK',
      procurementYear: 2024,
      assetValue: 450000000,
      pic: 'Budi Santoso, S.Kom.',
      lastMaintenanceDate: '02 Juni 2024'
    },
    {
      id: 'ast-03',
      code: 'BMN-2024-TI-03',
      name: 'Apple iMac 24" M3 Retina 16GB Studio Production',
      category: 'Teknologi Informasi & Komputer',
      location: 'Lab Multimedia & Digital Tourism (Lt. 3)',
      quantity: 30,
      unit: 'Unit',
      condition: 'BAIK',
      procurementYear: 2024,
      assetValue: 750000000,
      pic: 'Ir. Rahmat Hidayat, M.Kom.',
      lastMaintenanceDate: '15 Mei 2024'
    },
    {
      id: 'ast-04',
      code: 'BMN-2024-FAS-04',
      name: 'Set Kamar Hotel Suite Bintang 5 (King Koil & Interior)',
      category: 'Furnitur & Perhotelan',
      location: 'Hotel Mockup Training Center Room 201-208',
      quantity: 8,
      unit: 'Set',
      condition: 'BAIK',
      procurementYear: 2023,
      assetValue: 320000000,
      pic: 'Siti Fatimah, S.Tr.Par.',
      lastMaintenanceDate: '20 April 2024'
    },
    {
      id: 'ast-05',
      code: 'BMN-2024-LAB-05',
      name: 'Olympus CX23 Binocular LED Microscope Laboratorium',
      category: 'Peralatan Lab Kuliner',
      location: 'Lab Sanitasi Pangan & Mikrobiologi',
      quantity: 15,
      unit: 'Unit',
      condition: 'PERLU_SERVIS',
      procurementYear: 2022,
      assetValue: 225000000,
      pic: 'Dr. Hendra Wijaya, M.T.',
      lastMaintenanceDate: '12 Januari 2024'
    },
    {
      id: 'ast-06',
      code: 'BMN-2024-TI-06',
      name: 'Sony Alpha A7 IV Mirrorless 4K Cinema Camera Kit',
      category: 'Teknologi Informasi & Komputer',
      location: 'Lab Tour & Broadcast Studio',
      quantity: 5,
      unit: 'Unit',
      condition: 'BAIK',
      procurementYear: 2024,
      assetValue: 185000000,
      pic: 'Rian Hidayat, S.Tr.Par.',
      lastMaintenanceDate: '18 Mei 2024'
    }
  ]);

  React.useEffect(() => {
    if (defaultSub) {
      setSubTab(defaultSub);
    }
  }, [defaultSub]);

  // Handler Peminjaman Buku
  const handlePerformLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookForLoan || !loanForm.userIdentifier || !loanForm.userName) return;

    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + Number(loanForm.durationDays));

    const newLoan: LoanTransaction = {
      id: `LOAN-2024-${Date.now().toString().slice(-3)}`,
      userIdentifier: loanForm.userIdentifier.trim(),
      userName: loanForm.userName.trim(),
      userRole: loanForm.userRole,
      unitOrProdi: loanForm.unitOrProdi,
      bookId: selectedBookForLoan.id,
      bookTitle: selectedBookForLoan.title,
      borrowDate: today.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      dueDate: dueDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'DIPINJAM',
      fineAmount: 0
    };

    setLoans(prev => [newLoan, ...prev]);
    // Kurangi stok buku fisik
    if (selectedBookForLoan.type === 'BUKU_FISIK') {
      setBooks(prev => prev.map(b => b.id === selectedBookForLoan.id ? { ...b, availableStock: Math.max(0, b.availableStock - 1) } : b));
    }
    setSelectedBookForLoan(null);
    setLibrarySubMode('SIRKULASI_PINJAM');
  };

  // Handler Pengembalian Buku
  const handleReturnBook = (loan: LoanTransaction) => {
    setLoans(prev => prev.map(l => l.id === loan.id ? { 
      ...l, 
      status: 'DIKEMBALIKAN', 
      returnDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) 
    } : l));

    // Pulihkan stok buku
    setBooks(prev => prev.map(b => b.id === loan.bookId ? { ...b, availableStock: b.availableStock + 1 } : b));
  };

  // Handler Tambah Buku Baru
  const handleAddBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: BookItem = {
      id: `bk-${Date.now()}`,
      isbn: newBookForm.isbn.trim() || `ISBN-${Math.floor(Math.random()*89999+10000)}`,
      title: newBookForm.title.trim(),
      author: newBookForm.author.trim(),
      publisher: newBookForm.publisher.trim(),
      year: Number(newBookForm.year),
      category: newBookForm.category,
      shelfLocation: newBookForm.shelfLocation,
      availableStock: Number(newBookForm.totalCopies),
      totalCopies: Number(newBookForm.totalCopies),
      type: newBookForm.type
    };

    setBooks(prev => [created, ...prev]);
    setShowAddBookModal(false);
  };

  const filteredBooks = books.filter(b => {
    const matchQuery = b.title.toLowerCase().includes(bookSearch.toLowerCase()) || 
                       b.author.toLowerCase().includes(bookSearch.toLowerCase()) || 
                       b.isbn.includes(bookSearch);
    const matchCat = selectedCategoryFilter === 'ALL' || b.category === selectedCategoryFilter;
    return matchQuery && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {subTab === 'perpustakaan' && <Library size={22} className="text-blue-400" />}
            {subTab === 'aset' && <Package size={22} className="text-amber-400" />}
            {subTab === 'alumni' && <UserCheck size={22} className="text-emerald-400" />}
            <h2 className="text-xl font-black tracking-tight">
              {subTab === 'perpustakaan' ? 'Perpustakaan Digital, Katalog OPAC & Sirkulasi Peminjaman' :
               subTab === 'aset' ? 'Inventaris & Manajemen Aset Kampus (SIMAK-BMN)' : 'Portal Alumni & Tracer Study Nasional (IKU 1)'}
            </h2>
          </div>
          <p className="text-xs text-blue-200">
            Sistem Terpadu Katalog Buku, Sirkulasi Sivitas Akademika, Bebas Pustaka Yudisium & Manajemen Fasilitas ({profile.institutionName})
          </p>
        </div>

        {/* Sub Tabs Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setSubTab('perpustakaan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'perpustakaan' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
          >
            Perpustakaan & OPAC
          </button>
          <button
            onClick={() => setSubTab('aset')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'aset' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
          >
            Inventaris & Aset
          </button>
          <button
            onClick={() => setSubTab('alumni')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'alumni' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
          >
            Alumni & Tracer
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SUB-VIEW: PERPUSTAKAAN DIGITAL & SIRKULASI PEMINJAMAN */}
      {/* ========================================================================= */}
      {subTab === 'perpustakaan' && (
        <div className="space-y-6">
          {/* KPI Stats Perpustakaan */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Koleksi Buku</p>
              <p className="text-2xl font-black text-blue-600 mt-1">{books.length * 3690} <span className="text-xs font-bold text-slate-400">Eks</span></p>
              <span className="text-[10px] font-bold text-slate-400">Termasuk E-Book & Jurnal</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Peminjaman Aktif</p>
              <p className="text-2xl font-black text-amber-600 mt-1">{loans.filter(l => l.status === 'DIPINJAM' || l.status === 'TERLAMBAT').length * 142} <span className="text-xs font-bold text-slate-400">Buku</span></p>
              <span className="text-[10px] font-bold text-emerald-600">Sirkulasi Digital Otomatis</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Bebas Pustaka Terbit</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">720 Mahasiswa</p>
              <span className="text-[10px] font-bold text-emerald-600">✓ Syarat Kelulusan Wisuda</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Kunjungan OPAC Harian</p>
              <p className="text-2xl font-black text-purple-600 mt-1">890 User</p>
              <span className="text-[10px] font-bold text-purple-600">Civitas Akademika Aktif</span>
            </div>
          </div>

          {/* 3 Navigasi Internal Perpustakaan */}
          <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-200 dark:bg-slate-800/80 rounded-2xl border border-slate-300 dark:border-slate-700">
            <button
              onClick={() => setLibrarySubMode('KATALOG_BUKU')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                librarySubMode === 'KATALOG_BUKU' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={14} />
              <span>1. Katalog Buku & OPAC ({books.length} Judul)</span>
            </button>

            <button
              onClick={() => setLibrarySubMode('SIRKULASI_PINJAM')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                librarySubMode === 'SIRKULASI_PINJAM' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              <Clock size={14} />
              <span>2. Sirkulasi Peminjaman Sivitas ({loans.length} Data)</span>
            </button>

            <button
              onClick={() => setLibrarySubMode('BEBAS_PUSTAKA')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                librarySubMode === 'BEBAS_PUSTAKA' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 size={14} />
              <span>3. Cek Bebas Pustaka (Syarat Wisuda)</span>
            </button>
          </div>

          {/* TAB 1: KATALOG BUKU OPAC */}
          {librarySubMode === 'KATALOG_BUKU' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-500" />
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">Daftar Buku & Koleksi Referensi Digital Kampus</h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari judul, pengarang, ISBN..."
                      value={bookSearch}
                      onChange={(e) => setBookSearch(e.target.value)}
                      className="px-3 py-1.5 pl-8 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                    />
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>

                  <button
                    onClick={() => setShowAddBookModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
                  >
                    <Plus size={14} />
                    <span>Tambah Buku</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                    <tr>
                      <th className="p-3">ISBN / Barcode</th>
                      <th className="p-3">Judul Buku & Karya</th>
                      <th className="p-3">Pengarang & Penerbit</th>
                      <th className="p-3">Kategori & Lokasi Rak</th>
                      <th className="p-3 text-center">Tipe</th>
                      <th className="p-3 text-center">Stok Tersedia</th>
                      <th className="p-3 text-center">Aksi Layanan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                    {filteredBooks.map(book => (
                      <tr key={book.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{book.isbn}</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs">{book.title}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">
                          <div>{book.author}</div>
                          <span className="text-[10px] text-slate-400">{book.publisher} ({book.year})</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 block mb-0.5 w-fit">
                            {book.category}
                          </span>
                          <span className="text-[10px] text-slate-400">{book.shelfLocation}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${book.type === 'E_BOOK' ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                            {book.type === 'E_BOOK' ? 'E-Book PDF' : 'Buku Fisik'}
                          </span>
                        </td>
                        <td className="p-3 text-center font-bold">
                          {book.type === 'E_BOOK' ? (
                            <span className="text-emerald-500 font-bold">Akses Unlimited</span>
                          ) : (
                            <span className={book.availableStock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 font-bold'}>
                              {book.availableStock} / {book.totalCopies} Eks
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedBookForLoan(book);
                              setLoanForm({ ...loanForm, userIdentifier: '200101012', userName: 'Rian Hidayat' });
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm flex items-center gap-1 mx-auto hover:scale-105 transition-all"
                          >
                            <Library size={12} />
                            <span>Pinjamkan Buku</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SIRKULASI PEMINJAMAN BUKU AKTIF SIVITAS */}
          {librarySubMode === 'SIRKULASI_PINJAM' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="pb-2 border-b border-slate-100 dark:border-slate-700/60">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock size={18} className="text-amber-500" />
                  <span>Daftar Transaksi Peminjaman Buku Aktif (Dosen, Mahasiswa & Pegawai)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Catatan sirkulasi peminjaman, tanggal jatuh tempo pengembalian, dan perhitungan denda keterlambatan otomatis.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                    <tr>
                      <th className="p-3">ID Pinjam</th>
                      <th className="p-3">Peminjam (Sivitas Akademika)</th>
                      <th className="p-3">Judul Buku</th>
                      <th className="p-3">Tanggal Pinjam</th>
                      <th className="p-3">Jatuh Tempo</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-center">Denda</th>
                      <th className="p-3 text-center">Aksi Pengembalian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                    {loans.map(loan => (
                      <tr key={loan.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{loan.id}</td>
                        <td className="p-3">
                          <span className="font-bold text-slate-900 dark:text-white block">{loan.userName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{loan.userRole} • {loan.userIdentifier}</span>
                        </td>
                        <td className="p-3 font-bold text-slate-800 dark:text-slate-200 max-w-xs">{loan.bookTitle}</td>
                        <td className="p-3 text-slate-500">{loan.borrowDate}</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{loan.dueDate}</td>
                        <td className="p-3 text-center">
                          {loan.status === 'DIKEMBALIKAN' ? (
                            <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                              ✓ DIKEMBALIKAN
                            </span>
                          ) : loan.status === 'TERLAMBAT' ? (
                            <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 animate-pulse">
                              ⚠️ TERLAMBAT
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                              ⏳ SEDANG DIPINJAM
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center font-bold text-rose-600 font-mono">
                          {loan.fineAmount > 0 ? `Rp ${loan.fineAmount.toLocaleString('id-ID')}` : '-'}
                        </td>
                        <td className="p-3 text-center">
                          {loan.status !== 'DIKEMBALIKAN' ? (
                            <button
                              onClick={() => handleReturnBook(loan)}
                              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm flex items-center gap-1 mx-auto hover:scale-105 transition-all"
                            >
                              <RotateCcw size={12} />
                              <span>Kembalikan Buku</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-bold">✓ Selesai pada {loan.returnDate}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CEK & CETAK SURAT BEBAS PUSTAKA YUDISIUM */}
          {librarySubMode === 'BEBAS_PUSTAKA' && (
            <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="text-center pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center font-black mb-2">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">Layanan Validasi & Surat Keterangan Bebas Pustaka</h3>
                <p className="text-xs text-slate-500 mt-1">Syarat wajib pendaftaran wisuda, yudisium, dan pencetakan ijazah.</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Nama Mahasiswa:</span>
                  <span className="font-bold text-slate-900 dark:text-white">Rian Hidayat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">NIM:</span>
                  <span className="font-mono font-bold text-emerald-600">200101012</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Program Studi:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">D4 Usaha Perjalanan Wisata</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-emerald-200 dark:border-emerald-800 font-bold">
                  <span>Status Tanggungan Perpustakaan:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">✓ BEBAS TANGGUNGAN PINJAMAN BUKU</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => window.print()}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 hover:scale-105 transition-all"
                >
                  <Printer size={15} />
                  <span>🖨️ Cetak Surat Keterangan Bebas Pustaka (PDF)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-VIEW: ASET & INVENTARIS */}
      {/* ========================================================================= */}
      {subTab === 'aset' && (
        <div className="space-y-6">
          {/* KPI Ringkasan Inventaris Terkini */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total Item Inventaris</p>
              <p className="text-2xl font-black text-amber-500 font-mono">
                {assetList.reduce((acc, a) => acc + a.quantity, 0)} Unit
              </p>
              <span className="text-[10px] font-bold text-slate-400">{assetList.length} Kategori Alat & Aset</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total Nilai Buku (SIMAK-BMN)</p>
              <p className="text-2xl font-black text-emerald-600 font-mono">
                Rp {(assetList.reduce((acc, a) => acc + a.assetValue, 0) / 1000000000).toFixed(2)} M
              </p>
              <span className="text-[10px] font-bold text-emerald-600">100% Barcode Terdata</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Kondisi Prima (Siap Pakai)</p>
              <p className="text-2xl font-black text-blue-600 font-mono">
                {Math.round((assetList.filter(a => a.condition === 'BAIK').length / assetList.length) * 100)}%
              </p>
              <span className="text-[10px] font-bold text-blue-600">Operasional Praktikum</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Perlu Pemeliharaan</p>
              <p className="text-2xl font-black text-rose-500 font-mono">
                {assetList.filter(a => a.condition !== 'BAIK').length} Item
              </p>
              <span className="text-[10px] font-bold text-rose-500">Jadwal Kalibrasi / Servis</span>
            </div>
          </div>

          {/* Tabel Direktori Inventaris & Tombol Aksi */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Package size={18} className="text-amber-500" />
                  <span>Daftar Inventaris Sarana Prasarana & Laboratorium (Dapat di-Adjust)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kelola kuantitas unit, mutasi lokasi ruangan, pembaruan kondisi fisik, dan nilai buku aset kampus.
                </p>
              </div>

              <button
                onClick={() => setShowAddAssetModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center gap-1.5 hover:scale-105 transition-all shrink-0"
              >
                <Plus size={14} />
                <span>+ Tambah Aset Inventaris Baru</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Cari kode BMN, nama peralatan, atau ruangan..."
                  value={assetSearch}
                  onChange={(e) => setAssetSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-amber-500"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              <select
                value={assetConditionFilter}
                onChange={(e) => setAssetConditionFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-white dark:bg-slate-800">Semua Kondisi Fisik</option>
                <option value="BAIK" className="bg-white dark:bg-slate-800">Baik / Siap Pakai</option>
                <option value="PERLU_SERVIS" className="bg-white dark:bg-slate-800">Perlu Servis / Kalibrasi</option>
                <option value="RUSAK_RINGAN" className="bg-white dark:bg-slate-800">Rusak Ringan</option>
                <option value="RUSAK_BERAT" className="bg-white dark:bg-slate-800">Rusak Berat</option>
              </select>
            </div>

            {/* Tabel Records */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-bold">
                  <tr>
                    <th className="p-3">Kode BMN & Barcode</th>
                    <th className="p-3">Nama Alat & Kategori</th>
                    <th className="p-3">Lokasi Ruangan & PIC</th>
                    <th className="p-3 text-center">Jumlah (Adjust Qty)</th>
                    <th className="p-3 text-center">Kondisi Aset</th>
                    <th className="p-3 text-right">Nilai Perolehan</th>
                    <th className="p-3 text-center">Aksi Penyesuaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {assetList
                    .filter(a => {
                      const matchSearch = a.name.toLowerCase().includes(assetSearch.toLowerCase()) || 
                                          a.code.toLowerCase().includes(assetSearch.toLowerCase()) ||
                                          a.location.toLowerCase().includes(assetSearch.toLowerCase());
                      const matchCond = assetConditionFilter === 'ALL' || a.condition === assetConditionFilter;
                      return matchSearch && matchCond;
                    })
                    .map(asset => (
                      <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <span className="font-mono font-black text-amber-500 block">{asset.code}</span>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <QrCode size={11} className="text-slate-400" /> Barcode Terdaftar
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-slate-900 dark:text-white block max-w-xs">{asset.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{asset.category} • Pengadaan {asset.procurementYear}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">{asset.location}</span>
                          <span className="text-[10px] text-slate-400">PIC: {asset.pic}</span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                            <button
                              onClick={() => {
                                setAssetList(prev => prev.map(a => a.id === asset.id ? { ...a, quantity: Math.max(0, a.quantity - 1) } : a));
                              }}
                              className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-white font-black hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center text-xs shadow-sm"
                              title="Kurangi 1 unit"
                            >
                              -
                            </button>
                            <span className="font-mono font-black text-sm px-1.5 text-slate-900 dark:text-white">
                              {asset.quantity} {asset.unit}
                            </span>
                            <button
                              onClick={() => {
                                setAssetList(prev => prev.map(a => a.id === asset.id ? { ...a, quantity: a.quantity + 1 } : a));
                              }}
                              className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-white font-black hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center text-xs shadow-sm"
                              title="Tambah 1 unit"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-1 text-[10px] font-black rounded-full ${
                            asset.condition === 'BAIK' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                            asset.condition === 'PERLU_SERVIS' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 animate-pulse' :
                            'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}>
                            {asset.condition === 'BAIK' ? '✓ BAIK / PRIMA' :
                             asset.condition === 'PERLU_SERVIS' ? '⚠️ PERLU SERVIS' :
                             asset.condition === 'RUSAK_RINGAN' ? 'RUSAK RINGAN' : 'RUSAK BERAT'}
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                          Rp {asset.assetValue.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setEditingAsset(asset)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold text-[11px] border border-slate-200 dark:border-slate-700 transition-all hover:scale-105 shadow-sm"
                          >
                            ⚙️ Adjust & Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ⚙️ MODAL ADJUST / EDIT DETAIL ASET */}
          {editingAsset && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Package className="text-amber-500" size={20} />
                    <div>
                      <h3 className="font-black text-sm">Penyesuaian & Adjust Data Aset BMN</h3>
                      <p className="text-[10px] text-slate-400 font-mono">{editingAsset.code}</p>
                    </div>
                  </div>
                  <button onClick={() => setEditingAsset(null)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setAssetList(prev => prev.map(a => a.id === editingAsset.id ? editingAsset : a));
                    setEditingAsset(null);
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Peralatan / Spesifikasi Aset: *</label>
                    <input
                      type="text"
                      required
                      value={editingAsset.name}
                      onChange={(e) => setEditingAsset({ ...editingAsset, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kategori Aset:</label>
                      <select
                        value={editingAsset.category}
                        onChange={(e) => setEditingAsset({ ...editingAsset, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="Peralatan Lab Kuliner">Peralatan Lab Kuliner</option>
                        <option value="Teknologi Informasi & Komputer">Teknologi Informasi & Komputer</option>
                        <option value="Furnitur & Perhotelan">Furnitur & Perhotelan</option>
                        <option value="Sarana & Prasarana Gedung">Sarana & Prasarana Gedung</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Status Kondisi Fisik: *</label>
                      <select
                        value={editingAsset.condition}
                        onChange={(e: any) => setEditingAsset({ ...editingAsset, condition: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="BAIK">✓ Baik / Siap Pakai</option>
                        <option value="PERLU_SERVIS">⚠️ Perlu Servis / Kalibrasi</option>
                        <option value="RUSAK_RINGAN">Rusak Ringan</option>
                        <option value="RUSAK_BERAT">Rusak Berat</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jumlah Kuantitas Unit: *</label>
                      <input
                        type="number"
                        min={0}
                        required
                        value={editingAsset.quantity}
                        onChange={(e) => setEditingAsset({ ...editingAsset, quantity: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Satuan:</label>
                      <input
                        type="text"
                        value={editingAsset.unit}
                        onChange={(e) => setEditingAsset({ ...editingAsset, unit: e.target.value })}
                        placeholder="Unit / Set / Pcs"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Lokasi Ruangan / Gedung: *</label>
                      <input
                        type="text"
                        required
                        value={editingAsset.location}
                        onChange={(e) => setEditingAsset({ ...editingAsset, location: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Penanggung Jawab (PIC): *</label>
                      <input
                        type="text"
                        required
                        value={editingAsset.pic}
                        onChange={(e) => setEditingAsset({ ...editingAsset, pic: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nilai Perolehan Aset (Rp): *</label>
                    <input
                      type="number"
                      required
                      value={editingAsset.assetValue}
                      onChange={(e) => setEditingAsset({ ...editingAsset, assetValue: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-black text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingAsset(null)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-600/30 flex items-center gap-1.5 hover:scale-105 transition-all"
                    >
                      <CheckCircle2 size={14} />
                      <span>Simpan Perubahan Aset</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ➕ MODAL TAMBAH ASET INVENTARIS BARU */}
          {showAddAssetModal && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Package className="text-amber-500" size={20} />
                    <h3 className="font-black text-sm">Tambah Aset & Sarana Prasarana Baru</h3>
                  </div>
                  <button onClick={() => setShowAddAssetModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formTarget = e.currentTarget;
                    const formData = new FormData(formTarget);
                    const newAsset: AssetItem = {
                      id: `ast-${Date.now()}`,
                      code: (formData.get('code') as string) || `BMN-2024-LAB-${assetList.length + 1}`,
                      name: formData.get('name') as string,
                      category: formData.get('category') as string,
                      location: formData.get('location') as string,
                      quantity: Number(formData.get('quantity') || 1),
                      unit: (formData.get('unit') as string) || 'Unit',
                      condition: (formData.get('condition') as any) || 'BAIK',
                      procurementYear: Number(formData.get('procurementYear') || 2024),
                      assetValue: Number(formData.get('assetValue') || 10000000),
                      pic: formData.get('pic') as string,
                      lastMaintenanceDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                    };
                    setAssetList(prev => [newAsset, ...prev]);
                    setShowAddAssetModal(false);
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kode BMN / Barcode: *</label>
                      <input
                        name="code"
                        type="text"
                        required
                        defaultValue={`BMN-2024-LAB-0${assetList.length + 1}`}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tahun Pengadaan:</label>
                      <input
                        name="procurementYear"
                        type="number"
                        defaultValue={2024}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Peralatan / Spesifikasi Aset: *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Contoh: Digital Signage Display 65 Inch"
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kategori Aset:</label>
                      <select
                        name="category"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="Peralatan Lab Kuliner">Peralatan Lab Kuliner</option>
                        <option value="Teknologi Informasi & Komputer">Teknologi Informasi & Komputer</option>
                        <option value="Furnitur & Perhotelan">Furnitur & Perhotelan</option>
                        <option value="Sarana & Prasarana Gedung">Sarana & Prasarana Gedung</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kondisi Awal: *</label>
                      <select
                        name="condition"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="BAIK">✓ Baik / Siap Pakai</option>
                        <option value="PERLU_SERVIS">⚠️ Perlu Servis / Kalibrasi</option>
                        <option value="RUSAK_RINGAN">Rusak Ringan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jumlah Kuantitas: *</label>
                      <input
                        name="quantity"
                        type="number"
                        min={1}
                        defaultValue={1}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Satuan Unit:</label>
                      <input
                        name="unit"
                        type="text"
                        defaultValue="Unit"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Lokasi Ruangan: *</label>
                      <input
                        name="location"
                        type="text"
                        required
                        placeholder="Contoh: Lab Komputer 2"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Penanggung Jawab (PIC): *</label>
                      <input
                        name="pic"
                        type="text"
                        required
                        placeholder="Nama staf pengelola..."
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nilai Perolehan Aset (Rp): *</label>
                    <input
                      name="assetValue"
                      type="number"
                      required
                      placeholder="Contoh: 25000000"
                      defaultValue={15000000}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAssetModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-600/30 flex items-center gap-1.5 hover:scale-105 transition-all"
                    >
                      <Plus size={14} />
                      <span>Simpan & Daftarkan Aset BMN</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SUB-VIEW: ALUMNI & TRACER STUDY */}
      {/* ========================================================================= */}
      {subTab === 'alumni' && (
        <div className="space-y-6">
          {/* KPI Tracer Study IKU 1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Tingkat Respon Tracer</p>
              <p className="text-2xl font-black text-emerald-600 font-mono">92.4%</p>
              <span className="text-[10px] font-bold text-emerald-600">Memenuhi Target IKU-1</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Masa Tunggu Rata-rata</p>
              <p className="text-2xl font-black text-blue-600 font-mono">1.2 Bulan</p>
              <span className="text-[10px] text-slate-400 font-medium">&lt; 6 Bulan Standar Dikti</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Penghasilan &gt; 1.2x UMR</p>
              <p className="text-2xl font-black text-purple-600 font-mono">86.8%</p>
              <span className="text-[10px] font-bold text-purple-600">Gaji Layak Lulusan</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Kesesuaian Bidang Studi</p>
              <p className="text-2xl font-black text-amber-500 font-mono">94.2%</p>
              <span className="text-[10px] text-emerald-600 font-bold">Linear dengan Kurikulum</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck size={18} className="text-emerald-500" />
                  <span>Direktori Tracer Study & Penelusuran Lulusan (IKU-1 Dikti)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Basis data karir lulusan, perusahaan tempat bekerja, wirausaha, dan evaluasi relevansi kurikulum.
                </p>
              </div>

              <button
                onClick={() => setAlumniViewMode('FORM_DAFTAR')}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 hover:scale-105 transition-all shrink-0"
              >
                <Plus size={14} />
                <span>🎓 Isi / Daftarkan Tracer Study Alumni</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-bold">
                  <tr>
                    <th className="p-3">NIM & Nama Alumni</th>
                    <th className="p-3">Program Studi & Tahun</th>
                    <th className="p-3">Tempat Bekerja & Posisi</th>
                    <th className="p-3">Kisaran Pendapatan</th>
                    <th className="p-3">Masa Tunggu</th>
                    <th className="p-3 text-center">Status IKU-1</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {alumniList.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <span className="font-mono font-bold text-emerald-600 block">{a.nim}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{a.name}</span>
                        <span className="text-[10px] text-slate-400 block">{a.email}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">{a.prodi}</span>
                        <span className="text-[10px] text-slate-400">Lulus Tahun {a.gradYear}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-blue-600 block">{a.company}</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{a.jobTitle}</span>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">{a.employmentStatus}</span>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                        {a.salaryRange || 'Sesuai Standar'}
                      </td>
                      <td className="p-3 font-semibold text-slate-600 dark:text-slate-300">
                        {a.waitTimeMonths} Bulan
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center gap-1">
                          <CheckCircle2 size={12} /> Memenuhi IKU-1
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 🎓 MODAL FORM PENDAFTARAN & TRACER STUDY ALUMNI */}
          {alumniViewMode === 'FORM_DAFTAR' && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <UserCheck className="text-emerald-500" size={20} />
                    <div>
                      <h3 className="font-black text-sm">Formulir Kuesioner Tracer Study Alumni (IKU-1 Dikti)</h3>
                      <p className="text-[10px] text-slate-400">Pembaruan data karir & pelacakan jejak lulusan kampus</p>
                    </div>
                  </div>
                  <button onClick={() => setAlumniViewMode('DIREKTORI')} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formTarget = e.currentTarget;
                    const formData = new FormData(formTarget);
                    const newAlumni: AlumniItem = {
                      id: `alm-${Date.now()}`,
                      nim: formData.get('nim') as string,
                      name: formData.get('name') as string,
                      prodi: formData.get('prodi') as string,
                      gradYear: Number(formData.get('gradYear') || 2024),
                      employmentStatus: formData.get('employmentStatus') as any,
                      company: formData.get('company') as string,
                      jobTitle: formData.get('jobTitle') as string,
                      waitTimeMonths: Number(formData.get('waitTimeMonths') || 1.0),
                      salaryRange: formData.get('salaryRange') as string,
                      email: formData.get('email') as string,
                      phone: formData.get('phone') as string
                    };
                    setAlumniList(prev => [newAlumni, ...prev]);
                    setAlumniViewMode('DIREKTORI');
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">NIM Mahasiswa: *</label>
                      <input
                        name="nim"
                        type="text"
                        required
                        placeholder="Contoh: 200101012"
                        defaultValue="200101012"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap & Gelar: *</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Nama dan gelar lulusan..."
                        defaultValue="Rian Hidayat, S.Tr.Par."
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Program Studi: *</label>
                      <select
                        name="prodi"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                      >
                        <option value="D4 Usaha Perjalanan Wisata">D4 Usaha Perjalanan Wisata</option>
                        <option value="D4 Perhotelan">D4 Perhotelan</option>
                        <option value="D3 Seni Kuliner & Gastronomi">D3 Seni Kuliner & Gastronomi</option>
                        <option value="S1 Teknologi Informasi">S1 Teknologi Informasi</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tahun Kelulusan: *</label>
                      <input
                        name="gradYear"
                        type="number"
                        defaultValue={2024}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Status Karir Saat Ini: *</label>
                      <select
                        name="employmentStatus"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                      >
                        <option value="BEKERJA">Bekerja Penuh Waktu (Full-Time)</option>
                        <option value="WIRAUSAHA">Wiraswasta / Founder Usaha Mandiri</option>
                        <option value="STUDI_LANJUT">Melanjutkan Studi (S2 / Spesialis)</option>
                        <option value="MENCARI_KERJA">Sedang Proses Seleksi / Interview</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Masa Tunggu Kerja (Bulan):</label>
                      <input
                        name="waitTimeMonths"
                        type="number"
                        step="0.1"
                        defaultValue="1.5"
                        placeholder="Contoh: 1.5"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Perusahaan / Instansi / Usaha: *</label>
                      <input
                        name="company"
                        type="text"
                        required
                        placeholder="Contoh: PT Garuda Indonesia / Usaha Kuliner"
                        defaultValue="Garuda Indonesia Holiday Tour"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Posisi / Jabatan Pekerjaan: *</label>
                      <input
                        name="jobTitle"
                        type="text"
                        required
                        placeholder="Contoh: Senior Tour Product Manager"
                        defaultValue="Senior Tour Product Manager"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rentang Penghasilan Bulanan:</label>
                      <select
                        name="salaryRange"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                      >
                        <option value="Rp 8.000.000 - Rp 12.000.000">Rp 8.000.000 - Rp 12.000.000 (&gt; 1.2x UMR)</option>
                        <option value="Rp 12.000.000 - Rp 20.000.000">Rp 12.000.000 - Rp 20.000.000</option>
                        <option value="Rp 5.000.000 - Rp 8.000.000">Rp 5.000.000 - Rp 8.000.000</option>
                        <option value="> Rp 20.000.000">&gt; Rp 20.000.000</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nomor WhatsApp / Email:</label>
                      <input
                        name="email"
                        type="text"
                        placeholder="Email / No HP..."
                        defaultValue="rian.hidayat@gmail.com"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setAlumniViewMode('DIREKTORI')}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 hover:scale-105 transition-all"
                    >
                      <CheckCircle2 size={14} />
                      <span>Simpan & Verifikasi Tracer IKU-1</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 📚 MODAL PINJAMKAN BUKU KE USER SIVITAS */}
      {selectedBookForLoan && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Library className="text-blue-500" size={20} />
                <h3 className="font-black text-sm">Form Peminjaman Buku Perpustakaan</h3>
              </div>
              <button onClick={() => setSelectedBookForLoan(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs">
              <p className="font-bold text-blue-900 dark:text-blue-300">{selectedBookForLoan.title}</p>
              <span className="text-[10px] text-slate-500 font-mono">ISBN: {selectedBookForLoan.isbn} • {selectedBookForLoan.shelfLocation}</span>
            </div>

            <form onSubmit={handlePerformLoan} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Peran Peminjam:</label>
                <select
                  value={loanForm.userRole}
                  onChange={(e: any) => setLoanForm({ ...loanForm, userRole: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus:outline-none"
                >
                  <option value="MAHASISWA">Mahasiswa Aktif</option>
                  <option value="DOSEN">Dosen Tetap / Pengajar</option>
                  <option value="PEGAWAI">Tenaga Kependidikan (Tendik / Pegawai)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">NIM / NIDN / NIP Peminjam: *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nomor identitas..."
                  value={loanForm.userIdentifier}
                  onChange={(e) => setLoanForm({ ...loanForm, userIdentifier: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap Peminjam: *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama peminjam..."
                  value={loanForm.userName}
                  onChange={(e) => setLoanForm({ ...loanForm, userName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Durasi Peminjaman:</label>
                <select
                  value={loanForm.durationDays}
                  onChange={(e) => setLoanForm({ ...loanForm, durationDays: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                >
                  <option value={7}>7 Hari (Standar Mahasiswa)</option>
                  <option value={14}>14 Hari (Dosen / Penelitian Skripsi)</option>
                  <option value={30}>30 Hari (Pengajaran Semester)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookForLoan(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Proses Peminjaman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📖 MODAL TAMBAH BUKU BARU */}
      {showAddBookModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="text-blue-500" size={20} />
                <h3 className="font-black text-sm">Tambah Koleksi Buku / E-Book Baru</h3>
              </div>
              <button onClick={() => setShowAddBookModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBookSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Judul Buku: *</label>
                <input
                  type="text"
                  required
                  placeholder="Judul lengkap buku..."
                  value={newBookForm.title}
                  onChange={(e) => setNewBookForm({ ...newBookForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pengarang / Penulis: *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama pengarang..."
                    value={newBookForm.author}
                    onChange={(e) => setNewBookForm({ ...newBookForm, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Penerbit & Tahun:</label>
                  <input
                    type="text"
                    placeholder="Penerbit..."
                    value={newBookForm.publisher}
                    onChange={(e) => setNewBookForm({ ...newBookForm, publisher: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kategori Keilmuan:</label>
                  <select
                    value={newBookForm.category}
                    onChange={(e) => setNewBookForm({ ...newBookForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                  >
                    <option value="Perhotelan & Pariwisata">Perhotelan & Pariwisata</option>
                    <option value="Pariwisata & Ekowisata">Pariwisata & Ekowisata</option>
                    <option value="Seni Kuliner & Gastronomi">Seni Kuliner & Gastronomi</option>
                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                    <option value="Pemasaran Digital">Pemasaran Digital</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Lokasi Rak / Shelf:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Rak A-03"
                    value={newBookForm.shelfLocation}
                    onChange={(e) => setNewBookForm({ ...newBookForm, shelfLocation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jumlah Eksemplar:</label>
                  <input
                    type="number"
                    min={1}
                    value={newBookForm.totalCopies}
                    onChange={(e) => setNewBookForm({ ...newBookForm, totalCopies: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Format Koleksi:</label>
                  <select
                    value={newBookForm.type}
                    onChange={(e: any) => setNewBookForm({ ...newBookForm, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                  >
                    <option value="BUKU_FISIK">Buku Fisik Perpustakaan</option>
                    <option value="E_BOOK">E-Book Digital (PDF)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-600/30"
                >
                  Simpan Buku Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
