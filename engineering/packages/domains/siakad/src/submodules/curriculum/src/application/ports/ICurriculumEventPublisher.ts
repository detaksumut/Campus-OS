export interface ICurriculumEventPublisher {
  publish(event: any): Promise<void>;
}
