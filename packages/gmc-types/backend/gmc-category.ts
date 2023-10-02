export interface IGmcCategory {
  id: string;
  name: string;
  slug: string;
  // merchantCategories: IMerchantCategory[];
  children: IGmcCategory[];
}
