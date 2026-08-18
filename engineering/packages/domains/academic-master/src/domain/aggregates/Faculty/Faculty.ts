// Pure Domain Aggregate Root: Faculty
export class Faculty {
  public readonly id: string;
  
  protected constructor(id: string) {
    this.id = id;
  }
}
