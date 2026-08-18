import { IApplicationRuntime, ApplicationDto, ApplicationState, EligibilityOutcome, ConditionalRequirement } from '../contracts';
import { EligibilityPolicy } from '../policies/EligibilityPolicy';
import { IEventBus } from '@campus-os/kernel';

export class ApplicationRuntime implements IApplicationRuntime {
  private applications = new Map<string, ApplicationDto>();

  constructor(
    private eligibilityPolicy: EligibilityPolicy,
    private eventBus: IEventBus
  ) {}

  async createDraft(schemeId: string, applicantId: string, membershipId: string): Promise<string> {
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    this.applications.set(applicationId, {
      applicationId, schemeId, applicantId, membershipId,
      state: 'Draft', conditionalRequirements: []
    });
    return applicationId;
  }

  private getOrThrow(applicationId: string): ApplicationDto {
    const a = this.applications.get(applicationId);
    if (!a) throw new Error('Application not found');
    return a;
  }

  async submit(applicationId: string): Promise<void> {
    const a = this.getOrThrow(applicationId);
    this.eligibilityPolicy.validateTransition(a.state, 'Submitted');
    a.state = 'Submitted';
    a.submittedAt = Date.now();
    this.eventBus.emit('certification.application.submitted', { applicationId, schemeId: a.schemeId });
  }

  async beginReview(applicationId: string): Promise<void> {
    const a = this.getOrThrow(applicationId);
    this.eligibilityPolicy.validateTransition(a.state, 'Under Review');
    a.state = 'Under Review';
  }

  async recordEligibility(applicationId: string, outcome: EligibilityOutcome, conditions: ConditionalRequirement[] = []): Promise<void> {
    const a = this.getOrThrow(applicationId);
    this.eligibilityPolicy.validateTransition(a.state, outcome);
    a.state = outcome;
    a.eligibilityOutcome = outcome;
    a.conditionalRequirements = conditions;
    a.decidedAt = Date.now();
    this.eventBus.emit(`certification.application.${outcome.toLowerCase().replace(' ', '-')}`, {
      applicationId, schemeId: a.schemeId, outcome
    });
  }

  async fulfillCondition(applicationId: string, requirementId: string): Promise<void> {
    const a = this.getOrThrow(applicationId);
    const condition = a.conditionalRequirements.find(c => c.requirementId === requirementId);
    if (!condition) throw new Error(`Condition '${requirementId}' not found`);
    if (condition.status === 'Verified') return; // already done
    condition.status = 'Fulfilled';
    condition.fulfilledAt = Date.now();
    this.eventBus.emit('certification.condition.fulfilled', { applicationId, requirementId });
  }

  async verifyCondition(applicationId: string, requirementId: string, verifiedBy: string): Promise<void> {
    const a = this.getOrThrow(applicationId);
    const condition = a.conditionalRequirements.find(c => c.requirementId === requirementId);
    if (!condition) throw new Error(`Condition '${requirementId}' not found`);
    if (condition.status !== 'Fulfilled') throw new Error('Condition must be Fulfilled before Verification');
    condition.status = 'Verified';
    condition.verifiedAt = Date.now();
    condition.verifiedBy = verifiedBy;
    // Promote to Eligible only when all conditions are Verified
    const allVerified = a.conditionalRequirements.every(c => c.status === 'Verified');
    if (allVerified && a.state === 'Conditionally Eligible') {
      a.state = 'Eligible';
      this.eventBus.emit('certification.application.eligible', { applicationId, schemeId: a.schemeId });
    }
  }

  async withdraw(applicationId: string): Promise<void> {
    const a = this.getOrThrow(applicationId);
    this.eligibilityPolicy.validateTransition(a.state, 'Withdrawn');
    a.state = 'Withdrawn';
  }

  async getApplication(applicationId: string): Promise<ApplicationDto | null> {
    return this.applications.get(applicationId) || null;
  }
}
