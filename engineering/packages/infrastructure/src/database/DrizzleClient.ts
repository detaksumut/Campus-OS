import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DatabaseConfig } from './DatabaseConfig';

export class DrizzleClient {
  private static instance: NodePgDatabase<any>;
  private static pool: Pool;

  static initialize(config: DatabaseConfig): NodePgDatabase<any> {
    if (!this.instance) {
      this.pool = new Pool({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        max: config.maxConnections || 10
      });
      this.instance = drizzle(this.pool);
    }
    return this.instance;
  }

  static getInstance(): NodePgDatabase<any> {
    if (!this.instance) {
      throw new Error('DrizzleClient not initialized. Call initialize() first.');
    }
    return this.instance;
  }

  static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
