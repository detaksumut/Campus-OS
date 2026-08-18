export class CurriculumCourse {
    constructor(
        public readonly curriculumId: string,
        public readonly courseId: string, // Reference to global Course Catalog
        public semesterRecommendation: number, // 1, 2, 3...
        public isMandatory: boolean,
        public minimumGrade: string, // e.g. "C"
        public sequence: number // Display ordering
    ) {}

    public static assignCourse(
        curriculumId: string,
        courseId: string,
        semesterRecommendation: number,
        isMandatory: boolean,
        minimumGrade: string,
        sequence: number
    ): CurriculumCourse {
        return new CurriculumCourse(
            curriculumId,
            courseId,
            semesterRecommendation,
            isMandatory,
            minimumGrade,
            sequence
        );
    }
}
