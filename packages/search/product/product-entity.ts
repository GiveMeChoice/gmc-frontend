export interface ProductEntity {
  id?: string;
  shortId?: string;
  sku?: string;
  title?: string;
  description?: string;
  price?: number;
  shippingPrice?: number;
  currency?: string;
  listImage?: string;
  mainImage?: string;
  secondaryImage?: string;
  offerLink?: string;
  rating?: string;
  ratingsTotal?: string;
  brand?: {
    code: string;
    description: string;
  };
  category?: string;
  categoryDetail?: string;
  reviews?: any[];
  labels?: [
    {
      code: string;
      description: string;
    }
  ];
  provider?: {
    key: string;
  };
}
