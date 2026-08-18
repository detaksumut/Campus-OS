import { GovernanceEngine } from './engine/GovernanceEngine';
import { GoldenRuleRegistry } from './rules/GoldenRuleRegistry';
import { MarkdownReporter } from './reporters/MarkdownReporter';
import { JsonReporter } from './reporters/JsonReporter';
import { CertificateGenerator } from './certification/CertificateGenerator';
import * as path from 'path';
import * as fs from 'fs';

async function run() {
  const isVerify = process.argv.includes('--verify');
  const rootDir = path.resolve(__dirname, '../../../');
  const certPath = path.join(rootDir, 'ArchitectureCertificate.json');

  if (isVerify) {
    console.log(`Verifying Certificate: ${certPath}`);
    const isValid = CertificateGenerator.verify(certPath);
    if (!isValid) process.exit(1);
    process.exit(0);
  }

  const modeIndex = process.argv.indexOf('--mode');
  const mode = (modeIndex > -1 && process.argv[modeIndex + 1]) === 'certification' ? 'certification' : 'development';
  const version = 'v1.2';

  console.log(`Running Architecture Governance Checks (Mode: ${mode.toUpperCase()}, Version: ${version})`);
  
  const engine = new GovernanceEngine();
  const rules = GoldenRuleRegistry.getRules(version);
  engine.registerRules(rules);

  const filesToScan = [
    path.resolve(__dirname, '../../packages/domains/siakad/src/submodules/registration/src/infrastructure/RegistrationRepository.ts'),
    path.resolve(__dirname, '../../packages/domains/siakad/src/submodules/registration/src/presentation/components/RegistrationGridWidget.tsx'),
    path.resolve(__dirname, '../../packages/domains/siakad/src/submodules/registration/src/presentation/components/RegistrationFormWidget.tsx')
  ];

  const report = await engine.run(filesToScan, version, mode);

  MarkdownReporter.generate(report, path.join(rootDir, 'ArchitectureComplianceReport.md'));
  JsonReporter.generate(report, path.join(rootDir, 'ArchitectureCompliance.json'));
  
  if (report.certificate) {
    fs.writeFileSync(certPath, JSON.stringify(report.certificate, null, 2), 'utf-8');
    console.log(`\n📄 Generated Architecture Certificate: ${report.certificate.certificateId}`);
    console.log(`Hash: ${report.certificate.complianceHash}`);
  }

  console.log(`\nGovernance Score: ${report.overallScore} / ${report.maxScore}`);
  console.log(`Certification Level: ${report.certificationLevel}`);
  console.log(`Status: ${report.status}`);
  
  if (report.regression.detected) {
    console.error(`\n🚨 REGRESSION DETECTED 🚨`);
    console.error(`Score Difference: ${report.regression.scoreDifference}`);
    report.regression.details.forEach(d => console.error(`- [${d.ruleId}] ${d.ruleName}: ${d.reason}`));
  }

  if (report.status === 'FAIL') {
    process.exit(1);
  }
}

run().catch(console.error);
