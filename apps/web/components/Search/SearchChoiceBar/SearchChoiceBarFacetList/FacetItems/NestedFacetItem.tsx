import cn from 'classnames';
import { INestedFilter } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import {
  filterDeepEqual,
  readFilterName,
} from '../../../../../lib/filter-helpers';

interface Props {
  facetFilter: INestedFilter;
  activeFilters: INestedFilter[];
  count: number;
  color?: string;
  label?: boolean;
  level: number;
  onSelectFacet: (filter: INestedFilter) => void;
  onClearFacet: (filter: INestedFilter) => void;
}

const NestedFacetItem: React.FC<Props> = ({
  facetFilter,
  activeFilters,
  count,
  color,
  level,
  label,
  onSelectFacet,
  onClearFacet,
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(
      activeFilters &&
        !!activeFilters.find(
          (active) => active && filterDeepEqual(active, facetFilter)
        )
    );
  }, [activeFilters]);

  const prepareTitle = () => {
    const title = readFilterName(facetFilter);
    return level === 1 ? title.toUpperCase() : title;
  };

  return (
    <div
      className={cn(
        'group flex cursor-pointer items-center gap-x-[7px] py-[3px] text-[14px] leading-[1.3]',
        {
          'pointer-events-none': !count,
          'pl-1': count,
          'mt-2 text-[16px]': level === 1,
          'mt-[4px] text-[15px]': level === 2,
          'ml-2 mt-[3px] text-[14px]': level === 3,
        }
      )}
      onClick={() =>
        !active ? onSelectFacet(facetFilter) : onClearFacet(facetFilter)
      }
    >
      {/* {level === 2 && (
        <img
          draggable={false}
          src="/img/nest-arrow.svg"
          alt="Nested Arrow"
          height={level > 2 ? 16 : 18}
          width={level > 2 ? 16 : 18}
        />
      )}
      {level === 3 && (
        <img
          draggable={false}
          src="/img/nest-arrow.svg"
          alt="Nested Arrow"
          height={level > 2 ? 15 : 17}
          width={level > 2 ? 15 : 17}
        />
      )} */}
      {count && (
        <div
          style={{ ...(color && { backgroundColor: color }) }}
          className={cn(
            `aspect-square h-[15px] rounded-full border border-zinc-900 bg-zinc-800 text-black`,
            {
              'bg-opacity-0 group-hover:bg-opacity-30 group-active:bg-primary':
                !active,
              'bg-opacity-100 group-hover:bg-opacity-10 group-active:bg-opacity-0':
                active,
              'rounded-full': label,
              'rounded-sm': !label,
            }
          )}
        >
          <div
            className={cn(
              'flex h-full w-full items-center justify-center  bg-white',
              {
                'bg-opacity-100 group-hover:bg-opacity-30 group-active:bg-primary':
                  !active,
                'bg-opacity-0 group-hover:bg-opacity-10 group-active:bg-opacity-0':
                  active,
                'rounded-full': label,
                'rounded-sm': !label,
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
        {prepareTitle()}
        {count && (
          <span className="text-sm">
            &nbsp;(<span className="px-0.5">{`${count}`}</span>)
          </span>
        )}
      </span>
    </div>
  );
};

export default NestedFacetItem;
