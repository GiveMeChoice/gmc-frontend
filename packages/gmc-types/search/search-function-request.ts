export interface SearchFunctionRequestDto {
  query?: string;
  page?: number;
  pageSize?: number;
  filters: SearchFunctionFiltersDto;
}

export interface SearchFunctionFiltersDto {
  region?: string;
  store?: string;
  brand?: string;
  category?: string;
  subcategory1?: string;
  subcategory2?: string;
  label?: string;
  sublabel1?: string;
  sublabel2?: string;
  priceRange?: 'cheap' | 'average' | 'expensive';
}
