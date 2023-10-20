// api/shop-nav
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IShopNavContext } from '../../components/Context/ShopProvider';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('CALLING SHOP-NAV HANDLER');
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
  }
  const catResponse = await axios.get(
    `${process.env.BACKEND_URL}/gmc-categories?deep=true&slim=true`
  );
  const labResponse = await axios.get(
    `${process.env.BACKEND_URL}/gmc-labels?deep=true&slim=true`
  );
  res.send({
    categories: catResponse.data.sort((a, b) => a.name.localeCompare(b.name)),
    labels: labResponse.data.sort((a, b) => a.name.localeCompare(b.name)),
  } as IShopNavContext);
}
