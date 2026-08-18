import { SpecificationExtractor } from './SpecificationExtractor';
import { IAMGenerator } from './IAMGenerator';
import { TemplateGenerator } from './TemplateGenerator';
import * as path from 'path';

export function compileArchitecture() {
  console.log('=== Campus Architecture Compiler ===');
  
  const blueprintPath = path.resolve(__dirname, '../../../architecture/blueprints/DomainStructure.md');
  const iamOutputPath = path.resolve(__dirname, '../../build/architecture/ArchitectureModel.json');
  const templatesOutputDir = path.resolve(__dirname, '../../../packages/cli/templates');

  try {
    // 1. Extract
    console.log(`Extracting specs...`);
    const specs = [
      ...SpecificationExtractor.extract(blueprintPath),
      ...SpecificationExtractor.extract(path.resolve(__dirname, '../../../architecture/blueprints/SharedServiceStructure.md'))
    ];

    // 2. Generate IAM
    console.log(`Compiling Intermediate Architecture Model (IAM)...`);
    IAMGenerator.generate(specs, iamOutputPath);

    // 3. Generate Templates
    console.log(`Generating CLI Templates from IAM...`);
    TemplateGenerator.generate(iamOutputPath, templatesOutputDir);

    console.log('=== Compilation Successful ===');
  } catch (error) {
    console.error('Compilation failed:', error);
    process.exit(1);
  }
}

// If invoked directly
if (require.main === module) {
  compileArchitecture();
}
