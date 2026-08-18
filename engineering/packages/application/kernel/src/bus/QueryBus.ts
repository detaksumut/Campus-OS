export enum QueryType {
  PROJECTION = 'PROJECTION',
  METADATA = 'METADATA'
}

export interface IQuery {
  queryId: string;
  type: QueryType;
  payload: any;
}

export interface IQueryHandler<TQuery extends IQuery, TResult> {
  handle(query: TQuery): Promise<TResult>;
}

export class QueryBus {
  private handlers = new Map<string, IQueryHandler<any, any>>();

  public registerHandler(queryId: string, handler: IQueryHandler<any, any>): void {
    if (this.handlers.has(queryId)) {
      throw new Error(`QueryHandler for ${queryId} already registered.`);
    }
    this.handlers.set(queryId, handler);
  }

  public async execute<TResult>(query: IQuery): Promise<TResult> {
    const handler = this.handlers.get(query.queryId);
    if (!handler) {
      throw new Error(`No handler registered for query: ${query.queryId}`);
    }
    return handler.handle(query);
  }
}
