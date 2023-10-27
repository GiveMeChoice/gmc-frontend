import { useRouter } from 'next/router';
import React from 'react';
import { useShop } from '../../Context/ShopProvider';
import { readFilterName } from '../../../lib/filter-helpers';
import SearchChoiceBarFilterChip from '../SearchChoiceBar/SearchChoiceBarFilterBox/SearchChoiceBarFilterChip';
import SearchChoiceBarLabelChip from '../SearchChoiceBar/SearchChoiceBarFilterBox/SearchChoiceBarLabelChip';
import cn from 'classnames';

const MobileChoiceBarFilterBox: React.FC = () => {
  const router = useRouter();
  const { request } = useShop();

  return (
    <div className="flex flex-col gap-y-5">
      <div
        className={cn('flex flex-wrap gap-x-3.5 gap-y-3', {
          hidden:
            (router.pathname.includes('/shop/category') ||
              !request.filters.category) &&
            !request.filters.brand &&
            !request.filters.priceRange,
        })}
      >
        {!router.pathname.includes('/shop/category') &&
          request.filters.category && (
            <SearchChoiceBarFilterChip
              filterName={'category'}
              value={readFilterName(request.filters.category)}
            />
          )}
        {request.filters.brand && (
          <SearchChoiceBarFilterChip
            filterName={'brand'}
            value={readFilterName(request.filters.brand)}
          />
        )}
        {request.filters.priceRange && (
          <SearchChoiceBarFilterChip
            filterName={'priceRange'}
            value={
              request.filters.priceRange === 'low'
                ? '£ 0 - £ 15'
                : request.filters.priceRange === 'mid'
                ? '£ 15 - £ 100'
                : '£ 100 +'
            }
          />
        )}
      </div>
      <div className="flex flex-wrap gap-x-3.5 gap-y-3">
        {request.filters.labels.map((labelFilter, i) => (
          <SearchChoiceBarLabelChip
            index={i}
            labelFilter={labelFilter}
            displayOnly
          />
        ))}
      </div>
    </div>
  );
};

export default MobileChoiceBarFilterBox;
