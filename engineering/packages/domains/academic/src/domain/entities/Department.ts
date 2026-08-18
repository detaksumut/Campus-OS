import { OrganizationUnit, OrganizationUnitType } from './OrganizationUnit';

export class Department extends OrganizationUnit {
    constructor(
        id: string,
        name: string,
        code: string,
        facultyId: string
    ) {
        super(id, OrganizationUnitType.Department, name, code, true, facultyId);
    }

    public static create(name: string, code: string, facultyId: string): Department {
        const id = `DPT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new Department(id, name, code, facultyId);
    }
}
