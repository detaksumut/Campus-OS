import { Community } from '../entities/Community';
import { CommunityRole, JoinPolicy, CommunityStatus } from '../types/CommunityEnums';

export class CommunityGovernancePolicy {
  /**
   * Determines if a member has administrative rights to change community settings or approve requests.
   */
  static hasAdminRights(community: Community, memberId: string): boolean {
    const member = community.allMembers.find(m => m.id === memberId);
    if (!member) return false;
    return member.currentRole === CommunityRole.OWNER || member.currentRole === CommunityRole.ADMIN;
  }

  /**
   * Evaluates if a new user can join the community directly without approval.
   */
  static canJoinDirectly(community: Community): boolean {
    return community.currentStatus === CommunityStatus.ACTIVE && community.currentJoinPolicy === JoinPolicy.OPEN;
  }
}

export class CommunityModerationPolicy {
  /**
   * Determines if a member has moderation rights to suspend users or close discussions.
   */
  static hasModerationRights(community: Community, memberId: string): boolean {
    const member = community.allMembers.find(m => m.id === memberId);
    if (!member) return false;
    return member.currentRole === CommunityRole.OWNER || 
           member.currentRole === CommunityRole.ADMIN || 
           member.currentRole === CommunityRole.MODERATOR;
  }

  /**
   * Checks if an action is valid against a suspended member.
   */
  static isSuspended(community: Community, memberId: string): boolean {
    const member = community.allMembers.find(m => m.id === memberId);
    return member ? member.isSuspended : false;
  }
}
