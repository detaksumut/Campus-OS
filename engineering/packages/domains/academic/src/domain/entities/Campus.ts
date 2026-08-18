import { OrganizationUnit, OrganizationUnitType } from './OrganizationUnit';

export class Campus extends OrganizationUnit {
    constructor(
        id: string,
        name: string,
        code: string,
        public location: string
    ) {
        super(id, OrganizationUnitType.Campus, name, code, true, null);
    }

    public static create(name: string, code: string, location: string): Campus {
        const id = `CMP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new Campus(id, name, code, location);
    }
}
