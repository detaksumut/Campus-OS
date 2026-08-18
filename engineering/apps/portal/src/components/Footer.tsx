import React from 'react';
import { useTenant } from '@campus-os/shared';

export const Footer: React.FC = () => {
  const { profile } = useTenant();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 pt-6 pb-4 border-t border-slate-200 dark:border-slate-800 text-slate-500 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          © {currentYear} {profile.institutionName}. All rights reserved.
        </p>
        <p className="text-[10px] text-slate-400">
          Campus Operating System (Campus OS) v2.0.0
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs font-semibold">
        <a href="#" className="hover:text-blue-600 transition-colors">Kebijakan Privasi</a>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Syarat & Ketentuan</a>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Bantuan</a>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Kontak</a>
      </div>
    </footer>
  );
};
