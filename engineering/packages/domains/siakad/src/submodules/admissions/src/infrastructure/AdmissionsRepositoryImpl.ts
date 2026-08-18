import { IAdmissionsRepository } from '../application/ports/IAdmissionsRepository';
import { AdmissionPeriod } from '../domain/entities/AdmissionPeriod';
import { Applicant } from '../domain/entities/Applicant';
import { Application } from '../domain/entities/Application';
import { SelectionStage } from '../domain/entities/SelectionStage';
import { EnrollmentOffer } from '../domain/entities/EnrollmentOffer';
import { PeriodId, ApplicantId, ApplicationId, AssessmentId, OfferId, ProgramChoice, AssessmentResult } from '../domain/value-objects/AdmissionsValueObjects';
import { AdmissionPeriodStatus, AdmissionRoute, AdmissionDecision, OfferStatus, SelectionStageType } from '../domain/types/AdmissionsEnums';
import { IDatabaseExecutor } from '../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Shared port

export class AdmissionsRepositoryImpl implements IAdmissionsRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async savePeriod(period: AdmissionPeriod): Promise<void> {
    const sqlPeriod = `
      INSERT INTO admissions.admission_periods (period_id, name, route, status, academic_year, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (period_id) DO UPDATE SET
        name = EXCLUDED.name,
        route = EXCLUDED.route,
        status = EXCLUDED.status,
        academic_year = EXCLUDED.academic_year,
        start_date = EXCLUDED.start_date,
        end_date = EXCLUDED.end_date;
    `;
    await this.db.execute(sqlPeriod, [
      period.id.getValue(),
      period.currentName,
      period.currentRoute,
      period.currentStatus,
      period.targetAcademicYear,
      period.openingDate,
      period.closingDate
    ]);

    for (const applicant of period.allApplicants) {
      const sqlApp = `
        INSERT INTO admissions.applicants (period_id, applicant_id, name, email, phone, registered_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (applicant_id) DO UPDATE SET
          name = EXCLUDED.name,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone;
      `;
      await this.db.execute(sqlApp, [
        period.id.getValue(),
        applicant.id.getValue(),
        applicant.fullName,
        applicant.contactEmail,
        applicant.contactPhone,
        applicant.registeredAt
      ]);
    }

    for (const application of period.allApplications) {
      const choicesJson = JSON.stringify(application.programChoices);
      const sqlApplication = `
        INSERT INTO admissions.applications (application_id, period_id, applicant_id, choices_json, decision, submitted_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (application_id) DO UPDATE SET
          choices_json = EXCLUDED.choices_json,
          decision = EXCLUDED.decision;
      `;
      await this.db.execute(sqlApplication, [
        application.id.getValue(),
        period.id.getValue(),
        application.applicant.getValue(),
        choicesJson,
        application.currentDecision,
        application.dateSubmitted
      ]);

      if (application.currentOffer) {
        const off = application.currentOffer;
        const sqlOffer = `
          INSERT INTO admissions.enrollment_offers (offer_id, application_id, program_code, valid_until, status, issued_at)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (offer_id) DO UPDATE SET
            status = EXCLUDED.status;
        `;
        await this.db.execute(sqlOffer, [
          off.id.getValue(),
          application.id.getValue(),
          off.targetProgram,
          off.expirationDate,
          off.currentStatus,
          off.dateIssued
        ]);
      }

      for (const stage of application.allStages) {
        const sqlStage = `
          INSERT INTO admissions.selection_stages (stage_id, application_id, type, description)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (stage_id) DO NOTHING;
        `;
        await this.db.execute(sqlStage, [
          stage.id,
          application.id.getValue(),
          stage.stageType,
          stage.stageDescription
        ]);

        for (const res of stage.allResults) {
          const sqlRes = `
            INSERT INTO admissions.assessment_results (assessment_id, stage_id, evaluator_id, score, remarks, evaluated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (assessment_id) DO UPDATE SET
              score = EXCLUDED.score,
              remarks = EXCLUDED.remarks;
          `;
          await this.db.execute(sqlRes, [
            res.assessmentId.getValue(),
            stage.id,
            res.evaluatorId,
            res.score,
            res.remarks,
            res.evaluatedAt
          ]);
        }
      }
    }
  }

  async findPeriodById(id: PeriodId): Promise<AdmissionPeriod | null> {
    const pRows = await this.db.query(`SELECT * FROM admissions.admission_periods WHERE period_id = $1`, [id.getValue()]);
    if (pRows.length === 0) return null;
    const pRow = pRows[0];

    const period = new AdmissionPeriod(
      new PeriodId(pRow.period_id),
      pRow.name,
      pRow.route as AdmissionRoute,
      pRow.status as AdmissionPeriodStatus,
      pRow.academic_year,
      new Date(pRow.start_date),
      new Date(pRow.end_date)
    );

    const apRows = await this.db.query(`SELECT * FROM admissions.applicants WHERE period_id = $1`, [id.getValue()]);
    for (const row of apRows) {
      period['applicants'].push(
        new Applicant(new ApplicantId(row.applicant_id), row.name, row.email, row.phone, new Date(row.registered_at))
      );
    }

    const appRows = await this.db.query(`SELECT * FROM admissions.applications WHERE period_id = $1`, [id.getValue()]);
    for (const row of appRows) {
      const choices: ProgramChoice[] = [];
      if (row.choices_json) {
        JSON.parse(row.choices_json).forEach((c: any) => {
          choices.push(new ProgramChoice(c.programCode, c.priority));
        });
      }
      
      const application = new Application(
        new ApplicationId(row.application_id),
        new ApplicantId(row.applicant_id),
        choices,
        row.decision as AdmissionDecision,
        new Date(row.submitted_at)
      );

      const offRows = await this.db.query(`SELECT * FROM admissions.enrollment_offers WHERE application_id = $1`, [row.application_id]);
      if (offRows.length > 0) {
        const off = offRows[0];
        application['offer'] = new EnrollmentOffer(
          new OfferId(off.offer_id),
          off.program_code,
          new Date(off.valid_until),
          off.status as OfferStatus,
          new Date(off.issued_at)
        );
      }

      const stgRows = await this.db.query(`SELECT * FROM admissions.selection_stages WHERE application_id = $1`, [row.application_id]);
      for (const stg of stgRows) {
        const stage = new SelectionStage(stg.stage_id, stg.type as SelectionStageType, stg.description);
        
        const resRows = await this.db.query(`SELECT * FROM admissions.assessment_results WHERE stage_id = $1`, [stg.stage_id]);
        for (const res of resRows) {
          stage['results'].push(
            new AssessmentResult(
              new AssessmentId(res.assessment_id),
              res.evaluator_id,
              res.score,
              res.remarks,
              new Date(res.evaluated_at)
            )
          );
        }
        application['stages'].push(stage);
      }

      period['applications'].push(application);
    }

    return period;
  }
}
