import { EvaluationId, NominationId } from '../value-objects/AwardsValueObjects';
import { RecommendationType } from '../types/AwardsEnums';

export class EvaluationSession {
  constructor(
    private readonly evaluationId: EvaluationId,
    private readonly nominationId: NominationId,
    private readonly evaluatorId: string,
    private readonly weightedScore: number, // 0-100
    private readonly comments: string,
    private readonly recommendation: RecommendationType
  ) {}

  get id(): EvaluationId { return this.evaluationId; }
  get nomination(): NominationId { return this.nominationId; }
  get evaluator(): string { return this.evaluatorId; }
  get score(): number { return this.weightedScore; }
  get currentComments(): string { return this.comments; }
  get currentRecommendation(): RecommendationType { return this.recommendation; }
}
