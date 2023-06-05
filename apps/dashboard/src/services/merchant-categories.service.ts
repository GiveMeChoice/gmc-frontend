import {
  ScreenDataAction,
  IScreenData,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IGmcCategory } from './gmc-categories.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';
import { IScreenControl } from './shared/screen-control.interface';
import { IMerchant } from './merchants.service';

export interface IMerchantCategory {
  id: string;
  merchantId: string;
  merchantCategoryCode: string;
  name: string;
  createdAt: Date;
  gmcCategoryId?: string;
  merchant?: Partial<IMerchant>;
  gmcCategory?: Partial<IGmcCategory>;
  // calculated fields
  productCount: number;
}

const getOneProviderCategory = async (id): Promise<IMerchantCategory> => {
  const res = await axios.get<IMerchantCategory>(`/merchant-categories/${id}`);
  return res.data;
};

const getAllProviderCategories = async (
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

const findProviderCategories = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantCategory>> => {
  const res = await axios.post<PageResponse<IMerchantCategory>>(
    '/merchant-categories/find',
    extractProductFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const updateProviderCategories = async (
  id: string,
  updates: Partial<IMerchantCategory>
) => {
  const res = await axios.put<IMerchantCategory>(
    `/merchant-categories/${id}`,
    updates
  );
  return res.data;
};

const assignCategory = async (
  providerCategoryId: string,
  categoryId: string
): Promise<IMerchantCategory> => {
  const res = await axios.post<IMerchantCategory>(
    `/merchant-categories/${providerCategoryId}/assign`,
    {},
    {
      params: {
        categoryId,
      },
    }
  );
  return res.data;
};

const extractProductFilters = (
  filters: IFilters
): Partial<IMerchantCategory> => ({
  ...(filters.providerId && { merchantId: filters.providerId }),
  ...(filters.providerCategoryCode && {
    merchantCategoryCode: filters.providerCategoryCode,
  }),
  ...(filters.categoryId && { categoryId: filters.categoryId }),
});

const merchantCategoriesScreenControl: IScreenControl = {
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
      value: await findProviderCategories(filters, data.merchantCategoriesMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANT_CATEGORIES',
      value: await findProviderCategories(filters, page),
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
      value: await findProviderCategories(filters, {
        ...data.merchantCategoriesMeta,
        sort,
        direction,
      }),
    };
  },
};

const merchantCategoriesService = {
  assignCategory,
  getOneProviderCategory,
  getAllProviderCategories,
  findProviderCategories,
  updateProviderCategories,
  categoriesScreenControl: merchantCategoriesScreenControl,
};
export default merchantCategoriesService;
