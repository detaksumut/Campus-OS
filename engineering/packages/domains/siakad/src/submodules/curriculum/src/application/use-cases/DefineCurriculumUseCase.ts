import { DefineCurriculumCommand } from '../commands/CurriculumCommands';
import { ICurriculumRepository } from '../ports/ICurriculumRepository';
import { ICurriculumEventPublisher } from '../ports/ICurriculumEventPublisher';
import { CurriculumId, StudyProgramId } from '../../domain/value-objects/CurriculumValueObjects';
import { Curriculum } from '../../domain/entities/Curriculum';
import { CurriculumStatus } from '../../domain/types/CurriculumEnums';
import { CurriculumCreatedEvent } from '../../domain/events/CurriculumEvents';

export class DefineCurriculumUseCase {
  constructor(
    private readonly repository: ICurriculumRepository,
    private readonly eventPublisher: ICurriculumEventPublisher
  ) {}

  async execute(command: DefineCurriculumCommand): Promise<void> {
    const curriculumId = new CurriculumId(`CUR-${Date.now()}`);
    const curriculum = new Curriculum(
      curriculumId,
      new StudyProgramId(command.studyProgramId),
      command.name,
      command.startYear,
      CurriculumStatus.DRAFT
    );

    await this.repository.saveCurriculum(curriculum);

    await this.eventPublisher.publish(
      new CurriculumCreatedEvent(
        curriculumId.getValue(),
        command.studyProgramId,
        command.name
      )
    );
  }
}
