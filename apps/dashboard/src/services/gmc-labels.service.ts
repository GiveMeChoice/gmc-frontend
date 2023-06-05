import axios from 'axios';

export interface IGmcLabel {
  id: string;
  name: string;
  description: string;
  children: IGmcLabel[];
}

const getOne = async (id: string): Promise<IGmcLabel> => {
  const res = await axios.get<IGmcLabel>(`/gmc-labels/${id}`);
  return res.data;
};

const getAll = async (): Promise<IGmcLabel> => {
  const res = await axios.get<IGmcLabel>('/gmc-labels?tree=true');
  return res.data;
};

export const gmcLabelsService = {
  getOne,
  getAll,
};
