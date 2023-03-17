import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import Client from '@elastic/elasticsearch/lib/client';
import * as functions from 'firebase-functions';
import { defineString } from 'firebase-functions/params';
import {
  SearchFunctionRequestDto,
  SearchFunctionResponseDto,
  SearchProductDto,
} from 'gmc-types';

const elasticNode = defineString('ELASTIC_NODE');
const elasticUsername = defineString('ELASTIC_USERNAME');
const elasticPassword = defineString('ELASTIC_PASSWORD');

export const searchFunction = functions.https.onCall(
  async (
    req: SearchFunctionRequestDto,
    context
  ): Promise<SearchFunctionResponseDto> => {
    console.log(req);
    // Initialize Client
    const elasticClient = new Client({
      node: elasticNode.value(),
      auth: {
        username: elasticUsername.value(),
        password: elasticPassword.value(),
      },
    });
    // Prepare Search Conditions
    const must: QueryDslQueryContainer[] = [];
    const filter: QueryDslQueryContainer[] = [];
    // Query
    if (req.query) {
      must.push({
        query_string: {
          query: req.query,
        },
      });
    }
    // Price Range
    if (req.filters.priceRange) {
      let price: any = {
        lt: 15,
      };
      if (req.filters.priceRange === 'average') {
        price = {
          gte: 15,
          lt: 100,
        };
      } else if (req.filters.priceRange === 'expensive') {
        price = {
          gt: 100,
        };
      }
      must.push({
        range: {
          price,
        },
      });
    }
    // Region
    if (req.filters.region) {
      filter.push({
        match_phrase: {
          'provider.region': req.filters.region,
        },
      });
    }
    // Store (Provider)
    if (req.filters.store) {
      filter.push({
        match_phrase: {
          'provider.key': req.filters.store,
        },
      });
    }
    // Brand
    if (req.filters.brand) {
      filter.push({
        match_phrase: {
          brand: req.filters.brand,
        },
      });
    }
    // Categories
    if (req.filters.category) {
      filter.push({
        match_phrase: {
          'category.gmcCategory.name.keyword': req.filters.category,
        },
      });
    }
    if (req.filters.subcategory1) {
      filter.push({
        match_phrase: {
          'category.gmcCategory.subcategory.name.keyword':
            req.filters.subcategory1,
        },
      });
    }
    if (req.filters.subcategory2) {
      filter.push({
        match_phrase: {
          'category.gmcCategory.subcategory.subcategory.name.keyword':
            req.filters.subcategory2,
        },
      });
    }
    // Labels
    if (req.filters.label) {
      filter.push({
        match_phrase: {
          'label.gmcLabel.name.keyword': req.filters.label,
        },
      });
    }
    if (req.filters.sublabel1) {
      filter.push({
        match_phrase: {
          'category.gmcLabel.sublabel.name.keyword': req.filters.sublabel1,
        },
      });
    }
    if (req.filters.sublabel2) {
      filter.push({
        match_phrase: {
          'category.gmcLabel.sublabel.sublabel.name.keyword':
            req.filters.sublabel2,
        },
      });
    }
    // EXECUTE SEARCH
    try {
      const result = await elasticClient.search<SearchProductDto>({
        from: req.page ? req.page * (req.pageSize ? req.pageSize : 10) : 0,
        size: req.pageSize ? req.pageSize : 10,
        query: {
          bool: {
            must,
            filter,
          },
        },
        aggs: {
          price_ranges: {
            range: {
              field: 'price',
              keyed: true,
              ranges: [
                {
                  key: 'cheap',
                  to: 15,
                },
                {
                  key: 'average',
                  from: 15,
                  to: 100,
                },
                {
                  key: 'expensive',
                  from: 100,
                },
              ],
            },
          },
          stores: {
            terms: {
              field: 'provider.key',
            },
          },
          brands: {
            terms: {
              field: 'brand.keyword',
              size: 10,
            },
          },
          categories: {
            terms: {
              field: 'category.gmcCategory.name.keyword',
              order: {
                _count: 'desc',
              },
              size: 10,
            },
            aggs: {
              subcategories_1: {
                terms: {
                  field: 'category.gmcCategory.subcategory.name.keyword',
                  order: {
                    _count: 'desc',
                  },
                  size: 10,
                },
                aggs: {
                  subcategories_2: {
                    terms: {
                      field:
                        'category.gmcCategory.subcategory.subcategory.name.keyword',
                      order: {
                        _count: 'desc',
                      },
                      size: 10,
                    },
                  },
                },
              },
            },
          },
          labels: {
            terms: {
              field: 'label.gmcLabel.name.keyword',
              order: {
                _count: 'desc',
              },
              size: 10,
            },
            aggs: {
              sublabels_1: {
                terms: {
                  field: 'label.gmcLabel.sublabel.name.keyword',
                  order: {
                    _count: 'desc',
                  },
                  size: 10,
                },
                aggs: {
                  sublabels_2: {
                    terms: {
                      field: 'label.gmcLabel.sublabel.sublabel.name.keyword',
                      order: {
                        _count: 'desc',
                      },
                      size: 10,
                    },
                  },
                },
              },
            },
          },
        },
      });
      // Get Aggregation Restuls
      const storesAggs = result.aggregations!['stores'] as any;
      const brandsAggs = result.aggregations!['brands'] as any;
      // const priceRangeAggs = result.aggregations!['price_ranges'] as any;
      const categoriesAggs = result.aggregations!['categories'] as any;
      const labelsAggs = result.aggregations!['labels'] as any;
      return {
        hits: Number((result.hits.total as any).value),
        page: req.page ? req.page : 0,
        pageSize: req.pageSize ? req.pageSize : 10,
        data: result.hits.hits.map((hit) => hit._source as SearchProductDto),
        facets: {
          stores: storesAggs.buckets.map((bucket: any) => ({
            value: bucket.key,
            count: bucket.doc_count,
          })),
          brands: brandsAggs.buckets.map((bucket: any) => ({
            value: bucket.key,
            count: bucket.doc_count,
          })),
          categories: categoriesAggs.buckets.map((bucket: any) => ({
            value: bucket.key,
            count: bucket.doc_count,
            subfacets: bucket.subcategories_1.buckets.map((sub1: any) => ({
              value: sub1.key,
              count: sub1.doc_count,
              subfacets: sub1.subcategories_2.buckets.map((sub2: any) => ({
                value: sub2.key,
                count: sub2.doc_count,
              })),
            })),
          })),
          labels: labelsAggs.buckets.map((bucket: any) => ({
            value: bucket.key,
            count: bucket.doc_count,
            subfacets: bucket.sublabels_1.buckets.map((sub1: any) => ({
              value: sub1.key,
              count: sub1.doc_count,
              subfacets: sub1.sublabels_2.buckets.map((sub2: any) => ({
                value: sub2.key,
                count: sub2.doc_count,
              })),
            })),
          })),
        },
      };
    } catch (e: any) {
      return {
        hits: 0,
        error: e.message,
      };
    }
  }
);
