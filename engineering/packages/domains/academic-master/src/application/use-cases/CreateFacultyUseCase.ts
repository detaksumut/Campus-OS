import { CreateFacultyCommand } from '../commands/FacultyCommands';
import { FacultyFactory } from '../../domain/aggregates/Faculty/FacultyFactory';
import { IUnitOfWork } from '../../repositories/uow/IUnitOfWork';
import { FacultyCreatedEvent } from '../../events/AcademicEvents';

/**
 * UseCase Orchestrates Domain behavior using Repositories via UoW.
 * No Business Logic here. Only Orchestration.
 */
export class CreateFacultyUseCase {
  constructor(private readonly uow: IUnitOfWork) {}

  public async execute(command: CreateFacultyCommand): Promise<string> {
    await this.uow.start();
    try {
      const faculty = FacultyFactory.create(command.code); // In reality, mapped from command
      await this.uow.faculties.save(faculty);
      
      const event = new FacultyCreatedEvent(faculty.id, command.name, command.code);
      // Dispatch event via EventBus (omitted for purity)

      await this.uow.commit();
      return faculty.id;
    } catch (error) {
      await this.uow.rollback();
      throw error;
    }
  }
}
