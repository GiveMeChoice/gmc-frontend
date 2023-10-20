import { IFilters } from '@root/context-providers/filters.provider';
import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import axios from 'axios';
import { IScreenControl } from './shared/screen-control.interface';
import { IMerchantCategory, PageRequest, PageResponse } from 'gmc-types';

const getOne = async (id): Promise<IMerchantCategory> => {
  const res = await axios.get<IMerchantCategory>(`/merchant-categories/${id}`);
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantCategory>> => {
  const res = await axios.get<PageResponse<IMerchantCategory>>(
    '/merchant-categories',
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantCategory>> => {
  const res = await axios.post<PageResponse<IMerchantCategory>>(
    '/merchant-categories/find',
    extractCategoryFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const update = async (id: string, updates: Partial<IMerchantCategory>) => {
  const res = await axios.put<IMerchantCategory>(
    `/merchant-categories/${id}`,
    updates
  );
  return res.data;
};

const assignGmcCategory = async (
  merchantCategoryId: string,
  gmcCategoryId: string
): Promise<IMerchantCategory> => {
  const res = await axios.post<IMerchantCategory>(
    `/merchant-categories/${merchantCategoryId}/assign`,
    {},
    {
      params: {
        gmcCategoryId,
      },
    }
  );
  return res.data;
};

const extractCategoryFilters = (
  filters: IFilters
): Partial<IMerchantCategory> => ({
  ...(filters.merchantId && { merchantId: filters.merchantId }),
  ...(filters.merchantCategoryCode && {
    merchantCategoryCode: filters.merchantCategoryCode,
  }),
  ...(filters.gmcCategoryId && { gmcCategoryId: filters.gmcCategoryId }),
  ...(filters.categoryUnassigned && { unassigned: true }),
});

const categoriesScreenControl: IScreenControl = {
  pathname: '/mappings/merchant-categories',
  title: 'Categories',
  readScreenMeta(data) {
    return data.merchantCategoriesMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANT_CATEGORIES',
      value: await find(filters, data.merchantCategoriesMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANT_CATEGORIES',
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
      type: 'SCREEN_REFRESH_MERCHANT_CATEGORIES',
      value: await find(filters, {
        ...data.merchantCategoriesMeta,
        sort,
        direction,
      }),
    };
  },
};

const merchantCategoriesService = {
  assignGmcCategory,
  getOne,
  getAll,
  find,
  update,
  categoriesScreenControl,
};
export default merchantCategoriesService;
