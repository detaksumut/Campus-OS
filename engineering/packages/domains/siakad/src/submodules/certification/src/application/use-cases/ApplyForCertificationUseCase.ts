import { ApplyForCertificationCommand } from '../commands/CertificationCommands';
import { ICertificationRepository } from '../ports/ICertificationRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { ICertificationEventPublisher } from '../ports/ICertificationEventPublisher';
import { CertificationApplication } from '../../domain/entities/CertificationApplication';
import { ApplicationId, CandidateId, ProgramId } from '../../domain/value-objects/CertificationValueObjects';
import { ApplicationSubmittedEvent } from '../../domain/events/CertificationEvents';

export class ApplyForCertificationUseCase {
  constructor(
    private readonly repository: ICertificationRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: ICertificationEventPublisher
  ) {}

  async execute(command: ApplyForCertificationCommand): Promise<void> {
    const isEligible = await this.membershipValidation.canApplyForCertification(command.candidateId, command.programId);
    if (!isEligible) {
      throw new Error(`Member ${command.candidateId} is not eligible for program ${command.programId}`);
    }

    const applicationId = new ApplicationId(`APP-${Date.now()}`);
    const application = new CertificationApplication(
      applicationId,
      new ProgramId(command.programId),
      new CandidateId(command.candidateId)
    );

    application.submit();

    await this.repository.saveApplication(application);

    await this.eventPublisher.publish(
      new ApplicationSubmittedEvent(
        application.id.getValue(),
        command.candidateId,
        command.programId
      )
    );
  }
}
