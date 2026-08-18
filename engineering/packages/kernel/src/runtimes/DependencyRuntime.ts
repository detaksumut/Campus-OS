import { BaseRuntime } from './BaseRuntime';
import { IDependencyRuntime } from '../contracts/IDependencyRuntime';

export class DependencyRuntime extends BaseRuntime implements IDependencyRuntime {
  private container = new Map<string, any>();

  constructor() {
    super('DependencyRuntime');
  }

  register<T>(token: string, instance: T): void {
    this.container.set(token, instance);
  }

  resolve<T>(token: string): T {
    if (!this.container.has(token)) {
      throw new Error(`Dependency [${token}] not found in container.`);
    }
    return this.container.get(token) as T;
  }
}
