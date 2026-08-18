import React from 'react';

export const GlobalHeader: React.FC = () => {
  return (
    <header className="h-16 bg-brand-dark flex items-center justify-between px-6 border-b border-slate-700/50">
      <div className="flex items-center text-white w-1/3">
        <div className="font-bold leading-tight">
          UNIVERSITAS/POLITEKNIK <br/> (KAMPUS ANDA)
        </div>
      </div>
      
      <div className="flex-1 max-w-2xl px-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari menu, data, mahasiswa, dosen, dll..." 
            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 text-sm rounded-full py-2 px-4 focus:outline-none focus:border-brand-primary transition-colors"
          />
          <span className="absolute right-3 top-2 text-slate-400">🔍</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-slate-300 w-1/3 justify-end">
        <button className="hover:text-white relative">
          🔔
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">8</span>
        </button>
        <button className="hover:text-white relative">
          ✉️
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">5</span>
        </button>
        <button className="hover:text-white">❓</button>
        <div className="flex items-center gap-2 ml-4">
          <div className="w-8 h-8 rounded-full bg-slate-600 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" />
          </div>
          <div className="text-sm">
            <div className="font-bold text-white">Pak Direktur</div>
            <div className="text-xs text-slate-400">Direktur</div>
          </div>
        </div>
      </div>
    </header>
  );
};
