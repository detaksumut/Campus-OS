import { CourseOffering } from '../../domain/entities/CourseOffering';
import { CourseOfferingId, AcademicPeriodId } from '../../domain/value-objects/CourseOfferingValueObjects';

export interface ICourseOfferingRepository {
  save(offering: CourseOffering): Promise<void>;
  findById(id: CourseOfferingId): Promise<CourseOffering | null>;
  findByPeriod(periodId: AcademicPeriodId): Promise<CourseOffering[]>;
}
