import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';

export interface ISource {
  id: string;
  identifier: string;
  description: string;
  active: boolean;
  status: string;
}

const search = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<ISource[]> => {
  const res = await axios.post<ISource[]>(
    '/product-sources/search',
    extractSourceFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const getAll = async (pageRequest?: PageRequest): Promise<ISource[]> => {
  const res = await axios.get<ISource[]>('/product-sources', {
    params: pageRequest,
  });
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

const sourcesService = { search, getAll };
export default sourcesService;
