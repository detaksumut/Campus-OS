import { IdentityContext } from '@campus-os/identity/src/contracts';
import { CampusService } from './services/CampusService';
import { FacultyService } from './services/FacultyService';
import { StudyProgramService } from './services/StudyProgramService';
import { AcademicCalendarService } from './services/AcademicCalendarService';
import { EducationLevel } from '../domain/entities/EducationLevel';
import { StudyProgramType } from '../domain/entities/StudyProgramType';
import { TermType } from '../domain/entities/AcademicTerm';

export class AcademicMasterDataRuntime {
    constructor(
        private readonly campusService: CampusService,
        private readonly facultyService: FacultyService,
        private readonly studyProgramService: StudyProgramService,
        private readonly calendarService: AcademicCalendarService
    ) {}

    public async registerCampus(context: IdentityContext, name: string, code: string, location: string) {
        return this.campusService.createCampus(context, name, code, location);
    }

    public async registerFaculty(context: IdentityContext, name: string, code: string, campusId: string) {
        return this.facultyService.createFaculty(context, name, code, campusId);
    }

    public async registerStudyProgram(
        context: IdentityContext, 
        name: string, 
        code: string, 
        level: EducationLevel, 
        type: StudyProgramType, 
        parentId: string
    ) {
        return this.studyProgramService.createStudyProgram(context, name, code, level, type, parentId);
    }

    public async initializeAcademicYear(context: IdentityContext, startYear: number, endYear: number) {
        return this.calendarService.openAcademicYear(context, startYear, endYear);
    }

    public async startAcademicTerm(context: IdentityContext, yearId: string, termType: TermType, name: string) {
        return this.calendarService.openAcademicTerm(context, yearId, termType, name);
    }
}
