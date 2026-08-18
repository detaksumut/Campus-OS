import { ConfirmEnrollmentCommand } from '../commands/AdmissionsCommands';
import { IAdmissionsRepository } from '../ports/IAdmissionsRepository';
import { IAdmissionsEventPublisher } from '../ports/IAdmissionsEventPublisher';
import { PeriodId } from '../../domain/value-objects/AdmissionsValueObjects';
import { EnrollmentAcceptedEvent } from '../../domain/events/AdmissionsEvents';

export class ConfirmEnrollmentUseCase {
  constructor(
    private readonly repository: IAdmissionsRepository,
    private readonly eventPublisher: IAdmissionsEventPublisher
  ) {}

  async execute(command: ConfirmEnrollmentCommand): Promise<void> {
    const period = await this.repository.findPeriodById(new PeriodId(command.periodId));
    if (!period) throw new Error('Admission period not found.');

    const appIdx = period.allApplications.findIndex(a => a.id.getValue() === command.applicationId);
    if (appIdx === -1) throw new Error('Application not found.');
    const app = period.allApplications[appIdx];

    const offer = app.currentOffer;
    if (!offer || offer.id.getValue() !== command.offerId) {
      throw new Error('Offer not found or mismatch.');
    }

    // Accept the offer
    offer.accept();
    await this.repository.savePeriod(period);

    // Grab applicant details to send off to Registration
    const applicant = period.allApplicants.find(a => a.id.getValue() === app.applicant.getValue());
    if (!applicant) throw new Error('Applicant data missing.');

    // CRITICAL: Fire the event that bridges Admissions to Registration
    await this.eventPublisher.publish(
      new EnrollmentAcceptedEvent(
        offer.id.getValue(),
        applicant.id.getValue(),
        offer.targetProgram,
        period.targetAcademicYear,
        applicant.contactEmail,
        applicant.fullName
      )
    );
  }
}
