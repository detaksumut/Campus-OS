import { OutputId, PublicationReference } from '../value-objects/ResearchValueObjects';
import { OutputType } from '../types/ResearchEnums';

export class ResearchOutput {
  constructor(
    private readonly outputId: OutputId,
    private readonly outputType: OutputType,
    private readonly title: string,
    private readonly description: string,
    private publicationRef: PublicationReference | null = null,
    private isVerified: boolean = false
  ) {}

  get id(): OutputId { return this.outputId; }
  get type(): OutputType { return this.outputType; }
  get currentTitle(): string { return this.title; }
  get currentDescription(): string { return this.description; }
  get publicationReference(): PublicationReference | null { return this.publicationRef; }
  get verified(): boolean { return this.isVerified; }

  linkPublication(reference: PublicationReference): void {
    if (this.outputType !== OutputType.JOURNAL && this.outputType !== OutputType.CONFERENCE) {
      throw new Error('Only Journal and Conference outputs can be linked to publications.');
    }
    this.publicationRef = reference;
  }

  markAsVerified(): void {
    if (this.isVerified) throw new Error('Output is already verified.');
    this.isVerified = true;
  }
}
