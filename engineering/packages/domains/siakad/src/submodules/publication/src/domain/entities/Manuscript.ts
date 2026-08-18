export class Manuscript {
  constructor(
    private readonly title: string,
    private readonly abstractText: string,
    private readonly fileUrl: string,
    private readonly checksum: string,
    private readonly version: number,
    private readonly submittedAt: Date = new Date()
  ) {
    if (!title) throw new Error('Manuscript title is required.');
    if (!fileUrl) throw new Error('Manuscript file URL is required.');
  }

  get currentTitle(): string { return this.title; }
  get currentAbstract(): string { return this.abstractText; }
  get currentFileUrl(): string { return this.fileUrl; }
  get currentChecksum(): string { return this.checksum; }
  get currentVersion(): number { return this.version; }
}
