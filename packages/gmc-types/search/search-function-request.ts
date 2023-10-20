export interface ISearchFunctionRequest {
  query?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
  filters: ISearchFunctionFilters;
}

export interface ISearchFunctionFilters {
  region?: string;
  merchant?: string;
  brand?: IGenericFilter;
  category?: INestedFilter;
  labels?: INestedFilter[];
  priceRange?: 'low' | 'mid' | 'high';
}

export interface INestedFilter extends IGenericFilter {
  subfilter?: INestedFilter;
}

export interface IGenericFilter {
  value: string;
  name: string;
}
