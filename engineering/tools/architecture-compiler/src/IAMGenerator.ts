import * as fs from 'fs';
import * as path from 'path';

export class IAMGenerator {
  static generate(specs: any[], outputPath: string): void {
    const iam = {
      compilerVersion: "1.0.0",
      generatedAt: new Date().toISOString(),
      models: specs.reduce((acc, spec) => {
        acc[spec.id] = spec;
        return acc;
      }, {})
    };

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(iam, null, 2));
    console.log(`[IAM] Successfully generated ArchitectureModel.json at ${outputPath}`);

    // Generate PlatformCatalog.json
    const catalogPath = path.join(dir, 'PlatformCatalog.json');
    const catalog = {
      schemaVersion: "1.0",
      generatedBy: "ArchitectureCompiler",
      compilerVersion: "1.0.0",
      domains: [],
      capabilities: [],
      events: [],
      workflows: [],
      repositories: [],
      templates: ["domain"],
      goldenRules: [],
      certificates: []
    };
    fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
    console.log(`[IAM] Successfully generated PlatformCatalog.json at ${catalogPath}`);
  }
}
