export interface ExecutionContext {
  userId?: string;
  tenantId?: string;
  correlationId: string;
  timestamp: number;
}

export interface Middleware {
  handle(context: ExecutionContext, next: () => Promise<any>): Promise<any>;
}

export class Pipeline {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  async execute(context: ExecutionContext, target: () => Promise<any>): Promise<any> {
    let index = 0;
    const runner = async (): Promise<any> => {
      if (index < this.middlewares.length) {
        const mw = this.middlewares[index++];
        return mw.handle(context, runner);
      }
      return target();
    };
    return runner();
  }
}

export interface ICommand {}
export interface IQuery {}

export class CommandBus {
  private handlers = new Map<string, any>();
  
  registerHandler(commandName: string, handler: any) {
    this.handlers.set(commandName, handler);
  }
  
  async execute(command: ICommand, context: ExecutionContext): Promise<any> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) throw new Error(`Handler not found for command ${command.constructor.name}`);
    return handler.handle(command, context);
  }
}

export class QueryBus {
  private handlers = new Map<string, any>();
  
  registerHandler(queryName: string, handler: any) {
    this.handlers.set(queryName, handler);
  }
  
  async execute(query: IQuery, context: ExecutionContext): Promise<any> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) throw new Error(`Handler not found for query ${query.constructor.name}`);
    return handler.handle(query, context);
  }
}

export class Mediator {
  constructor(
    public commandBus: CommandBus,
    public queryBus: QueryBus
  ) {}
}
