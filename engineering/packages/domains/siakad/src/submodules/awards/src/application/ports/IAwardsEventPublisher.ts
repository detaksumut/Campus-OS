export interface IAwardsEventPublisher {
  publish(event: any): Promise<void>;
}
