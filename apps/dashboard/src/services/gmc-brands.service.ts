import { IFilters } from '@root/context-providers/filters.provider';
import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { IScreenControl } from './shared/screen-control.interface';

export interface IGmcBrand {
  id: string;
  name: string;
  description: string;
}

const getOne = async (id: string): Promise<IGmcBrand> => {
  const res = await axios.get<IGmcBrand>(`/gmc-brands/${id}`);
  return res.data;
};

const getAll = async (): Promise<IGmcBrand> => {
  const res = await axios.get<IGmcBrand>('/gmc-brands');
  return res.data;
};

const gmcBrandsScreenControl: IScreenControl = {
  pathname: '/config/brands',
  title: 'Brands',
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

export const gmcBrandsService = {
  getOne,
  getAll,
  gmcBrandsScreenControl,
};
