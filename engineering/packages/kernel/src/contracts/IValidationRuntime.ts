import { IRuntime } from './IRuntime';

export interface IValidationRuntime extends IRuntime {
  validatePayload(schemaId: string, payload: any): boolean;
}
