import { DraftCourseOfferingCommand } from '../commands/CourseOfferingCommands';
import { ICourseOfferingRepository } from '../ports/ICourseOfferingRepository';
import { CourseOfferingId, CourseId, AcademicPeriodId } from '../../domain/value-objects/CourseOfferingValueObjects';
import { CourseOffering } from '../../domain/entities/CourseOffering';
import { OfferingStatus } from '../../domain/types/CourseOfferingEnums';

export class DraftCourseOfferingUseCase {
  constructor(private readonly repository: ICourseOfferingRepository) {}

  async execute(command: DraftCourseOfferingCommand): Promise<void> {
    const offeringId = new CourseOfferingId(`OFF-${Date.now()}`);
    const offering = new CourseOffering(
      offeringId,
      new CourseId(command.courseId),
      new AcademicPeriodId(command.academicPeriodId),
      OfferingStatus.DRAFT
    );
    await this.repository.save(offering);
  }
}
