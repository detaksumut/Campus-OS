export interface IAttendanceProvider {
    /**
     * Get attendance summary for a student in a specific offering.
     * E.g. to calculate attendance percentage for exam eligibility.
     */
    getStudentAttendanceSummary(studentId: string, offeringId: string): Promise<any>;
    
    /**
     * Get all attendance records for a specific class meeting.
     */
    getClassMeetingRecords(classMeetingId: string): Promise<any[]>;
}
