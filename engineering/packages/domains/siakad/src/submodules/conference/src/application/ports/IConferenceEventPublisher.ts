export interface IConferenceEventPublisher {
  publish(event: any): Promise<void>;
}
