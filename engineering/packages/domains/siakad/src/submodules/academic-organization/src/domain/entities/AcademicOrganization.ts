import { UniversityId } from '../value-objects/OrganizationValueObjects';
import { Faculty, Department, StudyProgram, Campus, Building } from './OrganizationEntities';
import { OrganizationStatus } from '../types/OrganizationEnums';

export class AcademicOrganization {
  private faculties: Faculty[] = [];
  private departments: Department[] = [];
  private studyPrograms: StudyProgram[] = [];
  private campuses: Campus[] = [];
  private buildings: Building[] = [];

  constructor(
    public readonly universityId: UniversityId,
    public readonly name: string,
    public readonly status: OrganizationStatus = OrganizationStatus.ACTIVE
  ) {}

  get allFaculties(): ReadonlyArray<Faculty> { return this.faculties; }
  get allDepartments(): ReadonlyArray<Department> { return this.departments; }
  get allStudyPrograms(): ReadonlyArray<StudyProgram> { return this.studyPrograms; }
  get allCampuses(): ReadonlyArray<Campus> { return this.campuses; }
  get allBuildings(): ReadonlyArray<Building> { return this.buildings; }

  addFaculty(faculty: Faculty): void {
    this.faculties.push(faculty);
  }

  addDepartment(department: Department): void {
    if (!this.faculties.some(f => f.id.getValue() === department.facultyId.getValue())) {
      throw new Error('Faculty does not exist in this University.');
    }
    this.departments.push(department);
  }

  addStudyProgram(program: StudyProgram): void {
    if (!this.departments.some(d => d.id.getValue() === program.departmentId.getValue())) {
      throw new Error('Department does not exist in this University.');
    }
    this.studyPrograms.push(program);
  }

  addCampus(campus: Campus): void {
    this.campuses.push(campus);
  }

  addBuilding(building: Building): void {
    if (!this.campuses.some(c => c.id.getValue() === building.campusId.getValue())) {
      throw new Error('Campus does not exist in this University.');
    }
    this.buildings.push(building);
  }
}
