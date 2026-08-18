import { IMiddleware, ICommandContext } from '../IMiddleware';
import { CapabilityResolver } from '../../security/CapabilityResolver';
import { PermissionEngine } from '../../security/PermissionEngine';
import { AuthorizationStatus, AuthorizationResult } from '../../security/AuthorizationResult';
import { QueryBus } from '../../bus/QueryBus';
import { RegistryRuntime } from '../../registry/RegistryRuntime';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private resolver: CapabilityResolver,
    private engine: PermissionEngine,
    private queryBus: QueryBus,
    private registry: RegistryRuntime
  ) {}

  public async execute(context: ICommandContext, next: () => Promise<any>): Promise<any> {
    if (!context.appContext) {
      return this.handleResult({ status: AuthorizationStatus.INVALID_CONTEXT, message: 'Missing Application Context' });
    }

    const capability = await this.resolver.resolve(context.commandId);
    if (!capability) {
      return this.handleResult({ status: AuthorizationStatus.CAPABILITY_DISABLED, message: `Capability not found: ${context.commandId}` });
    }

    const constraintContext = {
      applicationContext: context.appContext,
      payload: context.payload,
      queryBus: this.queryBus,
      registry: this.registry
    };

    const result = await this.engine.evaluate(capability, constraintContext);

    if (result.status === AuthorizationStatus.AUTHORIZED) {
      return next();
    }

    return this.handleResult(result);
  }

  /**
   * Instead of throwing, we return the AuthorizationResult down the pipeline.
   * A downstream ExceptionMapper middleware or transport layer can convert this to 401/403.
   */
  private handleResult(result: AuthorizationResult): any {
    // We wrap it in an object that the caller can identify, or we could throw an AuthorizationError.
    // Based on user feedback: "middleware tidak melempar exception secara langsung... Middleware -> AuthorizationResult -> Pipeline -> Exception Mapper".
    // So we return the result object itself. The caller (CommandBus) will receive this result.
    return {
      __isAuthorizationResult: true,
      ...result
    };
  }
}
