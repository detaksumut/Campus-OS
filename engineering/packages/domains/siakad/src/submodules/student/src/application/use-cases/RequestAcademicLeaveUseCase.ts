import { RequestAcademicLeaveCommand } from '../commands/StudentCommands';
import { IStudentRepository } from '../ports/IStudentRepository';
import { IStudentEventPublisher } from '../ports/IStudentEventPublisher';
import { StudentId } from '../../domain/value-objects/StudentValueObjects';
import { AcademicLeave } from '../../domain/entities/Student';
import { StudentStatusChangedEvent } from '../../domain/events/StudentEvents';

export class RequestAcademicLeaveUseCase {
  constructor(
    private readonly repository: IStudentRepository,
    private readonly eventPublisher: IStudentEventPublisher
  ) {}

  async execute(command: RequestAcademicLeaveCommand): Promise<void> {
    const student = await this.repository.findById(new StudentId(command.studentId));
    if (!student) throw new Error('Student not found.');

    const oldStatus = student.currentStatus;

    const leave = new AcademicLeave(
      `LEAVE-${Date.now()}`,
      command.semesterId,
      command.reason,
      new Date()
    );

    student.takeLeave(leave);
    await this.repository.save(student);

    await this.eventPublisher.publish(
      new StudentStatusChangedEvent(student.id.getValue(), oldStatus, student.currentStatus)
    );
  }
}
