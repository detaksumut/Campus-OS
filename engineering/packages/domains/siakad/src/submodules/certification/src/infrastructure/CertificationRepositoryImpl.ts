import { ICertificationRepository } from '../application/ports/ICertificationRepository';
import { CertificationApplication } from '../domain/entities/CertificationApplication';
import { Certificate } from '../domain/entities/Certificate';
import { ApplicationId, CandidateId, ProgramId, CertificateId, ExamId, InterviewId, AssessorId } from '../domain/value-objects/CertificationValueObjects';
import { ApplicationStatus, ExamStatus, InterviewStatus, CertificateStatus } from '../domain/types/CertificationEnums';
import { ExamSession } from '../domain/entities/ExamSession';
import { InterviewSession } from '../domain/entities/InterviewSession';
import { AssessmentPanel } from '../domain/entities/AssessmentPanel';
import { IDatabaseExecutor } from '../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Mocking the shared platform port

export class CertificationRepositoryImpl implements ICertificationRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveApplication(application: CertificationApplication): Promise<void> {
    const sqlApp = `
      INSERT INTO certification.applications (application_id, program_id, candidate_id, status, certificate_id)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (application_id) DO UPDATE SET
        status = EXCLUDED.status,
        certificate_id = EXCLUDED.certificate_id;
    `;
    await this.db.execute(sqlApp, [
      application.id.getValue(),
      application.program.getValue(),
      application.candidate.getValue(),
      application.currentStatus,
      application.issuedCertificateId?.getValue() || null
    ]);

    if (application.exam) {
      const exam = application.exam;
      const sqlExam = `
        INSERT INTO certification.exam_sessions (exam_id, application_id, status, scheduled_start, time_limit_minutes, score)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (exam_id) DO UPDATE SET
          status = EXCLUDED.status,
          score = EXCLUDED.score;
      `;
      await this.db.execute(sqlExam, [
        exam.id.getValue(),
        application.id.getValue(),
        exam.currentStatus,
        exam['scheduledStart'],
        exam['timeLimitMinutes'],
        exam.currentScore || null
      ]);
    }

    if (application.interview) {
      const intv = application.interview;
      const sqlIntv = `
        INSERT INTO certification.interview_sessions (interview_id, application_id, status, scheduled_time, score, result_notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (interview_id) DO UPDATE SET
          status = EXCLUDED.status,
          score = EXCLUDED.score,
          result_notes = EXCLUDED.result_notes;
      `;
      await this.db.execute(sqlIntv, [
        intv.id.getValue(),
        application.id.getValue(),
        intv.currentStatus,
        intv['scheduledTime'],
        intv.score || null,
        intv.result || null
      ]);

      for (const assessor of intv.currentPanel.currentAssessors) {
        const sqlPanel = `
          INSERT INTO certification.assessment_panels (interview_id, assessor_id)
          VALUES ($1, $2)
          ON CONFLICT (interview_id, assessor_id) DO NOTHING;
        `;
        await this.db.execute(sqlPanel, [intv.id.getValue(), assessor.getValue()]);
      }
    }
  }

  async findApplicationById(id: ApplicationId): Promise<CertificationApplication | null> {
    const appRows = await this.db.query(`SELECT * FROM certification.applications WHERE application_id = $1`, [id.getValue()]);
    if (appRows.length === 0) return null;
    const aRow = appRows[0];

    const application = new CertificationApplication(
      new ApplicationId(aRow.application_id),
      new ProgramId(aRow.program_id),
      new CandidateId(aRow.candidate_id),
      aRow.status as ApplicationStatus
    );

    if (aRow.certificate_id) {
      application['certificateId'] = new CertificateId(aRow.certificate_id);
    }

    const examRows = await this.db.query(`SELECT * FROM certification.exam_sessions WHERE application_id = $1`, [aRow.application_id]);
    if (examRows.length > 0) {
      const eRow = examRows[0];
      const exam = new ExamSession(
        new ExamId(eRow.exam_id),
        eRow.status as ExamStatus,
        new Date(eRow.scheduled_start),
        eRow.time_limit_minutes
      );
      if (eRow.score !== null) exam['score'] = parseFloat(eRow.score);
      application['examSession'] = exam;
    }

    const intvRows = await this.db.query(`SELECT * FROM certification.interview_sessions WHERE application_id = $1`, [aRow.application_id]);
    if (intvRows.length > 0) {
      const iRow = intvRows[0];
      const panelRows = await this.db.query(`SELECT * FROM certification.assessment_panels WHERE interview_id = $1`, [iRow.interview_id]);
      
      const panel = new AssessmentPanel();
      for (const p of panelRows) panel.addAssessor(new AssessorId(p.assessor_id));

      const interview = new InterviewSession(
        new InterviewId(iRow.interview_id),
        new Date(iRow.scheduled_time),
        panel,
        iRow.status as InterviewStatus
      );
      if (iRow.score !== null) interview['interviewScore'] = parseFloat(iRow.score);
      if (iRow.result_notes) interview['interviewResult'] = iRow.result_notes;

      application['interviewSession'] = interview;
    }

    return application;
  }

  async saveCertificate(certificate: Certificate): Promise<void> {
    const sql = `
      INSERT INTO certification.certificates (certificate_id, program_id, candidate_id, issue_date, expiration_date, status, cryptographic_hash)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (certificate_id) DO UPDATE SET
        status = EXCLUDED.status;
    `;
    await this.db.execute(sql, [
      certificate.id.getValue(),
      certificate.program.getValue(),
      certificate.candidate.getValue(),
      certificate['issueDate'],
      certificate['expirationDate'],
      certificate.currentStatus,
      certificate.hash
    ]);
  }

  async findCertificateById(id: CertificateId): Promise<Certificate | null> {
    const rows = await this.db.query(`SELECT * FROM certification.certificates WHERE certificate_id = $1`, [id.getValue()]);
    if (rows.length === 0) return null;
    const r = rows[0];

    return new Certificate(
      new CertificateId(r.certificate_id),
      new ProgramId(r.program_id),
      new CandidateId(r.candidate_id),
      new Date(r.issue_date),
      r.expiration_date ? new Date(r.expiration_date) : null,
      r.status as CertificateStatus,
      r.cryptographic_hash
    );
  }
}
