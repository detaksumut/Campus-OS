import { SDKNotInitializedError } from '../errors/SDKErrors';
import { RuntimeResolver } from './RuntimeResolver';

export class SDKContext {
  private static resolver: RuntimeResolver | null = null;

  static initialize(kernel: any): void {
    if (!kernel || !kernel.context) {
      throw new Error('Invalid Kernel instance provided to SDKContext.');
    }
    this.resolver = new RuntimeResolver(kernel.context);
  }

  static getRuntime<T>(runtimeName: string): T {
    if (!this.resolver) {
      throw new SDKNotInitializedError();
    }
    return this.resolver.resolve<T>(runtimeName);
  }
}
