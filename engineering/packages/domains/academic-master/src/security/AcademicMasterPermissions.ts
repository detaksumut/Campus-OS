/**
 * Strictly defined permissions for the Academic Master Data bounded context.
 */
export enum AcademicMasterPermissions {
  CREATE_FACULTY = 'academic.master.faculty.create',
  UPDATE_FACULTY = 'academic.master.faculty.update',
  VIEW_FACULTY = 'academic.master.faculty.view',
  
  CREATE_STUDY_PROGRAM = 'academic.master.study_program.create',
  UPDATE_STUDY_PROGRAM = 'academic.master.study_program.update',
  VIEW_STUDY_PROGRAM = 'academic.master.study_program.view'
}
