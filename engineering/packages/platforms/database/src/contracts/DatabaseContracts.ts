export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface ITransactionManager {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}

export interface IUnitOfWork {
  execute<T>(work: () => Promise<T>): Promise<T>;
}

export interface IQueryExecutor {
  query<T>(statement: string, parameters?: any[]): Promise<T[]>;
  queryOne<T>(statement: string, parameters?: any[]): Promise<T | null>;
}

export interface IDatabaseExecutor extends IQueryExecutor {
  insert<T>(table: string, data: any): Promise<T>;
  update<T>(table: string, id: string, data: any): Promise<T>;
  delete(table: string, id: string): Promise<boolean>;
  batchInsert<T>(table: string, data: any[]): Promise<T[]>;
}

export interface DatabasePlatform extends IDatabaseConnection, ITransactionManager, IDatabaseExecutor, IUnitOfWork {}
