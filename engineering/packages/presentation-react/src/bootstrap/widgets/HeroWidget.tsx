import React from 'react';

export const HeroWidget: React.FC = () => (
  <div className="bg-brand-primary rounded-2xl p-8 text-white shadow-xl relative overflow-hidden h-64 flex flex-col justify-center">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] opacity-20 bg-cover bg-center"></div>
    <div className="relative z-10 max-w-2xl">
      <h2 className="text-xl text-blue-200 mb-2 font-medium">Welcome to</h2>
      <h1 className="text-5xl font-extrabold mb-2 tracking-tight">Campus Operating System (Campus OS)</h1>
      <h3 className="text-2xl font-semibold mb-4 text-yellow-400">UNIVERSITAS/POLITEKNIK (KAMPUS ANDA)</h3>
      <p className="text-blue-100 text-lg mb-6">Satu Platform • Satu Database • Satu Workflow <br/> Integrated Digital Campus from Admission to Graduation</p>
      <div className="flex gap-4">
        <button className="bg-white text-brand-primary px-6 py-2 rounded-lg font-bold shadow-md hover:bg-slate-50 transition">📊 Dashboard Eksekutif</button>
        <button className="bg-blue-800/50 backdrop-blur border border-blue-400 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700/50 transition">▶ Lihat Panduan Sistem</button>
      </div>
    </div>
  </div>
);
