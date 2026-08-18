import { ScoreEngine } from '../src/engines/ScoreEngine';

async function runTest() {
  console.log('=== Score Engine Math Test ===');

  const dimensions = {
    architecture: 100,
    governance: 100,
    testing: 50,
    documentation: 100,
    security: 100,
    compatibility: 100,
    determinism: 100
  };

  const score = ScoreEngine.calculate(dimensions);
  
  console.log(`Calculated Numeric Score: ${score.numeric}`);
  console.log(`Calculated Grade: ${score.grade}`);
  console.log(`Calculated Maturity: ${score.maturity}`);

  // Expected logic: Testing is 15% weight. Loss of 50 points = 7.5 total drop.
  // 100 - 7.5 = 92.5
  if (score.numeric !== 92.5) throw new Error('Math mismatch');
  if (score.grade !== 'A') throw new Error('Grade mismatch');
  if (score.maturity !== 'Certified') throw new Error('Maturity mismatch');

  console.log('✅ Score Engine multi-dimensional math is correct.');
}

runTest().catch(console.error);
