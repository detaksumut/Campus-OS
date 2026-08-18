import { IRuntime } from '../contracts/IRuntime';

export class KernelContext {
  private runtimes = new Map<string, IRuntime>();

  registerRuntime(name: string, runtime: IRuntime): void {
    this.runtimes.set(name, runtime);
  }

  getRuntime<T extends IRuntime>(name: string): T {
    const runtime = this.runtimes.get(name);
    if (!runtime) {
      throw new Error(`Runtime [${name}] not registered in context.`);
    }
    return runtime as T;
  }

  getAllRuntimes(): IRuntime[] {
    return Array.from(this.runtimes.values());
  }
}
