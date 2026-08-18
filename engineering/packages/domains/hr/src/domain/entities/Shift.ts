export class Shift {
    constructor(
        public readonly shiftId: string,
        public readonly name: string,
        public readonly startTime: string, // format HH:mm
        public readonly endTime: string, // format HH:mm
        public readonly gracePeriodMinutes: number,
        public readonly isOvernight: boolean = false
    ) {}
}
