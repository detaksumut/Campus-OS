import React, { useState } from 'react';
import { CampusShell } from './shell/CampusShell';
import { AuthProvider, useAuth } from './auth/AuthProvider';

import '../bootstrap/PlatformBootstrap';

const AppContent: React.FC = () => {
  const { session, login } = useAuth();
  const [activeWorkbenchId, setActiveWorkbenchId] = useState('executive-dashboard');

  if (!session) {
    return (
      <div className="flex h-screen w-full bg-white overflow-hidden">
        {/* Left Side: Hero Image */}
        <div className="hidden lg:flex w-1/2 relative bg-brand-primary/5 items-center justify-center overflow-hidden border-r border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent z-10" />
          <img 
            src="/hero-campuos.png" 
            alt="Campus OS Hero" 
            className="w-full h-full object-cover z-0 opacity-90 transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              // Fallback in case the image hasn't hot-reloaded yet
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute bottom-12 left-12 right-12 z-20">
            <h2 className="text-4xl font-black text-white drop-shadow-lg mb-4">Enterprise Academic Platform</h2>
            <p className="text-lg text-white/90 font-medium drop-shadow-md max-w-xl">
              Solusi terpadu yang menyatukan SIAKAD, Finance, Research, dan Manajemen Kampus dalam satu ekosistem tangguh.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
          <div className="w-full max-w-md p-8">
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center font-black text-white shadow-xl mx-auto mb-6 text-3xl">C</div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Login Campus OS</h1>
              <p className="text-slate-500 mt-2 font-medium">Masuk ke ruang kerja Anda</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Peran</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => login('Pak Direktur')}
                    className="w-full border-2 border-slate-200 hover:border-brand-primary hover:bg-brand-primary/5 text-slate-700 py-3 rounded-xl font-bold transition-all"
                  >
                    Executive
                  </button>
                  <button 
                    onClick={() => login('Mahasiswa')}
                    className="w-full border-2 border-slate-200 hover:border-brand-primary hover:bg-brand-primary/5 text-slate-700 py-3 rounded-xl font-bold transition-all"
                  >
                    Mahasiswa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <CampusShell currentWorkbenchId={activeWorkbenchId} />;
};

export const CampusApplication: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
