import { RequestId } from '../value-objects/CommunityValueObjects';
import { RequestStatus } from '../types/CommunityEnums';

export class MembershipRequest {
  constructor(
    private readonly requestId: RequestId,
    private readonly memberId: string,
    private readonly message: string,
    private readonly status: RequestStatus = RequestStatus.PENDING,
    private readonly requestedAt: Date = new Date()
  ) {}

  get id(): RequestId { return this.requestId; }
  get member(): string { return this.memberId; }
  get currentMessage(): string { return this.message; }
  get currentStatus(): RequestStatus { return this.status; }
  get dateRequested(): Date { return this.requestedAt; }
}
