import { AccountId } from '../value-objects/AccountId';
import { IdentityId } from '../value-objects/IdentityId';
import { EmailAddress } from '../value-objects/EmailAddress';

export enum AccountStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export class Account {
  private lastLogin?: Date;

  constructor(
    private readonly accountId: AccountId,
    private readonly identityId: IdentityId,
    private email: EmailAddress,
    private passwordHash: string,
    private mfaEnabled: boolean = false,
    private status: AccountStatus = AccountStatus.PENDING_VERIFICATION
  ) {}

  get id(): AccountId { return this.accountId; }
  get ownerIdentityId(): IdentityId { return this.identityId; }
  get emailAddress(): EmailAddress { return this.email; }
  get currentStatus(): AccountStatus { return this.status; }
  
  verifyPassword(hashInput: string): boolean {
    return this.passwordHash === hashInput;
  }

  changePassword(newHash: string): void {
    if (!newHash) throw new Error('Password hash cannot be empty.');
    this.passwordHash = newHash;
  }

  activate(): void {
    if (this.status !== AccountStatus.PENDING_VERIFICATION) {
      throw new Error('Account is not pending verification.');
    }
    this.status = AccountStatus.ACTIVE;
  }

  suspend(): void {
    this.status = AccountStatus.SUSPENDED;
  }

  recordLogin(): void {
    this.lastLogin = new Date();
  }
}
