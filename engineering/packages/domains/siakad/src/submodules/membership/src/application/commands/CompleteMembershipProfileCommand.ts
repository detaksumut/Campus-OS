export class CompleteMembershipProfileCommand {
  constructor(
    public readonly memberId: string,
    public readonly academicLevel: string,
    public readonly affiliation: string,
    public readonly department: string,
    public readonly enrollmentYear: number
  ) {}
}
