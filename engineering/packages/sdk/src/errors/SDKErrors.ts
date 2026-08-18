export class SDKNotInitializedError extends Error {
  constructor() {
    super(
      'SDK Not Initialized. You must call SDKProvider.initialize(kernel) before using any SDK Façade (e.g. Workflow.start()).'
    );
    this.name = 'SDKNotInitializedError';
  }
}

export class NotImplementedError extends Error {
  constructor(service: string) {
    super(`The service [${service}] is defined in the SDK contract but has not been implemented in the current Kernel phase.`);
    this.name = 'NotImplementedError';
  }
}
