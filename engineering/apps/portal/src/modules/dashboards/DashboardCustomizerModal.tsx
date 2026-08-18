import React, { useState } from 'react';
import { 
  SlidersHorizontal, CheckCircle, Eye, EyeOff, Save, ShieldCheck, 
  RotateCcw, Sparkles, Plus, Trash2
} from 'lucide-react';
import { UserRole } from '../../components/Header';

export interface WidgetConfigItem {
  id: string;
  name: string;
  description: string;
  isVisible: boolean;
  category: 'AKADEMIK' | 'FINANSIAL' | 'OPERASIONAL' | 'EKSEKUTIF';
}

interface DashboardCustomizerModalProps {
  currentRole: UserRole | 'PEGAWAI' | 'REKTOR' | 'YAYASAN';
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardCustomizerModal: React.FC<DashboardCustomizerModalProps> = ({ currentRole, isOpen, onClose }) => {
  const [selectedTargetRole, setSelectedTargetRole] = useState<string>(currentRole);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Widget Registry configuration map
  const [roleWidgets, setRoleWidgets] = useState<Record<string, WidgetConfigItem[]>>({
    MAHASISWA: [
      { id: 'mhs-1', name: 'Status Akademik & Progres SKS (144 SKS)', description: 'Menampilkan IPK, SKS lulus, dan batas SKS semester ini', isVisible: true, category: 'AKADEMIK' },
      { id: 'mhs-2', name: 'Jadwal Kuliah Hari Ini & Link Kelas Online', description: 'Jadwal 16 sesi BAP digital dan tautan kelas online', isVisible: true, category: 'AKADEMIK' },
      { id: 'mhs-3', name: 'Status Kontrak KRS & Validasi Dosen PA', description: 'Status persetujuan kartu rencana studi oleh pembimbing', isVisible: true, category: 'AKADEMIK' },
      { id: 'mhs-4', name: 'Tagihan Keuangan UKT & Virtual Account', description: 'Informasi VA bank dan status pelunasan uang kuliah', isVisible: true, category: 'FINANSIAL' },
      { id: 'mhs-5', name: 'Tenggat Tugas LMS & Kalender Akademik', description: 'Pengingat deadline kuis dan tugas terstruktur', isVisible: true, category: 'OPERASIONAL' },
    ],
    DOSEN: [
      { id: 'dsn-1', name: 'Kontrak Beban Kinerja Dosen (BKD 12-16 SKS)', description: 'Kepatuhan 4 pilar Tridharma standar Dikti Serdos', isVisible: true, category: 'AKADEMIK' },
      { id: 'dsn-2', name: 'Jadwal Mengajar, Kontrak Kuliah & 16 Sesi BAP', description: 'Lembar BAP digital, presensi mhs dan kontrak belajar sesi 1', isVisible: true, category: 'AKADEMIK' },
      { id: 'dsn-3', name: 'Verifikasi Kontrak KRS Mahasiswa Bimbingan', description: 'Persetujuan kartu rencana studi mahasiswa perwalian Dosen PA', isVisible: true, category: 'AKADEMIK' },
      { id: 'dsn-4', name: 'Penginputan Nilai KHS & Skala Huruf Mutu', description: 'Komposisi bobot nilai akhir A s/d E', isVisible: true, category: 'AKADEMIK' },
      { id: 'dsn-5', name: 'Portofolio Riset, Publikasi & Hibah LPPM', description: 'Status proposal penelitian dan luaran publikasi SINTA/Scopus', isVisible: true, category: 'EKSEKUTIF' },
    ],
    PEGAWAI: [
      { id: 'peg-1', name: 'Presensi Jam Kerja & Sisa Cuti Pegawai', description: 'Jam masuk/pulang presensi harian dan rekap kehadiran', isVisible: true, category: 'OPERASIONAL' },
      { id: 'peg-2', name: 'Loket Layanan Dokumen & Surat BAAK Digital', description: 'Antrian penerbitan surat aktif kuliah dan legalisir', isVisible: true, category: 'OPERASIONAL' },
      { id: 'peg-3', name: 'Helpdesk Sarana Prasarana & Inventaris BMN', description: 'Laporan pemeliharaan gedung dan laboratorium', isVisible: true, category: 'OPERASIONAL' },
    ],
    ADMIN: [
      { id: 'adm-1', name: 'Executive KPI Ringkasan Kampus', description: 'Total mahasiswa aktif, dosen, kelas dan tren pertumbuhan', isVisible: true, category: 'EKSEKUTIF' },
      { id: 'adm-2', name: 'Matriks Capaian 8 IKU Kemendikbudristek', description: 'Monitoring 8 Indikator Kinerja Utama Dikti', isVisible: true, category: 'EKSEKUTIF' },
      { id: 'adm-3', name: 'Kanal Dropship & Migrasi Data Master', description: 'Ingestion data mahasiswa, dosen, pegawai & yayasan', isVisible: true, category: 'OPERASIONAL' },
    ]
  });

  if (!isOpen) return null;

  const currentWidgets = roleWidgets[selectedTargetRole] || roleWidgets['ADMIN'];

  const handleToggleWidget = (id: string) => {
    setRoleWidgets(prev => ({
      ...prev,
      [selectedTargetRole]: (prev[selectedTargetRole] || []).map(w => w.id === id ? { ...w, isVisible: !w.isVisible } : w)
    }));
  };

  const handleSaveLayout = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 text-white">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <SlidersHorizontal size={20} />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">Administrator Dashboard Layout Customizer</h3>
              <p className="text-[10px] text-slate-400">Atur & sesuaikan visibilitas (+ / -) widget untuk setiap peran pengguna</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm">✕</button>
        </div>

        {/* Role Target Switcher */}
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1.5">Pilih Peran Dashboard yang Disesuaikan:</label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setSelectedTargetRole('ADMIN')}
              className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                selectedTargetRole === 'ADMIN' ? 'bg-blue-600/30 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              👑 Rektor / Admin
            </button>
            <button
              onClick={() => setSelectedTargetRole('DOSEN')}
              className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                selectedTargetRole === 'DOSEN' ? 'bg-blue-600/30 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              👨‍🏫 Dosen Pengajar
            </button>
            <button
              onClick={() => setSelectedTargetRole('MAHASISWA')}
              className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                selectedTargetRole === 'MAHASISWA' ? 'bg-blue-600/30 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              🎓 Mahasiswa
            </button>
            <button
              onClick={() => setSelectedTargetRole('PEGAWAI')}
              className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                selectedTargetRole === 'PEGAWAI' ? 'bg-blue-600/30 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              💼 Pegawai / Tendik
            </button>
          </div>
        </div>

        {/* Widgets List with Toggles */}
        <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">
          {currentWidgets.map(widget => (
            <div
              key={widget.id}
              onClick={() => handleToggleWidget(widget.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                widget.isVisible
                  ? 'bg-slate-800/90 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-900/40 border-slate-800/80 opacity-50'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">{widget.name}</span>
                  <span className="px-1.5 py-0.2 text-[8px] font-bold bg-slate-700 text-slate-300 rounded uppercase">
                    {widget.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{widget.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg ${
                  widget.isVisible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {widget.isVisible ? 'Tampil' : 'Disembunyikan'}
                </span>
                {widget.isVisible ? <Eye size={16} className="text-emerald-400" /> : <EyeOff size={16} className="text-slate-500" />}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              setRoleWidgets(prev => ({
                ...prev,
                [selectedTargetRole]: (prev[selectedTargetRole] || []).map(w => ({ ...w, isVisible: true }))
              }));
            }}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 font-bold"
          >
            <RotateCcw size={13} />
            <span>Reset ke Default</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Batal
            </button>
            <button
              onClick={handleSaveLayout}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center gap-1.5 transition-all"
            >
              <Save size={14} />
              <span>Simpan Penyesuaian</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
