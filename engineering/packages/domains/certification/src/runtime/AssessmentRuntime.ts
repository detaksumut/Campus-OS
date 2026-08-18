import { IAssessmentRuntime, IAssessmentComponent, AssessmentDto, AssessmentResult, AssessmentStatus, CertificationScheme } from '../contracts';
import { ISchemeRuntime } from '../contracts';
import { IEventBus } from '@campus-os/kernel';
import { CertificationDomainEvents } from './CertificationEvents';

export class AssessmentPolicy {
  calculateOverallScore(results: AssessmentResult[], scheme: CertificationScheme): { score: number; passed: boolean } {
    let weightedScore = 0;
    let totalWeight = 0;

    for (const result of results) {
      const component = scheme.assessmentComponents.find(c => c.method === result.componentType);
      if (!component) continue;
      const percentage = result.score?.percentage ?? 0;
      weightedScore += percentage * (component.weight / 100);
      totalWeight += component.weight;
    }

    const normalizedScore = totalWeight > 0 ? (weightedScore / totalWeight) * 100 : 0;

    // All mandatory components must individually pass their threshold
    const mandatoryFailed = results.some(r => {
      const comp = scheme.assessmentComponents.find(c => c.method === r.componentType);
      return comp?.required && r.recommendation === 'Fail';
    });

    return {
      score: Math.round(normalizedScore * 10) / 10,
      passed: !mandatoryFailed && normalizedScore >= 60 // Default 60% overall threshold
    };
  }

  isComplete(results: AssessmentResult[], scheme: CertificationScheme): boolean {
    const requiredMethods = scheme.assessmentComponents
      .filter(c => c.required)
      .map(c => c.method);
    const completedMethods = results.map(r => r.componentType);
    return requiredMethods.every(m => completedMethods.includes(m));
  }
}

export class AssessmentRuntime implements IAssessmentRuntime {
  private assessments = new Map<string, AssessmentDto>();
  private byApplication = new Map<string, string>();

  constructor(
    private schemeRuntime: ISchemeRuntime,
    private assessmentPolicy: AssessmentPolicy,
    private eventBus: IEventBus
  ) {}

  async openAssessment(applicationId: string, schemeId: string): Promise<string> {
    const assessmentId = `assess_${Date.now()}`;
    this.assessments.set(assessmentId, {
      assessmentId, applicationId, schemeId,
      state: 'In Progress', componentResults: [],
      overallScore: 0, overallPassed: false
    });
    this.byApplication.set(applicationId, assessmentId);
    return assessmentId;
  }

  async recordComponentResult(assessmentId: string, result: AssessmentResult): Promise<void> {
    const a = this.assessments.get(assessmentId);
    if (!a) throw new Error('Assessment not found');
    if (a.state === 'Completed') throw new Error('Cannot add results to a completed assessment');

    // Replace if same component type already exists (e.g., retry)
    const idx = a.componentResults.findIndex(r => r.componentType === result.componentType);
    if (idx >= 0) {
      a.componentResults[idx] = result;
    } else {
      a.componentResults.push(result);
    }
  }

  async completeAssessment(assessmentId: string): Promise<void> {
    const a = this.assessments.get(assessmentId);
    if (!a) throw new Error('Assessment not found');
    const scheme = await this.schemeRuntime.getScheme(a.schemeId);
    if (!scheme) throw new Error('Scheme not found');

    if (!this.assessmentPolicy.isComplete(a.componentResults, scheme)) {
      throw new Error('Not all required assessment components have been completed');
    }

    const { score, passed } = this.assessmentPolicy.calculateOverallScore(a.componentResults, scheme);
    a.overallScore = score;
    a.overallPassed = passed;
    a.state = 'Completed';
    a.completedAt = Date.now();

    this.eventBus.emit(CertificationDomainEvents.AssessmentCompleted, {
      assessmentId, applicationId: a.applicationId, overallScore: score, overallPassed: passed
    });
  }

  async getAssessment(assessmentId: string): Promise<AssessmentDto | null> {
    return this.assessments.get(assessmentId) || null;
  }

  async getByApplication(applicationId: string): Promise<AssessmentDto | null> {
    const id = this.byApplication.get(applicationId);
    return id ? this.getAssessment(id) : null;
  }
}
