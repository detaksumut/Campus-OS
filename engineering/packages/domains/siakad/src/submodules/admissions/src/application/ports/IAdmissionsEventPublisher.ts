export interface IAdmissionsEventPublisher {
  publish(event: any): Promise<void>;
}
