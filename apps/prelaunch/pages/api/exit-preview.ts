import exitPreviewHandler from 'blog/lib/api-exit-preview';
import { NextApiHandler } from 'next';

const exit: NextApiHandler = async (req, res) => {
  return await exitPreviewHandler(req, res);
};

export default exit;
