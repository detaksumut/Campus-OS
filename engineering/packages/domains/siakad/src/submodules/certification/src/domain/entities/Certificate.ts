import { CertificateId, CandidateId, ProgramId } from '../value-objects/CertificationValueObjects';
import { CertificateStatus } from '../types/CertificationEnums';

export class Certificate {
  constructor(
    private readonly certificateId: CertificateId,
    private readonly programId: ProgramId,
    private readonly candidateId: CandidateId,
    private readonly issueDate: Date,
    private readonly expirationDate: Date | null,
    private status: CertificateStatus = CertificateStatus.ACTIVE,
    private readonly cryptographicHash: string
  ) {}

  get id(): CertificateId { return this.certificateId; }
  get program(): ProgramId { return this.programId; }
  get candidate(): CandidateId { return this.candidateId; }
  get currentStatus(): CertificateStatus { return this.status; }
  get hash(): string { return this.cryptographicHash; }

  revoke(): void {
    if (this.status === CertificateStatus.REVOKED) {
      throw new Error('Certificate is already revoked.');
    }
    this.status = CertificateStatus.REVOKED;
  }
}
