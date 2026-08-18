export class FinalGrade {
  constructor(
    public readonly studentId: string,
    public readonly courseId: string,
    public readonly finalScore: number,
    public readonly letterGrade: string
  ) {}
}
