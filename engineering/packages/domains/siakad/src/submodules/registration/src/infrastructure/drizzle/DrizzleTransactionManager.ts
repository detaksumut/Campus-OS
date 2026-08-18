import { ITransactionManager } from '../../application/ITransactionManager';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class DrizzleTransactionManager implements ITransactionManager {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async executeInTransaction<T>(callback: (transactionCtx: any) => Promise<T>): Promise<T> {
    return await this.db.transaction(async (tx) => {
      // Pass the Drizzle transaction context to the callback
      // Repositories should ideally receive this 'tx' to execute within the boundary.
      return await callback(tx);
    });
  }
}
