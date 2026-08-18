import { CommunityId, DiscussionId, EventId, AnnouncementId, RequestId } from '../value-objects/CommunityValueObjects';
import { CommunityVisibility, JoinPolicy, CommunityType, CommunityRole, CommunityStatus, RequestStatus } from '../types/CommunityEnums';
import { CommunityMember } from './CommunityMember';
import { MembershipRequest } from './MembershipRequest';
import { Discussion } from './Discussion';
import { CommunityEvent } from './CommunityEvent';
import { Announcement } from './Announcement';

export class Community {
  private members: CommunityMember[] = [];
  private requests: MembershipRequest[] = [];
  private discussions: Discussion[] = [];
  private events: CommunityEvent[] = [];
  private announcements: Announcement[] = [];

  constructor(
    private readonly communityId: CommunityId,
    private name: string,
    private description: string,
    private type: CommunityType,
    private visibility: CommunityVisibility,
    private joinPolicy: JoinPolicy,
    private status: CommunityStatus = CommunityStatus.ACTIVE,
    private readonly parentCommunityId?: CommunityId
  ) {}

  get id(): CommunityId { return this.communityId; }
  get currentName(): string { return this.name; }
  get currentDescription(): string { return this.description; }
  get currentType(): CommunityType { return this.type; }
  get currentVisibility(): CommunityVisibility { return this.visibility; }
  get currentJoinPolicy(): JoinPolicy { return this.joinPolicy; }
  get currentStatus(): CommunityStatus { return this.status; }
  get parent(): CommunityId | undefined { return this.parentCommunityId; }

  get allMembers(): CommunityMember[] { return this.members; }
  get allRequests(): MembershipRequest[] { return this.requests; }
  get allDiscussions(): Discussion[] { return this.discussions; }
  get allEvents(): CommunityEvent[] { return this.events; }
  get allAnnouncements(): Announcement[] { return this.announcements; }

  addMember(member: CommunityMember): void {
    if (this.status !== CommunityStatus.ACTIVE) throw new Error('Cannot add members to an inactive community.');
    this.members.push(member);
  }

  submitRequest(request: MembershipRequest): void {
    if (this.status !== CommunityStatus.ACTIVE) throw new Error('Cannot request to join an inactive community.');
    if (this.joinPolicy === JoinPolicy.OPEN) throw new Error('Community is open. No request needed.');
    this.requests.push(request);
  }

  addDiscussion(discussion: Discussion): void {
    if (this.status !== CommunityStatus.ACTIVE) throw new Error('Cannot start discussions in an inactive community.');
    this.discussions.push(discussion);
  }

  addEvent(event: CommunityEvent): void {
    if (this.status !== CommunityStatus.ACTIVE) throw new Error('Cannot add events to an inactive community.');
    this.events.push(event);
  }

  addAnnouncement(announcement: Announcement): void {
    if (this.status !== CommunityStatus.ACTIVE) throw new Error('Cannot add announcements to an inactive community.');
    this.announcements.push(announcement);
  }

  suspendMember(memberId: string): void {
    const idx = this.members.findIndex(m => m.id === memberId);
    if (idx !== -1) {
      const old = this.members[idx];
      this.members[idx] = new CommunityMember(old.id, old.currentRole, old.joinDate, true);
    }
  }

  closeDiscussion(discussionId: string): void {
    const idx = this.discussions.findIndex(d => d.id.getValue() === discussionId);
    if (idx !== -1) {
      const old = this.discussions[idx];
      this.discussions[idx] = new Discussion(
        old.id, old.author, old.currentTitle, old.currentContent, old.allReferences, true, old.dateCreated
      );
    }
  }
}
