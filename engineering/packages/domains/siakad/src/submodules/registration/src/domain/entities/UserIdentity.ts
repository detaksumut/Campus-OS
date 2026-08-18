import { IdentityId } from '../value-objects/IdentityId';

export class UserIdentity {
  constructor(
    private readonly identityId: IdentityId,
    private fullName: string,
    private dateOfBirth: Date,
    private gender: string,
    private nationality: string
  ) {}

  get id(): IdentityId {
    return this.identityId;
  }

  get name(): string {
    return this.fullName;
  }

  // Domain logic
  updateProfile(fullName: string, gender: string, nationality: string): void {
    if (!fullName || fullName.trim() === '') {
      throw new Error('Full name cannot be empty.');
    }
    this.fullName = fullName;
    this.gender = gender;
    this.nationality = nationality;
  }

  isAdult(): boolean {
    const ageDifMs = Date.now() - this.dateOfBirth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 17;
  }
}
