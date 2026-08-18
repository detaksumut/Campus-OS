import React from 'react';
import { SidebarRenderer } from './SidebarRenderer';
import { GlobalHeader } from './GlobalHeader';
import { WorkbenchHost } from '../hosts/WorkbenchHost';

export interface CampusShellProps {
  currentWorkbenchId: string;
}

export const CampusShell: React.FC<CampusShellProps> = ({ currentWorkbenchId }) => {
  return (
    <div className="flex h-screen w-full bg-brand-bg overflow-hidden font-sans">
      <SidebarRenderer />
      
      <div className="flex-1 flex flex-col min-w-0">
        <GlobalHeader />
        
        <main className="flex-1 overflow-auto p-6">
          <WorkbenchHost workbenchId={currentWorkbenchId} />
        </main>
      </div>
    </div>
  );
};
