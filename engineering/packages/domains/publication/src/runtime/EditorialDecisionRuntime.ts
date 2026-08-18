import { IEditorialDecisionRuntime, EditorialDecisionDto, EditorialDecisionType, ReviewRecommendationType } from '../contracts';
import { IEventBus } from '@campus-os/kernel';
import { IReviewRoundRuntime, IAssignmentRuntime } from '../contracts';
import { ISubmissionRuntime } from '../contracts';
import { SubmissionPolicy } from '../policies/SubmissionPolicy';
import { PublicationEvents } from './InvitationRuntime';

export class EditorialDecisionRuntime implements IEditorialDecisionRuntime {
  private decisions = new Map<string, EditorialDecisionDto>();

  constructor(
    private eventBus: IEventBus,
    private roundRuntime: IReviewRoundRuntime,
    private assignmentRuntime: IAssignmentRuntime,
    private submissionRuntime: ISubmissionRuntime,
    private submissionPolicy: SubmissionPolicy
  ) {}

  async issueDecision(
    submissionId: string,
    roundId: string,
    editorId: string,
    decision: EditorialDecisionType,
    reason: string,
    editorComment: string
  ): Promise<string> {
    const round = await this.roundRuntime.getRound(roundId);
    if (!round) throw new Error('Review round not found');

    // Collect reviewer recommendations for the audit trail
    const assignments = await this.assignmentRuntime.getBySubmission(submissionId);
    const roundAssignments = assignments.filter(a => a.roundNumber === round.roundNumber && a.recommendation);
    const recommendationSummary: ReviewRecommendationType[] = roundAssignments
      .map(a => a.recommendation!.type);

    const decisionId = `decision_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const dto: EditorialDecisionDto = {
      decisionId, submissionId, roundId, editorId,
      decision, reason, editorComment, recommendationSummary,
      issuedAt: Date.now()
    };

    this.decisions.set(decisionId, dto);

    // Mark the round as in Editorial Decision state
    await this.roundRuntime.recordDecision(roundId, decision === 'Accept' ? 'None' : decision as any);

    // Emit event — SubmissionRuntime listens and calls policy-guarded state transition
    this.eventBus.emit(PublicationEvents.EditorialDecisionIssued, {
      decisionId, submissionId, decision, roundId
    });

    return decisionId;
  }

  async getDecision(decisionId: string): Promise<EditorialDecisionDto | null> {
    return this.decisions.get(decisionId) || null;
  }

  async getBySubmission(submissionId: string): Promise<EditorialDecisionDto[]> {
    return Array.from(this.decisions.values()).filter(d => d.submissionId === submissionId);
  }
}
