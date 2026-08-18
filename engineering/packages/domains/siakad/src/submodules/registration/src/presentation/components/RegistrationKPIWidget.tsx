import React from 'react';

export default function RegistrationKPIWidget() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Applicants</div>
        <div className="text-3xl font-black text-slate-800 dark:text-slate-100">1,245</div>
        <div className="text-xs text-green-500 font-medium mt-2">↑ 12% from last month</div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending Approvals</div>
        <div className="text-3xl font-black text-slate-800 dark:text-slate-100">84</div>
        <div className="text-xs text-amber-500 font-medium mt-2">Requires immediate action</div>
      </div>
    </div>
  );
}
