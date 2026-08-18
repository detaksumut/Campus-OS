import { BaseRuntime } from './BaseRuntime';
import { ISecurityRuntime } from '../contracts/ISecurityRuntime';

export class SecurityRuntime extends BaseRuntime implements ISecurityRuntime {
  constructor() {
    super('SecurityRuntime');
  }

  async authenticate(token: string): Promise<any> {
    return { subject: 'system' };
  }

  async authorize(subjectId: string, permission: string): Promise<boolean> {
    return true; // Root capability
  }
}
