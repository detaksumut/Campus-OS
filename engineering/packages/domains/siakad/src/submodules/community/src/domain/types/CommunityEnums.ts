export enum CommunityVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  HIDDEN = 'HIDDEN'
}

export enum JoinPolicy {
  OPEN = 'OPEN',
  APPROVAL_REQUIRED = 'APPROVAL_REQUIRED',
  INVITATION_ONLY = 'INVITATION_ONLY'
}

export enum CommunityType {
  ACADEMIC = 'ACADEMIC',
  RESEARCH = 'RESEARCH',
  STUDENT = 'STUDENT',
  PROFESSIONAL = 'PROFESSIONAL',
  SPECIAL_INTEREST = 'SPECIAL_INTEREST'
}

export enum CommunityRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER'
}

export enum CommunityStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  SUSPENDED = 'SUSPENDED'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum ArtifactContext {
  PUBLICATION = 'PUBLICATION',
  RESEARCH = 'RESEARCH',
  CONFERENCE = 'CONFERENCE',
  AWARDS = 'AWARDS',
  OTHER = 'OTHER'
}
