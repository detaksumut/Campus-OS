export enum TermType {
    Odd = 'Odd', // Ganjil
    Even = 'Even', // Genap
    Short = 'Short' // Pendek
}

export class AcademicTerm {
    constructor(
        public readonly id: string, // Immutable, e.g. TRM-xxxx
        public readonly academicYearId: string,
        public readonly termType: TermType,
        public readonly name: string,
        public isActive: boolean
    ) {}

    public static create(academicYearId: string, termType: TermType, name: string): AcademicTerm {
        const id = `TRM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new AcademicTerm(id, academicYearId, termType, name, false);
    }

    public open(): void {
        this.isActive = true;
    }

    public close(): void {
        this.isActive = false;
    }
}
