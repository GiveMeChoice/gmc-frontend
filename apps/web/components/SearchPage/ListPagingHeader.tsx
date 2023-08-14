import cn from 'classnames';
import { SearchFunctionResponseDto } from 'gmc-types';
import React, { useEffect, useState } from 'react';

interface Props {
  searchResponse: SearchFunctionResponseDto;
  nextPage: () => void;
  prevPage: () => void;
}

const ListPagingHeader: React.FC<Props> = ({
  searchResponse,
  nextPage,
  prevPage,
}) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    if (searchResponse.page === 0) {
      setFrom(1);
      setTo(searchResponse.data.length);
    } else {
      setFrom(searchResponse.page * searchResponse.pageSize + 1);
      setTo(
        searchResponse.page * searchResponse.pageSize +
          searchResponse.data.length
      );
    }
  }, [searchResponse.page]);

  return (
    <div className="flex h-[52px] w-full justify-between divide-x-1.5 divide-secondary-dark-10 border-b-1.5 border-r-1.5 border-secondary-dark-10">
      <div className="flex flex-grow items-center justify-between bg-white px-8">
        <div className="flex h-fit w-full items-end justify-center gap-x-2 text-zinc-800">
          <span className="text-[17px] text-zinc-800">
            {from === 1 ? `Top ${to} Choices` : `Choices ${from} - ${to}`}
          </span>
          <span className="text-[16px] text-zinc-700">{`(of ${searchResponse.hits})`}</span>
        </div>
      </div>
      <div className="flex justify-evenly divide-x-1.5 divide-secondary-dark-10">
        <div
          onClick={prevPage}
          className={cn(
            `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary dark:border-white`,
            {
              'cursor-pointer bg-white hover:bg-primary active:bg-primary-light-20':
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
        <div className="flex h-full items-center bg-white px-6 text-[17px] text-secondary-dark-50">
          <span className="font-bold text-zinc-700">
            {searchResponse.page + 1}
          </span>
          &nbsp;&nbsp;{'...'}&nbsp;&nbsp;
          {Math.ceil(searchResponse.hits / searchResponse.pageSize)}
        </div>
        <div
          onClick={nextPage}
          className={cn(
            `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary`,
            {
              'cursor-pointer bg-white hover:bg-primary active:bg-primary-light-20':
                to < searchResponse.hits,
              'pointer-events-none': to === searchResponse.hits,
            }
          )}
        >
          <img
            draggable={false}
            src="/img/right-arrow.svg"
            alt="Right arrow"
            className={cn('h-1/2', {
              hidden: to === searchResponse.hits,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPagingHeader;
