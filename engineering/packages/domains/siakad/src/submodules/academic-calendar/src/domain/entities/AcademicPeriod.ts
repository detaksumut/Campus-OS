import { AcademicPeriodId } from '../value-objects/CalendarValueObjects';
import { AcademicPeriodType } from '../types/CalendarEnums';

export class AcademicPeriod {
  constructor(
    public readonly id: AcademicPeriodId,
    public readonly type: AcademicPeriodType,
    public readonly name: string,
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {}

  isActive(onDate: Date = new Date()): boolean {
    return onDate >= this.startDate && onDate <= this.endDate;
  }
}
