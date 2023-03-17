import { IData, DataAction } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface IProvider {
  id: string;
  key: string;
  description: string;
  active: boolean;
  runIntervalHours: number;
  expirationHours: number;
  sourcesCount: number;
  productCount: number;
  categoryCount: number;
  labelCount: number;
}

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IProvider>> => {
  const res = await axios.post<PageResponse<IProvider>>(
    '/providers/find',
    extractProviderFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IProvider>> => {
  const res = await axios.get<PageResponse<IProvider>>('/providers', {
    params: pageRequest,
  });
  return res.data;
};

const update = async (
  id: string,
  updates: Partial<IProvider>
): Promise<IProvider> => {
  const res = await axios.put<IProvider>(`/providers/${id}`, updates);
  return res.data;
};

const remapProducts = async (key: string): Promise<number> => {
  const res = await axios.post(
    `/etl/remap-provider`,
    {},
    {
      params: { provider: key },
    }
  );
  return res.data;
};

const extractProviderFilters = (filters: IFilters) => ({
  ...(filters.providerId && { id: filters.providerId }),
  ...(filters.providerActivation && {
    active: filters.providerActivation === 'active',
  }),
});

const providersScreenControl: IScreenControl = {
  pathname: '/providers',
  title: 'Providers',
  readScreenMeta(data) {
    return data.providersMeta;
  },
  async refreshData(filters: IFilters, data: IData): Promise<DataAction> {
    return {
      type: 'REFRESH_PROVIDERS',
      value: await find(filters, data.providersMeta),
    };
  },
  async refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction> {
    return {
      type: 'REFRESH_PROVIDERS',
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
      type: 'REFRESH_PROVIDERS',
      value: await find(filters, {
        ...data.providersMeta,
        sort,
        direction,
      }),
    };
  },
};

const providersService = {
  find,
  getAll,
  update,
  remapProducts,
  providersScreenControl,
};
export default providersService;
