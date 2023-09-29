import { IFilters } from '@root/context-providers/filters.provider';
import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { IScreenControl } from './shared/screen-control.interface';
import { IMerchantLabel } from './merchant-labels.service';

export interface IGmcLabel {
  id: string;
  name: string;
  slug: string;
  description: string;
  merchantLabels: IMerchantLabel[];
  children: IGmcLabel[];
}

export interface IGmcLabelScreenData {
  labels: IGmcLabel[];
  subLabels1: IGmcLabel[];
  subLabels2: IGmcLabel[];
  selectedLabelId: string;
  selectedSubLabel1Id: string;
}

const getOne = async (id: string): Promise<IGmcLabel> => {
  const res = await axios.get<IGmcLabel>(`/gmc-labels/${id}`);
  return res.data;
};

const getTop = async (): Promise<IGmcLabel[]> => {
  const res = await axios.get<IGmcLabel[]>('/gmc-labels');
  return res.data;
};

const getAll = async (): Promise<IGmcLabel[]> => {
  const res = await axios.get<IGmcLabel[]>('/gmc-labels?deep=true');
  return res.data;
};

const create = async (
  parentId: string,
  name: string,
  slug: string,
  description?: string
) => {
  const res = await axios.post<IGmcLabel>('/gmc-labels', {
    parentId,
    name,
    slug,
    description,
  });
  return res.data;
};

const update = async (id: string, updates: IGmcLabel) => {
  const res = await axios.put<IGmcLabel>(`/gmc-labels/${id}`, updates);
  return res.data;
};

const deleteOne = async (id: string) => {
  const res = await axios.delete(`/gmc-labels/${id}`);
};

const gmcLabelsScreenControl: IScreenControl = {
  pathname: '/config/labels',
  title: 'Labels',
  readScreenMeta(data) {
    return data.providersMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'NO_OP',
      value: null,
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'NO_OP',
      value: null,
    };
  },
  async sortData(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'NO_OP',
      value: null,
    };
  },
};

export const gmcLabelsService = {
  getOne,
  getAll,
  getTop,
  create,
  update,
  deleteOne,
  gmcLabelsScreenControl,
};
