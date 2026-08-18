import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class TransactionManager {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async executeInTransaction<T>(callback: (transactionCtx: any) => Promise<T>): Promise<T> {
    return await this.db.transaction(async (tx) => {
      return await callback(tx);
    });
  }
}
