import React, { useState } from 'react';
import { 
  TenantProvider, useThemeRuntime, useTenant 
} from '@campus-os/shared';
import { Header, UserRole } from './components/Header';
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

// Landing Page & SSO Gateway Screen
import { HeroLandingPage } from './components/HeroLandingPage';
import { SSOGatewayScreen } from './components/SSOGatewayScreen';

// Role-Specific Workspaces & Dashboards
import { LecturerDashboardView } from './modules/dashboards/LecturerDashboardView';
import { StudentDashboardView } from './modules/dashboards/StudentDashboardView';
import { StaffDashboardView } from './modules/dashboards/StaffDashboardView';
import { RectorDashboardView } from './modules/dashboards/RectorDashboardView';
import { FoundationDashboardView } from './modules/dashboards/FoundationDashboardView';
import { DashboardCustomizerModal } from './modules/dashboards/DashboardCustomizerModal';

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('ADMIN');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeTabTitle, setActiveTabTitle] = useState<string>('Beranda');
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSelectMenu = (menuId: string, title: string) => {
    setActiveTab(menuId);
    setActiveTabTitle(title);
    if (typeof window !== 'undefined') {
      window.location.hash = `#/${menuId}`;
    }
  };

  React.useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash && hash !== '') {
        setActiveTab(hash);
      } else {
        setActiveTab('dashboard');
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  // 🌟 JIKA STATUS LOGOUT -> RENDER HERO LANDING PAGE KAMPUS DAHULU (KLIK LOGIN UNTUK SSO)
  if (!isLoggedIn) {
    if (!showLoginModal) {
      return (
        <HeroLandingPage
          onOpenLogin={() => setShowLoginModal(true)}
        />
      );
    }

    return (
      <SSOGatewayScreen
        onBackToHero={() => setShowLoginModal(false)}
        onLoginSuccess={(role) => {
          setUserRole(role);
          setIsLoggedIn(true);
          setShowLoginModal(false);
          setActiveTab('dashboard');
          setActiveTabTitle('Beranda');
        }}
      />
    );
  }

  return (
    <div className={`flex flex-col h-screen overflow-hidden font-sans ${mode === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* 1. Top Header with 6-Role Switcher & Logout */}
      <Header 
        userRole={userRole} 
        onChangeRole={setUserRole} 
        onOpenSettings={() => handleSelectMenu('pengaturan', 'Pengaturan Sistem')} 
        onLogout={() => setIsLoggedIn(false)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Left Sidebar (Dynamic RBAC Filtered) */}
        <Sidebar 
          userRole={userRole} 
          activeTab={activeTab} 
          onSelectMenu={handleSelectMenu} 
        />

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

          {/* 🌟 DASHBOARD DINAMIS SESUAI PERAN PENGGUNA SSO */}
          {activeTab === 'dashboard' && (
            <>
              {/* 1. JIKA ROLE REKTOR / DIREKTUR -> RENDER DASHBOARD EKSEKUTIF REKTOR & WAREK 1-4 */}
              {userRole === 'REKTOR' && (
                <RectorDashboardView 
                  onNavigate={handleSelectMenu}
                  onOpenCustomizer={() => setShowCustomizer(true)}
                />
              )}

              {/* 2. JIKA ROLE DOSEN -> RENDER DASHBOARD DOSEN (KONTRAK SKS BKD, 16 SESI BAP, APPROVAL KRS) */}
              {userRole === 'DOSEN' && (
                <LecturerDashboardView 
                  onNavigate={handleSelectMenu}
                  onOpenCustomizer={() => setShowCustomizer(true)}
                />
              )}

              {/* 3. JIKA ROLE MAHASISWA -> RENDER DASHBOARD MAHASISWA (STATUS SKS, KRS, JADWAL KULIAH, UKT, TUGAS) */}
              {userRole === 'MAHASISWA' && (
                <StudentDashboardView 
                  onNavigate={handleSelectMenu}
                  onOpenCustomizer={() => setShowCustomizer(true)}
                />
              )}

              {/* 4. JIKA ROLE PEGAWAI / TENDIK -> RENDER DASHBOARD PEGAWAI (PRESENSI, LOKET BAAK, SIMAK-BMN) */}
              {userRole === 'PEGAWAI' && (
                <StaffDashboardView 
                  onNavigate={handleSelectMenu}
                  onOpenCustomizer={() => setShowCustomizer(true)}
                />
              )}

              {/* 5. JIKA ROLE PENGURUS YAYASAN -> RENDER DASHBOARD YAYASAN (VALUASI ASET, KAS, TREN PMB) */}
              {userRole === 'YAYASAN' && (
                <FoundationDashboardView 
                  onNavigate={handleSelectMenu}
                  onOpenCustomizer={() => setShowCustomizer(true)}
                />
              )}

              {/* 6. JIKA ROLE ADMINISTRATOR (SUPER ADMIN) -> RENDER KONSOL ADMIN PUSAT */}
              {userRole === 'ADMIN' && (
                <div className="space-y-6">
                  {/* Hero Banner */}
                  <HeroBanner 
                    onOpenDashboard={() => handleSelectMenu('dashboard', 'Beranda')}
                    onOpenGuide={() => handleSelectMenu('migrasi', 'Dropship & Migrasi Data')}
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
            </>
          )}

          {/* 1. PMB (PENERIMAAN MAHASISWA BARU) */}
          {activeTab === 'pmb' && <PMBWorkspaceView />}

          {/* 2. SISTEM AKADEMIK (KURIKULUM OBE & MATA KULIAH) */}
          {activeTab === 'akademik' && <AcademicWorkspaceView defaultSubTab="KURIKULUM_OBE" />}

          {/* 2b. KONTRAK PERKULIAHAN & RPS SESI 1 */}
          {activeTab === 'kontrak_kuliah' && <AcademicWorkspaceView defaultSubTab="KONTRAK_KULIAH" />}

          {/* 3. KARTU RENCANA STUDI (KRS & BATAS SKS) */}
          {activeTab === 'krs' && <AcademicWorkspaceView defaultSubTab="KRS_PORTAL" />}

          {/* 4. PERKULIAHAN & 16 SESI BAP DIGITAL */}
          {activeTab === 'perkuliahan' && <AcademicWorkspaceView defaultSubTab="JADWAL_KELAS" />}

          {/* 5. UJIAN ONLINE (CBT) */}
          {activeTab === 'ujian' && <LMSWorkspaceView defaultSub="ujian" />}

          {/* 6. PENILAIAN & BOBOT MUTU KHS */}
          {activeTab === 'penilaian' && <AcademicWorkspaceView defaultSubTab="PENILAIAN_KHS" />}

          {/* 7. PEMBELAJARAN LMS (E-LEARNING, KELAS ONLINE, MATERI, TUGAS) */}
          {(activeTab === 'lms' || activeTab === 'kelas_online' || activeTab === 'materi' || activeTab === 'tugas') && (
            <LMSWorkspaceView defaultSub={activeTab as any} />
          )}

          {/* 8. WISUDA & PIN SIVIL */}
          {activeTab === 'wisuda' && <GraduationWorkspaceView />}

          {/* 9. KEUANGAN (UKT & VIRTUAL ACCOUNT) */}
          {activeTab === 'keuangan' && <KeuanganWorkspaceView />}

          {/* 10. SDM & BKD SISTER */}
          {activeTab === 'sdm' && <SDMWorkspaceView />}

          {/* 11a. PENELITIAN LPPM */}
          {activeTab === 'penelitian' && (
            <PenelitianPkMWorkspaceView defaultSubTab="PENELITIAN" />
          )}

          {/* 11b. PENGABDIAN MASYARAKAT (PkM) */}
          {activeTab === 'pengabdian' && (
            <PenelitianPkMWorkspaceView defaultSubTab="PENGABDIAN" />
          )}

          {/* 11c. PUBLIKASI SINTA & HKI */}
          {activeTab === 'publikasi' && (
            <PenelitianPkMWorkspaceView defaultSubTab="PUBLIKASI" />
          )}

          {/* 12. JURNAL OJS / PKP 3.x */}
          {activeTab === 'ojs' && <OJSWorkspaceView />}

          {/* 13. DROPSHIP & PENYESUAIAN DATA MASTER (ADMIN, REKTOR & YAYASAN FULL ACCESS) */}
          {activeTab === 'migrasi' && (
            ['ADMIN', 'REKTOR', 'YAYASAN'].includes(userRole) ? (
              <DataMigrationWorkspaceView />
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4 max-w-lg mx-auto mt-12 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 mx-auto flex items-center justify-center text-2xl font-black">
                  🔒
                </div>
                <div>
                  <h3 className="text-lg font-black">Akses Terbatas: Konsol Administrator (Backend)</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Kanal Ingestion Dropship & Migrasi Data hanya dapat dikelola oleh Administrator BAAK / IT Pusat setelah login SSO dengan peran Admin.
                  </p>
                </div>
                <button 
                  onClick={() => handleSelectMenu('dashboard', 'Beranda')} 
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  Kembali ke Dashboard Utama
                </button>
              </div>
            )
          )}

          {/* 14. PDDIKTI NEO FEEDER */}
          {activeTab === 'pddikti' && <PDDIKTIWorkspaceView />}

          {/* 15. AKREDITASI 9 KRITERIA */}
          {activeTab === 'akreditasi' && <AkreditasiWorkspaceView />}

          {/* 16. PERPUSTAKAAN, ASET & ALUMNI */}
          {(activeTab === 'perpustakaan' || activeTab === 'aset' || activeTab === 'alumni') && (
            <PerpustakaanWorkspaceView defaultSub={activeTab as any} userRole={userRole} />
          )}

          {/* 17. LAPORAN & DASHBOARD */}
          {activeTab === 'laporan' && (
            <div className="space-y-6">
              <ExecutiveKPICards />
              <ChartsAndNotifications />
            </div>
          )}

          {/* 18. PENGATURAN SISTEM (WHITE-LABEL IDENTITY) */}
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

      {/* 5. MODAL ADMINISTRATOR DASHBOARD CUSTOMIZER */}
      <DashboardCustomizerModal
        currentRole={userRole}
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
      />
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
