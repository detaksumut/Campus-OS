import { IStudyPlanRepository } from '../application/ports/IStudyPlanRepository';
import { StudyPlan } from '../domain/entities/StudyPlan';
import { StudyPlanItem } from '../domain/entities/StudyPlanEntities';
import { StudyPlanId, StudentId, AcademicPeriodId, ClassSectionId } from '../domain/value-objects/StudyPlanValueObjects';
import { StudyPlanStatus } from '../domain/types/StudyPlanEnums';
import { IDatabaseExecutor } from '../../../registration/src/infrastructure/RegistrationRepositoryImpl';

export class StudyPlanRepositoryImpl implements IStudyPlanRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async save(plan: StudyPlan): Promise<void> {
    const sqlPlan = `
      INSERT INTO siakad_study_plan.study_plans (plan_id, student_id, academic_period_id, status)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (plan_id) DO UPDATE SET status = EXCLUDED.status;
    `;
    await this.db.execute(sqlPlan, [plan.id.getValue(), plan.studentId.getValue(), plan.academicPeriodId.getValue(), plan.currentStatus]);
    
    for (const item of plan.allItems) {
      const sqlItem = `
        INSERT INTO siakad_study_plan.study_plan_items (plan_id, section_id, is_mandatory)
        VALUES ($1, $2, $3)
        ON CONFLICT (plan_id, section_id) DO UPDATE SET is_mandatory = EXCLUDED.is_mandatory;
      `;
      await this.db.execute(sqlItem, [plan.id.getValue(), item.classSectionId.getValue(), item.isMandatory]);
    }
  }

  async findById(id: StudyPlanId): Promise<StudyPlan | null> {
    const rows = await this.db.query(`SELECT * FROM siakad_study_plan.study_plans WHERE plan_id = $1`, [id.getValue()]);
    if (rows.length === 0) return null;
    const p = rows[0];
    const plan = new StudyPlan(new StudyPlanId(p.plan_id), new StudentId(p.student_id), new AcademicPeriodId(p.academic_period_id), p.status as StudyPlanStatus);
    
    const items = await this.db.query(`SELECT * FROM siakad_study_plan.study_plan_items WHERE plan_id = $1`, [id.getValue()]);
    for (const i of items) {
      plan['items'].push(new StudyPlanItem(new ClassSectionId(i.section_id), i.is_mandatory));
    }
    return plan;
  }
}
