import { FacultyId, DepartmentId, StudyProgramId, CampusId, BuildingId } from '../value-objects/OrganizationValueObjects';
import { OrganizationStatus, AccreditationLevel, ProgramLevel } from '../types/OrganizationEnums';

export class Faculty {
  constructor(
    public readonly id: FacultyId,
    public readonly name: string,
    public readonly status: OrganizationStatus = OrganizationStatus.ACTIVE
  ) {}
}

export class Department {
  constructor(
    public readonly id: DepartmentId,
    public readonly facultyId: FacultyId,
    public readonly name: string,
    public readonly status: OrganizationStatus = OrganizationStatus.ACTIVE
  ) {}
}

export class StudyProgram {
  constructor(
    public readonly id: StudyProgramId,
    public readonly departmentId: DepartmentId,
    public readonly name: string,
    public readonly level: ProgramLevel,
    public readonly accreditation: AccreditationLevel,
    public readonly status: OrganizationStatus = OrganizationStatus.ACTIVE
  ) {}
}

export class Campus {
  constructor(
    public readonly id: CampusId,
    public readonly name: string,
    public readonly address: string
  ) {}
}

export class Building {
  constructor(
    public readonly id: BuildingId,
    public readonly campusId: CampusId,
    public readonly name: string,
    public readonly code: string
  ) {}
}
