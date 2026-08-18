import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BookOpen, Settings, Bell, Search, Bot, X, Package, Code2, Boxes } from 'lucide-react';
import { useCopilotRuntime, useThemeRuntime, useWorkspaceRuntime, MenuRegistry } from '@campus-os/shared';
import { bootstrap } from './bootstrap';
import { ZoneRenderer } from './core/ZoneRenderer';
import { KernelDevTools } from './core/KernelDevTools';

// In a real app, this would be injected via PluginLoader
import { RegistrationPluginABI } from '../../../packages/domains/siakad/src/submodules/registration/src/presentation/plugin';
import { PresentationCompiler, GlobalRegistry, RegistryBuilder } from '@campus-os/presentation-kernel';

// Compile and Register the ABI once on load
const compiler = new PresentationCompiler();
const certifiedABI = compiler.compile(RegistrationPluginABI);
const builder = new RegistryBuilder(GlobalRegistry);
builder.buildFromABI(certifiedABI);

// Initialize registries
bootstrap();

const IconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings
};

export function App() {
  const { mode, primaryColor } = useThemeRuntime();
  const { isOpen, messages, togglePanel } = useCopilotRuntime();
  const { tabs, activeTabId, addTab, setActiveTab, closeTab } = useWorkspaceRuntime();
  const [showDevTools, setShowDevTools] = useState(false);

  // Get menus for current user's capabilities (mocked capabilities)
  const myCapabilities = ['core.dashboard', 'academic.student.view', 'academic.curriculum.view'];
  const menus = MenuRegistry.getMenusForCapabilities(myCapabilities);

  // Initialize a default tab if none exists
  useEffect(() => {
    if (tabs.length === 0) {
      addTab({ id: 'dashboard', title: 'Dashboard Eksekutif', component: 'DashboardView' });
      addTab({ id: 'workbench', title: 'Workbench Preview', component: 'WorkbenchView' });
    }
  }, [tabs, addTab]);

  return (
    <div className={`flex h-screen overflow-hidden font-sans ${mode === 'dark' ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar (Registry Driven) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col transition-all">
        <div className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: primaryColor }}>C</div>
          <div>
            <h1 className="font-bold text-sm tracking-wide">Campus OS</h1>
            <p className="text-xs text-slate-400">Integrated Digital Campus</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 mb-2 uppercase px-3 tracking-wider">Akses Menu</div>
          {menus.map(menu => {
            const Icon = menu.icon ? IconMap[menu.icon] || Settings : Settings;
            const isActive = activeTabId === menu.id;
            return (
              <button 
                key={menu.id}
                onClick={() => addTab({ id: menu.id, title: menu.label, component: menu.path || 'DefaultView' })}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <Icon size={18} /> {menu.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-950 border-b dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg w-96 border border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-slate-950 transition-all shadow-inner">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Cari menu, data, mahasiswa..." className="bg-transparent border-none outline-none ml-2 w-full text-sm dark:text-white" />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 relative transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-slate-950 shadow-sm">5</span>
            </button>
            <button onClick={togglePanel} className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              <Bot size={20} />
            </button>
            <button onClick={() => setShowDevTools(!showDevTools)} className={`p-2 rounded-full transition-colors ${showDevTools ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              <Code2 size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 p-1.5 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-sm">PD</div>
              <div className="text-sm hidden md:block">
                <p className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">Pak Direktur</p>
                <p className="text-[11px] text-slate-500 font-medium">Direktur</p>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Runtime (Tabs) */}
        <div className="flex px-4 pt-2 gap-1 bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-800 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-t border-l border-r transition-all ${
                activeTabId === tab.id 
                ? 'bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 border-slate-200 dark:border-slate-800 shadow-[0_2px_0_0_white] dark:shadow-[0_2px_0_0_#020617] z-10' 
                : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700'
              }`}
            >
              {tab.title}
              <div 
                onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                className="hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5 ml-1 transition-colors"
              >
                <X size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* Workspace Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900 flex flex-col">
           {activeTabId === 'dashboard' ? (
             <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex-1 flex flex-col">
                <div className="rounded-2xl text-white mb-8 shadow-lg relative overflow-hidden flex-1 group min-h-[300px]">
                  {/* Hero Background */}
                  <img 
                    src="/hero-campuos.png" 
                    alt="Campus OS Hero" 
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent z-10" />
                  
                  <div className="relative z-20 h-full flex flex-col justify-center p-8">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md font-mono">
                      Welcome to CampuOS <span className="text-blue-500">Byru</span>
                    </h2>
                    <p className="text-blue-100 text-lg font-medium opacity-90 drop-shadow-sm">Enterprise Digital Campus • Registry Driven UI</p>
                  </div>
                  <div className="absolute right-0 top-0 opacity-20 transform translate-x-1/4 -translate-y-1/4 z-10">
                    <LayoutDashboard size={300} className="text-white" />
                  </div>
                </div>

                {/* Dashboard Widgets (Registry Driven Mock) */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 shrink-0 mt-auto">
                  {['Mahasiswa Aktif', 'Dosen Aktif', 'Kelas Aktif', 'Tingkat Kelulusan'].map((title, i) => (
                    <div key={i} className="bg-white dark:bg-slate-950 p-6 rounded-2xl border dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-2">{title}</div>
                      <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        {i === 0 ? '2.860' : i === 1 ? '185' : i === 2 ? '124' : '92.45%'}
                      </div>
                    </div>
                  ))}
                </div>
             </div>
           ) : activeTabId === 'workbench' ? (
             <div className="flex-1 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border dark:border-slate-800 shadow-sm flex flex-col gap-6 h-full">
                 <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2"><Boxes className="text-blue-500" /> Registry-Driven Workbench Engine</h2>
                 <p className="text-sm text-slate-500">This view dynamically renders zones based on the <strong>RegistrationPluginABI</strong> manifest without hardcoding any widgets.</p>
                 
                 {/* Render Zones Dynamically from Registry */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                   <div className="lg:col-span-3">
                     <ZoneRenderer zoneId="RegistrationWorkbench:hero" zoneConfig={GlobalRegistry.zone.get('RegistrationWorkbench:hero')} />
                   </div>
                   <div className="lg:col-span-3">
                     <ZoneRenderer zoneId="RegistrationWorkbench:kpi" zoneConfig={GlobalRegistry.zone.get('RegistrationWorkbench:kpi')} />
                   </div>
                   <div className="lg:col-span-2">
                     <ZoneRenderer zoneId="RegistrationWorkbench:main" zoneConfig={GlobalRegistry.zone.get('RegistrationWorkbench:main')} />
                   </div>
                   <div className="lg:col-span-1">
                     <ZoneRenderer zoneId="RegistrationWorkbench:sidebar" zoneConfig={GlobalRegistry.zone.get('RegistrationWorkbench:sidebar')} />
                   </div>
                 </div>
               </div>
             </div>
           ) : (
             <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500 animate-in zoom-in-95 duration-200">
               <div className="text-center">
                 <Settings size={48} className="mx-auto mb-4 opacity-50" />
                 <h2 className="text-lg font-medium">Workspace Component for '{activeTabId}'</h2>
                 <p className="text-sm">Loaded dynamically from Registry</p>
               </div>
             </div>
           )}
        </div>

        {showDevTools && (
          <div className="h-80 shrink-0 border-t border-slate-200 dark:border-slate-800 bg-slate-950 flex flex-col z-20">
            <KernelDevTools />
          </div>
        )}
      </main>

      {/* Copilot Runtime Panel */}
      {isOpen && (
        <aside className="w-80 bg-white dark:bg-slate-950 border-l dark:border-slate-800 flex flex-col shadow-2xl z-20 animate-in slide-in-from-right duration-300">
          <div className="p-4 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Bot size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight dark:text-slate-200">UltimateAI</h3>
                <p className="text-[11px] text-slate-500 font-medium">Campus Copilot Engine</p>
              </div>
            </div>
            <button onClick={togglePanel} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800">
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto bg-slate-50/30 dark:bg-slate-900/30 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`p-3 rounded-xl shadow-sm text-sm border dark:border-slate-800 leading-relaxed ${
                msg.role === 'assistant' 
                ? 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 rounded-tl-sm' 
                : 'bg-blue-600 text-white rounded-tr-sm ml-4'
              }`}>
                {msg.content}
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-white dark:bg-slate-950 border-t dark:border-slate-800">
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 px-3 py-2.5 rounded-xl border border-transparent focus-within:border-blue-500 shadow-inner transition-all">
              <input type="text" placeholder="Tanya Copilot..." className="bg-transparent border-none outline-none w-full text-sm dark:text-white" />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
