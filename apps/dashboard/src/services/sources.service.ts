import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IRun } from './runs.service';
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
  subcategory1: string;
  subcategory2: string;
}

const search = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<ISource>> => {
  const res = await axios.post<PageResponse<ISource>>(
    '/product-sources/search',
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
    '/integrate-source',
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

const sourcesService = { search, update, getOne, getAll, integrate };
export default sourcesService;
