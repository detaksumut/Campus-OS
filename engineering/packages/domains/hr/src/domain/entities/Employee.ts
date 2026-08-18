export class Employee {
    constructor(
        public readonly employeeId: string,
        public readonly identityUserId: string,
        public readonly employeeNumber: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly hireDate: Date,
        public isActive: boolean = true
    ) {}
}
