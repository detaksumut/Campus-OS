import { AssessmentResult } from '../value-objects/AdmissionsValueObjects';
import { SelectionStageType } from '../types/AdmissionsEnums';

export class SelectionStage {
  private results: AssessmentResult[] = [];

  constructor(
    private readonly stageId: string, // Logical UUID
    private readonly type: SelectionStageType,
    private readonly description: string
  ) {}

  get id(): string { return this.stageId; }
  get stageType(): SelectionStageType { return this.type; }
  get stageDescription(): string { return this.description; }
  get allResults(): AssessmentResult[] { return this.results; }

  recordResult(result: AssessmentResult): void {
    this.results.push(result);
  }
}
