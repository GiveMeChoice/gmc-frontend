import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './shared/screen-control.interface';
import { IMerchantBrand, PageRequest, PageResponse } from 'gmc-types';

const getOne = async (id): Promise<IMerchantBrand> => {
  const res = await axios.get<IMerchantBrand>(`/merchant-brands/${id}`);
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantBrand>> => {
  const res = await axios.get<PageResponse<IMerchantBrand>>(
    '/merchant-brands',
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantBrand>> => {
  const res = await axios.post<PageResponse<IMerchantBrand>>(
    '/merchant-brands/find',
    extractMerchantBrandFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const assignGmcBrand = async (
  merchantBrandId: string,
  gmcBrandId: string
): Promise<IMerchantBrand> => {
  const res = await axios.post<IMerchantBrand>(
    `/merchant-brands/${merchantBrandId}/assign`,
    {},
    {
      params: {
        gmcBrandId,
      },
    }
  );
  return res.data;
};

const extractMerchantBrandFilters = (
  filters: IFilters
): Partial<IMerchantBrand> => ({
  ...(filters.merchantId && { merchant: { id: filters.merchantId } }),
  ...(filters.gmcBrandId && { gmcBrandId: filters.gmcBrandId }),
  ...(filters.brandUnassigned && { unassigned: true }),
});

const merchantBrandsScreenControl: IScreenControl = {
  pathname: '/mappings/merchant-brands',
  title: 'Brands',
  readScreenMeta(data) {
    return data.merchantBrandsMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANT_BRANDS',
      value: await find(filters, data.merchantBrandsMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANT_BRANDS',
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
      type: 'SCREEN_REFRESH_MERCHANT_BRANDS',
      value: await find(filters, {
        ...data.merchantBrandsMeta,
        sort,
        direction,
      }),
    };
  },
};

const merchantBrandsService = {
  getOne,
  getAll,
  find,
  assignGmcBrand,
  brandsScreenControl: merchantBrandsScreenControl,
};
export default merchantBrandsService;
