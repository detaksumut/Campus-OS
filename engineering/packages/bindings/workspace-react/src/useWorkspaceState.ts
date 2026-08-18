import { useState, useEffect } from 'react';
import { WorkspaceState, Workbench } from '@campus-os/workspace-runtime';
import { IEventBus } from '@campus-os/kernel';
import { WorkspaceEvents } from '@campus-os/workspace-runtime';

export function useWorkspaceState(state: WorkspaceState, eventBus: IEventBus): Workbench {
  const [workbench, setWorkbench] = useState<Workbench>(state.getWorkbench());

  useEffect(() => {
    // Listen to kernel events to trigger React re-renders
    // This keeps the business logic in the Runtime, and React only reacts.
    const subId = eventBus.subscribe(WorkspaceEvents.LayoutChanged, () => {
      setWorkbench({ ...state.getWorkbench() });
    });

    return () => {
      eventBus.unsubscribe(subId);
    };
  }, [state, eventBus]);

  return workbench;
}
