export class InitiateRegistrationCommand {
  constructor(
    public readonly email: string,
    public readonly fullName: string,
    public readonly dateOfBirth: Date,
    public readonly gender: string,
    public readonly nationality: string,
    public readonly passwordPlaintext: string
  ) {}
}
