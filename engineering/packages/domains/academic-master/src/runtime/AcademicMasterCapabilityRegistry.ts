import { IAcademicMasterCapability } from '../contracts/capabilities/IAcademicMasterCapability';
import { CreateFacultyCommand } from '../contracts/commands/FacultyCommands';
import { GetFacultyByIdQuery, GetFacultyByIdResponse } from '../contracts/queries/FacultyQueries';
import { FacultyDTO } from '../contracts/dto/FacultyDTO';

export class AcademicMasterCapabilityRegistry {
  
  public getProvidedCapability(): IAcademicMasterCapability {
    return {
      createFaculty: async (command: CreateFacultyCommand): Promise<string> => {
        // Delegates to Application Layer UseCase (Phase G)
        return "mock-faculty-id-001";
      },
      getFaculty: async (query: GetFacultyByIdQuery): Promise<FacultyDTO | null> => {
        // Delegates to Application Layer QueryHandler (Phase G)
        return null; 
      }
    };
  }
}
