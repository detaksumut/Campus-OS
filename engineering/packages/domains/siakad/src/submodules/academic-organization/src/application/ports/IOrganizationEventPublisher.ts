export interface IOrganizationEventPublisher {
  publish(event: any): Promise<void>;
}
