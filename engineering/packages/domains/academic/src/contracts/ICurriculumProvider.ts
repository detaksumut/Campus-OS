export interface ICurriculumProvider {
    getCurriculumById(curriculumId: string): Promise<any>;
    getActiveCurriculumForProgram(studyProgramId: string, cohort: string): Promise<any>;
    listCoursesInCurriculum(curriculumId: string): Promise<any[]>;
}
