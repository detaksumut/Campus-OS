import { Student } from '../../domain/entities/Student';
import { StudentId } from '../../domain/value-objects/StudentValueObjects';

export interface IStudentRepository {
  save(student: Student): Promise<void>;
  findById(id: StudentId): Promise<Student | null>;
  findByNim(nim: string): Promise<Student | null>;
}
