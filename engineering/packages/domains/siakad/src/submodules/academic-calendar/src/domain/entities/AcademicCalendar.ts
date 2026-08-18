import { AcademicYearId, SemesterId } from '../value-objects/CalendarValueObjects';
import { CalendarStatus } from '../types/CalendarEnums';
import { AcademicPeriod } from './AcademicPeriod';

export class AcademicCalendar {
  private periods: AcademicPeriod[] = [];

  constructor(
    public readonly academicYearId: AcademicYearId,
    public readonly semesterId: SemesterId,
    private status: CalendarStatus,
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {}

  get currentStatus(): CalendarStatus {
    return this.status;
  }

  get allPeriods(): ReadonlyArray<AcademicPeriod> {
    return this.periods;
  }

  publish(): void {
    if (this.status !== CalendarStatus.DRAFT) {
      throw new Error('Only DRAFT calendar can be published.');
    }
    this.status = CalendarStatus.PUBLISHED;
  }

  addPeriod(period: AcademicPeriod): void {
    if (this.status !== CalendarStatus.DRAFT) {
      throw new Error('Periods can only be modified while in DRAFT status.');
    }
    this.periods.push(period);
  }
}
