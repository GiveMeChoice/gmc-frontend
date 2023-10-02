import { IFilters } from '@root/context-providers/filters.provider';
import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { IScreenControl } from './shared/screen-control.interface';
import { IMerchantCategory } from './merchant-categories.service';

export interface IGmcCategory {
  id: string;
  name: string;
  slug: string;
  merchantCategories: IMerchantCategory[];
  children: IGmcCategory[];
}

export interface IGmcCategoryScreenData {
  categories: IGmcCategory[];
  subCategories1: IGmcCategory[];
  subCategories2: IGmcCategory[];
  selectedCategory: IGmcCategory;
  selectedSubCategory1: IGmcCategory;
}

const getOne = async (id: string): Promise<IGmcCategory> => {
  const res = await axios.get<IGmcCategory>(`/gmc-categories/${id}`);
  return res.data;
};

const getTop = async (): Promise<IGmcCategory[]> => {
  const res = await axios.get<IGmcCategory[]>('/gmc-categories');
  return res.data;
};

const getAll = async (): Promise<IGmcCategory[]> => {
  const res = await axios.get<IGmcCategory[]>('/gmc-categories?deep=true');
  return res.data;
};

const create = async (parentId: string, name: string, slug: string) => {
  const res = await axios.post<IGmcCategory>('/gmc-categories', {
    parentId,
    name,
    slug,
  });
  return res.data;
};

const update = async (id: string, updates: IGmcCategory) => {
  const res = await axios.put<IGmcCategory>(`/gmc-categories/${id}`, updates);
  return res.data;
};

const deleteOne = async (id: string) => {
  const res = await axios.delete(`/gmc-categories/${id}`);
};

const gmcCategoriesScreenControl: IScreenControl = {
  pathname: '/config/categories',
  title: 'Categories',
  readScreenMeta(data) {
    return data.providersMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'NO_OP',
      value: null,
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'NO_OP',
      value: null,
    };
  },
  async sortData(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'NO_OP',
      value: null,
    };
  },
};

export const gmcCategoriesService = {
  getOne,
  getTop,
  getAll,
  create,
  update,
  deleteOne,
  gmcCategoriesScreenControl,
};
