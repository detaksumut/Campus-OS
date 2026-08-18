import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { IdentityBindingRuntime } from '../src/runtime/IdentityBindingRuntime';
import { EnrollmentRuntime } from '../src/runtime/EnrollmentRuntime';

describe('Membership - Sprint 3.1', () => {
  it('should run full enrollment workflow', async () => {
    const bus = new EventBus();
    const binding = new IdentityBindingRuntime(bus);
    const enrollment = new EnrollmentRuntime(bus, binding);

    let created = false;
    bus.subscribe('Membership.Created', () => { created = true; });

    const trackId = await enrollment.requestEnrollment({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      type: 'student'
    });

    await enrollment.validateEnrollment(trackId);
    await enrollment.completeEnrollment(trackId, 'kernel_id_999');

    expect(created).toBe(true);
    
    const isBound = await binding.hasBinding('kernel_id_999');
    expect(isBound).toBe(true);
  });
});
