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
  merchants?: NestedFacetDto[];
  brands?: NestedFacetDto[];
  categories?: NestedFacetDto[];
  labels?: NestedFacetDto[];
  priceRanges?: RangeFacetDto[];
}

export interface NestedFacetDto {
  value: string;
  name: string;
  count: number;
  subfacets?: NestedFacetDto[];
}

export interface RangeFacetDto {
  priceRange: 'cheap' | 'average' | 'expensive';
  from?: number;
  to?: number;
  count: number;
}
