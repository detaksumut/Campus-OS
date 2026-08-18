export interface ICorrelationContext {
  correlationId: string;
  requestId: string;
  traceId: string;
  tenantId?: string;
  actorId?: string;
}
