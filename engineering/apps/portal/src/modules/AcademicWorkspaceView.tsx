import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, CheckCircle, AlertTriangle, Calculator, 
  FileCheck, Calendar, Award, Plus, Trash2, Search, 
  SlidersHorizontal, Save
} from 'lucide-react';
import { KRSSKSLimitEngine, useTenant } from '@campus-os/shared';

type AcademicSubTab = 'KURIKULUM_OBE' | 'JADWAL_KELAS' | 'KRS_PORTAL' | 'PENILAIAN_KHS';

interface CourseItem {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  creditsTheory: number;
  creditsPractical: number;
  totalCredits: number;
  semester: number;
  prodi: string;
  courseType: 'WAJIB_PRODI' | 'WAJIB_NASIONAL' | 'PILIHAN' | 'MBKM';
  cplCode: string;
  lecturer: string;
}

interface ClassScheduleItem {
  id: string;
  classCode: string;
  courseCode: string;
  courseName: string;
  className: string;
  prodi: string;
  lecturer: string;
  day: string;
  time: string;
  room: string;
  quota: number;
  enrolled: number;
  totalMeetings: number;
}

interface AcademicWorkspaceViewProps {
  defaultSubTab?: AcademicSubTab;
}

export const AcademicWorkspaceView: React.FC<AcademicWorkspaceViewProps> = ({ defaultSubTab = 'KURIKULUM_OBE' }) => {
  const { profile } = useTenant();
  const [activeSubTab, setActiveSubTab] = useState<AcademicSubTab>(defaultSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProdiFilter, setSelectedProdiFilter] = useState('ALL');

  React.useEffect(() => {
    if (defaultSubTab) {
      setActiveSubTab(defaultSubTab);
    }
  }, [defaultSubTab]);

  // 1. Kurikulum OBE & Mata Kuliah Catalog
  const [courses, setCourses] = useState<CourseItem[]>([
    { id: 'mk-01', code: 'UPW-201', name: 'Manajemen Operasional Pariwisata', nameEn: 'Tourism Operations Management', creditsTheory: 2, creditsPractical: 2, totalCredits: 4, semester: 3, prodi: 'D4 Usaha Perjalanan Wisata', courseType: 'WAJIB_PRODI', cplCode: 'CPL-03: Manajerial Destinasi', lecturer: 'Dr. Ir. H. M. Yusuf, M.T.' },
    { id: 'mk-02', code: 'UPW-202', name: 'Perencanaan Destinasi Berkelanjutan', nameEn: 'Sustainable Destination Planning', creditsTheory: 2, creditsPractical: 1, totalCredits: 3, semester: 3, prodi: 'D4 Usaha Perjalanan Wisata', courseType: 'WAJIB_PRODI', cplCode: 'CPL-02: Kebijakan Pariwisata', lecturer: 'Siti Rahmawati, M.Par.' },
    { id: 'mk-03', code: 'HTL-201', name: 'Manajemen Tata Hidang & Bar', nameEn: 'Food & Beverage Service Management', creditsTheory: 1, creditsPractical: 3, totalCredits: 4, semester: 3, prodi: 'D4 Perhotelan', courseType: 'WAJIB_PRODI', cplCode: 'CPL-04: Standar Operasional Hotel', lecturer: 'Siti Maryam, S.Pd., M.Par.' },
    { id: 'mk-04', code: 'KLN-101', name: 'Teknik Dasar Kuliner Nusantara', nameEn: 'Indonesian Culinary Fundamentals', creditsTheory: 1, creditsPractical: 3, totalCredits: 4, semester: 1, prodi: 'D3 Kuliner', courseType: 'WAJIB_PRODI', cplCode: 'CPL-01: Keahlian Memasak Nusantara', lecturer: 'Chef Denny Kurniawan, M.Sc.' },
    { id: 'mk-05', code: 'MIC-301', name: 'Manajemen Konvensi & Pameran', nameEn: 'Convention & Exhibition Management', creditsTheory: 2, creditsPractical: 2, totalCredits: 4, semester: 5, prodi: 'D4 Event & MICE', courseType: 'WAJIB_PRODI', cplCode: 'CPL-05: Eksekusi Event Internasional', lecturer: 'Nurul Hidayah, M.Par.' },
    { id: 'mk-06', code: 'MBKM-401', name: 'Magang Industri Bersertifikat (MBKM)', nameEn: 'Certified Industrial Internship', creditsTheory: 0, creditsPractical: 20, totalCredits: 20, semester: 6, prodi: 'D4 Usaha Perjalanan Wisata', courseType: 'MBKM', cplCode: 'CPL-06: Pengalaman Lapangan Riil', lecturer: 'Tim Kerjasama Industri' },
    { id: 'mk-07', code: 'MKU-101', name: 'Pancasila & Kewarganegaraan', nameEn: 'Civic Education & Pancasila', creditsTheory: 2, creditsPractical: 0, totalCredits: 2, semester: 1, prodi: 'Semua Prodi', courseType: 'WAJIB_NASIONAL', cplCode: 'CPL-01: Karakter Bangsa', lecturer: 'Drs. H. Mulyadi, M.Hum.' },
  ]);

  // Modal State Tambah MK Baru
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    nameEn: '',
    creditsTheory: 2,
    creditsPractical: 1,
    semester: 1,
    prodi: 'D4 Usaha Perjalanan Wisata',
    courseType: 'WAJIB_PRODI' as 'WAJIB_PRODI' | 'WAJIB_NASIONAL' | 'PILIHAN' | 'MBKM',
    cplCode: 'CPL-01: Capaian Utama',
    lecturer: 'Dosen Pengampu'
  });

  // 2. Jadwal Perkuliahan 16 Sesi BAP Digital
  const [schedules] = useState<ClassScheduleItem[]>([
    { id: 'sch-01', classCode: 'KLS-UPW-3A', courseCode: 'UPW-201', courseName: 'Manajemen Operasional Pariwisata', className: 'Kelas 3-A', prodi: 'D4 Usaha Perjalanan Wisata', lecturer: 'Dr. Ir. H. M. Yusuf, M.T.', day: 'Senin', time: '08:00 - 11:30 WIB', room: 'Lab Pariwisata 201', quota: 40, enrolled: 38, totalMeetings: 16 },
    { id: 'sch-02', classCode: 'KLS-HTL-3B', courseCode: 'HTL-201', courseName: 'Manajemen Tata Hidang & Bar', className: 'Kelas 3-B', prodi: 'D4 Perhotelan', lecturer: 'Siti Maryam, S.Pd., M.Par.', day: 'Selasa', time: '09:00 - 12:30 WIB', room: 'Resto Training Hall', quota: 35, enrolled: 35, totalMeetings: 16 },
    { id: 'sch-03', classCode: 'KLS-KLN-1A', courseCode: 'KLN-101', courseName: 'Teknik Dasar Kuliner Nusantara', className: 'Kelas 1-A', prodi: 'D3 Kuliner', lecturer: 'Chef Denny Kurniawan, M.Sc.', day: 'Rabu', time: '08:00 - 13:00 WIB', room: 'Dapur Kitchen Lab 1', quota: 30, enrolled: 28, totalMeetings: 16 },
  ]);

  // 3. KRS Simulator Mahasiswa
  const [previousIPS, setPreviousIPS] = useState<number>(3.65);
  const [selectedCoursesKRS, setSelectedCoursesKRS] = useState<string[]>(['mk-01', 'mk-02', 'mk-07']);
  const maxCreditsAllowed = KRSSKSLimitEngine.calculateMaxCredits(previousIPS);

  const totalCreditsTaken = selectedCoursesKRS.reduce((sum, id) => {
    const course = courses.find(c => c.id === id);
    return sum + (course ? course.totalCredits : 0);
  }, 0);

  const krsValidation = KRSSKSLimitEngine.validateKRSSelection(previousIPS, totalCreditsTaken);

  // 4. Pengaturan Bobot Penilaian DIKTI
  const [gradeWeights, setGradeWeights] = useState({
    kehadiran: 10,
    tugasMandiri: 20,
    praktikumKuis: 30,
    uts: 20,
    uas: 20
  });

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.name) return;

    const exists = courses.some(c => c.code.toLowerCase() === newCourse.code.toLowerCase());
    if (exists) {
      alert(`⚠️ Peringatan Anti-Duplikasi: Kode Mata Kuliah [${newCourse.code}] sudah terdaftar di sistem!`);
      return;
    }

    const created: CourseItem = {
      id: `mk-${Date.now()}`,
      code: newCourse.code.trim().toUpperCase(),
      name: newCourse.name.trim(),
      nameEn: newCourse.nameEn.trim() || newCourse.name.trim(),
      creditsTheory: Number(newCourse.creditsTheory),
      creditsPractical: Number(newCourse.creditsPractical),
      totalCredits: Number(newCourse.creditsTheory) + Number(newCourse.creditsPractical),
      semester: Number(newCourse.semester),
      prodi: newCourse.prodi,
      courseType: newCourse.courseType,
      cplCode: newCourse.cplCode,
      lecturer: newCourse.lecturer
    };

    setCourses(prev => [created, ...prev]);
    setShowAddCourseModal(false);
    setNewCourse({
      code: '',
      name: '',
      nameEn: '',
      creditsTheory: 2,
      creditsPractical: 1,
      semester: 1,
      prodi: 'D4 Usaha Perjalanan Wisata',
      courseType: 'WAJIB_PRODI',
      cplCode: 'CPL-01: Capaian Utama',
      lecturer: 'Dosen Pengampu'
    });
  };

  const handleDeleteCourse = (id: string, code: string) => {
    if (confirm(`Yakin ingin menghapus mata kuliah [${code}]? Tindakan ini akan menghapus relasi pada KRS semester berjalan.`)) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProdi = selectedProdiFilter === 'ALL' || c.prodi === selectedProdiFilter || c.prodi === 'Semua Prodi';
    return matchSearch && matchProdi;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border border-blue-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <GraduationCap size={22} />
            </div>
            <h2 className="text-xl font-black tracking-tight">Sistem Akademik & Kurikulum OBE Terpadu</h2>
            <span className="px-2.5 py-0.5 text-[10px] font-black bg-blue-500 text-white rounded-full">
              Permendikbudristek No. 53/2023
            </span>
          </div>
          <p className="text-xs text-blue-200 max-w-2xl">
            Pusat manajemen kurikulum OBE (Outcome-Based Education), pembagian 16 sesi jadwal perkuliahan, validasi KRS berbasis IPS, dan penilaian bobot mutu DIKTI ({profile.institutionName}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-200">
            Tahun Akademik: <span className="text-emerald-400 font-mono">2024/2025 Genap</span>
          </div>
        </div>
      </div>

      {/* 4 Navigasi Sub-Modul Akademik */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveSubTab('KURIKULUM_OBE')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeSubTab === 'KURIKULUM_OBE'
              ? 'bg-blue-600/15 border-blue-500 shadow-md ring-2 ring-blue-500/30 dark:bg-blue-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Sub 1</span>
            <BookOpen size={16} className={activeSubTab === 'KURIKULUM_OBE' ? 'text-blue-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Kurikulum OBE & MK</p>
            <p className="text-[10px] text-slate-500">{courses.length} Mata Kuliah Aktif</p>
          </div>
        </button>

        <button
          onClick={() => setActiveSubTab('JADWAL_KELAS')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeSubTab === 'JADWAL_KELAS'
              ? 'bg-purple-600/15 border-purple-500 shadow-md ring-2 ring-purple-500/30 dark:bg-purple-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Sub 2</span>
            <Calendar size={16} className={activeSubTab === 'JADWAL_KELAS' ? 'text-purple-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Jadwal Kuliah (16 Sesi)</p>
            <p className="text-[10px] text-slate-500">{schedules.length} Kelas Terjadwal</p>
          </div>
        </button>

        <button
          onClick={() => setActiveSubTab('KRS_PORTAL')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeSubTab === 'KRS_PORTAL'
              ? 'bg-emerald-600/15 border-emerald-500 shadow-md ring-2 ring-emerald-500/30 dark:bg-emerald-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Sub 3</span>
            <Calculator size={16} className={activeSubTab === 'KRS_PORTAL' ? 'text-emerald-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Validasi Batas SKS KRS</p>
            <p className="text-[10px] text-slate-500">Maks {maxCreditsAllowed.maxCredits} SKS (Otomatis)</p>
          </div>
        </button>

        <button
          onClick={() => setActiveSubTab('PENILAIAN_KHS')}
          className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            activeSubTab === 'PENILAIAN_KHS'
              ? 'bg-amber-600/15 border-amber-500 shadow-md ring-2 ring-amber-500/30 dark:bg-amber-950/40'
              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Sub 4</span>
            <Award size={16} className={activeSubTab === 'PENILAIAN_KHS' ? 'text-amber-500' : 'text-slate-400'} />
          </div>
          <div className="mt-1.5">
            <p className="font-black text-xs text-slate-900 dark:text-white">Skala Nilai & Bobot KHS</p>
            <p className="text-[10px] text-slate-500">Huruf Mutu A s/d E (DIKTI)</p>
          </div>
        </button>
      </div>

      {/* 1. SUB 1: KURIKULUM OBE & KATALOG MATA KULIAH */}
      {activeSubTab === 'KURIKULUM_OBE' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen size={18} className="text-blue-500" />
                <span>Katalog Mata Kuliah & Kurikulum OBE (Standar Nasional)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Struktur kurikulum terintegrasi dengan Capaian Pembelajaran Lulusan (CPL) dan sinkron ke PDDIKTI.
              </p>
            </div>

            <button
              onClick={() => setShowAddCourseModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              <Plus size={14} />
              <span>+ Tambah Mata Kuliah Baru</span>
            </button>
          </div>

          {/* Filtering */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kode MK, nama mata kuliah..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-semibold focus:outline-none"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedProdiFilter}
                onChange={(e) => setSelectedProdiFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Program Studi</option>
                <option value="D4 Usaha Perjalanan Wisata">D4 Usaha Perjalanan Wisata</option>
                <option value="D4 Perhotelan">D4 Perhotelan</option>
                <option value="D3 Kuliner">D3 Kuliner</option>
                <option value="D4 Event & MICE">D4 Event & MICE</option>
              </select>
            </div>
          </div>

          {/* Courses Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                <tr>
                  <th className="p-3">Kode MK</th>
                  <th className="p-3">Nama Mata Kuliah</th>
                  <th className="p-3">Program Studi</th>
                  <th className="p-3 text-center">Teori / Praktik</th>
                  <th className="p-3 text-center">Total SKS</th>
                  <th className="p-3 text-center">Semester</th>
                  <th className="p-3">Jenis / CPL OBE</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filteredCourses.map(course => (
                  <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{course.code}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {course.name}
                      <span className="block text-[10px] text-slate-400 italic font-normal">{course.nameEn}</span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 font-medium">{course.prodi}</td>
                    <td className="p-3 text-center font-mono text-slate-500">
                      {course.creditsTheory}T / {course.creditsPractical}P
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-1 text-[11px] font-black rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        {course.totalCredits} SKS
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold">Sem {course.semester}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 mr-1.5">
                        {course.courseType}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                        {course.cplCode}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteCourse(course.id, course.code)}
                        title="Hapus Mata Kuliah"
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
      )}

      {/* MODAL TAMBAH MATA KULIAH BARU */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Plus size={16} className="text-blue-500" />
                <span>Tambah Mata Kuliah Baru (Standar SN-Dikti)</span>
              </h3>
              <button onClick={() => setShowAddCourseModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kode Mata Kuliah: *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: UPW-301"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-mono font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Program Studi: *</label>
                  <select
                    value={newCourse.prodi}
                    onChange={(e) => setNewCourse({ ...newCourse, prodi: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none"
                  >
                    <option value="D4 Usaha Perjalanan Wisata">D4 Usaha Perjalanan Wisata</option>
                    <option value="D4 Perhotelan">D4 Perhotelan</option>
                    <option value="D3 Kuliner">D3 Kuliner</option>
                    <option value="D4 Event & MICE">D4 Event & MICE</option>
                    <option value="Semua Prodi">Mata Kuliah Umum (Semua Prodi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Mata Kuliah (Bahasa Indonesia): *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Manajemen Operasional Pariwisata"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Mata Kuliah (Bahasa Inggris):</label>
                <input
                  type="text"
                  placeholder="Contoh: Tourism Operations Management"
                  value={newCourse.nameEn}
                  onChange={(e) => setNewCourse({ ...newCourse, nameEn: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">SKS Teori:</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={newCourse.creditsTheory}
                    onChange={(e) => setNewCourse({ ...newCourse, creditsTheory: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-bold text-center focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">SKS Praktik:</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={newCourse.creditsPractical}
                    onChange={(e) => setNewCourse({ ...newCourse, creditsPractical: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-bold text-center focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Semester:</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={newCourse.semester}
                    onChange={(e) => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) || 1 })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-bold text-center focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Total SKS:</label>
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 font-black text-blue-600 text-center">
                    {Number(newCourse.creditsTheory) + Number(newCourse.creditsPractical)} SKS
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jenis Mata Kuliah:</label>
                  <select
                    value={newCourse.courseType}
                    onChange={(e: any) => setNewCourse({ ...newCourse, courseType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none"
                  >
                    <option value="WAJIB_PRODI">Wajib Program Studi</option>
                    <option value="WAJIB_NASIONAL">Wajib Nasional / Universitas</option>
                    <option value="PILIHAN">Pilihan Peminatan</option>
                    <option value="MBKM">Program MBKM Luar Kampus</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CPL OBE Terhubung:</label>
                  <input
                    type="text"
                    placeholder="Contoh: CPL-03: Manajerial Destinasi"
                    value={newCourse.cplCode}
                    onChange={(e) => setNewCourse({ ...newCourse, cplCode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Simpan Mata Kuliah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. SUB 2: JADWAL PERKULIAHAN & 16 SESI BAP */}
      {activeSubTab === 'JADWAL_KELAS' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar size={18} className="text-purple-500" />
                <span>Jadwal Perkuliahan & Distribusi 16 Sesi BAP Digital</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Standar SN-Dikti: 16 sesi per semester (14 Sesi Materi + 1 Sesi UTS + 1 Sesi UAS).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs rounded-xl">
                ✓ 100% Ruangan Terjadwal Bebas Bentrok
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                <tr>
                  <th className="p-3">Kode Kelas</th>
                  <th className="p-3">Mata Kuliah & Kelas</th>
                  <th className="p-3">Dosen Pengampu</th>
                  <th className="p-3">Hari & Jam Kuliah</th>
                  <th className="p-3">Ruang Kuliah</th>
                  <th className="p-3 text-center">Kapasitas Kursi</th>
                  <th className="p-3 text-center">Status BAP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {schedules.map(sch => (
                  <tr key={sch.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">{sch.classCode}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {sch.courseName}
                      <span className="block text-[10px] text-blue-500 font-semibold">{sch.className} • {sch.prodi}</span>
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold">{sch.lecturer}</td>
                    <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                      <span className="font-bold text-slate-900 dark:text-white">{sch.day}</span>, {sch.time}
                    </td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{sch.room}</td>
                    <td className="p-3 text-center font-bold">
                      <span className="text-emerald-600">{sch.enrolled}</span> / {sch.quota} Mhs
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {sch.totalMeetings} Sesi Aktif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. SUB 3: KRS & VALIDASI BATAS SKS SN-DIKTI */}
      {activeSubTab === 'KRS_PORTAL' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator size={16} className="text-emerald-500" />
              <span>Validasi Regulasi Batas SKS Mandiri</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                Simulasi IPS Lalu Mahasiswa:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0.00"
                  max="4.00"
                  step="0.05"
                  value={previousIPS}
                  onChange={(e) => setPreviousIPS(parseFloat(e.target.value) || 0)}
                  className="w-24 p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-black text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-xs font-semibold text-slate-500">Skala 4.00 (SN-Dikti)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Batas Maksimal SKS:</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {maxCreditsAllowed.maxCredits} SKS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold">{maxCreditsAllowed.predicate}</p>
            </div>

            <div className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
              krsValidation.isValid 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200' 
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-200'
            }`}>
              {krsValidation.isValid ? (
                <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle size={18} className="text-rose-500 shrink-0 mt-0.5" />
              )}
              <p className="text-[11px] font-semibold leading-relaxed">
                {krsValidation.message}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen size={16} className="text-emerald-500" />
                <span>Pilihan Mata Kuliah KRS Semester Berjalan</span>
              </h3>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Total Diambil: <b className="text-emerald-600">{totalCreditsTaken} SKS</b>
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto custom-scrollbar">
              {courses.map(course => {
                const isSelected = selectedCoursesKRS.includes(course.id);
                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      setSelectedCoursesKRS(prev => 
                        prev.includes(course.id) ? prev.filter(c => c !== course.id) : [...prev, course.id]
                      );
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/50 border-emerald-500 shadow-sm'
                        : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {course.code}
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {course.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {course.prodi} • Pengampu: {course.lecturer}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-slate-200/70 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      {course.totalCredits} SKS
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                disabled={!krsValidation.isValid}
                onClick={() => alert('KRS Berhasil Disimpan & Diajukan ke Dosen Wali / Pembimbing Akademik!')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2"
              >
                <FileCheck size={16} />
                <span>Simpan & Ajukan KRS ke Dosen PA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUB 4: BOBOT PENILAIAN & SKALA NILAI KHS STANDAR DIKTI */}
      {activeSubTab === 'PENILAIAN_KHS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-5">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-amber-500" />
                <span>Penyesuaian Komposisi Bobot Nilai Akhir (Statuta Kampus)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Sesuaikan persentase komponen penilaian sesuai aturan senat akademik institusi Anda (Total wajib 100%).
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300">Presensi & Kehadiran (Min. 75%):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={gradeWeights.kehadiran}
                    onChange={(e) => setGradeWeights({ ...gradeWeights, kehadiran: parseInt(e.target.value) || 0 })}
                    className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-bold"
                  />
                  <span className="font-bold text-slate-500">%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300">Tugas Mandiri & Terstruktur:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={gradeWeights.tugasMandiri}
                    onChange={(e) => setGradeWeights({ ...gradeWeights, tugasMandiri: parseInt(e.target.value) || 0 })}
                    className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-bold"
                  />
                  <span className="font-bold text-slate-500">%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300">Praktikum Laboratorium / Kuis:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={gradeWeights.praktikumKuis}
                    onChange={(e) => setGradeWeights({ ...gradeWeights, praktikumKuis: parseInt(e.target.value) || 0 })}
                    className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-bold"
                  />
                  <span className="font-bold text-slate-500">%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300">Ujian Tengah Semester (UTS):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={gradeWeights.uts}
                    onChange={(e) => setGradeWeights({ ...gradeWeights, uts: parseInt(e.target.value) || 0 })}
                    className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-bold"
                  />
                  <span className="font-bold text-slate-500">%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300">Ujian Akhir Semester (UAS):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={gradeWeights.uas}
                    onChange={(e) => setGradeWeights({ ...gradeWeights, uas: parseInt(e.target.value) || 0 })}
                    className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-bold"
                  />
                  <span className="font-bold text-slate-500">%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Total Akumulasi Bobot:</span>
                <span className={`font-black text-sm ${
                  gradeWeights.kehadiran + gradeWeights.tugasMandiri + gradeWeights.praktikumKuis + gradeWeights.uts + gradeWeights.uas === 100
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600'
                }`}>
                  {gradeWeights.kehadiran + gradeWeights.tugasMandiri + gradeWeights.praktikumKuis + gradeWeights.uts + gradeWeights.uas}%
                </span>
              </div>

              <button
                onClick={() => alert('Komposisi Bobot Nilai Statuta Akademik Berhasil Diperbarui!')}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Save size={14} />
                <span>Simpan Aturan Bobot Akademik</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Award size={16} className="text-amber-500" />
                <span>Tabel Konversi Huruf Mutu & Bobot Nilai (Kemendikbudristek)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Standar baku transkrip akademik nasional untuk pelaporan PDDIKTI dan ijazah PIN/SIVIL.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">Rentang Skor</th>
                    <th className="p-2.5 text-center">Huruf Mutu</th>
                    <th className="p-2.5 text-center">Bobot Angka</th>
                    <th className="p-2.5">Predikat / Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-semibold">
                  <tr><td className="p-2.5">85.00 - 100.00</td><td className="p-2.5 text-center font-black text-emerald-600">A</td><td className="p-2.5 text-center font-mono">4.00</td><td className="p-2.5 text-slate-600 dark:text-slate-300">Sangat Memuaskan (Istimewa)</td></tr>
                  <tr><td className="p-2.5">80.00 - 84.99</td><td className="p-2.5 text-center font-black text-emerald-500">A-</td><td className="p-2.5 text-center font-mono">3.75</td><td className="p-2.5 text-slate-600 dark:text-slate-300">Sangat Baik</td></tr>
                  <tr><td className="p-2.5">75.00 - 79.99</td><td className="p-2.5 text-center font-black text-blue-600">B+</td><td className="p-2.5 text-center font-mono">3.50</td><td className="p-2.5 text-slate-600 dark:text-slate-300">Baik Sekali</td></tr>
                  <tr><td className="p-2.5">70.00 - 74.99</td><td className="p-2.5 text-center font-black text-blue-500">B</td><td className="p-2.5 text-center font-mono">3.00</td><td className="p-2.5 text-slate-600 dark:text-slate-300">Baik</td></tr>
                  <tr><td className="p-2.5">65.00 - 69.99</td><td className="p-2.5 text-center font-black text-indigo-500">B-</td><td className="p-2.5 text-center font-mono">2.75</td><td className="p-2.5 text-slate-600 dark:text-slate-300">Cukup Baik</td></tr>
                  <tr><td className="p-2.5">60.00 - 64.99</td><td className="p-2.5 text-center font-black text-amber-500">C+</td><td className="p-2.5 text-center font-mono">2.50</td><td className="p-2.5 text-slate-600 dark:text-slate-300">Lebih Dari Cukup</td></tr>
                  <tr><td className="p-2.5">55.00 - 59.99</td><td className="p-2.5 text-center font-black text-amber-600">C</td><td className="p-2.5 text-center font-mono">2.00</td><td className="p-2.5 text-slate-600 dark:text-slate-300">Cukup (Batas Kelulusan MK)</td></tr>
                  <tr><td className="p-2.5">40.00 - 54.99</td><td className="p-2.5 text-center font-black text-rose-500">D</td><td className="p-2.5 text-center font-mono">1.00</td><td className="p-2.5 text-rose-600">Kurang (Wajib Remedi)</td></tr>
                  <tr><td className="p-2.5">0.00 - 39.99</td><td className="p-2.5 text-center font-black text-rose-700">E</td><td className="p-2.5 text-center font-mono">0.00</td><td className="p-2.5 text-rose-700">Gagal / Mengulang</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicWorkspaceView;
