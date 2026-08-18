import { IRuntime } from './IRuntime';

export interface ICertificationRuntime extends IRuntime {
  verifyCertificate(domainPath: string): Promise<boolean>;
  getScore(domain: string): number;
}
