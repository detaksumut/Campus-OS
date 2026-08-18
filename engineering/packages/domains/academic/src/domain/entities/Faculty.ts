import { OrganizationUnit, OrganizationUnitType } from './OrganizationUnit';

export class Faculty extends OrganizationUnit {
    constructor(
        id: string,
        name: string,
        code: string,
        campusId: string
    ) {
        super(id, OrganizationUnitType.Faculty, name, code, true, campusId);
    }

    public static create(name: string, code: string, campusId: string): Faculty {
        const id = `FAC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new Faculty(id, name, code, campusId);
    }
}
