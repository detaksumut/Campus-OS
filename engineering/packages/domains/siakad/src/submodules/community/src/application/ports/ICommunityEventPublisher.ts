export interface ICommunityEventPublisher {
  publish(event: any): Promise<void>;
}
