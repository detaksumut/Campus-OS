export class GetMemberProfileQuery {
  constructor(
    public readonly identityId: string
  ) {}
}

export interface MemberProfileDto {
  memberId: string;
  identityId: string;
  status: string;
  academicLevel?: string;
  affiliation?: string;
  department?: string;
  enrollmentYear?: number;
  digitalCard?: {
    cardId: string;
    status: string;
    version: number;
    issueDate: string;
    expirationDate: string;
  };
}
