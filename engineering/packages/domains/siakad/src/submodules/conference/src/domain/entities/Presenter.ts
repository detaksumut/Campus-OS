import { PresenterId, ExternalIdentity } from '../value-objects/ConferenceValueObjects';
import { PresenterIdentity } from '../types/ConferenceEnums';

export class Presenter {
  constructor(
    private readonly presenterId: PresenterId,
    private readonly identityType: PresenterIdentity,
    private readonly memberId: string | null = null,
    private readonly externalIdentity: ExternalIdentity | null = null
  ) {
    if (identityType === PresenterIdentity.MEMBER && !memberId) {
      throw new Error('Member ID is required for MEMBER identity.');
    }
    if (identityType === PresenterIdentity.EXTERNAL && !externalIdentity) {
      throw new Error('External Identity is required for EXTERNAL identity.');
    }
  }

  get id(): PresenterId { return this.presenterId; }
  get type(): PresenterIdentity { return this.identityType; }
  get internalMemberId(): string | null { return this.memberId; }
  get externalDetails(): ExternalIdentity | null { return this.externalIdentity; }
}
