export interface ICourseCatalogProvider {
    getCourseById(courseId: string): Promise<any>;
    searchCourses(query: string): Promise<any[]>;
    getPrerequisites(courseId: string): Promise<any[]>;
}
