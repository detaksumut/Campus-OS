import { RegistryRuntime } from '../registry/RegistryRuntime';
import { ExecutionPipeline } from '../pipeline/ExecutionPipeline';
import { ApplicationContext } from '../context/ApplicationContext';

export interface ICommand {
  commandId: string; // Resolves to a capability
  payload: any;
}

export interface ICommandHandler<TCommand extends ICommand, TResult> {
  handle(command: TCommand): Promise<TResult>;
}

export class CommandBus {
  private handlers = new Map<string, ICommandHandler<any, any>>();

  constructor(
    private registry: RegistryRuntime,
    private pipeline: ExecutionPipeline
  ) {}

  public registerHandler(commandId: string, handler: ICommandHandler<any, any>): void {
    if (this.handlers.has(commandId)) {
      throw new Error(`Handler for ${commandId} already registered.`);
    }
    this.handlers.set(commandId, handler);
  }

  public async execute<TResult>(command: ICommand): Promise<TResult> {
    // Ensure capability exists in registry
    await this.registry.resolveCapability(command.commandId);

    const handler = this.handlers.get(command.commandId);
    if (!handler) {
      throw new Error(`No handler registered for command: ${command.commandId}`);
    }

    const context = {
      commandId: command.commandId,
      payload: command.payload,
      appContext: ApplicationContext.current
    };

    return this.pipeline.execute(context, async () => {
      return handler.handle(command);
    });
  }
}
