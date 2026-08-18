import { IDatabaseExecutor } from './IDatabaseExecutor';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class DrizzleExecutor implements IDatabaseExecutor {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async select<T>(query: any): Promise<T[]> {
    // Adapter logic hiding Drizzle specifics
    return [];
  }

  async insert<T>(table: string, data: Partial<T>): Promise<T> {
    // Drizzle insert logic mapping
    return data as T;
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<T> {
    return data as T;
  }

  async transaction<T>(callback: (txExecutor: IDatabaseExecutor) => Promise<T>): Promise<T> {
    return await this.db.transaction(async (tx) => {
      const txExecutor = new DrizzleExecutor(tx);
      return await callback(txExecutor);
    });
  }

  async batchExecute(queries: any[]): Promise<any[]> {
    return [];
  }

  async executeRaw(sql: string, params?: any[]): Promise<any> {
    return await this.db.execute(sql, params);
  }
}
