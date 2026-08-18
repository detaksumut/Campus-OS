import { IUnitOfWork } from '../uow/IUnitOfWork';
import { IFacultyRepository } from '../contracts/IFacultyRepository';
import { IStudyProgramRepository } from '../contracts/IStudyProgramRepository';

/**
 * IDatabaseExecutor is an abstract execution engine provided by Campus OS Kernel.
 * This ensures the domain layer has ZERO knowledge of SQL, ORM, or Drivers.
 */
export interface IDatabaseExecutor {
  execute(queryDef: any): Promise<any>;
}

export class RepositoryRuntimeAdapter implements IUnitOfWork {
  public readonly faculties: IFacultyRepository;
  public readonly studyPrograms: IStudyProgramRepository;
  
  constructor(private readonly executor: IDatabaseExecutor) {
    // In a real scenario, this instantiates the concrete agnostic repositories
    // injecting the executor, e.g.:
    // this.faculties = new FacultyRepositoryImpl(this.executor);
    this.faculties = {} as IFacultyRepository;
    this.studyPrograms = {} as IStudyProgramRepository;
  }

  public async start(): Promise<void> {
    await this.executor.execute({ type: 'BEGIN' });
  }

  public async commit(): Promise<void> {
    await this.executor.execute({ type: 'COMMIT' });
  }

  public async rollback(): Promise<void> {
    await this.executor.execute({ type: 'ROLLBACK' });
  }
}
