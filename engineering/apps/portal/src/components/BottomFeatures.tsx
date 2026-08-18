import React from 'react';
import { Layers, ShieldCheck, Activity, BrainCircuit, Smartphone } from 'lucide-react';

export const BottomFeatures: React.FC = () => {
  const features = [
    {
      title: 'Terintegrasi',
      desc: 'Semua data dan proses terintegrasi dalam satu platform terpusat.',
      icon: Layers,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Aman & Andal',
      desc: 'Keamanan data berlapis dengan backup otomatis dan disaster recovery.',
      icon: ShieldCheck,
      color: 'from-sky-600 to-blue-700'
    },
    {
      title: 'Real-Time',
      desc: 'Data real-time untuk pengambilan keputusan yang cepat dan tepat.',
      icon: Activity,
      color: 'from-teal-600 to-emerald-600'
    },
    {
      title: 'AI-Powered',
      desc: 'Didukung AI untuk analisis cerdas, prediksi, dan rekomendasi strategis.',
      icon: BrainCircuit,
      color: 'from-purple-600 to-indigo-700'
    },
    {
      title: 'Mobile Friendly',
      desc: 'Akses sistem kapan saja dan di mana saja melalui perangkat mobile.',
      icon: Smartphone,
      color: 'from-blue-700 to-cyan-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
      {features.map((feat, idx) => {
        const Icon = feat.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-lg text-white flex flex-col justify-between hover:border-blue-500/50 transition-all group"
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform`}>
              <Icon size={18} className="text-white" />
            </div>

            <div>
              <h5 className="font-extrabold text-xs text-white mb-1 tracking-wide">
                {feat.title}
              </h5>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
