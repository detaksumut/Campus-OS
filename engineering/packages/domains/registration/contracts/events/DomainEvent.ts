export interface DomainEvent<TPayload> {
  readonly eventId: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly eventType: string;
  readonly version: number;
  readonly occurredAt: Date;
  readonly payload: TPayload;
}
