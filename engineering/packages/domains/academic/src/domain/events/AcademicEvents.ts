export interface DomainEvent {
    eventId: string;
    occurredOn: Date;
    version: number;
}

export class CampusCreated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly campusId: string,
        public readonly name: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class FacultyCreated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly facultyId: string,
        public readonly name: string,
        public readonly campusId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudyProgramCreated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly programId: string,
        public readonly name: string,
        public readonly parentId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class AcademicYearOpened_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly academicYearId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class AcademicYearClosed_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly academicYearId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class AcademicTermOpened_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly academicTermId: string,
        public readonly academicYearId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudyProgramArchived_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly programId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

// ==========================================
// Student Lifecycle Events (Phase 2)
// ==========================================

export class StudentRegistered_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly studentId: string,
        public readonly identityUserId: string,
        public readonly termId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentActivated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly studentId: string,
        public readonly termId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentOnLeave_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly studentId: string,
        public readonly termId: string,
        public readonly reason: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentReturned_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly studentId: string,
        public readonly termId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentGraduated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly studentId: string,
        public readonly termId: string,
        public readonly judiciumDate: Date
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentDismissed_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly studentId: string,
        public readonly termId: string,
        public readonly reason: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentDroppedOut_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly studentId: string,
        public readonly termId: string,
        public readonly reason: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

// ==========================================
// Course & Curriculum Events (Phase 3)
// ==========================================

export class CourseCreated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly courseId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseUpdated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly courseId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseArchived_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly courseId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CurriculumCreated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly curriculumId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CurriculumActivated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly curriculumId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CurriculumArchived_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly curriculumId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseAssignedToCurriculum_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly curriculumId: string,
        public readonly courseId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseRemovedFromCurriculum_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly curriculumId: string,
        public readonly courseId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class PrerequisiteDefined_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly prerequisiteId: string,
        public readonly courseId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

// ==========================================
// Course Offering Events (Phase 4)
// ==========================================

export class CourseOfferingCreated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseOfferingPublished_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseOfferingOpenedForEnrollment_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseOfferingClosedForEnrollment_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseOfferingStarted_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseOfferingCompleted_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CourseOfferingCancelled_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly offeringId: string, public readonly reason: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class LecturerAssigned_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly offeringId: string,
        public readonly assignmentId: string,
        public readonly lecturerId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class LecturerUnassigned_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly offeringId: string,
        public readonly assignmentId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class ScheduleAssigned_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly offeringId: string,
        public readonly scheduleId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class ScheduleChanged_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly offeringId: string,
        public readonly scheduleId: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

// ==========================================
// Enrollment Events (Phase 5)
// ==========================================

export class EnrollmentCreated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentItemAdded_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string, public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentItemDropped_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string, public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentSubmitted_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentRejected_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentApproved_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentFinalized_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentAddDropOpened_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentReFinalized_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentWaitlisted_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly enrollmentId: string, public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class EnrollmentSeatConfirmed_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;
    constructor(public readonly enrollmentId: string, public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

// ==========================================
// Class Meeting & Attendance Events (Phase 6)
// ==========================================

export class ClassMeetingScheduled_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string, public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class ClassMeetingStarted_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class ClassMeetingCompleted_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class ClassMeetingFinalized_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class ClassMeetingCancelled_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class AttendanceSessionOpened_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string, public readonly sessionId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class AttendanceSessionClosed_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string, public readonly sessionId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentAttendanceRecorded_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string, public readonly studentId: string, public readonly status: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentAttendanceCorrected_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string, public readonly studentId: string, public readonly newStatus: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentMarkedAbsent_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly classMeetingId: string, public readonly studentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}


// ==========================================
// Assessment & Grading Events (Phase 7)
// ==========================================

export class AssessmentSchemeDefined_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly schemeId: string, public readonly offeringId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class AssessmentSchemePublished_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly schemeId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class AssessmentSchemeLocked_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly schemeId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentComponentScored_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly assessmentResultId: string, public readonly componentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentGradeCalculated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly assessmentResultId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentGradeSubmitted_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly assessmentResultId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentGradeFinalized_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly assessmentResultId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class GradeCorrectionRequested_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly correctionRequestId: string, public readonly assessmentResultId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class GradeCorrectionApproved_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly correctionRequestId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class GradeCorrectionRejected_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly correctionRequestId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentGradeCorrected_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly assessmentResultId: string, public readonly correctionRequestId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

// ==========================================
// Academic Progression Events (Phase 8)
// ==========================================

export class SemesterProgressionEvaluated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly resultId: string, public readonly studentId: string, public readonly termId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class CumulativeProgressionEvaluated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly studentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class AcademicStandingChanged_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly studentId: string, public readonly newStanding: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class ProgressionInvalidated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly studentId: string, public readonly termId: string, public readonly reason: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class ProgressionReevaluated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly resultId: string, public readonly studentId: string, public readonly termId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

// ==========================================
// Graduation & Yudisium Events (Phase 9)
// ==========================================

export class GraduationEligibilityEvaluated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly evaluationId: string, public readonly studentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class GraduationEligibilityInvalidated_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly evaluationId: string, public readonly studentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentSubmittedToYudisium_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly studentId: string, public readonly sessionId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class YudisiumSessionOpened_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly sessionId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class YudisiumDecisionRecorded_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly decisionId: string, public readonly studentId: string, public readonly sessionId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class YudisiumSessionFinalized_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly sessionId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

// These are the authoritative cross-domain events for Student Lifecycle
export class StudentGraduationApproved_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(
        public readonly decisionId: string, 
        public readonly studentId: string, 
        public readonly degreeCode: string
    ) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentGraduationDeferred_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly decisionId: string, public readonly studentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}

export class StudentGraduationRejected_v1 implements DomainEvent {
    public readonly version = 1;
    public readonly eventId: string;
    public readonly occurredOn: Date;

    constructor(public readonly decisionId: string, public readonly studentId: string) {
        this.eventId = crypto.randomUUID();
        this.occurredOn = new Date();
    }
}
