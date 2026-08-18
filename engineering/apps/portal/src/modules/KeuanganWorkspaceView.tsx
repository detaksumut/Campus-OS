import React, { useState } from 'react';
import { DollarSign, CheckCircle2, Clock, CreditCard, ArrowDownRight, ArrowUpRight, Search, Download, Plus, Receipt, X } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface FinanceTransaction {
  id: string;
  nim: string;
  name: string;
  item: string;
  amount: string;
  method: string;
  date: string;
  status: 'PAID' | 'PENDING';
}

export const KeuanganWorkspaceView: React.FC = () => {
  const { profile } = useTenant();
  const [searchTerm, setSearchTerm] = useState('');
  const [showGenerateVAModal, setShowGenerateVAModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<FinanceTransaction | null>(null);

  const [transactions, setTransactions] = useState<FinanceTransaction[]>([
    { id: 'trx-01', nim: '210101042', name: 'Rangga Pratama', item: 'Pembayaran UKT Semester Genap 2024', amount: 'Rp 4.500.000', method: 'BSI Virtual Account', date: 'Hari ini, 10:15 WIB', status: 'PAID' },
    { id: 'trx-02', nim: '220102018', name: 'Nabila Syahrini', item: 'Pembayaran UKT Semester Genap 2024', amount: 'Rp 4.500.000', method: 'Mandiri Virtual Account', date: 'Hari ini, 09:40 WIB', status: 'PAID' },
    { id: 'trx-03', nim: '230103009', name: 'Bagas Aditya', item: 'Biaya Praktikum Laboratorium Kuliner', amount: 'Rp 1.250.000', method: 'BNI Virtual Account', date: 'Kemarin, 14:20 WIB', status: 'PAID' },
    { id: 'trx-04', nim: '200101015', name: 'Dewi Anjani', item: 'Biaya Pendaftaran Wisuda & Ijazah', amount: 'Rp 1.500.000', method: 'BCA Virtual Account', date: 'Kemarin, 11:30 WIB', status: 'PAID' },
  ]);

  // Form New VA
  const [newNim, setNewNim] = useState('');
  const [newName, setNewName] = useState('');
  const [newItem, setNewItem] = useState('UKT_GENAP');
  const [newBank, setNewBank] = useState('Bank Mandiri');

  const handleExportCSV = () => {
    const headers = "ID_Transaksi,NIM,Nama_Mahasiswa,Item_Tagihan,Nominal,Metode_Pembayaran,Waktu,Status";
    const rows = transactions.map(t => 
      `"${t.id}","${t.nim}","${t.name}","${t.item}","${t.amount}","${t.method}","${t.date}","${t.status}"`
    ).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(`${headers}\n${rows}`);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `Rekap_Keuangan_UKT_${profile.institutionName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateVA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNim || !newName) return;
    const created: FinanceTransaction = {
      id: `trx-${Date.now().toString().slice(-4)}`,
      nim: newNim.trim(),
      name: newName.trim(),
      item: newItem === 'UKT_GENAP' ? 'Pembayaran UKT Semester Genap 2024' : 'Biaya Praktikum / Wisuda',
      amount: 'Rp 4.500.000',
      method: `${newBank} Virtual Account`,
      date: 'Baru saja',
      status: 'PAID'
    };
    setTransactions(prev => [created, ...prev]);
    setShowGenerateVAModal(false);
    setNewNim('');
    setNewName('');
  };

  const filteredTransactions = transactions.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.nim.includes(searchTerm) ||
    t.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={22} className="text-teal-400" />
            <h2 className="text-xl font-black tracking-tight">Keuangan & Pembayaran Uang Kuliah Tunggal (UKT)</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-500 rounded-full">Virtual Account Multi-Bank</span>
          </div>
          <p className="text-xs text-teal-200">
            Billing Engine Otomatis, Rekonsiliasi Real-Time & Laporan Keuangan Institusi ({profile.institutionName})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowGenerateVAModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <Plus size={14} />
            <span>Generate Tagihan VA Baru</span>
          </button>
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-500/30 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <Download size={14} />
            <span>Export Rekap Keuangan (CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Tagihan Semester</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">Rp 12,87 M</p>
          <span className="text-[10px] font-bold text-slate-400">2.860 Mahasiswa Terdata</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Penerimaan Realtime (Lunas)</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">Rp 11,94 M</p>
          <span className="text-[10px] font-bold text-emerald-600">92.8% Lunas Terbayar</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Piutang / Cicilan UKT</p>
          <p className="text-2xl font-black text-amber-600 mt-1">Rp 930 Jt</p>
          <span className="text-[10px] font-bold text-amber-600">Tenggat: 31 Mei 2024</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Beasiswa (KIP-K & Mitra)</p>
          <p className="text-2xl font-black text-blue-600 mt-1">Rp 2,15 M</p>
          <span className="text-[10px] font-bold text-blue-600">480 Penerima Aktif</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="text-teal-500" />
            <h3 className="font-black text-sm text-slate-900 dark:text-white">Jurnal Mutasi Penerimaan & Rekonsiliasi Real-Time</h3>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Cari NIM atau nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 pl-8 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
            />
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
              <tr>
                <th className="p-3">ID Trx</th>
                <th className="p-3">NIM / Nama Mahasiswa</th>
                <th className="p-3">Rincian Pembayaran</th>
                <th className="p-3">Kanal Pembayaran</th>
                <th className="p-3">Waktu</th>
                <th className="p-3 text-right">Nominal</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Kuitansi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredTransactions.map(trx => (
                <tr key={trx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="p-3 font-mono font-bold text-slate-400">{trx.id}</td>
                  <td className="p-3">
                    <span className="font-bold text-slate-900 dark:text-white block">{trx.name}</span>
                    <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold">{trx.nim}</span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300 font-medium">{trx.item}</td>
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{trx.method}</td>
                  <td className="p-3 text-slate-400 text-[11px]">{trx.date}</td>
                  <td className="p-3 text-right font-black font-mono text-emerald-600 dark:text-emerald-400">{trx.amount}</td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1">
                      <CheckCircle2 size={11} /> LUNAS
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedReceipt(trx)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[10px] inline-flex items-center gap-1"
                    >
                      <Receipt size={12} className="text-teal-500" />
                      <span>Kuitansi</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧾 MODAL KUITANSI PEMBAYARAN RESMI */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="text-teal-500" size={20} />
                <h3 className="font-black text-sm">Kuitansi Pembayaran Elektronik (e-Receipt)</h3>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="text-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <p className="font-black uppercase">{profile.institutionName}</p>
                <p className="text-[10px] text-slate-400">Bukti Pembayaran Sah Sistem Perbankan</p>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Nomor Transaksi:</span>
                <span className="font-mono font-bold">{selectedReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nama Mahasiswa:</span>
                <span className="font-bold">{selectedReceipt.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">NIM:</span>
                <span className="font-mono font-bold text-teal-600">{selectedReceipt.nim}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rincian:</span>
                <span className="font-semibold text-right max-w-[200px]">{selectedReceipt.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metode:</span>
                <span className="font-bold">{selectedReceipt.method}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="font-bold">Total Pembayaran:</span>
                <span className="font-black text-base text-emerald-600 font-mono">{selectedReceipt.amount}</span>
              </div>
              <div className="text-center pt-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full font-black text-[10px]">
                  ✓ STATUS: LUNAS TERVERIFIKASI
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
              >
                🖨️ Cetak Kuitansi (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💳 MODAL GENERATE VA TAGIHAN BARU */}
      {showGenerateVAModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="text-emerald-500" size={20} />
                <h3 className="font-black text-sm">Terbitkan Virtual Account Tagihan Baru</h3>
              </div>
              <button onClick={() => setShowGenerateVAModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateVA} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">NIM Mahasiswa: *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 200101012"
                  value={newNim}
                  onChange={(e) => setNewNim(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Mahasiswa: *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pilih Bank Virtual Account:</label>
                <select
                  value={newBank}
                  onChange={(e) => setNewBank(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                >
                  <option value="Bank Mandiri">Bank Mandiri (VA 8808...)</option>
                  <option value="BSI (Bank Syariah Indonesia)">BSI (VA 9901...)</option>
                  <option value="BNI">BNI (VA 8201...)</option>
                  <option value="BCA">BCA (VA 1204...)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGenerateVAModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Terbitkan & Sinkronkan VA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
