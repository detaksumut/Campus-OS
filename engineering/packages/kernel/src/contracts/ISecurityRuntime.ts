import { IRuntime } from './IRuntime';

export interface ISecurityRuntime extends IRuntime {
  authenticate(token: string): Promise<any>;
  authorize(subjectId: string, permission: string): Promise<boolean>;
}
