export interface CategoryDocument {
  merchantCategory?: string;
  gmcCategory?: GmcCategoryDocument;
}

export interface GmcCategoryDocument {
  name: string;
  slug: string;
  description: string;
  subcategory?: GmcCategoryDocument;
}
