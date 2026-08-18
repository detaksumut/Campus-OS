import { Subject } from './AuthenticationProvider';

/**
 * Agnostic Authorization Provider Contract.
 * Enforces Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).
 */
export interface IAuthorizationProvider {
  /**
   * Checks if the subject has the required permission. (RBAC)
   */
  hasPermission(subject: Subject, permission: string): Promise<boolean>;

  /**
   * Checks if the subject has access to the specific resource. (ABAC)
   */
  canAccessResource(subject: Subject, permission: string, resourceId: string): Promise<boolean>;
}
