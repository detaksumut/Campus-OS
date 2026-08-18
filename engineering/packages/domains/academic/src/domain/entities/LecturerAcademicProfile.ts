export enum TeachingStatus {
    Active = 'Active',
    OnLeave = 'OnLeave',
    Inactive = 'Inactive'
}

export class LecturerAcademicProfile {
    constructor(
        public readonly lecturerId: string, // Immutable, e.g. LEC-xxxx
        public readonly identityUserId: string, // Link to Identity Core (SSO)
        public homeStudyProgramId: string,
        public teachingStatus: TeachingStatus,
        public academicTeachingMetadata?: any // E.g. specialized subjects, limits
    ) {}

    public static create(
        identityUserId: string,
        homeStudyProgramId: string
    ): LecturerAcademicProfile {
        const id = `LEC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new LecturerAcademicProfile(
            id,
            identityUserId,
            homeStudyProgramId,
            TeachingStatus.Active
        );
    }
}
