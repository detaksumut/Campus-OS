import React from 'react';
import { UserPlus, GraduationCap, BookOpen, CheckSquare, DollarSign, Library, Cloud, BarChart3, Settings } from 'lucide-react';

interface QuickAccessGridProps {
  onSelectAction: (menuId: string, title: string) => void;
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ onSelectAction }) => {
  const quickActions = [
    { id: 'pmb', label: 'PMB', icon: UserPlus, color: 'bg-blue-600 text-white shadow-blue-500/20' },
    { id: 'akademik', label: 'Akademik', icon: GraduationCap, color: 'bg-slate-900 text-white shadow-slate-900/20' },
    { id: 'lms', label: 'LMS', icon: BookOpen, color: 'bg-emerald-600 text-white shadow-emerald-500/20' },
    { id: 'ujian', label: 'Ujian Online', icon: CheckSquare, color: 'bg-purple-600 text-white shadow-purple-500/20' },
    { id: 'keuangan', label: 'Keuangan', icon: DollarSign, color: 'bg-teal-600 text-white shadow-teal-500/20' },
    { id: 'perpustakaan', label: 'Perpustakaan', icon: Library, color: 'bg-indigo-600 text-white shadow-indigo-500/20' },
    { id: 'pddikti', label: 'PDDIKTI', icon: Cloud, color: 'bg-sky-600 text-white shadow-sky-500/20' },
    { id: 'laporan', label: 'Dashboard', icon: BarChart3, color: 'bg-amber-500 text-white shadow-amber-500/20' },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings, color: 'bg-slate-700 text-white shadow-slate-700/20' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          Akses Cepat
        </h3>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
        {quickActions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onSelectAction(action.id, action.label)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
