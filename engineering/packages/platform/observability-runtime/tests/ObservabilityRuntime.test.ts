import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { AuditRuntime } from '../src/runtime/AuditRuntime';

describe('Observability Runtime', () => {
  it('should emit Audit.Recorded over EventBus with CorrelationId', async () => {
    const bus = new EventBus();
    const audit = new AuditRuntime(bus);
    
    let caughtEvent: any = null;
    bus.subscribe('Audit.Recorded', (payload) => {
      caughtEvent = payload;
    });

    audit.record({
      actor: 'usr_123',
      action: 'VIEW_DOCUMENT',
      resource: 'doc_999',
      tenant: 'org_001',
      timestamp: Date.now(),
      correlationId: 'corr_888'
    });

    expect(caughtEvent).toBeDefined();
    expect(caughtEvent.correlationId).toBe('corr_888');
  });
});
