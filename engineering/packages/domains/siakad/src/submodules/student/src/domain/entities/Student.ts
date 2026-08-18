import { StudentId, RegistrationId, MemberId, StudyProgramId } from '../value-objects/StudentValueObjects';
import { StudentStatus } from '../types/StudentEnums';

export class AcademicLeave {
  constructor(
    public readonly id: string,
    public readonly semesterId: string,
    public readonly reason: string,
    public readonly approvedDate: Date
  ) {}
}

export class Student {
  private academicLeaves: AcademicLeave[] = [];

  constructor(
    public readonly id: StudentId,
    public readonly nim: string,
    public readonly registrationId: RegistrationId,
    public readonly memberId: MemberId,
    public readonly studyProgramId: StudyProgramId,
    public readonly enrollmentYear: number,
    private status: StudentStatus = StudentStatus.ACTIVE
  ) {}

  get currentStatus(): StudentStatus {
    return this.status;
  }

  get allLeaves(): ReadonlyArray<AcademicLeave> {
    return this.academicLeaves;
  }

  takeLeave(leave: AcademicLeave): void {
    if (this.status !== StudentStatus.ACTIVE) {
      throw new Error('Only active students can take academic leave.');
    }
    this.academicLeaves.push(leave);
    this.status = StudentStatus.LEAVE;
  }

  returnFromLeave(): void {
    if (this.status !== StudentStatus.LEAVE) {
      throw new Error('Student is not currently on leave.');
    }
    this.status = StudentStatus.ACTIVE;
  }

  graduate(): void {
    if (this.status !== StudentStatus.ACTIVE) {
      throw new Error('Student must be active to graduate.');
    }
    this.status = StudentStatus.GRADUATED;
  }
}
