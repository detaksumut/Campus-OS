export class AcademicYear {
    constructor(
        public readonly id: string, // Immutable, e.g. ACY-xxxx
        public readonly name: string, // e.g. "2026/2027"
        public readonly startYear: number,
        public readonly endYear: number,
        public isActive: boolean
    ) {}

    public static create(startYear: number, endYear: number): AcademicYear {
        const id = `ACY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const name = `${startYear}/${endYear}`;
        return new AcademicYear(id, name, startYear, endYear, false);
    }

    public open(): void {
        this.isActive = true;
    }

    public close(): void {
        this.isActive = false;
    }
}
