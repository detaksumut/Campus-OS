export interface DomainEvent {
    eventId: string;
    occurredOn: Date;
    version: number;
}

export class IdentityProvisioned_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly userId: string,
        public readonly identityCategory: string,
        public readonly primaryIdentifier: string,
        public readonly tenantId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class IdentityActivated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly userId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class IdentitySuspended_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly userId: string,
        public readonly reason: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class RoleAssigned_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly userId: string,
        public readonly role: string,
        public readonly organizationUnitId?: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class PermissionGranted_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly userId: string,
        public readonly permission: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}
