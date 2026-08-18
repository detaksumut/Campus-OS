import React, { useState } from 'react';
import { DollarSign, CheckCircle2, Clock, CreditCard, ArrowDownRight, ArrowUpRight, Search, Download } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

export const KeuanganWorkspaceView: React.FC = () => {
  const { profile } = useTenant();

  const transactions = [
    { id: 'trx-01', nim: '210101042', name: 'Rangga Pratama', item: 'Pembayaran UKT Semester Genap 2023/2024', amount: 'Rp 4.500.000', method: 'BSI Virtual Account', date: 'Hari ini, 10:15', status: 'PAID' },
    { id: 'trx-02', nim: '220102018', name: 'Nabila Syahrini', item: 'Pembayaran UKT Semester Genap 2023/2024', amount: 'Rp 4.500.000', method: 'Mandiri Virtual Account', date: 'Hari ini, 09:40', status: 'PAID' },
    { id: 'trx-03', nim: '230103009', name: 'Bagas Aditya', item: 'Biaya Praktikum Laboratorium Kuliner', amount: 'Rp 1.250.000', method: 'BNI Virtual Account', date: 'Kemarin, 14:20', status: 'PAID' },
    { id: 'trx-04', nim: '200101015', name: 'Dewi Anjani', item: 'Biaya Pendaftaran Wisuda & Ijazah', amount: 'Rp 1.500.000', method: 'BCA Virtual Account', date: 'Kemarin, 11:30', status: 'PAID' },
  ];

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

        <button className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-500/30 flex items-center gap-1.5 transition-all">
          <Download size={14} />
          <span>Export Rekapitulasi Pembayaran</span>
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Tagihan Semester</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">Rp 12,87 M</p>
          <span className="text-[10px] font-bold text-slate-400">2.860 Mahasiswa</span>
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
          <span className="text-[10px] font-bold text-blue-600">480 Penerima</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard size={16} className="text-teal-500" />
          <span>Mutasi Transaksi Pembayaran Mahasiswa Terkini</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 font-bold">NIM</th>
                <th className="p-3 font-bold">Nama Mahasiswa</th>
                <th className="p-3 font-bold">Uraian Pembayaran</th>
                <th className="p-3 font-bold text-right">Nominal</th>
                <th className="p-3 font-bold">Kanal Pembayaran</th>
                <th className="p-3 font-bold">Waktu Transaksi</th>
                <th className="p-3 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {transactions.map(trx => (
                <tr key={trx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{trx.nim}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{trx.name}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300 font-medium">{trx.item}</td>
                  <td className="p-3 font-black text-right text-emerald-600 dark:text-emerald-400">{trx.amount}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300 font-semibold">{trx.method}</td>
                  <td className="p-3 text-slate-500 font-medium">{trx.date}</td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1">
                      <CheckCircle2 size={11} /> LUNAS
                    </span>
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
