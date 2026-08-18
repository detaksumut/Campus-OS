import React, { useState } from 'react';
import { CheckCircle2, Calendar, AlertCircle, Clock, ChevronRight } from 'lucide-react';

export const ChartsAndNotifications: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('Tahun 2024');

  // Chart Monthly Data Points
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const totalSeries = [2200, 2350, 2480, 2550, 2680, 2750, 2860, 2860, 2860, 2860, 2860, 2860];
  const activeSeries = [2000, 2100, 2220, 2300, 2400, 2500, 2600, 2600, 2600, 2600, 2600, 2600];
  const lulusSeries = [400, 450, 500, 550, 600, 650, 720, 720, 720, 720, 720, 720];

  const prodiDistribution = [
    { name: 'Usaha Perjalanan Wisata', count: 824, percent: '28,8%', color: '#2563eb' },
    { name: 'Perhotelan', count: 768, percent: '26,9%', color: '#38bdf8' },
    { name: 'Kuliner', count: 642, percent: '22,4%', color: '#fbbf24' },
    { name: 'Event & MICE', count: 346, percent: '12,1%', color: '#818cf8' },
    { name: 'Lainnya', count: 280, percent: '9,8%', color: '#94a3b8' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 1. Line Chart: Perkembangan Mahasiswa */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
              Grafik Perkembangan Mahasiswa
            </h4>
            <div className="flex items-center gap-3 mt-1.5 text-[10px]">
              <span className="flex items-center gap-1 font-semibold text-blue-600">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Total
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" /> Aktif
              </span>
              <span className="flex items-center gap-1 font-semibold text-sky-500">
                <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" /> Lulus
              </span>
            </div>
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-lg font-semibold border border-transparent focus:outline-none"
          >
            <option>Tahun 2024</option>
            <option>Tahun 2023</option>
            <option>Tahun 2022</option>
          </select>
        </div>

        {/* SVG Multi-Line Chart Canvas */}
        <div className="h-44 w-full relative pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-700" />
            <line x1="0" y1="60" x2="400" y2="60" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-700" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-700" />

            {/* Total Line (Blue) */}
            <path
              d="M 10 90 Q 60 75 100 65 T 200 45 T 300 25 T 390 20"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Aktif Line (Emerald) */}
            <path
              d="M 10 100 Q 60 85 100 75 T 200 55 T 300 38 T 390 35"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Lulus Line (Sky) */}
            <path
              d="M 10 110 Q 60 105 100 95 T 200 85 T 300 70 T 390 65"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Month labels */}
          <div className="flex justify-between text-[9px] text-slate-400 mt-2">
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 mt-3 flex justify-between items-center text-xs">
          <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-[11px]">
            Lihat Laporan Lengkap →
          </button>
        </div>
      </div>

      {/* 2. Donut Chart: Distribusi Mahasiswa per Prodi */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 mb-2">
          Distribusi Mahasiswa per Program Studi
        </h4>

        <div className="flex items-center justify-between gap-4 my-auto">
          {/* Donut Graphic Representation */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-700"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="#2563eb"
                strokeWidth="4"
                strokeDasharray="29, 100"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="#38bdf8"
                strokeWidth="4"
                strokeDasharray="27, 100"
                strokeDashoffset="-29"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="#fbbf24"
                strokeWidth="4"
                strokeDasharray="22, 100"
                strokeDashoffset="-56"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="#818cf8"
                strokeWidth="4"
                strokeDasharray="12, 100"
                strokeDashoffset="-78"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-bold text-slate-400">Total</span>
              <span className="text-xs font-black text-slate-800 dark:text-white">2.860</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-1.5 flex-1 text-[10px]">
            {prodiDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0 ml-2">
                  {item.count} ({item.percent})
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 mt-3 flex justify-between items-center text-xs">
          <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-[11px]">
            Lihat Detail →
          </button>
        </div>
      </div>

      {/* 3. Notifikasi Penting List */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
            Notifikasi Penting
          </h4>
          <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Lihat Semua
          </button>
        </div>

        <div className="space-y-3 my-auto">
          {/* Notification Item 1 */}
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 size={12} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px] leading-tight">
                Sinkronisasi PDDIKTI Semester Genap 2023/2024 berhasil dilakukan.
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Hari ini, 09:30</p>
            </div>
          </div>

          {/* Notification Item 2 */}
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <Calendar size={12} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px] leading-tight">
                Jadwal Ujian Akhir Semester telah diterbitkan.
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Hari ini, 08:15</p>
            </div>
          </div>

          {/* Notification Item 3 */}
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={12} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px] leading-tight">
                Pembayaran UKT Tahap 2 berakhir 31 Mei 2024.
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Kemarin, 16:45</p>
            </div>
          </div>

          {/* Notification Item 4 */}
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle size={12} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px] leading-tight">
                Akreditasi Prodi Perhotelan akan kadaluarsa pada 15 Juli 2025.
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">2 Mei 2024</p>
            </div>
          </div>
        </div>

        <div className="pt-2 text-[10px] text-slate-400">
          Status sistem 100% online dan terhubung.
        </div>
      </div>
    </div>
  );
};
