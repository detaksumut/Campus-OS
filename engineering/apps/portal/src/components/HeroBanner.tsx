import React, { useState } from 'react';
import { BarChart2, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTenant } from '@campus-os/shared';

interface HeroBannerProps {
  onOpenDashboard?: () => void;
  onOpenGuide?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenDashboard, onOpenGuide }) => {
  const { profile } = useTenant();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Campus Operating System (Campus OS)',
      institution: profile.institutionName,
      slogan: 'Satu Platform • Satu Database • Satu Workflow',
      desc: 'Integrated Digital Campus from Admission to Graduation',
      bgImg: '/hero-campuos.png'
    },
    {
      title: 'Akreditasi & Integrasi PDDIKTI Terpadu',
      institution: 'SINKRONISASI NEO FEEDER OTOMATIS',
      slogan: 'Standar 9 Kriteria BAN-PT & LAM',
      desc: 'Pelaporan data akademik real-time langsung ke Kemendikbudristek RI',
      bgImg: '/hero-campuos.png'
    },
    {
      title: 'LMS & Ujian Online Berbasis CBT',
      institution: 'E-LEARNING & COMPUTER BASED TEST',
      slogan: 'Interaktif • Akurat • Anti-Kecurangan',
      desc: 'Mendukung pembelajaran fleksibel dan penilaian formatif otomatis',
      bgImg: '/hero-campuos.png'
    }
  ];

  const current = slides[activeSlide % slides.length];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 text-white min-h-[300px] flex flex-col justify-between p-8 group">
      {/* 100% Full Brightness & Crystal Clear Campus Photo (No Black Bias) */}
      <img 
        src={current.bgImg} 
        alt="Campus Hero" 
        className="absolute inset-0 w-full h-full object-cover object-center opacity-100 group-hover:scale-105 transition-transform duration-1000 z-0"
      />
      {/* Subtle, crystal clear glass gradient just enough for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-900/25 to-transparent z-10" />

      {/* Hero Content with Crisp Drop Shadows */}
      <div className="relative z-20 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        <p className="text-xs font-black text-blue-300 tracking-wider uppercase mb-1 drop-shadow-md">
          Welcome to
        </p>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-1 drop-shadow-lg">
          {current.title}
        </h2>
        <h3 className="text-base md:text-lg font-extrabold text-blue-200 mb-3 tracking-wide drop-shadow-md">
          {current.institution}
        </h3>
        <p className="text-xs font-bold text-white mb-1 drop-shadow-md">
          {current.slogan}
        </p>
        <p className="text-[11px] text-slate-100 font-semibold mb-6 drop-shadow-md">
          {current.desc}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenDashboard}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-blue-600/30 transition-all hover:translate-y-[-1px]"
          >
            <BarChart2 size={15} />
            <span>Dashboard Eksekutif</span>
          </button>
          <button 
            onClick={onOpenGuide}
            className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/90 border border-slate-600/60 text-slate-200 px-5 py-2.5 rounded-xl font-bold text-xs backdrop-blur-md transition-all hover:text-white"
          >
            <BookOpen size={15} />
            <span>Lihat Panduan Sistem</span>
          </button>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="relative z-20 flex items-center justify-between pt-4 mt-2">
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                activeSlide === idx ? 'w-6 bg-blue-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <button 
            onClick={() => setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
