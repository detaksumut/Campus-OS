export interface IOrganizationUnitProvider {
    resolveOrganizationUnit(organizationUnitId: string): Promise<any>; // Resolves structural hierarchy
    getParentUnit(organizationUnitId: string): Promise<string | null>;
}
