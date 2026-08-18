export interface IAuthenticationProvider {
  authenticate(credentials: any): Promise<any>;
}

export interface ITokenManager {
  generateToken(payload: any): Promise<string>;
  validateToken(token: string): Promise<boolean>;
}

export interface IPermissionEvaluator {
  hasPermission(userId: string, capability: string): Promise<boolean>;
}

export interface IIdentityService extends IAuthenticationProvider, ITokenManager, IPermissionEvaluator {}
