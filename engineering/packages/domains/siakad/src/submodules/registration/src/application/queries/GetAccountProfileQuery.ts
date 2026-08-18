export class GetAccountProfileQuery {
  constructor(
    public readonly accountId: string
  ) {}
}

// Return DTO for Query
export interface AccountProfileDto {
  accountId: string;
  identityId: string;
  email: string;
  fullName: string;
  status: string;
  mfaEnabled: boolean;
}
