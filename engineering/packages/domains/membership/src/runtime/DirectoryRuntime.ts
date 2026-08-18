import { IEventBus, EventEnvelope } from '@campus-os/kernel';
import { IDirectoryManagement, IDirectoryQuery } from '../../contracts';
import { MembershipProfileEvents, MembershipWorkflowEvents } from '../../sdk';
import { ProjectionStore } from './ProjectionStore';
import { SearchIndex } from './SearchIndex';
import { QueryEngine } from './QueryEngine';
import { IProfileRuntime, IVerificationRuntime, ITierRuntime } from '../../contracts';

export class DirectoryRuntime implements IDirectoryManagement {
  public query: IDirectoryQuery;
  
  constructor(
    private eventBus: IEventBus,
    private store: ProjectionStore,
    private index: SearchIndex,
    queryEngine: QueryEngine,
    // Required for rebuilding index from source of truth
    private profile: IProfileRuntime,
    private verification: IVerificationRuntime,
    private tier: ITierRuntime
  ) {
    this.query = queryEngine;
    this.subscribeToEvents();
  }

  private subscribeToEvents() {
    this.eventBus.subscribe(MembershipProfileEvents.ProfileUpdated, async (env: EventEnvelope<any>) => {
      await this.handleProfileUpdate(env.payload.membershipId, env.metadata.eventId);
    });
    this.eventBus.subscribe(MembershipProfileEvents.AcademicProfileUpdated, async (env: EventEnvelope<any>) => {
      await this.handleProfileUpdate(env.payload.membershipId, env.metadata.eventId);
    });
    this.eventBus.subscribe(MembershipWorkflowEvents.Verified, async (env: EventEnvelope<any>) => {
      await this.handleProfileUpdate(env.payload.membershipId, env.metadata.eventId);
    });
  }

  private async handleProfileUpdate(membershipId: string, eventId: string) {
    // Generate new projection from source of truth
    const pub = await this.profile.getPublicProfile(membershipId);
    const acad = await this.profile.getAcademicProfile(membershipId);
    const vState = await this.verification.isVerified(membershipId);
    const t = await this.tier.getTier(membershipId);

    if (pub) {
      const metadata = {
        projectionVersion: 1,
        schemaVersion: '1.0',
        generatedAt: Date.now(),
        generatedFromEventId: eventId
      };

      await this.store.savePublic({
        metadata,
        membershipId,
        displayName: pub.displayName,
        avatarUrl: pub.avatarUrl,
        institution: acad?.institution || 'Unknown',
        tier: t?.name || 'Base',
        isVerified: vState
      });

      if (acad && acad.researchAreas.length > 0) {
        await this.store.saveReviewer({
          metadata,
          membershipId,
          displayName: pub.displayName,
          institution: acad.institution,
          researchAreas: acad.researchAreas,
          academicRole: acad.academicRole,
          tier: t?.name || 'Base',
          isVerified: vState
        });
      }
    }
  }

  async rebuildIndex(): Promise<void> {
    await this.store.clear();
    await this.index.rebuild();
    // Replay logic goes here
  }

  async clearCache(): Promise<void> {
    // Clear transient cache in query engine if it existed
  }
}
