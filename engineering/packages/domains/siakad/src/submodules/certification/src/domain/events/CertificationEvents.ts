export class ApplicationSubmittedEvent {
  constructor(
    public readonly applicationId: string,
    public readonly candidateId: string,
    public readonly programId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class ExamScheduledEvent {
  constructor(
    public readonly applicationId: string,
    public readonly examId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class ExamCompletedEvent {
  constructor(
    public readonly applicationId: string,
    public readonly examId: string,
    public readonly score: number,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class InterviewScheduledEvent {
  constructor(
    public readonly applicationId: string,
    public readonly interviewId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class InterviewCompletedEvent {
  constructor(
    public readonly applicationId: string,
    public readonly interviewId: string,
    public readonly score: number,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class CertificateIssuedEvent {
  constructor(
    public readonly applicationId: string,
    public readonly certificateId: string,
    public readonly candidateId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}
