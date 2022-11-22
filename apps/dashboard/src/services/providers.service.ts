import axios from 'axios';

export interface IProvider {
  id: string;
  key: string;
  description: string;
  active: boolean;
}

const getProviders = async (): Promise<IProvider[]> => {
  const res = await axios.get<IProvider[]>('/providers');
  return res.data;
};

const providerService = { getProviders };
export default providerService;
