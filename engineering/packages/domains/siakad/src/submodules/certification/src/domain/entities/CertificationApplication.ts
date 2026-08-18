import { ApplicationId, CandidateId, ProgramId, CertificateId } from '../value-objects/CertificationValueObjects';
import { ApplicationStatus } from '../types/CertificationEnums';
import { ExamSession } from './ExamSession';
import { InterviewSession } from './InterviewSession';

export class CertificationApplication {
  private examSession?: ExamSession;
  private interviewSession?: InterviewSession;
  private certificateId?: CertificateId;

  constructor(
    private readonly applicationId: ApplicationId,
    private readonly programId: ProgramId,
    private readonly candidateId: CandidateId,
    private status: ApplicationStatus = ApplicationStatus.DRAFT
  ) {}

  get id(): ApplicationId { return this.applicationId; }
  get program(): ProgramId { return this.programId; }
  get candidate(): CandidateId { return this.candidateId; }
  get currentStatus(): ApplicationStatus { return this.status; }
  
  get exam(): ExamSession | undefined { return this.examSession; }
  get interview(): InterviewSession | undefined { return this.interviewSession; }
  get issuedCertificateId(): CertificateId | undefined { return this.certificateId; }

  submit(): void {
    if (this.status !== ApplicationStatus.DRAFT) throw new Error('Can only submit from DRAFT status.');
    this.status = ApplicationStatus.SUBMITTED;
  }

  scheduleExam(exam: ExamSession): void {
    if (this.status !== ApplicationStatus.SUBMITTED && this.status !== ApplicationStatus.UNDER_REVIEW) {
      throw new Error('Invalid status to schedule exam.');
    }
    this.examSession = exam;
    this.status = ApplicationStatus.EXAM_SCHEDULED;
  }

  completeExam(): void {
    if (this.status !== ApplicationStatus.EXAM_SCHEDULED) throw new Error('Exam is not scheduled.');
    this.status = ApplicationStatus.EXAM_COMPLETED;
  }

  scheduleInterview(interview: InterviewSession): void {
    if (this.status !== ApplicationStatus.EXAM_COMPLETED) throw new Error('Must complete exam before interview.');
    this.interviewSession = interview;
    this.status = ApplicationStatus.INTERVIEW_SCHEDULED;
  }

  completeInterview(): void {
    if (this.status !== ApplicationStatus.INTERVIEW_SCHEDULED) throw new Error('Interview is not scheduled.');
    this.status = ApplicationStatus.INTERVIEW_COMPLETED;
  }

  approve(): void {
    if (this.status !== ApplicationStatus.INTERVIEW_COMPLETED && this.status !== ApplicationStatus.EXAM_COMPLETED) {
      throw new Error('Cannot approve without completing requirements.');
    }
    this.status = ApplicationStatus.APPROVED;
  }

  issueCertificate(certificateId: CertificateId): void {
    if (this.status !== ApplicationStatus.APPROVED) throw new Error('Application must be approved first.');
    this.certificateId = certificateId;
    this.status = ApplicationStatus.CERTIFIED;
  }
}
