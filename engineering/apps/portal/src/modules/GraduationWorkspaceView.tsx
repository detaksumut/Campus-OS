import React, { useState } from 'react';
import { ScrollText, Award, CheckCircle2, ShieldCheck, Download, Search, FileCheck } from 'lucide-react';
import { PINSIVILEngine, useTenant } from '@campus-os/shared';

export interface GraduateStudent {
  nim: string;
  name: string;
  program: string;
  programCode: string;
  degreeLevel: 'D3' | 'D4' | 'S1';
  gpa: number;
  pinNumber?: string;
  sivilVerified: boolean;
  skpiStatus: 'READY' | 'DRAFT';
}

export const GraduationWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [students, setStudents] = useState<GraduateStudent[]>([
    { nim: '200101015', name: 'Rangga Pratama', program: 'D4 Usaha Perjalanan Wisata', programCode: '93401', degreeLevel: 'D4', gpa: 3.88, sivilVerified: true, skpiStatus: 'READY', pinNumber: '005012-2024-40-93401-00012' },
    { nim: '200102008', name: 'Nabila Syahrini', program: 'D4 Perhotelan', programCode: '93402', degreeLevel: 'D4', gpa: 3.92, sivilVerified: true, skpiStatus: 'READY', pinNumber: '005012-2024-40-93402-00015' },
    { nim: '210103020', name: 'Dimas Kurniawan', program: 'D3 Kuliner', programCode: '93403', degreeLevel: 'D3', gpa: 3.65, sivilVerified: false, skpiStatus: 'DRAFT' },
    { nim: '200104011', name: 'Amanda Putri', program: 'D4 Event & MICE', programCode: '93404', degreeLevel: 'D4', gpa: 3.78, sivilVerified: false, skpiStatus: 'DRAFT' }
  ]);

  const handleGeneratePIN = (nim: string) => {
    setStudents(prev => prev.map(s => {
      if (s.nim === nim) {
        const pin = PINSIVILEngine.generatePIN({
          institutionCode: profile.institutionCode || '005012',
          programCode: s.programCode,
          graduationYear: 2024,
          degreeLevel: s.degreeLevel,
          sequenceNumber: Math.floor(Math.random() * 800 + 100)
        });
        return { ...s, pinNumber: pin, sivilVerified: true, skpiStatus: 'READY' };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ScrollText size={22} className="text-blue-400" />
            <h2 className="text-xl font-black tracking-tight">Wisuda, Penomoran Ijazah Nasional (PIN) & SIVIL</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500 rounded-full">Standar Kemendikbudristek RI</span>
          </div>
          <p className="text-xs text-blue-200">
            Penerbitan Nomor Ijazah Nasional Resmi, Verifikasi SIVIL & Dokumen Surat Keterangan Pendamping Ijazah (SKPI)
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition-all">
          <Download size={14} />
          <span>Export Berita Acara Yudisium</span>
        </button>
      </div>

      {/* Graduation Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Calon Wisudawan</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">720</p>
          <span className="text-[10px] font-bold text-emerald-600">Tingkat Kelulusan: 92,45%</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">PIN Terbit & Terverifikasi SIVIL</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">685</p>
          <span className="text-[10px] font-bold text-slate-400">95.1% Siap Cetak Ijazah</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rata-rata IPK Lulusan</p>
          <p className="text-2xl font-black text-blue-600 mt-1">3.68</p>
          <span className="text-[10px] font-bold text-blue-600">Predikat: Pujian / Sangat Memuaskan</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">SKPI & Sertifikasi BNSP</p>
          <p className="text-2xl font-black text-purple-600 mt-1">720</p>
          <span className="text-[10px] font-bold text-purple-600">100% Memiliki Kompetensi</span>
        </div>
      </div>

      {/* Graduation Records Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Award size={16} className="text-blue-500" />
          <span>Daftar Verifikasi Yudisium & Penomoran PIN Dikti</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 font-bold">NIM</th>
                <th className="p-3 font-bold">Nama Wisudawan</th>
                <th className="p-3 font-bold">Program Studi</th>
                <th className="p-3 font-bold text-center">IPK Akhir</th>
                <th className="p-3 font-bold">Nomor PIN Dikti Resmi</th>
                <th className="p-3 font-bold text-center">Status SIVIL</th>
                <th className="p-3 font-bold text-center">Aksi Penerbitan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {students.map(std => (
                <tr key={std.nim} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{std.nim}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{std.name}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300 font-medium">{std.program}</td>
                  <td className="p-3 font-black text-center text-slate-900 dark:text-white">{std.gpa.toFixed(2)}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {std.pinNumber || '-'}
                  </td>
                  <td className="p-3 text-center">
                    {std.sivilVerified ? (
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1">
                        <CheckCircle2 size={11} /> TERVERIFIKASI
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        BELUM TERBIT
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {!std.pinNumber ? (
                      <button
                        onClick={() => handleGeneratePIN(std.nim)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm transition-all flex items-center gap-1 mx-auto"
                      >
                        <ShieldCheck size={13} />
                        <span>Generate PIN Dikti</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => alert(`Ijazah & SKPI untuk ${std.name} siap dicetak dengan PIN ${std.pinNumber}`)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-[11px] transition-all flex items-center gap-1 mx-auto"
                      >
                        <FileCheck size={13} />
                        <span>Cetak Ijazah & SKPI</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
