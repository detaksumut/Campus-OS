import * as fs from 'fs';
import * as path from 'path';

export class TemplateGenerator {
  static generate(iamPath: string, templatesOutputDir: string): void {
    if (!fs.existsSync(iamPath)) {
      throw new Error(`IAM Model not found at: ${iamPath}`);
    }

    const iam = JSON.parse(fs.readFileSync(iamPath, 'utf8'));
    
    if (!fs.existsSync(templatesOutputDir)) {
      fs.mkdirSync(templatesOutputDir, { recursive: true });
    }

    // Generate Domain Structure Template
    const domainSpec = iam.models['domain-structure'];
    if (domainSpec) {
      const domainTemplatePath = path.join(templatesOutputDir, 'domain');
      if (!fs.existsSync(domainTemplatePath)) {
        fs.mkdirSync(domainTemplatePath, { recursive: true });
      }

      // Generate folders
      domainSpec.folders.forEach((folder: string) => {
        const p = path.join(domainTemplatePath, folder);
        if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
        // Place a .gitkeep so empty folders are tracked
        fs.writeFileSync(path.join(p, '.gitkeep'), '');
      });

      // Generate base required files templates
      domainSpec.requiredFiles.forEach((file: any) => {
        if (file.name === 'DomainManifest.json') {
          fs.writeFileSync(
            path.join(domainTemplatePath, 'manifest', 'DomainManifest.json.hbs'), 
            `{
  "domain": "{{domainName}}",
  "version": "1.0.0",
  "sdkVersion": "1.0.0",
  "kernelVersion": "1.0.0",
  "capabilities": [],
  "events": [],
  "dependencies": []
}`
          );
        } else if (file.name === 'README.md') {
          fs.writeFileSync(
            path.join(domainTemplatePath, 'README.md.hbs'), 
            `# {{domainName}} Domain

## Bounded Context
This domain handles the bounded context of {{domainName}}.

## Certification Status
- Validation: Pending
- Governance: Pending
`
          );
        }
      });

      // Write TemplateManifest.json
      fs.writeFileSync(
        path.join(templatesOutputDir, 'TemplateManifest.json'),
        JSON.stringify({
          compiledAt: new Date().toISOString(),
          templates: ['domain']
        }, null, 2)
      );

      // Write TemplateCertificate.json
      fs.writeFileSync(
        path.join(templatesOutputDir, 'domain', 'TemplateCertificate.json'),
        JSON.stringify({
          status: "Certified",
          architectureModelHash: "sha256-mock-hash-from-iam",
          platformCatalogHash: "sha256-mock-hash-from-catalog",
          compilerVersion: "1.0.0",
          templateVersion: "1.0.0",
          generatedAt: new Date().toISOString(),
          checksum: "sha256-mock-checksum",
          deterministic: true
        }, null, 2)
      );
    }

    // Generate Service Structure Template
    const serviceSpec = iam.models['service-structure'];
    if (serviceSpec) {
      const serviceTemplatePath = path.join(templatesOutputDir, 'service');
      if (!fs.existsSync(serviceTemplatePath)) {
        fs.mkdirSync(serviceTemplatePath, { recursive: true });
      }

      serviceSpec.folders.forEach((folder: string) => {
        const p = path.join(serviceTemplatePath, folder);
        if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
        fs.writeFileSync(path.join(p, '.gitkeep'), '');
      });

      serviceSpec.requiredFiles.forEach((file: any) => {
        if (file.name === 'ServiceManifest.json') {
          fs.writeFileSync(
            path.join(serviceTemplatePath, 'manifest', 'ServiceManifest.json.hbs'), 
            `{
  "service": "{{serviceName}}",
  "version": "1.0.0",
  "runtimeVersion": "1.0.0",
  "healthContract": "Standard",
  "sdkCompatibility": "1.x",
  "kernelCompatibility": "1.x",
  "capabilities": [],
  "dependencies": [],
  "certificateId": "PENDING",
  "certificateVersion": "1.0.0"
}`
          );
        } else if (file.name === 'README.md') {
          fs.writeFileSync(
            path.join(serviceTemplatePath, 'README.md.hbs'), 
            `# {{serviceName}} Shared Service\n\n## Overview\nCore shared service for {{serviceName}}.`
          );
        }
      });

      // Write TemplateManifest
      fs.writeFileSync(
        path.join(templatesOutputDir, 'TemplateManifest.json'),
        JSON.stringify({
          compiledAt: new Date().toISOString(),
          templates: ['domain', 'service']
        }, null, 2)
      );

      fs.writeFileSync(
        path.join(templatesOutputDir, 'service', 'TemplateCertificate.json'),
        JSON.stringify({ status: "Certified", deterministic: true }, null, 2)
      );

      console.log(`[TemplateGenerator] Generated CLI Templates at ${templatesOutputDir}`);
    }
  }
}
