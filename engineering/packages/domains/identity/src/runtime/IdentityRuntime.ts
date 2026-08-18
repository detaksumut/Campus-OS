import { IdentityContext } from '../contracts/IdentityContext';
import { AuthenticationRuntime } from './AuthenticationRuntime';
import { AuthorizationRuntime } from './AuthorizationRuntime';
import { SessionManager } from '../infrastructure/SessionManager';

export class IdentityRuntime {
    constructor(
        private authenticationRuntime: AuthenticationRuntime,
        private authorizationRuntime: AuthorizationRuntime,
        private sessionManager: SessionManager
    ) {}

    public async processLogin(credentials: any): Promise<IdentityContext> {
        // 1. Authenticate (Who?)
        const authenticatedIdentity = await this.authenticationRuntime.authenticate(credentials);

        // 2. Authorize (What can they do?)
        const authorizationContext = await this.authorizationRuntime.authorize(authenticatedIdentity);

        // 3. Create Session
        const sessionId = await this.sessionManager.createSession(
            authenticatedIdentity.userId,
            authenticatedIdentity.tenantId
        );

        // 4. Orchestrate into Immutable IdentityContext
        const identityContext: IdentityContext = Object.freeze({
            userId: authenticatedIdentity.userId,
            primaryIdentifier: authenticatedIdentity.primaryIdentifier,
            identityCategory: authenticatedIdentity.identityCategory,
            tenantId: authenticatedIdentity.tenantId,
            campusId: authenticatedIdentity.campusId,
            sessionId: sessionId,
            authMethod: authenticatedIdentity.authenticationMethod,
            organizationUnitId: authorizationContext.organizationUnitId,
            roles: Object.freeze([...authorizationContext.roles]),
            permissions: Object.freeze([...authorizationContext.permissions])
        });

        return identityContext;
    }
}
