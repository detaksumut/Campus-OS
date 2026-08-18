import { IRuntime } from '../contracts/IRuntime';

export class BootSequence {
  private sequence: string[];

  constructor(sequence: string[]) {
    this.sequence = sequence;
  }

  getSequence(): string[] {
    return this.sequence;
  }
}
