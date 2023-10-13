export interface SearchFunctionRequestDto {
  query?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
  filters: SearchFunctionFiltersDto;
}

export interface SearchFunctionFiltersDto {
  region?: string;
  merchant?: string;
  brand?: KeyedFilterDto;
  category?: NestedFilterDto;
  labels?: NestedFilterDto[];
  priceRange?: 'cheap' | 'average' | 'expensive';
}

export interface NestedFilterDto {
  value: string;
  name: string;
  subfilter?: NestedFilterDto;
}

export interface KeyedFilterDto {
  key: string;
  name: string;
  value: string;
}
