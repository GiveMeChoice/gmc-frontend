import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface IProvider {
  id: string;
  key: string;
  description: string;
  active: boolean;
}

const search = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IProvider>> => {
  const res = await axios.post<PageResponse<IProvider>>(
    '/providers/search',
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

const extractProviderFilters = (filters: IFilters) => ({
  ...(filters.providerId && { id: filters.providerId }),
  ...(filters.providerActivation && {
    active: filters.providerActivation === 'active',
  }),
});

const providersService = { search, getAll, update };
export default providersService;
