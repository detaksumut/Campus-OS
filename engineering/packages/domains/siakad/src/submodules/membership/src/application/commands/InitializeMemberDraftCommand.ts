export class InitializeMemberDraftCommand {
  constructor(
    public readonly identityId: string, // Link to Registration module identity
    public readonly email: string // Sometimes useful for correlation
  ) {}
}
