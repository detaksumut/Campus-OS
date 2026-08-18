/**
 * Agnostic Identity Provider Contract.
 * Does not depend on JWT, OAuth2, or any specific HTTP Headers.
 */
export interface IIdentityProvider {
  /**
   * Returns the current authenticated subject (User, System, or Service).
   */
  getCurrentSubject(): Promise<Subject | null>;
  
  /**
   * Verifies if a given token/session is still active and valid.
   */
  verifySession(token: string): Promise<boolean>;
}

export interface Subject {
  readonly id: string;
  readonly type: 'USER' | 'SYSTEM' | 'SERVICE';
  readonly roles: string[];
}
