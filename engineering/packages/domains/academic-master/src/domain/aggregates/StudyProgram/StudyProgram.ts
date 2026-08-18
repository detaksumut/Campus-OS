// Pure Domain Aggregate Root: StudyProgram
export class StudyProgram {
  public readonly id: string;
  
  protected constructor(id: string) {
    this.id = id;
  }
}
