export class RuntimeResolver {
  private kernelContext: any;

  constructor(kernelContext: any) {
    this.kernelContext = kernelContext;
  }

  resolve<T>(runtimeName: string): T {
    if (!this.kernelContext) {
      throw new Error('KernelContext is not bound to RuntimeResolver.');
    }

    const runtime = this.kernelContext.getRuntime(runtimeName);
    if (!runtime) {
      throw new Error(`Runtime [${runtimeName}] could not be resolved.`);
    }

    return runtime as T;
  }
}
