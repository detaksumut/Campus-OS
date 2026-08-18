import React from 'react';
import { 
  GraduationCap, Sparkles, ArrowRight, ShieldCheck, BookOpen, Video, 
  Award, Landmark, CheckCircle2, ChevronRight, Globe, Users, 
  Building2, Phone, Mail, MapPin, Layers, FileCheck, DollarSign
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface HeroLandingPageProps {
  onOpenLogin: () => void;
  onOpenPMB?: () => void;
}

export const HeroLandingPage: React.FC<HeroLandingPageProps> = ({ onOpenLogin, onOpenPMB }) => {
  const { profile } = useTenant();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="text-blue-400" size={20} />
              </div>
            </div>
            <div>
              <span className="font-black text-sm tracking-tight text-white block uppercase">
                {profile.institutionName}
              </span>
              <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase block">
                Campus OS Enterprise
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#keunggulan" className="hover:text-blue-400 transition-colors">Keunggulan</a>
            <a href="#prodi" className="hover:text-blue-400 transition-colors">Program Studi</a>
            <a href="#fasilitas" className="hover:text-blue-400 transition-colors">Fasilitas & Lab</a>
            <a href="#riset" className="hover:text-blue-400 transition-colors">Riset & OJS</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLogin}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <span>Masuk Portal SSO</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-28 overflow-hidden min-h-[85vh] flex items-center justify-center">
        {/* Pure Original Campus Hero Background Image without any blue tint */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-campuos.png" 
            alt="Campus Hero Banner" 
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle neutral bottom transition into dark section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-slate-950" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-white text-xs font-bold shadow-lg backdrop-blur-md">
            <Sparkles size={14} className="text-amber-400" />
            <span>Smart Enterprise Higher Education Operating System</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-snug max-w-3xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Membangun Generasi Unggul Berdaya Saing Global Bersama{' '}
            <span className="text-amber-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {profile.institutionName}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Platform Akademik Terintegrasi Standar SN-Dikti & Kemendikbudristek. Menghubungkan Kurikulum OBE, Perkuliahan Hybrid WebRTC, Wisuda PIN Dikti SIVIL, Jurnal Ilmiah OJS, dan Keuangan Multi-Bank dalam satu ekosistem digital.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <span>🚀 Masuk ke Portal Sivitas Akademika</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="#keunggulan"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-black/60 hover:bg-black/80 text-slate-200 border border-white/20 font-bold text-xs flex items-center justify-center gap-1.5 transition-all backdrop-blur-md"
            >
              <span>Eksplorasi Fitur Kampus</span>
              <ChevronRight size={14} />
            </a>
          </div>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <div className="p-4 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md space-y-1 shadow-lg">
              <p className="text-xl sm:text-2xl font-black text-blue-400 font-mono">98.5%</p>
              <p className="text-xs font-bold text-slate-300">Lulusan Bekerja & Berwirausaha</p>
              <p className="text-[10px] text-slate-400">Standar Dikti IKU-1</p>
            </div>
            <div className="p-4 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md space-y-1 shadow-lg">
              <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">16 Sesi</p>
              <p className="text-xs font-bold text-slate-300">BAP Digital & Presensi Realtime</p>
              <p className="text-[10px] text-slate-400">100% Paperless</p>
            </div>
            <div className="p-4 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md space-y-1 shadow-lg">
              <p className="text-xl sm:text-2xl font-black text-purple-400 font-mono">PIN & SIVIL</p>
              <p className="text-xs font-bold text-slate-300">Ijazah Terverifikasi Nasional</p>
              <p className="text-[10px] text-slate-400">Anti-Pemalsuan QR Dikti</p>
            </div>
            <div className="p-4 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md space-y-1 shadow-lg">
              <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">SINTA 1-6</p>
              <p className="text-xs font-bold text-slate-300">Publikasi Jurnal OJS 3.x</p>
              <p className="text-[10px] text-slate-400">Akreditasi ARJUNA Dikti</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 6 KEUNGGULAN UTAMA MODUL KAMPUS */}
      <section id="keunggulan" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Ekosistem Terintegrasi untuk Seluruh Sivitas Akademika
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Dirancang untuk memfasilitasi kebutuhan Mahasiswa, Dosen Pengajar, Tenaga Kependidikan, Rektorat, hingga Badan Penyelenggara Yayasan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fitur 1 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-blue-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <h3 className="font-black text-base text-white group-hover:text-blue-400 transition-colors">
                Kurikulum OBE & KRS Mandiri
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pemetaan Capaian Pembelajaran Lulusan (CPL), kontrak perkuliahan Sesi 1, batas SKS berbasis IPS otomatis, dan penilaian skala mutu A s/d E.
              </p>
            </div>

            {/* Fitur 2 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Video size={24} />
              </div>
              <h3 className="font-black text-base text-white group-hover:text-indigo-400 transition-colors">
                Kelas Online Video WebRTC
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ruang kuliah daring tatap muka ultra-low latency dengan kamera fisik, mikrofon, obrolan kelas langsung, dan integrasi LiveKit Cloud.
              </p>
            </div>

            {/* Fitur 3 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Award size={24} />
              </div>
              <h3 className="font-black text-base text-white group-hover:text-purple-400 transition-colors">
                Wisuda, PIN Dikti & SIVIL
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Validasi bebas tanggungan otomatis (Perpustakaan, Keuangan, 144 SKS), penomoran ijazah nasional, dan pencetakan SKPI ber-QR Code.
              </p>
            </div>

            {/* Fitur 4 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Landmark size={24} />
              </div>
              <h3 className="font-black text-base text-white group-hover:text-emerald-400 transition-colors">
                Perpustakaan & OPAC Digital
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Katalog buku fisik dan e-book, sirkulasi peminjaman sivitas akademika, kalkulasi denda, serta penerbitan Surat Bebas Pustaka resmi.
              </p>
            </div>

            {/* Fitur 5 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <FileCheck size={24} />
              </div>
              <h3 className="font-black text-base text-white group-hover:text-amber-400 transition-colors">
                Jurnal Ilmiah OJS 3.x PKP
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Alur editorial 5 tahap (Submission, Review Mitra Bestari, Copyediting, Production, Published) berstandar akreditasi ARJUNA & SINTA.
              </p>
            </div>

            {/* Fitur 6 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <h3 className="font-black text-base text-white group-hover:text-cyan-400 transition-colors">
                Keuangan & Payroll Gaji
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Daftar rekening resmi bank kampus penerima UKT, konfirmasi transfer bayar, dan master rekening penggajian Rektor, Dosen, dan Pegawai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER BAWAH */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-blue-950/40">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Siap Mengakses Portal Akademik Terpadu?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Silakan masuk menggunakan Single Sign-On (SSO) akun kampus Anda untuk mengakses seluruh layanan perkuliahan dan administrasi.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenLogin}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 inline-flex items-center gap-2 hover:scale-105 transition-all"
            >
              <span>🔐 Buka Halaman Login SSO</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {profile.institutionName}. Powered by Campus OS Enterprise Platform.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Standar Permendikbudristek No. 53/2023</span>
            <span>•</span>
            <span>PDDIKTI Neo Feeder Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
