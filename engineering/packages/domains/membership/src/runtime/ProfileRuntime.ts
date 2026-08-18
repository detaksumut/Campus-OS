import { IEventBus } from '@campus-os/kernel';
import { IProfileRuntime, IPublicProfile, IPrivateProfile, IAcademicProfile, IPreferences } from '../contracts';
import { MembershipProfileEvents } from '../sdk';

export class ProfileRuntime implements IProfileRuntime {
  private publicProfiles = new Map<string, IPublicProfile>();
  private privateProfiles = new Map<string, IPrivateProfile>();
  private academicProfiles = new Map<string, IAcademicProfile>();
  private preferences = new Map<string, IPreferences>();

  constructor(private eventBus: IEventBus) {}

  async getPublicProfile(membershipId: string): Promise<IPublicProfile | null> {
    return this.publicProfiles.get(membershipId) || null;
  }

  async getPrivateProfile(membershipId: string): Promise<IPrivateProfile | null> {
    return this.privateProfiles.get(membershipId) || null;
  }

  async getAcademicProfile(membershipId: string): Promise<IAcademicProfile | null> {
    return this.academicProfiles.get(membershipId) || null;
  }

  async getPreferences(membershipId: string): Promise<IPreferences | null> {
    return this.preferences.get(membershipId) || null;
  }

  async updatePublicProfile(membershipId: string, profile: Partial<IPublicProfile>): Promise<void> {
    const existing = this.publicProfiles.get(membershipId) || { id: membershipId, displayName: '' };
    this.publicProfiles.set(membershipId, { ...existing, ...profile });
    await this.eventBus.publish(MembershipProfileEvents.ProfileUpdated, { membershipId, type: 'Public' });
  }

  async updatePrivateProfile(membershipId: string, profile: Partial<IPrivateProfile>): Promise<void> {
    const existing = this.privateProfiles.get(membershipId) || { id: membershipId, legalName: '' };
    this.privateProfiles.set(membershipId, { ...existing, ...profile });
    await this.eventBus.publish(MembershipProfileEvents.ProfileUpdated, { membershipId, type: 'Private' });
  }

  async updateAcademicProfile(membershipId: string, profile: Partial<IAcademicProfile>): Promise<void> {
    const existing = this.academicProfiles.get(membershipId) || { id: membershipId, institution: '', academicRole: '', researchAreas: [], academicInterests: [], membershipTier: 'Base' };
    this.academicProfiles.set(membershipId, { ...existing, ...profile });
    await this.eventBus.publish(MembershipProfileEvents.AcademicProfileUpdated, { membershipId });
  }

  async updatePreferences(membershipId: string, preferences: Partial<IPreferences>): Promise<void> {
    const existing = this.preferences.get(membershipId) || { id: membershipId, language: 'en', timezone: 'UTC', notificationsEnabled: true };
    this.preferences.set(membershipId, { ...existing, ...preferences });
    await this.eventBus.publish(MembershipProfileEvents.PreferencesUpdated, { membershipId });
  }
}
