import { IData, DataAction } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface IMerchantLabel {
  id: string;
  merchantId: string;
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  infoLink: string;
  logoUrl: string;
  groupId?: string;
  provider?: {
    id?: string;
    key?: string;
  };
  group?: Partial<ILabelGroup>;
  productCount: number;
}

export interface ILabelGroup {
  id: string;
  name: string;
  description: string;
  children: ILabelGroup[];
}

const getOne = async (id): Promise<IMerchantLabel> => {
  const res = await axios.get<IMerchantLabel>(`/labels/${id}`);
  return res.data;
};

// const getRoot = async

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantLabel>> => {
  const res = await axios.get<PageResponse<IMerchantLabel>>('/labels', {
    params: pageRequest,
  });
  return res.data;
};

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantLabel>> => {
  const res = await axios.post<PageResponse<IMerchantLabel>>(
    '/labels/find',
    extractProductFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const update = async (id: string, updates: Partial<IMerchantLabel>) => {
  const res = await axios.put<IMerchantLabel>(`/labels/${id}`, updates);
  return res.data;
};

const getOneGroup = async (id: string): Promise<ILabelGroup> => {
  const res = await axios.get<ILabelGroup>(`/label-groups/${id}`);
  return res.data;
};

const getAllGroups = async (): Promise<ILabelGroup[]> => {
  const res = await axios.get<ILabelGroup[]>('/label-groups');
  return res.data;
};

const extractProductFilters = (filters: IFilters): Partial<IMerchantLabel> => ({
  ...(filters.providerId && { merchantId: filters.providerId }),
  ...(filters.labelGroupId && { groupId: filters.labelGroupId }),
});

const labelsScreenControl: IScreenControl = {
  pathname: '/mappings/labels',
  title: 'Labels',
  readScreenMeta(data) {
    return data.labelsMeta;
  },
  async refreshData(filters: IFilters, data: IData): Promise<DataAction> {
    return {
      type: 'REFRESH_LABELS',
      value: await find(filters, data.labelsMeta),
    };
  },
  async refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction> {
    return {
      type: 'REFRESH_LABELS',
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
      type: 'REFRESH_LABELS',
      value: await find(filters, {
        ...data.labelsMeta,
        sort,
        direction,
      }),
    };
  },
};

const labelsService = {
  getOne,
  getAll,
  find,
  update,
  getOneGroup,
  getAllGroups,
  labelsScreenControl,
};
export default labelsService;
