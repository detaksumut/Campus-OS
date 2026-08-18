import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { IRegistrationRepository } from '../../domain/IRegistrationRepository';
import { SemesterRegistration, StudentProvision } from '../../IRegistrationEntities';
import * as schema from './schema';

export class DrizzleRegistrationRepository implements IRegistrationRepository {
  constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async saveStudentProvision(provision: StudentProvision): Promise<void> {
    await this.db.insert(schema.studentProvisions).values({
      studentProvisionId: provision.studentProvisionId,
      applicantId: provision.applicantId,
      generatedNIM: provision.generatedNIM,
      studyProgramId: provision.studyProgramId,
      admissionGeneration: provision.admissionGeneration
    });
  }

  async saveSemesterRegistration(registration: SemesterRegistration): Promise<void> {
    await this.db.insert(schema.semesterRegistrations).values({
      registrationId: registration.registrationId,
      studentId: registration.studentId,
      academicTermId: registration.academicTermId,
      registrationType: registration.registrationType,
      registrationStatus: registration.registrationStatus,
      studentAcademicStatus: registration.studentAcademicStatus,
      registrationDate: new Date(registration.registrationDate),
      remarks: registration.remarks || null
    });
  }

  async getSemesterRegistrationById(registrationId: string): Promise<SemesterRegistration | null> {
    const result = await this.db.select().from(schema.semesterRegistrations).where(eq(schema.semesterRegistrations.registrationId, registrationId)).limit(1);
    if (!result || result.length === 0) return null;
    
    const row = result[0];
    return {
      registrationId: row.registrationId,
      studentId: row.studentId,
      academicTermId: row.academicTermId,
      registrationType: row.registrationType as any,
      registrationStatus: row.registrationStatus as any,
      studentAcademicStatus: row.studentAcademicStatus as any,
      registrationDate: row.registrationDate.toISOString(),
      remarks: row.remarks || ''
    };
  }

  async updateSemesterRegistrationStatus(registrationId: string, status: string): Promise<void> {
    await this.db.update(schema.semesterRegistrations)
      .set({ registrationStatus: status })
      .where(eq(schema.semesterRegistrations.registrationId, registrationId));
  }
}
