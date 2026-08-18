import { IdentityContext } from '@campus-os/identity/src/contracts';
import { ComponentResult } from '../domain/entities/ComponentResult';

export interface IAssessmentCapability {
    defineScheme(context: IdentityContext, offeringId: string): Promise<string>;
    
    addSchemeComponent(context: IdentityContext, schemeId: string, name: string, weightBasisPoints: number): Promise<void>;
    
    publishScheme(context: IdentityContext, schemeId: string): Promise<void>;
    
    lockScheme(context: IdentityContext, schemeId: string): Promise<void>;
    
    recordComponentScore(context: IdentityContext, assessmentResultId: string, result: ComponentResult): Promise<void>;
    
    calculateAndSubmitGrade(context: IdentityContext, assessmentResultId: string, schemeId: string, gradeScaleId: string): Promise<void>;
    
    finalizeGrade(context: IdentityContext, assessmentResultId: string): Promise<void>;
    
    requestGradeCorrection(context: IdentityContext, assessmentResultId: string, proposedComponents: ComponentResult[], reason: string): Promise<string>;
    
    approveAndApplyGradeCorrection(context: IdentityContext, assessmentResultId: string, correctionRequestId: string, schemeId: string, gradeScaleId: string): Promise<void>;
    
    rejectGradeCorrection(context: IdentityContext, assessmentResultId: string, correctionRequestId: string, reason: string): Promise<void>;
}
