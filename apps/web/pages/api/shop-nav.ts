// api/shop-nav
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IShopNavContext } from '../../components/Shop/ShopNavProvider';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('CALLING SHOP-NAV HANDLER');
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
  }
  const catResponse = await axios.get(
    `${process.env.BACKEND_URL}/gmc-categories`
  );
  const labResponse = await axios.get(`${process.env.BACKEND_URL}/gmc-labels`);
  res.send({
    categories: catResponse.data,
    labels: labResponse.data,
  } as IShopNavContext);
}
