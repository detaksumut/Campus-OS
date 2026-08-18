export interface ICertificateNumberGenerator {
  generate(schemeCode: string, year: number): Promise<string>;
}

/**
 * SequentialCertificateNumberGenerator
 * Produces numbers like: APS-CERT-2026-000001
 * Format: {issuerCode}-{schemeCode}-{year}-{sequence}
 */
export class SequentialCertificateNumberGenerator implements ICertificateNumberGenerator {
  private counters = new Map<string, number>();

  constructor(private readonly issuerCode: string = 'APS') {}

  async generate(schemeCode: string, year: number): Promise<string> {
    const key = `${schemeCode}-${year}`;
    const next = (this.counters.get(key) ?? 0) + 1;
    this.counters.set(key, next);
    const seq = String(next).padStart(6, '0');
    return `${this.issuerCode}-${schemeCode.toUpperCase()}-${year}-${seq}`;
  }
}
