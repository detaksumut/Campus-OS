import { ReviewDecision } from '../types/PublicationEnums';

export class Review {
  constructor(
    private readonly decision: ReviewDecision,
    private readonly commentsToAuthor: string, // Masked for blind review
    private readonly commentsToEditor: string, // Private to editor
    private readonly submittedAt: Date = new Date()
  ) {}

  get currentDecision(): ReviewDecision { return this.decision; }
  get authorComments(): string { return this.commentsToAuthor; }
  get editorComments(): string { return this.commentsToEditor; }
}
