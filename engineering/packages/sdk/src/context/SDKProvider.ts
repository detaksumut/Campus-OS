import { SDKContext } from './SDKContext';

export class SDKProvider {
  /**
   * Initializes the Global SDK Context using the provided CampusKernel instance.
   * This is the bridge that injects the Kernel into the SDK without coupling the SDK code directly to the Kernel instance.
   */
  static initialize(kernel: any): void {
    SDKContext.initialize(kernel);
    console.log('[Campus SDK] Initialized successfully.');
  }
}
