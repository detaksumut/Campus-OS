import { ICommunityRepository } from '../application/ports/ICommunityRepository';
import { Community } from '../domain/entities/Community';
import { CommunityMember } from '../domain/entities/CommunityMember';
import { MembershipRequest } from '../domain/entities/MembershipRequest';
import { Discussion } from '../domain/entities/Discussion';
import { CommunityEvent } from '../domain/entities/CommunityEvent';
import { Announcement } from '../domain/entities/Announcement';
import { CommunityId, RequestId, DiscussionId, EventId, AnnouncementId, ArtifactReference } from '../domain/value-objects/CommunityValueObjects';
import { CommunityVisibility, JoinPolicy, CommunityType, CommunityRole, CommunityStatus, RequestStatus, ArtifactContext } from '../domain/types/CommunityEnums';
import { IDatabaseExecutor } from '../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Shared platform port

export class CommunityRepositoryImpl implements ICommunityRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveCommunity(community: Community): Promise<void> {
    const sqlComm = `
      INSERT INTO community.communities (community_id, name, description, type, visibility, join_policy, status, parent_community_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (community_id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        type = EXCLUDED.type,
        visibility = EXCLUDED.visibility,
        join_policy = EXCLUDED.join_policy,
        status = EXCLUDED.status,
        parent_community_id = EXCLUDED.parent_community_id;
    `;
    await this.db.execute(sqlComm, [
      community.id.getValue(),
      community.currentName,
      community.currentDescription,
      community.currentType,
      community.currentVisibility,
      community.currentJoinPolicy,
      community.currentStatus,
      community.parent?.getValue() || null
    ]);

    for (const mem of community.allMembers) {
      const sqlMem = `
        INSERT INTO community.community_members (community_id, member_id, role, joined_at, is_suspended)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (community_id, member_id) DO UPDATE SET
          role = EXCLUDED.role,
          is_suspended = EXCLUDED.is_suspended;
      `;
      await this.db.execute(sqlMem, [
        community.id.getValue(),
        mem.id,
        mem.currentRole,
        mem.joinDate,
        mem.isSuspended
      ]);
    }

    for (const req of community.allRequests) {
      const sqlReq = `
        INSERT INTO community.membership_requests (request_id, community_id, member_id, message, status, requested_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (request_id) DO UPDATE SET
          status = EXCLUDED.status;
      `;
      await this.db.execute(sqlReq, [
        req.id.getValue(),
        community.id.getValue(),
        req.member,
        req.currentMessage,
        req.currentStatus,
        req.dateRequested
      ]);
    }

    for (const disc of community.allDiscussions) {
      const refJson = JSON.stringify(disc.allReferences);
      const sqlDisc = `
        INSERT INTO community.discussions (discussion_id, community_id, author_id, title, content, references_json, is_closed, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (discussion_id) DO UPDATE SET
          title = EXCLUDED.title,
          content = EXCLUDED.content,
          references_json = EXCLUDED.references_json,
          is_closed = EXCLUDED.is_closed;
      `;
      await this.db.execute(sqlDisc, [
        disc.id.getValue(),
        community.id.getValue(),
        disc.author,
        disc.currentTitle,
        disc.currentContent,
        refJson,
        disc.closedStatus,
        disc.dateCreated
      ]);
    }

    for (const evt of community.allEvents) {
      const sqlEvt = `
        INSERT INTO community.community_events (event_id, community_id, organizer_id, title, description, schedule_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (event_id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          schedule_date = EXCLUDED.schedule_date;
      `;
      await this.db.execute(sqlEvt, [
        evt.id.getValue(),
        community.id.getValue(),
        evt.organizer,
        evt.currentTitle,
        evt.currentDescription,
        evt.scheduledFor
      ]);
    }

    for (const ann of community.allAnnouncements) {
      const sqlAnn = `
        INSERT INTO community.announcements (announcement_id, community_id, author_id, title, content, published_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (announcement_id) DO UPDATE SET
          title = EXCLUDED.title,
          content = EXCLUDED.content;
      `;
      await this.db.execute(sqlAnn, [
        ann.id.getValue(),
        community.id.getValue(),
        ann.author,
        ann.currentTitle,
        ann.currentContent,
        ann.datePublished
      ]);
    }
  }

  async findCommunityById(id: CommunityId): Promise<Community | null> {
    const cRows = await this.db.query(`SELECT * FROM community.communities WHERE community_id = $1`, [id.getValue()]);
    if (cRows.length === 0) return null;
    const cRow = cRows[0];

    const community = new Community(
      new CommunityId(cRow.community_id),
      cRow.name,
      cRow.description,
      cRow.type as CommunityType,
      cRow.visibility as CommunityVisibility,
      cRow.join_policy as JoinPolicy,
      cRow.status as CommunityStatus,
      cRow.parent_community_id ? new CommunityId(cRow.parent_community_id) : undefined
    );

    const memRows = await this.db.query(`SELECT * FROM community.community_members WHERE community_id = $1`, [id.getValue()]);
    for (const mem of memRows) {
      community['members'].push(new CommunityMember(mem.member_id, mem.role as CommunityRole, new Date(mem.joined_at), mem.is_suspended));
    }

    const reqRows = await this.db.query(`SELECT * FROM community.membership_requests WHERE community_id = $1`, [id.getValue()]);
    for (const req of reqRows) {
      community['requests'].push(
        new MembershipRequest(new RequestId(req.request_id), req.member_id, req.message, req.status as RequestStatus, new Date(req.requested_at))
      );
    }

    const discRows = await this.db.query(`SELECT * FROM community.discussions WHERE community_id = $1`, [id.getValue()]);
    for (const disc of discRows) {
      const refList: ArtifactReference[] = [];
      if (disc.references_json) {
        const refs = JSON.parse(disc.references_json);
        refs.forEach((r: any) => {
          refList.push(new ArtifactReference(r.referenceId, r.context as ArtifactContext));
        });
      }
      community['discussions'].push(
        new Discussion(new DiscussionId(disc.discussion_id), disc.author_id, disc.title, disc.content, refList, disc.is_closed, new Date(disc.created_at))
      );
    }

    const evtRows = await this.db.query(`SELECT * FROM community.community_events WHERE community_id = $1`, [id.getValue()]);
    for (const evt of evtRows) {
      community['events'].push(
        new CommunityEvent(new EventId(evt.event_id), evt.organizer_id, evt.title, evt.description, new Date(evt.schedule_date))
      );
    }

    const annRows = await this.db.query(`SELECT * FROM community.announcements WHERE community_id = $1`, [id.getValue()]);
    for (const ann of annRows) {
      community['announcements'].push(
        new Announcement(new AnnouncementId(ann.announcement_id), ann.author_id, ann.title, ann.content, new Date(ann.published_at))
      );
    }

    return community;
  }
}
