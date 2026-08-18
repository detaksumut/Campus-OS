import { describe, it, expect, vi } from 'vitest';
import { IdentityContext } from '@campus-os/identity/src/contracts';
import { StudentLifecycleService } from '../../src/runtime/services/StudentLifecycleService';
import { CurriculumService } from '../../src/runtime/services/CurriculumService';
import { CourseOfferingService } from '../../src/runtime/services/CourseOfferingService';
import { EnrollmentService } from '../../src/runtime/services/EnrollmentService';
import { ClassMeeting } from '../../src/domain/entities/ClassMeeting';
import { AttendanceService } from '../../src/runtime/services/AttendanceService';
import { AssessmentService } from '../../src/runtime/services/AssessmentService';
import { ProgressionService } from '../../src/runtime/services/ProgressionService';
import { GraduationApplicationService } from '../../src/runtime/services/GraduationApplicationService';
import { YudisiumService } from '../../src/domain/services/YudisiumService';
import { GraduationEligibilityService } from '../../src/domain/services/GraduationEligibilityService';

describe('Academic Core E2E Lifecycle', () => {
    it('Golden Path: Registration to Graduation', async () => {
        // Mock Identity Context
        const context: IdentityContext = {
            userId: 'admin-1',
            sessionId: 'sess-1',
            permissions: [
                'academic.student.register',
                'academic.curriculum.assign',
                'academic.courseoffering.create',
                'academic.enrollment.approve',
                'academic.attendance.finalize',
                'academic.assessment.submit',
                'academic.assessment.finalize',
                'academic.progression.evaluate',
                'academic.graduation.evaluate',
                'academic.yudisium.manage',
                'academic.yudisium.decide',
                'academic.yudisium.finalize'
            ]
        };

        // Mock Providers
        const masterDataProvider = {
            getCourse: vi.fn(),
            getCurriculum: vi.fn(),
            getStudyProgram: vi.fn(),
            getTerm: vi.fn()
        };
        const studentProvider = {
            getStudent: vi.fn()
        };
        const courseOfferingProvider = {
            getCourseOffering: vi.fn()
        };
        const enrollmentProvider = {
            getEnrollment: vi.fn()
        };
        const assessmentProvider = {
            getScheme: vi.fn(),
            getStudentResult: vi.fn()
        };
        const progressionProvider = {
            getCumulativeResult: vi.fn().mockResolvedValue({
                studentId: 'STD-1',
                ipk: 3.5,
                totalCreditsEarned: 144
            }),
            getAcademicStanding: vi.fn()
        };

        // Instantiate Services
        const studentService = new StudentLifecycleService();
        const curriculumService = new CurriculumService();
        const offeringService = new CourseOfferingService(masterDataProvider as any);
        const enrollmentService = new EnrollmentService(studentProvider as any, courseOfferingProvider as any);
        const attendanceService = new AttendanceService(enrollmentProvider as any);
        const assessmentService = new AssessmentService(assessmentProvider as any);
        const progressionService = new ProgressionService({
            evaluateTermProgression: vi.fn(),
            invalidateProgression: vi.fn()
        } as any);

        const requirementPolicy = {
            evaluateRequirements: vi.fn().mockReturnValue([]) // Return empty array of failures
        };
        const eligibilityService = new GraduationEligibilityService(requirementPolicy as any);
        const yudisiumService = new YudisiumService();
        const graduationService = new GraduationApplicationService(progressionProvider as any, eligibilityService, yudisiumService);

        // 1. Student Registration
        const student = studentService.registerStudent(context, 'Identity-1', 'PROG-1');
        expect(student).toBeDefined();

        // 2. Curriculum Assignment
        const curriculumAssignment = curriculumService.assignCurriculum(context, student.studentId, 'CURR-2026');
        expect(curriculumAssignment.curriculumId).toBe('CURR-2026');

        // 3. Course Offering
        masterDataProvider.getCourse.mockResolvedValue({ courseId: 'COURSE-1', credits: 3 });
        const offering = await offeringService.createOffering(context, 'TERM-1', 'COURSE-1', 'PROG-1', 'Class A', 40);
        expect(offering).toBeDefined();

        // 4. Enrollment
        const enrollment = enrollmentService.createDraftEnrollment(context, student.studentId, 'TERM-1', 'ADV-1');
        enrollmentService.addItem(context, enrollment, offering.offeringId);
        enrollmentService.approveEnrollment(context, enrollment, 'ADV-1');
        expect(enrollment.status).toBe('Approved');

        // 5. Attendance Finalization
        // In a real system, we'd create a class meeting and finalize it.
        const meeting = new ClassMeeting('MEET-1', offering.offeringId, new Date(), new Date(), 'Location', 'Scheduled', []);
        meeting.finalize();
        expect(meeting.status).toBe('Finalized');
        
        // 6. Assessment Finalization
        // Skipped detailed mock for brevity, but we call the service.
        assessmentService.submitGrade(context, 'RES-1', 'LEC-1', 90);
        assessmentService.finalizeGrade(context, 'RES-1');

        // 7. Progression Evaluation
        progressionService.evaluateTermProgression(context, student.studentId, 'TERM-1');
        
        // 8. Graduation Eligibility
        const eligibility = await graduationService.evaluateEligibility(
            context, student.studentId, 'CURR-2026', 1, 144, [], 1
        );
        expect(eligibility.status).toBe('Eligible');

        // 9. Yudisium Approval
        const session = graduationService.createYudisiumSession(context, 'TERM-1', 'Yudisium 2026', new Date());
        graduationService.openYudisiumSession(context, session);
        graduationService.startDeliberation(context, session);
        
        graduationService.recordDecision(
            context, session, eligibility, 'Approved', {
                degreeId: 'DEG-1',
                degreeCode: 'S.Kom',
                degreeName: 'Sarjana Komputer',
                degreeAbbreviation: 'S.Kom',
                studyProgramId: 'PROG-1',
                regulationVersion: 1
            }, 'Approved by ARB'
        );

        graduationService.finalizeSession(context, session);
        expect(session.status).toBe('Finalized');
        expect(session.decisions[0].status).toBe('Approved');
    });
});
