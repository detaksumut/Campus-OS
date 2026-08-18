import React from 'react';

export const ExecutiveSummaryWidget: React.FC = () => {
  const stats = [
    { label: 'Mahasiswa Aktif', value: '2.860', icon: '👥', color: 'text-blue-500', trend: '↑ 8,23% dari bulan lalu' },
    { label: 'Dosen Aktif', value: '185', icon: '👤', color: 'text-purple-500', trend: '↑ 2,11% dari bulan lalu' },
    { label: 'Kelas Aktif', value: '124', icon: '🏫', color: 'text-green-500', trend: '↑ 3,45% dari bulan lalu' },
    { label: 'Tingkat Kelulusan', value: '92,45%', icon: '🏅', color: 'text-red-500', trend: '↑ 1,21% dari tahun lalu' }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 flex flex-col relative">
          <div className="text-slate-500 font-medium text-sm mb-1">{s.label}</div>
          <div className="text-3xl font-bold text-slate-800 mb-2">{s.value}</div>
          <div className="text-xs text-emerald-500 font-medium">{s.trend}</div>
          <div className={`absolute top-5 right-5 text-3xl ${s.color} opacity-80`}>{s.icon}</div>
        </div>
      ))}
    </div>
  );
};
