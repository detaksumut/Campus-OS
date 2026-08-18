import { IOrganizationRepository } from '../application/ports/IOrganizationRepository';
import { AcademicOrganization } from '../domain/entities/AcademicOrganization';
import { Faculty, Department, StudyProgram, Campus, Building } from '../domain/entities/OrganizationEntities';
import { UniversityId, FacultyId, DepartmentId, StudyProgramId, CampusId, BuildingId } from '../domain/value-objects/OrganizationValueObjects';
import { OrganizationStatus, ProgramLevel, AccreditationLevel } from '../domain/types/OrganizationEnums';
import { IDatabaseExecutor } from '../../../registration/src/infrastructure/RegistrationRepositoryImpl';

export class OrganizationRepositoryImpl implements IOrganizationRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async save(organization: AcademicOrganization): Promise<void> {
    const sqlOrg = `
      INSERT INTO siakad_organization.universities (university_id, name, status)
      VALUES ($1, $2, $3)
      ON CONFLICT (university_id) DO UPDATE SET
        name = EXCLUDED.name,
        status = EXCLUDED.status;
    `;
    await this.db.execute(sqlOrg, [
      organization.universityId.getValue(),
      organization.name,
      organization.status
    ]);

    for (const fac of organization.allFaculties) {
      const sqlFac = `
        INSERT INTO siakad_organization.faculties (faculty_id, university_id, name, status)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (faculty_id) DO UPDATE SET
          name = EXCLUDED.name,
          status = EXCLUDED.status;
      `;
      await this.db.execute(sqlFac, [fac.id.getValue(), organization.universityId.getValue(), fac.name, fac.status]);
    }

    for (const dep of organization.allDepartments) {
      const sqlDep = `
        INSERT INTO siakad_organization.departments (department_id, faculty_id, name, status)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (department_id) DO UPDATE SET
          name = EXCLUDED.name,
          status = EXCLUDED.status;
      `;
      await this.db.execute(sqlDep, [dep.id.getValue(), dep.facultyId.getValue(), dep.name, dep.status]);
    }

    for (const prog of organization.allStudyPrograms) {
      const sqlProg = `
        INSERT INTO siakad_organization.study_programs (program_id, department_id, name, level, accreditation, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (program_id) DO UPDATE SET
          name = EXCLUDED.name,
          level = EXCLUDED.level,
          accreditation = EXCLUDED.accreditation,
          status = EXCLUDED.status;
      `;
      await this.db.execute(sqlProg, [prog.id.getValue(), prog.departmentId.getValue(), prog.name, prog.level, prog.accreditation, prog.status]);
    }
  }

  async findById(id: UniversityId): Promise<AcademicOrganization | null> {
    const orgRows = await this.db.query(`SELECT * FROM siakad_organization.universities WHERE university_id = $1`, [id.getValue()]);
    if (orgRows.length === 0) return null;
    const orgRow = orgRows[0];

    const org = new AcademicOrganization(new UniversityId(orgRow.university_id), orgRow.name, orgRow.status as OrganizationStatus);

    const facRows = await this.db.query(`SELECT * FROM siakad_organization.faculties WHERE university_id = $1`, [id.getValue()]);
    for (const fac of facRows) {
      org['faculties'].push(new Faculty(new FacultyId(fac.faculty_id), fac.name, fac.status as OrganizationStatus));
    }

    const facIds = facRows.map((f: any) => f.faculty_id);
    if (facIds.length > 0) {
      const depRows = await this.db.query(`SELECT * FROM siakad_organization.departments WHERE faculty_id = ANY($1)`, [facIds]);
      for (const dep of depRows) {
        org['departments'].push(new Department(new DepartmentId(dep.department_id), new FacultyId(dep.faculty_id), dep.name, dep.status as OrganizationStatus));
      }

      const depIds = depRows.map((d: any) => d.department_id);
      if (depIds.length > 0) {
        const progRows = await this.db.query(`SELECT * FROM siakad_organization.study_programs WHERE department_id = ANY($1)`, [depIds]);
        for (const prog of progRows) {
          org['studyPrograms'].push(new StudyProgram(
            new StudyProgramId(prog.program_id), 
            new DepartmentId(prog.department_id), 
            prog.name, 
            prog.level as ProgramLevel, 
            prog.accreditation as AccreditationLevel, 
            prog.status as OrganizationStatus
          ));
        }
      }
    }

    return org;
  }
}
