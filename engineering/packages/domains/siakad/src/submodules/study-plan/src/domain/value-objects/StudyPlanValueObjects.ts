export class StudyPlanId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class StudentId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class AcademicPeriodId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ClassSectionId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}
