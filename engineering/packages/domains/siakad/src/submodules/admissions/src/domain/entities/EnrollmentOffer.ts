import { OfferId } from '../value-objects/AdmissionsValueObjects';
import { OfferStatus } from '../types/AdmissionsEnums';

export class EnrollmentOffer {
  constructor(
    private readonly offerId: OfferId,
    private readonly programCode: string, // The final program they got accepted into
    private readonly validUntil: Date,
    private status: OfferStatus = OfferStatus.PENDING,
    private readonly issuedAt: Date = new Date()
  ) {}

  get id(): OfferId { return this.offerId; }
  get targetProgram(): string { return this.programCode; }
  get expirationDate(): Date { return this.validUntil; }
  get currentStatus(): OfferStatus { return this.status; }
  get dateIssued(): Date { return this.issuedAt; }

  accept(): void {
    if (this.status !== OfferStatus.PENDING) throw new Error('Offer is not pending.');
    if (new Date() > this.validUntil) throw new Error('Offer has expired.');
    this.status = OfferStatus.ACCEPTED;
  }

  decline(): void {
    if (this.status !== OfferStatus.PENDING) throw new Error('Offer is not pending.');
    this.status = OfferStatus.DECLINED;
  }

  expire(): void {
    if (this.status === OfferStatus.PENDING && new Date() > this.validUntil) {
      this.status = OfferStatus.EXPIRED;
    }
  }
}
