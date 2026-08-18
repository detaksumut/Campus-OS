import { IExamRuntime, ExamDto, ExamLifecycle, ExamAttempt, ComponentScore } from '../contracts';
import { ISchemeRuntime, AssessmentMethod, IAssessmentComponent, CertificationScheme, ComponentState } from '../contracts';
import { IEventBus } from '@campus-os/kernel';
import { CertificationEvents } from './CertificationEvents';

export class ExamRuntime implements IExamRuntime, IAssessmentComponent {
  readonly componentType: AssessmentMethod = 'Exam';
  private exams = new Map<string, ExamDto>();

  constructor(
    private schemeRuntime: ISchemeRuntime,
    private eventBus: IEventBus
  ) {}

  async scheduleExam(applicationId: string, schemeId: string, applicantId: string): Promise<string> {
    const scheme = await this.schemeRuntime.getScheme(schemeId);
    if (!scheme) throw new Error('Scheme not found');
    const component = scheme.assessmentComponents.find(c => c.method === 'Exam');
    if (!component) throw new Error('This scheme does not include an Exam component');

    const examId = `exam_${Date.now()}`;
    this.exams.set(examId, {
      examId, applicationId, schemeId, applicantId,
      state: 'Scheduled', currentAttempt: 0,
      maxAttempts: component.maxAttempts, passingThreshold: component.passingThreshold,
      attempts: []
    });
    this.eventBus.emit(CertificationEvents.ExamScheduled, { examId, applicationId, schemeId });
    return examId;
  }

  private getOrThrow(examId: string): ExamDto {
    const e = this.exams.get(examId);
    if (!e) throw new Error('Exam not found');
    return e;
  }

  async startExam(examId: string): Promise<void> {
    const e = this.getOrThrow(examId);
    if (e.state !== 'Scheduled') throw new Error(`Cannot start exam from state '${e.state}'`);
    e.currentAttempt++;
    const attempt: ExamAttempt = { attemptNumber: e.currentAttempt, scheduledAt: Date.now(), startedAt: Date.now() };
    e.attempts.push(attempt);
    e.state = 'In Progress';
    this.eventBus.emit(CertificationEvents.ExamStarted, { examId, applicationId: e.applicationId, attempt: e.currentAttempt });
  }

  async completeExam(examId: string): Promise<void> {
    const e = this.getOrThrow(examId);
    if (e.state !== 'In Progress') throw new Error(`Cannot complete exam from state '${e.state}'`);
    const current = e.attempts[e.attempts.length - 1];
    current.completedAt = Date.now();
    e.state = 'Completed';
    this.eventBus.emit(CertificationEvents.ExamCompleted, { examId, applicationId: e.applicationId });
  }

  async gradeExam(examId: string, rawScore: number, maxScore: number, gradedBy: string): Promise<void> {
    const e = this.getOrThrow(examId);
    if (e.state !== 'Completed') throw new Error(`Cannot grade exam from state '${e.state}'`);
    const percentage = (rawScore / maxScore) * 100;
    const passed = percentage >= e.passingThreshold;
    const score: ComponentScore = { raw: rawScore, max: maxScore, percentage, passed, gradedAt: Date.now(), gradedBy };
    const current = e.attempts[e.attempts.length - 1];
    current.score = score;
    e.state = 'Graded';
    this.eventBus.emit(CertificationEvents.ExamGraded, { examId, applicationId: e.applicationId, passed, percentage });
  }

  async reschedule(examId: string): Promise<void> {
    const e = this.getOrThrow(examId);
    if (e.state !== 'Graded') throw new Error('Can only reschedule after grading');
    if (e.currentAttempt >= e.maxAttempts) throw new Error(`Maximum attempts (${e.maxAttempts}) reached`);
    e.state = 'Scheduled';
  }

  async cancel(examId: string): Promise<void> {
    const e = this.getOrThrow(examId);
    e.state = 'Cancelled';
  }

  async getExam(examId: string): Promise<ExamDto | null> {
    return this.exams.get(examId) || null;
  }

  async getByApplication(applicationId: string): Promise<ExamDto | null> {
    return Array.from(this.exams.values()).find(e => e.applicationId === applicationId) || null;
  }

  // IAssessmentComponent implementation
  getComponentId(): string { return 'exam'; }
  getApplicationId(): string { return ''; }
  getState(): ComponentState { return 'Scheduled'; }
  getScore(): ComponentScore | null { return null; }
  isMandatory(scheme: CertificationScheme): boolean {
    return scheme.assessmentComponents.find(c => c.method === 'Exam')?.required ?? false;
  }
  hasPassedThreshold(scheme: CertificationScheme): boolean {
    const comp = scheme.assessmentComponents.find(c => c.method === 'Exam');
    return true; // Placeholder — evaluated per-attempt in AssessmentRuntime
  }
}
