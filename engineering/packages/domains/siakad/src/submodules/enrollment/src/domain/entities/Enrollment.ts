import { EnrollmentId, StudentId, ClassSectionId, StudyPlanId } from '../value-objects/EnrollmentValueObjects';
import { EnrollmentStatus } from '../types/EnrollmentEnums';

export class Enrollment {
  constructor(
    public readonly id: EnrollmentId,
    public readonly studentId: StudentId,
    public readonly classSectionId: ClassSectionId,
    public readonly studyPlanId: StudyPlanId,
    private status: EnrollmentStatus = EnrollmentStatus.ENROLLED
  ) {}

  get currentStatus(): EnrollmentStatus { return this.status; }

  drop(): void {
    if (this.status === EnrollmentStatus.DROPPED) {
      throw new Error('Enrollment is already dropped.');
    }
    this.status = EnrollmentStatus.DROPPED;
  }
}
