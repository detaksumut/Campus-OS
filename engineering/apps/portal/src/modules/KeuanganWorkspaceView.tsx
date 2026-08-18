import React, { useState } from 'react';
import { 
  DollarSign, CheckCircle2, Clock, CreditCard, ArrowDownRight, ArrowUpRight, 
  Search, Download, Plus, Receipt, X, Printer, FileText, UserCheck, Briefcase, 
  Building2, ShieldCheck, Wallet, Landmark, Copy, Check, UploadCloud, AlertCircle
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export interface CampusBankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch: string;
  type: 'UKT_REGULER' | 'PMB_PENDAFTARAN' | 'WISUDA_DAN_LAINNYA';
  logoColor: string;
}

export interface FinanceTransaction {
  id: string;
  nim: string;
  name: string;
  item: string;
  amount: string;
  targetBank: string;
  sourceBank: string;
  transferDate: string;
  proofUrl?: string;
  status: 'PAID' | 'VERIFYING' | 'PENDING';
}

export interface PayrollRecord {
  id: string;
  nipOrNidn: string;
  name: string;
  role: 'REKTOR' | 'DOSEN' | 'PEGAWAI';
  unit: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  basicSalary: number;
  allowanceFunctional: number;
  allowanceTeachingSKS: number;
  allowancePerformance: number;
  deductionTax: number;
  deductionBPJS: number;
  netSalary: number;
  month: string;
  status: 'TRANSFERRED' | 'PROCESSING';
}

export const KeuanganWorkspaceView: React.FC = () => {
  const { profile } = useTenant();

  const [activeFinanceTab, setActiveFinanceTab] = useState<'REKENING_KAMPUS' | 'UKT_STUDENTS' | 'PAYROLL_STAFF'>('REKENING_KAMPUS');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Modals
  const [showUploadProofModal, setShowUploadProofModal] = useState(false);
  const [showUpdateBankModal, setShowUpdateBankModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<FinanceTransaction | null>(null);
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);

  // 1. DAFTAR NOMOR REKENING RESMI BANK KAMPUS / YAYASAN (TUJUAN TRANSFER MAHASISWA)
  const [campusBanks, setCampusBanks] = useState<CampusBankAccount[]>([
    {
      bankName: 'Bank Mandiri',
      accountNumber: '106-00-1882910-4',
      accountHolder: `Yayasan Pendidikan ${profile.institutionName}`,
      branch: 'Kantor Cabang Utama Medan',
      type: 'UKT_REGULER',
      logoColor: 'from-blue-600 to-indigo-900'
    },
    {
      bankName: 'Bank BNI (Persero)',
      accountNumber: '0821-4091-8812',
      accountHolder: `Penerimaan Biaya Kuliah - ${profile.institutionName}`,
      branch: 'KCP Diponegoro',
      type: 'UKT_REGULER',
      logoColor: 'from-amber-600 to-orange-900'
    },
    {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountNumber: '712-3456-7890',
      accountHolder: `Rekening Kas Operasional ${profile.institutionName}`,
      branch: 'KC Syariah Ahmad Yani',
      type: 'PMB_PENDAFTARAN',
      logoColor: 'from-emerald-600 to-teal-900'
    },
    {
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '390-109-8822',
      accountHolder: `Badan Penyelenggara ${profile.institutionName}`,
      branch: 'KCU Sudirman',
      type: 'WISUDA_DAN_LAINNYA',
      logoColor: 'from-blue-700 to-cyan-900'
    }
  ]);

  // 2. DATA TRANSAKSI PEMBAYARAN MAHASISWA (TRANSFER BANK)
  const [transactions, setTransactions] = useState<FinanceTransaction[]>([
    { id: 'TRX-2024-001', nim: '200101012', name: 'Rian Hidayat', item: 'Pembayaran UKT Semester Genap 2024', amount: 'Rp 4.500.000', targetBank: 'Bank Mandiri (106-00-1882910-4)', sourceBank: 'BCA (M-Banking)', transferDate: '15 Mei 2024, 10:15 WIB', status: 'PAID' },
    { id: 'TRX-2024-002', nim: '210102018', name: 'Nabila Syahrini', item: 'Pembayaran UKT Semester Genap 2024', amount: 'Rp 4.500.000', targetBank: 'Bank BSI (712-3456-7890)', sourceBank: 'BSI Mobile', transferDate: '16 Mei 2024, 09:40 WIB', status: 'PAID' },
    { id: 'TRX-2024-003', nim: '220103009', name: 'Bagas Aditya', item: 'Biaya Praktikum Laboratorium Kuliner', amount: 'Rp 1.250.000', targetBank: 'Bank BNI (0821-4091-8812)', sourceBank: 'Mandiri Livin', transferDate: '17 Mei 2024, 14:20 WIB', status: 'VERIFYING' },
    { id: 'TRX-2024-004', nim: '200101015', name: 'Dewi Anjani', item: 'Biaya Pendaftaran Wisuda & Ijazah', amount: 'Rp 1.500.000', targetBank: 'Bank BCA (390-109-8822)', sourceBank: 'ATM Bersama', transferDate: '18 Mei 2024, 11:30 WIB', status: 'PAID' },
  ]);

  // 3. DATA REKENING GAJI & PAYROLL (REKTOR, DOSEN & PEGAWAI)
  const [payrollList, setPayrollList] = useState<PayrollRecord[]>([
    {
      id: 'PAY-2024-05-001',
      nipOrNidn: '0001017001',
      name: 'Prof. Dr. Ir. H. M. Yusuf, M.T.',
      role: 'REKTOR',
      unit: 'Pimpinan Eksekutif Kampus (Rektorat)',
      bankName: 'Bank Mandiri',
      accountNumber: '106-00-9928172-1',
      accountHolder: 'Prof. Dr. Ir. H. M. Yusuf, M.T.',
      basicSalary: 12000000,
      allowanceFunctional: 6000000, // Tunjangan Kehormatan Rektor / Guru Besar
      allowanceTeachingSKS: 3500000,
      allowancePerformance: 3000000,
      deductionTax: 1200000,
      deductionBPJS: 500000,
      netSalary: 22800000,
      month: 'Mei 2024',
      status: 'TRANSFERRED'
    },
    {
      id: 'PAY-2024-05-002',
      nipOrNidn: '0012057801',
      name: 'Dr. Hendra Wijaya, M.T.',
      role: 'DOSEN',
      unit: 'Program Studi D4 Pariwisata',
      bankName: 'Bank BNI',
      accountNumber: '028-192-8812',
      accountHolder: 'Dr. Hendra Wijaya, M.T.',
      basicSalary: 6500000,
      allowanceFunctional: 2500000, // Tunjangan Lektor Kepala
      allowanceTeachingSKS: 3200000, // Insentif 16 Sesi BAP (10 SKS)
      allowancePerformance: 1500000,
      deductionTax: 450000,
      deductionBPJS: 250000,
      netSalary: 13000000,
      month: 'Mei 2024',
      status: 'TRANSFERRED'
    },
    {
      id: 'PAY-2024-05-003',
      nipOrNidn: '0018098202',
      name: 'Siti Rahmawati, M.Par.',
      role: 'DOSEN',
      unit: 'Program Studi D4 Perhotelan',
      bankName: 'Bank BCA',
      accountNumber: '390-881-2291',
      accountHolder: 'Siti Rahmawati',
      basicSalary: 5500000,
      allowanceFunctional: 1800000,
      allowanceTeachingSKS: 2800000,
      allowancePerformance: 1000000,
      deductionTax: 320000,
      deductionBPJS: 200000,
      netSalary: 10580000,
      month: 'Mei 2024',
      status: 'TRANSFERRED'
    },
    {
      id: 'PAY-2024-05-004',
      nipOrNidn: 'PEG-001',
      name: 'Budi Santoso, S.Kom.',
      role: 'PEGAWAI',
      unit: 'BAAK & Teknologi Informasi',
      bankName: 'Bank BSI (Syariah)',
      accountNumber: '712-9988-112',
      accountHolder: 'Budi Santoso',
      basicSalary: 4800000,
      allowanceFunctional: 1200000,
      allowanceTeachingSKS: 0,
      allowancePerformance: 1500000,
      deductionTax: 200000,
      deductionBPJS: 180000,
      netSalary: 7120000,
      month: 'Mei 2024',
      status: 'TRANSFERRED'
    }
  ]);

  // Form Upload Bukti Transfer Mahasiswa
  const [proofForm, setProofForm] = useState({
    nim: '200101012',
    name: 'Rian Hidayat',
    item: 'Pembayaran UKT Semester Genap 2024',
    amount: 'Rp 4.500.000',
    targetBank: 'Bank Mandiri (106-00-1882910-4)',
    sourceBank: 'Bank BCA / M-Banking'
  });

  // Form Pemutakhiran Rekening Gaji Saya
  const [myBankForm, setMyBankForm] = useState({
    name: 'Dr. Hendra Wijaya, M.T.',
    nipOrNidn: '0012057801',
    role: 'DOSEN' as 'REKTOR' | 'DOSEN' | 'PEGAWAI',
    bankName: 'Bank BNI',
    accountNumber: '028-192-8812',
    accountHolder: 'Dr. Hendra Wijaya, M.T.'
  });

  const handleCopyAccount = (accNum: string) => {
    navigator.clipboard.writeText(accNum.replace(/-/g, ''));
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleSaveMyBank = (e: React.FormEvent) => {
    e.preventDefault();
    setPayrollList(prev => prev.map(p => p.nipOrNidn === myBankForm.nipOrNidn ? {
      ...p,
      bankName: myBankForm.bankName,
      accountNumber: myBankForm.accountNumber,
      accountHolder: myBankForm.accountHolder
    } : p));
    setShowUpdateBankModal(false);
  };

  const handleUploadProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrx: FinanceTransaction = {
      id: `TRX-${Date.now().toString().slice(-4)}`,
      nim: proofForm.nim.trim(),
      name: proofForm.name.trim(),
      item: proofForm.item,
      amount: proofForm.amount,
      targetBank: proofForm.targetBank,
      sourceBank: proofForm.sourceBank,
      transferDate: 'Baru saja (Menunggu Verifikasi)',
      status: 'VERIFYING'
    };
    setTransactions(prev => [newTrx, ...prev]);
    setShowUploadProofModal(false);
  };

  const handleVerifyPayment = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'PAID' } : t));
  };

  // Ekspor CSV Transfer Gaji Massal Bank
  const exportPayrollCSV = () => {
    const headers = 'ID_PAYROLL,NIP_NIDN,NAMA_LENGKAP,JABATAN,BANK_PENERIMA,NO_REKENING,ATAS_NAMA,GAJI_BERSIH_RUPIAH,PERIODE\n';
    const rows = payrollList.map(p => 
      `"${p.id}","${p.nipOrNidn}","${p.name}","${p.role}","${p.bankName}","${p.accountNumber}","${p.accountHolder}",${p.netSalary},"${p.month}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Daftar_Transfer_Gaji_CampusOS_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={22} className="text-emerald-400" />
            <h2 className="text-xl font-black tracking-tight">Sistem Keuangan, Transfer Rekening Bank & Penggajian (Payroll)</h2>
          </div>
          <p className="text-xs text-emerald-200">
            Pusat Informasi Rekening Resmi Kampus, Konfirmasi Transfer UKT Mahasiswa & Transfer Gaji Rektor, Dosen, dan Pegawai ({profile.institutionName})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUpdateBankModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Landmark size={14} className="text-emerald-400" />
            <span>🏦 Isi / Ubah Rekening Gaji Saya</span>
          </button>
        </div>
      </div>

      {/* 3 Navigasi Sub-Tab Keuangan */}
      <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-200 dark:bg-slate-800/80 rounded-2xl border border-slate-300 dark:border-slate-700">
        <button
          onClick={() => setActiveFinanceTab('REKENING_KAMPUS')}
          className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeFinanceTab === 'REKENING_KAMPUS' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-white'
          }`}
        >
          <Landmark size={15} />
          <span>1. Nomor Rekening Bank Resmi Kampus</span>
        </button>

        <button
          onClick={() => setActiveFinanceTab('UKT_STUDENTS')}
          className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeFinanceTab === 'UKT_STUDENTS' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-white'
          }`}
        >
          <Receipt size={15} />
          <span>2. Konfirmasi & Verifikasi Transfer UKT</span>
        </button>

        <button
          onClick={() => setActiveFinanceTab('PAYROLL_STAFF')}
          className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeFinanceTab === 'PAYROLL_STAFF' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase size={15} />
          <span>3. Rekening & Transfer Gaji (Rektor, Dosen, Pegawai)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. SUB-TAB: DAFTAR NOMOR REKENING RESMI BANK KAMPUS */}
      {/* ========================================================================= */}
      {activeFinanceTab === 'REKENING_KAMPUS' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Landmark size={18} className="text-emerald-500" />
                <span>Rekening Bank Resmi Penerimaan Pembayaran Biaya Pendidikan</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mahasiswa dapat melakukan transfer dari ATM, Mobile Banking, atau Internet Banking ke salah satu rekening resmi di bawah ini.
              </p>
            </div>

            <button
              onClick={() => setShowUploadProofModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5 hover:scale-105 transition-all"
            >
              <UploadCloud size={14} />
              <span>+ Konfirmasi Transfer / Upload Bukti Bayar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {campusBanks.map((bank, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className={`h-2 absolute top-0 left-0 right-0 bg-gradient-to-r ${bank.logoColor}`} />
                
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-slate-900 dark:text-white">{bank.bankName}</span>
                    <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Aktif
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{bank.branch}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-semibold">Nomor Rekening:</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">{bank.accountNumber}</span>
                    <button
                      onClick={() => handleCopyAccount(bank.accountNumber)}
                      className="p-1 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                      title="Salin Nomor Rekening"
                    >
                      {copiedAccount === bank.accountNumber ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-300 font-bold block pt-1 border-t border-slate-200 dark:border-slate-700">
                    a.n. {bank.accountHolder}
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Peruntukan:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{bank.type.replace(/_/g, ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-TAB: KONFIRMASI & VERIFIKASI PEMBAYARAN UKT MAHASISWA */}
      {/* ========================================================================= */}
      {activeFinanceTab === 'UKT_STUDENTS' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-700">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt size={18} className="text-emerald-500" />
                <span>Daftar Konfirmasi Transfer & Verifikasi Pembayaran UKT</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bagian Keuangan dapat memverifikasi struk/bukti transfer mahasiswa untuk menerbitkan Kuitansi Resmi (e-Receipt).
              </p>
            </div>

            <button
              onClick={() => setShowUploadProofModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition-all"
            >
              <Plus size={14} />
              <span>+ Input Bukti Bayar Mahasiswa</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                <tr>
                  <th className="p-3">ID Transaksi</th>
                  <th className="p-3">Mahasiswa (NIM)</th>
                  <th className="p-3">Rincian Pembayaran</th>
                  <th className="p-3">Nominal Transfer</th>
                  <th className="p-3">Rekening Tujuan Kampus</th>
                  <th className="p-3">Waktu Transfer</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Aksi Keuangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {transactions.map(trx => (
                  <tr key={trx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{trx.id}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 dark:text-white block">{trx.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">NIM: {trx.nim}</span>
                    </td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{trx.item}</td>
                    <td className="p-3 font-black text-emerald-600 font-mono">{trx.amount}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      <span className="font-bold block">{trx.targetBank}</span>
                      <span className="text-[10px] text-slate-400">Dari: {trx.sourceBank}</span>
                    </td>
                    <td className="p-3 text-slate-500">{trx.transferDate}</td>
                    <td className="p-3 text-center">
                      {trx.status === 'PAID' ? (
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          ✓ LUNAS
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 animate-pulse">
                          ⏳ MENUNGGU VERIFIKASI
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {trx.status === 'VERIFYING' ? (
                        <button
                          onClick={() => handleVerifyPayment(trx.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm flex items-center gap-1 mx-auto hover:scale-105 transition-all"
                        >
                          <CheckCircle2 size={12} />
                          <span>Sahkan Lunas</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedReceipt(trx)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold text-[11px] flex items-center gap-1 mx-auto"
                        >
                          <Printer size={12} />
                          <span>Kuitansi PDF</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SUB-TAB: REKENING & MASTER TRANSFER GAJI (REKTOR, DOSEN & PEGAWAI) */}
      {/* ========================================================================= */}
      {activeFinanceTab === 'PAYROLL_STAFF' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-700">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase size={18} className="text-blue-500" />
                <span>Daftar Rekening Bank & Master Penggajian (Rektor, Dosen & Tendik)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rektor, Dosen, dan Pegawai mengisi nomor rekening masing-masing agar Bagian Keuangan dapat mentransfer gaji bulanan secara tepat sasaran.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportPayrollCSV}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <Download size={14} />
                <span>📥 Ekspor Format Transfer Bank (CSV)</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                <tr>
                  <th className="p-3">ID Payroll</th>
                  <th className="p-3">Nama Penerima Gaji</th>
                  <th className="p-3">Peran / Jabatan</th>
                  <th className="p-3">Bank Tujuan Transfer</th>
                  <th className="p-3">Nomor Rekening</th>
                  <th className="p-3">Atas Nama Rekening</th>
                  <th className="p-3 text-right">Gaji Bersih (Transfer)</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Slip Gaji</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {payrollList.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{item.id}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.nipOrNidn}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[9px] font-black rounded-full ${
                        item.role === 'REKTOR' ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' :
                        item.role === 'DOSEN' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' :
                        'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {item.role}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{item.unit}</span>
                    </td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{item.bankName}</td>
                    <td className="p-3 font-mono font-black text-emerald-600 dark:text-emerald-400">{item.accountNumber}</td>
                    <td className="p-3 font-bold text-slate-700 dark:text-slate-300">{item.accountHolder}</td>
                    <td className="p-3 text-right font-black text-emerald-600 font-mono text-sm">
                      Rp {item.netSalary.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        ✓ SUDAH DITRANSFER
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedPayslip(item)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px] flex items-center gap-1 mx-auto"
                      >
                        <FileText size={12} />
                        <span>Slip Gaji PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🏦 MODAL PENGISIAN / PEMUTAKHIRAN REKENING GAJI SAYA */}
      {showUpdateBankModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="text-emerald-500" size={20} />
                <h3 className="font-black text-sm">Formulir Rekening Gaji Pegawai / Dosen</h3>
              </div>
              <button onClick={() => setShowUpdateBankModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMyBank} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap Penerima Gaji:</label>
                <input
                  type="text"
                  required
                  value={myBankForm.name}
                  onChange={(e) => setMyBankForm({ ...myBankForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pilih Bank Penerima Transfer:</label>
                <select
                  value={myBankForm.bankName}
                  onChange={(e) => setMyBankForm({ ...myBankForm, bankName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                >
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="Bank BNI">Bank BNI (Persero)</option>
                  <option value="Bank BRI">Bank BRI (Persero)</option>
                  <option value="Bank BCA">Bank Central Asia (BCA)</option>
                  <option value="Bank BSI (Syariah)">Bank Syariah Indonesia (BSI)</option>
                  <option value="Bank CIMB Niaga">Bank CIMB Niaga</option>
                  <option value="Bank Tabungan Negara (BTN)">Bank BTN</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nomor Rekening Anda: *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 106-00-1234567-8"
                  value={myBankForm.accountNumber}
                  onChange={(e) => setMyBankForm({ ...myBankForm, accountNumber: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-black text-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Atas Nama Rekening (Harus Sesuai Buku Tabungan): *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama sesuai buku tabungan..."
                  value={myBankForm.accountHolder}
                  onChange={(e) => setMyBankForm({ ...myBankForm, accountHolder: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateBankModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Simpan Nomor Rekening Gaji
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📥 MODAL UPLOAD BUKTI TRANSFER MAHASISWA */}
      {showUploadProofModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="text-emerald-500" size={20} />
                <h3 className="font-black text-sm">Konfirmasi Transfer / Upload Bukti Bayar</h3>
              </div>
              <button onClick={() => setShowUploadProofModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadProofSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">NIM Mahasiswa: *</label>
                <input
                  type="text"
                  required
                  value={proofForm.nim}
                  onChange={(e) => setProofForm({ ...proofForm, nim: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Mahasiswa: *</label>
                <input
                  type="text"
                  required
                  value={proofForm.name}
                  onChange={(e) => setProofForm({ ...proofForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rekening Tujuan Kampus yang Ditransfer:</label>
                <select
                  value={proofForm.targetBank}
                  onChange={(e) => setProofForm({ ...proofForm, targetBank: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none"
                >
                  {campusBanks.map((b, i) => (
                    <option key={i} value={`${b.bankName} (${b.accountNumber})`}>
                      {b.bankName} - {b.accountNumber} ({b.accountHolder})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nominal yang Ditransfer (Rupiah): *</label>
                <input
                  type="text"
                  required
                  value={proofForm.amount}
                  onChange={(e) => setProofForm({ ...proofForm, amount: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-black text-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Bank Pengirim / Asal Transfer:</label>
                <input
                  type="text"
                  placeholder="Contoh: BCA Mobile / M-Banking Mandiri"
                  value={proofForm.sourceBank}
                  onChange={(e) => setProofForm({ ...proofForm, sourceBank: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadProofModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Kirim Konfirmasi Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🖨️ MODAL PRINT SLIP GAJI DIGITAL (E-PAYSLIP) */}
      {selectedPayslip && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-black text-sm uppercase">{profile.institutionName}</h3>
                <p className="text-[10px] text-slate-500">SLIP GAJI ELEKTRONIK RESMI (E-PAYSLIP) • PERIODE {selectedPayslip.month}</p>
              </div>
              <button onClick={() => setSelectedPayslip(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px]">Nama Pegawai / Dosen:</span>
                <span className="font-bold">{selectedPayslip.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">NIP / NIDN:</span>
                <span className="font-mono font-bold">{selectedPayslip.nipOrNidn}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Unit / Jabatan:</span>
                <span className="font-medium">{selectedPayslip.unit} ({selectedPayslip.role})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Rekening Bank Tujuan:</span>
                <span className="font-bold text-emerald-700">{selectedPayslip.bankName} - {selectedPayslip.accountNumber}</span>
              </div>
            </div>

            <div className="space-y-1.5 border-t border-slate-200 pt-3">
              <div className="flex justify-between font-bold">
                <span>Gaji Pokok:</span>
                <span>Rp {selectedPayslip.basicSalary.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tunjangan Fungsional & Jabatan:</span>
                <span>Rp {selectedPayslip.allowanceFunctional.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Honor SKS & 16 Sesi BAP Mengajar:</span>
                <span>Rp {selectedPayslip.allowanceTeachingSKS.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Insentif Kinerja & Publikasi:</span>
                <span>Rp {selectedPayslip.allowancePerformance.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-rose-600 pt-1 border-t border-dashed border-slate-200">
                <span>Potongan Pajak PPh 21 & BPJS:</span>
                <span>- Rp {(selectedPayslip.deductionTax + selectedPayslip.deductionBPJS).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-emerald-700 pt-2 border-t-2 border-slate-900">
                <span>TOTAL GAJI DITRANSFER (TAKE HOME PAY):</span>
                <span>Rp {selectedPayslip.netSalary.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                onClick={() => setSelectedPayslip(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md flex items-center gap-1.5"
              >
                <Printer size={14} />
                <span>Cetak Slip Gaji (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🖨️ MODAL PRINT KUITANSI PEMBAYARAN MAHASISWA (E-RECEIPT) */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-xs">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-sm uppercase">{profile.institutionName}</h3>
              <p className="text-[10px] text-slate-500">KUITANSI PEMBAYARAN ELEKTRONIK SAH (E-RECEIPT)</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">No. Bukti:</span>
                <span className="font-mono font-bold">{selectedReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Mahasiswa:</span>
                <span className="font-bold">{selectedReceipt.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">NIM:</span>
                <span className="font-mono font-bold">{selectedReceipt.nim}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Untuk Pembayaran:</span>
                <span className="font-medium">{selectedReceipt.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rekening Tujuan Kampus:</span>
                <span className="font-bold">{selectedReceipt.targetBank}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-emerald-700 pt-2 border-t-2 border-slate-900">
                <span>JUMLAH DITERIMA:</span>
                <span>{selectedReceipt.amount}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-[10px] text-emerald-800 font-bold">
              ✓ Telah diverifikasi oleh Bagian Keuangan Kampus & dinyatakan SAH.
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md flex items-center gap-1.5"
              >
                <Printer size={14} />
                <span>Cetak Kuitansi (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default KeuanganWorkspaceView;
