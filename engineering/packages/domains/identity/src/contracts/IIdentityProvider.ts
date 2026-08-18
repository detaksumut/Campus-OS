import { IdentityContext } from './IdentityContext';

export interface IIdentityProvider {
    authenticate(credentials: any): Promise<boolean>;
    resolveIdentity(userId: string): Promise<any>; // Can return IdentityAggregate later
    resolveContext(userId: string, sessionId: string): Promise<IdentityContext>;
    assignRole(userId: string, role: string, organizationUnitId?: string): Promise<void>;
    revokeRole(userId: string, role: string, organizationUnitId?: string): Promise<void>;
    grantPermission(userId: string, permission: string, organizationUnitId?: string): Promise<void>;
    revokePermission(userId: string, permission: string, organizationUnitId?: string): Promise<void>;
}
