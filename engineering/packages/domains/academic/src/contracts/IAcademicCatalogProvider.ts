import { ICourseCatalogProvider } from './ICourseCatalogProvider';
import { ICurriculumProvider } from './ICurriculumProvider';

export interface IAcademicCatalogProvider extends ICourseCatalogProvider, ICurriculumProvider {}
