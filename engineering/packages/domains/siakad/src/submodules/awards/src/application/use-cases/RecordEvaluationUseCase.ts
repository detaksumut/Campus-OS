import { RecordEvaluationCommand } from '../commands/AwardsCommands';
import { IAwardsRepository } from '../ports/IAwardsRepository';
import { IAwardsEventPublisher } from '../ports/IAwardsEventPublisher';
import { AwardId, NominationId, EvaluationId } from '../../domain/value-objects/AwardsValueObjects';
import { EvaluationSession } from '../../domain/entities/EvaluationSession';
import { RecommendationType } from '../../domain/types/AwardsEnums';
import { EvaluationCompletedEvent } from '../../domain/events/AwardEvents';

export class RecordEvaluationUseCase {
  constructor(
    private readonly repository: IAwardsRepository,
    private readonly eventPublisher: IAwardsEventPublisher
  ) {}

  async execute(command: RecordEvaluationCommand): Promise<void> {
    const program = await this.repository.findAwardProgramById(new AwardId(command.awardId));
    if (!program) throw new Error('Award Program not found.');

    const evaluationId = new EvaluationId(`EVAL-${Date.now()}`);
    const evaluation = new EvaluationSession(
      evaluationId,
      new NominationId(command.nominationId),
      command.evaluatorId,
      command.weightedScore,
      command.comments,
      command.recommendation as RecommendationType
    );

    program.recordEvaluation(evaluation);

    await this.repository.saveAwardProgram(program);

    await this.eventPublisher.publish(
      new EvaluationCompletedEvent(program.id.getValue(), evaluationId.getValue())
    );
  }
}
