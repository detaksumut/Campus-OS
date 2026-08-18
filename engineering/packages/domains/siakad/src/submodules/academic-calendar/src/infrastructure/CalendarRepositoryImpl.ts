import { ICalendarRepository } from '../application/ports/ICalendarRepository';
import { AcademicCalendar } from '../domain/entities/AcademicCalendar';
import { AcademicPeriod } from '../domain/entities/AcademicPeriod';
import { AcademicYearId, SemesterId, AcademicPeriodId } from '../domain/value-objects/CalendarValueObjects';
import { CalendarStatus, AcademicPeriodType } from '../domain/types/CalendarEnums';
import { IDatabaseExecutor } from '../../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Shared Kernel Port

export class CalendarRepositoryImpl implements ICalendarRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async save(calendar: AcademicCalendar): Promise<void> {
    const sqlCalendar = `
      INSERT INTO siakad_calendar.academic_calendars (academic_year_id, semester_id, status, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (academic_year_id, semester_id) DO UPDATE SET
        status = EXCLUDED.status,
        start_date = EXCLUDED.start_date,
        end_date = EXCLUDED.end_date;
    `;
    await this.db.execute(sqlCalendar, [
      calendar.academicYearId.getValue(),
      calendar.semesterId.getValue(),
      calendar.currentStatus,
      calendar.startDate,
      calendar.endDate
    ]);

    for (const period of calendar.allPeriods) {
      const sqlPeriod = `
        INSERT INTO siakad_calendar.academic_periods (period_id, academic_year_id, semester_id, type, name, start_date, end_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (period_id) DO UPDATE SET
          type = EXCLUDED.type,
          name = EXCLUDED.name,
          start_date = EXCLUDED.start_date,
          end_date = EXCLUDED.end_date;
      `;
      await this.db.execute(sqlPeriod, [
        period.id.getValue(),
        calendar.academicYearId.getValue(),
        calendar.semesterId.getValue(),
        period.type,
        period.name,
        period.startDate,
        period.endDate
      ]);
    }
  }

  async findByIds(yearId: AcademicYearId, semesterId: SemesterId): Promise<AcademicCalendar | null> {
    const cRows = await this.db.query(
      `SELECT * FROM siakad_calendar.academic_calendars WHERE academic_year_id = $1 AND semester_id = $2`,
      [yearId.getValue(), semesterId.getValue()]
    );

    if (cRows.length === 0) return null;
    const cRow = cRows[0];

    const calendar = new AcademicCalendar(
      new AcademicYearId(cRow.academic_year_id),
      new SemesterId(cRow.semester_id),
      cRow.status as CalendarStatus,
      new Date(cRow.start_date),
      new Date(cRow.end_date)
    );

    const pRows = await this.db.query(
      `SELECT * FROM siakad_calendar.academic_periods WHERE academic_year_id = $1 AND semester_id = $2`,
      [yearId.getValue(), semesterId.getValue()]
    );

    for (const row of pRows) {
      calendar['periods'].push(
        new AcademicPeriod(
          new AcademicPeriodId(row.period_id),
          row.type as AcademicPeriodType,
          row.name,
          new Date(row.start_date),
          new Date(row.end_date)
        )
      );
    }

    return calendar;
  }
}
