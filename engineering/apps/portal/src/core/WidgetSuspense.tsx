import React, { Suspense, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const WidgetSuspense: React.FC<Props> = ({ children }) => {
  return (
    <Suspense fallback={
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center min-h-[100px] animate-pulse">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xs text-slate-400 font-medium tracking-wide">LOADING WIDGET...</div>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
};
