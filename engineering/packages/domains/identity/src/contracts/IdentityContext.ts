export interface IdentityContext {
    readonly userId: string;
    readonly primaryIdentifier: string;
    readonly identityCategory: 'Student' | 'Lecturer' | 'Employee' | 'Guest';
    readonly tenantId: string;
    readonly campusId: string;
    readonly sessionId: string;
    readonly authMethod: string;
    readonly organizationUnitId: string | null;
    readonly roles: readonly string[];
    readonly permissions: readonly string[];
}
