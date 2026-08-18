import React, { useState } from 'react';
import { Settings, Save, RotateCcw, CheckCircle2, Shield, Building, User } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, resetToDefault } = useTenant();
  const [formData, setFormData] = useState({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings size={22} className="text-blue-400" />
            <h2 className="text-xl font-black tracking-tight">Pengaturan Sistem Multi-Tenant (White-Label)</h2>
          </div>
          <p className="text-xs text-slate-300">
            Kustomisasi profil, nama kampus, sebutan pimpinan, dan identitas visual institusi secara real-time.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Konfigurasi Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Building size={16} className="text-blue-500" />
            <span>1. Identitas Institusi Perguruan Tinggi</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Perguruan Tinggi / Kampus:</label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kode PT di PDDIKTI:</label>
              <input
                type="text"
                value={formData.institutionCode}
                onChange={(e) => setFormData({ ...formData, institutionCode: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Bentuk Perguruan Tinggi:</label>
              <select
                value={formData.institutionType}
                onChange={(e: any) => setFormData({ ...formData, institutionType: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="POLITEKNIK">Politeknik</option>
                <option value="UNIVERSITAS">Universitas</option>
                <option value="INSTITUT">Institut</option>
                <option value="SEKOLAH_TINGGI">Sekolah Tinggi</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Slogan / Tagline Institusi:</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Executive Info */}
        <div className="border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <User size={16} className="text-blue-500" />
            <span>2. Struktur Pimpinan Eksekutif</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Sebutan Pimpinan Tertinggi:</label>
              <select
                value={formData.executiveTitle}
                onChange={(e: any) => setFormData({ ...formData, executiveTitle: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Direktur">Direktur (Politeknik/Akademi)</option>
                <option value="Rektor">Rektor (Universitas/Institut)</option>
                <option value="Ketua">Ketua (Sekolah Tinggi)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Pimpinan:</label>
              <input
                type="text"
                value={formData.executiveName}
                onChange={(e) => setFormData({ ...formData, executiveName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">NIP Pimpinan:</label>
              <input
                type="text"
                value={formData.executiveNip}
                onChange={(e) => setFormData({ ...formData, executiveNip: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SSO & Domain */}
        <div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Shield size={16} className="text-blue-500" />
            <span>3. Single Sign-On (SSO) & Domain Email Kampus</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Provider SSO Kampus:</label>
              <select
                value={formData.ssoProvider}
                onChange={(e: any) => setFormData({ ...formData, ssoProvider: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="google">Google Workspace for Education</option>
                <option value="microsoft">Microsoft 365 Entra ID</option>
                <option value="saml">SAML 2.0 / Shibboleth</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Domain Resmi Kampus (Contoh: kampus.ac.id):</label>
              <input
                type="text"
                value={formData.ssoOrganizationDomain}
                onChange={(e) => setFormData({ ...formData, ssoOrganizationDomain: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <button
            type="button"
            onClick={resetToDefault}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={14} />
            <span>Reset ke Default</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Save size={15} />
            <span>Simpan Perubahan Identitas</span>
          </button>
        </div>
      </form>
    </div>
  );
};
