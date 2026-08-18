import { IAuthenticationProvider } from '../contracts/IIdentityService';

export class AuthenticationProvider implements IAuthenticationProvider {
  async authenticate(credentials: any): Promise<any> {
    console.log('[IdentityService] Authenticating user...');
    // Mock authentication logic
    if (credentials.username === 'admin' && credentials.password === 'campus123') {
      return { id: 'usr-1', role: 'admin' };
    }
    throw new Error('Invalid credentials');
  }
}
