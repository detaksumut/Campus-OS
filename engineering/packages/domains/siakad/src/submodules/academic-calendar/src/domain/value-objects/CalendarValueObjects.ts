export class AcademicYearId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class SemesterId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class AcademicPeriodId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}
