import { FinalGradeSnapshot } from '../domain/entities/FinalGradeSnapshot';

export interface IAssessmentProvider {
    /**
     * Get the finalized grade snapshot for a given enrollment item.
     * This is crucial for GPA/IPS/IPK calculations in the Academic Progression module.
     * Returns null if the grade is not finalized yet.
     */
    getFinalGradeForEnrollment(enrollmentItemId: string): Promise<FinalGradeSnapshot | null>;
    
    /**
     * Determine if a student has failed a course (based on PassStatus in the Grade Scale)
     */
    hasPassedCourse(enrollmentItemId: string): Promise<boolean>;
}
