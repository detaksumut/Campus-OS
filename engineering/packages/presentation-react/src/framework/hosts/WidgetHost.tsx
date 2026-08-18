import React from 'react';
import { globalWidgetRegistry } from '../registries/WidgetRegistry';

export interface WidgetHostProps {
  id: string;
  className?: string;
}

export const WidgetHost: React.FC<WidgetHostProps> = ({ id, className }) => {
  const widget = globalWidgetRegistry.get(id);

  if (!widget) {
    return <div className="p-4 border border-dashed border-red-500 text-red-500 bg-red-50">Widget '{id}' not found in registry.</div>;
  }

  // TODO: Add Capability and Permission checks here based on User Session

  const WidgetComponent = widget.component;

  return (
    <div className={`widget-host ${className || ''}`} data-widget-id={id}>
      <WidgetComponent />
    </div>
  );
};
