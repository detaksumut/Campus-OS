export interface ISessionAdapter {
  saveSession(session: SessionData): Promise<void>;
  getSession(id: string): Promise<SessionData | null>;
}

export interface SessionData {
  id: string;
  principal: string;
  tenant: string;
  claims: string[];
  expires: number;
  metadata: Record<string, any>;
}

export class SessionRuntime {
  constructor(private adapter: ISessionAdapter) {}

  async createSession(principal: string, tenant: string, claims: string[]): Promise<SessionData> {
    const session: SessionData = {
      id: `sess_${Date.now()}`,
      principal,
      tenant,
      claims,
      expires: Date.now() + 3600000,
      metadata: {}
    };
    
    await this.adapter.saveSession(session);
    return session;
  }
}
