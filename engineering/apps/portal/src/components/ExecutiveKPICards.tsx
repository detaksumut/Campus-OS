import React from 'react';
import { Users, UserCheck, School, Video, Award, TrendingUp } from 'lucide-react';

export const ExecutiveKPICards: React.FC = () => {
  const kpis = [
    {
      title: 'Mahasiswa Aktif',
      value: '2.860',
      change: '+ 8,23%',
      comparison: 'dari bulan lalu',
      icon: Users,
      iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
      badgeColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Dosen Aktif',
      value: '185',
      change: '+ 2,11%',
      comparison: 'dari bulan lalu',
      icon: UserCheck,
      iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
      badgeColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Kelas Aktif',
      value: '124',
      change: '+ 3,45%',
      comparison: 'dari bulan lalu',
      icon: School,
      iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
      badgeColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Kelas Online',
      value: '128',
      change: '+ 4,12%',
      comparison: 'dari bulan lalu',
      icon: Video,
      iconBg: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400',
      badgeColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Tingkat Kelulusan',
      value: '92,45%',
      change: '+ 1,21%',
      comparison: 'dari tahun lalu',
      icon: Award,
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
      badgeColor: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          Ringkasan Eksekutif
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {kpi.title}
                </span>
                <div className={`w-8 h-8 rounded-xl ${kpi.iconBg} flex items-center justify-center`}>
                  <Icon size={16} />
                </div>
              </div>

              <div className="my-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {kpi.value}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px]">
                <span className={`font-bold flex items-center gap-0.5 ${kpi.badgeColor}`}>
                  <TrendingUp size={12} />
                  {kpi.change}
                </span>
                <span className="text-slate-400 text-[10px]">
                  {kpi.comparison}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
