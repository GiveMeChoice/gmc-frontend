/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSearch } from '../SearchProvider';

interface Props {
  bottom?: boolean;
  noTop?: boolean;
  color?: string;
}

const ListPagingHeader: React.FC<Props> = ({ bottom, noTop, color }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const router = useRouter();
  const search = useSearch();

  useEffect(() => {
    if (!search.loading) {
      if (search.response.page === 0) {
        setFrom(1);
        setTo(search.response.data.length);
      } else {
        setFrom(search.response.page * search.response.pageSize + 1);
        setTo(
          search.response.page * search.response.pageSize +
            search.response.data.length
        );
      }
    }
  }, [search.loading]);

  const handleNextPage = () => {
    router.push({
      pathname: router.basePath,
      query: {
        page: search.request.page + 2,
      },
    });
  };

  const handlePrevPage = () => {
    router.push({
      pathname: router.basePath,
      query: {
        ...router.query,
        page: search.request.page,
      },
    });
  };

  const handleLastPage = () => {
    router.push({
      pathname: router.basePath,
      query: {
        ...router.query,
        page: Math.ceil(search.response.hits / search.response.pageSize),
      },
    });
  };

  const handleFirstPage = () => {
    router.push({
      pathname: router.basePath,
      query: {
        ...router.query,
        page: 1,
        labels: ['lab-1_lab1-2', 'lab-2+lab2-1'],
      },
    });
  };

  return (
    <div
      style={{ backgroundColor: color ? color : 'white' }}
      className={cn(
        'flex h-[42px] w-full max-w-full justify-between divide-x-1.5 divide-zinc-700 border-t-1.5 border-zinc-700',
        {
          'border-b-1.5': bottom,
          'border-t-0': noTop,
        }
      )}
    >
      {search.loading ? (
        <></>
      ) : (
        <>
          <div className="flex flex-grow items-center justify-between bg-white bg-opacity-50 px-6">
            <div className="flex h-fit w-full items-center gap-x-3  text-black">
              {!search.loading && (
                <>
                  <span className="text-[16px] font-bold">
                    {`${search.response.hits} Products`}
                  </span>
                </>
              )}
            </div>
            <span className="min-w-fit text-[14px] tracking-wider text-zinc-900">{`(Showing ${from} - ${to})`}</span>
          </div>
          <div
            onClick={handleFirstPage}
            className={cn(
              `flex aspect-square h-full select-none items-center justify-center bg-secondary bg-opacity-20`,
              {
                'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                  from > 1,
                'pointer-events-none': from === 1,
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
          </div>
          <div
            onClick={handlePrevPage}
            className={cn(
              `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary bg-opacity-20`,
              {
                'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                  from > 1,
                'pointer-events-none': from === 1,
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
          <div className="flex h-full items-center bg-secondary bg-opacity-50 px-6 text-[14px] text-zinc-800">
            <span className="font-bold text-zinc-900">
              {search.response.page + 1}
            </span>
            &nbsp;&nbsp;{' ... '}&nbsp;&nbsp;
            {Math.ceil(search.response.hits / search.response.pageSize)}
          </div>
          <div
            onClick={search.nextPage}
            className={cn(
              `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary bg-opacity-20`,
              {
                'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                  to < search.response.hits,
                'pointer-events-none': to === search.response.hits,
              }
            )}
          >
            <img
              draggable={false}
              src="/img/right-arrow.svg"
              alt="Right arrow"
              className={cn('h-1/2', {
                hidden: to === search.response.hits,
              })}
            />
          </div>
          <div
            onClick={handleLastPage}
            className={cn(
              `flex aspect-square h-full select-none items-center justify-center bg-secondary bg-opacity-20`,
              {
                'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                  to < search.response.hits,
                'pointer-events-none': to === search.response.hits,
              }
            )}
          >
            <img
              draggable={false}
              src="/img/double-right-arrow.svg"
              alt="Double right arrow"
              className={cn('h-2/5', {
                hidden: to === search.response.hits,
              })}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ListPagingHeader;
