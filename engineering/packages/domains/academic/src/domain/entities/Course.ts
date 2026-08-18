import { CourseType } from './CourseType';
import { EducationLevel } from './EducationLevel';

export class Course {
    constructor(
        public readonly courseId: string, // Immutable, e.g. CRS-xxxx
        public courseCode: string, // Mutable, e.g. CS101
        public name: string,
        public credits: number,
        public educationLevel: EducationLevel,
        public courseType: CourseType,
        public isShared: boolean,
        public isActive: boolean,
        public metadata?: any
    ) {}

    public static create(
        courseCode: string,
        name: string,
        credits: number,
        educationLevel: EducationLevel,
        courseType: CourseType,
        isShared: boolean,
        metadata?: any
    ): Course {
        const id = `CRS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new Course(
            id,
            courseCode,
            name,
            credits,
            educationLevel,
            courseType,
            isShared,
            true,
            metadata
        );
    }

    public updateDetails(name: string, credits: number, metadata?: any): void {
        this.name = name;
        this.credits = credits;
        this.metadata = metadata;
    }

    public archive(): void {
        this.isActive = false;
    }
}
