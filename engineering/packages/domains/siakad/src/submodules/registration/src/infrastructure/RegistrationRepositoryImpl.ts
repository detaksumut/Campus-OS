import { IRegistrationRepository } from '../application/ports/IRegistrationRepository';
import { Account, AccountStatus } from '../domain/entities/Account';
import { UserIdentity } from '../domain/entities/UserIdentity';
import { AccountId } from '../domain/value-objects/AccountId';
import { IdentityId } from '../domain/value-objects/IdentityId';
import { EmailAddress } from '../domain/value-objects/EmailAddress';

// Assuming IDatabaseExecutor is imported from Platform
export interface IDatabaseExecutor {
  query(sql: string, params?: any[]): Promise<any[]>;
  execute(sql: string, params?: any[]): Promise<void>;
}

export class RegistrationRepositoryImpl implements IRegistrationRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveAccount(account: Account): Promise<void> {
    const sql = `
      INSERT INTO identity.accounts (account_id, identity_id, email, password_hash, mfa_enabled, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (account_id) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        status = EXCLUDED.status,
        mfa_enabled = EXCLUDED.mfa_enabled,
        last_login = identity.accounts.last_login;
    `;
    await this.db.execute(sql, [
      account.id.getValue(),
      account.ownerIdentityId.getValue(),
      account.emailAddress.getValue(),
      account['passwordHash'], // Internal state mapped
      account['mfaEnabled'],
      account.currentStatus
    ]);
  }

  async saveIdentity(identity: UserIdentity): Promise<void> {
    const sql = `
      INSERT INTO identity.users (identity_id, full_name, date_of_birth, gender, nationality)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (identity_id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        gender = EXCLUDED.gender,
        nationality = EXCLUDED.nationality;
    `;
    await this.db.execute(sql, [
      identity.id.getValue(),
      identity.name,
      identity['dateOfBirth'],
      identity['gender'],
      identity['nationality']
    ]);
  }

  async findAccountByEmail(email: EmailAddress): Promise<Account | null> {
    const sql = `SELECT * FROM identity.accounts WHERE email = $1`;
    const rows = await this.db.query(sql, [email.getValue()]);
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new Account(
      new AccountId(row.account_id),
      new IdentityId(row.identity_id),
      new EmailAddress(row.email),
      row.password_hash,
      row.mfa_enabled,
      row.status as AccountStatus
    );
  }

  async findAccountById(accountId: AccountId): Promise<Account | null> {
    const sql = `SELECT * FROM identity.accounts WHERE account_id = $1`;
    const rows = await this.db.query(sql, [accountId.getValue()]);
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new Account(
      new AccountId(row.account_id),
      new IdentityId(row.identity_id),
      new EmailAddress(row.email),
      row.password_hash,
      row.mfa_enabled,
      row.status as AccountStatus
    );
  }

  async findIdentityById(identityId: IdentityId): Promise<UserIdentity | null> {
    const sql = `SELECT * FROM identity.users WHERE identity_id = $1`;
    const rows = await this.db.query(sql, [identityId.getValue()]);
    if (rows.length === 0) return null;

    const row = rows[0];
    return new UserIdentity(
      new IdentityId(row.identity_id),
      row.full_name,
      new Date(row.date_of_birth),
      row.gender,
      row.nationality
    );
  }
}
