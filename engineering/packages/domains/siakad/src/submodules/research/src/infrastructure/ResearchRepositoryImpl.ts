import { IResearchRepository } from '../application/ports/IResearchRepository';
import { ResearchProject } from '../domain/entities/ResearchProject';
import { ResearchProposal } from '../domain/entities/ResearchProposal';
import { ResearchMember } from '../domain/entities/ResearchMember';
import { ResearchMilestone } from '../domain/entities/ResearchMilestone';
import { FundingAllocation } from '../domain/entities/FundingAllocation';
import { ResearchOutput } from '../domain/entities/ResearchOutput';
import { ProjectId, ProposalId, MemberId, MilestoneId, OutputId, PublicationReference } from '../domain/value-objects/ResearchValueObjects';
import { ProjectStatus, ProposalStatus, MemberRole, MilestoneStatus, FundingType, OutputType } from '../domain/types/ResearchEnums';
import { IDatabaseExecutor } from '../../registration/src/infrastructure/RegistrationRepositoryImpl'; // Mocking shared platform port

export class ResearchRepositoryImpl implements IResearchRepository {
  constructor(private readonly db: IDatabaseExecutor) {}

  async saveProject(project: ResearchProject): Promise<void> {
    const sqlProject = `
      INSERT INTO research.projects (project_id, status)
      VALUES ($1, $2)
      ON CONFLICT (project_id) DO UPDATE SET
        status = EXCLUDED.status;
    `;
    await this.db.execute(sqlProject, [project.id.getValue(), project.currentStatus]);

    if (project.currentProposal) {
      const p = project.currentProposal;
      const sqlProposal = `
        INSERT INTO research.proposals (proposal_id, project_id, title, abstract_text, methodology, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (proposal_id) DO UPDATE SET
          title = EXCLUDED.title,
          abstract_text = EXCLUDED.abstract_text,
          methodology = EXCLUDED.methodology,
          status = EXCLUDED.status;
      `;
      await this.db.execute(sqlProposal, [
        p.id.getValue(),
        project.id.getValue(),
        p.currentTitle,
        p.currentAbstract,
        p.currentMethodology,
        p.currentStatus
      ]);
    }

    for (const member of project.currentMembers) {
      const sqlMember = `
        INSERT INTO research.research_members (project_id, member_id, role, assigned_at)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (project_id, member_id) DO UPDATE SET
          role = EXCLUDED.role;
      `;
      await this.db.execute(sqlMember, [
        project.id.getValue(),
        member.member.getValue(),
        member.currentRole,
        member['assignedAt']
      ]);
    }

    for (const ms of project.allMilestones) {
      const sqlMs = `
        INSERT INTO research.milestones (milestone_id, project_id, title, description, target_date, dependent_milestone_id, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (milestone_id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          target_date = EXCLUDED.target_date,
          dependent_milestone_id = EXCLUDED.dependent_milestone_id,
          status = EXCLUDED.status;
      `;
      await this.db.execute(sqlMs, [
        ms.id.getValue(),
        project.id.getValue(),
        ms.currentTitle,
        ms.currentDescription,
        ms.target,
        ms.dependency?.getValue() || null,
        ms.currentStatus
      ]);
    }

    if (project.currentFunding) {
      const f = project.currentFunding;
      const sqlFunding = `
        INSERT INTO research.funding_allocations (project_id, funding_type, amount, source_name, is_disbursed)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (project_id) DO UPDATE SET
          funding_type = EXCLUDED.funding_type,
          amount = EXCLUDED.amount,
          source_name = EXCLUDED.source_name,
          is_disbursed = EXCLUDED.is_disbursed;
      `;
      await this.db.execute(sqlFunding, [
        project.id.getValue(),
        f.type,
        f.allocatedAmount,
        f.source,
        f.disbursed
      ]);
    }

    for (const out of project.allOutputs) {
      const sqlOut = `
        INSERT INTO research.research_outputs (output_id, project_id, output_type, title, description, publication_submission_id, is_verified)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (output_id) DO UPDATE SET
          output_type = EXCLUDED.output_type,
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          publication_submission_id = EXCLUDED.publication_submission_id,
          is_verified = EXCLUDED.is_verified;
      `;
      await this.db.execute(sqlOut, [
        out.id.getValue(),
        project.id.getValue(),
        out.type,
        out.currentTitle,
        out.currentDescription,
        out.publicationReference?.getValue() || null,
        out.verified
      ]);
    }
  }

  async findProjectById(id: ProjectId): Promise<ResearchProject | null> {
    const projRows = await this.db.query(`SELECT * FROM research.projects WHERE project_id = $1`, [id.getValue()]);
    if (projRows.length === 0) return null;
    const pRow = projRows[0];

    const project = new ResearchProject(new ProjectId(pRow.project_id), pRow.status as ProjectStatus);

    const propRows = await this.db.query(`SELECT * FROM research.proposals WHERE project_id = $1`, [pRow.project_id]);
    if (propRows.length > 0) {
      const pr = propRows[0];
      const proposal = new ResearchProposal(
        new ProposalId(pr.proposal_id),
        pr.title,
        pr.abstract_text,
        pr.methodology,
        pr.status as ProposalStatus
      );
      project['proposal'] = proposal;
    }

    const memRows = await this.db.query(`SELECT * FROM research.research_members WHERE project_id = $1`, [pRow.project_id]);
    for (const mr of memRows) {
      project['members'].push(new ResearchMember(new MemberId(mr.member_id), mr.role as MemberRole, new Date(mr.assigned_at)));
    }

    const msRows = await this.db.query(`SELECT * FROM research.milestones WHERE project_id = $1`, [pRow.project_id]);
    for (const ms of msRows) {
      const dependency = ms.dependent_milestone_id ? new MilestoneId(ms.dependent_milestone_id) : null;
      project['milestones'].push(
        new ResearchMilestone(
          new MilestoneId(ms.milestone_id),
          ms.title,
          ms.description,
          new Date(ms.target_date),
          dependency,
          ms.status as MilestoneStatus
        )
      );
    }

    const funRows = await this.db.query(`SELECT * FROM research.funding_allocations WHERE project_id = $1`, [pRow.project_id]);
    if (funRows.length > 0) {
      const f = funRows[0];
      project['funding'] = new FundingAllocation(f.funding_type as FundingType, parseFloat(f.amount), f.source_name, f.is_disbursed);
    }

    const outRows = await this.db.query(`SELECT * FROM research.research_outputs WHERE project_id = $1`, [pRow.project_id]);
    for (const o of outRows) {
      const pubRef = o.publication_submission_id ? new PublicationReference(o.publication_submission_id) : null;
      project['outputs'].push(
        new ResearchOutput(
          new OutputId(o.output_id),
          o.output_type as OutputType,
          o.title,
          o.description,
          pubRef,
          o.is_verified
        )
      );
    }

    return project;
  }
}
