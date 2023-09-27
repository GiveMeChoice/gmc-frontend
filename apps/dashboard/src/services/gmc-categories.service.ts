import { IFilters } from '@root/context-providers/filters.provider';
import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { IScreenControl } from './shared/screen-control.interface';

export interface IGmcCategory {
  id: string;
  name: string;
  children: IGmcCategory[];
}

const find = async (): Promise<IGmcCategory> => {
  return await getAll();
};

const getOne = async (id: string): Promise<IGmcCategory> => {
  const res = await axios.get<IGmcCategory>(`/gmc-categories/${id}`);
  return res.data;
};

const getAll = async (): Promise<IGmcCategory> => {
  const res = await axios.get<IGmcCategory>('/gmc-categories?tree=true');
  return res.data;
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
      type: 'SCREEN_REFRESH_MERCHANTS',
      value: null, //await find(filters, data.providersMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANTS',
      value: null, //await find(filters, page),
    };
  },
  async sortData(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANTS',
      value: null, //await find(filters, {
      //   ...data.providersMeta,
      //   sort,
      //   direction,
      // }),
    };
  },
};

export const gmcCategoriesService = {
  getOne,
  getAll,
  gmcCategoriesScreenControl,
};
