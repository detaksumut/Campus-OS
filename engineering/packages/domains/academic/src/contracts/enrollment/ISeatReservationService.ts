export interface ISeatReservationService {
    /**
     * Atomically reserve a seat in a Course Offering.
     * Must handle concurrency using DB locks, redis, or equivalent.
     * @returns true if successful, false if quota is full
     */
    reserveSeat(offeringId: string): Promise<boolean>;

    /**
     * Release a previously reserved seat.
     */
    releaseSeat(offeringId: string): Promise<void>;
}
