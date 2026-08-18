export interface ITransactionManager {
  /**
   * Executes a callback within a database transaction boundary.
   * If the callback throws an error, the transaction is automatically rolled back.
   */
  executeInTransaction<T>(callback: (transactionCtx: any) => Promise<T>): Promise<T>;
}
