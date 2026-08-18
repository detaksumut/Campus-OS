import { IRuntime } from '@campus-os/kernel';
import { AuthenticationRuntime } from './AuthenticationRuntime';
import { SessionRuntime } from './SessionRuntime';

export class IdentityRuntimeModule implements IRuntime {
  readonly name = 'IdentityRuntime';

  constructor(
    private auth: AuthenticationRuntime,
    private session: SessionRuntime
  ) {}

  async initialize(): Promise<void> {}
  async configure(config: any): Promise<void> {}
  async validate(): Promise<void> {}
  async start(): Promise<void> {}
  async ready(): Promise<void> {}
  async stop(): Promise<void> {}
  async dispose(): Promise<void> {}
}
