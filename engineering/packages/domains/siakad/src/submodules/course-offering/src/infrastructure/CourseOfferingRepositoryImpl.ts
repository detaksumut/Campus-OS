import { ICourseOfferingRepository } from '../application/ports/ICourseOfferingRepository';
import { CourseOffering } from '../domain/entities/CourseOffering';
import { ClassSection, TeachingAssignment, RoomSchedule } from '../domain/entities/CourseOfferingEntities';
import { CourseOfferingId, CourseId, AcademicPeriodId, ClassSectionId, LecturerId, BuildingId } from '../domain/value-objects/CourseOfferingValueObjects';
import { OfferingStatus, TeachingRole } from '../domain/types/CourseOfferingEnums';
import { IDatabaseExecutor } from '../../../registration/src/infrastructure/RegistrationRepositoryImpl';

export class CourseOfferingRepositoryImpl implements ICourseOfferingRepository {
  constructor(private readonly db: IDatabaseExecutor) {}
  async save(offering: CourseOffering): Promise<void> {
    const sqlOff = `
      INSERT INTO siakad_course_offering.offerings (offering_id, course_id, academic_period_id, status)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (offering_id) DO UPDATE SET status = EXCLUDED.status;
    `;
    await this.db.execute(sqlOff, [offering.id.getValue(), offering.courseId.getValue(), offering.academicPeriodId.getValue(), offering.currentStatus]);
    
    for (const sec of offering.allSections) {
      const sqlSec = `
        INSERT INTO siakad_course_offering.class_sections (section_id, offering_id, name, capacity, enrolled_count)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (section_id) DO UPDATE SET name = EXCLUDED.name, capacity = EXCLUDED.capacity, enrolled_count = EXCLUDED.enrolled_count;
      `;
      await this.db.execute(sqlSec, [sec.id.getValue(), offering.id.getValue(), sec.name, sec.capacity, sec.enrolledCount]);
    }
  }

  async findById(id: CourseOfferingId): Promise<CourseOffering | null> {
    const rows = await this.db.query(`SELECT * FROM siakad_course_offering.offerings WHERE offering_id = $1`, [id.getValue()]);
    if (rows.length === 0) return null;
    const off = rows[0];
    const offering = new CourseOffering(new CourseOfferingId(off.offering_id), new CourseId(off.course_id), new AcademicPeriodId(off.academic_period_id), off.status as OfferingStatus);
    const secs = await this.db.query(`SELECT * FROM siakad_course_offering.class_sections WHERE offering_id = $1`, [id.getValue()]);
    for (const s of secs) {
      offering['sections'].push(new ClassSection(new ClassSectionId(s.section_id), s.name, s.capacity, s.enrolled_count));
    }
    return offering;
  }
  
  async findByPeriod(periodId: AcademicPeriodId): Promise<CourseOffering[]> { return []; }
}
