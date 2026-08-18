export enum MembershipWorkflowEvents {
  VerificationRequested = 'Membership.VerificationRequested',
  Submitted = 'Membership.Submitted',
  UnderReview = 'Membership.UnderReview',
  Verified = 'Membership.Verified',
  Rejected = 'Membership.Rejected',
  Suspended = 'Membership.Suspended'
}

export enum MembershipProfileEvents {
  ProfileCreated = 'Membership.ProfileCreated',
  ProfileUpdated = 'Membership.ProfileUpdated',
  AcademicProfileUpdated = 'Membership.AcademicProfileUpdated',
  PreferencesUpdated = 'Membership.PreferencesUpdated'
}

export const MembershipCapabilities = {
  EnrollmentCreate: 'membership.enrollment.create',
  EnrollmentRead: 'membership.enrollment.read',
  IdentityBind: 'membership.identity.bind',
  IdentityUnbind: 'membership.identity.unbind',
  ProfileRead: 'membership.profile.read',
  ProfileUpdate: 'membership.profile.update',
  VerificationRead: 'membership.verification.read',
  VerificationUpdate: 'membership.verification.update'
};
