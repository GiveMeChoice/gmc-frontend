import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './shared/screen-control.interface';
import { IMerchant, PageRequest, PageResponse } from 'gmc-types';

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchant>> => {
  const res = await axios.post<PageResponse<IMerchant>>(
    '/merchants/find',
    extractMerchantFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchant>> => {
  const res = await axios.get<PageResponse<IMerchant>>('/merchants', {
    params: pageRequest,
  });
  return res.data;
};

const update = async (
  id: string,
  updates: Partial<IMerchant>
): Promise<IMerchant> => {
  console.log(updates);
  const res = await axios.put<IMerchant>(`/merchants/${id}`, updates);
  return res.data;
};

const extractMerchantFilters = (filters: IFilters) => ({
  ...(filters.merchantRegion && { region: filters.merchantRegion }),
  ...(filters.merchantId && {
    id: filters.merchantId,
  }),
});

const merchantsScreenControl: IScreenControl = {
  pathname: '/integration/merchants',
  title: 'Merchants',
  readScreenMeta(data) {
    return data.providersMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANTS',
      value: await find(filters, data.providersMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANTS',
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
      type: 'SCREEN_REFRESH_MERCHANTS',
      value: await find(filters, {
        ...data.providersMeta,
        sort,
        direction,
      }),
    };
  },
};

const merchantsService = {
  find,
  getAll,
  update,
  merchantsScreenControl,
};
export default merchantsService;
