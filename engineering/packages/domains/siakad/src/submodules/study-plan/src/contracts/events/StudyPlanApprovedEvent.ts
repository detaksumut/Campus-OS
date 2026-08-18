export interface StudyPlanApprovedEvent {
  readonly id: string;
  readonly occurredOn: Date;
  readonly version: number;
  readonly type: 'StudyPlanApprovedEvent';
  readonly payload: any;
}
