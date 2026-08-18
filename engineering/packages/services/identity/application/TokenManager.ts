import { ITokenManager } from '../contracts/IIdentityService';

export class TokenManager implements ITokenManager {
  async generateToken(payload: any): Promise<string> {
    console.log('[IdentityService] Generating JWT...');
    // Mock JWT generation
    return `jwt-mock-token-for-${payload.id}`;
  }

  async validateToken(token: string): Promise<boolean> {
    console.log('[IdentityService] Validating JWT...');
    return token.startsWith('jwt-mock-token');
  }
}
