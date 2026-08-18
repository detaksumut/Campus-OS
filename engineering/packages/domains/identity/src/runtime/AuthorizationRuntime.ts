import { AuthenticatedIdentity, AuthorizationContext } from '../contracts/RuntimeContexts';

export class AuthorizationRuntime {
    public async authorize(identity: AuthenticatedIdentity): Promise<AuthorizationContext> {
        // Evaluate policies (e.g., active status, specific campus rules)
        const policyResult = this.evaluatePolicies(identity);
        
        if (!policyResult) {
            throw new Error('Authorization denied by policy evaluation');
        }

        // In a real system, roles and permissions would be fetched from a database based on userId and tenantId.
        const roles = identity.identityCategory === 'Student' ? ['Student', 'Author'] : ['Guest'];
        const permissions = identity.identityCategory === 'Student' ? ['journal.submit', 'course.view'] : [];

        return {
            roles,
            permissions,
            organizationUnitId: 'ORG-FT-001', // Mocked lookup
            tenantScope: identity.tenantId,
            policyResult: true
        };
    }

    private evaluatePolicies(identity: AuthenticatedIdentity): boolean {
        // Policy: Only active identities can be authorized
        if (identity.identityStatus !== 'Active') {
            return false;
        }
        return true;
    }
}
