export class ClassSchedule {
    constructor(
        public readonly scheduleId: string,
        public readonly dayOfWeek: number, // 1 for Monday, 7 for Sunday
        public readonly startTime: string, // "08:00"
        public readonly endTime: string, // "10:00"
        public readonly roomId: string // Opaque reference to Asset domain
    ) {}

    public static create(
        dayOfWeek: number,
        startTime: string,
        endTime: string,
        roomId: string
    ): ClassSchedule {
        const id = `SCH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new ClassSchedule(id, dayOfWeek, startTime, endTime, roomId);
    }
}
