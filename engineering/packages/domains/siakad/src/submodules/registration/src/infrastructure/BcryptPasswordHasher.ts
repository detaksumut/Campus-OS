import { PasswordHashingPolicy } from '../domain/services/PasswordHashingPolicy';
import * as bcrypt from 'bcrypt'; // Assuming bcrypt is installed

export class BcryptPasswordHasher implements PasswordHashingPolicy {
  private readonly SALT_ROUNDS = 12;

  async hashPassword(plainText: string): Promise<string> {
    if (!plainText) throw new Error('Password cannot be empty');
    return await bcrypt.hash(plainText, this.SALT_ROUNDS);
  }

  async verifyPassword(plainText: string, hash: string): Promise<boolean> {
    if (!plainText || !hash) return false;
    return await bcrypt.compare(plainText, hash);
  }
}
