export interface ICourseOfferingEventPublisher {
  publish(event: any): Promise<void>;
}
