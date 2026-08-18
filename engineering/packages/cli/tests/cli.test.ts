import { compileArchitecture } from '../../tools/architecture-compiler/src/index';
import { DomainGenerator } from '../src/generators/DomainGenerator';
import * as fs from 'fs';
import * as path from 'path';

async function runTests() {
  console.log('=== Campus CLI Verification Tests ===');

  try {
    // 1. Compiler Determinism Test & IAM Validation
    console.log('Running Compiler Determinism Test...');
    
    // First compile
    compileArchitecture();
    const iamPath = path.resolve(__dirname, '../../../build/architecture/ArchitectureModel.json');
    const iam1 = fs.readFileSync(iamPath, 'utf8');
    
    // Second compile
    compileArchitecture();
    const iam2 = fs.readFileSync(iamPath, 'utf8');
    
    if (iam1 !== iam2) {
      throw new Error('Determinism Test Failed: Architecture Compiler output is not deterministic.');
    }
    
    // Schema validation (mock)
    const iamObj = JSON.parse(iam2);
    if (!iamObj.models || !iamObj.models['domain-structure']) {
       throw new Error('IAM Validation Failed: Missing domain-structure model.');
    }
    console.log('✅ Compiler Determinism Test Passed.');
    console.log('✅ Architecture Model Validation Test Passed.');

    // 2. Template Consistency Test
    console.log('Running Template Consistency Test...');
    const templatesDir = path.resolve(__dirname, '../templates/domain');
    if (!fs.existsSync(path.join(templatesDir, 'application'))) {
      throw new Error('Template Consistency Test Failed: Application folder template missing.');
    }
    console.log('✅ Template Consistency Test Passed.');

    // 3. Reproducibility Test
    console.log('Running Reproducibility Test...');
    const testDomain1 = 'TestMembership1';
    const testDomain2 = 'TestMembership2';
    
    DomainGenerator.generate(testDomain1);
    DomainGenerator.generate(testDomain2);
    
    const manifest1 = fs.readFileSync(path.resolve(__dirname, `../../../domains/${testDomain1.toLowerCase()}/manifest/DomainManifest.json`), 'utf8');
    const manifest2 = fs.readFileSync(path.resolve(__dirname, `../../../domains/${testDomain2.toLowerCase()}/manifest/DomainManifest.json`), 'utf8');
    
    // Normalize domain names for comparison
    const norm1 = manifest1.replace(testDomain1, 'Normalized');
    const norm2 = manifest2.replace(testDomain2, 'Normalized');
    
    if (norm1 !== norm2) {
      throw new Error('Reproducibility Test Failed: Generated artifacts are not identical.');
    }
    console.log('✅ Reproducibility Test Passed.');

    // 4. Generated Domain Certification Test
    console.log('Running Generated Domain Certification Test...');
    const domainFolders = fs.readdirSync(path.resolve(__dirname, `../../../domains/${testDomain1.toLowerCase()}`));
    const expectedFolders = ['application', 'domain', 'infrastructure', 'presentation', 'events', 'repositories', 'dto', 'tests', 'manifest', 'artifacts'];
    
    expectedFolders.forEach(folder => {
      if (!domainFolders.includes(folder)) {
        throw new Error(`Certification Test Failed: Missing required folder [${folder}].`);
      }
    });
    console.log('✅ Generated Domain Certification Test Passed.');

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('=== All Campus CLI Tests Passed ===');
}

runTests();
