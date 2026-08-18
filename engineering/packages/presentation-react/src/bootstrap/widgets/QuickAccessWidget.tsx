import React from 'react';

export const QuickAccessWidget: React.FC = () => {
  const menus = [
    { label: 'PMB', icon: '👥', color: 'text-blue-500' },
    { label: 'Akademik', icon: '🎓', color: 'text-slate-800' },
    { label: 'LMS', icon: '💻', color: 'text-green-500' },
    { label: 'Ujian Online', icon: '📝', color: 'text-purple-500' },
    { label: 'Keuangan', icon: '💰', color: 'text-emerald-500' },
    { label: 'Perpustakaan', icon: '📚', color: 'text-indigo-500' },
    { label: 'PDDIKTI', icon: '☁️', color: 'text-sky-500' },
    { label: 'Dashboard', icon: '📊', color: 'text-orange-500' },
    { label: 'Pengaturan', icon: '⚙️', color: 'text-slate-600' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 flex justify-between">
      {menus.map((m, i) => (
        <div key={i} className="flex flex-col items-center gap-3 cursor-pointer hover:-translate-y-1 transition-transform group">
          <div className={`w-14 h-14 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-2xl group-hover:shadow-md transition-shadow ${m.color} bg-slate-50`}>
            {m.icon}
          </div>
          <span className="text-sm font-medium text-slate-600 group-hover:text-brand-primary">{m.label}</span>
        </div>
      ))}
    </div>
  );
};
