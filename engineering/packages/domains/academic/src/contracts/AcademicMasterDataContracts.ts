export interface ICampusProvider {
    getCampus(campusId: string): Promise<any>; // Returns readonly Campus DTO
    listCampuses(): Promise<any[]>;
}

export interface IFacultyProvider {
    getFaculty(facultyId: string): Promise<any>;
    listFacultiesByCampus(campusId: string): Promise<any[]>;
}

export interface IStudyProgramProvider {
    getStudyProgram(programId: string): Promise<any>;
    listStudyProgramsByParent(parentId: string): Promise<any[]>;
}

export interface IAcademicCalendarProvider {
    getActiveAcademicYear(): Promise<any>;
    getActiveAcademicTerm(): Promise<any>;
    getAcademicYear(yearId: string): Promise<any>;
    getAcademicTerm(termId: string): Promise<any>;
}

export interface IAcademicMasterDataProvider {
    readonly calendar: IAcademicCalendarProvider;
    readonly campus: ICampusProvider;
    readonly faculty: IFacultyProvider;
    readonly studyProgram: IStudyProgramProvider;
}
