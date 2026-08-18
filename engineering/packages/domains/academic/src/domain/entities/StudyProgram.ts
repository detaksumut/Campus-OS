import { OrganizationUnit, OrganizationUnitType } from './OrganizationUnit';
import { EducationLevel } from './EducationLevel';
import { StudyProgramType } from './StudyProgramType';

export class StudyProgram extends OrganizationUnit {
    constructor(
        id: string,
        name: string,
        code: string,
        public educationLevel: EducationLevel,
        public programType: StudyProgramType,
        parentId: string // Can be Faculty or Department depending on institution structure
    ) {
        super(id, OrganizationUnitType.StudyProgram, name, code, true, parentId);
    }

    public static create(
        name: string, 
        code: string, 
        educationLevel: EducationLevel, 
        programType: StudyProgramType, 
        parentId: string
    ): StudyProgram {
        const id = `PRG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new StudyProgram(id, name, code, educationLevel, programType, parentId);
    }
}
