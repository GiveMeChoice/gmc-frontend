import { IData, DataAction } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface IBrand {
  id: string;
  providerId: string;
  code: string;
  description: string;
  createdAt: Date;
  infoLink: string;
  icon: string;
  groupId?: string;
  provider?: {
    id?: string;
    key?: string;
  };
}

const getOne = async (id): Promise<IBrand> => {
  const res = await axios.get<IBrand>(`/brands/${id}`);
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IBrand>> => {
  const res = await axios.get<PageResponse<IBrand>>('/brands', {
    params: pageRequest,
  });
  return res.data;
};

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IBrand>> => {
  const res = await axios.post<PageResponse<IBrand>>(
    '/brands/find',
    extractProductFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const extractProductFilters = (filters: IFilters): Partial<IBrand> => ({
  ...(filters.providerId && { provider: { id: filters.providerId } }),
});

const brandsScreenControl: IScreenControl = {
  pathname: '/mappings/brands',
  title: 'Brands',
  readScreenMeta(data) {
    return data.labelsMeta;
  },
  async refreshData(filters: IFilters, data: IData): Promise<DataAction> {
    return {
      type: 'REFRESH_BRANDS',
      value: await find(filters, data.brandsMeta),
    };
  },
  async refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction> {
    return {
      type: 'REFRESH_BRANDS',
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
      type: 'REFRESH_BRANDS',
      value: await find(filters, {
        ...data.brandsMeta,
        sort,
        direction,
      }),
    };
  },
};

const brandsService = {
  getOne,
  getAll,
  find,
  brandsScreenControl,
};
export default brandsService;
