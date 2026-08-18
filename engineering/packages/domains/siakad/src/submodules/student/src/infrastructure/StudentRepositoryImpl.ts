import { IStudentRepository } from '../application/ports/IStudentRepository';
import { Student, AcademicLeave } from '../domain/entities/Student';
import { StudentId, RegistrationId, MemberId, StudyProgramId } from '../domain/value-objects/StudentValueObjects';
import { StudentStatus } from '../domain/types/StudentEnums';
import { IDatabaseExecutor } from '../../../registration/src/infrastructure/RegistrationRepositoryImpl';

export class StudentRepositoryImpl implements IStudentRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async save(student: Student): Promise<void> {
    const sqlStudent = `
      INSERT INTO siakad_student.students (student_id, nim, registration_id, member_id, study_program_id, enrollment_year, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (student_id) DO UPDATE SET
        status = EXCLUDED.status;
    `;
    await this.db.execute(sqlStudent, [
      student.id.getValue(),
      student.nim,
      student.registrationId.getValue(),
      student.memberId.getValue(),
      student.studyProgramId.getValue(),
      student.enrollmentYear,
      student.currentStatus
    ]);

    for (const leave of student.allLeaves) {
      const sqlLeave = `
        INSERT INTO siakad_student.academic_leaves (leave_id, student_id, semester_id, reason, approved_date)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (leave_id) DO NOTHING;
      `;
      await this.db.execute(sqlLeave, [leave.id, student.id.getValue(), leave.semesterId, leave.reason, leave.approvedDate]);
    }
  }

  async findById(id: StudentId): Promise<Student | null> {
    const rows = await this.db.query(`SELECT * FROM siakad_student.students WHERE student_id = $1`, [id.getValue()]);
    if (rows.length === 0) return null;
    return this.mapToDomain(rows[0]);
  }

  async findByNim(nim: string): Promise<Student | null> {
    const rows = await this.db.query(`SELECT * FROM siakad_student.students WHERE nim = $1`, [nim]);
    if (rows.length === 0) return null;
    return this.mapToDomain(rows[0]);
  }

  private async mapToDomain(row: any): Promise<Student> {
    const student = new Student(
      new StudentId(row.student_id),
      row.nim,
      new RegistrationId(row.registration_id),
      new MemberId(row.member_id),
      new StudyProgramId(row.study_program_id),
      row.enrollment_year,
      row.status as StudentStatus
    );

    const leaves = await this.db.query(`SELECT * FROM siakad_student.academic_leaves WHERE student_id = $1`, [row.student_id]);
    for (const l of leaves) {
      student['academicLeaves'].push(new AcademicLeave(l.leave_id, l.semester_id, l.reason, new Date(l.approved_date)));
    }

    return student;
  }
}
