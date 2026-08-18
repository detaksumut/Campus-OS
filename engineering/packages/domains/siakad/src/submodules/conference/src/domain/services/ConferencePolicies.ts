import { ConferenceEvent } from '../entities/ConferenceEvent';
import { ConferenceStatus, ReviewMode } from '../types/ConferenceEnums';

export class ConferenceGovernancePolicy {
  /**
   * Validates if a conference can transition to SCHEDULED.
   * Requires the conference to be in REVIEW_PHASE and at least one session to be created.
   */
  static canScheduleConference(conference: ConferenceEvent): boolean {
    if (conference.currentStatus !== ConferenceStatus.REVIEW_PHASE) return false;
    return conference.allSessions.length > 0;
  }

  /**
   * Validates if a conference can be closed (COMPLETED).
   * Ensures that the conference is ONGOING and all sessions are logically finished.
   */
  static canCompleteConference(conference: ConferenceEvent): boolean {
    if (conference.currentStatus !== ConferenceStatus.ONGOING) return false;
    
    const now = new Date();
    // Ensure all sessions' end times have passed
    return conference.allSessions.every(session => session.scheduleEnd < now);
  }
}

export class ConferenceBlindReviewPolicy {
  /**
   * Enforces the review mode visibility.
   * Returns a redacted author string if the mode prohibits revealing the author.
   */
  static getAuthorVisibility(conference: ConferenceEvent, authorId: string, requesterRole: string): string {
    if (requesterRole === 'CHAIR' || requesterRole === 'TRACK_DIRECTOR') {
      return authorId; // Chairs and Directors see everything
    }

    if (requesterRole === 'REVIEWER') {
      switch (conference.currentReviewMode) {
        case ReviewMode.DOUBLE_BLIND:
          return '[REDACTED]';
        case ReviewMode.SINGLE_BLIND:
          return authorId; // In single blind, reviewer sees author, author doesn't see reviewer
        case ReviewMode.OPEN_REVIEW:
          return authorId;
      }
    }

    return '[REDACTED]';
  }
}
