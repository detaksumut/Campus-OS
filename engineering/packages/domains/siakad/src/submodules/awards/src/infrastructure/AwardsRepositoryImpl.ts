import { IAwardsRepository } from '../application/ports/IAwardsRepository';
import { AwardProgram } from '../domain/entities/AwardProgram';
import { AwardNomination } from '../domain/entities/AwardNomination';
import { AwardCommittee } from '../domain/entities/AwardCommittee';
import { EvaluationSession } from '../domain/entities/EvaluationSession';
import { AwardDecision } from '../domain/entities/AwardDecision';
import { AwardRecipient } from '../domain/entities/AwardRecipient';
import { AwardId, NominationId, CommitteeId, EvaluationId, EvidenceReference } from '../domain/value-objects/AwardsValueObjects';
import { AwardCategory, AwardCycle, AwardStatus, SourceContext, RecommendationType, AwardDecisionType } from '../domain/types/AwardsEnums';
import { IDatabaseExecutor } from '../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Shared platform port

export class AwardsRepositoryImpl implements IAwardsRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveAwardProgram(program: AwardProgram): Promise<void> {
    const sqlProg = `
      INSERT INTO awards.award_programs (award_id, name, category, cycle, allow_self_nomination, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (award_id) DO UPDATE SET
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        cycle = EXCLUDED.cycle,
        allow_self_nomination = EXCLUDED.allow_self_nomination,
        status = EXCLUDED.status;
    `;
    await this.db.execute(sqlProg, [
      program.id.getValue(),
      program.currentName,
      program.currentCategory,
      program.currentCycle,
      program.canSelfNominate,
      program.currentStatus
    ]);

    for (const nom of program.allNominations) {
      // Serialize evidence as JSON to avoid complex junction tables for Value Objects
      const evidenceJson = JSON.stringify(nom.allEvidence);
      const sqlNom = `
        INSERT INTO awards.award_nominations (nomination_id, award_id, nominee_id, nominator_id, evidence)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (nomination_id) DO UPDATE SET
          evidence = EXCLUDED.evidence;
      `;
      await this.db.execute(sqlNom, [
        nom.id.getValue(),
        program.id.getValue(),
        nom.nominee,
        nom.nominator,
        evidenceJson
      ]);
    }

    for (const cm of program.allCommittee) {
      const sqlCm = `
        INSERT INTO awards.award_committees (committee_id, award_id, evaluator_id, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (committee_id) DO UPDATE SET
          role = EXCLUDED.role;
      `;
      await this.db.execute(sqlCm, [
        cm.id.getValue(),
        program.id.getValue(),
        cm.evaluator,
        cm.currentRole
      ]);
    }

    for (const ev of program.allEvaluations) {
      const sqlEv = `
        INSERT INTO awards.evaluation_sessions (evaluation_id, award_id, nomination_id, evaluator_id, weighted_score, comments, recommendation)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (evaluation_id) DO UPDATE SET
          weighted_score = EXCLUDED.weighted_score,
          comments = EXCLUDED.comments,
          recommendation = EXCLUDED.recommendation;
      `;
      await this.db.execute(sqlEv, [
        ev.id.getValue(),
        program.id.getValue(),
        ev.nomination.getValue(),
        ev.evaluator,
        ev.score,
        ev.currentComments,
        ev.currentRecommendation
      ]);
    }

    for (const dec of program.allDecisions) {
      const sqlDec = `
        INSERT INTO awards.award_decisions (nomination_id, award_id, decision, summary_remarks)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (nomination_id) DO UPDATE SET
          decision = EXCLUDED.decision,
          summary_remarks = EXCLUDED.summary_remarks;
      `;
      await this.db.execute(sqlDec, [
        dec.nomination.getValue(),
        program.id.getValue(),
        dec.currentDecision,
        dec.currentRemarks
      ]);
    }

    for (const rec of program.allRecipients) {
      const sqlRec = `
        INSERT INTO awards.award_recipients (award_id, member_id, conferral_date)
        VALUES ($1, $2, $3)
        ON CONFLICT (award_id, member_id) DO NOTHING;
      `;
      await this.db.execute(sqlRec, [
        rec.award.getValue(),
        rec.recipientId,
        rec.dateConferred
      ]);
    }
  }

  async findAwardProgramById(id: AwardId): Promise<AwardProgram | null> {
    const pRows = await this.db.query(`SELECT * FROM awards.award_programs WHERE award_id = $1`, [id.getValue()]);
    if (pRows.length === 0) return null;
    const pRow = pRows[0];

    const program = new AwardProgram(
      new AwardId(pRow.award_id),
      pRow.name,
      pRow.category as AwardCategory,
      pRow.cycle as AwardCycle,
      pRow.allow_self_nomination,
      pRow.status as AwardStatus
    );

    const nomRows = await this.db.query(`SELECT * FROM awards.award_nominations WHERE award_id = $1`, [id.getValue()]);
    for (const nom of nomRows) {
      const evidenceList: EvidenceReference[] = [];
      if (nom.evidence) {
        const evData = JSON.parse(nom.evidence);
        evData.forEach((e: any) => {
          evidenceList.push(new EvidenceReference(e.evidenceType, e.referenceId, e.sourceContext as SourceContext));
        });
      }
      program['nominations'].push(
        new AwardNomination(new NominationId(nom.nomination_id), nom.nominee_id, nom.nominator_id, evidenceList)
      );
    }

    const cmRows = await this.db.query(`SELECT * FROM awards.award_committees WHERE award_id = $1`, [id.getValue()]);
    for (const cm of cmRows) {
      program['committee'].push(new AwardCommittee(new CommitteeId(cm.committee_id), cm.evaluator_id, cm.role));
    }

    const evRows = await this.db.query(`SELECT * FROM awards.evaluation_sessions WHERE award_id = $1`, [id.getValue()]);
    for (const ev of evRows) {
      program['evaluations'].push(
        new EvaluationSession(
          new EvaluationId(ev.evaluation_id),
          new NominationId(ev.nomination_id),
          ev.evaluator_id,
          ev.weighted_score,
          ev.comments,
          ev.recommendation as RecommendationType
        )
      );
    }

    const decRows = await this.db.query(`SELECT * FROM awards.award_decisions WHERE award_id = $1`, [id.getValue()]);
    for (const dec of decRows) {
      program['decisions'].push(
        new AwardDecision(new NominationId(dec.nomination_id), dec.decision as AwardDecisionType, dec.summary_remarks)
      );
    }

    const recRows = await this.db.query(`SELECT * FROM awards.award_recipients WHERE award_id = $1`, [id.getValue()]);
    for (const rec of recRows) {
      program['recipients'].push(
        new AwardRecipient(new AwardId(rec.award_id), rec.member_id, new Date(rec.conferral_date))
      );
    }

    return program;
  }
}
