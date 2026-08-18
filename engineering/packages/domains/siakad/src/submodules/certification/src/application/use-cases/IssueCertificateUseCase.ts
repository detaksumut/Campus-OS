import { IssueCertificateCommand } from '../commands/CertificationCommands';
import { ICertificationRepository } from '../ports/ICertificationRepository';
import { ICertificationEventPublisher } from '../ports/ICertificationEventPublisher';
import { ApplicationId, CertificateId } from '../../domain/value-objects/CertificationValueObjects';
import { Certificate } from '../../domain/entities/Certificate';
import { CertificateStatus } from '../../domain/types/CertificationEnums';
import { CertificateIssuedEvent } from '../../domain/events/CertificationEvents';
import * as crypto from 'crypto';

export class IssueCertificateUseCase {
  constructor(
    private readonly repository: ICertificationRepository,
    private readonly eventPublisher: ICertificationEventPublisher
  ) {}

  async execute(command: IssueCertificateCommand): Promise<void> {
    const application = await this.repository.findApplicationById(new ApplicationId(command.applicationId));
    if (!application) throw new Error('Application not found.');

    // Advance aggregate to APPROVED state first based on criteria (simulated manual approval)
    if (application.currentStatus === 'INTERVIEW_COMPLETED' || application.currentStatus === 'EXAM_COMPLETED') {
      application.approve();
    }

    const certificateId = new CertificateId(`CERT-${Date.now()}`);
    const hash = crypto.createHash('sha256')
      .update(`${certificateId.getValue()}-${application.candidate.getValue()}-${application.program.getValue()}`)
      .digest('hex');

    // 1 Year Expiration
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const certificate = new Certificate(
      certificateId,
      application.program,
      application.candidate,
      new Date(),
      expirationDate,
      CertificateStatus.ACTIVE,
      hash
    );

    application.issueCertificate(certificateId);

    // Persist Aggregate and the new Certificate entity independently
    await this.repository.saveApplication(application);
    await this.repository.saveCertificate(certificate);

    await this.eventPublisher.publish(
      new CertificateIssuedEvent(application.id.getValue(), certificateId.getValue(), application.candidate.getValue())
    );
  }
}
