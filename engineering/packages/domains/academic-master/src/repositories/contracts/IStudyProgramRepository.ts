import { StudyProgram } from '../../aggregates/StudyProgram/StudyProgram';

export interface IStudyProgramRepository {
  findById(id: string): Promise<StudyProgram | null>;
  save(entity: StudyProgram): Promise<void>;
}
