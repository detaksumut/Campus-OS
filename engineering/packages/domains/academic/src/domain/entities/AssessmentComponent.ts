export class AssessmentComponent {
    constructor(
        public readonly componentId: string,
        public name: string,
        // Weight represented in Basis Points (10000 = 100%)
        // Example: 20% = 2000
        public weightBasisPoints: number
    ) {
        if (weightBasisPoints < 0 || weightBasisPoints > 10000) {
            throw new Error("Weight basis points must be between 0 and 10000.");
        }
    }
}
