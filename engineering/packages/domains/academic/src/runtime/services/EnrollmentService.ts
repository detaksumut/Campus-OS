import { IdentityContext } from '@campus-os/identity/src/contracts';
import { Enrollment } from '../domain/entities/Enrollment';
import { EnrollmentItem } from '../domain/entities/EnrollmentItem';
import { EnrollmentValidationPipeline } from '../domain/policies/EnrollmentValidationPipeline';
import { ISeatReservationService } from '../contracts/enrollment/ISeatReservationService';

export class EnrollmentService {
    constructor(
        private readonly validationPipeline: EnrollmentValidationPipeline,
        private readonly seatReservationService: ISeatReservationService
    ) {}

    public async createEnrollment(
        context: IdentityContext,
        studentId: string,
        academicTermId: string,
        academicAdvisorId: string | null
    ): Promise<Enrollment> {
        this.enforcePermission(context, 'academic.enrollment.manage');
        // Uniqueness must be enforced by persistence layer: ONE Enrollment per (StudentId, AcademicTermId)
        return Enrollment.create(studentId, academicTermId, academicAdvisorId);
    }

    public async addOffering(
        context: IdentityContext,
        enrollment: Enrollment,
        offeringId: string
    ): Promise<void> {
        this.enforcePermission(context, 'academic.enrollment.manage');

        // 1. Validation Pipeline
        const validationResult = await this.validationPipeline.execute(enrollment.studentId, offeringId, enrollment);
        if (!validationResult.isValid) {
            throw new Error(`Enrollment validation failed: ${validationResult.reason}`);
        }

        // 2. Atomic Seat Reservation
        const reserved = await this.seatReservationService.reserveSeat(offeringId);
        
        // 3. Create Item
        const item = EnrollmentItem.create(offeringId, context.userId, validationResult);
        
        if (reserved) {
            item.enroll(); // Confirmed seat
        } else {
            item.waitlist(); // No seat available
        }

        enrollment.addItem(item);
    }

    public async dropOffering(
        context: IdentityContext,
        enrollment: Enrollment,
        offeringId: string,
        reason: string
    ): Promise<void> {
        this.enforcePermission(context, 'academic.enrollment.manage');
        
        // Release seat atomically
        await this.seatReservationService.releaseSeat(offeringId);
        
        enrollment.dropItem(offeringId, context.userId, reason);
    }

    public async submitForApproval(context: IdentityContext, enrollment: Enrollment): Promise<void> {
        this.enforcePermission(context, 'academic.enrollment.submit');
        enrollment.submit();
    }

    public async approve(context: IdentityContext, enrollment: Enrollment): Promise<void> {
        this.enforcePermission(context, 'academic.enrollment.approve');
        enrollment.approve(context.userId); // context.userId is the actual lecturer performing the approval
    }

    public async reject(context: IdentityContext, enrollment: Enrollment): Promise<void> {
        this.enforcePermission(context, 'academic.enrollment.approve');
        enrollment.reject();
    }

    public async finalize(context: IdentityContext, enrollment: Enrollment): Promise<void> {
        this.enforcePermission(context, 'academic.enrollment.manage');
        enrollment.finalize();
    }

    private enforcePermission(context: IdentityContext, requiredPermission: string): void {
        if (!context.permissions.includes(requiredPermission)) {
            throw new Error(`Forbidden: Missing ${requiredPermission} permission`);
        }
    }
}
