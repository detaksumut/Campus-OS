export class GradeComponent {
  constructor(
    public readonly id: string,
    public readonly studentId: string,
    public readonly courseId: string,
    public readonly score: number,
    public readonly weight: number
  ) {}
}
