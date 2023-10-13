import { IFilters } from '@root/context-providers/filters.provider';
import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import axios from 'axios';
import { IScreenControl } from './shared/screen-control.interface';
import { IProduct, PageRequest, PageResponse } from 'gmc-types';

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
  ...((filters.merchantBrandCode || filters.gmcBrandId) && {
    merchantBrand: {
      ...(filters.merchantBrandCode && {
        merchantBrandCode: filters.merchantBrandCode,
      }),
      ...(filters.gmcBrandId && { gmcBrandId: filters.gmcBrandId }),
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
  productsScreenControl,
  // mappingAssistantScreenControl,
  // searchScreenControl,
};
export default productsService;
