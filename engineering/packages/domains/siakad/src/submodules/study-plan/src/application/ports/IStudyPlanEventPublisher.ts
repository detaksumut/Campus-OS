export interface IStudyPlanEventPublisher {
  publish(event: any): Promise<void>;
}
