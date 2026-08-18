import { AcademicCalendar } from '../../domain/entities/AcademicCalendar';
import { AcademicYearId, SemesterId } from '../../domain/value-objects/CalendarValueObjects';

export interface ICalendarRepository {
  save(calendar: AcademicCalendar): Promise<void>;
  findByIds(yearId: AcademicYearId, semesterId: SemesterId): Promise<AcademicCalendar | null>;
}
