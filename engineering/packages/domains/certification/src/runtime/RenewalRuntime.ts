import { IEventBus } from '@campus-os/kernel';
import { ICertificateRuntime } from './CertificateRuntime';
import { PrerequisiteEngine, EligibilityContext } from '../policies/PrerequisiteEngine';
import { ISchemeRuntime } from '../contracts';
import { CertificationIntegrationEvents } from './CertificationEvents';

export type RenewalState =
  | 'Eligible'
  | 'Reminder Sent'
  | 'Renewal Submitted'
  | 'Renewal Review'
  | 'Renewed'
  | 'Lapsed';

export interface RenewalRecord {
  renewalId: string;
  previousCertificateId: string;
  newCertificateId?: string;
  holderId: string;
  membershipId: string;
  schemeId: string;
  state: RenewalState;
  submittedAt?: number;
  renewedAt?: number;
}

export interface IRenewalRuntime {
  initiateRenewal(previousCertificateId: string, holderId: string, membershipId: string, schemeId: string): Promise<string>;
  sendReminder(renewalId: string): Promise<void>;
  submitRenewal(renewalId: string): Promise<void>;
  beginRenewalReview(renewalId: string): Promise<void>;
  approveRenewal(renewalId: string, issuedBy: string): Promise<string>;
  lapse(renewalId: string): Promise<void>;
  getRenewal(renewalId: string): Promise<RenewalRecord | null>;
}

export class RenewalRuntime implements IRenewalRuntime {
  private renewals = new Map<string, RenewalRecord>();

  constructor(
    private certificateRuntime: ICertificateRuntime,
    private schemeRuntime: ISchemeRuntime,
    private prerequisiteEngine: PrerequisiteEngine,
    private eventBus: IEventBus
  ) {}

  async initiateRenewal(previousCertificateId: string, holderId: string, membershipId: string, schemeId: string): Promise<string> {
    const prev = await this.certificateRuntime.getCertificate(previousCertificateId);
    if (!prev || prev.state !== 'Issued') throw new Error('Only an Issued certificate can be renewed');

    // Verify renewal prerequisites (re-uses the same PrerequisiteEngine)
    const scheme = await this.schemeRuntime.getScheme(schemeId);
    if (!scheme) throw new Error('Scheme not found');

    const ctx: EligibilityContext = {
      membershipId, applicantId: holderId,
      applicationId: previousCertificateId, schemeId
    };
    const report = await this.prerequisiteEngine.evaluate(scheme.renewalPolicy.prerequisites, ctx);
    if (!report.overallPassed) {
      throw new Error('Renewal prerequisites not met');
    }

    const renewalId = `renew_${Date.now()}`;
    this.renewals.set(renewalId, {
      renewalId, previousCertificateId, holderId, membershipId, schemeId, state: 'Eligible'
    });
    return renewalId;
  }

  private getOrThrow(renewalId: string): RenewalRecord {
    const r = this.renewals.get(renewalId);
    if (!r) throw new Error('Renewal record not found');
    return r;
  }

  async sendReminder(renewalId: string): Promise<void> {
    const r = this.getOrThrow(renewalId);
    if (r.state !== 'Eligible') throw new Error(`Cannot send reminder from state '${r.state}'`);
    r.state = 'Reminder Sent';
  }

  async submitRenewal(renewalId: string): Promise<void> {
    const r = this.getOrThrow(renewalId);
    if (!['Eligible', 'Reminder Sent'].includes(r.state)) throw new Error(`Cannot submit from state '${r.state}'`);
    r.state = 'Renewal Submitted';
    r.submittedAt = Date.now();
  }

  async beginRenewalReview(renewalId: string): Promise<void> {
    const r = this.getOrThrow(renewalId);
    if (r.state !== 'Renewal Submitted') throw new Error(`Cannot begin review from state '${r.state}'`);
    r.state = 'Renewal Review';
  }

  async approveRenewal(renewalId: string, issuedBy: string): Promise<string> {
    const r = this.getOrThrow(renewalId);
    if (r.state !== 'Renewal Review') throw new Error(`Cannot approve from state '${r.state}'`);

    const scheme = await this.schemeRuntime.getScheme(r.schemeId);
    if (!scheme) throw new Error('Scheme not found');

    // Create NEW certificate — never mutate the old one. History is preserved.
    const newCertId = await this.certificateRuntime.initiate(
      r.holderId, r.membershipId, r.schemeId,
      `renewal_${renewalId}`, scheme.renewalPolicy.validityMonths,
      r.previousCertificateId   // links version chain
    );
    await this.certificateRuntime.generate(newCertId);
    await this.certificateRuntime.sign(newCertId, `sig_renewal_${Date.now()}`);
    await this.certificateRuntime.issue(newCertId);

    r.newCertificateId = newCertId;
    r.state = 'Renewed';
    r.renewedAt = Date.now();

    this.eventBus.emit(CertificationIntegrationEvents.CertificateRenewed, {
      renewalId, previousCertificateId: r.previousCertificateId,
      newCertificateId: newCertId, holderId: r.holderId, schemeId: r.schemeId
    });

    return newCertId;
  }

  async lapse(renewalId: string): Promise<void> {
    const r = this.getOrThrow(renewalId);
    r.state = 'Lapsed';
  }

  async getRenewal(renewalId: string): Promise<RenewalRecord | null> {
    return this.renewals.get(renewalId) || null;
  }
}
