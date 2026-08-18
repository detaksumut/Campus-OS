import { ConferenceId, TrackId, CommitteeId, PaperId, SessionId, PresenterId } from '../value-objects/ConferenceValueObjects';
import { ConferenceStatus, ReviewMode, ConferenceType } from '../types/ConferenceEnums';
import { ConferenceTrack } from './ConferenceTrack';
import { ReviewCommittee } from './ReviewCommittee';
import { PaperSubmission } from './PaperSubmission';
import { Presenter } from './Presenter';
import { PresentationSession } from './PresentationSession';
import { PresentationAssignment } from './PresentationAssignment';

export class ConferenceEvent {
  private tracks: ConferenceTrack[] = [];
  private committee: ReviewCommittee[] = [];
  private papers: PaperSubmission[] = [];
  private presenters: Presenter[] = [];
  private sessions: PresentationSession[] = [];
  private assignments: PresentationAssignment[] = [];

  constructor(
    private readonly conferenceId: ConferenceId,
    private name: string,
    private type: ConferenceType,
    private reviewMode: ReviewMode,
    private status: ConferenceStatus = ConferenceStatus.PLANNING
  ) {}

  get id(): ConferenceId { return this.conferenceId; }
  get currentName(): string { return this.name; }
  get currentType(): ConferenceType { return this.type; }
  get currentReviewMode(): ReviewMode { return this.reviewMode; }
  get currentStatus(): ConferenceStatus { return this.status; }

  get allTracks(): ConferenceTrack[] { return this.tracks; }
  get allCommittee(): ReviewCommittee[] { return this.committee; }
  get allPapers(): PaperSubmission[] { return this.papers; }
  get allPresenters(): Presenter[] { return this.presenters; }
  get allSessions(): PresentationSession[] { return this.sessions; }
  get allAssignments(): PresentationAssignment[] { return this.assignments; }

  addTrack(track: ConferenceTrack): void {
    this.tracks.push(track);
  }

  addCommitteeMember(member: ReviewCommittee): void {
    this.committee.push(member);
  }

  submitPaper(paper: PaperSubmission): void {
    if (this.status !== ConferenceStatus.CALL_FOR_PAPERS) {
      throw new Error('Papers can only be submitted during the CALL_FOR_PAPERS phase.');
    }
    if (!this.tracks.some(t => t.id.getValue() === paper.track.getValue())) {
      throw new Error('Paper submitted to an invalid track.');
    }
    this.papers.push(paper);
  }

  registerPresenter(presenter: Presenter): void {
    this.presenters.push(presenter);
  }

  createSession(session: PresentationSession): void {
    this.sessions.push(session);
  }

  assignPaperToSession(paperId: PaperId, sessionId: SessionId): void {
    const paper = this.papers.find(p => p.id.getValue() === paperId.getValue());
    if (!paper) throw new Error('Paper not found in this conference.');

    const session = this.sessions.find(s => s.id.getValue() === sessionId.getValue());
    if (!session) throw new Error('Session not found in this conference.');

    this.assignments.push(new PresentationAssignment(paperId, sessionId));
  }

  startCallForPapers(): void {
    if (this.status !== ConferenceStatus.PLANNING) throw new Error('Can only start CFP from PLANNING state.');
    this.status = ConferenceStatus.CALL_FOR_PAPERS;
  }

  startReviewPhase(): void {
    if (this.status !== ConferenceStatus.CALL_FOR_PAPERS) throw new Error('Can only start Review Phase after CFP.');
    this.status = ConferenceStatus.REVIEW_PHASE;
  }

  scheduleConference(): void {
    if (this.status !== ConferenceStatus.REVIEW_PHASE) throw new Error('Can only schedule after Review Phase.');
    this.status = ConferenceStatus.SCHEDULED;
  }
}
