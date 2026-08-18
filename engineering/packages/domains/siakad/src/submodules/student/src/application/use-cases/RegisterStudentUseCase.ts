import { RegisterStudentCommand } from '../commands/StudentCommands';
import { IStudentRepository } from '../ports/IStudentRepository';
import { IStudentEventPublisher } from '../ports/IStudentEventPublisher';
import { StudentId, RegistrationId, MemberId, StudyProgramId } from '../../domain/value-objects/StudentValueObjects';
import { Student } from '../../domain/entities/Student';
import { StudentRegisteredEvent } from '../../domain/events/StudentEvents';
import { StudentStatus } from '../../domain/types/StudentEnums';

export class RegisterStudentUseCase {
  constructor(
    private readonly repository: IStudentRepository,
    private readonly eventPublisher: IStudentEventPublisher
  ) {}

  async execute(command: RegisterStudentCommand): Promise<void> {
    const existing = await this.repository.findByNim(command.nim);
    if (existing) throw new Error('Student NIM already exists.');

    const studentId = new StudentId(`STU-${Date.now()}`);
    const student = new Student(
      studentId,
      command.nim,
      new RegistrationId(command.registrationId),
      new MemberId(command.memberId),
      new StudyProgramId(command.studyProgramId),
      command.enrollmentYear,
      StudentStatus.ACTIVE
    );

    await this.repository.save(student);

    await this.eventPublisher.publish(
      new StudentRegisteredEvent(studentId.getValue(), command.nim, command.studyProgramId)
    );
  }
}
