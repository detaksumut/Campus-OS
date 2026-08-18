export type VerificationState = 'Pending' | 'Submitted' | 'UnderReview' | 'Verified' | 'Rejected' | 'Suspended';
export type MembershipStatus = 'Active' | 'Inactive' | 'Expired' | 'Suspended';

// -----------------------------------------
// Profile Data Models
// -----------------------------------------
export interface IPublicProfile {
  id: string;
  avatarUrl?: string;
  displayName: string;
  bio?: string;
}

export interface IPrivateProfile {
  id: string;
  legalName: string;
  birthDate?: string;
  phoneNumber?: string;
  address?: string;
}

export interface IAcademicProfile {
  id: string;
  institution: string;
  facultyOrDepartment?: string;
  academicRole: string;
  researchAreas: string[];
  academicInterests: string[];
  membershipTier: string;
}

export interface IPreferences {
  id: string;
  language: string;
  timezone: string;
  notificationsEnabled: boolean;
}

// -----------------------------------------
// Read-Only SDK Interfaces (For Cross-Domain)
// -----------------------------------------
export interface IMembershipLookup {
  getMembershipStatus(membershipId: string): Promise<MembershipStatus>;
}

export interface IMembershipVerification {
  getVerificationState(membershipId: string): Promise<VerificationState>;
  isVerified(membershipId: string): Promise<boolean>;
  getVerificationHistory(membershipId: string): Promise<{ state: VerificationState; timestamp: number }[]>;
}

export interface IMembershipProfile {
  getPublicProfile(membershipId: string): Promise<IPublicProfile | null>;
  getAcademicProfile(membershipId: string): Promise<IAcademicProfile | null>;
}

// -----------------------------------------
// Runtimes
// -----------------------------------------
export interface IVerificationPolicy {
  canTransition(membershipId: string, fromState: VerificationState, toState: VerificationState): Promise<boolean>;
}

export interface IVerificationRuntime extends IMembershipVerification {
  requestVerification(membershipId: string): Promise<void>;
  submitDocuments(membershipId: string, documentIds: string[]): Promise<void>;
  startReview(membershipId: string): Promise<void>;
  approve(membershipId: string): Promise<void>;
  reject(membershipId: string, reason: string): Promise<void>;
  suspend(membershipId: string, reason: string): Promise<void>;
}

export interface IProfileRuntime extends IMembershipProfile {
  updatePublicProfile(membershipId: string, profile: Partial<IPublicProfile>): Promise<void>;
  updatePrivateProfile(membershipId: string, profile: Partial<IPrivateProfile>): Promise<void>;
  updateAcademicProfile(membershipId: string, profile: Partial<IAcademicProfile>): Promise<void>;
  updatePreferences(membershipId: string, preferences: Partial<IPreferences>): Promise<void>;
  
  getPrivateProfile(membershipId: string): Promise<IPrivateProfile | null>;
  getPreferences(membershipId: string): Promise<IPreferences | null>;
}

export * from './sprint33';
export * from './sprint34';
