import * as fs from 'fs';
import * as path from 'path';

export class ServiceGenerator {
  static generate(serviceName: string): void {
    const templatesDir = path.resolve(__dirname, '../../templates/service');
    const targetDir = path.resolve(__dirname, `../../../packages/services/${serviceName.toLowerCase()}`);

    if (!fs.existsSync(templatesDir)) {
      throw new Error(`Service template not found at ${templatesDir}. Have you run 'campus architecture compile'?`);
    }

    if (fs.existsSync(targetDir)) {
      throw new Error(`Target service directory already exists: ${targetDir}`);
    }

    console.log(`Copying template from ${templatesDir} to ${targetDir}...`);
    this.copyFolderRecursiveSync(templatesDir, targetDir, serviceName);

    // Generate ServiceCertificate.json
    const certPath = path.join(targetDir, 'ServiceCertificate.json');
    const cert = {
      status: "Scaffolded",
      sdk: "1.x",
      kernel: "1.x",
      generator: "Campus CLI"
    };
    fs.writeFileSync(certPath, JSON.stringify(cert, null, 2));

    // Update ServiceCatalog.json
    this.updateServiceCatalog(serviceName);

    console.log(`✅ Service [${serviceName}] successfully generated at ${targetDir}`);
  }

  private static copyFolderRecursiveSync(source: string, target: string, serviceName: string) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const sourceFile = path.join(source, file);
      const targetFile = path.join(target, file).replace('.hbs', '');
      
      const stats = fs.statSync(sourceFile);
      if (stats.isDirectory()) {
        this.copyFolderRecursiveSync(sourceFile, targetFile, serviceName);
      } else {
        const content = fs.readFileSync(sourceFile, 'utf8');
        const parsedContent = content.replace(/{{serviceName}}/g, serviceName);
        fs.writeFileSync(targetFile, parsedContent);
      }
    });
  }

  private static updateServiceCatalog(serviceName: string) {
    const catalogPath = path.resolve(__dirname, '../../../../build/platform/ServiceCatalog.json');
    let catalog: any = { services: [] };
    
    if (!fs.existsSync(path.dirname(catalogPath))) {
      fs.mkdirSync(path.dirname(catalogPath), { recursive: true });
    }

    if (fs.existsSync(catalogPath)) {
      catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    }

    if (!catalog.services.includes(serviceName)) {
      catalog.services.push(serviceName);
      fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
      console.log(`✅ Updated ServiceCatalog.json with ${serviceName}`);
    }
  }
}
