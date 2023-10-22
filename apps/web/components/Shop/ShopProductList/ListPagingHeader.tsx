/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useShop } from '../../Context/ShopProvider';

interface Props {
  bottom?: boolean;
  noTop?: boolean;
  color?: string;
}

const ListPagingHeader: React.FC<Props> = ({ bottom, noTop, color }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const router = useRouter();
  const shop = useShop();

  useEffect(() => {
    if (!shop.searching) {
      if (shop.response.page === 0) {
        setFrom(1);
        setTo(shop.response.data.length);
      } else {
        setFrom(shop.response.page * shop.response.pageSize + 1);
        setTo(
          shop.response.page * shop.response.pageSize +
            shop.response.data.length
        );
      }
    }
  }, [shop.searching, shop.paging]);

  const handleNextPage = () => {
    shop.search({
      page: shop.request.page + 1,
    });
  };

  const handlePrevPage = () => {
    shop.search({
      page: shop.request.page - 1,
    });
  };

  const handleLastPage = () => {
    shop.search({
      page: Math.ceil(shop.response.hits / shop.response.pageSize) - 1,
    });
  };

  const handleFirstPage = () => {
    shop.search({
      page: 0,
    });
  };

  return (
    <div
      style={{ backgroundColor: color ? color : 'white' }}
      className={cn(
        'flex h-[44px] w-full max-w-full justify-between divide-x-1.5 divide-zinc-700 border-t-1.5 border-zinc-700',
        {
          'border-b-1.5 ': bottom,
          'border-t-0': noTop,
        }
      )}
    >
      {shop.searching || shop.response.data.length === 0 ? (
        <div className="h-full w-full bg-white"></div>
      ) : (
        <>
          <div className="flex h-[42.5px] flex-grow items-center justify-between bg-white px-6">
            <div className="flex h-full w-full items-center gap-x-3  text-black">
              {!shop.searching && (
                <>
                  <span className="text-[16px] font-bold">
                    {`${shop.response.hits} Results`}
                  </span>
                </>
              )}
            </div>
            <span className="min-w-fit text-[15px] tracking-wider text-zinc-900">{`(${from} - ${to})`}</span>
          </div>
          <button
            onClick={handleFirstPage}
            className={cn(
              `flex aspect-square h-full select-none items-center justify-center bg-secondary bg-opacity-10`,
              {
                'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                  from > 1,
                'pointer-events-none bg-opacity-50': from === 1,
              }
            )}
          >
            <img
              draggable={false}
              src="/img/double-left-arrow.svg"
              alt="Double left arrow"
              className={cn('h-2/5', {
                hidden: from === 1,
              })}
            />
          </button>
          <div
            onClick={handlePrevPage}
            className={cn(
              `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary bg-opacity-10`,
              {
                'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                  from > 1,
                'pointer-events-none bg-opacity-50': from === 1,
              }
            )}
          >
            <img
              draggable={false}
              src="/img/left-arrow.svg"
              alt="Left arrow"
              className={cn('h-1/2', {
                hidden: from === 1,
              })}
            />
          </div>
          <div className="flex h-full w-[110px] items-center justify-center bg-white px-6 text-[15px] text-zinc-800">
            <span className="font-bold text-zinc-900">
              {shop.response.page + 1}
            </span>
            &nbsp;&nbsp;{' ... '}&nbsp;&nbsp;
            {Math.ceil(shop.response.hits / shop.response.pageSize)}
          </div>
          <div
            onClick={handleNextPage}
            className={cn(
              `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary bg-opacity-10`,
              {
                'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                  to < shop.response.hits,
                'pointer-events-none bg-opacity-50': to === shop.response.hits,
              }
            )}
          >
            <img
              draggable={false}
              src="/img/right-arrow.svg"
              alt="Right arrow"
              className={cn('h-1/2', {
                hidden: to === shop.response.hits,
              })}
            />
          </div>
          <div
            onClick={handleLastPage}
            className={cn(
              `flex aspect-square h-full select-none items-center justify-center bg-secondary bg-opacity-10`,
              {
                'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                  to < shop.response.hits,
                'pointer-events-none bg-opacity-50': to === shop.response.hits,
              }
            )}
          >
            <img
              draggable={false}
              src="/img/double-right-arrow.svg"
              alt="Double right arrow"
              className={cn('h-2/5', {
                hidden: to === shop.response.hits,
              })}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ListPagingHeader;
