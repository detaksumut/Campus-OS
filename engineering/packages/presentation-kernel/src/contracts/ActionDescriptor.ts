export type ActionCategory = 'Primary' | 'Secondary' | 'Destructive' | 'Background';
export type RetryPolicy = 'none' | 'exponential' | 'linear';

export interface ActionDescriptor {
  id: string;
  name: string;
  category: ActionCategory;
  permission?: string;
  payloadSchema?: Record<string, any>;
  resultSchema?: Record<string, any>;
  confirmation?: {
    required: boolean;
    message?: string;
  };
  telemetry: boolean;
  audit: boolean;
  undoable: boolean;
  idempotent: boolean;
  retryPolicy: RetryPolicy;
}
