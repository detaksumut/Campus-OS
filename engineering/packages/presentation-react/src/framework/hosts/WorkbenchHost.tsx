import React from 'react';
import { globalWorkbenchRegistry } from '../registries/WorkbenchRegistry';
import { globalLayoutRegistry } from '../registries/LayoutRegistry';

export interface WorkbenchHostProps {
  workbenchId: string;
}

export const WorkbenchHost: React.FC<WorkbenchHostProps> = ({ workbenchId }) => {
  const workbench = globalWorkbenchRegistry.get(workbenchId);

  if (!workbench) {
    return <div className="p-8 text-center text-red-500">Workbench '{workbenchId}' not found.</div>;
  }

  const layout = globalLayoutRegistry.get(workbench.defaultLayout);

  if (!layout) {
    return <div className="p-8 text-center text-red-500">Layout '{workbench.defaultLayout}' required by '{workbenchId}' not found.</div>;
  }

  const LayoutComponent = layout.component;

  // The Workbench Host simply mounts the layout required by the workbench.
  // In a more advanced iteration, it could pass down specific props or widget layouts here.
  return <LayoutComponent />;
};
