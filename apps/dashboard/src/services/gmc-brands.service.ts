import { IFilters } from '@root/context-providers/filters.provider';
import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { IScreenControl } from './shared/screen-control.interface';
import { PageResponse } from './shared/page-response.interface';
import { IMerchantBrand } from './merchant-brands.service';

export interface IGmcBrand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  url: string;
  merchantBrand?: IMerchantBrand;
}

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IGmcBrand>> => {
  const res = await axios.post<PageResponse<IGmcBrand>>(
    '/gmc-brands/find',
    {},
    { params: pageRequest }
  );
  return res.data;
};

const getOne = async (id: string): Promise<IGmcBrand> => {
  const res = await axios.get<IGmcBrand>(`/gmc-brands/${id}`);
  return res.data;
};

const getAll = async (): Promise<IGmcBrand[]> => {
  const res = await axios.get<PageResponse<IGmcBrand>>('/gmc-brands');
  return res.data.data;
};

const create = async (brand: IGmcBrand) => {
  const res = await axios.post<IGmcBrand>('/gmc-brands', brand);
  return res.data;
};

const update = async (id: string, updates: IGmcBrand) => {
  const res = await axios.put<IGmcBrand>(`/gmc-brands/${id}`, updates);
  return res.data;
};

const deleteOne = async (id: string) => {
  const res = await axios.delete(`/gmc-brands/${id}`);
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
      type: 'SCREEN_REFRESH_GMC_BRANDS',
      value: await find(filters, data.gmcBrandsMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_GMC_BRANDS',
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
      type: 'SCREEN_REFRESH_GMC_BRANDS',
      value: await find(filters, { ...data.gmcBrandsMeta, sort, direction }),
    };
  },
};

export const gmcBrandsService = {
  find,
  getOne,
  getAll,
  create,
  update,
  deleteOne,
  gmcBrandsScreenControl,
};
