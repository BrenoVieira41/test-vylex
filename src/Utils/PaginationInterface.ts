export interface Pagination {
  size?: number | string;
  offset?: number | string;
}

export enum OrderEnum {
  asc = 'asc',
  desc = 'desc'
}

export interface PaginationType<T> {
  data: Array<T>;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    lastPage: boolean;
    firstPage: boolean;
    total: number;
  };
}
