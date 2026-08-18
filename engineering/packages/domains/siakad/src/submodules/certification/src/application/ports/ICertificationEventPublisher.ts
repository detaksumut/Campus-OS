export interface ICertificationEventPublisher {
  publish(event: any): Promise<void>;
}
