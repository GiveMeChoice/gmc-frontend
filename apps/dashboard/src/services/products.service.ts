import { IData, DataAction } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface IProduct {
  id: string;
  providerId: string;
  source: {
    id?: string;
    identifier?: string;
    description?: string;
    status?: string;
  };
  provider?: {
    id?: string;
    key?: string;
  };
  providerProductId: string;
  shortId: string;
  createdAt: Date;
  updatedAt: Date;
  integrationStatus: string;
  sourceId: string;
  createdByRunId: string;
  refreshedByRunId: string;
  refreshedAt: Date;
  refreshReason: string;
  sourceDate: Date;
  expiresAt: Date;
  keepAliveCount: number;
  hasIntegrationError: boolean;
  errorMessage: string;
  // PRODUCT DATA
  sku: string;
  title: string;
  description: string;
  rating: number;
  ratingsTotal: number;
  price: number;
  currency: string;
  brand: {
    code: string;
    description: string;
  };
  listImage: string;
  mainImage: string;
  secondaryImage: string;
  offerLink: string;
  reviews: Review[];
  labels: Label[];
  label?: {
    code?: string;
    groupId?: string;
  };
  category?: {
    code?: string;
    groupId?: string;
  };
}

export type Review = {
  author: string;
  text: string;
  rating: number;
  submittedOn: Date;
};

export type Label = {
  title: string;
  infoLink: string;
  icon: string;
  description: string;
};

export type ExtractResult = {
  sourceDate: Date;
  fromCache: boolean;
  data: any;
};

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IProduct>> => {
  const res = await axios.post<PageResponse<IProduct>>(
    '/products/find',
    extractProductFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IProduct>> => {
  const res = await axios.get<PageResponse<IProduct>>('/products', {
    params: pageRequest,
  });
  return res.data;
};

const getOne = async (id: string): Promise<IProduct> => {
  const res = await axios.get<IProduct>(`/products/${id}`);
  return res.data;
};

const update = async (
  id: string,
  updates: Partial<IProduct>
): Promise<IProduct> => {
  const res = await axios.put<IProduct>(`/products/${id}`, updates);
  return res.data;
};

const extract = async (
  id: string,
  skipCache = false
): Promise<ExtractResult> => {
  const res = await axios.post(
    '/extract-product',
    {},
    { params: { id, skipCache } }
  );
  return res.data;
};

const map = async (id: string): Promise<Partial<IProduct>> => {
  const res = await axios.post('/map-product', {}, { params: { id } });
  return res.data;
};

const refresh = async (id: string): Promise<IProduct> => {
  const res = await axios.post('/refresh-product', {}, { params: { id } });
  return res.data;
};

const search = async (q: string): Promise<IProduct[]> => {
  const res = await axios.post(`/products/search?q=${q}`);
  return res.data;
};

const extractProductFilters = (filters: IFilters): Partial<IProduct> => ({
  ...(filters.productIntegrationError && { hasIntegrationError: true }),
  ...(filters.providerId && { provider: { id: filters.providerId } }),
  ...(filters.productStatus && {
    integrationStatus: filters.productStatus,
  }),
  ...(filters.productShortId && { shortId: filters.productShortId }),
  ...(filters.productProviderId && {
    providerProductId: filters.productProviderId,
  }),
  source: {
    ...(filters.sourceActivation && {
      active: filters.sourceActivation === 'active',
    }),
    ...(filters.sourceIdentifier && {
      identifier: filters.sourceIdentifier,
    }),
    ...(filters.sourceStatus && {
      status: filters.sourceStatus,
    }),
  },
  label: {
    ...(filters.labelCode && {
      code: filters.labelCode,
    }),
    ...(filters.labelGroupId && { groupId: filters.labelGroupId }),
  },
  category: {
    ...(filters.categoryCode && { code: filters.categoryCode }),
    ...(filters.categoryGroupId && { groupId: filters.categoryGroupId }),
  },
});

const productsScreenControl: IScreenControl = {
  pathname: '/products',
  title: 'Products',
  readScreenMeta(data) {
    return data.productsMeta;
  },
  async refreshFilters(filters: IFilters, data: IData): Promise<DataAction> {
    return {
      type: 'REFRESH_PRODUCTS',
      value: await find(filters, data.productsMeta),
    };
  },
  async refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction> {
    return {
      type: 'REFRESH_PRODUCTS',
      value: await find(filters, page),
    };
  },
  async refreshSort(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IData
  ): Promise<DataAction> {
    return {
      type: 'REFRESH_PRODUCTS',
      value: await find(filters, {
        ...data.productsMeta,
        sort,
        direction,
      }),
    };
  },
};

const mappingAssistantScreenControl: IScreenControl = {
  pathname: '/mapping-assistant',
  title: 'Mapping Assistant',
  readScreenMeta: () => null,
  refreshFilters: () => null,
  refreshPage: () => null,
  refreshSort: () => null,
};

const searchScreenControl: IScreenControl = {
  pathname: '/search',
  title: 'GMC Search',
  readScreenMeta: () => null,
  refreshFilters: () => null,
  refreshPage: () => null,
  refreshSort: () => null,
};

const productsService = {
  find,
  update,
  getAll,
  getOne,
  map,
  extract,
  refresh,
  search,
  productsScreenControl,
  mappingAssistantScreenControl,
  searchScreenControl,
};
export default productsService;
