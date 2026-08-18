import { IConferenceRepository } from '../application/ports/IConferenceRepository';
import { ConferenceEvent } from '../domain/entities/ConferenceEvent';
import { ConferenceTrack } from '../domain/entities/ConferenceTrack';
import { ReviewCommittee } from '../domain/entities/ReviewCommittee';
import { PaperSubmission } from '../domain/entities/PaperSubmission';
import { Presenter } from '../domain/entities/Presenter';
import { PresentationSession } from '../domain/entities/PresentationSession';
import { PresentationAssignment } from '../domain/entities/PresentationAssignment';
import { ConferenceId, TrackId, PaperId, SessionId, CommitteeId, PresenterId, ResearchReference, ExternalIdentity } from '../domain/value-objects/ConferenceValueObjects';
import { ConferenceStatus, ReviewMode, ConferenceType, PaperStatus, PresenterIdentity, CommitteeRole } from '../domain/types/ConferenceEnums';
import { IDatabaseExecutor } from '../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Mocking shared platform port

export class ConferenceRepositoryImpl implements IConferenceRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveConference(conference: ConferenceEvent): Promise<void> {
    const sqlConf = `
      INSERT INTO conference.conferences (conference_id, name, type, review_mode, status)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (conference_id) DO UPDATE SET
        name = EXCLUDED.name,
        type = EXCLUDED.type,
        review_mode = EXCLUDED.review_mode,
        status = EXCLUDED.status;
    `;
    await this.db.execute(sqlConf, [
      conference.id.getValue(),
      conference.currentName,
      conference.currentType,
      conference.currentReviewMode,
      conference.currentStatus
    ]);

    for (const track of conference.allTracks) {
      const sqlTrack = `
        INSERT INTO conference.conference_tracks (track_id, conference_id, name, description)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (track_id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description;
      `;
      await this.db.execute(sqlTrack, [
        track.id.getValue(),
        conference.id.getValue(),
        track.currentName,
        track.currentDescription
      ]);
    }

    for (const cm of conference.allCommittee) {
      const sqlCm = `
        INSERT INTO conference.review_committees (committee_id, conference_id, member_id, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (committee_id) DO UPDATE SET
          role = EXCLUDED.role;
      `;
      await this.db.execute(sqlCm, [
        cm.id.getValue(),
        conference.id.getValue(),
        cm.member,
        cm.currentRole
      ]);
    }

    for (const paper of conference.allPapers) {
      const sqlPaper = `
        INSERT INTO conference.paper_submissions (paper_id, conference_id, track_id, author_id, title, abstract_text, research_project_id, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (paper_id) DO UPDATE SET
          title = EXCLUDED.title,
          abstract_text = EXCLUDED.abstract_text,
          status = EXCLUDED.status;
      `;
      await this.db.execute(sqlPaper, [
        paper.id.getValue(),
        conference.id.getValue(),
        paper.track.getValue(),
        paper.author,
        paper.currentTitle,
        paper.currentAbstract,
        paper.researchReference?.getValue() || null,
        paper.currentStatus
      ]);
    }

    for (const p of conference.allPresenters) {
      const ext = p.externalDetails;
      const sqlPresenter = `
        INSERT INTO conference.presenters (presenter_id, conference_id, identity_type, member_id, ext_name, ext_institution, ext_email, ext_country)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (presenter_id) DO UPDATE SET
          identity_type = EXCLUDED.identity_type;
      `;
      await this.db.execute(sqlPresenter, [
        p.id.getValue(),
        conference.id.getValue(),
        p.type,
        p.internalMemberId || null,
        ext?.name || null,
        ext?.institution || null,
        ext?.email || null,
        ext?.country || null
      ]);
    }

    for (const session of conference.allSessions) {
      const sqlSession = `
        INSERT INTO conference.presentation_sessions (session_id, conference_id, title, start_time, end_time, location)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (session_id) DO UPDATE SET
          title = EXCLUDED.title,
          start_time = EXCLUDED.start_time,
          end_time = EXCLUDED.end_time,
          location = EXCLUDED.location;
      `;
      await this.db.execute(sqlSession, [
        session.id.getValue(),
        conference.id.getValue(),
        session.currentTitle,
        session.scheduleStart,
        session.scheduleEnd,
        session.sessionLocation
      ]);
    }

    for (const asg of conference.allAssignments) {
      const sqlAsg = `
        INSERT INTO conference.presentation_assignments (paper_id, session_id)
        VALUES ($1, $2)
        ON CONFLICT (paper_id, session_id) DO NOTHING;
      `;
      await this.db.execute(sqlAsg, [asg.paper.getValue(), asg.session.getValue()]);
    }
  }

  async findConferenceById(id: ConferenceId): Promise<ConferenceEvent | null> {
    const cRows = await this.db.query(`SELECT * FROM conference.conferences WHERE conference_id = $1`, [id.getValue()]);
    if (cRows.length === 0) return null;
    const cRow = cRows[0];

    const conference = new ConferenceEvent(
      new ConferenceId(cRow.conference_id),
      cRow.name,
      cRow.type as ConferenceType,
      cRow.review_mode as ReviewMode,
      cRow.status as ConferenceStatus
    );

    const tRows = await this.db.query(`SELECT * FROM conference.conference_tracks WHERE conference_id = $1`, [id.getValue()]);
    for (const t of tRows) {
      conference['tracks'].push(new ConferenceTrack(new TrackId(t.track_id), t.name, t.description));
    }

    const cmRows = await this.db.query(`SELECT * FROM conference.review_committees WHERE conference_id = $1`, [id.getValue()]);
    for (const cm of cmRows) {
      conference['committee'].push(new ReviewCommittee(new CommitteeId(cm.committee_id), cm.member_id, cm.role as CommitteeRole));
    }

    const pRows = await this.db.query(`SELECT * FROM conference.paper_submissions WHERE conference_id = $1`, [id.getValue()]);
    for (const p of pRows) {
      const resRef = p.research_project_id ? new ResearchReference(p.research_project_id) : null;
      conference['papers'].push(
        new PaperSubmission(
          new PaperId(p.paper_id),
          new TrackId(p.track_id),
          p.author_id,
          p.title,
          p.abstract_text,
          resRef,
          p.status as PaperStatus
        )
      );
    }

    const prRows = await this.db.query(`SELECT * FROM conference.presenters WHERE conference_id = $1`, [id.getValue()]);
    for (const pr of prRows) {
      const extId = (pr.identity_type === PresenterIdentity.EXTERNAL)
        ? new ExternalIdentity(pr.ext_name, pr.ext_institution, pr.ext_email, pr.ext_country)
        : null;
      conference['presenters'].push(
        new Presenter(new PresenterId(pr.presenter_id), pr.identity_type as PresenterIdentity, pr.member_id, extId)
      );
    }

    const sRows = await this.db.query(`SELECT * FROM conference.presentation_sessions WHERE conference_id = $1`, [id.getValue()]);
    for (const s of sRows) {
      conference['sessions'].push(
        new PresentationSession(new SessionId(s.session_id), s.title, new Date(s.start_time), new Date(s.end_time), s.location)
      );
    }

    // Usually we would fetch presentation_assignments and push into conference.assignments array here
    const asgRows = await this.db.query(`SELECT pa.* FROM conference.presentation_assignments pa 
                                         JOIN conference.presentation_sessions ps ON pa.session_id = ps.session_id 
                                         WHERE ps.conference_id = $1`, [id.getValue()]);
    for (const asg of asgRows) {
      conference['assignments'].push(new PresentationAssignment(new PaperId(asg.paper_id), new SessionId(asg.session_id)));
    }

    return conference;
  }
}
