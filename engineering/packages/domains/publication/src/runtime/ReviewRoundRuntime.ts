import { IReviewRoundRuntime, ReviewRoundDto, ReviewRoundLifecycle, RevisionType, SuggestedReviewer } from '../contracts';
import { IEventBus } from '@campus-os/kernel';
import { PublicationEvents } from './InvitationRuntime';

export class ReviewRoundRuntime implements IReviewRoundRuntime {
  private rounds = new Map<string, ReviewRoundDto>();

  private transitions: Record<ReviewRoundLifecycle, ReviewRoundLifecycle[]> = {
    'Open':                ['Collecting Reviews'],
    'Collecting Reviews':  ['Closed'],
    'Closed':              ['Editorial Decision'],
    'Editorial Decision':  ['Completed'],
    'Completed':           []
  };

  constructor(private eventBus: IEventBus) {}

  async openRound(submissionId: string, suggestedReviewers: SuggestedReviewer[] = []): Promise<string> {
    const existing = await this.getBySubmission(submissionId);
    const roundNumber = existing.length + 1;
    const roundId = `round_${submissionId}_${roundNumber}`;

    this.rounds.set(roundId, {
      roundId, submissionId, roundNumber,
      state: 'Open', openedAt: Date.now(),
      revisionType: 'None', suggestedReviewers,
      assignmentIds: [], reviewIds: []
    });

    this.eventBus.emit(PublicationEvents.ReviewRoundOpened, { roundId, submissionId, roundNumber });
    return roundId;
  }

  private transition(round: ReviewRoundDto, target: ReviewRoundLifecycle): void {
    if (!this.transitions[round.state].includes(target)) {
      throw new Error(`Invalid round transition: '${round.state}' → '${target}'`);
    }
    round.state = target;
  }

  async addAssignment(roundId: string, assignmentId: string): Promise<void> {
    const r = this.rounds.get(roundId);
    if (!r) throw new Error('Round not found');
    r.assignmentIds.push(assignmentId);
  }

  async addReview(roundId: string, reviewId: string): Promise<void> {
    const r = this.rounds.get(roundId);
    if (!r) throw new Error('Round not found');
    r.reviewIds.push(reviewId);
  }

  async startCollecting(roundId: string): Promise<void> {
    const r = this.rounds.get(roundId);
    if (!r) throw new Error('Round not found');
    this.transition(r, 'Collecting Reviews');
  }

  async close(roundId: string): Promise<void> {
    const r = this.rounds.get(roundId);
    if (!r) throw new Error('Round not found');
    this.transition(r, 'Closed');
    r.closedAt = Date.now();
    this.eventBus.emit(PublicationEvents.ReviewRoundClosed, { roundId, submissionId: r.submissionId });
  }

  async recordDecision(roundId: string, revisionType: RevisionType): Promise<void> {
    const r = this.rounds.get(roundId);
    if (!r) throw new Error('Round not found');
    this.transition(r, 'Editorial Decision');
    r.revisionType = revisionType;
    r.decisionIssuedAt = Date.now();
  }

  async complete(roundId: string): Promise<void> {
    const r = this.rounds.get(roundId);
    if (!r) throw new Error('Round not found');
    this.transition(r, 'Completed');
  }

  async getRound(roundId: string): Promise<ReviewRoundDto | null> {
    return this.rounds.get(roundId) || null;
  }

  async getBySubmission(submissionId: string): Promise<ReviewRoundDto[]> {
    return Array.from(this.rounds.values())
      .filter(r => r.submissionId === submissionId)
      .sort((a, b) => a.roundNumber - b.roundNumber);
  }
}
