import * as fs from 'fs';
import * as path from 'path';

export class DomainGenerator {
  static generate(domainName: string): void {
    const templatesDir = path.resolve(__dirname, '../../templates/domain');
    const targetDir = path.resolve(__dirname, `../../../domains/${domainName.toLowerCase()}`);

    if (!fs.existsSync(templatesDir)) {
      throw new Error(`Domain template not found at ${templatesDir}. Have you run 'campus architecture compile'?`);
    }

    if (fs.existsSync(targetDir)) {
      throw new Error(`Target domain directory already exists: ${targetDir}`);
    }

    console.log(`Copying template from ${templatesDir} to ${targetDir}...`);
    this.copyFolderRecursiveSync(templatesDir, targetDir, domainName);

    // Generate DomainCertificate.json
    const certPath = path.join(targetDir, 'DomainCertificate.json');
    const cert = {
      status: "Scaffolded",
      sdk: "1.x",
      kernel: "1.x",
      generator: "Campus CLI"
    };
    fs.writeFileSync(certPath, JSON.stringify(cert, null, 2));

    console.log(`✅ Domain [${domainName}] successfully generated at ${targetDir}`);
    console.log(`⚠️ Remember to run 'campus validate' to ensure compliance.`);
  }

  private static copyFolderRecursiveSync(source: string, target: string, domainName: string) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const sourceFile = path.join(source, file);
      const targetFile = path.join(target, file).replace('.hbs', '');
      
      const stats = fs.statSync(sourceFile);
      if (stats.isDirectory()) {
        this.copyFolderRecursiveSync(sourceFile, targetFile, domainName);
      } else {
        const content = fs.readFileSync(sourceFile, 'utf8');
        // Simple template replacement
        const parsedContent = content.replace(/{{domainName}}/g, domainName);
        fs.writeFileSync(targetFile, parsedContent);
      }
    });
  }
}
