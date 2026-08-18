import { IdentityContext } from '@campus-os/identity/src/contracts';
import { StudyProgram } from '../domain/entities/StudyProgram';
import { EducationLevel } from '../domain/entities/EducationLevel';
import { StudyProgramType } from '../domain/entities/StudyProgramType';
import { StudyProgramCreated_v1, StudyProgramArchived_v1 } from '../domain/events/AcademicEvents';

export class StudyProgramService {
    public async createStudyProgram(
        context: IdentityContext, 
        name: string, 
        code: string, 
        level: EducationLevel, 
        type: StudyProgramType, 
        parentId: string
    ): Promise<StudyProgram> {
        this.enforcePermission(context);
        const program = StudyProgram.create(name, code, level, type, parentId);
        // Emit StudyProgramCreated_v1
        return program;
    }

    public async archiveStudyProgram(context: IdentityContext, programId: string): Promise<void> {
        this.enforcePermission(context);
        // Load program, archive, and emit StudyProgramArchived_v1
    }

    private enforcePermission(context: IdentityContext): void {
        if (!context.permissions.includes('academic.masterdata.manage')) {
            throw new Error('Forbidden: Missing academic.masterdata.manage permission');
        }
    }
}
