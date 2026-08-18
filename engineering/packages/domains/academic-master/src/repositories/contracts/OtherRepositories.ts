// Pure domain interfaces for the remaining aggregates
export interface ICurriculumRepository {
  findById(id: string): Promise<any | null>;
  save(entity: any): Promise<void>;
}

export interface ICourseRepository {
  findById(id: string): Promise<any | null>;
  save(entity: any): Promise<void>;
}

export interface IAcademicCalendarRepository {
  findById(id: string): Promise<any | null>;
  save(entity: any): Promise<void>;
}

export interface IBuildingRepository {
  findById(id: string): Promise<any | null>;
  save(entity: any): Promise<void>;
}

export interface IRoomRepository {
  findById(id: string): Promise<any | null>;
  save(entity: any): Promise<void>;
}

export interface ILecturerRepository {
  findById(id: string): Promise<any | null>;
  save(entity: any): Promise<void>;
}
