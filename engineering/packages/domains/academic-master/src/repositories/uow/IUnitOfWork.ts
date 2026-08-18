/**
 * Framework-independent Unit of Work contract.
 */
import { IFacultyRepository } from '../contracts/IFacultyRepository';
import { IStudyProgramRepository } from '../contracts/IStudyProgramRepository';
// other imports...

export interface IUnitOfWork {
  readonly faculties: IFacultyRepository;
  readonly studyPrograms: IStudyProgramRepository;
  
  start(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
