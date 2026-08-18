import { IMembershipRepository } from '../application/ports/IMembershipRepository';
import { Member } from '../domain/entities/Member';
import { MembershipProfile } from '../domain/entities/MembershipProfile';
import { DigitalMemberCard } from '../domain/entities/DigitalMemberCard';
import { MemberId, CardId } from '../domain/value-objects/MembershipValueObjects';
import { MembershipStatus, CardStatus, AcademicLevel } from '../domain/types/MembershipEnums';
import { IDatabaseExecutor } from '../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Mocking the shared platform port

export class MembershipRepositoryImpl implements IMembershipRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveMember(member: Member): Promise<void> {
    // 1. Save Member aggregate root
    const sqlMember = `
      INSERT INTO membership.members (member_id, identity_id, status)
      VALUES ($1, $2, $3)
      ON CONFLICT (member_id) DO UPDATE SET
        status = EXCLUDED.status;
    `;
    await this.db.execute(sqlMember, [
      member.id.getValue(),
      member.linkedIdentityId,
      member.currentStatus
    ]);

    // 2. Save Profile (if exists)
    if (member.currentProfile) {
      const sqlProfile = `
        INSERT INTO membership.member_profiles (member_id, academic_level, affiliation, department, enrollment_year)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (member_id) DO UPDATE SET
          academic_level = EXCLUDED.academic_level,
          affiliation = EXCLUDED.affiliation,
          department = EXCLUDED.department,
          enrollment_year = EXCLUDED.enrollment_year;
      `;
      const profile = member.currentProfile;
      await this.db.execute(sqlProfile, [
        member.id.getValue(),
        profile.level,
        profile['affiliation'],
        profile['department'],
        profile['enrollmentYear']
      ]);
    }

    // 3. Save Digital Card (if exists)
    if (member.currentCard) {
      const sqlCard = `
        INSERT INTO membership.digital_cards (card_id, member_id, verification_token, version, status, issue_date, expiration_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (card_id) DO UPDATE SET
          verification_token = EXCLUDED.verification_token,
          version = EXCLUDED.version,
          status = EXCLUDED.status,
          expiration_date = EXCLUDED.expiration_date;
      `;
      const card = member.currentCard;
      await this.db.execute(sqlCard, [
        card.id.getValue(),
        member.id.getValue(),
        card.token,
        card.currentVersion,
        card.currentStatus,
        card['issueDate'],
        card['expirationDate']
      ]);
    }
  }

  async findMemberById(memberId: MemberId): Promise<Member | null> {
    return this._fetchMemberAggregate(`SELECT * FROM membership.members WHERE member_id = $1`, [memberId.getValue()]);
  }

  async findMemberByIdentityId(identityId: string): Promise<Member | null> {
    return this._fetchMemberAggregate(`SELECT * FROM membership.members WHERE identity_id = $1`, [identityId]);
  }

  private async _fetchMemberAggregate(query: string, params: any[]): Promise<Member | null> {
    const memberRows = await this.db.query(query, params);
    if (memberRows.length === 0) return null;

    const row = memberRows[0];
    const member = new Member(
      new MemberId(row.member_id),
      row.identity_id,
      row.status as MembershipStatus
    );

    // Fetch Profile
    const profileRows = await this.db.query(`SELECT * FROM membership.member_profiles WHERE member_id = $1`, [row.member_id]);
    if (profileRows.length > 0) {
      const pRow = profileRows[0];
      const profile = new MembershipProfile(
        pRow.academic_level as AcademicLevel,
        pRow.affiliation,
        pRow.department,
        pRow.enrollment_year
      );
      member['profile'] = profile; // Internal setting to bypass state rules for hydration
    }

    // Fetch Card
    const cardRows = await this.db.query(`SELECT * FROM membership.digital_cards WHERE member_id = $1`, [row.member_id]);
    if (cardRows.length > 0) {
      const cRow = cardRows[0];
      const card = new DigitalMemberCard(
        new CardId(cRow.card_id),
        cRow.verification_token,
        cRow.version,
        cRow.status as CardStatus,
        new Date(cRow.issue_date),
        new Date(cRow.expiration_date)
      );
      member['digitalCard'] = card; // Internal setting to bypass state rules for hydration
    }

    return member;
  }
}
