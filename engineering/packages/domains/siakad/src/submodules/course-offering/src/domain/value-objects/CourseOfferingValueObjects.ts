export class CourseOfferingId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ClassSectionId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class CourseId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class AcademicPeriodId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class LecturerId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class BuildingId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}
