export class CreateAwardProgramCommand {
  constructor(
    public readonly name: string,
    public readonly category: string,
    public readonly cycle: string,
    public readonly allowSelfNomination: boolean
  ) {}
}

export class SubmitNominationCommand {
  constructor(
    public readonly awardId: string,
    public readonly nominatorId: string,
    public readonly nomineeId: string,
    public readonly evidence: Array<{ evidenceType: string; referenceId: string; sourceContext: string }>
  ) {}
}

export class AssignEvaluatorCommand {
  constructor(
    public readonly awardId: string,
    public readonly evaluatorId: string,
    public readonly role: string
  ) {}
}

export class RecordEvaluationCommand {
  constructor(
    public readonly awardId: string,
    public readonly nominationId: string,
    public readonly evaluatorId: string,
    public readonly weightedScore: number,
    public readonly comments: string,
    public readonly recommendation: string
  ) {}
}

export class FinalizeAwardCommand {
  constructor(
    public readonly awardId: string,
    public readonly nominationId: string,
    public readonly decision: string,
    public readonly summaryRemarks: string
  ) {}
}

export class PublishAwardResultsCommand {
  constructor(
    public readonly awardId: string
  ) {}
}
