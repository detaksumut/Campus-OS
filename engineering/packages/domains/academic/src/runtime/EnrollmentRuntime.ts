import { IdentityContext } from '@campus-os/identity/src/contracts';
import { EnrollmentService } from './services/EnrollmentService';
import { Enrollment } from '../domain/entities/Enrollment';

export class EnrollmentRuntime {
    constructor(
        private readonly enrollmentService: EnrollmentService
    ) {}

    public async createEnrollment(
        context: IdentityContext,
        studentId: string,
        academicTermId: string,
        academicAdvisorId: string | null
    ): Promise<Enrollment> {
        return this.enrollmentService.createEnrollment(context, studentId, academicTermId, academicAdvisorId);
    }

    public async addOffering(
        context: IdentityContext,
        enrollment: Enrollment,
        offeringId: string
    ): Promise<void> {
        return this.enrollmentService.addOffering(context, enrollment, offeringId);
    }

    public async dropOffering(
        context: IdentityContext,
        enrollment: Enrollment,
        offeringId: string,
        reason: string
    ): Promise<void> {
        return this.enrollmentService.dropOffering(context, enrollment, offeringId, reason);
    }

    public async submitForApproval(context: IdentityContext, enrollment: Enrollment): Promise<void> {
        return this.enrollmentService.submitForApproval(context, enrollment);
    }

    public async approve(context: IdentityContext, enrollment: Enrollment): Promise<void> {
        return this.enrollmentService.approve(context, enrollment);
    }

    public async reject(context: IdentityContext, enrollment: Enrollment): Promise<void> {
        return this.enrollmentService.reject(context, enrollment);
    }

    public async finalize(context: IdentityContext, enrollment: Enrollment): Promise<void> {
        return this.enrollmentService.finalize(context, enrollment);
    }
}
