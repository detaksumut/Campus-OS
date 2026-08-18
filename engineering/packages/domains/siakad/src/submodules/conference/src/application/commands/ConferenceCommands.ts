export class CreateConferenceCommand {
  constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly reviewMode: string
  ) {}
}

export class SubmitPaperCommand {
  constructor(
    public readonly conferenceId: string,
    public readonly trackId: string,
    public readonly authorId: string,
    public readonly title: string,
    public readonly abstractText: string,
    public readonly researchProjectId: string | null = null
  ) {}
}

export class AssignReviewerCommand {
  constructor(
    public readonly conferenceId: string,
    public readonly memberId: string,
    public readonly role: string
  ) {}
}

export class RecordReviewDecisionCommand {
  constructor(
    public readonly conferenceId: string,
    public readonly paperId: string,
    public readonly reviewerId: string,
    public readonly decision: string,
    public readonly notes: string
  ) {}
}

export class SchedulePresentationSessionCommand {
  constructor(
    public readonly conferenceId: string,
    public readonly sessionTitle: string,
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly location: string,
    public readonly assignedPaperIds: string[]
  ) {}
}

export class CompleteConferenceCommand {
  constructor(
    public readonly conferenceId: string
  ) {}
}
