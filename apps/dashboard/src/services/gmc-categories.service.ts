import axios from 'axios';

export interface IGmcCategory {
  id: string;
  name: string;
  children: IGmcCategory[];
}

const getOne = async (id: string): Promise<IGmcCategory> => {
  const res = await axios.get<IGmcCategory>(`/gmc-categories/${id}`);
  return res.data;
};

const getAll = async (): Promise<IGmcCategory> => {
  const res = await axios.get<IGmcCategory>('/gmc-categories?tree=true');
  return res.data;
};

export const gmcCategoriesService = {
  getOne,
  getAll,
};
