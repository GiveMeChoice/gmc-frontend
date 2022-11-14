import revalidateHandler from 'blog/lib/api-revalidate';
import { NextApiHandler } from 'next';

const revalidate: NextApiHandler = async (req, res) => {
  return await revalidateHandler(req, res);
};

export default revalidate;
