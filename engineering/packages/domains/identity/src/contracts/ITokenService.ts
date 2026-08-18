import { IdentityContext } from './IdentityContext';

export interface ITokenService {
    issueToken(context: IdentityContext): Promise<string>;
    validateToken(token: string): Promise<IdentityContext>;
    revokeToken(token: string): Promise<void>;
}
