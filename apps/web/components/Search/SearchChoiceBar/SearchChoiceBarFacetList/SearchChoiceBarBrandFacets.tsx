import React from 'react';
import { useShop } from '../../../Context/ShopProvider';
import GenericFacetItem from './FacetItems/GenericFacetItem';

interface Props {}

const SearchChoiceBarBrandFacets: React.FC<Props> = ({}) => {
  const shop = useShop();
  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">BRANDS</span>
      <div className="text-md flex flex-col px-2 pl-2.5 pt-0.5">
        {shop.response.facets.brands.map((brandFacet) => (
          <GenericFacetItem
            value={brandFacet.name}
            selected={
              shop.request.filters.brand &&
              shop.request.filters.brand.value === brandFacet.value
            }
            count={brandFacet.count}
            onClick={() =>
              shop.search({
                filterUpdates: {
                  brand:
                    shop.request.filters.brand &&
                    shop.request.filters.brand.value === brandFacet.value
                      ? null
                      : {
                          name: brandFacet.name,
                          value: brandFacet.value,
                        },
                },
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SearchChoiceBarBrandFacets;
