import { execSync } from 'child_process';

export async function benchmark() {
  console.log('⏱️ Running Performance Benchmarks...');
  execSync('npx vitest bench tools/quality-gate/tests/Kernel.bench.ts', { stdio: 'inherit' });
}
