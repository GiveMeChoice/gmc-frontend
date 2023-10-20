import { ProductDocument } from './document/product.document';

export interface ISearchFunctionResponse {
  hits: number;
  query?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
  data?: ProductDocument[];
  error?: string;
  facets?: ISearchFunctionFacets;
}

export interface ISearchFunctionFacets {
  merchants?: INestedFacet[];
  brands?: IGenericFacet[];
  categories?: INestedFacet[];
  labels?: INestedFacet[];
  priceRanges?: IRangeFacet[];
}

export interface INestedFacet extends IGenericFacet {
  subfacets?: INestedFacet[];
}

export interface IGenericFacet {
  value: string;
  name: string;
  count: number;
}

export interface IRangeFacet {
  priceRange: 'low' | 'mid' | 'high';
  from?: number;
  to?: number;
  count: number;
}
