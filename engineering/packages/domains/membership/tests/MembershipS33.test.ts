import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { VerificationPolicy } from '../src/policies/VerificationPolicy';
import { VerificationRuntime } from '../src/runtime/VerificationRuntime';
import { ProfileRuntime } from '../src/runtime/ProfileRuntime';
import { TierRuntime } from '../src/runtime/TierRuntime';
import { DigitalCardRuntime } from '../src/runtime/DigitalCardRuntime';
import { PublicDirectoryProjection } from '../src/projections/PublicDirectoryProjection';

describe('Membership - Sprint 3.3', () => {
  it('should compose digital card dynamically', async () => {
    const bus = new EventBus();
    const policy = new VerificationPolicy();
    
    const verification = new VerificationRuntime(bus, policy);
    const profile = new ProfileRuntime(bus);
    const tier = new TierRuntime(bus);
    const card = new DigitalCardRuntime(profile, verification, tier);

    const memId = 'mem_scholar_01';
    
    // Seed State
    await profile.updatePublicProfile(memId, { displayName: 'Dr. Scholar' });
    await tier.assignTier(memId, 'scholar');
    
    // Verify DTO Composition
    const generated = await card.generateCard(memId, 'Scholar');
    expect(generated.displayName).toBe('Dr. Scholar');
    expect(generated.tierName).toBe('Scholar');
    expect(generated.template).toBe('Scholar');
    expect(generated.qrPayload).toContain('https://verify.campus.os/card_mem_scholar_01');
  });

  it('should project directory entry without exposing entities', async () => {
    const bus = new EventBus();
    const policy = new VerificationPolicy();
    
    const verification = new VerificationRuntime(bus, policy);
    const profile = new ProfileRuntime(bus);
    const tier = new TierRuntime(bus);
    const directory = new PublicDirectoryProjection(profile, verification, tier);

    const memId = 'mem_public_01';
    await profile.updatePublicProfile(memId, { displayName: 'Jane' });
    await profile.updateAcademicProfile(memId, { institution: 'MIT', academicRole: 'Student', researchAreas: [], academicInterests: [], membershipTier: 'Base' });
    await verification.requestVerification(memId);
    
    const entry = await directory.getDirectoryEntry(memId);
    expect(entry?.displayName).toBe('Jane');
    expect(entry?.institution).toBe('MIT');
    expect(entry?.isVerified).toBe(false);
  });
});
