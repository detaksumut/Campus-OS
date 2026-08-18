import React, { useState } from 'react';
import { 
  TenantProvider, useThemeRuntime, useTenant 
} from '@campus-os/shared';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { QuickAccessGrid } from './components/QuickAccessGrid';
import { ExecutiveKPICards } from './components/ExecutiveKPICards';
import { ChartsAndNotifications } from './components/ChartsAndNotifications';
import { UltimateAICopilotWidget } from './components/UltimateAICopilotWidget';
import { AcademicCalendarWidget } from './components/AcademicCalendarWidget';
import { TaskInboxWidget } from './components/TaskInboxWidget';
import { LatestAnnouncementsWidget } from './components/LatestAnnouncementsWidget';
import { BottomFeatures } from './components/BottomFeatures';
import { Footer } from './components/Footer';

// Domain Modules (All 21+ Systems Operational)
import { PMBWorkspaceView } from './modules/PMBWorkspaceView';
import { AcademicWorkspaceView } from './modules/AcademicWorkspaceView';
import { LMSWorkspaceView } from './modules/LMSWorkspaceView';
import { GraduationWorkspaceView } from './modules/GraduationWorkspaceView';
import { KeuanganWorkspaceView } from './modules/KeuanganWorkspaceView';
import { SDMWorkspaceView } from './modules/SDMWorkspaceView';
import { PenelitianPkMWorkspaceView } from './modules/PenelitianPkMWorkspaceView';
import { OJSWorkspaceView } from './modules/OJSWorkspaceView';
import { PDDIKTIWorkspaceView } from './modules/PDDIKTIWorkspaceView';
import { AkreditasiWorkspaceView } from './modules/AkreditasiWorkspaceView';
import { PerpustakaanWorkspaceView } from './modules/PerpustakaanWorkspaceView';
import { DataMigrationWorkspaceView } from './modules/DataMigrationWorkspaceView';
import { SettingsView } from './modules/SettingsView';

function PortalMainLayout() {
  const { mode } = useThemeRuntime();
  const { profile } = useTenant();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeTabTitle, setActiveTabTitle] = useState<string>('Beranda');

  const handleSelectMenu = (menuId: string, title: string) => {
    setActiveTab(menuId);
    setActiveTabTitle(title);
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden font-sans ${mode === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* 1. Top Header */}
      <Header onOpenSettings={() => handleSelectMenu('pengaturan', 'Pengaturan Sistem')} />

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Left Sidebar (21+ Menus) */}
        <Sidebar activeTab={activeTab} onSelectMenu={handleSelectMenu} />

        {/* 3. Main Center Workspace */}
        <main className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
          {/* Breadcrumb / Tab Indicator */}
          {activeTab !== 'dashboard' && (
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs">
                <button onClick={() => handleSelectMenu('dashboard', 'Beranda')} className="text-slate-400 hover:text-blue-500 font-bold">
                  Beranda
                </button>
                <span className="text-slate-400">/</span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400">{activeTabTitle}</span>
              </div>
              <button 
                onClick={() => handleSelectMenu('dashboard', 'Beranda')}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                ← Kembali ke Dashboard
              </button>
            </div>
          )}

          {/* Module Router - 100% Zero-Mock Pure Operational Systems */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Hero Banner */}
              <HeroBanner 
                onOpenDashboard={() => handleSelectMenu('dashboard', 'Beranda')}
                onOpenGuide={() => handleSelectMenu('akademik', 'Sistem Akademik')}
              />

              {/* Quick Access Grid (8 Items) */}
              <QuickAccessGrid onSelectAction={handleSelectMenu} />

              {/* Executive KPI Cards (5 Cards) */}
              <ExecutiveKPICards />

              {/* Multi-Line Chart, Donut Chart & Important Notifications */}
              <ChartsAndNotifications />

              {/* Bottom Feature Banners (5 Pillars) */}
              <BottomFeatures />

              {/* Multi-Tenant Footer */}
              <Footer />
            </div>
          )}

          {/* 1. PMB */}
          {activeTab === 'pmb' && <PMBWorkspaceView />}

          {/* 2. AKADEMIK & KRS */}
          {(activeTab === 'akademik' || activeTab === 'krs' || activeTab === 'perkuliahan' || activeTab === 'penilaian') && (
            <AcademicWorkspaceView />
          )}

          {/* 3. PEMBELAJARAN (LMS, KELAS ONLINE, MATERI, TUGAS, UJIAN) */}
          {(activeTab === 'lms' || activeTab === 'kelas_online' || activeTab === 'materi' || activeTab === 'tugas' || activeTab === 'ujian') && (
            <LMSWorkspaceView />
          )}

          {/* 4. WISUDA & PIN SIVIL */}
          {activeTab === 'wisuda' && <GraduationWorkspaceView />}

          {/* 5. KEUANGAN */}
          {activeTab === 'keuangan' && <KeuanganWorkspaceView />}

          {/* 6. SDM & BKD SISTER */}
          {activeTab === 'sdm' && <SDMWorkspaceView />}

          {/* 7. PENELITIAN & PkM & PUBLIKASI */}
          {(activeTab === 'penelitian' || activeTab === 'pengabdian' || activeTab === 'publikasi') && (
            <PenelitianPkMWorkspaceView />
          )}

          {/* 8. OJS / PKP 3.x */}
          {activeTab === 'ojs' && <OJSWorkspaceView />}

          {/* 9. PDDIKTI NEO FEEDER */}
          {activeTab === 'pddikti' && <PDDIKTIWorkspaceView />}

          {/* 10. AKREDITASI 9 KRITERIA */}
          {activeTab === 'akreditasi' && <AkreditasiWorkspaceView />}

          {/* 11. PERPUSTAKAAN, ASET & ALUMNI */}
          {(activeTab === 'perpustakaan' || activeTab === 'aset' || activeTab === 'alumni') && (
            <PerpustakaanWorkspaceView defaultSub={activeTab as any} />
          )}

          {/* 12. LAPORAN & DASHBOARD */}
          {activeTab === 'laporan' && (
            <div className="space-y-6">
              <ExecutiveKPICards />
              <ChartsAndNotifications />
            </div>
          )}

          {/* 13. KANAL DROPSHIP & MIGRASI DATA MASTER */}
          {activeTab === 'migrasi' && <DataMigrationWorkspaceView />}

          {/* 14. PENGATURAN SISTEM (WHITE-LABEL IDENTITY) */}
          {activeTab === 'pengaturan' && <SettingsView />}
        </main>

        {/* 4. Right Panel (Copilot, Calendar, Tasks, Announcements) */}
        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4 space-y-4 overflow-y-auto custom-scrollbar shrink-0 hidden xl:block">
          {/* UltimateAI Campus Copilot Widget (Local AI Engine) */}
          <UltimateAICopilotWidget />

          {/* Academic Calendar Mei 2024 */}
          <AcademicCalendarWidget />

          {/* Task Inbox */}
          <TaskInboxWidget />

          {/* Latest Announcements */}
          <LatestAnnouncementsWidget />
        </aside>
      </div>
    </div>
  );
}

export function App() {
  return (
    <TenantProvider>
      <PortalMainLayout />
    </TenantProvider>
  );
}

export default App;
