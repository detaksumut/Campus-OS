import React, { useState } from 'react';
import { CheckCircle, Clock, Check, X } from 'lucide-react';

export const TaskInboxWidget: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Persetujuan Pengajuan RAB Fakultas', count: 2, unit: 'tugas', status: 'PENDING' },
    { id: 't2', title: 'Review Laporan Penelitian', count: 5, unit: 'laporan', status: 'PENDING' },
    { id: 't3', title: 'Validasi Data Dosen', count: 12, unit: 'data', status: 'PENDING' },
    { id: 't4', title: 'Evaluasi Kinerja Bulanan', count: 1, unit: 'evaluasi', status: 'PENDING' },
  ]);

  const handleAction = (taskId: string, action: 'APPROVE' | 'REJECT') => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' };
      }
      return t;
    }));
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
          Tugas Saya
        </h4>
        <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-2.5">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0">
                {task.status === 'APPROVED' ? (
                  <Check size={10} className="text-emerald-500 font-bold" />
                ) : (
                  <Clock size={10} className="text-slate-400" />
                )}
              </div>
              <span className={`text-xs font-semibold truncate ${task.status === 'APPROVED' ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {task.count} {task.unit}
              </span>
              {task.status === 'PENDING' && (
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleAction(task.id, 'APPROVE')}
                    className="p-1 rounded bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-600 dark:text-emerald-400 transition-colors"
                    title="Setujui"
                  >
                    <Check size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[10px] text-slate-400">
        Aksi persetujuan langsung memutakhirkan antrean sistem.
      </div>
    </div>
  );
};
