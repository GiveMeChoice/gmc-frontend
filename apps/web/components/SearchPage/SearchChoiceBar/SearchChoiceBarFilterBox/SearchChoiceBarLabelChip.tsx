import cn from 'classnames';
import { NestedFilterDto } from 'gmc-types';
import React from 'react';
import { getLabelColor } from '../../../../lib/labels';
import { useSearch } from '../../../SearchProvider';
import * as deepEqual from 'deep-equal';

interface Props {
  index: number;
  label: NestedFilterDto;
}

const SearchChoiceBarLabelChip: React.FC<Props> = ({ index, label }) => {
  const search = useSearch();

  const handleRemoveLabel = () => {
    search.execute({
      filterUpdates: {
        labels: search.request.filters.labels.filter(
          (l) => !deepEqual(l, label)
        ),
      },
      noScroll: true,
    });
  };
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
          'flex cursor-pointer items-center gap-x-1.5 rounded-none border border-secondary-dark-50 bg-white py-1 px-2.5 group-active:bg-secondary'
        )}
        onClick={handleRemoveLabel}
      >
        <div
          className={cn(
            `h-2.5 w-2.5 rounded-full bg-${getLabelColor(label.value)}`,
            {}
          )}
        />
        {(label.subfilter
          ? label.subfilter.subfilter
            ? label.subfilter.subfilter.name
            : label.subfilter.name
          : label.name
        ).toUpperCase()}
      </div>

      {/* <div
        className={cn('flex rounded-sm border-1.5 border-black py-1 px-4', {
          'bg-primary': label.value === 'Certifications',
          'bg-gmc-beach-light-10': label.value === 'Origin',
          'bg-gmc-soil-light-50': label.value === 'Uncategorized',
        })}
      >
        {label.value.toUpperCase()}
      </div> */}

      {/* <div
        key={index}
        onClick={handleRemoveLabel}
        className={cn(
          'cursor-pointer rounded-sm border border-black px-2.5 py-1 shadow-sm',
          {
            'bg-primary': label.value === 'Certifications',
            'bg-gmc-beach-light-10': label.value === 'Origin',
            'bg-gmc-soil-light-50': label.value === 'Uncategorized',
          }
        )}
      >
        {label.subfilter
          ? label.subfilter.subfilter
            ? label.subfilter.subfilter.value
            : label.subfilter.value
          : label.value}
      </div> */}
    </div>
  );
};

export default SearchChoiceBarLabelChip;
