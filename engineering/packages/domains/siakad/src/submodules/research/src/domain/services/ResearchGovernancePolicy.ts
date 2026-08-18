import { ResearchProject } from '../entities/ResearchProject';
import { ResearchMilestone } from '../entities/ResearchMilestone';
import { MilestoneStatus, OutputType, ProjectStatus } from '../types/ResearchEnums';

export class ResearchGovernancePolicy {
  /**
   * Validates if a milestone can be started based on its dependencies.
   */
  static canStartMilestone(project: ResearchProject, targetMilestoneId: string): boolean {
    const target = project.allMilestones.find(m => m.id.getValue() === targetMilestoneId);
    if (!target) return false;

    if (!target.dependency) return true; // No dependency, can start

    const dependentMilestone = project.allMilestones.find(m => m.id.getValue() === target.dependency?.getValue());
    if (!dependentMilestone) return false;

    return dependentMilestone.currentStatus === MilestoneStatus.ACHIEVED;
  }

  /**
   * Validates if a project can be marked as COMPLETED.
   * Requires all milestones to be ACHIEVED and at least one Output registered.
   */
  static canCompleteProject(project: ResearchProject): boolean {
    if (project.currentStatus !== ProjectStatus.IN_PROGRESS) return false;

    const allMilestonesAchieved = project.allMilestones.every(m => m.currentStatus === MilestoneStatus.ACHIEVED);
    if (!allMilestonesAchieved) return false;

    if (project.allOutputs.length === 0) return false;

    return true;
  }
}
