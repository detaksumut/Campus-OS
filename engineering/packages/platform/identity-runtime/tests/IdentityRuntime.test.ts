import { describe, it, expect, vi } from 'vitest';
import { AuthenticationRuntime } from '../src/AuthenticationRuntime';
import { EventBus } from '@campus-os/kernel';

describe('Identity Runtime - Pipeline', () => {
  it('should process authentication pipeline and publish Identity.Login event', async () => {
    const eventBus = new EventBus();
    const auth = new AuthenticationRuntime(eventBus);
    
    let eventPayload = null;
    eventBus.subscribe('Identity.Login', (payload) => {
      eventPayload = payload;
    });

    const result = await auth.authenticate({ user: 'admin', pass: 'secret' });
    
    expect(result).toBe('usr_123');
    expect(eventPayload).toEqual({ userId: 'usr_123' });
  });
});
