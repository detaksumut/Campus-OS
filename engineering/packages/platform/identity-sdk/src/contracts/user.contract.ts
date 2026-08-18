import { Capability } from './capability.contract';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  activeTenantId: string;
}

export interface UserSession {
  sessionId: string;
  user: User;
  capabilities: Capability[];
  expiresAt: number;
}
