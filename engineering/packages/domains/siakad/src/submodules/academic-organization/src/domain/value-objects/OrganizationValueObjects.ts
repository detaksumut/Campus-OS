export class UniversityId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class FacultyId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class DepartmentId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class StudyProgramId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class CampusId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class BuildingId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}
