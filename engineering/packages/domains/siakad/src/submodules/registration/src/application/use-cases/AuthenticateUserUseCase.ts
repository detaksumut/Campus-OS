import { AuthenticateUserCommand } from '../commands/AuthenticateUserCommand';
import { IRegistrationRepository } from '../ports/IRegistrationRepository';
import { IEventPublisher } from '../ports/IEventPublisher';
import { PasswordHashingPolicy } from '../../domain/services/PasswordHashingPolicy';
import { EmailAddress } from '../../domain/value-objects/EmailAddress';
import { AccountStatus } from '../../domain/entities/Account';
import { AuthenticationSucceededEvent } from '../../domain/events/AuthenticationSucceededEvent';

export interface AuthenticationResult {
  token: string;
  refreshToken: string;
  accountId: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private readonly repository: IRegistrationRepository,
    private readonly eventPublisher: IEventPublisher,
    private readonly passwordPolicy: PasswordHashingPolicy,
    private readonly tokenGenerator: (accountId: string) => { token: string, refreshToken: string } // Mocked Port
  ) {}

  async execute(command: AuthenticateUserCommand): Promise<AuthenticationResult> {
    const emailObj = new EmailAddress(command.email);
    
    // 1. Fetch Account
    const account = await this.repository.findAccountByEmail(emailObj);
    if (!account) {
      throw new Error('Invalid credentials.');
    }

    // 2. Enforce Business Rules on State
    if (account.currentStatus !== AccountStatus.ACTIVE) {
      throw new Error(`Account cannot login. Current status: ${account.currentStatus}`);
    }

    // 3. Verify Password via Domain Policy
    // Since Account holds a hash, we use the policy to verify against plain text.
    // In our pure domain we had account.verifyPassword(hashInput), so the policy computes the hash to match.
    // Or we use bcrypt.compare natively via the Policy.
    const isPasswordValid = await this.passwordPolicy.verifyPassword(command.passwordPlaintext, account['passwordHash']);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials.');
    }

    // 4. Update Domain State
    account.recordLogin();
    await this.repository.saveAccount(account);

    // 5. Generate Auth Tokens (JWT)
    const tokens = this.tokenGenerator(account.id.getValue());

    // 6. Publish Event
    await this.eventPublisher.publish(
      new AuthenticationSucceededEvent(account.id.getValue(), command.ipAddress)
    );

    return {
      token: tokens.token,
      refreshToken: tokens.refreshToken,
      accountId: account.id.getValue()
    };
  }
}
