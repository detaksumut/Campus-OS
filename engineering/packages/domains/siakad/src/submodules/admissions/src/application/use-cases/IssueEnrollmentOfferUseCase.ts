import { IssueEnrollmentOfferCommand } from '../commands/AdmissionsCommands';
import { IAdmissionsRepository } from '../ports/IAdmissionsRepository';
import { IAdmissionsEventPublisher } from '../ports/IAdmissionsEventPublisher';
import { PeriodId, OfferId } from '../../domain/value-objects/AdmissionsValueObjects';
import { EnrollmentOffer } from '../../domain/entities/EnrollmentOffer';
import { AdmissionDecision } from '../../domain/types/AdmissionsEnums';
import { EnrollmentOfferedEvent } from '../../domain/events/AdmissionsEvents';

export class IssueEnrollmentOfferUseCase {
  constructor(
    private readonly repository: IAdmissionsRepository,
    private readonly eventPublisher: IAdmissionsEventPublisher
  ) {}

  async execute(command: IssueEnrollmentOfferCommand): Promise<void> {
    const period = await this.repository.findPeriodById(new PeriodId(command.periodId));
    if (!period) throw new Error('Admission period not found.');

    const appIdx = period.allApplications.findIndex(a => a.id.getValue() === command.applicationId);
    if (appIdx === -1) throw new Error('Application not found.');

    const app = period.allApplications[appIdx];
    
    // Assume someone externally updated the decision to PASSED
    if (app.currentDecision !== AdmissionDecision.PASSED) {
      throw new Error('Application decision must be PASSED before issuing an offer.');
    }

    const offerId = new OfferId(`OFFER-${Date.now()}`);
    const offer = new EnrollmentOffer(offerId, command.programCode, command.validUntil);

    app.issueOffer(offer);

    await this.repository.savePeriod(period);

    await this.eventPublisher.publish(
      new EnrollmentOfferedEvent(
        offerId.getValue(),
        command.applicationId,
        command.programCode,
        command.validUntil
      )
    );
  }
}
