import React, { useEffect, useState } from 'react';
import { pmbService } from '../../submodules/pmb/src/MockPMBService';
import { AdmissionPeriod } from '../../submodules/pmb/src/IPMBEntities';

export const PMBStatsWidget: React.FC = () => {
  const [periods, setPeriods] = useState<AdmissionPeriod[]>([]);

  useEffect(() => {
    pmbService.getActivePeriods().then(setPeriods);
  }, []);

  const totalQuota = periods.reduce((sum, period) => {
    return sum + period.paths.reduce((pSum, path) => pSum + path.quota, 0);
  }, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Statistik Penerimaan</h3>
        <div className="p-2 bg-brand-primary/10 rounded-lg">
          <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-slate-50 pb-4">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Total Gelombang Aktif</p>
            <p className="text-3xl font-black text-brand-primary">{periods.length}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-end border-b border-slate-50 pb-4">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Total Kuota Disediakan</p>
            <p className="text-3xl font-black text-brand-secondary">{totalQuota.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Pendaftar Masuk (Real-time)</p>
            <p className="text-3xl font-black text-emerald-500">1,402</p>
          </div>
        </div>
      </div>
    </div>
  );
};
