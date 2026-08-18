import React, { Suspense, lazy } from 'react';
import { WidgetService } from '@campus-os/presentation-core';

// Error Boundary for Widget Isolation
class WidgetErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div className="widget-error">Failed to load widget</div>;
    return this.props.children;
  }
}

// Global Widget Service Injection (Configured at root)
let globalWidgetService: WidgetService;
export const setWidgetService = (ws: WidgetService) => { globalWidgetService = ws; };

export const ReactWidgetRuntime: React.FC<{ widgetId: string }> = ({ widgetId }) => {
  const compiledWidget = globalWidgetService?.resolve(widgetId);

  if (!compiledWidget) {
    return <div className="widget-missing">Widget {widgetId} not found in ABI</div>;
  }

  // Lazy load the actual Domain React Component via the ABI path resolution
  const DomainWidget = lazy(() => import(compiledWidget.modulePath));

  return (
    <WidgetErrorBoundary>
      <Suspense fallback={<div className="widget-loading">Loading {widgetId}...</div>}>
        <DomainWidget {...compiledWidget.defaultProps} />
      </Suspense>
    </WidgetErrorBoundary>
  );
};
