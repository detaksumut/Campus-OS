import { InitiateRegistrationCommand } from '../commands/InitiateRegistrationCommand';
import { IRegistrationRepository } from '../ports/IRegistrationRepository';
import { IEventPublisher } from '../ports/IEventPublisher';
import { PasswordHashingPolicy } from '../../domain/services/PasswordHashingPolicy';
import { UniqueEmailVerificationPolicy } from '../../domain/services/UniqueEmailVerificationPolicy';
import { UserIdentity } from '../../domain/entities/UserIdentity';
import { Account, AccountStatus } from '../../domain/entities/Account';
import { EmailAddress } from '../../domain/value-objects/EmailAddress';
import { IdentityId } from '../../domain/value-objects/IdentityId';
import { AccountId } from '../../domain/value-objects/AccountId';
import { AccountRegisteredEvent } from '../../domain/events/AccountRegisteredEvent';

export class InitiateRegistrationUseCase {
  constructor(
    private readonly repository: IRegistrationRepository,
    private readonly eventPublisher: IEventPublisher,
    private readonly passwordPolicy: PasswordHashingPolicy,
    private readonly uniqueEmailPolicy: UniqueEmailVerificationPolicy
  ) {}

  async execute(command: InitiateRegistrationCommand): Promise<void> {
    const emailObj = new EmailAddress(command.email);

    // 1. Enforce Domain Policy
    const isUnique = await this.uniqueEmailPolicy.isEmailUnique(emailObj);
    if (!isUnique) {
      throw new Error(`Email ${command.email} is already registered.`);
    }

    // 2. Generate Identifiers (typically injected via a generator service, mocked here)
    const newIdentityId = new IdentityId(`ID-${Date.now()}`);
    const newAccountId = new AccountId(`ACC-${Date.now()}`);

    // 3. Construct Domain Entities
    const identity = new UserIdentity(
      newIdentityId,
      command.fullName,
      command.dateOfBirth,
      command.gender,
      command.nationality
    );

    if (!identity.isAdult()) {
      throw new Error('Registrant must be legally an adult (17+).');
    }

    const hashedPassword = await this.passwordPolicy.hashPassword(command.passwordPlaintext);

    const account = new Account(
      newAccountId,
      newIdentityId,
      emailObj,
      hashedPassword,
      false,
      AccountStatus.PENDING_VERIFICATION
    );

    // 4. Persist (Orchestrate DB calls via Port)
    await this.repository.saveIdentity(identity);
    await this.repository.saveAccount(account);

    // 5. Dispatch Domain Event
    const event = new AccountRegisteredEvent(
      account.id.getValue(),
      identity.id.getValue(),
      emailObj.getValue()
    );
    await this.eventPublisher.publish(event);
  }
}
