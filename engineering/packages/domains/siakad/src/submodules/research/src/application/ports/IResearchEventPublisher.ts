export interface IResearchEventPublisher {
  publish(event: any): Promise<void>;
}
