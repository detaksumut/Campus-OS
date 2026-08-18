export class CurriculumId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class CourseId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class StudyProgramId {
  constructor(private readonly id: string) {} // Loose reference to AcademicOrganization
  getValue(): string { return this.id; }
}

export class LearningOutcomeId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class PrerequisiteId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}
