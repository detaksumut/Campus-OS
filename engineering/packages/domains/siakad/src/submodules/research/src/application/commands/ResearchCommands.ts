export class CreateResearchProjectCommand {
  constructor(
    public readonly principalInvestigatorId: string,
    public readonly proposalTitle: string,
    public readonly proposalAbstract: string,
    public readonly proposalMethodology: string
  ) {}
}

export class SubmitProposalCommand {
  constructor(
    public readonly projectId: string
  ) {}
}

export class ApproveProposalCommand {
  constructor(
    public readonly projectId: string
  ) {}
}

export class AssignResearchMemberCommand {
  constructor(
    public readonly projectId: string,
    public readonly memberId: string,
    public readonly role: string
  ) {}
}

export class RecordMilestoneCommand {
  constructor(
    public readonly projectId: string,
    public readonly milestoneTitle: string,
    public readonly description: string,
    public readonly targetDate: Date,
    public readonly dependentMilestoneId: string | null = null
  ) {}
}

export class RegisterResearchOutputCommand {
  constructor(
    public readonly projectId: string,
    public readonly outputType: string,
    public readonly title: string,
    public readonly description: string,
    public readonly publicationSubmissionId: string | null = null
  ) {}
}

export class CompleteResearchProjectCommand {
  constructor(
    public readonly projectId: string
  ) {}
}
