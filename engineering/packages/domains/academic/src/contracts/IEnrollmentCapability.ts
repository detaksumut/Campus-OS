import { IdentityContext } from '@campus-os/identity/src/contracts';

export interface IEnrollmentCapability {
    createEnrollment(context: IdentityContext, studentId: string, academicTermId: string, academicAdvisorId: string | null): Promise<string>;
    
    addOffering(context: IdentityContext, enrollmentId: string, offeringId: string): Promise<void>;
    
    dropOffering(context: IdentityContext, enrollmentId: string, offeringId: string, reason: string): Promise<void>;
    
    submitForApproval(context: IdentityContext, enrollmentId: string): Promise<void>;
    
    approve(context: IdentityContext, enrollmentId: string, approvedByLecturerId: string): Promise<void>;
    
    reject(context: IdentityContext, enrollmentId: string): Promise<void>;
    
    finalize(context: IdentityContext, enrollmentId: string): Promise<void>;
    
    openAddDrop(context: IdentityContext, enrollmentId: string): Promise<void>;
    
    reFinalize(context: IdentityContext, enrollmentId: string): Promise<void>;
}
