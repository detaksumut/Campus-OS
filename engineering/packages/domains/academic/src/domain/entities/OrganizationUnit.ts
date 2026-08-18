export enum OrganizationUnitType {
    Campus = 'Campus',
    Faculty = 'Faculty',
    Department = 'Department',
    StudyProgram = 'StudyProgram'
}

export abstract class OrganizationUnit {
    protected constructor(
        public readonly id: string, // Immutable internal identifier (e.g. CMP-xxxx)
        public readonly type: OrganizationUnitType,
        public name: string,
        public code: string, // Mutable business code (e.g. FILKOM)
        public isActive: boolean,
        public readonly parentId: string | null = null
    ) {}

    public activate(): void {
        this.isActive = true;
    }

    public deactivate(): void {
        this.isActive = false;
    }

    public updateDetails(name: string, code: string): void {
        this.name = name;
        this.code = code;
    }
}
