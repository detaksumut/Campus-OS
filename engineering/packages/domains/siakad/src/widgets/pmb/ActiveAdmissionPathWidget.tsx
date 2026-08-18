import React, { useEffect, useState } from 'react';
import { pmbService } from '../../submodules/pmb/src/MockPMBService';
import { AdmissionPeriod } from '../../submodules/pmb/src/IPMBEntities';

export const ActiveAdmissionPathWidget: React.FC = () => {
  const [periods, setPeriods] = useState<AdmissionPeriod[]>([]);

  useEffect(() => {
    pmbService.getActivePeriods().then(setPeriods);
  }, []);

  if (periods.length === 0) return null;

  const activePeriod = periods[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Jalur Penerimaan Aktif</h3>
          <p className="text-sm text-slate-500">{activePeriod.name}</p>
        </div>
        <button className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors">Kelola Jalur</button>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2">
        {activePeriod.paths.map(path => (
          <div key={path.pathId} className="group flex flex-col p-4 border border-slate-100 rounded-lg hover:border-brand-primary/30 hover:bg-slate-50/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-md mb-2">{path.code}</span>
                <h4 className="font-bold text-slate-700">{path.name}</h4>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{path.selectionType}</span>
            </div>
            
            <div className="flex justify-between items-end mt-auto pt-3 border-t border-slate-100/50">
              <div>
                <p className="text-xs text-slate-400">Target Kuota</p>
                <p className="font-bold text-slate-600">{path.quota} Kursi</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Biaya Pendaftaran</p>
                <p className="font-bold text-emerald-600">
                  {path.feeEstimation === 0 ? 'Gratis' : `Rp ${path.feeEstimation.toLocaleString('id-ID')}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
