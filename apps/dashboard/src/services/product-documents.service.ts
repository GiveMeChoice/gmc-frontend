import axios from 'axios';
import { ProductDocument } from 'gmc-types';

const getOne = async (id: string): Promise<ProductDocument> => {
  const res = await axios.get<ProductDocument>(`/product-documents/${id}`);
  return res.data;
};

const map = async (id: string): Promise<ProductDocument> => {
  const res = await axios.post(`/product-documents/${id}/map`);
  return res.data;
};

const index = async (id: string): Promise<ProductDocument> => {
  const res = await axios.post(`/product-documents/${id}/index`);
  return res.data;
};

const productDocumentsService = {
  getOne,
  map,
  index,
};
export default productDocumentsService;
