import { PublishCalendarCommand } from '../commands/CalendarCommands';
import { ICalendarRepository } from '../ports/ICalendarRepository';
import { ICalendarEventPublisher } from '../ports/ICalendarEventPublisher';
import { AcademicYearId, SemesterId } from '../../domain/value-objects/CalendarValueObjects';
import { SemesterStartedEvent } from '../../domain/events/AcademicCalendarEvents';

export class PublishCalendarUseCase {
  constructor(
    private readonly repository: ICalendarRepository,
    private readonly eventPublisher: ICalendarEventPublisher
  ) {}

  async execute(command: PublishCalendarCommand): Promise<void> {
    const calendar = await this.repository.findByIds(
      new AcademicYearId(command.academicYear),
      new SemesterId(command.semester)
    );

    if (!calendar) throw new Error('Academic Calendar not found.');

    calendar.publish();
    await this.repository.save(calendar);

    await this.eventPublisher.publish(
      new SemesterStartedEvent(command.academicYear, command.semester, calendar.startDate)
    );
  }
}
