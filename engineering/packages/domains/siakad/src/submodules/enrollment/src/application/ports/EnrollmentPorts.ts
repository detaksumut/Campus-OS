import { Enrollment } from '../../domain/entities/Enrollment';
import { EnrollmentId } from '../../domain/value-objects/EnrollmentValueObjects';

export interface IEnrollmentRepository {
  save(enrollment: Enrollment): Promise<void>;
  findById(id: EnrollmentId): Promise<Enrollment | null>;
  findByStudentAndSection(studentId: string, sectionId: string): Promise<Enrollment | null>;
}

export interface IEnrollmentEventPublisher {
  publish(event: any): Promise<void>;
}
