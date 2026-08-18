export interface EventEnvelope<T> {
  metadata: {
    eventId: string;
    version: number;
    schemaVersion: string;
    timestamp: number;
    correlationId: string;
    tenantId?: string;
  };
  payload: T;
}
