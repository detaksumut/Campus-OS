import { FacultyDTO } from '../dto/FacultyDTO';
import { CreateFacultyCommand } from '../commands/FacultyCommands';
import { GetFacultyByIdQuery } from '../queries/FacultyQueries';

/**
 * Pure Capability Contract for Academic Master.
 * Framework-independent abstraction that the Runtime will inject.
 */
export interface IAcademicMasterCapability {
  // Command Execution
  createFaculty(command: CreateFacultyCommand): Promise<string>;
  
  // Query Execution
  getFaculty(query: GetFacultyByIdQuery): Promise<FacultyDTO | null>;
}
