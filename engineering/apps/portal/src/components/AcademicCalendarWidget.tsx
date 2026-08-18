import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const AcademicCalendarWidget: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(15);

  const daysOfWeek = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  
  // Mei 2024 calendar dates structure
  const calendarDays = [
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true, isSelected: true, event: 'Rapat Senat Akademik' },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
  ];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
          Kalender Akademik
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
            Mei 2024
          </span>
          <div className="flex items-center gap-1">
            <button className="w-5 h-5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500">
              <ChevronLeft size={12} />
            </button>
            <button className="w-5 h-5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500">
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1.5">
        {daysOfWeek.map(d => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
        {calendarDays.map((item, idx) => {
          const isCurrentSelected = item.isCurrentMonth && item.day === selectedDay;
          return (
            <button
              key={idx}
              onClick={() => item.isCurrentMonth && setSelectedDay(item.day)}
              className={`h-7 rounded-lg flex items-center justify-center font-semibold transition-all ${
                isCurrentSelected
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                  : item.isCurrentMonth
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                  : 'text-slate-300 dark:text-slate-600'
              }`}
            >
              {item.day}
            </button>
          );
        })}
      </div>

      {/* Footer link */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 mt-3 flex justify-between items-center text-xs">
        <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-[11px]">
          Lihat Kalender Lengkap →
        </button>
      </div>
    </div>
  );
};
