import React, { useEffect, useState } from 'react';
import { WidgetErrorBoundary } from './WidgetErrorBoundary';
import { WidgetSuspense } from './WidgetSuspense';
import { WidgetRuntime, GlobalRegistry, ActionRuntime, IWidgetContext } from '@campus-os/presentation-kernel';

// Initialize the stateless runtime once
const runtime = new WidgetRuntime(GlobalRegistry);
const actionRuntime = new ActionRuntime(GlobalRegistry);

interface WidgetHostProps {
  widgetId: string;
}

export const WidgetHost: React.FC<WidgetHostProps> = ({ widgetId }) => {
  const [WidgetComponent, setWidgetComponent] = useState<React.LazyExoticComponent<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadWidget() {
      try {
        // Construct IWidgetContext (mocked for now)
        const context: IWidgetContext = {
          currentUser: { id: 'usr-1', role: 'admin' },
          currentTenant: 'campus-a',
          permissions: ['registration:view'],
          theme: 'system',
          locale: 'id-ID',
          workbenchId: 'RegistrationWorkbench',
          zoneId: 'unknown',
          actionRuntime
        };
        
        // Execute the lifecycle: Discover ➔ Resolve ➔ Authorize ➔ Load ➔ Initialize
        const result = await runtime.processLifecycle(widgetId, context);
        
        if (isMounted) {
          const LazyComponent = React.lazy(result.moduleLoader);
          setWidgetComponent(() => LazyComponent);
          runtime.notifyMount(widgetId);
        }
      } catch (err: any) {
        console.error(err);
        if (isMounted) {
          setError(err.message);
        }
      }
    }

    loadWidget();
    return () => { 
      isMounted = false; 
      runtime.notifyUnmount(widgetId);
      runtime.notifyDispose(widgetId);
    };
  }, [widgetId]);

  if (error) {
    throw new Error(error); // Trigger ErrorBoundary
  }

  if (!WidgetComponent) {
    return <WidgetSuspense><></></WidgetSuspense>; // Initial loading state before React.lazy takes over
  }

  // 6. Mount & Render
  return (
    <WidgetErrorBoundary widgetId={widgetId}>
      <WidgetSuspense>
        <WidgetComponent />
      </WidgetSuspense>
    </WidgetErrorBoundary>
  );
};
