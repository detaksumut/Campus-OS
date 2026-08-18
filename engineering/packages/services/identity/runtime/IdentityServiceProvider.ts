import { AuthenticationProvider } from '../application/AuthenticationProvider';
import { TokenManager } from '../application/TokenManager';
import { PermissionEvaluator } from '../application/PermissionEvaluator';
import { IIdentityService } from '../contracts/IIdentityService';
import { IServiceLifecycle, HealthStatus } from '../../../services/runtime/src/contracts/IServiceLifecycle';

export class IdentityServiceProvider implements IIdentityService, IServiceLifecycle {
  private authProvider = new AuthenticationProvider();
  private tokenManager = new TokenManager();
  private permissionEvaluator = new PermissionEvaluator();
  private _health = HealthStatus.Unknown;

  async initialize(): Promise<void> { this._health = HealthStatus.Initializing; }
  async boot(): Promise<void> { }
  async ready(): Promise<void> { this._health = HealthStatus.Ready; }
  async shutdown(): Promise<void> { this._health = HealthStatus.Stopped; }
  async dispose(): Promise<void> { }
  health(): HealthStatus { return this._health; }

  async authenticate(credentials: any): Promise<any> {
    return this.authProvider.authenticate(credentials);
  }

  async generateToken(payload: any): Promise<string> {
    return this.tokenManager.generateToken(payload);
  }

  async validateToken(token: string): Promise<boolean> {
    return this.tokenManager.validateToken(token);
  }

  async hasPermission(userId: string, capability: string): Promise<boolean> {
    return this.permissionEvaluator.hasPermission(userId, capability);
  }
}
