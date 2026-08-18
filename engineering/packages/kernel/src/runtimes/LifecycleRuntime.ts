import { BaseRuntime } from './BaseRuntime';
import { ILifecycleRuntime } from '../contracts/ILifecycleRuntime';

export class LifecycleRuntime extends BaseRuntime implements ILifecycleRuntime {
  private currentState: string = 'INITIAL';

  constructor() {
    super('LifecycleRuntime');
  }

  async transitionTo(state: string): Promise<void> {
    console.log(`[${this.name}] Transitioning from ${this.currentState} to ${state}`);
    this.currentState = state;
  }

  getCurrentState(): string {
    return this.currentState;
  }
}
