import { IApplicantRuntime, ApplicantDto, ApplicantProfile, ApplicantLifecycle } from '../contracts';
import { IdentityContext } from '@campus-os/identity/src/contracts';

export class ApplicantRuntime implements IApplicantRuntime {
  private applicants = new Map<string, ApplicantDto>();
  private membershipToApplicant = new Map<string, string>();

  constructor(private membershipLookup: IMembershipLookup) {}

  async createApplicant(membershipId: string, profile: ApplicantProfile): Promise<string> {
    const status = await this.membershipLookup.getMembershipStatus(membershipId);
    if (!status || status.status !== 'Active') {
      throw new Error('Applicant Policy Violation: Membership is not active');
    }
    if (this.membershipToApplicant.has(membershipId)) {
      throw new Error('An applicant already exists for this membership');
    }
    const applicantId = `appl_${Date.now()}`;
    const dto: ApplicantDto = { applicantId, membershipId, profile, lifecycleState: 'Created' };
    this.applicants.set(applicantId, dto);
    this.membershipToApplicant.set(membershipId, applicantId);
    return applicantId;
  }

  async activate(applicantId: string): Promise<void> {
    const a = this.applicants.get(applicantId);
    if (!a) throw new Error('Applicant not found');
    a.lifecycleState = 'Active';
  }

  async archive(applicantId: string): Promise<void> {
    const a = this.applicants.get(applicantId);
    if (!a) throw new Error('Applicant not found');
    a.lifecycleState = 'Archived';
  }

  async getApplicant(applicantId: string): Promise<ApplicantDto | null> {
    return this.applicants.get(applicantId) || null;
  }

  async getApplicantByMembership(membershipId: string): Promise<ApplicantDto | null> {
    const id = this.membershipToApplicant.get(membershipId);
    return id ? this.getApplicant(id) : null;
  }
}
