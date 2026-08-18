import { CreateCalendarCommand } from '../commands/CalendarCommands';
import { ICalendarRepository } from '../ports/ICalendarRepository';
import { AcademicCalendar } from '../../domain/entities/AcademicCalendar';
import { AcademicYearId, SemesterId } from '../../domain/value-objects/CalendarValueObjects';
import { CalendarStatus } from '../../domain/types/CalendarEnums';

export class CreateCalendarUseCase {
  constructor(private readonly repository: ICalendarRepository) {}

  async execute(command: CreateCalendarCommand): Promise<void> {
    const calendar = new AcademicCalendar(
      new AcademicYearId(command.academicYear),
      new SemesterId(command.semester),
      CalendarStatus.DRAFT,
      command.startDate,
      command.endDate
    );

    await this.repository.save(calendar);
  }
}
