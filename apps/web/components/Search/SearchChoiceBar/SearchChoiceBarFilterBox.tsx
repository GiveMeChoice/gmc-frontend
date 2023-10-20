/* eslint-disable @next/next/no-img-element */
import {
  ISearchFunctionFilters,
  IGenericFilter,
  INestedFilter,
} from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserProvider';
import SearchChoiceBarFilterChip from './SearchChoiceBarFilterBox/SearchChoiceBarFilterChip';
import SearchChoiceBarLabelChip from './SearchChoiceBarFilterBox/SearchChoiceBarLabelChip';
import { useShop } from '../../Context/ShopProvider';
import { useRouter } from 'next/router';
import { pathToFilterDeepEqual } from '../../../lib/filter-helpers';

interface Props {}

type DisplayFilters = {
  merchant?: string;
  brand?: IGenericFilter;
  category?: string;
  categoryColor?: string;
  priceRange?: string;
};

const SearchChoiceBarFilterBox: React.FC<Props> = ({}) => {
  const { profile } = useUser();
  const router = useRouter();
  const [displayFilters, setDisplayFilters] = useState<DisplayFilters>({});

  const shop = useShop();

  useEffect(() => {
    setDisplayFilters(convertFiltersToDisplay(shop.request.filters));
  }, [shop.request.filters, router.asPath]);

  const convertFiltersToDisplay = (
    filters: ISearchFunctionFilters
  ): DisplayFilters => {
    const display: DisplayFilters = {};
    if (filters.category && !router.pathname.includes('/shop/category')) {
      display.category = filters.category.subfilter
        ? filters.category.subfilter.subfilter
          ? filters.category.subfilter.subfilter.name
          : filters.category.subfilter.name
        : filters.category.name;
      display.categoryColor = shop.readBaseCategory(
        filters.category.value
      ).color;
    }
    if (filters.brand) {
      display.brand = filters.brand;
    }
    if (filters.merchant) {
      display.merchant = filters.merchant;
    }
    if (filters.priceRange) {
      display.priceRange = filters.priceRange;
    }
    return display;
  };

  const handleClearAll = () => {
    shop.search({
      filterUpdates: {
        category: null,
        priceRange: null,
        brand: null,
        labels: [],
      },
      noScroll: true,
    });
  };

  const handleFilterClick = (
    filterUpdates: Partial<ISearchFunctionFilters>
  ) => {
    shop.search({
      filterUpdates,
      noScroll: true,
    });
  };

  return (
    <div className="flex flex-col  bg-white py-5">
      <div className="flex items-center justify-between gap-x-4 px-7">
        <div className="flex items-center gap-4">
          <img
            draggable={false}
            src="/img/filters-icon.png"
            alt="Filters Icon"
            height={20}
            width={20}
          />
          <span className="text-xl">Filters</span>
        </div>
        {(Object.keys(displayFilters).length > 0 ||
          (shop.request.filters.labels.filter(
            (l) => !pathToFilterDeepEqual(router.query.labels as string[], l)
          ).length > 0 &&
            Object.keys(shop.request.filters.labels).length > 0)) && (
          <div
            className={`cursor-pointer rounded-sm border border-zinc-800 px-2 py-0.5 text-xs text-zinc-800 shadow-sm hover:bg-primary active:bg-primary-light-10`}
            onClick={handleClearAll}
          >
            Clear All
          </div>
        )}
      </div>
      {(displayFilters.merchant ||
        (displayFilters.category &&
          !router.pathname.includes('/shop/category')) ||
        displayFilters.brand ||
        displayFilters.priceRange) && (
        <div className="flex flex-wrap items-center gap-y-3 pr-7 pl-2.5 pt-5">
          {/* {displayFilters.merchant && (
            <SearchChoiceBarFilterChip
              onChipClick={}
              filterName={'merchant'}
              value={displayFilters.merchant}
            />
          )} */}
          {!router.pathname.includes('/shop/category') &&
            displayFilters.category && (
              <SearchChoiceBarFilterChip
                onChipClick={() => handleFilterClick({ category: null })}
                filterName={'category'}
                color={displayFilters.categoryColor}
                value={displayFilters.category}
              />
            )}
          {displayFilters.brand && (
            <SearchChoiceBarFilterChip
              onChipClick={() => handleFilterClick({ brand: null })}
              filterName={'brand'}
              value={displayFilters.brand.name}
            />
          )}
          {displayFilters.priceRange && (
            <SearchChoiceBarFilterChip
              onChipClick={() => handleFilterClick({ priceRange: null })}
              filterName={'priceRange'}
              key={displayFilters.priceRange}
              value={
                displayFilters.priceRange === 'low'
                  ? '£ 0 - £ 15'
                  : displayFilters.priceRange === 'mid'
                  ? '£ 15 - £ 100'
                  : '£ 100 +'
              }
            />
          )}
        </div>
      )}
      {shop.request.filters.labels &&
        shop.request.filters.labels.filter(
          (l) =>
            !pathToFilterDeepEqual(router.query.labels as string[], l) &&
            !!l.name
        ).length > 0 && (
          <div className="flex flex-wrap items-center gap-y-3 pr-7 pl-2.5 pt-5 text-sm">
            {shop.request.filters.labels
              .filter(
                (l) =>
                  !pathToFilterDeepEqual(router.query.labels as string[], l) &&
                  !!l.name
              )
              .map((label, i) => (
                <SearchChoiceBarLabelChip index={i} labelFilter={label} />
              ))}
          </div>
        )}
    </div>
  );
};

export default SearchChoiceBarFilterBox;
