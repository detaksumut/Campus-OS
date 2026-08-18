import React from 'react';

export const ChartWidget: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 h-64 flex items-center justify-center text-slate-400">
    [Chart Visualization Placeholder]
  </div>
);

export const NotificationWidget: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5">
    <div className="flex justify-between items-center mb-4">
      <div className="font-bold text-slate-700">Notifikasi Penting</div>
      <a href="#" className="text-sm text-brand-primary">Lihat Semua</a>
    </div>
    <ul className="space-y-4">
      <li className="flex gap-3">
        <span className="text-emerald-500">✅</span>
        <div>
          <div className="text-sm font-semibold text-slate-700">Sinkronisasi PDDIKTI Semester Genap 2023/2024 berhasil dilakukan.</div>
          <div className="text-xs text-slate-500">Hari ini, 09:30</div>
        </div>
      </li>
      <li className="flex gap-3">
        <span className="text-blue-500">📅</span>
        <div>
          <div className="text-sm font-semibold text-slate-700">Jadwal Ujian Akhir Semester telah diterbitkan.</div>
          <div className="text-xs text-slate-500">Hari ini, 08:15</div>
        </div>
      </li>
    </ul>
  </div>
);

export const CalendarWidget: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5">
    <div className="font-bold text-slate-700 mb-4 text-center">Kalender Akademik</div>
    <div className="text-center font-semibold text-sm mb-2 text-slate-800">Mei 2024</div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
      <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div><div>Min</div>
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
      <div className="text-slate-300">29</div><div className="text-slate-300">30</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
      <div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div>
      <div>13</div><div>14</div><div className="bg-brand-primary text-white rounded-full">15</div><div>16</div><div>17</div><div>18</div><div>19</div>
      <div>20</div><div>21</div><div>22</div><div>23</div><div>24</div><div>25</div><div>26</div>
      <div>27</div><div>28</div><div>29</div><div>30</div><div>31</div><div className="text-slate-300">1</div><div className="text-slate-300">2</div>
    </div>
  </div>
);

export const TaskWidget: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5">
    <div className="flex justify-between items-center mb-4">
      <div className="font-bold text-slate-700">Tugas Saya</div>
      <a href="#" className="text-sm text-brand-primary">Lihat Semua</a>
    </div>
    <ul className="space-y-3 text-sm">
      <li className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="text-slate-400">☑️</span> Persetujuan Pengajuan RAB</div> <span className="text-slate-500 text-xs">2 tugas</span></li>
      <li className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="text-slate-400">☑️</span> Review Laporan Penelitian</div> <span className="text-slate-500 text-xs">5 laporan</span></li>
      <li className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="text-slate-400">☑️</span> Validasi Data Dosen</div> <span className="text-slate-500 text-xs">12 data</span></li>
    </ul>
  </div>
);

export const AnnouncementWidget: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5">
    <div className="flex justify-between items-center mb-4">
      <div className="font-bold text-slate-700">Pengumuman Terbaru</div>
    </div>
    <ul className="space-y-3 text-sm">
      <li>
        <div className="text-slate-700 font-medium">Informasi Libur Nasional & Cuti Bersama 2024</div>
        <div className="text-xs text-slate-500">10 Mei 2024</div>
      </li>
      <li>
        <div className="text-slate-700 font-medium">Beasiswa Unggulan KAMPUS ANDA 2024</div>
        <div className="text-xs text-slate-500">5 Mei 2024</div>
      </li>
    </ul>
  </div>
);

export const CopilotWidget: React.FC = () => (
  <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-white/50 p-4">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white text-xl shadow-md">🤖</div>
      <div>
        <div className="font-bold text-brand-dark text-sm leading-tight">UltimateAI</div>
        <div className="text-xs text-brand-primary font-medium">Campus Copilot</div>
      </div>
    </div>
    <p className="text-xs text-slate-600 mb-3 leading-relaxed font-medium">Halo Pak Direktur,<br/>Ada beberapa insight penting untuk Anda hari ini.</p>
    <div className="space-y-2 mb-3">
      <div className="bg-slate-50 rounded-lg p-2 text-xs border border-slate-100 flex items-start gap-2">
        <span className="text-blue-500 mt-0.5">👥</span>
        <div><span className="font-semibold text-slate-700">Mahasiswa aktif hari ini</span><br/><span className="text-blue-600 font-bold">2.860 mahasiswa</span></div>
      </div>
      <div className="bg-slate-50 rounded-lg p-2 text-xs border border-slate-100 flex items-start gap-2">
        <span className="text-emerald-500 mt-0.5">✅</span>
        <div><span className="font-semibold text-slate-700">Sinkronisasi PDDIKTI</span><br/><span className="text-emerald-600 font-bold">Berhasil</span></div>
      </div>
    </div>
    <div className="relative">
      <input type="text" placeholder="Tanya Jarvis..." className="w-full text-xs rounded-full border border-slate-200 py-2 px-3 pr-8 focus:outline-none focus:border-brand-primary" />
      <span className="absolute right-3 top-2 text-brand-primary cursor-pointer text-sm">➤</span>
    </div>
  </div>
);
