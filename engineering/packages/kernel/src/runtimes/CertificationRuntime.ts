import { BaseRuntime } from './BaseRuntime';
import { ICertificationRuntime } from '../contracts/ICertificationRuntime';

export class CertificationRuntime extends BaseRuntime implements ICertificationRuntime {
  constructor() {
    super('CertificationRuntime');
  }

  async verifyCertificate(domainPath: string): Promise<boolean> {
    // In actual implementation, reads the RuntimeReadyCertificate.json
    return true; 
  }

  getScore(domain: string): number {
    return 100;
  }
}
