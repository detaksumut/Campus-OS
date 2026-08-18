import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';

export const studentProvisions = pgTable('student_provisions', {
  studentProvisionId: uuid('student_provision_id').primaryKey(),
  applicantId: uuid('applicant_id').notNull(),
  generatedNIM: varchar('generated_nim', { length: 50 }).notNull(),
  studyProgramId: uuid('study_program_id').notNull(),
  admissionGeneration: varchar('admission_generation', { length: 10 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const semesterRegistrations = pgTable('semester_registrations', {
  registrationId: uuid('registration_id').primaryKey(),
  studentId: varchar('student_id', { length: 50 }).notNull(), // NIM from student_provisions
  academicTermId: varchar('academic_term_id', { length: 50 }).notNull(),
  registrationType: varchar('registration_type', { length: 50 }).notNull(),
  registrationStatus: varchar('registration_status', { length: 50 }).notNull(),
  studentAcademicStatus: varchar('student_academic_status', { length: 50 }).notNull(),
  registrationDate: timestamp('registration_date').notNull(),
  remarks: text('remarks')
});
