export class ApplyForCertificationCommand {
  constructor(
    public readonly candidateId: string,
    public readonly programId: string
  ) {}
}

export class ScheduleExamCommand {
  constructor(
    public readonly applicationId: string,
    public readonly scheduledStart: Date,
    public readonly timeLimitMinutes: number
  ) {}
}

export class SubmitExamCommand {
  constructor(
    public readonly applicationId: string,
    public readonly examId: string,
    public readonly score: number
  ) {}
}

export class ScheduleInterviewCommand {
  constructor(
    public readonly applicationId: string,
    public readonly scheduledTime: Date,
    public readonly assessorIds: string[]
  ) {}
}

export class RecordInterviewResultCommand {
  constructor(
    public readonly applicationId: string,
    public readonly interviewId: string,
    public readonly assessorId: string,
    public readonly score: number,
    public readonly resultNotes: string
  ) {}
}

export class IssueCertificateCommand {
  constructor(
    public readonly applicationId: string
  ) {}
}
