export interface PasswordHashingPolicy {
  hashPassword(plainText: string): Promise<string>;
  verifyPassword(plainText: string, hash: string): Promise<boolean>;
}
