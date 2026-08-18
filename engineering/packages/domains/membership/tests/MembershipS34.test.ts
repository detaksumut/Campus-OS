import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { VerificationPolicy } from '../src/policies/VerificationPolicy';
import { VerificationRuntime } from '../src/runtime/VerificationRuntime';
import { ProfileRuntime } from '../src/runtime/ProfileRuntime';
import { TierRuntime } from '../src/runtime/TierRuntime';
import { DirectoryRuntime } from '../src/runtime/DirectoryRuntime';
import { ProjectionStore } from '../src/runtime/directory/ProjectionStore';
import { SearchIndex } from '../src/runtime/directory/SearchIndex';
import { QueryEngine } from '../src/runtime/directory/QueryEngine';
import { MembershipProfileEvents } from '../src/sdk';

describe('Membership - Sprint 3.4', () => {
  it('should intercept events and update read models', async () => {
    const bus = new EventBus();
    const policy = new VerificationPolicy();
    const profile = new ProfileRuntime(bus);
    const verification = new VerificationRuntime(bus, policy);
    const tier = new TierRuntime(bus);
    
    const store = new ProjectionStore();
    const index = new SearchIndex();
    const engine = new QueryEngine(store, index);
    
    const directory = new DirectoryRuntime(bus, store, index, engine, profile, verification, tier);

    const memId = 'mem_cqrs_01';
    
    // Simulating the trigger of a profile update
    // The EventBus subscription will fire `handleProfileUpdate`
    await profile.updatePublicProfile(memId, { displayName: 'Dr. Query' });
    await profile.updateAcademicProfile(memId, { institution: 'CQRS Univ', academicRole: 'Professor', researchAreas: ['Computer Science'], academicInterests: [], membershipTier: 'Scholar' });
    
    // Explicit trigger since vitest EventBus is mocked/synchronous depending on env
    // We expect the Reviewer Projection to be created
    const reviewer = await directory.query.getReviewerProfile(memId);
    expect(reviewer).not.toBeNull();
    expect(reviewer?.displayName).toBe('Dr. Query');
    expect(reviewer?.metadata.schemaVersion).toBe('1.0');
    expect(reviewer?.researchAreas).toContain('Computer Science');

    // Test Search API
    const results = await directory.query.searchReviewerDirectory({ institution: 'CQRS Univ' });
    expect(results.length).toBe(1);
    expect(results[0].displayName).toBe('Dr. Query');
  });
});
