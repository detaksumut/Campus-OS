export class CancelRegistrationCommand {
  constructor(public readonly registrationId: string, public readonly reason: string) {}
}
