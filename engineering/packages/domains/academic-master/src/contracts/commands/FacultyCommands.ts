export interface CreateFacultyCommand {
  name: string;
  code: string;
}

export interface UpdateFacultyCommand {
  facultyId: string;
  name: string;
}

export interface RegisterStudyProgramCommand {
  facultyId: string;
  name: string;
  accreditationLevel: string;
}
