import React, { useState } from 'react';
import { 
  ShieldCheck, Landmark, BookOpen, GraduationCap, Briefcase, 
  Building2, LogIn, UserPlus, Lock, Key, CheckCircle2, Sparkles, ArrowRight
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';
import { UserRole } from './Header';

interface SSOGatewayScreenProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const SSOGatewayScreen: React.FC<SSOGatewayScreenProps> = ({ onLoginSuccess }) => {
  const { profile } = useTenant();
  const [ssoTab, setSsoTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');
  const [identifier, setIdentifier] = useState('admin@kampus.ac.id');
  const [password, setPassword] = useState('Admin#Campus2024');

  // Register Form State
  const [regForm, setRegForm] = useState({
    fullName: '',
    role: 'MAHASISWA' as UserRole,
    nik: '',
    identifier: '',
    email: '',
    password: ''
  });
  const [regSuccess, setRegSuccess] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    switch (role) {
      case 'ADMIN':
        setIdentifier('admin@kampus.ac.id');
        setPassword('Admin#Campus2024');
        break;
      case 'REKTOR':
        setIdentifier('rektor@kampus.ac.id');
        setPassword('Rektor#2024');
        break;
      case 'DOSEN':
        setIdentifier('0012057801');
        setPassword('Dsn#0012057801');
        break;
      case 'MAHASISWA':
        setIdentifier('200101012');
        setPassword('Mhs#200101012#2024');
        break;
      case 'PEGAWAI':
        setIdentifier('PEG-001');
        setPassword('Peg#19850101');
        break;
      case 'YAYASAN':
        setIdentifier('YYS-001');
        setPassword('Yys#YAY-001');
        break;
    }
  };

  const handlePerformLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  const handlePerformRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      onLoginSuccess(regForm.role);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-between text-white select-none p-4 md:p-8">
      {/* Top Navbar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/30">
            🧠
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-wide text-white uppercase leading-tight line-clamp-1">
              {profile.institutionName}
            </h1>
            <p className="text-[11px] text-blue-300 font-medium">{profile.tagline}</p>
          </div>
        </div>

        <div className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Single Sign-On (SSO) Gateway</span>
        </div>
      </div>

      {/* Main Center Auth Container */}
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
        {/* Left Column: Value Proposition & Security standard */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
            <Sparkles size={14} />
            <span>Campus Operating System v1.0</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Gerbang Akses Terpadu Sivitas Akademika
          </h2>

          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-lg">
            Satu akun SSO untuk mengakses seluruh layanan: Pendaftaran Mahasiswa Baru, Kurikulum OBE, Kartu Rencana Studi (KRS), LMS, Ujian CBT, Keuangan UKT, BKD SISTER, hingga Penomoran Ijazah Nasional (PIN Dikti).
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Terenkripsi Argon2id</span>
              <span className="text-[10px] text-slate-400">Standar Keamanan Siber BSSN</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Sinkronisasi Neo Feeder</span>
              <span className="text-[10px] text-slate-400">PDDIKTI Kemendikbudristek RI</span>
            </div>
          </div>
        </div>

        {/* Right Column: Login / Register SSO Card */}
        <div className="lg:col-span-6">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-5">
            {/* Header Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setSsoTab('LOGIN')}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  ssoTab === 'LOGIN' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn size={13} />
                <span>Masuk SSO</span>
              </button>
              <button
                onClick={() => setSsoTab('REGISTER')}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  ssoTab === 'REGISTER' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus size={13} />
                <span>Registrasi Akun Baru</span>
              </button>
            </div>

            {/* 1. LOGIN FORM */}
            {ssoTab === 'LOGIN' && (
              <form onSubmit={handlePerformLogin} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1.5">Pilih Peran Akun SSO Masuk: *</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('ADMIN')}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedRole === 'ADMIN' ? 'bg-emerald-600/30 border-emerald-500 font-bold text-white shadow-md' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <ShieldCheck size={16} className="text-emerald-400" />
                      <span className="text-[11px]">Admin BAAK</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleSelect('REKTOR')}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedRole === 'REKTOR' ? 'bg-amber-600/30 border-amber-500 font-bold text-white shadow-md' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <Landmark size={16} className="text-amber-400" />
                      <span className="text-[11px]">Rektor</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleSelect('DOSEN')}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedRole === 'DOSEN' ? 'bg-blue-600/30 border-blue-500 font-bold text-white shadow-md' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <BookOpen size={16} className="text-blue-400" />
                      <span className="text-[11px]">Dosen</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleSelect('MAHASISWA')}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedRole === 'MAHASISWA' ? 'bg-purple-600/30 border-purple-500 font-bold text-white shadow-md' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <GraduationCap size={16} className="text-purple-400" />
                      <span className="text-[11px]">Mahasiswa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleSelect('PEGAWAI')}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedRole === 'PEGAWAI' ? 'bg-teal-600/30 border-teal-500 font-bold text-white shadow-md' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <Briefcase size={16} className="text-teal-400" />
                      <span className="text-[11px]">Pegawai</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleSelect('YAYASAN')}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedRole === 'YAYASAN' ? 'bg-rose-600/30 border-rose-500 font-bold text-white shadow-md' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <Building2 size={16} className="text-rose-400" />
                      <span className="text-[11px]">Yayasan</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">NIM / NIDN / NIP / Email SSO: *</label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 font-semibold focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Kata Sandi (Password SSO): *</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <span>Masuk ke Campus OS Gateway</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}

            {/* 2. REGISTER FORM */}
            {ssoTab === 'REGISTER' && (
              <form onSubmit={handlePerformRegister} className="space-y-3 text-xs">
                {regSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Akun SSO Berhasil Didaftarkan! Mengalihkan ke dashboard...</span>
                  </div>
                )}

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Daftar Sebagai: *</label>
                  <select
                    value={regForm.role}
                    onChange={(e: any) => setRegForm({ ...regForm, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-bold focus:outline-none text-white"
                  >
                    <option value="MAHASISWA">Calon / Mahasiswa Baru (Camaba / Aktif)</option>
                    <option value="DOSEN">Dosen Pengajar / Peneliti</option>
                    <option value="PEGAWAI">Staf Administrasi / Pegawai Tendik</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nama Lengkap (Sesuai KTP): *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rian Hidayat"
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-semibold focus:outline-none text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">NIK (16 Digit): *</label>
                    <input
                      type="text"
                      required
                      placeholder="16 Digit NIK"
                      value={regForm.nik}
                      onChange={(e) => setRegForm({ ...regForm, nik: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">NIM / NIDN / NIP: *</label>
                    <input
                      type="text"
                      required
                      placeholder="NIM / NIDN"
                      value={regForm.identifier}
                      onChange={(e) => setRegForm({ ...regForm, identifier: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Email Aktif: *</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@domain.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-semibold focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Buat Kata Sandi SSO: *</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimal 8 karakter..."
                    value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <UserPlus size={15} />
                    <span>Daftarkan Akun SSO Baru</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="max-w-6xl w-full mx-auto text-center py-2 text-[11px] text-slate-500">
        © {new Date().getFullYear()} {profile.institutionName} • Powered by Campus OS Enterprise Architecture
      </div>
    </div>
  );
};
