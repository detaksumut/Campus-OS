import { IdentityContext } from '@campus-os/identity/src/contracts';
import { AssessmentScheme } from '../domain/entities/AssessmentScheme';
import { GradeScale } from '../domain/entities/GradeScale';
import { StudentAssessmentResult } from '../domain/entities/StudentAssessmentResult';
import { GradeCalculationService } from '../domain/services/GradeCalculationService';
import { ComponentResult } from '../domain/entities/ComponentResult';
import { GradeCorrectionRequest } from '../domain/entities/GradeCorrectionRequest';
import { GradeCorrectionRequestStatus } from '../domain/entities/GradeCorrectionRequestStatus';

export class AssessmentService {
    constructor(private readonly calculationService: GradeCalculationService) {}

    public defineScheme(context: IdentityContext, offeringId: string): AssessmentScheme {
        this.enforcePermission(context, 'academic.assessment.manage');
        return AssessmentScheme.create(offeringId);
    }

    public addSchemeComponent(context: IdentityContext, scheme: AssessmentScheme, name: string, weightBasisPoints: number): void {
        this.enforcePermission(context, 'academic.assessment.manage');
        scheme.addComponent(name, weightBasisPoints);
    }

    public publishScheme(context: IdentityContext, scheme: AssessmentScheme): void {
        this.enforcePermission(context, 'academic.assessment.manage');
        scheme.publish();
    }

    public lockScheme(context: IdentityContext, scheme: AssessmentScheme): void {
        this.enforcePermission(context, 'academic.assessment.manage');
        scheme.lock();
    }

    public recordComponentScore(context: IdentityContext, assessment: StudentAssessmentResult, result: ComponentResult): void {
        this.enforcePermission(context, 'academic.assessment.grade');
        assessment.recordComponentScore(result);
    }

    public calculateAndSubmitGrade(
        context: IdentityContext, 
        assessment: StudentAssessmentResult, 
        scheme: AssessmentScheme, 
        scale: GradeScale
    ): void {
        this.enforcePermission(context, 'academic.assessment.submit');
        
        const snapshot = this.calculationService.calculateGrade(scheme, assessment.components, scale);
        assessment.submitCalculatedGrade(snapshot);
    }

    public finalizeGrade(context: IdentityContext, assessment: StudentAssessmentResult): void {
        this.enforcePermission(context, 'academic.assessment.finalize');
        assessment.finalizeGrade();
    }

    // ADR-018: Explicit Grade Correction Lifecycle

    public requestGradeCorrection(
        context: IdentityContext,
        assessment: StudentAssessmentResult,
        proposedComponents: ComponentResult[],
        reason: string
    ): GradeCorrectionRequest {
        this.enforcePermission(context, 'academic.assessment.correction.request');
        
        if (!assessment.finalGradeSnapshot) {
            throw new Error("Cannot request correction for unfinalized grades without a snapshot.");
        }

        const request = new GradeCorrectionRequest(
            `GCR-${crypto.randomUUID()}`,
            assessment.finalGradeSnapshot, // snapshot of what it was before correction
            proposedComponents,
            reason,
            context.userId,
            new Date(),
            GradeCorrectionRequestStatus.Requested
        );

        assessment.addCorrectionRequest(request);
        return request;
    }

    public approveAndApplyGradeCorrection(
        context: IdentityContext,
        assessment: StudentAssessmentResult,
        correctionRequestId: string,
        scheme: AssessmentScheme,
        scale: GradeScale
    ): void {
        this.enforcePermission(context, 'academic.assessment.correction.approve');
        
        const request = assessment.corrections.find(c => c.correctionRequestId === correctionRequestId);
        if (!request) throw new Error("Correction request not found.");
        
        request.approve(context.userId);
        
        // Temporarily apply proposed components for recalculation
        const tempComponents = [...assessment.components];
        request.proposedComponentResults.forEach(proposed => {
            const idx = tempComponents.findIndex(c => c.componentId === proposed.componentId);
            if (idx >= 0) tempComponents[idx] = proposed;
            else tempComponents.push(proposed);
        });

        // Recalculate
        const newSnapshot = this.calculationService.calculateGrade(scheme, tempComponents, scale);
        
        // Apply the correction which mutates the original components and snapshot
        assessment.applyCorrection(correctionRequestId, newSnapshot);
    }

    public rejectGradeCorrection(
        context: IdentityContext,
        assessment: StudentAssessmentResult,
        correctionRequestId: string,
        reason: string
    ): void {
        this.enforcePermission(context, 'academic.assessment.correction.approve');
        
        const request = assessment.corrections.find(c => c.correctionRequestId === correctionRequestId);
        if (!request) throw new Error("Correction request not found.");

        request.reject(context.userId, reason);
    }

    private enforcePermission(context: IdentityContext, requiredPermission: string): void {
        if (!context.permissions.includes(requiredPermission)) {
            throw new Error(`Forbidden: Missing ${requiredPermission} permission`);
        }
    }
}
