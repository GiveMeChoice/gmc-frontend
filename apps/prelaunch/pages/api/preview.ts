import previewHandler from 'blog/lib/api-preview';
import { NextApiHandler } from 'next';

const preview: NextApiHandler = async (req, res) => {
  return await previewHandler(req, res);
};

export default preview;
