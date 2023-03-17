import { IData, DataAction } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IRun } from './runs.service';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface ISource {
  id: string;
  providerId: string;
  identifier: string;
  description: string;
  status: string;
  active: boolean;
  ownedCount: number;
  runIntervalHours: number;
  lastRunAt: Date;
  retryCount: number;
  retryLimit: number;
  productKeepAliveLimit: number;
  category: string;
  runCount: number;
  productCount: number;
}

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<ISource>> => {
  const res = await axios.post<PageResponse<ISource>>(
    '/product-sources/find',
    extractSourceFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<ISource>> => {
  const res = await axios.get<PageResponse<ISource>>('/product-sources', {
    params: pageRequest,
  });
  return res.data;
};

const getOne = async (id: string): Promise<ISource> => {
  const res = await axios.get<ISource>(`/product-sources/${id}`);
  return res.data;
};

const update = async (
  id: string,
  updates: Partial<ISource>
): Promise<ISource> => {
  const res = await axios.put<ISource>(`/product-sources/${id}`, updates);
  return res.data;
};

const integrate = async (id: string): Promise<IRun> => {
  const res = await axios.post<IRun>(
    '/etl/integrate-source',
    {},
    {
      params: {
        id,
      },
    }
  );
  return res.data;
};

const extractSourceFilters = (filters: IFilters): Partial<ISource> => ({
  ...(filters.providerId && { providerId: filters.providerId }),
  ...(filters.sourceActivation && {
    active: filters.sourceActivation === 'active',
  }),
  ...(filters.sourceIdentifier && {
    identifier: filters.sourceIdentifier,
  }),
  ...(filters.sourceStatus && {
    status: filters.sourceStatus,
  }),
});

const sourcesScreenControl: IScreenControl = {
  pathname: '/product-sources/sources',
  title: 'Sources',
  readScreenMeta(data) {
    return data.sourcesMeta;
  },
  async refreshData(filters: IFilters, data: IData): Promise<DataAction> {
    return {
      type: 'REFRESH_SOURCES',
      value: await find(filters, data.sourcesMeta),
    };
  },
  async refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction> {
    return {
      type: 'REFRESH_SOURCES',
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
      type: 'REFRESH_SOURCES',
      value: await find(filters, {
        ...data.sourcesMeta,
        sort,
        direction,
      }),
    };
  },
};

const sourcesService = {
  find,
  update,
  getOne,
  getAll,
  integrate,
  sourcesScreenControl,
};
export default sourcesService;
