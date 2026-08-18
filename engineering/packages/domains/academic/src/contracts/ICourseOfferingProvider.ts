export interface ICourseOfferingProvider {
    getOfferingById(offeringId: string): Promise<any>;
    listOfferingsByTerm(academicTermId: string): Promise<any[]>;
    listOfferingsByStudyProgram(academicTermId: string, studyProgramId: string): Promise<any[]>;
    getLecturerAssignments(offeringId: string): Promise<any[]>;
    getSchedules(offeringId: string): Promise<any[]>;
}
