export interface IPublicationValidationService {
  isPublished(submissionId: string): Promise<boolean>;
}
