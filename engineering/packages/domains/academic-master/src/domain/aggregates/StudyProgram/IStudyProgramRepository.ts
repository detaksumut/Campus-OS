// Pure Repository Interface
import { StudyProgram } from './StudyProgram';

export interface IStudyProgramRepository {
  findById(id: string): Promise<StudyProgram | null>;
  save(entity: StudyProgram): Promise<void>;
}
