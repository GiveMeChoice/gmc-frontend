import { DataAction, IData } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface ICategory {
  id: string;
  providerId: string;
  code: string;
  description: string;
  createdAt: Date;
  infoLink: string;
  groupId?: string;
  provider?: {
    id?: string;
    key?: string;
  };
  group?: Partial<ICategoryGroup>;
  productCount: number;
}

export interface ICategoryGroup {
  id: string;
  name: string;
}

const getOne = async (id): Promise<ICategory> => {
  const res = await axios.get<ICategory>(`/categories/${id}`);
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<ICategory>> => {
  const res = await axios.get<PageResponse<ICategory>>('/categories', {
    params: pageRequest,
  });
  return res.data;
};

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<ICategory>> => {
  const res = await axios.post<PageResponse<ICategory>>(
    '/categories/find',
    extractProductFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const getOneGroup = async (id: string): Promise<ICategoryGroup> => {
  const res = await axios.get<ICategoryGroup>(`/category-groups/${id}`);
  return res.data;
};

const getAllGroups = async (): Promise<ICategoryGroup[]> => {
  const res = await axios.get<ICategoryGroup[]>('/category-groups');
  return res.data;
};

const extractProductFilters = (filters: IFilters): Partial<ICategory> => ({
  ...(filters.providerId && { providerId: filters.providerId }),
  ...(filters.categoryGroupId && { groupId: filters.categoryGroupId }),
});

const categoriesScreenControl: IScreenControl = {
  pathname: '/mappings/categories',
  title: 'Categories',
  readScreenMeta(data) {
    return data.categoriesMeta;
  },
  async refreshFilters(filters: IFilters, data: IData): Promise<DataAction> {
    return {
      type: 'REFRESH_CATEGORIES',
      value: await find(filters, data.categoriesMeta),
    };
  },
  async refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction> {
    return {
      type: 'REFRESH_CATEGORIES',
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
      type: 'REFRESH_CATEGORIES',
      value: await find(filters, {
        ...data.categoriesMeta,
        sort,
        direction,
      }),
    };
  },
};

const categoriesService = {
  getOne,
  getAll,
  find,
  getOneGroup,
  getAllGroups,
  categoriesScreenControl,
};
export default categoriesService;
