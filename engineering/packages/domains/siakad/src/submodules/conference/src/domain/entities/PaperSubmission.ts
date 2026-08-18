import { PaperId, TrackId, ResearchReference } from '../value-objects/ConferenceValueObjects';
import { PaperStatus } from '../types/ConferenceEnums';

export class PaperSubmission {
  constructor(
    private readonly paperId: PaperId,
    private readonly trackId: TrackId,
    private readonly authorId: string, // Link to Membership
    private title: string,
    private abstractText: string,
    private researchRef: ResearchReference | null = null,
    private status: PaperStatus = PaperStatus.SUBMITTED
  ) {}

  get id(): PaperId { return this.paperId; }
  get track(): TrackId { return this.trackId; }
  get author(): string { return this.authorId; }
  get currentTitle(): string { return this.title; }
  get currentAbstract(): string { return this.abstractText; }
  get researchReference(): ResearchReference | null { return this.researchRef; }
  get currentStatus(): PaperStatus { return this.status; }

  accept(): void {
    if (this.status !== PaperStatus.IN_REVIEW && this.status !== PaperStatus.REVISION_REQUIRED) {
      throw new Error('Can only accept paper after review or revision.');
    }
    this.status = PaperStatus.ACCEPTED;
  }

  reject(): void {
    if (this.status !== PaperStatus.IN_REVIEW && this.status !== PaperStatus.REVISION_REQUIRED) {
      throw new Error('Can only reject paper after review or revision.');
    }
    this.status = PaperStatus.REJECTED;
  }

  markInReview(): void {
    if (this.status !== PaperStatus.SUBMITTED) throw new Error('Paper must be submitted to enter review.');
    this.status = PaperStatus.IN_REVIEW;
  }
}
