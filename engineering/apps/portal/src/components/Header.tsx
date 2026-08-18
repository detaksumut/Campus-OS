import React, { useState } from 'react';
import { 
  Search, Bell, Mail, ChevronDown, CheckCircle, ShieldCheck, 
  GraduationCap, BookOpen, LogIn, UserPlus, Lock, Key, LogOut, CheckCircle2,
  Eye, EyeOff, ShieldAlert
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export type UserRole = 'ADMIN' | 'DOSEN' | 'MAHASISWA';

interface HeaderProps {
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userRole, onChangeRole, onOpenSettings }) => {
  const { profile } = useTenant();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showSSOModal, setShowSSOModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [ssoTab, setSsoTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [searchQuery, setSearchQuery] = useState('');

  // Login SSO Form State
  const [loginIdentifier, setLoginIdentifier] = useState('admin@kampus.ac.id');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [loginSelectedRole, setLoginSelectedRole] = useState<UserRole>('ADMIN');

  // Register SSO Form State
  const [regForm, setRegForm] = useState({
    fullName: '',
    identifier: '',
    email: '',
    role: 'MAHASISWA' as UserRole,
    password: '',
    nik: ''
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Change Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassText, setShowPassText] = useState(false);
  const [changePassSuccess, setChangePassSuccess] = useState(false);
  const [changePassError, setChangePassError] = useState('');

  const getRoleBadge = () => {
    switch (userRole) {
      case 'ADMIN':
        return { label: 'Administrator (Pak Direktur)', subtitle: 'Direktur / BAAK IT', icon: ShieldCheck, color: 'bg-emerald-500', defaultPass: 'Admin#Campus2024' };
      case 'DOSEN':
        return { label: 'Dr. Hendra Wijaya, M.T.', subtitle: 'Dosen Tetap (NIDN: 0012057801)', icon: BookOpen, color: 'bg-blue-500', defaultPass: 'Dsn#0012057801' };
      case 'MAHASISWA':
        return { label: 'Rian Hidayat (Mahasiswa)', subtitle: 'NIM: 200101012 • D4 Pariwisata', icon: GraduationCap, color: 'bg-purple-500', defaultPass: 'Mhs#200101012#2024' };
    }
  };

  const currentRoleInfo = getRoleBadge();
  const RoleIcon = currentRoleInfo.icon;

  const handlePerformLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeRole(loginSelectedRole);
    setIsLoggedIn(true);
    setShowSSOModal(false);
  };

  const handlePerformRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      onChangeRole(regForm.role);
      setIsLoggedIn(true);
      setRegSuccess(false);
      setShowSSOModal(false);
    }, 1500);
  };

  const handlePerformChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassError('');

    if (newPassword.length < 8) {
      setChangePassError('Kata sandi baru minimal harus 8 karakter!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePassError('Konfirmasi kata sandi baru tidak cocok!');
      return;
    }

    setChangePassSuccess(true);
    setTimeout(() => {
      setChangePassSuccess(false);
      setShowChangePasswordModal(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Kata sandi akun SSO Anda berhasil diperbarui dengan aman!');
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowRoleMenu(false);
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 text-white px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* Left: Campus Dynamic Branding */}
      <div className="flex items-center gap-3 min-w-[280px]">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md border border-blue-400/30">
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-sm tracking-wide text-white uppercase leading-tight line-clamp-1">
            {profile.institutionName}
          </h1>
          <p className="text-[11px] text-blue-300 font-medium tracking-tight">
            {profile.tagline}
          </p>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari menu, data, mahasiswa, dosen, dll..." 
            className="w-full bg-slate-800/80 border border-slate-700 text-sm text-slate-100 rounded-full pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions, Notifications & SSO Login/Register */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white relative transition-colors"
            title="Notifikasi"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl z-50 text-slate-900 dark:text-white animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-3">
                <span className="font-bold text-sm">Notifikasi Penting</span>
                <span className="text-xs text-blue-500 font-semibold cursor-pointer">Tandai Dibaca</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-blue-50 dark:bg-slate-800/60 rounded-lg flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Sinkronisasi PDDIKTI Berhasil</p>
                    <p className="text-[10px] text-slate-500">2.860 Data transaksi terkirim hari ini</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white relative transition-colors" title="Pesan">
          <Mail size={18} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        <div className="h-6 w-px bg-slate-800" />

        {/* 🔐 TOMBOL UTAMA: LOGIN / REGISTRASI SSO ATAU PROFIL AKTIF */}
        {!isLoggedIn ? (
          <button
            onClick={() => {
              setSsoTab('LOGIN');
              setShowSSOModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105 border border-blue-400/40"
          >
            <LogIn size={15} />
            <span>Login / Registrasi SSO</span>
          </button>
        ) : (
          <div className="relative">
            <div 
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2.5 p-1.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition-all hover:border-blue-500"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-bold text-sm text-blue-400">
                <RoleIcon size={16} />
              </div>
              <div className="text-left hidden md:block">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-white leading-tight">{currentRoleInfo.label}</p>
                  <span className={`w-2 h-2 rounded-full ${currentRoleInfo.color}`} />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">{currentRoleInfo.subtitle}</p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>

            {/* User Dropdown Menu */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-2xl z-50 text-white space-y-1.5 animate-in zoom-in-95">
                <div className="p-2 border-b border-slate-800 flex items-center justify-between">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Akun SSO Terverifikasi</p>
                  <span className="px-1.5 py-0.5 text-[9px] font-black bg-emerald-500/20 text-emerald-400 rounded">
                    Aktif
                  </span>
                </div>

                <div className="p-1">
                  <p className="text-[10px] text-slate-400 mb-1 px-1 font-semibold">Ganti Peran SSO:</p>
                  <button
                    onClick={() => {
                      onChangeRole('ADMIN');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full p-2 rounded-lg text-left flex items-center gap-2 transition-colors ${
                      userRole === 'ADMIN' ? 'bg-blue-600/20 text-white font-bold' : 'hover:bg-slate-800 text-slate-300 text-xs'
                    }`}
                  >
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span className="text-xs">1. Administrator / Direktur</span>
                  </button>

                  <button
                    onClick={() => {
                      onChangeRole('DOSEN');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full p-2 rounded-lg text-left flex items-center gap-2 transition-colors ${
                      userRole === 'DOSEN' ? 'bg-blue-600/20 text-white font-bold' : 'hover:bg-slate-800 text-slate-300 text-xs'
                    }`}
                  >
                    <BookOpen size={14} className="text-blue-400" />
                    <span className="text-xs">2. Dosen Pengajar</span>
                  </button>

                  <button
                    onClick={() => {
                      onChangeRole('MAHASISWA');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full p-2 rounded-lg text-left flex items-center gap-2 transition-colors ${
                      userRole === 'MAHASISWA' ? 'bg-blue-600/20 text-white font-bold' : 'hover:bg-slate-800 text-slate-300 text-xs'
                    }`}
                  >
                    <GraduationCap size={14} className="text-purple-400" />
                    <span className="text-xs">3. Mahasiswa Aktif</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-1">
                  {/* 🔑 TOMBOL GANTI PASSWORD */}
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      setShowChangePasswordModal(true);
                    }}
                    className="w-full p-2 rounded-lg text-left text-xs font-bold text-amber-300 hover:bg-amber-950/40 flex items-center gap-2"
                  >
                    <Key size={14} className="text-amber-400" />
                    <span>Ganti Kata Sandi (Password)</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full p-2 rounded-lg text-left text-xs font-bold text-red-400 hover:bg-red-950/40 flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    <span>Keluar (Logout SSO)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🔑 MODAL GANTI PASSWORD AKUN SSO */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Key size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">Ganti Kata Sandi (Password Akun)</h3>
                  <p className="text-[10px] text-slate-400">Akun: {currentRoleInfo.label}</p>
                </div>
              </div>
              <button onClick={() => setShowChangePasswordModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            {changePassSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2.5">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span>Kata sandi akun SSO Anda telah berhasil diperbarui!</span>
              </div>
            ) : (
              <form onSubmit={handlePerformChangePassword} className="space-y-4 text-xs">
                {changePassError && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 font-bold flex items-center gap-2">
                    <ShieldAlert size={16} className="text-rose-400 shrink-0" />
                    <span>{changePassError}</span>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] space-y-1">
                  <p className="text-slate-400">Password Awal Default Dropship:</p>
                  <p className="font-mono font-bold text-amber-400">{currentRoleInfo.defaultPass}</p>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Kata Sandi Saat Ini / Lama: *</label>
                  <input
                    type={showPassText ? 'text' : 'password'}
                    required
                    placeholder="Masukkan kata sandi lama/default..."
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Kata Sandi Baru (Min. 8 Karakter): *</label>
                  <input
                    type={showPassText ? 'text' : 'password'}
                    required
                    placeholder="Minimal 8 karakter kombinasi..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Konfirmasi Kata Sandi Baru: *</label>
                  <input
                    type={showPassText ? 'text' : 'password'}
                    required
                    placeholder="Ulangi kata sandi baru..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                    <input
                      type="checkbox"
                      checked={showPassText}
                      onChange={(e) => setShowPassText(e.target.checked)}
                      className="rounded text-amber-500"
                    />
                    <span>Tampilkan karakter sandi</span>
                  </label>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowChangePasswordModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-600/30 flex items-center gap-2"
                  >
                    <Key size={14} />
                    <span>Simpan Kata Sandi Baru</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 🔐 MODAL UNIFIED SSO GATEWAY (LOGIN & REGISTRASI TERPADU) */}
      {showSSOModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">Campus OS Single Sign-On (SSO)</h3>
                  <p className="text-[10px] text-blue-300">{profile.institutionName}</p>
                </div>
              </div>
              <button onClick={() => setShowSSOModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
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
                <span>Registrasi SSO</span>
              </button>
            </div>

            {/* 1. FORM LOGIN SSO */}
            {ssoTab === 'LOGIN' && (
              <form onSubmit={handlePerformLogin} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1.5">Pilih Peran Akun SSO: *</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginSelectedRole('ADMIN');
                        setLoginIdentifier('admin@kampus.ac.id');
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        loginSelectedRole === 'ADMIN' ? 'bg-blue-600/30 border-blue-500 font-bold text-white' : 'border-slate-700 text-slate-400'
                      }`}
                    >
                      👑 Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginSelectedRole('DOSEN');
                        setLoginIdentifier('0012057801');
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        loginSelectedRole === 'DOSEN' ? 'bg-blue-600/30 border-blue-500 font-bold text-white' : 'border-slate-700 text-slate-400'
                      }`}
                    >
                      👨‍🏫 Dosen
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginSelectedRole('MAHASISWA');
                        setLoginIdentifier('200101012');
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        loginSelectedRole === 'MAHASISWA' ? 'bg-blue-600/30 border-blue-500 font-bold text-white' : 'border-slate-700 text-slate-400'
                      }`}
                    >
                      👨‍🎓 Mahasiswa
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">NIM / NIDN / NIP / Email SSO: *</label>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Masukkan NIM, NIDN atau Email..."
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Kata Sandi (Password SSO): *</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <LogIn size={15} />
                    <span>Masuk ke Campus OS Gateway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(true);
                      onChangeRole('ADMIN');
                      setShowSSOModal(false);
                    }}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <span>Masuk dengan Google Workspace (@kampus.ac.id)</span>
                  </button>
                </div>
              </form>
            )}

            {/* 2. FORM REGISTRASI SSO */}
            {ssoTab === 'REGISTER' && (
              <form onSubmit={handlePerformRegister} className="space-y-3.5 text-xs">
                {regSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Akun SSO Berhasil Didaftarkan! Mengalihkan ke portal...</span>
                  </div>
                )}

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Daftar Sebagai: *</label>
                  <select
                    value={regForm.role}
                    onChange={(e: any) => setRegForm({ ...regForm, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-bold focus:outline-none"
                  >
                    <option value="MAHASISWA">Calon / Mahasiswa Baru (Camaba / Aktif)</option>
                    <option value="DOSEN">Dosen Pengajar / Peneliti</option>
                    <option value="ADMIN">Staf Administrasi / Pegawai Tendik</option>
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
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-semibold focus:outline-none"
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
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none"
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
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Email Institusi / Pribadi: *</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@domain.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-semibold focus:outline-none"
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
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-800 font-mono focus:outline-none"
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
      )}
    </header>
  );
};
