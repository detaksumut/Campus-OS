import { MilestoneId } from '../value-objects/ResearchValueObjects';
import { MilestoneStatus } from '../types/ResearchEnums';

export class ResearchMilestone {
  constructor(
    private readonly milestoneId: MilestoneId,
    private title: string,
    private description: string,
    private targetDate: Date,
    private dependentMilestoneId: MilestoneId | null = null,
    private status: MilestoneStatus = MilestoneStatus.PENDING
  ) {}

  get id(): MilestoneId { return this.milestoneId; }
  get currentTitle(): string { return this.title; }
  get currentDescription(): string { return this.description; }
  get target(): Date { return this.targetDate; }
  get dependency(): MilestoneId | null { return this.dependentMilestoneId; }
  get currentStatus(): MilestoneStatus { return this.status; }

  start(): void {
    if (this.status !== MilestoneStatus.PENDING && this.status !== MilestoneStatus.DELAYED) {
      throw new Error('Can only start PENDING or DELAYED milestones.');
    }
    this.status = MilestoneStatus.IN_PROGRESS;
  }

  achieve(): void {
    if (this.status !== MilestoneStatus.IN_PROGRESS) throw new Error('Milestone must be IN_PROGRESS before achieving.');
    this.status = MilestoneStatus.ACHIEVED;
  }

  markDelayed(): void {
    if (this.status === MilestoneStatus.ACHIEVED) throw new Error('Cannot delay an achieved milestone.');
    this.status = MilestoneStatus.DELAYED;
  }
}
