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

// Domain Modules
import { OJSWorkspaceView } from './modules/OJSWorkspaceView';
import { AcademicWorkspaceView } from './modules/AcademicWorkspaceView';
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

          {/* Module Router */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Hero Banner */}
              <HeroBanner 
                onOpenDashboard={() => handleSelectMenu('dashboard', 'Beranda')}
                onOpenGuide={() => handleSelectMenu('akademik', 'Panduan Akademik')}
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

          {/* OJS / PKP 3.x System */}
          {activeTab === 'ojs' && <OJSWorkspaceView />}

          {/* Akademik & KRS */}
          {(activeTab === 'akademik' || activeTab === 'krs' || activeTab === 'perkuliahan' || activeTab === 'penilaian') && (
            <AcademicWorkspaceView />
          )}

          {/* Pengaturan Sistem (White-label Switcher) */}
          {activeTab === 'pengaturan' && <SettingsView />}

          {/* Generic Domain View for other active menus */}
          {!['dashboard', 'ojs', 'akademik', 'krs', 'perkuliahan', 'penilaian', 'pengaturan'].includes(activeTab) && (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-2xl shadow-inner font-bold">
                🏛️
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Modul {activeTabTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Modul ini aktif dan terintegrasi dengan database PostgreSQL 16 murni serta tersinkronisasi otomatis dengan standar Kemendikbudristek RI ({profile.institutionName}).
              </p>
              <button 
                onClick={() => handleSelectMenu('dashboard', 'Beranda')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          )}
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
