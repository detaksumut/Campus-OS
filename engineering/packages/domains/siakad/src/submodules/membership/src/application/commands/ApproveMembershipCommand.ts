export class ApproveMembershipCommand {
  constructor(
    public readonly memberId: string,
    public readonly approvedByAdminId: string
  ) {}
}
