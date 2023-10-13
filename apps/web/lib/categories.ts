import {
  IGmcCategory,
  NestedFacetDto,
  NestedFilterDto,
  SearchFunctionFacetsDto,
} from 'gmc-types';

export interface IGmcBaseCategory {
  name: string;
  slug: string;
  color: string;
  children: IGmcCategory[];
}

export interface IGmcCategoryFlat {
  category: IGmcCategory;
  subcategory1?: IGmcCategory;
  subcategory2?: IGmcCategory;
}

export const flattenCategory = (cat: IGmcCategory): IGmcCategoryFlat => {
  const flat: IGmcCategoryFlat = {
    category: cat,
  };
  if (cat.parent.slug !== 'root') {
    flat.category = cat.parent;
    flat.subcategory1 = cat;
    if (cat.parent.parent.slug !== 'root') {
      flat.category = cat.parent.parent;
      flat.subcategory1 = cat.parent;
      flat.subcategory2 = cat;
    }
  }
  return flat;
};

export const findFacetCount = (
  filter: NestedFilterDto,
  facets: NestedFacetDto[]
): number => {
  const baseFacet = facets.find((f) => f.value === filter.value);
  if (!baseFacet) return 0;
  if (!filter.subfilter) return baseFacet.count;
  const subFacet1 = baseFacet.subfacets.find(
    (f) => f.value === filter.subfilter.value
  );
  if (!subFacet1) return 0;
  if (!filter.subfilter.subfilter) return subFacet1.count;
  const subFacet2 = subFacet1.subfacets.find(
    (f) => f.value === filter.subfilter.subfilter.value
  );
  return subFacet2 ? subFacet2.count : 0;
};

export const baseCategories: IGmcBaseCategory[] = [
  {
    name: 'Clothing',
    slug: 'clothing',
    color: '#adbe00',
    children: [],
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    color: '#b387ba',
    children: [],
  },
  {
    name: 'Health',
    slug: 'health',
    color: '#56e2b3',
    // color: '#8790b8',
    children: [],
  },
  {
    name: 'Indoor',
    slug: 'indoor',
    color: '#dcb586',
    // color: '#97844f',
    children: [],
  },
  {
    name: 'Outdoor',
    slug: 'outdoor',
    color: '#1ba31a',
    children: [],
  },
  // {
  //   name: 'Toys',
  //   slug: 'toys',
  //   color: '#d1627e',
  //   children: [],
  // },
  {
    name: 'Pets',
    slug: 'pets',
    color: '#f8ff93',
    // color: '#f79cc4',
    // color: '#97844f',
    children: [],
  },
  {
    name: 'Gifts',
    slug: 'gifts',
    color: '#a7afc1',
    children: [],
  },
];
