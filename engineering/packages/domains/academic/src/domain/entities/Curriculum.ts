export enum CurriculumStatus {
    Draft = 'Draft',
    Active = 'Active',
    Archived = 'Archived'
}

export class Curriculum {
    constructor(
        public readonly curriculumId: string, // Immutable, e.g. CUR-xxxx
        public readonly studyProgramId: string,
        public version: string, // e.g. "2024" or "MBKM"
        public effectiveAcademicYearId: string,
        public status: CurriculumStatus,
        public totalCreditsRequired: number
    ) {}

    public static createDraft(
        studyProgramId: string,
        version: string,
        effectiveAcademicYearId: string,
        totalCreditsRequired: number
    ): Curriculum {
        const id = `CUR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new Curriculum(
            id,
            studyProgramId,
            version,
            effectiveAcademicYearId,
            CurriculumStatus.Draft,
            totalCreditsRequired
        );
    }

    public activate(): void {
        this.status = CurriculumStatus.Active;
    }

    public archive(): void {
        this.status = CurriculumStatus.Archived;
    }
}
