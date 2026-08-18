export enum StudentState {
    Registered = 'Registered', // Registered from PMB, not yet active in a term
    Active = 'Active',
    Inactive = 'Inactive',
    OnLeave = 'OnLeave',
    Graduated = 'Graduated',
    Dismissed = 'Dismissed', // e.g. violation
    DroppedOut = 'DroppedOut' // e.g. missed terms
}

export class StudentStatus {
    constructor(
        public readonly state: StudentState,
        public readonly effectiveTermId: string, // Term when this status became effective
        public readonly metadata?: any // e.g. Reason for leave, or until term
    ) {}

    public static createRegistered(termId: string): StudentStatus {
        return new StudentStatus(StudentState.Registered, termId);
    }

    public static createActive(termId: string): StudentStatus {
        return new StudentStatus(StudentState.Active, termId);
    }

    public static createOnLeave(termId: string, untilTermId: string, reason: string): StudentStatus {
        return new StudentStatus(StudentState.OnLeave, termId, { untilTermId, reason });
    }

    public static createGraduated(termId: string, judiciumDate: Date): StudentStatus {
        return new StudentStatus(StudentState.Graduated, termId, { judiciumDate });
    }

    public static createDismissed(termId: string, reason: string): StudentStatus {
        return new StudentStatus(StudentState.Dismissed, termId, { reason });
    }

    public static createDroppedOut(termId: string, reason: string): StudentStatus {
        return new StudentStatus(StudentState.DroppedOut, termId, { reason });
    }
}
