import { SDKContext } from '../context/SDKContext';
import { ISecurityRuntime } from '../../../kernel/src/contracts/ISecurityRuntime';

export class Security {
  private static get runtime(): ISecurityRuntime {
    return SDKContext.getRuntime<ISecurityRuntime>('SecurityRuntime');
  }

  static async authorize(subjectId: string, permission: string): Promise<boolean> {
    return this.runtime.authorize(subjectId, permission);
  }
}

export class Identity {
  private static get runtime(): ISecurityRuntime {
    return SDKContext.getRuntime<ISecurityRuntime>('SecurityRuntime');
  }

  static async login(token: string): Promise<any> {
    return this.runtime.authenticate(token);
  }
}
