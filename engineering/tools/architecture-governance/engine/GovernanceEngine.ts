import { IArchitectureRule, RuleEvaluationResult, GovernanceReport, CategoryScore, CertificationLevel, HistoryRecord, RuleEvaluationStatus } from './types';
import { CertificateGenerator } from '../certification/CertificateGenerator';
import * as fs from 'fs';
import * as path from 'path';

export class GovernanceEngine {
  private rules: IArchitectureRule[] = [];

  registerRules(rules: IArchitectureRule[]) {
    this.rules = rules;
  }

  private calculateLevel(score: number, maxScore: number): CertificationLevel {
    if (maxScore === 0) return 'Needs Improvement';
    const percentage = (score / maxScore) * 100;
    if (percentage === 100) return 'Architecture Excellence';
    if (percentage >= 90) return 'Certified';
    if (percentage >= 75) return 'Provisionally Certified';
    if (percentage >= 50) return 'Needs Improvement';
    return 'Rejected';
  }

  private sortTopologically(): IArchitectureRule[] {
    const sorted: IArchitectureRule[] = [];
    const visited = new Set<string>();
    const processing = new Set<string>();
    const ruleMap = new Map(this.rules.map(r => [r.id, r]));

    const visit = (ruleId: string) => {
      if (processing.has(ruleId)) {
        throw new Error(`Circular dependency detected involving rule: ${ruleId}`);
      }
      if (!visited.has(ruleId)) {
        processing.add(ruleId);
        const rule = ruleMap.get(ruleId);
        if (rule) {
          if (rule.dependsOn) {
            for (const depId of rule.dependsOn) {
              visit(depId);
            }
          }
          processing.delete(ruleId);
          visited.add(ruleId);
          sorted.push(rule);
        } else {
          processing.delete(ruleId);
          visited.add(ruleId);
        }
      }
    };

    for (const rule of this.rules) {
      if (!visited.has(rule.id)) {
        visit(rule.id);
      }
    }
    return sorted;
  }

  async run(files: string[], version: string, mode: 'development' | 'certification'): Promise<GovernanceReport> {
    const results: RuleEvaluationResult[] = [];
    const categories: Record<string, CategoryScore> = {};
    let totalScore = 0;
    let maxTotalScore = 0;
    let hasFailure = false;

    const sortedRules = this.sortTopologically();
    const evaluationMap = new Map<string, RuleEvaluationStatus>();

    for (const rule of sortedRules) {
      let isBlocked = false;
      if (rule.dependsOn) {
        for (const depId of rule.dependsOn) {
          const depStatus = evaluationMap.get(depId);
          if (depStatus !== 'PASSED' && depStatus !== 'SKIPPED') {
            isBlocked = true;
            break;
          }
        }
      }

      if (!categories[rule.category]) {
        categories[rule.category] = { category: rule.category, score: 0, maxScore: rule.maxScore, level: 'Rejected' };
      } else {
        categories[rule.category].maxScore += rule.maxScore;
      }
      maxTotalScore += rule.maxScore;

      if (isBlocked) {
        const result: RuleEvaluationResult = {
          ruleId: rule.id,
          status: 'BLOCKED',
          score: 0,
          maxScore: rule.maxScore,
          violations: []
        };
        results.push(result);
        evaluationMap.set(rule.id, 'BLOCKED');
        hasFailure = true; // Blocked counts as failure to fully pass
        continue;
      }

      const result = await rule.evaluate(files);
      results.push(result);
      evaluationMap.set(rule.id, result.status);

      categories[rule.category].score += result.score;
      totalScore += result.score;

      const hasBlocker = result.violations.some(v => v.severity === 'BLOCKER');
      const hasError = result.violations.some(v => v.severity === 'ERROR');
      const hasWarning = result.violations.some(v => v.severity === 'WARNING');
      
      if (hasBlocker || hasError || (mode === 'certification' && hasWarning) || result.status === 'FAILED') {
        hasFailure = true;
      }
    }

    for (const key in categories) {
      const cat = categories[key];
      cat.level = this.calculateLevel(cat.score, cat.maxScore);
    }

    const overallLevel = this.calculateLevel(totalScore, maxTotalScore);
    const status = hasFailure ? 'FAIL' : 'PASS';
    
    // Regression Analysis & History
    const historyFile = path.resolve(__dirname, '../../../../ArchitectureHistory.json');
    let regressionData = { detected: false, scoreDifference: 0, details: [] as any[] };
    let history: HistoryRecord[] = [];

    if (fs.existsSync(historyFile)) {
      try {
        history = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));
        if (history.length > 0) {
          const previous = history[history.length - 1];
          const diff = totalScore - previous.score;
          if (diff < 0) {
            regressionData.detected = true;
            regressionData.scoreDifference = diff;
            results.filter(r => r.status === 'FAILED' || r.status === 'BLOCKED').forEach(r => {
              const ruleMeta = this.rules.find(rule => rule.id === r.ruleId);
              regressionData.details.push({
                ruleId: r.ruleId,
                ruleName: ruleMeta?.name || 'Unknown',
                reason: `Status: ${r.status}. Category: ${ruleMeta?.category}.`
              });
            });
          }
        }
      } catch (e) {
        console.error('Failed to read ArchitectureHistory.json');
      }
    }

    const timestamp = new Date().toISOString();
    history.push({ version, timestamp, score: totalScore, certificationLevel: overallLevel });
    fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

    // Generate Certificate
    const certificate = CertificateGenerator.create({
      boundedContext: 'Registration',
      projectVersion: '1.0.0',
      goldenRuleVersion: version,
      artifactVersion: '1.0.0',
      repositoryCommit: process.env.GIT_COMMIT || 'development-commit',
      buildNumber: process.env.BUILD_NUMBER || 'local-build',
      overallScore: totalScore,
      maxScore: maxTotalScore,
      certificationLevel: overallLevel,
      categories,
      evaluatedRules: results.map(r => ({ ruleId: r.ruleId, status: r.status, score: r.score }))
    });

    return {
      version,
      timestamp,
      overallScore: totalScore,
      maxScore: maxTotalScore,
      certificationLevel: overallLevel,
      status,
      categories,
      results,
      regression: regressionData,
      certificate
    };
  }
}
