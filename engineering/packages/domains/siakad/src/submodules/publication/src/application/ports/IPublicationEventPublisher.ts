export interface IPublicationEventPublisher {
  publish(event: any): Promise<void>;
}
