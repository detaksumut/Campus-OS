import React from 'react';
import { Calendar, FileText, Award } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export const LatestAnnouncementsWidget: React.FC = () => {
  const { profile } = useTenant();

  const announcements = [
    {
      id: 'a1',
      title: 'Informasi Libur Nasional & Cuti Bersama 2024',
      date: '10 Mei 2024',
      icon: Calendar,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
    },
    {
      id: 'a2',
      title: 'Workshop Penulisan Proposal Hibah 2024',
      date: '8 Mei 2024',
      icon: FileText,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40'
    },
    {
      id: 'a3',
      title: `Beasiswa Unggulan ${profile.institutionName} 2024`,
      date: '4 Mei 2024',
      icon: Award,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40'
    }
  ];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
          Pengumuman Terbaru
        </h4>
        <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-3">
        {announcements.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-3 group cursor-pointer">
              <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}>
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {item.title}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-[10px] text-slate-400">
        Informasi resmi divalidasi oleh Bagian Akademik.
      </div>
    </div>
  );
};
