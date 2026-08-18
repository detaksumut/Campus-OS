import { EmailAddress } from '../value-objects/EmailAddress';

export interface UniqueEmailVerificationPolicy {
  isEmailUnique(email: EmailAddress): Promise<boolean>;
}
