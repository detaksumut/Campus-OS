export class SubmissionId {
  constructor(private readonly id: string) {
    if (!id || id.trim() === '') throw new Error('Submission ID cannot be empty.');
    this.id = id.trim();
  }
  getValue(): string { return this.id; }
}

export class ReviewAssignmentId {
  constructor(private readonly id: string) {
    if (!id || id.trim() === '') throw new Error('Review Assignment ID cannot be empty.');
    this.id = id.trim();
  }
  getValue(): string { return this.id; }
}

export class AuthorId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ReviewerId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class EditorId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}
