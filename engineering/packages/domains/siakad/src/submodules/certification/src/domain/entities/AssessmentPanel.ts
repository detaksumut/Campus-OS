import { AssessorId } from '../value-objects/CertificationValueObjects';

export class AssessmentPanel {
  private assessors: AssessorId[] = [];

  addAssessor(assessor: AssessorId): void {
    if (this.assessors.some(a => a.getValue() === assessor.getValue())) {
      throw new Error('Assessor is already in the panel.');
    }
    this.assessors.push(assessor);
  }

  get currentAssessors(): AssessorId[] {
    return this.assessors;
  }
}
