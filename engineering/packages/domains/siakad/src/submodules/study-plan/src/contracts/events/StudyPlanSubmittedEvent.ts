export interface StudyPlanSubmittedEvent {
  readonly id: string;
  readonly occurredOn: Date;
  readonly version: number;
  readonly type: 'StudyPlanSubmittedEvent';
  readonly payload: any;
}
