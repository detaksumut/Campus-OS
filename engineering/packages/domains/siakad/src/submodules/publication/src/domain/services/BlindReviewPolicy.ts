import { Submission } from '../entities/Submission';
import { AuthorId, ReviewerId, EditorId } from '../value-objects/PublicationValueObjects';

export interface MaskedSubmissionView {
  submissionId: string;
  title: string;
  abstract: string;
  status: string;
}

export interface MaskedReviewView {
  decision: string;
  comments: string; // Only the comments intended for the specific viewer
}

export class BlindReviewPolicy {
  /**
   * Generates a view of the submission safe for the reviewer to see.
   * Strips out author identity and any metadata that could reveal it.
   */
  static getReviewerView(submission: Submission, reviewer: ReviewerId): MaskedSubmissionView {
    // 1. Check if reviewer is actually assigned
    const isAssigned = submission.allAssignments.some(a => a.reviewer.getValue() === reviewer.getValue());
    if (!isAssigned) {
      throw new Error('Access Denied: Reviewer is not assigned to this submission.');
    }

    const manuscript = submission.latestManuscript;
    if (!manuscript) throw new Error('No manuscript found.');

    return {
      submissionId: submission.id.getValue(),
      title: manuscript.currentTitle,
      abstract: manuscript.currentAbstract,
      status: submission.currentStatus
      // AuthorId is explicitly omitted.
    };
  }

  /**
   * Generates a view of the reviews safe for the author to see.
   * Strips out reviewer identity and comments meant only for the editor.
   */
  static getAuthorView(submission: Submission, author: AuthorId): MaskedReviewView[] {
    if (submission.author.getValue() !== author.getValue()) {
      throw new Error('Access Denied: You are not the author of this submission.');
    }

    const maskedReviews: MaskedReviewView[] = [];
    
    for (const assignment of submission.allAssignments) {
      if (assignment.submittedReview) {
        maskedReviews.push({
          decision: assignment.submittedReview.currentDecision,
          comments: assignment.submittedReview.authorComments // Excludes editor comments
          // ReviewerId is explicitly omitted.
        });
      }
    }

    return maskedReviews;
  }
}
