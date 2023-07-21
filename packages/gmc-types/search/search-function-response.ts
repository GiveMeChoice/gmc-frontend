import { ProductDocument } from './document/product.document';

export interface SearchFunctionResponseDto {
  hits: number;
  query?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
  data?: ProductDocument[];
  error?: string;
  facets?: SearchFunctionFacetsDto;
}

export interface SearchFunctionFacetsDto {
  merchants?: TermFacetDto[];
  brands?: TermFacetDto[];
  categories?: TermFacetDto[];
  labels?: TermFacetDto[];
  priceRanges?: RangeFacetDto[];
}

export interface TermFacetDto {
  key?: string;
  value: string;
  count: number;
  subfacets?: TermFacetDto[];
}

export interface RangeFacetDto {
  priceRange: 'cheap' | 'average' | 'expensive';
  from?: number;
  to?: number;
  count: number;
}
