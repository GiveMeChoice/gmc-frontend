import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IMerchantCategory } from './merchant-categories.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';
import { IScreenControl } from './shared/screen-control.interface';

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
  providerCategory?: Partial<IMerchantCategory>;
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
    '/etl/extract-product',
    {},
    { params: { id, skipCache } }
  );
  return res.data;
};

const map = async (id: string): Promise<Partial<IProduct>> => {
  const res = await axios.post('/etl/map-product', {}, { params: { id } });
  return res.data;
};

const refresh = async (id: string): Promise<IProduct> => {
  const res = await axios.post(
    '/etl/integrate-product',
    {},
    { params: { id } }
  );
  return res.data;
};

const index = async (id: string): Promise<any> => {
  const res = await axios.post(`/products/${id}/index`);
  return res.data;
};

const mapToIndexable = async (id: string): Promise<any> => {
  const res = await axios.post(`/products/${id}/index/map`);
  return res.data;
};

const getCurrentlyIndexed = async (id: string): Promise<any> => {
  const res = await axios.get(`/products/${id}/index/current`);
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
    ...(filters.channelActivation && {
      active: filters.channelActivation === 'active',
    }),
    ...(filters.channelId && {
      identifier: filters.channelId,
    }),
    ...(filters.channelStatus && {
      status: filters.channelStatus,
    }),
  },
  label: {
    ...(filters.providerLabelCode && {
      code: filters.providerLabelCode,
    }),
    ...(filters.labelGroupId && { groupId: filters.labelGroupId }),
  },
  providerCategory: {
    ...(filters.providerCategoryCode && {
      merchantCategoryCode: filters.providerCategoryCode,
    }),
    ...(filters.categoryId && { categoryId: filters.categoryId }),
  },
});

const productsScreenControl: IScreenControl = {
  pathname: '/products',
  title: 'Products',
  readScreenMeta(data) {
    return data.productsMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: await find(filters, data.productsMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: await find(filters, page),
    };
  },
  async sortData(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: await find(filters, {
        ...data.productsMeta,
        sort,
        direction,
      }),
    };
  },
};

// const mappingAssistantScreenControl: IScreenControl = {
//   pathname: '/mapping-assistant',
//   title: 'Mapping Assistant',
//   readScreenMeta: () => null,
//   refreshData: () => null,
//   refreshPage: () => null,
//   refreshSort: () => null,
// };

// const searchScreenControl: IScreenControl = {
//   pathname: '/search',
//   title: 'GMC Search',
//   readScreenMeta: () => null,
//   refreshData: () => null,
//   refreshPage: () => null,
//   refreshSort: () => null,
// };

const productsService = {
  find,
  update,
  getAll,
  getOne,
  map,
  extract,
  refresh,
  search,
  index,
  mapToIndexable,
  getCurrentlyIndexed,
  productsScreenControl,
  // mappingAssistantScreenControl,
  // searchScreenControl,
};
export default productsService;
