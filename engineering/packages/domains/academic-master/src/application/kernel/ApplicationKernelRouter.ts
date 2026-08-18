import { CreateFacultyUseCase } from '../use-cases/CreateFacultyUseCase';
import { IAcademicMasterCapability } from '../../contracts/capabilities/IAcademicMasterCapability';
import { CreateFacultyCommand } from '../../contracts/commands/FacultyCommands';

/**
 * Kernel Routing connects the outward-facing Capability abstraction 
 * to the internal Application UseCases.
 */
export class ApplicationKernelRouter implements IAcademicMasterCapability {
  constructor(
    private readonly createFacultyUseCase: CreateFacultyUseCase
    // getFacultyHandler: GetFacultyQueryHandler
  ) {}

  public async createFaculty(command: CreateFacultyCommand): Promise<string> {
    return await this.createFacultyUseCase.execute(command);
  }

  public async getFaculty(query: any): Promise<any> {
    // Route to Query Handler
    return null;
  }
}
