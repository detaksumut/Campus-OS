import { AcademicLevel } from '../types/MembershipEnums';

export class MembershipProfile {
  constructor(
    private readonly academicLevel: AcademicLevel,
    private affiliation: string,
    private department: string,
    private enrollmentYear: number
  ) {}

  get level(): AcademicLevel { return this.academicLevel; }

  updateAffiliation(affiliation: string, department: string): void {
    if (!affiliation || !department) throw new Error('Affiliation details cannot be empty.');
    this.affiliation = affiliation;
    this.department = department;
  }
}
