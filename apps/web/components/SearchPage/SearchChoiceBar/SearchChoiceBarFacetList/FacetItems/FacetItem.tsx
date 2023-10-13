import cn from 'classnames';
import { NestedFilterDto } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { filterDeepEqual } from '../../../../../lib/deep-equal';

interface Props {
  facetFilter: NestedFilterDto;
  activeFilters: NestedFilterDto[];
  count: number;
  color?: string;
  onSelectFacet: (filter: NestedFilterDto) => void;
  onClearFacet: (filter: NestedFilterDto) => void;
}

const FacetItem: React.FC<Props> = ({
  facetFilter,
  activeFilters,
  count,
  color,
  onSelectFacet,
  onClearFacet,
}) => {
  let name = facetFilter.subfilter
    ? facetFilter.subfilter.subfilter
      ? facetFilter.subfilter.subfilter.name
      : facetFilter.subfilter.name
    : facetFilter.name;

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(
      activeFilters &&
        !!activeFilters.find(
          (active) => active && filterDeepEqual(active, facetFilter)
        )
    );
  }, [activeFilters]);

  return (
    <div
      className={cn('group flex cursor-pointer items-center gap-x-1.5 pt-1', {
        'pointer-events-none': !count,
        'pl-1': count,
      })}
      onClick={() =>
        !active ? onSelectFacet(facetFilter) : onClearFacet(facetFilter)
      }
    >
      {count && (
        <div
          style={{ ...(color && { backgroundColor: color }) }}
          className={cn(
            `h-3.5 w-3.5 rounded-sm border border-zinc-900 bg-zinc-800 text-base text-black`,
            {
              'bg-opacity-0 group-hover:bg-opacity-30 group-active:bg-primary':
                !active,
              'bg-opacity-100 group-hover:bg-opacity-10 group-active:bg-opacity-0':
                active,
            }
          )}
        >
          <div
            className={cn(
              'flex h-full w-full items-center justify-center bg-white',
              {
                'bg-opacity-100 group-hover:bg-opacity-30 group-active:bg-primary':
                  !active,
                'bg-opacity-0 group-hover:bg-opacity-10 group-active:bg-opacity-0':
                  active,
              }
            )}
          >
            <span
              className={cn('hidden pb-1', {
                'group-hover:flex': active,
              })}
            >
              &times;
            </span>
          </div>
        </div>
      )}
      <span
        className={cn(
          'underline-offset-2 group-hover:underline group-active:text-primary-dark-10',
          {}
        )}
      >
        {name}
        {count && (
          <span className="text-sm">
            &nbsp;(<span className="px-0.5">{`${count}`}</span>)
          </span>
        )}
      </span>
    </div>
  );
};

export default FacetItem;
