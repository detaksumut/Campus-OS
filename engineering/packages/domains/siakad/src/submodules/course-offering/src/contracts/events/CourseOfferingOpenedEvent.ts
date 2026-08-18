export interface CourseOfferingOpenedEvent {
  readonly id: string;
  readonly occurredOn: Date;
  readonly version: number;
  readonly type: 'CourseOfferingOpenedEvent';
  readonly payload: any;
}
