import React, { useState } from 'react';
import { GraduationCap, BookOpen, CheckCircle, AlertTriangle, Calculator, FileCheck, Layers } from 'lucide-react';
import { KRSSKSLimitEngine, GradeCalculationEngine } from '@campus-os/shared';

export const AcademicWorkspaceView: React.FC = () => {
  const [previousIPS, setPreviousIPS] = useState<number>(3.45);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(['MK-101', 'MK-102', 'MK-103', 'MK-104']);

  const availableCourses = [
    { id: 'MK-101', code: 'UPW-201', name: 'Manajemen Operasional Pariwisata', credits: 4, lecturer: 'Dr. Hendra Wijaya' },
    { id: 'MK-102', code: 'UPW-202', name: 'Perencanaan Destinasi Berkelanjutan', credits: 3, lecturer: 'Siti Rahmawati, M.Par' },
    { id: 'MK-103', code: 'UPW-203', name: 'Pemasaran Pariwisata Digital', credits: 3, lecturer: 'Bambang Tri, M.M' },
    { id: 'MK-104', code: 'UPW-204', name: 'Hukum & Regulasi Pariwisata', credits: 2, lecturer: 'Prof. Budi Santoso' },
    { id: 'MK-105', code: 'MBKM-301', name: 'Magang Industri Bersertifikat (MBKM)', credits: 6, lecturer: 'Tim Kerjasama Industri' },
    { id: 'MK-106', code: 'MKU-105', name: 'Bahasa Asing Terapan (Mandarin/Inggris)', credits: 3, lecturer: 'Li Wei, M.Pd' },
  ];

  const totalCreditsTaken = selectedCourses.reduce((sum, id) => {
    const course = availableCourses.find(c => c.id === id);
    return sum + (course ? course.credits : 0);
  }, 0);

  const krsValidation = KRSSKSLimitEngine.validateKRSSelection(previousIPS, totalCreditsTaken);
  const maxCreditsAllowed = KRSSKSLimitEngine.calculateMaxCredits(previousIPS);

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap size={22} className="text-blue-400" />
            <h2 className="text-xl font-black tracking-tight">Sistem Akademik & Kartu Rencana Studi (KRS)</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500 rounded-full">Standar SN-Dikti</span>
          </div>
          <p className="text-xs text-blue-200">
            Kurikulum Berbasis Capaian Pembelajaran (OBE & MBKM) dengan Validasi Batas Maksimal SKS Otomatis
          </p>
        </div>
      </div>

      {/* SKS Limit Calculator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator size={16} className="text-blue-500" />
            <span>Validasi Regulasi Beban SKS</span>
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              Indeks Prestasi Semester (IPS) Lalu:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0.00"
                max="4.00"
                step="0.05"
                value={previousIPS}
                onChange={(e) => setPreviousIPS(parseFloat(e.target.value) || 0)}
                className="w-24 p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-black text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-xs font-semibold text-slate-500">Skala 4.00</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Batas Maksimal SKS:</span>
              <span className="text-base font-black text-blue-600 dark:text-blue-400">
                {maxCreditsAllowed.maxCredits} SKS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold">{maxCreditsAllowed.predicate}</p>
          </div>

          <div className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
            krsValidation.isValid 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200' 
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-200'
          }`}>
            {krsValidation.isValid ? (
              <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle size={18} className="text-rose-500 shrink-0 mt-0.5" />
            )}
            <p className="text-[11px] font-semibold leading-relaxed">
              {krsValidation.message}
            </p>
          </div>
        </div>

        {/* Course Selection Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen size={16} className="text-blue-500" />
              <span>Daftar Mata Kuliah Semester Ini</span>
            </h3>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Total Diambil: <b className="text-blue-600">{totalCreditsTaken} SKS</b>
            </span>
          </div>

          <div className="space-y-2.5">
            {availableCourses.map(course => {
              const isSelected = selectedCourses.includes(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/50 border-blue-500 shadow-sm'
                      : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                          {course.code}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {course.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Pengampu: {course.lecturer}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-slate-200/70 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    {course.credits} SKS
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <button
              disabled={!krsValidation.isValid}
              onClick={() => alert('KRS Berhasil Disimpan & Dikirim ke Dosen Pembimbing Akademik!')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              <FileCheck size={16} />
              <span>Simpan & Ajukan KRS ke Dosen PA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
