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
  brand?: SearchFunctionKeyedFilterDto;
  category?: SearchFunctionNestedFilterDto;
  labels?: SearchFunctionNestedFilterDto[];
  priceRange?: 'cheap' | 'average' | 'expensive';
}

export interface SearchFunctionNestedFilterDto {
  value: string;
  subfilter?: SearchFunctionNestedFilterDto;
}

export interface SearchFunctionKeyedFilterDto {
  key: string;
  value: string;
}
