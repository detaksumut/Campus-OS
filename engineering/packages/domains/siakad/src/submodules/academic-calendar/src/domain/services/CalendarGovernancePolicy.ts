import { AcademicCalendar } from '../entities/AcademicCalendar';
import { AcademicPeriodType, CalendarStatus } from '../types/CalendarEnums';

export class CalendarGovernancePolicy {
  /**
   * Determines if a specific operational period is active today.
   */
  static isPeriodActive(calendar: AcademicCalendar, type: AcademicPeriodType, date: Date = new Date()): boolean {
    if (calendar.currentStatus !== CalendarStatus.PUBLISHED) return false;
    
    const period = calendar.allPeriods.find(p => p.type === type);
    return period ? period.isActive(date) : false;
  }
}
