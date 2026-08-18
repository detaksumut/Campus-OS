import { IdentityContext } from '@campus-os/identity/src/contracts';
import { AssessmentService } from './services/AssessmentService';
import { AssessmentScheme } from '../domain/entities/AssessmentScheme';
import { GradeScale } from '../domain/entities/GradeScale';
import { StudentAssessmentResult } from '../domain/entities/StudentAssessmentResult';
import { ComponentResult } from '../domain/entities/ComponentResult';
import { GradeCorrectionRequest } from '../domain/entities/GradeCorrectionRequest';

export class AssessmentRuntime {
    constructor(private readonly assessmentService: AssessmentService) {}

    public defineScheme(context: IdentityContext, offeringId: string): AssessmentScheme {
        return this.assessmentService.defineScheme(context, offeringId);
    }

    public addSchemeComponent(context: IdentityContext, scheme: AssessmentScheme, name: string, weightBasisPoints: number): void {
        this.assessmentService.addSchemeComponent(context, scheme, name, weightBasisPoints);
    }

    public publishScheme(context: IdentityContext, scheme: AssessmentScheme): void {
        this.assessmentService.publishScheme(context, scheme);
    }

    public lockScheme(context: IdentityContext, scheme: AssessmentScheme): void {
        this.assessmentService.lockScheme(context, scheme);
    }

    public recordComponentScore(context: IdentityContext, assessment: StudentAssessmentResult, result: ComponentResult): void {
        this.assessmentService.recordComponentScore(context, assessment, result);
    }

    public calculateAndSubmitGrade(
        context: IdentityContext, 
        assessment: StudentAssessmentResult, 
        scheme: AssessmentScheme, 
        scale: GradeScale
    ): void {
        this.assessmentService.calculateAndSubmitGrade(context, assessment, scheme, scale);
    }

    public finalizeGrade(context: IdentityContext, assessment: StudentAssessmentResult): void {
        this.assessmentService.finalizeGrade(context, assessment);
    }

    public requestGradeCorrection(
        context: IdentityContext,
        assessment: StudentAssessmentResult,
        proposedComponents: ComponentResult[],
        reason: string
    ): GradeCorrectionRequest {
        return this.assessmentService.requestGradeCorrection(context, assessment, proposedComponents, reason);
    }

    public approveAndApplyGradeCorrection(
        context: IdentityContext,
        assessment: StudentAssessmentResult,
        correctionRequestId: string,
        scheme: AssessmentScheme,
        scale: GradeScale
    ): void {
        this.assessmentService.approveAndApplyGradeCorrection(context, assessment, correctionRequestId, scheme, scale);
    }

    public rejectGradeCorrection(
        context: IdentityContext,
        assessment: StudentAssessmentResult,
        correctionRequestId: string,
        reason: string
    ): void {
        this.assessmentService.rejectGradeCorrection(context, assessment, correctionRequestId, reason);
    }
}
