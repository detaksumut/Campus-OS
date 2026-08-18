export class DegreeAwardSnapshot {
    constructor(
        public readonly degreeId: string,
        public readonly degreeCode: string,
        public readonly degreeName: string,
        public readonly degreeAbbreviation: string,
        public readonly studyProgramId: string,
        public readonly regulationVersion: number
    ) {}
}
