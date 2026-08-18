import { GetAccountProfileQuery, AccountProfileDto } from '../queries/GetAccountProfileQuery';
import { IRegistrationRepository } from '../ports/IRegistrationRepository';
import { AccountId } from '../../domain/value-objects/AccountId';

export class GetAccountProfileUseCase {
  constructor(
    private readonly repository: IRegistrationRepository
  ) {}

  async execute(query: GetAccountProfileQuery): Promise<AccountProfileDto> {
    const accId = new AccountId(query.accountId);
    
    // 1. Fetch Account
    const account = await this.repository.findAccountById(accId);
    if (!account) {
      throw new Error(`Account not found: ${query.accountId}`);
    }

    // 2. Fetch Identity
    const identity = await this.repository.findIdentityById(account.ownerIdentityId);
    if (!identity) {
      throw new Error(`Identity corrupted for account: ${query.accountId}`);
    }

    // 3. Map to DTO (Prevent leaking entities to UI)
    return {
      accountId: account.id.getValue(),
      identityId: identity.id.getValue(),
      email: account.emailAddress.getValue(),
      fullName: identity.name,
      status: account.currentStatus,
      mfaEnabled: account['mfaEnabled']
    };
  }
}
