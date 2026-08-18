import { ConfirmEnrollmentCommand, DropEnrollmentCommand } from '../commands/EnrollmentCommands';
import { IEnrollmentRepository, IEnrollmentEventPublisher } from '../ports/EnrollmentPorts';
import { EnrollmentId, StudentId, ClassSectionId, StudyPlanId } from '../../domain/value-objects/EnrollmentValueObjects';
import { Enrollment } from '../../domain/entities/Enrollment';
import { EnrollmentStatus } from '../../domain/types/EnrollmentEnums';
import { EnrollmentConfirmedEvent, EnrollmentDroppedEvent } from '../../domain/events/EnrollmentEvents';

export class ConfirmEnrollmentUseCase {
  constructor(
    private readonly repository: IEnrollmentRepository,
    private readonly eventPublisher: IEnrollmentEventPublisher
  ) {}

  async execute(command: ConfirmEnrollmentCommand): Promise<void> {
    const existing = await this.repository.findByStudentAndSection(command.studentId, command.classSectionId);
    if (existing && existing.currentStatus === EnrollmentStatus.ENROLLED) {
      throw new Error('Student is already enrolled in this section.');
    }
    
    const enrollmentId = new EnrollmentId(`ENR-${Date.now()}`);
    const enrollment = new Enrollment(
      enrollmentId,
      new StudentId(command.studentId),
      new ClassSectionId(command.classSectionId),
      new StudyPlanId(command.studyPlanId),
      EnrollmentStatus.ENROLLED
    );
    await this.repository.save(enrollment);
    
    await this.eventPublisher.publish(
      new EnrollmentConfirmedEvent(enrollmentId.getValue(), command.studentId, command.classSectionId)
    );
  }
}

export class DropEnrollmentUseCase {
  constructor(
    private readonly repository: IEnrollmentRepository,
    private readonly eventPublisher: IEnrollmentEventPublisher
  ) {}

  async execute(command: DropEnrollmentCommand): Promise<void> {
    const enrollment = await this.repository.findById(new EnrollmentId(command.enrollmentId));
    if (!enrollment) throw new Error('Enrollment not found.');
    
    enrollment.drop();
    await this.repository.save(enrollment);
    
    await this.eventPublisher.publish(
      new EnrollmentDroppedEvent(enrollment.id.getValue(), enrollment.studentId.getValue(), enrollment.classSectionId.getValue())
    );
  }
}
