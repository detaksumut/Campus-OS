export class AuthenticateUserCommand {
  constructor(
    public readonly email: string,
    public readonly passwordPlaintext: string,
    public readonly ipAddress: string
  ) {}
}
