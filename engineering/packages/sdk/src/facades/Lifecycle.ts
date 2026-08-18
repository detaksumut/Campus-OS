import { SDKContext } from '../context/SDKContext';
import { ILifecycleRuntime } from '../../../kernel/src/contracts/ILifecycleRuntime';

export class Lifecycle {
  private static get runtime(): ILifecycleRuntime {
    return SDKContext.getRuntime<ILifecycleRuntime>('LifecycleRuntime');
  }

  static state(): string {
    return this.runtime.getCurrentState();
  }

  static async ready(): Promise<void> {
    await this.runtime.transitionTo('READY');
  }

  static async shutdown(): Promise<void> {
    await this.runtime.transitionTo('TERMINATING');
  }
}
