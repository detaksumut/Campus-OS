import React, { useState } from 'react';
import { ScrollText, Award, CheckCircle2, ShieldCheck, Download, Search, FileCheck, Printer, QrCode, X } from 'lucide-react';
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
  graduationDate: string;
  degreeTitle: string;
}

export const GraduationWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [selectedStudentForPrint, setSelectedStudentForPrint] = useState<GraduateStudent | null>(null);

  const [students, setStudents] = useState<GraduateStudent[]>([
    { nim: '200101015', name: 'Rangga Pratama', program: 'D4 Usaha Perjalanan Wisata', programCode: '93401', degreeLevel: 'D4', gpa: 3.88, sivilVerified: true, skpiStatus: 'READY', pinNumber: '005012-2024-40-93401-00012', graduationDate: '15 Agustus 2024', degreeTitle: 'Sarjana Terapan Pariwisata (S.Tr.Par.)' },
    { nim: '200102008', name: 'Nabila Syahrini', program: 'D4 Perhotelan', programCode: '93402', degreeLevel: 'D4', gpa: 3.92, sivilVerified: true, skpiStatus: 'READY', pinNumber: '005012-2024-40-93402-00015', graduationDate: '15 Agustus 2024', degreeTitle: 'Sarjana Terapan Pariwisata (S.Tr.Par.)' },
    { nim: '210103020', name: 'Dimas Kurniawan', program: 'D3 Kuliner', programCode: '93403', degreeLevel: 'D3', gpa: 3.65, sivilVerified: false, skpiStatus: 'DRAFT', graduationDate: '15 Agustus 2024', degreeTitle: 'Ahli Madya Pariwisata (A.Md.Par.)' },
    { nim: '200104011', name: 'Amanda Putri', program: 'D4 Event & MICE', programCode: '93404', degreeLevel: 'D4', gpa: 3.78, sivilVerified: false, skpiStatus: 'DRAFT', graduationDate: '15 Agustus 2024', degreeTitle: 'Sarjana Terapan Pariwisata (S.Tr.Par.)' }
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

  const handleExportYudisiumCSV = () => {
    const headers = "NIM,Nama,ProgramStudi,IPK,NomorPINDikti,StatusSIVIL,Gelar";
    const rows = students.map(s => 
      `"${s.nim}","${s.name}","${s.program}",${s.gpa.toFixed(2)},"${s.pinNumber || '-'}","${s.sivilVerified ? 'TERVERIFIKASI' : 'BELUM'}","${s.degreeTitle}"`
    ).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(`${headers}\n${rows}`);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `Berita_Acara_Yudisium_${profile.institutionName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        <button 
          onClick={handleExportYudisiumCSV}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Download size={14} />
          <span>Export Berita Acara Yudisium (CSV)</span>
        </button>
      </div>

      {/* Graduation Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Calon Wisudawan</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{students.length * 180}</p>
          <span className="text-[10px] font-bold text-emerald-600">Tingkat Kelulusan: 94,8%</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">PIN Terbit & Terverifikasi SIVIL</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{students.filter(s => s.sivilVerified).length * 180}</p>
          <span className="text-[10px] font-bold text-slate-400">Siap Cetak Ijazah & SKPI</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rata-rata IPK Lulusan</p>
          <p className="text-2xl font-black text-blue-600 mt-1">3.81</p>
          <span className="text-[10px] font-bold text-blue-600">Predikat: Pujian (Cumlaude)</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">SKPI & Sertifikasi BNSP</p>
          <p className="text-2xl font-black text-purple-600 mt-1">100%</p>
          <span className="text-[10px] font-bold text-purple-600">Memiliki Sertifikat Kompetensi</span>
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
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm transition-all flex items-center gap-1 mx-auto hover:scale-105"
                      >
                        <ShieldCheck size={13} />
                        <span>Generate PIN Dikti</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => setSelectedStudentForPrint(std)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-all flex items-center gap-1 mx-auto hover:scale-105"
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

      {/* 🖨️ MODAL CETAK IJAZAH & SKPI RESMI (SIVIL & PIN DIKTI) */}
      {selectedStudentForPrint && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="text-amber-500" size={20} />
                <h3 className="font-black text-sm">Dokumen Ijazah Digital & SKPI Resmi (SIVIL Terverifikasi)</h3>
              </div>
              <button onClick={() => setSelectedStudentForPrint(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {/* Ijazah Preview Canvas */}
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border-2 border-amber-500/40 text-center space-y-3 relative overflow-hidden shadow-inner">
              <div className="text-[11px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-400">
                KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase">
                {profile.institutionName}
              </h2>
              <div className="w-16 h-0.5 bg-amber-500 mx-auto" />

              <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-2">
                Memberikan Ijazah kepada:
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white tracking-wide">
                {selectedStudentForPrint.name}
              </p>
              <p className="text-xs font-mono font-bold text-slate-500">
                NIM: {selectedStudentForPrint.nim}
              </p>

              <p className="text-xs text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed pt-1">
                Telah menyelesaikan segala persyaratan pendidikan pada Program Studi <b>{selectedStudentForPrint.program}</b> dan kepadanya berhak menyandang gelar:
              </p>

              <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                {selectedStudentForPrint.degreeTitle}
              </p>

              {/* PIN & SIVIL Stamp */}
              <div className="pt-4 border-t border-amber-300/40 dark:border-slate-700 flex items-center justify-between text-left text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Nomor Ijazah Nasional (PIN Dikti):</p>
                  <p className="font-mono font-black text-emerald-600 dark:text-emerald-400">{selectedStudentForPrint.pinNumber}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Tanggal Kelulusan Yudisium: {selectedStudentForPrint.graduationDate}</p>
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                  <QrCode size={36} className="text-slate-800 dark:text-white" />
                  <div className="text-[9px]">
                    <p className="font-black text-emerald-600">✓ SIVIL Valid</p>
                    <p className="text-slate-400">BSrE Digital Sign</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedStudentForPrint(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30"
              >
                <Printer size={14} />
                <span>Cetak Ijazah & SKPI Resmi (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
