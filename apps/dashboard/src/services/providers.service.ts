import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';

export interface IProvider {
  id: string;
  key: string;
  description: string;
  active: boolean;
}

const search = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<IProvider[]> => {
  const res = await axios.post<IProvider[]>(
    '/providers/search',
    extractProviderFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const getAll = async (pageRequest?: PageRequest): Promise<IProvider[]> => {
  const res = await axios.get<IProvider[]>('/providers', {
    params: pageRequest,
  });
  return res.data;
};

const extractProviderFilters = (filters: IFilters) => ({
  ...(filters.providerId && { id: filters.providerId }),
  ...(filters.providerActivation && {
    active: filters.providerActivation === 'active',
  }),
});

const providersService = { search, getAll };
export default providersService;
