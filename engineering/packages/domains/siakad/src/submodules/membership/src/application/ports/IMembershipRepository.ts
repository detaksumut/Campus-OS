import { Member } from '../../domain/entities/Member';
import { MemberId } from '../../domain/value-objects/MembershipValueObjects';

export interface IMembershipRepository {
  saveMember(member: Member): Promise<void>;
  findMemberById(memberId: MemberId): Promise<Member | null>;
  findMemberByIdentityId(identityId: string): Promise<Member | null>;
}
