export interface ICalendarEventPublisher {
  publish(event: any): Promise<void>;
}
