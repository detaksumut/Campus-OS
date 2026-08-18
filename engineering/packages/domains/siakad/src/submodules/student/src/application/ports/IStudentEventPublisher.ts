export interface IStudentEventPublisher {
  publish(event: any): Promise<void>;
}
