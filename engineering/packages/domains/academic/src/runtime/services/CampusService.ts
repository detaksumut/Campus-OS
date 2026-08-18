import { IdentityContext } from '@campus-os/identity/src/contracts';
import { Campus } from '../domain/entities/Campus';
import { CampusCreated_v1 } from '../domain/events/AcademicEvents';

export class CampusService {
    public async createCampus(context: IdentityContext, name: string, code: string, location: string): Promise<Campus> {
        this.enforcePermission(context);
        const campus = Campus.create(name, code, location);
        // Emit CampusCreated_v1
        return campus;
    }

    private enforcePermission(context: IdentityContext): void {
        if (!context.permissions.includes('academic.masterdata.manage')) {
            throw new Error('Forbidden: Missing academic.masterdata.manage permission');
        }
    }
}
