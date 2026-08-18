import { DefinePeriodCommand } from '../commands/CalendarCommands';
import { ICalendarRepository } from '../ports/ICalendarRepository';
import { ICalendarEventPublisher } from '../ports/ICalendarEventPublisher';
import { AcademicYearId, SemesterId, AcademicPeriodId } from '../../domain/value-objects/CalendarValueObjects';
import { AcademicPeriod } from '../../domain/entities/AcademicPeriod';
import { AcademicPeriodType } from '../../domain/types/CalendarEnums';
import { PeriodOpenedEvent } from '../../domain/events/AcademicCalendarEvents';

export class DefinePeriodUseCase {
  constructor(
    private readonly repository: ICalendarRepository,
    private readonly eventPublisher: ICalendarEventPublisher
  ) {}

  async execute(command: DefinePeriodCommand): Promise<void> {
    const calendar = await this.repository.findByIds(
      new AcademicYearId(command.academicYear),
      new SemesterId(command.semester)
    );

    if (!calendar) throw new Error('Academic Calendar not found.');

    const period = new AcademicPeriod(
      new AcademicPeriodId(`PER-${Date.now()}`),
      command.periodType as AcademicPeriodType,
      command.name,
      command.startDate,
      command.endDate
    );

    calendar.addPeriod(period);
    await this.repository.save(calendar);

    // Normally this event is fired by a cron job checking dates, but for manual overrides we fire it here
    const now = new Date();
    if (period.isActive(now)) {
      await this.eventPublisher.publish(
        new PeriodOpenedEvent(command.academicYear, command.semester, command.periodType)
      );
    }
  }
}
