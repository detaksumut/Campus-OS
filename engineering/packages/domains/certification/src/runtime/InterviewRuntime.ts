import { IInterviewRuntime, InterviewDto, InterviewLifecycle, InterviewEvaluation } from '../contracts';
import { ISchemeRuntime } from '../contracts';
import { IEventBus } from '@campus-os/kernel';
import { CertificationEvents } from './CertificationEvents';

export class InterviewRuntime implements IInterviewRuntime {
  private interviews = new Map<string, InterviewDto>();

  constructor(
    private schemeRuntime: ISchemeRuntime,
    private eventBus: IEventBus
  ) {}

  async scheduleInterview(
    applicationId: string, schemeId: string, applicantId: string,
    interviewerId: string, scheduledAt: number
  ): Promise<string> {
    const scheme = await this.schemeRuntime.getScheme(schemeId);
    if (!scheme) throw new Error('Scheme not found');
    const component = scheme.assessmentComponents.find(c => c.method === 'Interview');
    if (!component) throw new Error('This scheme does not include an Interview component');

    const interviewId = `interview_${Date.now()}`;
    this.interviews.set(interviewId, {
      interviewId, applicationId, schemeId, applicantId, interviewerId,
      scheduledAt, state: 'Scheduled'
    });
    this.eventBus.emit(CertificationEvents.InterviewScheduled, { interviewId, applicationId, interviewerId });
    return interviewId;
  }

  private getOrThrow(interviewId: string): InterviewDto {
    const i = this.interviews.get(interviewId);
    if (!i) throw new Error('Interview not found');
    return i;
  }

  async conductInterview(interviewId: string): Promise<void> {
    const i = this.getOrThrow(interviewId);
    if (i.state !== 'Scheduled') throw new Error(`Cannot conduct interview from state '${i.state}'`);
    i.state = 'Conducted';
    i.conductedAt = Date.now();
    this.eventBus.emit(CertificationEvents.InterviewConducted, { interviewId, applicationId: i.applicationId });
  }

  async evaluateInterview(interviewId: string, evaluation: InterviewEvaluation): Promise<void> {
    const i = this.getOrThrow(interviewId);
    if (i.state !== 'Conducted') throw new Error(`Cannot evaluate interview from state '${i.state}'`);
    i.evaluation = evaluation;
    i.state = 'Evaluated';
    const passed = evaluation.recommendation === 'Pass';
    this.eventBus.emit(CertificationEvents.InterviewEvaluated, {
      interviewId, applicationId: i.applicationId, recommendation: evaluation.recommendation, passed
    });
  }

  async cancel(interviewId: string): Promise<void> {
    const i = this.getOrThrow(interviewId);
    i.state = 'Cancelled';
  }

  async getInterview(interviewId: string): Promise<InterviewDto | null> {
    return this.interviews.get(interviewId) || null;
  }

  async getByApplication(applicationId: string): Promise<InterviewDto | null> {
    return Array.from(this.interviews.values()).find(i => i.applicationId === applicationId) || null;
  }
}
