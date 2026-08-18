import { IdentityContext } from '@campus-os/identity/src/contracts';
import { Faculty } from '../domain/entities/Faculty';
import { FacultyCreated_v1 } from '../domain/events/AcademicEvents';

export class FacultyService {
    public async createFaculty(context: IdentityContext, name: string, code: string, campusId: string): Promise<Faculty> {
        this.enforcePermission(context);
        const faculty = Faculty.create(name, code, campusId);
        // Emit FacultyCreated_v1
        return faculty;
    }

    private enforcePermission(context: IdentityContext): void {
        if (!context.permissions.includes('academic.masterdata.manage')) {
            throw new Error('Forbidden: Missing academic.masterdata.manage permission');
        }
    }
}
