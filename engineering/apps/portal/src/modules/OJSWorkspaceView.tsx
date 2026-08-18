import React, { useState } from 'react';
import { Newspaper, Send, CheckCircle, FileText, Upload, Award, ExternalLink, RefreshCw, Layers } from 'lucide-react';
import { OJSWorkflowEngine, OJSSubmissionArticle, OJSEditorialStage } from '@campus-os/shared';

export const OJSWorkspaceView: React.FC = () => {
  const [articles, setArticles] = useState<OJSSubmissionArticle[]>([
    {
      id: 'sub-101',
      journalTitle: 'Jurnal Teknologi Informasi dan Pariwisata (JTIP)',
      sintaGrade: 'SINTA 2',
      title: 'Implementasi Algoritma Machine Learning untuk Prediksi Kunjungan Wisatawan Berbasis Big Data',
      abstract: 'Penelitian ini mengembangkan model prediktif kunjungan wisatawan menggunakan deep neural network dengan akurasi 94,8%.',
      authors: ['Dr. Hendra Wijaya', 'Siti Rahmawati, M.Kom'],
      currentStage: 'REVIEW',
      similarityScore: 11.2,
      reviewRound: 1,
      reviewersAssigned: ['Prof. Dr. Ir. Budi Santoso (Univ. Indonesia)', 'Dr. Dian Pratama (ITB)'],
      recommendation: 'REVISIONS_REQUIRED'
    },
    {
      id: 'sub-102',
      journalTitle: 'Jurnal Manajemen Perhotelan dan Bisnis (JMPB)',
      sintaGrade: 'SINTA 3',
      title: 'Analisis Service Quality Terhadap Customer Loyalty pada Industri Perhotelan Bintang 5',
      abstract: 'Evaluasi kepuasan pelanggan menggunakan metode Servqual terintegrasi dengan structural equation modeling.',
      authors: ['Agus Salim, M.Par', 'Rina Anggraini'],
      currentStage: 'PRODUCTION',
      doi: '10.31294/jmpb.v10i1.4021',
      similarityScore: 8.5,
      reviewRound: 2,
      reviewersAssigned: ['Dr. Maya Lestari (UNPAD)'],
      recommendation: 'ACCEPT'
    },
    {
      id: 'sub-103',
      journalTitle: 'Jurnal Kuliner Nusantara & Gastronomi',
      sintaGrade: 'SINTA 4',
      title: 'Eksplorasi Gastronomi Tradisional Sebagai Daya Tarik Wisata Kuliner Berkelanjutan',
      abstract: 'Kajian komprehensif kuliner khas nusantara dan standarisasi higienitas berbasis HACCP.',
      authors: ['Chef Bambang Tri', 'Aisyah Putri'],
      currentStage: 'SUBMISSION',
      similarityScore: 14.0,
      reviewRound: 1,
      reviewersAssigned: []
    }
  ]);

  const [activeStageFilter, setActiveStageFilter] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<OJSSubmissionArticle | null>(articles[0]);
  const [showJATSXML, setShowJATSXML] = useState(false);

  const stages: { key: OJSEditorialStage; label: string }[] = [
    { key: 'SUBMISSION', label: '1. Submission' },
    { key: 'REVIEW', label: '2. Peer-Review' },
    { key: 'COPYEDITING', label: '3. Copyediting' },
    { key: 'PRODUCTION', label: '4. Production' },
    { key: 'PUBLISHED', label: '5. Published' },
  ];

  const handleAdvance = (targetStage: OJSEditorialStage) => {
    if (!selectedArticle) return;
    try {
      const updated = OJSWorkflowEngine.advanceStage(selectedArticle, targetStage);
      setArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
      setSelectedArticle(updated);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredArticles = activeStageFilter === 'ALL' 
    ? articles 
    : articles.filter(a => a.currentStage === activeStageFilter);

  return (
    <div className="space-y-6">
      {/* OJS Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Newspaper size={22} className="text-blue-400" />
            <h2 className="text-xl font-black tracking-tight">Public Knowledge Project (PKP) OJS 3.x</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500 rounded-full">Standar ARJUNA Dikti</span>
          </div>
          <p className="text-xs text-blue-200">
            Sistem Manajemen Editorial Jurnal Ilmiah Terakreditasi Nasional & Internasional (SINTA 1 s/d 6 & Crossref DOI)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowJATSXML(!showJATSXML)}
            className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold border border-slate-600 transition-colors"
          >
            {showJATSXML ? 'Tutup XML' : 'Lihat JATS XML'}
          </button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-1.5">
            <Upload size={14} />
            <span>Kirim Naskah Baru</span>
          </button>
        </div>
      </div>

      {/* Stage Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveStageFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeStageFilter === 'ALL' ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          Semua Naskah ({articles.length})
        </button>
        {stages.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveStageFilter(s.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeStageFilter === s.key ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {s.label} ({articles.filter(a => a.currentStage === s.key).length})
          </button>
        ))}
      </div>

      {/* Main Grid: Articles List & Active Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Articles List */}
        <div className="space-y-3 lg:col-span-1">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedArticle?.id === art.id
                  ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {art.sintaGrade}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  {art.currentStage}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 mb-1.5">
                {art.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mb-2">
                {art.authors.join(', ')}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <span>Similarity: <b>{art.similarityScore}%</b></span>
                <span>Ronde: <b>{art.reviewRound}</b></span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Article Workflow Inspector */}
        {selectedArticle && (
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {selectedArticle.journalTitle}
                </span>
                <span className="text-xs font-black text-slate-500 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
                  Akreditasi: {selectedArticle.sintaGrade}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug mb-2">
                {selectedArticle.title}
              </h3>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-4">
                Penulis: {selectedArticle.authors.join(' • ')}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                <p className="font-bold text-slate-900 dark:text-white mb-1">Abstrak:</p>
                {selectedArticle.abstract}
              </div>

              {selectedArticle.doi && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
                  <CheckCircle size={15} />
                  <span>DOI Resmi Terdaftar: <b>https://doi.org/{selectedArticle.doi}</b></span>
                </div>
              )}
            </div>

            {/* Peer-Review Status & Mitra Bestari */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Award size={15} className="text-blue-500" />
                <span>Status Peer-Review (Double-Blind)</span>
              </h4>

              <div className="space-y-1.5 text-xs">
                <p className="text-slate-600 dark:text-slate-400 font-medium">Mitra Bestari Ditugaskan:</p>
                {selectedArticle.reviewersAssigned.length > 0 ? (
                  <ul className="list-disc list-inside text-slate-800 dark:text-slate-200 font-semibold space-y-0.5">
                    {selectedArticle.reviewersAssigned.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                ) : (
                  <p className="text-amber-500 font-semibold">Belum ada reviewer yang ditugaskan.</p>
                )}
              </div>

              {selectedArticle.recommendation && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-xs flex items-center justify-between">
                  <span className="text-slate-500">Rekomendasi Reviewer:</span>
                  <span className="font-black px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-md">
                    {selectedArticle.recommendation}
                  </span>
                </div>
              )}
            </div>

            {/* Stage Transition Action Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-500">Tahap Saat Ini: <b className="text-blue-600">{selectedArticle.currentStage}</b></span>

              <div className="flex items-center gap-2">
                {selectedArticle.currentStage === 'SUBMISSION' && (
                  <button 
                    onClick={() => handleAdvance('REVIEW')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Kirim ke Peer-Review ➔
                  </button>
                )}
                {selectedArticle.currentStage === 'REVIEW' && (
                  <button 
                    onClick={() => handleAdvance('COPYEDITING')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Setujui & Lanjut ke Copyediting ➔
                  </button>
                )}
                {selectedArticle.currentStage === 'COPYEDITING' && (
                  <button 
                    onClick={() => handleAdvance('PRODUCTION')}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Generate Galley & Deposit DOI ➔
                  </button>
                )}
                {selectedArticle.currentStage === 'PRODUCTION' && (
                  <button 
                    onClick={() => handleAdvance('PUBLISHED')}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Publikasikan Terbitan (Issue TOC) 🚀
                  </button>
                )}
                {selectedArticle.currentStage === 'PUBLISHED' && (
                  <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={16} /> Naskah Resmi Terbit di SINTA & OJS
                  </span>
                )}
              </div>
            </div>

            {/* JATS XML Code Block Preview if toggled */}
            {showJATSXML && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-60 custom-scrollbar border border-slate-800">
                <pre>{OJSWorkflowEngine.generateJATSXML(selectedArticle)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
