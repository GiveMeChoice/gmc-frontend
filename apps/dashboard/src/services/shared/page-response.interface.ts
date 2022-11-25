export interface PageMeta {
  count?: number;
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  sort?: string;
  direction?: string;
}

export interface PageResponse<T> {
  meta: PageMeta;
  data: T[];
}
