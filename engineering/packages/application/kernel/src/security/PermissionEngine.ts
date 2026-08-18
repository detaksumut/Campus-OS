import { AuthorizationResult, AuthorizationStatus } from './AuthorizationResult';
import { ICapabilityDefinition } from '../registry/IRegistryProvider';
import { ConstraintRegistry } from './ConstraintRegistry';
import { ConstraintContext } from './IConstraint';

export class PermissionEngine {
  constructor(private constraintRegistry: ConstraintRegistry) {}

  public async evaluate(
    capability: ICapabilityDefinition,
    context: ConstraintContext
  ): Promise<AuthorizationResult> {
    const { identity } = context.applicationContext;

    // 1. Unauthenticated check
    if (!identity) {
      return { status: AuthorizationStatus.UNAUTHENTICATED, message: 'No identity found in context' };
    }

    // 2. Permission/Role check
    if (capability.requiredPermissions && capability.requiredPermissions.length > 0) {
      const hasPermission = capability.requiredPermissions.some(p => 
        identity.roles.includes(p) || (context.applicationContext.permissions || []).includes(p)
      );

      if (!hasPermission) {
        return { 
          status: AuthorizationStatus.MISSING_PERMISSION, 
          message: 'User lacks required permissions for this capability',
          metadata: { required: capability.requiredPermissions }
        };
      }
    }

    // 3. Extensibility: Evaluate capability-specific constraints attached to the definition
    // Assuming capability metadata might specify `constraints: string[]`
    const constraintsToEvaluate: string[] = (capability as any).constraints || [];
    
    for (const constraintId of constraintsToEvaluate) {
      const constraint = this.constraintRegistry.get(constraintId);
      if (!constraint) {
        throw new Error(`Missing constraint implementation for ${constraintId}`);
      }

      const passed = await constraint.evaluate(context);
      if (!passed) {
        return { 
          status: AuthorizationStatus.CONSTRAINT_FAILED, 
          message: `Constraint failed: ${constraintId}`,
          metadata: { constraintId }
        };
      }
    }

    return { status: AuthorizationStatus.AUTHORIZED };
  }
}
