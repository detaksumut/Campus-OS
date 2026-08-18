import { GraduateStudentCommand } from '../commands/StudentCommands';
import { IStudentRepository } from '../ports/IStudentRepository';
import { IStudentEventPublisher } from '../ports/IStudentEventPublisher';
import { StudentId } from '../../domain/value-objects/StudentValueObjects';
import { StudentStatusChangedEvent } from '../../domain/events/StudentEvents';

export class GraduateStudentUseCase {
  constructor(
    private readonly repository: IStudentRepository,
    private readonly eventPublisher: IStudentEventPublisher
  ) {}

  async execute(command: GraduateStudentCommand): Promise<void> {
    const student = await this.repository.findById(new StudentId(command.studentId));
    if (!student) throw new Error('Student not found.');

    const oldStatus = student.currentStatus;

    student.graduate();
    await this.repository.save(student);

    await this.eventPublisher.publish(
      new StudentStatusChangedEvent(student.id.getValue(), oldStatus, student.currentStatus)
    );
  }
}
