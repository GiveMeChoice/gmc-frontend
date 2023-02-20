import { SearchResponse } from 'elasticsearch';
import { ProductEntity } from '../product';

export type SearchResult = SearchResponse<ProductEntity>;
