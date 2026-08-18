import { Account } from '../../domain/entities/Account';
import { UserIdentity } from '../../domain/entities/UserIdentity';
import { AccountId } from '../../domain/value-objects/AccountId';
import { IdentityId } from '../../domain/value-objects/IdentityId';
import { EmailAddress } from '../../domain/value-objects/EmailAddress';

export interface IRegistrationRepository {
  saveAccount(account: Account): Promise<void>;
  saveIdentity(identity: UserIdentity): Promise<void>;
  findAccountByEmail(email: EmailAddress): Promise<Account | null>;
  findAccountById(accountId: AccountId): Promise<Account | null>;
  findIdentityById(identityId: IdentityId): Promise<UserIdentity | null>;
}
