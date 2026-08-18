import { IRuntime } from '../contracts/IRuntime';

export abstract class BaseRuntime implements IRuntime {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  async initialize(): Promise<void> {
    console.log(`[${this.name}] Initializing...`);
  }

  async boot(): Promise<void> {
    console.log(`[${this.name}] Booting...`);
  }

  async start(): Promise<void> {
    console.log(`[${this.name}] Starting...`);
  }

  async ready(): Promise<void> {
    console.log(`[${this.name}] Ready.`);
  }

  async shutdown(): Promise<void> {
    console.log(`[${this.name}] Shutting down...`);
  }

  async dispose(): Promise<void> {
    console.log(`[${this.name}] Disposed.`);
  }
}
