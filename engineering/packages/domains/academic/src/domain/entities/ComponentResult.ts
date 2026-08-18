import { ComponentResultStatus } from './ComponentResultStatus';

export class ComponentResult {
    constructor(
        public readonly componentId: string,
        public status: ComponentResultStatus,
        public score: number | null,
        public readonly recordedBy: string | null,
        public readonly recordedAt: Date | null,
        public readonly notes?: string
    ) {
        if (score !== null && (score < 0 || score > 100)) {
            throw new Error("Score must be between 0 and 100.");
        }
    }
}
