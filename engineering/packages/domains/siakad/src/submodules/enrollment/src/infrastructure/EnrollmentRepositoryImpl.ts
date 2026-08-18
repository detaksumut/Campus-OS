import { IEnrollmentRepository } from '../application/ports/EnrollmentPorts';
import { Enrollment } from '../domain/entities/Enrollment';
import { EnrollmentId, StudentId, ClassSectionId, StudyPlanId } from '../domain/value-objects/EnrollmentValueObjects';
import { EnrollmentStatus } from '../domain/types/EnrollmentEnums';
import { IDatabaseExecutor } from '../../../registration/src/infrastructure/RegistrationRepositoryImpl';

export class EnrollmentRepositoryImpl implements IEnrollmentRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async save(enrollment: Enrollment): Promise<void> {
    const sql = `
      INSERT INTO siakad_enrollment.enrollments (enrollment_id, student_id, class_section_id, study_plan_id, status)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (enrollment_id) DO UPDATE SET status = EXCLUDED.status;
    `;
    await this.db.execute(sql, [
      enrollment.id.getValue(),
      enrollment.studentId.getValue(),
      enrollment.classSectionId.getValue(),
      enrollment.studyPlanId.getValue(),
      enrollment.currentStatus
    ]);
  }

  async findById(id: EnrollmentId): Promise<Enrollment | null> {
    const rows = await this.db.query(`SELECT * FROM siakad_enrollment.enrollments WHERE enrollment_id = $1`, [id.getValue()]);
    if (rows.length === 0) return null;
    return this.mapToDomain(rows[0]);
  }

  async findByStudentAndSection(studentId: string, sectionId: string): Promise<Enrollment | null> {
    const rows = await this.db.query(`SELECT * FROM siakad_enrollment.enrollments WHERE student_id = $1 AND class_section_id = $2`, [studentId, sectionId]);
    if (rows.length === 0) return null;
    return this.mapToDomain(rows[0]);
  }

  private mapToDomain(row: any): Enrollment {
    return new Enrollment(
      new EnrollmentId(row.enrollment_id),
      new StudentId(row.student_id),
      new ClassSectionId(row.class_section_id),
      new StudyPlanId(row.study_plan_id),
      row.status as EnrollmentStatus
    );
  }
}
