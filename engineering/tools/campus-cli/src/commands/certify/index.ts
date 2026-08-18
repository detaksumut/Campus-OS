import { execSync } from 'child_process';

export async function certify() {
  console.log('🛡️ Running Kernel Certification...');
  execSync('npx vitest run tools/quality-gate/tests/Certification.test.ts', { stdio: 'inherit' });
}
