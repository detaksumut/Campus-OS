import { AdmissionPeriod } from '../entities/AdmissionPeriod';
import { AdmissionPeriodStatus } from '../types/AdmissionsEnums';

export class AdmissionGovernancePolicy {
  /**
   * Determines if a period can accept new applicants or applications.
   */
  static canAcceptApplications(period: AdmissionPeriod): boolean {
    return period.currentStatus === AdmissionPeriodStatus.OPEN && new Date() <= period.closingDate;
  }

  /**
   * Determines if evaluation can proceed.
   */
  static canEvaluate(period: AdmissionPeriod): boolean {
    return period.currentStatus === AdmissionPeriodStatus.EVALUATION || period.currentStatus === AdmissionPeriodStatus.OPEN;
  }
}

export class AdmissionCapacityPolicy {
  /**
   * Evaluates if we can issue an offer based on a hypothetical quota.
   * In a real implementation, this would track issued offers against a master quota list.
   */
  static canIssueOffer(programCode: string, currentOffersIssued: number, quota: number): boolean {
    return currentOffersIssued < quota;
  }
}
