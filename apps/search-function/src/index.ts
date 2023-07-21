import {
  QueryDslQueryContainer,
  SearchRequest,
  Sort,
} from '@elastic/elasticsearch/lib/api/types';
import Client from '@elastic/elasticsearch/lib/client';
import { https, logger } from 'firebase-functions';
import { defineString } from 'firebase-functions/params';
import {
  SearchFunctionRequestDto,
  SearchFunctionResponseDto,
  ProductDocument,
} from 'gmc-types';

const elasticNode = defineString('ELASTIC_NODE');
const elasticUsername = defineString('ELASTIC_USERNAME');
const elasticPassword = defineString('ELASTIC_PASSWORD');

export const searchFunction = https.onCall(
  async (
    req: SearchFunctionRequestDto,
    context
  ): Promise<SearchFunctionResponseDto> => {
    logger.info(req);
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
          'merchant.region': req.filters.region,
        },
      });
    }
    // Merchant
    if (req.filters.merchant) {
      filter.push({
        match_phrase: {
          'merchant.name': req.filters.merchant,
        },
      });
    }
    // Brand
    if (req.filters.brand) {
      filter.push({
        match_phrase: {
          'brand.code': req.filters.brand.key,
        },
      });
    }
    // Categories
    if (req.filters.category) {
      if (req.filters.category.subfilter) {
        if (req.filters.category.subfilter.subfilter) {
          filter.push({
            match_phrase: {
              'category.gmcCategory.subcategory.subcategory.name.keyword':
                req.filters.category.subfilter.subfilter.value,
            },
          });
        } else {
          filter.push({
            match_phrase: {
              'category.gmcCategory.subcategory.name.keyword':
                req.filters.category.subfilter.value,
            },
          });
        }
      } else {
        filter.push({
          match_phrase: {
            'category.gmcCategory.name.keyword': req.filters.category.value,
          },
        });
      }
    }
    // Labels
    if (req.filters.labels) {
      req.filters.labels.forEach((labelFilter) => {
        if (labelFilter.subfilter) {
          if (labelFilter.subfilter.subfilter) {
            filter.push({
              nested: {
                path: 'labels',
                query: {
                  match_phrase: {
                    'labels.gmcLabel.sublabel.sublabel.name.keyword':
                      labelFilter.subfilter.subfilter.value,
                  },
                },
              },
            });
          } else {
            filter.push({
              nested: {
                path: 'labels',
                query: {
                  match_phrase: {
                    'labels.gmcLabel.sublabel.name.keyword':
                      labelFilter.subfilter.value,
                  },
                },
              },
            });
          }
        } else {
          filter.push({
            nested: {
              path: 'labels',
              query: {
                match_phrase: {
                  'labels.gmcLabel.name.keyword': labelFilter.value,
                },
              },
            },
          });
        }
      });
    }
    // SORT ARRAY
    const sort: Sort = [];
    if (req.sort && req.sort === 'price') {
      sort.push({
        price: { order: 'asc', mode: 'avg' },
      });
    }
    const searchReq: SearchRequest = {
      from: req.page ? req.page * (req.pageSize ? req.pageSize : 10) : 0,
      size: req.pageSize ? req.pageSize : 10,
      query: {
        bool: {
          must,
          filter,
        },
      },
      sort,
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
        merchants: {
          terms: {
            field: 'merchant.name.keyword',
          },
        },
        brands: {
          terms: {
            field: 'brand.code',
            size: 20,
          },
          aggs: {
            brand_name: {
              top_hits: {
                size: 1,
                _source: {
                  include: ['brand.name'],
                },
              },
            },
          },
        },
        categories: {
          terms: {
            field: 'category.gmcCategory.name.keyword',
            order: {
              _count: 'desc',
            },
            size: 20,
          },
          aggs: {
            subcategories_1: {
              terms: {
                field: 'category.gmcCategory.subcategory.name.keyword',
                order: {
                  _count: 'desc',
                },
                size: 20,
              },
              aggs: {
                subcategories_2: {
                  terms: {
                    field:
                      'category.gmcCategory.subcategory.subcategory.name.keyword',
                    order: {
                      _count: 'desc',
                    },
                    size: 20,
                  },
                },
              },
            },
          },
        },
        labels: {
          nested: {
            path: 'labels',
          },
          aggs: {
            label: {
              terms: { field: 'labels.gmcLabel.name.keyword', size: 20 },
              aggs: {
                top_reverse_nested: {
                  reverse_nested: {},
                },
                sublabels_1: {
                  terms: { field: 'labels.gmcLabel.sublabel.name.keyword' },
                  aggs: {
                    top_reverse_nested: {
                      reverse_nested: {},
                    },
                    sublabels_2: {
                      terms: {
                        field: 'labels.gmcLabel.sublabel.sublabel.name.keyword',
                      },
                      aggs: {
                        top_reverse_nested: {
                          reverse_nested: {},
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    // EXECUTE SEARCH
    try {
      logger.debug(`Request: ${JSON.stringify(searchReq)}`);
      const result = await elasticClient.search<ProductDocument>(searchReq);
      logger.debug(`Result: ${JSON.stringify(result)}`);
      // Get Aggregation Restuls
      const merchantsAggs = result.aggregations!['merchants'] as any;
      const brandsAggs = result.aggregations!['brands'] as any;
      const priceRangeAggs = result.aggregations!['price_ranges'] as any;
      const categoriesAggs = result.aggregations!['categories'] as any;
      const labelsAggs = result.aggregations!['labels'] as any;
      return {
        hits: Number((result.hits.total as any).value),
        query: req.query,
        page: req.page ? req.page : 0,
        pageSize: req.pageSize ? req.pageSize : 10,
        sort: req.sort,
        data: result.hits.hits.map((hit) => hit._source as ProductDocument),
        facets: {
          merchants: merchantsAggs.buckets.map((bucket: any) => ({
            value: bucket.key,
            count: bucket.doc_count,
          })),
          brands: brandsAggs.buckets.map((bucket: any) => ({
            key: bucket.key,
            value: bucket.brand_name.hits.hits[0]._source.brand.name,
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
          labels: labelsAggs.label.buckets.map((bucket: any) => ({
            value: bucket.key,
            count: bucket.top_reverse_nested.doc_count,
            subfacets: bucket.sublabels_1.buckets.map((sub1: any) => ({
              value: sub1.key,
              count: sub1.top_reverse_nested.doc_count,
              subfacets: sub1.sublabels_2.buckets.map((sub2: any) => ({
                value: sub2.key,
                count: sub2.top_reverse_nested.doc_count,
              })),
            })),
          })),
          priceRanges: [
            {
              priceRange: 'cheap',
              from: 0,
              to: priceRangeAggs.buckets.cheap.to,
              count: priceRangeAggs.buckets.cheap.doc_count,
            },
            {
              priceRange: 'average',
              from: priceRangeAggs.buckets.average.from,
              to: priceRangeAggs.buckets.average.to,
              count: priceRangeAggs.buckets.average.doc_count,
            },
            {
              priceRange: 'expensive',
              from: priceRangeAggs.buckets.expensive.from,
              count: priceRangeAggs.buckets.expensive.doc_count,
            },
          ],
        },
      };
    } catch (e: any) {
      return {
        query: req.query,
        sort: req.sort,
        page: req.page,
        pageSize: req.pageSize,
        data: [],
        hits: 0,
        error: e.message,
      };
    }
  }
);
