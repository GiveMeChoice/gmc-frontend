import { DataAction, IData } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface IMerchantCategory {
  id: string;
  merchantId: string;
  code: string;
  description: string;
  createdAt: Date;
  categoryId?: string;
  provider?: {
    id?: string;
    key?: string;
  };
  category?: Partial<ICategory>;
  productCount: number;
}

export interface ICategory {
  id: string;
  name: string;
  children: ICategory[];
}

const getOneProviderCategory = async (id): Promise<IMerchantCategory> => {
  const res = await axios.get<IMerchantCategory>(`/provider-categories/${id}`);
  return res.data;
};

const getAllProviderCategories = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantCategory>> => {
  const res = await axios.get<PageResponse<IMerchantCategory>>(
    '/provider-categories',
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
    '/provider-categories/find',
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
    `/provider-categories/${id}`,
    updates
  );
  return res.data;
};

const assignCategory = async (
  providerCategoryId: string,
  categoryId: string
): Promise<IMerchantCategory> => {
  const res = await axios.post<IMerchantCategory>(
    `/provider-categories/${providerCategoryId}/assign`,
    {},
    {
      params: {
        categoryId,
      },
    }
  );
  return res.data;
};

const getOne = async (id: string): Promise<ICategory> => {
  const res = await axios.get<ICategory>(`/categories/${id}`);
  return res.data;
};

const getAll = async (): Promise<ICategory> => {
  const res = await axios.get<ICategory>('/categories?tree=true');
  return res.data;
};

const extractProductFilters = (
  filters: IFilters
): Partial<IMerchantCategory> => ({
  ...(filters.providerId && { merchantId: filters.providerId }),
  ...(filters.providerCategoryCode && { code: filters.providerCategoryCode }),
  ...(filters.categoryId && { categoryId: filters.categoryId }),
});

const categoriesScreenControl: IScreenControl = {
  pathname: '/mappings/categories',
  title: 'Categories',
  readScreenMeta(data) {
    return data.categoriesMeta;
  },
  async refreshData(filters: IFilters, data: IData): Promise<DataAction> {
    return {
      type: 'REFRESH_PROVIDER_CATEGORIES',
      value: await findProviderCategories(filters, data.categoriesMeta),
    };
  },
  async refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction> {
    return {
      type: 'REFRESH_PROVIDER_CATEGORIES',
      value: await findProviderCategories(filters, page),
    };
  },
  async refreshSort(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IData
  ): Promise<DataAction> {
    return {
      type: 'REFRESH_PROVIDER_CATEGORIES',
      value: await findProviderCategories(filters, {
        ...data.categoriesMeta,
        sort,
        direction,
      }),
    };
  },
};

const categoriesService = {
  getOne,
  getRoot: getAll,
  assignCategory,
  getOneProviderCategory,
  getAllProviderCategories,
  findProviderCategories,
  updateProviderCategories,
  categoriesScreenControl,
};
export default categoriesService;
