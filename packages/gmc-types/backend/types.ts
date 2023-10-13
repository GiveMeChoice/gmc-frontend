export interface PageRequest {
  page?: number;
  size?: number;
  sort?: string;
  direction?: string;
}

export interface PageMeta {
  count?: number;
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  sort?: string;
  direction?: string;
}

export interface PageResponse<T> {
  meta: PageMeta;
  data: T[];
}

export interface INestedEntity {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
  children: INestedEntity[];
  parent: INestedEntity;
}

export interface IGmcCategory extends INestedEntity {
  merchantCategories?: IMerchantCategory[];
}

export interface IGmcLabel extends INestedEntity {
  merchantLabels?: IMerchantLabel[];
}

export interface IGmcBrand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  url: string;
  merchantBrand?: IMerchantBrand;
}

export interface IMerchant {
  id: string;
  key: string;
  region: string;
  name: string; //updateable
  description: string; //updateable
  logo: string; //updateable
  url: string; //updateable
  // calculated fields
  channelCount: number;
  productCount: number;
  labelCount: number;
  brandCount: number;
  categoryCount: number;
}

export interface IMerchantBrand {
  id: string;
  merchantId: string;
  merchantBrandCode: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  createdAt: Date;
  gmcBrandId?: string;
  // groupId?: string; //TODO
  gmcBrand?: IGmcBrand;
  merchant?: Partial<IMerchant>;
  productCount: number;
}

export interface IMerchantCategory {
  id: string;
  merchantId: string;
  merchantCategoryCode: string;
  name: string;
  createdAt: Date;
  gmcCategoryId?: string;
  merchant?: Partial<IMerchant>;
  gmcCategory?: Partial<IGmcCategory>;
  // calculated fields
  productCount: number;
}

export interface IMerchantLabel {
  id: string;
  merchantId: string;
  merchantLabelCode: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  createdAt: Date;
  gmcLabelId?: string;
  gmcLabel?: Partial<IGmcLabel>;
  merchant?: Partial<IMerchant>;
  // calculated fields
  productCount: number;
}

export interface IProduct {
  id: string;
  shortId: string;
  merchantId: string;
  merchantProductCode: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
  // INTEGRATION METADATA
  status: string;
  createdByRunId: string;
  refreshedByRunId: string;
  refreshedAt: Date;
  indexedAt: Date;
  refreshReason: string;
  expiresAt: Date;
  keepAliveCount: number;
  errorMessage: string;
  // PRODUCT DATA
  sku: string;
  title: string;
  description: string;
  rating: number;
  ratingsTotal: number;
  price: number;
  shippingPrice: number;
  currency: string;
  offerUrl: string;
  // RELATIONS
  images: IProductImage[];
  reviews: IProductReview[];
  merchantLabels: IMerchantLabel[];
  merchantBrand: Partial<IMerchantBrand>;
  merchantCategory: Partial<IMerchantCategory>;
  merchant: Partial<IMerchant>;
  channel: Partial<IChannel>;
}

export type IProductReview = {
  id: string;
  author: string;
  text: string;
  rating: number;
  submittedOn: Date;
};

export type IProductImage = {
  id: string;
  url: string;
  primary: boolean;
  type: 'LIST' | 'DETAIL';
};

export interface IProvider {
  id: string;
  key: string;
  description: string; //updateable
  active: boolean; //updateable
  runIntervalHours: number; //updateable
  expirationHours: number; //updateable
  // Calculated fields
  channelCount: number;
  productCount: number;
}

export interface IChannel {
  id: string;
  name: string; //updateable
  active: boolean; //updateable
  runIntervalHours: number; //updateable
  expirationHours: number; //updateable
  retryLimit: number; //updateable
  etlCode1: string; //updateable
  etlCode2: string; //updateable
  etlCode3: string; //updateable
  etlCode4: string; //updateable
  etlCode5: string; //updateable
  retryCount: number;
  status: string;
  lastRunAt: Date;
  merchantId: string;
  providerId: string;
  merchant?: Partial<IMerchant>;
  provider?: Partial<IProvider>;
  // calculated fields
  runCount: number;
  productCount: number;
}

export interface IRun {
  id: string;
  channelId: string;
  foundCount: number;
  ownedCount: number;
  createdCount: number;
  adoptedCount: number;
  pendingCount: number;
  foreignCount: number;
  staleCount: number;
  keepAliveSignalCount: number;
  refreshSignalCount: number;
  failureCount: number;
  runAt: Date;
  contentDate: Date;
  runTime: number;
  errorMessage: string;
  channel?: Partial<IChannel>;
}
