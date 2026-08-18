import { PublishCourseOfferingCommand } from '../commands/CourseOfferingCommands';
import { ICourseOfferingRepository } from '../ports/ICourseOfferingRepository';
import { ICourseOfferingEventPublisher } from '../ports/ICourseOfferingEventPublisher';
import { CourseOfferingId } from '../../domain/value-objects/CourseOfferingValueObjects';
import { CourseOfferingPublishedEvent } from '../../domain/events/CourseOfferingEvents';

export class PublishCourseOfferingUseCase {
  constructor(
    private readonly repository: ICourseOfferingRepository,
    private readonly eventPublisher: ICourseOfferingEventPublisher
  ) {}

  async execute(command: PublishCourseOfferingCommand): Promise<void> {
    const offering = await this.repository.findById(new CourseOfferingId(command.courseOfferingId));
    if (!offering) throw new Error('Course Offering not found.');
    offering.publish();
    await this.repository.save(offering);
    await this.eventPublisher.publish(
      new CourseOfferingPublishedEvent(offering.id.getValue(), offering.courseId.getValue(), offering.academicPeriodId.getValue())
    );
  }
}
