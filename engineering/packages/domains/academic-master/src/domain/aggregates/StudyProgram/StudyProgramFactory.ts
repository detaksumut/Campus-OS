// Factory for StudyProgram
import { StudyProgram } from './StudyProgram';

export class StudyProgramFactory {
  public static create(id: string): StudyProgram {
    return new StudyProgram(id); // By-passing protected constructor inside factory
  }
}
