import { IdentityContext } from '@campus-os/identity/src/contracts';
import { AcademicYear } from '../domain/entities/AcademicYear';
import { AcademicTerm, TermType } from '../domain/entities/AcademicTerm';
import { AcademicYearOpened_v1, AcademicYearClosed_v1, AcademicTermOpened_v1 } from '../domain/events/AcademicEvents';

export class AcademicCalendarService {
    public async openAcademicYear(context: IdentityContext, startYear: number, endYear: number): Promise<AcademicYear> {
        this.enforcePermission(context);
        const year = AcademicYear.create(startYear, endYear);
        year.open();
        // Emit AcademicYearOpened_v1
        return year;
    }

    public async openAcademicTerm(context: IdentityContext, yearId: string, termType: TermType, name: string): Promise<AcademicTerm> {
        this.enforcePermission(context);
        const term = AcademicTerm.create(yearId, termType, name);
        term.open();
        // Emit AcademicTermOpened_v1
        return term;
    }

    private enforcePermission(context: IdentityContext): void {
        if (!context.permissions.includes('academic.masterdata.manage')) {
            throw new Error('Forbidden: Missing academic.masterdata.manage permission');
        }
    }
}
