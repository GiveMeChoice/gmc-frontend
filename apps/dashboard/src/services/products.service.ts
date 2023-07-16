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
import { IMerchantBrand } from './merchant-brands.service';
import { IMerchantLabel } from './merchant-labels.service';
import { IMerchant } from './merchants.service';
import { IChannel } from './channels.service';

export interface IProduct {
  id: string;
  shortId: string;
  merchantId: string;
  merchantProductCode: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
  // INTEGRATION METADATA
  status: string;
  createdByRunId: string;
  refreshedByRunId: string;
  refreshedAt: Date;
  refreshReason: string;
  expiresAt: Date;
  keepAliveCount: number;
  errorMessage: string;
  // PRODUCT DATA
  sku: string;
  title: string;
  description: string;
  rating: number;
  ratingsTotal: number;
  price: number;
  shippingPrice: number;
  currency: string;
  // RELATIONS
  images: IProductImage[];
  reviews: IProductReview[];
  merchantLabels: IMerchantLabel[];
  merchantBrand: IMerchantBrand;
  merchantCategory: Partial<IMerchantCategory>;
  merchant: Partial<IMerchant>;
  channel: Partial<IChannel>;
}

export type IProductReview = {
  id: string;
  author: string;
  text: string;
  rating: number;
  submittedOn: Date;
};

export type IProductImage = {
  id: string;
  url: string;
  primary: boolean;
  type: 'LIST' | 'DETAIL';
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
    applyProductFilters(filters),
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

const applyProductFilters = (filters: IFilters): Partial<IProduct> => ({
  // Merchant
  ...(filters.merchantId && { merchantId: filters.merchantId }),
  ...(filters.merchantRegion && {
    merchant: { region: filters.merchantRegion },
  }),
  // Provider / Channel
  ...((filters.providerId ||
    filters.providerActivation ||
    filters.channelId ||
    filters.channelStatus ||
    filters.channelActivation) && {
    channel: {
      ...(filters.providerId && { providerId: filters.providerId }),
      ...(filters.channelId && { id: filters.channelId }),
      ...(filters.channelStatus && { status: filters.channelStatus }),
      ...(filters.channelActivation && {
        active: filters.channelActivation === 'active',
      }),
    },
  }),
  //Product
  ...(filters.gmcProductId && { shortId: filters.gmcProductId }),
  ...(filters.merchantProductCode && {
    merchantProductCode: filters.merchantProductCode,
  }),
  ...(filters.productStatus && { status: filters.productStatus }),
  ...(filters.productError && { error: true }),
  ...((filters.merchantCategoryCode || filters.gmcCategoryId) && {
    merchantCategory: {
      ...(filters.merchantCategoryCode && {
        merchantCategoryCode: filters.merchantCategoryCode,
      }),
      ...(filters.gmcCategoryId && { gmcCategoryId: filters.gmcCategoryId }),
    },
  }),
  ...((filters.merchantLabelCode || filters.gmcLabelId) && {
    merchantLabel: {
      ...(filters.merchantLabelCode && {
        merchantLabelCode: filters.merchantLabelCode,
      }),
      ...(filters.gmcLabelId && { gmcLabelId: filters.gmcLabelId }),
    },
  }),
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
