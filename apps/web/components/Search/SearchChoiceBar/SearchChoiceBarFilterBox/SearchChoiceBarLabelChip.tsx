import cn from 'classnames';
import * as deepEqual from 'deep-equal';
import { INestedFilter } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { useShop } from '../../../Context/ShopProvider';
import { readFilterName } from '../../../../lib/filter-helpers';

interface Props {
  index: number;
  labelFilter: INestedFilter;
}

const SearchChoiceBarLabelChip: React.FC<Props> = ({ index, labelFilter }) => {
  const shop = useShop();
  const [color, setColor] = useState('blue');

  const handleRemoveLabel = () => {
    shop.search({
      filterUpdates: {
        labels: shop.request.filters.labels.filter(
          (l) => !deepEqual(l, labelFilter)
        ),
      },
      noScroll: true,
    });
  };

  useEffect(() => {
    setColor(shop.readBaseLabel(labelFilter.value).color);
  }, [labelFilter]);

  return (
    <div key={index} className="group flex items-center justify-center text-sm">
      <div
        onClick={handleRemoveLabel}
        className="relative bottom-3 left-2.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-zinc-900 bg-secondary pb-0.5  text-center text-xs text-zinc-900 opacity-0 hover:opacity-100 active:bg-secondary-dark-10  group-hover:opacity-100 group-active:bg-secondary-dark-10"
      >
        &times;
      </div>

      <div
        className={cn(
          'flex cursor-pointer items-center gap-x-1.5 rounded-full border border-secondary-dark-50 bg-white py-1 px-2.5 group-active:bg-secondary'
        )}
        onClick={handleRemoveLabel}
      >
        <div
          style={{ backgroundColor: color }}
          className={cn(`h-2.5 w-2.5 rounded-full`)}
        />
        {readFilterName(labelFilter).toUpperCase()}
      </div>
    </div>
  );
};

export default SearchChoiceBarLabelChip;
