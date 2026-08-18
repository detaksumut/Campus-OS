import { GovernanceReport } from '../engine/GovernanceEngine';
import { writeFileSync } from 'fs';

export class JsonReporter {
  static generate(report: GovernanceReport, outputPath: string) {
    writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');
  }
}
