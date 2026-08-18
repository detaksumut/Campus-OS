import { Community } from '../../domain/entities/Community';
import { CommunityId } from '../../domain/value-objects/CommunityValueObjects';

export interface ICommunityRepository {
  saveCommunity(community: Community): Promise<void>;
  findCommunityById(id: CommunityId): Promise<Community | null>;
}
