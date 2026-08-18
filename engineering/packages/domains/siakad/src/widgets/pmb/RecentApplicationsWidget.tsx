import React, { useEffect, useState } from 'react';
import { pmbService } from '../../submodules/pmb/src/MockPMBService';
import { AdmissionApplication } from '../../submodules/pmb/src/IPMBEntities';

export const RecentApplicationsWidget: React.FC = () => {
  const [apps, setApps] = useState<AdmissionApplication[]>([]);

  useEffect(() => {
    pmbService.getRecentApplications().then(setApps);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-lg">Pendaftar Terbaru</h3>
        <button className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors">Lihat Semua</button>
      </div>

      <div className="space-y-3">
        {apps.map(app => (
          <div key={app.applicationId} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                {app.applicant.fullName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-700">{app.applicant.fullName}</p>
                <p className="text-xs text-slate-500">{app.applicant.previousSchool}</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className={\`inline-block px-2 py-1 text-[10px] font-bold rounded-full mb-1 \${app.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}\`}>
                {app.paymentStatus}
              </span>
              <p className="text-xs font-semibold text-slate-500">{new Date(app.registrationDate).toLocaleDateString('id-ID')}</p>
            </div>
          </div>
        ))}
        {apps.length === 0 && (
          <div className="py-8 text-center text-slate-400 text-sm">Belum ada pendaftar hari ini</div>
        )}
      </div>
    </div>
  );
};
