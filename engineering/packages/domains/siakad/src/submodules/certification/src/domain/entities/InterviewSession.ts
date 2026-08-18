import { InterviewId } from '../value-objects/CertificationValueObjects';
import { InterviewStatus } from '../types/CertificationEnums';
import { AssessmentPanel } from './AssessmentPanel';

export class InterviewSession {
  private interviewResult?: string;
  private interviewScore?: number;

  constructor(
    private readonly interviewId: InterviewId,
    private readonly scheduledTime: Date,
    private readonly panel: AssessmentPanel,
    private status: InterviewStatus = InterviewStatus.SCHEDULED
  ) {}

  get id(): InterviewId { return this.interviewId; }
  get currentStatus(): InterviewStatus { return this.status; }
  get result(): string | undefined { return this.interviewResult; }
  get score(): number | undefined { return this.interviewScore; }
  get currentPanel(): AssessmentPanel { return this.panel; }

  start(): void {
    if (this.status !== InterviewStatus.SCHEDULED) throw new Error('Can only start a scheduled interview.');
    this.status = InterviewStatus.IN_PROGRESS;
  }

  complete(score: number, resultNotes: string): void {
    if (this.status !== InterviewStatus.IN_PROGRESS) throw new Error('Interview is not in progress.');
    this.interviewScore = score;
    this.interviewResult = resultNotes;
    this.status = InterviewStatus.COMPLETED;
  }
}
