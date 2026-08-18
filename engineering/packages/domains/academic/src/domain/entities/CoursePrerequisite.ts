export enum PrerequisiteRuleType {
    MustPass = 'MustPass',
    ConcurrentAllowed = 'ConcurrentAllowed',
    MinimumCredits = 'MinimumCredits' // Example: Must have taken at least 60 credits
}

export class CoursePrerequisite {
    constructor(
        public readonly id: string, // Immutable
        public readonly courseId: string, // The target course
        public readonly requiredCourseId: string | null, // Null if RuleType is MinimumCredits
        public readonly minimumGrade: string | null,
        public readonly ruleType: PrerequisiteRuleType,
        public readonly minimumCreditsRequired?: number
    ) {}

    public static createCourseRequirement(
        courseId: string,
        requiredCourseId: string,
        minimumGrade: string,
        allowConcurrent: boolean
    ): CoursePrerequisite {
        const id = `PRE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const ruleType = allowConcurrent ? PrerequisiteRuleType.ConcurrentAllowed : PrerequisiteRuleType.MustPass;
        return new CoursePrerequisite(
            id,
            courseId,
            requiredCourseId,
            minimumGrade,
            ruleType
        );
    }
}
