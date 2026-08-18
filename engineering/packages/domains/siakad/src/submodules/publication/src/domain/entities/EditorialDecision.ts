import { EditorId } from '../value-objects/PublicationValueObjects';
import { ReviewDecision } from '../types/PublicationEnums';

export class EditorialDecision {
  constructor(
    private readonly editorId: EditorId,
    private readonly decision: ReviewDecision,
    private readonly justification: string,
    private readonly decidedAt: Date = new Date()
  ) {}

  get editor(): EditorId { return this.editorId; }
  get currentDecision(): ReviewDecision { return this.decision; }
  get comments(): string { return this.justification; }
}
