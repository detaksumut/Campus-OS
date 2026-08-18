import { IDatabaseExecutor } from '../../../../../../../platforms/database/src/contracts/DatabaseContracts';

export class RegistrationRepository {
  // ORM-Agnostic: We only know about IDatabaseExecutor.
  // We do NOT import Drizzle, Prisma, or TypeORM here.
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveRegistration(registrationAggregate: any): Promise<void> {
    console.log(`[Repository] Persisting registration using ORM-Agnostic Executor`);
    
    // The query string here could be SQL or an abstraction object.
    // Assuming the executor handles raw SQL or a query builder abstraction.
    await this.db.insert('semester_registrations', {
      id: registrationAggregate.id,
      student_id: registrationAggregate.studentId,
      status: registrationAggregate.status
    });
  }

  async findById(id: string): Promise<any> {
    return await this.db.queryOne('SELECT * FROM semester_registrations WHERE id = ?', [id]);
  }
}
