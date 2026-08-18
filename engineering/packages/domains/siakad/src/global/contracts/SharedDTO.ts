export interface PaginationDTO {
  page: number;
  limit: number;
  total: number;
}

export interface StandardResponseDTO<T> {
  data: T;
  meta?: any;
}
