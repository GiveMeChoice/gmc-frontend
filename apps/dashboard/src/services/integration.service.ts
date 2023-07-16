import axios from 'axios';
import { IRun } from './runs.service';
import { IProduct } from './products.service';

const integrateChannel = async (channelId: string): Promise<IRun> => {
  const res = await axios.post<IRun>(
    '/integration/integrate-channel',
    {},
    {
      params: {
        channelId,
      },
    }
  );
  return res.data;
};

const refreshProduct = async (
  productId: string,
  skipCache: boolean
): Promise<IProduct> => {
  const res = await axios.post<IProduct>(
    '/integration/refresh-product',
    {},
    {
      params: {
        productId,
        skipCache,
      },
    }
  );
  return res.data;
};

const extractProduct = async (
  productId: string,
  skipCache: boolean
): Promise<IProduct> => {
  const res = await axios.post<IProduct>(
    '/integration/extract-product',
    {},
    {
      params: {
        productId,
        skipCache,
      },
    }
  );
  return res.data;
};

const mapProduct = async (
  productId: string,
  skipCache: boolean
): Promise<IProduct> => {
  const res = await axios.post<IProduct>(
    '/integration/map-product',
    {},
    {
      params: {
        productId,
        skipCache,
      },
    }
  );
  return res.data;
};

const integrationService = {
  integrateChannel,
  refreshProduct,
  extractProduct,
  mapProduct,
};
export default integrationService;
