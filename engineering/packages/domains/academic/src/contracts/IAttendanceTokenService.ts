export interface IAttendanceTokenService {
    /**
     * Generates a secure token reference for an attendance session.
     * The actual security token is managed externally (e.g., redis, secret manager).
     */
    generateToken(sessionId: string, validFrom: Date, expiresAt: Date): Promise<string>;
    
    /**
     * Verifies if a given token string matches the reference for the session.
     */
    verifyToken(sessionId: string, tokenString: string): Promise<boolean>;
}
