import { IConstraint } from './IConstraint';

export class ConstraintRegistry {
  private constraints = new Map<string, IConstraint>();

  public register(constraint: IConstraint): void {
    if (this.constraints.has(constraint.constraintId)) {
      throw new Error(`Constraint ${constraint.constraintId} is already registered.`);
    }
    this.constraints.set(constraint.constraintId, constraint);
  }

  public get(constraintId: string): IConstraint | undefined {
    return this.constraints.get(constraintId);
  }
}
