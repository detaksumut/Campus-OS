import { ICertificationDecisionRuntime, CertificationDecisionDto, CertificationDecisionType } from '../contracts';
import { IAssessmentRuntime, IApplicationRuntime } from '../contracts';
import { IEventBus } from '@campus-os/kernel';
import { CertificationDomainEvents, CertificationIntegrationEvents } from './CertificationEvents';

export class CertificationDecisionRuntime implements ICertificationDecisionRuntime {
  private decisions = new Map<string, CertificationDecisionDto>();
  private byApplication = new Map<string, string>();

  constructor(
    private assessmentRuntime: IAssessmentRuntime,
    private applicationRuntime: IApplicationRuntime,
    private eventBus: IEventBus
  ) {}

  async issueDecision(
    applicationId: string,
    assessmentId: string,
    schemeId: string,
    decision: CertificationDecisionType,
    reason: string,
    committeeComment: string,
    issuedBy: string
  ): Promise<string> {
    const assessment = await this.assessmentRuntime.getAssessment(assessmentId);
    if (!assessment) throw new Error('Assessment not found');
    if (assessment.state !== 'Completed') throw new Error('Assessment must be completed before issuing a decision');

    const decisionId = `dec_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const dto: CertificationDecisionDto = {
      decisionId, applicationId, assessmentId, schemeId,
      decision, reason, committeeComment, issuedBy,
      issuedAt: Date.now(),
      componentSummary: assessment.componentResults
    };

    this.decisions.set(decisionId, dto);
    this.byApplication.set(applicationId, decisionId);

    // Emit domain event (internal: drives application state transition)
    this.eventBus.emit(CertificationDomainEvents.CertificationDecisionIssued, {
      decisionId, applicationId, decision, schemeId
    });

    // Emit integration event only when Certified (cross-domain: consumed by Awards, Membership)
    if (decision === 'Certified') {
      this.eventBus.emit(CertificationIntegrationEvents.CertificateIssued, {
        decisionId, applicationId, schemeId, issuedAt: dto.issuedAt
      });
    }

    return decisionId;
  }

  async getDecision(decisionId: string): Promise<CertificationDecisionDto | null> {
    return this.decisions.get(decisionId) || null;
  }

  async getByApplication(applicationId: string): Promise<CertificationDecisionDto | null> {
    const id = this.byApplication.get(applicationId);
    return id ? this.getDecision(id) : null;
  }
}
