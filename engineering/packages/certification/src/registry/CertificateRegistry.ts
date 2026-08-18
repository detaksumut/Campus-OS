import * as fs from 'fs';
import * as path from 'path';
import { OfficialCertificate, Evidence } from '../contracts/CertificationContracts';

export class CertificateRegistry {
  private registryPath = path.resolve(__dirname, '../../../../build/certification/PlatformCertificateIndex.json');

  constructor() {
    if (!fs.existsSync(path.dirname(this.registryPath))) {
      fs.mkdirSync(path.dirname(this.registryPath), { recursive: true });
    }
    if (!fs.existsSync(this.registryPath)) {
      fs.writeFileSync(this.registryPath, JSON.stringify({ certificates: [] }, null, 2));
    }
  }

  register(certificate: OfficialCertificate) {
    const registry = JSON.parse(fs.readFileSync(this.registryPath, 'utf8'));
    registry.certificates.push({
      id: certificate.certificateId,
      type: certificate.certificateType,
      maturity: certificate.score.maturity,
      grade: certificate.score.grade,
      issuedAt: certificate.issuedAt
    });
    fs.writeFileSync(this.registryPath, JSON.stringify(registry, null, 2));
    
    // Also save the full certificate to disk
    const certPath = path.resolve(__dirname, `../../../../build/certification/${certificate.certificateId}.json`);
    fs.writeFileSync(certPath, JSON.stringify(certificate, null, 2));
  }
}
