import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { VerificationPolicy } from '../src/policies/VerificationPolicy';
import { VerificationRuntime } from '../src/runtime/VerificationRuntime';
import { ProfileRuntime } from '../src/runtime/ProfileRuntime';

describe('Membership - Sprint 3.2', () => {
  it('should enforce verification state machine transitions', async () => {
    const bus = new EventBus();
    const policy = new VerificationPolicy();
    const verification = new VerificationRuntime(bus, policy);

    const memId = 'mem_001';
    
    // Initial request sets to Pending -> Submitted
    await verification.requestVerification(memId);
    expect(await verification.getVerificationState(memId)).toBe('Submitted');

    // Submitted -> UnderReview
    await verification.startReview(memId);
    expect(await verification.getVerificationState(memId)).toBe('UnderReview');

    // UnderReview -> Verified
    await verification.approve(memId);
    expect(await verification.getVerificationState(memId)).toBe('Verified');
    expect(await verification.isVerified(memId)).toBe(true);

    // Verified -> Suspended
    await verification.suspend(memId, 'Violation');
    expect(await verification.getVerificationState(memId)).toBe('Suspended');

    // Invalid Transition (Suspended -> Submitted should fail)
    await expect(verification.submitDocuments(memId, ['doc1'])).rejects.toThrow();
  });

  it('should manage tri-part profiles independently', async () => {
    const bus = new EventBus();
    const profile = new ProfileRuntime(bus);
    const memId = 'mem_002';

    await profile.updatePublicProfile(memId, { displayName: 'John Public' });
    await profile.updateAcademicProfile(memId, { institution: 'Campus OS Univ', academicRole: 'Professor' });

    const pub = await profile.getPublicProfile(memId);
    const acad = await profile.getAcademicProfile(memId);
    const priv = await profile.getPrivateProfile(memId);

    expect(pub?.displayName).toBe('John Public');
    expect(acad?.institution).toBe('Campus OS Univ');
    expect(priv).toBeNull(); // Never set
  });
});
