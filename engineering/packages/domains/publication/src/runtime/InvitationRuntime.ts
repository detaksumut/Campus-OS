import { IInvitationRuntime, InvitationDto, InvitationStatus } from '../contracts';
import { IEventBus } from '@campus-os/kernel';

export const PublicationEvents = {
  InvitationSent: 'publication.invitation.sent',
  InvitationViewed: 'publication.invitation.viewed',
  InvitationAccepted: 'publication.invitation.accepted',
  InvitationDeclined: 'publication.invitation.declined',
  InvitationExpired: 'publication.invitation.expired',
  ReviewRecommendationSubmitted: 'publication.review.recommendation.submitted',
  AssignmentCreated: 'publication.assignment.created',
  AssignmentCancelled: 'publication.assignment.cancelled',
  AssignmentCompleted: 'publication.assignment.completed',
  ReviewRoundOpened: 'publication.round.opened',
  ReviewRoundClosed: 'publication.round.closed',
  EditorialDecisionIssued: 'publication.decision.issued'
};

export class InvitationRuntime implements IInvitationRuntime {
  private invitations = new Map<string, InvitationDto>();

  constructor(private eventBus: IEventBus) {}

  async sendInvitation(submissionId: string, reviewerId: string, roundNumber: number, expiryMs: number): Promise<string> {
    const invitationId = `inv_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const now = Date.now();
    this.invitations.set(invitationId, {
      invitationId, submissionId, reviewerId, roundNumber,
      sentAt: now, expiresAt: now + expiryMs, status: 'Pending'
    });
    this.eventBus.emit(PublicationEvents.InvitationSent, { invitationId, submissionId, reviewerId, roundNumber });
    return invitationId;
  }

  private getOrThrow(invitationId: string): InvitationDto {
    const inv = this.invitations.get(invitationId);
    if (!inv) throw new Error('Invitation not found');
    return inv;
  }

  private assertPending(inv: InvitationDto, target: InvitationStatus): void {
    const allowed: InvitationStatus[] = ['Pending', 'Viewed'];
    if (!allowed.includes(inv.status)) {
      throw new Error(`Cannot move to '${target}': invitation is already '${inv.status}'`);
    }
  }

  async view(invitationId: string): Promise<void> {
    const inv = this.getOrThrow(invitationId);
    if (inv.status !== 'Pending') return; // idempotent
    inv.status = 'Viewed';
    inv.viewedAt = Date.now();
    this.eventBus.emit(PublicationEvents.InvitationViewed, { invitationId, submissionId: inv.submissionId });
  }

  async accept(invitationId: string): Promise<void> {
    const inv = this.getOrThrow(invitationId);
    this.assertPending(inv, 'Accepted');
    inv.status = 'Accepted';
    inv.respondedAt = Date.now();
    this.eventBus.emit(PublicationEvents.InvitationAccepted, { invitationId, submissionId: inv.submissionId, reviewerId: inv.reviewerId });
  }

  async decline(invitationId: string): Promise<void> {
    const inv = this.getOrThrow(invitationId);
    this.assertPending(inv, 'Declined');
    inv.status = 'Declined';
    inv.respondedAt = Date.now();
    this.eventBus.emit(PublicationEvents.InvitationDeclined, { invitationId, submissionId: inv.submissionId });
  }

  async expireStale(): Promise<void> {
    const now = Date.now();
    for (const inv of this.invitations.values()) {
      if ((inv.status === 'Pending' || inv.status === 'Viewed') && inv.expiresAt < now) {
        inv.status = 'Expired';
        this.eventBus.emit(PublicationEvents.InvitationExpired, { invitationId: inv.invitationId });
      }
    }
  }

  async getInvitation(invitationId: string): Promise<InvitationDto | null> {
    return this.invitations.get(invitationId) || null;
  }

  async getBySubmission(submissionId: string): Promise<InvitationDto[]> {
    return Array.from(this.invitations.values()).filter(i => i.submissionId === submissionId);
  }
}
