export interface IDatabaseExecutor {
  // Advanced generic operations to prevent ORM leakage
  select<T>(query: any): Promise<T[]>;
  insert<T>(table: string, data: Partial<T>): Promise<T>;
  update<T>(table: string, id: string, data: Partial<T>): Promise<T>;
  
  // Transaction support
  transaction<T>(callback: (txExecutor: IDatabaseExecutor) => Promise<T>): Promise<T>;
  
  // Batch support
  batchExecute(queries: any[]): Promise<any[]>;
  
  // Parameterized queries
  executeRaw(sql: string, params?: any[]): Promise<any>;
}
