import { IAssignmentRuntime, AssignmentDto, AssignmentLifecycle, ReviewRecommendation } from '../contracts';
import { IEventBus } from '@campus-os/kernel';
import { PublicationEvents } from './InvitationRuntime';

export class AssignmentRuntime implements IAssignmentRuntime {
  private assignments = new Map<string, AssignmentDto>();

  private transitions: Record<AssignmentLifecycle, AssignmentLifecycle[]> = {
    'Assigned':          ['Confirmed', 'Cancelled'],
    'Confirmed':         ['In Progress', 'Cancelled'],
    'In Progress':       ['Review Submitted', 'Cancelled'],
    'Review Submitted':  ['Verified', 'Cancelled'],
    'Verified':          ['Completed', 'Cancelled'],
    'Completed':         [],
    'Cancelled':         []
  };

  constructor(private eventBus: IEventBus) {}

  private transition(assignment: AssignmentDto, target: AssignmentLifecycle): void {
    if (!this.transitions[assignment.state].includes(target)) {
      throw new Error(`Invalid assignment transition: '${assignment.state}' → '${target}'`);
    }
    assignment.state = target;
  }

  async createAssignment(submissionId: string, reviewerId: string, invitationId: string, roundNumber: number): Promise<string> {
    const assignmentId = `asgn_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    this.assignments.set(assignmentId, {
      assignmentId, submissionId, reviewerId, invitationId, roundNumber,
      state: 'Assigned', assignedAt: Date.now()
    });
    this.eventBus.emit(PublicationEvents.AssignmentCreated, { assignmentId, submissionId, reviewerId, roundNumber });
    return assignmentId;
  }

  async confirm(assignmentId: string): Promise<void> {
    const a = this.assignments.get(assignmentId);
    if (!a) throw new Error('Assignment not found');
    this.transition(a, 'Confirmed');
  }

  async startReview(assignmentId: string): Promise<void> {
    const a = this.assignments.get(assignmentId);
    if (!a) throw new Error('Assignment not found');
    this.transition(a, 'In Progress');
  }

  async markReviewSubmitted(assignmentId: string): Promise<void> {
    const a = this.assignments.get(assignmentId);
    if (!a) throw new Error('Assignment not found');
    this.transition(a, 'Review Submitted');
  }

  async verify(assignmentId: string): Promise<void> {
    const a = this.assignments.get(assignmentId);
    if (!a) throw new Error('Assignment not found');
    this.transition(a, 'Verified');
  }

  async complete(assignmentId: string, recommendation: ReviewRecommendation): Promise<void> {
    const a = this.assignments.get(assignmentId);
    if (!a) throw new Error('Assignment not found');
    this.transition(a, 'Completed');
    a.recommendation = recommendation;
    this.eventBus.emit(PublicationEvents.ReviewRecommendationSubmitted, {
      assignmentId, submissionId: a.submissionId, reviewerId: a.reviewerId,
      roundNumber: a.roundNumber, recommendation
    });
    this.eventBus.emit(PublicationEvents.AssignmentCompleted, { assignmentId, submissionId: a.submissionId });
  }

  async cancel(assignmentId: string): Promise<void> {
    const a = this.assignments.get(assignmentId);
    if (!a) throw new Error('Assignment not found');
    this.transition(a, 'Cancelled');
    this.eventBus.emit(PublicationEvents.AssignmentCancelled, { assignmentId });
  }

  async getBySubmission(submissionId: string): Promise<AssignmentDto[]> {
    return Array.from(this.assignments.values()).filter(a => a.submissionId === submissionId);
  }

  async getByRound(submissionId: string, roundNumber: number): Promise<AssignmentDto[]> {
    return Array.from(this.assignments.values())
      .filter(a => a.submissionId === submissionId && a.roundNumber === roundNumber);
  }
}
