import { FacultyDTO } from '../dto/FacultyDTO';
import { StudyProgramDTO } from '../dto/StudyProgramDTO';

export interface GetFacultyByIdQuery {
  facultyId: string;
}

export interface GetStudyProgramsByFacultyQuery {
  facultyId: string;
}

// Responses
export interface GetFacultyByIdResponse {
  faculty: FacultyDTO | null;
}

export interface GetStudyProgramsByFacultyResponse {
  programs: StudyProgramDTO[];
}
