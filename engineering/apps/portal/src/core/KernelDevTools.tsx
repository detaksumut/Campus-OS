import React, { useEffect, useState } from 'react';
import { KernelEventBus, KernelEvent } from '../../../../packages/presentation-kernel/src/runtime/KernelEventBus';
import { GlobalRegistry } from '../../../../packages/presentation-kernel/src/registry/PresentationRegistry';
import { RuntimeController } from '../../../../packages/presentation-kernel/src/runtime/RuntimeController';
import { WidgetRuntime } from '../../../../packages/presentation-kernel/src/runtime/WidgetRuntime';
import { Activity, Clock, Box, ShieldAlert, Cpu, HardDrive } from 'lucide-react';

const bus = KernelEventBus.getInstance();
const runtime = new WidgetRuntime(GlobalRegistry);
const controller = new RuntimeController(GlobalRegistry, runtime);

export const KernelDevTools: React.FC = () => {
  const [events, setEvents] = useState<KernelEvent[]>([]);
  const [metrics, setMetrics] = useState({
    activeWidgets: 0,
    failedWidgets: 0,
    registrySize: 0,
    mounted: 0
  });

  useEffect(() => {
    // Initial sync
    setEvents([...bus.getHistory()]);
    updateMetrics();

    // Subscribe to all future events (Observer Pattern)
    const unsubscribe = bus.subscribe((event) => {
      setEvents(prev => [...prev, event].slice(-100)); // Keep last 100 for UI performance
      updateMetrics();
    });

    return unsubscribe;
  }, []);

  const updateMetrics = () => {
    const history = bus.getHistory();
    const mounted = history.filter(e => e.type === 'WidgetMounted').length;
    const unmounted = history.filter(e => e.type === 'WidgetUnmounted').length;
    const errors = history.filter(e => e.type === 'WidgetError').length;
    
    setMetrics({
      activeWidgets: mounted - unmounted,
      failedWidgets: errors,
      mounted,
      registrySize: GlobalRegistry.widget.size + GlobalRegistry.action.size + GlobalRegistry.zone.size
    });
  };

  const handleCrashTest = () => {
    // Simulate an isolated crash by emitting a fake error
    // In a real scenario, this would be an actual component throwing, which ErrorBoundary catches.
    // For demo purposes, we trigger an event so DevTools registers it.
    bus.emit('WidgetError', 'WidgetHost', { widgetId: 'RegistrationHeroWidget', error: 'Simulated Crash for Isolation Test' });
    alert('Simulated Crash event dispatched. Check the timeline.');
  };

  const handleHotReload = () => {
    controller.reloadWidget('RegistrationKPIWidget');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 font-mono text-sm border-l border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between shadow-md">
        <h2 className="font-bold text-blue-400 flex items-center gap-2">
          <Activity size={18} /> Presentation OS DevTools
        </h2>
        <div className="flex gap-2">
          <button onClick={handleCrashTest} className="px-3 py-1 bg-red-900/50 hover:bg-red-800 text-red-200 rounded text-xs border border-red-800 transition-colors">
            Test Crash Isolation
          </button>
          <button onClick={handleHotReload} className="px-3 py-1 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded text-xs border border-blue-800 transition-colors">
            Hot Reload KPI
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel: Metrics & Health */}
        <div className="w-full md:w-1/3 border-r border-slate-800 p-4 overflow-y-auto bg-slate-900/50">
          <h3 className="text-xs uppercase text-slate-500 font-bold mb-4 tracking-widest">Runtime Health</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 shadow-inner">
              <div className="text-slate-500 mb-1 flex items-center gap-2"><Box size={14}/> Active</div>
              <div className="text-2xl font-bold text-white">{metrics.activeWidgets}</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 shadow-inner">
              <div className="text-slate-500 mb-1 flex items-center gap-2"><ShieldAlert size={14}/> Failed</div>
              <div className="text-2xl font-bold text-red-400">{metrics.failedWidgets}</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 shadow-inner">
              <div className="text-slate-500 mb-1 flex items-center gap-2"><HardDrive size={14}/> Registry</div>
              <div className="text-2xl font-bold text-blue-400">{metrics.registrySize} items</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 shadow-inner">
              <div className="text-slate-500 mb-1 flex items-center gap-2"><Cpu size={14}/> ABI Version</div>
              <div className="text-sm font-bold text-emerald-400 mt-2">v1.0.0 (Negotiated)</div>
            </div>
          </div>

          <h3 className="text-xs uppercase text-slate-500 font-bold mb-4 tracking-widest mt-8">Provider Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-800">
              <span className="text-slate-300">LocalProvider</span>
              <span className="px-2 py-0.5 bg-emerald-900 text-emerald-300 text-[10px] rounded uppercase font-bold">Loaded</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-800">
              <span className="text-slate-500">RemoteProvider</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-[10px] rounded uppercase font-bold">Idle</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-800">
              <span className="text-slate-500">MarketplaceProvider</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-[10px] rounded uppercase font-bold">Unavailable</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Event Timeline */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-xs uppercase text-slate-500 font-bold mb-4 tracking-widest flex items-center gap-2">
            <Clock size={14} /> Event Timeline ({events.length})
          </h3>
          <div className="space-y-2">
            {[...events].reverse().map(e => (
              <div key={e.id} className="flex gap-4 p-2 hover:bg-slate-900 rounded transition-colors group">
                <div className="text-slate-600 w-24 shrink-0 mt-0.5">
                  {new Date(e.timestamp).toISOString().split('T')[1].substring(0, 12)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      e.type.includes('Error') ? 'bg-red-900/50 text-red-400' :
                      e.type.includes('Audit') ? 'bg-purple-900/50 text-purple-400' :
                      e.type.includes('Reload') ? 'bg-amber-900/50 text-amber-400' :
                      'bg-blue-900/50 text-blue-400'
                    }`}>
                      {e.type}
                    </span>
                    <span className="text-xs text-slate-500">{e.source}</span>
                  </div>
                  <pre className="text-xs text-slate-400 bg-slate-950 p-2 rounded overflow-x-auto opacity-70 group-hover:opacity-100 transition-opacity border border-slate-900 group-hover:border-slate-800">
                    {JSON.stringify(e.payload, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="text-slate-600 italic text-center mt-10">Listening for kernel events...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
