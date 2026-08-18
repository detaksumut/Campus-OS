import * as fs from 'fs';
import * as path from 'path';

export interface RuleViolation {
  file: string;
  line: number;
  message: string;
}

export class ArchitectureGuardian {
  private violations: RuleViolation[] = [];

  constructor(private rootDir: string) {}

  public scan(files: string[]): RuleViolation[] {
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        // 1. Layer Violation Check (Domain importing Kernel internals)
        if (file.includes('/packages/domains/') && line.match(/from\s+['"]@campus-os\/kernel-(core|container|events)['"]/)) {
          this.violations.push({
            file,
            line: index + 1,
            message: 'Layer Violation: Domain packages must import from @campus-os/kernel, not internal packages.'
          });
        }

        // 2. Circular Dependency / React inside Pure TS Runtime
        if (file.includes('-runtime') && !file.includes('-react') && line.match(/from\s+['"]react['"]/)) {
          this.violations.push({
            file,
            line: index + 1,
            message: 'Forbidden Dependency: Pure Runtime packages cannot import React.'
          });
        }
      });
    }

    return this.violations;
  }
}
