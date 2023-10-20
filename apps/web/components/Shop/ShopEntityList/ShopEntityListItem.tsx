import cn from 'classnames';
import { INestedFilter } from 'gmc-types';
import React from 'react';
import { findFacetCount } from '../../../lib/categories';
import { useShop } from '../../Context/ShopProvider';
import { ShopEntityListLevel } from '../ShopEntityList';

interface Props {
  title: string;
  path: string;
  isSelected: boolean;
  isInActiveTree?: boolean;
  level: ShopEntityListLevel;
  color: string;
  filter: INestedFilter;
}

const ShopEntityListItem: React.FC<Props> = ({
  title,
  path,
  isSelected,
  isInActiveTree,
  level,
  color,
  filter,
}) => {
  const search = useShop();
  const handleClick = () => {
    search.search({
      ...(path.includes('/shop/category/') && {
        filterUpdates: {
          category: filter,
        },
        categoryPageRequest: true,
      }),
      ...(path.includes('/shop/label/') && {
        labelPageRequest: true,
      }),
      basePath: path,
    });
  };
  return level === ShopEntityListLevel.A ||
    (search.pageFacets && findFacetCount(filter, search.pageFacets) > 0) ? (
    <div
      onClick={handleClick}
      className={cn(
        'group flex min-h-[28px] w-full items-center gap-x-[8px] hover:cursor-pointer',
        {
          'pl-[10px]': level === ShopEntityListLevel.A,
          'pl-[38px]': level === ShopEntityListLevel.B,
          'pl-[67px]': level === ShopEntityListLevel.C,
        }
      )}
    >
      <div
        style={{ backgroundColor: color }}
        className={cn('h-0 w-3 rounded-full', {
          'group-hover:h-3 group-hover:w-3': !isSelected,
          'h-3': isSelected,
        })}
      />
      <div className="flex w-full items-center gap-x-[7px]">
        <span
          className={cn('max-w-[200px] underline-offset-2', {
            underline: isSelected,
            'group-hover:underline': !isSelected,
            'group-active:text-zinc-600': !isSelected,
            'py-1 text-[22px] leading-[1.25] decoration-2':
              level === ShopEntityListLevel.A,
            'pb-0.5 text-[18px] leading-[1.4]': level === ShopEntityListLevel.B,
            'text-[16px]': level === ShopEntityListLevel.C,
          })}
        >
          {title}
        </span>

        {search.pageFacets &&
          isInActiveTree &&
          level !== ShopEntityListLevel.A && (
            <span
              className={cn('tracking-widest', {
                // 'pb-1 text-[16px] ': level === ShopEntityListLevel.A,
                'pb-0.5 text-[15px] ': level === ShopEntityListLevel.B,
                'pt-0.5 text-[14px] ': level === ShopEntityListLevel.C,
              })}
            >
              (
              {search.pageFacets
                ? findFacetCount(filter, search.pageFacets)
                : ''}
              )
            </span>
          )}
        <div className="pl-1">
          <img
            draggable={false}
            src="/img/left-arrow.svg"
            alt="Left arrow"
            height={26}
            width={26}
            className={cn('hidden min-w-[28px]', {
              'group-hover:block': !isSelected,
            })}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ShopEntityListItem;
