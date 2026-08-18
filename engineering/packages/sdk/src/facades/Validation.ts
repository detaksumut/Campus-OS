import { SDKContext } from '../context/SDKContext';
import { IValidationRuntime } from '../../../kernel/src/contracts/IValidationRuntime';

export class Validation {
  private static get runtime(): IValidationRuntime {
    return SDKContext.getRuntime<IValidationRuntime>('ValidationRuntime');
  }

  static validatePayload(schemaId: string, payload: any): boolean {
    return this.runtime.validatePayload(schemaId, payload);
  }
}
