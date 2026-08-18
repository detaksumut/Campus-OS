import { AssessmentScheme } from '../entities/AssessmentScheme';
import { GradeScale } from '../entities/GradeScale';
import { ComponentResult } from '../entities/ComponentResult';
import { FinalGradeSnapshot } from '../entities/FinalGradeSnapshot';
import { ComponentResultStatus } from '../entities/ComponentResultStatus';
import { AssessmentSchemeStatus } from '../entities/AssessmentSchemeStatus';

export class GradeCalculationService {
    /**
     * Deterministic grade calculation based on ARB's requirements.
     * Inputs: Scheme (for weights), Results (raw scores), Scale (for conversion).
     * Output: FinalGradeSnapshot.
     */
    public calculateGrade(
        scheme: AssessmentScheme,
        results: ComponentResult[],
        gradeScale: GradeScale
    ): FinalGradeSnapshot {
        
        if (scheme.status !== AssessmentSchemeStatus.Locked) {
            throw new Error("Assessment Scheme must be Locked before calculating grades.");
        }

        // Validate all components in scheme have a result
        const missingComponents = scheme.components.filter(
            sc => !results.some(r => r.componentId === sc.componentId)
        );

        if (missingComponents.length > 0) {
            throw new Error(`Cannot calculate grade. Missing results for components: ${missingComponents.map(c => c.name).join(', ')}`);
        }

        let totalWeightedScore = 0;

        for (const component of scheme.components) {
            const result = results.find(r => r.componentId === component.componentId)!;
            
            let effectiveScore = 0;
            if (result.status === ComponentResultStatus.Scored && result.score !== null) {
                effectiveScore = result.score;
            } else if (result.status === ComponentResultStatus.Missing || result.status === ComponentResultStatus.Pending) {
                // Pending or Missing translates to 0 for calculation
                effectiveScore = 0;
            } else if (result.status === ComponentResultStatus.Excused) {
                // How to handle Excused? Standard academic policy usually drops the component and re-weights,
                // but for simplicity here we assume 0 or requires explicit policy. We'll treat as 0 for calculation basis.
                effectiveScore = 0;
            }

            // Weight is in Basis Points (10000 = 100%)
            // e.g. score = 80, weight = 2000 (20%)
            // weighted contribution = (80 * 2000) / 10000 = 16
            const contribution = (effectiveScore * component.weightBasisPoints) / 10000;
            totalWeightedScore += contribution;
        }

        // Round to 2 decimal places to avoid floating point anomalies in letter grade lookup
        const finalNumericScore = Math.round(totalWeightedScore * 100) / 100;

        // Resolve Grade Band
        let matchedBand = gradeScale.bands.find(
            band => finalNumericScore >= band.minScore && finalNumericScore <= band.maxScore
        );

        if (!matchedBand) {
            // Fallback for edge cases (e.g. exactly 0, or rounding errors above 100)
            if (finalNumericScore > 100) {
                matchedBand = gradeScale.bands.find(b => b.maxScore === 100);
            } else if (finalNumericScore < 0) {
                matchedBand = gradeScale.bands.find(b => b.minScore === 0);
            }

            if (!matchedBand) {
                throw new Error(`Could not resolve grade band for score ${finalNumericScore} in scale ${gradeScale.name}`);
            }
        }

        return new FinalGradeSnapshot(
            finalNumericScore,
            matchedBand.letterGrade,
            matchedBand.gradePoint,
            matchedBand.passStatus,
            gradeScale.gradeScaleId,
            gradeScale.version
        );
    }
}
