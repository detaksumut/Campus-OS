import { IdentityContext } from './IdentityContext';

export interface AuthenticatedIdentity {
    userId: string;
    primaryIdentifier: string;
    identityCategory: 'Student' | 'Lecturer' | 'Employee' | 'Guest';
    tenantId: string;
    campusId: string;
    authenticationMethod: string;
    authenticationTime: Date;
    identityStatus: string;
}

export interface AuthorizationContext {
    roles: readonly string[];
    permissions: readonly string[];
    organizationUnitId: string | null;
    tenantScope: string;
    policyResult: boolean;
}
