import { ICurriculumRepository } from '../application/ports/ICurriculumRepository';
import { Curriculum } from '../domain/entities/Curriculum';
import { Course, CurriculumCourse, LearningOutcome, CourseLearningOutcome, Prerequisite } from '../domain/entities/CurriculumEntities';
import { CurriculumId, StudyProgramId, CourseId, LearningOutcomeId, PrerequisiteId } from '../domain/value-objects/CurriculumValueObjects';
import { CurriculumStatus, CourseType } from '../domain/types/CurriculumEnums';
import { IDatabaseExecutor } from '../../../registration/src/infrastructure/RegistrationRepositoryImpl';

export class CurriculumRepositoryImpl implements ICurriculumRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveCurriculum(curriculum: Curriculum): Promise<void> {
    const sqlCurr = `
      INSERT INTO siakad_curriculum.curriculums (curriculum_id, study_program_id, name, start_year, status)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (curriculum_id) DO UPDATE SET
        name = EXCLUDED.name,
        status = EXCLUDED.status;
    `;
    await this.db.execute(sqlCurr, [
      curriculum.id.getValue(),
      curriculum.studyProgramId.getValue(),
      curriculum.name,
      curriculum.startYear,
      curriculum.currentStatus
    ]);

    for (const c of curriculum.allCourses) {
      const sqlCC = `
        INSERT INTO siakad_curriculum.curriculum_courses (curriculum_id, course_id, recommended_semester, is_mandatory)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (curriculum_id, course_id) DO UPDATE SET
          recommended_semester = EXCLUDED.recommended_semester,
          is_mandatory = EXCLUDED.is_mandatory;
      `;
      await this.db.execute(sqlCC, [curriculum.id.getValue(), c.courseId.getValue(), c.recommendedSemester, c.isMandatory]);
    }

    for (const cpl of curriculum.allCpl) {
      const sqlCpl = `
        INSERT INTO siakad_curriculum.learning_outcomes (outcome_id, curriculum_id, code, description)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (outcome_id) DO UPDATE SET
          code = EXCLUDED.code,
          description = EXCLUDED.description;
      `;
      await this.db.execute(sqlCpl, [cpl.id.getValue(), curriculum.id.getValue(), cpl.code, cpl.description]);
    }
  }

  async findCurriculumById(id: CurriculumId): Promise<Curriculum | null> {
    const rows = await this.db.query(`SELECT * FROM siakad_curriculum.curriculums WHERE curriculum_id = $1`, [id.getValue()]);
    if (rows.length === 0) return null;
    const r = rows[0];

    const curriculum = new Curriculum(
      new CurriculumId(r.curriculum_id),
      new StudyProgramId(r.study_program_id),
      r.name,
      r.start_year,
      r.status as CurriculumStatus
    );

    const ccRows = await this.db.query(`SELECT * FROM siakad_curriculum.curriculum_courses WHERE curriculum_id = $1`, [id.getValue()]);
    for (const cc of ccRows) {
      curriculum['courses'].push(new CurriculumCourse(new CourseId(cc.course_id), cc.recommended_semester, cc.is_mandatory));
    }

    const cplRows = await this.db.query(`SELECT * FROM siakad_curriculum.learning_outcomes WHERE curriculum_id = $1`, [id.getValue()]);
    for (const cpl of cplRows) {
      curriculum['cplList'].push(new LearningOutcome(new LearningOutcomeId(cpl.outcome_id), cpl.code, cpl.description));
    }

    return curriculum;
  }

  async saveCourse(course: Course): Promise<void> {
    const sql = `
      INSERT INTO siakad_curriculum.courses (course_id, code, name, credits, type)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (course_id) DO UPDATE SET
        name = EXCLUDED.name,
        credits = EXCLUDED.credits,
        type = EXCLUDED.type;
    `;
    await this.db.execute(sql, [course.id.getValue(), course.code, course.name, course.credits, course.type]);
    
    // In a real app we'd also loop through cpmkList and prerequisites here
  }

  async findCourseById(id: CourseId): Promise<Course | null> {
    const rows = await this.db.query(`SELECT * FROM siakad_curriculum.courses WHERE course_id = $1`, [id.getValue()]);
    if (rows.length === 0) return null;
    const r = rows[0];
    
    return new Course(new CourseId(r.course_id), r.code, r.name, r.credits, r.type as CourseType);
  }
}
