import { GovernanceReport } from '../engine/GovernanceEngine';
import { writeFileSync } from 'fs';

export class MarkdownReporter {
  static generate(report: GovernanceReport, outputPath: string) {
    let md = `# Architecture Governance Certification Report\n\n`;
    md += `**Version:** ${report.version} | **Timestamp:** ${report.timestamp}\n\n`;
    md += `## Overall Certification\n`;
    md += `- **Score:** ${report.overallScore} / ${report.maxScore}\n`;
    md += `- **Level:** **${report.certificationLevel}**\n`;
    md += `- **Status:** ${report.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}\n\n`;

    if (report.regression.detected) {
      md += `> [!WARNING]\n> **REGRESSION DETECTED!** Score dropped by ${report.regression.scoreDifference} points.\n\n`;
      md += `### Regression Details\n`;
      for (const d of report.regression.details) {
        md += `- **${d.ruleId}** (${d.ruleName}): ${d.reason}\n`;
      }
      md += `\n`;
    }

    md += `## Category Certifications\n`;
    md += `| Category | Score | Certification Level |\n`;
    md += `|----------|-------|---------------------|\n`;
    for (const key in report.categories) {
      const cat = report.categories[key];
      md += `| ${cat.category} | ${cat.score}/${cat.maxScore} | ${cat.level} |\n`;
    }
    md += `\n`;

    md += `## Rules Evaluation Details\n`;
    md += `| Rule ID | Score | Status | Violations |\n`;
    md += `|---------|-------|--------|------------|\n`;

    for (const result of report.results) {
      md += `| ${result.ruleId} | ${result.score}/${result.maxScore} | ${result.status === 'PASSED' ? '✅ PASSED' : (result.status === 'BLOCKED' ? '🛑 BLOCKED' : '❌ FAILED')} | ${result.violations.length} |\n`;
    }

    if (report.status === 'FAIL' || report.regression.detected) {
      md += `\n## Violation Logs\n`;
      for (const result of report.results) {
        if (result.status === 'FAILED' || result.status === 'BLOCKED') {
          md += `### ${result.ruleId} (${result.status})\n`;
          for (const v of result.violations) {
            md += `- **[${v.severity}]** \`${v.file}\`: ${v.message}\n`;
          }
        }
      }
    }

    writeFileSync(outputPath, md, 'utf-8');
  }
}
