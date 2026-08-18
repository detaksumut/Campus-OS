export class SubmitManuscriptCommand {
  constructor(
    public readonly authorId: string,
    public readonly title: string,
    public readonly abstractText: string,
    public readonly fileUrl: string,
    public readonly checksum: string
  ) {}
}

export class AssignReviewerCommand {
  constructor(
    public readonly submissionId: string,
    public readonly reviewerId: string,
    public readonly deadline: Date
  ) {}
}

export class SubmitReviewCommand {
  constructor(
    public readonly submissionId: string,
    public readonly reviewerId: string,
    public readonly decision: string,
    public readonly commentsToAuthor: string,
    public readonly commentsToEditor: string
  ) {}
}

export class MakeEditorialDecisionCommand {
  constructor(
    public readonly submissionId: string,
    public readonly editorId: string,
    public readonly decision: string,
    public readonly justification: string
  ) {}
}

export class PublishArticleCommand {
  constructor(
    public readonly submissionId: string,
    public readonly editorId: string
  ) {}
}
