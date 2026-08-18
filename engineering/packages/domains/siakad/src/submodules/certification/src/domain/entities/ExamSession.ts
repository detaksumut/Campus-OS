import { ExamId } from '../value-objects/CertificationValueObjects';
import { ExamStatus } from '../types/CertificationEnums';

export class ExamSession {
  private score?: number;

  constructor(
    private readonly examId: ExamId,
    private status: ExamStatus,
    private readonly scheduledStart: Date,
    private readonly timeLimitMinutes: number
  ) {}

  get id(): ExamId { return this.examId; }
  get currentStatus(): ExamStatus { return this.status; }
  get currentScore(): number | undefined { return this.score; }

  start(): void {
    if (this.status !== ExamStatus.SCHEDULED) throw new Error('Can only start a scheduled exam.');
    this.status = ExamStatus.IN_PROGRESS;
  }

  submit(score: number): void {
    if (this.status !== ExamStatus.IN_PROGRESS) throw new Error('Exam is not in progress.');
    this.score = score;
    this.status = ExamStatus.SUBMITTED;
  }

  evaluate(finalScore: number): void {
    if (this.status !== ExamStatus.SUBMITTED) throw new Error('Exam must be submitted first.');
    this.score = finalScore;
    this.status = ExamStatus.EVALUATED;
  }
}
