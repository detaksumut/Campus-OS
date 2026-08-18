import { IdentityProvisioned_v1, IdentityActivated_v1, IdentitySuspended_v1, DomainEvent } from './events/IdentityEvents';

export enum IdentityStatus {
    Provisioned = 'Provisioned',
    Active = 'Active',
    Suspended = 'Suspended',
    Locked = 'Locked',
    Archived = 'Archived',
    Deprovisioned = 'Deprovisioned'
}

export class IdentityAggregate {
    private _userId: string;
    private _primaryIdentifier: string;
    private _identityCategory: string;
    private _tenantId: string;
    private _status: IdentityStatus;
    private _events: DomainEvent[] = [];

    private constructor(userId: string, primaryIdentifier: string, identityCategory: string, tenantId: string) {
        this._userId = userId;
        this._primaryIdentifier = primaryIdentifier;
        this._identityCategory = identityCategory;
        this._tenantId = tenantId;
        this._status = IdentityStatus.Provisioned;
    }

    public static provision(userId: string, primaryIdentifier: string, identityCategory: string, tenantId: string): IdentityAggregate {
        const identity = new IdentityAggregate(userId, primaryIdentifier, identityCategory, tenantId);
        identity.addEvent(new IdentityProvisioned_v1(userId, identityCategory, primaryIdentifier, tenantId));
        return identity;
    }

    public activate(): void {
        if (this._status !== IdentityStatus.Provisioned && this._status !== IdentityStatus.Suspended && this._status !== IdentityStatus.Locked) {
            throw new Error(`Cannot activate identity from status ${this._status}`);
        }
        this._status = IdentityStatus.Active;
        this.addEvent(new IdentityActivated_v1(this._userId));
    }

    public suspend(reason: string): void {
        if (this._status !== IdentityStatus.Active) {
            throw new Error(`Cannot suspend identity from status ${this._status}`);
        }
        this._status = IdentityStatus.Suspended;
        this.addEvent(new IdentitySuspended_v1(this._userId, reason));
    }

    public lock(): void {
        this._status = IdentityStatus.Locked;
        // Event can be added
    }

    public unlock(): void {
        if (this._status === IdentityStatus.Locked) {
            this._status = IdentityStatus.Active;
        }
    }

    public archive(): void {
        this._status = IdentityStatus.Archived;
    }

    public restore(): void {
        if (this._status === IdentityStatus.Archived) {
            this._status = IdentityStatus.Active; // or suspended based on previous state
        }
    }

    public deprovision(): void {
        this._status = IdentityStatus.Deprovisioned;
    }

    private addEvent(event: DomainEvent): void {
        this._events.push(event);
    }

    public getUncommittedEvents(): DomainEvent[] {
        return [...this._events];
    }

    public clearEvents(): void {
        this._events = [];
    }

    get userId(): string { return this._userId; }
    get status(): IdentityStatus { return this._status; }
}
