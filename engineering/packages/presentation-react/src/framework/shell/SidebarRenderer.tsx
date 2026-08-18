import React from 'react';
import { globalNavigationRegistry } from '../registries/NavigationRegistry';

export const SidebarRenderer: React.FC = () => {
  const nodes = globalNavigationRegistry.getNodes();

  return (
    <aside className="w-64 bg-brand-dark text-slate-300 h-full flex flex-col">
      <div className="p-4 flex items-center gap-3 border-b border-slate-700/50">
        <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
          C
        </div>
        <div>
          <div className="font-bold text-white text-lg leading-tight">Campus OS</div>
          <div className="text-xs text-slate-400">Integrated Digital Campus</div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {nodes.map(group => (
          <div key={group.id}>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {group.label}
            </h3>
            {group.children && (
              <ul className="space-y-1">
                {group.children.map(child => (
                  <li key={child.id}>
                    <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors text-sm flex items-center gap-3">
                      <span className="w-4 h-4 bg-slate-600 rounded-sm opacity-50"></span>
                      {child.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-700/50">
        <button className="flex items-center gap-2 text-sm hover:text-white transition-colors">
          <span>🌙</span> Dark Mode
        </button>
      </div>
    </aside>
  );
};
