import { IPublicationRepository } from '../application/ports/IPublicationRepository';
import { Submission } from '../domain/entities/Submission';
import { Manuscript } from '../domain/entities/Manuscript';
import { ReviewAssignment } from '../domain/entities/ReviewAssignment';
import { Review } from '../domain/entities/Review';
import { EditorialDecision } from '../domain/entities/EditorialDecision';
import { SubmissionId, AuthorId, ReviewAssignmentId, ReviewerId, EditorId } from '../domain/value-objects/PublicationValueObjects';
import { SubmissionStatus, ReviewRoundStatus, ReviewDecision } from '../domain/types/PublicationEnums';
import { IDatabaseExecutor } from '../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Mocking the shared platform port

export class PublicationRepositoryImpl implements IPublicationRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveSubmission(submission: Submission): Promise<void> {
    // 1. Save Submission aggregate root
    const sqlSubmission = `
      INSERT INTO publication.submissions (submission_id, author_id, status, current_review_round)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (submission_id) DO UPDATE SET
        status = EXCLUDED.status,
        current_review_round = EXCLUDED.current_review_round;
    `;
    await this.db.execute(sqlSubmission, [
      submission.id.getValue(),
      submission.author.getValue(),
      submission.currentStatus,
      submission.currentRound
    ]);

    // 2. Save Manuscripts
    const manuscripts = (submission as any).manuscripts as Manuscript[];
    for (const ms of manuscripts) {
      const sqlMs = `
        INSERT INTO publication.manuscripts (submission_id, version, title, abstract_text, file_url, checksum, submitted_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (submission_id, version) DO NOTHING;
      `;
      await this.db.execute(sqlMs, [
        submission.id.getValue(),
        ms.currentVersion,
        ms.currentTitle,
        ms.currentAbstract,
        ms.currentFileUrl,
        ms.currentChecksum,
        ms['submittedAt']
      ]);
    }

    // 3. Save Assignments and Reviews
    for (const assignment of submission.allAssignments) {
      const sqlAssignment = `
        INSERT INTO publication.review_assignments (assignment_id, submission_id, reviewer_id, round, deadline, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (assignment_id) DO UPDATE SET
          status = EXCLUDED.status;
      `;
      await this.db.execute(sqlAssignment, [
        assignment.id.getValue(),
        submission.id.getValue(),
        assignment.reviewer.getValue(),
        assignment.currentRound,
        assignment['deadline'],
        assignment.currentStatus
      ]);

      if (assignment.submittedReview) {
        const review = assignment.submittedReview;
        const sqlReview = `
          INSERT INTO publication.reviews (assignment_id, decision, comments_to_author, comments_to_editor, submitted_at)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (assignment_id) DO NOTHING;
        `;
        await this.db.execute(sqlReview, [
          assignment.id.getValue(),
          review.currentDecision,
          review.authorComments,
          review.editorComments,
          review['submittedAt']
        ]);
      }
    }

    // 4. Save Editorial Decisions
    for (const decision of submission.allDecisions) {
      const sqlDecision = `
        INSERT INTO publication.editorial_decisions (submission_id, editor_id, decision, justification, decided_at)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (submission_id, editor_id, decided_at) DO NOTHING;
      `;
      await this.db.execute(sqlDecision, [
        submission.id.getValue(),
        decision.editor.getValue(),
        decision.currentDecision,
        decision.comments,
        decision['decidedAt']
      ]);
    }
  }

  async findSubmissionById(id: SubmissionId): Promise<Submission | null> {
    const subRows = await this.db.query(`SELECT * FROM publication.submissions WHERE submission_id = $1`, [id.getValue()]);
    if (subRows.length === 0) return null;
    const sRow = subRows[0];

    const submission = new Submission(
      new SubmissionId(sRow.submission_id),
      new AuthorId(sRow.author_id),
      sRow.status as SubmissionStatus,
      sRow.current_review_round
    );

    // Fetch Manuscripts
    const msRows = await this.db.query(`SELECT * FROM publication.manuscripts WHERE submission_id = $1 ORDER BY version ASC`, [sRow.submission_id]);
    for (const row of msRows) {
      submission['manuscripts'].push(new Manuscript(row.title, row.abstract_text, row.file_url, row.checksum, row.version, new Date(row.submitted_at)));
    }

    // Fetch Assignments & Reviews
    const asgnRows = await this.db.query(`SELECT * FROM publication.review_assignments WHERE submission_id = $1`, [sRow.submission_id]);
    for (const row of asgnRows) {
      const assignment = new ReviewAssignment(
        new ReviewAssignmentId(row.assignment_id),
        new ReviewerId(row.reviewer_id),
        row.round,
        new Date(row.deadline),
        row.status as ReviewRoundStatus
      );

      const reviewRows = await this.db.query(`SELECT * FROM publication.reviews WHERE assignment_id = $1`, [row.assignment_id]);
      if (reviewRows.length > 0) {
        const rRow = reviewRows[0];
        const review = new Review(
          rRow.decision as ReviewDecision,
          rRow.comments_to_author,
          rRow.comments_to_editor,
          new Date(rRow.submitted_at)
        );
        assignment['review'] = review;
      }
      submission['assignments'].push(assignment);
    }

    // Fetch Editorial Decisions
    const edRows = await this.db.query(`SELECT * FROM publication.editorial_decisions WHERE submission_id = $1 ORDER BY decided_at ASC`, [sRow.submission_id]);
    for (const row of edRows) {
      submission['editorialDecisions'].push(new EditorialDecision(
        new EditorId(row.editor_id),
        row.decision as ReviewDecision,
        row.justification,
        new Date(row.decided_at)
      ));
    }

    return submission;
  }
}
