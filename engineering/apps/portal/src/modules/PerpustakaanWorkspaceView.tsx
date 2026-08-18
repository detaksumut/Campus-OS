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
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Package size={16} className="text-amber-500" />
            <span>Manajemen Sarana Prasarana & Laboratorium Praktikum (SIMAK-BMN)</span>
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

      {/* ========================================================================= */}
      {/* 3. SUB-VIEW: ALUMNI & TRACER STUDY */}
      {/* ========================================================================= */}
      {subTab === 'alumni' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck size={16} className="text-emerald-500" />
            <span>Direktori Tracer Study & Penelusuran Lulusan (IKU-1 Dikti)</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                <tr>
                  <th className="p-3">NIM</th>
                  <th className="p-3">Nama Alumni</th>
                  <th className="p-3">Program Studi</th>
                  <th className="p-3">Tempat Bekerja & Posisi</th>
                  <th className="p-3">Masa Tunggu</th>
                  <th className="p-3">Status IKU-1</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {alumniList.map(a => (
                  <tr key={a.id}>
                    <td className="p-3 font-mono font-bold text-emerald-600">{a.nim}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{a.name}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{a.prodi}</td>
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{a.company} - {a.jobTitle}</td>
                    <td className="p-3 text-slate-500">{a.waitTimeMonths} Bulan</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        ✓ Memenuhi IKU-1
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
