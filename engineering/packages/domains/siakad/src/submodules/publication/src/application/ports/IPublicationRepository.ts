import { Submission } from '../../domain/entities/Submission';
import { SubmissionId } from '../../domain/value-objects/PublicationValueObjects';

export interface IPublicationRepository {
  saveSubmission(submission: Submission): Promise<void>;
  findSubmissionById(id: SubmissionId): Promise<Submission | null>;
}
