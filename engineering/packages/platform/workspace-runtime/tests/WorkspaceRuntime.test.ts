import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { SelectionManager } from '../src/SelectionManager';
import { WorkspaceEvents } from '../src/WorkspaceEvents';

describe('Workspace Runtime - Pure TS', () => {
  it('should publish SelectionChanged event when selecting a window', async () => {
    const eventBus = new EventBus();
    const selection = new SelectionManager(eventBus);
    
    let eventPayload: any = null;
    eventBus.subscribe(WorkspaceEvents.SelectionChanged, (payload) => {
      eventPayload = payload;
    });

    await selection.selectWindow('win_123');
    
    expect(eventPayload).toBeDefined();
    expect(eventPayload.window).toBe('win_123');
  });
});
