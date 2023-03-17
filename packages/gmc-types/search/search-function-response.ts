import { SearchProductDto } from './product/search-product.dto';

export interface SearchFunctionResponseDto {
  hits: number;
  page?: number;
  pageSize?: number;
  data?: SearchProductDto[];
  error?: string;
  facets?: SearchFunctionFacetsDto;
}

export interface SearchFunctionFacetsDto {
  stores?: TermFacetDto[];
  brands?: TermFacetDto[];
  categories?: TermFacetDto[];
  labels?: TermFacetDto[];
  priceRanges?: RangeFacetDto;
}

export interface TermFacetDto {
  value: string;
  count: number;
  subfacets?: TermFacetDto[];
}

export interface RangeFacetDto {
  from?: number;
  to?: number;
  count: number;
}
