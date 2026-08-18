export enum AuthorizationStatus {
  AUTHORIZED = 'AUTHORIZED',
  DENIED = 'DENIED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  INVALID_CONTEXT = 'INVALID_CONTEXT',
  MISSING_PERMISSION = 'MISSING_PERMISSION',
  CAPABILITY_DISABLED = 'CAPABILITY_DISABLED',
  TENANT_MISMATCH = 'TENANT_MISMATCH',
  EXPIRED_IDENTITY = 'EXPIRED_IDENTITY',
  CONSTRAINT_FAILED = 'CONSTRAINT_FAILED'
}

export interface AuthorizationResult {
  status: AuthorizationStatus;
  message?: string;
  metadata?: any;
}

export class AuthorizationError extends Error {
  constructor(public readonly result: AuthorizationResult) {
    super(`Authorization failed: ${result.status} - ${result.message || ''}`);
    this.name = 'AuthorizationError';
  }
}
