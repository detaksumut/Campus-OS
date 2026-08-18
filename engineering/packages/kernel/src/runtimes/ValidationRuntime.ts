import { BaseRuntime } from './BaseRuntime';
import { IValidationRuntime } from '../contracts/IValidationRuntime';

export class ValidationRuntime extends BaseRuntime implements IValidationRuntime {
  constructor() {
    super('ValidationRuntime');
  }

  validatePayload(schemaId: string, payload: any): boolean {
    // Stub implementation
    return payload !== null;
  }
}
